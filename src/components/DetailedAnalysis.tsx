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

export const DetailedAnalysis: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['summary']));
  const [selectedResource, setSelectedResource] = useState<string>('0');
  const [analysisData, setAnalysisData] = useState<AnalysisData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // Initialize with sample data - in production, this would come from processed sources
  React.useEffect(() => {
    const sampleData: AnalysisData[] = [
    {
      id: '0',
      title: 'Machine Learning Fundamentals - Complete Beginner Guide',
      type: 'youtube',
      source: 'https://youtube.com/watch?v=example',
      analysis: {
        executiveSummary: 'This comprehensive YouTube tutorial provides a complete introduction to machine learning fundamentals, covering essential concepts, algorithms, and practical applications. The video explains supervised, unsupervised, and reinforcement learning with clear examples and real-world applications.',
        keyInsights: [
          'Machine learning enables computers to learn from data without explicit programming',
          'Three main types: supervised, unsupervised, and reinforcement learning',
          'Data quality is crucial - garbage in, garbage out principle applies',
          'Cross-validation helps ensure models generalize to unseen data',
          'Feature engineering often more important than algorithm choice'
        ],
        detailedNotes: [
          {
            section: 'Machine Learning Definition',
            content: 'Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every scenario. It focuses on developing algorithms that can identify patterns and make predictions.',
            importance: 'high'
          },
          {
            section: 'Types of Machine Learning',
            content: 'Supervised learning uses labeled data for training, unsupervised learning finds patterns in unlabeled data, and reinforcement learning involves agents learning through interaction and rewards. Each type serves different problem domains.',
            importance: 'high'
          },
          {
            section: 'Popular Algorithms',
            content: 'Common algorithms include Linear Regression for continuous predictions, Decision Trees for interpretable models, Neural Networks for complex patterns, and Support Vector Machines for classification tasks.',
            importance: 'high'
          },
          {
            section: 'Machine Learning Workflow',
            content: 'The typical workflow involves data collection and preparation, feature engineering, model training and validation, evaluation and testing, and finally deployment and monitoring.',
            importance: 'medium'
          },
          {
            section: 'Data Quality Importance',
            content: 'High-quality, relevant, and sufficient data is essential for training effective models. Poor data quality leads to poor model performance regardless of algorithm sophistication.',
            importance: 'medium'
          }
        ],
        concepts: [
          {
            name: 'Supervised Learning',
            definition: 'A machine learning approach where algorithms learn from labeled training data to make predictions on new, unseen data.',
            examples: ['Email spam detection', 'Image classification', 'Price prediction']
          },
          {
            name: 'Feature Engineering',
            definition: 'The process of selecting, modifying, or creating new features from raw data to improve machine learning model performance.',
            examples: ['Scaling numerical features', 'Encoding categorical variables', 'Creating interaction terms']
          },
          {
            name: 'Cross-Validation',
            definition: 'A technique for assessing how well a machine learning model will generalize to independent datasets by partitioning data into training and testing subsets.',
            examples: ['K-fold cross-validation', 'Leave-one-out validation', 'Stratified sampling']
          }
        ],
        actionableItems: [
          'Start with simple datasets and problems before tackling complex machine learning projects',
          'Focus on data quality and preprocessing before experimenting with advanced algorithms',
          'Practice implementing basic algorithms from scratch to understand underlying principles',
          'Use cross-validation to properly evaluate model performance and avoid overfitting',
          'Learn feature engineering techniques as they often impact performance more than algorithm choice'
        ],
        connections: [
          'Connects to statistics and probability theory for understanding model behavior',
          'Links to computer science algorithms and data structures',
          'Relates to domain expertise for effective feature engineering',
          'Integrates with software engineering for model deployment and maintenance'
        ],
        difficulty: 'beginner',
        readingTime: 16,
        wordCount: 2800,
        credibilityScore: 85,
        quotes: [
          {
            text: 'Data quality is crucial - garbage in, garbage out. You need clean, relevant, and sufficient data to train effective models.',
            context: 'Discussion of data preprocessing importance'
          },
          {
            text: 'Feature engineering is often more important than the algorithm choice - good features can make simple algorithms perform excellently.',
            context: 'Explanation of feature engineering significance'
          }
        ]
      }
    },
    {
      id: '1',
      title: 'Digital Learning Revolution - Educational Technology Trends',
      type: 'url',
      source: 'https://edtech-journal.com/digital-learning-revolution',
      analysis: {
        executiveSummary: 'This article examines the transformation of education through digital technologies, highlighting key trends such as personalized learning, AI-powered tutoring systems, and virtual reality applications in education.',
        keyInsights: [
          'Personalized learning paths increase student engagement by 35%',
          'AI tutoring systems provide 24/7 support and adaptive feedback',
          'VR/AR technologies create immersive learning experiences',
          'Microlearning modules improve knowledge retention and completion rates',
          'Data analytics enable evidence-based educational decisions'
        ],
        detailedNotes: [
          {
            section: 'Personalized Learning Platforms',
            content: 'Modern learning management systems use AI algorithms to adapt content difficulty, pacing, and presentation style to individual learner needs and preferences.',
            importance: 'high'
          },
          {
            section: 'AI-Powered Educational Tools',
            content: 'Intelligent tutoring systems can identify knowledge gaps, provide targeted feedback, and suggest optimal learning paths based on individual progress patterns.',
            importance: 'high'
          },
          {
            section: 'Immersive Technologies in Education',
            content: 'Virtual and augmented reality applications allow students to explore historical sites, conduct virtual lab experiments, and visualize complex 3D concepts.',
            importance: 'medium'
          }
        ],
        concepts: [
          {
            name: 'Adaptive Learning',
            definition: 'Educational technology that adjusts to individual learner needs in real-time based on performance and behavior data.',
            examples: ['Khan Academy', 'Duolingo', 'Smart Sparrow']
          },
          {
            name: 'Learning Analytics',
            definition: 'The measurement, collection, analysis and reporting of data about learners and their contexts for optimizing learning.',
            examples: ['Progress tracking', 'Predictive modeling', 'Performance dashboards']
          }
        ],
        actionableItems: [
          'Explore AI-powered learning platforms for personalized study experiences',
          'Incorporate microlearning sessions into daily routines',
          'Use data analytics to track and optimize learning progress',
          'Experiment with VR/AR educational applications when available'
        ],
        connections: [
          'Relates to cognitive science principles of personalized learning',
          'Connects with data science and machine learning applications',
          'Links to user experience design in educational technology'
        ],
        difficulty: 'beginner',
        readingTime: 12,
        wordCount: 3200,
        credibilityScore: 78,
        quotes: [
          {
            text: 'The future of education is not about replacing teachers, but empowering them with intelligent tools.',
            context: 'Conclusion section on AI in education'
          }
        ]
      }
    }
  ];
    setAnalysisData(sampleData);
  }, []);

  const currentAnalysis = analysisData.find(item => item.id === selectedResource) || analysisData[0];

  if (!currentAnalysis) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <Brain className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No Analysis Available</h3>
        <p className="text-slate-600">Add some resources to see detailed analysis here.</p>
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