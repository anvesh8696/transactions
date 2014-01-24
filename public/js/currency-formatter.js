var moneyFormatter = {
  format: function(value) {
    var digits = value.toString().split(''),
        number = digits.slice(0, -2).join(''),
        precision = digits.slice(-2).join('');

    // fix minimum spots
    number = number.length ? number : '0';
    precision = precision.length === 1 ? '0' + precision : precision;

    return '$' + number + '.' + precision;
  }
};

// Tests
function assert(truthiness) {
  if (!truthiness) {
    throw new Error('fail!');
  }
}

console.log(moneyFormatter.format(0))

// Test 1
assert(moneyFormatter.format(0) === '$0.00');
assert(moneyFormatter.format(1) === '$0.01');
assert(moneyFormatter.format(10) === '$0.10');

console.log('success!');
