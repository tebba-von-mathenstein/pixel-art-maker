"use strict"

class ColorPalletProto extends HTMLElement {

  constructor() {
    super();
  }

  attachedCallback() {
    this.buildPallet();
  }

  /**
    Builds the color pallet out of an array of input colors. Each item in the pallet
    is a div, and has an event listener which sets the brush color on click.

    @param {Array} colors - (optional) an array of hex strings do be used as
      the pallet colors. If undefined colors will default to "The Rainbow" plus
      white and black.
    @param {integer} pxSize - (optional, default = 30) The height and width of
      the pallet square.
  */
  buildPallet(colors, pxSize = 30) {
    // Rebuild if need be
    this.innerHTML = '';

    // Default is "rainbow"
    this.colors = colors || ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'black'];
    this.brushColor = this.colors[0];
    this.brushDiv;

    // Make a div for each
    for(let i = 0; i < this.colors.length + 1; i++) {
      let curDiv = document.createElement('div');

      curDiv.style.height = pxSize + 'px';
      curDiv.style.width = pxSize + 'px';
      curDiv.style.backgroundColor = this.colors[i];

      // Final pass, do the brush instead of a pallet square
      let isFinalPass = i === this.colors.length;
      if(isFinalPass) {
        curDiv.className = 'brush-square';
        curDiv.style.backgroundColor = this.brushColor;

        this.brushDiv = curDiv;
      }
      else {
        curDiv.className = 'pallet-square';

        // bind to keep 'this' being the color pallet not the individual divs
        curDiv.addEventListener('click', this._setBrushColorHandler.bind(this));
      }

      this.appendChild(curDiv);
    }

    let twoThirdsWidth = Math.floor(2 * window.innerWidth / 3);

    // TODO: Several "Magic Numbers" due to css reliance. Fix somehow.
    let brushSquareWidth = pxSize + 11;
    let palletSquaresWidth = this.colors.length * (pxSize+2);
    this.style.width = Math.min(twoThirdsWidth,  brushSquareWidth + palletSquaresWidth) + 'px';
  }

  /**
    An event handler to set the current brushColor to the background color of the
    pallet square which was clicked.

    @param {Event} event - an event, typically a click on a pallet square.
   */
  _setBrushColorHandler(event) {
    this.brushColor = event.target.style.backgroundColor;
    this.brushDiv.style.backgroundColor = this.brushColor;
  }
}

const ColorPallet = document.registerElement('color-pallet', ColorPalletProto);
