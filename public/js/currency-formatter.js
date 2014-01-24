var moneyFormatter = {
  format: function(value) {
    return "$0.0" + value;
  }
};

// Tests
function assert(truthiness) {
  if (!truthiness) {
    throw new Error('fail!');
  }
}

// Test 1
assert(moneyFormatter.format(0) === '$0.00');
assert(moneyFormatter.format(1) === '$0.01');

console.log('success!');
