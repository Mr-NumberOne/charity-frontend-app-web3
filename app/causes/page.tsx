import { CausesList } from '@/components/CausesList';

/**
 * The main page for exploring all charitable causes.
 * This is a server component that sets up the page layout.
 * The actual on-chain data fetching and interaction is delegated
 * to the `CausesList` client component.
 */
export default function CausesPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter flex items-center">
          Explore Causes
        </h1>
        <p className="text-muted-foreground max-w-[700px]">
          Discover impactful, on-chain projects supporting global communities. Find a cause that resonates with you.
        </p>
      </div>
      
      {/* Render the client component that handles all the web3 logic.
        This keeps the page structure clean and separates concerns.
      */}
      <CausesList />
      
    </div>
  );
}
