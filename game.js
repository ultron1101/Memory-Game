const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;
let started = false;

// set highret score after the end of the game
function highScore(levelUp) {
  let score = 0;
  this.levelUp = levelUp;
  return `High score: Level ${score + levelUp}`;
}

// Starting the game
function startGame() {
  if ($(window).width() < 1024) {
    $(`h1`)
      .text(`CLICK HERE to start`)
      .click(function (e) {
        if (!started) {
          $("h1").text(`Level ${level}`); // leveling up
          nextSequence();
          started = true;
        }
      });
  } else {
    $(`h1`).text(`Press A Key to Start`);
    $(document).keypress(function (e) {
      if (!started) {
        $("h1").text(`Level ${level}`); // leveling up
        nextSequence();
        started = true;
      }
      // $(this).unbind("keypress");
    });
  }
}
startGame();

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // Play sound and animate
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1); //check answer after user clicked
});

// checking answers
function checkAnswer(currentLevel) {
  currentLevel = currentLevel.toString();

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);

        userClickedPattern.splice(0, userClickedPattern.length);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      //  For mobile interactiveness
      if ($(window).width() < 1024) {
        $("#level-title").html("Game Over, CLICK HERE to Restart");
      } else {
        $("#level-title").text("Game Over, Press Any Key to Restart");
      }
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
  }


function nextSequence() {
  userClickedPattern.splice(0, userClickedPattern.length);
  $(`h1`).text(`Level ${++level}`); //Incementing levels
  var randomNumber = Math.floor(Math.random() * 4); //0 - 3
  var randomChosenColour = buttonColours[randomNumber]; //random color from the array of buttonColours
  gamePattern.push(randomChosenColour); //  push the random colors generated into the gamePattern array
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100); // Pick random divs with random colours
  // playSound(randomChosenColour);
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  return $(`#${name}`).ready(() => {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
  });
}

function startOver() {
    started = false;
  alert(highScore(level));
  level = 0;
  gamePattern.splice(0, gamePattern.length);
}
