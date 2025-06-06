import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, MessageSquare, User, Twitter, Linkedin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-20">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          Have a question, feedback, or a partnership inquiry? We'd love to hear from you.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>Our team will get back to you shortly.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="name" placeholder="Your name" className="pl-10" />
                    </div>
                    <div className="relative">
                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="your@email.com" className="pl-10"/>
                    </div>
                    <div className="relative">
                         <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea id="message" placeholder="Your message..." className="min-h-[120px] pl-10 pt-3" />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                </div>
            </CardContent>
        </Card>
        
        <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
                <Mail className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-bold text-lg">Email Us</h3>
                <p className="text-muted-foreground text-sm mb-2">For general inquiries and support.</p>
                <a href="mailto:contact@charityone.org" className="text-primary font-medium hover:underline">contact@charityone.org</a>
            </div>
             <div className="rounded-lg border bg-card p-6">
                <Twitter className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-bold text-lg">Follow Us</h3>
                <p className="text-muted-foreground text-sm mb-2">Stay up to date on social media.</p>
                <a href="#" className="text-primary font-medium hover:underline">@CharityOne on X</a>
            </div>
        </div>
      </div>
    </div>
  )
}
