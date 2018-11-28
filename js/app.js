/*
 * Create a list that holds all of your cards
 */

 /*
  * Display the cards on the page
  *   - shuffle the list of cards using the provided "shuffle" method below
  *   - loop through each card and create its HTML
  *   - add each card's HTML to the page
  */
  const deck = document.querySelector(".deck");
  let flipCards = [];
  let moves = 0;
  let offClock = true;
  let time = 0;
  let clockId;
  let matched = 0;

  //an array to pass through suffle function
  function shuffleCards(){
    const mixCards = Array.from(document.querySelectorAll(".deck li"));
    const mCards = shuffle(mixCards);
    for(card of mCards){
      deck.appendChild(card);
      resetCards();
    }
  }
  shuffleCards();

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }

// Event listener for the cards
deck.addEventListener("click", function(event){
  const flip = event.target;

  if(isClickValid(flip)){
    if(offClock) {
      setClock();
      offClock = false;
    }

    flipCard(flip);
    newFlipCard(flip);

    if(flipCards.length === 2){
      matchCards(flip);
      countMoves();
      score();
    }
  }
});

// flip cards if the click is applicable
function isClickValid(flip){
  return (
    flip.classList.contains('card') &&
    !flip.classList.contains("match") &&
    flipCards.length < 2 &&
    !flipCards.includes(flip)
  );
}

function flipCard(card){
  card.classList.toggle("open");
  card.classList.toggle("show");
}

function newFlipCard(flip){
  flipCards.push(flip);
  //console.log(flipCards);
}

//function to match cards
function matchCards(){
  if (flipCards[0].firstElementChild.className ===
    flipCards[1].firstElementChild.className) {
    flipCards[0].classList.toggle("match");
    flipCards[1].classList.toggle("match");
    flipCards = [];
    matched++;
    const totalPairs = 8;
    if(matched === totalPairs){
      gameOver();
    }
} else {
    setTimeout (function(){
      flipCard(flipCards[0]);
      flipCard(flipCards[1]);
      flipCards = [];
    }, 1000);
  }
}

// add move
function countMoves(){
  moves++;
  const makeMoves = document.querySelector(".moves");
  makeMoves.innerHTML = moves;
}

// count score
function score(){
  if (moves === 15 || moves === 25) {
    hidingStars();
  }
}

//hiding stars
function hidingStars(){
  const allStars = document.querySelectorAll(".fa-star");
  for(star of allStars) {
    if (star.style.display !== "none") {
        star.style.display = "none";
      break;
    }
  }
}

//set time
function setClock(){
  clockId = setInterval(function(){
    time++;
    showTime();
  }, 1000);
}

function showTime(){
  const clock = document.querySelector(".clock");
  clock.innerHTML = time;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
}

// stop clock
function stopClock(){
  clearInterval(clockId);
}

// modal starts here
function toggleModal(){
  const modal = document.querySelector(".modal");
  modal.classList.toggle("hide");
}

function modalDisplay(){
  const timeDisplay = document.querySelector(".mtime");
  const clockTime = document.querySelector(".clock").innerHTML;
  const moveDisplay = document.querySelector(".mmoves");
  const starDisplay = document.querySelector(".mstars");
  const stars = getStars();

  timeDisplay.innerHTML = `Time = ${clockTime}`;
  moveDisplay.innerHTML = `Moves = ${moves + 1}`;
  starDisplay.innerHTML = `Stars = ${stars}`;
}

function getStars() {
  stars = document.querySelectorAll(".fa-star");
  starCount = 0;
  for(star of stars){
    if(star.style.display !== "none"){
      starCount++;
    }
  }
  console.log(starCount);
  return starCount;
}

// Modal Buttons
document.querySelector(".mcancel").addEventListener("click", function(){
  toggleModal();
});

document.querySelector(".mplay").addEventListener("click", function(){
  resetGame();
});

document.querySelector(".restart").addEventListener("click", function(){
  resetGame();
  toggleModal();
});

function rgame(){
  while(matched = 0){
  }
}
//game over
function gameOver(){
  stopClock();
  modalDisplay();
  toggleModal();
}

//reset Game
function resetGame(){
  resetClockAndTime();
  resetMoves();
  resetStars();
  shuffleCards();
  toggleModal();
  rgame();
}

//reset clock
function resetClockAndTime(){
  stopClock();
  offClock = true;
  time = 0;
  showTime();
}

//reset moves
function resetMoves(){
  moves = 0;
  document.querySelector(".moves").innerHTML = moves;
}

//reset stars
function resetStars(){
  stars = 0;
  const allStars = document.querySelectorAll(".fa-star");
  for(star of allStars){
    star.style.display = "inline";
  }
}

//reset cards
function resetCards(){
  const cards = document.querySelectorAll(".deck li");
  for(let card of cards){
    card.className = "card";
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
