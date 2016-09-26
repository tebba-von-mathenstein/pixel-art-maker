"use strict"

class PixelCanvasProto extends HTMLElement {

  constructor() {
    super();
  }

  /**
    This function creates a heigth by width grid of divs and attaches them to the canvas.
    Each div in the returned HTML collection represents a pixel and has
    an event listener attached to set their color to the current brushColor.

    @param {integer} height - (optional, default=100) the number of pixels
      tall the canvas will be.
    @param {integer} width - (optional, default=100) the number of pixels
        wide the canvas will be.
    @param {integer} pixelSize - (optional, default = 30) The height and width of
      the individual pixels.
  */
  attachedCallback(width = 100, height = 100, pixelSize = 10, initialBackground = 'white') {
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
    this.canvas.height = (this.height * this.pixelSize);

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
  }

  /**
    Mosemove event master handler, determines which pixel the mouse is
    in trigger it's appropriate behavior.

    @param {Event} The click event.
   */
   _mouseMoveEventHandler(mouseMoveEvent) {
     // Ignore entry if mouse is up
     // TODO: highlight pixels that will be affected maybe?
     if(!mouseIsDown) return;

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


    // Fill the square with the brushColor
    // TODO: change to something like [currentPixel].triggerMouseEnter
    this.canvasCtx.fillStyle = brushColor;
    this.canvasCtx.fillRect(pixelX, pixelY, this.pixelSize, this.pixelSize);
  }
}

const PixelCanvas = document.registerElement('pixel-canvas', PixelCanvasProto);
