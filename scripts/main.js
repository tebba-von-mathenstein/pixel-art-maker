"use strict"

// Constants... these are referenced in css files, if you change them beware!
const PALLET_PIXEL_CLASS = 'pallet-pixel';
const CANVAS_PIXEL_CLASS = 'canvas-pixel';

// We track the current state of the mouse globally for drawing purposes
let mouseIsDown = false;

// MAIN ENTRY
window.onload = function main() {
  buildPallet(undefined, 30);

  // Capture mouse state for click and drag features
  window.addEventListener('mousedown', function() {
    mouseIsDown = true;
  });

  window.addEventListener('mouseup', function() {
    mouseIsDown = false;
  });

  // Bind the generate gradient event
  document.getElementById('generate-gradient-button').addEventListener('click', handleGradientGeneration);
}
