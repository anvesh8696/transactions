var moneyFormatter = {
  format: function(value) {
    var digits = value.toString().split(''),
        number = digits.slice(0, -2).join(''),
        precision = digits.slice(-2).join('');

    // fix minimum spots
    number = number.length ? number : '0';
    precision = precision.length === 1 ? '0' + precision : precision;

    // add commas for thousands
    // kind of black magic
    number = number.split('').reverse().join('') // reverse string
             .replace(/(\d{3})(?=\d)/g, "$1,")   // add the commas
             .split('').reverse().join('');      // reverse it back

    return '$' + number + '.' + precision;
  }
};

// Tests
function assert(truthiness) {
  if (!truthiness) {
    throw new Error('fail!');
  }
}

console.log(moneyFormatter.format(100000))

// Test 1
assert(moneyFormatter.format(0) === '$0.00');
assert(moneyFormatter.format(1) === '$0.01');
assert(moneyFormatter.format(10) === '$0.10');
assert(moneyFormatter.format(100000) === '$1,000.00');

console.log('success!');
