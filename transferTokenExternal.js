const { getEncodeTransactionExternal } = require('./api.js')
const initialize = require('gari/helper.js')
const { sdkValidate } = require('gari/sdkInitialize.js')
const { getDecodedTransction, partialSign } = require('./gariHelper.js')

/**
 * 
 * @param {string} jwtToken - jwt token for user information
 * @param {string} transactionData - receiver publickey and tokenToTransfer and tokenAmount  
 * @returns 
 */
async function transferGariTokenExternal(transactionData, jwtToken) {
    try {
        console.log('in external sdk frontend method ');
        const validate = sdkValidate()
        if (!validate) {
            throw new Error(`sdk not initialized`)
        }

        // web3auth initialize function call for getting privateKey of sender
        const againInitializeWeb3 = await initialize(jwtToken);
        const { privateKey } = againInitializeWeb3;

        const encodedTransactionDetails = await getEncodeTransactionExternal(transactionData, jwtToken)
        
        // encodedTransactionDetails is in toString("base64") format, to decode data : 
        const transactionDetailsWithoutSignatures = getDecodedTransction(encodedTransactionDetails.data.data);

        // partial sign from sender wallet  
        const userPartialSign = partialSign(transactionDetailsWithoutSignatures, privateKey)
        return { encodedTransaction: userPartialSign };

    } catch (error) {
        console.log('error in transferGariTokenExternal in SDK frontend ', error);
        throw Error(error)
    }
}
module.exports = transferGariTokenExternal