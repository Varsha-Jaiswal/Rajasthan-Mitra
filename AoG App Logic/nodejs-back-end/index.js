// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const firebase = require("firebase");
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

var config = {
    apiKey: "AIzaSyCd5y0hjYBXCJDBSIe4TaHIOG4ugSAzcwU",
    authDomain: "rajasthantourism-887d9.firebaseapp.com",
    databaseURL: "https://rajasthantourism-887d9.firebaseio.com",
    projectId: "rajasthantourism-887d9",
    storageBucket: "rajasthantourism-887d9.appspot.com"
};
firebase.initializeApp(config);
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    // agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}

function callUserInfo(agent){
    var email1 = agent.parameters.email;
    console.log(email1);
    
    firebase.database().ref('userData').push({
        email: email1
    })
    
    agent.add(`Email : ${email1}. Do you want to explore the Lands of Maharajas (Yes/No)?`);
    
    
    //agent.add('Name: '+uname1+' and Email: '+uemail1);
}

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('userInfo', callUserInfo);
  agent.handleRequest(intentMap);
});
