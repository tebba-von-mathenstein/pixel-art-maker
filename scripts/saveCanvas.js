/**
  Fetch the elements within the canvas then, using _serializeCanvas,
  create a string represneting that data. Store the resulting string
  at localStorage.set(storageName).

   @param {string} storageName - a key for a value in localStorage
    used to store the data.
*/
function saveCurrentCanvas(storageName) {

}


/**
  Using _deserializeCanvas, read the string from localStorage.get(storageName).
  If it represents data created by _serializeCanvas then deserialize it and set
  the resulting HTMLElements as the innerHTML of the canvas.

  @param {string} storageName - a key for a value in localStorage used to fetch
    the data.
*/
function restoreCanvas(storageName) {

}

/**
  Fetch the current canvas state and turn it into a
  JSON string representing the canvas.

  First we turn the data into a 2D array where each
  entry is the color hash of the pixels current
  background color. Then we JSON.stringify that array.

  @return {string} - a string produced by calling JSON.strigify on
    a 2D Array containing color hex values, such as '#ffffff' for white.
*/
function _serializeCanvas() {

}

/**
  Read the string format retured from _serializeCanvas and return
  a set of HTML elements representing the state of the canvas.

  @param {string} serializedInput - a string in the format returned from
    _serializeCanvas();

  @return {HTMLElement} - a set of HTML elements that can be used as the
    innerHTML of the canvas.
*/
function _deserializeCanvas(serializedInput) {

}
