
const checkAPIKey = (key) => {
    if(key === process.env.API_KEY){
        return true
    }
    return false
} 

module.exports = checkAPIKey
