
const web3 = require('@solana/web3.js')

/**
 * 
 * @param {string} encodedTransction - base64 string of transaction instruction
 * @returns 
 */
function getDecodedTransction(encodedTransction) {
    let encodedTransctionInBuffer = Buffer.from(encodedTransction, 'base64'); // get encoded buffer
    return web3.Transaction.from(encodedTransctionInBuffer);
}

/**
 * 
 * @param {string} transactionDetails - base64 string of transaction
 * @param {string} privateKey - privateKey of user : it should be in hex format 
 * @returns 
 */
function partialSign(transactionDetails, privateKey) {
    // first we will partialsign on transaction using senders(ludo user) privatekey
    // hex is used bcoz web3auth provides privatekey in hex format 
    const fromWallet = web3.Keypair.fromSecretKey(Buffer.from(privateKey, "hex"))  

    transactionDetails.partialSign(...[fromWallet]);

    const wireTransaction = transactionDetails.serialize({
        requireAllSignatures: true,
        verifySignatures: false,
    });

    return wireTransaction.toString('base64');
}

module.exports = { partialSign, getDecodedTransction }

