"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Activity, 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Website } from '@/lib/types';
import StatusBox from '@/components/ui/statusBox';
import { ChartLineLinear } from '@/components/ui/lineChart';

// Types

interface ResponseTimeData {
  time: string;
  responseTime: number;
  timestamp: number;
}

interface LogEntry {
  id: number;
  timestamp: string;
  status: 'up' | 'down' | 'unknown';
  responseTime: string;
  message: string;
  statusCode?: number;
}


// Main Website Detail Page Component
const WebsiteDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const websiteId = params?.websiteId as string;

  const [website, setWebsite] = useState<Website | null>(null);
  const [responseTimeData, setResponseTimeData] = useState<ResponseTimeData[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock function to generate response time data for last 30 minutes
  const generateResponseTimeData = (): ResponseTimeData[] => {
    const data: ResponseTimeData[] = [];
    const now = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60000); // Every minute
      const responseTime = Math.floor(Math.random() * 300) + 50; // 50-350ms
      
      data.push({
        time: timestamp.toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        responseTime,
        timestamp: timestamp.getTime()
      });
    }
    
    return data;
  };

  // Mock function to generate logs
  const generateLogs = (): LogEntry[] => {
    const statuses: ('up' | 'down' | 'unknown')[] = ['up', 'up', 'up', 'up', 'up', 'up', 'down', 'up', 'up', 'up', 'up', 'up', 'down', 'up', 'up', 'up', 'unknown', 'up', 'up', 'up'];
    const logs: LogEntry[] = [];
    const now = new Date();
    
    for (let i = 0; i < 20; i++) {
      const timestamp = new Date(now.getTime() - i * 300000); // Every 5 minutes
      const status = statuses[i];
      const responseTime = status === 'up' ? `${Math.floor(Math.random() * 300) + 50}ms` : '--';
      
      logs.push({
        id: i + 1,
        timestamp: timestamp.toLocaleString(),
        status,
        responseTime,
        message: status === 'up' ? 'Health check successful' : 
                status === 'down' ? 'Connection timeout' : 'Health check pending',
        statusCode: status === 'up' ? 200 : status === 'down' ? 500 : undefined
      });
    }
    
    return logs;
  };

  // Fetch website data
  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock website data
        const mockWebsite: Website = {
          id: parseInt(websiteId),
          url: 'https://mywebsite.com',
          status: 'up',
          response_time_in_ms: '245ms',
          lastChecked: '2 min ago',
        };
        
        setWebsite(mockWebsite);
        setResponseTimeData(generateResponseTimeData());
        setLogs(generateLogs());
        
      } catch (err) {
        setError('Failed to load website data');
        console.error('Error fetching website data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (websiteId) {
      fetchWebsiteData();
    }
  }, [websiteId]);

  const getLogStatusBadge = (status: LogEntry['status']) => {
    switch (status) {
      case 'up':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Up
          </Badge>
        );
      case 'down':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Down
          </Badge>
        );
      case 'unknown':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <HelpCircle className="w-3 h-3 mr-1" />
            Unknown
          </Badge>
        );
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <Card className="bg-slate-900/30 border-slate-800 max-w-md">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-100 mb-2">Error Loading Website</h2>
            <p className="text-slate-400 mb-4">{error}</p>
            <Button onClick={() => router.push('/dashboard')} variant="outline" className="border-slate-700 text-slate-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => router.push('/dashboard')}
                  className="border-slate-700 hover:text-slate-300 hover:bg-slate-800 text-black"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 text-black hover:text-slate-300" />
                  Back
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-100">
                      {isLoading ? 'Loading...' : website?.url || 'Website Details'}
                    </h1>
                    <p className="text-sm text-slate-400">Website Monitoring Details</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {website && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-slate-700 hover:text-slate-300 hover:bg-slate-800 text-black"
                    onClick={() => window.open(website.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2 text-black hover:text-slate-300" />
                    Visit Site
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-slate-700 hover:text-slate-300 hover:bg-slate-800 text-black"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="w-4 h-4 mr-2 text-black hover:text-slate-300" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Top Row - Chart and Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart - Takes up 2/3 of the width */}
            <div className="lg:col-span-2">
              {/* <SimpleChart data={responseTimeData} isLoading={isLoading} /> */}
              <ChartLineLinear/>
            </div>
            
            {/* Status Box - Takes up 1/3 of the width */}
            <div className="lg:col-span-1">
              <StatusBox website={website!} isLoading={isLoading} />
            </div>
          </div>

          {/* Bottom Row - Scrollable Logs */}
          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Last Logs (Scrollable)
              </CardTitle>
              <CardDescription className="text-slate-400">
                Recent health check results - scroll to see more
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg animate-pulse">
                      <div className="w-16 h-6 bg-slate-700 rounded"></div>
                      <div className="flex-1 h-4 bg-slate-700 rounded"></div>
                      <div className="w-20 h-4 bg-slate-700 rounded"></div>
                      <div className="w-24 h-4 bg-slate-700 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        {getLogStatusBadge(log.status)}
                        <div>
                          <p className="text-slate-100 font-medium">{log.message}</p>
                          <p className="text-sm text-slate-400">{log.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-right">
                        <div>
                          <p className="text-slate-300 font-mono">{log.responseTime}</p>
                          {log.statusCode && (
                            <p className="text-xs text-slate-500">Status: {log.statusCode}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default WebsiteDetailPage;