import { Target, Users, CheckCircle, XCircle, Megaphone } from "lucide-react";

const voice = {
  tone: ["Bold", "Direct", "Irreverent", "Results-focused"],
  avoid: ["Corporate jargon", "Passive voice", "Excessive hedging", "Empty claims"],
  examples: [
    { do: "Your competitors are already 3x ahead. Here's how to catch up.", dont: "We offer a comprehensive solution for improving your marketing outcomes." },
    { do: "Stop wasting money on ads that don't convert. We fixed that.", dont: "Our platform helps businesses optimize their advertising spend efficiently." },
    { do: "This ad made $47K in 72 hours. Here's the exact framework.", dont: "Discover how our solution can help you achieve better advertising results." },
  ],
};

const personas = [
  {
    name: "The Hustler",
    age: "28–38",
    description: "Entrepreneurial, scrappy, obsessed with growth metrics. Responds to direct ROI claims and social proof from people like them.",
    triggers: ["ROAS numbers", "Case studies", "Competitive urgency"],
    platforms: ["Meta", "TikTok"],
  },
  {
    name: "The Operator",
    age: "35–50",
    description: "Marketing director or in-house operator. Needs to justify spend to leadership. Responds to benchmarks and clear attribution.",
    triggers: ["Industry benchmarks", "Before/after data", "Time savings"],
    platforms: ["Meta", "LinkedIn"],
  },
  {
    name: "The Creator",
    age: "22–32",
    description: "Content creator monetising their audience. Responds to authenticity, community, and simple tools.",
    triggers: ["Easy setup", "Creator testimonials", "Revenue potential"],
    platforms: ["TikTok", "Instagram"],
  },
];

export default function BrandPage() {
  return (
    <div data-testid="brand-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Brand</h1>
        <p className="text-gray-400 text-sm mt-1">
          Voice, personas, and creative rules for FORGE
        </p>
      </div>

      <section aria-labelledby="voice-heading" className="mb-8">
        <h2 id="voice-heading" className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Brand Voice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Megaphone size={14} className="text-green-400" />
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">Tone Attributes</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {voice.tone.map((t) => (
                <span key={t} className="text-sm px-3 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle size={14} className="text-red-400" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">Avoid</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {voice.avoid.map((t) => (
                <span key={t} className="text-sm px-3 py-1 rounded-full bg-red-500/10 text-red-300 border border-red-500/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Do / Don&apos;t Examples
        </h3>
        <div className="space-y-3" data-testid="dos-donts">
          {voice.examples.map((ex, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 flex items-start gap-2">
                <CheckCircle size={14} className="text-green-400 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-300">{ex.do}</p>
              </div>
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 flex items-start gap-2">
                <XCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-300">{ex.dont}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="personas-heading">
        <h2 id="personas-heading" className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Target Personas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="personas-grid">
          {personas.map((persona) => (
            <div
              key={persona.name}
              data-testid={`persona-${persona.name.toLowerCase().replace(" ", "-")}`}
              className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Users size={16} className="text-violet-400" />
                <div>
                  <h3 className="font-semibold text-white">{persona.name}</h3>
                  <p className="text-xs text-gray-500">Age {persona.age}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-4">{persona.description}</p>
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Psychological Triggers
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {persona.triggers.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Platforms
                </p>
                <div className="flex gap-1.5">
                  {persona.platforms.map((p) => (
                    <span key={p} className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-300">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
