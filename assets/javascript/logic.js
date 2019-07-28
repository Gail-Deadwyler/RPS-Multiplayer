// Initialize Firebase
var config = {
    apiKey: "AIzaSyAgEuXgOYwmHK_RqpVzMIJDRLD5ZB7UbbQ",
    authDomain: "rps-multi-7fedd.firebaseapp.com",
    databaseURL: "https://rps-multi-7fedd.firebaseio.com",
    storageBucket: "rps-multi-7fedd.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  var chatData = database.ref("/chat");
  var playersRef = database.ref("players");
  var currentTurnRef = database.ref("turn");
  var username = "Guest";
  var currentPlayers = null;
  var currentTurn = null;
  var playerNum = false;
  var playerOneExists = false;
  var playerTwoExists = false;
  var playerOneData = null;
  var playerTwoData = null;