import { createPublicClient, http } from 'viem';
import { berachainTestnet } from './config';

// Create a client instance
const client = createPublicClient({
  chain: berachainTestnet,
  transport: http(berachainTestnet.rpcUrls.default.http[0]),
})

/**
 * Get the latest block number method
 */
async function getBlockNumber() {
  
  const blockNumber = await client.getBlockNumber()

  console.log("blockNumber:", blockNumber)
}

getBlockNumber().catch(console.error);