//Return 'rock', 'paper', or 'scissors' at random as computer's selection
function computerPlay() {
    return ['Rock', 'Paper', 'Scissors'][Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    //Define win conditions
    const WINS_OVER = {'Rock': 'Paper',
                      'Paper': 'Scissors',
                      'Scissors': 'Rock'};
    
    //Convert player's selection to correct casing
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.substring(1).toLowerCase();

    //Determine result and winning/losing selections based on win conditions
    let winOrLose = playerSelection == WINS_OVER[computerSelection] ? 'Win' : 'Lose',
        winningSelection = winOrLose == 'Win' ? playerSelection : computerSelection,
        losingSelection = winOrLose == 'Win' ? computerSelection : playerSelection;

    //Return string with result and winning/losing selections
    return playerSelection == computerSelection ? 'It\'s a tie!'
         : `You ${winOrLose}! ${winningSelection} beats ${losingSelection}`;
}