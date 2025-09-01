
import { Mail, Phone, MapPin, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

export const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      <div className="card-glass">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Contact Us</h1>
          </div>
        </div>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="grid gap-4">
            <div className="glass p-4 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">hello@socilet.com</p>
                </div>
              </div>
            </div>

            <div className="glass p-4 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Support</h3>
                  <p className="text-sm text-muted-foreground">Available 24/7 via email</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
                className="input-glass"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
                className="input-glass"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What is this regarding?"
                required
                className="input-glass"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please describe your question or issue..."
                rows={5}
                required
                className="input-glass resize-none"
              />
            </div>

            <Button type="submit" className="btn-hero w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
