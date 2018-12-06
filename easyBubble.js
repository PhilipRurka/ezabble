window.easyBubbleLib = {
  timeout: false,
  number: 0,
  defaultColors: {
    background_color: '#000',
    border_color: '#fff',
    shadow_color: '#000'
  },
  init: function() {
    window.easy_bubble_colors = window.easy_bubble_colors || defaultColors;
    var easyList = document.getElementsByClassName('easy-bubble');
    for (var i = 0; i < easyList.length; i++) {
      var easyBubble = easyList[i];
      var set = undefined;
      if(easy_bubble_colors.per_id) {
        for (let i = 0; i < easy_bubble_colors.per_id.length; i++) {
          const colorObj = easy_bubble_colors.per_id[i];
          if(colorObj.id === easyBubble.id) {   
            set = colorObj;
            break
          };
        };
      };

      set = set || easy_bubble_colors.default;
      if(!easyBubble.classList.contains('tracked')) {

        for (var ii = 0; ii < easyBubble.children.length; ii++) {
          easyBubble.classList.add('tracked')
          var easyBubbleChild = easyBubble.children[ii];
          var clone = easyBubbleChild.cloneNode(true).children
          easyBubbleChild.children[0].remove();
          var div = document.createElement("div");
          easyBubbleChild.appendChild(div);

          if(easyBubbleChild.classList.contains('easy-bubble-event')) {
            var easyBubbleEvent = easyBubbleChild;
            var easyBubbleTrigger = easyBubbleChild.children[0];
            easyBubbleTrigger.classList.add('easy-bubble-trigger');
            easyBubbleTrigger.appendChild(clone[0]);

          } else if(easyBubbleChild.classList.contains('easy-bubble-wrapper')) {
            var easyBubbleWrapper = easyBubbleChild;
            var easyBubbleContainer = easyBubbleChild.children[0];
            easyBubbleContainer.classList.add('easy-bubble-container');
            div = document.createElement("div");
            easyBubbleContainer.appendChild(div);
            var easyBubbleContent = easyBubbleContainer.children[0];
            easyBubbleContent.classList.add('easy-bubble-content');
            easyBubbleContent.appendChild(clone[0]);

            easyBubbleWrapper.style.cssText = 'border-color:' + set.border_color + '!important;'
            easyBubbleContainer.setAttribute('style', 'background-color:' + set.background_color + ';');
            easyBubbleLib.pseudoStyle(easyBubbleWrapper, 'before','border-color', set.border_color);
            easyBubbleLib.pseudoStyle(easyBubbleWrapper ,'after','border-color', set.border_color);
            easyBubbleLib.pseudoStyle(easyBubbleWrapper, 'after','background-color', set.background_color);
            if(easyBubbleWrapper.classList.contains('easy-bubble-shadow')) {
              easyBubbleWrapper.style.cssText += 'box-shadow: 0 0 6px 1px ' + set.shadow_color + ';';
              var bubblePosition;
              for (let i = 0; i < easyBubbleWrapper.classList.length; i++) {
                const bubbleClass = easyBubbleWrapper.classList[i];
                bubblePosition = bubbleClass.split('easy-bubble-pos-');
                if(bubblePosition.length > 1) {
                  bubblePosition = Number(bubblePosition[1]);
                  break;
                }
              }
              
              var boxShadowValue;
              if(bubblePosition >= 1 && bubblePosition <= 3) {
                boxShadowValue = '-2px -2px 4px -1px ';
              } else if(bubblePosition >= 4 && bubblePosition <= 6) {
                boxShadowValue = '2px -2px 4px -1px ';
              } else if(bubblePosition >= 7 && bubblePosition <= 9) {
                boxShadowValue = '2px 2px 4px -1px ';
              } else if(bubblePosition >= 10 && bubblePosition <= 12) {
                boxShadowValue = '-2px 2px 4px -1px ';
              }
              easyBubbleLib.pseudoStyle(easyBubbleWrapper, 'before','box-shadow', boxShadowValue + set.shadow_color + ' !important');
            };
          };
        };

        /** Save reference of some element items to easyBubbleTrigger */
        easyBubbleTrigger.__easyBubble = easyBubble;
        easyBubbleTrigger.__easyBubbleEvent = easyBubbleEvent;
        easyBubbleTrigger.__easyBubbleWrapper = easyBubbleWrapper;

        if(easyBubbleEvent.classList.contains('easy-bubble-click')) {
          easyBubbleTrigger.addEventListener('click', function(event) {
            easyBubbleLib.listener(event, true, easyBubbleLib.generateUniqueNumber(event));
          });
    
          easyBubbleTrigger.addEventListener('mouseleave', function(event) {
            easyBubbleLib.listener(event, false, easyBubbleLib.generateUniqueNumber(event));
          });
          
        } else if(easyBubbleEvent.classList.contains('easy-bubble-hover')) {
          /** Save reference of some element items to easyBubbleWrapper */
          easyBubbleWrapper.__easyBubble = easyBubble;
          easyBubbleWrapper.__easyBubbleEvent = easyBubble;
          easyBubbleWrapper.__easyBubbleWrapper = easyBubbleWrapper;

          easyBubbleWrapper.addEventListener('mouseenter', function(event) {
            easyBubbleLib.listener(event, true, easyBubbleLib.generateUniqueNumber(event));
          });

          easyBubbleWrapper.addEventListener('mouseleave', function(event) {
            easyBubbleLib.listener(event, false, easyBubbleLib.generateUniqueNumber(event));
          });

          easyBubbleTrigger.addEventListener('mouseenter', function(event) {
            easyBubbleLib.listener(event, true, easyBubbleLib.generateUniqueNumber(event));
          });

          easyBubbleTrigger.addEventListener('mouseleave', function(event) {
            easyBubbleLib.listener(event, false, easyBubbleLib.generateUniqueNumber(event));
          });
        }
      }
    }
  },
  listener: function(event, fadeIn, randomNumber) {
    var easyBubbleTarget = event.currentTarget;
    var easyBubble = easyBubbleTarget.__easyBubble;
    var easyBubbleEvent = easyBubbleTarget.__easyBubbleEvent;
    var easyBubbleWrapper = easyBubbleTarget.__easyBubbleWrapper;
    var delay1, delay2, delay3;
    var eventClick = !!easyBubbleEvent.classList.contains('easy-bubble-click');
    easyBubbleTarget.fadeIn = fadeIn;
  
    if(eventClick) {
      delay1 = 0;
      delay2 = 500;
      delay3 = 250;
    } else {
      delay1 = 250;
      delay2 = 750;
      delay3 = 0;
    };
  
    if(easyBubbleTarget.fadeIn) {
      setTimeout(function() {
        if(randomNumber !== easyBubble.__randomNumber) { return };
        easyBubbleWrapper.classList.add('show-bubble');
        setTimeout(function() {
          if(randomNumber !== easyBubble.__randomNumber) { return };
          easyBubbleWrapper.classList.add('pointer-bubble');
        }, 250);
      }, delay1);
      
    } else {
      setTimeout(function() {
        if(randomNumber !== easyBubble.__randomNumber) { return };
        easyBubbleWrapper.classList.remove('show-bubble');
        setTimeout(function() {
          if(randomNumber !== easyBubble.__randomNumber) { return };
          easyBubbleWrapper.classList.remove('pointer-bubble');
        }, delay2);
      }, delay3);
    };
  },
  pseudoStyle: function(element, pseudoElement, prop, value) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var _sheet = document.getElementById("pseudoStyles") || document.createElement('style');
    _sheet.id = "pseudoStyles";
    easyBubbleLib.number++;
    var className = "pseudoStyle" + easyBubbleLib.number;
    
    element.className += " " + className; 
    
    _sheet.innerHTML += " ." + className + ":" + pseudoElement + "{" + prop + ":" + value + "}";
    head.appendChild(_sheet);
    return this;
  },
  generateUniqueNumber: function(event) {
    var randomNumber = Math.random();
    event.currentTarget.__easyBubble.__randomNumber = randomNumber;
    return randomNumber;
  }
};

easyBubbleLib.init();

document.body.addEventListener('DOMSubtreeModified', function () {
  // This Timeout Condition may prevent the last iteration from happenning
  if(!easyBubbleLib.timeout) {
    easyBubbleLib.init();
    easyBubbleLib.timeout = true;
    setTimeout(function() {
      easyBubbleLib.timeout = false
    }, 250);
  };
});