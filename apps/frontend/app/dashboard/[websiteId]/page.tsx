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
import { chartData, ChartLineLinear } from '@/components/ui/lineChart';
import { api, readableDate } from '@/lib/utils';
import DashboardHeader from '@/components/ui/dashboardHeader';
import { isAxiosError } from 'axios';


interface LogEntry {
  id: number;
  createdAt: string;
  status: 'up' | 'down' | 'unknown';
  response_time_in_ms: number;
}

const WebsiteDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const websiteId = params?.websiteId as string;

  const [website, setWebsite] = useState<Website | null>(null);
  const [responseTimeData, setResponseTimeData] = useState<chartData[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/api/website/status/${websiteId}?page=1&limit10`)
        const {data} = res
        // console.log(data);
        
        const newlogs = data.data.websites

        const websitedetails : Website = {
            id:data.data.id,
            url:data.data.url,
            response_time_in_ms:parseInt(data.data.response_time_in_ms),
            lastChecked:data.data.lastChecked,
            status:data.data.status
        }
        console.log(websitedetails);
        
        setLogs([...newlogs])
        setWebsite(websitedetails)
        
      } catch (error) {
            if(isAxiosError(error) && error.status==403){
                router.push('/signin')
            }else if(isAxiosError(error)){
                alert(error.response?.data?.message)
            }
      } finally {
        setIsLoading(false);
      }
    };

    if (websiteId) {
      fetchWebsiteData();
    }
  }, [websiteId])
  useEffect(()=>{
    console.log(logs);
    
    const cd:chartData[] = logs.map((log)=>{
        return{
            response_time_in_ms:log.response_time_in_ms,
            time:log.createdAt
        }
    })
    console.log("inside use effect " , cd);
    
    setResponseTimeData([...cd])
  } , [setLogs , logs])

  const getLogStatusBadge = (status: LogEntry['status']) => {
    if(!status){
        return(<>Error...</>)
    }
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

        <DashboardHeader website={website} isLoading={isLoading} />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Top Row - Chart and Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart - Takes up 2/3 of the width */}
            <div className="lg:col-span-2">
              {/* <SimpleChart data={responseTimeData} isLoading={isLoading} /> */}
              <ChartLineLinear chartData={responseTimeData}/>
            </div>
            
            {/* Status Box - Takes up 1/3 of the width */}
            <div className="lg:col-span-1">
             {website && <StatusBox website={website!} isLoading={isLoading} />}
            </div>
          </div>

          {/* Bottom Row - Scrollable Logs */}
          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Last Logs
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
                  {logs.map((log,ind) => (
                    <div key={ind} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        {getLogStatusBadge(log.status)}
                        <div>
                          <p className="text-sm text-slate-400">{readableDate(log.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-right">
                        <div>
                          <p className="text-slate-300 font-mono">{log.response_time_in_ms} ms</p>
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