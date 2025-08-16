import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, Download, Mail, MessageCircle, Sparkles } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { HypertensionQuiz } from "./HypertensionQuiz";

export function InteractiveFeatures() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast.success("Successfully subscribed to our newsletter!");
    }
  };

  const downloadGuide = () => {
    toast.success("Guide download started! Check your downloads folder.");
  };

  return (
    <section id="resources" className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700">
              Interactive Tools
            </Badge>
            <h2 className="mb-6">Take Action Today</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Use our interactive tools to assess your risk, stay informed, and access valuable resources for managing your blood pressure.
            </p>
          </div>

          {/* AI Assistant Highlight */}
          <div className="mb-12">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-teal-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-2">AI-Powered Hypertension Assistant</h3>
                      <p className="text-blue-100 leading-relaxed">
                        Get instant answers to your blood pressure questions! Our AI assistant provides personalized guidance on symptoms, prevention, medication, and lifestyle changes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-6 h-6 text-white" />
                    <span className="text-blue-100">Look for the chat button →</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Comprehensive Risk Assessment */}
            <div className="lg:col-span-2">
              <HypertensionQuiz />
            </div>

            {/* Newsletter Signup & Download Guide */}
            <div className="space-y-6">
              {/* Newsletter Signup */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <CardTitle>Stay Informed</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {!isSubscribed ? (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                      <div>
                        <p className="text-gray-600 mb-4">
                          Get weekly tips, latest research, and practical advice delivered to your inbox.
                        </p>
                        <div className="space-y-3">
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full"
                          />
                          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Subscribe to Newsletter
                          </Button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                      <h3 className="text-green-800">Successfully Subscribed!</h3>
                      <p className="text-gray-600">
                        Thank you for subscribing. You'll receive our weekly newsletter with the latest hypertension management tips and research.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Download Guide */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Download className="w-6 h-6 text-teal-600" />
                    <CardTitle>Free Resources</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Download our comprehensive guide with meal plans, exercise routines, and blood pressure tracking sheets.
                  </p>
                  
                  <div className="space-y-3">
                    <Button onClick={downloadGuide} className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Complete Guide (PDF)
                    </Button>
                    
                    <div className="text-gray-500 space-y-1">
                      <p>• 30-page comprehensive guide</p>
                      <p>• Weekly meal planning templates</p>
                      <p>• Exercise routines for all fitness levels</p>
                      <p>• Blood pressure tracking sheets</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Did You Know?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">People with hypertension:</span>
                    <Badge variant="outline">1.3 billion</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Preventable cases:</span>
                    <Badge variant="outline">80%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Lives saved annually:</span>
                    <Badge variant="outline">10 million+</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Early detection and lifestyle changes can dramatically reduce hypertension risk.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}