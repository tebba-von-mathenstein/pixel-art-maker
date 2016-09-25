"use strict"

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

  for(let i = 0; i < width; i++) {
    for(let j = 0; j < height; j++) {
      let curDiv = document.createElement('div');

      curDiv.className = 'canvas-pixel';
      curDiv.style.height = pxSize + 'px';
      curDiv.style.width = pxSize + 'px';
      curDiv.addEventListener('mouseenter', enterPixelHandler);

      canvas.appendChild(curDiv);
    }
  }

  // Fit the canvas to the pixel size -- not "responsively" because pixel art isn't "responsive".
  canvas.style.width = ((width) * (pxSize+2)) + 'px';
  canvas.style.height = ((height) * (pxSize+2)) + 'px';

  canvas.addEventListener('click', clickCanvasHandler);
}

/**
 * An event handler to set the background color of the target element to the current
 * brushColor.
 */
function clickCanvasHandler(event) {
  // Never color the whole canvas
  if(event.target === event.currentTarget) {
    return;
  }

  setPixelColor(event.target);
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

  setPixelColor(event.target);
}

/**
 * Given an element (hopefully represneting a pixel) set it's color and backgroundColor
 * to the current brushColor
 */
function setPixelColor(pixelElement) {
  pixelElement.style.borderColor = brushColor;
  pixelElement.style.backgroundColor = brushColor;
}
