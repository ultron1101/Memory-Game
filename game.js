const buttonColours = ["red", "blue", "green", "yellow"];
let gamepattern = [];
let userClickedPattern = [];
let randomNumber;
let randomChosenColour;
let level = 0;
let wrong = true;
let started = false;

function start(){
  if(!started){                                 //Started is false for 1st iter so loop continues
    nextSequence();
    userClickedPattern = [];
    started = true;
  }
}

function nextSequence(){
  level = level + 1;
  $("h1").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];                // randomChosenColour == "red", "blue", "yellow", "green"
  let $button = $('#' + randomChosenColour);
  $button.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);      // White flash on click
  gamepattern.push(randomChosenColour);
}

function playsound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function()
{
  let userChosenColour = $(this).attr("id");  // $(this).attr("id") == "red", "blue", "yellow", "green"
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1); // arg is the index of the latest element inserted in user array
  animatePress(userChosenColour);
  playsound(userChosenColour);
})

function animatePress(currentColour){
  $('.' + currentColour).addClass('pressed').delay(100).queue(function(next){
         $(this).removeClass('pressed');
         next();
    });
}

function checkAnswer(currentLevel){
  if(gamepattern[currentLevel] === userClickedPattern[currentLevel]){
    if(gamepattern.length === userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern.splice(0, userClickedPattern.length);
    }
  }
  else{
    $('body').addClass('game-over').delay(200).queue(function(next){      // Red flash
      $(this).removeClass('game-over');
      next();
    });
    let audio = new Audio("sounds/wrong.mp3");                           // Wrong sound
    audio.play();
    $('h1').text("Game Over, Press Any Key to Restart");                 // Game Over h1 text
    $(document).keypress(function(){
    startOver();
    })
  }
}

function startOver(){
  level = 0;
  userClickedPattern = [];
  gamepattern = [];
  started = false;
  $(document).unbind("keypress"); // Unbind the keypress event before adding a new one to avoid duplication
  start();
}

$(document).keypress(function (){
  start();
})
