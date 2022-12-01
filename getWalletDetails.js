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
        // we will first search the user in Sdk backend 
        // if user exist in sdk database then we will fetch and show publickey and balance of user
        const { data: response } = await getWalletDetails(token)
        if (response.data) {
            // user wallet details found in SDK backend
            const publicKey = response.data.publicKey
            const balance = response.data.balance
            return { publicKey, balance }
        }
        // userwallet details not found. now create new user wallet using web3auth 
        // initialize function initializes web3auth config and attach openlogin adapter
        // initialize function receives users JwtToken and creates public-private keypair     
        if (!response.userExist) {
            const newUserWeb3Login = await initialize(token);
            const { publicKey } = newUserWeb3Login;

            // will call creatwallet api from chingariSdkBackend and create user wallet using publickey without its tokenAssociatedAccount
            const { data } = await createWallet(publicKey, token)
            const balance = data.newWalletData.balance;
            return { publicKey, balance };
        }
    } catch (error) {
        console.log('error', error)
        throw Error(error)
    }
}

module.exports = createWalletOrGetWallet