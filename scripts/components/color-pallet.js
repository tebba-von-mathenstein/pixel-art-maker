"use strict"

class ColorPalletProto extends HTMLElement {

  static get PALLET_CONTAINER_CLASS() {
    return 'pallet-container';
  }

  constructor() {
    super();
  }

  init(palletPxSize = 30, cssWidth) {
    this.pxSize = palletPxSize;

    if(cssWidth) {
      this.style.width = cssWidth;
    }
  }

  /**
    Called when the element gets added to the page - this sets a container
    for all the pallet rows, and the brush square.
  */
  connectedCallback() {
    this.palletContainer = document.createElement('div');
    this.palletContainer.className = ColorPalletProto.PALLET_CONTAINER_CLASS;
    this.palletContainer.style.margin = 'auto';
    this.appendChild(this.palletContainer);

    this.brushSquare = document.createElement('div');
    this.brushSquare.className = 'brush-square';
    this.brushSquare.style.height = this.pxSize + 'px';
    this.brushSquare.style.width = this.pxSize + 'px';
    this.brushSquare.style.backgroundColor = 'white';
    this.brushSquare.style.margin = '5px auto';


    this.appendChild(this.brushSquare);

    this.addPalletRow();
  }

  /**
    Replace all the current color pallets with a new one using the provided colors
  */
  replacePallet(colors) {
    this.palletContainer.innerHTML = '';
    this.addPalletRow(colors);
  }

  /**
    add to the the current color pallets  a new one using the provided colors
  */
  addPalletRow(colors) {
    let newRow = this.buildPallet(colors)
    this.palletContainer.appendChild(newRow);
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
  buildPallet(colors) {
    let newPalletRow = document.createElement('div');
    newPalletRow.style.display = 'flex';
    newPalletRow.style.margin = '5px auto';

    // Default is "rainbow"
    this.colors = colors || ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'black'];
    this.brushColor = this.colors[0];

    // Make a div for each
    for(let i = 0; i < this.colors.length; i++) {
      let curSquare = document.createElement('span');

      curSquare.className = 'pallet-square';
      curSquare.style.height = this.pxSize + 'px';
      curSquare.style.width = this.pxSize + 'px';
      curSquare.style.backgroundColor = this.colors[i];

      // bind to keep 'this' being the color pallet not the individual divs
      curSquare.addEventListener('click', this._setBrushColorHandler.bind(this));
      newPalletRow.appendChild(curSquare);
    }

    let twoThirdsWidth = Math.floor(2 * window.innerWidth / 3);

    // TODO: Several "Magic Numbers" due to css reliance. Fix somehow.
    let palletSquaresWidth = this.colors.length * (this.pxSize+2);
    newPalletRow.style.width = Math.min(twoThirdsWidth, palletSquaresWidth) + 'px';

    return newPalletRow;
  }

  /**
    An event handler to set the current brushColor to the background color of the
    pallet square which was clicked.

    @param {Event} event - an event, typically a click on a pallet square.
   */
  _setBrushColorHandler(event) {
    this.brushColor = event.target.style.backgroundColor;
    this.brushSquare.style.backgroundColor = this.brushColor;
  }
}

const ColorPallet = window.customElements.define('color-pallet', ColorPalletProto);
