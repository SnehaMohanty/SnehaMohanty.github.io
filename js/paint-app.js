define([], function() { // general definition of the paintApp

  /* Function to disable all active class inside the toolbar */
  function paletteRemoveActiveClass() {
    for (var i = 0; i < PaintApp.paletteModesButtons.length; i++) {
      PaintApp.paletteModesButtons[i].className = PaintApp.paletteModesButtons[i].className.replace(/(?:^|\s)active(?!\S)/g, '');
    }
  }

  /* Function to add active class to a specific element */
  function addActiveClassToElement(element) {
    element.className += " active";
  }

  /* Switch current drawing mode */
  function switchMode(newMode) {
    saveCanvas();
    PaintApp.handleCurrentFloatingElement();
    PaintApp.data.tool.onMouseDown = PaintApp.modes[newMode].onMouseDown; //mode new mousedown
    PaintApp.data.tool.onMouseDrag = PaintApp.modes[newMode].onMouseDrag; //mode new mousedrag
    PaintApp.data.tool.onMouseUp = PaintApp.modes[newMode].onMouseUp; //mouse new mouseup
  }

  function clearCanvas() {
    var ctx = PaintApp.elements.canvas.getContext("2d");
    ctx.clearRect(0, 0, PaintApp.elements.canvas.width, PaintApp.elements.canvas.height);
    PaintApp.saveCanvas(); //paintApp canvas save 
  }

  function undoCanvas() {
    PaintApp.handleCurrentFloatingElement();
    if (PaintApp.data.history.undo.length < 2) { // undo length <= 1 , then don't undo
      return;
    }

    PaintApp.modes.Pen.point = undefined;
    var canvas = PaintApp.elements.canvas;
    var ctx = canvas.getContext('2d');
    var img = new Image;
    var imgSrc = PaintApp.data.history.undo[PaintApp.data.history.undo.length - 2]
    var imgSrc2 = PaintApp.data.history.undo[PaintApp.data.history.undo.length - 1]

    img.onload = function() {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);//scale hor, skew hor, skew vert , scale vert , move hor, move vert
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0); //Img, x, y
      ctx.restore();//restores the top state of the stack, restoring the context to that state
    };

    img.src = imgSrc; 
    PaintApp.data.history.redo.push(imgSrc2);//push img src2
    PaintApp.data.history.undo.pop()// pop the previous stuff

    displayUndoRedoButtons();
  }

  function redoCanvas() {
    handleCurrentFloatingElement();

    if (PaintApp.data.history.redo.length == 0) { //if redo length = 0, no need for redoing, as stack empty
      return;
    }
//canvas is defined here
    PaintApp.modes.Pen.point = undefined;
    var canvas = PaintApp.elements.canvas; //canvas is def here
    var ctx = canvas.getContext('2d');
    var img = new Image;
    var imgSrc = PaintApp.data.history.redo[PaintApp.data.history.redo.length - 1]

    img.onload = function() {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0); //start at 0,0, draw image
      ctx.restore();
    };

    img.src = imgSrc;
    PaintApp.data.history.undo.push(imgSrc);
    PaintApp.data.history.redo.pop()
    displayUndoRedoButtons(); //display undo-redo
  }

  function displayUndoRedoButtons() {
    if (PaintApp.data.history.redo.length == 0) {
      PaintApp.elements.redoButton.style.opacity = "0.4" //redo -> no action, so opacity 0.4
    } else {
      PaintApp.elements.redoButton.style.opacity = "1"
    }

    if (PaintApp.data.history.undo.length <= 1) {
      PaintApp.elements.undoButton.style.opacity = "0.4" //-> nothing to undo 
    } else {
      PaintApp.elements.undoButton.style.opacity = "1"
    }
  }

  function saveCanvas() {    // SAVE CANVAS FUNCTION
    var canvas = PaintApp.elements.canvas;
    var image = canvas.toDataURL();

    if (PaintApp.data.history.undo.length > 0 && PaintApp.data.history.undo[PaintApp.data.history.undo.length - 1] !== image) {
      PaintApp.data.history.undo.push(image);
      PaintApp.data.history.redo = []
    } else if (PaintApp.data.history.undo.length == 0) {
      PaintApp.data.history.undo.push(image);
      PaintApp.data.history.redo = []
    }

    if (PaintApp.data.history.redo.length > PaintApp.data.history.limit) {
      PaintApp.data.history.redo = PaintApp.data.history.redo.slice(1)
    }

    if (PaintApp.data.history.undo.length > PaintApp.data.history.limit) {
      PaintApp.data.history.undo = PaintApp.data.history.undo.slice(1)
    }
    displayUndoRedoButtons()
  }

  function handleCurrentFloatingElement() {
    if (PaintApp.data.currentElement !== undefined) {
      PaintApp.data.currentElement.element.parentElement.removeChild(PaintApp.data.currentElement.element);
      PaintApp.data.currentElement = undefined;
    }
  }

  /* PaintApp, contains the context of the application */
  var PaintApp = {
    libs: {},
    palettes: {},
    elements: {},
    buttons: {},
    paletteModesButtons: [],

    data: {
      history: {
        limit: 15,
        undo: [],
        redo: []
      },
      size: 5,
      color: {
        stroke: "#1500A7",
        fill: "#ff0000"
      },
      tool: undefined
    },
    modes: {},
    switchMode: switchMode,
    undoCanvas: undoCanvas,
    redoCanvas: redoCanvas,
    displayUndoRedoButtons: displayUndoRedoButtons,
    saveCanvas: saveCanvas,
    clearCanvas: clearCanvas,
    paletteRemoveActiveClass: paletteRemoveActiveClass,
    addActiveClassToElement: addActiveClassToElement,
    handleCurrentFloatingElement: handleCurrentFloatingElement
  };

  return PaintApp;
});
