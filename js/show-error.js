'use strict';

(function () {
  var TIMEOUT = 2000;

  var showError = function (errorMessage) {
    var errorTooltip = document.createElement('div');
    errorTooltip.classList.add('error-message');
    errorTooltip.innerHTML = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorTooltip);

    setTimeout(function () {
      document.body.removeChild(errorTooltip);
    }, TIMEOUT);
  };

  window.showError = showError;
})();
