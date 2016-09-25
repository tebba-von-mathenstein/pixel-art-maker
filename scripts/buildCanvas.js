"use strict"

// TODO: Global variable for this is not ideal, solve this
// probably by making a wrapper class for the Canvas.
let canvasCtx;
let pixelSize;

/**
  This function creates a heigth by width grid of divs and attaches them to the canvas.
  Each div in the returned HTML collection represents a pixel and has
  an event listener attached to set their color to the current brushColor.

  @param {integer} height - (optional, default=100) the number of pixels
    tall the canvas will be.
  @param {integer} width - (optional, default=100) the number of pixels
      wide the canvas will be.
  @param {integer} pxSize - (optional, default = 30) The height and width of
    the individual pixels.
*/
function buildCanvas(height = 100, width = 100, pxSize = 13) {
  let canvas = document.getElementById('canvas');

  if(!canvas.getContext) {
    throw Error("The element with id='canvas' does not seem to be an HTML5 canvas element.");
  }

  // Sets a global, part of a TODO: unglobalize.
  canvasCtx = canvas.getContext('2d');
  pixelSize = pxSize;

  // Set the canvas to the proper size
  canvas.height = (height * pxSize);
  canvas.width = (width * pxSize);

  // Initially fill the canvas with white
  canvasCtx.fillStyle = "white";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the horizontal lines
  for(let i = 0; i <= height; i++) {
    let currentHeight = i * pxSize;

    canvasCtx.beginPath();
    canvasCtx.moveTo(0, currentHeight);
    canvasCtx.lineTo(canvas.width, currentHeight);
    canvasCtx.stroke();
  }

  // Draw the vertical lines
  for(let i = 0; i <= width; i++) {
    let currentWidth = i * pxSize;

    canvasCtx.beginPath();
    canvasCtx.moveTo(currentWidth, 0);
    canvasCtx.lineTo(currentWidth, canvas.height);
    canvasCtx.stroke();
  }

  canvas.addEventListener('mousedown', mouseDownCanvasHandler);
}

/**
 * An event handler to set the background color of the target element to the current
 * brushColor.
 */
function mouseDownCanvasHandler(event) {
  setPixelColor(event);
}

/* *
 * An event handler for when the mouse enters a pixel. If the mouse
 * is currently down color the pixel with the current brush color.
 */
function enterPixelHandler(event) {
  // If the mouse isn't down, we don't color
  // if we're entering the canvas, not the pixel we don't color
  if(!mouseIsDown) {
    return;
  }

  setPixelColor(event);
}

/**
 * Given an element (hopefully represneting a pixel) set it's color and backgroundColor
 * to the current brushColor
 */
function setPixelColor(event) {
  var x;
  var y;
  var startX;
  var startY;

  // Get the relative position (offset) within the canvas
  x = event.offsetX; // column or x-axis
  y = event.offsetY; // row or y-axis

  // Determine the top-left of the pixel we are in
  startX = Math.floor(x / pixelSize) * pixelSize;
  startY = Math.floor(y / pixelSize) * pixelSize;

  // Fill the square with the brushColor
  canvasCtx.fillStyle = brushColor;
  canvasCtx.fillRect(startX, startY, pixelSize, pixelSize);
}
