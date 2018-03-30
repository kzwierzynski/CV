let wrapper = document.getElementById('wrapper');
let topLayer = wrapper.querySelector('.top');
let topWrap = topLayer.querySelector('.content-wrap');  //added
let bottomLayer = wrapper.querySelector('.bottom');     //added
let bottomWrap = bottomLayer.querySelector('.content-wrap') //added
let handle = wrapper.querySelector('.handle');
let bodie = document.body;
//initializing
let skew = 500;  // because of the margin
let delta = 0;

//setting width of the layers and their content to the width of wrapper
function setWidth(){  
  bottomLayer.style.width= wrapper.offsetWidth + 'px';
  topLayer.style.width= wrapper.offsetWidth + 'px';
  bottomWrap.style.width= wrapper.offsetWidth + 'px';
  topWrap.style.width= wrapper.offsetWidth + 'px';
  // console.log(bodyWidth);
}

document.addEventListener('DOMContentLoaded', function(){
  // added coz not using vw anymore -> in container
  setWidth();
  topLayer.style.width= bodie.offsetWidth/2 -wrapper.offsetLeft + skew + 'px';    
  
  wrapper.addEventListener('mousemove', function(e){
    delta = (e.clientX - bodie.offsetWidth / 2) *0.3;  //na srodku=0, im dalej od środka tym bardziej popycha "belkę" oddzielającą warstwy
      // console.log(e.clientX-wrapper.offsetLeft, delta)
    handle.style.left = e.clientX -wrapper.offsetLeft + delta + 'px';
    //-wrapper.offsetLeft to center the line (offset from container)
    topLayer.style.width= e.clientX -wrapper.offsetLeft + skew + delta + 'px';
  });

});

window.addEventListener('resize', function(){
  //on resize of a window adjust size of layers to the size of the banner
  setWidth();

  // when resizing refresh position of the bar and top layer to the centre
  handle.style.left = bodie.offsetWidth / 2 - wrapper.offsetLeft + 'px';
  topLayer.style.width= bodie.offsetWidth / 2 - wrapper.offsetLeft + skew + 'px';
});