//Return selection of 'rock', 'paper', or 'scissors' at random as computer
function computerPlay() {
    return ['Rock', 'Paper', 'Scissors'][Math.floor(Math.random() * 3)];
}

//Return results of a round of Rock Paper Scissors with computer
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
    return playerSelection == computerSelection ? 'It\'s a tie! Rematch...'
         : `You ${winOrLose}! ${winningSelection} beats ${losingSelection}`;
}

//Return results of a 5-round game of Rock Paper Scissors with computer
function game() {
    //Create a scoreboard to keep score
    let scoreboard = [];

    //Play 5 rounds
    for(let i = 0; i < 5; i++) {
        //Obtain player selection from the user
        let playerSelection = prompt('Please type your selection: Rock, Paper, or Scissors.');
        //Exit the game if the user cancels the game during player selection
        if(playerSelection == null) {
            console.log('You canceled the game.'); 
            return;
        }
        //While the user has input an invalid selection, continue prompting until a valid selection is input
        while(!['rock', 'paper', 'scissors'].includes(playerSelection.toLowerCase()))
            playerSelection = prompt('Please enter a valid selection: Rock, Paper, or Scissors.');

        //Obtain computer selection from computerPlay function and initiate the round
        let computerSelection = computerPlay(),
            roundResult = playRound(playerSelection, computerSelection);

        //Log the result of the round
        console.log(`Round ${i + 1}: ` + roundResult);
        
        //If the result was a tie, rematch the round by decrementing the round number
        if(roundResult.indexOf('tie') > 0) i--;
        //Otherwise, record the result of the round to the scoreboard as true if player won, false if player lost
        else scoreboard.push(roundResult.indexOf('Win') > 0);
    }

    //Log the winner of the entire game, based on the number of trues on the scoreboard
    console.log(scoreboard.filter(roundResult => roundResult).length > 2 ?
                'Congratulations! You Won!' : 'Sorry, You Lost.');
}