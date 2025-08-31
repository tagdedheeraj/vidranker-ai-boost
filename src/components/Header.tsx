
import { Play, Zap } from 'lucide-react';

export const Header = () => {
  return (
    <header className="glass-card rounded-none border-l-0 border-r-0 border-t-0 p-4">
      <div className="flex items-center justify-center space-x-3">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-lg opacity-75 animate-pulse-glow"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <Play className="h-6 w-6 text-white fill-current" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-glow">VidRanker</h1>
          <p className="text-xs text-muted-foreground">AI YouTube Optimizer</p>
        </div>
        <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
      </div>
    </header>
  );
};
