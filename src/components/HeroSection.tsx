import { Button } from "./ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 py-16 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-6">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                Trusted Health Information
              </span>
            </div>
            
            <h1 className="mb-6 leading-tight">
              Take Control of Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"> Blood Pressure</span>
            </h1>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Hypertension affects millions worldwide, but it doesn't have to control your life. 
              Discover evidence-based strategies, expert guidance, and practical tools to maintain 
              healthy blood pressure naturally.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white group"
              >
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-blue-200 hover:bg-blue-50"
              >
                Watch Our Video
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-blue-600">1 in 3</div>
                <div className="text-gray-600">Adults Affected</div>
              </div>
              <div className="text-center">
                <div className="text-teal-600">80%</div>
                <div className="text-gray-600">Preventable Cases</div>
              </div>
              <div className="text-center">
                <div className="text-purple-600">10K+</div>
                <div className="text-gray-600">Lives Improved</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1659019479972-82d9e3e8cfb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RldGhvc2NvcGUlMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc1NTMxMzY1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Medical stethoscope and healthcare equipment representing professional hypertension care"
                className="w-full h-[400px] object-cover rounded-xl"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-lg border">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Normal: 120/80</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg border">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Heart Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}