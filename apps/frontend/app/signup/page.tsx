"use client"
import React, { useRef, useState } from 'react';
import { Activity, Eye, EyeOff, ArrowRight, Mail, Lock, User } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { api } from '@/lib/utils';

type signupError = {
  name?: string;
  email?: string;
  password?: string;
}

const UptimeSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<signupError>({});
  const [isLoading, setIsLoading] = useState(false);

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: '', percentage: 0 };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const levels = [
      { strength: 0, text: '', percentage: 0 },
      { strength: 1, text: 'Very weak', percentage: 20 },
      { strength: 2, text: 'Weak', percentage: 40 },
      { strength: 3, text: 'Fair', percentage: 60 },
      { strength: 4, text: 'Good', percentage: 80 },
      { strength: 5, text: 'Strong', percentage: 100 }
    ];
    
    return levels[score];
  };

  const [passwordStrength, setPasswordStrength] = useState(getPasswordStrength(''));

  const handlePasswordChange = () => {
    const password = passwordRef.current?.value || '';
    setPasswordStrength(getPasswordStrength(password));
    
    // Clear password error when user starts typing
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: signupError = {};
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    
    setIsLoading(true);
    // Simulate API call
    const res = await api.post('/api/signup' , {email,name,password})
    if(res.data.success){
        //navigate to signin
    }
    setIsLoading(false);
    
    console.log('Sign up attempted:', { name, email, password });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-3xl font-bold text-slate-100">Uptime</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
            <p className="text-slate-400">Start monitoring your services today</p>
          </div>
        </div>

        {/* Sign Up Card */}
        <Card className="bg-slate-900/30 border-slate-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center text-slate-100">Get started with Uptime</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Create your account to begin monitoring
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-200">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    ref={nameRef}
                    onChange={() => {
                      if (errors.name) {
                        setErrors(prev => ({ ...prev, name: '' }));
                      }
                    }}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-blue-500"
                  />
                </div>
                {errors.name && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">{errors.name}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    ref={emailRef}
                    onChange={() => {
                      if (errors.email) {
                        setErrors(prev => ({ ...prev, email: '' }));
                      }
                    }}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-blue-500"
                  />
                </div>
                {errors.email && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">{errors.email}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    ref={passwordRef}
                    onChange={handlePasswordChange}
                    className="pl-10 pr-10 bg-slate-900/50 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-blue-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
                
                {/* Password Strength Indicator */}
                {passwordRef.current?.value && (
                  <div className="space-y-2">
                    <Progress 
                      value={passwordStrength.percentage} 
                      className="h-2 bg-slate-700"
                    />
                    {passwordStrength.text && (
                      <p className="text-xs text-slate-400">
                        Password strength: <span className="font-medium">{passwordStrength.text}</span>
                      </p>
                    )}
                  </div>
                )}
                
                {errors.password && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">{errors.password}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {/* Sign Up Button */}
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-700" />
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <p className="text-center text-sm text-slate-400 w-full">
              Already have an account?{' '}
              <Button variant="link" className="px-0 text-blue-400 hover:text-blue-300">
                Sign in
              </Button>
            </p>
          </CardFooter>
        </Card>

        {/* Status Indicator */}
        <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>All systems operational</span>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-slate-500">
          By creating an account, you agree to our{' '}
          <Button variant="link" className="px-0 text-blue-400 hover:text-blue-300 text-xs h-auto">
            Terms of Service
          </Button>
          {' '}and{' '}
          <Button variant="link" className="px-0 text-blue-400 hover:text-blue-300 text-xs h-auto">
            Privacy Policy
          </Button>
        </p>
      </div>
    </div>
  );
};

export default UptimeSignUp;