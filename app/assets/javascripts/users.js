$(document).ready(function(){
	$("#following").on({
	    mouseenter: function () {
	    		$(this).addClass("unfollow")
	        $(this).html("Unfollow")
	    },
	    mouseleave: function () {
	        $(this).removeClass("unfollow")
	        $(this).html("Following")
	    }
	});
})