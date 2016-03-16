
var rollOffAnimate = function (el, direction) {
	var progress = 100;

	var rotate = (360 / progress) * direction;
	var width = ((($( window ).width() / 2) + ($(el).width() * 2)) / progress) * direction;

	$({deg: 0}).animate({deg: progress}, {
			duration: 1500,
			step: function(now) {

					var deg =	(rotate * now);
					var xPos = (width * now);

					$(el).css({
							transform: 'translateX('+ xPos +'px) rotate(' + deg + 'deg)'
					});
			}
	});
}

var rollInAnimate = function (el, direction) {
	var progress = 100;

	var rotate = (-360 / progress) * direction;
	var width = ((($( window ).width() / 2) + ($(el).width() * 2)) / progress) * direction;
	var start = (($( window ).width() / 2) + ($(el).width() * 2)) * direction;

	$({deg: 0}).animate({deg: progress}, {
			duration: 1500,
			step: function(now) {

					var deg =	(rotate * now);
					var xPos = start - (width * now);

					$(el).css({
							transform: 'translateX('+ xPos +'px) rotate(' + deg + 'deg)'
					});
			}
	});
}

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
