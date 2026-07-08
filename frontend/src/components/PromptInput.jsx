import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

const PromptInput = ({ onGenerate, loading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !loading) {
      onGenerate(prompt);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the page you want to build... (e.g. 'A sleek landing page for a coffee shop')"
          className="w-full bg-surface border border-slate-700 rounded-xl px-4 py-4 pr-16 text-textMain placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none h-32 text-lg"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!prompt.trim() || loading}
          className="absolute bottom-4 right-4 bg-primary hover:bg-primaryHover disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg p-2 transition-colors flex items-center justify-center"
          title="Generate Website"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
        </button>
      </div>
    </form>
  );
};

export default PromptInput;
