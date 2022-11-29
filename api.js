const axios = require('axios')
const envConfig = require('./config.js')

/**
 * 
 * @param {String} token - jwt token for user information
 * @returns 
 */
function getWalletDetails(token) {
    const { GARI_URL, gariClientId } = envConfig.getConfig()
    return axios.get(`${GARI_URL}Appwallet/getWalletDetails`, {
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
    return axios.post(`${GARI_URL}Appwallet/newUserWallet`, { publicKey }, {
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
function getEncodedTransaction(transactionData, token) {
    const { GARI_URL, gariClientId } = envConfig.getConfig()
    return axios.post(`${GARI_URL}Appwallet/getEncodedTransaction`, transactionData, {
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
    const { GARI_URL, gariClientId, secretKey } = envConfig.getConfig()

    // todo: dont pass secerate key, hash body with secerate and backend will try to decrypti with secerate key
    return axios.post(`${GARI_URL}Appwallet/startTransactions`, { encodedTransaction }, {
        headers: {
            token,
            gariClientId,
            secretKey
        }
    })
}

/**
 * 
 * @param {string} data - data has publickey and balance 
 * @param {string} token - jwt token for user information
 * @returns 
 */
function getAirdrop(data, token) {
    const { GARI_URL } = envConfig.getConfig()
    return axios.post(`${GARI_URL}Appwallet/airdrop`, data, {
        headers: {
            token,
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
    return axios.get(`${GARI_URL}Appwallet/getTransactionById${transactionId}`, {
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
    const { GARI_URL, gariClientId } = envConfig.getConfig()
    return axios.post(`${GARI_URL}Appwallet/transactions`, data, {
        headers: {
            token,
            gariClientId
        }
    })
}

module.exports = { getTransaction, getTransactionByid, getWalletDetails, createWallet, getAirdrop, startTransactions, getEncodedTransaction }
