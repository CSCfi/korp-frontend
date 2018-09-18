'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
function getDecimals(n) {
  n = n + '';
  var i = n.indexOf('.');
  return (i == -1) ? 0 : n.length - i - 1;
}

function getVF(n, opt_precision) {
  var v = opt_precision;

  if (undefined === v) {
    v = Math.min(getDecimals(n), 3);
  }

  var base = Math.pow(10, v);
  var f = ((n * base) | 0) % base;
  return {v: v, f: f};
}

$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "ap",
      "ip"
    ],
    "DAY": [
      "sunnuntai",
      "maanantai",
      "tiistai",
      "keskiviikko",
      "torstai",
      "perjantai",
      "lauantai"
    ],
    "ERANAMES": [
      "ennen Kristuksen syntymää",
      "jälkeen Kristuksen syntymän"
    ],
    "ERAS": [
      "eKr.",
      "jKr."
    ],
    "FIRSTDAYOFWEEK": 0,
    "MONTH": [
      "tammikuu",
      "helmikuu",
      "maaliskuu",
      "huhtikuu",
      "toukokuu",
      "kesäkuu",
      "heinäkuu",
      "elokuu",
      "syyskuu",
      "lokakuu",
      "marraskuu",
      "joulukuu"
    ],
    "SHORTDAY": [
      "su",
      "ma",
      "ti",
      "ke",
      "to",
      "pe",
      "la"
    ],
    "SHORTMONTH": [
      "tam",
      "hel",
      "maa",
      "huh",
      "tou",
      "kes",
      "hei",
      "elo",
      "syy",
      "lok",
      "mar",
      "jou"
    ],
    "STANDALONEMONTH": [
      "Tammikuu",
      "Helmikuu",
      "Maaliskuu",
      "Huhtikuu",
      "Toukokuu",
      "Kesäkuu",
      "Heinäkuu",
      "Elokuu",
      "Syyskuu",
      "Lokakuu",
      "Marraskuu",
      "Joulukuu"
    ],
    "WEEKENDRANGE": [
      5,
      6
    ],
    "fullDate": "EEEE d MMMM'ta' y",
    "longDate": "d MMMM'ta' y",
    "medium": "d.MM.y HH.mm.ss",
    "mediumDate": "d.MM.y",
    "mediumTime": "HH.mm.ss",
    "short": "y-MM-dd HH:mm",
    "shortDate": "y-MM-dd",
    "shortTime": "HH:mm"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "€",
    "DECIMAL_SEP": ",",
    "GROUP_SEP": "\u00a0",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "\u00a0\u00a4",
        "posPre": "",
        "posSuf": "\u00a0\u00a4"
      }
    ]
  },
  "id": "fi",
  "localeID": "fi",
  "pluralCat": function(n, opt_precision) {  var i = n | 0;  var vf = getVF(n, opt_precision);  if (i == 1 && vf.v == 0) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;}
});
}]);
