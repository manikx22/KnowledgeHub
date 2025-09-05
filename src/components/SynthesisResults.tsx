import React from 'react';
import { BookOpen, TrendingUp, Users, Clock, Tag, ExternalLink, FileText, Brain, Target } from 'lucide-react';
import { DetailedAnalysis } from './DetailedAnalysis';

interface SynthesisResultsProps {
  showDetailedAnalysis?: boolean;
}

export const SynthesisResults: React.FC<SynthesisResultsProps> = ({ showDetailedAnalysis = false }) => {
  if (showDetailedAnalysis) {
    return <DetailedAnalysis />;
  }

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
            <p className="text-indigo-100">Processed 12 sources • Generated 47 insights • 95% confidence score</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">47</div>
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
            {keyInsights.map((insight, index) => (
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
            Based on the analysis of 12 diverse sources, several key themes emerge around digital learning and information processing. 
            The transformation towards digital-first education has fundamentally changed how learners interact with information, 
            with hybrid models becoming the new standard across educational institutions.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Research consistently demonstrates that effective learning strategies must address cognitive load management. 
            The human brain's limited working memory capacity requires careful structuring of information to optimize comprehension and retention. 
            Techniques such as spaced repetition and active recall have proven significantly more effective than traditional passive reading methods.
          </p>
          <p className="text-slate-700 leading-relaxed">
            The synthesis reveals that successful digital learning environments must balance information richness with cognitive accessibility, 
            providing learners with tools to navigate complexity while maintaining engagement and understanding.
          </p>
        </div>
      </div>
    </div>
  );
};