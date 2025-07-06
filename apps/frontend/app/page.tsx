"use client"
import React, { useState, useEffect } from 'react';
import { Check, Activity, AlertTriangle, BarChart3, Zap, GitBranch, ArrowRight, Shield, Clock, TrendingUp, Menu, X } from 'lucide-react';

const UptimeLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Track Uptime & Health",
      description: "Monitor uptime and response health using Redis Streams for real-time data processing and analysis.",
      highlight: "Redis Streams"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Dashboard",
      description: "Unified dashboard with live status updates and comprehensive monitoring insights across all services.",
      highlight: "Live Updates"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Incident Detection",
      description: "Advanced incident detection with Redis-based streaming alert pipeline for immediate notifications.",
      highlight: "Smart Alerts"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "REST API",
      description: "Powerful REST API to interact with monitors and access comprehensive status data programmatically.",
      highlight: "Developer Friendly"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Centralized Logging",
      description: "Robust error handling and centralized logging system for complete visibility into system health.",
      highlight: "Full Visibility"
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Scalable Architecture",
      description: "Microservice-style architecture with Turborepo for ultimate scalability and maintainability.",
      highlight: "Turborepo"
    }
  ];

  const stats = [
    { value: "99.99%", label: "Uptime SLA", icon: <TrendingUp className="w-5 h-5" /> },
    { value: "<50ms", label: "Response Time", icon: <Clock className="w-5 h-5" /> },
    { value: "24/7", label: "Monitoring", icon: <Shield className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Navigation */}
      <nav className={`relative z-50 border-b border-slate-800/50 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-slate-100">Uptime</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-400 hover:text-slate-200 transition-colors">Features</a>
              <a href="#docs" className="text-slate-400 hover:text-slate-200 transition-colors">Docs</a>
              <a href="#pricing" className="text-slate-400 hover:text-slate-200 transition-colors">Pricing</a>
              <span className="text-sm text-slate-500 font-mono border border-slate-800 px-3 py-1 rounded-md">
                {currentTime.toLocaleTimeString()}
              </span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-400 hover:text-slate-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-800">
              <div className="flex flex-col space-y-4 mt-4">
                <a href="#features" className="text-slate-400 hover:text-slate-200 transition-colors">Features</a>
                <a href="#docs" className="text-slate-400 hover:text-slate-200 transition-colors">Docs</a>
                <a href="#pricing" className="text-slate-400 hover:text-slate-200 transition-colors">Pricing</a>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-fit">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 border border-slate-800 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">All systems operational</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-100 leading-tight">
            Monitor Everything.
            <br />
            <span className="text-blue-400">Break Nothing.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Real-time uptime monitoring with Redis-powered streaming, incident detection, and scalable architecture built for modern applications.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center transition-all duration-1000 delay-${500 + index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-slate-100">
                    {stat.value}
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2 shadow-lg">
              <span>Start Monitoring</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-slate-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:bg-slate-900/50">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className={`text-center mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-100">
            Everything You Need
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Powerful features designed for reliability, scalability, and ease of use
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-slate-900/30 border border-slate-800 hover:border-slate-700 rounded-xl p-8 transition-all duration-300 hover:transform hover:scale-105 hover:bg-slate-900/50 delay-${800 + index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-700 transition-colors">
                <div className="text-blue-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-100 group-hover:text-blue-100 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed mb-4">
                {feature.description}
              </p>
              <div className="inline-flex items-center space-x-1 text-sm">
                <Check className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-medium">{feature.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Code Example Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-100">Simple Integration</h2>
            <p className="text-xl text-slate-400">Get started with our REST API in minutes</p>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <pre className="text-sm text-slate-300 overflow-x-auto">
              <code>{`curl -X POST https://api.uptime.dev/monitors \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Website",
    "url": "https://mywebsite.com",
    "interval": 60
  }'`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className={`text-center bg-slate-900/30 border border-slate-800 rounded-2xl p-12 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-100">
            Ready to Never Miss an Outage?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust Uptime to keep their applications running smoothly with 99.99% SLA guarantees.
          </p>
          <button className="group bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-200 hover:scale-105 flex items-center space-x-3 mx-auto shadow-lg">
            <span>Get Started Free</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-lg font-semibold text-slate-300">Uptime</span>
          </div>
          <div className="text-sm text-slate-500">
            © 2025 Uptime. Built with reliability in mind.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UptimeLanding;