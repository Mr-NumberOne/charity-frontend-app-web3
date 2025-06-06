import { ShieldCheck, HandCoins, UserX, FileText, Globe, AlertTriangle, Copyright, GitCommit, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Section = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
            {icon}
        </div>
        <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <div className="space-y-4 text-muted-foreground">
                {children}
            </div>
        </div>
    </div>
);


export default function TermsPage() {
  return (
    <>
        <section className="bg-muted/50 py-16">
            <div className="container px-4 md:px-6 text-center">
                 <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-4" />
                 <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Terms of Service</h1>
                 <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Our commitment to you and the community. Please read these terms carefully before using our service.
                 </p>
                 <p className="text-xs text-muted-foreground mt-2">Last updated: June 7, 2025</p>
            </div>
        </section>
        <div className="container max-w-4xl mx-auto px-4 py-12 md:px-6 md:py-16">
          <div className="space-y-12">
            <Section icon={<FileText className="w-6 h-6"/>} title="1. The Service">
                <p>CharityOne provides a platform to facilitate cryptocurrency donations to charitable organizations ("Charities"). We are a platform provider and do not solicit donations. We are not a party to any agreement between a donor and a Charity.</p>
            </Section>

            <Section icon={<HandCoins className="w-6 h-6"/>} title="2. Donations">
                <p>All transactions are conducted on the Ethereum blockchain. When you make a donation, you are sending funds directly from your personal cryptocurrency wallet to the Charity's designated wallet address. CharityOne does not take custody of or control over any donated funds at any point.</p>
                <p>As all transactions are on the blockchain, they are final and irreversible. We have no ability to reverse or refund any donations.</p>
            </Section>

            <Section icon={<UserX className="w-6 h-6"/>} title="3. User Conduct">
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Violate any local, state, national, or international law.</li>
                    <li>Engage in any activity that is harmful, fraudulent, deceptive, or misleading.</li>
                    <li>Infringe upon the rights of others, including intellectual property rights.</li>
                    <li>Use any automated system to access the Service in a manner that sends more request messages to the servers than a human can reasonably produce in the same period by using a conventional on-line web browser.</li>
                </ul>
            </Section>

             <Section icon={<Globe className="w-6 h-6"/>} title="4. Vetting of Charities">
                <p>While we perform a due diligence process on Charities listed on our platform, we make no guarantees about their actions or the effectiveness of their programs. We encourage you to do your own research before making a donation.</p>
            </Section>

            <Section icon={<AlertTriangle className="w-6 h-6"/>} title="5. Disclaimers and Limitation of Liability">
                 <p>THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL CHARITYONE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES.</p>
            </Section>
            
            <Section icon={<Copyright className="w-6 h-6"/>} title="6. Intellectual Property">
                <p>The Service and its original content, features, and functionality are and will remain the exclusive property of CharityOne and its licensors. Our trademarks may not be used in connection with any product or service without our prior written consent.</p>
            </Section>

            <Section icon={<GitCommit className="w-6 h-6"/>} title="7. Changes to Terms">
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            </Section>

            <Section icon={<Phone className="w-6 h-6"/>} title="8. Contact Us">
                <p>If you have any questions about these Terms, please contact us through our <Link href="/contact" className="text-primary hover:underline">contact page</Link>.</p>
            </Section>
          </div>

           <div className="mt-16 text-center border-t pt-10">
                <h2 className="text-2xl font-bold">Ready to make a difference?</h2>
                <p className="mt-2 text-muted-foreground">
                    Browse our vetted causes and support a project you believe in.
                </p>
                <Button asChild className="mt-6">
                    <Link href="/causes">Explore Causes</Link>
                </Button>
            </div>
        </div>
    </>
  )
}
