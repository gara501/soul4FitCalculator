Soul4fitCalculator
=========

### Version 1.0 
- 1 RM formulas calculations based on authors: Lander, OConnor, Lombardi, Brzycki, Abadie, Whaten, Berger, Mayhew
- BMI Formula
- Daily Caloric Expenditure
- Conversions from/To Metric and Imperial (Kg, Cms)
- Basal Metabolic Rate
- Total Daily energy expenditure
- Ideal Weight based on authors: Hawni, Devine, Robinson, Miller
- Body Fat percentage, based on authors: Boer, James, Hume
- Lean Mass formula based on authors: Boer, James, Hume
  


## Installation

  `npm install @gara501/soul4fitcalculator`

## Usage

```
var fit = require('@gara501/soul4fitcalculator');
```
Each function has a number of specific parameters, to call those functions,
first create an object with basic body parameters, all values are in metric
units by default (Centimeters and Kilograms).
Create an object with basic body parameters:

```
  let userData = {
    weight: 162,
    height: 185,
    age: 20,
    gender: 'F', // or import genders enumeration gender.FEMALE, gender.MALE
    neck: 39, // Necessary to calculate body Fat
    waist: 80, // Necessary to calculate body Fat
    hip: 80, // Necessary to calculate body Fat
    unity: 'M' // or import unity enumeration unity.METRIC, unity.IMPERIAL
  }
```

Please don't use dots in the values:
Incorrect: 1.85
Correct: 185

Values are in metric unit by default, if you want to use imperial units, 
use unity enumeration (unity.IMPERIAL)


To call any function, just pass "data" object, and add new values if needed.
For example, to add "activityIndex" value to data object, just do:
data.activityIndex = fit.activityIndex(2).val;

to Get BMI value, just call the function passing the object: 
var bmi = fit.bodyMassIndex(data);

Output: function returns an object composed of "bmi" and "text"

{bmi: 30.49, text: 'overweight'}


## Tests

`npm test` -> Tests will be included in a future version

