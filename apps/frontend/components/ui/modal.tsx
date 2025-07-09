"use client"
import React, { useRef, useState } from 'react';
import { Plus, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { api } from '@/lib/utils';
import { Website } from '@/lib/types';

type AddWebsiteError = {
  name?: string;
  url?: string;
}



interface AddWebsiteModalProps {
  onAddWebsite: (newWebsiteData: Website) => void
}

const AddWebsiteModal: React.FC<AddWebsiteModalProps> = ({ onAddWebsite }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<AddWebsiteError>({});
  const urlRef = useRef<HTMLInputElement | null>(null);

  const validateForm = () => {
    const newErrors: AddWebsiteError = {};
    const url = urlRef.current?.value;
    
    if (!url) {
      newErrors.url = 'URL is required';
    } else if (!/^https?:\/\/.+\..+/.test(url)) {
      newErrors.url = 'Please enter a valid URL (e.g., https://example.com)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddWebsite = async () => {
    if (!validateForm()) return;
    
    const url = urlRef.current?.value;
    
    setIsLoading(true);

    const res = await api.post('/api/website',{
        url
    })

    const newWebsite : Website = {
        url:res.data.data.url,
        id:res.data.data.id,
        status:"unknown",
        response_time_in_ms:'-',
        lastChecked:'-'
    }
    
    
    onAddWebsite(newWebsite);
    setIsLoading(false);
    setIsDialogOpen(false);

    if (urlRef.current) urlRef.current.value = '';
    setErrors({});
    
    console.log('Website added:', { name, url });
  };

  const clearError = (field: keyof AddWebsiteError) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Website
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-slate-100">Add New Website</DialogTitle>
          <DialogDescription className="text-slate-400">
            Add a new website or endpoint to monitor its uptime and performance.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="website-url" className="text-slate-200">Website URL</Label>
            <div className="relative">
              <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="website-url"
                placeholder="https://example.com"
                ref={urlRef}
                onChange={() => clearError('url')}
                className="pl-10 bg-slate-900/50 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-blue-500"
              />
            </div>
            {errors.url && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription className="text-sm">{errors.url}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsDialogOpen(false)}
            className="border-slate-700 text-slate-300 text-black"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddWebsite}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Website
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddWebsiteModal;