const { getEncodeTransaction } = require('./api.js')
const initialize = require('./helper')
const { sdkValidate } = require('./sdkInitialize')
const { getDecodedTransction, partialSign } = require('./gariHelper')

/**
 * 
 * @param {string} jwtToken - jwt token for user information
 * @param {string} transactionData - receiver publickey and tokenToTransfer and tokenAmount  
 * @returns 
 */
async function transferGariToken(transactionData, jwtToken) {
    try {
        const validate = sdkValidate()
        if (!validate) {
            throw new Error(`sdk not initialized`)
        }

        // web3auth initialize function call for getting privateKey of sender
        const againInitializeWeb3 = await initialize(jwtToken);
        const { privateKey } = againInitializeWeb3;

        const encodedTransactionDetails = await getEncodeTransaction(transactionData, jwtToken)
        
        // encodedTransactionDetails is in toString("base64") format, to decode data : 
        const transactionDetailsWithoutSignatures = getDecodedTransction(encodedTransactionDetails.data.data);

        // partial sign from sender wallet  
        const userPartialSign = partialSign(transactionDetailsWithoutSignatures, privateKey)
        return { encodedTransaction: userPartialSign };

    } catch (error) {
        console.log('error in transferGariToken in SDK frontend ', error);
        throw Error(error)
    }
}
module.exports = transferGariToken