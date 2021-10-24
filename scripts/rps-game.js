//Define possible selections for game
const RPS_CHOICES = ['Rock', 'Paper', 'Scissors'];

//Obtain player selection from user
function getPlayerSelection() {
    let playerSelection = convertCasing(prompt('Please type your selection: Rock, Paper, or Scissors.'));
    //While the user has input an invalid selection, continue prompting until a valid selection is input
    while (!(RPS_CHOICES.includes(playerSelection) || playerSelection == null))
        playerSelection = convertCasing(prompt('Please enter a valid selection: Rock, Paper, or Scissors.'));
    return playerSelection;
}

//Convert player selection to correct casing (if it's truthy)
function convertCasing(playerSelection) {
    return playerSelection ? 
                playerSelection[0].toUpperCase() + playerSelection.substring(1).toLowerCase()
              : playerSelection;
}

//Return random computer selection
function getComputerSelection() {
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

//Return results of a 5-round game of Rock Paper Scissors with computer
function playGame() {
    //Create a scoreboard to keep score
    let scoreboard = [];

    //Play 5 rounds
    for(let i = 0; i < 5; i++) {
        //Obtain player and computer selections
        let playerSelection = getPlayerSelection(),
            computerSelection = getComputerSelection();
        //Exit the game if the user cancels the game during player selection
        if (playerSelection == null) {
            console.log('You canceled the game.');
            return;
        }

        //Initiate the round and store the round number
        let roundResult = playRound(playerSelection, computerSelection),
            roundNumber = `Round ${i + 1}: `;

        //If the result was a tie, log the tie and rematch the round by decrementing the round number
        if(roundResult == 'Tie') {
            console.log(roundNumber + 'It\'s a tie! Rematch...');
            i--;
        }
        //Otherwise, log the result and record it to the scoreboard
        else {
            //Determine the winning and losing selections to log
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