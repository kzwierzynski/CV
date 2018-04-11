let wrapper, topLayer, topWrap, bottomLayer, bottomWrap, handle, bodie, img, sc1, sc2;

//initializing
let skew = 500+1;  // because of the margin
let delta = 0;

//setting width of the layers and their content to the width of wrapper
function setWidth(){  
  bottomLayer.style.width= wrapper.offsetWidth + 'px';
  topLayer.style.width= wrapper.offsetWidth + 'px';
  bottomWrap.style.width= wrapper.offsetWidth + 'px';
  topWrap.style.width= wrapper.offsetWidth + 'px';
  wrapper.style.height = img.height * 1.8 + 'px';
  sc2.style.height = sc1.offsetHeight + 'px';
  
  // console.dir(sc1.offsetHeight);
}



document.addEventListener('DOMContentLoaded', function(){
  
wrapper = document.getElementById('wrapper');
topLayer = wrapper.querySelector('.top');
topWrap = topLayer.querySelector('.content-wrap');  //added
bottomLayer = wrapper.querySelector('.bottom');     //added
bottomWrap = bottomLayer.querySelector('.content-wrap') //added
handle = wrapper.querySelector('.handle');
bodie = document.body;
img = wrapper.querySelector('img');

sc1 = document.querySelector('.showcase1');
sc2 = document.querySelector('.showcase2');
  // added coz not using vw anymore -> in container
  setWidth();
  topLayer.style.width= bodie.offsetWidth/2 -wrapper.offsetLeft + skew + 'px';    
  // wrapper.style.height = img.height * 1.8 + 'px'; // needed at initialization to set size of jumbotron
  // sc2.style.height = sc1.offsetHeight + 'px';
  
  wrapper.addEventListener('mousemove', function(e){
    delta = (e.clientX - bodie.offsetWidth / 2) *0.35;  //na srodku=0, im dalej od środka tym bardziej popycha "belkę" oddzielającą warstwy
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