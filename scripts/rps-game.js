//Initialize the Rock Paper Scissors game
function playGame() {
    const rpsButtons = document.querySelectorAll('.player-selection');
    rpsButtons.forEach(button => button.addEventListener('click', displayButtonResult));
    playGame.roundNumber = 0;
    playGame.scoreboard = [];
}

playGame();

//Event listener function to determine what to display after each button click
function displayButtonResult(e) {
    if (playGame.roundNumber >= 5) {
        if (!document.querySelector('#game-over')) displayGameOver();
        return;
    }

    displayRoundResult(e);
    if (playGame.roundNumber == 5) displayGameResult();
}

//Return random computer selection
function getComputerSelection() {
    return ['Rock', 'Paper', 'Scissors'][Math.floor(Math.random() * 3)];
}

//Play one round with computer
function playRound(playerSelection, computerSelection) {
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
function displayRoundResult(e) {
    playGame.roundNumber++;

    let playerSelection = e.target.textContent,
        computerSelection = getComputerSelection(),
        roundNumber = `Round ${playGame.roundNumber}: `,
        roundResult = playRound(playerSelection, computerSelection),
        displayedResult = document.createElement('p');

    //If the result was a tie, display the tie and prepare to rematch the round by decrementing the round number
    if(roundResult == 'Tie') {
        displayedResult.textContent = roundNumber + 'It\'s a Tie! Rematch...';
        playGame.roundNumber--;
    }
    //Otherwise, display the result and record it to the scoreboard
    else {
        let winningSelection = roundResult == 'Win' ? playerSelection : computerSelection,
            losingSelection = roundResult == 'Win' ? computerSelection : playerSelection;

        displayedResult.textContent = roundNumber + `You ${roundResult}! ${winningSelection} beats ${losingSelection}.`;
        playGame.scoreboard.push(roundResult);
    }

    document.querySelector('#results').appendChild(displayedResult);
}

//Display the result of the entire game
function displayGameResult() {
    const gameResult = document.createElement('p');
    gameResult.textContent = playGame.scoreboard.filter(roundResult => roundResult == 'Win').length > 2 ?
                             'Congratulations! You Won!' : 'Sorry, You Lost.';
    document.querySelector('#results').appendChild(gameResult);
}

//Add a game over message after game is complete
function displayGameOver() {
    const gameOver = document.createElement('p');
    gameOver.setAttribute('id', 'game-over');
    gameOver.textContent = 'The game has finished.';
    document.querySelector('#results').appendChild(gameOver);
}