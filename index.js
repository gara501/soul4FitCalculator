'use strict';

module.exports = (function() {

  var _activityIndex = [
    { id:1, text: 'Sedentary', val: 1.2 },
    { id:2, text: '< 1 Hour exercise per week', val: 1.375 },
    { id:3, text: '1 to 3 hours per week', val: 1.55 },
    { id:4, text: '3 to 6 hours per week', val: 1.725 },
    { id:5, text: '> 6 hours per week', val: 1.9 }
  ]; 

  var activityIndex = function(index) {
   var d = _activityIndex.map(function(item) {
      if (index === item.id) {
        console.log('data return', item.id);
        return item;
      }
    }).filter( function(data) {
      return data != null;
    });
    return d;
  };

  var toKg = function(data) {
    return {
      res: (data / 2.2).toFixed(2),
      text: 'Kg'
    }
  };
  
  var toLb = function(data) {
    return {
      res: (data * 2.2).toFixed(2),
      text: 'Lb'
    }
  };

  var toIn = function(data) {
    return {
      res: (data / 2.54).toFixed(2),
      text: 'In'
    }
  };

  var toCm = function(data) {
    return {
      res: (data * 2.54).toFixed(2),
      text: 'Cm'
    }
  };
  
  var bmiText = function(value) {
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
  };
  
  var bmi = function(weight, height, unity) {
    if (unity === 'imperial') {
      return ((weight / Math.pow(height, 2)) * 703).toFixed(2);
    } else {
      return (weight / Math.pow(height, 2)).toFixed(2);
    }
  };
  
  var bmr = function( gender, age, height, weight, unity ) {
    if (unity == 'imperial') {
      weight = toKg(weight);
      height = toCm(height);
    }
    if (gender === 1) {
      return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
  }

  var tdee = function( gender, age, height, weight, activity, unity ) {
    var total = bmr(gender, age, height, weight, unity) * activityIndex(activity).val;
    return total;
  }

  return {
    toKg: toKg,
    toLb: toLb,
    bmi: bmi,
    bmr: bmr,
    toCm: toCm,
    toIn: toIn,
    activityIndex: activityIndex,
    tdee: tdee
  }
})();
  

  
  