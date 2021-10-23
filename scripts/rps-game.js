//Define possible selections for game
const RPS_CHOICES = ['Rock', 'Paper', 'Scissors'];

//Return selection at random as computer
function computerPlay() {
    return RPS_CHOICES[Math.floor(Math.random() * 3)];
}

//Return results of a round of Rock Paper Scissors with computer
function playRound(playerSelection, computerSelection) {
    //Define win conditions
    const WINS_OVER = {'Rock': 'Paper',
                      'Paper': 'Scissors',
                      'Scissors': 'Rock'};

    //Return result and winning/losing selections based on win conditions
    return playerSelection == computerSelection ? 'Tie'
         : playerSelection == WINS_OVER[computerSelection] ? 'Win' 
         : 'Lose';
}

//Convert player selection to correct casing
function convertCasing(playerSelection) {
    return playerSelection[0].toUpperCase() + playerSelection.substring(1).toLowerCase();
}

//Return results of a 5-round game of Rock Paper Scissors with computer
function game() {
    //Create a scoreboard to keep score
    let scoreboard = [];

    //Play 5 rounds
    for(let i = 0; i < 5; i++) {
        //Obtain player selection from the user with correct casing
        let playerSelection = convertCasing(prompt('Please type your selection: Rock, Paper, or Scissors.'));
        //Exit the game if the user cancels the game during player selection
        if(playerSelection == null) {
            console.log('You canceled the game.'); 
            return;
        }
        //While the user has input an invalid selection, continue prompting until a valid selection is input
        while(!RPS_CHOICES.includes(playerSelection))
            playerSelection = convertCasing(prompt('Please enter a valid selection: Rock, Paper, or Scissors.'));

        //Obtain computer selection from computerPlay function, initiate the round, and store the round number
        let computerSelection = computerPlay(),
            roundResult = playRound(playerSelection, computerSelection),
            roundNumber = `Round ${i + 1}: `;

        //If the result was a tie, log the tie and rematch the round by decrementing the round number
        if(roundResult == 'Tie') {
            console.log(roundNumber + 'It\'s a tie! Rematch...');
            i--;
        }
        //Otherwise, log the result and record it to the scoreboard
        else {
            //Determine the winning and losing selections for the logged result
            let winningSelection = roundResult == 'Win' ? playerSelection : computerSelection,
                losingSelection = roundResult == 'Win' ? computerSelection : playerSelection;

            console.log(roundNumber + `You ${roundResult}! ${winningSelection} beats ${losingSelection}.`);
            scoreboard.push(roundResult);
        }
    }

    //Log the winner of the entire game, based on the number of wins on the scoreboard
    console.log(scoreboard.filter(roundResult => roundResult == 'Win').length > 2 ?
                'Congratulations! You Won!' : 'Sorry, You Lost.');
}