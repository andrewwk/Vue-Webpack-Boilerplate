module.exports = function(src, guarantee=false){

  var image = new Image();
  image.crossOrigin = 'anonymous';

  //src = assetUrl(src);
  var resetImage = function(){
    image.onload = null;
    image.onerror = null;
  }

  return new Promise((resolve, reject) => {
    image.onload = function(){
      resetImage();
      // console.log('image loaded:', image.src);
      resolve(image);
    }
    image.onerror = function(){
      resetImage();
      // console.log('image failed to load:', image.src);
      if (guarantee){
        reject(image);
      } else {
        resolve(image);
      }
    }
    image.src = src;
    if (image.complete) {
      resetImage();
      // console.log('image.complete:', image.src);
      resolve(image);
    }
  });

}
