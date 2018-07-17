'use strict';

module.exports = (function() {

  var _activityIndex = [
    { id:1, text: 'Sedentary', val: 1.2 },
    { id:2, text: 'Lightly active', val: 1.375 },
    { id:3, text: 'Moderately active', val: 1.55 },
    { id:4, text: 'Very active', val: 1.725 },
    { id:5, text: 'Extremely active', val: 1.9 }
  ];

  /**
  * activityIndex: return object with activityIndex
  * @param {integer} index
  * @return {object} activityIndex filtered value
  */
  var activityIndex = function(index) {
   var d = _activityIndex.map(function(item) {
      if (index === item.id) {
        return item;
      }
    }).filter( function(data) {
      return data != null;
    });
    return d;
  };

  /**
  * dce: Daily Caloric Expenditure (Harris Bennedict)
  * @param {object} data object with parameters
  * @return {decimal} dce calculated value
  */
  var dce = function(data) {
    var dceValue = 0;
    if (data.unity === 'I') {
      if (data.gender === 'M') {
        dceValue = data.activityIndex * ((6.25 * data.weight) + (12.7 * data.height) - (6.76 * data.age) + 66);
      } else {
        dceValue = data.activityIndex * ((4.35 * data.weight) + (4.7 * data.height) - (4.68 * data.age) + 655);
      }
    } else {
      //Decimal Metric System
      if (data.gender === 'M') {
        dceValue = data.activityIndex * ((13.75 * data.weight) + (5 * data.height) - (6.76 * data.age) + 66);
      } else {
        dceValue = data.activityIndex * ((9.56 * data.weight) + (1.85 * data.height) - (4.68 * data.age) + 655);
      }
    }
    return dceValue;
  }

  /**
  * toKg: Conversion to KG from Pounds
  * @param {decimal} data value in pounds 
  * @return {object} Converted value
  */
  var toKg = function(data) {
    return {
      total: (data / 2.2).toFixed(2),
      text: 'Kg'
    }
  };
  
  /**
  * toLb: Conversion to pounds from KG
  * @param {decimal} data value in kg 
  * @return {object} Converted value
  */
  var toLb = function(data) {
    return {
      total: (data * 2.2).toFixed(2),
      text: 'Lb'
    }
  };

  /**
  * toLb: Conversion to Inches from meters
  * @param {decimal} data value in cm 
  * @return {object} Converted value
  */
  var toIn = function(data) {
    return {
      total: (data / 2.54).toFixed(2),
      text: 'In'
    }
  };

  /**
  * toLb: Conversion to cm from Inches
  * @param {decimal} data value in Inches 
  * @return {object} Converted value
  */
  var toCm = function(data) {
    return {
      total: (data * 2.54).toFixed(2),
      text: 'Cm'
    }
  };

  /**
  * toImperial: Conversion from metric to Imperial
  * @param {object} data
  * @return {object} Converted object
  */
 var toImperial = function(data) {
  data.weight = toLb(data.weight).total;
  data.weight = toIn(data.height).total;
  data.unity = 'I';
  return data;
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
    if (data.unity === 'I') {
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
    
    if (unity === 'I') {
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

  var _idealWeightCore = function(data, formula) {
    var height = data.height;
    var base = 0;
    var total = 0;
    var delta = 0;
    var extra = 0;
    
    if (data.unity !== 'I') {
      height = toIn(data.height);
    } 

    if (formula === 'hamwi') {
      base = 48;
      delta = data.gender === 1 ? 2.7 : 2.2;
    } else if (formula === 'devine') {
      delta = 2.3;
      base = data.gender === 1 ? 50 : 45.5;
    } else if (formula === 'robinson') {
      delta = data.gender === 1 ? 1.9 : 1.7;
      base = data.gender === 1 ? 52 : 49;
    } else if (formula === 'miller') {
      delta = data.gender === 1 ? 1.41 : 1.36;
      base = data.gender === 1 ? 56.2 : 53.1;
    }
    
    extra = ((height - 5) * 10) * delta;
    total = base + extra;
    return total.toFixed(2);
  }

  var idealWeight = function (data) {

    var hamwi = _idealWeightCore(data, 'hamwi');
    var devine = _idealWeightCore(data, 'devine');
    var robinson = _idealWeightCore(data, 'robinson');
    var miller = _idealWeightCore(data, 'miller');
    
    return { 
      hamwi: hamwi,
      devine: devine,
      robinson: robinson,
      miller: miller
     };
  }

  var _lean = function(data, formula) {
    
    var weight = data.unity === 'I' ? toKg(data.weight) : data.weight;
    var height = data.unity === 'I' ? toCm(data.height) : data.height;
    var total = 0;
    if (formula === 'boer') {
      var total = data.gender === 1? (((0.407 * weight) + (0.267 * height)) - 19.2) : 
        (((0.252 * weight) + (0.473 * height)) - 48.3);
    } else if (formula === 'james') {
      var total = data.gender === 1? ((1.1 * weight) - (128 * Math.pow((weight / height),2))) : 
        ((1.07 * weight) - (148 * Math.pow((weight / height),2)));
    } else if (formula === 'hume') {
      var total = data.gender === 1? ((0.32810 * weight) + (0.33929 * height)) - 29.5336 : 
        ((0.29569 * weight) + (0.41813 * height)) - 43.2933;
    }

    return total.toFixed(2);
  }

  var lean = function(data) {

    var boer = _lean(data, 'boer');
    var james = _lean(data, 'james');
    var hume = _lean(data, 'hume');

    return {
      boer: boer,
      james: james,
      hume: hume
    }
  }

  var fat = function(data) {
    var total = 0;
    var delta = data.gender === 1? -98.42: -76.6;
    var ymca = (delta + (4.15 * data.waist) - (0.082 * data.weight)) / data.weight;
    
    
  /*
    var delta1 = data.gender === 1 ? Math.log10(data.waist - data.neck): Math.log10(data.waist + data.hip - data.neck);
    var delta2 = data.gender === 1 ? (0.15456 * Math.log10(data.height)) : (0.22100 * Math.log10(data.height)); 
    var delta3 = data.gender === 1 ? (1.0324 - ((0.19077 * delta1) + delta2)) : (1.29579 - ((0.35004 * delta1) + delta2)); 
  */  
    return {total: ymca};
  }

  return {
    toKg: toKg,
    toLb: toLb,
    bmi: bmi,
    bmr: bmr,
    dce: dce,
    toImperial: toImperial,
    toCm: toCm,
    toIn: toIn,
    activityIndex: activityIndex,
    tdee: tdee,
    idealWeight: idealWeight,
    fat:fat,
    lean: lean
  }
})();
