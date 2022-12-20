
const {version} = require('./package.json');

let config = {
    gariClientId: "",
    secretKey: '',
    GARI_URL: '',
    CLIENT_ID: "BAGatRxirFvKTvUNeB_urIsfZsXUEh-JUcWSi432p_5pewX_0wEvYuGQBe1IjKI35lyrqTV5qDgFznmj6N7fdvY", // for pubg-india
    RPCTARGET: "",
    BLOCKEXPLORER: "https://explorer.solana.com/?cluster=devnet",
    TICKER: "SOL",
    CHAIN_ID: "0x3",    // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
    TICKERNAME: "Solana Token",
    NETWORK: 'testnet',
    NAME: "Demo React POC",
    VERIFIER_NAME : "",
    VERIFIER_DOMAIN: "https://demo-gari-sdk.vercel.app/"
}

function setConfig(clientId, secretKey, environment = 'devnet') {
    config.gariClientId = clientId
    config.secretKey = secretKey
    switch (environment) {
        case 'mainnet':
            // update config with prod details
            config.CHAIN_ID = '0x1'
            config.BLOCKEXPLORER = "https://explorer.solana.com/?cluster=mainnet"
            config.GARI_URL = ''
            config.RPCTARGET = 'https://rpc.ankr.com/solana'
            break;

        case 'devnet':
            // update config with prod details
            config.CHAIN_ID = '0x3'
            config.BLOCKEXPLORER = "https://explorer.solana.com/?cluster=devnet"
            config.GARI_URL = 'https://dev-gari-sdk-backend.chingari.io'
            config.RPCTARGET = 'https://api.devnet.solana.com/'
            config.VERIFIER_NAME = "pubg-game-verifier"
            break;

        default:
            break;
    }
}


function getConfig() {
    return config
}

function packageVersion(){

    return version
}

module.exports = { setConfig, getConfig, packageVersion }
