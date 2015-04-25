$( document ).ready(function() {
  console.log( "ready!" );
  var time = 0,
  elapsed = '0.0';

//   var timer = function(){
//     window.setInterval(function(){
//       time += 1000;
//       elapsed = Math.floor(time / 1000) / 1;
//       console.log(elapsed)
//     }, 1000);
//   }

// timer();

var word_to_array = function(textContainer){
  return array = $(textContainer).text().split(' ');
}
console.log(word_to_array('#text-to-input')[0][2]);



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
});
