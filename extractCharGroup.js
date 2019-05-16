/*
 * 	Write a JavaScript function that accepts two arrays, one with strings and one with integer values
 * 	The function should extract a specific number of chars from each string by using the integer values from the second array and return the concatenation of each extracted groups of chars
 * 	if the first array is smaller than the second one it shoul return a json with the Error key and an error message as value
 * 	if the second array is smaller than the first one the last integer number should be used for the strings that does not have a match
 * 	Sample 0: extractCharGroups(["hello", "world", "!"], [1, 2, 3]); returns "hwo!"
 * 	Sample 1: extractCharGroups["hello", "world"], [1, 2, 3]) returns {"Error": "error the first array is smaller than the second one"}
 * 	Sample 2: extractCharGroups["hello", "world", "this", "is", "an", "array"], [1, 2, 3]; returns "hwothiisanarr" //thi + is + an + arr
 */

function extractCharGroups(strings, numbers) {
  if (strings.length < numbers.length)
    return JSON.stringify({
      Error: "error the first array is smaller than the second one"
    });

  let result = "";
  for (let i = 0; i < strings.length; i++) {
    if (i >= numbers.length) {
      result += strings[i].slice(0, numbers[numbers.length - 1]);
    } else {
      result += strings[i].slice(0, numbers[i]);
    }
  }

  return result;
}

console.log(
  extractCharGroups(
    ["abcdefgh", "12345678", "ABCDEFGH", "MNOPQRST", "UVWXYZ"],
    [2, 3, 4]
  )
); // ab123ABCDMNOPUVWX
console.log(
  extractCharGroups(["hello", "world", "this", "is", "an", "array"], [1, 2, 3])
); // hwothiisanarr
console.log(extractCharGroups(["hello", "world"], [1, 2, 3])); // {"Error":"error the first array is smaller than the second one"}
