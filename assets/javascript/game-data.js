window.gameInfo = {
  player: "playerOne",
  gameId: 1,
  opponent: "playerTwo",
};

/* var angle = 0; */
/* var power = 0; */

function joinGame(newGameId, db) {
  db.ref("games/" + newGameId).once("value").then(function (snap) {
    if (snap.val()) {
      window.gameInfo = {
        player: "playerTwo",
        gameId: newGameId,
        opponent: "playerOne",
      };
      $(".overlay").addClass("hidden");
      addOpponentListeners(window.gameInfo);
    } else {
      alert("Please enter a valid id or start a new game");
    };
  });
}

function startGame() {
  var newGameId = Math.floor(Date.now() / 1000);
  window.gameInfo = {
    player: "playerOne",
    gameId: newGameId,
    opponent: "playerTwo",
  };
  createNewGame(newGameId);
  $(".overlay").addClass("hidden");
  alert("Welcome Player One.\nYour new game id is " + window.gameInfo.gameId);
  addOpponentListeners(window.gameInfo);
}

function fireCannon(gameInfo) {
  var currentPlayer = gameInfo.player;
  var gameId = gameInfo.gameId;
  var angleInput;
  var powerInput;

  // physics
  if (gameInfo.player === "playerOne") {
    angleInput = Number($("#aRange").val());
    powerInput = Number($("#pRange").val());
    launchCannonBall(angleInput, powerInput);
  } else {
    angleInput = Number($("#aRange2").val());
    powerInput = Number($("#pRange2").val());
    console.log("Firing playerTwo cannon");
    // fire playerTwo cannon fn;
  }

  updateAnglePower(gameId, currentPlayer, angleInput, powerInput);

  incrementShotsFired(gameId, currentPlayer);
}

function addOpponentListeners(gameInfo) {
  var opponent = gameInfo.opponent;
  var gameId = gameInfo.gameId;
  var opponentAngleRef = database.ref("games/" + gameId + "/" + opponent + "/angle");
  var opponentPowerRef = database.ref("games/" + gameId + "/" + opponent + "/power");

  opponentAngleRef.on("value", function (snapshot) {
    if (snapshot.val()) {
      opponentAngle = snapshot.val();
      console.log("opponent took turn - ");
      console.log("angle", opponentAngle);
      //fire opponent cannon
    }
  });

  opponentPowerRef.on("value", function (snapshot) {
    if (snapshot.val()) {
      opponentPower = snapshot.val();
      console.log("power", opponentPower);
      //fire opponent cannon
    }
  });
}