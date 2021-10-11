import { math } from "./js/math";
const { countPrice } = require('./js/format')

import './js/element'

console.log(math(3, 2))
console.log(countPrice())

const arr = [1, 2, 3]

arr.forEach(item => console.log(item));


// babel转换 
// npx babel .\demo.js --out-file build.js --plugins=@babel/plugin-transform-arrow-functions
