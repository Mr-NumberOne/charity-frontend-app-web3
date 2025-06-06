import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h1>
        <p className="mt-4 text-muted-foreground">
          Find answers to the most common questions about CharityOne.
        </p>
      </div>
      <Card>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How are charities vetted?</AccordionTrigger>
              <AccordionContent>
                Our team performs a thorough due diligence process for every organization. This includes verifying their non-profit status, reviewing financial health, and assessing their track record of impact and transparency. We ensure that every cause on our platform is legitimate and effective.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I donate anonymously?</AccordionTrigger>
              <AccordionContent>
                Yes. Since donations are made directly to the charity's wallet address from your own, your personal identity is not directly linked to the transaction on our platform. The transaction is pseudonymous on the blockchain.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What are the fees?</AccordionTrigger>
              <AccordionContent>
                CharityOne does not charge any platform fees on donations. 100% of your crypto donation is sent to the charity's wallet. You will only need to cover the standard network transaction fee (gas fee) required by the Ethereum blockchain.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How can I get a receipt for my donation?</AccordionTrigger>
              <AccordionContent>
                All transactions are publicly verifiable on the blockchain. You can use a blockchain explorer like Etherscan to view and confirm your transaction. This serves as a permanent, transparent record of your contribution. For tax purposes, please consult with a tax professional.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

       <div className="mt-12 text-center bg-muted p-8 rounded-lg">
          <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-2xl font-bold">Still have questions?</h2>
          <p className="mt-2 text-muted-foreground">
            If you can't find the answer you're looking for, please don't hesitate to reach out to our support team.
          </p>
          <Button asChild className="mt-6">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
    </div>
  );
}
