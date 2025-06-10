export type Cause = {
    id: number;
    name: string;
    description: string;
    longDescription: string;
    imageSrc: string;
    category: string;
    website: string;
    goal: bigint;
    raised: bigint;
    donorsCount: bigint;
    walletAddress: `0x${string}`;
    isActive: boolean;
    featured: boolean;
  };
  