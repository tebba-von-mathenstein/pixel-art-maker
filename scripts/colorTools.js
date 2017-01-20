"use strict"

function createRBG(red, green, blue) {
  return {
    red: red,
    green: green,
    blue: blue
  };
}

/**
  Given a color hex string (such as '#ffffff' for white) return an object
  with 3 properties (red, green, blue) all assigned to their integer
  saturation value (0-255). Does not support RGBA, only RGB.

  @param {string} hex - a color hex string, such as '#ffffff' for white.
  @return {Object} - an object with 3 properties: red, green, and blue which
    map to their integer saturation values (0-255)
*/
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if(result) {
      return {
          red: parseInt(result[1], 16),
          green: parseInt(result[2], 16),
          blue: parseInt(result[3], 16)
      }
    }

    return null;
}

/**
  Given a saturation value for an RGB value (integer between 0-255),
  return the hex value for that component. For example 255 returns 'ff'
  and 0 returns '00'.

  @param {integer} c - an integer between 0-255
  @return {string} - the 2 digit hexidecimal representation of c
*/
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

/**
  Given an rgbObject of the format returned from hexToRgb return a
  string represneting the complete rgb color hex, such as '#ffffff'.

  @param {Object} rgbObject - an object with 3 properties: red, green, and blue
    all mapped to integer values between 0-255.

  @return {string} - a color hex string, such as '#ffffff'
*/
function rgbToHex(rgbObject) {
    let r = rgbObject.red;
    let g = rgbObject.green;
    let b = rgbObject.blue;
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
  Given two color hexes and an optional number of buckets return an array
  represneting a smooth gradient between the two colors. Each item in the
  returned array is a color hex.

  @param {string} startColorHex - a color hex value where the gradient starts
  @param {string} endColorHex - a color hex value where the gradient ends
  @param {integer} buckets - (optional, default 10) the number of buckets in
    the gradient.

  @return {Array} - an array with length === buckets
*/
function createGradient(startColorHex, endColorHex, buckets = 10) {
  let startColorRGB = hexToRgb(startColorHex);
  let endColorRGB = hexToRgb(endColorHex);

  let redStepSize = (endColorRGB.red - startColorRGB.red) / buckets;
  let greenStepSize = (endColorRGB.green - startColorRGB.green) / buckets;
  let blueStepSize = (endColorRGB.blue - startColorRGB.blue) / buckets;

  let gradient = [];
  for(let i = 0; i < buckets; i++) {
    let currentRGB = {
      red: Math.floor(startColorRGB.red + (i * redStepSize)),
      green: Math.floor(startColorRGB.green + (i * greenStepSize)),
      blue: Math.floor(startColorRGB.blue + (i * blueStepSize))
    }

    let currentHex = rgbToHex(currentRGB);
    gradient.push(currentHex);
  }

  return gradient;
}
