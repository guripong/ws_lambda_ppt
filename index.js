'use strict';
process.setMaxListeners(0);
const Alexa = require('alexa-sdk');
const WebSocket = require('ws');
const websocketserverurl = 'ws://54.180.21.15:15234/';


const handlers = {
    'LaunchRequest': function () {
        console.log(`######LanchRequest######`);
        this.emit(':tell',`say like this! ask power point open!`);
    },


    'openppt':function(){
        console.log(`#####ppt-open######`);
        let ws = new WebSocket(websocketserverurl);
		ws.on('open', function open() {
            ws.send('open');
            //여기서 메시지도 받을수있나 테스트 해봐야함
        });

        ws.on('message',function message(message){
            
            if(message.indexOf('PING')==-1){
            ws.close();
            this.emit(':tell',message);
            }
        }.bind(this));

      
       
    },
    


    'pptclose':function(){
        console.log(`#####ppt-close######`);
        let ws = new WebSocket(websocketserverurl);
		ws.on('open', function open() {
			ws.send('close');
        });


        ws.on('message',function message(message){
            if(message.indexOf('PING')==-1){
            ws.close();
            this.emit(':tell',message);
            }
        }.bind(this));
        
    },

    'pptnextslide': function () {
        console.log(`######pptnextslide######`);
		let ws = new WebSocket(websocketserverurl);
		ws.on('open', function open() {
			ws.send('next');
		
        });
        ws.on('message',function message(message){
            if(message.indexOf('PING')==-1){
            ws.close();
            this.emit(':tell',message);
            }
        }.bind(this));
        
    },

	'pptprevslide': function () {
	
        console.log(`######pptprevslide######`);
		let ws = new WebSocket(websocketserverurl);
		ws.on('open', function open() {
			ws.send('previous');
        });		
        ws.on('message',function message(message){
            if(message.indexOf('PING')==-1){
                ws.close();
                this.emit(':tell',message);
            }
        }.bind(this));
    },

	'ppttoslide': function () {
        console.log(`######ppttovslide######`);
        var sn=this.event.request.intent.slots.slidenumber.value;
     
        let ws = new WebSocket(websocketserverurl);
		ws.on('open', function open() {
			ws.send('slide=' + sn);
        });
        ws.on('message',function message(message){
            if(message.indexOf('PING')==-1){
            ws.close();
            this.emit(':tell',message);
            }
        }.bind(this));
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


var APP_ID = 'amzn1.ask.skill.03a27e50-52d9-40ed-852b-7dabac9eaed3'; //operation server
exports.handler = (event, context,callback) => {
    const alexa = Alexa.handler(event, context,callback);
    alexa.appId = APP_ID;
    
    alexa.registerHandlers(handlers);
    alexa.execute();

};
