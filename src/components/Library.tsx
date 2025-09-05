import React, { useState } from 'react';
import { Search, Filter, BookOpen, Video, FileText, Link, Star, Calendar, Tag } from 'lucide-react';

export const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const sources = [
    {
      id: 1,
      title: "The Science of Learning: Memory and Retention",
      type: "pdf",
      author: "Dr. Sarah Chen",
      date: "2024-01-15",
      tags: ["cognitive science", "memory", "learning"],
      insights: 12,
      rating: 4.8,
      summary: "Comprehensive analysis of memory formation and retention mechanisms in learning environments."
    },
    {
      id: 2,
      title: "Digital Learning Revolution",
      type: "url",
      author: "Educational Technology Journal",
      date: "2024-01-10",
      tags: ["digital education", "technology", "pedagogy"],
      insights: 8,
      rating: 4.5,
      summary: "Exploring the transformation of education through digital technologies and platforms."
    },
    {
      id: 3,
      title: "Cognitive Load Theory in Practice",
      type: "youtube",
      author: "Learning Psychology Channel",
      date: "2024-01-08",
      tags: ["psychology", "cognitive load", "education"],
      insights: 15,
      rating: 4.9,
      summary: "Video lecture on implementing cognitive load theory in educational design."
    },
    {
      id: 4,
      title: "Information Processing Models",
      type: "pdf",
      author: "Prof. Michael Roberts",
      date: "2024-01-05",
      tags: ["information theory", "processing", "cognition"],
      insights: 10,
      rating: 4.6,
      summary: "Detailed examination of how humans process and organize information."
    },
    {
      id: 5,
      title: "Spaced Repetition Algorithms",
      type: "url",
      author: "Memory Research Institute",
      date: "2024-01-03",
      tags: ["algorithms", "memory", "spaced repetition"],
      insights: 6,
      rating: 4.4,
      summary: "Mathematical models and algorithms for optimizing spaced repetition learning."
    },
    {
      id: 6,
      title: "Active Learning Strategies",
      type: "youtube",
      author: "Education Innovation Hub",
      date: "2024-01-01",
      tags: ["active learning", "strategies", "engagement"],
      insights: 9,
      rating: 4.7,
      summary: "Practical strategies for implementing active learning in various contexts."
    }
  ];

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

  const filteredSources = sources.filter(source => {
    const matchesSearch = source.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || source.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const filters = [
    { id: 'all', label: 'All Sources', count: sources.length },
    { id: 'pdf', label: 'PDFs', count: sources.filter(s => s.type === 'pdf').length },
    { id: 'url', label: 'Articles', count: sources.filter(s => s.type === 'url').length },
    { id: 'youtube', label: 'Videos', count: sources.filter(s => s.type === 'youtube').length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Knowledge Library</h2>
        <p className="text-slate-600">Browse and manage your collection of learning sources</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search sources, authors, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-slate-400 w-4 h-4" />
            <div className="flex space-x-1">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredSources.map(source => {
          const TypeIcon = getTypeIcon(source.type);
          return (
            <div key={source.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getTypeColor(source.type)}`}>
                  <TypeIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 truncate">{source.title}</h3>
                    <div className="flex items-center space-x-2 ml-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-slate-600">{source.rating}</span>
                      </div>
                      <span className="text-sm text-slate-500">{source.insights} insights</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                    <span>{source.author}</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(source.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">{source.summary}</p>
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-slate-400" />
                    <div className="flex space-x-2">
                      {source.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSources.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No sources found</h3>
          <p className="text-slate-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};