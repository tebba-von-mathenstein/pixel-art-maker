"use strict"

// MAIN ENTRY
window.onload = function main() {
  // GLOBAL CUZ YOLO
  window.pxCanvas = document.getElementById('pixel-canvas');

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

    pxCanvas.colorPallet.addPalletRow(newColors, 30);
  }
}
