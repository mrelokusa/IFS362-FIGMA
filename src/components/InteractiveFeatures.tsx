import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, Download, Mail, MessageCircle, Sparkles } from "lucide-react";
import { toast } from "sonner"; // ✅ fixed
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
    <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center">Interactive Features</h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quiz */}
          <div className="lg:col-span-2">
            <HypertensionQuiz />
          </div>

          {/* Newsletter & Download */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <CardTitle>Newsletter</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {!isSubscribed ? (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                    <Button type="submit" className="w-full bg-blue-600 text-white">
                      Subscribe
                    </Button>
                  </form>
                ) : (
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                    <p>Successfully Subscribed!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Download className="w-6 h-6 text-teal-600" />
                  <CardTitle>Download Guide</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={downloadGuide} className="w-full bg-teal-600 text-white">
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
