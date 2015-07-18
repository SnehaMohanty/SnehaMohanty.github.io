define([], function() {

  function initGui() {
    PaintApp.elements.airButton = document.getElementById('air-button');
    PaintApp.paletteModesButtons.push(PaintApp.elements.airButton)
    PaintApp.elements.airButton.addEventListener("click", function() {
      PaintApp.paletteRemoveActiveClass();
      PaintApp.addActiveClassToElement(PaintApp.elements.airButton);
      PaintApp.switchMode("AirBrush");
    });
  }

var clientX, clientY, timeout;
var density = 50;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

  var AirBrush = {
    initGui: initGui,
    point: undefined,
    onMouseDown: function(event) {
      PaintApp.modes.AirBrush.point = event.point;
      var ctx = PaintApp.elements.canvas.getContext("2d");
	clientX = event.point.x;
  	clientY = event.point.y;
	ctx.lineJoin = ctx.lineCap = 'round';
    
      ctx.fillStyle = PaintApp.data.color.fill;
   
  	timeout = setTimeout(function draw() {
    for (var i = density; i--; ) {
      var radius = 30;
      var offsetX = getRandomInt(-radius, radius);
      var offsetY = getRandomInt(-radius, radius);
      ctx.fillRect(clientX + offsetX, clientY + offsetY, PaintApp.data.size/6, PaintApp.data.size/6);
    }
    if (!timeout) return;
    timeout = setTimeout(draw, 50);
  }, 50);

    },
    onMouseDrag: function(event) {
      if (!PaintApp.modes.AirBrush.point) {
        return;
      }
      var ctx = PaintApp.elements.canvas.getContext("2d");

	 clientX = event.point.x;
  clientY = event.point.y;
    
      PaintApp.modes.AirBrush.point = event.point;
    },
    onMouseUp: function(event) {
      PaintApp.saveCanvas();
	  clearTimeout(timeout);
    }
  }

  return AirBrush;
})

