"use client"
import React, { useEffect, useState } from 'react';
import { 
  Activity, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  Settings,
  Bell,
  Search,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AddWebsiteModal from '@/components/ui/modal';
import { api } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Website } from '@/lib/types';



const UptimeHomeDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [websites, setWebsites] = useState<Website[]>([]);
  const router = useRouter()

  const handleAddWebsite = (newWebsiteData:Website) => {
    setWebsites(prev => [...prev, newWebsiteData]);
  };

  const handleWebsiteClick = (website: Website) => {
    console.log('Navigating to website details:', website.id)
    router.push(`/dashboard/${website.id}`)
  };

  const getStatusBadge = (status: Website['status']) => {
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

  const getOverallStats = () => {
    const total = websites.length;
    const up = websites.filter(w => w.status === 'up').length;
    const down = websites.filter(w => w.status === 'down').length;
    const unknown = websites.filter(w => w.status === 'unknown').length;
    
    return { total, up, down, unknown };
  };

  const stats = getOverallStats();
  
  const filteredWebsites = websites.filter(website =>
    website.url.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(()=>{
    const fetchWebsites = async()=>{
        const ct = Date.now()
        try {
            const res = await api.get('/api/website')
            console.log(res.data.data.websites)
            console.log(ct)
            
            const websites : Website[] = res.data.data.websites.map((website:any)=>{
                const targetTime = new Date(website.createdAt).getTime()
                const diffMs = ct - targetTime
                const diffMinutes = Math.floor(diffMs / (1000 * 60))
                return{
                    id : website.id,
                    url : website.url,
                    status : website.status,
                    response_time_in_ms : website.response_time_in_ms,
                    lastChecked: diffMinutes
                }
            })
            setWebsites([...websites])
        } catch (error) {
            console.log(error)
        }
    }
    fetchWebsites()
    console.log("use effect called");
    
  },[setWebsites])
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-100">Uptime</h1>
                  <p className="text-sm text-slate-400">Monitoring Dashboard</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                  <LogOut className="w-4 h-4 mr-2 text-black" />
                  <span className=' text-black'>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Stats Overview */}
          {/* Website Management Section */}
          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-slate-100">Monitored Websites</CardTitle>
                  <CardDescription className="text-slate-400">
                    Manage and monitor your website endpoints
                  </CardDescription>
                </div>
                
                <AddWebsiteModal onAddWebsite={handleAddWebsite} />
              </div>
              
              {/* Search Bar */}
              <div className="flex items-center space-x-4 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search websites..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-blue-500"
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="rounded-lg border border-slate-800 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-800 hover:bg-slate-800/50">
                      <TableHead className="text-slate-300 font-medium">#</TableHead>
                      <TableHead className="text-slate-300 font-medium">Website URL</TableHead>
                      <TableHead className="text-slate-300 font-medium">Status</TableHead>
                      <TableHead className="text-slate-300 font-medium">Response Time</TableHead>
                      <TableHead className="text-slate-300 font-medium">Last Checked</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWebsites.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-slate-400">
                          {searchTerm ? 'No websites found matching your search.' : 'No websites added yet. Click "Add Website" to get started.'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredWebsites.map((website,ind) => (
                        <TableRow 
                          key={website.id} 
                          className="border-slate-800 hover:bg-slate-800/50 cursor-pointer transition-colors"
                          onClick={() => handleWebsiteClick(website)}
                        >
                          <TableCell className="text-slate-300 font-mono">{ind+1}</TableCell>
                          <TableCell>
                            <div className="font-medium text-slate-100 truncate max-w-xs">
                              {website.url}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(website.status)}</TableCell>
                          <TableCell className="text-slate-300 font-mono">{website.response_time_in_ms}</TableCell>
                          <TableCell className="text-slate-400">{website.lastChecked} mins ago</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default UptimeHomeDashboard;