
import { useState, useEffect } from 'react';
import { Play, Zap, TrendingUp, Users, Target, FileText, Image, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { localStorage } from '../utils/localStorage';

export const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ seoCount: 0, thumbnailCount: 0 });

  useEffect(() => {
    const storageInfo = localStorage.getStorageInfo();
    setStats({
      seoCount: storageInfo.seoCount,
      thumbnailCount: storageInfo.thumbnailCount
    });
  }, []);

  const features = [
    {
      icon: FileText,
      title: 'SEO Generator',
      description: 'AI-powered titles, descriptions & tags',
      action: () => navigate('/seo'),
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: Image,
      title: 'Thumbnail Creator',
      description: 'Generate eye-catching thumbnails',
      action: () => navigate('/thumbnail'),
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: History,
      title: 'Content History',
      description: 'Access your saved content',
      action: () => navigate('/history'),
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {/* Hero Section */}
      <div className="card-glass text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 animate-float">
              <Play className="h-8 w-8 text-white fill-current" />
            </div>
            <h1 className="text-2xl font-bold text-glow mb-2">Welcome to VidRanker</h1>
            <p className="text-muted-foreground">
              Helps optimize video content with AI-powered tools
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.seoCount}</div>
              <div className="text-xs text-muted-foreground">SEO Contents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{stats.thumbnailCount}</div>
              <div className="text-xs text-muted-foreground">Thumbnails</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass p-3 rounded-lg text-center">
          <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-1" />
          <div className="text-lg font-bold">Tools</div>
          <div className="text-xs text-muted-foreground">AI Powered</div>
        </div>
        <div className="glass p-3 rounded-lg text-center">
          <Users className="h-6 w-6 text-blue-400 mx-auto mb-1" />
          <div className="text-lg font-bold">Creators</div>
          <div className="text-xs text-muted-foreground">For Everyone</div>
        </div>
        <div className="glass p-3 rounded-lg text-center">
          <Target className="h-6 w-6 text-purple-400 mx-auto mb-1" />
          <div className="text-lg font-bold">Easy</div>
          <div className="text-xs text-muted-foreground">To Use</div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={feature.action}
            className="card-glass hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
              <Zap className="h-5 w-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="card-glass">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Content Tips
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <p>Use relevant keywords in your SEO titles for better discoverability</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
            <p>Create engaging thumbnails that represent your content accurately</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
            <p>Consistent content creation helps with audience engagement</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card-glass">
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>• This app contains advertisements</p>
          <p>• Some features may require subscription</p>
          <p>• Results are suggestions, not guarantees</p>
          <p>• Manage ad preferences in device settings</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
