/**
 * @author [Harunur_Rashid]
 * @email [example@mail.com]
 * @create date 2023-07-13 19:54:48
 * @modify date 2023-07-13 19:54:48
 * @desc [description]
 */

// dependencies
const url = require('url');
const {StringDecoder} = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
const handler = {}

// handle Request Response
handler.handleReqRes = (req,res)=>{
    const parsedUrl = url.parse(req.url,true)
    const path = parsedUrl.pathname
    const trimmedPath = path.replace(/^\/+|\/+$/g,'')
    const headerObj = req.headers
    const method = req.method.toLowerCase()
    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        headerObj,
        method,
    }
    const decoder = new StringDecoder('utf-8')
    let realData = ''
    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500
        payload = typeof(payload) === 'object' ? payload : {}
        const payloadString = JSON.stringify(payload)    
        // return final response
        res.writeHead(statusCode)
        res.end(payloadString)    
    })

    req.on('data',(buffer)=>{
        realData += decoder.write(buffer)
    })
    req.on('end',()=>{
        realData += decoder.end()
        // console.log(realData);
        res.end()
    })
    res.end()
}

module.exports=handler;
