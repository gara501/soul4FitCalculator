'use strict';

module.exports = (function() {
  // Constants
  const gender = {
    MALE: 'M',
    FEMALE: 'F'
  };

  const unity = {
    IMPERIAL: 'I',
    METRIC: 'M'
  };

  const bmiValues = {
    UNDERWEIGHT: 'underweight',
    NORMAL: 'normal',
    OVERWEIGHT: 'overweight',
    OBESITY: 'obesity',
    MORBID: 'morbid obesity'
  }

  const JacksonPollardBodyFat = {
    FEMALE: [
      {age: 20, percentage: '17.7%'},
      {age: 25, percentage: '18.4%'},
      {age: 30, percentage: '19.3%'},
      {age: 35, percentage: '21.5%'},
      {age: 40, percentage: '22.2%'},
      {age: 45, percentage: '22.9%'},
      {age: 50, percentage: '25.2%'},
      {age: 55, percentage: '26.3%'}
    ],
    MALE: [
      {age: 20, percentage: '8.5%'},
      {age: 25, percentage: '10.5%'},
      {age: 30, percentage: '12.7%'},
      {age: 35, percentage: '13.7%'},
      {age: 40, percentage: '15.3%'},
      {age: 45, percentage: '16.4%'},
      {age: 50, percentage: '18.9%'},
      {age: 55, percentage: '20.9%'}
    ]
  };

  const AceBodyFatCategorization = {
    FEMALE: [
      {name: 'Essential Fat', value: '13'},
      {name: 'Athlete', value: '20'},
      {name: 'Fitness', value: '24'},
      {name: 'Average', value: '31'},
      {name: 'Obese', value: '32'}
    ],
    MALE: [
      {name: 'Essential Fat', value: '5'},
      {name: 'Athlete', value: '13'},
      {name: 'Fitness', value: '17'},
      {name: 'Average', value: '25'},
      {name: 'Obese', value: '26'}
    ],
  };
    

  /**
  * _activityIndex: Array with activity definitions
  */
  const _activityIndex = [
    {
      SEDENTARY: {
        id:1,
        name: 'sedentary',
        description: 'No exercise at all',
        value: 1.2
      },
      LIGHTLY_ACTIVE: {
        id:2,
        name: 'lightly active',
        description: 'Lightly exercise 2 to 3 times per week',
        value: 1.375
      },
      MODERATELY_ACTIVE: {
        id:3,
        name: 'Moderately active',
        description: 'Exercise 3 to 5 times per week',
        value: 1.55
      },
      VERY_ACTIVE: {
        id:4,
        name: 'very active',
        description: 'Exercise 6 to 7 times per week',
        value: 1.725
      },
      EXTREMELY_ACTIVE: {
        id:5,
        description: 'Exercise 3 to 5 times per week at hight intensity',
        description: '',
        value: 1.9
      }
    }
  ];

  // Base object
  let userData = {
    age: 0,
    gender: '',
    height: 0,
    weight: 0,
    unity: ''
  }

   /**
   * Ideal Body Fat Percentaje by age
   * @param {decimal, string} bodyFatPercentage, gender
   * @returns {string} idealBf;
  */
  const _idealBodyfatRange = (bodyfatPercentaje, gender) => {
    let isAgeRange = 0;
    let idealBf = 0;
    let arrayFemale = [];
    let arrayMale = [];

    for ( item in JacksonPollardBodyFat) {
      if (item ===  'FEMALE') {
        arrayFemale.push(JacksonPollardBodyFat[item])
      } else {
        arrayMale.push(JacksonPollardBodyFat[item])
      }
    }

    if (gender === gender.FEMALE) {
      for (item2 of arrayFemale) {
        if (bodyfatPercentaje >= item2.age) {
          if (item2.age > isAgeRange){
              isAgeRange = item2.age;
              idealBf = item2.percentage;
          }
        }
      }
    }

    if (gender === gender.MALE) {
      for (item2 of arrayMale) {
        if (bodyfatPercentaje >= item2.age) {
          if (item2.age > isAgeRange){
              isAgeRange = item2.age;
              idealBf = item2.percentage;
          }
        }
      }
    }

    return idealBf;
  }

  /**
   * ACE Body Fat Categorization
   * @param {decimal, string} bodyFatPercentage, gender
   * @returns {string} categorization;
  */
 const _aceBodyFatCategorization = (bodyfatPercentaje, gender) => {
  let isCategorizationRange = 0;
  let categorization = 0;
  for ( item in AceBodyFatCategorization) {
    if (gender === item.FEMALE) {
      for (item2 of AceBodyFatCategorization[item]){
        if (bodyfatPercentaje >= item2.value) {
            if (item2.value > isCategorizationRange){
                isCategorizationRange = item2.value;
                categorization = item2.percentage;
            }
        }
      }
    } else {
      for (item2 of AceBodyFatCategorization[item]){
        if (bodyfatPercentaje >= item2.value) {
            if (item2.value > isCategorizationRange){
                isCategorizationRange = item2.value;
                categorization = item2.percentage;
            }
        }
      }
    }
    
  return categorization;
  }
}

  // RM calculations

  /**
   * Epley/Welday lineal formula to calculate 1RM (works fine with ranges <= 15 reps) (recommended)
   * @param {reps, weight} value repetitions and weight
   * @returns rmWeight 
  */
  const _epleyWeldayRm = (reps, weight) => {
    const rmWeight = weight + (1 + (0.033 * reps));
    return Math.round(rmWeight);
  }
  
  /**
   * Lander lineal formula to calculate 1RM (works fine with ranges <= 15 reps)
   * @param {reps, weight} value repetitions and weight 
   * @returns rmWeight 
  */
  const _landerRm = (reps, weight) => {
    const rmWeight = (100 * weight) / 101.3 - (2.67123 * reps);
    return Math.round(rmWeight);
  }

  /**
   * OConnor lineal formula to calculate 1RM (works fine with ranges <= 15 reps)
   * @param {reps, weight} value repetitions and weight 
   * @returns rmWeight 
  */
  const _oConnorRm = (reps, weight) => {
    const rmWeight = weight * Math.pow(reps, 0.10)
    return Math.round(rmWeight);
  }

  /**
   * Lombardy lineal formula to calculate 1RM (works fine with ranges <= 15 reps)
   * @param {reps, weight} value repetitions and weight 
   * @returns rmWeight 
  */
  const _lombardiRm = (reps, weight) => {
    const rmWeight = (100 * weight) / (52.2+41.9 * Math.exp(-0.055*reps))
    return Math.round(rmWeight);
  }

  /**
   * Brzycky lineal formula to calculate 1RM (works fine with ranges <= 15 reps)
   * @param {reps, weight} value repetitions and weight 
   * @returns rmWeight 
  */
  const _brzyckiRm = (reps, weight) => {
    const rmWeight = weight / 1.0278 - (0.0278 * reps)
    return Math.round(rmWeight);
  }

  /**
   * Abadie lineal formula to calculate 1RM (works fine with ranges <= 15 reps)
   * @param {reps, weight} value repetitions and weight 
   * @returns rmWeight 
  */
  const _abadieRm = (reps, weight) => {
    const rmWeight = (weight + reps) / (8.841 + (1.1828*reps));
    return Math.round(rmWeight);
  }

  // Teoric 1RM not lineal
  /**
   * Wathen exponential formula to calculate 1RM (recommended)
   * @param {reps, weight} value repetitions and weight 
   * @returns rmWeight 
  */
  const _wathenRm = (reps, weight) => {
    const rmWeight = weight / ((48.8 + (53.8 * Math.exp(-0.075 * reps))) / 100);
    return Math.round(rmWeight);
  }

  /**
   * Berger  exponential formula to calculate 1RM (recommended)
   * @param {reps, weight} value repetitions and weight 
   * @returns rmWeight 
  */
  const _bergerRm = (reps, weight) => {
    const rmWeight = reps + weight / (1.0261 * Math.exp(-0.00262*reps));
    return Math.round(rmWeight);
  }

  /**
   * Mayhew  exponential formula to calculate 1RM (recommended)
   * @param {reps, weight} value repetitions and weight 
   * @returns rmWeight 
  */
  const _mayhewRm = (reps, weight) => {
    const rmWeight = weight / ((52.2 + (41.9 * Math.exp(-0.055 * reps))) / 100);
    return Math.round(rmWeight);
  }


  /**
  * _bmiText: Definition of BMI Results
  */
  var _bmiText = function(value) {
    if (value >= 18.5 && value <= 25) {
      return bmiValues.NORMAL;
    } else if (value > 25 && value <= 30) {
      return bmiValues.OVERWEIGHT;
    } else if (value > 30 && value <= 40) {
      return bmiValues.OBESITY;
    } else if (value > 40) {
      return bmiValues.MORBID;
    } else {
      return bmiValues.UNDERWEIGHT;
    }
  };

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
  * @param {object} userData object with parameters {gender, unity}
  * @return {decimal} dceValue
  */
  var dailyCaloricExpenditure = function(userData) {
    var dceValue = 0;
    if (userData.unity === unity.imperial) {
      if (userData.gender === gender.male) {
        dceValue = userData.activityIndex * ((6.25 * userData.weight) + (12.7 * userData.height) - (6.76 * userData.age) + 66);
      } else {
        dceValue = userData.activityIndex * ((4.35 * userData.weight) + (4.7 * userData.height) - (4.68 * userData.age) + 655);
      }
    } else {
      //Decimal Metric System
      if (userData.gender === gender.male) {
        dceValue = userData.activityIndex * ((13.75 * userData.weight) + (5 * userData.height) - (6.76 * userData.age) + 66);
      } else {
        dceValue = userData.activityIndex * ((9.56 * userData.weight) + (1.85 * userData.height) - (4.68 * userData.age) + 655);
      }
    }
    return dceValue;
  }

  /**
  * toKg: Conversion to KG from Pounds
  * @param {decimal} weight value in pounds 
  * @return {object} Converted value
  */
  var toKg = function(weight) {
    return {
      total: (weight / 2.2).toFixed(2),
      text: 'Kg'
    }
  };
  
  /**
  * toLb: Conversion to pounds from KG
  * @param {decimal} weight value in kg 
  * @return {object} Converted value
  */
  var toLb = function(weight) {
    return {
      total: (weight * 2.2).toFixed(2),
      text: 'Lb'
    }
  };

  /**
  * toIn: Conversion to Inches from meters
  * @param {decimal} size value in cm 
  * @return {object} Converted value
  */
  var toIn = function(size) {
    return {
      total: (size / 2.54).toFixed(2),
      text: 'In'
    }
  };

  /**
  * toCm: Conversion to cm from Inches
  * @param {decimal} size value in Inches 
  * @return {object} Converted value
  */
  var toCm = function(size) {
    return {
      total: (size * 2.54).toFixed(2),
      text: 'Cm'
    }
  };

  /**
  * toImperial: Conversion from metric to Imperial
  * @param {object} data
  * @return {object} Converted object
  */
  var toImperial = function(userData) {
    userData.height = parseFloat(toIn(userData.height).total);
    userData.weight = parseFloat(toLb(userData.weight).total);
    return userData;
  };

  /**
  * toMetric: Conversion from imperial to metric
  * @param {object} userData
  * @return {object} Converted object
  */
  var toMetric = function(userData) {
    userData.height = parseFloat(toCm(userData.height).total);
    userData.weight = parseFloat(toKg(userData.weight).total);
    return userData;
  };

  /**
  * bmi: Body Mass Index calculation
  * @param {object} userData {unity, weight, height}
  * @return {object} {total, text}
  */
  const bodyMassIndex = function(userData) {
    var total = '';
    if (userData.unity === unity.imperial) {
      total = ((userData.weight / Math.pow(userData.height, 2)) * 703).toFixed(2);
    } else {
      total = (userData.weight / Math.pow(userData.height, 2)).toFixed(2);
    }
    return {total: total, text: _bmiText(total)};
  };
  
  /**
  * bmr: Basal metabolic rate using Mifflin-St. Jeor equations
  * @param {object} userData {weight, height, unity, age}
  * @return {object} {mifflin, harrisBennedict}
  */
  const basalMetabolicRate = function( userData ) {
    var total, totalHb = '';
    var weight = userData.weight;
    var height = userData.height;

    if (userData.unity === unity.imperial) {
      userData = toMetric(userData);
    }

    if (userData.gender === gender.male) {
      total = (10 * userData.weight) + (6.25 *  userData.height) - (5 * userData.age) + 5;
      totalHb = 66.5 + (13.75 * userData.weight) + (5.003 * userData.height) - (6.775 * userData.age);
    } else {
      total = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) - 161;
      totalHb = 655.1 + (9.563 * userData.weight) + (1.85 * userData.height) - (4.676 * userData.age);
    }

    return {
      mifflin: Math.round(total),
      harrisBennedict: Math.round(totalHb)
    };
  }

  /**
  * Total Daily Energy expenditure
  * @param {object} userData {weight, height, unity, age}
  * @param {integer} activityIndex
  * @return {object} {tdeeHarrisB, tdeeMifflin}
  */
  var totalDailyEnergyExpenditure = function(userData, activityIndex) {
    let basalMetabolicRate = basalMetabolicRate(userData);
    let response = {
      tdeeHarrisB: basalMetabolicRate.harrisBennedict * activityIndex,
      tdeeMifflin: basalMetabolicRate.mifflin * activityIndex
    }
    
    return response;
  }

  /**
  * _ideal weight core - Intermediate function
  * @param {object} userData {gender, height, unity}
  * @return {decimal} total
  */
  var _idealWeightCore = function(userData, formula) {
    var height = data.height;
    var base = 0;
    var total = 0;
    var delta = 0;
    var extra = 0;
    
    if (userData.unity !== unity.imperial) {
      height = toIn(userData.height);
    }

    if (formula === 'hamwi') {
      delta = userData.gender === gender.male ? 2.7 : 2.2;
      base = 48;
    } else if (formula === 'devine') {
      delta = 2.3;
      base = userData.gender === gender.male ? 50 : 45.5;
    } else if (formula === 'robinson') {
      delta = userData.gender === gender.male ? 1.9 : 1.7;
      base = userData.gender === gender.male ? 52 : 49;
    } else if (formula === 'miller') {
      delta = userData.gender === gender.male ? 1.41 : 1.36;
      base = userData.gender === gender.male ? 56.2 : 53.1;
    }
    
    extra = ((height - 5) * 10) * delta;
    total = base + extra;
    return total.toFixed(2);
  }

    /**
  * Ideal Weight
  * @param {object} userData {gender, height, unity}
  * @param {integer} activityIndex
  * @return {object} {hamwi, devine, robinson, miller}
  */
  var idealWeight = function (userData) {

    var hamwi = _idealWeightCore(userData, 'hamwi');
    var devine = _idealWeightCore(userData, 'devine');
    var robinson = _idealWeightCore(userData, 'robinson');
    var miller = _idealWeightCore(userData, 'miller');
    
    return { 
      hamwi: hamwi,
      devine: devine,
      robinson: robinson,
      miller: miller
     };
  }

    /**
  * Lean Mass Internal formula
  * @param {object} userData {gender, height, weight, unity}
  * @param {string} formula
  * @return {integer} total
  */
  var _lean = function(data, formula) {
    
    var weight = data.unity === unity.imperial ? toKg(data.weight) : data.weight;
    var height = data.unity === unity.imperial ? toCm(data.height) : data.height;
    var total = 0;
    if (formula === 'boer') {
      var total = data.gender === gender.male? (((0.407 * weight) + (0.267 * height)) - 19.2) : 
        (((0.252 * weight) + (0.473 * height)) - 48.3);
    } else if (formula === 'james') {
      var total = data.gender === gender.male? ((1.1 * weight) - (128 * Math.pow((weight / height),2))) : 
        ((1.07 * weight) - (148 * Math.pow((weight / height),2)));
    } else if (formula === 'hume') {
      var total = data.gender === gender.male? ((0.32810 * weight) + (0.33929 * height)) - 29.5336 : 
        ((0.29569 * weight) + (0.41813 * height)) - 43.2933;
    }

    return total.toFixed(2);
  }

    /**
  * Lean Mass formula
  * @param {object} userData {gender, height, weight, unity}
  * @return {object} {boear, james, hume}
  */
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

  /**
  * Body fat percentage formulas
  * @param {object} userData {gender, waist, hip, neck, age, unity}
  * @return {object} {boear, james, hume}
  */
  const fatPercentage = function(userData) {
    const bmi = bodyMassIndex(userData).total;
    let bfp = '';
    let bmiBfp = '';

    if (userData.unity === unity.IMPERIAL) {
      if (userData.gender === gender.MALE) {
        bfp = (86.010 * Math.log10(userData.waist-userData.neck)) - (70.041 * Math.log10(userData.height) + 36.76);
      } else {
        bfp = (163.205 * Math.log10(userData.waist+userData.hip-userData.neck)) - (97.684 * Math.log10(userData.height) + 36.76);
      }
    } else {
      if (userData.gender === gender.MALE) {
        bfp = (495 / ((1.0324 - (0.19077 * Math.log10(userData.waist-userData.neck))) + (0.1546*Math.log10(userData.height)))) - 450;
      } else {
        bfp = (495 / ((1.29579 - (0.19077 * Math.log10(userData.waist+userData.hip-userData.neck))) + (0.22100*Math.log10(userData.height)))) - 450;
      }
    }

    if (userData.age > 18) {
      if (userData.gender === gender.FEMALE) {
        bmiBfp = (1.20 * bmi) + (0.23 * userData.age) - 5.4;
      } else {
        bmiBfp = (1.20 * bmi) + (0.23 * userData.age) - 16.2;
      }
    } else {
      if (userData.gender === gender.FEMALE) {
        bmiBfp = (1.51 * bmi) + (0.70 * userData.age) - 2.2;
      } else {
        bmiBfp = (1.51 * bmi) + (0.70 * userData.age) - 1.4;
      }      
    }

    const ideal = _idealBodyfatRange(bfp, userData.gender);

    const fatMass = bfp * userData.weight;
    const leanMass = userData.weight - fatMass;

  }

  return {
    userData,
    toKg,
    toLb,
    bodyMassIndex,
    basalMetabolicRate,
    dailyCaloricExpenditure,
    toImperial,
    toCm,
    toIn,
    activityIndex,
    totalDailyEnergyExpenditure,
    idealWeight,
    lean,
    fat,
    JacksonPollardBodyFat
  }
})();
