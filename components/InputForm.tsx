'use client';

import { useState } from 'react';
import { OptimizationInput } from '@/lib/types';

const PLATFORMS = ['TikTok', 'Instagram Reels', 'Facebook', 'YouTube Shorts', 'Other'];
const STAGES = [
  'Stage 1–2 (Unaware / Problem-Aware)',
  'Stage 2–3 (Problem-Aware / Solution-Aware)',
  'Stage 3–4 (Solution-Aware / Product-Aware)',
  'Stage 4–5 (Product-Aware / Most Aware)',
];

interface InputFormProps {
  onSubmit: (input: OptimizationInput) => void;
  isLoading: boolean;
}

export default function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [form, setForm] = useState<OptimizationInput>({
    script: '',
    brandName: '',
    productDetails: '',
    icp: '',
    platform: 'TikTok',
    stageOfAwareness: 'Stage 3–4 (Solution-Aware / Product-Aware)',
    controlLabel: '',
  });

  const set = (field: keyof OptimizationInput) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isValid = form.script.trim() && form.brandName.trim() && form.productDetails.trim() && form.icp.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Script Input */}
      <div>
        <label className="block text-sm font-semibold text-zinc-200 mb-2">
          Your Script <span className="text-rose-400">*</span>
        </label>
        <p className="text-xs text-zinc-500 mb-2">Paste the raw script exactly as it would be spoken.</p>
        <textarea
          value={form.script}
          onChange={set('script')}
          required
          rows={10}
          placeholder={`"In 2015 was the first time I ever got blood work done. I was 250 pounds..."`}
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none font-mono leading-relaxed transition-colors"
        />
      </div>

      {/* Brand + Platform row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-zinc-200 mb-2">
            Brand Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={form.brandName}
            onChange={set('brandName')}
            required
            placeholder="e.g. Nektar"
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-zinc-200 mb-2">Platform</label>
          <select
            value={form.platform}
            onChange={set('platform')}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
          >
            {PLATFORMS.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ICP */}
      <div>
        <label className="block text-sm font-semibold text-zinc-200 mb-2">
          ICP / Target Audience <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          value={form.icp}
          onChange={set('icp')}
          required
          placeholder="e.g. Mike — 35–55, health-aware male who had a health scare"
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
        />
      </div>

      {/* Product Details */}
      <div>
        <label className="block text-sm font-semibold text-zinc-200 mb-2">
          Product Details <span className="text-rose-400">*</span>
        </label>
        <p className="text-xs text-zinc-500 mb-2">Include: key claims, ingredients/benefits, price, guarantee, differentiators vs competitors.</p>
        <textarea
          value={form.productDetails}
          onChange={set('productDetails')}
          required
          rows={5}
          placeholder={`e.g. Nektar Superfoods — 13 superfoods in one scoop targeting heart, liver, kidneys, and lungs. $42/tub. 30-day money back guarantee. vs AG1 at $79.`}
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none transition-colors"
        />
      </div>

      {/* Stage of Awareness + Control Label */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-zinc-200 mb-2">Stage of Awareness</label>
          <select
            value={form.stageOfAwareness}
            onChange={set('stageOfAwareness')}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
          >
            {STAGES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-zinc-200 mb-2">
            Control Label <span className="text-zinc-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={form.controlLabel}
            onChange={set('controlLabel')}
            placeholder="e.g. Blood work testimonial v1"
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full py-4 px-6 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white font-bold text-base rounded-lg transition-all duration-150 flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <>
            <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating creative brief...
          </>
        ) : (
          <>
            Optimize Script
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
