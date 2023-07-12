const EventEmiter = require('events');

class School extends EventEmiter{
    ringStart(){
        console.log('ringing');
        this.emit('ring')
    }
}

module.exports = School;