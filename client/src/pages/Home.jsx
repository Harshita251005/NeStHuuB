import { Link } from 'react-router-dom';
import { Search, MapPin, Shield, Users, ArrowRight, Star, CheckCircle, Home as HomeIcon } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find PGs based on location, price, budget and amenities with powerful filters',
      color: 'blue'
    },
    {
      icon: MapPin,
      title: 'Location Based',
      description: 'Discover PGs near your workplace, college or preferred area instantly',
      color: 'emerald'
    },
    {
      icon: CheckCircle,
      title: 'Verified Listings',
      description: 'All PG listings are verified and authentic for your peace of mind',
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with fellow residents and PG owners seamlessly',
      color: 'pink'
    }
  ];

  const stats = [
    { number: '500+', label: 'PG Listings' },
    { number: '5000+', label: 'Happy Users' },
    { number: '100+', label: 'Cities' },
    { number: '24/7', label: 'Support' }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800',
      emerald: 'bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800',
      purple: 'bg-violet-100 text-violet-600 hover:bg-violet-200 dark:bg-violet-900 dark:text-violet-300 dark:hover:bg-violet-800',
      pink: 'bg-cyan-100 text-cyan-600 hover:bg-cyan-200 dark:bg-cyan-900 dark:text-cyan-300 dark:hover:bg-cyan-800'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 opacity-90"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animation-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 text-white rounded-full backdrop-blur">
              <Star className="h-4 w-4 fill-white" />
              <span className="text-sm font-medium">Join 5000+ Happy Users</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Find Your Perfect <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">PG</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Discover comfortable, affordable, and verified paying guest accommodations in your preferred location. Simple, fast, and hassle-free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link 
                to="/pgs" 
                className="group btn-primary text-lg px-8 py-3.5 inline-flex items-center justify-center gap-2"
              >
                Browse PGs
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition duration-300" />
              </Link>
              <Link 
                to="/user/register" 
                className="group border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3.5 rounded-lg font-semibold transition duration-300 inline-flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Why Choose NestHub?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We make finding your ideal PG simple, transparent, and stress-free
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClass = getColorClasses(feature.color);
              return (
                <div key={index} className="card-hover group">
                  <div className={`${colorClass} w-16 h-16 rounded-xl flex items-center justify-center transition duration-300 mb-4 group-hover:scale-110`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get started in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'Sign Up', desc: 'Create your free account in seconds', icon: '🎯' },
              { step: 2, title: 'Browse PGs', desc: 'Search and filter PGs by location and budget', icon: '🔍' },
              { step: 3, title: 'Book Now', desc: 'Book your favorite PG instantly', icon: '✅' }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="card dark:bg-gray-700 dark:text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-5xl">{item.icon}</div>
                    <div className="text-5xl font-bold text-sky-600 dark:text-sky-400 opacity-20">{item.step}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
                {item.step < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-sky-300 dark:text-sky-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-900 dark:via-purple-900 dark:to-cyan-900 text-white py-20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Find Your Perfect PG?
            </h2>
            <p className="text-xl text-indigo-100 dark:text-indigo-200 max-w-2xl mx-auto">
              Join thousands of students and professionals who found their ideal accommodation. Start your search today!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link 
              to="/user/register" 
              className="bg-white text-sky-600 hover:bg-gray-100 dark:hover:bg-gray-200 font-bold py-3 px-8 rounded-lg transition duration-300 inline-flex items-center justify-center gap-2"
            >
              Sign Up as User
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/owner/register" 
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 dark:hover:text-indigo-900 font-bold py-3 px-8 rounded-lg transition duration-300 inline-flex items-center justify-center gap-2"
            >
              List Your PG
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="pt-8 border-t border-indigo-400 dark:border-indigo-600">
            <p className="text-indigo-100 dark:text-indigo-200">
              Already have an account?{' '}
              <Link to="/user/login" className="font-bold hover:text-white dark:hover:text-indigo-100 underline">
                User Login
              </Link>
              {' '} • {' '}
              <Link to="/owner/login" className="font-bold hover:text-white dark:hover:text-indigo-100 underline">
                Owner Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;