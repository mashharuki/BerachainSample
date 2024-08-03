import * as dotenv from 'dotenv';
import { createPublicClient, createWalletClient, formatEther, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { berachainTestnet } from './config';
import { crocPriceQueryABI } from './utils/abis/crocPriceQueryABI';
import { erc20Abi } from './utils/abis/erc20ABI';
import { multiSwapABI } from './utils/abis/multiSwapABI';
import { BERA_CROC_MULTI_SWAP_ADDRESS, CROC_QUERY_ADDRESS, HONEY, WBTC } from './utils/constants';

// 秘密鍵を環境変数からimportする
dotenv.config();

const {
  PRIVATE_KEY
} = process.env;

if (!PRIVATE_KEY) {
  throw new Error('Please set your PRIVATE_KEY in the .env file');
}
// signerオブジェクトを作成する
const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`) 

// Create a client instance
const client = createPublicClient({
  chain: berachainTestnet,
  transport: http(berachainTestnet.rpcUrls.default.http[0]),
})

// 自分のアカウントで資産を動かすためのクライアントを作成
const walletClient = createWalletClient({
  chain: berachainTestnet,
  transport: http(berachainTestnet.rpcUrls.default.http[0]),
  account
})

/**
 * Get the latest block number method
 */
async function getBlockNumber() {
  const blockNumber = await client.getBlockNumber()
  console.log("blockNumber:", blockNumber)
}

/**
 * Berachain上の自分のアカウントの$BERAの残高を参照するメソッド
 */
async function getAddressBalance(address: `0x${string}`) {
  try {
    const balance = await client.getBalance({ address });
    console.log(`Balance of ${address}: ${formatEther(balance)} BERA`);
  } catch (error) {
    console.error(`Failed to fetch balance for address ${address}:`, error);
  }
}

/**
 * Beraを送金するメソッド
 * @param to 
 * @param amount 
 */
async function sendBERA(to: `0x${string}`, amount: string) {
  try {
    // トランザクション送金
    const txHash = await walletClient.sendTransaction({
      account,
      to,
      value: parseEther(amount),
    });
    console.log(`Transaction sent! TX hash: ${berachainTestnet.blockExplorers.default.url}tx/${txHash}`);
  } catch (error) {
    console.error('Failed to send transaction:', error);
  }
}

/**
 * HONEYのトークンの総供給量を取得するメソッド
 */
async function getERC20TotalSupply() {
  // totalSupplyを取得する
  const data = await client.readContract({
    address: HONEY,
    abi: erc20Abi,
    functionName: 'totalSupply',
  })

  console.log(`HONEY total supply: ${data}`);
}

/**
 * 自分のERC20トークンの残高取得するメソッド
 */
async function getERC20Balance(tokenAddress: `0x${string}`, walletAddress: `0x${string}`) {
  try {
    // balanceOf メソッドを呼び出す
    const balance = await client.readContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [walletAddress],
    });

    console.log(`Balance of ${walletAddress} for token ${tokenAddress}: ${balance}`);
  } catch (error) {
    console.error('Failed to fetch ERC20 token balance:', error);
  }
}

/**
 * $HONEY-$WBTCのプールから価格情報を参照するメソッド
 */
async function queryPrice(base: string, quote: string, poolIdx: number) {
  try {
    // queryPriceメソッドを呼び出す。
    const priceRoot = await client.readContract({
      address: CROC_QUERY_ADDRESS,
      abi: crocPriceQueryABI,
      functionName: 'queryPrice',
      args: [base, quote, poolIdx],
    });
    console.log('Current Price Root:', priceRoot);
  } catch (error) {
    console.error('Failed to fetch price:', error);
  }
}

/**
 * CrocMultiSwapというコントラクトを介してBEXに対してトークンのSwapを実行するメソッド
 */
async function executeMultiSwap(swapSteps: any, amount: bigint, minOut: number) {
  try {
    // approveメソッドを呼び出す。
    const txHash = await walletClient.writeContract({
      address: HONEY,
      abi: erc20Abi,
      functionName: 'approve',
      args: [CROC_QUERY_ADDRESS, amount],
      value: BigInt(0),
    });

    console.log(`approve Transaction sent! TX hash: ${berachainTestnet.blockExplorers.default.url}tx/${txHash}`);

    // multiSwap関数を呼び出す
    const txHash2 = await walletClient.writeContract({
      address: BERA_CROC_MULTI_SWAP_ADDRESS,
      abi: multiSwapABI,
      functionName: 'multiSwap',
      args: [swapSteps, amount, minOut],
      value: BigInt(0),
    });
    console.log(`multiSwap Transaction sent! TX hash: ${berachainTestnet.blockExplorers.default.url}tx/${txHash2}`);
  } catch (error) {
    console.error('Failed to execute multiSwap:', error);
  }
}

/**
 * メインスクリプト
 */
const main = async () => {
  // ブロックナンバーを取得する。
  await getBlockNumber();
  // 残高を取得する
  await getAddressBalance(account.address);
  // 送金する
  //await sendBERA(account.address, '0.001');
  // HONEYの総供給量を取得する
  await getERC20TotalSupply();
  // 自分のHONEYの残高を取得する
  await getERC20Balance(HONEY, account.address);

  // トークンのアドレスとプールインデックスを指定する。
  const baseToken = HONEY;
  const quoteToken = WBTC;
  const poolIndex = 36001; // プールのインデックス(重要)

  // HONEY - WBTCのプールから価格情報を取得する
  await queryPrice(baseToken, quoteToken, poolIndex);


  // HONEYを売って、WBTCを買う情報を指定している。
  const swapSteps = [
    {
      poolIdx: 36001,
      base: baseToken,
      quote: quoteToken,
      isBuy: true,
    }
  ];

  // HONEYを0.1だけ売る
  const amount = parseEther("2");
  const minOut = BigInt(0); 
  // トークンのSwapを実行する
  await executeMultiSwap(swapSteps, amount, Number(minOut));
};

main().catch(console.error);