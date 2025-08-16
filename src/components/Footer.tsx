import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { name: "About Hypertension", href: "#about" },
    { name: "Symptoms & Causes", href: "#symptoms" },
    { name: "Prevention Tips", href: "#prevention" },
    { name: "Interactive Tools", href: "#resources" },
    { name: "Games", href: "#games" },
  ];

  const resources = [
    { name: "Blood Pressure Tracker", href: "#tracker" },
    { name: "Exercise Plans", href: "#exercise" },
    { name: "Meal Planning", href: "#meals" },
    { name: "FAQ", href: "#faq" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Medical Disclaimer", href: "#disclaimer" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">HypertenCare</h3>
                <p className="text-sm text-gray-400">Your Guide to Healthy Blood Pressure</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering individuals with evidence-based information and practical tools to manage hypertension and live healthier lives.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>info@hypertencare.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>1-800-HYPERTENSION</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>123 Health St, Wellness City, WC 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a href={resource.href} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                {legal.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-400 transition-colors duration-200">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-pink-600 transition-colors duration-200">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 HypertenCare. All rights reserved.
            </p>
            
            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-xs border border-yellow-200">
              <strong>Medical Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}