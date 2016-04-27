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

var productList = [];
function ProductList(filenames) {
  this.ProductList = [];
  for (var i = 0 ; i < filenames.length ; i ++) {
    this.ProductList.push(new Product(filenames[i]));
    this.ProductList[i].index = i;
  }
}

function Product(filename) {
  this.filename = filename;
  this.displayedCount = 0;
  this.clickCount = 0;
  this.index = 0;
}

var productList = new ProductList(imageFiles);

Product.prototype.makeImageHTML = function(index) {
  return ('<img src="img/' + this.filename + ' "value="' + index + '" alt="" />');
};
Product.prototype.makeImageHTML2 = function() {
  return ('<img src="img/' + this.filename + ' "value="' + this.index + '" alt="" />');
};

ProductList.prototype.randomImage = function() {
  return Math.floor( Math.random() * (imageFiles.length));
};

ProductList.prototype.spin = function(){
  var unique = [];
  unique[0] = this.randomImage();
  unique[1] = this.randomImage();
  while (unique[1] === unique[0]){
    unique[1] = this.randomImage();
  }
  unique[2] = this.randomImage();
  while (unique[2] === unique[1] || unique[2] === unique[0]){
    unique[2] = this.randomImage();
  }
  return unique;

};

// return objects in array instead of indices.
ProductList.prototype.spin2 = function(){
  var unique = [];
  unique[0] = this.ProductList[this.randomImage()];
  unique[1] = this.ProductList[this.randomImage()];
  while (unique[1] === unique[0]){
    unique[1] = this.ProductList[this.randomImage()];
  }
  unique[2] = this.ProductList[this.randomImage()];
  while (unique[2] === unique[1] || unique[2] === unique[0]){
    unique[2] = this.ProductList[this.randomImage()];
  }
  return unique;

};

ProductList.prototype.newChoices = function() {
  var mySpin = this.spin2();
  document.getElementById('image1').innerHTML = mySpin[0].makeImageHTML2();
  mySpin[0].displayedCount ++;

  document.getElementById('image2').innerHTML = mySpin[1].makeImageHTML2();
  mySpin[1].displayedCount ++;

  document.getElementById('image3').innerHTML = mySpin[2].makeImageHTML2();
  mySpin[2].displayedCount ++;
};

var myLabels = [];

ProductList.prototype.genLabels = function() {
  var tempArray = [];
  this.ProductList.forEach( function(product) {
    tempArray.push(product.filename);
  }, this);
  return tempArray;
};

ProductList.prototype.genData = function() {
  var tempArray = [];
  this.ProductList.forEach( function (product){
    tempArray.push(product.clickCount);
  }, this);
  return tempArray;
};

function clickHandler(e) {
  var targetEl = e.target;
  e.preventDefault();
  if ( counter < maxClicks ) {
    if ( targetEl.getAttribute('value') ) {
      productList['ProductList'][targetEl.getAttribute('value')].clickCount ++;
      productList.newChoices();
      counter ++;
    }
  } else {
    toggleHidden('survey');
    toggleHidden('continue');
  }
}

function toggleHidden(classname){
  var hiddenEls = document.getElementsByClassName(classname);
  console.log(hiddenEls);
  for ( var i = 0; i < hiddenEls.length ; i ++) {
    console.log(hiddenEls[i].classList);
    hiddenEls[i].classList.toggle('hidden');
  }
}

function buttonHandler(e) {
  var targetEl = e.target;
  switch (e.target.id) {
  case 'begin-button':
    console.log('begin Button');
    toggleHidden('begin');
    toggleHidden('survey');

    // hiddenEls.forEach( function(entry) {
    //   console.log(entry.classList);
    //   entry.classlist.toggle('hidden');
    //   console.log(entry.classList);
    // }, this );
    break;
  case 'results-button':
    console.log('results-button');
    toggleHidden('continue');
    toggleHidden('results');
    productList.summaryReport('test');
    productList.displayGraph();

    break;
  case 'more-button':
    console.log('more-button');
    productList.newChoices();
    counter = 0; maxClicks = 10;

    toggleHidden('continue');
    toggleHidden('survey');
    break;
  }
}

ProductList.prototype.summaryReport = function(rowClass) {
  var appendRows = document.getElementById('append-rows');
  appendRows.innerHTML = '';
  var tr = document.createElement('tr');

  var th = document.createElement('th');
  tr.className = rowClass;
  th.textContent = 'Image:';
  th.className = 'imagerow';
  tr.appendChild(th);

  this.ProductList.forEach( function(product) {
    var td = document.createElement('th');
    var div = document.createElement('div');
    var span = document.createElement('span');
    td.className = 'imagerow';
    span.textContent = product.filename;
    div.appendChild(span);
    td.appendChild(div);
    tr.appendChild(td);
  }, this );
  appendRows.appendChild(tr);

  th = document.createElement('th');
  tr = document.createElement('tr');
  tr.className = rowClass;
  th.textContent = 'Displayed:';
  th.className = 'displayedrow';
  tr.appendChild(th);

  this.ProductList.forEach( function(product) {
    var td = document.createElement('td');
    td.textContent = product.displayedCount;
    tr.appendChild(td);
  }, this );
  appendRows.appendChild(tr);

  th = document.createElement('th');
  tr = document.createElement('tr');
  tr.className = rowClass;
  th.textContent = 'Clicked:';
  th.className = 'clickedrow';
  tr.appendChild(th);

  this.ProductList.forEach( function(product) {
    var td = document.createElement('td');
    td.textContent = product.clickCount;
    tr.appendChild(td);
  }, this );
  appendRows.appendChild(tr);

  th = document.createElement('th');
  tr = document.createElement('tr');
  tr.className = rowClass;
  th.textContent = 'Percentage';
  th.className = 'clickedrow';
  tr.appendChild(th);

  this.ProductList.forEach( function(product) {
    var td = document.createElement('td');
    td.textContent = Math.round(product.clickCount / product.displayedCount * 100) + '%';
    tr.appendChild(td);
  }, this );
  appendRows.appendChild(tr);

};

var counter = 0;
var maxClicks = 25;

var elImageClick = document.getElementById('image-container');
elImageClick.addEventListener('click', clickHandler, false);

var elBeginButton = document.getElementById('begin-button');
elBeginButton.addEventListener('click', buttonHandler, false);

var elButtonBar = document.getElementById('button-bar');
elButtonBar.addEventListener('click', buttonHandler, false);

productList.newChoices();

var myChart = document.getElementById('chart').getContext('2d');

ProductList.prototype.displayGraph = function() {

  var data = {
    labels: productList.genLabels(),
    datasets: [
      {
        label: 'My First dataset',

        // The properties below allow an array to be specified to change the value of the item at the given index
        // String  or array - the bar color
        backgroundColor: "rgba(255,99,132,0.2)",

        // String or array - bar stroke color
        borderColor: "rgba(255,99,132,1)",

        // Number or array - bar border width
        borderWidth: 1,

        // String or array - fill color when hovered
        hoverBackgroundColor: "rgba(255,99,132,0.4)",

        // String or array - border color when hovered
        hoverBorderColor: "rgba(255,99,132,1)",

        // The actual data
        data: productList.genData(),

        // String - If specified, binds the dataset to a certain y-axis. If not specified, the first y-axis is used.
        yAxisID: "y-axis-0",
      }
    ],
//     options: [
//     // Boolean - whether or not the chart should be responsive and resize when the browser does.
//
//       responsive: true,
//
// // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
//
// maintainAspectRatio: false]
//
  };
  var myBarChart = new Chart(myChart, {
    type: 'bar',
    data: data,
      // options: options
  });

};
