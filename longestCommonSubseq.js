function longestCommonSubseq(str1, str2, lastIndexStr1, lastIndexStr2) {
  if (lastIndexStr1 === -1 || lastIndexStr2 === -1) return "";

  if (str1[lastIndexStr1] === str2[lastIndexStr2])
    return (
      longestCommonSubseq(str1, str2, lastIndexStr1 - 1, lastIndexStr2 - 1) +
      str1[lastIndexStr1]
    );

  const first = longestCommonSubseq(
    str1,
    str2,
    lastIndexStr1 - 1,
    lastIndexStr2
  );
  const second = longestCommonSubseq(
    str1,
    str2,
    lastIndexStr1,
    lastIndexStr2 - 1
  );

  return max(first, second);
}

const max = (first, second) => {
  if (first && second) return first.length > second.length ? first : second;

  return first ? first : second;
};

console.log(longestCommonSubseq("aabc", "abccd", 3, 4)); // abc
console.log(longestCommonSubseq("abbbccdef", "bccceef", 8, 6)); // bccef
console.log(longestCommonSubseq("aabcdefgh", "abcdefggh", 8, 8)); // abcdefgh
