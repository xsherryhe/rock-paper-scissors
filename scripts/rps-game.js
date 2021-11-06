//Initialize the buttons' functionality
function initializeButtons() {
    document.querySelectorAll('.player-selection')
            .forEach(button => button.addEventListener('click', displayButtonResult));
    document.querySelector('#reset-game').addEventListener('click', playGame);
}
initializeButtons();

//Start a new Rock Paper Scissors game
function playGame() {
    document.querySelector('#results').textContent = '';
    document.querySelectorAll('.score').forEach(score => score.textContent = '0');
    playGame.roundNumber = 0;
    playGame.scoreboard = [0, 0];
    playGame.gameOver = false;
}
playGame();

//Event listener function to display result of button click
function displayButtonResult(e) {
    if(playGame.gameOver) {
        if(!document.querySelector('#game-over')) displayGameOver();
        return;
    }

    playGame.roundNumber++;
    const playerSelection = e.target.textContent,
          computerSelection = getComputerSelection();
    displayRoundResult(playerSelection, computerSelection);

    if(playGame.scoreboard.find(score => score == 5)) {
        playGame.gameOver = true;
        displayGameResult();
    }
}

//Return random computer selection
function getComputerSelection() {
    return ['Rock', 'Paper', 'Scissors'][Math.floor(Math.random() * 3)];
}

//Return result of a round
function getRoundResult(playerSelection, computerSelection) {
    const WINS_OVER = {
        'Rock': 'Paper',
        'Paper': 'Scissors',
        'Scissors': 'Rock'
    };

    return playerSelection == computerSelection ? 'Tie'
         : playerSelection == WINS_OVER[computerSelection] ? 'Win'
         : 'Lose';
}

//Display the result of one round
function displayRoundResult(playerSelection, computerSelection) {
    const roundNumber = `Round ${playGame.roundNumber}: `,
          roundResult = getRoundResult(playerSelection, computerSelection),
          displayedResult = document.createElement('p');

    //If the result was a tie, display the tie and prepare to rematch the round by decrementing the round number
    if(roundResult == 'Tie') {
        displayedResult.textContent = roundNumber + 'It\'s a Tie! Rematch...';
        playGame.roundNumber--;
    }
    //Otherwise, display the result and update the scoreboard
    else {
        const [winningSelection, losingSelection, winner] = 
              roundResult == 'Win' ? [playerSelection, computerSelection, 0]
                                   : [computerSelection, playerSelection, 1];

        displayedResult.textContent = roundNumber + `You ${roundResult}! ${winningSelection} beats ${losingSelection}.`;
        playGame.scoreboard[winner]++;
        document.querySelectorAll('.score').forEach((score, i) => score.textContent = playGame.scoreboard[i]);
    }

    document.querySelector('#results').appendChild(displayedResult);
}

//Display the result of the entire game
function displayGameResult() {
    const gameResult = document.createElement('p');
    gameResult.textContent = playGame.scoreboard[0] > playGame.scoreboard[1] ?
                             'Congratulations! You Won!' : 'Sorry, You Lost.';
    document.querySelector('#results').appendChild(gameResult);
}

//Add a game over message after game is complete
function displayGameOver() {
    const gameOver = document.createElement('p');
    gameOver.id = 'game-over';
    gameOver.textContent = 'The game has finished.';
    document.querySelector('#results').appendChild(gameOver);
}