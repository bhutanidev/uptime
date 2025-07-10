"use client"

import { Activity, ArrowLeft, ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "./button"
import { useRouter } from "next/navigation"
import { Website } from "@/lib/types"

const DashboardHeader = ({website , isLoading}:{website:Website | null, isLoading : boolean})=>{
    const router = useRouter()
    return(<>
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
    </>)
}

export default DashboardHeader