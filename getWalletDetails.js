const { createWallet, getWalletDetails, } = require('./api.js')
const { sdkValidate } = require('./sdkInitialize.js')
const initialize = require('./helper.js')

/**
 * 
 * @param {string} gariClientId - gariClientId of the app 
 * @param {string} token - jwt token for user information 
 * @returns 
 */
async function createWalletOrGetWallet(token) {
    try {
        const validate = sdkValidate()
        if (!validate) {
            throw new Error(`sdk not initialized`)
        }
   
        // fetch user : if exist then return publickey and its gariBalance
        const { data: response } = await getWalletDetails(token);
        if (response.data) {
            // user wallet details found 
            if(response.data.publicKey)
            {
                const publicKey = response.data.publicKey
                const balance = response.data.balance
                return { publicKey, balance }
            }
        }

        // userwallet details not found 
        //  web3auth generates pub/priv key pair for that userId      
        const newUserWeb3Login = await initialize(token);
        const { publicKey } = newUserWeb3Login;

        // create user wallet without its tokenAssociatedAccount  // token here refers to gari token
        const { data } = await createWallet(publicKey, token)
        const balance = data.data.balance;
        return { publicKey, balance };
    } catch (error) {
        console.log('error', error)
        throw Error(error)
    }
}

module.exports = createWalletOrGetWallet