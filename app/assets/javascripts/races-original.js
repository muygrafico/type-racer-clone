$( document ).ready(function() {
  console.log("ChuckType Engine V0.4a");

  var Race = function( nextWords, gameText, gameInput ) {
    this.keystrokeCounter = 0
    this.points = 0
    this.time = 0
    this.user_id = document.getElementsByClassName( 'userData' )[0].getAttribute("data-user")
    this.viewableNextWords = 12
    this.stringsArray = this.word_to_array( gameText )
    this.wordsCount = this.stringsArray.length
    this.lettersCount = document.getElementById(gameText).innerHTML.length
    console.log(this.lettersCount)
    this.nextWords = nextWords
    this.viewHelper( nextWords )
    this.addKeyListener()

  }

  Race.prototype = {
    clearInput : function(who){ who.val('') },

    checkWord : function(array_word, word){
      word =  word.replace(/\s/g, '')
      return x = array_word  == word
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

      if ( this.wordsCount - this.points < this.viewableNextWords ) {
        this.viewableNextWords = this.wordsCount - this.points
        if ( this.viewableNextWords < 1 ) {

          document.getElementsByClassName("timer").innerHTML = "YOU FINISHED";

          $( gameInput ).prop("disabled", true );
          this.elapsed = this.stop();

          this.accuracyResult = this.accuracy( this.lettersCount , this.keystrokeCounter);
          wpm = Math.round( ( this.wordsCount / (this.elapsed/60) ) )

          $("#sec").html( "WPM: " + wpm );
          this.item = { race: {"wpm" : wpm, "accuracy" : this.accuracyResult, "finished_time": this.elapsed, "user_id": this.user_id }};
          this.sendGameData( this.item )
          $('.new-game').removeClass('hide')
        };
      };
    },
    viewHelper : function(){
      var viewHelperText = "";
      this.limitView();
      for ( var i = 0; i < this.viewableNextWords ; i++ ) {
        if ( i == 0 ) {
          viewHelperText +=  "<strong>" +this.stringsArray[this.points + i] + "</strong> "
        } else {
          viewHelperText += this.stringsArray[this.points + i] + " "
        }
      };
      $( this.nextWords ).html( viewHelperText )
    },
    start : function(){
      clearInterval( this.timer );
      this.addInputValidation();
      var that = this;
      that.time = 0;
      $( gameInput ).prop("disabled", false);
      $( gameInput ).focus();
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
    addKeyListener : function(){
      var that = this;
      $(gameInput).keypress(function(event){
        that.keyPressed = event.which
        that.keystrokeCounter ++
      })
    },
    addInputValidation : function(){
      var that = this;

      $( gameInput ).on('input', function(e) {

        if( ( that.keyPressed == 32  && that.viewableNextWords != 1 ) ||  that.viewableNextWords == 1) {

          val = $( gameInput ).val();

          word_validator = that.checkWord( that.stringsArray[ that.points ] , val)
          if ( word_validator ){
            that.clearInput( $( gameInput ) )
            that.points ++
            that.viewHelper()
          }
        }

      })
    },
    accuracy : function(text_length, counter){
      var part1 = text_length - (counter - text_length )
      var part2 = part1 / text_length;
      return (part2 * 100).toFixed(2) ;
    }
  }


  $('.timer').startTimer({ onComplete: function(element){
    $(this ).html( "START!" );
    userRace = new Race( '.next-word', 'gameText' );
    userRace.start();
  } });

});
