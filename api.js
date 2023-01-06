const axios = require('axios')
const envConfig = require('./config.js')

/**
 * 
 * @param {String} token - jwt token for user information
 * @returns 
 */
function getWalletDetails(token) {
    const { GARI_URL, gariClientId } = envConfig.getConfig()
    return axios.get(`${GARI_URL}/appwallet/get-wallet-details`, {
        headers: {
            token,
            gariClientId
        }
    })
}

/**
 * 
 * @param {string} publicKey - publickey of user to create wallet
 * @param {string} token - jwt token for user information
 * @returns 
 */
function createWallet(publicKey, token) {
    const { GARI_URL, gariClientId } = envConfig.getConfig()
    return axios.post(`${GARI_URL}/appwallet/new-user-wallet`, { publicKey }, {
        headers: {
            token,
            gariClientId
        }
    })
}

/**
 * 
 * @param {object} transactionData - it has receiver publickey and amount 
 * @param {string} token - jwt token for user information
 * @returns 
 */
function getEncodeTransaction(transactionData, token) {
    const { GARI_URL, gariClientId } = envConfig.getConfig()
    return axios.post(`${GARI_URL}/appwallet/get-encode-transaction`, transactionData, {
        headers: {
            token,
            gariClientId
        }
    })
}

/**
 * 
 * @param {string} encodedTransaction - encodedTransaction is base64 string of transaction Details.
 * @param {string} token - jwt token for user information
 * @returns 
 */
function startTransactions(encodedTransaction, token) {
    const { GARI_URL, gariClientId } = envConfig.getConfig()

    // todo: dont pass secerate key, hash body with secerate and backend will try to decrypti with secerate key
    return axios.post(`${GARI_URL}/appwallet/initiate-transaction`, { encodedTransaction }, {
        headers: {
            token,
            gariClientId,
        }
    })
}

/**
 * 
 * @param {object} airdropData 
 * @param {string} token 
 * @returns 
 */
function getEncodeTransactionAirdrop(airdropData, token) {
    const { GARI_URL, secretKey } = envConfig.getConfig();
    // get encoded transaction instructions
    return axios.post(`${GARI_URL}/admin/get-encode-transaction-airdrop`, airdropData, {
        headers: {
            token,
            secretKey
        },
    });
}

/**
 * 
 * @param {string} data - data has publickey and balance 
 * @param {string} token - jwt token for user information
 * @returns 
 */
function getAirdrop(publicKey, airdropAmount, encodedTransaction, token) {
    const { GARI_URL, secretKey } = envConfig.getConfig()
    return axios.post(`${GARI_URL}/admin/airdrop`, { publicKey, airdropAmount, encodedTransaction }, {
        headers: {
            token,
            secretKey
        }
    })
}

/**
 * 
 * @param {string} transactionId - transaction id created while saving transaction.
 * @param {string} token - jwt token for user information
 * @returns 
 */
function getTransactionByid(transactionId, token) {
    const { GARI_URL, gariClientId } = envConfig.getConfig()
    return axios.get(`${GARI_URL}/appwallet/get-transaction-by-id${transactionId}`, {
        headers: {
            token,
            gariClientId
        }
    })
}

/**
 * 
 * @param {object} data - it has pagination data
 * @param {string} token - jwt token for user information
 * @returns 
 */
function getTransaction(data, token) {
    const { GARI_URL, secretKey } = envConfig.getConfig()
    return axios.post(`${GARI_URL}/admin/transactions`, data, {
        headers: {
            token,
            secretKey
        }
    })
}



module.exports = { getTransaction, getTransactionByid, getWalletDetails, createWallet, getAirdrop, startTransactions, getEncodeTransaction, getEncodeTransactionAirdrop }
