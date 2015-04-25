$( document ).ready(function() {

  var clearInput = function(who){ who.val('') }

  var word_to_array = function( textContainer ){
    return array = $(textContainer).text().split(' ')
  }

  var strings = word_to_array('#text-to-input');

  var Race = function(next_words_p, gameText) {
    this.points = 0;
    this.time = 0;
    this.viewableNextWords = 10;
    this.strings = word_to_array( gameText );
    this.next_words_p = next_words_p;
    this.viewHelper(next_words_p);
  }

  Race.prototype = {

   checkWord : function(array, word){

    word =  word.replace(/\s/g, '');
    if ( array  == word ) { return true } else { return false }

    },
    word_to_array : function( textContainer ){
      return array = $(textContainer).text().split(' ')
    },
    limitView: function(){
      this.stringsLength = this.strings.length;
      if ( this.stringsLength - this.points < this.viewableNextWords ) {
        this.viewableNextWords = this.stringsLength - this.points ;
        // console.log( this.viewableNextWords );
        if ( this.viewableNextWords == 1 ) {

          console.log('finished');
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

  userRace = new Race('.next-word', '#gameText');

  $( "body" ).on( "click", ".start-time", function() { userRace.start() });
  $( "body" ).on( "click", ".stop-time", function() { console.log( "current time at click: " + userRace.stop() ) });



  $("#gameInput").keyup(function(e){

    var val = $( this ).val();

    word_validator = userRace.checkWord( userRace.strings[ userRace.points ] , val) ;

    userRace.viewHelper();

    if( e.which == 32  && word_validator == true ) {
      clearInput( $( this ) );
      userRace.points ++;
      userRace.viewHelper();
    }
  });

});
