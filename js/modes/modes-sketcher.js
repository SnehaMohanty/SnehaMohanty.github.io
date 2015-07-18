define([], function() {

  function initGui() {
    PaintApp.elements.sketchButton = document.getElementById('sketch-button');
    PaintApp.paletteModesButtons.push(PaintApp.elements.sketchButton)
    PaintApp.elements.sketchButton.addEventListener("click", function() {
      PaintApp.paletteRemoveActiveClass();
      PaintApp.addActiveClassToElement(PaintApp.elements.sketchButton);
      PaintApp.switchMode("Sketch");
    });
  }


var points = [ ];

  var Sketch = {
    initGui: initGui,
    point: undefined,
    onMouseDown: function(event) {
     PaintApp.modes.Sketch.point = event.point;  
      var ctx = PaintApp.elements.canvas.getContext("2d");
	
      ctx.strokeStyle = PaintApp.data.color.stroke;
      ctx.lineCap = 'round';
      ctx.lineWidth = PaintApp.data.size/2;


 ctx.lineWidth = 1;
 ctx.contextAlpha = 0.4;
    

 points.push({ x: event.point.x, y: event.point.y });

ctx.moveTo(event.point.x + 1, event.point.y + 1);
      ctx.lineTo(event.point.x, event.point.y);
     ctx.stroke();


    },
    onMouseDrag: function(event) {
      if (!PaintApp.modes.Sketch.point) {
        return;
      }
      var ctx = PaintApp.elements.canvas.getContext("2d");
	 ctx.contextAlpha = 0.4;
 points.push({ x: event.point.x, y: event.point.y });


  ctx.beginPath();
  ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.contextAlpha = 0.4;
  ctx.stroke();
  
  for (var i = 0, len = points.length; i < len; i++) {
    dx = points[i].x - points[points.length-1].x;
    dy = points[i].y - points[points.length-1].y;
    d = dx * dx + dy * dy;

    if (d < 1000) {
      ctx.beginPath();
      ctx.strokeStyle = PaintApp.data.color.stroke;
	 ctx.contextAlpha = 0.4;
      ctx.moveTo( points[points.length-1].x + (dx * 0.2), points[points.length-1].y + (dy * 0.2));
      ctx.lineTo( points[i].x - (dx * 0.2), points[i].y - (dy * 0.2));
      ctx.stroke();
    }
	ctx.stroke();
}
      PaintApp.modes.Sketch.point = event.point;
      
    },
    onMouseUp: function(event) {
      PaintApp.saveCanvas();
    }
  }

  return Sketch;
})
