
const COHERE_API_KEY = "ncULg8P8w61vVciZ1pFoGc4VoQ2yQTzTUS6Lijdx";
const COHERE_API_URL = "https://api.cohere.ai/v1/generate";

export interface SEOContent {
  title: string;
  description: string;
  tags: string[];
  hashtags: string[];
  timestamp: string;
  topic: string;
}

export class CohereApiService {
  private async makeRequest(prompt: string, maxTokens: number = 200): Promise<string> {
    try {
      const response = await fetch(COHERE_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'command',
          prompt: prompt,
          max_tokens: maxTokens,
          temperature: 0.7,
          k: 0,
          stop_sequences: [],
          return_likelihoods: 'NONE'
        })
      });

      if (!response.ok) {
        throw new Error(`Cohere API error: ${response.status}`);
      }

      const data = await response.json();
      return data.generations[0].text.trim();
    } catch (error) {
      console.error('Cohere API request failed:', error);
      throw error;
    }
  }

  async generateSEOTitle(topic: string): Promise<string> {
    const prompt = `Generate a catchy YouTube video title for the topic: "${topic}". The title should be under 60 characters, engaging, and SEO-friendly. Only return the title, nothing else.`;
    
    try {
      const result = await this.makeRequest(prompt, 60);
      return result.replace(/['"]/g, '').substring(0, 60);
    } catch (error) {
      return this.getFallbackTitle(topic);
    }
  }

  async generateSEODescription(topic: string): Promise<string> {
    const prompt = `Write a compelling YouTube video description for: "${topic}". Include relevant keywords, call-to-action, and emojis. Keep it between 200-300 words. Only return the description.`;
    
    try {
      const result = await this.makeRequest(prompt, 400);
      return result;
    } catch (error) {
      return this.getFallbackDescription(topic);
    }
  }

  async generateTags(topic: string): Promise<string[]> {
    const prompt = `Generate 15 relevant YouTube tags for the video topic: "${topic}". Return only the tags separated by commas, no numbering or extra text.`;
    
    try {
      const result = await this.makeRequest(prompt, 200);
      return result.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0).slice(0, 15);
    } catch (error) {
      return this.getFallbackTags(topic);
    }
  }

  async generateHashtags(topic: string): Promise<string[]> {
    const prompt = `Generate 10 trending hashtags for YouTube video about: "${topic}". Return only hashtags with # symbol, separated by commas.`;
    
    try {
      const result = await this.makeRequest(prompt, 150);
      return result.split(',').map(tag => tag.trim().replace(/^#?/, '#')).filter(tag => tag.length > 1).slice(0, 10);
    } catch (error) {
      return this.getFallbackHashtags(topic);
    }
  }

  async generateCompleteSEO(topic: string): Promise<SEOContent> {
    console.log('Generating SEO content for:', topic);
    
    try {
      const [title, description, tags, hashtags] = await Promise.all([
        this.generateSEOTitle(topic),
        this.generateSEODescription(topic),
        this.generateTags(topic),
        this.generateHashtags(topic)
      ]);

      return {
        title,
        description,
        tags,
        hashtags,
        timestamp: new Date().toISOString(),
        topic
      };
    } catch (error) {
      console.error('Failed to generate complete SEO content:', error);
      return this.getFallbackSEOContent(topic);
    }
  }

  private getFallbackTitle(topic: string): string {
    return `${topic} - Complete Guide 2024`;
  }

  private getFallbackDescription(topic: string): string {
    return `🔥 Ultimate guide to ${topic}! In this video, we'll cover everything you need to know about ${topic}. 

🎯 What you'll learn:
✅ Complete ${topic} overview
✅ Pro tips and tricks  
✅ Common mistakes to avoid
✅ Step-by-step guidance

📌 Don't forget to LIKE, SUBSCRIBE, and hit the BELL icon for more amazing content!

#${topic.replace(/\s+/g, '')} #YouTube #Tutorial`;
  }

  private getFallbackTags(topic: string): string[] {
    const baseTags = [topic, 'tutorial', 'guide', 'tips', 'tricks', 'how to', '2024', 'beginner', 'expert', 'youtube'];
    return baseTags.slice(0, 15);
  }

  private getFallbackHashtags(topic: string): string[] {
    return [`#${topic.replace(/\s+/g, '')}`, '#YouTube', '#Tutorial', '#Guide', '#Tips', '#2024', '#Content', '#Creator', '#Success', '#Growth'];
  }

  private getFallbackSEOContent(topic: string): SEOContent {
    return {
      title: this.getFallbackTitle(topic),
      description: this.getFallbackDescription(topic),
      tags: this.getFallbackTags(topic),
      hashtags: this.getFallbackHashtags(topic),
      timestamp: new Date().toISOString(),
      topic
    };
  }
}

export const cohereApi = new CohereApiService();
