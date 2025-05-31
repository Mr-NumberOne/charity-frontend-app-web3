"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, MailCheck } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would send the email to your API
      setIsSubscribed(true);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-muted/60">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[800px]">
          {isSubscribed ? (
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Thanks for subscribing!</h2>
              <p className="text-muted-foreground">
                You're now on our list and will receive updates on the latest causes and impact stories.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <MailCheck className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Join Our Newsletter</h2>
              <p className="text-muted-foreground">
                Stay updated on the latest causes, success stories, and ways to make an impact.
              </p>
              <form onSubmit={handleSubmit} className="mt-2 w-full max-w-md space-y-2">
                <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="min-w-0 flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="flex-shrink-0">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}