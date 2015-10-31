var h = document.getElementById("menu");
var stuck = false;
var stickPoint = getDistance();

function getDistance() {
  var topDist = h.offsetTop;
  return topDist;
}

window.onscroll = function(e) {
  var distance = getDistance() - window.pageYOffset;
  var offset = window.pageYOffset;
  if ( (distance <= 0) && !stuck) {
    h.style.position = 'fixed';
    h.style.top = '0px';
    h.style.opacity = "1";
    stuck = true;
  } else if (stuck && (offset <= stickPoint)){
    h.style.position = 'static';
    h.style.opacity = "0";
    stuck = false;
  }
};
