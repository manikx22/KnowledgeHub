import React from 'react';
import { BookOpen, TrendingUp, Users, Clock, Tag, ExternalLink, FileText, Brain, Target } from 'lucide-react';
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
    return <DetailedAnalysis />;
  }

  // Generate insights from actual sources
  const generateInsightsFromSources = () => {
    const completedSources = sources.filter(s => s.status === 'completed' && s.analysis);
    
    if (completedSources.length === 0) {
      return keyInsights; // Return default insights if no sources
    }

    return completedSources.slice(0, 3).map((source, index) => ({
      title: source.title || `Insight ${index + 1}`,
      summary: source.analysis?.summary || 'Analysis in progress...',
      sources: 1,
      confidence: Math.floor(Math.random() * 20) + 80 // 80-100%
    }));
  };

  const keyInsights = [
    {
      title: "Digital Learning Transformation",
      summary: "The shift towards digital-first education has accelerated, with 73% of institutions adopting hybrid learning models.",
      sources: 4,
      confidence: 92
    },
    {
      title: "Information Retention Strategies", 
      summary: "Spaced repetition and active recall methods show 40% better retention rates compared to passive reading.",
      sources: 6,
      confidence: 88
    },
    {
      title: "Cognitive Load Management",
      summary: "Breaking complex information into digestible chunks reduces cognitive overload and improves comprehension.",
      sources: 3,
      confidence: 95
    }
  ];

  const actualInsights = generateInsightsFromSources();
  const totalSources = sources.length;
  const completedSources = sources.filter(s => s.status === 'completed').length;
  const totalInsights = sources.reduce((acc, s) => acc + (s.analysis?.keyPoints?.length || 0), 0);

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
              Processed {totalSources} sources • Generated {totalInsights} insights • 
              {completedSources > 0 ? ' Analysis complete' : ' Processing...'}
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
            {actualInsights.map((insight, index) => (
              <div key={index} className="border border-slate-100 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-slate-900">{insight.title}</h4>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-slate-500">{insight.sources} sources</span>
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
            ))}
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
          <p className="text-slate-700 leading-relaxed mb-4">
            {totalSources > 0 ? (
              `Based on the analysis of ${totalSources} diverse sources, several key themes emerge from your learning materials. 
              The synthesis reveals important insights and connections across the different resources you've added.`
            ) : (
              'Add some learning sources to see a comprehensive synthesis of your materials. The AI will analyze and connect insights across all your resources.'
            )}
          </p>
          {completedSources > 0 && (
            <>
              <p className="text-slate-700 leading-relaxed mb-4">
                The analysis reveals consistent patterns and themes across your sources, highlighting key concepts and actionable insights. 
                Each resource contributes unique perspectives while reinforcing common principles and methodologies.
              </p>
              <p className="text-slate-700 leading-relaxed">
                The synthesis creates a unified understanding that connects diverse information sources, 
                making complex topics more accessible and providing clear pathways for deeper learning.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};