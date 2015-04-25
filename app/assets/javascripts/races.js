$( document ).ready(function() {

  var clearInput = function(who){ who.val('') }

  var word_to_array = function(textContainer){ return array = $(textContainer).text().split(' ') }


  var strings = word_to_array('#text-to-input');
  // console.log(strings_array);

  var Timer = function() {
    this.time = 0;
    this.start = function(){
      var that = this;
      window.setInterval(function(){
        that.time += 1000;
        elapsed = Math.floor(that.time / 1000) / 1;
        console.log(elapsed)
      }, 1000);
    }
    this.stop = function(){
      clearInterval( this );
      elapsed = Math.floor(this.time / 1000) / 1;
      return elapsed;
    }
  }
  var timer = new Timer();

  $( "body" ).on( "click", ".start-time", function() {
    timer.start();
  });
  $( "body" ).on( "click", ".stop-time", function() {
    console.log( "current time at click: " + timer.stop() );
  });



  var checkWord = function(array, word){
    word =  word.replace(/\s/g, '');
    if ( array  == word ) { return true } else { return false }
  }

  var counter = 0;

  $("#GameInput").keyup(function(e){


    var val = $( this ).val();
    console.log( val + " : " + strings[counter] );
    word_validator = checkWord(strings[counter] , val) ;
    console.log( word_validator );
    // console.log("Correct!");

     if( e.which == 32  && word_validator == true ) {
      clearInput( $( this ) );
      counter ++;
    }

      // console.log(val);
  });




  });
