// Creating game variables
let userTotal = 0;
let computerTotal = 0;
let rounds = 0;

// Rolling Animations 
const animationDuration = 2000;

// Add Event Listener to Roll Button
document.getElementById("roll-btn").addEventListener("click", () => {
  if (rounds >= 3) return; // Stop after 3 rounds

  // Show rolling animation for all dice
  const userDice1 = document.getElementById("user-dice1");
  const userDice2 = document.getElementById("user-dice2");
  const computerDice1 = document.getElementById("computer-dice1");
  const computerDice2 = document.getElementById("computer-dice2");

  const diceGif = "./images/dice-game.gif";
  userDice1.src = diceGif;
  userDice2.src = diceGif;
  computerDice1.src = diceGif;
  computerDice2.src = diceGif;

  // Delay to simulate rolling animation
  setTimeout(() => {
    // Generate Dice Rolls
    const userRoll1 = Math.floor(Math.random() * 6) + 1;
    const userRoll2 = Math.floor(Math.random() * 6) + 1;
    const computerRoll1 = Math.floor(Math.random() * 6) + 1;
    const computerRoll2 = Math.floor(Math.random() * 6) + 1;

    // Determine Scores
    let userScore;
    if (userRoll1 === 1 || userRoll2 === 1) {
      userScore = 0;
    } else if (userRoll1 === userRoll2) {
      userScore = (userRoll1 + userRoll2) * 2;
    } else {
      userScore = userRoll1 + userRoll2;
    }

    let computerScore;
    if (computerRoll1 === 1 || computerRoll2 === 1) {
      computerScore = 0;
    } else if (computerRoll1 === computerRoll2) {
      computerScore = (computerRoll1 + computerRoll2) * 2;
    } else {
      computerScore = computerRoll1 + computerRoll2;
    }

    // Update Totals and Round Count
    userTotal += userScore;
    computerTotal += computerScore;
    rounds++;

    // Update Dice Faces
    userDice1.src = `./images/die${userRoll1}.PNG`;
    userDice2.src = `./images/die${userRoll2}.PNG`;
    computerDice1.src = `./images/die${computerRoll1}.PNG`;
    computerDice2.src = `./images/die${computerRoll2}.PNG`;

    // Update UI Scores
    document.getElementById("user-total").textContent = userTotal;
    document.getElementById("computer-total").textContent = computerTotal;

    // Determine Winner if Final Round
    if (rounds === 3) {
      const winnerMessage = calculateWinner(userTotal, computerTotal);
      typeText("winner-message", winnerMessage, 100);
    }
  }, animationDuration); 
});

// Add Event Listener to Reset Button
document.getElementById("reset-btn").addEventListener("click", () => {
  userTotal = 0;
  computerTotal = 0;
  rounds = 0;

  document.getElementById("user-total").textContent = 0;
  document.getElementById("computer-total").textContent = 0;
  document.getElementById("winner-message").textContent = "";

  // Reset dice images
  document.getElementById("user-dice1").src = "./images/die1.PNG";
  document.getElementById("user-dice2").src = "./images/die1.PNG";
  document.getElementById("computer-dice1").src = "./images/die1.PNG";
  document.getElementById("computer-dice2").src = "./images/die1.PNG";
});

// Winner Calculation Function
function calculateWinner(userScore, computerScore) {
  if (userScore > computerScore) {
    return "Congratulations, you won! Time to crack a cold one!";
  } else if (userScore < computerScore) {
    return "Computer Wins! Better try again, I know you're not a loser!";
  } else {
    return "It's a Tie! Let's push our luck harder next time.";
  }
}

// Typing Animation Function
function typeText(elementId, text, speed = 50) {
  const element = document.getElementById(elementId);
  element.textContent = "";
  let index = 0;

  const type = () => {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      setTimeout(type, speed);
    }
  };

  type();
}
