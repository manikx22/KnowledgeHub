import { YoutubeTranscript } from 'youtube-transcript';

export interface ProcessedContent {
  title: string;
  content: string;
  metadata: {
    author?: string;
    publishDate?: string;
    duration?: string;
    domain?: string;
    wordCount: number;
  };
  analysis: ContentAnalysis;
}

export interface ContentAnalysis {
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
  credibilityScore: number;
  quotes: {
    text: string;
    context: string;
  }[];
}

class ContentProcessor {
  async processYouTubeVideo(url: string): Promise<ProcessedContent> {
    try {
      const videoId = this.extractYouTubeVideoId(url);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      // For now, we'll simulate YouTube processing since YoutubeTranscript requires server-side
      // In production, this would be handled by a backend service
      const mockTranscript = this.generateMockYouTubeTranscript(url, videoId);
      
      // Try to get video metadata using YouTube oEmbed API
      let title = 'YouTube Video';
      let author = 'YouTube Creator';
      
      try {
        const oembedResponse = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
        if (oembedResponse.ok) {
          const oembedData = await oembedResponse.json();
          title = oembedData.title || title;
          author = oembedData.author_name || author;
        }
      } catch (error) {
        console.warn('Could not fetch YouTube metadata, using defaults');
      }
      
      return {
        title,
        content: mockTranscript,
        metadata: {
          author,
          domain: 'youtube.com',
          wordCount: mockTranscript.split(/\s+/).length,
          duration: '15:30'
        },
        analysis: await this.analyzeContent(mockTranscript, title, 'youtube')
      };
    } catch (error) {
      console.error('YouTube processing error:', error);
      throw new Error('Failed to process YouTube video. Please check the URL and try again.');
    }
  }

  async processWebContent(url: string): Promise<ProcessedContent> {
    try {
      // Use a CORS proxy for web scraping
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (!data.contents) {
        throw new Error('Failed to fetch web content');
      }

      const html = data.contents;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Extract title
      const title = doc.querySelector('title')?.textContent || 
                   doc.querySelector('h1')?.textContent || 
                   'Web Article';
      
      // Extract main content
      const contentSelectors = [
        'article',
        '[role="main"]',
        '.content',
        '.post-content',
        '.entry-content',
        'main',
        '.article-body'
      ];
      
      let mainContent = '';
      for (const selector of contentSelectors) {
        const element = doc.querySelector(selector);
        if (element) {
          mainContent = element.textContent || '';
          break;
        }
      }
      
      // Fallback to body content if no main content found
      if (!mainContent) {
        const bodyElement = doc.querySelector('body');
        mainContent = bodyElement?.textContent || '';
      }
      
      // Clean up the content
      const cleanContent = mainContent
        .replace(/\s+/g, ' ')
        .replace(/\n+/g, '\n')
        .trim();
      
      // Extract metadata
      const author = doc.querySelector('meta[name="author"]')?.getAttribute('content') ||
                    doc.querySelector('[rel="author"]')?.textContent ||
                    'Unknown';
      
      const publishDate = doc.querySelector('meta[property="article:published_time"]')?.getAttribute('content') ||
                         doc.querySelector('time')?.getAttribute('datetime') ||
                         doc.querySelector('.date')?.textContent;
      
      return {
        title: title.trim(),
        content: cleanContent,
        metadata: {
          author: author.trim(),
          publishDate,
          domain: new URL(url).hostname,
          wordCount: cleanContent.split(/\s+/).length
        },
        analysis: await this.analyzeContent(cleanContent, title, 'web')
      };
    } catch (error) {
      console.error('Web content processing error:', error);
      throw new Error('Failed to process web content. Please check the URL and try again.');
    }
  }

  async processPDFContent(file: File): Promise<ProcessedContent> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // For now, we'll simulate PDF processing since pdf-parse requires Node.js
      // In a real implementation, you'd send this to a backend service
      const mockContent = `PDF Content from ${file.name}
      
This is a simulated extraction from the PDF file. In a production environment, this would contain the actual extracted text from the PDF document using libraries like pdf-parse or PDF.js.

The content would include all the text, maintaining paragraph structure and extracting any readable text from the document. This might include:

- Academic papers with abstracts, methodology, and conclusions
- Research documents with data and analysis
- Educational materials with structured learning content
- Technical documentation with procedures and guidelines

The extraction process would preserve the logical flow of information while making it searchable and analyzable for the AI processing pipeline.`;

      const title = file.name.replace('.pdf', '');
      
      return {
        title,
        content: mockContent,
        metadata: {
          author: 'PDF Document',
          domain: 'local',
          wordCount: mockContent.split(/\s+/).length
        },
        analysis: await this.analyzeContent(mockContent, title, 'pdf')
      };
    } catch (error) {
      console.error('PDF processing error:', error);
      throw new Error('Failed to process PDF file. Please try again.');
    }
  }

  async processTextContent(text: string, title?: string): Promise<ProcessedContent> {
    const contentTitle = title || 'Text Content';
    
    return {
      title: contentTitle,
      content: text,
      metadata: {
        author: 'User Input',
        domain: 'text',
        wordCount: text.split(/\s+/).length
      },
      analysis: await this.analyzeContent(text, contentTitle, 'text')
    };
  }

  private async analyzeContent(content: string, title: string, type: string): Promise<ContentAnalysis> {
    // Simulate AI analysis - in production, this would call actual AI services
    const words = content.split(/\s+/);
    const wordCount = words.length;
    const readingTime = Math.ceil(wordCount / 200);
    
    // Extract key concepts
    const concepts = this.extractConcepts(content);
    
    // Generate insights
    const keyInsights = this.extractKeyInsights(content);
    
    // Create detailed notes
    const detailedNotes = this.createDetailedNotes(content);
    
    // Generate summary
    const executiveSummary = this.generateExecutiveSummary(content, title, type);
    
    // Extract actionable items
    const actionableItems = this.extractActionableItems(content);
    
    // Find connections
    const connections = this.findConnections(content);
    
    // Assess difficulty
    const difficulty = this.assessDifficulty(content);
    
    // Calculate credibility score
    const credibilityScore = this.calculateCredibilityScore(content, type);
    
    // Extract quotes
    const quotes = this.extractQuotes(content);
    
    return {
      executiveSummary,
      keyInsights,
      detailedNotes,
      concepts,
      actionableItems,
      connections,
      difficulty,
      readingTime,
      credibilityScore,
      quotes
    };
  }

  private extractYouTubeVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /(?:youtu\.be\/)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
      /(?:youtube\.com\/v\/)([^&\n?#]+)/,
      /(?:youtube\.com\/watch\?.*v=)([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  }

  private generateMockYouTubeTranscript(url: string, videoId: string): string {
    return `Welcome to this comprehensive tutorial on the topic covered in this video.

In today's session, we'll be exploring key concepts and practical applications that will help you understand this subject better.

Let me start by introducing the fundamental principles. The first important concept we need to understand is how these systems work in practice.

Research shows that when we apply these methodologies correctly, we can achieve significant improvements in our understanding and application of the material.

Here are the key points we'll cover:
1. Understanding the basic framework and its applications
2. Practical implementation strategies and best practices
3. Common challenges and how to overcome them
4. Advanced techniques for optimization
5. Real-world examples and case studies

The methodology we're discussing has been proven effective in numerous studies and practical applications. Evidence suggests that following these guidelines can lead to substantial improvements.

One crucial element to remember is the importance of consistent practice and application. The key factor in success is understanding how to implement these concepts in your specific context.

Let's dive deeper into the practical aspects. When implementing these strategies, it's important to note that results may vary based on individual circumstances and requirements.

The significant impact of this approach becomes clear when we examine the data and feedback from users who have successfully applied these methods.

In conclusion, the proven effective techniques we've discussed today demonstrate that with proper understanding and implementation, you can achieve your learning objectives.

Thank you for watching this tutorial. Make sure to practice these concepts and apply them to your own projects for the best results.`;
  }

  private extractConcepts(content: string): ContentAnalysis['concepts'] {
    const lowerContent = content.toLowerCase();
    const concepts: ContentAnalysis['concepts'] = [];
    
    const conceptMap = {
      'machine learning': {
        definition: 'A subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed.',
        examples: ['Supervised learning', 'Neural networks', 'Decision trees']
      },
      'artificial intelligence': {
        definition: 'The simulation of human intelligence in machines that are programmed to think and learn.',
        examples: ['Natural language processing', 'Computer vision', 'Expert systems']
      },
      'data science': {
        definition: 'An interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge from data.',
        examples: ['Statistical analysis', 'Data visualization', 'Predictive modeling']
      },
      'cognitive load': {
        definition: 'The amount of mental effort being used in working memory during learning.',
        examples: ['Intrinsic load', 'Extraneous load', 'Germane load']
      },
      'digital learning': {
        definition: 'The use of digital technologies to facilitate and enhance the learning process.',
        examples: ['E-learning platforms', 'Virtual classrooms', 'Interactive simulations']
      }
    };
    
    Object.entries(conceptMap).forEach(([key, value]) => {
      if (lowerContent.includes(key)) {
        concepts.push({
          name: key.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          definition: value.definition,
          examples: value.examples
        });
      }
    });
    
    return concepts.length > 0 ? concepts : [{
      name: 'General Knowledge',
      definition: 'Broad-based information and understanding across various topics.',
      examples: ['Educational content', 'Informational material', 'Learning resources']
    }];
  }

  private extractKeyInsights(content: string): string[] {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 30);
    const insights: string[] = [];
    
    // Look for sentences with insight indicators
    const insightIndicators = [
      'research shows', 'studies indicate', 'evidence suggests', 'findings reveal',
      'important to note', 'key factor', 'crucial element', 'significant impact',
      'proven effective', 'demonstrates that', 'results show'
    ];
    
    sentences.forEach(sentence => {
      const lowerSentence = sentence.toLowerCase();
      if (insightIndicators.some(indicator => lowerSentence.includes(indicator))) {
        insights.push(sentence.trim());
      }
    });
    
    // If no specific insights found, extract first few substantial sentences
    if (insights.length === 0) {
      insights.push(...sentences.slice(0, 5).map(s => s.trim()));
    }
    
    return insights.slice(0, 6);
  }

  private createDetailedNotes(content: string): ContentAnalysis['detailedNotes'] {
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 50);
    const notes: ContentAnalysis['detailedNotes'] = [];
    
    paragraphs.slice(0, 8).forEach((paragraph, index) => {
      const trimmed = paragraph.trim();
      const firstSentence = trimmed.split(/[.!?]/)[0];
      const section = firstSentence.length > 50 ? 
        firstSentence.substring(0, 50) + '...' : 
        firstSentence || `Section ${index + 1}`;
      
      // Determine importance based on content
      let importance: 'high' | 'medium' | 'low' = 'medium';
      const lowerParagraph = trimmed.toLowerCase();
      
      if (lowerParagraph.includes('important') || 
          lowerParagraph.includes('crucial') || 
          lowerParagraph.includes('key') ||
          lowerParagraph.includes('significant')) {
        importance = 'high';
      } else if (lowerParagraph.includes('example') || 
                 lowerParagraph.includes('detail') ||
                 lowerParagraph.includes('additional')) {
        importance = 'low';
      }
      
      notes.push({
        section: section.replace(/[#*]/g, '').trim(),
        content: trimmed,
        importance
      });
    });
    
    return notes;
  }

  private generateExecutiveSummary(content: string, title: string, type: string): string {
    const wordCount = content.split(/\s+/).length;
    const firstParagraph = content.split(/\n\s*\n/)[0]?.trim() || '';
    const firstSentence = firstParagraph.split(/[.!?]/)[0]?.trim() || '';
    
    const typeDescriptions = {
      youtube: 'video content',
      web: 'article',
      pdf: 'document',
      text: 'content'
    };
    
    return `This ${typeDescriptions[type as keyof typeof typeDescriptions] || 'resource'} "${title}" provides comprehensive insights across ${wordCount.toLocaleString()} words. ${firstSentence} The material covers essential concepts and practical applications, offering valuable knowledge for learners and researchers seeking to understand the topic in depth.`;
  }

  private extractActionableItems(content: string): string[] {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const actionableItems: string[] = [];
    
    const actionIndicators = [
      'should', 'must', 'need to', 'important to', 'recommend', 'suggest',
      'consider', 'ensure', 'implement', 'practice', 'apply', 'use',
      'start', 'begin', 'focus on', 'prioritize'
    ];
    
    sentences.forEach(sentence => {
      const lowerSentence = sentence.toLowerCase();
      if (actionIndicators.some(indicator => lowerSentence.includes(indicator))) {
        actionableItems.push(sentence.trim());
      }
    });
    
    return actionableItems.slice(0, 5);
  }

  private findConnections(content: string): string[] {
    const connections: string[] = [];
    const lowerContent = content.toLowerCase();
    
    const connectionMap = {
      'machine learning': 'Connects to statistics, computer science, and data analysis',
      'education': 'Links to psychology, cognitive science, and instructional design',
      'technology': 'Relates to innovation, digital transformation, and user experience',
      'research': 'Connects to methodology, analysis, and evidence-based practice',
      'data': 'Links to analytics, visualization, and decision-making processes'
    };
    
    Object.entries(connectionMap).forEach(([key, connection]) => {
      if (lowerContent.includes(key)) {
        connections.push(connection);
      }
    });
    
    return connections.length > 0 ? connections : [
      'Relates to general knowledge and educational content',
      'Connects to learning theory and information processing'
    ];
  }

  private assessDifficulty(content: string): 'beginner' | 'intermediate' | 'advanced' {
    const lowerContent = content.toLowerCase();
    
    const advancedTerms = [
      'methodology', 'paradigm', 'epistemological', 'heuristic', 'stochastic',
      'algorithm', 'optimization', 'regression', 'correlation', 'statistical'
    ];
    
    const intermediateTerms = [
      'analysis', 'framework', 'concept', 'theory', 'principle',
      'implementation', 'evaluation', 'assessment', 'systematic'
    ];
    
    const advancedCount = advancedTerms.filter(term => lowerContent.includes(term)).length;
    const intermediateCount = intermediateTerms.filter(term => lowerContent.includes(term)).length;
    
    if (advancedCount >= 3) return 'advanced';
    if (intermediateCount >= 3 || advancedCount >= 1) return 'intermediate';
    return 'beginner';
  }

  private calculateCredibilityScore(content: string, type: string): number {
    let score = 50; // Base score
    
    const lowerContent = content.toLowerCase();
    
    // Positive indicators
    if (lowerContent.includes('research') || lowerContent.includes('study')) score += 15;
    if (lowerContent.includes('university') || lowerContent.includes('academic')) score += 10;
    if (lowerContent.includes('peer-reviewed') || lowerContent.includes('journal')) score += 20;
    if (lowerContent.includes('data') || lowerContent.includes('evidence')) score += 10;
    if (lowerContent.includes('reference') || lowerContent.includes('citation')) score += 10;
    
    // Type-based adjustments
    if (type === 'pdf') score += 15; // PDFs often more credible
    if (type === 'youtube') score -= 5; // Videos can be less formal
    
    // Content quality indicators
    const wordCount = content.split(/\s+/).length;
    if (wordCount > 1000) score += 5;
    if (wordCount > 3000) score += 5;
    
    return Math.min(Math.max(score, 0), 100);
  }

  private extractQuotes(content: string): ContentAnalysis['quotes'] {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 30);
    const quotes: ContentAnalysis['quotes'] = [];
    
    // Look for impactful sentences
    const impactIndicators = [
      'important', 'crucial', 'significant', 'key', 'essential',
      'fundamental', 'critical', 'vital', 'paramount'
    ];
    
    sentences.forEach((sentence, index) => {
      const trimmed = sentence.trim();
      const lowerSentence = trimmed.toLowerCase();
      
      if (impactIndicators.some(indicator => lowerSentence.includes(indicator)) && 
          trimmed.length > 50 && trimmed.length < 200) {
        quotes.push({
          text: trimmed,
          context: `Section ${Math.floor(index / 5) + 1} of the content`
        });
      }
    });
    
    return quotes.slice(0, 3);
  }
}

export const contentProcessor = new ContentProcessor();