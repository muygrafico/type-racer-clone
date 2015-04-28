$( document ).ready(function() {
  console.log("ChuckType Engine V0.3b");
  var clearInput = function(who){ who.val('') }

  var Race = function( next_words, gameText) {
    this.keystrokeCounter = 0;
    this.points = 0;
    this.time = 0;
    this.user_id = document.getElementsByClassName( 'userData' )[0].getAttribute("data-user"); ;
    this.viewableNextWords = 12;
    this.strings = this.word_to_array( gameText );
    this.next_words = next_words;
    this.viewHelper( next_words );
  }

  Race.prototype = {
    checkWord : function(array_word, word){
      word =  word.replace(/\s/g, '');
      if ( array_word  == word ) { return true } else { return false }
    },
  word_to_array : function( textContainer ){
    return array = document.getElementById( textContainer ).innerHTML.split(' ')
  },
  sendGameData : function(item){
    $.ajax({
      url: "/races",
      type: "POST",
      data: item
  })
  },
  limitView: function(){
    this.stringsLength = this.strings.length;
    if ( this.stringsLength - this.points < this.viewableNextWords ) {
      this.viewableNextWords = this.stringsLength - this.points ;
      if ( this.viewableNextWords < 1 ) {

          document.getElementsByClassName("timer").innerHTML = "YOU FINISHED";

          $("#gameInput").prop("disabled", true );
          this.elapsed = this.stop();
          this.accuracy = accuracy($('#gameText').text().length, this.keystrokeCounter);
          wpm = Math.round( ( this.stringsLength / (this.elapsed/60) ) )

          $("#sec").html( "WPM: " + wpm );
          this.item = { race: {"wpm" : wpm, "accuracy" : this.accuracy, "finished_time": this.elapsed, "user_id": this.user_id }};
          this.sendGameData( this.item );
          $('.new-game').removeClass('hide');
        };
      };
    },
    viewHelper : function(){
      var viewHelperText = "";
      this.limitView();
      for ( var i = 0; i < this.viewableNextWords ; i++ ) {
        if ( i == 0 ) {
          viewHelperText +=  "<strong>" +this.strings[this.points + i] + "</strong> "
        } else {
          viewHelperText += this.strings[this.points + i] + " "
        }
      };
      $( this.next_words ).html( viewHelperText );
    },
    start : function(){
      clearInterval( this.timer );
      var that = this;
      that.time = 0;
      this.timer =  setInterval(function(){
        that.time += 1000;
        that.elapsed = Math.floor(that.time / 1000) / 1;
        $("#sec").html( that.elapsed + " <span class='small'>sec</span>" )}, 1000);
    },
    stop : function(){
      clearInterval( this.timer );
      elapsed = Math.floor(this.time / 1000) / 1;
      return elapsed;
    },
    counterBack : function(count_time){

    }
  }

  function strip(number) {
   return (parseFloat(number.toPrecision(12)));
 }

 var accuracy = function(text_length, counter){
  var part1 = text_length - (counter - text_length )
  part2 = part1 / text_length;
  return (part2 * 100).toFixed(2) ;
}

$("#gameInput").keydown(function(e){
  if ( e.which != 16 && e.which != 8 ) {
    userRace.keystrokeCounter ++;
  };

  var val = $( this ).val();

  if( e.which == 32  && userRace.viewableNextWords != 1 || userRace.viewableNextWords == 1 ) {
    word_validator = userRace.checkWord( userRace.strings[ userRace.points ] , val) ;
    if ( word_validator ){
      clearInput( $( this ) );
      userRace.points ++;
      userRace.viewHelper();
    }
  }
});

$("#gameInput").attr("placeholder", "Type the text above");
$("#gameInput").prop("disabled", true);
$('.timer').startTimer({ onComplete: function(element){
  element.addClass('is-complete')
  $(".timer").html( "START!" );
  $("#gameInput").prop("disabled", false);
  $("#gameInput").focus();
  userRace = new Race( '.next-word', 'gameText', $('#gameText').length );
  userRace.start();
} });

});
