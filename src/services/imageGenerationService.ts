
export interface ThumbnailRequest {
  prompt: string;
  style?: string;
  size?: '1280x720' | '1920x1080';
}

export interface GeneratedThumbnail {
  id: string;
  url: string;
  prompt: string;
  timestamp: string;
  source: 'ai' | 'canvas';
}

export class ImageGenerationService {
  
  async generateThumbnail(request: ThumbnailRequest): Promise<GeneratedThumbnail> {
    console.log('Generating thumbnail:', request);
    
    try {
      // Try AI generation first
      return await this.tryAIGeneration(request);
    } catch (error) {
      console.log('AI generation failed, falling back to canvas:', error);
      return await this.generateCanvasThumbnail(request);
    }
  }

  private async tryAIGeneration(request: ThumbnailRequest): Promise<GeneratedThumbnail> {
    // This would integrate with an AI image service like DALL-E, Midjourney, or Stable Diffusion
    // For now, we'll simulate the process
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    
    // Simulate random failure for demonstration
    if (Math.random() > 0.7) {
      throw new Error('AI service unavailable');
    }
    
    // In a real implementation, this would return the actual AI-generated image
    const mockImageUrl = `https://picsum.photos/1280/720?random=${Date.now()}`;
    
    return {
      id: crypto.randomUUID(),
      url: mockImageUrl,
      prompt: request.prompt,
      timestamp: new Date().toISOString(),
      source: 'ai'
    };
  }

  private async generateCanvasThumbnail(request: ThumbnailRequest): Promise<GeneratedThumbnail> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas not supported');
    }

    // Set canvas size
    canvas.width = 1280;
    canvas.height = 720;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(1, '#8b5cf6');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Word wrap for long text
    const maxWidth = canvas.width - 100;
    const words = request.prompt.split(' ');
    let line = '';
    let y = canvas.height / 2;
    const lineHeight = 60;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Add decorative elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 5 + 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Convert to blob and create URL
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          resolve({
            id: crypto.randomUUID(),
            url,
            prompt: request.prompt,
            timestamp: new Date().toISOString(),
            source: 'canvas'
          });
        }
      }, 'image/png');
    });
  }
}

export const imageGenerationService = new ImageGenerationService();
