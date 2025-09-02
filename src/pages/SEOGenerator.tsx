
import { useState } from 'react';
import { FileText, Copy, Loader2, CheckCircle, Wand2, Tag, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cohereApi, SEOContent } from '../services/cohereApiService';
import { localStorage } from '../utils/localStorage';
import { BannerAd } from '@/components/ads/BannerAd';
import { useAds } from '@/hooks/useAds';
import { toast } from 'sonner';

export const SEOGenerator = () => {
  const [topic, setTopic] = useState('');
  const [seoContent, setSeoContent] = useState<SEOContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  
  const { showInterstitialOnAction } = useAds();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a video topic');
      return;
    }

    setIsLoading(true);
    
    try {
      // Show interstitial ad before generation
      console.log('🎯 Showing interstitial ad before SEO generation');
      await showInterstitialOnAction('seo_content_generation');
      
      const content = await cohereApi.generateCompleteSEO(topic);
      setSeoContent(content);
      
      // Save to history
      localStorage.saveSEOContent(content);
      
      toast.success('SEO content generated successfully!');
    } catch (error) {
      console.error('Failed to generate SEO content:', error);
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      toast.success(`${type} copied to clipboard!`);
      
      // Show interstitial ad on copy action
      await showInterstitialOnAction(`copy_${type.toLowerCase()}`);
      
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  const CopyButton = ({ text, type }: { text: string; type: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleCopy(text, type)}
      className="h-8 w-8 p-0 hover:bg-primary/20"
    >
      {copiedItem === type ? (
        <CheckCircle className="h-4 w-4 text-green-400" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="flex-1 p-4 space-y-6">
        {/* Header */}
        <div className="card-glass text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold mb-2">SEO Content Generator</h1>
          <p className="text-sm text-muted-foreground">
            Generate YouTube titles, descriptions, tags, and hashtags with AI
          </p>
        </div>

        {/* Input Section */}
        <div className="card-glass">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Video Topic
          </h2>
          
          <div className="space-y-4">
            <Input
              placeholder="Enter your video topic (e.g., 'How to make perfect coffee')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="input-glass"
              disabled={isLoading}
            />
            
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !topic.trim()}
              className="btn-hero w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating SEO Content...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate SEO Content
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Generated Content */}
        {seoContent && (
          <div className="space-y-4">
            {/* Title */}
            <div className="card-glass">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  SEO Title
                </h3>
                <CopyButton text={seoContent.title} type="Title" />
              </div>
              <div className="glass p-3 rounded-lg">
                <p className="text-sm font-medium">{seoContent.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {seoContent.title.length}/60 characters
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="card-glass">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-secondary" />
                  Description
                </h3>
                <CopyButton text={seoContent.description} type="Description" />
              </div>
              <div className="glass p-3 rounded-lg">
                <Textarea
                  value={seoContent.description}
                  readOnly
                  className="min-h-[120px] bg-transparent border-0 p-0 text-sm resize-none"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="card-glass">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Tag className="h-4 w-4 text-green-400" />
                  Tags ({seoContent.tags.length})
                </h3>
                <CopyButton text={seoContent.tags.join(', ')} type="Tags" />
              </div>
              <div className="flex flex-wrap gap-2">
                {seoContent.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="glass px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Hashtags */}
            <div className="card-glass">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Hash className="h-4 w-4 text-purple-400" />
                  Hashtags ({seoContent.hashtags.length})
                </h3>
                <CopyButton text={seoContent.hashtags.join(' ')} type="Hashtags" />
              </div>
              <div className="flex flex-wrap gap-2">
                {seoContent.hashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="glass px-3 py-1 rounded-full text-xs font-medium text-purple-400"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Banner Ad at bottom */}
      <BannerAd className="mx-4 mb-4" />
    </div>
  );
};

export default SEOGenerator;
