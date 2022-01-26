// Class declaration
// class Calculator {
//   add(a, b) {
//     return a + b;
//   }

//   multiply(a, b) {
//     return a * b;
//   }

//   devide(a, b) {
//     return a / b;
//   }
// }

// module.exports = Calculator;

module.exports = class {
  add(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }

  devide(a, b) {
    return a / b;
  }
};
