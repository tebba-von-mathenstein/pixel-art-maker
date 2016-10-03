"use strict"

class PixelCanvasProto extends HTMLElement {

  constructor() {
    super();
  }

  attachedCallback() {
    this.constructGrid(25, 25, 20, 'white');
  }

  /**
    This function creates a heigth by width grid of divs and attaches them to the canvas.
    Each div in the returned HTML collection represents a pixel and has
    an event listener attached to set their color to the current this.colorPallet.brushColor.

    @param {integer} height - (optional, default=50) the number of pixels
      tall the canvas will be.
    @param {integer} width - (optional, default=50) the number of pixels
        wide the canvas will be.
    @param {integer} pixelSize - (optional, default = 10) The height and width of
      the individual pixels.
  */
  constructGrid(width = 50, height = 50, pixelSize = 10, initialBackground = 'white') {
    this.width = width;
    this.height = height;
    this.pixelSize = pixelSize;

    // Create the wrapped canvas element, and insert it. Initializing two variables.
    this.canvas;
    this.canvasCtx;
    this._constructHTMLCanvas(initialBackground);
    this.appendChild(this.canvas);
  }

  /**
    Fetch the current canvas state and turn it into a
    JSON string representing the canvas.

    First we turn the data into a 2D array where each
    entry is the color hash of the pixels current
    background color. Then we JSON.stringify that array.

    @return {string} - a string produced by calling JSON.strigify on
      a 2D Array containing color hex values, such as '#ffffff' for white.
  */
  serializeGrid() {
    let grid = [];

    for(let h = 0; h < this.height; h++) {
      let row = [];
      grid[h] = row;

      for(let w = 0; w < this.width; w++) {

          let offset = 2; // Never look where the grid-lines are drawn
          let x = (this.pixelSize * w) + offset;
          let y = (this.pixelSize * h) + offset;

          // TODO: may want to pull this into a function
          let [red, green, blue] = this.canvasCtx.getImageData(x, y, 1, 1).data;
          let color = createRBG(red, green, blue);
          let hex =  rgbToHex(color);

          row[w] = hex;
      }
    }

    return JSON.stringify(grid);
  }

  /**
    Read the string format retured from _serializeCanvas and return
    a set of HTML elements representing the state of the canvas.

    @param {string} serializedInput - a string in the format returned from
      _serializeCanvas();

    @return {HTMLElement} - a set of HTML elements that can be used as the
      innerHTML of the canvas.
  */
  deserializeGrid(serializedInput) {

  }

  /**
    Helper function to the constructor - this function is responsible for
    creating the HTMLCanvas element and intializeing it:
      * setting the proper size,
      * drawing the initial grid,
      * attaching event listeners
  */
  _constructHTMLCanvas(initialBackground) {
    this.canvas = document.createElement('canvas');
    this.canvasCtx = this.canvas.getContext('2d');

    // Set the canvas to the proper size
    this.canvas.width = (this.width * this.pixelSize);
    this.style.width = (this.width * this.pixelSize) + 'px';

    this.canvas.height = (this.height * this.pixelSize);
    this.style.height = (this.height * this.pixelSize) + 'px';

    // Create the wrapped ColorPallet and insert it as a sibling above.
    this.colorPallet = document.createElement('color-pallet');
    this.colorPallet.init(30, this.style.height, this.style.width);
    this.parentNode.insertBefore(this.colorPallet, this);

    // Initially fill the this.canvas with white
    this.canvasCtx.fillStyle = initialBackground;
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the horizontal lines
    for(let i = 0; i <= this.height; i++) {
      let currentHeight = i * this.pixelSize;

      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(0, currentHeight);
      this.canvasCtx.lineTo(this.canvas.width, currentHeight);
      this.canvasCtx.stroke();
    }

    // Draw the vertical lines
    for(let i = 0; i <= this.width; i++) {
      let currentWidth = i * this.pixelSize;

      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(currentWidth, 0);
      this.canvasCtx.lineTo(currentWidth, this.canvas.height);
      this.canvasCtx.stroke();
    }

    this.addEventListener('mousemove', this._mouseMoveEventHandler);
    this.addEventListener('mousedown', this._mouseDownEventHandler);

    // Listen on window but bind this in the event handler to be
    // this PixelCanvas, instead of window. (=> for lexical binding)
    // Capture mouse state for click and drag features
    window.addEventListener('mousedown', () => {
      this.mouseIsDown = true;
    });

    window.addEventListener('mouseup', () => {
      this.mouseIsDown = false;
    });
  }

  /**
    paint the pixel that some MouseEvent is being fired for.

    @param {MouseEvent} mouseEvent - the event being triggered
  */
  _paintAtMousePixel(mouseEvent) {
    // Get the relative position (offset) within the canvas
    let x = mouseEvent.offsetX;
    let y = mouseEvent.offsetY;

    // Determine the top-left of the pixel we are in
    let pixelX = Math.floor(x / this.pixelSize) * this.pixelSize;
    let pixelY = Math.floor(y / this.pixelSize) * this.pixelSize;


    // Fill the square with the this.colorPallet.brushColor
    // TODO: change to something like [currentPixel].triggerMouseEnter
    this.canvasCtx.fillStyle = this.colorPallet.brushColor;
    this.canvasCtx.fillRect(pixelX, pixelY, this.pixelSize, this.pixelSize);
  }

  /**
    Mosemove event master handler, determines which pixel the mouse is
    in trigger it's appropriate behavior.

    @param {Event} The click event.
   */
   _mouseMoveEventHandler(mouseMoveEvent) {
     // Ignore entry if mouse is up
     // TODO: highlight pixels that will be affected maybe?
     if(!this.mouseIsDown) return;

     this._paintAtMousePixel(mouseMoveEvent);
  }

  /**
    MoseClick event master handler, determines which pixel the mouse is
    in trigger it's appropriate behavior.

    @param {Event} The click event.
   */
   _mouseDownEventHandler(mouseClickEvent) {
     this._paintAtMousePixel(mouseClickEvent);
  }
}

const PixelCanvas = document.registerElement('pixel-canvas', PixelCanvasProto);
