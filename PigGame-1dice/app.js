/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer, scores, roundScore, gameRunning;

newGame();

// Roll Dice button
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gameRunning){
        console.log('Roll button clicked!!');
        // Generates random number between 1 and 6
        var dice = Math.floor(Math.random() * 6) + 1;    

        // Display the dice score
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'table';
        diceDOM.src = 'dice-' + dice + '.png';

        document.querySelector('#current-' + activePlayer).textContent = dice;

        if (dice !== 1){
            // Update the current round scores
            roundScore += dice;
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
        // Check if game was won
        if (scores[activePlayer] >= 100){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
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
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

/*function btn(){
    console.log('button clicked!!');
}*/

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// Store the global score
/*var scores[activePlayer] = document.querySelector('#score-' + activePlayer).textContent;*/