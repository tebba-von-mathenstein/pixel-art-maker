/**
  Fetch the elements within the canvas then, using _serializeCanvas,
  create a string represneting that data. Store the resulting string
  at localStorage.set(storageName).

   @param {string} storageName - a key for a value in localStorage
    used to store the data.
*/
window.saveCanvas = function saveCurrentCanvas(storageName) {
  localStorage.setItem(storageName, window.pxCanvas.serializeGrid());
}


/**
  Using _deserializeCanvas, read the string from localStorage.get(storageName).
  If it represents data created by _serializeCanvas then deserialize it and set
  the resulting HTMLElements as the innerHTML of the canvas.

  @param {string} storageName - a key for a value in localStorage used to fetch
    the data.
*/
window.restoreCanvas = function restoreCanvas(storageName) {

}
