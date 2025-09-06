import React from 'react';
import { BookOpen, TrendingUp, Users, Clock, Plus, ArrowRight, Brain, Target, Lightbulb } from 'lucide-react';

interface DashboardProps {
  sources?: any[];
}

export const Dashboard: React.FC<DashboardProps> = ({ sources = [] }) => {
  // Calculate dynamic stats from actual sources
  const totalSources = sources.length;
  const completedSources = sources.filter(s => s.status === 'completed').length;
  const totalInsights = sources.reduce((acc, s) => acc + (s.analysis?.keyPoints?.length || 0), 0);
  const totalWords = sources.reduce((acc, s) => acc + (s.analysis?.wordCount || 0), 0);
  const estimatedHoursSaved = Math.floor(totalWords / 200 / 60 * 3); // Assuming 3x reading speed improvement
  
  // Extract unique concepts from all sources
  const allConcepts = sources
    .filter(s => s.status === 'completed' && s.analysis?.concepts)
    .flatMap(s => s.analysis.concepts)
    .filter((concept, index, arr) => arr.indexOf(concept) === index);

  const stats = [
    { 
      label: 'Total Sources', 
      value: totalSources.toString(), 
      change: completedSources > 0 ? `+${completedSources}` : '0', 
      icon: BookOpen, 
      color: 'text-blue-600 bg-blue-50' 
    },
    { 
      label: 'Knowledge Areas', 
      value: allConcepts.length.toString(), 
      change: allConcepts.length > 0 ? `+${Math.min(allConcepts.length, 5)}` : '0', 
      icon: Brain, 
      color: 'text-green-600 bg-green-50' 
    },
    { 
      label: 'Insights Generated', 
      value: totalInsights.toString(), 
      change: totalInsights > 0 ? `+${totalInsights}` : '0', 
      icon: Lightbulb, 
      color: 'text-purple-600 bg-purple-50' 
    },
    { 
      label: 'Hours Saved', 
      value: estimatedHoursSaved.toString(), 
      change: estimatedHoursSaved > 0 ? `+${estimatedHoursSaved}` : '0', 
      icon: Clock, 
      color: 'text-orange-600 bg-orange-50' 
    },
  ];

  // Generate recent projects from actual sources
  const recentProjects = sources
    .filter(s => s.status === 'completed')
    .slice(-4)
    .map((source, index) => ({
      title: source.title || `Project ${index + 1}`,
      sources: 1,
      insights: source.analysis?.keyPoints?.length || 0,
      updated: 'Recently added',
      progress: 100,
      type: source.type
    }));

  // Add default projects if no sources
  if (recentProjects.length === 0) {
    recentProjects.push(
      { title: 'Start Your First Knowledge Synthesis', sources: 0, insights: 0, updated: 'Ready to begin', progress: 0, type: 'placeholder' }
    );
  }

  const quickActions = [
    { title: 'Start New Synthesis', desc: 'Create a new knowledge hub', action: 'Create', color: 'bg-indigo-600 hover:bg-indigo-700' },
    { title: 'Import Research Paper', desc: 'Upload PDF for analysis', action: 'Upload', color: 'bg-green-600 hover:bg-green-700' },
    { title: 'Analyze YouTube Playlist', desc: 'Process video content', action: 'Analyze', color: 'bg-purple-600 hover:bg-purple-700' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Learning Dashboard</h2>
        <p className="text-slate-600">Track your knowledge synthesis progress and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                <p className="text-green-600 text-sm font-medium mt-1">{stat.change} this week</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{action.title}</h3>
            <p className="text-slate-600 text-sm mb-4">{action.desc}</p>
            <button className={`w-full py-2 px-4 text-white rounded-lg transition-colors ${action.color} flex items-center justify-center space-x-2`}>
              <Plus className="w-4 h-4" />
              <span>{action.action}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Recent Projects</h3>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {recentProjects.map((project, index) => (
            <div key={index} className="border border-slate-100 rounded-lg p-4 hover:bg-slate-50 cursor-pointer transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-slate-900">{project.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                    <span>{project.sources} sources</span>
                    <span>{project.insights} insights</span>
                    <span>Updated {project.updated}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-900">{project.progress}%</div>
                  <div className="text-xs text-slate-500">Complete</div>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};