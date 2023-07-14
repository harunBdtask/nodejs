/**
 * @author [Harunur_Rashid]
 * @email [example@mail.com]
 * @create date 2023-07-13 22:35:17
 * @modify date 2023-07-13 22:35:17
 * @desc [description]
 */

const handler={}

handler.notFoundHandler=(requestProperties, callback)=>{
    callback(404, {
        message: 'Not Found'
    })
}

module.exports=handler
