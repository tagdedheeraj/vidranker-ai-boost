
import { useState } from 'react';
import { Image, Wand2, Download, Loader2, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { imageGenerationService, GeneratedThumbnail } from '../services/imageGenerationService';
import { localStorage } from '../utils/localStorage';
import { toast } from 'sonner';

export const ThumbnailGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [thumbnail, setThumbnail] = useState<GeneratedThumbnail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a thumbnail description');
      return;
    }

    setIsLoading(true);
    
    try {
      const generated = await imageGenerationService.generateThumbnail({
        prompt: prompt.trim(),
        size: '1280x720'
      });
      
      setThumbnail(generated);
      localStorage.saveThumbnail(generated);
      
      toast.success(`Thumbnail generated using ${generated.source === 'ai' ? 'AI' : 'canvas'} generator!`);
    } catch (error) {
      console.error('Failed to generate thumbnail:', error);
      toast.error('Failed to generate thumbnail. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!thumbnail) return;
    
    const link = document.createElement('a');
    link.href = thumbnail.url;
    link.download = `vidranker-thumbnail-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Thumbnail downloaded!');
  };

  const examplePrompts = [
    'Bold red text "SHOCKING RESULTS" with money background',
    'Gaming setup with neon lights and "EPIC GAMEPLAY"',
    'Cooking scene with "EASY RECIPE" in yellow letters',
    'Fitness transformation with "30 DAY CHALLENGE"',
    'Tech review with "WORTH IT?" in large text'
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {/* Header */}
      <div className="card-glass text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Image className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold mb-2">Thumbnail Generator</h1>
        <p className="text-sm text-muted-foreground">
          Create eye-catching YouTube thumbnails with AI
        </p>
      </div>

      {/* Input Section */}
      <div className="card-glass">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Palette className="h-5 w-5 text-purple-400" />
          Thumbnail Description
        </h2>
        
        <div className="space-y-4">
          <Input
            placeholder="Describe your thumbnail (e.g., 'Bold text saying AMAZING with bright background')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="input-glass"
            disabled={isLoading}
          />
          
          <Button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="btn-hero w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Thumbnail...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Thumbnail
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Example Prompts */}
      <div className="card-glass">
        <h3 className="font-semibold mb-3">Example Prompts</h3>
        <div className="space-y-2">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="w-full text-left glass p-3 rounded-lg hover:bg-primary/10 transition-colors text-sm"
              disabled={isLoading}
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>

      {/* Generated Thumbnail */}
      {thumbnail && (
        <div className="card-glass">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Generated Thumbnail</h3>
            <div className="flex items-center gap-2">
              <span className="glass px-2 py-1 rounded text-xs">
                {thumbnail.source === 'ai' ? '🤖 AI Generated' : '🎨 Canvas Created'}
              </span>
              <Button
                onClick={handleDownload}
                size="sm"
                className="btn-secondary"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={thumbnail.url}
              alt="Generated thumbnail"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div className="mt-3 glass p-3 rounded-lg">
            <p className="text-sm font-medium mb-1">Prompt:</p>
            <p className="text-xs text-muted-foreground">{thumbnail.prompt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailGenerator;
