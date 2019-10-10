var player1;
var player2;
var currentPlayer;
var boardArr = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
var numOfMoves = 0;
var player1Name = 'Player 1';
var player2Name = 'Player 2';
var coin1 = '&#x26D2;';
var coin2 = '&#x2716;';
var coin1Color = '#0000ff';
var coin2Color = '#ff0000';
var playable = true;

function Player(name, coin, coinColor, id) {
  this.id = id;
  this.name = name;
  this.coin = coin;
  this.coinColor = coinColor;
}

(function() {
  player1 = new Player(player1Name, coin1, coin1Color, 1);
  player2 = new Player(player2Name, coin2, coin2Color, 2);
  currentPlayer = player1;
  updatePlayerInfo(currentPlayer.name, currentPlayer);
})();

function play(eventObj, x, y) {
  if (!eventObj.innerHTML && playable) {
    makeAMove(eventObj, x, y);
    let result = determineWinner(x, y, currentPlayer);
    if (result) {
      updatePlayerInfo(`${currentPlayer.name} - ${result}!`, currentPlayer);
      playable = false;
      return;
    }
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    updatePlayerInfo(currentPlayer.name, currentPlayer);
  }
}

function makeAMove(eventObj, x, y) {
  eventObj.innerHTML = currentPlayer.coin;
  updateColor(eventObj, currentPlayer);
  boardArr[x][y] = currentPlayer.id;
  numOfMoves++;
}

function updatePlayerInfo(updateStr, currentPlayer) {
  let element = getPlayerInfoElement();
  element.innerHTML = updateStr;
  updateColor(element, currentPlayer);
}

function updateColor(element, currentPlayer) {
  element.style.color = currentPlayer.coinColor;
}

function getPlayerInfoElement() {
  return document.getElementById('player');
}

function determineWinner(x, y, currentPlayer) {
  let result = '';
  if (numOfMoves >= 5) {
    result = verticalCheck(x, y, currentPlayer);
    if (!result) {
      result = horizontalCheck(x, y, currentPlayer);
    }
    if (!result) {
      result = diagonalLeftToRightCheck(currentPlayer);
    }
    if (!result) {
      result = diagonalRightToLeftCheck(currentPlayer);
    }

    if (!result && numOfMoves === 9) {
      result = 'Tie';
    }
  }
  return result;
}

function verticalCheck(x, y, currentPlayer) {
  for (let i = 0; i < boardArr.length; i++) {
    if (boardArr[i][y] !== currentPlayer.id) {
      return;
    }
  }
  return 'Winner';
}

function horizontalCheck(x, y, currentPlayer) {
  for (let i = 0; i < boardArr.length; i++) {
    if (boardArr[x][i] !== currentPlayer.id) {
      return;
    }
  }
  return 'Winner';
}

function diagonalLeftToRightCheck(currentPlayer) {
  for (let i = 0; i < boardArr.length; i++) {
    if (boardArr[i][i] !== currentPlayer.id) {
      return;
    }
  }
  return 'Winner';
}

function diagonalRightToLeftCheck(currentPlayer) {
  let startIndex = 0;
  for (let i = boardArr.length - 1; i >= 0; i--) {
    if (boardArr[startIndex][i] !== currentPlayer.id) {
      return;
    }
    startIndex++;
  }
  return 'Winner';
}

function reset() {
  let elements = document.getElementsByTagName('td');
  for (let elem of elements) {
    elem.innerHTML = '';
  }
  currentPlayer = player1;
  updatePlayerInfo(currentPlayer.name, currentPlayer);
  numOfMoves = 0;
  playable = true;
  boardArr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
}
