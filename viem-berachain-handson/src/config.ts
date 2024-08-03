// テストネットの設定
export const berachainTestnet = {
  id: 80084, // Berachain Testnet ChainID
  name: 'Berachain Testnet',
  network: 'berachain-testnet',
  nativeCurrency: {
    name: 'BERA',
    symbol: 'BERA',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://bartio.rpc.berachain.com/']
    }
  },
  blockExplorers: {
    default: {
      name: 'Berachain Explorer',
      url: 'https://bartio.beratrail.io/'
    }
  },
  testnet: true
};