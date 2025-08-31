
import { Play, Zap, Menu, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="header-glass">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 rounded-xl blur-lg opacity-75 animate-pulse-glow"></div>
            <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 p-3 rounded-xl">
              <Play className="h-6 w-6 text-white fill-current animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              VidRanker
            </h1>
            <p className="text-xs text-muted-foreground">AI YouTube Optimizer</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-pulse"></span>
          </Button>
          
          <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
          
          <Button variant="ghost" size="sm">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
