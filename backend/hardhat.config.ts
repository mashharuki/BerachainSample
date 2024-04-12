import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import 'dotenv/config';
import fs from "fs";
import { HardhatUserConfig } from "hardhat/config";
import path from "path";

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
if (!SKIP_LOAD) {
  const taskPaths = ["utils", "mock"];
  taskPaths.forEach((folder) => {
    const tasksPath = path.join(__dirname, "tasks", folder);
    fs.readdirSync(tasksPath)
      .filter((_path) => _path.includes(".ts"))
      .forEach((task) => {
        require(`${tasksPath}/${task}`);
      });
  });
}

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    artio_testnet: {
      url: 'https://artio.rpc.berachain.com/',
      accounts: [process.env.PRIVATE_KEY!]
    },
  },
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
  sourcify: {
    enabled: true
  }
};

export default config;
