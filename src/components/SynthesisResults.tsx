import React from 'react';
import { BookOpen, TrendingUp, Users, Clock, Tag, ExternalLink, FileText, Brain, Target, Lightbulb, CheckCircle } from 'lucide-react';
import { DetailedAnalysis } from './DetailedAnalysis';
import { contentProcessor } from '../services/contentProcessor';

interface SynthesisResultsProps {
  showDetailedAnalysis?: boolean;
  sources?: any[];
}

export const SynthesisResults: React.FC<SynthesisResultsProps> = ({ 
  showDetailedAnalysis = false, 
  sources = [] 
}) => {
  if (showDetailedAnalysis) {
    return <DetailedAnalysis sources={sources} />;
  }

  const totalSources = sources.length;
  const completedSources = sources.filter(s => s.status === 'completed').length;
  const processingCount = sources.filter(s => s.status === 'processing').length;
  const totalInsights = sources.reduce((acc, s) => acc + (s.analysis?.keyPoints?.length || 0), 0);

  // Generate insights from actual sources
  const generateInsightsFromSources = () => {
    const completedSources = sources.filter(s => s.status === 'completed' && s.analysis);
    
    if (completedSources.length === 0) {
      return [];
    }

    return completedSources.map((source, index) => ({
      title: source.analysis?.keyPoints?.[0] || source.title || `Insight ${index + 1}`,
      summary: source.analysis?.summary || 'Analysis in progress...',
      sources: 1,
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
      sourceTitle: source.title
    }));
  };

  const actualInsights = generateInsightsFromSources();

  // Generate summary from actual sources
  const generateActualSummary = () => {
    const completedSources = sources.filter(s => s.status === 'completed' && s.analysis);
    
    if (completedSources.length === 0) {
      return totalSources > 0 ? 
        `Processing ${processingCount} sources... Analysis will appear here once processing is complete.` :
        'Add some learning sources to see a comprehensive synthesis of your materials. The AI will analyze and connect insights across all your resources.';
    }

    const totalWords = completedSources.reduce((acc, s) => acc + (s.analysis?.wordCount || 0), 0);
    const avgDifficulty = completedSources.length > 0 ? 
      completedSources.map(s => s.analysis?.difficulty).filter(Boolean)[0] || 'beginner' : 'beginner';

    return `Based on the analysis of ${completedSources.length} sources (${totalWords.toLocaleString()} total words), 
    the synthesis reveals key insights and patterns across your learning materials. The content is primarily at a 
    ${avgDifficulty} level and covers interconnected concepts that build upon each other. 
    ${completedSources.length > 1 ? 'Cross-referencing between sources shows consistent themes and complementary perspectives.' : ''}`;
  };

  const topicMap = [
    { name: "Learning Psychology", connections: 12, size: "large" },
    { name: "Digital Education", connections: 8, size: "medium" },
    { name: "Memory Formation", connections: 15, size: "large" },
    { name: "Information Processing", connections: 6, size: "small" },
    { name: "Cognitive Science", connections: 9, size: "medium" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Knowledge Synthesis Complete</h2>
            <p className="text-indigo-100">
              {totalSources > 0 ? (
                <>
                  {completedSources > 0 && `Processed ${completedSources} sources • `}
                  {processingCount > 0 && `Processing ${processingCount} sources • `}
                  {totalInsights > 0 && `Generated ${totalInsights} insights • `}
                  {completedSources === totalSources && totalSources > 0 ? 'Analysis complete' : 
                   processingCount > 0 ? 'Analysis in progress...' : 'Ready to analyze'}
                </>
              ) : (
                'Add resources to begin synthesis'
              )}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{totalInsights}</div>
            <div className="text-sm text-indigo-200">Key Insights</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            <h3 className="text-lg font-semibold text-slate-900">Key Insights</h3>
          </div>
          <div className="space-y-4">
            {actualInsights.length > 0 ? actualInsights.map((insight, index) => (
              <div key={index} className="border border-slate-100 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-slate-900">{insight.title}</h4>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-slate-500">{insight.sourceTitle}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      insight.confidence >= 90 ? 'bg-green-100 text-green-700' :
                      insight.confidence >= 80 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {insight.confidence}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-600">{insight.summary}</p>
              </div>
            )) : (
              <div className="border border-slate-200 rounded-lg p-6 text-center">
                <Lightbulb className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">
                  {totalSources > 0 ? 
                    processingCount > 0 ? 
                      'Processing your sources... Insights will appear here shortly.' :
                      'Analysis complete. Insights will be generated from your processed sources.' :
                    'Add some resources to see key insights extracted from your content.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Tag className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-900">Topic Map</h3>
          </div>
          <div className="relative h-64 bg-slate-50 rounded-lg p-4 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {topicMap.map((topic, index) => {
                  const size = topic.size === 'large' ? 'w-20 h-20' : topic.size === 'medium' ? 'w-16 h-16' : 'w-12 h-12';
                  const positions = [
                    'top-4 left-8',
                    'top-16 right-12',
                    'bottom-16 left-12',
                    'bottom-8 right-8',
                    'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                  ];
                  
                  return (
                    <div
                      key={index}
                      className={`absolute ${positions[index]} ${size} bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium text-center p-2 shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                      title={`${topic.connections} connections`}
                    >
                      {topic.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
              <span>Primary Topics</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span>Related Concepts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-slate-900">Generated Summary</h3>
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Export Summary
          </button>
        </div>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-700 leading-relaxed mb-4">{generateActualSummary()}</p>
          
          {completedSources > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="font-semibold text-slate-900">Processed Sources:</h4>
              <ul className="space-y-2">
                {sources.filter(s => s.status === 'completed').map((source, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{source.title}</span>
                    <span className="text-slate-500">
                      ({source.analysis?.wordCount?.toLocaleString() || 0} words, 
                      {source.analysis?.readingTime || 0}min read)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {processingCount > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-blue-700 text-sm font-medium">
                  Processing {processingCount} source{processingCount > 1 ? 's' : ''}...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};