import React, { useState } from 'react';
import { contentProcessor } from '../services/contentProcessor';
import { 
  BookOpen, 
  Clock, 
  Target, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Video, 
  Link,
  Brain,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Quote
} from 'lucide-react';

interface AnalysisData {
  id: string;
  title: string;
  type: 'url' | 'pdf' | 'youtube' | 'text';
  source: string;
  analysis: {
    executiveSummary: string;
    keyInsights: string[];
    detailedNotes: {
      section: string;
      content: string;
      importance: 'high' | 'medium' | 'low';
    }[];
    concepts: {
      name: string;
      definition: string;
      examples: string[];
    }[];
    actionableItems: string[];
    connections: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    readingTime: number;
    wordCount: number;
    credibilityScore: number;
    quotes: {
      text: string;
      context: string;
    }[];
  };
}

interface DetailedAnalysisProps {
  sources?: any[];
}

export const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({ sources = [] }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['summary']));
  const [selectedResource, setSelectedResource] = useState<string>('0');

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // Convert sources to analysis data format
  const analysisData: AnalysisData[] = sources
    .filter(source => source.status === 'completed' && source.analysis)
    .map((source, index) => ({
      id: source.id || index.toString(),
      title: source.title || `Source ${index + 1}`,
      type: source.type || 'text',
      source: source.content || '',
      analysis: {
        executiveSummary: source.analysis?.summary || 'No summary available',
        keyInsights: source.analysis?.keyPoints || [],
        detailedNotes: source.analysis?.detailedNotes || [
          {
            section: 'Content Analysis',
            content: source.analysis?.fullContent?.substring(0, 500) + '...' || 'Content analysis in progress...',
            importance: 'medium' as const
          }
        ],
        concepts: source.analysis?.concepts?.map((concept: string) => ({
          name: concept,
          definition: `Key concept identified in the analysis of ${source.title}`,
          examples: ['Related examples from the content']
        })) || [],
        actionableItems: [
          `Review and study the key concepts from ${source.title}`,
          'Apply the insights to your learning objectives',
          'Connect this knowledge with other related sources'
        ],
        connections: [
          'Relates to other sources in your knowledge base',
          'Connects to broader learning objectives'
        ],
        difficulty: source.analysis?.difficulty || 'beginner',
        readingTime: source.analysis?.readingTime || 5,
        wordCount: source.analysis?.wordCount || 0,
        credibilityScore: 85,
        quotes: [
          {
            text: source.analysis?.fullContent?.split('.')[0] + '.' || 'Key insight from the content',
            context: `From ${source.title}`
          }
        ]
      }
    }));

  // Set initial selected resource
  React.useEffect(() => {
    if (analysisData.length > 0 && !analysisData.find(item => item.id === selectedResource)) {
      setSelectedResource(analysisData[0].id);
    }
  }, [analysisData, selectedResource]);

  const currentAnalysis = analysisData.find(item => item.id === selectedResource) || analysisData[0];

  if (!currentAnalysis || analysisData.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <Brain className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No Analysis Available</h3>
        <p className="text-slate-600">
          {sources.length === 0 ? 
            'Add some resources to see detailed analysis here.' :
            'Processing your resources... Detailed analysis will appear once processing is complete.'
          }
        </p>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'url': return Link;
      case 'youtube': return Video;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-600 bg-red-50';
      case 'url': return 'text-blue-600 bg-blue-50';
      case 'youtube': return 'text-purple-600 bg-purple-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'advanced': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-slate-500 bg-slate-50';
    }
  };

  const SectionHeader: React.FC<{ title: string; icon: React.ElementType; sectionKey: string }> = ({ title, icon: Icon, sectionKey }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
    >
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      {expandedSections.has(sectionKey) ? (
        <ChevronUp className="w-5 h-5 text-slate-400" />
      ) : (
        <ChevronDown className="w-5 h-5 text-slate-400" />
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Detailed Resource Analysis</h2>
        
        {/* Resource Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Select Resource</label>
          <select
            value={selectedResource}
            onChange={(e) => setSelectedResource(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            {analysisData.map((item) => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </select>
        </div>

        {/* Resource Overview */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${getTypeColor(currentAnalysis.type)}`}>
              {React.createElement(getTypeIcon(currentAnalysis.type), { className: "w-6 h-6" })}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{currentAnalysis.title}</h3>
              <p className="text-slate-600 mb-4">{currentAnalysis.source}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{currentAnalysis.analysis.readingTime}m</div>
                  <div className="text-sm text-slate-500">Reading Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{currentAnalysis.analysis.wordCount.toLocaleString()}</div>
                  <div className="text-sm text-slate-500">Words</div>
                </div>
                <div className="text-center">
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentAnalysis.analysis.difficulty)}`}>
                    {currentAnalysis.analysis.difficulty}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">Difficulty</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{currentAnalysis.analysis.credibilityScore}%</div>
                  <div className="text-sm text-slate-500">Credibility</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <SectionHeader title="Executive Summary" icon={Target} sectionKey="summary" />
        {expandedSections.has('summary') && (
          <div className="p-6 border-t border-slate-100">
            <p className="text-slate-700 leading-relaxed">{currentAnalysis.analysis.executiveSummary}</p>
          </div>
        )}
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <SectionHeader title="Key Insights" icon={Lightbulb} sectionKey="insights" />
        {expandedSections.has('insights') && (
          <div className="p-6 border-t border-slate-100">
            <div className="space-y-3">
              {currentAnalysis.analysis.keyInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detailed Notes */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <SectionHeader title="Detailed Notes" icon={FileText} sectionKey="notes" />
        {expandedSections.has('notes') && (
          <div className="p-6 border-t border-slate-100">
            <div className="space-y-4">
              {currentAnalysis.analysis.detailedNotes.map((note, index) => (
                <div key={index} className={`border-l-4 pl-4 py-3 ${getImportanceColor(note.importance)}`}>
                  <h4 className="font-semibold text-slate-900 mb-2">{note.section}</h4>
                  <p className="text-slate-700 leading-relaxed">{note.content}</p>
                  <div className="mt-2">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      note.importance === 'high' ? 'bg-red-100 text-red-700' :
                      note.importance === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {note.importance} importance
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Key Concepts */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <SectionHeader title="Key Concepts" icon={Brain} sectionKey="concepts" />
        {expandedSections.has('concepts') && (
          <div className="p-6 border-t border-slate-100">
            <div className="space-y-6">
              {currentAnalysis.analysis.concepts.map((concept, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">{concept.name}</h4>
                  <p className="text-slate-700 mb-3">{concept.definition}</p>
                  <div>
                    <h5 className="text-sm font-medium text-slate-600 mb-2">Examples:</h5>
                    <div className="flex flex-wrap gap-2">
                      {concept.examples.map((example, exIndex) => (
                        <span key={exIndex} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actionable Items */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <SectionHeader title="Action Items" icon={TrendingUp} sectionKey="actions" />
        {expandedSections.has('actions') && (
          <div className="p-6 border-t border-slate-100">
            <div className="space-y-3">
              {currentAnalysis.analysis.actionableItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <AlertCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Key Quotes */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <SectionHeader title="Notable Quotes" icon={Quote} sectionKey="quotes" />
        {expandedSections.has('quotes') && (
          <div className="p-6 border-t border-slate-100">
            <div className="space-y-4">
              {currentAnalysis.analysis.quotes.map((quote, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50">
                  <blockquote className="text-slate-700 italic mb-2">"{quote.text}"</blockquote>
                  <cite className="text-sm text-slate-500">— {quote.context}</cite>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Connections */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <SectionHeader title="Knowledge Connections" icon={Users} sectionKey="connections" />
        {expandedSections.has('connections') && (
          <div className="p-6 border-t border-slate-100">
            <div className="space-y-2">
              {currentAnalysis.analysis.connections.map((connection, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <p className="text-slate-700">{connection}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};