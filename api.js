const axios = require('axios')
const envConfig = require('./config.js')

/**
 * 
 * @param {String} jwtToken - jwt token for user information
 * @returns 
 */
function getWalletDetails(jwtToken) {
    const { GARI_URL, gariClientId } = envConfig.getConfig()
    return axios.get(`${GARI_URL}/appwallet/get-wallet-details`, {
        headers: {
            jwtToken,
            gariClientId
        }
    })
}

/**
 * 
 * @param {string} publicKey - publickey of user to create wallet
 * @param {string} jwtToken - jwt token for user information
 * @returns 
 */
function createWallet(publicKey, jwtToken) {
    const { GARI_URL, gariClientId } = envConfig.getConfig()
    return axios.post(`${GARI_URL}/appwallet/new-user-wallet`, { publicKey }, {
        headers: {
            jwtToken,
            gariClientId
        }
    })
}

/**
 * 
 * @param {object} transactionData - it has receiverpublickey and amountToTransfer & tokenToTransfer 
 * @param {string} jwtToken - jwt token for user information
 * @returns 
 */
function getEncodeTransaction(transactionData, jwtToken) {
    const { GARI_URL, gariClientId } = envConfig.getConfig()
    return axios.post(`${GARI_URL}/appwallet/get-encode-transaction`, transactionData, {
        headers: {
            jwtToken,
            gariClientId
        }
    })
}

/**
 * 
 * @param {string} encodedTransaction - encodedTransaction is base64 string of transaction Details.
 * @param {string} jwtToken - jwt token for user information
 * @returns 
 */
function startTransactions(encodedTransaction, transactionData, jwtToken) {
    const { GARI_URL, gariClientId } = envConfig.getConfig()

    // todo: dont pass secerate key, hash body with secerate and backend will try to decrypti with secerate key
    return axios.post(`${GARI_URL}/appwallet/initiate-transaction`, { encodedTransaction, ...transactionData }, {
        headers: {
            jwtToken,
            gariClientId,
        }
    })
}

/**
 * 
 * @param {object} airdropData 
 * @param {string} jwtToken 
 * @returns 
 */
function getEncodeTransactionAirdrop(airdropData, jwtToken) {
    const { GARI_URL, secretKey } = envConfig.getConfig();
    return axios.post(`${GARI_URL}/admin/get-encode-transaction-airdrop`, airdropData, {
        headers: {
            jwtToken,
            secretKey
        },
    });
}

/**
 * 
 * @param {string} airdropData - data has publickeys and tokenToTransfer and tokenAmount 
 * @param {string} jwtToken - jwt token for user information
 * @param {encodedTransaction} encodedTransaction - transaction info encoded into string('base64')
 * @returns 
 */
function getAirdrop(airdropData, encodedTransaction, jwtToken) {
    const { GARI_URL, secretKey } = envConfig.getConfig()
    return axios.post(`${GARI_URL}/admin/airdrop`, { ...airdropData, encodedTransaction }, {
        headers: {
            jwtToken,
            secretKey
        }
    })
}

/**
 * 
 * @param {string} transactionId - transaction id created while saving transaction.
 * @param {string} jwtToken - jwt token for user information
 * @returns 
 */
function getTransactionByid(transactionId, jwtToken) {
    const { GARI_URL, gariClientId } = envConfig.getConfig()
    return axios.get(`${GARI_URL}/appwallet/get-transaction-by-id${transactionId}`, {
        headers: {
            jwtToken,
            gariClientId
        }
    })
}

/**
 * 
 * @param {object} data - it has pagination data
 * @param {string} jwtToken - jwt token for user information
 * @returns 
 */
function getTransaction(data, jwtToken) {
    const { GARI_URL, secretKey } = envConfig.getConfig()
    return axios.post(`${GARI_URL}/admin/transactions`, data, {
        headers: {
            jwtToken,
            secretKey
        }
    })
}



module.exports = { getTransaction, getTransactionByid, getWalletDetails, createWallet, getAirdrop, startTransactions, getEncodeTransaction, getEncodeTransactionAirdrop }
