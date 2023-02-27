module.exports = function check(str, bracketsConfig) {
  const stack = [];
  for (let char of str) {
    const last = stack.at(-1);
    if (isClosing(char, bracketsConfig) && canClose(last, char, bracketsConfig)) {
      stack.pop();
    } else if (isOpening(char, bracketsConfig)) {
      stack.push(char);
    } else {
      return false;
    }
  }
  return stack.length === 0;
}

function isClosing(char, config) {
  for (const pair of config) {
    if (pair[1] === char) {
      return true;
    }
  }
  return false;
}

function isOpening(char, config) {
  for (const pair of config) {
    if (pair[0] === char) {
      return true;
    }
  }
  return false;
}

function canClose(opening, closing, config) {
  for (const pair of config) {
    if (pair[0] === opening) {
      return pair[1] === closing;
    }
  }
  return false;
}
