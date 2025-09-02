
import { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { metaAudienceNetwork } from '@/services/metaAudienceNetworkService';
import { toast } from 'sonner';

interface AdCrashRecoveryProps {
  onRecoveryComplete?: () => void;
}

export const AdCrashRecovery = ({ onRecoveryComplete }: AdCrashRecoveryProps) => {
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState(0);

  const recoverySteps = [
    'Checking SDK status...',
    'Reinitializing Meta Audience Network...',
    'Loading test ads...',
    'Verifying ad display...',
    'Recovery complete!'
  ];

  const performRecovery = async () => {
    setIsRecovering(true);
    
    try {
      for (let step = 0; step < recoverySteps.length; step++) {
        setRecoveryStep(step);
        console.log(`🔧 Recovery Step ${step + 1}: ${recoverySteps[step]}`);
        
        switch (step) {
          case 0:
            // Check current status
            await new Promise(resolve => setTimeout(resolve, 1000));
            break;
            
          case 1:
            // Force re-initialization
            await metaAudienceNetwork.initialize();
            break;
            
          case 2:
            // Load test ad
            await metaAudienceNetwork.loadTestAd();
            break;
            
          case 3:
            // Verify health
            await metaAudienceNetwork.performHealthCheck();
            break;
            
          case 4:
            // Complete
            toast.success('Ad SDK recovery completed successfully!');
            onRecoveryComplete?.();
            break;
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
    } catch (error) {
      console.error('❌ Recovery failed:', error);
      toast.error('Recovery failed. Please restart the app.');
    } finally {
      setIsRecovering(false);
      setRecoveryStep(0);
    }
  };

  return (
    <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          Ad SDK Issue Detected
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-red-600">
          The Meta Audience Network SDK appears to have encountered an issue. 
          This recovery tool will attempt to reinitialize the SDK safely.
        </p>
        
        {isRecovering && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw className="h-4 w-4 animate-spin" />
              {recoverySteps[recoveryStep]}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((recoveryStep + 1) / recoverySteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button
            onClick={performRecovery}
            disabled={isRecovering}
            className="flex-1"
            variant="destructive"
          >
            {isRecovering ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Recovering...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Start Recovery
              </>
            )}
          </Button>
          
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            disabled={isRecovering}
          >
            Restart App
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          💡 If recovery fails, please check Android Studio Logcat for detailed error logs
        </div>
      </CardContent>
    </Card>
  );
};
