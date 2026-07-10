import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Check } from 'lucide-react';

const CodeViewer = ({ codeData }) => {
  const [activeTab, setActiveTab] = useState('html');
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'html', label: 'index.html', language: 'html' },
    { id: 'css', label: 'styles.css', language: 'css' },
    { id: 'js', label: 'script.js', language: 'javascript' },
  ];

  const handleCopy = () => {
    if (!codeData) return;
    navigator.clipboard.writeText(codeData[activeTab] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!codeData) return null;

  return (
    <div className="w-full bg-[#1e1e1e] rounded-xl overflow-hidden border border-border mt-8">
      <div className="flex items-center justify-between bg-[#2d2d2d] px-4 py-2 border-b border-border">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1e1e1e] text-primary border-t-2 border-primary'
                  : 'text-textMuted hover:text-textMain hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm text-textMuted hover:text-textMain transition-colors bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-md"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="h-[400px]">
        <Editor
          height="100%"
          theme="vs-dark"
          language={tabs.find(t => t.id === activeTab)?.language}
          value={codeData[activeTab] || ''}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  );
};

export default CodeViewer;
