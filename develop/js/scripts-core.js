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

import Inc2734_WP_Share_Buttons from '../../vendor/inc2734/wp-share-buttons/src/assets/js/wp-share-buttons.js';
new Inc2734_WP_Share_Buttons();
