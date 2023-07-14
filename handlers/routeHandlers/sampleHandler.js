/**
 * @author [Harunur_Rashid]
 * @email [example@mail.com]
 * @create date 2023-07-13 22:35:17
 * @modify date 2023-07-13 22:35:17
 * @desc [description]
 */

const handler={}

handler.sampleHandler=(requestProperties, callback)=>{
    callback(200, {
        message: 'Sample Handler'
    })
}

module.exports=handler
