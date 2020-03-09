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
    CC_BY_NC_ND: {
	name: "CC BY-NC-ND (CLARIN PUB)",
	description: "Creative Commons Attribution-NonCommercial-NoDerivatives",
	url: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    },
    CC_BY_NC_ND_40: {
	name: "CC BY-NC-ND 4.0 (CLARIN PUB)",
	description: "Creative Commons Attribution-NonCommercial-NoDerivatives 4.0",
	url: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    },
    CC_BY_SA_30: {
	name: "CC BY-SA 3.0 (CLARIN PUB)",
	description: "Creative Commons Attribution-ShareAlike",
	url: "https://creativecommons.org/licenses/by-sa/3.0/",
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
    },
    Ylenews_sv_en: {
	name: "CLARIN ACA +NC 1.0",
	urn: "urn:nbn:fi:lb-2019120401",
    },
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
sattrs.time = {
    label: "time"
};
sattrs.datetime = {
    label: "timestamp",
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

attrs.namecat_omorfi = {
    label: "name_category_omorfi",
    type: "set",
    displayType: "select",
    translationKey: "namecat_omorfi_",
    dataset: [
	"ARTWORK",
	"CULTGRP",
	"FIRST",
	"GEO",
	"LAST",
	"MISC",
	"ORG",
	"PRODUCT",
	"_",
    ],
    opts: settings.setOptions,
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

attrs.pos_ud2_universal = {
    label: "pos",
    displayType: "select",
    translationKey: "pos_",
    dataset: {
	"ADJ": "A",
	"ADP": "Adp",
	"ADV": "Adv",
	"AUX": "Aux",
	"CCONJ": "CC",
	"DET": "DT",
	"INTJ": "Interj",
	"NOUN": "N",
	"NUM": "Num",
	"PART": "PL",
	"PRON": "Pron",
	"PROPN": "Prop",
	"PUNCT": "Punct",
	"SCONJ": "CS",
	"SYM": "Symb",
	"VERB": "V",
	"X": "Other",
    },
};

attrs.pos_ud2_fi = {
    label: "pos",
    displayType: "select",
    translationKey: "pos_",
    dataset: {
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
    // Add a <wbr> tag after each vertical bar to allow breaking the
    // line there in the sidebar, while retaining the ability to copy
    // and paste to a further search expression (unlike if we added a
    // zero-width space U+200B).
    stringify: function(val) {
	return val.replace(/\|/g, "|<wbr>");
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
attrs.deprel_ud2 = {
    label: "deprel",
    displayType: "select",
    translationKey: "deprel_ud2_",
    opts: settings.liteOptions,
    dataset: {
	"acl": "acl",
	"acl:relcl": "acl:relcl",
	"advcl": "advcl",
	"advmod": "advmod",
	"amod": "amod",
	"appos": "appos",
	"aux": "aux",
	"aux:pass": "aux:pass",
	"case": "case",
	"cc": "cc",
	"ccomp": "ccomp",
	"cc:preconj": "cc:preconj",
	"compound": "compound",
	"compound:nn": "compound:nn",
	"compound:prt": "compound:prt",
	"conj": "conj",
	"cop": "cop",
	"cop:own": "cop:own",
	"csubj": "csubj",
	"csubj:cop": "csubj:cop",
	"dep": "dep",
	"det": "det",
	"discourse": "discourse",
	"fixed": "fixed",
	"flat": "flat",
	"flat:foreign": "flat:foreign",
	"flat:name": "flat:name",
	"goeswith": "goeswith",
	"mark": "mark",
	"nmod": "nmod",
	"nmod:gobj": "nmod:gobj",
	"nmod:gsubj": "nmod:gsubj",
	"nmod:poss": "nmod:poss",
	"nsubj": "nsubj",
	"nsubj:cop": "nsubj:cop",
	"nummod": "nummod",
	"obj": "obj",
	"obl": "obl",
	"orphan": "orphan",
	"parataxis": "parataxis",
	"punct": "punct",
	"root": "root",
	"vocative": "vocative",
	"xcomp": "xcomp",
	"xcomp:ds": "xcomp:ds",
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
	"EVT",
	// "WRK",
	// "OBJ",
	"PRO",
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
	"ANM",
	"AST",
	"ATH",
	"CLT",
	"CRP",
	"CUR",
	"DAT",
	"EDU",
	"FIN",
	"FNC",
	"GPL",
	"HRM",
	"HUM",
	"MYT",
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
	"EnamexEvtXxx",
	"EnamexProXxx",
	"EnamexPrsAnm",
	"EnamexPrsHum",
	"EnamexPrsMyt",
	"EnamexPrsTit",
	"EnamexLocXxx",
	"EnamexLocGpl",
	"EnamexLocPpl",
	"EnamexLocStr",
	"EnamexLocFnc",
	"EnamexLocAst",
	"EnamexOrgAth",
	"EnamexOrgClt",
	"EnamexOrgCrp",
	"EnamexOrgEdu",
	"EnamexOrgFin",
	"EnamexOrgPlt",
	"EnamexOrgTvr",
	"NumexMsrCur",
	"NumexMsrXxx",
	"TimexTmeDat",
	"TimexTmeHrm",
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

attrlist.ud2_fi = {
    ref: attrs.ref,
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_ud2_universal,
    xpos: { label: "", displayType: "hidden" },
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel_ud2,
    deps: { label: "", displayType: "hidden" },
    misc: { label: "", displayType: "hidden" },
};

attrlist.ud2_en = attrlist.ud2_fi;

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
sattrs.publisher = {
    label: "publisher"
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


sattrs.sex = {
    label: "sex",
    displayType: "select",
    translationKey: "sex_",
    dataset: {
	"f": "female",
	"m": "male",
	"x": "other",
	"u": "unknown",
    },
    opts: settings.liteOptions,
};

sattrs.author_name_type = {
    label: "author_name_type",
    displayType: "select",
    translationKey: "author_name_type_",
    dataset: {
	"candidate id": "candidate_id",
    },
    opts: settings.liteOptions,
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
sattrs.link_show_video_annex = sattrs.link_prefixed(
    "show_video_in_lat",
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

sattrs.chapter_num = {
    label: "chapter_num"
};

sattrs.part_num = {
    label: "part_num"
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

sattrs.work_title = {
    label: "work_title",
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

/* HC */

sattrlist.hc = {
    sentence_id : sattrs.sentence_id_hidden,
    text_date : {label: "date"},
    text_title : {label: "title"},
    text_xmlid : {label: "hc_xmlid"},
    text_id : {label: "hc_textid"},
    text_source : {label: "source"},
    text_lang : {label: "lang"},
    text_langid : {label: "hc_lang_id"},
    text_contemporaneity : {label: "hc_contemporaneity"},
    //text_dialect : {label: "hc_dialect"},
    text_form : {label: "hc_form"},
    text_texttype : {label: "hc_texttype"},
    text_foreignorig : {label: "hc_foreignorig"},
    text_foreignlang : {label: "hc_foreignlang"},
    text_spoken : {label: "hc_spoken"},
    text_authorsex : {label: "hc_authorsex"},
    text_author : {label: "hc_author"},
    text_authorage : {label: "hc_authorage"},
    text_socialrank : {label: "hc_socialrank"},
    text_audience : {label: "hc_audience"},
    text_partrel : {label: "hc_partrel"},
    text_interaction : {label: "hc_interaction"},
    text_setting : {label: "hc_setting"},
    text_proto : {label: "hc_proto"}
};

attrlist.hc = {
    page : {label: "page_num",
            opts : settings.defaultOptions},

    note : {label: "note",
            opts : settings.defaultOptions},

    unit : {label: "unit",
            opts : settings.defaultOptions},

    type : {label: "type",
            opts : settings.defaultOptions},

    supplement : {label: "supplement",
		  opts : settings.defaultOptions}

};


/* Oracc */

sattrlist.oracc = {
    text_cdlinumber : {
        label : "oracc_cdlinumber",
    },
    text_provenance : {
        label : "oracc_provenance",
    },
    
    text_language : {
        label : "oracc_textlang",
        displayType : "select",
        translationKey : "oracc_textlang_",
        dataset : [
		   "Akkadian",
		   "AkkadianAramaic",
		   "AkkadianAramaicLuwian",
		   "AkkadianEgyptian",
		   "AkkadianOldPersian",
		   "AkkadianOldPersianElamite",
		   "AkkadianOldPersianElamiteEgyptian",
		   "AkkadianUrartian",
		   "Aramaic",
		   "Eblaite",
		   "Elamite",
		   "Hittite",
		   "Neo-Assyrian",
		   "Neo-Babylonian",
		   "OldPersian",
		   "OldPersianElamite",
		   "Sumerian",
		   "SumerianAkkadian",
		   "Uncertainorunspecified",
		   "Urartian"
        ]
    },
    text_genre : {
        label : "oracc_genre",
        displayType : "select",
        translationKey : "oracc_genre_",
        dataset : [
		   "administrativerecord",
		   "astrologicalastronomical",
		   "grantdecreegift",
		   "legaltransaction",
		   "letter",
		   "lexical",
		   "literary",
		   "miscellaneous",
		   "omendivination",
		   "prayerritualincantation",
		   "royalinscription",
		   "scholarly",
		   "school",
		   "uncertainorunspecified"
        ]
    },
    text_period : {
        label : "oracc_period",
        displayType : "select",
        translationKey : "oracc_period_",
        dataset : [
	    "Achaemenid",
	    "Archaic",
	    "EarlyDynastic",
	    "Ebla",
	    "FirstMillennium",
	    "Hellenistic",
	    "LagašII",
	    "LateBabylonian",
	    "MiddleAssyrian",
	    "MiddleBabylonian",
	    "MiddleHittite",
	    "NeoAssyrian",
	    "Neo-Assyrian",
	    "NeoBabylonian",
	    "Neo-Babylonian",
	    "OldAkkadian",
	    "OldAssyrian",
	    "OldBabylonian",
	    "Parthian",
	    "StandardBabylonian",
	    "Uncertainorunspecified",
	    "Urartian",
	    "UrIII",
	    "UrukIII",
	    "UrukIV"
        ]
    },
    text_subgenre : {
        label : "oracc_subgenre"
    },
    sentence_line : {
        label : "oracc_line",
    },
    sentence_translation : {
        label : "oracc_sent_translation"
    },
    paragraph_id : {
        label : "paragraph_id",
        displayType : "hidden",
    }
};


/* Oracc add links */

attrlist.oracc = {

    lemma : attrs.baseform,
    ltrans :  {
        // Lemma translation
        label : "oracc_lemmatrans"
    },
    transcription : {
        label : "oracc_transcription"
    },
    sense : {
        // Contextual sense
        label : "oracc_sense"
    },

    pos : {
        label : "pos",
        displayType : "select",
        translationKey : "oracc_pos_",
        dataset : [
	    "adjective",
	    "adverb",
	    "commonnoun",
	    "conjunction",
	    "interjection",
	    "miscellaneousundetermined",
	    "number",
	    "particle",
	    "prepositionpostposition",
	    "pronoun",
	    "propernoun",
	    "verb"
        ]
    },
    possub : {
        // Sub POS
        label : "oracc_pos_subcategory"
    },
    standard : {
        label : "oracc_standardized"
    },

    lang : {
        label : "oracc_lang",
        displayType : "select",
        translationKey : "oracc_lang_",
        dataset : [
		   "Akkadian",
		   "Aramaic",
		   "Cuneiform",
		   "EarlyAkkadian",
		   "Eblaite",
		   "Elamite",
		   "Greek",
		   "Hittite",
		   "Hurrian",
		   "LateBabylonian",
		   "MiddleAssyrian",
		   "MiddleBabylonian",
		   "MiddleBabylonianperipheral",
		   "Neo-Assyrian",
		   "Neo-Babylonian",
		   "OldAkkadian",
		   "OldAssyrian",
		   "OldBabylonian",
		   "OldPersian",
		   "Proto-cuneiform",
		   "StandardBabylonian",
		   "Sumerian",
		   "SumerianEmesal",
		   "Ugaritic",
		   "Urartian"
        ]
    },

    // links won't work 
    url : {
	label: "oracc_url",
	type: "url",
	url_opts: {
	    //in_link_section : true,
	    //hide_url : true,
	    new_window : true,
	}
    }
/*
    url : {
        in_link_section : true,
        hide_url : true,
        new_window : true,
        label : "oracc_url",
        type : "url"
	}*/

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

attrlist.parsed_sv = {
    lemma: attrs.baseform,
    pos: attrs.pos,
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref
};

attrlist.parsed_sv_lemmaset = {
    lemma: attrs.baseform_sv,
    pos: attrs.pos,
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref
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

// The same but without dependency attributes
attrlist.parsed_tdt_nodep = {
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_klk,
    msd: attrs.msd,
    lex: attrs.lemgram_hidden,
};

settings.corpus_features.parsed_tdt_nodep = {
    attributes: attrlist.parsed_tdt_nodep,
};

// Corpora parsed with TDT and run through FiNER
attrlist.parsed_tdt_ner =
    $.extend({}, attrlist.parsed_tdt, {
	nertag: attrs.ner_tags
    });


settings.corpus_features.spaces = {
    attributes: {
	spaces: {
	    label: "whitespace_related_to_token",
	},
    },
};


// KLK structural attributes, for both Finnish and Swedish
sattrlist.klk = {
    text_label: {
	// The label has the prefix klk_ because it might not have the
	// same meaning as "label" in some other contexts.
        label: "klk_label",
        opts: settings.defaultOptions,
    },
    text_publ_title: {
        label: "publication",
        opts: settings.defaultOptions,
    },
    /*
    text_publ_part: {
        label: "part",
        opts: settings.defaultOptions,
    },
    */
    text_publ_id: {
        label: "issn",
        opts: settings.defaultOptions,
    },
    text_issue_date: {
        label: "date",
        opts: settings.defaultOptions,
    },
    text_issue_no: {
        label: "issue_num",
        opts: settings.defaultOptions,
    },
    text_issue_title: {
        label: "issue_title",
        opts: settings.defaultOptions,
    },
    /*
    text_part_name: {
        label: "part_name",
        opts: settings.defaultOptions,
    },
    */
    text_elec_date: {
        label: "digitization_date",
        opts: settings.defaultOptions,
    },
    text_language: {
        label: "lang",
        displayType: "select",
        translationKey: "",
        opts: settings.liteOptions,
        dataset: {
            "fi": "fin",
            "sv": "swe",
            "et": "est",
        }
    },
    /*
    text_page_id: {
        label: "page_id",
        opts: settings.defaultOptions,
    },
    */
    text_page_no: {
        label: "page_num",
        opts: settings.defaultOptions,
    },
    text_sentcount: {
        label: "sentence_count",
        displayType: "hidden",
    },
    text_tokencount: {
        label: "token_count",
        displayType: "hidden",
    },
    text_img_url: {
        label: "image_url",
        type: "url",
	displayType: "hidden",
    },
    /*
    text_dateto: {
        label: "dateto",
        displayType: "hidden",
    },
    text_datefrom: {
        label: "datefrom",
        displayType: "hidden",
    },
    */
    text_publ_type: {
	label: "publication_type",
	displayType: "select",
	translationKey: "publtype_",
	opts: settings.liteOptions,
	dataset: {
	    "aikakausi": "journal",
	    "sanomalehti": "newspaper"
	}
    },
    paragraph_id: {
        label: "paragraph_id",
        displayType: "hidden",
    },
    sentence_id: sattrs.sentence_id_hidden
};

// KLK page image links used for both Finnish and Swedish
sattrlist.klk_pagelinks = {
    text_binding_id: {
	displayType: "hidden"
    },
    text_page_image_url: {
	label: "show_page_image",
	type: "url",
	url_opts: sattrs.link_url_opts,
	synthetic: true,
	stringify_synthetic: function (token_data) {
	    return settings.fn.make_klk_page_image_url(token_data, 0);
	}
    },
    text_page_image_context_url: {
	label: "show_page_image_context",
	type: "url",
	url_opts: sattrs.link_url_opts,
	synthetic: true,
	stringify_synthetic: function (token_data) {
	    return settings.fn.make_klk_page_image_url(token_data, 2);
	}
    },
    text_download_pdf_url: {
	label: "download_publ_pdf",
	type: "url",
	url_opts: sattrs.link_url_opts,
	synthetic: true,
	stringify_synthetic: function (token_data) {
	    return settings.fn.make_klk_url_base(token_data) + "/pdf";
	}
    },
};


// MULCOLD

attrlist.mulcold_fi = {
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_mulcold_fi,
    msd: attrs.msd,
    amblemma: attrs.ambiguous_lemma,
    ambpos: attrs.ambiguous_pos_mulcold_fi,
    ambmsd: attrs.ambiguous_msd,
    lex: attrs.lemgram_hidden
};
attrlist.mulcold_ru = {
    lemma: attrs.baseform,
    pos: attrs.pos_mulcold_ru,
    msd: attrs.msd,
    amblemma: attrs.ambiguous_lemma,
    ambpos: attrs.ambiguous_pos_mulcold_ru,
    ambmsd: attrs.ambiguous_msd,
    lex: attrs.lemgram_hidden
};
attrlist.mulcold_en = {
    lemma: attrs.baseform,
    pos: attrs.pos_mulcold_en,
    msd: attrs.msd,
    amblemma: attrs.ambiguous_lemma,
    ambpos: attrs.ambiguous_pos_mulcold_en,
    ambmsd: attrs.ambiguous_msd,
    lex: attrs.lemgram_hidden
};
attrlist.mulcold_sv = {
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_mulcold_sv,
    msd: attrs.msd,
    amblemma: attrs.ambiguous_lemma,
    ambpos: attrs.ambiguous_pos_mulcold_sv,
    ambmsd: attrs.ambiguous_msd,
    lex: attrs.lemgram_hidden
};
attrlist.mulcold_de = {
};

sattrlist.mulcold = {
    align_text_code: {
	label: "text_id"
    },
    align_text_author: {
	label: "author"
    },
    align_text_title: {
	label: "title"
    },
    align_text_typeoftext: {
	label: "text_type"
    },
    align_text_genre: sattrs.mikhailov_text_genre,
    align_text_period: {
	label: "year"
    },
    align_text_publisher: {
	label: "publisher"
    },
    sentence_id: sattrs.sentence_id_hidden
};

settings.corpusinfo.mulcold = {
    urn: "urn:nbn:fi:lb-201405277",
    metadata_urn: "urn:nbn:fi:lb-201405278",
    licence: settings.licenceinfo.CC_BY_ND,
    homepage_url: "https://mustikka.uta.fi/",
};


// FiRuLex

sattrlist.legal = {
    text_code: {
	label: "text_id"
    },
    text_author: {
	label: "author"
    },
    text_title: {
	label: "title"
    },
    text_typeoftext: {
	label: "text_type"
    },
    text_genre: sattrs.mikhailov_text_genre,
    text_period: {
	label: "text_period"
    },
    text_publisher: {
	label: "publisher"
    },
    sentence_id: sattrs.sentence_id_hidden
};

settings.corpusinfo.firulex = {
    urn: "urn:nbn:fi:lb-201407162",
    metadata_urn: "urn:nbn:fi:lb-201407161",
    licence: settings.licenceinfo.CC_BY_ND,
    homepage_url: "https://mustikka.uta.fi/",
};


/* ParFin common */

settings.corpusinfo.parfin = {
    urn: "urn:nbn:fi:lb-2015050506",
    metadata_urn: "urn:nbn:fi:lb-2014052710",
    lbr_id: "urn:nbn:fi:lb-2014052710",
    licence: {
	name: "CLARIN RES +NC +PLAN +INF",
	urn: "urn:nbn:fi:lb-2015041306",
    },
    homepage_url: "https://mustikka.uta.fi/",
};

sattrlist.parfin_base = {
    link_text_code: {
	label: "text_id"
    },
    link_txtnumber: {
	label: "text_number"
    },
    link_text_author: {
	label: "author"
    },
    link_text_title: {
	label: "title"
    },
    link_text_typeoftext: {
	label: "text_type"
    },
    link_text_genre: sattrs.mikhailov_text_genre,
    link_text_period: {
	label: "year"
    },
    link_text_publisher: {
	label: "publisher"
    },
    sentence_id: sattrs.sentence_id_hidden
};

sattrlist.parfin_fi = $.extend(
    true, {}, sattrlist.parfin_base,
    {
	link_text_author: {
	    label: "author",
	    displayType: "select",
	    dataset: [
		"Haahtela Joel",
		"Hotakainen Kari",
		"Konkka Anita",
		"Krohn Leena",
		"Lassila Maiju",
		"Lehtolainen Leena",
		"Mäkelä Hannu",
		"Oksanen Sofi",
		"Rimminen Mikko",
		"Sillanpää Frans Emil",
		"Sinisalo Johanna",
		"Tuuri Antti",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_translator: {
	    label: "translator",
	    displayType: "select",
	    dataset: [
		"Djafarova Taissia",
		"Džafarova-Viitala Taisja",
		"Ioffe Eleonora",
		"Melnik Tatjana",
		"Muravin Gennadi, Kamenskaja J",
		"Muravin, Gennadi",
		"Priležajev Ivan",
		"Sidorova Anna",
		"Sidorova Anna, Tinovitskaja Jevgenija",
		"Tinovitskaja Evgenija",
		"Uretskij Ilja",
		"Virolainen Laura A.",
		"Zoštšenko Mihail",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_title: {
	    label: "title",
	    displayType: "select",
	    dataset: [
		"Ennen päivänlaskua ei voi",
		"Ensimmäinen murhani",
		"Harmin paikka",
		"Hullun taivaassa",
		"Ihmisen vaatteissa",
		"Ihmiset suviyössä",
		"Joki virtaa läpi kaupungin",
		"Juoksuhaudantie",
		"Kuparisydän",
		"Pekka Peloton",
		"Perhoskerääjä",
		"Puhdistus",
		"Pussikaljaromaani",
		"Sfinksi vai robotti",
		"Tulitikkuja lainaamassa",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_publisher: {
	    label: "publisher",
	    displayType: "select",
	    dataset: {
		"Kansa": "Kansa",
		"Otava": "Otava",
		"[Tt]ammi": "Tammi",
		"Teos": "Teos",
		"WSOY": "WSOY",
	    },
	    localize: false,
	    opts: settings.liteOptions,
	},
    }
);

sattrlist.parfin_ru = $.extend(
    true, {}, sattrlist.parfin_fi,
    {
	link_text_title: {
	    label: "title",
	    displayType: "select",
	    dataset: [
		"Бесстрашный Пекка  В одежде человека",
		"В одежде человека",
		"В сумасшедших небесах",
		"До заката нельзя",
		"За спичками",
		"Змеи в раю",
		"Люди в летней ночи",
		"Медное сердце",
		"Мое первое убийство",
		"Очищение",
		"Река течет через город",
		"Роман с пивом",
		"Собиратель бабочек",
		"Сфинкс или робот  В одежде человека",
		"Улица окопная",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_publisher: {
	    label: "publisher",
	    displayType: "select",
	    dataset: [
		"Азбука-классика",
		"Амфора",
		"Астрель",
		"Государственное издательство художественной литературы",
		"Едиториал УРСС",
		"КомКнига",
		"Лимбус Пресс, Издательство К. Тублина",
		"Самокат",
		"Текст",
		"Художественная литература",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
    }
);

attrlist.parfin_fi = $.extend(
    true, {}, attrlist.mulcold_fi);

attrlist.parfin_ru = $.extend(
    true, {}, attrlist.mulcold_ru);


/* ParRus common */

attrlist.parrus_fi = $.extend(
    true, {}, attrlist.mulcold_fi);

attrlist.parrus_ru = $.extend(
    true, {}, attrlist.mulcold_ru);

sattrlist.parrus_fi = $.extend(
    true, {}, sattrlist.parfin_base,
    {
	link_text_author: {
	    label: "author",
	    displayType: "select",
	    dataset: [
		"Бабель И.",
		"Бакланов Г.",
		"Булгаков М.А.",
		"Гоголь Н.В.",
		"Горький М.",
		"Достоевский Ф.М.",
		"Дудинцев В.",
		"Зощенко М.",
		"Лермонтов М.Ю.",
		"Лесков Н.",
		"Маринина А.",
		"Пушкин А.С.",
		"Семенов Ю.",
		"Толстой Л.Н.",
		"Трифонов Ю.",
		"Троепольский Г.",
		"Тургенев И.С.",
		"Фадеев А.",
		"Чехов А.П.",
		"Шолохов М.А.",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_translator: {
	    label: "translator",
	    displayType: "select",
	    dataset: [
		"Adrian E.",
		"Adrian, Esa",
		"Ahava, Juho, Hameen-anttila, Vaino",
		"Anhava M.",
		"Heino U.-L.",
		"Heino, Ulla-Liisa",
		"Hollo J.A.",
		"Hollo, Juho Anselmi",
		"Iranto L.",
		"Juhani Konkka",
		"Kallama, Valto",
		"Konkka J.",
		"Konkka, Juhani",
		"Koskinen M.",
		"Kuukasjärvi Olli",
		"Losowitch K.",
		"Mitrošin A.",
		"Orlov Vappu",
		"Pienimäki N.",
		"Pyykkö L.",
		"Pyykkö Lea",
		"Viitanen Liisa",
		"null",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_title: {
	    label: "title",
	    displayType: "select",
	    dataset: [
		"Aateliskoti",
		"Aatelisneiti talonpoikaistyttönä / Laukaus ja y. m. kertomuksia.",
		"Agafja / Valitut novelit 1.",
		"Aikamme sankari",
		"Albionin tytär / Valitut novellit 1.",
		"Alustava tilinpäätös",
		"Anna Karenina",
		"Aristokraatti / Kireähermoista väkeä.",
		"Asemanhoitaja / Romaanit ja kertomukset.",
		"Bim mustakorva",
		"Ei onnistunut! / Valitut novellit 1.",
		"Elämän pikkuseikka / Valitut novellit 1.",
		"Griša / Valitut novellit 1.",
		"Haaveita / Valitut novelit 1.",
		"Hammaskirurgi / Valitut novellit 1.",
		"Herra salaneuvos / Valitut novellit 1.",
		"Hevosenkaltainen sukunimi / Valitut novelit 1.",
		"Hiljaa virtaa Don",
		"Huvila-asukkaita / Valitut novelit 1.",
		"Häät kenraalin kera / Valitut novellit 1.",
		"Ilkeä poika / Valitut novellit 1.",
		"Isergil-muori",
		"Isä-kulta / Valitut novellit 1.",
		"Jeesuksen synti",
		"Kaikesta täytyy maksaa",
		"Kalliita kielitunteja / Valitut novellit 1.",
		"Kameleontti / Valitut novellit 1.",
		"Kapteenintytär / Romaanit ja kertomukset.",
		"Karamazovin veljekset",
		"Karkuri / Valitut novellit 1.",
		"Karviaismarjoja / Suuret kertomukset 2.",
		"Kauhunyö / Valitut novellit 1.",
		"Keittäjätär menee naimisiin / Valitut novelit 1.",
		"Kellariloukko",
		"Kerjäläinen / Valittuja kertomuksia ja novelleja 1.",
		"Kevään seitsemäntoista hetkeä",
		"Kireähermoista väkeä / Kireähermoista väkeä.",
		"Kirje isoisälle / Valitut novellit 1.",
		"Koiran sydän",
		"Kostaja / Valitut novellit 1.",
		"Kuningas / Odessalaisia ja muita novelleja",
		"Kunnon saksalainen / Valitut novellit 1.",
		"Kuolema ja vähän rakkautta",
		"Kuorotyttö / Valitut novellit 1.",
		"Lapsia / Valitut novellit 1.",
		"Laukaus / Laukaus ja y. m. kertomuksia.",
		"Liikaa suolaa / Valitut novellit 1.",
		"Lumimyrsky / Romaanit ja kertomukset.",
		"Lumottu vaeltaja",
		"Made / Valettuja kertomuksia ja novellija 1.",
		"Makar Tšudra",
		"Nainen ja sylikoira / Suuret kertomukset 2.",
		"Noita / Valitut novellit 1.",
		"Näyttelijän lähtö / Valitut novelit 1.",
		"Onnenpoika / Valitut novellit 1.",
		"Onnettomuus / Valitut novellit 1.",
		"Onni / Suuret kertomukset 1.",
		"Osterit / Valitut novellit 1.",
		"Pahantekijä / Valitut novellit 1.",
		"Paksukainen ja ohukainen / Valitut novellit 1.",
		"Patarouva / Romaanit ja kertomukset.",
		"Perheen isä / Valitut novellit 1.",
		"Pimeässä / Valitut novellit 1.",
		"Poikia / Valitut novelit 1.",
		"Pyry",
		"Päällysviitta / Valitut teokset. 1.",
		"Rakkaus / Valitut novellit 1.",
		"Rikos ja rangaistus",
		"Romaani bassoviulusta / Valitut novellit 1.",
		"Rotkossa / Suuret kertomukset 2.",
		"Ruumisarkuntekijä / Romaanit ja kertomukset.",
		"Saatana saapuu Moskovaan",
		"Seireeni / Valitut novellit 1.",
		"Surkea tapaus / Valitut novellit 1.",
		"Suru / Valitut novellit 1.",
		"Synnyinmaan puolesta",
		"Taiteen tuote / Valitut novellit 1.",
		"Taiteilijan tarina / Suuret kertomukset 1.",
		"Talo rantakadulla",
		"Talonpoikia / Suuret kertomukset 2.",
		"Tapaus yöllä / Kireähermoista väkeä.",
		"Tarpeettomia ihmisiä / Valitut novellit 1.",
		"Teatteriromaani",
		"Tuho",
		"Tuttu mies / Valitut novellit 1.",
		"Tšelkaš",
		"Valkeat vaatteet",
		"Vanhuus/ Valitut novellit 1.",
		"Virkamiehen kuolema / Valitut novellit 1.",
		"Yö ennen oikeudenkäyntiä  / Valitut novellit 1.",
		"Yö hautausmaalla / Valitut novellit 1.",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_publisher: {
	    label: "publisher",
	    displayType: "select",
	    dataset: [
		"Gummerus",
		"Helsinki",
		"Kansankulttuuri",
		"Karisto",
		"Otava",
		"SN-kirjat",
		"Tammi",
		"WSOY",
		"null",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
    }
);

sattrlist.parrus_ru = $.extend(
    true, {}, sattrlist.parfin_base,
    {
	link_text_author: {
	    label: "author",
	    displayType: "select",
	    dataset: [
		"Бабель И.",
		"Бакланов Г.",
		"Булгаков М.А.",
		"Гоголь Н.В.",
		"Горький М.",
		"Достоевский Ф.М.",
		"Дудинцев В.",
		"Зощенко М.",
		"Лермонтов М.Ю.",
		"Лесков Н.",
		"Маринина А.",
		"Пушкин А.С.",
		"Семенов Ю.",
		"Толстой Л.Н.",
		"Трифонов Ю.",
		"Троепольский Г.",
		"Тургенев И.С.",
		"Фадеев А.",
		"Чехов А.П.",
		"Шолохов М.А.",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_translator: {
	    label: "translator",
	    displayType: "select",
	    dataset: [
		"Adrian, Esa",
		"Ahava Juho, Hämeen-Anttila Väinö",
		"Anhava, Martti",
		"Heino, Ulla-Liisa",
		"Hollo, Juho Anselmi",
		"Iranto, Lidia",
		"Konkka, Juhani",
		"Koskinen, Marja",
		"Kuukasjärvi, Olli",
		"Losowitch, Katja",
		"Mitrošin, A.",
		"Pesonen, Pekka Alarik",
		"Pienimäki, Natalia",
		"Pyykkö Lea",
		"Viitanen, Liisa",
		"null",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_title: {
	    label: "title",
	    displayType: "select",
	    dataset: [
		"Агафья / Собр. соч. в 15 тт.",
		"Актерская гибель / Собр. соч. в 15 тт.",
		"Анна Каренина",
		"Аристократка",
		"Барышня-крестьянка",
		"Беглец / Собр. соч. в 15 тт.",
		"Белые одежды",
		"Белый Бим черное ухо",
		"Братья Карамазовы",
		"В овраге / Собр. соч. в 15 тт.",
		"В потемках / Собр. соч. в 15 тт.",
		"Ванька / Собр. соч. в 15 тт.",
		"Ведьма / Собр. соч. в 15 тт.",
		"Выстрел",
		"Герой нашего времени",
		"Гриша / Собр. соч. в 15 тт.",
		"Гробовщик",
		"Дама с собачкой / Собр. соч. в 15 тт.",
		"Дачники / Собр. соч. в 15 тт.",
		"Дворянское гнездо",
		"Детвора / Собр. соч. в 15 тт.",
		"Добрый немец / Собр. соч. в 15 тт.",
		"Дом на набережной",
		"Дом с мезонином / Собр. соч. в 15 тт.",
		"Дорогие уроки / Собр. соч. в 15 тт.",
		"Дочь Альбиона / Собр. соч. в 15 тт.",
		"Житейская мелочь / Собр. соч. в 15 тт.",
		"За все надо платить",
		"Записки из подполья",
		"Злой мальчик / Собр. соч. в 15 тт.",
		"Злоумышленник / Собр. соч. в 15 тт.",
		"Знакомый мужчина / Собр. соч. в 15 тт.",
		"Иисусов грех / Одесские рассказы.",
		"Капитанская дочка",
		"Король / Одесские рассказы.",
		"Крыжовник / Собр. соч. в 15 тт.",
		"Кухарка женится / Собр. соч. в 15 тт.",
		"Лишние люди / Собр. соч. в 15 тт.",
		"Лошадиная фамилия / Собр. соч. в 15 тт.",
		"Любовь / Собр. соч. в 15 тт.",
		"Макар Чудра",
		"Мальчики / Собр. соч. в 15 тт.",
		"Мастер и Маргарита",
		"Метель",
		"Мечты / Собр. соч. в 15 тт.",
		"Мститель / Собр. соч. в 15 тт.",
		"Мужики / Собр. соч. в 15 тт.",
		"Навеки девятнадцатилетние",
		"Налим / Собр. соч. в 15 тт.",
		"Нервные люди",
		"Несчастье / Собр. соч. в 15 тт.",
		"Неудача / Собр. соч. в 15 тт.",
		"Нищий / Собр. соч. в 15 тт.",
		"Ночное происшествие",
		"Ночь на кладбище / Собр. соч. в 15 тт.",
		"Ночь перед судом / Собр. соч. в 15 тт.",
		"Отец семейства / Собр. соч. в 15 тт.",
		"Очарованный странник",
		"Папаша / Собр. соч. в 15 тт.",
		"Пересолил / Собр. соч. в 15 тт.",
		"Пиковая дама ",
		"Предварительные итоги",
		"Преступление и наказание",
		"Произведение искусства / Собр. соч. в 15 тт.",
		"Разгром",
		"Роман с контрабасом / Собр. соч. в 15 тт.",
		"Свадьба с генералом / Собр. соч. в 15 тт.",
		"Семнадцать мгновений весны",
		"Сирена / Собр. соч. в 15 тт.",
		"Смерть и немного любви",
		"Смерть чиновника / Собр. соч. в 15 тт.",
		"Собачье сердце",
		"Событие / Собр. соч. в 15 тт.",
		"Станционный смотритель",
		"Старость / Собр. соч. в 15 тт.",
		"Старуха Изергиль",
		"Страшная ночь / Собр. соч. в 15 тт.",
		"Счастливчик / Собр. соч. в 15 тт.",
		"Счастье / Собр. соч. в 15 тт.",
		"Тайный советник / Собр. соч. в 15 тт.",
		"Театральный роман",
		"Тихий Дон, ч. 1",
		"Толстый и тонкий / Собр. соч. в 15 тт.",
		"Тоска / Собр. соч. в 15 тт.",
		"Устрицы / Собр. соч. в 15 тт.",
		"Хамелеон / Собр. соч. в 15 тт.",
		"Хирургия / Собр. соч. в 15 тт.",
		"Хористка / Собр. соч. в 15 тт.",
		"Челкаш",
		"Шинель",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_publisher: {
	    label: "publisher",
	    displayType: "select",
	    dataset: [
		"АСТ, 1997",
		"АСТ, 1998",
		"АСТ, 2001",
		"АСТ, 2002",
		"АСТ, 2004",
		"АСТ, 2007",
		"АСТ, 2010",
		"АСТ, 2011",
		"АСТ, Астрель, 2002",
		"АСТ, Астрель, 2011",
		"Азбука-классика, 2002",
		"Альд, Империум Пресс, Литература, 2003",
		"Детская литература, 1999",
		"Детская литература, 2000",
		"Детская литература, 2004",
		"Олимп, АСТ, 2002",
		"Терра,  1999",
		"Терра, 1999",
		"Терра,1999",
		"Художественная литература, 2000",
		"Эксмо",
		"Эксмо, 2003",
		"Эксмо, 2007",
		"Эксмо, 2009",
		"Эксо, 2008",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
    }
);

settings.corpusinfo.parrus = {
    urn: "[to be added]",
    metadata_urn: "urn:nbn:fi:lb-20140730173",
    lbr_id: "urn:nbn:fi:lb-2014052710",
    licence: {
	name: "CLARIN RES +PLAN +NC +INF +ND",
	url: "urn:nbn:fi:lb-2016042705",
    },
    homepage_url: "https://mustikka.uta.fi/",
};


/* ParFin 2016 common */

settings.corpusinfo.parfin_2016 = {
    // The URNs in the single-language version are different from
    // those in the parallel corpus.
    // urn: "[to be added]",
    // metadata_urn: "urn:nbn:fi:lb-2014052710",
    // licence: settings.licenceinfo.ParFinRus_2016_fi,
    lbr_id: "urn:nbn:fi:lb-2017020601",
    homepage_url: "https://mustikka.uta.fi/",
};

sattrlist.parfin_2016_base = {
    link_text_code: {
	label: "text_id"
    },
    // link_txtnumber: {
    // 	label: "text_number"
    // },
    link_text_author: {
	label: "author"
    },
    link_text_title: {
	label: "title"
    },
    // link_text_typeoftext: {
    // 	label: "text_type"
    // },
    // link_text_genre: sattrs.mikhailov_text_genre,
    // link_text_period: {
    // 	label: "year"
    // },
    link_text_publisher: {
	label: "publisher"
    },
    link_text_year: {
	label: "year",
    },
    link_text_yearorig: {
	label: "year_orig",
    },
    link_text_yeartr: {
	label: "year_transl",
    },
    sentence_id: sattrs.sentence_id_hidden
};

sattrlist.parfin_2016_fi = $.extend(
    true, {}, sattrlist.parfin_2016_base,
    {
	link_text_author: {
	    label: "author",
	    displayType: "select",
	    dataset: [
		"Haahtela Joel",
		"Hotakainen Kari",
		"Katz Daniel",
		"Konkka Anita",
		"Krohn Leena",
		"Lassila Maiju",
		"Lehtolainen Leena",
		"Linna Väinö",
		"Mäkelä Hannu",
		"Oksanen Sofi",
		"Rimminen Mikko",
		"Salminen Arto",
		"Sillanpää Frans Emil",
		"Sinisalo Johanna",
		"Tuuri Antti",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_translator: {
	    label: "translator",
	},
	link_text_title: {
	    label: "title",
	    displayType: "select",
	    dataset: [
		"Ei-kuori",
		"Ennen päivänlaskua ei voi",
		"Ensimmäinen murhani",
		"Harmin paikka",
		"Hullun taivaassa",
		"Ihmisen vaatteissa",
		"Ihmiset suviyössä",
		"Joki virtaa",
		"Juoksuhaudantie",
		"Kun isoisä suomeen hiihti",
		"Kuparisydän",
		"Pekka Peloton",
		"Perhoskerääjä",
		"Puhdistus",
		"Pussikalja",
		"Sfinksi vai robotti",
		"Tulitikkuja lainaamassa",
		"Tuntematon sotilas",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_publisher: {
	    label: "publisher",
	    displayType: "select",
	    dataset: [
		"Kansa",
		"Otava",
		"Tammi",
		"Teos",
		"WSOY",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_year_orig: {
	    label: "year",
	},
    }
);

sattrlist.parfin_2016_ru = $.extend(
    true, {}, sattrlist.parfin_2016_fi,
    {
	link_text_title: {
	    label: "title",
	    displayType: "select",
	    dataset: [
		"Бесстрашный Пекка",
		"В одежде человека",
		"В сумасшедших небесах",
		"За спичками",
		"Змеи в раю",
		"Как мой прадедушка на лыжах прибежал в Финляндию",
		"Люди в летней ночи",
		"Медное сердце",
		"Мое первое убийство",
		"Неизвестный солдат",
		"Очищение",
		"Река течет через город",
		"Роман с пивом",
		"Собиратель бабочек",
		"Спасибо, нет",
		"Сфинкс или робот",
		"Тролль",
		"Улица окопная",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_translator: {
	    label: "translator",
	    displayType: "select",
	    dataset: [
		"Виролайнен, Лаура and Иоффе, Элеонора",
		"Джафарова-Виитала, Таисья",
		"Зощенко, M.",
		"Иоффе, Элеонора",
		"Мельник, Татьяна",
		"Муравин, Геннадий",
		"Муравин, Геннадий and Каменская, Е.",
		"Олыкайнен, Лео and Олыкайнен, Леонид",
		"Прилежаев, Иван",
		"Сидорова, Анна",
		"Смирнов Владимир",
		"Смирнов, Владимир and Марцина, И.",
		"Тиновицкая, Евгения",
		"Урецкий, Илья",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_publisher: {
	    label: "publisher",
	    displayType: "select",
	    dataset: [
		"Азбука-классика",
		"Амфора",
		"Астрель",
		"Вяжевич, А.С",
		"Государственное издательство художественной литературы",
		"Едиториал УРСС",
		"КомКнига",
		"Лимбус Пресс, Издательство К. Тублина",
		"Прогресс",
		"Самокат",
		"Текст",
		"Художественная литература",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
    }
);

attrlist.parfin_2016_fi = {
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_ud_fi,
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel_ud_fi,
    ref: attrs.ref,
    lex: attrs.lemgram_hidden
};

attrlist.parfin_2016_ru = {
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_uta_ru,
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel_uta_ru,
    ref: attrs.ref,
    lex: attrs.lemgram_hidden
};


/* ParRus 2016 common */

attrlist.parrus_2016_fi = $.extend(
    true, {}, attrlist.parfin_2016_fi);

attrlist.parrus_2016_ru = $.extend(
    true, {}, attrlist.parfin_2016_ru);

sattrlist.parrus_2016_ru = $.extend(
    true, {}, sattrlist.parfin_2016_base,
    {
	link_text_author: {
	    label: "author",
	    displayType: "select",
	    dataset: [
		"Бабель И.",
		"Булгаков М.А.",
		"Гоголь Н.В.",
		"Горький М.",
		"Достоевский Ф.М.",
		"Дудинцев В.",
		"Зощенко М.",
		"Ильф И., Петров Е.",
		"Лермонтов М.Ю.",
		"Лесков Н.",
		"Маринина А.",
		"Пушкин А.С.",
		"Семенов Ю.",
		"Трифонов Ю.",
		"Троепольский Г.",
		"Тургенев И.С.",
		"Улицкая Л.",
		"Фадеев А.",
		"Чехов А.П.",
		"Шолохов М.А.",
		"Шукшин В.М.",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_title: {
	    label: "title",
	    displayType: "select",
	    dataset: [
		"Агафья",
		"Актерская гибель",
		"Аристократка",
		"Барышня-крестьянка",
		"Беглец",
		"Белые одежды",
		"Белый Бим черное ухо",
		"Брат Юрочка / Сквозная линия",
		"Братья Карамазовы",
		"В овраге",
		"В потемках",
		"Ванька",
		"Ведьма",
		"Верую!",
		"Выстрел",
		"Герой нашего времени",
		"Гриша",
		"Дама с собачкой",
		"Дачники",
		"Дворянское гнездо",
		"Детвора",
		"Диана / Сквозная линия",
		"Добрый немец",
		"Дом на набережной",
		"Дом с мезонином",
		"Дорогие уроки",
		"Дочь Альбиона",
		"Житейская мелочь",
		"За все надо платить",
		"Записки из подполья",
		"Злоумышленник",
		"Змеиный яд",
		"Знакомый мужчина",
		"Золотой теленок",
		"Иисусов грех",
		"Искусство жить / Сквозная линия",
		"Капитанская дочка",
		"Конец сюжета / Сквозная линия",
		"Король",
		"Крепкий мужик",
		"Крыжовник",
		"Кухарка женится",
		"Лишние люди",
		"Лошадиная фамилия",
		"Любовь",
		"Макар Чудра",
		"Мальчики",
		"Мастер и Маргарита",
		"Мертвые души",
		"Метель",
		"Мечты",
		"Мститель",
		"Мужики",
		"Налим",
		"Нервные люди",
		"Несчастье",
		"Неудача",
		"Нищий",
		"Ночное происшествие",
		"Ночь на кладбище",
		"Ночь перед судом",
		"Осенью",
		"Отец семейства",
		"Очарованный странник",
		"Папаша",
		"Пересолил",
		"Пиковая дама",
		"Предварительные итоги",
		"Преступление и наказание",
		"Произведение искусства",
		"Разгром",
		"Роман с контрабасом",
		"Свадьба с генералом",
		"Семнадцать мгновений весны",
		"Сирена",
		"Смерть и немного любви",
		"Смерть чиновника",
		"Собачье сердце",
		"Событие",
		"Старость",
		"Старуха Изергиль",
		"Страшная ночь",
		"Счастливчик",
		"Счастливый случай / Сквозная линия",
		"Счастье",
		"Тайный советник",
		"Тарас Бульба",
		"Театральный роман",
		"Тихий Дон, ч. 1",
		"Толстый и тонкий",
		"Тоска",
		"Устрицы",
		"Хамелеон",
		"Хирургия",
		"Хористка",
		"Челкаш",
		"Шинель",
		"Явление природы / Сквозная линия",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_publisher: {
	    label: "publisher",
	    displayType: "select",
	    dataset: [
		"",
		"Эксмо",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
    }
);

sattrlist.parrus_2016_fi = $.extend(
    true, {}, sattrlist.parfin_2016_base,
    {
	link_text_author: {
	    label: "author",
	    displayType: "select",
	    dataset: [
		"Аксенов В.",
		"Бабель И.",
		"Бакланов Г.",
		"Белов В.",
		"Булгаков М.А.",
		"Гоголь Н.В.",
		"Горький М.",
		"Достоевский Ф.М.",
		"Дудинцев В.",
		"Ерофеев В.",
		"Зощенко М.",
		"Ильф И., Петров Е.",
		"Лермонтов М.Ю.",
		"Лесков Н.",
		"Маринина А.",
		"Олеша Ю.",
		"Приставкин А.",
		"Пушкин А.С.",
		"Распутин В.",
		"Семенов Ю.",
		"Солженицын А.И.",
		"Стругацкие А. и Б.",
		"Толстая Т.",
		"Трифонов Ю.",
		"Троепольский Г.",
		"Тургенев И.С.",
		"Улицкая Л.",
		"Фадеев А.",
		"Чехов А.П.",
		"Шолохов М.А.",
		"Шукшин В.М.",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_translator: {
	    label: "translator",
	    displayType: "select",
	    dataset: [
		"A.W--",
		"Aarto A.",
		"Adrian E.",
		"Adrian, Esa",
		"Ahava Juho, Hämeen-Anttila V.",
		"Ahava, Juho, Hameen-anttila, Vaino",
		"Anhava M.",
		"Elias Siippainen",
		"Halonen J.A.",
		"Heino U.-L.",
		"Heino Ulla-Liisa",
		"Heino, Ulla-Liisa",
		"Hollo J.",
		"Hollo Juho",
		"Hollo, Juho",
		"Hollo, Juho Anselmi",
		"Holm L.",
		"Iranto L.",
		"Jalkanen, Huugo",
		"Juhani Konkka",
		"Kallama, Valto",
		"Konkka J.",
		"Konkka Juhani",
		"Konkka, Juhani",
		"Koskinen M.",
		"Kuukasjärvi Olli",
		"Laaksonen H.",
		"Lahtela M.",
		"Losowitch K.",
		"M.-W.",
		"Mitrošin A.",
		"Orlov Vappu",
		"Pesonen, Pekka Alarik",
		"Pienimäki N.",
		"Pikkupeura A.",
		"Pyykkö L.",
		"Pyykkö Lea",
		"Rymin R., Parkkinen P.",
		"Samuli S.",
		"Samuli Suomalainen",
		"Silvanto, Reino",
		"Viitanen Liisa",
		"Wuori M.",
		"c.-s.",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_title: {
	    label: "title",
	    displayType: "select",
	    dataset: [
		"Aateliskoti",
		"Aatelisneiti talonpoikaistyttönä",
		"Agafja",
		"Aikamme sankari",
		"Aikamme uros",
		"Albionin tytär",
		"Alustava tilinpäätös",
		"Aristokraatti",
		"Bim mustakorva",
		"Diana / Naisten valheet",
		"Ei onnistunut!",
		"Elä ja muista",
		"Elämän pikkuseikka",
		"Elämäntaito / Naisten valheet",
		"Griša",
		"Haaveita",
		"Halu elää",
		"Hammaskirurgi",
		"Herra salaneuvos",
		"Herrasneitti-talonpoikalaistyttö",
		"Hevosenkaltainen sukunimi",
		"Hiljaa virtaa Don",
		"Hiljainen Don",
		"Huvila-asukkaita",
		"Häät kenraalin kera",
		"Isergil-muori",
		"Isä-kulta",
		"Ivan Denisovitšin päivä",
		"Jeesuksen synti",
		"Joki nimeltä Ockerville",
		"Jura-veli / Naisten valheet",
		"Kaikesta täytyy maksaa",
		"Kalliita kielitunteja",
		"Kameleontti",
		"Kapronkuusi",
		"Kapteenin tytär",
		"Kapteenintytär",
		"Karamazovin veljekset",
		"Karkuri",
		"Karviaismarjoja",
		"Kateus",
		"Kauhunyö",
		"Keittäjätär menee naimisiin",
		"Kellariloukko",
		"Kerjäläinen",
		"Kevään seitsemäntoista hetkeä",
		"Kireähermoista väkeä",
		"Kirje isoisälle",
		"Kirjoituksia kellarista",
		"Koiran sydän",
		"Kostaja",
		"Kova äijä",
		"Kultainen vasikka",
		"Kultaportailla istuivat",
		"Kun pupujussi lensi ilmapalloilla",
		"Kuningas",
		"Kunnon saksalainen",
		"Kuolema ja vähän rakkautta",
		"Kuolleet sielut",
		"Kuorotyttö",
		"Käärmeenmyrkky",
		"Lankomies Sergei Sergejevitš",
		"Lapsia",
		"Laukaus",
		"Liikaa suolaa",
		"Lumimyrsky",
		"Lumottu vaeltaja",
		"Luonnonilmiö / Naisten valheet",
		"Made",
		"Makar Tšudra",
		"Matkalippu tähtiin",
		"Mestari",
		"Mielipaha",
		"Mille pardons, madame!",
		"Minä uskon!",
		"Moskova-Petuški",
		"Nainen ja sylikoira",
		"Nainen koiran kanssa",
		"Nainen, jolla oli koira",
		"Naistennaurattaja",
		"Noita",
		"Nolla-nolla kokonaista",
		"Nuoren Vaganovin kärsimykset",
		"Näyttelijän lähtö",
		"Onnekas sattuma / Naisten valheet",
		"Onnenpoika",
		"Onnettomuus",
		"Onni",
		"Osterit",
		"Pahantekijä",
		"Pakoyritys",
		"Paksukainen ja ohukainen",
		"Patarouva",
		"Perheen isä",
		"Pimeässä",
		"Poika helvetistä",
		"Poikia",
		"Puhujan tehokeino",
		"Päivä Stalinin keskitysleirissä",
		"Päällystakki",
		"Päällysviitta",
		"Rakastaa - ei rakasta",
		"Rakkaus",
		"Rikos ja rangaistus",
		"Romaani bassoviulusta",
		"Rotkossa",
		"Saatana saapuu Moskovaan",
		"Seireeni",
		"Shura-kulta",
		"Sonja",
		"Sormeton",
		"Surkea tapaus",
		"Suru",
		"Syksyllä",
		"Synnyinmaan puolesta",
		"Taiteen tuote",
		"Taiteilijan tarina",
		"Talo rantakadulla",
		"Talonpoikia",
		"Tanssiva Šiva",
		"Tapahtui ravintolassa",
		"Tapaus yöllä",
		"Taras Bulba",
		"Tarinan loppu / Naisten valheet",
		"Tarpeettomia ihmisiä",
		"Teatteriromaani",
		"Teurastus",
		"Tuho",
		"Tuttu mies",
		"Tuttu tarina",
		"Tšelkaš",
		"Valitsen asuinkylää",
		"Valkeat vaatteet",
		"Vanhuus",
		"Vartijaton Aljoša",
		"Versio",
		"Viitta",
		"Virkamiehen kuolema",
		"Yö ennen oikeudenkäyntiä",
		"Yö hautausmaalla",
		"Yöpyi pilvi kultainen",
		"Äidin sydän",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
	link_text_publisher: {
	    label: "publisher",
	    displayType: "select",
	    dataset: [
		"Churberg",
		"Edlund",
		"Gummerus",
		"Hki, Kustannusosakeyhtiö",
		"Holm",
		"K.E. Holm",
		"Kansankulttuuri",
		"Karisto",
		"Kirjayhtymä",
		"Oma",
		"Otava",
		"Petroskoi, KSNT",
		"Päivälehti",
		"SN-kirjat",
		"Siltala",
		"Smia",
		"Suomen kuvalehti",
		"Tammi",
		"Valvoja (lehti)",
		"WSOY",
		"null",
	    ],
	    localize: false,
	    opts: settings.liteOptions,
	},
    }
);

settings.corpusinfo.parrus_2016 = {
    // The URNs in the single-language version are different from
    // those in the parallel corpus.
    // urn: "[to be added]",
    // metadata_urn: "urn:nbn:fi:lb-20140730173",
    // licence: settings.licenceinfo.ParFinRus_2016_fi,
    lbr_id: "urn:nbn:fi:lb-2017020601",
    homepage_url: "https://mustikka.uta.fi/",
};


/* SINEBRYCHOFF */

attrlist.sinebrychoff = {
    //footnote: attrs.word_note
};

sattrlist.sinebrychoff = {
    text_url: sattrs.original_url,
    text_date: {label: "date"},
    text_sender: { label: "topling_from" },
    text_receiver: { label: "topling_to"},
    text_id: { label: "text_id" }
};


/* OPUS */

/*
sattrlist.opus = {
    sentence_id: sattrs.sentence_id_hidden,
    text_title: {
        label: "title"
    }
};
*/


// EuroParl

sattrlist.europarl_v7 = {
    text_title: sattrs.text_title,
    sentence_id: sattrs.sentence_id_hidden,

    sentence_type: {
        label: "sentence_type",
        displayType: "select",
        translationKey: "europarl_v7_sentence_type_",
        dataset: {
            "meta": "meta",
            "speech": "speech"
        },
        opts: settings.liteOptions
    },

    sentence_line: {
        label: "sentence_line",
    },
    text_filename: {
        label: "file_name",
    },
    chapter_title: {
        label: "chapter_title",
    },
    chapter_id: {
        label: "chapter_id",
        displayType: "hidden",
    },
    speaker_id: {
        label: "speech_speakerid",
        displayType: "hidden",
    },
    speaker_name: {
        label: "speech_speakername"
    },
    speaker_aff: {
        label: 'speaker_affiliation',
        displayType: "select",
        translationKey: "europarl_v7_aff_",
        dataset: {
            "und": "und"
	}
    },
    speaker_lang: {
        label: "speech_language",
        displayType: "select",
        translationKey: "ftb3_europarl_language_",
        dataset: {
            "BG": "bg",
            "CS": "cs",
            "DA": "da",
            "DE": "de",
            "EL": "el",
            "EN": "en",
            "ES": "es",
            "ET": "et",
            "EU": "eu",
            "FI": "fi",
            "FR": "fr",
            "GA": "ga",
            "HU": "hu",
            "IT": "it",
            "LT": "lt",
            "LV": "lv",
            "MT": "mt",
            "NL": "nl",
            "PL": "pl",
            "PT": "pt",
            "RO": "ro",
            "SK": "sk",
            "SL": "sl",
            "SV": "sv",
            "und": "und"
        },
        opts: settings.liteOptions
    }
};


// TODO: Move definitions used only in other_languages_mode.js there
// (Jyrki Niemi 2017-12-01)

// ERME

attrlist.testerzya = {};
sattrlist.erme_debug = {}

sattrlist.erme = {
    text_author: {
        label: "text_author"
    },
    text_title: {
        label: "text_booktitle"
    },
    text_corrector: {
        label: "text_corrector"
    },
    text_year: {
        label: "text_year"
    },
    sentence_id: sattrs.sentence_id_hidden,
    sentence_pgno: {
        label: "page_num"
    },
    text_publisher: {
        label: "text_publisher"
    }
};

sattrlist.testerzya = {
    text_author: {
        label: "text_author"
    },
    text_title: {
        label: "text_title"
    },
    text_publisher: {
        label: "text_publisher"
    },
    text_corrector: {
        label: "text_corrector"
    },
    text_usage: {
        label: "text_usage"
    },
    text_year: {
        label: "text_year"
    },
    text_lang: {
        label: "klk_lang",
        displayType: "select",
        translationKey: "klk_lang_",
        dataset: {
            "izh": "izh",
            "kca": "kca",
            "mdf": "mdf",
            "mns": "mns",
            "mrj": "mrj",
            "myv": "myv",
            "sel": "sel",
            "vep": "vep",
            "yrk": "yrk"
        },
        opts: settings.liteOptions
    },
    sentence_id: sattrs.sentence_id_hidden,
	sentence_section: {
        label: "sentence_section"
	    },
	sentence_chapno: {
        label: "sentence_chapno"
	    },
	paragraph_class: {
        label: "paragraph_class"
	    },
	paragraph_lang: {
        label: "paragraph_lang"
	}
};


// Fenno-Ugrica

sattrlist.fennougrica_veps = {
    sentence_id: sattrs.sentence_id_hidden,
    sentence_page: { label: "klk_page"},
    within: settings.spWithin,
    context: settings.spContext,
    text_datefrom: sattrs.date,
    text_year: {
	label: "year"
    },
    text_author: {
        label: "text_author"
    },
    text_title: {
        label: "text_title"
    }


};

attrlist.fennougrica_veps = {
        url: {
            label: "klk_img_url",
            type: "url"
	    /*opts: settings.defaultOptions*/
        }
};

attrlist.fennougrica = {};

sattrlist.fennougrica = {
    within: settings.spWithin,
    context: settings.spContext,
    text_datefrom: sattrs.date,
    text_author: {
        label: "text_author"
    },
    text_title: {
        label: "text_title"
    },
    text_editor: {
        label: "klk_editor"
    },
    text_lang: {
        label: "klk_lang",
        displayType: "select",
        translationKey: "klk_lang_",
        dataset: {
            "izh": "izh",
            "kca": "kca",
            "mdf": "mdf",
            "mns": "mns",
            "mrj": "mrj",
            "myv": "myv",
            "sel": "sel",
            "vep": "vep",
            "yrk": "yrk"
        },
        opts: settings.liteOptions

    },
    text_link: {
        url_opts: sattrs.link_url_opts,
        label: "klk_img_url",
        type: "url"
    }
};


/* KFSPC */
sattrlist.kfspc = {
    sentence_id: sattrs.sentence_id_hidden,
    text_distributor: sattrs.text_distributor,
    text_h_title2: sattrs.text_title,
    text_pubdate2: sattrs.text_pubdate,
    text_publisher: sattrs.text_publisher
};

settings.corpusinfo.kfspc = {
    urn: "urn:nbn:fi:lb-201406035",
    metadata_urn: "urn:nbn:fi:lb-201406036",
    licence: settings.licenceinfo.CC_BY,
};


/* JRC-ACQUIS */

sattrlist.jrc_acquis = {
    sentence_id: sattrs.sentence_id_hidden,
    text_year: {
        label: "year"
    },
    text_title: sattrs.text_title,
    text_filename: {
        label: "file_name",
    }
};


/* TOPLING */

attrlist.topling = {
    type: attrs.wordtype
};

sattrlist.topling = {
    sentence_id: sattrs.sentence_id_hidden,
    text_id: {
	label: "text_id"
        },
    text_student: {
	label: "text_studentno"
	},
    file_edulevel: {
	label: "file_edulevel"
	},
    text_year: {
	label: "year"
	},
    file_round: {
	label: "file_round"
	},
    file_levelops: {
	label: "file_levelops"
	},
    file_exercise: {
	label: "file_exercise"
	},
    file_filetype: {
	label: "file_filetype"
	}
};

attrs.pos_pabivus = {
    label: "pos",
    displayType: "select",
    translationKey: "pos_pabivus_",
    dataset: {
	"_" : "NOT_DEFINED",
	"N" : "N",
	"CLB" : "CLB",
	"V" : "V",
	"Pron" : "Pron",
	"Adv" : "Adv",
	"PUNCT" : "PUNCT",
	"CC" : "CC",
	"A" : "A",
	"Adp" : "Adp",
	"Pcle" : "Pcle",
	"Po" : "Po",
	"Num" : "Num",
	"CS" : "CS",
	"Det" : "Det",
	"Interj" : "Interj",
	"Ad" : "Ad",
	"Hom" : "Hom",
	"C" : "C",
	"Hom1" : "Hom1",
	"Card" : "Card",
	"Pl" : "Pl",
	"Adn" : "Adn",
	"Hom2" : "Hom2",
	"Sg" : "Sg",
	"Temp" : "Temp",
	"Qnt" : "Qnt",
	"Coll" : "Coll",
	"Ord" : "Ord",
	"SP" : "SP",
	"Descr" : "Descr",
	"Prc" : "Prc",
	"IV" : "IV",
	"Der" : "NOT_DEFINED",
	"Err/Dial" : "Err_Dial"
    },
};

attrlist.pabivus = {
    ref: attrs.ref,
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_pabivus,
    msd: attrs.msd
};

sattrlist.pabivus = {
    //text_lang : { label: "" },
    text_id : { label: "text_id" },
    text_iso_lang : { label: "iso_639_code" },
    chapter_id : { label: "pabivus_chapter" },
    sentence_id : { label: "pabivus_verse" }
    //sentence_text : { label: "text" }
};

sattrlist.pabivus_s = {
    //text_lang : { label: "" },
    text_id : { label: "text_id" },
    text_iso_lang : { label: "iso_639_code" },
    chapter_id : { label: "pabivus_chapter" },
    //sentence_id : { label: "pabivus_verse" }
    //sentence_text : { label: "text" }
};


/* --------- */


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


// Add corpus settings for multiple corpora using a template, modified
// with items in infolist, added to folder, with the id constructed
// using id_templ.
//
// Arguments:
// - template: the common definitions for all the corpora
// - infolist: one of the following:
//   1. an array of objects with properties with which to extend the
//      template (should contain the property "id", which is treated
//      as the variable part of the corpus id),
//   2. an array of strings treated as (the variable parts of) corpus
//      ids, or
//   3. an array of two integers (typically years), which denote the
//      start and end values (inclusive) for the variable parts of the
//      ids (converted to strings).
// - folder: the corpus folder to whose "contents" property the
//   corpora are added
// - id_templ: a template for the corpus id: "{}" is replaced with the
//   variable part of the id value taken from the infolist item; if no
//   "{}", treated as a prefix to the id
//
// Occurrences of "{}" in the title, description and id_templ are
// replaced with the variable part of the id specified in the infolist
// item.

settings.fn.add_corpus_settings = function (template, infolist, folder,
					    id_templ) {
    var ids = [];
    // Replace {} with the id in infolist in these properties:
    var id_subst_props = ["title", "description"];

    var add_info = function (info) {
	var info_is_string = (typeof info == "string");
	var id_varpart = (info_is_string ? info : info.id);
	var id = (id_templ.indexOf("{}") > -1
		  ? id_templ.replace(/{}/g, id_varpart)
		  : id_templ + id_varpart);
	// Make a deep copy so that the resulting objects can be
	// safely modified independently of each other if necessary.
	settings.corpora[id] = $.extend(true, {}, template);
	var config = settings.corpora[id];
	if (! info_is_string) {
	    $.extend(config, info);
	}
	config.id = id;
	for (var j = 0; j < id_subst_props.length; j++) {
	    var propname = id_subst_props[j];
	    config[propname] = config[propname].replace(/{}/g, id_varpart);
	}
	ids.push(id);
    };

    if (infolist.length == 2 && Number.isInteger(infolist[0])) {
	for (var id = infolist[0]; id <= infolist[1]; id++) {
	    add_info(id.toString());
	}
    } else {
	for (var i = 0; i < infolist.length; i++) {
	    add_info(infolist[i]);
	}
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


// Generate a declaration for an attribute with Boolean values.
// Arguments:
// - label: attribute translation label
// - yes_no: an array of two items: the corpus values for "yes" and
//   "no"; if omitted, use "y" and "n".
settings.fn.make_bool_attr = function (label, yes_no) {
    var dataset = {};
    if (arguments.length < 2) {
	dataset = {
	    "y": "yes",
	    "n": "no",
	};
    } else {
	dataset[yes_no[0]] = "yes";
	dataset[yes_no[1]] = "no";
    }
    return {
	label: label,
	displayType: "select",
	translationKey: "",
	dataset: dataset,
	opts: settings.liteOptions,
    };
};


// Add an explanation to specific values of an attribute in the
// sidebar. The explanation text is localized, in grey italics,
// enclosed in square brackets. This function is inteded to be used in
// the value of the "pattern" property of an attribute declaration.
// Arguments:
// - value: the value of the attribute
// - value_map: an object whose keys are attribute values to be
//   explained and their values are the explanations of the attribute
//   values corresponding to the keys
// Example:
//   pattern: "<%=settings.fn.make_explained_value(val, {'0': 'no_quote'})%>",
settings.fn.make_explained_value = function (value, value_map) {
    if (value in value_map) {
	value += (" <i style=\"color: grey;\">[<span rel=\"localize["
		  + value_map[value] + "]\"></span>]</i>");
    }
    return value;
};


// Add a zero-width space before "T" to allow more logical
// line-breaking of an ISO datetime value.
settings.fn.stringify_iso_datetime = function (val) {
    return val.replace(/T/g, "<wbr>T");
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


// Functions for the video page

// Return the milliseconds value ms0 formatted as hh:mm:ss.xxx
settings.fn.ms_to_hms = function (ms0) {
    // Adapted from https://stackoverflow.com/a/2998822
    var pad = function (num, len) {
	var s = "000" + Math.floor(num).toString();
	return s.substr(s.length - len);
    }
    ms0 = parseInt(ms0);
    var ms = pad(ms0 % 1000, 3);
    var s = pad(ms0 / 1000 % 60, 2);
    var m = pad(ms0 / 60000 % 60, 2);
    var h = pad(ms0 / 3600000, 1);
    return (h + ":" + m + ":" + s
	    + util.getLocaleString("util_decimalseparator") + ms);
};


// Make the URL to the video page with information encoded in
// parameters.
//
// This function is tailored to generate the value for a synthetic
// attribute. This function was developed for the Eduskunta corpus,
// but it aims to be more general-purpose. However, it might need to
// be modified (generalized further) when used for other corpora.
//
// Arguments:
// - corpus_id: the id of the corpus linking to the video page
// - token_data: the token data passed to the stringify_synthetic
//   function
// - video_url: the URL of the original video shown on the video page
// - msec2sec_attrs: ids of structural attributes whose values should
//   be converted from milliseconds to seconds
// - omit_attrs: the structural attributes not to be passed to the
//   video page
settings.fn.make_videopage_url = function (corpus_id, token_data, video_url,
					   msec2sec_attrs, omit_attrs) {
    // console.log("settings.fn.make_videopage_url", token_data);
    var msec_to_sec = function (sec) {
	return (parseInt(sec) / 1000).toString();
    };
    var append_attr = function (key, val, attrdef, text_attrs) {
	var name = (util.getLocaleStringUndefined(attrdef.label)
		    || attrdef.label);
	if (name) {
	    if (msec2sec_attrs.includes(key)) {
		val = msec_to_sec(val);
	    } else if (attrdef.renderItem) {
	    	val = attrdef.renderItem(
	    	    key, val, attrdef, token_data.pos_attrs,
	    	    token_data.struct_attrs, token_data.tokens);
	    } else if (attrdef.translationKey != undefined) {
		if (attrdef.dataset && ! _.isArray(attrdef.dataset)) {
		    val = (attrdef.dataset != undefined
			   ? attrdef.dataset[val]
			   : val);
		}
		var loc_val = util.getLocaleStringUndefined(
		    attrdef.translationKey + val);
		if (loc_val != undefined) {
		    val = loc_val;
		}
	    } else if (val == "") {
		val = util.getLocaleString("unknown");
	    }
	    text_attrs[key] = name + "," + val;
	}
    };
    var make_licence_info = function (corpus_conf) {
	// A single quote does not seem to be encoded correctly, so
	// change single quotes to double ones. FIXME: This assumes
	// that single quotes are used only to delimit attribute
	// values.
	var licence_text = util.formatCorpusExtraInfo(
	    corpus_conf, { info_items: ["licence"],
			   static_localization: true })
	    .replace(/'/g, "\"");
	// A kludge to put the video licence first: assumes that its
	// localized label contains the string "video"
	return licence_text.replace(
	    /^(.*?)(<br\s*\/?>)(Li.*?video.*)$/, "$3$2$1");
    };
    // Would it be better to declare the base URL (prefix) somewhere
    // else?
    var prefix = "markup/video_page.html#";
    var words = [];
    var tokens = token_data.tokens;
    var match_types = ["_matchSentence", "_match"];
    for (var i = 0; i < tokens.length; i++) {
	var word = tokens[i].word;
	for (var j = 0; j < match_types.length; j++) {
	    var match_type = match_types[j];
	    if (tokens[i][match_type]) {
		if (i == 0 || ! tokens[i - 1][match_type]) {
		    word = ("<span class=\"" + match_type.substr(1) + "\">"
			    + word);
		}
		if (i == tokens.length - 1 || ! tokens[i + 1][match_type]) {
		    word += "</span>";
		}
	    }
	}
	words.push(word);
    }
    var text_attrs = {};
    var corpus_conf = settings.corpora[corpus_id];
    var attr_types = ["struct", "custom"];
    for (var i = 0; i < attr_types.length; i++) {
	var attr_type = attr_types[i] + "_attributes";
	for (var key in corpus_conf[attr_type]) {
	    if (! omit_attrs.includes(key)) {
		var attrdef = corpus_conf[attr_type][key];
		// console.log(key, attrdef);
		append_attr(
		    key,
		    (attr_type == "struct_attributes"
		     ? token_data.struct_attrs[key] : null),
		    attrdef, text_attrs);
	    }
	}
    }
    var params = {
	lang: window.lang || settings.defaultLanguage,
	src: video_url,
	corpusname: corpus_conf.title,
	metadata_urn: corpus_conf.metadata_urn,
	licence_info: make_licence_info(corpus_conf),
	korp_url: window.location.href,
	utterance: "<span class=\"utterance\">" + words.join(" ") + "<span>",
	text_attributes: JSON.stringify(text_attrs),
    };
    // console.log(params);
    var paramstr = "";
    for (var key in params) {
	if (paramstr != "") {
	    paramstr += "&";
	}
	paramstr += key + "=" + encodeURIComponent(params[key]);
    }
    return prefix + paramstr;
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


// Functions used to make page URL attribute values

settings.fn.make_klk_url_base = function (data) {
    return ("http://digi.kansalliskirjasto.fi/"
	    + data.struct_attrs.text_publ_type
	    + "/binding/"
	    + data.struct_attrs.text_binding_id);
};

// Return the argument word with non-word characters removed
settings.fn.remove_non_word_chars = function (word) {
    // Modified from
    // http://stackoverflow.com/questions/11598786/how-to-replace-non-printable-unicode-characters-javascript,
    // which was from
    // https://github.com/slevithan/XRegExp/blob/master/src/addons/unicode/unicode-categories.js#L28
    var non_word_chars_re = /[\0-\x2C\x2E\x2F\x3B-\x40\x5B-\x60\x7B-\x9F\xAD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BB-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/g;
    return (word.replace(non_word_chars_re, "")
	    // Remove word-initial and word-final colons; leave
	    // hyphens intact.
	    .replace(/^:+/, "")
	    .replace(/:+$/, ""));
}

// Return the string of context_size words before and after
// token_data.pos_attrs.word.
settings.fn.find_context_words = function (token_data, context_size) {
    var main_word =
	settings.fn.remove_non_word_chars(token_data.pos_attrs.word);
    if (context_size == 0) {
	return main_word;
    }
    var wordnum = token_data.pos_attrs.ref - 1;
    var words = [];
    if (main_word) {
	words.push(main_word);
    }
    var numwords = 0;
    for (var i = wordnum - 1; i >= 0 && numwords < context_size; i--) {
	var word = settings.fn.remove_non_word_chars(token_data.tokens[i].word);
	if (word) {
	    words.unshift(word);
	    numwords++;
	}
    }
    var numtokens = token_data.tokens.length;
    numwords = 0;
    for (var i = wordnum + 1; i < numtokens && numwords < context_size; i++) {
	var word = settings.fn.remove_non_word_chars(token_data.tokens[i].word);
	if (word) {
	    words.push(word);
	    numwords++;
	}
    }
    return words.join(" ");
}

// Return a KLK page image URL for a token, with the specified context
// size.
settings.fn.make_klk_page_image_url = function (token_data, context_size) {
    var words = settings.fn.find_context_words(token_data, context_size);
    return (settings.fn.make_klk_url_base(token_data)
	    + "?page=" + token_data.struct_attrs.text_page_no)
	    + (words ? "&term=" + words : "");
}


// Common settings template for FTC, FSTC and Svenska Parole (may be
// overridden)
settings.templ.lemmie_common = {
    title: "",
    description: "",
    id: "",
    within: settings.spWithin,
    context: settings.spContext,
    limited_access: true,
    licence_type: "RES",
    attributes: {
    },
    struct_attributes: {
	text_title: sattrs.text_title,
	text_creator: sattrs.author,
	text_publisher: sattrs.publisher,
	text_wordcount: {
	    label: "text_word_count",
	},
	text_lemmie_id: {
	    label: "lemmie_text_id",
	},
	text_lang: {
	    label: "lang",
	    displayType: "select",
	    opts: settings.liteOptions,
	    translationKey: "",
	    dataset: [
		"fin",
		"eng",
		"swe",
	    ]
	},
	text_date: sattrs.date,
	text_filename: {
	    label: "file_name",
	},
	text_rights: {
	    label: "access_rights_cat",
	},
	text_contributor: {
	    label: "contributor",
	},
	text_source: {
	    label: "source",
	    displayType: "select",
	    localize: false,
	    opts: settings.liteOptions,
	    // dataset: [],
	},
	text_lemmie_corpus: {
	    label: "lemmie_corpus",
	},
	// // Always empty
	// text_type: {
	//     label: "text_type",
	// },
	text_subject: {
	    label: "subject",
	},
	// paragraph_id: sattrs.paragraph_id,
	paragraph_type: {
	    label: "paragraph_type",
	    displayType: "select",
	    translationKey: "paragraphtype_",
	    dataset: {},
	    opts: settings.liteOptions
	},
	sentence_id: sattrs.sentence_id_hidden,
	sentence_within: {
	    label: "enclosing_elems",
	},
    }
};
