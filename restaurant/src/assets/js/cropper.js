$(function() {
  'use strict';

  var croppingImage = document.querySelector('#croppingImage'),
  img_w = document.querySelector('.img-w'),
  cropBtn = document.querySelector('.crop'),
  croppedImg = document.querySelector('.cropped-img'),
  dwn = document.querySelector('.download'),
  upload = document.querySelector('#cropperImageUpload'),
  cropper = '';

  $('.file-upload-browse').on('click', function(e) {
    var file = $(this).parent().parent().parent().find('.file-upload-default');
    file.trigger('click');
  });

  cropper = new Cropper(croppingImage);

  // on change show image with crop options
  upload.addEventListener('change', function (e) {
    $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));    
    if (e.target.files.length) {
      cropper.destroy();
      // start file reader
      const reader = new FileReader();
      reader.onload = function (e) {
        if(e.target.result){
          croppingImage.src = e.target.result;
          cropper = new Cropper(croppingImage);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });

  // crop on click
  cropBtn.addEventListener('click',function(e) {
    e.preventDefault();
    // get result to data uri
    let imgSrc = cropper.getCroppedCanvas({
      width: img_w.value // input value
    }).toDataURL();
    croppedImg.src = imgSrc;
    dwn.setAttribute('href', imgSrc);
    dwn.download = 'imagename.png';
  });

});