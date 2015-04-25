$( document ).ready(function() {

  var clearInput = function(who){ who.val('') }

  var word_to_array = function(textContainer){ return array = $(textContainer).text().split(' ') }


  var
  first_string = word_to_array('#text-to-input')[0];
  // console.log(word_to_array('#text-to-input')[0][2]);

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
  $("#GameInput").keyup(function(e){

    var val = $( this ).val();
    if (val === first_string) {

      console.log("Correct!");

      $(this).keyup(function(e){
       console.log("event2: " + e.which);
       if(e.which == 32 ) {
         clearInput($( this ));
       }
     })

    };



    console.log(val);
  });
});
