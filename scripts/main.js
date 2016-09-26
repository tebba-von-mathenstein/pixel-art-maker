"use strict"

// Constants... these are referenced in css files, if you change them beware!
const PALLET_PIXEL_CLASS = 'pallet-pixel';
const CANVAS_PIXEL_CLASS = 'canvas-pixel';

// We track the current state of the mouse globally for drawing purposes
let mouseIsDown = false;

// MAIN ENTRY
window.onload = function main() {

  let colorPallet = document.getElementById('pallet');
  let pxCanvas = document.getElementById('canvas');
  pxCanvas.setColorPallet(colorPallet);

  // TODO: Sharing global mouse down state seems awkward...
  // Capture mouse state for click and drag features
  window.addEventListener('mousedown', function() {
    mouseIsDown = true;
  });

  window.addEventListener('mouseup', function() {
    mouseIsDown = false;
  });

  // Bind the generate gradient event
  document.getElementById('generate-gradient-button').addEventListener('click', handleGradientGeneration);

  /**
    TODO: Find a proper OOP place for this.

    When called this method replaces the current pallet
    with a gradient between the two gradient color inputs.

    Currently this is bound to an event listener on click for the
    gradient button.
  */
  function handleGradientGeneration() {
    let startColorHex = document.getElementById('gradient-start-pixel').value;
    let endColorHex = document.getElementById('gradient-end-pixel').value;

    var newColors = createGradient(startColorHex, endColorHex);

    // colorPallet is closed over in this context.
    colorPallet.buildPallet(newColors, 30);
  }
}
