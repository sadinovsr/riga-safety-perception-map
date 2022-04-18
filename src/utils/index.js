import { isEmpty } from "lodash";

// get color hue by value (0 = red, 100 = green, <0 = black)
export const getColor = (value, lightness) => {
  if (value < 0) return 'hsl(0,100%,0%)';
  var hue = (value * 120).toString(10);
  return [`hsl(`, hue, `,100%,${lightness}%)`].join('');
};

// https://stackoverflow.com/a/41199487
export const average = (array) => {
  if (isEmpty(array)) return -1;
  return array.reduce((a, b) => a + b) / array.length;
}
