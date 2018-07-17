Soul4Api
=========

This version has some fitness calculations based on known authors like Harris Bennedict, Robinson, Devine, etc. You can get BMI, 
DCE (Daily Caloric Expenditure), Macros (Fat, Carbs, Protein), ideal weight, etc.

## Installation

  `npm install @gara501/soul4api`

## Usage

    var fit = require('@gara501/soul4api');
    Each function has a number of specific parameters, to call those functions,
    first create an object with basic body parameters, all values are in metric
    units by default (Centimeters and Kilograms).
    Create an object with basic body parameters:

    var data = {
      weight: 162,
      height: 185,
      age: 20,
      unit: 'm'
    }

    Please don't use dots in the values:
    Incorrect: 1.85
    Correct: 185

    Values are in metric unit by default, if you want to use imperial units, 
    just create a new variable and call toImperial(data) function.

    var data = {
      weight: 162,
      height: 185,
      age: 20,
      unit: 'm'
    };

    var imperialData = fit.toImperial(data);

    To call any function, just pass "data" object, and add new values if needed.
    For example, to add "activityIndex" value to data object, just do:
    data.activityIndex = fit.activityIndex(2).val;

    to Get BMI value, just call the function passing the object: 
    var bmi = fit.bmi(data);

    Output: function returns an object composed of "bmi" and "text"

    {bmi: 30.49, text: 'overweight'}


## Tests

  `npm test` -> Tests will be included in a future version

