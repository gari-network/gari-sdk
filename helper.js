const { CHAIN_NAMESPACES, WALLET_ADAPTERS } = require('@web3auth/base')
const { Web3AuthCore } = require('@web3auth/core')
const { OpenloginAdapter } = require('@web3auth/openlogin-adapter')
const { SolanaWallet } = require('@web3auth/solana-provider')
const envConfig = require('./config.js')


let web3auth;
let provider = null;
let privateKey

/**
 * 
 * @param {string} token - jwt token which will include user information
 * @returns 
 */
async function initialize(token) {
    const {
        BLOCKEXPLORER,
        TICKER,
        TICKERNAME, CLIENT_ID, CHAIN_ID, NETWORK, NAME, VERIFIER_DOMAIN, VERIFIER_NAME } = envConfig.getConfig()
    // get clientid from https://dashboard.web3auth.io

    try {
        web3auth = new Web3AuthCore({
            clientId: CLIENT_ID,
            chainConfig: {
                chainNamespace: CHAIN_NAMESPACES.SOLANA,
                chainId: CHAIN_ID,
                blockExplorer: BLOCKEXPLORER,
                ticker: TICKER,
                tickerName: TICKERNAME,
            },
        });

        const adapter = new OpenloginAdapter({
            adapterSettings: {
                network: NETWORK,
                loginConfig: {
                    jwt: {
                        // take this from config
                        name: NAME,
                        verifier: VERIFIER_NAME,
                        typeOfLogin: "jwt",
                        clientId: CLIENT_ID
                    },
                },
                whiteLabel: {
                    name: "ludoking",
                    logoLight : "https://as2.ftcdn.net/v2/jpg/04/26/52/83/1000_F_426528320_wRec6AsJNDTuT6AmwYspF6C7eqYZLC17.jpg",
                    logoDark : "https://as2.ftcdn.net/v2/jpg/04/26/52/83/1000_F_426528320_wRec6AsJNDTuT6AmwYspF6C7eqYZLC17.jpg",
                    defaultLanguage: "en",
                    dark: true, 
                },
            },
        });
        web3auth.configureAdapter(adapter);
        await web3auth.init();

        provider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
            loginProvider: "jwt",
            extraLoginOptions: {
                id_token: token,
                verifierIdField: "uid",
                // take this from config
                domain: VERIFIER_DOMAIN
            }
        });

        // initialize solanwallet form web3auth package
        const solanaWallet = new SolanaWallet(provider);

        // here will get publickey of user
        const accounts = await solanaWallet.requestAccounts();
        const publicKey = accounts[0];

        // const connectionConfig = await solanaWallet.request({
        //     method: "solana_provider_config",
        //     params: [],
        // });

        // here will get balance of user
        // const connection = new Connection(connectionConfig.rpcTarget);
        // const balance = await connection.getBalance(new PublicKey(publicKey));

        // here will get privatekey of user
        privateKey = await web3auth.provider.request({
            method: "solanaPrivateKey"
        });

        web3auth.clearCache();
        return { publicKey, privateKey };
    } catch (error) {
        console.error("Error Initialization ==> ", error);
        throw error;
    }
};
module.exports = initialize









