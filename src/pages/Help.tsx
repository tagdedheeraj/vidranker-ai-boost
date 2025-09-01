
import { HelpCircle, ArrowLeft, ChevronRight, Book, MessageCircle, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Help = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      question: "How does VidRanker's AI work?",
      answer: "VidRanker uses advanced AI algorithms to analyze your video content and generate optimized titles, descriptions, tags, and hashtags that help improve your video's visibility on YouTube."
    },
    {
      question: "Is VidRanker free to use?",
      answer: "VidRanker offers both free and premium features. Basic SEO generation is available for free, while advanced features require a subscription."
    },
    {
      question: "How do I optimize my YouTube videos?",
      answer: "Simply enter your video topic or description in the SEO Generator, and VidRanker will create optimized content including titles, descriptions, tags, and hashtags."
    },
    {
      question: "Can I save my generated content?",
      answer: "Yes! All your generated content is automatically saved in the History section where you can access and reuse it anytime."
    },
    {
      question: "Is my data safe with VidRanker?",
      answer: "Absolutely. We take data privacy seriously and store your content securely. Check our Privacy Policy for detailed information."
    }
  ];

  const helpTopics = [
    {
      icon: Target,
      title: "Getting Started",
      description: "Learn how to use VidRanker's features",
      items: ["Creating your first SEO content", "Understanding AI suggestions", "Saving and managing content"]
    },
    {
      icon: Zap,
      title: "Advanced Features",
      description: "Maximize your YouTube optimization",
      items: ["Thumbnail generation", "Keyword research", "Analytics insights"]
    },
    {
      icon: Book,
      title: "Best Practices",
      description: "Tips for YouTube success",
      items: ["SEO optimization tips", "Content strategy", "Growing your audience"]
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
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Help & Support</h1>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button 
            onClick={() => navigate('/contact')}
            className="btn-secondary h-20 flex flex-col items-center justify-center"
          >
            <MessageCircle className="h-6 w-6 mb-2" />
            <span>Contact Us</span>
          </Button>
          
          <Button 
            onClick={() => navigate('/about')}
            className="btn-secondary h-20 flex flex-col items-center justify-center"
          >
            <Book className="h-6 w-6 mb-2" />
            <span>About App</span>
          </Button>
        </div>

        {/* Help Topics */}
        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-semibold">Help Topics</h2>
          {helpTopics.map((topic, index) => (
            <div key={index} className="glass p-4 rounded-xl">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <topic.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{topic.description}</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {topic.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          {faqItems.map((item, index) => (
            <div key={index} className="glass p-4 rounded-xl">
              <h3 className="font-semibold mb-2 text-foreground">{item.question}</h3>
              <p className="text-sm text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
