// Add target="_blank" when user opens external link
(function() {
  var a = document.querySelectorAll('a');
  for (var i = 0; i < a.length; i++) {
    if (a[i].host !== location.host) {
      a[i].setAttribute('target', '_blank');
      a[i].setAttribute('rel', 'noopener noreferrer');
    }
  }
}());


var w = $(window).width();
var x = 767;


// ハンバーガーメニュー　スマホ　開閉
$(function() {
	$('.nav-toggle').click(function() {
		$('.globalNavigation').slideToggle(200);
		$(this).toggleClass('is-active');
	});
	$(document).on('click touchend', function(event) {
		var w = $(window).width();
		if ( w <= x ) {
			if (!$(event.target).closest('.nav-toggle, .globalNavigation').length) {
				$('.globalNavigation').slideUp(200);
				$('.nav-toggle').removeClass('is-active');
			}
		}
	});
	$('.globalNavigation ul li a[href^="#"]').click(function() {
		$('.globalNavigation').slideUp(200);
		$('.nav-toggle').removeClass('is-active');
	});
});




// スムーススクロール
$('a[href^="#"]').click(function() {
	// スクロールの速度
	var speed = 800; // ミリ秒
	// アンカーの値取得
	var href= $(this).attr("href");
	// 移動先を取得
	var target = $(href == "#" || href == "" ? 'html' : href);
	// 移動先を数値で取得
	var position = target.offset().top - 40;
	// スムーススクロール
	$('body,html').animate(
		{scrollTop:position}, speed, 'swing'
	);
	return false;
});
