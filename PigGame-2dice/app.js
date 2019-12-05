/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer, scores, roundScore, gameRunning, noOfRolls, prevDice, winningScore;

newGame();

// Roll Dice button
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gameRunning){
        console.log('Roll button clicked!!');
        // Generates random number between 1 and 6
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // Display the dice score
        document.getElementById('dice-1').style.display = 'table';
        document.getElementById('dice-2').style.display = 'table';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        if (dice1 !== 1 && dice2 != 1){
            // Update the current round scores
            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        else {
            //Rolled a 1 so lose Current round score and end turn
            document.getElementById('current-' + activePlayer).textContent = 0; 
            roundScore = 0;
            // Switch player
            switchPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', newGame);

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gameRunning){
        // Add current round points to players overall score
        scores[activePlayer] += roundScore;
        // Display overall score
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        
        if (input) {
            winningScore = input;
        }
        else{
            winningScore = 100;
        }
        
        // Check if game was won
        if (scores[activePlayer] >= winningScore){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');

            // Hide the Roll and Hold buttons
            document.querySelector('.btn-roll').style.display ='none';
            document.querySelector('.btn-hold').style.display ='none';

            gameRunning = false;
        }
        else {
            // Reset round score
            document.getElementById('current-' + activePlayer).textContent = 0; 
            roundScore = 0;
            // Switch player
            switchPlayer();
        }
    }
});

function newGame(){
    activePlayer = 0;
    scores = [0, 0];
    roundScore = 0;
    noOfRolls =0;
    prevDice = 0;
    
    gameRunning = true;
    
    // Reset the player's scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    // Display the Roll and Hold buttons
    document.querySelector('.btn-roll').style.display ='table';
    document.querySelector('.btn-hold').style.display ='table';
}

function switchPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');   
}

