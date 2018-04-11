let wrapper = document.getElementById('wrapper');
let topLayer = wrapper.querySelector('.top');
let topWrap = topLayer.querySelector('.content-wrap');  //added
let bottomLayer = wrapper.querySelector('.bottom');     //added
let bottomWrap = bottomLayer.querySelector('.content-wrap') //added
let handle = wrapper.querySelector('.handle');
let bodie = document.body;
let img = wrapper.querySelector('img');

let sc1 = document.querySelector('.showcase1');
let sc2 = document.querySelector('.showcase2');
//initializing
let skew = 500+1;  // because of the margin
let delta = 0;

console.log("after init: ", wrapper.offsetWidth, img.height, sc1.offsetHeight, sc2.offsetHeight);


//setting width of the layers and their content to the width of wrapper/container
function setWidth(){  
  console.log("at the beginning of setWidth: ", wrapper.offsetWidth, img.height, sc1.offsetHeight, sc2.offsetHeight);
  bottomLayer.style.width= wrapper.offsetWidth + 'px';
  topLayer.style.width= wrapper.offsetWidth + 'px';
  bottomWrap.style.width= wrapper.offsetWidth + 'px';
  topWrap.style.width= wrapper.offsetWidth + 'px';
  wrapper.style.height = img.height * 1.8 + 'px';
  sc2.style.height = sc1.offsetHeight + 'px';
  console.log("at the end of setWidth: ", wrapper.offsetWidth, img.height, wrapper.style.height, sc1.offsetHeight, sc2.offsetHeight);
  // console.dir(sc1.offsetHeight);
}



document.addEventListener('DOMContentLoaded', function(){
  // added coz not using vw anymore -> in container
  setWidth();
  console.log("after setWidth: ", wrapper.offsetWidth, img.height, sc1.offsetHeight, sc2.offsetHeight);
  topLayer.style.width= bodie.offsetWidth/2 -wrapper.offsetLeft + skew + 'px';    
  // wrapper.style.height = img.height * 1.8 + 'px'; // needed at initialization to set size of jumbotron
  
  wrapper.addEventListener('mousemove', function(e){
    delta = (e.clientX - bodie.offsetWidth / 2) *0.4;  //na srodku=0, im dalej od środka tym bardziej popycha "belkę" oddzielającą warstwy
      // console.log(e.clientX-wrapper.offsetLeft, delta)
    handle.style.left = e.clientX -wrapper.offsetLeft + delta + 'px';
    //-wrapper.offsetLeft to center the line (offset from container)
    topLayer.style.width= e.clientX -wrapper.offsetLeft + skew + delta + 'px';
    console.log("on mouse move: ", wrapper.offsetWidth, img.height, sc1.offsetHeight, sc2.offsetHeight);
  });

});

window.addEventListener('resize', function(){
  //on resize of a window adjust size of layers to the size of the banner
  setWidth();

  // when resizing refresh position of the bar and top layer to the centre
  handle.style.left = bodie.offsetWidth / 2 - wrapper.offsetLeft + 'px';
  topLayer.style.width= bodie.offsetWidth / 2 - wrapper.offsetLeft + skew + 'px';
});