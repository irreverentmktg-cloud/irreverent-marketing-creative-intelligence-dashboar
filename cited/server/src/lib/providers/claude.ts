import Anthropic from '@anthropic-ai/sdk'
import { env } from '../../env.js'
import type { LLMProvider, ProviderQueryResult } from './types.js'
import { unavailableResult } from './types.js'

const MODEL = 'claude-opus-4-7'

export class ClaudeProvider implements LLMProvider {
  readonly platform = 'claude' as const
  readonly available: boolean
  private client: Anthropic | null

  constructor() {
    this.available = Boolean(env.ANTHROPIC_API_KEY)
    this.client = this.available
      ? new Anthropic({ apiKey: env.ANTHROPIC_API_KEY })
      : null
  }

  async ask(prompt: string): Promise<ProviderQueryResult> {
    if (!this.client) return unavailableResult(this.platform)

    // Use Claude with the web search tool. This mirrors how a real user
    // would get an answer — Claude will browse, weigh sources, and return a
    // grounded answer. The brand citations come from the answer text itself.
    const response = await this.client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      tools: [
        {
          // Web search is a server tool — Claude calls it, results stay
          // server-side, only the synthesized answer comes back to us.
          type: 'web_search_20250305' as 'web_search_20250305',
          name: 'web_search',
          max_uses: 4,
        } as unknown as Anthropic.Messages.Tool,
      ],
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const answer = response.content
      .filter(
        (block): block is Anthropic.Messages.TextBlock => block.type === 'text',
      )
      .map((block) => block.text)
      .join('\n\n')

    return {
      platform: this.platform,
      available: true,
      answer,
      citedSources: extractUrls(answer),
      competitorBrands: [],
      ranAt: new Date().toISOString(),
    }
  }
}

function extractUrls(text: string): string[] {
  const matches = text.match(/https?:\/\/[^\s)>\]]+/g) ?? []
  return Array.from(new Set(matches))
}
