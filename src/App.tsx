import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ContentIngestion } from './components/ContentIngestion';
import { SynthesisResults } from './components/SynthesisResults';
import { Library } from './components/Library';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [sources, setSources] = useState<any[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSourcesUpdate = (newSources: any[]) => {
    setSources(newSources);
  };

  const handleSearch = (query: string) => {
    setIsSearching(true);
    // Simulate search through sources
    const results = sources.filter(source => 
      source.title?.toLowerCase().includes(query.toLowerCase()) ||
      source.analysis?.summary?.toLowerCase().includes(query.toLowerCase()) ||
      source.analysis?.keyPoints?.some((point: string) => 
        point.toLowerCase().includes(query.toLowerCase())
      )
    );
    
    setTimeout(() => {
      setSearchResults(results);
      setIsSearching(false);
      // You could show search results in a modal or dedicated view
      console.log('Search results:', results);
    }, 500);
  };

  const renderView = () => {
    if (isSearching) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Searching your knowledge base...</p>
          </div>
        </div>
      );
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard sources={sources} />;
      case 'synthesis':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Knowledge Synthesis</h2>
                </div>
                <button
                  onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {showDetailedAnalysis ? 'Show Overview' : 'Detailed Analysis'}
                </button>
              </div>
              <p className="text-slate-600">Create unified learning experiences from diverse sources</p>
            </div>
            {!showDetailedAnalysis && <ContentIngestion onSourcesUpdate={handleSourcesUpdate} />}
            <SynthesisResults 
              showDetailedAnalysis={showDetailedAnalysis} 
              sources={sources}
            />
          </div>
        );
      case 'library':
        return <Library />;
      default:
        return <Dashboard sources={sources} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        activeView={activeView} 
        onViewChange={setActiveView}
        onSearch={handleSearch}
        onProfileClick={() => setShowProfile(true)}
        onSettingsClick={() => setShowSettings(true)}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderView()}
      </main>

      {/* Profile Modal */}
      {showProfile && (
        <Profile onClose={() => setShowProfile(false)} />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}

      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center">
          <span className="text-2xl">+</span>
        </button>
      </div>
    </div>
  );
}

export default App;