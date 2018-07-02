'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imagesChooser = document.querySelector('#images');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.addEventListener('error', function () {
        window.showError('Ошибка загрузки файла!');
      });

      reader.readAsDataURL(file);
    }
  });

  var isFirstPhotosUpload = true;

  imagesChooser.addEventListener('change', function () {

    if (isFirstPhotosUpload) {
      photoContainer.removeChild(photoContainer.querySelector('.ad-form__photo'));
      isFirstPhotosUpload = false;
    }

    var readers = [];

    for (var i = 0; i < imagesChooser.files.length; i++) {
      var file = imagesChooser.files[i];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        readers[i] = new FileReader();

        readers[i].addEventListener('load', function (evt) {
          var imagesBox = document.createElement('div');
          imagesBox.classList.add('ad-form__photo');

          var image = document.createElement('img');
          image.src = evt.target.result;
          imagesBox.appendChild(image);
          photoContainer.appendChild(imagesBox);
        });

        readers[i].addEventListener('error', function () {
          window.showError('Ошибка загрузки файла!');
        });

        readers[i].readAsDataURL(file);
      }
    }

  });

  var setAvatarDefault = function () {
    avatarPreview.src = DEFAULT_AVATAR;
  };

  var setPhotosDefault = function () {
    isFirstPhotosUpload = true;

    var photos = photoContainer.querySelectorAll('.ad-form__photo');
    [].forEach.call(photos, function (item) {
      photoContainer.removeChild(item);
    });

    var imageBox = document.createElement('div');
    imageBox.classList.add('ad-form__photo');
    photoContainer.appendChild(imageBox);
  };

  window.filesUpload = {
    setAvatarDefault: setAvatarDefault,
    setPhotosDefault: setPhotosDefault
  };
})();
