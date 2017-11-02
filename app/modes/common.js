settings.senseAutoComplete = "<autoc model='model' placeholder='placeholder' type='sense'/>";

var karpLemgramLink = "https://spraakbanken.gu.se/karp/#?search=extended||and|lemgram|equals|<%= val.replace(/:\\d+/, '') %>";

var selectType = {
    extended_template: "<select ng-model='model' "
     + "ng-options='tuple[0] as localize(tuple[1]) for tuple in dataset' ></select>",
    controller: function($scope) {
        $scope.localize = function(str) {
            if($scope.localize === false) {
                return str;
            } else {
                return util.getLocaleString( ($scope.translationKey || "") + str);
            }
        }

        $scope.translationKey = $scope.translationKey || "";
        var dataset;
        if(_.isArray($scope.dataset)) {
            // convert array datasets into objects
            dataset = _.object(_.map($scope.dataset, function(item) {
                return [item, item];
            }));
        }
        $scope.dataset = dataset || $scope.dataset;

        $scope.dataset = _.sortBy(_.pairs($scope.dataset), function(tuple) {
            return $scope.localize(tuple[1]);
        });
        $scope.model = $scope.model || $scope.dataset[0][0]
    }
};

var attrs = {};  // positional attributes
var sattrs = {}; // structural attributes

attrs.pos = {
    label: "pos",
    displayType: "select",
    translationKey: "pos_",
    dataset: {
        "AB": "AB",
        "MID|MAD|PAD": "DL",
        "DT": "DT",
        "HA": "HA",
        "HD": "HD",
        "HP": "HP",
        "HS": "HS",
        "IE": "IE",
        "IN": "IN",
        "JJ": "JJ",
        "KN": "KN",
        "NN": "NN",
        "PC": "PC",
        "PL": "PL",
        "PM": "PM",
        "PN": "PN",
        "PP": "PP",
        "PS": "PS",
        "RG": "RG",
        "RO": "RO",
        "SN": "SN",
        "UO": "UO",
        "VB": "VB"
    },
    opts: settings.liteOptions,
    extended_template: selectType.extended_template,
    controller: selectType.controller,
    order: 50
};

attrs.msd_sv = {
    label: "msd",
    opts: settings.defaultOptions,
    extended_template: '<input ng-model="input" ng-change="inputChange()" class="arg_value" escaper ng-model-options=\'{debounce : {default : 300, blur : 0}, updateOn: "default blur"}\'>' +
    '<span ng-click="onIconClick()" class="fa fa-info-circle"></span>',
    controller: function($scope, $uibModal) {
        var modal = null;

        $scope.onIconClick = function() {
            modal = $uibModal.open({
                template: '<div>' +
                                '<div class="modal-header">' +
                                    '<h3 class="modal-title">{{\'msd_long\' | loc:lang}}</h3>' +
                                    '<span ng-click="clickX()" class="close-x">×</span>' +
                                '</div>' +
                                '<div class="modal-body msd-modal" ng-click="msdClick($event)" ng-include="\'markup/msd.html\'"></div>' +
                            '</div>',
                scope: $scope
            })
        }
        $scope.clickX = function(event) {
            modal.close()
        }
        $scope.msdClick = function(event) {
            val = $(event.target).parent().data("value")
            if(!val) return;
            $scope.input = val;
            $scope.inputChange();
            modal.close();
        }
    }
};
attrs.baseform_sv = {
    label: "baseform",
    type: "set",
    opts: settings.setOptions,
    extended_template: "<input ng-model='model' >",
    order: 49
};
attrs.lemgram = {
    label: "lemgram",
    type: "set",
    displayType: "autocomplete",
    opts: settings.setOptions,
    stringify: function(lemgram) {
        // if(_.contains(lemgram, " "))
        // TODO: what if we're getting more than one consequtive lemgram back?
        return util.lemgramToString(_.str.trim(lemgram), true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true,
    extended_template: "<autoc model='model' placeholder='placeholder' type='lemgram'/>",
    order: 48
};
attrs.dalinlemgram = {
    label: "dalin-lemgram",
    type: "set",
    displayType: "autocomplete",
    opts: settings.setOptions,
    stringify: function(lemgram) {
        // if(_.contains(lemgram, " "))
        // TODO: what if we're getting more than one consequtive lemgram back?
        return util.lemgramToString(_.str.trim(lemgram), true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true,
    extended_template: "<autoc model='model' placeholder='placeholder' type='lemgram' variant='dalin'/>",
    order: 48
};
attrs.saldo = {
    label: "saldo",
    type: "set",
    displayType: "autocomplete",
    opts: settings.setOptions,
    stringify: function(saldo) {
        return util.saldoToString(saldo, true);
    },
    externalSearch: "https://spraakbanken.gu.se/karp/#?search=extended||and|sense|equals|<%= val %>",
    internalSearch: true,
    extended_template: settings.senseAutoComplete,
    order: 47
};
attrs.dephead = {
    label: "dephead",
    displayType: "hidden"
};
attrs.deprel = {
    label: "deprel",
    displayType: "select",
    translationKey: "deprel_",
    extended_template: selectType.extended_template,
    controller: selectType.controller,
    dataset: {
        "++": "++",
        "+A": "+A",
        "+F": "+F",
        "AA": "AA",
        "AG": "AG",
        "AN": "AN",
        "AT": "AT",
        "CA": "CA",
        "DB": "DB",
        "DT": "DT",
        "EF": "EF",
        "EO": "EO",
        "ES": "ES",
        "ET": "ET",
        "FO": "FO",
        "FP": "FP",
        "FS": "FS",
        "FV": "FV",
        "I?": "I?",
        "IC": "IC",
        "IG": "IG",
        "IK": "IK",
        "IM": "IM",
        "IO": "IO",
        "IP": "IP",
        "IQ": "IQ",
        "IR": "IR",
        "IS": "IS",
        "IT": "IT",
        "IU": "IU",
        "IV": "IV",
        "JC": "JC",
        "JG": "JG",
        "JR": "JR",
        "JT": "JT",
        "KA": "KA",
        "MA": "MA",
        "MS": "MS",
        "NA": "NA",
        "OA": "OA",
        "OO": "OO",
        "OP": "OP",
        "PL": "PL",
        "PR": "PR",
        "PT": "PT",
        "RA": "RA",
        "SP": "SP",
        "SS": "SS",
        "TA": "TA",
        "TT": "TT",
        "UK": "UK",
        "VA": "VA",
        "VO": "VO",
        "VS": "VS",
        "XA": "XA",
        "XF": "XF",
        "XT": "XT",
        "XX": "XX",
        "YY": "YY",
        "CJ": "CJ",
        "HD": "HD",
        "IF": "IF",
        "PA": "PA",
        "UA": "UA",
        "VG": "VG",
        "ROOT": "ROOT"
    },
    opts: settings.liteOptions
};
attrs.prefix = {
    label: "prefix",
    type: "set",
    displayType: "autocomplete",
    opts: settings.setOptions,
    stringify: function(lemgram) {
        return util.lemgramToString(lemgram, true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true,
    extended_template: "<autoc model='model' placeholder='placeholder' type='lemgram' variant='affix'/>"
};
attrs.suffix = {
    label: "suffix",
    type: "set",
    displayType: "autocomplete",
    opts: settings.setOptions,
    stringify: function(lemgram) {
        return util.lemgramToString(lemgram, true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true,
    extended_template: "<autoc model='model' placeholder='placeholder' type='lemgram' variant='affix'/>"
};
attrs.ref = {
    label: "ref",
    displayType: "hidden"
};
attrs.link = {
    label: "sentence_link"
};
attrs.ne_ex = {
    label: "ne_expr",
    translationKey: "ne_expr_",
    extended_template: selectType.extended_template,
    controller: selectType.controller,
    isStructAttr: true,
    dataset: [
       "ENAMEX",
       "TIMEX",
       "NUMEX",
   ]
};
attrs.ne_type = {
    label: "ne_type",
    translationKey: "ne_type_",
    extended_template: selectType.extended_template,
    controller: selectType.controller,
    isStructAttr: true,
    dataset: [
       "LOC",
       "PRS",
       "ORG",
       "EVN",
       "WRK",
       "OBJ",
       "MSR",
       "TME"
   ]
};
attrs.ne_subtype = {
    label: "ne_subtype",
    translationKey: "ne_subtype_",
    extended_template: selectType.extended_template,
    controller: selectType.controller,
    isStructAttr: true,
    dataset: [
        "AST",
        "GPL",
        "PPL",
        "FNC",
        "STR",
        "HUM",
        "MTH",
        "ANM",
        "CLC",
        "FIN",
        "ATH",
        "CLT",
        "PLT",
        "TVR",
        "EDU",
        "TRN",
        "CRP",
        "HPL",
        "WTH",
        "CLU",
        "ATL",
        "RLG",
        "WRT",
        "RTV",
        "WAO",
        "PRJ",
        "WMD",
        "WAE",
        "MDC",
        "FWP",
        "CMP",
        "VHA",
        "VHG",
        "VHW",
        "PRZ",
        "PRD",
        "VLM",
        "TMP",
        "INX",
        "DST",
        "PRC",
        "CUR",
        "DEN",
        "DSG",
        "SPD",
        "FRQ",
        "AGE",
        "MSU",
        "WMU",
        "CMU",
        "WEB",
        "PSS",
        "CVU",
        "IDX",
        "LST",
        "DAT",
        "PER"
   ],
   stringify: function(val) {
       lString = util.getLocaleStringUndefined("ne_subtype_" + val)
       return lString || val;
   }
};
attrs.ne_name = {
    label: "ne_name",
    isStructAttr: true
};
sattrs.date = {
    label: "date"
};

var modernAttrs = {
    pos: attrs.pos,
    msd: attrs.msd,
    lemma: attrs.baseform,
    lex: attrs.lemgram,
    saldo: attrs.saldo,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref,
    prefix: attrs.prefix,
    suffix: attrs.suffix
};

settings.posset = {
   type: "set",
   label: "posset",
   displayType: "select",
   opts: settings.setOptions,
   translationKey: "pos_",
   extended_template: selectType.extended_template,
   controller: selectType.controller,
   dataset:  {
        "AB": "AB",
        "MID|MAD|PAD": "DL",
        "DT": "DT",
        "HA": "HA",
        "HD": "HD",
        "HP": "HP",
        "HS": "HS",
        "IE": "IE",
        "IN": "IN",
        "JJ": "JJ",
        "KN": "KN",
        "NN": "NN",
        "PC": "PC",
        "PL": "PL",
        "PM": "PM",
        "PN": "PN",
        "PP": "PP",
        "PS": "PS",
        "RG": "RG",
        "RO": "RO",
        "SN": "SN",
        "UO": "UO",
        "VB": "VB"
    },
    order: 50
};

settings.fsvlemma = {
    type: "set",
    label: "baseform",
    opts: settings.setOptions,
    extended_template: "<input ng-model='model' >"
};
settings.fsvlex = {
    type: "set",
    label: "lemgram",
    displayType: "autocomplete",
    opts: settings.setOptions,
    extended_template: "<autoc model='model' placeholder='placeholder' type='lemgram'/>",
    stringify: function(str) {
        return util.lemgramToString(str, true);
    },
    externalSearch: karpLemgramLink,
    internalSearch: true
};
settings.fsvvariants = {
    type: "set",
    label: "variants",
    stringify: function(str) {
        return util.lemgramToString(str, true);
    },
    displayType: "autocomplete",
    extended_template: "<autoc model='model' placeholder='placeholder' type='lemgram'/>",
    opts: settings.setOptions,
    externalSearch: karpLemgramLink,
    internalSearch: true,
    order: 46
};

settings.fsvdescription ='<a target="_blank" href="http://project2.sol.lu.se/fornsvenska/">Fornsvenska textbanken</a> är ett projekt som digitaliserar fornsvenska texter och gör dem tillgängliga över webben. Projektet leds av Lars-Olof Delsing vid Lunds universitet.';

var fsv_yngrelagar = {
    morf: 'fsvm',
    id: "fsv-yngrelagar",
    title: "Yngre lagar – Fornsvenska textbankens material",
    description: settings.fsvdescription,
    within: settings.defaultWithin,
    context: settings.spContext,
    attributes: {
        posset: settings.posset,
        lemma: settings.fsvlemma,
        lex: settings.fsvlex,
        variants: settings.fsvvariants
        },
    struct_attributes: {
        text_title: {
            label: "title",
            displayType: "select",
            localize: false,
            extended_template: selectType.extended_template,
            controller: selectType.controller,
            dataset: [
                "Kristoffers Landslag, nyskrivna flockar i förhållande till MEL",
                "Kristoffers Landslag, innehållsligt ändrade flockar i förhållande til MEL",
                "Kristoffers Landslag, flockar direkt hämtade från MEL",
                "Kristoffers Landslag"
                ],
        },
        text_date: {label: "date"}
    }
};

var fsv_aldrelagar = {
    morf: 'fsvm',
    id: "fsv-aldrelagar",
    title: "Äldre lagar – Fornsvenska textbankens material",
    description: settings.fsvdescription,
    within: settings.defaultWithin,
    context: settings.spContext,
    attributes: {
        posset: settings.posset,
        lemma: settings.fsvlemma,
        lex: settings.fsvlex,
        variants: settings.fsvvariants
                },
    struct_attributes: {
        text_title: {
            label: "title",
            displayType: "select",
            localize: false,
            extended_template: selectType.extended_template,
            controller: selectType.controller,
            dataset: [
                "Yngre Västgötalagens äldsta fragment, Lydekini excerpter och anteckningar",
                "Tillägg till Upplandslagen, hskr A (Ups B 12)",
                "Södermannalagen, enligt Codex iuris Sudermannici",
                "Östgötalagen, fragment H, ur Kyrkobalken ur Skokloster Avdl I 145",
                "Yngre Västmannalagen, enl Holm B 57",
                "Vidhemsprästens anteckningar",
                "Magnus Erikssons Stadslag, exklusiva stadslagsflockar",
                "Södermannalagens additamenta, efter NKS 2237",
                "Hälsingelagen",
                "Yngre Västgötalagen, tillägg, enligt Holm B 58",
                "Östgötalagen, fragment C, ur Holm B 1709",
                "Yngre Västgötalagen, enligt Holm B 58",
                "Upplandslagen enl Schlyters utgåva och Codex Ups C 12, hskr A",
                "Skånelagen, enligt Holm B 76",
                "Östgötalagen, fragment D, ur Holm B 24",
                "Östgötalagen A, ur Holm B 50",
                "Äldre Västgötalagen",
                "Östgötalagen, fragment M, ur Holm B 196",
                "Gutalagen enligt Holm B 64",
                "Upplandslagen enligt Codex Holm B 199, Schlyters hskr B",
                "Smålandslagens kyrkobalk",
                "Dalalagen (Äldre Västmannalagen)",
                "Gutalagens additamenta enligt AM 54",
                "Bjärköarätten",
                "Magnus Erikssons Landslag",
                "Östgötalagen, fragment N, ur Köpenhamn AM 1056",
                "Södermannalagen stadsfästelse - Confirmatio, enligt NKS 2237",
                "Östgötalagen, fragment E, ur Ups B 22"
                            ],
        },
        text_date: {label: "date"}
    }
};

settings.common_struct_types = {
    date_interval: {
        label: "date_interval",
        displayType: "date_interval",
        opts: false,
        // FIXME: The localized values of "date_from" and "date_to"
        // are not changed immediately when changing the interface
        // language, but only after e.g. switching the search
        // attribute. How could that be made work? But neither are the
        // month and day-of-week names in the date picker itself
        // localized immediately. (Jyrki Niemi 2017-11-02)
        extended_template: '<div class="date_interval_arg_type"> <div class="section"> <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> <i class="fa fa-calendar"></i> {{"date_from" | loc:lang}} </button> {{combined.format("YYYY-MM-DD HH:mm")}} <time-interval ng-click="from_click($event)" class="date_interval popper_menu dropdown-menu" date-model="from_date" time-model="from_time" model="combined" min-date="minDate" max-date="maxDate"> </time-interval> </div> <div class="section"> <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> <i class="fa fa-calendar"></i> {{"date_to" | loc:lang}} </button> {{combined2.format("YYYY-MM-DD HH:mm")}} <time-interval ng-click="from_click($event)" class="date_interval popper_menu dropdown-menu" date-model="to_date" time-model="to_time" model="combined2" my="left top" at="right top" min-date="minDate" max-date="maxDate"> </time-interval> </div> </div>',
        controller: [
            "$scope", "searches", "$timeout", function($scope, searches, $timeout) {
                var cl, getTime, getYear, ref, ref1, ref2, s, updateIntervals;
                s = $scope;
                cl = settings.corpusListing;

                updateIntervals = function() {
                    var from, moments, ref, ref1, to;
                    moments = cl.getMomentInterval();
                    if (moments.length) {
                        return ref = _.invoke(moments, "toDate"), s.minDate = ref[0], s.maxDate = ref[1], ref;
                    } else {
                        ref1 = cl.getTimeInterval(), from = ref1[0], to = ref1[1];
                        s.minDate = moment(from.toString(), "YYYY").toDate();
                        return s.maxDate = moment(to.toString(), "YYYY").toDate();
                    }
                };

                s.$on("corpuschooserchange", function() {
                  return updateIntervals();
                });

                updateIntervals();

                s.from_click = function(event) {
                  event.originalEvent.preventDefault();
                  return event.originalEvent.stopPropagation();
                };

                getYear = function(val) {
                  return moment(val.toString(), "YYYYMMDD").toDate();
                };

                getTime = function(val) {
                  return moment(val.toString(), "HHmmss").toDate();
                };

                if (!s.model) {
                    s.from_date = s.minDate;
                    s.to_date = s.maxDate;
                    ref = _.invoke(cl.getMomentInterval(), "toDate"), s.from_time = ref[0], s.to_time = ref[1];
                } else if (s.model.length === 4) {
                    ref1 = _.map(s.model.slice(0, 3), getYear), s.from_date = ref1[0], s.to_date = ref1[1];
                    ref2 = _.map(s.model.slice(2), getTime), s.from_time = ref2[0], s.to_time = ref2[1];
                }
                return s.$watchGroup(["combined", "combined2"], function(arg) {
                    var combined, combined2;
                    combined = arg[0], combined2 = arg[1];
                    return s.model = [moment(s.from_date).format("YYYYMMDD"), moment(s.to_date).format("YYYYMMDD"), moment(s.from_time).format("HHmmss"), moment(s.to_time).format("HHmmss")];
                });
            }
        ]
    }
};


/*
 * Definitions specific to (or modified for) Kielipankki corpora
 */


var attrlist = {};   // List of positional attributes
var sattrlist = {};  // List of structural attributes

// TODO: Replace the corpus- or annotation-specific translationKeys in
// pos and deprel attributes with the generic pos_ and deprel_, so
// that the translations need not be specified twice in the
// translations files.

attrs.pos_ftb2 = {
    label: "pos",
    displayType: "select",
    translationKey: "posftb2_",
    dataset: {
	"A": "A",
	"Abbr": "Abbr",
	"Adp": "Adp",
	"Adv": "Adv",
	"CC": "CC",
	"Con": "Con",
	"CS": "CS",
	// "Interj|INTERJ": "Interj",
	"Interj": "Interj",
	// "N|Noun": "N",
	"N": "N",
	"Num": "Num",
	"POST": "POST",
	"Pron": "Pron",
	"Pun": "Pun",
	"V": "V"
    },
    opts: settings.liteOptions
};
/*
attrs.pos_ftb3 = {
    label: "pos",
    displayType: "select",
    translationKey: "posftb3_",
    dataset: {
	"A": "A",
	"Abbr": "Abbr",
	"Adp": "Adp",
	"Adp|Po": "Post",
	"Adv": "Adv",
	"Art": "Art",
	"CC": "CC",
	"Con|C": "Con",
	"CS": "CS",
	"Forgn": "Forgn",
	"Interj|INTERJ": "Interj",
	"N|Noun": "N",
	"Num": "Num",
	"Pron": "Pron",
	"PrfPrc": "PrfPrc",
	"PrsPrc": "PrsPrc",
	"Punct": "Punct",
	"V": "V",
	"[NON-TWOL]": "NonTWOL"
    },
    opts: settings.liteOptions
};
attrs.pos_ftb3_orig = {
    label: "pos_orig",
    translationKey: "posftb3_",
    dataset: {
	"A": "A",
	"Abbr": "Abbr",
	"Adp": "Adp",
	"Adp|Po": "Post",
	"Adv": "Adv",
	"Art": "Art",
	"CC": "CC",
	"Con|C": "Con",
	"CS": "CS",
	"Forgn": "Forgn",
	"Interj|INTERJ": "Interj",
	"N|Noun": "N",
	"Num": "Num",
	"Pron": "Pron",
	"PrfPrc": "PrfPrc",
	"PrsPrc": "PrsPrc",
	"Punct": "Punct",
	"V": "V",
	"[NON-TWOL]": "NonTWOL"
    },
    opts: settings.defaultOptions
};
*/
attrs.ner_tags = {
    label: "ner_tags",
    displayType: "select",
    translationKey: "ner_tags_",
    opts: settings.liteOptions,
    dataset: {
        "_": "_",
        // CQP gave an error if the values ended in /? instead of
        // [/]?.
        "/?EnamexLocGpl[/]?": "EnamexLocGpl",
        "/?EnamexLocPpl[/]?": "EnamexLocPpl",
        "/?EnamexLocStr[/]?": "EnamexLocStr",
        "/?EnamexLocXxx[/]?": "EnamexLocXxx",
        "/?EnamexOrgAth[/]?": "EnamexOrgAth",
        "/?EnamexOrgClt[/]?": "EnamexOrgClt",
        "/?EnamexOrgCrp[/]?": "EnamexOrgCrp",
        "/?EnamexOrgEdu[/]?": "EnamexOrgEdu",
        "/?EnamexOrgPlt[/]?": "EnamexOrgPlt",
        "/?EnamexOrgTvr[/]?": "EnamexOrgTvr",
        "/?EnamexPrsHum[/]?": "EnamexPrsHum",
        "/?EnamexPrsTit[/]?": "EnamexPrsTit",
        "/?NumexMsrCur[/]?": "NumexMsrCur",
        "/?NumexMsrXxx[/]?": "NumexMsrXxx",
        "/?TimexTmeDat[/]?": "TimexTmeDat",
    }
};


attrs.pos_ftb31 = {
    label: "pos",
    displayType: "select",
    translationKey: "posftb3_",
    dataset: {
	"A": "A",
	"Abbr": "Abbr",
	"Adp": "Adp",
	"Adv": "Adv",
	"AgPrc": "AgPrc",
	"CC": "CC",
	"CS": "CS",
	"Forgn": "Forgn",
	"Interj": "Interj",
	"N": "N",
	"NegPrc": "NegPrc",
	"Num": "Num",
	"PrfPrc": "PrfPrc",
	"Pron": "Pron",
	"PrsPrc": "PrsPrc",
	"Punct": "Punct",
	"TrunCo": "TrunCo",
	"Unkwn": "Unkwn",
	"V": "V"
    },
    opts: settings.liteOptions
};
attrs.pos_kotus = {
    label: "pos",
    displayType: "select",
    translationKey: "poskotus_",
    dataset: {
	// Some of the following POS codes might be coding errors in
	// the corpora (usually very few occurrences): CMPR, D, DA-US,
	// DA-UUS, DN-INEN, DN-LLINEN, DN-TON, DV-MA (?), DV-TTA,
	// FORGN, INTJ, P, PROP, REL, null (empty)
	"A": "A",
	"ABBR": "Abbr",
	"AD-A": "AdA",
	"ADV": "Adv",
	"A/N": "AN",
	"C": "Con",
	"CMPR": "Cmpr",
	"D": "D",
	"DA-US": "DaUs",
	"DA-UUS": "DaUus",
	"DN-INEN": "DnInen",
	"DN-LLINEN": "DnLlinen",
	"DN-TON": "DnTon",
	"DV-MA": "DvMa",
	"DV-TTA": "DvTta",
	"FORGN": "Forgn",
	"INTJ": "Interj",
	"N": "N",
	"NUM": "Num",
	"P": "P",
	"PCP1": "Pcp1",
	"PCP2": "Pcp2",
	"PP": "Pp",
	"PRON": "Pron",
	"PROP": "Prop",
	"PSP": "Post",
	"PUNCT": "Punct",
	"REFL/PRON": "ReflPron",
	"REL": "Rel",
	"#UNKNOWN": "Unknown",
	"V": "V",
	// null corresponds to an __UNDEF__ value in CWB, resulting
	// from an empty value in the VRT file.
	"null": "null"
    },
    opts: settings.liteOptions
};

attrs.pos_mulcold_fi = {
    label: "pos",
    displayType: "select",
    translationKey: "posmulcoldfi_",
    dataset: {
	"A": "A",
	"Abbr": "Abbr",
	"ADV": "Adv",
	"Aux": "Aux",
	"CC": "CC",
	"CS": "CS",
	"Heur": "Heur",
	"N": "N",
	"NUM": "Num",
	"POST": "Post",
	"PREP": "Prep",
	"PRON": "Pron",
	"pun": "Punct",
	"UNKNOWN": "UNKNOWN",
	"V": "V"
    },
    opts: settings.liteOptions
};
attrs.pos_mulcold_ru = {
    label: "pos",
    displayType: "select",
    translationKey: "posmulcoldru_",
    dataset: {
	"Adj": "Adj",
	"Adv": "Adv",
	"Conj": "Conj",
	"Gerund": "Gerund",
	"Interj": "Interj",
	"Noun": "Noun",
	"Numeral": "Numeral",
	"Part": "Part",
	"Particle": "Particle",
	"Predicative": "Predicative",
	"Preposition": "Preposition",
	"Pron": "Pron",
	"pun": "Punct",
	"UNKNOWN": "UNKNOWN",
	"Verb": "Verb"
    },
    opts: settings.liteOptions
};
attrs.pos_mulcold_en = {
    label: "pos",
    displayType: "select",
    translationKey: "posmulcolden_",
    dataset: {
	"A": "A",
	"ABBR": "ABBR",
	"ADV": "ADV",
	"CC": "CC",
	"CS": "CS",
	"DET": "DET",
	"EN": "EN",
	"Ex": "EX",
	"INFMARK": "INFMARK",
	"ING": "ING",
	"N": "N",
	"NEG-PART": "NEG-PART",
	"NUM": "NUM",
	"PREP": "PREP",
	"PRON": "PRON",
	"pun": "Punct",
	"Rel": "REL",
	"UNKNOWN": "UNKNOWN",
	"V": "V"
    },
    opts: settings.liteOptions
};
attrs.pos_mulcold_sv = {
    label: "pos",
    displayType: "select",
    translationKey: "posmulcoldsv_",
    dataset: {
	"A": "A",
	"ADV": "ADV",
	"CC": "CC",
	"CS": "CS",
	"DET": "DET",
	"N": "N",
	"NUM": "NUM",
	"PREP": "PREP",
	"PRON": "PRON",
	"pun": "Punct",
	"UNKNOWN": "UNKNOWN",
	"V": "V"
    },
    opts: settings.liteOptions
};

attrs.pos_uta_ru = {
    label: "pos",
    displayType: "select",
    translationKey: "pos_",
    opts: settings.liteOptions,
    dataset: {
	"-": "Punct",
	",": "Punct",
	":": "Punct",
	"'": "Punct",
	"\"": "Punct",
	"A": "A",
	"C": "C",
	"I": "Interj",
	"M": "Num",
	"N": "N",
	"P": "Pron",
	"Q": "Particle",
	"R": "Adv",
	"S": "Prep",
	"V": "V",
    },
};

attrs.pos_ud_fi = {
    label: "pos",
    displayType: "select",
    translationKey: "pos_",
    opts: settings.liteOptions,
    dataset: {
	"ADJ": "A",
	"ADP": "Adp",
	"ADV": "Adv",
	"AUX": "Aux",
	"CONJ": "C",
	"INTJ": "Interj",
	"NOUN": "N",
	"NUM": "Num",
	"PRON": "Pron",
	"PROPN": "Prop",
	"PUNCT": "Punct",
	"SCONJ": "CS",
	"SYM": "Symb",
	"VERB": "V",
	"X": "Other",
    },
};

attrs.pos_klk = {
    label: "pos",
    displayType: "select",
    translationKey: "pos_klk_",
    dataset: {
	"": "",
	"A": "A",
	"Adp": "Adp",
	"Adv": "Adv",
	"C": "C",
	"Foreign": "Foreign",
	"Interj": "Interj",
	"N": "N",
	"Num": "Num",
	"Pron": "Pron",
	"Punct": "Punct",
	"Symb": "Symb",
	"V": "V"
    },
    opts: settings.liteOptions
};

// TextMorfo parts of speech, used in FTC
attrs.pos_textmorfo = {
    label: "pos",
    displayType: "select",
    opts: settings.liteOptions,
    translationKey: "pos_",
    dataset: {
	"-|null": "Unknown",
	"Abbrev": "Abbr",
	"Adjective": "Adj",
	"Adjective-Noun|Adjective-No": "AdjNoun",
	"Adverb": "Adv",
	"Code": "Code",
	"CompPart": "CompPart",
	"Conjunction": "Conj",
	"Delimiter": "Punct",
	"Interjection": "Interj",
	"Noun": "Noun",
	"Noun-Noun": "NounNoun",
	"Numeral": "Num",
	"Preposition": "Prep",
	"Pronoun": "Pron",
	"Proper": "Prop",
	"Verb": "Verb",
    },
};

// SWECG parts of speech, used in FSTC and Svenska Parole
attrs.pos_swecg = {
    label: "pos",
    displayType: "select",
    opts: settings.liteOptions,
    localize: false,
    dataset: [
	"A",
	"ABBR",
	"ADV",
	"ADV/PREP",
	"A/N",
	"CC",
	"CLB",
	"DEF",
	"DER/-het",
	"DER/-nde",
	"DET",
	"GEN",
	"INDEF",
	"INFMARK",
	"INTERJ",
	"N",
	"NOM",
	"NUM",
	"PRB",
	"PREP",
	"PREPADV",
	"PRON",
	"SC",
	"UTRNEU",
	"V",
    ],
    // translationKey: "pos_",
    // // Some of the following values migt be errors
    // dataset: {
    // 	"A": "Adj",
    // 	"ABBR": "Abbr",
    // 	"ADV": "Adv",
    // 	"ADV/PREP": "Adv/Prep",
    // 	"A/N": "Adj/Noun",
    // 	"CC": "CC",
    // 	"CLB": "CLB",
    // 	"DEF": "DEF",
    // 	"DER/-het": "DER/-het",
    // 	"DER/-nde": "DER/-nde",
    // 	"DET": "DET",
    // 	"GEN": "GEN",
    // 	"INDEF": "INDEF",
    // 	"INFMARK": "INFMARK",
    // 	"INTERJ": "INTERJ",
    // 	"N": "N",
    // 	"NOM": "NOM",
    // 	"NUM": "NUM",
    // 	"PRB": "PRB",
    // 	"PREP": "PREP",
    // 	"PREPADV": "PREP/ADV",
    // 	"PRON": "PRON",
    // 	"SC": "CS",
    // 	"UTRNEU": "UTRNEU",
    // 	"V": "V",
    // 	"null": "Unknown",
    // },
};


attrs.msd = {
    label: "msd",
    opts: settings.defaultOptions,
    // Empty taginfo_url disables the info link to MSD tags in the
    // used sidebar; another value would link to the given URL; and an
    // undefined value would link to the default markup/msd.html.
    taginfo_url: "",
    // Add a zero-width space character after each vertical bar to
    // allow breaking the line there in the sidebar.
    transform: function(val) {
	return val.replace(/\|/g, "|\u200b");
    }
};
attrs.baseform = {
    label: "baseform",
    // type: "set",
    // displayType: "autocomplete",
    stringify: function(baseform) {
        return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts: settings.defaultOptions,
};
attrs.baseform_ftb2 = {
    label: "baseform",
    // type: "set",
    // displayType: "autocomplete",
    stringify: function(baseform) {
        return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts: settings.defaultOptions
};
attrs.baseform_compound = {
    label: "baseform_compound",
    // type: "set",
    // displayType: "autocomplete",
    stringify: function(baseform) {
        return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts: settings.defaultOptions
};

attrs.lemgram_hidden = {
    label: "lemgram",
    type: "set",    // Seems to work only if this is "set" even if "hidden"
    displayType: "hidden",
    // opts: settings.liteOptions
};
attrs.deprel_ftb2 = {
    label: "deprel",
    displayType: "select",
    translationKey: "deprelftb2_",
    opts: settings.liteOptions,
    dataset: {
	"advl": "advl",
	"attr": "attr",
	"aux": "aux",
	"comp": "comp",
	"conjunct": "conjunct",
	// "idiom|idom": "idiom",
	"idiom": "idiom",
	"main": "main",
	"mod": "mod",
	"modal": "modal",
	"obj": "obj",
	"phrm": "phrm",
	"phrv": "phrv",
	"scomp": "scomp",
	"subj": "subj",
	"voc": "voc",
	"_": "_",
    }
};
attrs.deprel_tdt = {
    label: "deprel",
    displayType: "select",
    translationKey: "deprel_tdt_",
    opts: settings.liteOptions,
    dataset: {
	"_": "_",
	"acomp": "acomp",
	"adpos": "adpos",
	"advcl": "advcl",
	"advmod": "advmod",
	"amod": "amod",
	"appos": "appos",
	"arg": "arg",
	"aux": "aux",
	"auxpass": "auxpass",
	"cc": "cc",
	"ccomp": "ccomp",
	"comp": "comp",
	"compar": "compar",
	"comparator": "comparator",
	"complm": "complm",
	"conj": "conj",
	"cop": "cop",
	"csubj": "csubj",
	"csubj-cop": "csubj-cop",
	"dep": "dep",
	"det": "det",
	"dobj": "dobj",
	"ellipsis": "ellipsis",
	"gobj": "gobj",
	"gsubj": "gsubj",
	"iccomp": "iccomp",
	"infmod": "infmod",
	"intj": "intj",
	"mark": "mark",
	"mod": "mod",
	"name": "name",
	"neg": "neg",
	"nn": "nn",
	"nommod": "nommod",
	"nommod-own": "nommod-own",
	"nsubj": "nsubj",
	"nsubj-cop": "nsubj-cop",
	"num": "num",
	"number": "number",
	"parataxis": "parataxis",
	"partmod": "partmod",
	"poss": "poss",
	"preconj": "preconj",
	"prt": "prt",
	"punct": "punct",
	"quantmod": "quantmod",
	"rcmod": "rcmod",
	"rel": "rel",
	"ROOT": "ROOT",
	"subj": "subj",
	"voc": "voc",
	"xcomp": "xcomp",
	"xsubj": "xsubj",
	"xsubj-cop": "xsubj-cop"
    }
};
attrs.deprel_ud_fi = {
    label: "deprel",
    displayType: "select",
    translationKey: "deprel_",
    opts: settings.liteOptions,
    dataset: {
	"_": "_",
	"acl": "acl",
	"acl:relcl": "rcmod",
	"advcl": "advcl",
	"advmod": "advmod",
	"amod": "amod",
	"appos": "appos",
	"aux": "aux",
	"auxpass": "auxpass",
	"case": "adpos",
	"cc": "cc",
	"ccomp": "ccomp",
	"cc:preconj": "preconj",
	"compound": "compound",
	"compound:nn": "nn",
	"compound:prt": "prt",
	"conj": "conj",
	"cop": "cop",
	"csubj": "csubj",
	"csubj:cop": "csubj-cop",
	"dep": "dep",
	"det": "det",
	"discourse": "discourse",
	"dobj": "dobj",
	"goeswith": "goeswith",
	"mark": "mark",
	"mwe": "mwe",
	"name": "name",
	"neg": "neg",
	"nmod": "nommod",
	"nmod:gobj": "gobj",
	"nmod:gsubj": "gsubj",
	"nmod:own": "nommod-own",
	"nmod:poss": "poss",
	"nsubj": "nsubj",
	"nsubj:cop": "nsubj-cop",
	"nummod": "num",
	"parataxis": "parataxis",
	"punct": "punct",
	"remnant": "remnant",
	"rel": "rel",
	"root": "ROOT",
	"vocative": "voc",
	"xcomp": "xcomp",
	"xcomp:ds": "xcomp:ds",
    }
};
attrs.deprel_uta_ru = {
    label: "deprel",
    displayType: "select",
    localize: false,
    opts: settings.liteOptions,
    dataset: [
	"1-компл",
	"1-несобст-компл",
	"2-компл",
	"2-несобст-компл",
	"3-компл",
	"3-несобст-компл",
	"4-компл",
	"5-компл",
	"PUNC",
	"ROOT",
	"fictit",
	"агент",
	"аддит",
	"аналит",
	"аппоз",
	"аппрокс-колич",
	"атриб",
	"вводн",
	"вспом",
	"дат-субъект",
	"дистанц",
	"длительн",
	"изъясн",
	"инф-союзн",
	"квазиагент",
	"колич-вспом",
	"колич-копред",
	"колич-огран",
	"количест",
	"ком-сочин",
	"компл-аппоз",
	"композ",
	"композ-аппоз",
	"кратн",
	"кратно-длительн",
	"неакт-компл",
	"несобст-агент",
	"ном-аппоз",
	"нум-аппоз",
	"об-аппоз",
	"об-копр",
	"обст",
	"обст-тавт",
	"огранич",
	"оп-аппоз",
	"оп-опред",
	"опред",
	"пасс-анал",
	"подч-союзн",
	"предик",
	"предл",
	"презентат",
	"примыкат",
	"присвяз",
	"пролепт",
	"разъяснит",
	"распред",
	"релят",
	"сент-предик",
	"сент-соч",
	"соотнос",
	"соч-союзн",
	"сочин",
	"сравн-союзн",
	"сравнит",
	"суб-копр",
	"суб-обст",
	"уточн",
	"эксплет",
	"электив",
	"эллипт",
    ],
};

attrs.text = {
    label: "text"
};
attrs.spoken = {
    label: "spoken",
    opts: settings.defaultOptions
};
attrs.origword = {
    label: "word_orig",
    opts: settings.defaultOptions
};
attrs.tildeword = {
    label: "word_tilde",
    opts: settings.defaultOptions
};
attrs.complword = {
    label: "word_completed",
    opts: settings.defaultOptions
};
attrs.id_hidden = {
    label: "id",
    displayType: "hidden",
    opts: settings.defaultOptions
};
attrs.ambiguous_lemma = {
    label: "ambiguous_lemma",
    type: "set",
    opts: settings.setOptions
};
attrs.ambiguous_pos = {
    label: "ambiguous_pos",
    type: "set",
    opts: settings.setOptions
};
attrs.ambiguous_msd = {
    label: "ambiguous_msd",
    type: "set",
    opts: settings.setOptions
};

var mulcold_pos_langs = ["fi", "ru", "en", "sv"];
for (var i = 0; i < mulcold_pos_langs.length; i++) {
    var lang = mulcold_pos_langs[i];
    attrs["ambiguous_pos_mulcold_" + lang] = $.extend(
	true, {}, attrs["pos_mulcold_" + lang], attrs.ambiguous_pos);
}
delete mulcold_pos_langs;

attrs.wordtype = {
    label: "type",
    displayType: "select",
    translationKey: "topling_",
    dataset: {
	"text": "text",
	"to": "to",
	"from": "from",
	"comment": "comment",
	"subject": "subject"
    },
    opts: settings.defaultOptions
};

// Name attributes for corpora tagged with (Fi)NER.
//
// The attributes ne_* are intra-sentence structural attributes that
// are shown in Korp as token attributes, shown only for the tokens
// within an ne structure (isStructAttr: true). This approach is
// borrowed from Språkbanken but with a couple of additional
// attributes.

// FiNER name types
attrs.ne_type_fi = {
    label: "ne_type",
    displayType: "select",
    translationKey: "ne_type_",
    isStructAttr: true,
    dataset: [
	"LOC",
	"PRS",
	"ORG",
	// "EVN",
	// "WRK",
	// "OBJ",
	"MSR",
	"TME"
   ]
};
// FiNER name subtypes
attrs.ne_subtype_fi = {
    label: "ne_subtype",
    displayType: "select",
    translationKey: "ne_subtype_",
    isStructAttr: true,
    dataset: [
	"ATH",
	"CLT",
	"CRP",
	"CUR",
	"DAT",
	"EDU",
	"GPL",
	"HUM",
	"PLT",
	"PPL",
	"STR",
	"TIT",
	"TVR",
	"XXX",
   ],
};
// FiNER full name types: expression category, type, subtype
attrs.ne_fulltype_fi = {
    label: "ne_fulltype",
    displayType: "select",
    translationKey: "namecat_",
    isStructAttr: true,
    dataset: [
	"EnamexPrsHum",
	"EnamexPrsTit",
	"EnamexLocXxx",
	"EnamexLocGpl",
	"EnamexLocPpl",
	"EnamexLocStr",
	"EnamexOrgAth",
	"EnamexOrgClt",
	"EnamexOrgCrp",
	"EnamexOrgEdu",
	"EnamexOrgPlt",
	"EnamexOrgTvr",
	"NumexMsrCur",
	"NumexMsrXxx",
	"TimexTmeDat",
    ],
};
// The name (tokens) within the ne structure
attrs.ne_name = {
    label: "ne_name",
    isStructAttr: true,
};
// If the name is a place name, it is repeated here. This attribute
// can represent place name information obtained from NER, POS tags or
// metadata, as indicated by ne_placename_source below.
attrs.ne_placename = {
    label: "ne_placename",
    isStructAttr: true,
};
// The source of the place name information.
attrs.ne_placename_source = {
    label: "ne_placename_source",
    displayType: "select",
    translationKey: "placename_source_",
    dataset: [
	"ner",
	"pos",
	"meta",
    ],
    isStructAttr: true,
};
// The raw (Fi)NER tag as a positional attriute
attrs.ner_rawtag = {
    label: "ner_tag_raw",
    displayType: "hidden",
};
// The B-I-O status of token as a positional attribute: Beginning a
// name, Inside a name and Outside a name
attrs.ner_bio = {
    label: "ner_bio",
    displayType: "select",
    translationKey: "ner_bio_",
    dataset: [
	"B",
	"I",
	"O",
    ],
};

// Common name attributes for (Fi)NER-tagged corpora

attrlist.standard = {
    lemma: attrs.baseform,
    pos: attrs.pos_klk,
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel_tdt,
    ref: attrs.ref,
    nertag: attrs.ner_tags
};

attrlist.finer = {
    ne_name: attrs.ne_name,
    ne_ex: attrs.ne_ex,
    ne_type: attrs.ne_type_fi,
    ne_subtype: attrs.ne_subtype_fi,
    ne_fulltype: attrs.ne_fulltype_fi,
    ne_placename: attrs.ne_placename,
    ne_placename_source: attrs.ne_placename_source,
    nertag: attrs.ner_rawtag,
    nerbio: attrs.ner_bio,
};

settings.corpus_features.finer = {
    attributes: attrlist.finer,
};

// An attribute not to be shown in Korp but included for documentation
// purposes.
attrs.hidden = {
    displayType: "hidden",
};
sattrs.hidden = attrs.hidden;

sattrs.text_title = {
    label: "title"
};
sattrs.title = sattrs.text_title;
sattrs.text_distributor = {
    label: "text_distributor",
    displayType: "hidden"
};
sattrs.text_source = {
    label: "text_source"
};

sattrs.text_published = {
    label: "text_pubdate2"
};

sattrs.author = {
    label: "author"
};
sattrs.author_birthyear = {
    label: "author_birthyear"
};
sattrs.author_deathyear = {
    label: "author_deathyear"
};

sattrs.publ_year = {
    label: "year_published"
};

sattrs.fulltext_url = {
    label: "fulltext_url",
    type: "url"
};
sattrs.original_url = {
    label: "original_url",
    type: "url"
};
sattrs.context_url = {
    label: "context_url",
    type: "url"
};

// Options for URL attributes to be shown as separate links in the
// search result sidebar; to be used as the value of attribute
// property url_opts.
sattrs.link_url_opts = {
    // Show the the link in a separate link section
    in_link_section: true,
    // Hide the URL and use the attribute label as the link text
    hide_url: true,
    // Open the link in a new window (or tab)
    new_window: true,
};

sattrs.link_fulltext = {
    label: "show_fulltext",
    type: "url",
    url_opts: sattrs.link_url_opts
};
sattrs.link_original = {
    label: "show_original",
    type: "url",
    url_opts: sattrs.link_url_opts
};
sattrs.link_fulltext_context = {
    label: "show_fulltext_context",
    type: "url",
    url_opts: sattrs.link_url_opts
};
sattrs.link_prefixed = function (label, url_prefix) {
    return {
	label: label,
	type: "url",
	url_opts: sattrs.link_url_opts,
	url_prefix: url_prefix
    };
};
sattrs.link_show_video_prefixed = function (url_prefix) {
    return sattrs.link_prefixed("show_video", url_prefix);
};
sattrs.link_show_video_annex = sattrs.link_show_video_prefixed(
    "https://lat.csc.fi/ds/annex/runLoader?viewType=timeline&");

sattrs.link_gutenberg = {
    label: "show_gutenberg",
    type: "url",
    url_opts: sattrs.link_url_opts
};

sattrs.text_link_gutenberg = {
    label: "show_gutenberg_text",
    type: "url",
    url_opts: sattrs.link_url_opts
};

sattrs.sentence_type = {
    label: "sentence_type",
    displayType: "select",
    translationKey: "klassikot_",
    dataset: {
	"text": "text",
	"head": "head",
	"stanza": "stanza",
	"speaker": "speaker",
	"stage": "stage"
    }
};


sattrs.sentence_id_hidden = {
    label: "sentence_id",
    displayType: "hidden"
};
sattrs.sentence_id = {
    label: "sentence_id"
};
sattrs.sentence_n = {
    label: "sentence_n"
};
sattrs.paragraph_id_hidden = {
    label: "paragraph_id",
    displayType: "hidden"
};
sattrs.paragraph_id = {
    label: "paragraph_id"
};

sattrs.text_time = {
    label: "text_time"
};

sattrs.paragraph_type = {
    label: "paragraph_type"
};

// Text genre values specifically for Mikhail Mikhailov's (UTA)
// corpora (MULCOLD, FiRuLex, ParFin, ParRus)
sattrs.mikhailov_text_genre = {
    label: "text_genre",
    displayType: "select",
    translationKey: "textgenre_",
    dataset: {
	"fiction": "fiction",
	"law": "law",
    },
    opts: settings.liteOptions
};

sattrs.text_author = {
    label: "author"
};

sattrs.article_author = {
    label: "article_author"
};

sattrs.text_producers = {
    label: "text_producers"
};

sattrs.text_ebook_id = {
    label: "text_ebook_id"
};

sattrs.text_translator = {
    label: "text_translator"
};

sattrs.text_publ_place = {
    label: "publication_place"
};

sattrs.filename = {
    label: "file_name"
};

sattrs.year = {
    label: "year"
};

sattrs.month = {
    label: "month"
};

sattrs.day_of_month = {
    label: "day"
};

/* KFSCP --- */

sattrs.text_pubdate = {
    label: "publication_date"
};

sattrs.text_publisher = {
    label: "publisher"
};

/* LEHDET */

sattrs.link_lehdet = {
    label: "link_to_original",
    type: "url",
    url_opts: sattrs.link_url_opts
};

/* ORACC */

sattrlist.oracc = {
    text_provenance: {
        label: "oracc_provenance",
    },
    text_period: {
        label: "oracc_period",
    },
    text_genre: {
        label: "oracc_genre"
    },
    text_url: {
        url_opts: sattrs.link_url_opts,
        label: "oracc_url",
        type: "url"
    },
    sentence_line: {
        label: "oracc_line",
    },
    sentence_translation: {
        label: "oracc_sent_translation"
    }
};

/* ORACC */
attrlist.oracc = {
    lemma: attrs.baseform,
    ltrans:  {
	label: "oracc_lemmatrans"
    },
    transcription: {
	label: "oracc_transcription"
    },
    pos: {
	label: "pos",
	displayType: "select",
	translationKey: "oracc_pos_",
	dataset: {},
	opts: settings.liteOptions
    },
    sense: {
	label: "oracc_sense"
	},
    sensepos: {
        label: "oracc_sensepos",
        displayType: "select",
        translationKey: "oracc_pos_",
        dataset: {},
        opts: settings.liteOptions
    },
    cuneiform: {
        label: "oracc_cuneiform"
    },
    ref: {
        label: "oracc_ref"
    },
    lang: {
        label: "oracc_lang",
        displayType: "select",
        translationKey: "oracc_lang_",
        dataset: {},
        opts: settings.liteOptions
    },
    asciitranslitt: {
        label: "oracc_asciixlit"
    },
    asciitranscript: {
        label: "oracc_asciixcrip"
    },
    asciilemma: {
        label: "oracc_asciilemma"
    }
};

/* E-thesis */

sattrlist.ethesis = {
    text_title: {
        label: "text_title"
    },
    text_date: {
        label: "text_date"
    },
    text_keywords: {
        label: "text_keywords"
    },
    text_faculty: {
        label: "text_faculty"
    },
    text_subject: {
        label: "text_subject"
    },
    text_type: {
        label: "text_dissertationtype"
    },
    /*
    text_lang: {
        label: "text_lang",
        displayType: "select",
        translationKey: "ftb3_europarl_language_",
        dataset: {
            "fi": "fi",
            "sv": "sv",
            "es": "es",
            "en": "en",
            "ru": "ru"
        },
        opts: settings.liteOptions
    },
    */
    text_url: {
        label: "text_abslink",
        type: "url",
        url_opts: sattrs.link_url_opts
    }
};




/* VNSK */

sattrlist.vnsk = {
    text_title: sattrs.text_title,
    text_distributor: sattrs.text_distributor,
    text_source: sattrs.text_source,
    paragraph_id: sattrs.paragraph_id,
    paragraph_type: sattrs.paragraph_type,
    sentence_id: sattrs.sentence_id_hidden,
    sentence_n: sattrs.sentence_n
};

/* FINSTUD */

sattrlist.finstud = {
    sentence_id: sattrs.sentence_id_hidden,
    text_textnumber: {
        label: "studentsvenska_textnumber"
    },
    text_gradeexam: {
        label: "studentsvenska_gradeexam"
    },
    text_subject: {
        label: "studentsvenska_subject"
    }
};

attrlist.finstud = {
    code: {
        label: "studentsvenska_code",
        opts: settings.defaultOptions
    },
    properties: {
        label: "studentsvenska_properties",
        opts: settings.defaultOptions
    }
};


/* BESERCORP */
attrlist.besercorp = {
    msd: attrs.msd,
    gloss: {
        label: "gloss_ru"
    },
    lex: {
        label: "lex"
    }
};

/* STUDENTSVENSKA */

attrlist.studentsvenska = {
    lemma: attrs.baseform,
    code: {
        label: "studentsvenska_code",
        opts: settings.defaultOptions
    },
    properties: {
        label: "studentsvenska_properties",
        opts: settings.defaultOptions
    }


};

sattrlist.studentsvenska = {
    sentence_id: sattrs.sentence_id_hidden,
    text_textnumber: {
        label: "studentsvenska_textnumber"
    },
    text_gradeteacher: {
        label: "studentsvenska_gradeteacher"
    },
    text_gradeexam: {
        label: "studentsvenska_gradeexam"
    },
    text_gradeword: {
        label: "studentsvenska_gradeword"
    },
    text_schoolnumber: {
        label: "studentsvenska_schoolnumber"
    },
    text_errorother: {
        label: "studentsvenska_errorother"
    },
    text_gender: {
        label: "studentsvenska_gender"
    },
    text_gradegrammar: {
        label: "studentsvenska_gradegrammar"
    },
    text_errorwordorder: {
        label: "studentsvenska_errorwordorder"
    },
    text_subject: {
        label: "studentsvenska_subject"
    }
};



// Common positional attributes for corpora parsed with the Turku
// Dependency Treebank parser (with lemgrams and lemmas without
// compound boundaries added)
attrlist.parsed_tdt = {
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_klk,
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel_tdt,
    ref: attrs.ref,
    lex: attrs.lemgram_hidden,
};

settings.corpus_features.parsed_tdt = {
    attributes: attrlist.parsed_tdt,
};

// Corpora parsed with TDT and run through FiNER
attrlist.parsed_tdt_ner =
    $.extend({}, attrlist.parsed_tdt, {
	nertag: attrs.ner_tags
    });

/* --------- */


// Recurring corpus licence information (name + URL)
settings.licenceinfo = {
    CC0: {
	name: "CC ZERO (CC0) (CLARIN PUB)",
	description: "Public Domain Dedication",
	url: "http://creativecommons.org/publicdomain/zero/1.0/",
    },
    CC_BY: {
	name: "CC BY (CLARIN PUB)",
	description: "Creative Commons Attribution",
	url: "https://creativecommons.org/licenses/by/4.0/",
    },
    CC_BY_30: {
	name: "CC BY 3.0 (CLARIN PUB)",
	description: "Creative Commons Attribution 3.0",
	url: "https://creativecommons.org/licenses/by/3.0/",
    },
    CC_BY_40: {
	name: "CC BY 4.0 (CLARIN PUB)",
	description: "Creative Commons Attribution",
	url: "https://creativecommons.org/licenses/by/4.0/",
    },
    CC_BY_NC: {
	name: "CC BY-NC (CLARIN PUB)",
	description: "Creative Commons Attribution-NonCommercial",
	url: "https://creativecommons.org/licenses/by-nc/4.0/",
    },
    CC_BY_ND: {
	name: "CC BY-ND (CLARIN PUB)",
	description: "Creative Commons Attribution-NoDerivatives",
	url: "https://creativecommons.org/licenses/by-nd/4.0/",
    },
    CC_BY_ND_40: {
	name: "CC BY-ND 4.0 (CLARIN PUB)",
	description: "Creative Commons Attribution-NoDerivatives 4.0",
	url: "https://creativecommons.org/licenses/by-nd/4.0/",
    },
    EUPL_11: {
	name: "EUPL v1.1 (CLARIN PUB)",
	description: "European Union Public Licence, version 1.1",
	url: "http://ec.europa.eu/idabc/en/document/7774.html",
	// An alternative URL:
	// url: "https://joinup.ec.europa.eu/community/eupl/og_page/european-union-public-licence-eupl-v11",
    },
    ParFinRus_2016_fi: {
	name: "CLARIN RES +NC +INF +ND 1.0",
	urn: "urn:nbn:fi:lb-2017020611",
    },
    ParFinRus_2016_en: {
	name: "CLARIN RES +NC +INF +ND 1.0",
	urn: "urn:nbn:fi:lb-2017020612",
    },
    ACA_NC: {
	name: "CLARIN ACA +NC",
	description: "CLARIN ACA (Academic) End-User License 1.0, Non-commercial",
	url: "https://kitwiki.csc.fi/twiki/bin/view/FinCLARIN/ClarinEulaAca?NC=1",
    }
};


// Homepage in Kotus's Kaino service
settings.fn.kaino_homepage = function(urlbase) {
    return {
        name: "Kokoelman etusivu",
        url: "http://kaino.kotus.fi/korpus/" + urlbase + "_coll_rdf.xml",
        no_label: true
    };
};


// An array of properties of corpus attributes to be added based on
// other properties. Each element is an object with the properties
// "test" (a function returning true for the attribute object if the
// extra properties should be added) and "props" (an object containing
// the extra properties to be added).
settings.attr_extra_properties = [
    {
	// If displayType == "select", add properties
	// extended_template and controller.
	test: function (attr) {
	    return "displayType" in attr && attr.displayType == "select";
	},
	props: {
	    extended_template: selectType.extended_template,
	    controller: selectType.controller
	}
    }
];


/*
 * Generic functions
 *
 * These could perhaps be moved to util.coffee or to a script file of
 * their own.
 */


// Add corpus settings using a template, modified with items in
// infolist, added to folder, with the id prefixed with id_prefix.
settings.fn.add_corpus_settings = function (template, infolist, folder,
					    id_prefix) {
    var ids = [];
    for (var i = 0; i < infolist.length; i++) {
	var info = infolist[i];
	var id = id_prefix + info.id;
	// Make a deep copy so that the resulting objects can be
	// safely modified independently of each other if necessary.
	settings.corpora[id] = $.extend(true, {}, template);
	$.extend(settings.corpora[id], info);
	settings.corpora[id].id = id;
	ids.push(id);
    }
    if (folder != null) {
	if (! ("contents" in folder)) {
	    folder.contents = [];
	}
	folder.contents = folder.contents.concat(ids);
    }
};

// Add properties to the settings of the listed corpora.
settings.fn.extend_corpus_settings = function (props, corpus_ids) {
    for (var i = 0; i < corpus_ids.length; i++) {
	$.extend(true, settings.corpora[corpus_ids[i]], props);
    }
};

// Recursively create a corpus folder hierarchy under parent_folder
// and the configurations for its corpora. The hierarchy is specified
// in subfolder_tree, and options control how the data is mapped to
// the configuration. The function returns an object with the
// properties id (folder or corpus id) and data (folder or corpus
// configuration object).
//
// The subfolder_tree is an array of the format:
// [[ folder1_data, [[ subfolder11_data, [ corpus111_data, corpus112_data ]],
//                   [ subfolder12_data, [ corpus121_data, corpus122_data ]]],
// [[ folder2_data, [ corpus21_data, corpus22_data, corpus23_data ]]]
// Folder and corpus data may be an object containing the essential
// properties for the item, or one to four array elements, the last of
// which may be a composite object and the preceding ones strings. The
// strings are the (base) values for the properties id, title and
// description. These values will be modified as specified in options.
// If one is not specified, the previous one is used. The possible
// final composite object is used to override other properties in the
// configuration template specified in options.
//
// options is an object that may contain the following properties:
// - folder_template, corpus_template: An object to be used as the
//   base configuration properties for folders and corpora,
//   respectively (default: {})
// - ({folder,corpus}_){id,title,description}_{prefix,suffix}: A
//   string to be prefixed or suffixed to the id, title or description
//   of folders and/or corpora (default: empty)
// - make_{folder,corpus}_{id,title,description}: A function to use to
//   make the id, title or description of a folder or corpus;
//   arguments info (the folder or corpus data in subfolder_tree),
//   parent_folder (settings.corporafolders subobject),
//   ancestor_folder_ids (an array of strings containing the ancestor
//   folder ids from the top to the parent); should return a string.
//   The function is used in preference to the prefix and suffix
//   properties above
//
// TODO: Would this function be better in the util module? Or maybe a
// separate util_config?

settings.fn.make_folder_hierarchy = function (parent_folder, subfolder_tree,
					      options) {

    // Return a function for making the folder or corpus (depending on
    // the argumet "type") config object with the given options.
    function get_make_info_fn (type, options) {
	var info_strings = ["id", "title", "description"];
	return function (info, parent_folder, ancestor_folder_ids) {
	    var result = {};
	    result.data = $.extend(true, {}, options[type + "_template"] || {});
	    var last_infoitem = info[info.length - 1];
	    var last_stringinfo_nr = info.length - 1;
	    if (typeof last_infoitem != "string") {
		result.data = $.extend(true, result.data, last_infoitem);
		last_stringinfo_nr--;
	    }
	    for (var itemnr = 0; itemnr < info_strings.length; itemnr++) {
		var infostr = info_strings[itemnr];
		var make_fn = options["make_" + type + "_" + infostr];
		if (make_fn) {
		    result.data[infostr] = make_fn (info, parent_folder,
						    ancestor_folder_ids)
		} else {
		    info_itemnr = (itemnr <= last_stringinfo_nr
				   ? itemnr : last_stringinfo_nr);
		    result.data[infostr] =
			(options[type + "_" + infostr + "_prefix"]
			 || options[infostr + "_prefix"] || "")
			+ info[info_itemnr]
			+ (options[type + "_" + infostr + "_suffix"]
			   || options[infostr + "_suffix"] || "");
		}
	    }
	    result.id = result.data.id;
	    if (type == "folder") {
		delete result.data.id;
	    }
	    // c.log('folder hierarchy:', type, parent_folder, info, '->', result);
	    return result;
	}
    }

    var make_folder_fn = options.make_folder || get_make_info_fn("folder",
								 options);
    var make_corpus_fn = options.make_corpus || get_make_info_fn("corpus",
								 options);
    var ancestor_ids = (arguments.length > 3 ? arguments[3] : []);
    for (var i = 0; i < subfolder_tree.length; i++) {
	var subfolder_info = subfolder_tree[i];
	var subsubfolders = subfolder_info[subfolder_info.length - 1];
	if (_.isArray(subsubfolders) && subsubfolders.length) {
	    var folder_info = make_folder_fn(subfolder_info.slice(0, -1),
					     parent_folder, ancestor_ids)
	    var subfolder = folder_info.data;
	    parent_folder[folder_info.id] = subfolder;
	    settings.fn.make_folder_hierarchy(
		subfolder, subsubfolders, options,
		ancestor_ids.concat([folder_info.id]));
	} else {
	    var corpus_info = $.extend(
		true, {}, make_corpus_fn(subfolder_info, parent_folder,
					 ancestor_ids));
	    if (! ("contents" in parent_folder)) {
		parent_folder.contents = [];
	    }
	    parent_folder.contents
		= parent_folder.contents.concat([corpus_info.id]);
	    settings.corpora[corpus_info.id] = corpus_info.data;
	}
    }
};




// Functions used for constructing settings.corpora and
// settings.corporafolders for corpora split by year; used for KLK
// (both fi and sv).


// Construct a list of years from start to end, years in opts.omit
// omitted, descending if opts.descending
settings.fn.make_yearlist = function(start, end, opts)
{
    var omit = [];
    var descending = false;
    var result = [];
    if (typeof opts !== 'undefined') {
	if ('descending' in opts) {
	    descending = opts.descending;
	}
	if ('omit' in opts) {
	    omit = opts.omit;
	}
    }
    for (var year = start; year <= end; year++) {
	if (omit.indexOf(year) == -1) {
	    result.push(year);
	}
    }
    if (descending) {
	result.reverse();
    }
    return result;
}

// Construct corpus settings by year and corpus folder settings by
// decade
settings.fn.make_corpus_settings_by_year_decade = function(
    folder_parent, folder_name_format, corpus_name_format,
    make_folder_settings_fn, make_corpus_settings_fn, yearlist)
{
    var decade = 0;
    var prev_decade = 0;
    var contents = [];

    function make_decade(decade) {
	if (contents) {
	    var folder_name = folder_name_format.replace("{decade}",
							 decade.toString());
	    folder_parent[folder_name] = make_folder_settings_fn(decade);
	    folder_parent[folder_name]["contents"] = contents;
	}
    }

    for (var yearnum = 0; yearnum < yearlist.length; yearnum++) {
	var year = yearlist[yearnum];
	decade = Math.floor(year / 10) * 10;
	if (decade != prev_decade && prev_decade != 0) {
	    make_decade(prev_decade);
	    contents = [];
	}
	var corpus_name = corpus_name_format.replace("{year}",
						      year.toString());
	contents.push(corpus_name);
	settings.corpora[corpus_name] = make_corpus_settings_fn(year,
								corpus_name);
	settings.corpora[corpus_name]["id"] = corpus_name;
	prev_decade = decade;
    }
    make_decade(prev_decade);
};


// Construct settings contents for a single KLK corpus
settings.fn.make_klk_corpus_settings = function(
    title_format, descr_format, lang, year, parsed)
{
    var year_str = year.toString();
    var ctx_type = (year <= 1911 ? "sp" : "default");
    var attrs_key = ("klk_" + lang + (parsed ? "_parsed" : "")
		     + (year <= 1910 ? "_pagelinks" : ""));
    return {
	title: title_format.replace("{year}", year_str),
	description: descr_format.replace("{year}", year_str),
	within: settings[ctx_type + "Within"],
	context: settings[ctx_type + "Context"],
	attributes: attrlist[attrs_key],
	struct_attributes: sattrlist[attrs_key]
    };
}
