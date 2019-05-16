function searchKey(obj, searchedKey) {
  if (searchedKey in obj) return obj[searchedKey];

  let object = {};
  for (let key in obj)
    if (typeof obj[key] === "object") object = { ...object, ...obj[key] };

  return JSON.stringify(object).length === 2
    ? null
    : searchKey(object, searchedKey);
}

const obj = {
  key0: 22,
  key1: {
    key9: 9,
    key2: [
      {
        key3: true,
        key4: false
      },
      {
        key5: {
          key11: null,
          key12: 122
        },
        key6: [3, 141]
      }
    ],
    key7: {
      key10: {
        key13: "test"
      }
    }
  },
  key8: undefined
};

console.log("key0:", searchKey(obj, "key0")); // === 22;
console.log("key1:", searchKey(obj, "key1")); // === {key9: 9, key2: Array(2), key7: {…}};
console.log("key8:", searchKey(obj, "key8")); // === undefined;
console.log("key9:", searchKey(obj, "key9")); // === 9;
console.log("key2:", searchKey(obj, "key2")); // === [{…}, {…}];
console.log("key7:", searchKey(obj, "key7")); // === {key10: {…}};
console.log("key3:", searchKey(obj, "key3")); // === true;
console.log("key4:", searchKey(obj, "key4")); // === false;
console.log("key5:", searchKey(obj, "key5")); // === {key11: null, key12: 122};
console.log("key6:", searchKey(obj, "key6")); // === [3, 141];
console.log("key10:", searchKey(obj, "key10")); // === {key13: 'test};
console.log("key11:", searchKey(obj, "key11")); // === null;
console.log("key12:", searchKey(obj, "key12")); // === 122;
console.log("key13:", searchKey(obj, "key13")); // === test;
console.log("key14:", searchKey(obj, "key14")); // === null;
