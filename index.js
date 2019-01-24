'use strict';
process.setMaxListeners(0);
const Alexa = require('alexa-sdk');
const WebSocket = require('ws');
const websocketserverurl = 'ws://54.180.21.15:7979/';


const handlers = {
    'LaunchRequest': function () {
        console.log(`######LanchRequest######`);
        this.emit(':tell',`say like this! ask poly talk text John that I love you!`);
    },

    'sendall': function(){

        var something= this.event.request.intent.slots.asq.value;
        let ws = new WebSocket(websocketserverurl);

		ws.on('open', function open() {
            console.log(`7979에 보냄:`,something);
            ws.send(something);
        });

        ws.on('message',function message(message){            
            if(message.indexOf('PING')==-1){
                ws.close();
                console.log(`7979에서 받음:`,message);
                this.emit(':tell',message);
            }
        }.bind(this));
            
         //this.emit(':tell',`Your message that said ${something} has been successfully sent to your selected contacts.`);  
    },
/*
    'sendmessageall': function(){
  
      var anything = this.event.request.intent.slots.anything.value;
      var username =this.event.request.intent.slots.user.value;
     
        console.log(`anything:`,anything);
        console.log(`username:`,username);
        if(!anything || !username)
        {
            this.emit(':tell',`say like this! ask poly talk text John that I love you`);
        }
        else
        {
            username = username.toLowerCase();
            if(username=='everybody')
            {
                for(var i = 0 ; i <npdata.length ; i++)
                {
                    // sendmessage(anything,npdata[i].phonenumber);
                }
                this.emit(':tell',`Your message that said ${anything} has been successfully sent to ${username}.`);  
            }
            else
            {
                var phonenumber=`0`;
                console.log(`npdata:`,npdata);
                console.log(`npdata.length:`,npdata.length);
                for(var i = 0 ; i <npdata.length ; i++)
                {
                    if(npdata[i].name ==username)
                    {
                        phonenumber=npdata[i].phonenumber;
                        break;
                    }
                }
                if(phonenumber!='0')
                {
                    //sendmessage(anything,phonenumber);
                    this.emit(':tell',`Your message that said ${anything} has been successfully sent to ${username}.`);  
                }
                else
                {
                      this.emit(':tell',`poly talk can't find name ${username}.`);    
                }
             
              
            }
        }
    },
    */

    'AMAZON.StopIntent': function () {
        this.emit(':tell',`bye`);
    },

    'AMAZON.FallbackIntent': function () {
        console.log(`@@@fallbackintent@@@`);
        this.emit(':tell',`I didn't understand! say again!`);
    },

    'Unhandled': function () {
        console.log(`@@@UnHandeld@@@ Let's call stop intent`);
    },
    
    'SessionEndedRequest': function () {
        console.log(`######sessionend######`);
        this.emit(':tell',`session end!`);
    },
    
};


var APP_ID = 'amzn1.ask.skill.eeada234-5c75-4af5-b968-d7d11abd449d';  //operation server
exports.handler = (event, context,callback) => {
    const alexa = Alexa.handler(event, context,callback);
    alexa.appId = APP_ID;
    
    alexa.registerHandlers(handlers);
    alexa.execute();

};
