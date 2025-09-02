
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, RefreshCw, Bug } from 'lucide-react';
import { metaAudienceNetwork } from '@/services/metaAudienceNetworkService';
import { toast } from 'sonner';

export const AdDebugPanel = () => {
  const [status, setStatus] = useState<any>({});
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    updateStatus();
    const interval = setInterval(updateStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = () => {
    setStatus(metaAudienceNetwork.getStatus());
    setDebugInfo(metaAudienceNetwork.getDebugInfo());
  };

  const performHealthCheck = async () => {
    setIsRefreshing(true);
    try {
      const result = await metaAudienceNetwork.performHealthCheck();
      if (result) {
        toast.success('Health check passed!');
      } else {
        toast.error('Health check failed - check console for details');
      }
      updateStatus();
    } catch (error) {
      toast.error('Health check error');
      console.error('Health check error:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card className="border-dashed border-orange-500/30 bg-orange-50/50 dark:bg-orange-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Bug className="h-4 w-4 text-orange-500" />
          Ad SDK Debug Panel
          <Badge variant={status.isInitialized ? 'default' : 'destructive'} className="ml-auto">
            {status.isInitialized ? 'Ready' : 'Not Ready'}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3 text-sm">
        {/* SDK Status */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            {status.isInitialized ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : (
              <AlertCircle className="h-3 w-3 text-red-500" />
            )}
            <span>SDK Status</span>
          </div>
          <span className="text-right text-muted-foreground">
            {status.isInitialized ? 'Initialized' : 'Not Ready'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <span>Platform</span>
          <span className="text-right text-muted-foreground">
            {status.isNative ? 'Native' : 'Web'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <span>Test Mode</span>
          <span className="text-right text-muted-foreground">
            {status.testMode ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <span>SDK Version</span>
          <span className="text-right text-muted-foreground">
            {status.sdkVersion || 'Unknown'}
          </span>
        </div>

        {/* Ad Status */}
        <div className="grid grid-cols-2 gap-2">
          <span>Banner Loaded</span>
          <span className="text-right">
            {status.bannerLoaded ? '✅' : '⏳'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <span>Interstitial Ready</span>
          <span className="text-right">
            {status.interstitialLoaded ? '✅' : '⏳'}
          </span>
        </div>

        {/* Debug Info */}
        <div className="grid grid-cols-2 gap-2">
          <span>Ad Requests</span>
          <span className="text-right text-muted-foreground">
            {debugInfo.adRequests || 0}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <span>Init Attempts</span>
          <span className="text-right text-muted-foreground">
            {debugInfo.initAttempts || 0}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <span>Errors</span>
          <span className="text-right text-muted-foreground">
            {debugInfo.errors?.length || 0}
          </span>
        </div>

        {debugInfo.lastBidRequest && (
          <div className="grid grid-cols-2 gap-2">
            <span>Last Request</span>
            <span className="text-right text-muted-foreground text-xs">
              {debugInfo.lastBidRequest}
            </span>
          </div>
        )}

        {status.error && (
          <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded text-xs text-red-600">
            <strong>Error:</strong> {status.error}
          </div>
        )}

        {debugInfo.lastError && (
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded text-xs text-yellow-600">
            <strong>Last Error:</strong> {debugInfo.lastError}
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 border-t">
          <Button 
            onClick={performHealthCheck}
            disabled={isRefreshing}
            size="sm"
            variant="outline"
            className="w-full"
          >
            {isRefreshing ? (
              <>
                <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
                Running Check...
              </>
            ) : (
              <>
                <Bug className="h-3 w-3 mr-2" />
                Health Check
              </>
            )}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          💡 Check console logs for detailed information
        </div>
      </CardContent>
    </Card>
  );
};
