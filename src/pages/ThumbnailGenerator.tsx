
import { Image, Construction, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ThumbnailGenerator = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {/* Header */}
      <div className="card-glass text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Image className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold mb-2">Thumbnail Generator</h1>
        <p className="text-sm text-muted-foreground">
          Create eye-catching thumbnails with AI
        </p>
      </div>

      {/* Coming Soon Section */}
      <div className="card-glass text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction className="h-10 w-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4 text-glow">Coming Soon!</h2>
        
        <div className="space-y-4 mb-8">
          <p className="text-muted-foreground text-lg">
            We're working hard to bring you amazing thumbnail generation features.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-primary">
            <Clock className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">Stay tuned for updates!</span>
          </div>
        </div>

        {/* Features Preview */}
        <div className="glass p-6 rounded-lg">
          <h3 className="font-semibold mb-4">What's Coming:</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">AI-powered thumbnail generation</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">Custom text and styling options</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">Multiple format support</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">Easy download and sharing</p>
            </div>
          </div>
        </div>

        {/* Notification Button */}
        <div className="mt-6">
          <Button className="btn-hero">
            <Bell className="h-4 w-4 mr-2" />
            Notify Me When Ready
          </Button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card-glass">
        <div className="text-xs text-muted-foreground text-center">
          <p>This feature is under development and will be available soon.</p>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailGenerator;
