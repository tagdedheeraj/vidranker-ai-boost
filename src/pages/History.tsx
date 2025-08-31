
import { useState, useEffect } from 'react';
import { History as HistoryIcon, FileText, Image, Copy, Trash2, Download, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { localStorage } from '../utils/localStorage';
import { SEOContent } from '../services/cohereApiService';
import { GeneratedThumbnail } from '../services/imageGenerationService';
import { toast } from 'sonner';

export const History = () => {
  const [seoHistory, setSeoHistory] = useState<SEOContent[]>([]);
  const [thumbnailHistory, setThumbnailHistory] = useState<GeneratedThumbnail[]>([]);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setSeoHistory(localStorage.getSEOHistory());
    setThumbnailHistory(localStorage.getThumbnailHistory());
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(id);
      toast.success('Copied to clipboard!');
      
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleDeleteSEO = (timestamp: string) => {
    localStorage.deleteSEOContent(timestamp);
    loadHistory();
    toast.success('SEO content deleted');
  };

  const handleDeleteThumbnail = (id: string) => {
    localStorage.deleteThumbnail(id);
    loadHistory();
    toast.success('Thumbnail deleted');
  };

  const handleDownloadThumbnail = (thumbnail: GeneratedThumbnail) => {
    const link = document.createElement('a');
    link.href = thumbnail.url;
    link.download = `vidranker-thumbnail-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Thumbnail downloaded!');
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const CopyButton = ({ text, id, small = false }: { text: string; id: string; small?: boolean }) => (
    <Button
      variant="ghost"
      size={small ? "sm" : "default"}
      onClick={() => handleCopy(text, id)}
      className={`${small ? 'h-8 w-8' : ''} p-0 hover:bg-primary/20`}
    >
      {copiedItem === id ? (
        <CheckCircle className={`${small ? 'h-3 w-3' : 'h-4 w-4'} text-green-400`} />
      ) : (
        <Copy className={`${small ? 'h-3 w-3' : 'h-4 w-4'}`} />
      )}
    </Button>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {/* Header */}
      <div className="card-glass text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <HistoryIcon className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold mb-2">Content History</h1>
        <p className="text-sm text-muted-foreground">
          Access your previously generated SEO content and thumbnails
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="seo" className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass">
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            SEO ({seoHistory.length})
          </TabsTrigger>
          <TabsTrigger value="thumbnails" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Thumbnails ({thumbnailHistory.length})
          </TabsTrigger>
        </TabsList>

        {/* SEO History */}
        <TabsContent value="seo" className="space-y-4">
          {seoHistory.length === 0 ? (
            <div className="card-glass text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No SEO content generated yet</p>
            </div>
          ) : (
            seoHistory.map((content) => (
              <div key={content.timestamp} className="card-glass">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-sm">{content.topic}</h3>
                    <p className="text-xs text-muted-foreground">{formatDate(content.timestamp)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSEO(content.timestamp)}
                    className="text-destructive hover:text-destructive h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {/* Title */}
                  <div className="glass p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-primary">Title</span>
                      <CopyButton text={content.title} id={`title-${content.timestamp}`} small />
                    </div>
                    <p className="text-sm">{content.title}</p>
                  </div>

                  {/* Tags */}
                  <div className="glass p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-green-400">Tags</span>
                      <CopyButton text={content.tags.join(', ')} id={`tags-${content.timestamp}`} small />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {content.tags.slice(0, 5).map((tag, index) => (
                        <span key={index} className="glass px-2 py-0.5 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {content.tags.length > 5 && (
                        <span className="text-xs text-muted-foreground">
                          +{content.tags.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        {/* Thumbnail History */}
        <TabsContent value="thumbnails" className="space-y-4">
          {thumbnailHistory.length === 0 ? (
            <div className="card-glass text-center py-8">
              <Image className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No thumbnails generated yet</p>
            </div>
          ) : (
            thumbnailHistory.map((thumbnail) => (
              <div key={thumbnail.id} className="card-glass">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">{formatDate(thumbnail.timestamp)}</p>
                    <span className="glass px-2 py-0.5 rounded text-xs">
                      {thumbnail.source === 'ai' ? '🤖 AI' : '🎨 Canvas'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadThumbnail(thumbnail)}
                      className="h-8 w-8 p-0 hover:bg-primary/20"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteThumbnail(thumbnail.id)}
                      className="text-destructive hover:text-destructive h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <img
                  src={thumbnail.url}
                  alt="Generated thumbnail"
                  className="w-full h-auto rounded-lg mb-3"
                />

                <div className="glass p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-purple-400">Prompt</span>
                    <CopyButton text={thumbnail.prompt} id={`prompt-${thumbnail.id}`} small />
                  </div>
                  <p className="text-xs text-muted-foreground">{thumbnail.prompt}</p>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
