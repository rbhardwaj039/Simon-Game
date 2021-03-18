var buttonColors = [ "red" , "blue" , "green" , "yellow" ] ;
var gamePattern = [] ;
var userClickedPattern = [] ;

var started = false;
var level = 0;

$(document).keydown( function(event) {
  if( !started ){
    $( "#level-title" ).text( "level "+ level );
    nextSequence();
    started = true ;
  }
})

$( ".btn" ).click( function(){
  var userChosenColor = $(this).attr( "id" );
  userClickedPattern.push( userChosenColor );
  newSound( userChosenColor ) ;
  animatePress( userChosenColor ) ;
  checkAnswer( userClickedPattern.length - 1 ) ;
});

function checkAnswer( currentLevel ){
  if( userClickedPattern[ currentLevel ] === gamePattern[ currentLevel ] ){
    console.log( "success" );
  if( userClickedPattern.length === gamePattern.length ){
    setTimeout( function(){
      nextSequence();
    } , 1000 );
  }
}else{
    var audio = new Audio ("sounds/wrong.mp3");
    audio.play();
    $( "body" ).addClass( "game-over" );
    setTimeout( function(){
      $( "body" ).removeClass( "game-over" );
    }, 100 ) ;
    startOver();
  }
}
function startOver(){
  level = 0 ;
  started = false ;
  userClickedPattern = [] ;
  gamePattern = [] ;
  $( "#level-title" ).text( "Press A Key to Start" );
}

function nextSequence(){
  userClickedPattern = [] ;
  level++;
  $( "#level-title" ).text( "level "+ level );
  var randomNumber = Math.floor(Math.random() * 4)  ;
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor) ;
  $( "#" + randomChosenColor).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}

function newSound( name ){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress( currentColor ){
  $("."+currentColor).addClass( "pressed" );
  setTimeout( function(){
      $("."+currentColor).removeClass( "pressed" );
    } , 100 ) ;
  }



/* for( var i = 0 ; i < document.querySelectoerAll( ".btn" ) ; i++ ){

    document.querySelectorAll( ".btn" )[i].addEventListener("click" , function(){
        $( ".btn" )[i].addClass( "pressed" ) ;
        setTimeout( function(){
	          $( ".btn" )[i].removeClass( "pressed" ) ;
        } , 100 ) ;
    }) ;
}

 $( ".red" ).click( function(){
    $( ".red" ).addClass( "pressed" ) ;
    setTimeout( function(){
	      $( ".red " ).removeClass( "pressed" ) ;
    } , 100 ) ;
}) ;
$( ".btn " ).addClass( "pressed" ) ; */
