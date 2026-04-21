'use client';

import { useState, useRef } from 'react';
import InputForm from './InputForm';
import OptimizedOutput from './OptimizedOutput';
import { OptimizationInput, OptimizationOutput } from '@/lib/types';

type Status = 'idle' | 'loading' | 'done' | 'error';

export default function CreativeMachine() {
  const [status, setStatus] = useState<Status>('idle');
  const [output, setOutput] = useState<OptimizationOutput | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const outputRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (input: OptimizationInput) => {
    setStatus('loading');
    setOutput(null);
    setErrorMsg('');

    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server error ${res.status}`);
      }

      setOutput(data as OptimizationOutput);
      setStatus('done');

      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <span className="font-bold text-zinc-100 text-sm tracking-tight">Creative Machine</span>
            <span className="hidden sm:block text-zinc-600 text-xs ml-1">by Ambrosia</span>
          </div>
          <span className="text-xs text-zinc-600 font-mono">Creative Intelligence Pipeline</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Hero */}
        <div className="mb-10 sm:mb-14 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-100 leading-tight mb-3">
            Put your script in.
            <br />
            <span className="text-violet-400">Get a winning ad out.</span>
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed">
            Paste any UGC or talking-head script. The Creative Machine audits it, rewrites it tight, generates 3 hook variants, and gives you a full production + launch brief.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 mb-10">
          <InputForm onSubmit={handleSubmit} isLoading={status === 'loading'} />
        </div>

        {/* Loading State */}
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-5 py-20 text-center">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
              <div className="absolute inset-0 rounded-full border-2 border-t-violet-500 animate-spin" />
            </div>
            <div>
              <p className="text-zinc-200 font-semibold">Generating your creative brief...</p>
              <p className="text-zinc-500 text-sm mt-1">Auditing control · Writing rewrite · Building hooks · Drafting launch plan</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-5 flex gap-4 items-start">
            <svg className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <div>
              <p className="text-rose-300 font-semibold text-sm">Generation failed</p>
              <p className="text-rose-400/70 text-sm mt-1">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Output */}
        {status === 'done' && output && (
          <div ref={outputRef}>
            <div className="flex items-center gap-3 mb-8 pt-2">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-3">Creative Brief</span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>
            <OptimizedOutput output={output} />
          </div>
        )}
      </main>
    </div>
  );
}
