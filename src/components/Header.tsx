import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";

export function Header() {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Hypertension", href: "#about" },
    { name: "Symptoms & Causes", href: "#symptoms" },
    { name: "Prevention", href: "#prevention" },
    { name: "Interactive Tools", href: "#resources" },
    { name: "Games", href: "#games" },
    { name: "Contact", href: "#contact" },
  ];

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Logo className="h-10 w-10" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">HypertenCare</h1>
              <p className="text-xs text-gray-600">Your Guide to Healthy Blood Pressure</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => smoothScroll(e, item.href)}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex">
            <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white">
              Take Assessment
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Logo className="h-8 w-8" />
                  <div>
                    <h2 className="font-semibold text-gray-900">HypertenCare</h2>
                    <p className="text-xs text-gray-600">Your Guide to Healthy Blood Pressure</p>
                  </div>
                </div>
                
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => smoothScroll(e, item.href)}
                    className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                  >
                    {item.name}
                  </a>
                ))}
                <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white mt-4">
                  Take Assessment
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}