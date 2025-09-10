import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Download, 
  Play, 
  Apple, 
  Map, 
  BarChart3, 
  Users, 
  Palmtree,
  ArrowRight,
  CheckCircle,
  Globe,
  Shield
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { DEMO_CREDENTIALS } from '../../utils/auth';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeDemo, setActiveDemo] = useState<string>('');

  const fillDemoCredentials = (type: string) => {
    setActiveDemo(type);
    setTimeout(() => onNavigate('login'), 500);
  };

  const features = [
    {
      icon: Map,
      title: 'Smart Trip Tracking',
      description: 'Automatic detection of your journeys with AI-powered mode recognition'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive insights and reports for transportation planning'
    },
    {
      icon: Users,
      title: 'Community Insights',
      description: 'Understand travel patterns across Kerala to improve infrastructure'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is anonymized and used only for research purposes'
    }
  ];

  const benefits = [
    'Real-time trip tracking and logging',
    'AI-powered travel mode detection',
    'Kerala tourism exploration guide',
    'Weather alerts and travel recommendations',
    'Contribution to transport research'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-sky-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-sky-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-2 text-emerald-600"
                >
                  <Palmtree className="h-5 w-5" />
                  <span className="font-medium">God's Own Country</span>
                </motion.div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Smart Travel
                  <span className="block bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                    Data Platform
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join thousands of Malayalis in contributing to Kerala's transport research 
                  while discovering the beauty of God's Own Country with intelligent travel insights.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate('login')}
                  className="text-lg px-8 py-4"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('explore')}
                  className="text-lg px-8 py-4"
                >
                  <Globe className="mr-2 h-5 w-5" />
                  Explore Kerala
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {benefits.slice(0, 4).map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-80 h-96 mx-auto">
                {/* Phone mockup */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 rounded-[3rem] shadow-2xl">
                  <div className="p-3 h-full">
                    <div className="bg-gradient-to-br from-emerald-400 to-sky-500 rounded-[2.5rem] h-full overflow-hidden relative">
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black/20 rounded-full" />
                      <div className="p-6 pt-16 text-white text-center">
                        <Palmtree className="h-12 w-12 mx-auto mb-4" />
                        <h3 className="text-lg font-bold">NATPAC Kerala</h3>
                        <p className="text-sm opacity-90 mt-2">Smart Travel Companion</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3"
                >
                  <Map className="h-6 w-6 text-emerald-600" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3"
                >
                  <BarChart3 className="h-6 w-6 text-sky-600" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of technology and tradition as we help modernize 
              Kerala's transportation while preserving its natural beauty.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-r from-emerald-100 to-sky-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* App Download Section */}
<section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <Smartphone className="h-16 w-16 mx-auto opacity-90" />
          <h2 className="text-4xl font-bold">Download Our App</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Get the complete NATPAC Kerala experience on your mobile device. 
            Available on all platforms with PWA support.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Google Play */}
          <Button
            size="lg"
            className="bg-black text-white hover:bg-white hover:text-black px-8 py-4 transition"
            onClick={() => window.open('https://play.google.com/store', '_blank')}
          >
            <Play className="mr-3 h-6 w-6" />
            <div className="text-left">
              <div className="text-xs">GET IT ON</div>
              <div className="text-lg font-semibold">Google Play</div>
            </div>
          </Button>

          {/* App Store */}
          <Button
            size="lg"
            className="bg-black text-white hover:bg-white hover:text-black px-8 py-4 transition"
            onClick={() => window.open('https://apps.apple.com', '_blank')}
          >
            <Apple className="mr-3 h-6 w-6" />
            <div className="text-left">
              <div className="text-xs">Download on the</div>
              <div className="text-lg font-semibold">App Store</div>
            </div>
          </Button>

          {/* Direct APK Download */}
          <Button
            size="lg"
            className="bg-black text-white hover:bg-white hover:text-black px-8 py-4 transition"
            onClick={() => {
              const blob = new Blob(['APK Demo File'], { type: 'application/vnd.android.package-archive' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'natpac-kerala.apk';
              link.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="mr-3 h-6 w-6" />
            <div className="text-left">
              <div className="text-xs">Direct</div>
              <div className="text-lg font-semibold">APK Download</div>
            </div>
          </Button>
        </div>

        <div className="text-sm opacity-75">
          <p> PWA Support •  Add to Home Screen •  Auto-sync across devices</p>
        </div>
      </motion.div>
    </div>
  </div>
</section>



      {/* Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Try Our Demo
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Experience the platform with our pre-configured demo accounts. 
              All features are fully interactive.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* User Demo */}
              <Card className="p-8 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Citizen/Tourist Demo
                </h3>
                <div className="space-y-3 mb-6 text-sm text-gray-600">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <strong>Username:</strong> user<br />
                    <strong>Password:</strong> user123
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <strong>Email:</strong> user123@gmail.com<br />
                    <strong>Password:</strong> demo123
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => fillDemoCredentials('user')}
                  >
                    Demo as Citizen
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => fillDemoCredentials('userEmail')}
                  >
                    Try Email Login
                  </Button>
                </div>
              </Card>

              {/* Admin Demo */}
              <Card className="p-8 text-center">
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  NATPAC Admin Demo
                </h3>
                <div className="space-y-3 mb-6 text-sm text-gray-600">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <strong>Username:</strong> admin<br />
                    <strong>Password:</strong> admin123
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <strong>Email:</strong> admin@natpac.com<br />
                    <strong>Password:</strong> admin123
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => fillDemoCredentials('admin')}
                  >
                    Demo as Admin
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => fillDemoCredentials('adminEmail')}
                  >
                    Try Email Login
                  </Button>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
