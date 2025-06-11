import * as React from 'react';
import { useWatchContractEvent } from 'wagmi';
import { CauseRegistryABI } from '@/lib/abi/CauseRegistry';

// Define the properties for the custom hook, now with a strongly-typed eventName
type CauseRegistryEventName =
  | 'CauseAdded'
  | 'CauseUpdated'
  | 'DonationMade';

type UseContractEventConfig = {
  eventName: CauseRegistryEventName;
  onEvent?: (logs: any) => void; // Optional callback for custom logic
};

/**
 * A custom React hook to listen for events from the main CauseRegistry smart contract
 * and trigger a component re-render. When a specified event occurs, the hook updates
 * its internal state, forcing the consuming component to refresh itself.
 * This is useful for keeping UI in sync with on-chain data.
 *
 * @param {UseContractEventConfig} config - The configuration object for the hook.
 * @param {string} config.eventName - The name of the event to listen for.
 * @param {(logs: any) => void} [config.onEvent] - An optional callback function to execute when the event is triggered.
 *
 * @returns {number} A counter that increments each time the event is fired.
 * While you can use this value, the primary purpose of the hook
 * is to trigger a re-render automatically.
 */
export function useContractEvent({
  eventName,
  onEvent,
}: UseContractEventConfig) {
    console.log("🚀 ~ file: useContractEvent.ts:63 ~ refreshCount:")

  // State to force a re-render. Every time an event is detected, we increment this value.
  const [refreshCount, setRefreshCount] = React.useState(0);

  // The contract address and ABI are now hardcoded for convenience,
  // making this hook specific to the CauseRegistry contract.
  const contractAddress = process.env.NEXT_PUBLIC_CAUSE_REGISTRY_ADDRESS as `0x${string}` | undefined;
  const contractAbi = CauseRegistryABI;

  useWatchContractEvent({
    address: contractAddress,
    abi: contractAbi,
    eventName,
    onLogs(logs) {
      console.log(`Event '${eventName}' detected on ${contractAddress}:`, logs);
      // Increment the counter to trigger a re-render in the component using this hook.
      setRefreshCount((prev) => prev + 1);

      // If an additional callback function is provided, execute it.
      if (onEvent) {
        onEvent(logs);
      }
    },
    onError(error) {
      console.error(`Error watching event '${eventName}' on ${contractAddress}:`, error);
    },
  });
  

  console.log("🚀 ~ file: useContractEvent.ts:63 ~ refreshCount:", refreshCount)
  return refreshCount;
}
