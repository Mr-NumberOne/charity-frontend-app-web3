export interface Cause {
  id: number
  name: string
  description: string
  longDescription: string
  imageSrc: string
  category: string
  goal: bigint
  raised: bigint
  donorsCount: bigint
  website: string
  walletAddress: string
  isActive: boolean
  featured: boolean
}
