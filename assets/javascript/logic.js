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

  // USERNAME LISTENERS
// Start button - takes username and tries to get user in game
$("#start").click(function() {
    if ($("#username").val() !== "") {
      username = capitalize($("#username").val());
      getInGame();
    }
  });
  
  // listener for 'enter' in username input
  $("#username").keypress(function(e) {
    if (e.which === 13 && $("#username").val() !== "") {
      username = capitalize($("#username").val());
      getInGame();
    }
  });