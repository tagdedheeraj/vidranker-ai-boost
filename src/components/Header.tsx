
import { Play, Zap, Menu, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header-glass">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src="/lovable-uploads/7672fcf0-d213-4199-a45d-2f50ad3a9544.png" 
              alt="VidRanker Logo" 
              className="h-10 w-10 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              VidRanker
            </h1>
            <p className="text-xs text-muted-foreground">AI YouTube Optimizer</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative"
            onClick={() => navigate('/settings')}
          >
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-pulse"></span>
          </Button>
          
          <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5 text-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
};
