// 1) The at() method takes an integer value and returns the item at the index
const array1 = ['a', 'b', 'c', 'd', 'e'];
console.log('array1: ', array1.at(0)) // a

/*----------------------------*/

// The concat() method is used to merge two or more array (returns a NEW array)
const array2 = ['1', '2', '3', '4', '5'];
const array3 = array1.concat(array2)
console.log('array2: ', array3) //  (10) ['a', 'b', 'c', 'd', 'e', '1', '2', '3', '4', '5']

/*----------------------------*/

// The copywithin() method shallow copies part of an array to another location in the same array
// and returns it without modifying its length
console.log('array3: ', array3.copyWithin(0, 5, 11)) // (10) ['1', '2', '3', '4', '5', '1', '2', '3', '4', '5']

/*----------------------------*/

//The entries() method returns a new Array Iterator object 
//that contains the key/value pairs for each index in the array.
const array4 = [1, 2, 3, 4, 5]
const iterator = array4.entries()
console.log(iterator.next().value) // (2) [0, 1]
for (const pair of iterator) {
    console.log('key:', pair.at(0), '-', 'value:', pair.at(1)) // key: 1 - value: 2 key: 2 - value: 3 ...
}

/*----------------------------*/

//The filter() method creates a shallow copy of a portion of a given array, filtered down 
//to just the elements from the given array that pass the test implemented by the provided function.
const array5 = ['jhon brown', 'martha brown', 'jhon brown']
const result = array5.filter(name => name === 'jhon brown')
console.log('array5: ', result) // (2) ['jhon brown', 'jhon brown']

/*----------------------------*/

//he find() method returns the first element in the provided array that satisfies the provided 
//testing function
const array6 = array5.find(name => name === 'jhon brown')
console.log('array6: ', array6)

/*----------------------------*/

//The flat() method creates a new array with all sub-array elements concatenated into it 
//recursively up to the specified depth.
const array7 = [['name', 'Arthur'], ['name', 'João']]
const arrayFlat = array7.flat()
console.log('array7: ', arrayFlat)

/*----------------------------*/

//The forEach() method executes a provided function once for each array element.
const array8 = [1, 2, 3]
array8.forEach(number => console.log(number * 10)) // 10 20 30

//The map() method creates a new array populated with the results of calling a provided 
//function on every element in the calling array.
const array9 = array8.reverse()
array9.map(number => console.log(number * 10)) // 30 20 10