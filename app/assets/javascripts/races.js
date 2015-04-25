$( document ).ready(function() {

  var clearInput = function(who){ who.val('') }

  var word_to_array = function( textContainer ){
    return array = $(textContainer).text().split(' ')
  }

  var strings = word_to_array('#text-to-input');

  var Race = function(next_words_p) {
    this.points = 0;
    this.time = 0;
    this.viewableNextWords = 20;
    this.next_words_p = next_words_p;
    this.viewHelper(next_words_p);
  }

  Race.prototype = {

   checkWord : function(array, word){

    word =  word.replace(/\s/g, '');
    if ( array  == word ) { return true } else { return false }

    },

    viewHelper : function(){
      var viewHelperText = "";
      for (var i = 0; i < this.viewableNextWords ; i++) {
        viewHelperText += strings[this.points + i] + " "
      };

      // var viewHelperText = strings.slice(this.points , this.viewableNextWords).join(" ");
      // viewHelperText =  "<strong>" + strings[this.points]+ "</strong>" + " " + strings[this.points + 1] + " " + strings[this.points + 2] + " " + strings[this.points + 3];

      $( this.next_words_p ).html( viewHelperText );

    },

    start : function(){

      var that = this;
      window.setInterval(function(){
        that.time += 1000;
        elapsed = Math.floor(that.time / 1000) / 1;
        console.log(elapsed)
      }, 1000);
    },

    stop : function(){

      clearInterval( this );
      elapsed = Math.floor(this.time / 1000) / 1;
      return elapsed;

    }
  }

  userRace = new Race('.next-word');

  $( "body" ).on( "click", ".start-time", function() { userRace.start() });
  $( "body" ).on( "click", ".stop-time", function() { console.log( "current time at click: " + userRace.stop() ) });



  $("#GameInput").keyup(function(e){

    var val = $( this ).val();

    word_validator = userRace.checkWord(strings[userRace.points] , val) ;

    userRace.viewHelper();
    if( e.which == 32  && word_validator == true ) {
      clearInput( $( this ) );
      userRace.points ++;
      userRace.viewHelper();
    }
  });

});
