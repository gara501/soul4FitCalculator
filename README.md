Soul4Api
=========

A small library to generate fitness formulas to calculate different stuff like macronutrients intakes, BMI, fat percentage, cardio levels, etc.

## Installation

  `npm install @gara501/soul4api`

## Usage

    var fit = require('@gara501/soul4api');
    var weight = 162;
    var height = 6,1;
    var bmi = fit.bmi(weight, height);
    
 If you want to send values in KG, add a extra parameter at the end of the function
 
    var bodyMassIndex = fit.bmi(weight, height, 'kg');
  
  Output: function returns an object composed of "bmi" and "text"
    
    {bmi: 30.49, text: 'overweight'}


## Tests

  `npm test` -> Tests will be included in a future version

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
