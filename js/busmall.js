var imageFiles = [ 'bag.jpg',
'banana.jpg',
'bathroom.jpg',
'boots.jpg',
'breakfast.jpg',
'bubblegum.jpg',
'chair.jpg',
'cthulhu.jpg',
'dog-duck.jpg',
'dragon.jpg',
'pen.jpg',
'pet-sweep.jpg',
'scissors.jpg',
'shark.jpg',
'sweep.png',
'tauntaun.jpg',
'unicorn.jpg',
'usb.gif',
'water-can.jpg',
'wine-glass.jpg'];

var randomImage = function() {
  return Math.floor( Math.random() * (imageFiles.length));
};

function spin() {
  var unique = [];
  unique[0] = randomImage();
  unique[1] = randomImage();
  while (unique[1] === unique[0]){
    unique[1] = randomImage();
  }
  unique[2] = randomImage();
  while (unique[2] === unique[1] || unique[2] === unique[0]){
    unique[2] = randomImage();
  }
  return unique;
}
function newChoices() {
  var mySpin = spin();
  var myImage1 = document.getElementById('image1');
  var myHTML = '<img src="img/' + imageFiles[mySpin[0]] + ' "value="' + mySpin[0] + '" alt="" />';
  myImage1.innerHTML = myHTML;
  clickStats[mySpin[0]][1] ++;

  var myImage2 = document.getElementById('image2');
  myHTML = '<img src="img/' + imageFiles[mySpin[1]] + ' "value="' + mySpin[1] + '" alt="" />';
  myImage2.innerHTML = myHTML;
  clickStats[mySpin[1]][1] ++;

  var myImage3 = document.getElementById('image3');
  myHTML = '<img src="img/' + imageFiles[mySpin[2]] + ' "value="' + mySpin[2] + '" alt="" />';
  myImage3.innerHTML = myHTML;
  clickStats[mySpin[2]][1] ++;

}
function clickHandler(e) {
  var targetEl = e.target;
  e.preventDefault();
  console.log(targetEl);
  while ( counter < 25 ) {

    clickStats[targetEl.getAttribute('value')][2] ++;
    console.log(clickStats[targetEl.getAttribute('value')][0] + clickStats[targetEl.getAttribute('value')][1] + clickStats[targetEl.getAttribute('value')][2]);
    newChoices();
    counter ++;
    break;
  }

}

var clickStats = [];
function initArrays () {
  for ( var i = 0; i < imageFiles.length ; i++){
    clickStats[i] = [imageFiles[i], 0, 0];
  }
}
initArrays();
newChoices();
var counter = 0;


var elImageClick = document.getElementById('image-container');
document.addEventListener('click', clickHandler, false);
