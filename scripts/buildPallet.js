"use strict"

// TODO: globl brush color is not ideal, consider storing the brush color
// on a div on the screen instead
let brushColor = 'white';

/**
  Builds the color pallet out of an array of input colors. Each item in the pallet
  is a div, and has an event listener which sets the brush color on click.

  @param {Array} colors - (optional) an array of hex strings do be used as
    the pallet colors. If undefined colors will default to "The Rainbow" plus
    white and black.
  @param {integer} pxSize - (optional, default = 30) The height and width of
    the pallet square.
 */
function buildPallet(colors, pxSize = 30) {
  let pallet = document.getElementById('pallet');
  pallet.innerHTML = '';

  if(colors === undefined) {
    colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'black'];
  }

  for(let i = 0; i < colors.length; i++) {
    let curDiv = document.createElement('div');

    curDiv.className = 'pallet-pixel';
    curDiv.style.height = pxSize + 'px';
    curDiv.style.width = pxSize + 'px';
    curDiv.style.backgroundColor = colors[i];
    curDiv.addEventListener('click', setBrushColorHandler);

    pallet.appendChild(curDiv);
  }

  let twoThirdsWidth = Math.floor(2 * window.innerWidth / 3);
  pallet.style.width = Math.min(twoThirdsWidth, colors.length * (pxSize+2)) + 'px';
}


/**
  An event handler to set the current brushColor to the background color of the
  pallet square which was clicked.

  @param {Event} event - an event, typically a click on a pallet square.
 */
function setBrushColorHandler(event) {
  brushColor = event.target.style.backgroundColor;
}

/**
  When called this method replaces the current pallet
  with a gradient between the two gradient color inputs.

  Currently this is bound to an event listener on click for the
  gradient button.
*/
function handleGradientGeneration() {
  let startColorHex = document.getElementById('gradient-start-pixel').value;
  let endColorHex = document.getElementById('gradient-end-pixel').value;

  var newColors = createGradient(startColorHex, endColorHex);
  buildPallet(newColors, 30);
}
