// 1
let num = 10;
let resOne = num++;
// console.log(resOne);
let resTwo = ++num;
// console.log(resTwo);

// 2

// global
let x = 4;
function addONe() {
  //  function scope
  let x = 2;

  //   console.log(x + 1);
}
if (true) {
  //  block
  let x = 10;
  //   console.log(x);
}
// console.log(x);
addONe();

// 3

setTimeout(() => {
  //   console.log("after 2");
}, 2000);

// 4
function sum(x, y, callBack) {
  callBack(x, y);
}

function add(num1, num2) {
  //   console.log(num1 + num2);
}

sum(3, 4, add);

// 5

const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve("fullfilled");
  } else {
    reject("rejected");
  }
});
// promise.then((res) => console.log(res)).catch((err) => console.log(err));

// 6

// console.log("first");
// setTimeout(() => {
//   console.log("second");
// }, 0);
// console.log("third");

// 7

function calculate(a, b, operation) {
  return operation(a, b);
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) {
    return "cannot divide by zero";
  }
  return a / b;
};

console.log(calculate(10, 5, add));      
console.log(calculate(10, 5, subtract)); 
console.log(calculate(10, 5, multiply)); 
console.log(calculate(10, 5, divide));   
console.log(calculate(10, 0, divide));  