import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT } from '@/lib/prompt';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { script, brandName, productDetails, icp, platform, stageOfAwareness, controlLabel } =
    await req.json();

  if (!script || !brandName || !productDetails || !icp || !platform) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const userMessage = `Brand: ${brandName}
Platform: ${platform}
ICP / Target Audience: ${icp}
Stage of Awareness: ${stageOfAwareness || 'Not specified'}
Control Label: ${controlLabel || 'UGC testimonial ad'}

Product Details (ingredients, price, guarantee, key claims):
${productDetails}

Raw Script:
${script}

Generate the complete creative optimization brief as JSON.`;

  const message = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 4096,
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [{ role: 'user', content: userMessage }],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    return NextResponse.json({ error: 'Unexpected response type from model' }, { status: 500 });
  }

  const raw = content.text.trim();

  // Strip any accidental markdown fences
  const cleaned = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();

  try {
    const parsed = JSON.parse(cleaned);
    return NextResponse.json(parsed);
  } catch {
    // Last resort: try extracting the outermost JSON object
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return NextResponse.json(JSON.parse(match[0]));
      } catch {
        // fall through
      }
    }
    return NextResponse.json(
      { error: 'Failed to parse model response as JSON', raw: cleaned.slice(0, 500) },
      { status: 500 }
    );
  }
}
