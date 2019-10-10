describe("TicTacToe", function() {
    var play1;
    var play2;
  
    beforeEach(function() {
      play1 = new Player(player1Name, coin1, coin1Color, 1);
      play2 = new Player(player2Name, coin2, coin2Color, 2);
    });

    it("player 1 is created as expected", function() {
        expect(play1).toEqual(player1);
    });

    it("player 2 is created as expected", function() {
        expect(play2).toEqual(player2);
    });

    it("initialized current player should be player 1", function() {
        expect(player1).toEqual(currentPlayer);
    });

    it("verify current player properties are accurate", function() {
        let element = getPlayerInfoElement();
        expect(element.innerHTML).toEqual(currentPlayer.name);
    });

    it("verify vertical check logic works as expected", function() {
        boardArr = [
            [0,1,0],
            [0,1,0],
            [0,1,0]
        ];

        expect(verticalCheck(0,1,currentPlayer)).toEqual('Winner');
        expect(verticalCheck(1,0,currentPlayer)).not.toEqual('Winner');
    });

    it("verify horizontal check logic works as expected", function() {
        boardArr = [
            [0,1,0],
            [1,1,1],
            [0,1,0]
        ];

        expect(horizontalCheck(1,2,currentPlayer)).toEqual('Winner');
        expect(horizontalCheck(2,0,currentPlayer)).not.toEqual('Winner');
    });

    it("verify diagonal check logic works as expected", function() {
        boardArr = [
            [1,1,1],
            [0,1,0],
            [1,1,1]
        ];

        expect(diagonalLeftToRightCheck(currentPlayer)).toEqual('Winner');
        expect(diagonalRightToLeftCheck(currentPlayer)).toEqual('Winner');
    });

    it("determine winner logic works as expected", function() {
        numOfMoves = 6;
        boardArr = [
            [1,1,2],
            [2,1,2],
            [1,1,1]
        ];

        expect(determineWinner(1,1, currentPlayer)).toEqual('Winner');
        expect(determineWinner(0,0, currentPlayer)).toEqual('Winner');
        
        numOfMoves = 9;
        boardArr = [
            [2,1,1],
            [1,2,2],
            [2,2,1]
        ];
        expect(determineWinner(0,2, currentPlayer)).toEqual('Tie');
    });
});