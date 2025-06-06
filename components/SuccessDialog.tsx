"use client"

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  causeName: string;
  amount: string;
}

export default function SuccessDialog({ open, onOpenChange, causeName, amount }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle className="h-12 w-12 text-primary animate-pulse" />
          </div>
          
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl">Success</DialogTitle>
            <DialogDescription className="pt-2 px-2 text-center">
              Take a moment to appreciate the beauty of the world around you, knowing that you
              have played a part in making it a better place.
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-6 w-full rounded-lg bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Your donation of</p>
            <p className="text-2xl font-bold">{amount} ETH</p>
            <p className="text-sm text-muted-foreground">to <span className="font-medium text-foreground">{causeName}</span> was successful</p>
          </div>
          
          <DialogFooter className="w-full">
            <Button className="w-full" onClick={() => onOpenChange(false)}>
              Continue
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
