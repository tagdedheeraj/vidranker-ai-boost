
import { Play, Zap, Menu, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="header-glass">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src="/lovable-uploads/1b7a1b5f-fad1-4dde-9c65-82b6cdb979ff.png" 
              alt="VidRanker Logo" 
              className="h-12 w-12 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              VidRanker
            </h1>
            <p className="text-xs text-muted-foreground">AI YouTube Optimizer</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-pulse"></span>
          </Button>
          
          <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />
          
          <Button variant="ghost" size="sm">
            <Menu className="h-5 w-5 text-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
};
