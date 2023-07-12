const people = require('./people')
const School = require('./school')
const school = new School();
const _ = require('lodash');
const os = require('os');
const fs = require('fs');
const http = require('http');
const EventEmiter = require('events');
const emitter = new EventEmiter()
// emitter.on('call',()=>{
//     console.log('answer-the-call');
// })
// emitter.emit('call')
// console.log(_.last(people));
// console.log(os.homedir());
// fs.readFile('hello.txt',(err,data)=>{
//     console.log(data.toString());
// })
// console.log('hi');
// school.on('ring',()=>{
//     console.log('ring-the-phone');
// })
// school.ringStart()

const ourReadStream = fs.createReadStream(`${__dirname}/hello.txt`)
const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`)

ourReadStream.on('data', (chunk) => {
    ourWriteStream.write(chunk)
})

ourReadStream.pipe(ourWriteStream)


const server = http.createServer( (req, res) => {
    if (req.url == '/') {
        res.write("<html><title>Form</title>")
        res.write("<body><form action='/process' method='POST'><input name='message' /></form></body>")
        res.write("</html>")
        res.end();
    }else if (req.url == '/process' && req.method == 'POST') {
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            console.log('Stream Finished');
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody);
        })

        res.write(req.url)
        res.end();
    }else{
        res.write("404")
        res.end();
    }

});

server.listen(3000)