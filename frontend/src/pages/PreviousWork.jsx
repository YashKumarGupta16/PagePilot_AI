import React, { useEffect, useState } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api';
import WebsitePreview from '../components/WebsitePreview';
import CodeViewer from '../components/CodeViewer';
import DownloadButton from '../components/DownloadButton';

const PreviousWork = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSite, setSelectedSite] = useState(null);
  const [loadingSite, setLoadingSite] = useState(false);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const res = await api.get('/my-sites');
      setSites(res.data);
    } catch (err) {
      setError('Failed to fetch previous work');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSite = async (id) => {
    setLoadingSite(true);
    try {
      const res = await api.get(`/my-sites/${id}`);
      setSelectedSite(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load site details');
    } finally {
      setLoadingSite(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (selectedSite) {
    return (
      <div className="max-w-6xl mx-auto pb-12">
        <button
          onClick={() => setSelectedSite(null)}
          className="flex items-center gap-2 text-textMuted hover:text-textMain mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to List
        </button>

        <div className="bg-surface border border-slate-700 p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-textMain mb-2">{selectedSite.title}</h2>
          <p className="text-textMuted mb-4">{selectedSite.description}</p>
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-textMuted uppercase">Original Prompt</h4>
            <p className="text-textMain bg-slate-800 p-3 rounded-lg mt-1 border border-slate-700">
              "{selectedSite.prompt}"
            </p>
          </div>
          {selectedSite.features && selectedSite.features.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-textMain uppercase tracking-wider mb-2">Features</h3>
              <ul className="flex flex-wrap gap-2">
                {selectedSite.features.map((feature, i) => (
                  <li key={i} className="bg-slate-800 text-primary text-sm px-3 py-1 rounded-full border border-slate-700">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="space-y-4 mb-8">
           <h3 className="text-xl font-bold text-textMain">Code</h3>
           <CodeViewer codeData={selectedSite} />
        </div>

        <div className="text-center">
            <DownloadButton html={selectedSite.html} css={selectedSite.css} js={selectedSite.js} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-textMain mb-8">Your Previous Work</h1>
      
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6 border border-red-500">
          {error}
        </div>
      )}

      {sites.length === 0 ? (
        <div className="text-center bg-surface border border-slate-700 rounded-xl p-12">
          <p className="text-textMuted text-lg mb-4">You haven't generated any websites yet.</p>
          <Link to="/" className="inline-block bg-primary hover:bg-primaryHover text-white px-6 py-2 rounded-lg transition-colors font-medium">
            Generate One Now
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {sites.map((site) => (
            <div
              key={site._id}
              onClick={() => handleSelectSite(site._id)}
              className="bg-surface border border-slate-700 p-6 rounded-xl cursor-pointer hover:border-primary transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-xl font-bold text-textMain">{site.title || 'Untitled'}</h3>
                <p className="text-textMuted line-clamp-1 mt-1">Prompt: "{site.prompt}"</p>
              </div>
              <div className="text-sm text-textMuted flex-shrink-0">
                {new Date(site.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {loadingSite && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default PreviousWork;
