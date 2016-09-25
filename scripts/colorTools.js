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

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgbObject) {
    let r = rgbObject.red;
    let g = rgbObject.green;
    let b = rgbObject.blue;
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function createGradient(buckets = 10) {
  // Fetch the starting and ending colors
  let startColorHex = document.getElementById('gradient-start-pixel').value;
  let endColorHex = document.getElementById('gradient-end-pixel').value;

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

    gradient.push(currentRGB);
  }

  gradient = gradient.map(function(rgbObject) {
    return rgbToHex(rgbObject);
  });

  return gradient;
}
