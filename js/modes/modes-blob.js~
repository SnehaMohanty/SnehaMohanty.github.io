define([], function() {

  function initGui() {
    PaintApp.elements.blobButton = document.getElementById('blob-button');
    PaintApp.paletteModesButtons.push(PaintApp.elements.blobButton)
    PaintApp.elements.blobButton.addEventListener("click", function() {
      PaintApp.paletteRemoveActiveClass();
      PaintApp.addActiveClassToElement(PaintApp.elements.blobButton);
      PaintApp.switchMode("Blob");
    });
  }

 
	function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function midPointBtw(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  };
}

var points = [ ];

  var Blob = {
    initGui: initGui,
    point: undefined,
    onMouseDown: function(event) {
   
  PaintApp.modes.Blob.point = event.point; 
      var ctx = PaintApp.elements.canvas.getContext("2d");
	
      ctx.strokeStyle = PaintApp.data.color.stroke;
      ctx.lineCap = 'round';
  

 ctx.lineWidth = 1;
  
 points.push({ x: event.point.x, y: event.point.y });

ctx.moveTo(event.point.x + 1, event.point.y + 1);
      ctx.lineTo(event.point.x, event.point.y);
     ctx.stroke();



    },
    onMouseDrag: function(event) {
      if (!PaintApp.modes.Blob.point) {
        return;
      }

  var ctx = PaintApp.elements.canvas.getContext("2d");
    
 points.push({ x: event.point.x, y: event.point.y });
  stroke(offsetPoints(-4*PaintApp.data.size/4));
  stroke(offsetPoints(-2*PaintApp.data.size/4));
  stroke(points);
  stroke(offsetPoints(2*PaintApp.data.size/4));
  stroke(offsetPoints(4*PaintApp.data.size/4));
 ctx.stroke();
      PaintApp.modes.Blob.point = event.point;


    },
    onMouseUp: function(event) {
      PaintApp.saveCanvas();
	  points.length = 0;
    }
  }



function offsetPoints(val) {
  var offsetPoints = [ ];
  for (var i = 0; i < points.length; i++) {
    offsetPoints.push({ 
      x: points[i].x + val,
      y: points[i].y + val
    });
  }
  return offsetPoints;
}


function stroke(points) {

 var ctx = PaintApp.elements.canvas.getContext("2d");
  var p1 = points[0];
  var p2 = points[1];
  
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);

  for (var i = 1, len = points.length; i < len; i++) {
    // we pick the point between pi+1 & pi+2 as the
    // end point and p1 as our control point
    var midPoint = midPointBtw(p1, p2);
    ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
    p1 = points[i];
    p2 = points[i+1];
  }
  // Draw last line as a straight line while
  // we wait for the next point to be able to calculate
  // the bezier control point
  ctx.lineTo(p1.x, p1.y);
  ctx.stroke();
}


  return Blob;
})
