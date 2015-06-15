/* lemma => grundform, base form
 * lexem => lemgram, lemgram
 *
 */
var settings = {};

var isLab = window.isLab || false;

var isProductionServer = (window.location.hostname.indexOf(".csc.fi") != -1);
var isProductionServerTest =
    (isProductionServer
     && (window.location.pathname.indexOf("test/") != -1
	 || window.location.pathname.indexOf("test-") != -1));
var isProductionServerBeta =
    (isProductionServer && window.location.pathname.indexOf("beta") != -1);
var isProductionServerOld =
    (isProductionServer && window.location.pathname.indexOf("old/") != -1);
var isPublicServer = (window.location.hostname != "localhost");

c.log("Production server:", isProductionServer);

var baseURL = (window.location.protocol + "//" + window.location.hostname
               + window.location.pathname);

settings.lemgramSelect = true;
settings.autocomplete = true;
// settings.wordpicture = false;
settings.hits_per_page_default = 25
settings.name_classification = true;

settings.textDateAllowBareYears = true;

settings.downloadFormats = [
    "annot",
    "ref",
    "nooj"
];
if (! isProductionServer || isProductionServerTest) {
    settings.downloadFormats = settings.downloadFormats.concat([
	"csvp",
	"csv",
	"tsv",
	"text"
    ]);
}
if (! isProductionServer) {
    settings.downloadFormats.push("vrt");
}

settings.downloadFormatParams = {
    "*": {
	structs: "+"
    },
    "ref": {
	format: "bibref,xls"
    },
    "csvp": {
	format: "tokens,csv",
	attrs: "+,-lex",
	match_marker: "***"
    },
    "csv": {
	format: "sentences,csv"
    },
    "annot": {
	format: "tokens,xls",
	attrs: "+,-lex",
	match_marker: "***"
    },
    "nooj": {
	attrs: "+"
    },
    "tsv": {
	format: "sentences,tsv"
    },
    "vrt": {
	attrs: "+"
    },
};

settings.cgi_prefix =
    (isProductionServerBeta
     ? "/cgi-bin/korp-beta/"
     : (isProductionServerOld ?
	"/cgi-bin/korp-old/"
	: (isProductionServer ? "/cgi-bin/" : "/cgi-bin/korp/")));
settings.cgi_script = settings.cgi_prefix + "korp.cgi";
settings.lemgrams_cgi_script = settings.cgi_prefix + "korp_lemgrams.cgi";
settings.download_cgi_script = settings.cgi_prefix + "korp_download.cgi";

settings.urnResolver = "http://urn.fi/";

// for extended search dropdown, can be 'union' or 'intersection'
settings.word_attribute_selector = "union"
settings.struct_attribute_selector = "union"

// for 'compile statistics by' selector, can be 'union' or 'intersection'
settings.reduce_word_attribute_selector = "union" 
settings.reduce_struct_attribute_selector = "intersection"

// settings.news_desk_url = "https://svn.spraakdata.gu.se/sb-arkiv/pub/component_news/json/korpnews.json";
settings.news_desk_url = 
    window.location.protocol + "//" + window.location.hostname + "/"
    + window.location.pathname + "news/json/korp"
    + (isProductionServerBeta ? "beta" : "") + "news.json";

// authenticationType: "basic", "shibboleth" or "none"
settings.authenticationType = (isProductionServer ? "shibboleth" : "basic");
// Login and logout URLs to use with Shibboleth authentication if
// authenticationType == "shibboleth"
// for eduGAIN / CSC Account:
// settings.shibbolethLoginUrl = baseURL + "shibboleth-ds/index.html";
settings.shibbolethLoginUrl = function () {
    return ("/shibboleth-ds/index.html?"
           + encodeURIComponent(window.location.href + "&shib_logged_in"));
};
// settings.shibbolethLogoutUrl =
//     "https://korp.csc.fi/Shibboleth.sso/Logout?return=" + encodeURI(baseURL);
settings.shibbolethLogoutUrl = function () {
    return ("/Shibboleth.sso/Logout?return="
            + encodeURIComponent(window.location.href));
}

// The supported corpus extra info items, typically links. If you add
// a new item X, also remember to add corresponding translations for
// the link text to locale-??.json with the key "corpus_X".
settings.corpusExtraInfoItems = [
    "urn",
    "metadata",
    "licence",
    "homepage",
    "compiler",
    "download",
];

// The extra info (usually links) to be shown in the corpus info box
// of the corpus chooser and the KWIC results sidebar.
settings.corpusExtraInfo = {
    corpus_infobox : settings.corpusExtraInfoItems,
    sidebar : ["urn", "metadata", "licence", "download"]
};

settings.wordPictureMaxWords = 30;

settings.wordpictureTagset = {
    // supported pos-tags
    verb : "vb",
    noun : "nn",
    adjective : "jj",
    adverb : "ab",
    // preposition : "pp",

    // dependency releations
    subject : "ss",
    object : "obj",
    adverbial : "adv",
    // preposition_rel : "pa",
    pre_modifier : "at",
    post_modifier : "et"

}


settings.wordPictureConf = {
    verb : [[
        {rel : "subject", css_class : "color_blue"}, 
        "_",
        {rel : "object", css_class : "color_purple"},
        {rel : "adverbial", css_class : "color_green"}
    ]],
    noun : [
        [ // {rel : "preposition_rel", css_class : "color_yellow", field_reverse: true}, 
         {rel : "pre_modifier", css_class : "color_azure"}, 
         "_", 
         {rel : "post_modifier", css_class : "color_red"}], 

        ["_", {rel : "subject", css_class : "color_blue", field_reverse: true, alt_label : "vb"}], 
        [{rel : "object", css_class : "color_purple", field_reverse: true, alt_label : "vb"}, "_"]
    ],
    adjective : [["_", {rel: "pre_modifier", css_class : "color_yellow", field_reverse : true}]],
    adverb : [["_", {rel: "adverbial", css_class : "color_yellow", field_reverse : true}]],
    // preposition : [["_", {rel: "preposition_rel", css_class : "color_green"}]]
    
}

// Configure the grouping of name categories in name
// classification results.
settings.name_groups = [
    {label : "person", regex : "EnamexPrs.*"},
    {label : "place", regex : "EnamexLoc.*"},
    {label : "organization", regex : "EnamexOrg.*"},
    {label : "other", regex : "(Nu|Ti)mex.*"},
];
settings.name_group_max_names = 30;

settings.visibleModes = 6
settings.modeConfig = [
    {
        localekey: "modern_texts",
        mode: "default"
    },
/*
    {
	localekey: "finnish_national_library_texts",
	mode: "finnish_national_library"
    },
    {
	localekey: "old_finnish_texts",
	mode: "old_finnish"
    },
*/
    {
	localekey: "swedish_texts",
	mode: "swedish"
    },
    {
	localekey: "other_languages_texts",
	mode: "other_languages"
    },
    {
        localekey: "parallel_texts",
        mode: "parallel"
    }
 
];

settings.languages = ["fi", "sv", "en"];

// Namespace for functions used in configuring corpora
settings.fn = {};
// Namespace for corpus configuration templates
settings.templ = {};


var karpLemgramLink = "http://spraakbanken.gu.se/karp/#search=cql%7C(lemgram+%3D+%22<%= val.replace(/:\\d+/, '') %>%22)+sortBy+lemgram";

settings.primaryColor = "rgb(221, 233, 255)";
settings.primaryLight = "rgb(242, 247, 255)";
settings.secondaryColor = "";
settings.corpora = {};
settings.defaultContext = {
    "1 sentence" : "1 sentence"
};
settings.spContext = {
    "1 sentence" : "1 sentence",
    "1 paragraph" : "1 paragraph"
};
settings.defaultWithin = {
    "sentence" : "sentence"
};
settings.spWithin = {
    "sentence" : "sentence",
    "paragraph" : "paragraph"
};

settings.defaultLanguage = "fi";

// Corpus id alias mapping: aliases as property keys and actual corpus
// ids as values. (Jyrki Niemi 2015-04-23)
settings.corpus_aliases = {};

/*
 * ATTRIBUTES
 */
// for optimization purposes
settings.cqp_prio = ['deprel', 'pos', 'msd', 'suffix', 'prefix', 'grundform', 'lemgram', 'saldo', 'word'];


settings.defaultOptions = {
    "is" : "=",
    "is_not" : "!=",
    "starts_with" : "^=",
    "contains" : "_=",
    "ends_with" : "&=",
    "matches" : "*=",
    "matches_not" : "!*=",
}
settings.liteOptions = {
    "is" : "=",
    "is_not" : "!="
}
settings.setOptions = {
    "is" : "contains",
    "is_not" : "not contains"
}


var selectType = {
    extended_template : "<select ng-model='model' "
     + "ng-options='tuple[0] as localize(tuple[1]) for tuple in dataset' ></select>",
    controller : function($scope) {
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
}

var attrs = {};  // positional attributes
var sattrs = {}; // structural attributes

// TODO: Replace the corpus- or annotation-specific translationKeys in
// pos and deprel attributes with the generic pos_ and deprel_, so
// that the translations need not be specified twice in the
// translations files.

attrs.pos = {
    label : "pos",
    displayType : "select",
    translationKey : "pos_",
    dataset : {
        "AB" : "AB",
        "MID|MAD|PAD" : "DL",
        "DT" : "DT",
        "HA" : "HA",
        "HD" : "HD",
        "HP" : "HP",
        "HS" : "HS",
        "IE" : "IE",
        "IN" : "IN",
        "JJ" : "JJ",
        "KN" : "KN",
        "NN" : "NN",
        "PC" : "PC",
        "PL" : "PL",
        "PM" : "PM",
        "PN" : "PN",
        "PP" : "PP",
        "PS" : "PS",
        "RG" : "RG",
        "RO" : "RO",
        "SN" : "SN",
        "UO" : "UO",
        "VB" : "VB"
    },
    opts : settings.liteOptions,
    extended_template : selectType.extended_template,
    controller : selectType.controller,


};
attrs.pos_ftb2 = {
    label : "pos",
    displayType : "select",
    translationKey : "posftb2_",
    dataset : {
	"A" : "A",
	"Abbr" : "Abbr",
	"Adp" : "Adp",
	"Adv" : "Adv",
	"CC" : "CC",
	"Con" : "Con",
	"CS" : "CS",
	// "Interj|INTERJ" : "Interj",
	"Interj" : "Interj",
	// "N|Noun" : "N",
	"N" : "N",
	"Num" : "Num",
	"POST" : "POST",
	"Pron" : "Pron",
	"Pun" : "Pun",
	"V" : "V"
    },
    opts : settings.liteOptions
};
/*
attrs.pos_ftb3 = {
    label : "pos",
    displayType : "select",
    translationKey : "posftb3_",
    dataset : {
	"A" : "A",
	"Abbr" : "Abbr",
	"Adp" : "Adp",
	"Adp|Po" : "Post",
	"Adv" : "Adv",
	"Art" : "Art",
	"CC" : "CC",
	"Con|C" : "Con",
	"CS" : "CS",
	"Forgn" : "Forgn",
	"Interj|INTERJ" : "Interj",
	"N|Noun" : "N",
	"Num" : "Num",
	"Pron" : "Pron",
	"PrfPrc" : "PrfPrc",
	"PrsPrc" : "PrsPrc",
	"Punct" : "Punct",
	"V" : "V",
	"[NON-TWOL]" : "NonTWOL"
    },
    opts : settings.liteOptions
};
attrs.pos_ftb3_orig = {
    label : "pos_orig",
    translationKey : "posftb3_",
    dataset : {
	"A" : "A",
	"Abbr" : "Abbr",
	"Adp" : "Adp",
	"Adp|Po" : "Post",
	"Adv" : "Adv",
	"Art" : "Art",
	"CC" : "CC",
	"Con|C" : "Con",
	"CS" : "CS",
	"Forgn" : "Forgn",
	"Interj|INTERJ" : "Interj",
	"N|Noun" : "N",
	"Num" : "Num",
	"Pron" : "Pron",
	"PrfPrc" : "PrfPrc",
	"PrsPrc" : "PrsPrc",
	"Punct" : "Punct",
	"V" : "V",
	"[NON-TWOL]" : "NonTWOL"
    },
    opts : settings.defaultOptions
};
*/
attrs.ner_tags = {
    label : "ner_tags",
    displayType : "select",
    translationKey: "ner_tags_",
    opts : settings.liteOptions,
    dataset : {
        "_" : "_",
        "EnamexPrsHum" : "EnamexPrsHum",
        "TimexTmeDat" : "TimexTmeDat",
        "NumexMsrCur" : "NumexMsrCur",
        "NumexMsrXxx" : "NumexMsrXxx",
        "EnamexOrgCrp" : "EnamexOrgCrp",
        "EnamexLocXxx" : "EnamexLocXxx",
        "EnamexLocGpl" : "EnamexLocGpl",
        "EnamexLocPpl" : "EnamexLocPpl",
        "EnamexPrsTit" : "EnamexPrsTit",
        "EnamexOrgTvr" : "EnamexOrgTvr",
        "EnamexOrgPlt" : "EnamexOrgPlt",
        "EnamexLocStr" : "EnamexLocStr",
        "EnamexOrgAth" : "EnamexOrgAth",
        "EnamexOrgEdu" : "EnamexOrgEdu",
        "EnamexOrgClt" : "EnamexOrgClt"
    }
};


attrs.pos_ftb31 = {
    label : "pos",
    displayType : "select",
    translationKey : "posftb3_",
    dataset : {
	"A" : "A",
	"Abbr" : "Abbr",
	"Adp" : "Adp",
	"Adv" : "Adv",
	"AgPrc" : "AgPrc",
	"CC" : "CC",
	"CS" : "CS",
	"Forgn" : "Forgn",
	"Interj" : "Interj",
	"N" : "N",
	"NegPrc" : "NegPrc",
	"Num" : "Num",
	"PrfPrc" : "PrfPrc",
	"Pron" : "Pron",
	"PrsPrc" : "PrsPrc",
	"Punct" : "Punct",
	"TrunCo" : "TrunCo",
	"Unkwn" : "Unkwn",
	"V" : "V"
    },
    opts : settings.liteOptions
};
attrs.pos_kotus = {
    label : "pos",
    displayType : "select",
    translationKey : "poskotus_",
    dataset : {
	// Some of the following POS codes might be coding errors in
	// the corpora (usually very few occurrences): CMPR, D, DA-US,
	// DA-UUS, DN-INEN, DN-LLINEN, DN-TON, DV-MA (?), DV-TTA,
	// FORGN, INTJ, P, PROP, REL, null (empty)
	"A" : "A",
	"ABBR" : "Abbr",
	"AD-A" : "AdA",
	"ADV" : "Adv",
	"A/N" : "AN",
	"C" : "Con",
	"CMPR" : "Cmpr",
	"D" : "D",
	"DA-US" : "DaUs",
	"DA-UUS" : "DaUus",
	"DN-INEN" : "DnInen",
	"DN-LLINEN" : "DnLlinen",
	"DN-TON" : "DnTon",
	"DV-MA" : "DvMa",
	"DV-TTA" : "DvTta",
	"FORGN" : "Forgn",
	"INTJ" : "Interj",
	"N" : "N",
	"NUM" : "Num",
	"P" : "P",
	"PCP1" : "Pcp1",
	"PCP2" : "Pcp2",
	"PP" : "Pp",
	"PRON" : "Pron",
	"PROP" : "Prop",
	"PSP" : "Post",
	"PUNCT" : "Punct",
	"REFL/PRON" : "ReflPron",
	"REL" : "Rel",
	"#UNKNOWN" : "Unknown",
	"V" : "V",
	// null corresponds to an __UNDEF__ value in CWB, resulting
	// from an empty value in the VRT file.
	"null" : "null"
    },
    opts : settings.liteOptions
};
attrs.pos_mulcold_fi = {
    label : "pos",
    displayType : "select",
    translationKey : "posmulcoldfi_",
    dataset : {
	"A" : "A",
	"Abbr" : "Abbr",
	"ADV" : "Adv",
	"Aux" : "Aux",
	"CC" : "CC",
	"CS" : "CS",
	"Heur" : "Heur",
	"N" : "N",
	"NUM" : "Num",
	"POST" : "Post",
	"PREP" : "Prep",
	"PRON" : "Pron",
	"pun" : "Punct",
	"UNKNOWN" : "UNKNOWN",
	"V" : "V"
    },
    opts : settings.liteOptions
};
attrs.pos_mulcold_ru = {
    label : "pos",
    displayType : "select",
    translationKey : "posmulcoldru_",
    dataset : {
	"Adj" : "Adj",
	"Adv" : "Adv",
	"Conj" : "Conj",
	"Gerund" : "Gerund",
	"Interj" : "Interj",
	"Noun" : "Noun",
	"Numeral" : "Numeral",
	"Part" : "Part",
	"Particle" : "Particle",
	"Predicative" : "Predicative",
	"Preposition" : "Preposition",
	"Pron" : "Pron",
	"pun" : "Punct",
	"UNKNOWN" : "UNKNOWN",
	"Verb" : "Verb"
    },
    opts : settings.liteOptions
};
attrs.pos_mulcold_en = {
    label : "pos",
    displayType : "select",
    translationKey : "posmulcolden_",
    dataset : {
	"A" : "A",
	"ABBR" : "ABBR",
	"ADV" : "ADV",
	"CC" : "CC",
	"CS" : "CS",
	"DET" : "DET",
	"EN" : "EN",
	"Ex" : "EX",
	"INFMARK" : "INFMARK",
	"ING" : "ING",
	"N" : "N",
	"NEG-PART" : "NEG-PART",
	"NUM" : "NUM",
	"PREP" : "PREP",
	"PRON" : "PRON",
	"pun" : "Punct",
	"Rel" : "REL",
	"UNKNOWN" : "UNKNOWN",
	"V" : "V"
    },
    opts : settings.liteOptions
};
attrs.pos_mulcold_sv = {
    label : "pos",
    displayType : "select",
    translationKey : "posmulcoldsv_",
    dataset : {
	"A" : "A",
	"ADV" : "ADV",
	"CC" : "CC",
	"CS" : "CS",
	"DET" : "DET",
	"N" : "N",
	"NUM" : "NUM",
	"PREP" : "PREP",
	"PRON" : "PRON",
	"pun" : "Punct",
	"UNKNOWN" : "UNKNOWN",
	"V" : "V"
    },
    opts : settings.liteOptions
};
attrs.pos_klk = {
    label : "pos",
    displayType : "select",
    translationKey : "pos_klk_",
    dataset : {
	"" : "",
	"A" : "A",
	"Adp" : "Adp",
	"Adv" : "Adv",
	"C" : "C",
	"Foreign" : "Foreign",
	"Interj" : "Interj",
	"N" : "N",
	"Num" : "Num",
	"Pron" : "Pron",
	"Punct" : "Punct",
	"Symb" : "Symb",
	"V" : "V"
    },
    opts : settings.liteOptions
};

attrs.msd = {
    label : "msd",
    opts : settings.defaultOptions,
    // Empty taginfo_url disables the info link to MSD tags in the
    // used sidebar; another value would link to the given URL; and an
    // undefined value would link to the default markup/msd.html.
    taginfo_url : ""
};
attrs.msd_sv = {
    label : "msd",
    opts : settings.defaultOptions,
    extended_template : '<input class="arg_value" ng-model="input" escaper>' +
    '<span ng-click="onIconClick()" class="ui-icon ui-icon-info"></span>',
    controller : function($scope, $modal) {
        var modal = null;

        $scope.onIconClick = function() {
            modal = $modal.open({
                template : '<div>' +
                                '<div class="modal-header">' +
                                    '<h3 class="modal-title">{{\'msd_long\' | loc}}</h3>' +
                                    '<span ng-click="clickX()" class="close-x">×</span>' +
                                '</div>' +
                                '<div class="modal-body" ng-click="msdClick($event)" ng-include="\'markup/msd.html\'"></div>' +
                            '</div>',
                scope : $scope
            })
        }
        $scope.clickX = function(event) {
            modal.close()
        }
        $scope.msdClick = function(event) {
            val = $(event.target).parent().data("value")
            if(!val) return;
            $scope.input = val;


            modal.close();
        }
    }
};
attrs.baseform_sv = {
    label : "baseform",
    type : "set",
    displayType : "autocomplete",
    stringify : function(baseform) {
        return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts : settings.setOptions,
    extended_template : "<input korp-autocomplete model='model' stringify='stringify' sorter='sorter' type='baseform' >",
    controller : function($scope) {
        $scope.stringify = util.lemgramToString;
        $scope.sorter = view.lemgramSort;
    }

};
attrs.baseform = {
    label : "baseform",
    // type : "set",
    // displayType : "autocomplete",
    stringify : function(baseform) {
        return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts : settings.defaultOptions
};
attrs.baseform_ftb2 = {
    label : "baseform",
    // type : "set",
    // displayType : "autocomplete",
    stringify : function(baseform) {
        return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts : settings.defaultOptions
};
attrs.baseform_compound = {
    label : "baseform_compound",
    // type : "set",
    // displayType : "autocomplete",
    stringify : function(baseform) {
        return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts : settings.defaultOptions
};

attrs.lemgram = {
    label : "lemgram",
    type : "set",
    displayType : "autocomplete",
    opts : settings.setOptions,
    stringify : function(lemgram) {
        // if(_.contains(lemgram, " "))
        // TODO: what if we're getting more than one consequtive lemgram back?
        return util.lemgramToString(_.str.trim(lemgram), true);
    },
    externalSearch : karpLemgramLink,
    internalSearch : true,
    extended_template : "<input korp-autocomplete model='model' stringify='stringify' sorter='sorter' type='lem' >",
    controller : function($scope) {
        $scope.stringify = util.lemgramToString;
        $scope.sorter = view.lemgramSort;
    }
};
attrs.lemgram_hidden = {
    label : "lemgram",
    type : "set",    // Seems to work only if this is "set" even if "hidden"
    displayType : "hidden",
    // opts : settings.liteOptions
};

attrs.saldo = {
    label : "saldo",
    type : "set",
    displayType : "autocomplete",
    opts : settings.setOptions,
    stringify : function(saldo) {
        return util.saldoToString(saldo, true);
    },
    externalSearch : "http://spraakbanken.gu.se/karp/#search-tab-1&search=cql|(saldo+%3D+<%= val %>)",
    internalSearch : true,
    extended_template : "<input korp-autocomplete model='model' stringify='stringify' sorter='sorter' type='saldo' >",
    controller : function($scope) {
        $scope.stringify = util.saldoToString;
        $scope.sorter = view.saldoSort;
    }
};
attrs.dephead = {
    label : "dephead",
    displayType : "hidden"
};
attrs.deprel = {
    label : "deprel",
    displayType : "select",
    translationKey : "deprel_",
    extended_template : selectType.extended_template,
    controller : selectType.controller,
    dataset : {
        "++" : "++",
        "+A" : "+A",
        "+F" : "+F",
        "AA" : "AA",
        "AG" : "AG",
        "AN" : "AN",
        "AT" : "AT",
        "CA" : "CA",
        "DB" : "DB",
        "DT" : "DT",
        "EF" : "EF",
        "EO" : "EO",
        "ES" : "ES",
        "ET" : "ET",
        "FO" : "FO",
        "FP" : "FP",
        "FS" : "FS",
        "FV" : "FV",
        "I?" : "I?",
        "IC" : "IC",
        "IG" : "IG",
        "IK" : "IK",
        "IM" : "IM",
        "IO" : "IO",
        "IP" : "IP",
        "IQ" : "IQ",
        "IR" : "IR",
        "IS" : "IS",
        "IT" : "IT",
        "IU" : "IU",
        "IV" : "IV",
        "JC" : "JC",
        "JG" : "JG",
        "JR" : "JR",
        "JT" : "JT",
        "KA" : "KA",
        "MA" : "MA",
        "MS" : "MS",
        "NA" : "NA",
        "OA" : "OA",
        "OO" : "OO",
        "OP" : "OP",
        "PL" : "PL",
        "PR" : "PR",
        "PT" : "PT",
        "RA" : "RA",
        "SP" : "SP",
        "SS" : "SS",
        "TA" : "TA",
        "TT" : "TT",
        "UK" : "UK",
        "VA" : "VA",
        "VO" : "VO",
        "VS" : "VS",
        "XA" : "XA",
        "XF" : "XF",
        "XT" : "XT",
        "XX" : "XX",
        "YY" : "YY",
        "CJ" : "CJ",
        "HD" : "HD",
        "IF" : "IF",
        "PA" : "PA",
        "UA" : "UA",
        "VG" : "VG"
    },
    opts : settings.liteOptions
};
attrs.deprel_ftb2 = {
    label : "deprel",
    displayType : "select",
    translationKey : "deprelftb2_",
    opts : settings.liteOptions,
    dataset : {
	"advl" : "advl",
	"attr" : "attr",
	"aux" : "aux",
	"comp" : "comp",
	"conjunct" : "conjunct",
	// "idiom|idom" : "idiom",
	"idiom" : "idiom",
	"main" : "main",
	"mod" : "mod",
	"modal" : "modal",
	"obj" : "obj",
	"phrm" : "phrm",
	"phrv" : "phrv",
	"scomp" : "scomp",
	"subj" : "subj",
	"voc" : "voc",
	"_" : "_",
    }
};
attrs.deprel_tdt = {
    label : "deprel",
    displayType : "select",
    translationKey : "deprel_tdt_",
    opts : settings.liteOptions,
    dataset : {
	"_" : "_",
	"acomp" : "acomp",
	"adpos" : "adpos",
	"advcl" : "advcl",
	"advmod" : "advmod",
	"amod" : "amod",
	"appos" : "appos",
	"arg" : "arg",
	"aux" : "aux",
	"auxpass" : "auxpass",
	"cc" : "cc",
	"ccomp" : "ccomp",
	"comp" : "comp",
	"compar" : "compar",
	"comparator" : "comparator",
	"complm" : "complm",
	"conj" : "conj",
	"cop" : "cop",
	"csubj" : "csubj",
	"csubj-cop" : "csubj-cop",
	"dep" : "dep",
	"det" : "det",
	"dobj" : "dobj",
	"ellipsis" : "ellipsis",
	"gobj" : "gobj",
	"gsubj" : "gsubj",
	"iccomp" : "iccomp",
	"infmod" : "infmod",
	"intj" : "intj",
	"mark" : "mark",
	"mod" : "mod",
	"name" : "name",
	"neg" : "neg",
	"nn" : "nn",
	"nommod" : "nommod",
	"nommod-own" : "nommod-own",
	"nsubj" : "nsubj",
	"nsubj-cop" : "nsubj-cop",
	"num" : "num",
	"number" : "number",
	"parataxis" : "parataxis",
	"partmod" : "partmod",
	"poss" : "poss",
	"preconj" : "preconj",
	"prt" : "prt",
	"punct" : "punct",
	"quantmod" : "quantmod",
	"rcmod" : "rcmod",
	"rel" : "rel",
	"ROOT" : "ROOT",
	"subj" : "subj",
	"voc" : "voc",
	"xcomp" : "xcomp",
	"xsubj" : "xsubj",
	"xsubj-cop" : "xsubj-cop"
    }
};
attrs.prefix = {
    label : "prefix",
    type : "set",
    displayType : "autocomplete",
    opts : settings.setOptions,
    stringify : function(lemgram) {
        return util.lemgramToString(lemgram, true);
    },
    externalSearch : karpLemgramLink,
    internalSearch : true,
    extended_template : "<input korp-autocomplete model='model' stringify='stringify' sorter='sorter' type='lem' >",
    controller : function($scope) {
        $scope.stringify = util.lemgramToString;
        $scope.sorter = view.lemgramSort;
    }
};
attrs.suffix = {
    label : "suffix",
    type : "set",
    displayType : "autocomplete",
    opts : settings.setOptions,
    stringify : function(lemgram) {
        return util.lemgramToString(lemgram, true);
    },
    externalSearch : karpLemgramLink,
    internalSearch : true,
    extended_template : "<input korp-autocomplete model='model' stringify='stringify' sorter='sorter' type='lem' >",
    controller : function($scope) {
        $scope.stringify = util.lemgramToString;
        $scope.sorter = view.lemgramSort;
    }
};
attrs.ref = {
    label : "ref",
    displayType : "hidden"
};
attrs.link = {
    label : "sentence_link"
};

attrs.text = {
    label : "text"
};
attrs.spoken = {
    label : "spoken",
    opts : settings.defaultOptions
};
attrs.origword = {
    label : "word_orig",
    opts : settings.defaultOptions
};
attrs.tildeword = {
    label : "word_tilde",
    opts : settings.defaultOptions
};
attrs.complword = {
    label : "word_completed",
    opts : settings.defaultOptions
};
attrs.id_hidden = {
    label : "id",
    displayType : "hidden",
    opts : settings.defaultOptions
};
attrs.ambiguous_lemma = {
    label : "ambiguous_lemma",
    opts : settings.defaultOptions
};
attrs.ambiguous_pos = {
    label : "ambiguous_pos",
    opts : settings.defaultOptions
};
attrs.ambiguous_msd = {
    label : "ambiguous_msd",
    opts : settings.defaultOptions
};

attrs.wordtype = {
    label : "type",
    displayType : "select",
    translationKey : "topling_",
    dataset : {
	"text" : "text",
	"to" : "to",
	"from" : "from",
	"comment" : "comment",
	"subject" : "subject"
    },
    opts : settings.defaultOptions
};

sattrs.date = {
    label : "date",
    displayType : "date"
};

sattrs.text_title = {
    label : "text_title"
};
sattrs.title = sattrs.text_title;
sattrs.text_distributor = {
    label : "text_distributor",
    displayType : "hidden"
};
sattrs.text_source = {
    label : "text_source"
};

sattrs.text_published = {
    label : "text_pubdate2"
};

sattrs.author = {
    label : "author"
};
sattrs.author_birthyear = {
    label : "author_birthyear"
};
sattrs.author_deathyear = {
    label : "author_deathyear"
};

sattrs.publ_year = {
    label : "year_published"
};

sattrs.fulltext_url = {
    label : "fulltext_url",
    type : "url"
};
sattrs.original_url = {
    label : "original_url",
    type : "url"
};
sattrs.context_url = {
    label : "context_url",
    type : "url"
};

// Options for URL attributes to be shown as separate links in the
// search result sidebar; to be used as the value of attribute
// property url_opts.
sattrs.link_url_opts = {
    // Show the the link in a separate link section
    in_link_section : true,
    // Hide the URL and use the attribute label as the link text
    hide_url : true,
    // Open the link in a new window (or tab)
    new_window : true,
};

sattrs.link_fulltext = {
    label : "show_fulltext",
    type : "url",
    url_opts : sattrs.link_url_opts
};
sattrs.link_original = {
    label : "show_original",
    type : "url",
    url_opts : sattrs.link_url_opts
};
sattrs.link_fulltext_context = {
    label : "show_fulltext_context",
    type : "url",
    url_opts : sattrs.link_url_opts
};
sattrs.link_prefixed = function (label, url_prefix) {
    return {
	label : label,
	type : "url",
	url_opts : sattrs.link_url_opts,
	url_prefix : url_prefix
    };
};
sattrs.link_show_video_prefixed = function (url_prefix) {
    return sattrs.link_prefixed("show_video", url_prefix);
};
sattrs.link_show_video_annex = sattrs.link_show_video_prefixed(
    "https://lat.csc.fi/ds/annex/runLoader?viewType=timeline&");

sattrs.link_gutenberg = {
    label : "show_gutenberg",
    type : "url",
    url_opts : sattrs.link_url_opts
};

sattrs.text_link_gutenberg = {
    label : "show_gutenberg_text",
    type : "url",
    url_opts : sattrs.link_url_opts
};



sattrs.sentence_id_hidden = {
    label : "sentence_id",
    displayType : "hidden"
};
sattrs.sentence_id = {
    label : "sentence_id"
};
sattrs.sentence_n = {
    label : "sentence_n"
};
sattrs.paragraph_id_hidden = {
    label : "paragraph_id",
    displayType : "hidden"
};
sattrs.paragraph_id = {
    label : "paragraph_id"
};

sattrs.text_time = {
    label : "text_time"
};

sattrs.paragraph_type = {
    label : "paragraph_type"
};

sattrs.text_genre = {
    label : "text_genre",
    displayType : "select",
    translationKey : "textgenre_",
    dataset : {
	"fiction" : "fiction",
	"law" : "law",
    },
    opts : settings.liteOptions
};

sattrs.text_author = {
    label : "text_author"
};

sattrs.text_producers = {
    label : "text_producers"
};

sattrs.text_ebook_id = {
    label : "text_ebook_id"
};

sattrs.text_translator = {
    label : "text_translator"
};

/* KFSCP --- */

sattrs.text_pubdate = {
    label : "text_pubdate2"
};

sattrs.text_publisher = {
    label : "text_publisher"
};

/* --------- */

settings.common_struct_types = {
    date_interval : {
        label: "date_interval",
        displayType: "date_interval",

        opts: settings.liteOptions,
        extended_template : '<slider floor="{{floor}}" ceiling="{{ceiling}}" ' +
                                'ng-model-low="values.low" ng-model-high="values.high"></slider>' +
                                '<div><input ng-model="values.low" class="from"> <input class="to" ng-model="values.high"></div>',
        controller : function($scope, searches, $timeout) {
            c.log( "searches", searches)
            var s = $scope
            
            searches.timeDef.then(function() {
                var all_years = _(settings.corpusListing.selected)
                            .pluck("time")
                            .map(_.pairs)
                            .flatten(true)
                            .filter(function(tuple) {
                                return tuple[0] && tuple[1];
                            }).map(_.compose(Number, _.head))
                            .value();

                s.values = {}

                $timeout(function() {
                    s.floor = Math.min.apply(null, all_years)
                    s.ceiling = Math.max.apply(null, all_years) 
                    if(!s.model) {
                        s.values.low = s.floor;
                        s.values.high = s.ceiling;
                    } else {
                        s.values.low = s.model.split(",")[0].slice(0, 4);
                        s.values.high = s.model.split(",")[1].slice(0, 4);
                    }
                }, 0)
                w = s.$watch("values.low.toString() + values.high.toString()", function() {
                    // TODO: seems to be be running too much
                    c.log ("low", s.values.low, "high", s.values.high, s.floor, s.ceiling)
                    if(!angular.isDefined(s.values.low) || isNaN(s.values.low) || isNaN(s.values.high) || !angular.isDefined(s.values.high)) {
                        s.model = ""
                        return
                    }

                    // s.model = s.values.low.toString() + s.values.high.toString()
                    s.model = [
                        s.values.low.toString() + "0101",
                        s.values.high.toString() + "1231"
                    ].join(",")
                })
                
                s.$on("$destroy", function() {
                    w();
                })
                
            })
                
        }
    }

}

var modernAttrs = {
    pos : attrs.pos,
    msd : attrs.msd,
    lemma : attrs.baseform,
    lex : attrs.lemgram,
    saldo : attrs.saldo,
    dephead : attrs.dephead,
    deprel : attrs.deprel,
    ref : attrs.ref,
    prefix : attrs.prefix,
    suffix : attrs.suffix
};


/*
 * FOLDERS
 */

settings.corporafolders = {};

/*
settings.corporafolders.sv = {
    title : "Svenska texter",
    contents : ["testcorpus"]
};
*/

settings.corporafolders.ftb = {
    title : "FinnTreeBank: suomen puupankki",
    contents : ["ftb2"]
};

settings.corporafolders.ftb.ftb3 = {
    title : "FinnTreeBank 3",
    contents : ["ftb3_europarl", "ftb3_jrcacquis"]
};

settings.corporafolders.klk_fi = {
    title : "Kansalliskirjaston lehtikokoelman (KLK) suomenkieliset lehdet"
};

/*
settings.corporafolders.kotus = {
    title : "Kotuksen korpuksia (näytteitä)",
    contents : ["kotus_klassikot", "kotus_sananparret"]
};
*/

/*
settings.corporafolders.kotus.ns = {
    title : "Nykysuomen aineistoja (näytteitä)",
    contents : ["ns_presidentti", "ns_saadokset"]
};
*/

/*
settings.corporafolders.la = {
    title : "Lauseopin arkisto",
    contents : ["la_murre", "las2"]
};

settings.corporafolders.sks = {
    title : "SKS:n aineistoja",
    contents : ["sks_kivi_fi", "skvr"]
};
*/

settings.corporafolders.literature = {
    title : "Kirjallisuutta",
    contents : ["gutenberg", "kotus_klassikot", "sks_kivi_fi", "skvr"]
};

settings.corporafolders.legal = {
    title : "Juridisia tekstejä",
    contents : ["ns_saadokset", "legal_fi", "mulcold_fi"]
};

settings.corporafolders.internet = {
    title : "Internet-keskusteluaineistoja",
    contents : ["s24", "ylilauta", "hsfi"]
};

settings.corporafolders.other_texts = {
    title : "Muita tekstejä",
};

settings.corporafolders.other_texts.kotus_ns_presidentti = {
    title : "Tasavallan presidenttien uudenvuodenpuheet",
    description : "Tasavallan presidenttien uudenvuodenpuheiden kokoelmassa on kaikki tasavallan presidenttien pitämät uudenvuodenpuheet vuosilta 1935–2007. Muutaman kerran puheen on pitänyt joku muu kuin presidentti. Nämäkin puheet sisältyvät aineistoon.<br/>Kokoelma on järjestetty presidenteittäin ja vuosittain. Kokoelma koostuu lehtileikkeistä, konekirjoitusliuskoista, kirjojen sivuista, lehdistötiedotteista ja verkkoteksteistä. Aineistoa on hankittu arkistoista, kirjoista ja Internetistä.",
    // Contents will be filled in when constructing the corpus
    // settings
    contents : [],
    info : {
    	// // An example of URN, metadata and licence information
    	// urn : "urn:folder_urn",
    	// metadata_url : "http://example.org/metadata_url",
    	// licence : {
    	//      name : "CLARIN PUB",
    	//      urn : "urn:licence_urn"
    	// },
    	metadata_urn : "urn:nbn:fi:lb-20140730150",
    	licence : {
    	    name : "EUPL",
    	    url : "http://ec.europa.eu/idabc/en/document/7774.html"
    	},
    	homepage : {
    	    name : "Kokoelman etusivu",
    	    url : "http://kaino.kotus.fi/korpus/teko/meta/presidentti/presidentti_coll_rdf.xml",
    	    no_label : true
    	},
    	compiler : {
    	    name : "Kotimaisten kielten keskus",
    	    url : "http://www.kotus.fi/",
    	    no_label : true
    	}
    }
}

settings.corporafolders.spoken = {
    title : "Puhuttua kieltä (tekstiksi litteroituna)",
    contents : ["kotus_sananparret", "skn"],
    // unselected : true
};

settings.corporafolders.spoken.la_murre = {
    title : "Lauseopin arkiston murrekorpus",
    description : "Lauseopin arkiston murrekorpus edustaa kaikkia nykyisen Suomen alueella puhuttuja suomen kielen murteita sekä lisäksi niitä murteita, joita puhuttiin Neuvostoliitolle viime sotien yhteydessä luovutetuilla alueilla ennen alueiden luovuttamista. Puhujat ovat syntyneet vuosina 1860–1910 (suurin osa 1880-luvulla) ja haastattelut on tehty 1950–1970-luvuilla, jolloin puhujat ovat olleet keskimäärin 80-vuotiaita.<br/>Yhdestä pitäjänmurteesta on yleensä valittu käsiteltäväksi yksi noin tunnin laajuinen äänite. Murreaineisto on litteroitu sekä koodattu morfologisesti ja syntaktisesti. Tässä on saatavilla korpuksen versio, jossa litteraatit on karkeasti kohdistettu alkuperäisiin äänitteisiin.",
    // unselected : true,
    info : {
	urn : "urn:nbn:fi:lb-2014052715",
	metadata_urn : "urn:nbn:fi:lb-2014052716",
	licence : {
	    name : "CC BY ND 4.0",
	    url : "https://creativecommons.org/licenses/by-nd/4.0/"
	},
	homepage : {
	    name : "Aineiston tietosivu Kielipankissa",
	    url : "https://kitwiki.csc.fi/twiki/bin/view/FinCLARIN/KielipankkiAineistotLAmurre",
	    no_label : true
	}
    }
 };

settings.corporafolders.learner = {
    title : "Suomenoppijoiden kieltä (suomi toisena tai vieraana kielenä)",
    contents : ["las2", "iclfi"],
    // unselected : true
};

settings.corporafolders.vks = {
    title : "Vanhan kirjasuomen korpus",
    contents : [
	"vks_agricola",
	"vks_biblia",
	"vks_lait",
	"vks_saarnat",
	"vks_almanakat",
	"vks_bjorkqvist",
	"vks_frosterus",
	"vks_ganander",
	"vks_lizelius",
	"vks_lpetri",
	"vks_varia",
	"vks_virret"
    ],
    // unselected : true
};

settings.corporafolders.vns = {
    title : "Varhaisnykysuomen korpus (näytteitä)",
    contents : ["vns_asetus", "vns_renqvist", "vns_renvall"],
    // unselected : true
};

settings.corporafolders.test = {
    title : "Demo- ja testiaineistoja",
    contents : ["reittidemo"]
};


/* 
 * PRESELECTED CORPORA
 * Folders will be expanded to all corpora. Optionally prefix folders with __ , which will be ignored.
 */
// TODO: this should be moved when modern texts are moved to their own mode
if(window.currentMode == "default") 
    settings.preselected_corpora = ["reittidemo", "__ftb"];

/*
 * CORPORA
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


/*
settings.corpora.testcorpus = {
    title : "The Korp Test Corpus",
    description : "A test corpus for testing Korp.",
    id : "testcorpus",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        pos : attrs.pos
    },
    struct_attributes : {
    }
};
*/

/*
settings.corpora.testcorp = {
    title : "Testikorpus",
    description : "Testikorpus Korpin ominaisuuksien testaamiseksi",
    id : "testcorp",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	lemma : attrs.baseform,
        pos : attrs.pos
    },
    struct_attributes : {
	sentence_id : {
	    label : "sentence_id"
	},
	sentence_url : {
	    label : "file_url",
	    type : "url"
	}
    }
};
*/

/*
settings.corpora.testcorp_deptree = {
    title : "Dependenssipuutesti",
    description : "Testikorpus Korpin dependenssipuun piirtämisen testaamiseksi",
    id : "testcorp_deptree",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	lemma : attrs.baseform_ftb2,
        pos : attrs.pos_ftb2,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	ref : attrs.ref,
	spoken : attrs.spoken,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	sentence_id : sattrs.sentence_id_hidden
    }
};
*/

settings.corpora.ftb2 = {
    title : "FinnTreeBank 2",
    description : "Finnish tree bank, version 2",
    id : "ftb2",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	lemma : attrs.baseform_ftb2,
        pos : attrs.pos_ftb2,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	ref : attrs.ref,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	subcorpus_name : {
	    label : "subcorpus_name",
	    displayType : "select",
	    translationKey : "subcorp_",
	    dataset : {
		// "news-samples" : "news-samples",
		// "sofie12" : "sofie12",
		"visk-sent" : "visk-sent",
		"wikipedia-samples" : "wikipedia-samples"
	    },
            opts : settings.liteOptions
	},
	sentence_id : sattrs.sentence_id_hidden
    }
//    },
//    limited_access : true
};

/*
settings.corpora.ftb3 = {
    title : "FinnTreeBank 3",
    description : "Finnish tree bank, version 3: EuroParl, JRC Acquis",
    id : "ftb3",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	lemma : attrs.baseform_ftb2,
	lemmacomp : attrs.baseform_compound,
        pos : attrs.pos_ftb3,
	posorig : attrs.pos_ftb3_orig,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	subcorpus_name : {
	    label : "subcorpus_name",
	    displayType : "select",
	    translationKey : "ftb3_subcorp_",
	    dataset : {
		"JRC_Acquis" : "jrc-acquis",
		"EuroParl" : "europarl",
	    },
            opts : settings.liteOptions
	},
	file_name : {
	    label : "file_name",
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_line : {
	    label : "sentence_line",
	}
    }
};
*/

settings.corpora.ftb3_europarl = {
    title : "FinnTreeBank 3: EuroParl",
    description : "Suomen puupankki, versio 3: EuroParl (Euroopan parlamentin istuntoja)",
    id : "ftb3_europarl",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	lemma : attrs.baseform_ftb2,
	lemmacomp : attrs.baseform_compound,
	pos : attrs.pos_ftb31,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	ref : attrs.ref,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	text_filename : {
	    label : "file_name",
	},
	chapter_id : {
	    label : "chapter_id",
	    displayType : "hidden",
	},
	chapter_title : {
	    label : "chapter_title",
	},
	paragraph_id : {
	    label : "paragraph_id",
	    displayType : "hidden",
	},
	speech_speakerid : {
	    label : "speech_speakerid",
	    displayType : "hidden",
	},
	speech_speakername : {
	    label : "speech_speakername",
	},
	speech_language : {
	    label : "speech_language",
	    displayType : "select",
	    translationKey : "ftb3_europarl_language_",
	    dataset : {
		"bg" : "bg",
		"cs" : "cs",
		"da" : "da",
		"de" : "de",
		"el" : "el",
		"en" : "en",
		"es" : "es",
		"et" : "et",
		"eu" : "eu",
		"fi" : "fi",
		"fr" : "fr",
		"ga" : "ga",
		"hu" : "hu",
		"it" : "it",
		"lt" : "lt",
		"lv" : "lv",
		"mt" : "mt",
		"nl" : "nl",
		"pl" : "pl",
		"pt" : "pt",
		"ro" : "ro",
		"sk" : "sk",
		"sl" : "sl",
		"sv" : "sv",
		"und" : "und",
	    },
	    opts : settings.liteOptions
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_line : {
	    label : "sentence_line",
	},
    }
};

settings.corpora.ftb3_jrcacquis = {
    title : "FinnTreeBank 3: JRC Acquis",
    description : "Suomen puupankki, versio 3: JRC Acquis (EU-säädöksiä)",
    id : "ftb3_jrcacquis",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	lemma : attrs.baseform_ftb2,
	lemmacomp : attrs.baseform_compound,
	pos : attrs.pos_ftb31,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	ref : attrs.ref,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	text_filename : {
	    label : "file_name",
	},
	text_title : {
	    label : "file_title",
	},
	text_codetitle : {
	    label : "file_codetitle",
	},
	text_url : {
	    label : "file_url",
	    type : "url",
	},
	paragraph_id : {
	    label : "paragraph_id",
	    displayType : "hidden",
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_line : {
	    label : "sentence_line",
	}
    }
};


settings.corpora.hsfi = {
    title : "HS.fi",
    description : "HS.fi uutiskommenttiaineisto",
    id : "hsfi",
    within : settings.spWithin,
    context : settings.spContext,
    limited_access : true,
    licence_type : "ACA",
    urn : "urn:nbn:fi:lb-2014052717",
    metadata_urn : "urn:nbn:fi:lb-2014052718",
    licence : {
	url : "https://kitwiki.csc.fi/twiki/bin/view/FinCLARIN/ClarinEulaEngACANc",
	name : "CLARIN ACA +NC +anonymisointi",
	description : "Vain ei-kaupalliseen tutkimuskäyttöön. Nimimerkit tulee anonymisoida korpukseen viittaavissa julkaisuissa."
    },
    attributes : {
    },
    struct_attributes : {
        sentence_id : sattrs.sentence_id_hidden,
	text_id : {
	    label : "text_id"
	},
	text_time : {
	    label : "text_time"
	    },
	text_date : {
	    label : "text_date"
	},
	text_fulldate : {
	    label : "timestamp",
	    displayType : "hidden"
	},
	text_publicnick : {
	    label : "text_publicnick",
	},
	text_title : {
	    label : "text_title"
	}
    }

};


settings.corpora.reittidemo = {
    title : "Reitti A-siipeen",
    description : "Kahdenkeskisen videoidun keskustelun ”Reitti A-siipeen” yleiskielistetty litteraatti. Keskustelussa selvitetään reittiä tiettyyn Helsingin yliopiston Metsätalossa sijaitsevaan huoneeseen. Vapaasti käytettäväksi tarkoitettu näyteaineisto.",
    id : "reittidemo",
    within : settings.spWithin,
    context : settings.spContext,
    urn : "urn:nbn:fi:lb-100110012817",
    metadata_urn : "urn:nbn:fi:lb-2014101401",
    licence : {
	url : "http://creativecommons.org/publicdomain/zero/1.0/legalcode.txt",
	name : "CC-ZERO (CC0)"
    },
    attributes : {
	lemma : attrs.baseform,
	lemmacomp : attrs.baseform_compound,
        pos : attrs.pos_klk,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_tdt,
	ref : attrs.ref,
	spoken : attrs.spoken,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	text_author : sattrs.author,
	text_title : sattrs.title,
	text_year : sattrs.publ_year,
	paragraph_id : sattrs.paragraph_id_hidden,
	sentence_id : sattrs.sentence_id_hidden,
	utterance_id : {
	    label : "utterance_num",
	},
	utterance_participant : {
	    label : "speaker",
	    displayType : "select",
	    dataset : [
		"ML",
		"TA"
	    ],
	    opts : settings.liteOptions
	},
	utterance_begin_time : {
	    label : "utterance_begin_time"
	},
	utterance_end_time : {
	    label : "utterance_end_time"
	},
	utterance_duration : {
	    label : "utterance_duration"
	},
	utterance_annex_link : sattrs.link_show_video_annex,
    }
};

settings.corpora.kotus_klassikot = {
    title : "Suomalaisen kirjallisuuden klassikoita (näyte)",
    description : "Suomalaisen kirjallisuuden klassikoita (Kotimaisten kielten keskuksen aineisto)",
    id : "kotus_klassikot",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	collection_id : {
	    label : "collection_id",
	    displayType : "hidden"
	},
	collection_title : {
	    label : "collection_title"
	},
	story_id : {
	    label : "story_id",
	    displayType : "hidden"
	},
	story_title : {
	    label : "story_title"
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_type : {
	    label : "sentence_type",
	    displayType : "select",
	    translationKey : "sentencetype_",
	    dataset : {
		"p" : "p",
		"head" : "head"
	    },
	    opts : settings.liteOptions
	}
    }
};

/*
settings.corpora.ns_presidentti = {
    title : "Tasavallan presidenttien uudenvuodenpuheita (näyte)",
    description : "Tasavallan presidenttien uudenvuodenpuheita (1935–2006) (Kotimaisten kielten keskuksen aineisto)",
    id : "ns_presidentti",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	lemma : attrs.baseform,
	lemmacomp : attrs.baseform_compound,
        pos : attrs.pos_kotus,
	msd : attrs.msd,
	id : attrs.id_hidden,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	paragraph_id : sattrs.paragraph_id,
	paragraph_type : {
	    label : "paragraph_type",
	    displayType : "select",
	    translationKey : "paragraphtype_",
	    dataset : {
		"p" : "p",
		"head" : "head",
		"opener" : "opener",
	    },
	    opts : settings.liteOptions
	},
	paragraph_topic : {
	    label : "paragraph_topic"
	},
	sentence_id : sattrs.sentence_id_hidden
    }
};
*/


settings.templ.kotus_ns_presidentti = {
    title : "",
    description : "",
    id : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	lemma : attrs.baseform,
	lemmacomp : attrs.baseform_compound,
	pos : attrs.pos_kotus,
	msd : attrs.msd,
	id : attrs.id_hidden,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	// text_source : sattrs.text_source,
	text_author : sattrs.author,
	text_author_birthyear : sattrs.author_birthyear,
	text_author_deathyear : sattrs.author_deathyear,
	text_date : sattrs.date,
	text_url : sattrs.link_fulltext,
	// text_original_url : sattrs.link_original,
	// text_collection_url contains the URL of the subcorpus main
	// page (the speeches of a certain president) in the Kaino
	// service.
	// text_collection_url : ...,
	paragraph_id : sattrs.paragraph_id,
	paragraph_type : {
	    label : "paragraph_type",
	    displayType : "select",
	    translationKey : "paragraphtype_",
	    dataset : {
		"p" : "p",
		"head" : "head",
		"opener" : "opener",
	    },
	    opts : settings.liteOptions
	},
	paragraph_topic : {
	    label : "paragraph_topic"
	},
	paragraph_span : {
	    label : "paragraph_span"
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_url : sattrs.context_url
    }
};


settings.fn.make_president_corpora = function () {

    var make_homepage_info = function (id) {
	return {
	    name : "Korpus Kaino-palvelussa",
	    url : ("http://kaino.kotus.fi/korpus/teko/meta/presidentti/"
		   + id + "/" + id + "_coll_rdf.xml"),
	    no_label : true
	};
    };

    var make_info = function (arglist) {
	var id = arglist[0];
	var firstname = arglist[1];
	var lastname = arglist[2];
	var years = arglist[3];
	var extradescr = (arglist.length > 4 ? " " + arglist[4] : "");
	return {
	    id : id,
	    title : "Presidentti " + lastname + " uudenvuodenpuheet",
	    description : ("Kokoelma sisältää presidentti " + firstname + " "
			   + lastname + " pitämät uudenvuodenpuheet (" + years
			   + ")." + extradescr),
	    // Note that in this way the link text is not localized,
	    // unlike that for a URL attribute could be. The same
	    // information is also found in the structural attribute
	    // text_collection_url.
	    homepage : make_homepage_info(id)
	};
    };

    // The descriptions come from the metadata of Kotus.
    var extradescr_tpk = "Aineisto on kerätty Tasavallan presidentin kanslian Internet-sivustolta <a target='_blank' href='http://www.tpk.fi'>www.tpk.fi</a>.";
    var president_info_items = [
	["ahtisaari", "Martti", "Ahtisaaren", "1995–2000", extradescr_tpk],
	["halonen", "Tarja", "Halosen", "2001–2007", extradescr_tpk],
	["kallio", "Kyösti", "Kallion", "1938–1940"],
	["kekkonen", "Urho", "Kekkosen", "1957–1981",
	 "Vuosien 1957–1967 puheet ovat teoksesta <i>Puheita ja kirjoituksia 2</i> (Weilin &amp; Göös 1967), muissa alkutekstinä on presidentin kanslian lehdistötiedote."],
	["koivisto", "Mauno", "Koiviston", "1982–1994"],
	["paasikivi", "J. K.", "Paasikiven", "1946–1956"],
	["ryti", "Risto", "Rydin", "1941, 1943"],
	["svinhufvud", "P. E.", "Svinhufvudin", "1935–1937"]
    ];
    var president_templ_fill = [];
    for (var i = 0; i < president_info_items.length; i++) {
	president_templ_fill.push(make_info(president_info_items[i]));
    }
    president_templ_fill.push(
	{ id : "muut",
	  title : "Muiden kuin tasavallan presidenttien uudenvuodenpuheet",
	  description : "Muiden kuin tasavallan presidenttien pitämät uudenvuodenpuheet: pääministeri Esko Aho (1993), eduskunnan puhemies Väinö Hakkila (1942), pääministeri Edwin Linkomies (1944), ministeri Mauno Pekkala (1945).",
	  homepage : make_homepage_info("muut") }
    );
    settings.fn.add_corpus_settings(
	settings.templ.kotus_ns_presidentti,
	president_templ_fill,
	settings.corporafolders.other_texts.kotus_ns_presidentti,
	"kotus_ns_presidentti_"
    );
}

settings.fn.make_president_corpora();


settings.corpora.ns_saadokset = {
    title : "Lakeja ja direktiivejä (näyte)",
    description : "Lakeja ja direktiivejä vuosilta 2002–2003 (Kotimaisten kielten keskuksen aineisto)",
    id : "ns_saadokset",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	lemma : attrs.baseform,
	lemmacomp : attrs.baseform_compound,
        pos : attrs.pos_kotus,
	msd : attrs.msd,
	id : attrs.id_hidden,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	div_id : {
	    label : "div_id",
	    displayType : "hidden",
	},
	div_type : {
	    label : "div_type",
	    displayType : "select",
	    translationKey : "divtype_",
	    dataset : {
		"section" : "section",
		"section/law" : "section_law",
		"section/end" : "section_end"
	    },
	    opts : settings.liteOptions
	},
	paragraph_id : sattrs.paragraph_id,
	paragraph_type : {
	    label : "paragraph_type",
	    displayType : "select",
	    translationKey : "paragraphtype_",
	    dataset : {
		"p" : "p",
		"head" : "head",
		"opener" : "opener",
		"closer" : "closer"
	    },
	    opts : settings.liteOptions
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_type : {
	    label : "sentence_type",
	    displayType : "select",
	    translationKey : "sentencetype_",
	    dataset : {
		"p" : "p",
		"head" : "head",
		"dateline" : "dateline",
		"signed" : "signed"
	    },
	    opts : settings.liteOptions
	}
    }
};

settings.corpora.kotus_sananparret = {
    title : "Sananparsikokoelma (näyte)",
    description : "Suomen murteiden Sananparsikokoelma (1930-luvulta) (Kotimaisten kielten keskuksen aineisto)",
    id : "kotus_sananparret",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	entry_location : {
	    label : "entry_location"
	},
	entry_collector : {
	    label : "entry_collector"
	},
	entry_date : {
	    label : "entry_date"
	},
	entry_standard : {
	    label : "entry_standard"
	},
	entry_dialect : {
	    label : "entry_dialect"
	},
	entry_usage : {
	    label : "entry_usage"
	},
	sentence_type : {
	    label : "sentence_type",
	    displayType : "select",
	    translationKey : "sayings_sentencetype_",
	    dataset : {
		"standard" : "standard",
		"dialect" : "dialect",
		"usage" : "usage"
	    },
	    opts : settings.liteOptions
	}
    }
};


attrs.pos_la = {
    label : "pos",
    displayType : "select",
    translationKey : "posla_",
    dataset : {
	"a" : "a",
	"a:pron" : "a:pron",
	"a:pron:dem" : "a:pron:dem",
	"a:pron:int" : "a:pron:int",
	"a:pron:rel" : "a:pron:rel",
	"a:q" : "a:q",
	"adv" : "adv",
	"adv:pron" : "adv:pron",
	"adv:pron:dem" : "adv:pron:dem",
	"adv:pron:int" : "adv:pron:int",
	"adv:pron:rel" : "adv:pron:rel",
	"adv:q" : "adv:q",
	"cnj" : "cnj",
	"cnj:coord" : "cnj:coord",
	"cnj:rel" : "cnj:rel",
	"cnj:sub" : "cnj:sub",
	"muu" : "muu",
	"n" : "n",
	"neg" : "neg",
	"n:prop" : "n:prop",
	"n:prop:pname" : "n:prop:pname",
	"num:card" : "num:card",
	"num:murto" : "num:murto",
	"num:ord" : "num:ord",
	"num:ord_pron" : "num:ord_pron",
	"p:post" : "p:post",
	"p:pre" : "p:pre",
	"pron" : "pron",
	"pron:dem" : "pron:dem",
	"pron:int" : "pron:int",
	"pron:pers" : "pron:pers",
	"pron:pers12" : "pron:pers12",
	"pron:ref" : "pron:ref",
	"pron:rel" : "pron:rel",
	"punct" : "punct",
	"q" : "q",
	"stem" : "stem",
	"v" : "v",
    },
    opts : settings.liteOptions
};
attrs.func_la = {
    label : "func",
    displayType : "select",
    translationKey : "funcla_",
    dataset : {
	"advl" : "advl",
	"advl:p" : "advl:p",
	"advl:v" : "advl:v",
	"advmod" : "advmod",
	"amod" : "amod",
	"analysoimaton" : "analysoimaton",
	"compl:o" : "compl:o",
	"compl:q" : "compl:q",
	"compl:s" : "compl:s",
	"compl:x" : "compl:x",
	"infobj" : "infobj",
	"infsubj" : "infsubj",
	"irrall" : "irrall",
	"jälkiosa" : "jälkiosa",
	"lauseyhd" : "lauseyhd",
	"lkeyhd" : "lkeyhd",
	"sanayhd_lkeyhd" : "sanayhd_lkeyhd",
	"muu" : "muu",
	"neg:prt" : "neg:prt",
	"nmod" : "nmod",
	"npobj" : "npobj",
	"npsubj" : "npsubj",
	"nummod" : "nummod",
	"osma" : "osma",
	"pmod" : "pmod",
	"pred" : "pred",
	"pred2" : "pred2",
	"pred3" : "pred3",
	"pred:ref" : "pred:ref",
	"pred:toisto" : "pred:toisto",
	"subj:nonfin" : "subj:nonfin",
	"subj:stat" : "subj:stat",
    },
    opts : settings.liteOptions
};


// LA-murre: The Finnish Dialect Syntax Archive (Lauseopin arkiston
// murrekorpus)
// The logical corpus is divided into physical (Korp) corpora by
// parish (dialect).

// Dialect regions, their dialect groups and their parishes. A tree
// structure represented as an array of arrays: the first element is
// the internal code or id of the item, the second its human-readable
// name, and the third an array of its child elements (except in leaf
// nodes).
var la_murre_grouping = [
    ["LOU", "Lounaismurteet", [
	["VarE", "Eteläinen Varsinais-Suomi", [
	    ["karuna", "Karuna"],
	    ["kisko", "Kisko"],
	    ["muurla", "Muurla"],
	    ["muurla_halikko", "Muurla/Halikko"],
	    ["paimio", "Paimio"],
	    ["pernio", "Perniö"],
	    ["uskela", "Uskela"],
	] ],
	["VarP", "Pohjoinen Varsinais-Suomi", [
	    ["eura", "Eura"],
	    ["eurajoki", "Eurajoki"],
	    ["kalanti", "Kalanti"],
	    ["karjala_tl", "Karjala Tl"],
	    ["kustavi", "Kustavi"],
	    ["lappi_tl", "Lappi Tl"],
	    ["luvia", "Luvia"],
	    ["masku", "Masku"],
	    ["pyhamaa", "Pyhämaa"],
	    ["rauma", "Rauma"],
	    ["rymattyla", "Rymättylä"],
	    ["taivassalo", "Taivassalo"],
	    ["velkua", "Velkua"],
	] ],
    ] ],
    ["LVÄ", "Lounaiset välimurteet", [
	["SatE", "Etelä-Satakunta", [
	    ["kokemaki", "Kokemäki"],
	    ["loimaa", "Loimaa"],
	    ["vampula", "Vampula"],
	] ],
	["SatL", "Länsi-Satakunta", [
	    ["ahlainen", "Ahlainen"],
	    ["merikarvia", "Merikarvia"],
	    ["noormarkku", "Noormarkku"],
	    ["pori", "Pori"],
	] ],
	["VarY", "Varsinais-Suomen ylämaa", [
	    ["koski_tl", "Koski Tl"],
	    ["poytya", "Pöytyä"],
	    ["somero", "Somero"],
	    ["sakyla", "Säkylä"],
	    ["tarvasjoki", "Tarvasjoki"],
	] ],
	["VarU", "Länsi-Uusimaa", [
	    ["sammatti", "Sammatti"],
	    ["vihti", "Vihti"],
	] ],
    ] ],
    ["HÄM", "Hämäläismurteet", [
	["HämE", "Etelä-Häme", [
	    ["hattula", "Hattula"],
	    ["hausjarvi", "Hausjärvi"],
	    ["nurmijarvi", "Nurmijärvi"],
	    ["renko", "Renko"],
	    ["saaksmaki", "Sääksmäki"],
	    ["tammela", "Tammela"],
	] ],
	["HämK", "Kaakkois-Häme", [
	    ["askola", "Askola"],
	    ["asikkala", "Asikkala"],
	    ["lammi", "Lammi"],
	] ],
	["HämP", "Pohjois-Häme", [
	    ["juupajoki", "Juupajoki"],
	    ["kuru", "Kuru"],
	    ["luopioinen", "Luopioinen"],
	    ["pirkkala", "Pirkkala"],
	    ["pohjaslahti", "Pohjaslahti"],
	    ["vesilahti", "Vesilahti"],
	] ],
	["SatP", "Pohjois-Satakunta", [
	    ["ikaalinen", "Ikaalinen"],
	    ["kankaanpaa", "Kankaanpää"],
	    ["karkku", "Karkku"],
	    ["kihnio", "Kihniö"],
	    ["punkalaidun", "Punkalaidun"],
	    ["suodenniemi", "Suodenniemi"],
	] ],
	["Kym", "Kymenlaakso", [
	    ["iitti", "Iitti"],
	    ["lapinjarvi", "Lapinjärvi"],
	    ["suursaari", "Suursaari"],
	    ["vehkalahti", "Vehkalahti"],
	] ],
    ] ],
    ["POH", "Pohjalaismurteet", [
	["PohE", "Etelä-Pohjanmaa", [
	    ["isojoki", "Isojoki"],
	    ["kauhava", "Kauhava"],
	    ["kurikka", "Kurikka"],
	    ["laihia", "Laihia"],
	    ["nurmo", "Nurmo"],
	    ["peraseinajoki", "Peräseinäjoki"],
	    ["yliharma", "Ylihärmä"],
	] ],
	["PohK", "Keski-Pohjanmaa", [
	    ["haapajarvi", "Haapajärvi"],
	    ["haapavesi", "Haapavesi"],
	    ["himanka", "Himanka"],
	    ["kestila", "Kestilä"],
	    ["lestijarvi", "Lestijärvi"],
	    ["pyhajoki", "Pyhäjoki"],
	    ["toholampi", "Toholampi"],
	    ["veteli", "Veteli"],
	    ["ylivieska", "Ylivieska"],
	] ],
	["PohP", "Pohjois-Pohjanmaa", [
	    ["hailuoto", "Hailuoto"],
	    ["paavola", "Paavola"],
	    ["temmes", "Temmes"],
	    ["yli_ii", "Yli-Ii"],
	    ["ylikiiminki", "Ylikiiminki"],
	] ],
	["LänP", "Länsipohja", [
	    ["alatornio", "Alatornio"],
	    ["muonio", "Muonio"],
	] ],
	["PerP", "Peräpohjola", [
	    ["kemi", "Kemi"],
	    ["rovaniemi", "Rovaniemi"],
	    ["salla", "Salla"],
	    ["sodankyla", "Sodankylä"],
	] ],
    ] ],
    ["SAV", "Savolaismurteet", [
	["KesE", "Eteläinen Keski-Suomi", [
	    ["joutsa", "Joutsa"],
	    ["jamsa", "Jämsä"],
	    ["sysma", "Sysmä"],
	] ],
	["KesL", "Läntinen Keski-Suomi", [
	    ["lappajarvi", "Lappajärvi"],
	    ["pihlajavesi", "Pihlajavesi"],
	    ["soini", "Soini"],
	] ],
	["KesP", "Pohjoinen Keski-Suomi", [
	    ["konginkangas", "Konginkangas"],
	    ["laukaa", "Laukaa"],
	    ["multia", "Multia"],
	    ["pihtipudas", "Pihtipudas"],
	] ],
	["SavE", "Etelä-Savo", [
	    ["enonkoski", "Enonkoski"],
	    ["mikkeli", "Mikkeli"],
	    ["mantyharju", "Mäntyharju"],
	    ["punkaharju", "Punkaharju"],
	] ],
	["SavP", "Pohjois-Savo", [
	    ["haukivuori", "Haukivuori"],
	    ["lapinlahti", "Lapinlahti"],
	    ["leppavirta", "Leppävirta"],
	    ["nilsia", "Nilsiä"],
	    ["rantasalmi", "Rantasalmi"],
	    ["rautalampi", "Rautalampi"],
	    ["riistavesi", "Riistavesi"],
	    ["tervo", "Tervo"],
	    ["vierema", "Vieremä"],
	] ],
	["KarP", "Pohjois-Karjala", [
	    ["ilomantsi", "Ilomantsi"],
	    ["juuka", "Juuka"],
	    ["kiihtelysvaara", "Kiihtelysvaara"],
	    ["kitee", "Kitee"],
	    ["kontiolahti", "Kontiolahti"],
	    ["liperi", "Liperi"],
	] ],
	["Kai", "Kainuu", [
	    ["posio", "Posio"],
	    ["sotkamo", "Sotkamo"],
	    ["suomussalmi", "Suomussalmi"],
	] ],
    ] ],
    ["KAA", "Kaakkoismurteet", [
	["KarE", "Etelä-Karjala", [
	    ["antrea", "Antrea"],
	    ["koivisto", "Koivisto"],
	    ["lappee", "Lappee"],
	    ["luumaki", "Luumäki"],
	    ["muolaa", "Muolaa"],
	    ["nuijamaa", "Nuijamaa"],
	    ["ruokolahti", "Ruokolahti"],
	    ["savitaipale", "Savitaipale"],
	    ["seiskari", "Seiskari"],
	    ["taipalsaari", "Taipalsaari"],
	] ],
	["KarK", "Keski-Karjala", [
	    ["lumivaara", "Lumivaara"],
	    ["parikkala", "Parikkala"],
	    ["rautu", "Rautu"],
	    ["raisala", "Räisälä"],
	    ["sortavala", "Sortavala"],
	] ],
    ] ]
];

// LA-murre corpus name prefix, prefixed to a parish name
var la_murre_corpus_prefix = "la_murre_"

// Extract dialect regions, groups, parishes and corpus names from
// la_murre_grouping
var la_murre_regions = [];
var la_murre_groups = [];
var la_murre_parishes = [];
var la_murre_corpora = [];
for (var i = 0; i < la_murre_grouping.length; i++) {
    la_murre_regions.push(la_murre_grouping[i][0]);
    var groups = la_murre_grouping[i][2];
    for (var j = 0; j < groups.length; j++) {
	la_murre_groups.push(groups[j][0]);
	var parishes = groups[j][2];
	for (var k = 0; k < parishes.length; k++) {
	    la_murre_parishes.push(parishes[k][1]);
	    la_murre_corpora.push(la_murre_corpus_prefix + parishes[k][0]);
	}
    }
}

// The corpus settings template for the LA-murre corpora
settings.templ.la_murre = {
    // title : "Lauseopin arkiston murrekorpus",
    // description : "Lauseopin arkiston murrekorpus",
    // id : "la_murre",
    within : settings.spcWithin,
    context : settings.spContext,
    attributes : {
	cleanword : {
	    label : "cleanword",
	    opts : settings.defaultOptions
	},
	lemma : attrs.baseform,
        pos : attrs.pos_la,
	msd : attrs.msd,
	func : attrs.func_la,
	cow : {
	    label : "cowla",
	    displayType : "select",
	    translationKey : "cowla_",
	    dataset : {
		"cw" : "cw",
		"cw1" : "cw1",
		"cw2" : "cw2",
		null : "noncw",
	    },
	    opts : settings.liteOptions
	},
	note : {
	    label : "note",
	    opts : settings.defaultOptions
	},
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	text_header : {
	    label : "text_header"
	},
	text_info : {
	    label : "text_info"
	},
	text_dialect_region : {
	    label : "dialect_region",
	    displayType : "select",
	    translationKey : "dialect_region_",
	    dataset : la_murre_regions,
	    opts : settings.liteOptions
	},
	text_dialect_group : {
	    label : "dialect_group",
	    displayType : "select",
	    translationKey : "dialect_group_",
	    dataset : la_murre_groups,
	    opts : settings.liteOptions
	},
	text_parish : {
	    label : "parish",
	    displayType : "select",
	    localize : false,
	    dataset : la_murre_parishes,
	    opts : settings.liteOptions
	},
	text_parish_title : {
	    label : "text_title",
	},
	text_filename : {
	    label : "file_name",
	    displayType : "hidden"
	},
	paragraph_type : {
	    label : "paragraph_type",
	    displayType : "select",
	    translationKey : "paragraphtype_",
	    dataset : {
		"interviewee" : "interviewee",
		"interviewer" : "interviewer",
		"noninterviewee" : "noninterviewee",
	    },
	    opts : settings.liteOptions
	},
	paragraph_id : {
	    label : "paragraph_id",
	},
	paragraph_speaker : {
	    label : "speaker",
	},
	paragraph_begin_time : {
	    label : "speech_begin_time"
	},
	paragraph_duration : {
	    label : "speech_duration"
	},
	paragraph_annex_link : sattrs.link_prefixed(
	    "listen_speech",
	    "https://lat.csc.fi/ds/annex/runLoader?"),
	// sentence_source : {
	//     label : "sentence_source"
	// },
	sentence_clnum : {
	    label : "sentence_clnum",
	},
	sentence_num : {
	    label : "sentence_num",
	},
	sentence_wnum : {
	    label : "sentence_wnum",
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_begin_time : {
	    label : "sentence_begin_time"
	},
	sentence_duration : {
	    label : "sentence_duration"
	},
	sentence_annex_link : sattrs.link_prefixed(
	    "listen_sentence",
	    "https://lat.csc.fi/ds/annex/runLoader?"),
	clause_clnum : {
	    label : "clause_clnum",
	},
	clause_num : {
	    label : "clause_num",
	},
	clause_hier : {
	    label : "clause_hier",
	    displayType : "select",
	    translationKey : "clausehier_",
	    dataset : [
		"irrall",
		"main",
		"sub1",
		"sub2",
		"sub3",
		"sub4",
		"sub5",
		"muu",
	    ],
	    opts : settings.liteOptions
	},
	clause_type : {
	    label : "clause_type",
	    displayType : "select",
	    translationKey : "clausetype_",
	    dataset : [
		"affdecl",
		"negdecl",
		"affint",
		"negint",
		"affopt",
		"negopt",
		"muu",
	    ],
	    opts : settings.liteOptions
	},
	clause_hallnum : {
	    label : "clause_hallnum",
	},
	clause_ora : {
	    label : "clause_ora",
	    displayType : "select",
	    translationKey : "clauseora_",
	    dataset : {
		"dir" : "dir",
		"" : "other",
		null : "other"
	    },
	    opts : settings.liteOptions
	},
	clause_depth : {
	    label : "clause_depth"
	},
	clause_partnum : {
	    label : "clause_partnum",
	}
    }
};

// Recursively make settings.corporafolders and settings.corpora for
// the (sub)corpora of the la_murre corpus (based on
// la_murre_grouping). main_folder is the folder to which to add the
// folders or corpora in subfolder_tree. This could perhaps be
// generalized for other corpora if needed.
settings.fn.make_folders_la_murre = function (main_folder, subfolder_tree) {
    for (var i = 0; i < subfolder_tree.length; i++) {
	var subfolder_info = subfolder_tree[i];
	var descr = "Lauseopin arkiston murrekorpus: " + subfolder_info[1];
	if (subfolder_info.length > 2) {
	    var subfolder = {
		title : subfolder_info[1],
		description : descr
	    };
	    main_folder[subfolder_info[0]] = subfolder;
	    settings.fn.make_folders_la_murre(subfolder, subfolder_info[2]);
	} else {
	    var templ_fill = {
		id : subfolder_info[0],
		title : subfolder_info[1],
		description : descr
	    };
	    settings.fn.add_corpus_settings(
		settings.templ.la_murre, [templ_fill], main_folder,
		la_murre_corpus_prefix);
	}
    }
};

// Call the above recursive function
settings.fn.make_folders_la_murre(
    settings.corporafolders.spoken.la_murre, la_murre_grouping);

// Construct a shorthand alias
settings.corpus_aliases.la_murre = la_murre_corpora.join(",");
settings.corpus_aliases["la-murre"] = settings.corpus_aliases.la_murre;

// Delete the variables used for constructing the settings
delete la_murre_grouping;
delete la_murre_regions;
delete la_murre_groups;
delete la_murre_parishes;
delete la_murre_corpora;
delete la_murre_corpus_prefix;


settings.corpora.las2 = {
    title : "LAS2",
    description : "Edistyneiden suomenoppijoiden korpus",
    id : "las2",
    within : settings.spWithin,
    context : settings.spContext,
    limited_access : true,
    licence_type : "RES",
    attributes : {
	lemma : attrs.baseform,
        pos : attrs.pos_la,
        msd : attrs.msd,
        fun : attrs.func_la,
        com : {
            label : "note",
        },
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
        text_dateto : {
            label : "text_date",
        },
        text_datefrom : {
            label : "datefrom",
	    displayType : "hidden",
        },
        text_num : {
            label : "exam_num",
        },
        text_inf : {
            label : "text_inf",
        },
        text_tt : {
            label : "text_tt",
        },
        text_te : {
            label : "text_te",
        },
        text_lo : {
            label : "text_lo",
        },
        text_l1 : {
            label : "text_l1",
        },
        text_alin_cefr : {
            label : "text_alin_cefr",
        },
        text_ylin_cefr : {
            label : "text_ylin_cefr",
        },
        text_tekstin_cefr : {
            label : "text_tekstin_cefr",
        },
	// // Uncomment when showing info pages is implemented
	// text_inf_url : {
	//     label : "text_inf_url",
	//     type : "url",
	// },
        div_id : {
            displayType : "hidden",
        },
        div_question : {
            label : "div_question",
        },
        paragraph_id : {
            displayType : "hidden",
        },
        paragraph_type : {
            displayType : "hidden",
        },
        sentence_id : sattrs.sentence_id_hidden,
        sentence_type : {
            displayType : "hidden",
        },
	clause_id : {
            displayType : "hidden",
        },
        clause_type : {
            label : "clause_type",
            displayType : "select",
            translationKey : "clausetype_",
            dataset : {
                "affdecl" : "affdecl",
                "negdecl" : "negdecl",
                "affint" : "affint",
                "negint" : "negint",
                "affopt" : "affopt",
                "negopt" : "negopt",
                "muu" : "muu",
            },
            opts : settings.liteOptions
        },
        clause_fun : {
            label : "clause_fun",
        },
        clause_com : {
            label : "note",
        }
    }
};

settings.corpora.sks_kivi_fi = {
    title : "Aleksis Kivi (SKS)",
    description : "Aleksis Kiven painetut teokset, kirjeet ja muu tunnettu tuotanto. Toimittaneet Sakari Katajamäki, Ossi Kokko ja Elina Kela. <a href='http://www.edith.fi/kivikorpus/index.htm'>Infosivu</a>",
    id : "sks_kivi_fi",
    // unselected : true,
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	sketchyword : {
	    label : "sketchyword",
	    opts : settings.defaultOptions,
	},
	clean_note : {
	    label : "clean_note",
	    opts : settings.defaultOptions,
	},
	sketchy_note : {
	    label : "sketchy_note",
	    opts : settings.defaultOptions,
	},
	other_note : {
	    label : "other_note",
	    opts : settings.defaultOptions,
	},
	wtype : {
	    label : "wtype",
	    opts : settings.defaultOptions,
	}
    },
    struct_attributes : {
	text_idno : {
	    label : "kivi_text_idno",
	    opts : settings.defaultOptions,
	},
	text_author : {
	    label : "kivi_text_author",
	    opts : settings.defaultOptions,
	},
	text_title : {
	    label : "kivi_text_title",
	    opts : settings.defaultOptions,
	},
	text_byline : {
	    label : "kivi_text_byline",
	    opts : settings.defaultOptions,
	},
	text_settlement : {
	    label : "kivi_text_settlement",
	    opts : settings.defaultOptions,
	},
	text_repository : {
	    label : "kivi_text_repository",
	    opts : settings.defaultOptions,
	},
	text_publisher : {
	    label : "kivi_text_publisher",
	    opts : settings.defaultOptions,
	},
	text_distributor : {
	    label : "kivi_text_distributor",
	    opts : settings.defaultOptions,
	},
	text_bibl : {
	    label : "kivi_text_bibl",
	    displayType : "hidden",
	},
	text_bibl_type : {
	    label : "kivi_text_bibl_type",
	    displayType : "hidden",
	},
	text_lang : {
	    label : "kivi_text_lang",
	    opts : settings.defaultOptions,
	},
	text_note : {
	      label : "kivi_text_note",
	      opts : settings.defaultOptions,
	},
	text_date : {
              label : "kivi_text_date",
              opts : settings.defaultOptions,
        },
	section_id : {
	    label : "section_id",
	    displayType : "hidden",
	},
	section_type : {
	    label : "section_type",
	    opts : settings.defaultOptions,
	},
	section_subtype : {
	    label : "section_subtype",
	    opts : settings.defaultOptions,
	},
	/*
	section_subtype_n : {
	    label : "section_subtype_n",
	    displayType : "hidden",
	},*/
	paragraph_id : {
	    label : "paragraph_id",
	    displayType : "hidden",
	},
	paragraph_type : {
	    label : "paragraph_type",
	    opts : settings.defaultOptions,
	},
	paragraph_speaker : {
	    label : "paragraph_speaker",
	    opts : settings.defaultOptions,
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_type : {
	    label : "sentence_type",
	    opts : settings.defaultOptions,
	}
    }
};

settings.corpora.skvr = {
    title : "SKVR",
    description : "SKS:n Suomen Kansan Vanhat Runot -korpus",
    id : "skvr",
    // unselected : true,
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        cleanword : {
            label : "cleanword",
            opts : settings.defaultOptions,
        },
        normalized : {
            label : "normalized",
            opts : settings.defaultOptions,
        }
    },
    struct_attributes : {
	text_id : {
            label : "skvr_item_id",
            displayType : "hidden",
        },
        text_osa : {
            label : "skvr_item_osa",
            opts : settings.defaultOptions,
        },
        text_loc : {
            label : "skvr_item_loc",
            opts : settings.defaultOptions,
        },
        text_inf : {
            label : "skvr_item_inf",
            opts : settings.defaultOptions,
        },
        text_tmp : {
            label : "skvr_item_tmp",
            opts : settings.defaultOptions,
        },
        text_col : {
            label : "skvr_item_col",
            opts : settings.defaultOptions,
        },
        text_idn : {
            label : "skvr_item_idn",
            opts : settings.defaultOptions,
        },
        text_nro : {
            label : "skvr_item_nro",
            opts : settings.defaultOptions,
        },
        text_sgn : {
            label : "skvr_item_sgn",
            opts : settings.defaultOptions,
        },
        text_p_code1 : {
            label : "skvr_item_p_code1",
            opts : settings.defaultOptions,
        },
        text_p_code2 : {
            label : "skvr_item_p_code2",
            opts : settings.defaultOptions,
        },
        text_k_code : {
            label : "skvr_item_k_code",
            opts : settings.defaultOptions,
        },
        text_y_code : {
            label : "skvr_item_y_code",
            opts : settings.defaultOptions,
        },
        text_refs : {
            label : "skvr_item_refs",
            opts : settings.defaultOptions,
	},
        text_cpt : {
            label : "skvr_item_cpt",
            opts : settings.defaultOptions,
        },
	paragraph_id : {
            displayType : "hidden",
        },
        sentence_id : sattrs.sentence_id_hidden,
        sentence_type : {
            label : "sentence_type",
            displayType : "select",
            translationKey : "skvr_stype_",
            dataset : {
                'verse':'verse',
                'comment':'comment',
                'editor_commentary':'editor',
                'caption':'caption'
            },
            opts : settings.liteOptions,
        },
        sentence_refs : {
            label : "sentence_refs",
            opts : settings.defaultOptions,
        }
    }
};


attrlist = {};
attrlist.mulcold_fi = {
    lemma : attrs.baseform,
    lemmacomp : attrs.baseform_compound,
    pos : attrs.pos_mulcold_fi,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos,
    ambmsd : attrs.ambiguous_msd,
    lex : attrs.lemgram_hidden
};
attrlist.mulcold_ru = {
    lemma : attrs.baseform,
    pos : attrs.pos_mulcold_ru,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos,
    ambmsd : attrs.ambiguous_msd,
    lex : attrs.lemgram_hidden
};
attrlist.mulcold_en = {
    lemma : attrs.baseform,
    pos : attrs.pos_mulcold_en,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos,
    ambmsd : attrs.ambiguous_msd,
    lex : attrs.lemgram_hidden
};
attrlist.mulcold_sv = {
    lemma : attrs.baseform,
    lemmacomp : attrs.baseform_compound,
    pos : attrs.pos_mulcold_sv,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos,
    ambmsd : attrs.ambiguous_msd,
    lex : attrs.lemgram_hidden
};
attrlist.mulcold_de = {
};

attrlist.topling = {
    type : attrs.wordtype
};

sattrlist = {};

sattrlist.europarl_v7 = {
    text_title : sattrs.text_title,
    sentence_id : sattrs.sentence_id_hidden,

    sentence_type : {
        label : "sentence_type",
        displayType : "select",
        translationKey : "europarl_v7_sentence_type_",
        dataset : {
            "meta" : "meta",
            "speech" : "speech"
        },
        opts : settings.liteOptions
    },

    sentence_line : {
        label : "sentence_line",
    },
    text_filename : {
        label : "file_name",
    },
    chapter_title : {
        label : "chapter_title",
    },
    chapter_id : {
        label : "chapter_id",
        displayType : "hidden",
    },
    speaker_id : {
        label : "speech_speakerid",
        displayType : "hidden",
    },
    speaker_name : {
        label : "speech_speakername"
    },
    speaker_aff : {
        label : 'speaker_affiliation',
        displayType : "select",
        translationKey : "europarl_v7_aff_",
        dataset : {
            "und" : "und"
	}
    },
    speaker_lang : {
        label : "speech_language",
        displayType : "select",
        translationKey : "ftb3_europarl_language_",
        dataset : {
            "BG" : "bg",
            "CS" : "cs",
            "DA" : "da",
            "DE" : "de",
            "EL" : "el",
            "EN" : "en",
            "ES" : "es",
            "ET" : "et",
            "EU" : "eu",
            "FI" : "fi",
            "FR" : "fr",
            "GA" : "ga",
            "HU" : "hu",
            "IT" : "it",
            "LT" : "lt",
            "LV" : "lv",
            "MT" : "mt",
            "NL" : "nl",
            "PL" : "pl",
            "PT" : "pt",
            "RO" : "ro",
            "SK" : "sk",
            "SL" : "sl",
            "SV" : "sv",
            "und" : "und"
        },
        opts : settings.liteOptions
    }
};


sattrlist.fennougrica_veps = {
    sentence_id : sattrs.sentence_id_hidden,
    sentence_page : { label : "klk_page"},
    within : settings.spWithin,
    context : settings.spContext,
    text_datefrom : sattrs.date,
    text_year : {
	label : "year"
    },
    text_author : {
        label : "text_author"
    },
    text_title : {
        label : "text_title"
    }


};

attrlist.fennougrica_veps = {
        url : {
            label : "klk_img_url",
            type : "url"
	    /*opts : settings.defaultOptions*/
        }
};

/* KFSPC */
sattrlist.kfspc = {
    sentence_id : sattrs.sentence_id_hidden,
    text_distributor : sattrs.text_distributor,
    text_h_title2 : sattrs.text_title,
    text_pubdate2 : sattrs.text_pubdate,
    text_publisher : sattrs.text_publisher
};

/* TOPLING */
sattrlist.topling = {
    sentence_id : sattrs.sentence_id_hidden,
    text_id : {
	label : "text_id"
        },
    text_student : {
	label : "text_studentno"
	},
    file_edulevel : {
	label : "file_edulevel"
	},
    text_year : {
	label : "year"
	},
    file_round : {
	label : "file_round"
	},
    file_levelops : {
	label : "file_levelops"
	},
    file_exercise : {
	label : "file_exercise"
	},
    file_filetype: {
	label : "file_filetype"
	}
};

sattrlist.mulcold = {
    align_text_code : {
	label : "text_code"
    },
    align_text_author : {
	label : "text_author"
    },
    align_text_title : {
	label : "text_title"
    },
    align_text_typeoftext : {
	label : "text_typeoftext"
    },
    align_text_genre : sattrs.text_genre,
    align_text_period : {
	label : "text_period"
    },
    align_text_publisher : {
	label : "text_publisher"
    },
    sentence_id : sattrs.sentence_id_hidden
};

sattrlist.legal = {
    text_code : {
	label : "text_code"
    },
    text_author : {
	label : "text_author"
    },
    text_title : {
	label : "text_title"
    },
    text_typeoftext : {
	label : "text_typeoftext"
    },
    text_genre : sattrs.text_genre,
    text_period : {
	label : "text_period"
    },
    text_publisher : {
	label : "text_publisher"
    },
    sentence_id : sattrs.sentence_id_hidden
};


settings.corpora.legal_fi = {
    id : "legal_fi",
    title : "FiRuLex suomi",
    description : "Juridisia tekstejä (suomi)",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes: attrlist.mulcold_fi,
    struct_attributes : sattrlist.legal
};

settings.corpora.mulcold_fi = {
    id : "mulcold_fi",
    title : "MULCOLD suomi",
    description : "Multilingual Corpus of Legal Documents, suomenkielinen osa",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes: attrlist.mulcold_fi,
    struct_attributes : sattrlist.mulcold
};


/*
 * Previously in Finnish National Library mode
 */

sattrlist.klk_fi = {
    text_label : {
        label : "klk_label",
        opts : settings.defaultOptions,
    },
    text_publ_title : {
        label : "klk_publ_title",
        opts : settings.defaultOptions,
    },
    /*
    text_publ_part : {
        label : "klk_publ_part",
        opts : settings.defaultOptions,
    },
    */
    text_publ_id : {
        label : "klk_publ_id",
        opts : settings.defaultOptions,
    },
    text_issue_date : {
        label : "klk_issue_date",
        opts : settings.defaultOptions,
    },
    text_issue_no : {
        label : "klk_issue_no",
        opts : settings.defaultOptions,
    },
    text_issue_title : {
        label : "klk_issue_title",
        opts : settings.defaultOptions,
    },
    /*
    text_part_name : {
        label : "klk_part_name",
        opts : settings.defaultOptions,
    },
    */
    text_elec_date : {
        label : "klk_elec_date",
        opts : settings.defaultOptions,
    },
    text_language : {
        label : "klk_language",
        opts : settings.defaultOptions,
    },
    /*
    text_page_id : {
        label : "klk_page_id",
        opts : settings.defaultOptions,
    },
    */
    text_page_no : {
        label : "klk_page_no",
        opts : settings.defaultOptions,
    },
    text_sentcount : {
        label : "klk_sentcount",
        displayType : "hidden",
    },
    text_tokencount : {
        label : "klk_tokencount",
        displayType : "hidden",
    },
    text_img_url : {
        label : "klk_img_url",
        type : "url",
	displayType : "hidden",
    },
    text_dateto : {
        label : "klk_dateto",
        displayType : "hidden",
    },
    text_datefrom : {
        label : "klk_datefrom",
        displayType : "hidden",
    },
    text_publ_type : {
	label : "publication_type",
	displayType : "select",
	translationKey : "publtype_",
	opts : settings.liteOptions,
	dataset : [
	    "aikakausi",
	    "sanomalehti"
	]
    },
    paragraph_id : {
        label : "paragraph_id",
        displayType : "hidden",
    },
    sentence_id : sattrs.sentence_id_hidden
};

sattrlist.klk_fi_parsed = $.extend({}, sattrlist.klk_fi);
$.extend(sattrlist.klk_fi_parsed,
	 {
	     sentence_parse_state : {
		 label : "klk_parse_state",
		 displayType : "select",
		 translationKey : "parse_state_",
		 opts : settings.liteOptions,
		 dataset : {
		     "parsed" : "parsed",
		     "tagged" : "tagged"
		 }
	     },
	     sentence_local_id : {
		 label : "local_id",
		 displayType : "hidden"
	     }
	 });


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
	    + (words ? "?term=" + words : "")
	    + "#?page=" + token_data.struct_attrs.text_page_no);
}

sattrlist.klk_pagelinks = {
    text_binding_id : {
	displayType : "hidden"
    },
    text_page_image_url : {
	label : "show_page_image",
	type : "url",
	url_opts : sattrs.link_url_opts,
	synthetic : true,
	stringify_synthetic : function (token_data) {
	    return settings.fn.make_klk_page_image_url(token_data, 0);
	}
    },
    text_page_image_context_url : {
	label : "show_page_image_context",
	type : "url",
	url_opts : sattrs.link_url_opts,
	synthetic : true,
	stringify_synthetic : function (token_data) {
	    return settings.fn.make_klk_page_image_url(token_data, 2);
	}
    },
    text_download_pdf_url : {
	label : "download_publ_pdf",
	type : "url",
	url_opts : sattrs.link_url_opts,
	synthetic : true,
	stringify_synthetic : function (token_data) {
	    return settings.fn.make_klk_url_base(token_data) + "/pdf";
	}
    },
};

sattrlist.klk_fi_parsed_pagelinks = $.extend({}, sattrlist.klk_fi_parsed);
$.extend(sattrlist.klk_fi_parsed_pagelinks, sattrlist.klk_pagelinks);

attrlist.klk_fi = {
    ocr : {
	label : "OCR",
	opts : settings.defaultOptions
    }
};

attrlist.klk_fi_parsed =
    $.extend(
	{
	    lemma : attrs.baseform,
	    lemmacomp : attrs.baseform_compound,
	    pos : attrs.pos_klk,
	    msd : attrs.msd,
	    dephead : attrs.dephead,
	    deprel : attrs.deprel_tdt,
	    ref : attrs.ref,
	    lex : attrs.lemgram_hidden
	},
	attrlist.klk_fi);

attrlist.klk_fi_parsed_pagelinks = attrlist.klk_fi_parsed;


// Functions used for constructing settings.corpora and
// settings.corporafolders for corpora split by year


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
	title : title_format.replace("{year}", year_str),
	description : descr_format.replace("{year}", year_str),
	within : settings[ctx_type + "Within"],
	context : settings[ctx_type + "Context"],
	attributes : attrlist[attrs_key],
	struct_attributes : sattrlist[attrs_key]
    };
}


var klk_fi_parsed_years = settings.fn.make_yearlist(1820, 2000);

// Generate settings.corpora and settings.corporafolders for the
// Finnish KLK corpora by using the above functions

settings.fn.make_corpus_settings_by_year_decade(
    settings.corporafolders.klk_fi, "fi_{decade}", "klk_fi_{year}",
    function(decade) {
	return {
	    title : decade.toString() + "-luku",
	    // unselected : (decade <= 1880)
	};
    },
    function(year) {
	return settings.fn.make_klk_corpus_settings(
	    "KLK suomi {year}",
	    "Kansalliskirjaston suomenkielisiä sanoma- ja aikakauslehtiä vuodelta {year}",
	    "fi",
	    year,
	    klk_fi_parsed_years.indexOf(year) != -1);
    },
    settings.fn.make_yearlist(1820, 2000,
			      {descending : true,
			       omit : [1828, 1843]})
);

delete klk_fi_parsed_years;


/*
 * Previously in Old Finnish Mode
 */

sattrs.vks_sentence_id = {
    label : "vks_sentence_id"
};
sattrs.vks_sentence_cref = {
    label : "vks_sentence_cRef"
};
sattrs.vks_sentence_code = {
    label : "vks_sentence_code"
};
sattrs.vks_sentence_type = {
    label : "vks_sentence_type",
    translationKey : "vks_sentence_type_",
    dataset : {
	"sentence" : "Sentence",
	"heading" : "Heading"
    }
};
sattrs.vks_text_year = {
    label : "vks_text_year"
};
sattrs.vks_text_title = {
    label : "vks_text_title"
};
sattrs.vks_sentence_page = {
    label : "vks_sentence_page"
};
sattrs.vks_sourcecode_code = {
    label : "vks_sourcecode_code"
};
sattrs.vks_sourcecode_page = {
    label : "vks_sourcecode_page"
};
sattrs.vks_span_page = {
    label : "vks_span_page"
};

/*
sattrs.vksbib_book_code = {
    label : "vksbib_book_code",
    displayType : "select",
    translationKey : "vksbibbook_",
    dataset : {
	"VT4" : "VT4",
	"Jes" : "Jes",
	"Jer" : "Jer",
	"Vlt" : "Vlt",
	"Hes" : "Hes",
	"Dan" : "Dan",
	"Hos" : "Hos",
	"Joel" : "Joel",
	"Am" : "Am",
	"Ob" : "Ob",
	"Jon" : "Jon",
	"Mik" : "Mik",
	"Nah" : "Nah",
	"Hab" : "Hab",
	"Sef" : "Sef",
	"Hgg" : "Hgg",
	"Sak" : "Sak",
	"Mal" : "Mal",
    },
    opts : settings.liteOptions
};
// Copy the object so that the change does not affect the original.
sattrs.vksbib_sourcecode_book = $.extend({}, sattrs.vksbib_book_code);
sattrs.vksbib_sourcecode_book.label = "vksbib_sourcecode_book";
sattrs.vkslait_law_code = {
    label : "vkslait_law_code",
    displayType : "select",
    translationKey : "vkslaitlaw_",
    dataset : {
	"As1584" : "As1584",
	"As1593" : "As1593"
    },
    opts : settings.liteOptions
};
sattrs.vkslait_sourcecode_work = $.extend({}, sattrs.vkslait_law_code);
sattrs.vkslait_sourcecode_work.label = "vkslait_sourcecode_work";
sattrs.vkssaarnat_source_code = {
    label : "vkssaarnat_source_code",
    displayType : "select",
    translationKey : "vkssaarnatsource_",
    dataset : {
	"Swahn1706" : "Swahn1706",
	"Wall1706" : "Wall1706",
	"Sten1750" : "Sten1750",
	"Rein1750" : "Rein1750",
	"Sten1771" : "Sten1771",
	"Varia1756a" : "Varia1756a",
	"Paz1764" : "Paz1764",
	"Elgf1768" : "Elgf1768",
	"Laih1768" : "Laih1768",
	"GLyra1772" : "GLyra1772",
	"Sax1776" : "Sax1776",
	"Äjm1779" : "Äjm1779",
	"Widen1780" : "Widen1780",
	"Popp1781" : "Popp1781"
    },
    opts : settings.liteOptions
};
sattrs.vkssaarnat_sourcecode_work = $.extend({}, sattrs.vkssaarnat_source_code);
sattrs.vkssaarnat_sourcecode_work.label = "vkssaarnat_sourcecode_work";
*/

/*
settings.corpora.vks_biblia = {
    title : "Biblia (näyte)",
    description : "Vuoden 1642 raamatunsuomennos",
    id : "vks_biblia",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {},
    struct_attributes : {
	sourcecode_bibleref : {
	    label : "vksbib_sourcecode_bibleref"
	},
	sourcecode_book : sattrs.vksbib_sourcecode_book,
	sourcecode_chapter : {
	    label : "vksbib_sourcecode_chapter"
	},
	sourcecode_verse : {
	    label : "vksbib_sourcecode_verse"
	},
	sourcecode_code : sattrs.vks_sourcecode_code,
	sourcecode_page : sattrs.vks_sourcecode_page,
	work_code : {
	    label : "vks_work_code",
	    displayType : "hidden",
	},
	verse_bibleref : {
	    label : "vksbib_verse_bibleref"
	},
	book_code : sattrs.vksbib_book_code,
	chapter_code : {
	    label : "vksbib_chapter_code"
	},
	// chapter_bibleref : {
	//     label : "vksbib_chapter_bibleref"
	// },
	verse_code : {
	    label : "vksbib_verse_code"
	},
	sentence_id : sattrs.sentence_id_hidden,
	span_code : sattrs.vks_sentence_code,
	span_page : sattrs.vks_sentence_page
    }
};
*/

/*
settings.corpora.vks_lait = {
    title : "Laki- ja asetustekstejä (näyte)",
    description : "Laki- ja asetustekstejä",
    id : "vks_lait",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	word_orig : attrs.origword,
	word_completed : attrs.complword
    },
    struct_attributes : {
	sourcecode_work : sattrs.vkslait_sourcecode_work,
	sourcecode_code : sattrs.vks_sourcecode_code,
	sourcecode_page : sattrs.vks_sourcecode_page,
	law_code : sattrs.vkslait_law_code,
	sentence_id : sattrs.sentence_id_hidden,
	span_code : sattrs.vks_sentence_code,
	span_page : sattrs.vks_sentence_page
    }
};
*/

/*
settings.corpora.vks_saarnat = {
    title : "Ruumissaarnoja, puheita ja muistorunoja (näyte)",
    description : "Ruumissaarnoja, puheita ja muistorunoja",
    id : "vks_saarnat",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	word_orig : attrs.origword,
	word_completed : attrs.complword
    },
    struct_attributes : {
	sourcecode_work : sattrs.vkssaarnat_sourcecode_work,
	sourcecode_code : sattrs.vks_sourcecode_code,
	sourcecode_page : sattrs.vks_sourcecode_page,
	source_code : sattrs.vkssaarnat_source_code,
	sentence_id : sattrs.sentence_id_hidden,
	span_code : sattrs.vks_sentence_code,
	span_page : sattrs.vks_sentence_page
    }
};
*/

settings.corpora.vks_agricola = {
    title : "Mikael Agricolan teoksia",
    description : "Mikael Agricola: Suomalaisen Kirjallisuuden Seuran näköispainossarja Mikael Agricolan teoksista",
    id : "vks_agricola",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	word_orig : attrs.origword,
	word_completed : attrs.complword,
	word_tilde : attrs.tildeword
    },
    struct_attributes : {
	text_year : sattrs.vks_text_year,
	text_title : sattrs.vks_text_title,
	sentence_type : sattrs.vks_sentence_type,
	sentence_code : sattrs.vks_sentence_code,
	sentence_id : sattrs.sentence_id_hidden,
	sentence_cRef : sattrs.vks_sentence_cref,
	span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_almanakat = {
    title : "Almanakkoja vuosilta 1705–1809",
    description : "Almanakkoja vuosilta 1705–1809",
    id : "vks_almanakat",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_biblia = {
    title : "Biblia 1642",
    description : "Vuoden 1642 raamatunsuomennos",
    id : "vks_biblia",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_bjorkqvist = {
    title : "Bjorkqvist 1801",
    description : "Uskon harjoitus Autuuteen, Sowitettu niiden Wuotisten \
Juhla- ja Sunnundai-Päiwäisten Evangeliumein Tutkinnoissa. Osat I–II 1801",
    id : "vks_bjorkqvist",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_frosterus = {
    title : "Frosterus 1791",
    description : "Hyödyllinen Huwitus Luomisen Töistä, Yxinkertaisille awuxi Jumalan Hywyden Tundoon ja Palweluxeen",
    id : "vks_frosterus",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_ganander = {
    title : "Christfried Ganander 1763–1788",
    description : "Gananderin teoksia",
    id : "vks_ganander",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_lait = {
    title : "Lakeja ja asetuksia 1500–1810",
    description : "Lakeja ja asetuksia 1500-, 1600-, 1700- ja 1800-luvuilta",
    id : "vks_lait",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_lizelius = {
    title : "Antti Lizelius 1756–1780",
    description : "Lizeliuksen teoksia vuosilta 1756–1780",
    id : "vks_lizelius",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_lpetri = {
    title : "Laurentius Petri 1644–1670",
    description : "Laurentius Petrin saarnoja 1644–1670",
    id : "vks_lpetri",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_saarnat = {
    title : "Ruumissaarnoja, puheita ja muistorunoja",
    description : "Ruumissaarnoja, puheita ja muistorunoja 1600- ja 1700-luvuilta",
    id : "vks_saarnat",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_varia = {
    title : "Varia",
    description : "Kokoelma tekstejä 1500-, 1600-, 1700- ja 1800-luvuilta",
    id : "vks_varia",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_virret = {
    title : "Virret",
    description : "Virsiä",
    id : "vks_virret",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};


settings.corpora.vns_asetus = {
    title : "Asetuksia (näyte)",
    description : "Asetuksia",
    id : "vns_asetus",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	article_id : {
	    label : "article_id"
	},
	paragraph_id : {
	    label : "lawparagraph_id"
	},
	sentence_type : {
	    label : "sentence_type",
	    displayType : "select",
	    translationKey : "sentencetype_",
	    dataset : {
		"p" : "p",
		"head" : "head",
		"opening" : "opening"
	    },
	    opts : settings.liteOptions
	},
	sentence_id : sattrs.sentence_id_hidden,
	hi_rend : {
	    label : "hi_rend",
	    displayType : "select",
	    translationKey : "hirend_",
	    dataset : {
		"bold" : "bold"
	    },
	    opts : settings.liteOptions
	}
    }
};

settings.corpora.vns_renqvist = {
    title : "Renqvist (näyte)",
    description : "Renqvist",
    id : "vns_renqvist",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	paragraph_id : sattrs.paragraph_id,
	paragraph_type : sattrs.paragraph_type,
	sentence_id : sattrs.sentence_id_hidden,
	sentence_n : sattrs.sentence_n
    }
};

settings.corpora.vns_renvall = {
    title : "Renvall",
    description : "Gustaf Renvall: Suomalainen sana-kirja (1826)",
    id : "vns_renvall",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
/*	sentence_form : {
	    label : "dict_form"
	},
	sentence_example : {
	    label : "dict_example"
	},
	sentence_pos : {
	    label : "pos"
	},
	sentence_xref : {
	    label : "dict_xref"
	},
	sentence_etym : {
	    label : "dict_etym"
	},
	sentence_etymlang : {
	    label : "dict_etymlang",
	    displayType : "select",
	    translationKey : "dictetymlang_",
	    dataset : {
		"ru" : "ru",
		"ve" : "ve"
	    },
	    opts : settings.liteOptions
	},  */
	item_itemtype : {
	    label : "dict_itemtype",
	    displayType : "select",
	    translationKey : "dictitemtype_",
	    dataset : {
		"orth" : "orth",
		"pos" : "pos",
		"eg" : "eg",
		"xr" : "xr",
		"etym" : "etym",
		"note" : "note"
	    },
	    opts : settings.liteOptions
	},
	item_type : {
	    label : "dict_item_type"
	},
	item_lang : {
	    label : "dict_etymlang",
	    displayType : "select",
	    translationKey : "dictetymlang_",
	    dataset : {
		"ru" : "ru",
		"ve" : "ve"
	    },
	    opts : settings.liteOptions
	},
    }
};

settings.corpora.gutenberg = {
    title : "Gutenberg",
    description : "Project Gutenbergin sisältämiä suomenkielisiä teoksia, joiden tekijänoikeus on päättynyt",
    id : "gutenberg",
    within : settings.spWithin,
    context : settings.spContext,
    urn : "urn:nbn:fi:lb-2014102101",
    metadata_urn : "urn:nbn:fi:lb-2014100301",
    homepage_url : "http://www.gutenberg.org/",
    licence_url : "http://www.gutenberg.org/wiki/Gutenberg:The_Project_Gutenberg_License",
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	sentence_id : sattrs.sentence_id_hidden,
	text_author : sattrs.text_author,
	text_producers : sattrs.text_producers,
	text_ebookid : sattrs.text_ebook_id,
	text_translator : sattrs.text_translator,
	text_published : sattrs.text_published,
        text_url : sattrs.link_gutenberg,
	text_directurl : sattrs.text_link_gutenberg
/*
	text_producers : sattrs.text_producers,
	sentence_id : sattrs.sentence_id_hidden
        text_title : sattrs.text_title,
        text_author : sattrs.text_author,
        p_id : sattrs.paragraph_id,
        s_id : sattrs.sentence_id_hidden,
        s_type : sattrs.sentence_type
*/
    }
};

/* testiversio
settings.corpora.suomi24fi = {
    title : "Suomi24",
    description : "suomi24.fi -forumin keskustelut (2001-2014)",
    id : "suomi24fi",
    urn : "urn:nbn:fi:lb-201412171",
    metadata_urn : "urn:nbn:fi:lb-201412171",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	lemma : attrs.baseform,
	pos : attrs.pos_klk,
	msd : attrs.msd,
	dephead : attrs.dephead
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_date : sattrs.date,
        text_time : sattrs.text_time,
        text_sect : {
            label : "suomi24fi_sect",
        },
        text_sub : {
            label : "suomi24fi_sub",
        },
        text_user : {
            label : "suomi24fi_user",
        },
        sentence_id : sattrs.sentence_id_hidden,

        text_urlmsg : {
            label : "suomi24fi_urlmsg",
            type : "url",
            url_opts : sattrs.link_url_opts
        },

	text_urlboard : {
            label : "suomi24fi_urlboard",
            type : "url",
            url_opts : sattrs.link_url_opts
        }
    }
};
*/

settings.corpus_aliases.murre = "skn";

settings.corpora.skn = {
    title : "SKN – Suomen kielen näytteitä",
    description : "SKN – Suomen kielen näytteitä",
    id : "skn",
    urn : "urn:nbn:fi:lb-201407141",
    metadata_urn : "urn:nbn:fi:lb-201407141",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        original : attrs.origword,
        normalized : {
            label : "murre_normalized",
            opts : settings.defaultOptions,
        },
        comment : {
	    label : "word_comment",
	    opts : settings.defaultOptions
	}
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_date : sattrs.date,
        text_editor : {
            label : "murre_editor"
	},
        text_parish : {
            label : "murre_parish"
	},
        text_dialect_region : {
            label : "murre_dialect_region"
	},
        text_dialect_group : {
            label : "murre_dialect_group"
	},
        text_name : {
            label : "file_name",
        },
        paragraph_speaker : {
            label : "murre_speaker"
	},
        paragraph_sex : {
            label : "murre_sex"
	},
        paragraph_role : {
            label : "murre_role"
	},
        sentence_urlview : {
            label : "murre_urlview",
            type : "url",
            url_opts : sattrs.link_url_opts
        },
        text_urlvaw : {
            label : "murre_urlwav",
            type : "url",
            url_opts : sattrs.link_url_opts
        },
        text_urltextgrid : {
            label : "murre_urltextgrid",
            type : "url",
            url_opts : sattrs.link_url_opts
        },
        text_urleaf : {
            label : "murre_urleaf",
            type : "url",
            url_opts : sattrs.link_url_opts
        }
    }
};


settings.corpora.ylilauta = {
    title : "Ylilauta",
    description : "Ylilauta",
    id : "ylilauta",
    urn : "urn:nbn:fi:lb-2015031802",
    metadata_urn : "urn:nbn:fi:lb-2015031802",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	/*
	lemma : attrs.baseform,
	pos : attrs.pos_klk,
	msd : attrs.msd,
	syn : attrs.deprel_tdt*/
        lemma : attrs.baseform,
        lemmacomp : attrs.baseform_compound,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        lex : attrs.lemgram_hidden,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_date : sattrs.date,
        text_clock : sattrs.text_time,
        text_sec : {
            label : "suomi24fi_sect",
        }
    }
};

settings.corpora.s24 = {
    title : "Suomi24",
    description : "Suomi24-keskustelut (2002–2014)",
    id : "s24",
    urn : "urn:nbn:fi:lb-201412171",
    metadata_urn : "urn:nbn:fi:lb-201412171",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	/*
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : {
            label : "msd",
            opts : settings.defaultOptions
        },
        dep : {
            label : "dephead",
            opts : settings.defaultOptions
        },
        syn : attrs.deprel_tdt,
        unk : attrs.ner_tags*/
        lemma : attrs.baseform,
        lemmacomp : attrs.baseform_compound,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        lex : attrs.lemgram_hidden,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_date : sattrs.date,
        text_time : sattrs.text_time,
        text_sect : {
            label : "suomi24fi_sect",
        },
        text_sub : {
            label : "suomi24fi_sub",
        },
        text_user : {
            label : "suomi24fi_user",
        },
        sentence_id : sattrs.sentence_id_hidden,

        text_urlmsg : {
            label : "suomi24fi_urlmsg",
            type : "url",
            url_opts : sattrs.link_url_opts
        },
        text_urlboard : {
            label : "suomi24fi_urlboard",
            type : "url",
            url_opts : sattrs.link_url_opts
        }
    }
};

settings.corpora.iclfi = {
    title : "ICLFI – Kansainvälinen oppijansuomen korpus",
    description : "ICLFI – International Corpus of Learner Finnish – Kansainvälinen oppijansuomen korpus",
    id : "iclfi",
    urn : "urn:nbn:fi:lb-20140730163",
    metadata_urn : "urn:nbn:fi:lb-20140730163",
    limited_access : true,
    licence_type : "RES",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        msd : attrs.msd
        /*dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref*/
    },
    struct_attributes : {
        text_place : {
            label : "iclfi_place"
	},
        text_year : {
            label : "iclfi_year"
	},
        text_medium : {
            label : "iclfi_medium"
	},
        text_code : {
            label : "iclfi_code"
	},
        text_dob : {
            label : "iclfi_dob"
	},
        text_sex : {
            label : "iclfi_sex"
	},
        text_pob : {
            label : "iclfi_pob"
	},
        text_infloc : {
            label : "iclfi_infloc"
	},
        text_inflang : {
            label : "iclfi_inflang"
	},
        text_infmotherlang : {
            label : "iclfi_infmotherlang"
	},
        text_inffatherlang : {
            label : "iclfi_inffatherlang"
	},
        text_finnishathome : {
            label : "iclfi_finnishathome"
	},
        text_taugthfinnish : {
            label : "iclfi_taugthfinnish"
	},
        text_teacherlang : {
            label : "iclfi_teacherlang"
	},
        text_beentofinland : {
            label : "iclfi_beentofinland"
	},
        text_book : {
            label : "iclfi_book"
	},
        text_levelhour : {
            label : "iclfi_levelhour"
	},
        text_levelcerfone : {
            label : "iclfi_levelcerfone"
	},
        text_levelcerftwo : {
            label : "iclfi_levelcerftwo"
	},
        text_otherlangs : {
            label : "iclfi_otherlangs"
	},
        text_texttype : {
            label : "iclfi_texttype"
	},
        text_exercise : {
            label : "iclfi_exercise"
	},
        text_examtype : {
            label : "iclfi_examtype"
	},
        text_limitedtime : {
            label : "iclfi_limitedtime"
	},
        text_wherewritten : {
            label : "iclfi_wherewritten"
	},
        text_aids : {
            label : "iclfi_aids"
	},
        text_filename : {
            label : "iclfi_filename"
	}
    }
};





/*
 * Modify the list of corpora
 */


// corporafolder properties that are not names of subfolders.
// Represented as an object instead of an array, so that we can use
// the JavaScript "in" operator.
settings.corporafolder_properties = {
    title : "",
    description : "",
    contents : "",
    info : "",
    unselected : ""
};


// Remove non-existing or irrelevant corpora (and folders) based on
// the server from which the code is being run.


// Recursively remove corpora folders in folder containing no corpora
// (or folders) that are in settings.corpora. Returns true if folder
// is empty.
settings.fn.remove_empty_corporafolders = function (folder) {
    var empty = true;
    if ("contents" in folder) {
	var new_contents = [];
	for (var i = 0; i < folder.contents.length; i++) {
	    var corpname = folder.contents[i];
	    if (corpname in settings.corpora) {
		new_contents.push(corpname);
	    }
	}
	if (new_contents.length == 0) {
	    delete folder.contents;
	} else {
	    folder.contents = new_contents;
	    empty = false;
	}
    }
    for (var prop in folder) {
	if (folder.hasOwnProperty(prop)
	    && ! (prop in settings.corporafolder_properties)) {
	    if (settings.fn.remove_empty_corporafolders(folder[prop])) {
		delete folder[prop];
	    } else {
		empty = false;
	    }
	}
    }
    return empty;
}

// Remove from settings.corpora corpora whose property name (id)
// matches one of regular expressions (as strings) in corplist. If the
// second argument is true, remove the corpora that do *not* match any
// of the regular expressions. After that, remove corpora folders that
// would be empty after removing the copora.
settings.fn.remove_matching_corpora = function (corplist) {
    var inverse = (arguments.length > 1 && arguments[1]);
    var corp_re = new RegExp("^(" + corplist.join ("|") + ")$");
    for (var corpus in settings.corpora) {
	var matches = corp_re.test (corpus);
	if ((matches && ! inverse) || (inverse && ! matches)) {
	    delete settings.corpora[corpus];
	}
    }
    settings.fn.remove_empty_corporafolders(settings.corporafolders);
};

// Corpora available locally on the development laptop
var locally_available_corpora =
    ["ftb(2|3_.*)",
     "reittidemo",
     "kotus_ns_presidentti_.*",
     "kotus_klassikot",
     "kotus_sananparret",
     "la_murre_.*",
     "(mulcold|legal)_..",
     "s24",
     "skvr",
     "sks_kivi_fi",
     "v[kn]s_.*",
     "test.*"];

// Remove all but the locally available corpora if running on the
// development and all with names beginning with "test" from the
// public servers.

if (! isPublicServer) {
    settings.fn.remove_matching_corpora(locally_available_corpora, true);
} else {
    settings.fn.remove_matching_corpora(["test.*"]);
}

delete locally_available_corpora;


// Add extra properties to corpus attributes based on other
// properties. This is currently used to add extended_template and
// controller to attributes with displayType "select".
// Another approach would be to add these properties explicitly to all
// the relevant attribute objects, as Språkbanken have done. Both
// approaches probably have advantages and disadvantages (less
// redundancy vs. explicitness).


// An array of properties of corpus attributes to be added based on
// other properties. Each element contains is an object with the
// properties "test" (a function returning true for the attribute
// object if the extra properties should be added) and "props" (an
// object containing the extra properties to be added).
settings.attr_extra_properties = [
    {
	// If displayType == "select", add properties
	// extended_template and controller.
	test : function (attr) {
	    return "displayType" in attr && attr.displayType == "select";
	},
	props : {
	    extended_template : selectType.extended_template,
	    controller : selectType.controller
	}
    }
];

// Add the extra attibute properties in settings.attr_extra_properties
// to the appropriate attributes of corpora.
settings.fn.add_attr_extra_properties = function (corpora) {
    for (var corpname in corpora) {
	var corpus = corpora[corpname];
	if ("attributes" in corpus) {
	    for (var attrname in corpus.attributes) {
		for (var i = 0; i < settings.attr_extra_properties.length; i++) {
		    var attr_extra_props = settings.attr_extra_properties[i];
		    var attr = corpus.attributes[attrname];
		    if (attr_extra_props.test(attr)) {
			var props = attr_extra_props.props;
			for (var prop in props) {
			    if (props.hasOwnProperty(prop)
				&& ! attr.hasOwnProperty(prop)) {
				attr[prop] = props[prop];
			    }
			}
		    }
		}
	    }
	}
    }
}

// Add the extra properties to corpora

settings.fn.add_attr_extra_properties(settings.corpora);


/*
 * MISC
 */


// label values here represent translation keys.
settings.arg_groups = {
    "word" : {
        word : {label : "word"}
    }
};


settings.reduce_stringify = function(type) {

    function filterCorpora(rowObj) {
        return $.grepObj(rowObj, function(value, key) {
            return key != "total_value" && $.isArray(value);
            //return key != "total_value" && $.isPlainObject(value);
        });
    }

    function getCorpora(dataContext) {
        var corpora = $.grepObj(filterCorpora(dataContext), function(value, key) {
            return value[1] != null; // value[1] is an optimized value.relative
        });
        corpora = $.map($.keys(corpora), function(item) {
            return item.split("_")[0].toLowerCase();
        });
        return corpora;
    }

    function appendDiagram(output, corpora, value) {
        //if(corpora.length > 1)
            return output + $.format('<img id="circlediagrambutton__%s" src="img/stats2.png" class="arcDiagramPicture"/>', value);
        //else
        //    return output;
    }
    var output = "";
    switch(type) {
    case "word":
        return function(row, cell, value, columnDef, dataContext) {
            var corpora = getCorpora(dataContext);
            if(value == "&Sigma;") return appendDiagram(value, corpora, value);

            var query = $.map(dataContext.hit_value.split(" "), function(item) {
                return $.format('[word="%s"]', item);
            }).join(" ");

            output = $("<span>",
                    {
                    "class" : "link",
                    "data-query" : encodeURIComponent(query),
                    "data-corpora" : JSON.stringify(corpora)
                    }).text(value).outerHTML();
            return appendDiagram(output, corpora, value);

        };

    case "pos":
        return function(row, cell, value, columnDef, dataContext) {
            var corpora = getCorpora(dataContext);
            if(value == "&Sigma;") return appendDiagram(value, corpora, value);
            var query = $.map(dataContext.hit_value.split(" "), function(item) {
                return $.format('[pos="%s"]', item);
            }).join(" ");
            output =  _.map(value.split(" "), function(token) {
                return $("<span>")
                .localeKey("pos_" + token)
                .outerHTML()
            })
            var link = $("<span>").addClass("link")
                .attr("data-query", query)
                .attr("data-corpora", JSON.stringify(corpora))
                .html(output.join(" "))
            return appendDiagram(link.outerHTML(), corpora, value);
        };
    case "saldo":
    case "prefix":
    case "suffix":
    case "lex":
    case "lemma":
        return function(row, cell, value, columnDef, dataContext) {
            var corpora = getCorpora(dataContext);
            if(value == "&Sigma;") return appendDiagram(value, corpora, value);
            // else if(value == "|") return "-";

            // var stringify = type == "saldo" ? util.saldoToString : util.lemgramToString;
            if(type == "saldo") stringify = util.saldoToString
            else if(type == "lemma") stringify = function(lemma) {return lemma.replace(/_/g, " ")}
            else stringify = util.lemgramToString
            
            // c.log ("value", value)
            if(!_.isArray(value)) value = [value]
            var html = _.map(value[0].split(" "), function(token) {
                if(token == "|") return "–";
                return _(token.split("|"))
                    .filter(Boolean)
                    .map(function(item) {
                        return stringify(item.replace(/:\d+/g, ""), true)
                    })
                    .join(", ");
            });

            // Assume simple values (instead of feature set values)
            // for lemmas in other modes than "swedish" and thus use
            // the operator = instead of contains.
            var comp_op = (type == "lemma" && window.currentMode != "swedish"
                           ? " = " : " contains ");
            var cqp = _.map(_.zip.apply(null, _.invoke(value, "split", " ")), function(tup) {
                return "[" + _.map(_.uniq(tup), function(item) {
                    return "(" + type + comp_op + "'" + item + "')"
                }).join(" | ") + "]"

            }).join(" ")

            
            output = $("<span class='link'>")
                .attr("data-query", cqp)
                .attr("data-corpora", JSON.stringify(corpora))
                .append(html.join(" ")).outerHTML()

            return appendDiagram(output, corpora, value);
        };
    
    // case "lemma":
    //     return function(row, cell, value, columnDef, dataContext) {
    //         var corpora = getCorpora(dataContext);
    //         if(value == "&Sigma;") return appendDiagram(value, corpora, value);

    //         stringify = function(lemma) {return lemma.replace("_", " "))}

    //         output = $("<span class='link'>")
    //             .attr("data-query", cqp)
    //             .attr("data-corpora", JSON.stringify(corpora))
    //             .append(html.join(" ")).outerHTML()
            
    //         return appendDiagram(output, corpora, stringify(value));
    case "deprel":
        return function(row, cell, value, columnDef, dataContext) {
            var corpora = getCorpora(dataContext);
            if(value == "&Sigma;") return appendDiagram(value, corpora, value);
            var query = $.map(dataContext.hit_value.split(" "), function(item) {
                return $.format('[deprel="%s"]', item);
            }).join(" ");
            output = $.format("<span class='link' data-query='%s' data-corpora='%s' rel='localize[%s]'>%s</span> ",
                    [query, JSON.stringify(corpora),"deprel_" + value, util.getLocaleString("deprel_" + value)]);
            return appendDiagram(output, corpora, value);

        };
    default: // structural attributes and non-standard positional attributes
        return function(row, cell, value, columnDef, dataContext) {
            var corpora = getCorpora(dataContext);
            var cl = settings.corpusListing.subsetFactory(corpora);
            var attrObj;
            var query_format;
            // Prefix the name of the attribute with an underscore in
            // the CQP expression only for structural attributes.
            if (type in cl.getStructAttrs()) {
                attrObj = cl.getStructAttrs()[type];
                query_format = '[_.%s="%s"]';
            } else {
                attrObj = cl.getCurrentAttributes()[type];
                query_format = '[%s="%s"]';
            }
            var query = $.map(dataContext.hit_value.split(" "), function(item) {
                return $.format(query_format, [type, item]);
            }).join(" ");

            // if(type in cl.getStructAttrs())
            // var attrObj = cl.getStructAttrs()[type]
            c.log ("attrObj", attrObj)

            var prefix = ""
            var relLocalize = ""
            if(!_.isUndefined(attrObj) && value != "&Sigma;" && attrObj.translationKey ) {
                prefix = attrObj.translationKey
                relLocalize = " rel='localize[" + prefix + value + "]'"
            }

            output = $.format("<span class='link' data-query='%s' data-corpora='%s'%s>%s</span> ",
                    [query, JSON.stringify(corpora), relLocalize,
                     util.getLocaleString(prefix + value)]);
            c.log("stringify default", prefix, value)
            if(value == "&Sigma;") return appendDiagram(output, corpora, value);

            return appendDiagram(output, corpora, value);
        };
    }

    return output;
};


delete attrs;
delete sattrs;
delete context;
delete ref;




settings.posset = {
   type : "set",
   label : "pos",
   displayType : "select",
   opts : settings.setOptions,
   translationKey : "pos_",
   extended_template : selectType.extended_template,
   controller : selectType.controller,
   dataset :  {
    "AB" : "AB",
    "MID|MAD|PAD" : "DL",
    "DT" : "DT",
    "HA" : "HA",
    "HD" : "HD",
    "HP" : "HP",
    "HS" : "HS",
    "IE" : "IE",
    "IN" : "IN",
    "JJ" : "JJ",
    "KN" : "KN",
    "NN" : "NN",
    "PC" : "PC",
    "PL" : "PL",
    "PM" : "PM",
    "PN" : "PN",
    "PP" : "PP",
    "PS" : "PS",
    "RG" : "RG",
    "RO" : "RO",
    "SN" : "SN",
    "UO" : "UO",
    "VB" : "VB"
            }
};
settings.fsvlemma = {
    //pattern : "<a href='http://spraakbanken.gu.se/karp/#search=cql%7C(gf+%3D+%22<%= key %>%22)+sortBy+wf'><%= val %></a>",
    type : "set",
    label : "baseform",
    displayType : "autocomplete",
    opts : settings.setOptions,
    stringify : function(baseform) {
        return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    extended_template : "<input korp-autocomplete model='model' stringify='stringify' sorter='sorter' type='lem' >",
    controller : function($scope) {
        $scope.stringify = util.lemgramToString;
        $scope.sorter = view.lemgramSort;
    },
//      externalSearch : "http://spraakbanken.gu.se/karp/#search=cql%7C(gf+%3D+%22<%= val %>%22)+sortBy+lemgram",
//  internalSearch : true

};
settings.fsvlex = {
    type : "set",
    label : "lemgram",
    displayType : "autocomplete",
    opts : settings.setOptions,
    extended_template : "<input korp-autocomplete model='model' stringify='stringify' sorter='sorter' type='lem' >",
    controller : function($scope) {
        $scope.stringify = util.lemgramToString;
        $scope.sorter = view.lemgramSort;
    },
    stringify : function(str) {
        return util.lemgramToString(str, true);
    },
    externalSearch : karpLemgramLink,
    internalSearch : true
};
settings.fsvvariants = {
    type : "set",
    label : "variants",
    stringify : function(str) {
        return util.lemgramToString(str, true);
    },
    displayType : "autocomplete",
    extended_template : "<input korp-autocomplete model='model' stringify='stringify' sorter='sorter' type='lem' >",
    controller : function($scope) {
        $scope.stringify = util.lemgramToString;
        $scope.sorter = view.lemgramSort;
    },
    opts : settings.setOptions,
    externalSearch : karpLemgramLink,
    internalSearch : true
};
