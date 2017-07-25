'use strict';
var math = require('mathjs');

module.exports = {
  toKg: function(data) {
    return math.divide(data, 2.2);
  },
  toLb: function(data) {
    return math.divide(data, 0.45359237);
  },
  metricUnit: function(data, unity) {
    if (metricUnit === 'kg') {
      return toKg(data);
    } else {
      return toLb(data);
    }
  },
  bmiText: function(value) {
    if (value >= 18.5 && value <= 25) {
      return 'normal';
    } else if (value > 25 && value <= 30) {
      return 'overweight';
    } else if (value > 30 && value <= 40) {
      return 'obesity';
    } else if (value > 40) {
      return 'morbid obesity';
    } else {
      return 'underweight';
    }
  },
  bmi: function(weight, height, unity) {
    if (unity) {
      weight = metricUnit(weight, unity);
      height = metricUnit(height, unity);
    }
    var result = math.divide(weight, math.pow(height));
    return {bmi: result, text: bmiText(result)};
  }
}
  

  
  