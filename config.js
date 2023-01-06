const { version } = require("./package.json");

let config = {
  gariClientId: "",
  secretKey: "",
  GARI_URL: "",
  CLIENT_ID: "", 
  BLOCKEXPLORER: "",
  TICKER: "SOL",
  CHAIN_ID: "", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
  TICKERNAME: "Solana Token",
  NETWORK: "",
  NAME: "",
  VERIFIER_NAME: "",
  VERIFIER_DOMAIN: "",
};

function setConfig(configDetails) {
  config.gariClientId = configDetails.gariClientId;
  config.secretKey = configDetails.secretKey;

  switch (configDetails.environment) {
    case "mainnet":
      // update config with prod details
      config.CLIENT_ID = configDetails.web3authClientId;
      config.CHAIN_ID = "0x1";
      config.NETWORK = "Aqua mainnet"
      config.BLOCKEXPLORER = "https://explorer.solana.com/?cluster=mainnet";
      config.VERIFIER_NAME = configDetails.verifierName;
      config.VERIFIER_DOMAIN = configDetails.verifierDomain;
      config.NAME = "Demo Ludo App" // should take from application
      config.GARI_URL = "gari prod url ";
      break;

    case "devnet":
      // update config with dev details
      config.CLIENT_ID = "BAGatRxirFvKTvUNeB_urIsfZsXUEh-JUcWSi432p_5pewX_0wEvYuGQBe1IjKI35lyrqTV5qDgFznmj6N7fdvY", // for pubg-india
      config.CHAIN_ID = "0x3";
      config.NETWORK = "testnet";
      config.BLOCKEXPLORER = "https://explorer.solana.com/?cluster=devnet";
      config.VERIFIER_NAME = "pubg-game-verifier";
      config.VERIFIER_DOMAIN = "https://demo-gari-sdk.vercel.app/"
      config.GARI_URL = "https://dev-gari-sdk-backend.chingari.io";
      config.NAME = "Demo React POC";
      break;

    default:
      break;
  }
}

function getConfig() {
  return config;
}

function packageVersion() {
  return version;
}

module.exports = { setConfig, getConfig, packageVersion };
