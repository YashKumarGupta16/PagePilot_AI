import React, { useState } from 'react';
import PromptInput from '../components/PromptInput';
import WebsitePreview from '../components/WebsitePreview';
import CodeViewer from '../components/CodeViewer';
import DownloadButton from '../components/DownloadButton';
import api from '../api';

const Builder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [siteData, setSiteData] = useState(null);

  const handleGenerate = async (prompt) => {
    setLoading(true);
    setError('');
    
    try {
      const res = await api.post('/generate-site', { prompt });
      setSiteData(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to generate website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 mb-4">
          Build Your Dream Website
        </h1>
        <p className="text-lg text-textMuted max-w-2xl mx-auto">
          Describe what you want, and our AI will generate a complete, responsive webpage in seconds.
        </p>
      </div>

      <div className="mb-12">
        <PromptInput onGenerate={handleGenerate} loading={loading} />
        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-center max-w-3xl mx-auto">
            {error}
          </div>
        )}
      </div>

      {siteData && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-surface border border-slate-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-textMain mb-2">{siteData.title}</h2>
            <p className="text-textMuted mb-4">{siteData.description}</p>
            {siteData.features && siteData.features.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-textMain uppercase tracking-wider mb-2">Features</h3>
                <ul className="flex flex-wrap gap-2">
                  {siteData.features.map((feature, i) => (
                    <li key={i} className="bg-slate-800 text-primary text-sm px-3 py-1 rounded-full border border-slate-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-textMain">Live Preview</h3>
            <WebsitePreview html={siteData.html} css={siteData.css} js={siteData.js} />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-textMain">Code</h3>
            <CodeViewer codeData={siteData} />
          </div>

          <div className="pb-12 text-center">
            <DownloadButton html={siteData.html} css={siteData.css} js={siteData.js} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;
