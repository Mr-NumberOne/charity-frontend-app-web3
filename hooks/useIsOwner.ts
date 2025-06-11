import { useAccount, useReadContract } from "wagmi";
import { type Address } from "viem";
import { CauseRegistryABI } from "@/lib/abi/CauseRegistry";

// Get the contract address from the environment variables.
const causeRegistryAddress = process.env.NEXT_PUBLIC_CAUSE_REGISTRY_ADDRESS as Address | undefined;

/**
 * A custom hook to determine if the currently connected user is the owner 
 * of the CauseRegistry contract. It centralizes the logic for fetching and 
 * comparing addresses.
 * * @returns {object} An object containing:
 * - `isOwner` (boolean): True if the connected user is the contract owner.
 * - `isLoading` (boolean): True while the owner address is being fetched.
 * - `isError` (boolean): True if there's an error fetching or the contract address is missing.
 */
export function useIsOwner() {
  // Get the connected user's account information from wagmi.
  const { address: connectedAddress, isConnected } = useAccount();

  // Read the owner's address from the smart contract using wagmi's hook.
  const { data: ownerAddress, isLoading, isError: isReadError } = useReadContract({
    address: causeRegistryAddress,
    abi: CauseRegistryABI,
    functionName: 'owner',
    // This query is only enabled if the contract address is available.
    query: { enabled: !!causeRegistryAddress },
  });

  // Determine if the connected user is the owner.
  // The check is only valid if both the owner and connected addresses are available.
  const isOwner = !!(
    isConnected &&
    ownerAddress &&
    connectedAddress &&
    ownerAddress.toLowerCase() === connectedAddress.toLowerCase()
  );

  // Combine the hook's error state with a check for the contract address.
  const isError = isReadError || !causeRegistryAddress;

  return { 
    isOwner, 
    isLoading,
    isError
  };
}
