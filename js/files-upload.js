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

    var matches = FILE_TYPES.some(function (it) {
     return fileName.endsWith(it);
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


  imagesChooser.addEventListener('change', function () {
    //var fragment = document.createDocumentFragment();
    photoContainer.removeChild(photoContainer.querySelector('.ad-form__photo'));

    for (var i = 0; i < imagesChooser.files.length; i++) {
      var file = imagesChooser.files[i];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
       return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var image = document.createElement('img');
          var imagesBox = document.createElement('div');
          imagesBox.classList.add('ad-form__photo');
          image.src = reader.result;
          imagesBox.appendChild(image);
          photoContainer.appendChild(imagesBox);
        });

        reader.addEventListener('error', function () {
          window.showError('Ошибка загрузки файла!');
        });

        reader.readAsDataURL(file);
      }

    }
    //photoContainer.appendChild(fragment);

  });


  var setAvatarDefault = function () {
    avatarPreview.src = DEFAULT_AVATAR;
  };

  var setPhotosDefault = function () {
    var photos = photoContainer.querySelectorAll('.ad-form__photo');
    for (var i = 0; i < photos.length; i++) {
      photoContainer.removeChild(photos[i]);
    }

    var imageBox = document.createElement('div');
    imageBox.classList.add('ad-form__photo');
    photoContainer.appendChild(imageBox);
  };

  window.filesUpload = {
    setAvatarDefault: setAvatarDefault,
    setPhotosDefault: setPhotosDefault
  };
})();
