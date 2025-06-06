import { Lock, Server, BrainCircuit, Bot, FileText, Globe, Link as LinkIcon, Edit } from "lucide-react";

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

export default function PrivacyPage() {
  return (
     <>
        <section className="bg-muted/50 py-16">
            <div className="container px-4 md:px-6 text-center">
                 <Lock className="mx-auto h-12 w-12 text-primary mb-4" />
                 <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Privacy Policy</h1>
                 <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Your privacy is important to us. Here's how we handle your data.
                 </p>
                 <p className="text-xs text-muted-foreground mt-2">Last updated: June 7, 2025</p>
            </div>
        </section>
        <div className="container max-w-4xl mx-auto px-4 py-12 md:px-6 md:py-16">
          <div className="space-y-12">
            <Section icon={<FileText className="w-6 h-6"/>} title="1. Information We Collect">
                <h3>Personal Information</h3>
                <p>The only personal information we collect is what you voluntarily provide to us. For example, if you subscribe to our newsletter, we will collect your email address.</p>
                <h3>Non-Personal Information</h3>
                <p>We may collect non-personal information about your visit, such as your browser type, language preference, referring site, and the date and time of each visitor request. Our purpose in collecting this information is to better understand how our visitors use the website.</p>
            </Section>

            <Section icon={<BrainCircuit className="w-6 h-6"/>} title="2. How We Use Your Information">
                <p>We use the information we collect in various ways, including to:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Provide, operate, and maintain our website.</li>
                    <li>Improve, personalize, and expand our website.</li>
                    <li>Understand and analyze how you use our website.</li>
                    <li>Communicate with you for customer service, updates, and marketing (if you opt-in).</li>
                </ul>
            </Section>

            <Section icon={<Bot className="w-6 h-6"/>} title="3. Blockchain Data and Web3 Wallets">
                <p>CharityOne is a Web3 platform. We do not collect or store your private keys, passwords, or any other information related to your cryptocurrency wallet. Your interaction with the blockchain is managed by your personal wallet (e.g., MetaMask), and we are never a custodian of your assets.</p>
                <p>All donation transactions are public information on the Ethereum blockchain. This includes your public wallet address, the recipient's wallet address, the amount transferred, and the transaction hash. This information is not linked to your personal identity on our platform.</p>
            </Section>
            
            <Section icon={<Server className="w-6 h-6"/>} title="4. Data Security">
                <p>We are committed to protecting the information you provide to us. However, please remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
            </Section>

            <Section icon={<LinkIcon className="w-6 h-6"/>} title="5. Third-Party Services">
                 <p>Our Service may contain links to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
            </Section>

            <Section icon={<Edit className="w-6 h-6"/>} title="6. Changes to This Policy">
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>
            </Section>
          </div>
        </div>
     </>
  )
}
