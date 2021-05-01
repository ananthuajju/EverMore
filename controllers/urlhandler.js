import urlMetaData from 'url-metadata'


// REGULAR EXPRESSION TO VALIDATE URL
const urlValReg = /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/;

function validate(url) {
    return urlValReg.test(url)
}

async function getMeta(url) { 
    const metadata = {}
    const data = await urlMetaData(url)
    metadata.url = data.url
    metadata.title = data.title || null
    metadata.description = data.description || null
    return metadata
}

const urlhandler = async function (reqbody) {
    if(validate(reqbody)===false){
        return false
    }
    const metaData = await getMeta(reqbody)
    return metaData
}

export default urlhandler
