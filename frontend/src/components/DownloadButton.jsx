import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Download } from 'lucide-react';

const DownloadButton = ({ html, css, js }) => {
  const handleDownload = () => {
    const zip = new JSZip();
    
    // Create files
    zip.file("index.html", `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link rel="stylesheet" href="styles.css">\n  <title>Generated Website</title>\n</head>\n<body>\n${html}\n  <script src="script.js"></script>\n</body>\n</html>`);
    zip.file("styles.css", css);
    zip.file("script.js", js);
    
    // Generate and download zip
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "website.zip");
    });
  };

  if (!html && !css && !js) return null;

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 bg-surface hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-textMain font-medium py-3 px-6 rounded-lg transition-colors border border-border mx-auto mt-8"
    >
      <Download className="w-5 h-5" />
      Download Webpage Files (.zip)
    </button>
  );
};

export default DownloadButton;
