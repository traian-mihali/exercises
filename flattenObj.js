function flattenObj(obj, flatten = {}) {
  flatten = flatten || {};

  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null)
      flattenObj(obj[key], flatten);
    else flatten[key] = obj[key];
  }

  return flatten;
}
