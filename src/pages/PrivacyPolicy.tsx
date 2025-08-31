
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      <div className="card-glass">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Privacy Policy</h1>
          </div>
        </div>

        <div className="space-y-6 text-sm text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Data Collection</h2>
            <p>VidRanker collects minimal data to provide AI-powered YouTube optimization services. We collect:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Video topics and keywords you input for SEO generation</li>
              <li>Generated content stored locally on your device</li>
              <li>Anonymous usage analytics to improve our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Data Usage</h2>
            <p>Your data is used exclusively to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Generate AI-powered SEO content for your YouTube videos</li>
              <li>Store your content history locally on your device</li>
              <li>Improve our AI algorithms and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Data Security</h2>
            <p>We implement industry-standard security measures to protect your data. Your content is stored locally on your device and transmitted securely to our AI services.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Third-Party Services</h2>
            <p>VidRanker uses Cohere AI for content generation and Meta Audience Network for advertisements. Please review their privacy policies for more information.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
            <p>For privacy concerns, contact us at: privacy@vidranker.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
