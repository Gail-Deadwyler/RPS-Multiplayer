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

  // Function to capitalize usernames
function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  
  // CHAT LISTENERS
  // Chat send button listener, grabs input and pushes to firebase. (Firebase's push automatically creates a unique key)
  $("#chat-send").click(function() {
    if ($("#chat-input").val() !== "") {
      var message = $("#chat-input").val();
  
      chatData.push({
        name: username,
        message: message,
        time: firebase.database.ServerValue.TIMESTAMP,
        idNum: playerNum
      });
  
      $("#chat-input").val("");
    }
  });

  // Chatbox input listener

$("#chat-input").keypress(function(e) {
    if (e.which === 13 && $("#chat-input").val() !== "") {
      var message = $("#chat-input").val();
  
      chatData.push({
        name: username,
        message: message,
        time: firebase.database.ServerValue.TIMESTAMP,
        idNum: playerNum
      });
  
      $("#chat-input").val("");
    }
  });
  
  // Click event for dynamically added <li> elements
  $(document).on("click", "li", function() {
    console.log("click");
  
    // Grabs text from li choice
    var clickChoice = $(this).text();
    console.log(playerRef);
  
    // Sets the choice in the current player object in firebase
    playerRef.child("choice").set(clickChoice);
  
    // User has chosen, so removes choices and displays what they chose
    $("#player" + playerNum + " ul").empty();
    $("#player" + playerNum + "chosen").text(clickChoice);
  
    // Increments turn. Turn goes from:
    // 1 - player 1
    // 2 - player 2
    // 3 - determine winner
    currentTurnRef.transaction(function(turn) {
      return turn + 1;
    });
  });