/* Initialization of the UI */
function initGui() {
  PaintApp.elements.canvas = document.getElementById('paint-canvas');
  PaintApp.elements.canvas.style.height = parseInt(window.innerHeight) - 55 + "px" //elements in canvas ht 
  paper.setup(PaintApp.elements.canvas);  //paper setup


  PaintApp.data.tool = new paper.Tool();
  PaintApp.data.tool.distanceThreshold = 0;

  PaintApp.modes.Text.initGui();//A
  PaintApp.modes.Eraser.initGui();//eraser
  PaintApp.modes.Pen.initGui();//pen
  PaintApp.modes.Bucket.initGui();//tilted bucket
  PaintApp.modes.Stamp.initGui();//stamp
  PaintApp.modes.Copy.initGui();// copy up
  PaintApp.modes.Paste.initGui();//paste down

//additions


 PaintApp.modes.Blob.initGui();//Ribbon
 PaintApp.modes.Sketch.initGui();//Sketcher
 PaintApp.modes.AirBrush.initGui();//Air
//end

  PaintApp.palettes.filtersPalette.initGui();//filters
  PaintApp.palettes.drawingsPalette.initGui();//backgrounds
  PaintApp.palettes.colorPalette.initGui();//colorpalette

  PaintApp.buttons.sizeButton.initGui();//round button
  PaintApp.buttons.clearButton.initGui();//clear button - X
  PaintApp.buttons.undoButton.initGui();// back arrow <-
  PaintApp.buttons.redoButton.initGui();//front arrow ->
  //PaintApp.buttons.redoButton.initGui();

  PaintApp.displayUndoRedoButtons(); // function for undo-redo buttons
  PaintApp.elements.penButton.click();
  window.scrollTo(0, -1000)
  PaintApp.switchMode("Pen");
}
