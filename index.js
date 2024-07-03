var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern;
var start=false;
var level=0;

function nextSequence()
{
    userClickedPattern=[];
    level++;
$("#level-title").text("Level "+level);
var randomNumber= Math.floor(Math.random()*4);
var randomChosenColour=buttonColours[randomNumber];

gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);



}

$(document).keydown(function()
{
    if(!start)
    {
        $("h1").text("Level "+level);
        nextSequence();
        start=true;
    }
});




function playSound(name)
{
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

$(".btn").click(function()
{
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentlength)
{
    if(gamePattern[currentlength] === userClickedPattern[currentlength])
        {
            if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){nextSequence();},1000);

        }
    }
        else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
            setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);
        restartGame();



        }
}
function restartGame()
{           

            start=false;
            gamePattern=[];
            level=0;
}
