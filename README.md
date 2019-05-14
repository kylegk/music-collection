# music-collection
An interface for managing a music collection. 

This music collection library interface is based on the following request:
<https://gist.github.com/jgoulah/fc742e8512ff730a86d262c25bbf549b>

## Getting Started

1. Download or clone the project
2. Execute the following command: `./music`

## **Unit Tests**

There are two different sets of unit tests located in **/test**. These tests execute the same functionality, but one is a handrolled suite, and the other relies on [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).

### **music_collection_tests (*author created solution*)**

To execute the test suite, you can do either of the following:

#### npm or yarn
> npm test

> yarn test

#### start the tests manually

> cd test/

> ./music_collection_tests



### **Mocha test suite**

To execute the mocha test suite, you will first need to download the required node modules included in `package.json` using either `yarn` or `npm`.

#### yarn
> yarn

#### npm
> npm install

#### execute the test suite

> mocha
