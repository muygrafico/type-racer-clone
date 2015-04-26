$( document ).ready(function() {
  console.log('ITS LOADING RACES.JS');

  var clearInput = function(who){ who.val('') }
  var word_to_array = function( textContainer ){ return array = $(textContainer).text().split(' ')}

  var Race = function(next_words_p, gameText,user_id) {
    this.points = 0;
    this.time = 0;
    this.user_id = $( '.userData' ).data('user');
    this.viewableNextWords = 12;
    this.strings = word_to_array( gameText );
    this.next_words_p = next_words_p;
    this.viewHelper(next_words_p);
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
      success: function(){console.log("data sent")}
    })
  },
  limitView: function(){
    this.stringsLength = this.strings.length;
    if ( this.stringsLength - this.points < this.viewableNextWords ) {
      this.viewableNextWords = this.stringsLength - this.points ;
      if ( this.viewableNextWords < 1 ) {
          // console.log('finished');
          $("#gameInput").prop("disabled", true );
          this.elapsed = this.stop();
          wpm = Math.round( ( this.stringsLength / (this.elapsed/60) ) )

          $("#sec").html( "WPM: " + wpm );
          this.item = { race: {"wpm" : wpm, "accuracy" : 0, "finished_time": this.elapsed, "user_id": this.user_id }};
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
        console.log(that.elapsed)
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

  $( "body" ).on( "click", ".start-time", function() { userRace.start() });
  $( "body" ).on( "click", ".stop-time", function() { console.log( "current time at click: " + userRace.stop() ) });
  $.ajax({
    url: "http://api.icndb.com/jokes/random",
    type: "GET",
    success: function( response ){
      $('#gameText').html(response.value.joke);
      userRace = new Race( '.next-word', '#gameText' );
      console.log("getting joke");
    }
  })
  $("#gameInput").keyup(function(e){
    var val = $( this ).val();
    word_validator = userRace.checkWord( userRace.strings[ userRace.points ] , val) ;
    userRace.viewHelper();
    console.log("outside: " + userRace.viewableNextWords );
    if( e.which == 32  && word_validator == true && userRace.viewableNextWords != 1 ) {
      console.log("inside: " + userRace.viewableNextWords );
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



});
