import React, { useState, useRef } from 'react';
import { Upload, Link, Youtube, FileText, Plus, X, CheckCircle, AlertCircle } from 'lucide-react';

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

export const ContentIngestion: React.FC = () => {
  const [sources, setSources] = useState<ContentSource[]>([]);
  const [activeInput, setActiveInput] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processContent = async (type: ContentSource['type'], content: string): Promise<any> => {
    try {
      switch (type) {
        case 'youtube':
          return await processYouTubeVideo(content);
        case 'url':
          return await processWebContent(content);
        case 'pdf':
          return await processPDFContent(content);
        case 'text':
          return await processTextContent(content);
        default:
          throw new Error('Unsupported content type');
      }
    } catch (error) {
      throw error;
    }
  };

  const processYouTubeVideo = async (url: string) => {
    // Extract video ID from URL
    const videoId = extractYouTubeVideoId(url);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    // Simulate API call to get video transcript and metadata
    // In real implementation, you'd use YouTube Data API v3 and transcript services
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockTranscript = `Welcome to this comprehensive tutorial on machine learning fundamentals. 
    
    In this video, we'll cover the essential concepts that every beginner needs to understand. 
    
    First, let's define machine learning. Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every scenario.
    
    There are three main types of machine learning:
    1. Supervised Learning - where we train models on labeled data
    2. Unsupervised Learning - where we find patterns in unlabeled data  
    3. Reinforcement Learning - where agents learn through interaction and rewards
    
    Supervised learning is the most common approach and includes classification and regression problems. Classification predicts categories or classes, while regression predicts continuous numerical values.
    
    Some popular algorithms include:
    - Linear Regression for predicting continuous values
    - Decision Trees for both classification and regression
    - Neural Networks for complex pattern recognition
    - Support Vector Machines for classification tasks
    
    The machine learning workflow typically involves:
    1. Data Collection and Preparation
    2. Feature Engineering and Selection
    3. Model Training and Validation
    4. Model Evaluation and Testing
    5. Deployment and Monitoring
    
    Data quality is crucial - garbage in, garbage out. You need clean, relevant, and sufficient data to train effective models.
    
    Cross-validation helps ensure your model generalizes well to unseen data by testing it on multiple data splits.
    
    Common evaluation metrics include accuracy, precision, recall, and F1-score for classification, and mean squared error for regression.
    
    Overfitting occurs when a model memorizes training data but fails on new data. Regularization techniques help prevent this.
    
    Feature engineering is often more important than the algorithm choice - good features can make simple algorithms perform excellently.
    
    Thank you for watching this introduction to machine learning. Practice with real datasets and start with simple problems before tackling complex ones.`;

    return {
      title: 'Machine Learning Fundamentals - Complete Beginner Guide',
      transcript: mockTranscript,
      metadata: {
        author: 'Tech Education Channel',
        publishDate: '2024-01-15',
        duration: '15:42',
        domain: 'youtube.com'
      },
      analysis: analyzeContent(mockTranscript, 'youtube')
    };
  };

  const processWebContent = async (url: string) => {
    // Simulate web scraping and content extraction
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockContent = `# The Future of Digital Learning: Transforming Education Through Technology
    
    The landscape of education is undergoing a revolutionary transformation, driven by advances in digital technology and changing learner expectations. This comprehensive analysis explores the key trends, challenges, and opportunities shaping the future of digital learning.
    
    ## Executive Summary
    
    Digital learning has evolved from a supplementary educational tool to a fundamental component of modern education. The COVID-19 pandemic accelerated adoption rates by nearly a decade, forcing institutions to rapidly digitize their offerings and learners to adapt to new modalities.
    
    ## Key Trends in Digital Learning
    
    ### 1. Personalized Learning Pathways
    
    Artificial intelligence and machine learning algorithms are enabling unprecedented levels of personalization in education. These systems can:
    
    - Adapt content difficulty in real-time based on learner performance
    - Recommend learning resources tailored to individual learning styles
    - Identify knowledge gaps and provide targeted interventions
    - Create customized study schedules optimized for retention
    
    Research shows that personalized learning can improve student outcomes by 30-40% compared to traditional one-size-fits-all approaches.
    
    ### 2. Microlearning and Just-in-Time Education
    
    The modern learner's attention span and busy lifestyle have driven the rise of microlearning - bite-sized educational content that can be consumed in 5-10 minute sessions. This approach offers several advantages:
    
    - Higher completion rates (80% vs 15% for traditional courses)
    - Better retention through spaced repetition
    - Flexibility to learn during commutes or breaks
    - Lower cognitive load and reduced overwhelm
    
    ### 3. Immersive Technologies
    
    Virtual Reality (VR) and Augmented Reality (AR) are creating new possibilities for experiential learning:
    
    - Medical students can perform virtual surgeries
    - History students can walk through ancient civilizations
    - Engineering students can manipulate 3D models of complex machinery
    - Language learners can practice conversations in simulated environments
    
    ## Challenges and Considerations
    
    ### Digital Divide
    
    Despite technological advances, access to digital learning remains unequal. Factors include:
    - Internet connectivity and bandwidth limitations
    - Device availability and technical literacy
    - Socioeconomic barriers to technology access
    - Geographic disparities in infrastructure
    
    ### Learning Effectiveness
    
    While digital learning offers many benefits, research indicates that effectiveness depends on:
    - Quality of instructional design
    - Level of interactivity and engagement
    - Presence of social learning opportunities
    - Adequate technical support and training
    
    ## Future Outlook
    
    The future of digital learning will likely feature:
    - AI-powered tutoring systems that rival human instructors
    - Blockchain-based credentialing and skill verification
    - Advanced analytics for predictive learning interventions
    - Seamless integration between physical and digital learning spaces
    
    Educational institutions that embrace these technologies while addressing equity concerns will be best positioned to serve learners in the digital age.
    
    ## Conclusion
    
    Digital learning represents both an opportunity and a responsibility. As we continue to innovate in educational technology, we must ensure that these advances serve to democratize access to quality education rather than exacerbate existing inequalities.
    
    The institutions and educators who succeed in this new landscape will be those who combine technological innovation with pedagogical expertise, creating learning experiences that are both engaging and effective.`;

    return {
      title: 'The Future of Digital Learning: Transforming Education Through Technology',
      fullContent: mockContent,
      metadata: {
        author: 'Dr. Sarah Johnson',
        publishDate: '2024-01-10',
        domain: new URL(url).hostname
      },
      analysis: analyzeContent(mockContent, 'url')
    };
  };

  const processPDFContent = async (fileName: string) => {
    // Simulate PDF text extraction
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockPDFContent = `# Cognitive Load Theory in Educational Design
    
    ## Abstract
    
    This research paper examines the application of Cognitive Load Theory (CLT) in educational design, with particular focus on digital learning environments. We present empirical evidence demonstrating how understanding cognitive load can significantly improve learning outcomes and student engagement.
    
    ## Introduction
    
    Cognitive Load Theory, developed by John Sweller in the 1980s, provides a framework for understanding how the human cognitive system processes information during learning. The theory is based on the premise that human working memory has limited capacity, and instructional design should account for these limitations to optimize learning.
    
    ## Theoretical Framework
    
    ### Types of Cognitive Load
    
    CLT identifies three types of cognitive load:
    
    1. **Intrinsic Load**: The inherent difficulty of the material being learned
    2. **Extraneous Load**: Load imposed by poor instructional design
    3. **Germane Load**: Load devoted to processing and constructing schemas
    
    ### Working Memory Limitations
    
    Miller's (1956) research established that working memory can hold approximately 7±2 items simultaneously. However, more recent research by Cowan (2001) suggests the actual capacity may be closer to 4±1 chunks of information.
    
    ## Methodology
    
    Our study involved 240 undergraduate students across three experimental conditions:
    - Control group: Traditional lecture format
    - Experimental group 1: CLT-informed multimedia instruction
    - Experimental group 2: CLT-informed with worked examples
    
    ## Key Findings
    
    ### 1. Multimedia Principle
    
    Students who received instruction combining visual and auditory information showed 23% better performance on transfer tasks compared to text-only instruction. This supports Mayer's multimedia principle and demonstrates the effectiveness of dual-channel processing.
    
    ### 2. Worked Example Effect
    
    Novice learners who studied worked examples before attempting practice problems showed:
    - 35% reduction in time to solution
    - 28% improvement in problem-solving accuracy
    - Significantly lower reported cognitive load ratings
    
    ### 3. Split-Attention Effect
    
    When related visual and textual information was spatially separated, students showed:
    - Increased eye movement patterns
    - Higher cognitive load ratings
    - 19% decrease in comprehension scores
    
    ## Practical Applications
    
    ### Instructional Design Guidelines
    
    Based on our findings, we recommend:
    
    1. **Eliminate Redundancy**: Avoid presenting identical information in multiple formats simultaneously
    2. **Use Progressive Disclosure**: Introduce complex concepts gradually
    3. **Provide Worked Examples**: Especially beneficial for novice learners
    4. **Integrate Related Information**: Keep related visual and textual elements close together
    5. **Consider Prior Knowledge**: Adjust cognitive load management strategies based on learner expertise
    
    ### Digital Learning Implications
    
    In digital environments, CLT principles suggest:
    - Chunking content into digestible segments
    - Using interactive elements to manage intrinsic load
    - Providing scaffolding that can be gradually removed
    - Implementing adaptive systems that adjust to individual cognitive capacity
    
    ## Limitations and Future Research
    
    While our study provides valuable insights, several limitations should be noted:
    - Sample limited to undergraduate population
    - Focus on STEM subjects may limit generalizability
    - Individual differences in cognitive capacity not fully explored
    
    Future research should investigate:
    - Cultural variations in cognitive load processing
    - Long-term retention effects of CLT-informed instruction
    - Application to emerging technologies like VR/AR
    
    ## Conclusion
    
    Cognitive Load Theory provides a robust framework for designing effective educational experiences. By understanding and managing the cognitive demands placed on learners, educators can create more efficient and engaging learning environments.
    
    The evidence presented demonstrates that thoughtful application of CLT principles can lead to significant improvements in learning outcomes, particularly in complex domains requiring integration of multiple information sources.
    
    As educational technology continues to evolve, CLT will remain a crucial consideration for designers seeking to optimize human learning potential.
    
    ## References
    
    Cowan, N. (2001). The magical number 4 in short-term memory. Behavioral and Brain Sciences, 24(1), 87-114.
    
    Mayer, R. E. (2009). Multimedia learning (2nd ed.). Cambridge University Press.
    
    Miller, G. A. (1956). The magical number seven, plus or minus two. Psychological Review, 63(2), 81-97.
    
    Sweller, J. (1988). Cognitive load during problem solving. Cognitive Science, 12(2), 257-285.`;

    return {
      title: fileName.replace('.pdf', ''),
      fullContent: mockPDFContent,
      metadata: {
        author: 'Dr. Michael Chen, Prof. Lisa Rodriguez',
        publishDate: '2024-01-05'
      },
      analysis: analyzeContent(mockPDFContent, 'pdf')
    };
  };

  const processTextContent = async (content: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      title: 'User Provided Text Content',
      fullContent: content,
      analysis: analyzeContent(content, 'text')
    };
  };

  const analyzeContent = (content: string, type: string) => {
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed
    
    // Extract key concepts (simplified - in real implementation, use NLP)
    const concepts = extractConcepts(content);
    const keyPoints = extractKeyPoints(content);
    const summary = generateSummary(content);
    const difficulty = assessDifficulty(content);
    
    return {
      keyPoints,
      summary,
      concepts,
      difficulty,
      readingTime,
      wordCount,
      fullContent: content
    };
  };

  const extractConcepts = (content: string): string[] => {
    // Simplified concept extraction - in real implementation, use NLP libraries
    const concepts = [];
    if (content.toLowerCase().includes('machine learning')) concepts.push('Machine Learning');
    if (content.toLowerCase().includes('artificial intelligence')) concepts.push('Artificial Intelligence');
    if (content.toLowerCase().includes('cognitive load')) concepts.push('Cognitive Load Theory');
    if (content.toLowerCase().includes('digital learning')) concepts.push('Digital Learning');
    if (content.toLowerCase().includes('personalized learning')) concepts.push('Personalized Learning');
    if (content.toLowerCase().includes('neural network')) concepts.push('Neural Networks');
    if (content.toLowerCase().includes('algorithm')) concepts.push('Algorithms');
    if (content.toLowerCase().includes('data')) concepts.push('Data Science');
    
    return concepts.length > 0 ? concepts : ['General Knowledge', 'Educational Content', 'Learning Theory'];
  };

  const extractKeyPoints = (content: string): string[] => {
    // Simplified key point extraction
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const keyPoints = [];
    
    // Look for sentences with key indicators
    sentences.forEach(sentence => {
      if (sentence.toLowerCase().includes('important') || 
          sentence.toLowerCase().includes('key') ||
          sentence.toLowerCase().includes('crucial') ||
          sentence.toLowerCase().includes('significant') ||
          sentence.toLowerCase().includes('research shows') ||
          sentence.toLowerCase().includes('studies indicate')) {
        keyPoints.push(sentence.trim());
      }
    });
    
    // If no key indicators found, take first few substantial sentences
    if (keyPoints.length === 0) {
      keyPoints.push(...sentences.slice(0, 3).map(s => s.trim()));
    }
    
    return keyPoints.slice(0, 5); // Limit to 5 key points
  };

  const generateSummary = (content: string): string => {
    // Simplified summary generation
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const firstSentence = sentences[0]?.trim() || '';
    const wordCount = content.split(/\s+/).length;
    
    if (content.toLowerCase().includes('machine learning')) {
      return `This content covers machine learning fundamentals, including key algorithms, methodologies, and practical applications. The material explores supervised and unsupervised learning approaches with approximately ${wordCount} words of detailed explanation.`;
    } else if (content.toLowerCase().includes('cognitive load')) {
      return `This academic content examines cognitive load theory and its applications in educational design. It presents research findings and practical guidelines for optimizing learning experiences based on human cognitive limitations.`;
    } else if (content.toLowerCase().includes('digital learning')) {
      return `This content analyzes the transformation of education through digital technologies, covering trends like personalized learning, AI-powered systems, and immersive technologies while addressing challenges and future opportunities.`;
    }
    
    return `${firstSentence} This comprehensive content provides detailed insights and analysis across ${wordCount} words, offering valuable knowledge for learners and researchers.`;
  };

  const assessDifficulty = (content: string): 'beginner' | 'intermediate' | 'advanced' => {
    const technicalTerms = ['algorithm', 'methodology', 'empirical', 'theoretical', 'hypothesis', 'paradigm', 'framework'];
    const advancedTerms = ['epistemological', 'ontological', 'phenomenological', 'heuristic', 'stochastic'];
    
    const technicalCount = technicalTerms.filter(term => 
      content.toLowerCase().includes(term)
    ).length;
    
    const advancedCount = advancedTerms.filter(term => 
      content.toLowerCase().includes(term)
    ).length;
    
    if (advancedCount > 2 || technicalCount > 5) return 'advanced';
    if (technicalCount > 2) return 'intermediate';
    return 'beginner';
  };

  const extractYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const addSource = async (type: ContentSource['type'], content: string, title?: string) => {
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
      const processedData = await processContent(type, content);
      
      // Update with completed analysis
      setSources(prev => prev.map(s => 
        s.id === newSource.id ? { 
          ...s, 
          status: 'completed',
          title: processedData.title || s.title,
          analysis: {
            ...processedData.analysis,
            transcript: processedData.transcript,
            fullContent: processedData.fullContent,
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
      addSource('pdf', file.name, file.name);
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
              <input
                type={activeInput === 'text' ? 'textarea' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputOptions.find(o => o.id === activeInput)?.placeholder}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
              />
              <button
                onClick={handleInputSubmit}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
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
                          {source.analysis.wordCount.toLocaleString()} words • {source.analysis.readingTime}min read
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