
var slideUp = function (el) {
  var progress = 100;

  var start = $( window ).height();
	var height = (($( window ).height()) / progress);

	$({deg: 0}).animate({deg: progress}, {
			duration: 1500,
			step: function(now) {

					var yPos = start - (height * now);

					$(el).css({
							transform: 'translateY('+ yPos +'px)'
					});
			}
	});
}


var slideDown = function (el) {
  var progress = 100;

	var height = (($( window ).height()) / progress);

	$({deg: 0}).animate({deg: progress}, {
			duration: 1500,
			step: function(now) {

					var yPos = (height * now);

					$(el).css({
							transform: 'translateY('+ yPos +'px)'
					});
			}
	});
}
