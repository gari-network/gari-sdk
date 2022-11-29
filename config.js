
let config = {
    gariClientId: "",
    secretKey: '',
    GARI_URL: 'https://dev-gari-sdk-backend.chingari.io/',
    CLIENT_ID: "BO12qnqLP_vnsd3iCcH7sU3GGqYmOGr_1IgDno3t35KjWFZcdk7HIPeGGJINB4DKyvsX3YZeFdjwSbCUItLJI3U",
    RPCTARGET: "https://api.devnet.solana.com/",
    BLOCKEXPLORER: "https://explorer.solana.com/?cluster=devnet",
    TICKER: "SOL",
    CHAIN_ID: "0x3",    // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
    TICKERNAME: "Solana Token",
    NETWORK: 'testnet',
    NAME: "Demo React POC",
    VERIFIER_DOMAIN: "https://gari-sdk.vercel.app/"
}

function setConfig(clientId, environment = 'devnet') {
    config.gariClientId = clientId
    switch (environment) {
        case 'mainnet':
            // update config with prod details
            config.CHAIN_ID = '0x1'
            config.BLOCKEXPLORER = "https://explorer.solana.com/?cluster=mainnet"
            config.GARI_URL = ''
            config.RPCTARGET = 'https://old-fragrant-cherry.solana-mainnet.quiknode.pro/7dea43c300949ef871b6a44d58fa0e3cbdedd332/'
            break;

        case 'devnet':
            // update config with prod details
            config.CHAIN_ID = '0x3'
            config.BLOCKEXPLORER = "https://explorer.solana.com/?cluster=devnet"
            config.GARI_URL = 'https://dev-gari-sdk-backend.chingari.io/'
            config.RPCTARGET = 'https://damp-long-fog.solana-devnet.quiknode.pro/0d4914481d7110a0b5bc43d3a4070a684033e733/'
            break;

        default:
            break;
    }
}


function getConfig() {
    return config
}

module.exports = { setConfig, getConfig }
