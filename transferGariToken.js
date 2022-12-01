const { getEncodedTransaction } = require('./api.js')
const initialize = require('./helper')
const { sdkValidate } = require('./sdkInitialize')
const { getDecodedTransction, partialSign } = require('./gariHelper')

/**
 * 
 * @param {string} token - jwt token for user information
 * @param {string} receiverPublicKey - receiver publickey for transaction
 * @param {string} coins - amount to be transfer(in lamports)
 * @returns 
 */
async function transferGariToken(token, receiverPublicKey, coins) {
    try {
        const validate = sdkValidate()
        if (!validate) {
            throw new Error(`sdk not initialized`)
        }

        // will call web3auth initialize function for getting privateKey of sender
        const againInitializeWeb3 = await initialize(token);
        const { privateKey } = againInitializeWeb3;

        // receiverPublicKey & amount are the arguments passed to getEncodedTransaction function
        const transactionData = {
            receiverPublicKey,
            amount: coins
        }

        // get encodedTransactionDetails in toString("base64") format by calling SDK backend getEncodedTransaction function
        // encodedTransaction : it contains all transactions instructions(i.e sender/receiver tokenAssociatedAccount, feepayer(chingari), add recentblockhash obj)
        const encodedTransactionDetails = await getEncodedTransaction(transactionData, token)

        // encodedTransactionDetails is in toString("base64") format, to decode data : 
        const transactionDetailsWithoutSignatures = getDecodedTransction(encodedTransactionDetails.data);

        // In below fn will send decodedTransation data for users partial signing 
        const userPartialSign = partialSign(transactionDetailsWithoutSignatures, privateKey)

        return { encodedTransaction: userPartialSign };

    } catch (error) {
        console.log('error in transferGariToken in SDK frontend ', error);
        throw Error(error)
    }
}
module.exports = transferGariToken