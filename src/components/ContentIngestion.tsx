import React, { useState, useRef } from 'react';
import { Upload, Link, Youtube, FileText, Plus, X, CheckCircle, AlertCircle } from 'lucide-react';
import { contentProcessor, ProcessedContent } from '../services/contentProcessor';

interface ContentIngestionProps {
  onSourcesUpdate?: (sources: ContentSource[]) => void;
}

interface ContentSource {
  id: string;
  type: 'url' | 'pdf' | 'youtube' | 'text';
  content: string;
  title?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  errorMessage?: string;
  analysis?: {
    keyPoints: string[];
    summary: string;
    concepts: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    readingTime: number;
    wordCount: number;
    fullContent?: string;
    transcript?: string;
    metadata?: {
      author?: string;
      publishDate?: string;
      duration?: string;
      domain?: string;
    };
  };
}

export const ContentIngestion: React.FC<ContentIngestionProps> = ({ onSourcesUpdate }) => {
  const [sources, setSources] = useState<ContentSource[]>([]);
  const [activeInput, setActiveInput] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update parent component when sources change
  React.useEffect(() => {
    if (onSourcesUpdate) {
      onSourcesUpdate(sources);
    }
  }, [sources, onSourcesUpdate]);

  const processContent = async (type: ContentSource['type'], content: string, file?: File): Promise<ProcessedContent> => {
    try {
      setIsProcessing(true);
      switch (type) {
        case 'youtube':
          return await contentProcessor.processYouTubeVideo(content);
        case 'url':
          return await contentProcessor.processWebContent(content);
        case 'pdf':
          if (!file) throw new Error('PDF file is required');
          return await contentProcessor.processPDFContent(file);
        case 'text':
          return await contentProcessor.processTextContent(content);
        default:
          throw new Error('Unsupported content type');
      }
    } catch (error) {
      console.error('Content processing error:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const addSource = async (type: ContentSource['type'], content: string, title?: string, file?: File) => {
    const newSource: ContentSource = {
      id: Date.now().toString(),
      type,
      content,
      title: title || content,
      status: 'pending'
    };
    setSources(prev => [...prev, newSource]);
    
    try {
      // Update status to processing
      setSources(prev => prev.map(s => 
        s.id === newSource.id ? { 
          ...s, 
          status: 'processing'
        } : s
      ));

      // Process the actual content
      const processedData = await processContent(type, content, file);
      
      // Update with completed analysis
      setSources(prev => prev.map(s => 
        s.id === newSource.id ? { 
          ...s, 
          status: 'completed',
          title: processedData.title,
          analysis: {
            keyPoints: processedData.analysis.keyInsights,
            summary: processedData.analysis.executiveSummary,
            concepts: processedData.analysis.concepts.map(c => c.name),
            difficulty: processedData.analysis.difficulty,
            readingTime: processedData.analysis.readingTime,
            wordCount: processedData.metadata.wordCount,
            fullContent: processedData.content,
            metadata: processedData.metadata
          }
        } : s
      ));
    } catch (error) {
      // Update with error status
      setSources(prev => prev.map(s => 
        s.id === newSource.id ? { 
          ...s, 
          status: 'error',
          errorMessage: error instanceof Error ? error.message : 'Processing failed'
        } : s
      ));
    }
  };

  const handleInputSubmit = () => {
    if (!inputValue.trim()) return;
    
    let type: ContentSource['type'] = 'text';
    if (inputValue.includes('youtube.com') || inputValue.includes('youtu.be')) {
      type = 'youtube';
    } else if (inputValue.startsWith('http')) {
      type = 'url';
    }
    
    addSource(type, inputValue);
    setInputValue('');
    setActiveInput('');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      addSource('pdf', file.name, file.name, file);
    }
  };

  const removeSource = (id: string) => {
    setSources(prev => prev.filter(s => s.id !== id));
  };

  const getStatusColor = (status: ContentSource['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusIcon = (status: ContentSource['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const inputOptions = [
    { id: 'url', label: 'Website URL', icon: Link, placeholder: 'https://example.com/article' },
    { id: 'youtube', label: 'YouTube Video', icon: Youtube, placeholder: 'https://youtube.com/watch?v=...' },
    { id: 'text', label: 'Text Content', icon: FileText, placeholder: 'Paste your text content here...' }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Add Learning Sources</h3>
        <p className="text-slate-600">Import content from various sources to create your knowledge synthesis</p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {inputOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveInput(activeInput === option.id ? '' : option.id)}
              className={`p-4 border rounded-lg transition-all ${
                activeInput === option.id
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <option.icon className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-all"
          >
            <Upload className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Upload PDF</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {activeInput && (
          <div className="bg-slate-50 p-4 rounded-lg border">
            <div className="flex space-x-3">
              {activeInput === 'text' ? (
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={inputOptions.find(o => o.id === activeInput)?.placeholder}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-vertical min-h-[100px]"
                  rows={4}
                />
              ) : (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={inputOptions.find(o => o.id === activeInput)?.placeholder}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                />
              )}
              <button
                onClick={handleInputSubmit}
                disabled={!inputValue.trim() || isProcessing}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                <span>{isProcessing ? 'Processing...' : 'Add'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {sources.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-slate-900 mb-3">Added Sources ({sources.length})</h4>
          <div className="space-y-2">
            {sources.map((source) => (
              <div
                key={source.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className={`p-1.5 rounded ${getStatusColor(source.status)}`}>
                    {getStatusIcon(source.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {source.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500 capitalize">{source.type}</p>
                      {source.status === 'completed' && source.analysis && (
                        <p className="text-xs text-green-600">
                          {source.analysis.wordCount?.toLocaleString() || 0} words • {source.analysis.readingTime || 0}min read
                        </p>
                      )}
                      {source.status === 'error' && (
                        <p className="text-xs text-red-600">{source.errorMessage}</p>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeSource(source.id)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};