Soul4Api
=========

A small library that do calculations on macros, fat percentage, and fitness tests.

## Installation

  `npm install @gara501/soul4api`

## Usage

    var s4Api = require('@gara501/soul4api');
    var weight = 162;
    var height = 6,1;
    var bodyMassIndex = s4Api.bmi(height, weight);
    
 If you want to send values in KG, add a extra parameter at the end of the function
    var bodyMassIndex = s4Api.bmi(height, weight, 'kg');
  
  Output should be {total: 30,49 data: 'overweight'}


## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
