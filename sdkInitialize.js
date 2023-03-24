const envConfig = require('./config.js')
/**
 * @description if using in backend, need to pass gariSecretKey
 * @param {string} gariClientId 
 * @param {string?} gariSecretKey 
 */
function sdkInitialize(configDetails) {
    envConfig.setConfig(configDetails);
    const configData = envConfig.getConfig()
    console.log('configData on initializing sdk ', configData)
}

function sdkValidate(type) {
    const configData = envConfig.getConfig()
    if (!configData.gariClientId) {
        return false
    }
    if (type == `backend` && !configData.secretKey) {
        return false
    }
    return true
}
module.exports = { sdkInitialize, sdkValidate }