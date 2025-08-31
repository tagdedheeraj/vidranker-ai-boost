
import { Info, Users, Target, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'AI-Powered SEO',
      description: 'Generate optimized titles, descriptions, tags, and hashtags using advanced AI technology.'
    },
    {
      icon: Zap,
      title: 'Fast Generation',
      description: 'Get professional SEO content in seconds with our optimized AI algorithms.'
    },
    {
      icon: Users,
      title: 'Creator Focused',
      description: 'Built specifically for YouTube content creators to boost their channel growth.'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      <div className="card-glass">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Info className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">About VidRanker</h1>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              VidRanker is the ultimate AI-powered YouTube optimization tool designed to help content creators grow their channels and reach more viewers.
            </p>
          </div>

          <div className="grid gap-4">
            {features.map((feature, index) => (
              <div key={index} className="glass p-4 rounded-xl">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass p-4 rounded-xl text-center">
            <h3 className="font-semibold mb-2">Version 1.0.0</h3>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ for YouTube creators worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
