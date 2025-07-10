"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Activity, Eye, EyeOff, ArrowRight, Github, Mail, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';


type signinError = {
    email?:string,
    password?:string,

}

const UptimeSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const emailRef = useRef<HTMLInputElement | null> (null)
  const passwordRef = useRef<HTMLInputElement | null> (null)

  const [errors, setErrors] = useState<signinError>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const validateForm = () => {
    const newErrors : signinError = {};
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
        const email = emailRef.current?.value
        const password = passwordRef.current?.value
        setIsLoading(true);
        // Simulate API call
        const res = await api.post('/api/signin',{email,password})
        router.push("/dashboard")
    } catch (error) {
        
    } finally{
        setIsLoading(false);
    }
  };
  useEffect(()=>{
    const checkAuth = async()=>{
        const res = await api.get("/api/auth")
        router.push('/dashboard')
    }
    checkAuth()
  },[])
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
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-slate-400">Sign in to your monitoring dashboard</p>
          </div>
        </div>

        {/* Sign In Card */}
        <Card className="bg-slate-900/30 border-slate-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center text-slate-100">Sign in to your account</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
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
                    placeholder="Enter your password"
                    ref={passwordRef}
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
                {errors.password && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">{errors.password}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                </div>
                <Button variant="link" className="px-0 text-blue-400 hover:text-blue-300">
                  Forgot password?
                </Button>
              </div>
            </div>

            {/* Sign In Button */}
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
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

            {/* Social Login Buttons */}
          </CardContent>

          <CardFooter>
            <p className="text-center text-sm text-slate-400 w-full">
              Don't have an account?{' '}
              <Button variant="link" className="px-0 text-blue-400 hover:text-blue-300" onClick={()=>router.push("/signup")}>
                Sign up
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
          By signing in, you agree to our{' '}
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

export default UptimeSignIn;