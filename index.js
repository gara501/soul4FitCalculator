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
        return item;
      }
    }).filter( function(data) {
      return data != null;
    });
    console.log('activity:', d);
    return d;
  };

  var toKg = function(data) {
    return {
      total: (data / 2.2).toFixed(2),
      text: 'Kg'
    }
  };
  
  var toLb = function(data) {
    return {
      total: (data * 2.2).toFixed(2),
      text: 'Lb'
    }
  };

  var toIn = function(data) {
    return {
      total: (data / 2.54).toFixed(2),
      text: 'In'
    }
  };

  var toCm = function(data) {
    return {
      total: (data * 2.54).toFixed(2),
      text: 'Cm'
    }
  };
  
  var _bmiText = function(value) {
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
  
  var bmi = function(data) {
    var total = '';
    if (data.unity === 'imperial') {
      total = ((data.weight / Math.pow(data.height, 2)) * 703).toFixed(2);
    } else {
      total = (data.weight / Math.pow(data.height, 2)).toFixed(2);
    }
    return {total: total, text: _bmiText(total)};
  };
  
  var bmr = function( data ) {
    var total = '';
    var weight = data.weight;
    var height = data.height;
    
    if (unity === 'imperial') {
      weight = toKg(data.weight);
      height = toCm(data.height);
    }

    if (data.gender === 1) {
      total = (10 * weight) + (6.25 * height) - (5 * data.age) + 5;
    } else {
      total = (10 * weight) + (6.25 * height) - (5 * data.age) - 161;
    }
    return {total: Math.round(total)};
  }

  var tdee = function( data ) {
    var _bmr = bmr(data.gender, data.age, data.height, data.weight, data.unity);
    var activityIn = activityIndex(activity);
    var total = _bmr.total * activityIn[0].val;
    return {total: Math.round(total)};
  }

  var idealWeight = function (data) {
    var height = data.height;
    var weight = data.weight;
    var base = 48;
    var unityW = 2.2;
    var unityM = 2.7;
    var total = 0;
    if (data.unity !== 'imperial') {
      height = toIn(data.height);
      base = toLb(base);
      unityM = toLb(unityM);
      unityW = toLb(unityW);
    } else {
      weight = toKg(data.weight);
    }
    var extra = height - 5;
    if (data.gender === 1) {
      total = base + (extra * unityW);
    } else {
      total = base + (extra * unityM);
    }

    return {total: total};
  }

  return {
    toKg: toKg,
    toLb: toLb,
    bmi: bmi,
    bmr: bmr,
    toCm: toCm,
    toIn: toIn,
    activityIndex: activityIndex,
    tdee: tdee,
    idealWeight: idealWeight
  }
})();
  

  
  