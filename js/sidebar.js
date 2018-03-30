$(document).ready(function() {

    let toggleAffix = function(affixElement, scrollElement, wrapper) {
    
      let height = affixElement.outerHeight(),
          top = wrapper.offset().top;
      
      if (scrollElement.scrollTop() >= top){
          wrapper.height(height);
          affixElement.addClass("affix");
      }
      else {
          affixElement.removeClass("affix");
          wrapper.height('auto');
      }
    };
    
  
    $('[data-toggle="affix"]').each(function() {
      let ele = $(this),
          wrapper = $('<div></div>');
      
      ele.before(wrapper);
      $(window).on('scroll resize', function() {
          toggleAffix(ele, $(this), wrapper);
      });
      
      // init
      toggleAffix(ele, $(window), wrapper);
    });
    
  });