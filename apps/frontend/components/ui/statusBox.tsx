import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Website } from '@/lib/types';
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


interface StatusBoxProps {
  website: Website;
  isLoading: boolean;
}
const StatusBox: React.FC<StatusBoxProps> = ({ website, isLoading }) => {
  const getStatusDisplay = (status: Website['status']) => {
    switch (status) {
      case 'up':
        return {
          icon: <CheckCircle className="w-8 h-8" />,
          text: 'Up',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          textColor: 'text-green-400'
        };
      case 'down':
        return {
          icon: <XCircle className="w-8 h-8" />,
          text: 'Down',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/20',
          textColor: 'text-red-400'
        };
      case 'unknown':
        return {
          icon: <HelpCircle className="w-8 h-8" />,
          text: 'Unknown',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/20',
          textColor: 'text-gray-400'
        };
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-slate-900/30 h-80 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="flex items-center space-x-2 text-slate-400">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Loading status...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusDisplay = getStatusDisplay(website.status);

  return (
    <Card className={`bg-slate-900/30 border-slate-800 h-80 ${statusDisplay.borderColor}`}>
      <CardHeader>
        <CardTitle className="text-slate-100">Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`p-4 rounded-full ${statusDisplay.bgColor}`}>
            <div className={statusDisplay.textColor}>
              {statusDisplay.icon}
            </div>
          </div>
          <div>
            <p className={`text-2xl font-bold ${statusDisplay.textColor}`}>
              {statusDisplay.text}
            </p>
            <p className="text-lg font-mono text-slate-100 mt-2">{website.response_time_in_ms}</p>
            <p className="text-sm text-slate-400">Last checked: {website.lastChecked}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusBox