import React, { useMemo } from 'react';

const WebsitePreview = ({ html, css, js }) => {
  const srcDoc = useMemo(() => {
    if (!html && !css && !js) return '';
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${css || ''}</style>
        </head>
        <body>
          ${html || ''}
          <script>${js || ''}</script>
        </body>
      </html>
    `;
  }, [html, css, js]);

  if (!srcDoc) {
    return (
      <div className="w-full h-[600px] bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-center text-textMuted">
        Preview will appear here
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-slate-700 shadow-xl h-[600px]">
      <iframe
        title="Live Preview"
        srcDoc={srcDoc}
        sandbox="allow-scripts allow-modals"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default WebsitePreview;
