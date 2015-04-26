$( document ).ready(function() {
  // console.log('ITS LOADING RACES.JS');

  var clearInput = function(who){ who.val('') }
  var word_to_array = function( textContainer ){ return array = $(textContainer).text().split(' ')}

  var Race = function(next_words_p, gameText,text_length) {
    this.keystrokeCounter = 0;
    this.points = 0;
    this.time = 0;
    this.user_id = $( '.userData' ).data('user');
    this.viewableNextWords = 12;
    this.textLength = text_length;
    this.strings = word_to_array( gameText );
    this.next_words_p = next_words_p;
    this.viewHelper(next_words_p);
    // console.log(this.textLength);
  }

  Race.prototype = {
    checkWord : function(array_word, word){
      word =  word.replace(/\s/g, '');
      if ( array_word  == word ) { return true } else { return false }
    },
  word_to_array : function( textContainer ){
    return array = $(textContainer).text().split(' ')
  },
  sendGameData : function(item){
    $.ajax({
      url: "/races",
      type: "POST",
      data: item,
    success: function(){/*console.log("data sent")*/}
  })
  },
  limitView: function(){
    this.stringsLength = this.strings.length;
    if ( this.stringsLength - this.points < this.viewableNextWords ) {
      this.viewableNextWords = this.stringsLength - this.points ;
      if ( this.viewableNextWords < 1 ) {
          // console.log('finished');
          console.log("Accuracy: " + accuracy(this.textLength, this.keystrokeCounter));
          $("#gameInput").prop("disabled", true );
          this.elapsed = this.stop();
          this.accuracy = accuracy(this.textLength, this.keystrokeCounter);
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
      $( this.next_words_p ).html( viewHelperText );
    },
    start : function(){
      clearInterval( this.timer );
      var that = this;
      that.time = 0;
      this.timer =  setInterval(function(){
        that.time += 1000;
        that.elapsed = Math.floor(that.time / 1000) / 1;
        // console.log(that.elapsed)
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

  $.ajax({
    url: "http://api.icndb.com/jokes/random.jsonp",
    type: "GET",
    success: function( response ){
      $('#gameText').html(response.value.joke);
      userRace = new Race( '.next-word', '#gameText', response.value.joke.length );
      // console.log("getting joke");
    }
  })

  function strip(number) {
   return (parseFloat(number.toPrecision(12)));
}

  var accuracy = function(text_length, counter){
    var part1 = text_length - (counter - text_length )
    part2 = part1 / text_length;
    return (part2 * 100).toFixed(2) ;
  }

  $("#gameInput").keyup(function(e){
    console.log("key:" + e.which);
    if ( e.which != 16 && e.which != 8 ) {
      userRace.keystrokeCounter ++;
      console.log("keystrokes:" + userRace.keystrokeCounter );
    };


    var val = $( this ).val();
    word_validator = userRace.checkWord( userRace.strings[ userRace.points ] , val) ;
    userRace.viewHelper();

    if( e.which == 32  && word_validator == true && userRace.viewableNextWords != 1 ) {

      clearInput( $( this ) );
      userRace.points ++;
      userRace.viewHelper();

    } else if ( userRace.viewableNextWords == 1 && word_validator ){
      clearInput( $( this ) );
      userRace.points ++;
      userRace.viewHelper();

    }
  });



  $('.timer').startTimer({ onComplete: function(element){
    element.addClass('is-complete')
    $(".timer").html( "START!" );
    $("#gameInput").prop("disabled", false);
    $("#gameInput").focus();
    userRace.start();
  } });

console.log(accuracy(78,90));

});