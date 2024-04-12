import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import 'dotenv/config';
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  etherscan: {
    apiKey: {
      artio_testnet: "verifyContract", 
    },
    customChains: [
      {
        network: "artio_testnet",
        chainId: 80085,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/80085/etherscan/api",
          browserURL: "https://artio.beratrail.io"
        }
      }
    ]
  },
  networks: {
    artio_testnet: {
      url: 'https://artio.rpc.berachain.com/',
      accounts: [process.env.PRIVATE_KEY!]
    },
  },
  sourcify: {
    enabled: true
  }
};

export default config;
