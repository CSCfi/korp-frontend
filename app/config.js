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
    (isProductionServer && (window.location.pathname.indexOf("beta") != -1
			    || window.location.pathname.indexOf("lab") != -1
			    || window.location.pathname.indexOf("-jn5") != -1));
var isProductionServerOld =
    (isProductionServer && window.location.pathname.indexOf("old/") != -1);
var isPublicServer = (window.location.hostname != "localhost");

c.log("Production server:", isProductionServer);

var baseURL = (window.location.protocol + "//" + window.location.hostname
               + window.location.pathname);

settings.lemgramSelect = true;
settings.autocomplete = true;
settings.enableMap = true;
// settings.wordpicture = false;
settings.hits_per_page_default = 25
// If settings.show_related_words is not defined, it is considered
// true.
settings.show_related_words = false;
settings.name_classification = true;

// The lemgram service to use for autocompletion. If not specified,
// use Språkbanken's Karp. (Jyrki Niemi 2015-12-04)
settings.lemgramService = "FIN-CLARIN";

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

// Use an absolute URL for the CGI scripts to drop the port number
// when testing with Grunt serve, which uses localhost:9000.
settings.cgi_prefix =
    window.location.protocol + "//" + window.location.hostname +
    (isProductionServerBeta
     ? "/cgi-bin/korp-beta/"
     : (isProductionServerOld ?
	"/cgi-bin/korp-old/"
	: (isProductionServer ? "/cgi-bin/" : "/cgi-bin/korp/")));
settings.cgi_script = settings.cgi_prefix + "korp.cgi";
settings.lemgrams_cgi_script = settings.cgi_prefix + "korp_lemgrams.cgi";
settings.download_cgi_script = settings.cgi_prefix + "korp_download.cgi";

// The main Korp and Korp Labs URL for the links in the cog menu
settings.korp_url = {
    "main" : (isProductionServer ? "/" : "/korp/"),
    "lab" : (isProductionServer ? "/lab/" : "/korplab/")
};

settings.urnResolver = "http://urn.fi/";

// Set advanced_search_within to false to disable the within selection
// in the advanced search. If the value is undefined, assume true.
// (Jyrki Niemi 2015-09-24)
settings.advanced_search_within = true;

settings.languages = ["fi", "sv", "en"];
settings.defaultLanguage = "fi";

// If a localization key does not have a translation in some language,
// use the translation in the first language in
// settings.defaultTranslations that has a translation, or the
// localization key itself if the language is "KEY" (makes sense only
// as the last element of the list, since the key is always present).
// (Jyrki Niemi 2016-04-28)
settings.defaultTranslations = ["en", "KEY"];

// Locales corresponding to languages (Jyrki Niemi 2016-02-16)
settings.locales = {
    "sv" : "sv-SE",
    "en" : "gb-EN",
    "fi" : "fi-FI",
};

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
    + ((isProductionServerBeta || isLab) ? "beta" : "") + "news.json";

// authenticationType: "basic", "shibboleth" or "none"
settings.authenticationType = (isProductionServer ? "shibboleth" : "basic");
// Login and logout URLs to use with Shibboleth authentication if
// authenticationType == "shibboleth"
// for eduGAIN / CSC Account:
// settings.shibbolethLoginUrl = baseURL + "shibboleth-ds/index.html";
settings.shibbolethLoginUrl = function (href) {
    return ("/shibboleth-ds/index.html?"
            + encodeURIComponent((href || window.location.href)
				 + "&shib_logged_in"));
};
// settings.shibbolethLogoutUrl =
//     "https://korp.csc.fi/Shibboleth.sso/Logout?return=" + encodeURI(baseURL);
settings.shibbolethLogoutUrl = function (href) {
    return ("/Shibboleth.sso/Logout?return="
            + encodeURIComponent(href || window.location.href));
}

// Return a direct URL to the application of a corpus in Language Bank
// Rights based on lbr_id (an URN, either complete or without the
// common prefix "urn:nbn:fi:lb-"). if lbr_id is falsey, return the
// URL of the LBR main page.
settings.make_direct_LBR_URL = function (lbr_id) {
    console.log ("make_direct_LBR_URL", lbr_id);
    if (lbr_id) {
	return ("https://lbr.csc.fi/web/guest/catalogue?domain=LBR&resource="
		+ (lbr_id.slice(0, 3) != "urn" ? "urn:nbn:fi:lb-" : "")
		+ lbr_id
		+ "&target=application");
    } else {
	return "https://lbr.csc.fi";
    }
};


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


// The positional attribute in which to find place names, typically
// word or lemma
settings.placenameAttr = "lemma";
// Additional CQP attribute constraints for place names:
// different annotations for a proper name in different corpora
settings.placenameConstraint =
    "pos='PM' | msd='.*(SUBCAT_)?(Prop|PROP).*' | pos='n:prop'";

// Initial map centre: latitude, longitude and zoom level
settings.mapCenter = {
    // A geographical centre of Finland
    lat : 64.180708,
    lng : 25.803222,
    zoom : 4
};


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

/*
// Not applicable to Kielipankki's Korp
if(isLab) {
    settings.modeConfig.splice(1, 0,
        {
            localekey: "swedish_texts",
            mode: "swedish"
        }
    );
}
*/

// Namespace for functions used in configuring corpora
settings.fn = {};
// Namespace for corpus configuration templates
settings.templ = {};
// Namespace for extra corpus info used in multiple corpora
settings.corpusinfo = {};

var karpLemgramLink = "http://spraakbanken.gu.se/karp/#?search=extended||and|lemgram|equals|<%= val.replace(/:\\d+/, '') %>";

settings.primaryColor = "rgb(221, 233, 255)";
settings.primaryLight = "rgb(242, 247, 255)";
settings.secondaryColor = "";
settings.corpora = {};

settings.defaultOverviewContext = "1 sentence"
settings.defaultReadingContext = "1 paragraph"

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
settings.spcWithin = {
    "sentence" : "sentence",
    "paragraph" : "paragraph",
    "clause" : "clause",
};
settings.scWithin = {
    "sentence" : "sentence",
    "clause" : "clause",
};
settings.sentLinkContext = {
    "1 sentence" : "1 sentence",
    "1 link" : "1 link"
};
settings.sentLinkWithin = {
    "sentence" : "sentence",
    "link" : "link"
};

// Corpus id alias mapping: aliases as property keys and actual corpus
// ids as values. (Jyrki Niemi 2015-04-23)
settings.corpus_aliases = {};

// Functions to configure "short URLs": if the function
// settings.short_url_config[shorturl] exists, it is executed whenever
// the last part of the URL path name component is shorturl. The
// functions typically set preselected corpora and perhaps the mode,
// but they may also disable corpora and modes. Note that if you
// disable some corpora, currently the time graph in the corpus
// selector is still shown as if all the corpora were enabled. (Jyrki
// Niemi 2016-05-09)
settings.short_url_config = {};

// Default attribute display order in the sidebar. The missing
// attributes are shown after the specified ones in the order
// JavaScript iterates over the attribute properties. The
// specifications may also be regular expressions: the matching
// attributes are shown in the JavaScript property iteration order.
// The defaults can be overridden in the property
// sidebar_display_order of corpus settings. (Jyrki Niemi 2015-08-27)
settings.default_sidebar_display_order = {
    attributes : [
	"lemma",
	"lemmacomp",
	"pos",
	"posset",
	"lex",
	"saldo",
	"variants",
	"msd",
	"deprel",
    ],
    struct_attributes : [
	/^text_/,
	/^chapter_/,
	/^speech_/,
	/^paragraph_/,
	/^sentence_/,
	/^clause_/,
    ]
};

// The properties in settings.corpus_features.FEAT are added to corpus
// configurations (with recursive $.extend) whose property "features"
// (an array) contains "FEAT". (Jyrki Niemi 2016-10-18)
settings.corpus_features = {};

settings.corpus_features.paragraphs = {
    within : settings.spWithin,
    context : settings.spContext,
};



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

var attrlist = {};   // List of positional attributes
var sattrlist = {};  // List of structural attributes


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
        "EnamexOrgClt" : "EnamexOrgClt",
        "EnamexPrsHum/" : "EnamexPrsHum",
        "TimexTmeDat/" : "TimexTmeDat",
        "NumexMsrCur/" : "NumexMsrCur",
        "NumexMsrXxx/" : "NumexMsrXxx",
        "EnamexOrgCrp/" : "EnamexOrgCrp",
        "EnamexLocXxx/" : "EnamexLocXxx",
        "EnamexLocGpl/" : "EnamexLocGpl",
        "EnamexLocPpl/" : "EnamexLocPpl",
        "EnamexPrsTit/" : "EnamexPrsTit",
        "EnamexOrgTvr/" : "EnamexOrgTvr",
        "EnamexOrgPlt/" : "EnamexOrgPlt",
        "EnamexLocStr/" : "EnamexLocStr",
        "EnamexOrgAth/" : "EnamexOrgAth",
        "EnamexOrgEdu/" : "EnamexOrgEdu",
        "EnamexOrgClt/" : "EnamexOrgClt"
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

attrs.pos_uta_ru = {
    label : "pos",
    displayType : "select",
    translationKey : "pos_",
    opts : settings.liteOptions,
    dataset : {
	"-" : "Punct",
	"," : "Punct",
	":" : "Punct",
	"'" : "Punct",
	"\"" : "Punct",
	"A" : "A",
	"C" : "C",
	"I" : "Interj",
	"M" : "Num",
	"N" : "N",
	"P" : "Pron",
	"Q" : "Particle",
	"R" : "Adv",
	"S" : "Prep",
	"V" : "V",
    },
};

attrs.pos_ud_fi = {
    label : "pos",
    displayType : "select",
    translationKey : "pos_",
    opts : settings.liteOptions,
    dataset : {
	"ADJ" : "A",
	"ADP" : "Adp",
	"ADV" : "Adv",
	"AUX" : "Aux",
	"CONJ" : "C",
	"INTJ" : "Interj",
	"NOUN" : "N",
	"NUM" : "Num",
	"PRON" : "Pron",
	"PROPN" : "Prop",
	"PUNCT" : "Punct",
	"SCONJ" : "CS",
	"SYM" : "Symb",
	"VERB" : "V",
	"X" : "Other",
    },
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

// TextMorfo parts of speech, used in FTC
attrs.pos_textmorfo = {
    label : "pos",
    displayType : "select",
    opts : settings.liteOptions,
    translationKey : "pos_",
    dataset : {
	"-|null" : "Unknown",
	"Abbrev" : "Abbr",
	"Adjective" : "Adj",
	"Adjective-Noun|Adjective-No" : "AdjNoun",
	"Adverb" : "Adv",
	"Code" : "Code",
	"CompPart" : "CompPart",
	"Conjunction" : "Conj",
	"Delimiter" : "Punct",
	"Interjection" : "Interj",
	"Noun" : "Noun",
	"Noun-Noun" : "NounNoun",
	"Numeral" : "Num",
	"Preposition" : "Prep",
	"Pronoun" : "Pron",
	"Proper" : "Prop",
	"Verb" : "Verb",
    },
};

// SWECG parts of speech, used in FSTC and Svenska Parole
attrs.pos_swecg = {
    label : "pos",
    displayType : "select",
    opts : settings.liteOptions,
    localize : false,
    dataset : [
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
    // translationKey : "pos_",
    // // Some of the following values migt be errors
    // dataset : {
    // 	"A" : "Adj",
    // 	"ABBR" : "Abbr",
    // 	"ADV" : "Adv",
    // 	"ADV/PREP" : "Adv/Prep",
    // 	"A/N" : "Adj/Noun",
    // 	"CC" : "CC",
    // 	"CLB" : "CLB",
    // 	"DEF" : "DEF",
    // 	"DER/-het" : "DER/-het",
    // 	"DER/-nde" : "DER/-nde",
    // 	"DET" : "DET",
    // 	"GEN" : "GEN",
    // 	"INDEF" : "INDEF",
    // 	"INFMARK" : "INFMARK",
    // 	"INTERJ" : "INTERJ",
    // 	"N" : "N",
    // 	"NOM" : "NOM",
    // 	"NUM" : "NUM",
    // 	"PRB" : "PRB",
    // 	"PREP" : "PREP",
    // 	"PREPADV" : "PREP/ADV",
    // 	"PRON" : "PRON",
    // 	"SC" : "CS",
    // 	"UTRNEU" : "UTRNEU",
    // 	"V" : "V",
    // 	"null" : "Unknown",
    // },
};

attrs.msd = {
    label : "msd",
    opts : settings.defaultOptions,
    // Empty taginfo_url disables the info link to MSD tags in the
    // used sidebar; another value would link to the given URL; and an
    // undefined value would link to the default markup/msd.html.
    taginfo_url : "",
    // Add a zero-width space character after each vertical bar to
    // allow breaking the line there in the sidebar.
    transform : function(val) {
	return val.replace(/\|/g, "|\u200b");
    }
};
attrs.msd_sv = {
    label : "msd",
    opts : settings.defaultOptions,
    extended_template : '<input class="arg_value" ng-model="model" escaper>' +
    '<span ng-click="onIconClick()" class="fa fa-info-circle"></span>',
    controller : function($scope, $modal) {
        var modal = null;

        $scope.onIconClick = function() {
            modal = $modal.open({
                template : '<div>' +
                                '<div class="modal-header">' +
                                    '<h3 class="modal-title">{{\'msd_long\' | loc:lang}}</h3>' +
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
    opts : settings.setOptions,
    extended_template : "<input ng-model='model' >"
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
    extended_template : "<autoc model='model' placeholder='placeholder' type='lemgram'/>",
};
attrs.lemgram_hidden = {
    label : "lemgram",
    type : "set",    // Seems to work only if this is "set" even if "hidden"
    displayType : "hidden",
    // opts : settings.liteOptions
};
attrs.dalinlemgram = {
    label : "dalin-lemgram",
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
    extended_template : "<autoc model='model' placeholder='placeholder' type='lemgram' variant='dalin'/>",
};

attrs.saldo = {
    label : "saldo",
    type : "set",
    displayType : "autocomplete",
    opts : settings.setOptions,
    stringify : function(saldo) {
        return util.saldoToString(saldo, true);
    },
    externalSearch : "http://spraakbanken.gu.se/karp/#?search=extended||and|sense|equals|<%= val %>",
    internalSearch : true,
    extended_template : "<autoc model='model' placeholder='placeholder' type='sense'/>",
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
        "VG" : "VG",
        "ROOT" : "ROOT"
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
attrs.deprel_ud_fi = {
    label : "deprel",
    displayType : "select",
    translationKey : "deprel_",
    opts : settings.liteOptions,
    dataset : {
	"_" : "_",
	"acl" : "acl",
	"acl:relcl" : "rcmod",
	"advcl" : "advcl",
	"advmod" : "advmod",
	"amod" : "amod",
	"appos" : "appos",
	"aux" : "aux",
	"auxpass" : "auxpass",
	"case" : "adpos",
	"cc" : "cc",
	"ccomp" : "ccomp",
	"cc:preconj" : "preconj",
	"compound" : "compound",
	"compound:nn" : "nn",
	"compound:prt" : "prt",
	"conj" : "conj",
	"cop" : "cop",
	"csubj" : "csubj",
	"csubj:cop" : "csubj-cop",
	"dep" : "dep",
	"det" : "det",
	"discourse" : "discourse",
	"dobj" : "dobj",
	"goeswith" : "goeswith",
	"mark" : "mark",
	"mwe" : "mwe",
	"name" : "name",
	"neg" : "neg",
	"nmod" : "nommod",
	"nmod:gobj" : "gobj",
	"nmod:gsubj" : "gsubj",
	"nmod:own" : "nommod-own",
	"nmod:poss" : "poss",
	"nsubj" : "nsubj",
	"nsubj:cop" : "nsubj-cop",
	"nummod" : "num",
	"parataxis" : "parataxis",
	"punct" : "punct",
	"remnant" : "remnant",
	"rel" : "rel",
	"root" : "ROOT",
	"vocative" : "voc",
	"xcomp" : "xcomp",
	"xcomp:ds" : "xcomp:ds",
    }
};
attrs.deprel_uta_ru = {
    label : "deprel",
    displayType : "select",
    localize : false,
    opts : settings.liteOptions,
    dataset : [
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
    extended_template : "<autoc model='model' placeholder='placeholder' type='lemgram' variant='affix'/>"
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
    extended_template : "<autoc model='model' placeholder='placeholder' type='lemgram' variant='affix'/>"
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
    type : "set",
    opts : settings.setOptions
};
attrs.ambiguous_pos = {
    label : "ambiguous_pos",
    type : "set",
    opts : settings.setOptions
};
attrs.ambiguous_msd = {
    label : "ambiguous_msd",
    type : "set",
    opts : settings.setOptions
};

var mulcold_pos_langs = ["fi", "ru", "en", "sv"];
for (var i = 0; i < mulcold_pos_langs.length; i++) {
    var lang = mulcold_pos_langs[i];
    attrs["ambiguous_pos_mulcold_" + lang] = $.extend(
	true, {}, attrs["pos_mulcold_" + lang], attrs.ambiguous_pos);
}
delete mulcold_pos_langs;

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

attrs.ne_ex = {
    label: "ne_expr",
    translationKey : "ne_expr_",
    extended_template : selectType.extended_template,
    controller : selectType.controller,
    isStructAttr : true,
    dataset: [
       "ENAMEX",
       "TIMEX",
       "NUMEX",
   ]
};
attrs.ne_type = {
    label: "ne_type",
    translationKey : "ne_type_",
    extended_template : selectType.extended_template,
    controller : selectType.controller,
    isStructAttr : true,
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
    translationKey : "ne_subtype_",
    extended_template : selectType.extended_template,
    controller : selectType.controller,
    isStructAttr : true,
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
   stringify : function(val) {
       return util.getLocaleString("ne_subtype_" + val);
   }
};

// Name attributes for corpora tagged with (Fi)NER.
//
// The attributes ne_* are intra-sentence structural attributes that
// are shown in Korp as token attributes, shown only for the tokens
// within an ne structure (isStructAttr : true). This approach is
// borrowed from Språkbanken but with a couple of additional
// attributes.

// FiNER name types
attrs.ne_type_fi = {
    label : "ne_type",
    displayType : "select",
    translationKey : "ne_type_",
    isStructAttr : true,
    dataset : [
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
    label : "ne_subtype",
    displayType : "select",
    translationKey : "ne_subtype_",
    isStructAttr : true,
    dataset : [
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
    label : "ne_fulltype",
    displayType : "select",
    translationKey : "namecat_",
    isStructAttr : true,
    dataset : [
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
    label : "ne_name",
    isStructAttr : true,
};
// If the name is a place name, it is repeated here. This attribute
// can represent place name information obtained from NER, POS tags or
// metadata, as indicated by ne_placename_source below.
attrs.ne_placename = {
    label : "ne_placename",
    isStructAttr : true,
};
// The source of the place name information.
attrs.ne_placename_source = {
    label : "ne_placename_source",
    displayType : "select",
    translationKey : "placename_source_",
    dataset : [
	"ner",
	"pos",
	"meta",
    ],
    isStructAttr : true,
};
// The raw (Fi)NER tag as a positional attriute
attrs.ner_rawtag = {
    label : "ner_tag_raw",
    displayType : "hidden",
};
// The B-I-O status of token as a positional attribute: Beginning a
// name, Inside a name and Outside a name
attrs.ner_bio = {
    label : "ner_bio",
    displayType : "select",
    translationKey : "ner_bio_",
    dataset : [
	"B",
	"I",
	"O",
    ],
};

// Common name attributes for (Fi)NER-tagged corpora

attrlist.standard = {
    lemma : attrs.baseform,
    pos : attrs.pos_klk,
    msd : attrs.msd,
    dephead : attrs.dephead,
    deprel : attrs.deprel_tdt,
    ref : attrs.ref,
    nertag : attrs.ner_tags
};

attrlist.finer = {
    ne_name : attrs.ne_name,
    ne_ex : attrs.ne_ex,
    ne_type : attrs.ne_type_fi,
    ne_subtype : attrs.ne_subtype_fi,
    ne_fulltype : attrs.ne_fulltype_fi,
    ne_placename : attrs.ne_placename,
    ne_placename_source : attrs.ne_placename_source,
    nertag : attrs.ner_rawtag,
    nerbio : attrs.ner_bio,
};

settings.corpus_features.finer = {
    attributes : attrlist.finer,
};

// An attribute not to be shown in Korp but included for documentation
// purposes.
attrs.hidden = {
    displayType : "hidden",
};
sattrs.hidden = attrs.hidden;

sattrs.date = {
    label : "date",
    displayType : "date"
};

sattrs.text_title = {
    label : "title"
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

sattrs.sentence_type = {
    label : "sentence_type",
    displayType : "select",
    translationKey : "klassikot_",
    dataset : {
	"text" : "text",
	"head" : "head",
	"stanza" : "stanza",
	"speaker" : "speaker",
	"stage" : "stage"
    }
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

// Text genre values specifically for Mikhail Mikhailov's (UTA)
// corpora (MULCOLD, FiRuLex, ParFin, ParRus)
sattrs.mikhailov_text_genre = {
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
    label : "author"
};

sattrs.article_author = {
    label : "article_author"
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

sattrs.text_publ_place = {
    label : "publication_place"
};

sattrs.filename = {
    label : "file_name"
};

sattrs.year = {
    label : "year"
};

sattrs.month = {
    label : "month"
};

sattrs.day_of_month = {
    label : "day"
};

/* KFSCP --- */

sattrs.text_pubdate = {
    label : "publication_date"
};

sattrs.text_publisher = {
    label : "publisher"
};

/* LEHDET */

sattrs.link_lehdet = {
    label : "link_to_original",
    type : "url",
    url_opts : sattrs.link_url_opts
};

/* ORACC */

sattrlist.oracc = {
    text_provenance : {
        label : "oracc_provenance",
    },
    text_period : {
        label : "oracc_period",
    },
    text_genre : {
        label : "oracc_genre"
    },
    text_url : {
        url_opts : sattrs.link_url_opts,
        label : "oracc_url",
        type : "url"
    },
    sentence_line : {
        label : "oracc_line",
    },
    sentence_translation : {
        label : "oracc_sent_translation"
    }
};

/* ORACC */
attrlist.oracc = {
    lemma : attrs.baseform,
    ltrans :  {
	label : "oracc_lemmatrans"
    },
    transcription : {
	label : "oracc_transcription"
    },
    pos : {
	label : "pos",
	displayType : "select",
	translationKey : "oracc_pos_",
	dataset : {},
	opts : settings.liteOptions
    },
    sense : {
	label : "oracc_sense"
	},
    sensepos : {
        label : "oracc_sensepos",
        displayType : "select",
        translationKey : "oracc_pos_",
        dataset : {},
        opts : settings.liteOptions
    },
    cuneiform : {
        label : "oracc_cuneiform"
    },
    ref : {
        label : "oracc_ref"
    },
    lang : {
        label : "oracc_lang",
        displayType : "select",
        translationKey : "oracc_lang_",
        dataset : {},
        opts : settings.liteOptions
    }
};

/* E-thesis */

sattrlist.ethesis = {
    text_title : {
        label : "text_title"
    },
    text_date : {
        label : "text_date"
    },
    text_keywords : {
        label : "text_keywords"
    },
    text_faculty : {
        label : "text_faculty"
    },
    text_subject : {
        label : "text_subject"
    },
    text_type : {
        label : "text_dissertationtype"
    },
    /*
    text_lang : {
        label : "text_lang",
        displayType : "select",
        translationKey : "ftb3_europarl_language_",
        dataset : {
            "fi" : "fi",
            "sv" : "sv",
            "es" : "es",
            "en" : "en",
            "ru" : "ru"
        },
        opts : settings.liteOptions
    },
    */
    text_url : {
        label : "text_abslink",
        type : "url",
        url_opts : sattrs.link_url_opts
    }
};




/* VNSK */

sattrlist.vnsk = {
    text_title : sattrs.text_title,
    text_distributor : sattrs.text_distributor,
    text_source : sattrs.text_source,
    paragraph_id : sattrs.paragraph_id,
    paragraph_type : sattrs.paragraph_type,
    sentence_id : sattrs.sentence_id_hidden,
    sentence_n : sattrs.sentence_n
};

/* FINSTUD */

sattrlist.finstud = {
    sentence_id : sattrs.sentence_id_hidden,
    text_textnumber : {
        label : "studentsvenska_textnumber"
    },
    text_gradeexam : {
        label : "studentsvenska_gradeexam"
    },
    text_subject : {
        label : "studentsvenska_subject"
    }
};

attrlist.finstud = {
    code : {
        label : "studentsvenska_code",
        opts : settings.defaultOptions
    },
    properties : {
        label : "studentsvenska_properties",
        opts : settings.defaultOptions
    }
};


/* BESERCORP */
attrlist.besercorp = {
    msd : attrs.msd,
    gloss : {
        label : "gloss_ru"
    },
    lex : {
        label : "lex"
    }
};

/* STUDENTSVENSKA */

attrlist.studentsvenska = {
    lemma : attrs.baseform,
    code : {
        label : "studentsvenska_code",
        opts : settings.defaultOptions
    },
    properties : {
        label : "studentsvenska_properties",
        opts : settings.defaultOptions
    }


};

sattrlist.studentsvenska = {
    sentence_id : sattrs.sentence_id_hidden,
    text_textnumber : {
        label : "studentsvenska_textnumber"
    },
    text_gradeteacher : {
        label : "studentsvenska_gradeteacher"
    },
    text_gradeexam : {
        label : "studentsvenska_gradeexam"
    },
    text_gradeword : {
        label : "studentsvenska_gradeword"
    },
    text_schoolnumber : {
        label : "studentsvenska_schoolnumber"
    },
    text_errorother : {
        label : "studentsvenska_errorother"
    },
    text_gender : {
        label : "studentsvenska_gender"
    },
    text_gradegrammar : {
        label : "studentsvenska_gradegrammar"
    },
    text_errorwordorder : {
        label : "studentsvenska_errorwordorder"
    },
    text_subject : {
        label : "studentsvenska_subject"
    }
};



// Common positional attributes for corpora parsed with the Turku
// Dependency Treebank parser (with lemgrams and lemmas without
// compound boundaries added)
attrlist.parsed_tdt = {
    lemma : attrs.baseform,
    lemmacomp : attrs.baseform_compound,
    pos : attrs.pos_klk,
    msd : attrs.msd,
    dephead : attrs.dephead,
    deprel : attrs.deprel_tdt,
    ref : attrs.ref,
    lex : attrs.lemgram_hidden,
};

settings.corpus_features.parsed_tdt = {
    attributes : attrlist.parsed_tdt,
};

// Corpora parsed with TDT and run through FiNER
attrlist.parsed_tdt_ner =
    $.extend({}, attrlist.parsed_tdt, {
	nertag : attrs.ner_tags
    });

/* --------- */



/*
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

*/

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


// Recurring corpus licence information (name + URL)
settings.licenceinfo = {
    CC0 : {
	name : "CC ZERO (CC0) (CLARIN PUB)",
	description : "Public Domain Dedication",
	url : "http://creativecommons.org/publicdomain/zero/1.0/",
    },
    CC_BY : {
	name : "CC BY (CLARIN PUB)",
	description : "Creative Commons Attribution",
	url : "https://creativecommons.org/licenses/by/4.0/",
    },
    CC_BY_30 : {
	name : "CC BY 3.0 (CLARIN PUB)",
	description : "Creative Commons Attribution 3.0",
	url : "https://creativecommons.org/licenses/by/3.0/",
    },
    CC_BY_40 : {
	name : "CC BY 4.0 (CLARIN PUB)",
	description : "Creative Commons Attribution",
	url : "https://creativecommons.org/licenses/by/4.0/",
    },
    CC_BY_NC : {
	name : "CC BY-NC (CLARIN PUB)",
	description : "Creative Commons Attribution-NonCommercial",
	url : "https://creativecommons.org/licenses/by-nc/4.0/",
    },
    CC_BY_ND : {
	name : "CC BY-ND (CLARIN PUB)",
	description : "Creative Commons Attribution-NoDerivatives",
	url : "https://creativecommons.org/licenses/by-nd/4.0/",
    },
    CC_BY_ND_40 : {
	name : "CC BY-ND 4.0 (CLARIN PUB)",
	description : "Creative Commons Attribution-NoDerivatives 4.0",
	url : "https://creativecommons.org/licenses/by-nd/4.0/",
    },
    EUPL_11 : {
	name : "EUPL v1.1 (CLARIN PUB)",
	description : "European Union Public Licence, version 1.1",
	url : "http://ec.europa.eu/idabc/en/document/7774.html",
	// An alternative URL:
	// url : "https://joinup.ec.europa.eu/community/eupl/og_page/european-union-public-licence-eupl-v11",
    },
    ParFinRus_2016_fi : {
	name : "CLARIN RES +NC +INF +ND 1.0",
	urn : "urn:nbn:fi:lb-2017020611",
    },
    ParFinRus_2016_en : {
	name : "CLARIN RES +NC +INF +ND 1.0",
	urn : "urn:nbn:fi:lb-2017020612",
    },
};


// Homepage in Kotus's Kaino service
settings.fn.kaino_homepage = function(urlbase) {
    return {
        name : "Kokoelman etusivu",
        url : "http://kaino.kotus.fi/korpus/" + urlbase + "_coll_rdf.xml",
        no_label : true
    };
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

settings.corporafolders.ceal = {
    title : "CEAL",
    contents : ["ceal_o", "ceal_s"]
};

settings.corporafolders.ethesis = {
    title : "E-thesis",
    contents : ["ethesis_maabs", "ethesis_dissabs"]
};

settings.corporafolders.ethesis.matheses = {
    title : "Pro gradu -tutkielmat",
    contents : ["ethesis_ma_ai", "ethesis_ma_bio", "ethesis_ma_el", "ethesis_ma_far", "ethesis_ma_hum", "ethesis_ma_beh",
		"ethesis_ma_med", "ethesis_ma_mm", "ethesis_ma_sci", "ethesis_ma_ot", "ethesis_ma_teo", "ethesis_ma_valt"]
};

settings.corporafolders.ethesis.phdtheses = {
    title : "Väitöskirjat",
    contents : ["ethesis_phd_bio", "ethesis_phd_el", "ethesis_phd_far", "ethesis_phd_hum", "ethesis_phd_beh",
		"ethesis_phd_med", "ethesis_phd_mm", "ethesis_phd_ot", "ethesis_phd_teo", "ethesis_phd_valt"]
};

settings.corporafolders.ftb = {
    title : "FinnTreeBank: suomen puupankki",
    contents : ["ftb2"]
};

settings.corporafolders.ftb.ftb3 = {
    title : "FinnTreeBank 3",
    info : {
	urn : "urn:nbn:fi:lb-201406021",
	metadata_urn : "urn:nbn:fi:lb-201406022",
	licence : settings.licenceinfo.CC_BY_30,
    },
    contents : ["ftb3_europarl", "ftb3_jrcacquis"]
};

settings.corporafolders.klk_fi = {
    title : "Kansalliskirjaston lehtikokoelman (KLK) suomenkieliset lehdet",
    description : "Kansalliskirjaston sanoma- ja aikakauslehtikokoelma, Kielipankki-versio, suomenkieliset lehdet",
    info : {
	urn : "urn:nbn:fi:lb-201405275",
	metadata_urn : "urn:nbn:fi:lb-201405276",
	licence : settings.licenceinfo.CC_BY,
    }
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
    contents : ["gutenberg", "sks_kivi_fi", "skvr",
		"parfin_2016_fi", "parrus_2016_fi",
		"parfin_fi", "parrus_fi"]
};

settings.corporafolders.literature.skk = {
    title: "Suomalaisen kirjallisuuden klassikoita",
    contents : ["skk_aho","skk_canth","skk_finne","skk_jarnefelt","skk_kailas","skk_lassila","skk_linnankoski","skk_kramsu","skk_lehtonen","skk_leino","skk_pakkala","skk_siljo","skk_sodergran","skk_wilkuna"],
    info : {
	urn : "urn:nbn:fi:lb-2015022401",
	metadata_urn : "urn:nbn:fi:lb-20140730186",
	licence : settings.licenceinfo.EUPL_11,
	homepage : settings.fn.kaino_homepage("klassikot/meta/klassikot")
    }
};

/*,"skk_canth","skk_finne","skk_jarnefelt","skk_kailas","skk_lassila","skk_linnankoski","skk_kramsu","skk_lehtonen","skk_\
leino","skk_pakkala","skk_siljo","skk_sodergran","skk_wilkuna"]
*/

settings.corporafolders.literature.ceal = {
    title : "CEAL",
    contents : ["ceal_o", "ceal_s"]
};

settings.corporafolders.legal = {
    title : "Juridisia tekstejä",
    contents : ["kotus_lakidir", "legal_fi", "mulcold_fi"]
};

settings.corporafolders.internet = {
    title : "Internet-keskusteluaineistoja",
    contents : ["s24", "ylilauta", "hsfi"]
};

settings.corporafolders.internet.suomi24 = {
    title : "Suomi24",
    description : "<a href='http://keskustelu.suomi24.fi' target='_blank'>Suomi24-keskustelupalvelun</a> keskustelut 1.1.2001–24.9.2016.<br/>Aineistossa näkyy kaikkien keskustelujen sisältö enintään kappaletasolla.<br/>Aineisto on jaettu useaan osakorpukseen suuren kokonsa vuoksi.<br/>Tutkijat voivat myös ladata käyttöönsä <a href='http://urn.fi/urn:nbn:fi:lb-201412171' target='_blank' title='Kuvailutiedot'>koko Suomi24-aineiston</a> Kielipankin <a href='http://urn.fi/urn:nbn:fi:lb-2015040801' target='_blank'>latauspalvelusta</a> (<a href='http://urn.fi/urn:nbn:fi:lb-20150304151' target='_blank'>lisenssi</a>).",
    contents : [
	"s24_001",
	"s24_002",
	"s24_003",
	"s24_004",
	"s24_005",
	"s24_006",
	"s24_007",
	"s24_008",
	"s24_009",
	"s24_010"
    ],
    info : {
	urn : "urn:nbn:fi:lb-2015040102",
	metadata_urn : "urn:nbn:fi:lb-2015091701",
	licence : settings.licenceinfo.CC_BY_NC,
	homepage_url : "http://keskustelu.suomi24.fi",
    }
};

settings.corporafolders.lehdet = {
    title : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä",
    info : {
	urn : "urn:nbn:fi:lb-2016021202",
	metadata_urn : "urn:nbn:fi:lb-2016011101",
	licence : settings.licenceinfo.CC_BY_40,
    }
};

settings.corporafolders.lehdet.tiedelehdet = {
    title : "Tiedelehtiä",
    description : "1990- ja 2000-luvun suomalaisia tiedelehtiä",
    contents : [
	"tiedelehdet_30paivaa",
	"tiedelehdet_aakusti",
	"tiedelehdet_agricola",
	"tiedelehdet_aidinkieli",
	"tiedelehdet_aikuiskasvatus",
	"tiedelehdet_aluejaymparisto",
	"tiedelehdet_areiopagi",
	"tiedelehdet_ats",
	"tiedelehdet_auraica",
	"tiedelehdet_automaatiovayla",
	"tiedelehdet_avain",
	"tiedelehdet_baptria",
	"tiedelehdet_bryobrotherella",
	"tiedelehdet_diakonia",
	"tiedelehdet_elo",
	"tiedelehdet_ennenjanyt",
	"tiedelehdet_geofoorumi",
	"tiedelehdet_geologi",
	"tiedelehdet_glossae",
	"tiedelehdet_harukaze",
	"tiedelehdet_havina",
	"tiedelehdet_hykirjasto",
	"tiedelehdet_hiidenkivi",
	"tiedelehdet_historiallinen",
	"tiedelehdet_historianystava",
	"tiedelehdet_idantutkimus",
	"tiedelehdet_ilmansuojelu",
	"tiedelehdet_informaatio",
	"tiedelehdet_kasvu",
	"tiedelehdet_kieliskooppi",
	"tiedelehdet_kliinlab",
	"tiedelehdet_kognitiivinen",
	"tiedelehdet_kompositio",
	"tiedelehdet_kosmopolis",
	"tiedelehdet_kulttuurintutkimus",
	"tiedelehdet_kulutustutkimus",
	"tiedelehdet_kunnallistiede",
	"tiedelehdet_liiketalous",
	"tiedelehdet_liikenteensuunta",
	"tiedelehdet_liikuntajatiede",
	"tiedelehdet_lounaishame",
	"tiedelehdet_maaseudunuusiaika",
	"tiedelehdet_matkailututkimus",
	"tiedelehdet_mediajaviestinta",
	"tiedelehdet_metsatiede",
	"tiedelehdet_muinaistutkija",
	"tiedelehdet_musiikinsuunta",
	"tiedelehdet_musiikkikasv",
	"tiedelehdet_niinnain",
	"tiedelehdet_nimi",
	"tiedelehdet_nayttamo_tutkimus",
	"tiedelehdet_poliittinentalous",
	"tiedelehdet_prologi",
	"tiedelehdet_psykologia",
	"tiedelehdet_rakmek",
	"tiedelehdet_ravitsemus",
	"tiedelehdet_ruralia",
	"tiedelehdet_sananjalka",
	"tiedelehdet_siirtolaisuus",
	"tiedelehdet_skas",
	"tiedelehdet_skeptikko",
	"tiedelehdet_skholion",
	"tiedelehdet_sosiaalilaaketiede",
	"tiedelehdet_sosiologia",
	"tiedelehdet_suo",
	"tiedelehdet_susa",
	"tiedelehdet_sydanaani",
	"tiedelehdet_kirkkohistoria",
	"tiedelehdet_synnyt",
	"tiedelehdet_tahiti",
	"tiedelehdet_taimiuutiset",
	"tiedelehdet_teologinen",
	"tiedelehdet_terminfo",
	"tiedelehdet_terra",
	"tiedelehdet_thanatos",
	"tiedelehdet_tiedejaase",
	"tiedelehdet_tieteessatapahtuu",
	"tiedelehdet_tktlehti",
	"tiedelehdet_tietolinja",
	"tiedelehdet_toksikologi",
	"tiedelehdet_transmitteri",
	"tiedelehdet_trio",
	"tiedelehdet_tutkivasos",
	"tiedelehdet_tyoelama",
	"tiedelehdet_ura",
	"tiedelehdet_walbum",
	"tiedelehdet_vartija",
	"tiedelehdet_versus",
	"tiedelehdet_virittaja",
	"tiedelehdet_yhdyskuntasuunnittelu",
	"tiedelehdet_yhteiskuntapolitiikka",
	"tiedelehdet_ymparistohistoria",
    ]
};

settings.corporafolders.lehdet.muut_lehdet = {
    title : "Muita lehtiä",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä",
}

settings.corporafolders.lehdet.muut_lehdet.a = {
    title : "A",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (A-alkuiset)",
    contents : [
	"lehdet_aarre",
	"lehdet_aino",
	"lehdet_ajolinja",
	"lehdet_akavalainen",
	"lehdet_allergia",
	"lehdet_ammattisotilas",
	"lehdet_amnesty",
	"lehdet_ananda",
	"lehdet_animalia",
	"lehdet_antimilitaristi_sivari",
	"lehdet_apaja",
	"lehdet_aromi",
	"lehdet_aselehti",
	"lehdet_askel",
	"lehdet_asukas",
	"lehdet_asukki",
	"lehdet_asuminen_yhteiskunta",
	"lehdet_asuntoinfo",
	"lehdet_aurora",
	"lehdet_avainlehti",
	"lehdet_avec",
	"lehdet_avec_perhelehti",
  ]
};

settings.corporafolders.lehdet.muut_lehdet.cd = {
    title : "C, D",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (C- ja D-alkuiset)",
    contents : [
	"lehdet_cplehti",
	"lehdet_curly",
	"lehdet_debatti",
	"lehdet_diabetes_ja_laakari",
	"lehdet_diakonia",
    ]
}

settings.corporafolders.lehdet.muut_lehdet.e = {
    title : "E",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (E-alkuiset)",
    contents : [
	"lehdet_edimensio",
	"lehdet_effortti",
	"lehdet_ekonomi",
	"lehdet_elinehto",
	"lehdet_elamantahdet_terve",
	"lehdet_elamassa_kelansanomat",
	"lehdet_emma",
	"lehdet_entisesta_enemman",
	"lehdet_ernie",
	"lehdet_espanjan_sanomat",
	"lehdet_espoo",
	"lehdet_esri",
	"lehdet_ethnos",
	"lehdet_eurooppalainen",
	"lehdet_evento",
     ]
}

settings.corporafolders.lehdet.muut_lehdet.f = {
    title : "F",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (F-alkuiset)",
    contents : [
	"lehdet_focus",
	"lehdet_folium_classicum",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.h = {
    title : "H",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (H-alkuiset)",
    contents : [
	"lehdet_hkaksi",
	"lehdet_haavi",
	"lehdet_hallaus",
	"lehdet_helen",
	"lehdet_helmeri",
	"lehdet_helsinginhenki",
	"lehdet_helsinki_info",
	"lehdet_hengitys",
	"lehdet_heppu",
	"lehdet_hervannan_sanomat",
	"lehdet_hima",
	"lehdet_hopealeijona",
	"lehdet_huili",
	"lehdet_humanistilehti",
	"lehdet_hyva_asukas",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.ij = {
    title : "I, J",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (I- ja J-alkuiset)",
    contents : [
	"lehdet_impakti",
	"lehdet_infors",
	"lehdet_infront",
	"lehdet_jane_paulo",
	"lehdet_jargonia",
	"lehdet_joensuun_uutiset",
	"lehdet_julkaisija",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.k = {
    title : "K",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (K-alkuiset)",
    contents : [
	"lehdet_kalastuslehti",
	"lehdet_kalpa",
	"lehdet_kansanopisto",
	"lehdet_karhunkierros",
	"lehdet_karhunpalvelus",
	"lehdet_kauppapolitiikka",
	"lehdet_kaupunkilainen",
	"lehdet_kehittaja",
	"lehdet_kemia_kemi",
	"lehdet_kemilainen",
	"lehdet_kerberos",
	"lehdet_keski_espoon_sanomat",
	"lehdet_keva",
	"lehdet_kide",
	"lehdet_kiitotie",
	"lehdet_kirjo",
	"lehdet_kita",
	"lehdet_koiviston_viesti",
	"lehdet_kontakt",
	"lehdet_koor",
	"lehdet_koti",
	"lehdet_kotipuutarha",
	"lehdet_kotosalla",
	"lehdet_kuljetusyrittaja",
	"lehdet_kumina",
	"lehdet_kumposti",
	"lehdet_kunnallissuomi",
	"lehdet_kuuloset",
	"lehdet_kynnys",
	"lehdet_kyvyt_kayttoon_vates",
	"lehdet_kaytannon_maamies",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.l = {
    title : "L",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (L-alkuiset)",
    contents : [
	"lehdet_lapsenmaailma",
	"lehdet_legenda",
	"lehdet_leija",
	"lehdet_luokanopettaja",
	"lehdet_luuppisanomat",
	"lehdet_lahde_liikkeelle",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.m = {
    title : "M",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (M-alkuiset)",
    contents : [
	"lehdet_maailma_kiitotie",
	"lehdet_materia",
	"lehdet_matkailusilma",
	"lehdet_me",
	"lehdet_mercurius",
	"lehdet_meripelastus",
	"lehdet_merkonomi",
	"lehdet_minna",
	"lehdet_modin",
	"lehdet_motiva_mplus_xpress",
	"lehdet_musetti",
	"lehdet_muusikko",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.no = {
    title : "N, O",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (N- ja O-alkuiset)",
    contents : [
	"lehdet_nonsordino",
	"lehdet_nakyva_nainen",
	"lehdet_ollaviiskytviisplus",
	"lehdet_omakotisanomat",
	"lehdet_ostrobotnia",
	"lehdet_ota_opiksi",
	"lehdet_oulunkylainen",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.p = {
    title : "P",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (P-alkuiset)",
    contents : [
	"lehdet_pakolainen",
	"lehdet_paraisten_kuulutukset",
	"lehdet_patria",
	"lehdet_pelastusalan_ammattilainen",
	"lehdet_pelastustieto",
	"lehdet_perussuomalainen",
	"lehdet_pihlajamaki_info",
	"lehdet_pihlajisto_viikinmaki",
	"lehdet_pippuri",
	"lehdet_pirkkalainen",
	"lehdet_pirta",
	"lehdet_plari",
	"lehdet_pointti",
	"lehdet_poleemi",
	"lehdet_polemiikki",
	"lehdet_policy",
	"lehdet_poromies",
	"lehdet_print_media",
	"lehdet_pro_etelapohjanmaa",
	"lehdet_prointerior",
	"lehdet_promaint_kunnossapito",
	"lehdet_proresto",
	"lehdet_puutarha_sanomat",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.r = {
    title : "R",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (R-alkuiset)",
    contents : [
	"lehdet_rautatievirkamies",
	"lehdet_ruotuvaki",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.s = {
    title : "S",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (S-alkuiset)",
    contents : [
	"lehdet_saariselka",
	"lehdet_saima",
	"lehdet_secretarius",
	"lehdet_selkosanomat",
	"lehdet_skrolli",
	"lehdet_sofia",
	"lehdet_solidaarisuus",
	"lehdet_sosiaalivakuutus",
	"lehdet_sukuviesti",
	"lehdet_suomen_historiallinen",
	"lehdet_suomenmaa",
	"lehdet_suomi_puola",
	"lehdet_susikko",
	"lehdet_sydan_hameen_lehti",
	"lehdet_syopasaation_focus",
	"lehdet_sosso",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.t = {
    title : "T",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (T-alkuiset)",
    contents : [
	"lehdet_taku",
	"lehdet_taloustaito",
	"lehdet_tamk_nyt",
	"lehdet_tampere",
	"lehdet_tampereen_liikuntasanomat",
	"lehdet_tampu",
	"lehdet_tanhuviesti",
	"lehdet_tanssiurheilija",
	"lehdet_tatsi",
	"lehdet_tek_verkkolehti",
	"lehdet_terve_pirkanmaa",
	"lehdet_tervetuloa_jyvaskylaan",
	"lehdet_terveydeksi",
	"lehdet_tiedetoimittaja",
	"lehdet_tietoa_maasta",
	"lehdet_tietoarkisto",
	"lehdet_tiimi",
	"lehdet_toimi",
	"lehdet_toisinsanoen",
	"lehdet_toolilainen",
	"lehdet_tukilinja",
	"lehdet_tukiviesti",
	"lehdet_tuntosarvi",
	"lehdet_turkuposti",
	"lehdet_tutkain",
	"lehdet_tuulivoima_tuulienergia_tuulensilma",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.u = {
    title : "U",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (U-alkuiset)",
    contents : [
	"lehdet_ubik",
	"lehdet_uiotus",
	"lehdet_uljas",
	"lehdet_uniikki",
	"lehdet_unioni",
	"lehdet_universitas",
	"lehdet_utain",
	"lehdet_uusiouutiset",
	"lehdet_uusipaiva",
	"lehdet_uusi_safiiri",
	"lehdet_uutis_jousi",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.vw = {
    title : "V, W",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (V- ja W-alkuiset)",
    contents : [
	"lehdet_vaasan_ylioppilaslehti",
	"lehdet_valkoinen_kaapio",
	"lehdet_vammaisurheilu",
	"lehdet_vanhustyo",
	"lehdet_vankilavirkailija",
	"lehdet_vantaan_akseli",
	"lehdet_vantaan_asukaslehti",
	"lehdet_vapaa_ajattelija",
	"lehdet_vasama",
	"lehdet_koskinen",
	"lehdet_veturimies",
	"lehdet_via",
	"lehdet_via_helsinki",
	"lehdet_vilkku",
	"lehdet_virta",
	"lehdet_valitysuutiset",
	"lehdet_walpo",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.y = {
    title : "Y",
    description : "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (Y-alkuiset)",
    contents : [
	"lehdet_yhteenveto",
	"lehdet_yhys_tiedotuslehti",
	"lehdet_yliopistolainen",
	"lehdet_yrittajasanomat",
	"lehdet_yritysetiikka",
    ]
};

settings.corporafolders.ftc = {
    title : "Suomen kielen tekstikokoelma (SKTP/FTC)",
    description : "Suomen kielen tekstikokoelma: Lemmie-palvelussa olleet osakorpukset",
    info : {
	urn : "urn:nbn:fi:lb-2014052719",
	metadata_urn : "urn:nbn:fi:lb-2016050207",
	lbr_id : "urn:nbn:fi:lb-201403268",
	licence : {
	    name : "CLARIN RES +PLAN +NC +ND",
	    urn : "urn:nbn:fi:lb-20150304137",
	},
	homepage : {
	    name : "Aineiston kuvaus",
	    url : "https://kitwiki.csc.fi/twiki/bin/view/FinCLARIN/KielipankkiAineistotFtc",
	    no_label : true,
	}
    },
};

settings.corporafolders.other_texts = {
    title : "Muita tekstejä",
    contents : ["finstud", "kfspc_fi"]
};

settings.corporafolders.other_texts.kotus_ns_presidentti = {
    title : "Tasavallan presidenttien uudenvuodenpuheet",
    description : "Tasavallan presidenttien uudenvuodenpuheiden kokoelmassa on kaikki tasavallan presidenttien pitämät uudenvuodenpuheet vuosilta 1935–2007. Muutaman kerran puheen on pitänyt joku muu kuin presidentti. Nämäkin puheet sisältyvät aineistoon.<br/>Kokoelma on järjestetty presidenteittäin ja vuosittain. Kokoelma koostuu lehtileikkeistä, konekirjoitusliuskoista, kirjojen sivuista, lehdistötiedotteista ja verkkoteksteistä. Aineistoa on hankittu arkistoista, kirjoista ja Internetistä.",
    // Contents will be filled in when constructing the corpus
    // settings
    contents : [],
    info : {
	// URN information also in the corpus .info files; if you need
	// to update the URNs, you should also check them.
	urn : "urn:nbn:fi:lb-20151001",
    	metadata_urn : "urn:nbn:fi:lb-20140730150",
	licence : settings.licenceinfo.EUPL_11,
	homepage : settings.fn.kaino_homepage(
	    "teko/meta/presidentti/presidentti"),
    	compiler : {
    	    name : "Kotimaisten kielten keskus",
    	    url : "http://www.kotus.fi/",
    	    no_label : true
    	}
    }
}

settings.corporafolders.spoken = {
    title : "Puhuttua kieltä (tekstiksi litteroituna)",
    contents : ["kotus_sp", "skn", "dma", "arkisyn"],
    // unselected : true
};

settings.corporafolders.spoken.la_murre = {
    title : "Lauseopin arkiston murrekorpus",
    description : "Lauseopin arkiston murrekorpus edustaa kaikkia nykyisen Suomen alueella puhuttuja suomen kielen murteita sekä lisäksi niitä murteita, joita puhuttiin Neuvostoliitolle viime sotien yhteydessä luovutetuilla alueilla ennen alueiden luovuttamista. Puhujat ovat syntyneet vuosina 1860–1910 (suurin osa 1880-luvulla) ja haastattelut on tehty 1950–1970-luvuilla, jolloin puhujat ovat olleet keskimäärin 80-vuotiaita.<br/>Yhdestä pitäjänmurteesta on yleensä valittu käsiteltäväksi yksi noin tunnin laajuinen äänite. Murreaineisto on litteroitu sekä koodattu morfologisesti ja syntaktisesti. Tässä on saatavilla korpuksen versio, jossa litteraatit on karkeasti kohdistettu alkuperäisiin äänitteisiin.",
    // unselected : true,
    info : {
	urn : "urn:nbn:fi:lb-2014052715",
	metadata_urn : "urn:nbn:fi:lb-2014052716",
	licence : settings.licenceinfo.CC_BY_ND_40,
	homepage : {
	    name : "Aineiston tietosivu Kielipankissa",
	    url : "https://kitwiki.csc.fi/twiki/bin/view/FinCLARIN/KielipankkiAineistotLAmurre",
	    no_label : true
	}
    }
 };

settings.corporafolders.learner = {
    title : "Suomenoppijoiden kieltä (suomi toisena tai vieraana kielenä)",
    contents : ["iclfi", "topling_fi"],
    // unselected : true
};

settings.corporafolders.learner.las2 = {
    title : "LAS2 – Edistyneiden suomenoppijoiden korpus",
    info : {
        urn : "urn:nbn:fi:lb-201604120",
        metadata_urn : "urn:nbn:fi:lb-201407167",
        homepage_url : "http://www.utu.fi/fi/yksikot/hum/yksikot/suomi-sgr/tutkimus/tutkimushankkeet/las2/Sivut/home.aspx",
        licence : {
            name : "CLARIN RES +PLAN +NC +INF +LOC +ND",
            urn : "urn:nbn:fi:lb-2015041305",
        },
    },
    contents : ["las2_tentit", "las2_esseet"]
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
    info : {
	urn : "urn:nbn:fi:lb-201407166",
	metadata_urn : "urn:nbn:fi:lb-201407165",
	licence : settings.licenceinfo.EUPL_11,
	homepage : settings.fn.kaino_homepage("vks/meta/vks")
    },
    // unselected : true
};

settings.corporafolders.vns = {
    title : "Varhaisnykysuomen korpus",
    /*contents : ["vns_asetus", "vns_renqvist", "vns_renvall"],*/
    contents : ["vnsk_aejmelaeus","vnsk_ahlholm","vnsk_ahlman_kirjat","vnsk_ahlman_sanastot","vnsk_ahlqvist","vnsk_akiander","vnsk_aminoff","vnsk_almanakka","vnsk_anonyymi","vnsk_asetus","vnsk_aulen","vnsk_backvall","vnsk_bocker","vnsk_bonsdorff","vnsk_borenius","vnsk_borg","vnsk_cajan","vnsk_cannelin","vnsk_cantell","vnsk_canth","vnsk_corander","vnsk_costiander","vnsk_dahlberg","vnsk_edlund","vnsk_eklof","vnsk_euren","vnsk_europaeus","vnsk_europaeus_sanastot","vnsk_fabritius","vnsk_forsman","vnsk_forstrom","vnsk_friman","vnsk_frosterus","vnsk_gottlund","vnsk_granlund","vnsk_hannikainen","vnsk_hjelt","vnsk_hordh","vnsk_hornborg","vnsk_ignatius","vnsk_ingman","vnsk_innain","vnsk_juteini","vnsk_keckman","vnsk_kemell","vnsk_kilpinen","vnsk_kivi","vnsk_koskinen","vnsk_krohn","vnsk_lagervall","vnsk_lankela","vnsk_lavonius","vnsk_lilius_anton","vnsk_lilius_aukusti","vnsk_lonnrot","vnsk_malmberg","vnsk_mehilainen","vnsk_mela","vnsk_meurman","vnsk_mmy","vnsk_murman","vnsk_muut","vnsk_nyman","vnsk_ovs","vnsk_polen","vnsk_poppius","vnsk_puhuttelija","vnsk_rein","vns_renvall","vnsk_roos","vnsk_salmelainen","vnsk_salonius","vnsk_sanaluettelot","vnsk_sandberg","vnsk_schroter","vnsk_sirelius","vnsk_skogman","vnsk_smtr","vnsk_sohlberg","vnsk_soldan","vnsk_ssv","vnsk_stahlberg","vnsk_tarvanen","vnsk_ticklen","vnsk_tikkanen","vnsk_topelius","vnsk_toppelius","vnsk_tvs","vnsk_varelius","vnsk_virsikirja","vnsk_wallin","vnsk_wikman","vnsk_wiwolin","vnsk_yksitt"],
    info : {
	urn : "urn:nbn:fi:lb-2016081203",
	metadata_urn : "urn:nbn:fi:lb-20140730147",
	licence : settings.licenceinfo.EUPL_11,
	homepage : settings.fn.kaino_homepage("1800/meta/1800")
    },
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
    // limited_access : true,
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

settings.corpora.finstud = {
    id : "finstud",
    title: "Finstud 86",
    description : "Finstud 86",
    urn : "urn:nbn:fi:lb-2016090610",
    metadata_urn : "urn:nbn:fi:lb-20140730158",
    licence : {
	name : "CLARIN RES +PLAN +NC +PRIV 1.0",
	urn : "urn:nbn:fi:lb-2016041802",
    },
    limited_access : true,
    licence_type : "RES",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes: attrlist.finstud,
    struct_attributes : sattrlist.finstud
};


settings.corpora.ftb2 = {
    title : "FinnTreeBank 2",
    description : "Finnish tree bank, version 2",
    id : "ftb2",
    urn : "urn:nbn:fi:lb-201407164",
    metadata_urn : "urn:nbn:fi:lb-201407163",
    licence : settings.licenceinfo.CC_BY_30,
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

/* ==== TIEDELEHTIÄ ==== */

settings.corpus_aliases.tiedelehdet = "tiedelehdet_.*";

settings.corpora.tiedelehdet_hiidenkivi = {
    title : "Hiidenkivi",
    description : "Hiidenkivi (2009-2012)<br/>Julkaisijat: Kotimaisten kielten keskus, Suomalaisen Kirjallisuuden Seura, Suomen Kotiseutuliitto<br/>Kotisivu: <a href='http://www.hiidenkivi-lehti.fi/'>http://www.hiidenkivi-lehti.fi/</a>",
    id : "tiedelehdet_hiidenkivi",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : {
            label : "text_title"
        },
        text_year : {
            label : "year"
        },
        text_issue : {
            label : "issue"
        },
    }
};


settings.corpora.tiedelehdet_versus = {
    title : "Versus",
    description : "Versus (2/2011-1/2015)<br/>Julkaisija: Alue- ja ympäristöntutkimuksen seura<br/>Kotisivu: <a href='http://www.ays.fi/versus/'>http://www.ays.fi/versus/</a>",
    id : "tiedelehdet_versus",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : {
            label : "text_title"
        },
        text_year : {
            label : "year"
        },
        text_issue : {
            label : "issue"
        },
    }
};


settings.corpora.tiedelehdet_kasvu = {
    title : "Kasvu",
    description : "Kasvu (2012-1/2016)<br/>Julkaisija: Talentia ry<br/>Kotisivu: <a href='http://talentia.e-julkaisu.com/julkaisut/'>http://talentia.e-julkaisu.com/julkaisut/</a>",
    id : "tiedelehdet_kasvu",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : {
            label : "text_title"
        },
        text_year : {
            label : "year"
        },
        text_issue : {
            label : "issue"
        },
    }
};


settings.corpora.tiedelehdet_liikuntajatiede = {
    title : "Liikunta ja tiede (tutkimusartikkelit)",
    description : "Liikunta ja tiede (2008-2013)<br/>Julkaisija: Liikuntatieteellinen Seura ry<br/>Kotisivu: <a href='http://www.lts.fi/liikunta-tiede-lehti'>http://www.lts.fi/liikunta-tiede-lehti</a>",
    id : "tiedelehdet_liikuntajatiede",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : sattrs.text_title,
        text_issue : {
            label : "issue"
        },
        text_year : {
            label : "year"
        }
    }
};

settings.corpora.tiedelehdet_liikenteensuunta = {
    title : "Liikenteen suunta",
    description : "Liikenteen suunta (2012-2/2014)<br/>Julkaisija: Liikennevirasto<br/>Kotisivu: <a href='http://www.liikenteensuunta.fi/fi/'>http://www.liikenteensuunta.fi/fi/</a>",
    id : "tiedelehdet_liikenteensuunta",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : sattrs.text_title,
        text_issue : {
            label : "issue"
        },
        text_year : {
            label : "year"
        }
    }
};

settings.corpora.tiedelehdet_informaatio = {
    title : "Informaatiotutkimus",
    description : "Informaatiotutkimus (2000-2015)<br/>Julkaisija: Informaatiotutkimuksen yhdistys<br/>Kotisivu: <a href='http://ojs.tsv.fi/index.php/inf'>http://ojs.tsv.fi/index.php/inf</a>",
    id : "tiedelehdet_informaatio",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "issue"
        }
    }
};


settings.corpora.tiedelehdet_hykirjasto = {
    title : "Kansalliskirjasto-lehti/Helsingin yliopiston kirjaston tiedotuslehti",
    description : "Helsingin yliopiston kirjaston tiedotuslehti (2000-2002) / Kansalliskirjasto-lehti (2003-2013)<br/>Julkaisija: Kansalliskirjasto<br/>Kotisivu: <a href='https://www.kansalliskirjasto.fi/fi/search?keys=yleistieto%20tiedotus%20kansalliskirjastolehti'>https://www.kansalliskirjasto.fi/</a>",
    id : "tiedelehdet_hykirjasto",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_geologi = {
    title : "Geologi",
    description : "Geologi (2000, 2006-2013)<br/>Julkaisija: Suomen Geologinen Seura<br/>Kotisivu: <a href='http://www.geologinenseura.fi/geologi-lehti/'>http://www.geologinenseura.fi/geologi-lehti/</a>",
    id : "tiedelehdet_geologi",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        }
    }
};

settings.corpora.tiedelehdet_musiikinsuunta = {
    title : "Musiikin suunta",
    description : "Musiikin suunta (2003-2013)<br/>Julkaisija: Suomen etnomusikologinen seura<br/>Kotisivu: <a href='http://www.etnomusikologia.fi/julkaisut/Mus.suunta.htm'>http://www.etnomusikologia.fi/julkaisut/</a>",
    id : "tiedelehdet_musiikinsuunta",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "issue"
        }
    }
};


settings.corpora.tiedelehdet_susa = {
    title : "Suomalais-Ugrilaisen Seuran Aikakauskirja",
    description : "Suomalais-Ugrilaisen Seuran Aikakauskirja (2006, 2011, 2013)<br/>Julkaisija: Suomalais-Ugrilainen seura<br/>Kotisivu: <a href='http://www.sgr.fi/susa/susa_fi.html'>http://www.sgr.fi/susa/</a>",
    id : "tiedelehdet_susa",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : sattrs.text_title,
        text_year : {
            label : "year"
        }
    }
};

settings.corpora.tiedelehdet_sosiaalilaaketiede = {
    title : "Sosiaalilääketieteellinen Aikakauslehti",
    description : "Sosiaalilääketieteellinen Aikakauslehti (2006-2013)<br/>Julkaisija: Sosiaalilääketieteellinen yhdistys ry<br/>Kotisivu: <a href='http://ojs.tsv.fi/index.php/SA/index'>http://ojs.tsv.fi/index.php/SA/index</a>",
    id : "tiedelehdet_sosiaalilaaketiede",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_niinnain = {
    title : "niin & näin",
    description : "niin & näin (2000-4/2013)<br/>Julkaisija: Eurooppalaisen filosofian seura ry<br/>Kotisivu: <a href='http://netn.fi/lehti'>http://netn.fi/</a>",
    id : "tiedelehdet_niinnain",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : sattrs.text_title,
        text_year : {
            label : "year"
        }
    }
};

settings.corpora.tiedelehdet_skeptikko = {
    title : "Skeptikko",
    description : "Skeptikko (2000-2015)<br/>Julkaisija: Skepsis ry<br/>Kotisivu: <a href='http://www.skepsis.fi/Julkaisuja/Skeptikkolehti.aspx'>http://www.skepsis.fi/</a>",
    id : "tiedelehdet_skeptikko",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : sattrs.text_title,
        text_issue : {
            label : "issue"
        },
        text_year : {
            label : "year"
        }
    }
};

settings.corpora.tiedelehdet_suo = {
    title : "Suo",
    description : "Suo (2005-2013)<br/>Julkaisija: Suoseura<br/>Kotisivu: <a href='http://www.suoseura.fi/suo/'>http://www.suoseura.fi/suo/</a>",
    id : "tiedelehdet_suo",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : sattrs.text_title,
        text_issue : {
            label : "issue"
        },
        text_year : {
            label : "year"
        }
    }
};

settings.corpora.tiedelehdet_teologinen = {
    title : "Teologinen Aikakauskirja",
    description : "Teologinen Aikakauskirja (2004-2013)<br/>Julkaisija: Teologinen Julkaisuseura ry<br/>Kotisivu: <a href='http://www.tatt.fi/'>http://www.tatt.fi/</a>",
    id : "tiedelehdet_teologinen",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : sattrs.text_title,
        text_issue : {
            label : "issue"
        },
        text_year : {
            label : "year"
        }
    }
};

settings.corpora.tiedelehdet_tieteessatapahtuu = {
    title : "Tieteessä tapahtuu",
    description : "Tieteessä tapahtuu (2000-2015)<br/>Julkaisija: Tieteellisten seurain valtuuskunta<br/><a href='http://www.tieteessatapahtuu.fi/'>http://www.tieteessatapahtuu.fi/</a>",
    id : "tiedelehdet_tieteessatapahtuu",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "date"
        },
        text_citation : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_terminfo = {
    title : "Terminfo",
    description : "Terminfo (2010-2015)<br/>Julkaisija: Sanastokeskus TSK<br/>Kotisivu: <a href='http://www.terminfo.fi/'>http://www.terminfo.fi/</a>",
    id : "tiedelehdet_terminfo",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : sattrs.text_title,
        text_issue : {
            label : "issue"
        },
        text_year : {
            label : "year"
        }
    }
};

settings.corpora.tiedelehdet_tktlehti = {
    title : "Tietojenkäsittelytiede",
    description : "Tietojenkäsittelytiede (2003-2015)<br/>Julkaisija: Tieojenkäsittelytieteen seura<br/>Kotisivu: <a href='http://www.cse.tkk.fi/fi/tkt-lehti/'>http://www.cse.tkk.fi/fi/tkt-lehti/</a>",
    id : "tiedelehdet_tktlehti",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : sattrs.text_title,
        text_issue : {
            label : "issue"
        },
        text_year : {
            label : "year"
        },
        text_date : sattrs.date
    }
};

settings.corpora.tiedelehdet_synnyt = {
    title : "Synnyt",
    description : "Synnyt (2004-2013)<br/>Julkaisija: Synnyt/Origins<br/>Kotisivu: <a href='https://wiki.aalto.fi/display/Synnyt/Home'>https://wiki.aalto.fi/display/Synnyt/Home</a>",
    id : "tiedelehdet_synnyt",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : sattrs.text_title,
        text_issue : {
            label : "issue"
        },
        text_year : {
            label : "year"
        }
    }
};

settings.corpora.tiedelehdet_muinaistutkija = {
    title : "Muinaistutkija",
    description : "Muinaistutkija (2000-2012)<br/>Julkaisija: Suomen arkeologinen seura<br/>Kotisivu: <a href='http://www.sarks.fi/mt/etusivu.html'>http://www.sarks.fi/mt/etusivu.html</a>",
    id : "tiedelehdet_muinaistutkija",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_date : {
            label : "year"
        },
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }

    }
};


settings.corpora.tiedelehdet_tutkivasos = {
    title : "Tutkiva Sosiaalityö",
    description : "Tutkiva Sosiaalityö (2010-2013)<br/>Julkaisija: Sosiaalityön tutkimuksen seura<br/>Kotisivu: <a href='http://www.sosiaalityontutkimuksenseura.fi/Tutkiva_sosiaality%C3%B6'>http://www.sosiaalityontutkimuksenseura.fi/Tutkiva_sosiaality%C3%B6</a>",
    id : "tiedelehdet_tutkivasos",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_year : {
            label : "year"
        }
    }
};

settings.corpora.tiedelehdet_tiedejaase = {
    title : "Tiede ja Ase",
    description : "Tiede ja Ase (2000-2013)<br/>Julkaisija: Suomen sotatieteellinen seura<br/>Kotisivu: <a href='http://ojs.tsv.fi/index.php/ta'>http://ojs.tsv.fi/index.php/ta</a>",
    id : "tiedelehdet_tiedejaase",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "issue"
        }
    }
};


settings.corpora.tiedelehdet_avain = {
    title : "Avain",
    description : "Kirjallisuudentutkimuksen aikakauslehti Avain (2004-2015)<br/>Julkaisija: Kirjallisuudentutkijain Seura<br/>Kotisivu: <a href='http://pro.tsv.fi/skts/avain.html'>http://pro.tsv.fi/skts/avain.html</a>",
    id : "tiedelehdet_avain",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.standard,
    struct_attributes : {
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_ennenjanyt = {
    title : "Ennen ja nyt",
    description : "Ennen ja nyt (2001-1/2016)<br/>Julkaisijat: Agricola -Suomen historiaverkko, Historiallinen Yhdistys ry, Suomen Historiallinen Seura ry ja Turun Historiallinen Yhdistys ry.<br/>Kotisivu: <a href='http://www.ennenjanyt.net/'>http://www.ennenjanyt.net/</a>",
    id : "tiedelehdet_ennenjanyt",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.standard,
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_historianystava = {
    title : "Historian ystävä",
    description : "Historian ystävä (2010-1/2016)<br/>Julkaisija: Historian Ystäväin Liitto<br/>Kotisivu: <a href='http://www.historianyst.fi/historianystava/'>http://www.historianyst.fi/historianystava/</a>",
    id : "tiedelehdet_historianystava",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.standard,
    struct_attributes : {
        text_url : sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_ilmansuojelu = {
    title : "Ilmansuojelu-lehti",
    description : "Ilmansuojelu-lehti (2007-2015)<br/>Julkaisija: Ilmansuojeluyhdistys ry<br/>Kotisivu: <a href='https://isy.fi/julkaisut/ilmansuojelulehti/'>https://isy.fi/julkaisut/ilmansuojelulehti/</a>",
    id : "tiedelehdet_ilmansuojelu",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.standard,
    struct_attributes : {
        text_url : sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_kieliskooppi = {
    title : "Kieliskooppi",
    description : "Kieliskooppi (2012-2013)<br/>Julkaisija: Jyväskylän yliopiston kielikampus<br/>Kotisivu:<a href='http://research.jyu.fi/kieliskooppi/journals/'>http://research.jyu.fi/kieliskooppi/journals/</a>",
    id : "tiedelehdet_kieliskooppi",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.standard,
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_title : sattrs.text_title
    }
};

settings.corpora.tiedelehdet_kosmopolis = {
title : "Kosmopolis",
    description : "Kosmopolis (2000-2013)<br/>Julkaisija: Suomen rauhantutkimusyhdistys<br/>Kotisivu: <a href='http://rauhantutkimus.fi/content/kosmopolis/'>http://rauhantutkimus.fi/content/kosmopolis/</a>",
    id : "tiedelehdet_kosmopolis",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
    text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
	label : "text_author"
	    },
        text_citationpublisher : {
	label : "text_publisher"
	    },
        text_citationtitle : {
	label : "text_title"
	    },
        text_citationdate : {
	label : "year"
	    },
        text_citation : {
	label : "issue"
	    }
    }
};

settings.corpora.tiedelehdet_poliittinentalous = {
    title : "Poliittinen talous",
    description : "Poliittinen talous (1/2013-1/2014)<br/>Julkaisija: Poliittisen talouden tutkimuksen seura<br/>Kotisivu: <a href='http://poliittinentalous.fi/ojs/'>http://poliittinentalous.fi/ojs/</a>",
    id : "tiedelehdet_poliittinentalous",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.standard,
    struct_attributes : {
        text_url : sattrs.link_lehdet
    }
};


settings.corpora.tiedelehdet_skas = {
    title : "SKAS",
    description : "SKAS (2007-2013)<br/>Julkaisija: Suomen keskiajan arkeologian seura<br/>Kotisivu: <a href='http://www.skas.fi/skas-lehti/'>http://www.skas.fi/skas-lehti/</a>",
    id : "tiedelehdet_skas",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.standard,
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_tahiti = {
    title : "TAHITI",
    description : "TAHITI – Taidehistoria tieteenä (1/2011-4/2013)<br/>Julkaisija: Taidehistorian seura<br/>Kotisivu: <a href='http://tahiti.fi/'>http://tahiti.fi/</a>",
    id : "tiedelehdet_tahiti",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_vartija = {
    title : "Vartija-lehti",
    description : "Vartija-lehti (2006-2/2015)<br/>Julkaisija: Vartija-lehden kannatusyhdistys<br/>Kotisivu: <a href='http://www.vartija-lehti.fi/'>http://www.vartija-lehti.fi/</a>",
    id : "tiedelehdet_vartija",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.standard,
    struct_attributes : {
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_yhteiskuntapolitiikka = {
    title : "Yhteiskuntapolitiikka",
    description : "Yhteiskuntapolitiikka (1998-2013)<br/>Julkaisija: Terveyden ja hyvinvoinnin laitos<br/>Kotisivu: <a href='https://www.thl.fi/fi/web/yhteiskuntapolitiikka/'>https://www.thl.fi/fi/web/yhteiskuntapolitiikka/</a> ",
    id : "tiedelehdet_yhteiskuntapolitiikka",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_tietolinja = {
    title : "Tietolinja",
    description : "Tietolinja (1/2000-2/2013)<br/>Julkaisija: Kansalliskirjasto<br/>Kotisivu: <a href='http://tietolinja.kansalliskirjasto.fi/'>http://tietolinja.kansalliskirjasto.fi/</a>",
    id : "tiedelehdet_tietolinja",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.standard,
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_mediajaviestinta = {
    title : "Media & Viestintä/Tiedotustutkimus",
    description : "Tiedotustutkimus (2005-2009) / Media & Viestintä (2010-2014)<br/>Julkaisija: Media- ja viestintätieteellinen seura<br/>Kotisivu: <a href='http://mediaviestinta.fi/blogi/'>http://mediaviestinta.fi/blogi/</a>",
    id : "tiedelehdet_mediajaviestinta",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.standard,
    struct_attributes : {
	text_issue : {
	    label : "issue"
        }
    }
};


settings.corpora.tiedelehdet_terra = {
    title : "Terra",
    description : "Terra (2000-2013)<br/>Julkaisija: Suomen maantieteellinen seura<br/>Kotisivu: <a href='http://www.helsinki.fi/maantiede/geofi/terra/'>http://www.helsinki.fi/maantiede/geofi/terra/</a>",
    id : "tiedelehdet_terra",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "issue"
        }
    }
};


settings.corpora.tiedelehdet_rakmek = {
    title : "Rakenteiden mekaniikka",
    description : "Rakenteiden mekaniikka (2000-2014)<br/>Julkaisija: Rakenteiden mekaniikan seura<br/>Kotisivu: <a href='http://rmseura.tkk.fi/rmlehti/'>http://rmseura.tkk.fi/rmlehti/</a>",
    id : "tiedelehdet_rakmek",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }

    }
};

settings.corpora.tiedelehdet_nimi = {
    title : "NMI-Bulletin",
    description : "NMI-Bulletin (2002-2003, 2007-2012)<br/>Julkaisija: Niilo Mäki instituutti<br/>Kotisivu: <a href='http://bulletin.nmi.fi/arkisto/'>http://bulletin.nmi.fi/arkisto/</a>",
    id : "tiedelehdet_nimi",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_prologi = {
    title : "Prologi",
    description : "Prologi (2009-2013)<br/>Julkaisija: Prologos ry<br/>Kotisivu: <a href='http://prologos.fi/prologi/'>http://prologos.fi/prologi/</a>",
    id : "tiedelehdet_prologi",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_metsatiede = {
    title : "Metsätieteen aikakauskirja",
    description : "Metsätieteen aikakauskirja (2000-2013)<br/>Julkaisija: Luonnonvarakeskus & Suomen Metsätieteellinen Seura<br/>Kotisivu: <a href='http://www.metla.fi/aikakauskirja/'>http://www.metla.fi/aikakauskirja/</a>",
    id : "tiedelehdet_metsatiede",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_ravitsemus = {
    title : "Ravitsemuskatsaus",
    description : "Ravitsemuskatsaus (2007-2013)<br/>Julkaisija: Maito ja Terveys ry<br/>Kotisivu: <a href='http://www.maitojaterveys.fi/www/fi/ravitsemuskatsaus/lehdet/index.php'>http://www.maitojaterveys.fi/www/fi/ravitsemuskatsaus/lehdet/index.php</a>",
    id : "tiedelehdet_ravitsemus",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_issue : {
            label : "issue"
        }

    }
};

settings.corpora.tiedelehdet_kulutustutkimus = {
    title : "Kulutustutkimus.Nyt",
    description : "Kulutustutkimus.Nyt (2007-2013)<br/>Julkaisija: Kulutustutkimuksen seura ry<br/>Kotisivu: <a href='http://www.kulutustutkimus.net/nyt/'>http://www.kulutustutkimus.net/nyt/</a>",
    id : "tiedelehdet_kulutustutkimus",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_issue : {
            label : "issue"
        }

    }
};

settings.corpora.tiedelehdet_sananjalka = {
    title : "Sananjalka",
    description : "Sananjalka (2006-2013)<br/>Julkaisija: Suomen kielen seura<br/>Kotisivu: <a href='http://www.suomenkielenseura.fi/sananjalka/'>http://www.suomenkielenseura.fi/sananjalka/</a>",
    id : "tiedelehdet_sananjalka",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "issue"
        }
    }
};


settings.corpora.tiedelehdet_kirkkohistoria = {
    title : "Suomen kirkkohistoriallisen seuran vuosikirja",
    description : "Suomen kirkkohistoriallisen seuran vuosikirja (2000-2014)<br/>Julkaisija: Suomen kirkkohistoriallinen seura<br/>Kotisivu: <a href='http://www.skhs.fi/julkaisut/vuosikirja/'>http://www.skhs.fi/julkaisut/vuosikirja/</a>",
    id : "tiedelehdet_kirkkohistoria",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "issue"
        }
    }
};


settings.corpora.tiedelehdet_skholion = {
    title : "Skholion",
    description : "Skholion (2009-1/2012)<br/>Julkaisija: Suomen Bysantin tutkimuksen seura ry<br/>Kotisivu: <a href='http://www.protsv.fi/bts/BTSskholion.html'>http://www.protsv.fi/bts/BTSskholion.html</a>",
    id : "tiedelehdet_skholion",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }

    }
};


settings.corpora.tiedelehdet_siirtolaisuus = {
    title : "Siirtolaisuus-Migration",
    description : "Siirtolaisuus-Migration (2000-2013)<br/>Julkaisija: Siirtolaisuusinstituutti<br/>Kotisivu: <a href='http://www.migrationinstitute.fi/fi/julkaisut/siirtolaisuus-migration'>http://www.migrationinstitute.fi/fi/julkaisut/siirtolaisuus-migration</a>",
    id : "tiedelehdet_siirtolaisuus",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }

    }
};



settings.corpora.tiedelehdet_taimiuutiset = {
    title : "Taimiuutiset",
    description : "Taimiuutiset (2000-2013)<br/>Julkaisija: Luonnonvarakeskus Suonenjoki<br/>Kotisivu: <a href='http://www.metla.fi/taimiuutiset/'>http://www.metla.fi/taimiuutiset/</a>",
    id : "tiedelehdet_taimiuutiset",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_issue : {
            label : "issue"
        }

    }
};

settings.corpora.tiedelehdet_kulttuurintutkimus = {
    title : "Kulttuurintutkimus",
    description : "Kulttuurintutkimus (2004-2013)<br/>Julkaisija: Kulttuurintutkimuksen seura ry<br/>Kotisivu: <a href='http://www.kulttuurintutkimus.fi/lehti/'>http://www.kulttuurintutkimus.fi/lehti/</a>",
    id : "tiedelehdet_kulttuurintutkimus",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_matkailututkimus = {
    title : "Matkailututkimus",
    description : "Matkailututkimus (2005-2013)<br/>Julkaisija: Suomen matkailututkimuksen seura ry<br/>Kotisivu: <a href='http://matkailututkimus.org/'>http://matkailututkimus.org/</a>",
    id : "tiedelehdet_matkailututkimus",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_kunnallistiede = {
    title : "Kunnallistieteellinen aikakauskirja",
    description : "Kunnallistieteellinen aikakauskirja (2002-2012)<br/>Julkaisija: Kunnallistieteen yhdistys<br/>Kotisivu: <a href='http://www.kunnallistiede.fi/aikakauskirja/'>http://www.kunnallistiede.fi/aikakauskirja/</a>",
    id : "tiedelehdet_kunnallistiede",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_maaseudunuusiaika = {
    title : "Maaseudun uusi aika",
    description : "Maaseudun uusi aika (2000-2013)<br/>Julkaisija: Maaseudun uusi aika -yhdistys<br/>Kotisivu: <a href='http://www.mua.fi/lehti/'>http://www.mua.fi/lehti/</a>",
    id : "tiedelehdet_maaseudunuusiaika",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        /*text_title : sattrs.text_title,*/
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};


settings.corpora.tiedelehdet_elo = {
    title : "Elinikäisen ohjauksen verkkolehti",
    description : "Elinikäisen ohjauksen verkkolehti (2011-2014)<br/>Julkaisija: JAMK ammatillinen opettajakorkeakoulu<br/>Kotisivu: <a href='http://verkkolehdet.jamk.fi/elo/'>http://verkkolehdet.jamk.fi/elo/</a>",
    id : "tiedelehdet_elo",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_bryobrotherella = {
    title : "Bryobrotherella",
    description : "Bryobrotherella (2008–2012)<br/>Julkaisija: Suomen Sammalseura<br/>Kotisivu: <a href='http://www.suomensammalseura.fi/'>http://www.suomensammalseura.fi</a>",
    id : "tiedelehdet_bryobrotherella",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_lounaishame = {
    title : "Lounais-Hämeen Luonto",
    description : "Lounais-Hämeen Luonto (2000-2010)<br/>Julkaisija: Lounais-Hämeen Luonnonsuojeluyhdistys ry<br/>Kotisivu: <a href='http://www.lounaisluonto.net/'>http://www.lounaisluonto.net/</a>",
    id : "tiedelehdet_lounaishame",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_kompositio = {
    title : "Kompositio",
    description : "Kompositio (2007-2013)<br/>Julkaisija: Suomen Säveltäjät ry<br/>Kotisivu: <a href='http://www.composers.fi/tietoa-yhdistyksesta/kompositio/'>http://www.composers.fi/tietoa-yhdistyksesta/kompositio/</a>",
    id : "tiedelehdet_kompositio",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_liiketalous = {
    title : "Liiketaloudellinen Aikakauskirja",
    description : "Liiketaloudellinen Aikakauskirja (2000-2013)<br/>Julkaisija: Liiketaloustieteellinen Yhdistys ry<br/>Kotisivu: <a href='http://lta.hse.fi/'>http://lta.hse.fi/</a>",
    id : "tiedelehdet_liiketalous",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};


settings.corpora.tiedelehdet_geofoorumi = {
    title : "GeoFoorumi",
    description : "GeoFoorumi (2006-2013)<br/>Julkaisija: Geologian tutkimuskeskus (GTK)<br/><a href='http://www.gtk.fi/ajankohtaista/painotuotteet/geofoorumi/'>http://www.gtk.fi/ajankohtaista/painotuotteet/geofoorumi/</a>",
    id : "tiedelehdet_geofoorumi",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_agricola = {
    title : "Agricolan Tietosanomat",
    description : "Agricolan Tietosanomat (2000)<br/>Julkaisija: <br/>Kotisivu: <a href='http://agricola.utu.fi/julkaisut/tietosanomat/'>http://agricola.utu.fi/julkaisut/tietosanomat/</a>",
    id : "tiedelehdet_agricola",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_atitle : sattrs.text_title,
        text_url : sattrs.link_lehdet,
        text_author : sattrs.article_author,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_diakonia = {
    title : "Diakonian tutkimus –aikakauskirja",
    description : "Diakonian tutkimus -aikakauskirja (2004–2013)<br/>Julkaisija: Diakonian Tutkimuksen Seura<br/>Kotisivu: <a href='http://dts.fi/aikakauskirja/'>http://dts.fi/aikakauskirja/</a>",
    id : "tiedelehdet_diakonia",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        /*text_url : sattrs.link_lehdet,*/
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_psykologia = {
    title : "Psykologia-lehti",
    description : "Psykologia-lehti (2009-2010)<br/>Julkaisija: Suomen psykologinen seura<br/>Kotisivu: <a href='http://www.psykologia.fi/'>http://www.psykologia.fi/</a>",
    id : "tiedelehdet_psykologia",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        /*text_url : sattrs.link_lehdet,*/
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_ruralia = {
    title : "Ruralia-lehti",
    description : "Ruralia-lehti (2006-2014)<br/>Julkaisija: Ruralia-instituutti<br/>Kotisivu: <a href='http://www.helsinki.fi/ruralia/'>http://www.helsinki.fi/ruralia/</a>",
    id : "tiedelehdet_ruralia",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_historiallinen = {
    title : "Historiallinen Aikakauskirja",
    description : "Historiallinen Aikakauskirja (2001-2013)<br/>Julkaisija: Suomen Historiallinen Seura & Historian Ystäväin Liitto<br/>Kotisivu: <a href='http://www.historiallinenaikakauskirja.fi/'>http://www.historiallinenaikakauskirja.fi/</a>",
    id : "tiedelehdet_historiallinen",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_havina = {
    title : "Havina",
    description : "Havina (2009-2013)<br/>Julkaisija: Oulun yliopisto, Historiatieteet</br>Kotisivu: <a href='http://www.havina.net/'>http://www.havina.net/</a>",
    id : "tiedelehdet_havina",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_atitle : sattrs.text_title,
        text_date : sattrs.date,
        text_url : sattrs.link_lehdet,
        text_author : sattrs.article_author,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_harukaze = {
    title : "Harukaze",
    description : "Harukaze (2000-2013)<br/>Julkaisija: Japani-opinnot, Oulun yliopisto, Oulu<br/>Kotisivu: <a href='http://www.oulu.fi/Harukaze/'>http://www.oulu.fi/Harukaze/</a>",
    id : "tiedelehdet_harukaze",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_atitle : sattrs.text_title,
        text_url : sattrs.link_lehdet,
        text_author : sattrs.article_author,
        text_date : sattrs.date,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_glossae = {
    title : "Glossae",
    description : "Glossae (2000-2012)<br/>Julkaisija: Keskiajan opinto- ja tutkimusyhdistys<br/>Kotisivu: <a href='http://www.glossa.fi/glossae/arkisto.php'>http://www.glossa.fi/glossae/arkisto.php</a>",
    id : "tiedelehdet_glossae",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};


settings.corpora.tiedelehdet_musiikkikasv = {
    title : "Musiikkikasvatuslehti",
    description : "Musiikkikasvatuslehti (2014)<br/>Julkaisijat: Sibelius-Akatemia & Suomen Taidekasvatuksen tutkimusseura<br/>Kotisivu: <a href='http://www2.siba.fi/musiikkikasvatuslehti/'>http://www2.siba.fi/musiikkikasvatuslehti/</a>",
    id : "tiedelehdet_musiikkikasv",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_areiopagi = {
    title : "Areiopagi",
    description : "Areiopagi (2013)<br/>Julkaisija: Areiopagi ry<br/>Kotisivu: <a href='http://www.areiopagi.fi/'>http://www.areiopagi.fi/</a>",
    id : "tiedelehdet_areiopagi",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_atitle : sattrs.text_title,
        text_url : sattrs.link_lehdet,
        text_author : sattrs.article_author,
        text_issue : {
            label : "issue"
        }
    }
};


settings.corpora.tiedelehdet_ats = {
    title : "ATS-Ydintekniikka",
    description : "ATS-Ydintekniikka (2000–2013)<br/>Julkaisija: Suomen Atomiteknillinen Seura<br/>Kotisivu: <a href='http://www.ats-fns.fi/fi/ats-ydintekniikka/lehdet'>http://www.ats-fns.fi/fi/ats-ydintekniikka/lehdet</a>",
    id : "tiedelehdet_ats",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        /*text_url : sattrs.link_lehdet,*/
        text_issue : {
            label : "issue"
        }
    }
};


settings.corpora.tiedelehdet_auraica = {
    title : "Auraica",
    description : "Auraica (2008–2012)<br/>Julkaisija: Porthan-Seura ry<br/>Kotisivu: <a href='http://ojs.tsv.fi/index.php/Aur/issue/archive'>http://ojs.tsv.fi/index.php/Aur/issue/archive</a>",
    id : "tiedelehdet_auraica",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_aikuiskasvatus = {
    title : "Aikuiskasvatus",
    description : "Aikuiskasvatus (2011–2014)<br/>Julkaisijat: Aikuiskasvatuksen Tutkimusseura ry ja Kansanvalistusseura<br/>Kotisivu: <a href='http://www.doria.fi/handle/10024/7300'>http://www.doria.fi/handle/10024/7300</a><br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotTiedelehtia/Aikuiskasvatus_artikkeliluettelo.pdf'>Artikkeliluettelo</a>",
    id : "tiedelehdet_aikuiskasvatus",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_atitle : sattrs.text_title,
        /*text_date : sattrs.date,*/
        text_author : sattrs.article_author,
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_toksikologi = {
    title : "Toksikologi-lehti",
    description : "Toksikologi-lehti (2000-2013)<br/>Julkaisija: Suomen toksikologiyhdistys<br/>Kotisivu: <a href='http://www.toksikologit.fi/lehti.html'>http://www.toksikologit.fi/lehti.html</a>",
    id : "tiedelehdet_toksikologi",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_walbum = {
    title : "W-album",
    description : "W-album (2004-2013)<br/>Julkaisija: Turun Eläin- ja Kasvitieteellisen seuran Hyönteiskerho<br/>Kotisivu: <a href='http://org.utu.fi/harrastus/TEKS/w-album/'>http://org.utu.fi/harrastus/TEKS/w-album/</a>",
    id : "tiedelehdet_walbum",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_tyoelama = {
    title : "Työelämän tutkimus",
    description : "Työelämän tutkimus (2003-2012)<br/>Julkaisija: Työelämän tutkimusyhdistys<br/>Kotisivu: <a href='http://www.tyoelamantutkimus.fi/tyoelaman-tutkimus-arbetslivsforskning-lehtitidskrift/lehdet/'>http://www.tyoelamantutkimus.fi/tyoelaman-tutkimus-arbetslivsforskning-lehtitidskrift/lehdet/</a>",
    id : "tiedelehdet_tyoelama",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_ura = {
    title : "Ura/Valtiotieteilijä",
    description : "Valtiotieteilijä (2009-2011), Ura (2012-2013)<br/>Julkaisija: Yhteiskunta-alan korkeakoulutetut ry<br/>Kotisivu: <a href='http://uralehti.fi/arkisto/'>http://uralehti.fi/arkisto/</a>",
    id : "tiedelehdet_ura",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.standard,
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};
/*
settings.corpora.tiedelehdet_virittaja = {
    title : "Virittäjä",
    description : "Virittäjä (2009-2013)<br/>Julkaisija: Kotikielen seura<br/>Kotisivu: <a href='http://www.kotikielenseura.fi/virittaja/verkkolehti/'>http://www.kotikielenseura.fi/virittaja/verkkolehti/</a>",
    id : "tiedelehdet_virittaja",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet
    }
    };*/

settings.corpora.tiedelehdet_virittaja = {
    title : "Virittäjä",
    description : "Virittäjä (3/2006-4/2013)<br/>Julkaisija: Kotikielen seura<br/>Kotisivu: <a href='http://www.kotikielenseura.fi/virittaja/verkkolehti/'>http://www.kotikielenseura.fi/virittaja/verkkolehti/</a>",
    id : "tiedelehdet_virittaja",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_citationabstracthtmlurl : sattrs.link_lehdet,
        text_citationauthors : {
            label : "text_author"
        },
        text_citationpublisher : {
            label : "text_publisher"
        },
        text_citationtitle : {
            label : "text_title"
        },
        text_citationdate : {
            label : "year"
        },
        text_citation : {
            label : "lehdet_issue"
        }
    }
};

settings.corpora.tiedelehdet_ymparistohistoria = {
    title : "Ympäristöhistoria",
    description : "Ympäristöhistoria (2011-2013)<br/>Julkaisija: <br/>Kotisivu: <a href='http://www.uta.fi/yky/tutkimus/historia/projektit/iehg/Ymparistohistoria/12011.html'>http://www.uta.fi/yky/tutkimus/historia/projektit/iehg/Ymparistohistoria/12011.html</a>",
    id : "tiedelehdet_ymparistohistoria",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }

    }
};

settings.corpora.tiedelehdet_trio = {
    title : "Trio",
    description : "Trio (2012-2014)<br/>Julkaisija: Sibelius Akatemia (DocMus)<br/>Kotisivu: <a href='http://www5.siba.fi/services-for-all/publications/printed-publications/periodicals'>http://www5.siba.fi/services-for-all/publications/printed-publications/periodicals</a>",
    id : "tiedelehdet_trio",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_issue : {
            label : "issue"
        }

    }
};

settings.corpora.tiedelehdet_transmitteri = {
    title : "Transmitteri",
    description : "Transmitteri (2000-2013)<br/>Julkaisija: Suomen farmakologiyhdistys<br/>Kotisivu: <a href='http://www.sfy.fi/transmitteri.html'>http://www.sfy.fi/transmitteri.html</a>",
    id : "tiedelehdet_transmitteri",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet
    }
};


settings.corpora.tiedelehdet_thanatos = {
    title : "Thanatos",
    description : "Thanatos (2012-2013)<br/>Julkaisija: Suomalaisen Kuolemantutkimuksen Seura ry<br/>Kotisivu: <a href='http://thanatos-journal.com/'>http://thanatos-journal.com/</a>",
    id : "tiedelehdet_thanatos",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        text_url : sattrs.link_lehdet
    }
};



settings.corpora.tiedelehdet_aluejaymparisto = {
    title : "Alue ja ympäristö",
    description : "Alue ja ympäristö (2005–2014)<br/>Julkaisija: Alue- ja ympäristötutkimuksen seura<br/>Kotisivu: <a href='http://www.ays.fi/aluejaymparisto'>http://www.ays.fi/aluejaymparisto</a>",
    id : "tiedelehdet_aluejaymparisto",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        /*text_date : sattrs.date,*/
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_aakusti = {
    title : "Aakusti",
    description : "Aakusti (2008–2013)<br/>Julkaisija: Savon kielen seura ry<br/>Kotisivu: <a href='http://savonkielenseura.fi/arkistosivu/'>http://savonkielenseura.fi/arkistosivu/</a>",
    id : "tiedelehdet_aakusti",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        /*text_date : sattrs.date,*/
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_30paivaa = {
    title : "30 Päivää",
    description : "30 Päivää (2013)<br/>Julkaisija: Sosiaalialan korkeakoulutettujen ammattijärjestö Talentia ry<br/>Kotisivu: <a href='http://www.talentia.isinteksas.com/julkaisut/'>http://www.talentia.isinteksas.com/julkaisut/</a>",
    id : "tiedelehdet_30paivaa",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        /*text_date : sattrs.date,*/
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_aidinkieli = {
    title : "Aikakauskirja Äidinkielen opetustiede",
    description : "Aikakauskirja Äidinkielen opetustiede (2008–2012)<br/>Julkaisija: Äidinkielen Opetustieteen Seura ry<br/>Kotisivu: <a href='http://www.aidinkielenopetustieteenseurary.com/'>http://www.aidinkielenopetustieteenseurary.com/</a>",
    id : "tiedelehdet_aidinkieli",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_title : sattrs.text_title,
        /*text_date : sattrs.date,*/
        text_url : sattrs.link_lehdet,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.tiedelehdet_kognitiivinen = {
    title : "Kognitiivinen psykoterapia",
    description : "Kognitiivinen psykoterapia (2004-2013)<br/>Julkaisija: Kognitiivisen psykoterapian yhdistys<br/>Kotisivu: <a href='http://www.kognitiivinenpsykoterapia.fi/'>http://www.kognitiivinenpsykoterapia.fi/</a>",
    id : "tiedelehdet_kognitiivinen",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        nertag : attrs.ner_tags
    },
    struct_attributes : {
        text_url : sattrs.link_lehdet
    }
};


settings.corpora.tiedelehdet_automaatiovayla = {
    id: "tiedelehdet_automaatiovayla",
    title: "Automaatioväylä",
    description: "Automaatioväylä (5/2012-4/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotTiedelehtia/Automaatiovayla_5_2012-4_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Automaatioväylä Oy<br/>Kotisivu: <a href='http://www.automaatiovayla.fi/category/lehtiarkisto/'>http://www.automaatiovayla.fi/category/lehtiarkisto/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_filename: {
            displayType: "hidden",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_baptria = {
    id: "tiedelehdet_baptria",
    title: "Baptria",
    description: "Baptria (2010-2/2011)<br/>Julkaisija: Suomen Perhostutkijain Seura ry<br/>Kotisivu: <a href='http://www.perhostutkijainseura.fi/fi/J%C3%A4senlehti+Baptria.html'>http://www.perhostutkijainseura.fi/fi/J%C3%A4senlehti+Baptria.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_filename: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_idantutkimus = {
    id: "tiedelehdet_idantutkimus",
    title: "Idäntutkimus",
    description: "Idäntutkimus (2/2003-2/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotTiedelehtia/Idantutkimus_2003-2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Idäntutkimus, Venäjän ja Itä-Euroopan tutkimuksen seura ry<br/>Kotisivu: <a href='http://www.helsinki.fi/idantutkimus/arkisto.htm'>http://www.helsinki.fi/idantutkimus/arkisto.htm</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_filename: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_kliinlab = {
    id: "tiedelehdet_kliinlab",
    title: "Kliinlab",
    description: "Kliinlab (2000-2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotTiedelehtia/Kliinlab_2000-2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Suomen kliinisen kemian yhdistys<br/>Kotisivu: <a href='http://www.skky.fi/kliinlab-lehti'>http://www.skky.fi/kliinlab-lehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_filename: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_yhdyskuntasuunnittelu = {
    id: "tiedelehdet_yhdyskuntasuunnittelu",
    title: "Yhdyskuntasuunnittelu",
    description: "Yhdyskuntasuunnittelu (3-4/1990, 4/1993-3/1995, 1/1998, 2/2000-2012)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Yhdyskuntasuunnittelu_3_4_19904_1993-3_19951_19982_2000-2012_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Yhdyskuntasuunnittelun seura<br/>Kotisivu: <a href='http://www.yss.fi/yhdyskuntasuunnittelu-lehti/kirjoituksia-vuosien-varrelta'>http://www.yss.fi/yhdyskuntasuunnittelu-lehti/kirjoituksia-vuosien-varrelta</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_url: sattrs.link_lehdet,
        text_filename: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_nayttamo_tutkimus = {
    id: "tiedelehdet_nayttamo_tutkimus",
    title: "Näyttämö & tutkimus",
    description: "Näyttämö & tutkimus (2005, 2006, 2009, 2011, 2014)<br/>Julkaisija: Teatterintutkimuksen seura ry<br/>Kotisivu: <a href='http://teats.fi/category/nayttamo_et_tutkimus/'>http://teats.fi/category/nayttamo_et_tutkimus/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_sosiologia = {
    id: "tiedelehdet_sosiologia",
    title: "Sosiologia",
    description: "Sosiologia (2000-2013)<br/>Julkaisija: The Westermarck Society ry<br/>Kotisivu: <a href='http://www.sosiologia.fi/'>http://www.sosiologia.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_sydanaani = {
    id: "tiedelehdet_sydanaani",
    title: "Sydänääni",
    description: "Sydänääni (2013)<br/>Julkaisija: Suomen Kardiologinen Seura ry<br/>Kotisivu: <a href='https://www.fincardio.fi/julkaisut/sydanaani/'>https://www.fincardio.fi/julkaisut/sydanaani/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};




/* ===== LEHTIÄ ===== */

settings.corpus_aliases.muut_lehdet = "lehdet_.*";

settings.corpora.lehdet_selkosanomat = {
    title : "Selkosanomat/Selkouutiset",
    description : "Selkouutiset (25/2006-2011), Selkosanomat (2012-2013)<br/>Sisältää lehden kotisivuilla 2016 keväällä ladattavissa olevat artikkelit.<br/>Julkaisija: Selkokeskus / Kehitysvammaliitto<br/>Kotisivu: <a href='http://selkosanomat.fi/'>http://selkosanomat.fi/</a>",
    id : "lehdet_selkosanomat",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_title : sattrs.text_title,
        text_issue : {
            label : "issue"
        }
    }
};

settings.corpora.lehdet_leija = {
    title : "Leija",
    description : "Leija (2009-3/2016)<br/>Sisältää lehden kotisivuilla 2016 keväällä ladattavissa olevat artikkelit.<br/>Julkaisija: Kehitysvammaisen tukiliitto ry<br/>Kotisivu: <a href='http://www.kvtl.fi/fi/me-itse/ajankohtaista/leija-lehti/'>http://www.kvtl.fi/fi/me-itse/ajankohtaista/leija-lehti/</a>",
    id : "lehdet_leija",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_title : {
            label : "text_title"
        },
        text_year : {
            label : "year"
        },
        text_issue : {
            label : "issue"
        },
    }
};


settings.corpora.lehdet_ks = {
    title : "Karjalan Sanomat",
    description : "Karjalan Sanomat (2012-2014)<br/>Julkaisija: Periodika-kustantamo<br/>Kotisivu: <a href='http://karjalansanomat.ru/'>http://karjalansanomat.ru/</a>",
    id : "lehdet_ks",
    urn : "urn:nbn:fi:lb-2016112501",
    metadata_urn : "urn:nbn:fi:lb-2014092601",
    licence : {
	name : "CLARIN ACA 1.0",
	urn : "urn:nbn:fi:lb-2016112302",
    },
    limited_access : true,
    licence_type : "ACA",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_title : sattrs.text_title,
        text_year : sattrs.date,
        text_type : {
            label : "type"
        },
        text_issue : {
            label : "issue"
        }

    }
};


settings.corpora.lehdet_ekonomi = {
    title : "Ekonomi",
    description : "Ekonomi (2013–2014)<br/>Julkaisija: Suomen Ekonomiliitto<br/>Kotisivu: <a href='http://www.ekonomilehti.fi/'>http://www.ekonomilehti.fi/</a>",
    id : "lehdet_ekonomi",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_title : sattrs.text_title,
        text_date : sattrs.date,
        text_url : sattrs.link_lehdet,
	text_issue : {
	    label : "issue"
	}
    }
};

settings.corpora.lehdet_toisinsanoen = {
    title : "Toisin sanoen",
    description : "Toisin sanoen (2005-2014)<br/>Kotisivu: <a href='http://www.toisinsanoen.fi/'>http://www.toisinsanoen.fi/</a>",
    id : "lehdet_toisinsanoen",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_title : sattrs.text_title,
        text_date : sattrs.date,
        text_category : {
            label : "text_category"
        },
        text_author : {
            label : "article_author"
        },
    }
};

settings.corpora.lehdet_koskinen = {
    title : "Verkkolehti Koskinen",
    description : "Verkkolehti Koskinen – Kymenlaakson ammattikorkeakoulun verkkolehti (1996–2013)<br/>Sisältää lehden kotisivuilla 2016 keväällä ladattavissa olevat artikkelit.<br/>Julkaisija: Kymenlaakson ammattikorkeakoulu<br/>Kotisivu: <a href='http://www.kyamk.fi/Ajankohtaista/Verkkolehti%20Koskinen/'>http://www.kyamk.fi/Ajankohtaista/Verkkolehti%20Koskinen/</a>",
    id : "lehdet_koskinen",
    urn : "",
    metadata_urn : "",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {},
    struct_attributes : {
        text_title : sattrs.text_title,
        text_date : sattrs.date,
        text_url : sattrs.link_lehdet
    }
};


settings.corpora.lehdet_aarre = {
    id: "lehdet_aarre",
    title: "Aarre",
    description: "Aarre – Lehti Metsästä (2013–3/2015)<br/>Kotisivu: <a href='http://www.aarrelehti.fi/'>http://www.aarrelehti.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};



settings.corpora.lehdet_aino = {
    id: "lehdet_aino",
    title: "Aino",
    description: "Ylioppilaslehti Aino (2010-2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Aino_2010-2015_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Aalto-yliopiston ylioppilaskunta<br/>Kotisivu: <a href='http://ainolehti.fi/aino/'>http://ainolehti.fi/aino/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_akavalainen = {
    id: "lehdet_akavalainen",
    title: "Akavalainen",
    description: "Akavalainen (2006-2013)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> 2016 keväällä ladattavissa olevat artikkelit.<br/>Julkaisija: Akava, Korkeakoulutettujen työmarkkinakeskusjärjestö<br/>Kotisivu: <a href='http://www.akava.fi/akavalainen'>http://www.akava.fi/akavalainen</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_allergia = {
    id: "lehdet_allergia",
    title: "Allergia & Astma",
    description: "Allergia & Astma (2012-2014)<br/>Julkaisija: Allergia- ja Astmaliitto ry<br/>Kotisivu: <a href='http://www.allergia.fi/julkaisut/allergia-astma/'>http://www.allergia.fi/julkaisut/allergia-astma/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ammattisotilas = {
    id: "lehdet_ammattisotilas",
    title: "Ammattisotilas",
    description: "Ammattisotilas (5/2015-1/2016)<br/>Julkaisija: Aliupseeriliitto ry<br/>Kotisivu: <a href='http://www.aliupseeriliitto.fi/ammattisotilas'>http://www.aliupseeriliitto.fi/ammattisotilas</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_amnesty = {
    id: "lehdet_amnesty",
    title: "Amnesty",
    description: "Amnesty (3/2009-2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Amnesty_3_2009-2013_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Amnesty International Suomen osasto ry<br/>Kotisivu: <a href='https://www.amnesty.fi/tietoa-meista/amnesty-lehti/'>https://www.amnesty.fi/tietoa-meista/amnesty-lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ananda = {
    id: "lehdet_ananda",
    title: "Ananda",
    description: "Ananda (2005-1/2016)<br/>Sisältää lehden kotisivuilla 2016 keväällä ladattavissa olevat artikkelit.<br/>Julkaisija: Ananda-lehti/Trax Oy<br/>Kotisivu: <a href='http://www.anandalehti.fi/'>http://www.anandalehti.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_animalia = {
    id: "lehdet_animalia",
    title: "Animalia",
    description: "Animalia-lehti (2/2010-1/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Animalia-lehti_2_2010-1_2016_-aineistosta_puuttuvat_numerot_.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Animalia ry<br/>Kotisivu: <a href='http://animalia.fi/tietoa-animaliasta/animalia-lehti/'>http://animalia.fi/tietoa-animaliasta/animalia-lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};


settings.corpora.lehdet_antimilitaristi_sivari = {
    id: "lehdet_antimilitaristi_sivari",
    title: "Antimilitaristi/Sivari & totaali",
    description: "Sivari & totaali (1990-1991, 1998-2003, 2007-2013), Antimilitaristi (2014-2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Antimilitaristi_2014-2015_Sivari__totaali_1990-1991_1998-2003_2007-2013_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Aseistakieltäytyjäliitto ry<br/>Kotisivu: <a href='http://akl-web.fi/sivari_et_totaali/lehti_numeroittain'>http://akl-web.fi/sivari_et_totaali/lehti_numeroittain</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_filename: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};



settings.corpora.lehdet_apaja = {
    id: "lehdet_apaja",
    title: "Apaja",
    description: "Apaja (2006-1/2011)<br/>Sisältää lehden kotisivuilla 2016 syksyllä ladattavissa olevat artikkelit.<br/>Julkaisija: Riista- ja kalatalouden tutkimuslaitos<br/>Kotisivu: <a href='http://www.rktl.fi/julkaisut/p/apaja/'>http://www.rktl.fi/julkaisut/p/apaja/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_aselehti = {
    id: "lehdet_aselehti",
    title: "Ase-lehti",
    description: "Ase-lehti (2010-2014)<br/>Julkaisija: Ase-Lehti Oy<br/>Kotisivu: <a href='http://www.aselehti.fi/'>http://www.aselehti.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_aromi = {
    id: "lehdet_aromi",
    title: "Aromi",
    description: "Aromi - Ruoan ja Juoman Ammattilehti (2006-2013)<br/>Julkaisija: Mediatalo Keskisuomalainen Oyj Aikakauslehtiryhmä<br/>Kotisivu: <a href='http://aromilehti.fi/'>http://aromilehti.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_asukas = {
    id: "lehdet_asukas",
    title: "Asukas",
    description: "Asukas - Asiakaslehti VVO:n Asukkaille (2006-2014)<br/>Sisältää lehden kotisivuilla 2016 syksyllä ladattavissa olevat artikkelit.<br/>Julkaisija: VVO-yhtymä Oyj<br/>Kotisivu: <a href='https://asukas.vvo.fi/kodikaslehti/'>https://asukas.vvo.fi/kodikaslehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_asuminen_yhteiskunta = {
    id: "lehdet_asuminen_yhteiskunta",
    title: "Asuminen ja Yhteiskunta",
    description: "Asuminen ja Yhteiskunta (2011-1/2016)<br/>Sisältää lehden kotisivuilla 2016 syksyllä ladattavissa olevat artikkelit.<br/>Julkaisija: Asukasliitto ry<br/>Kotisivu: <a href='http://www.asukasliitto.fi/ajankohtaista/asuminen_ja_yhteiskunta_lehti/'>http://www.asukasliitto.fi/ajankohtaista/asuminen_ja_yhteiskunta_lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_asuntoinfo = {
    id: "lehdet_asuntoinfo",
    title: "Asuntoinfo",
    description: "Asuntoinfo (3-5/2013)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> 2016 kesällä ladattavissa olevat artikkelit.<br/>Julkaisija: BM Media Oy<br/>Kotisivu: <a href='http://www.lehtiluukku.fi/pub?id=51682'>http://www.lehtiluukku.fi/pub?id=51682</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_aurora = {
    id: "lehdet_aurora",
    title: "Aurora",
    description: "Aurora - Turun yliopiston sidosryhmälehti (2010-1/2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Aurora_2010-2_1_2013_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Turun yliopiston viestintä<br/>Kotisivu: <a href='http://www.utu.fi/fi/Palvelut/medialle/aurora/lue-verkossa/Sivut/home.aspx'>http://www.utu.fi/fi/Palvelut/medialle/aurora/lue-verkossa/Sivut/home.aspx</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_avainlehti = {
    id: "lehdet_avainlehti",
    title: "Avain-lehti",
    description: "Avain-lehti (2013-2014)<br/>(sisältää vain tutkimus- ja oikeus-palstat)<br/>Julkaisija: Neuroliitto ry<br/>Kotisivu: <a href='http://www.ms-liitto.fi/avain'>http://www.ms-liitto.fi/avain</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_avec = {
    id: "lehdet_avec",
    title: "Avec",
    description: "Avec (2006-2013)<br/>Julkaisija: Mediatalo Keskisuomalainen Oyj Aikakauslehtiryhmä<br/>Kotisivu: <a href='http://aromilehti.fi'>http://aromilehti.fi</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora["lehdet_avec_perhelehti"] = {
    id: "lehdet_avec_perhelehti",
    title: "Avec - Paremman avioliiton perhelehti",
    description: "Avec - Paremman avioliiton perhelehti (2005-2016)<br/>Julkaisija: Parempi avioliitto ry<br/>Kotisivu: <a href='www.parempiavioliitto.fi/'>www.parempiavioliitto.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_asukki = {
    id: "lehdet_asukki",
    title: "Asukki",
    description: "Asukki (4/2006 - 2-3/2015)<br/>Sisältää lehden kotisivuilla 2016 syksyllä ladattavissa olevat artikkelit.<br/>Julkaisija: Vailla vakinaista asuntoa ry<br/>Kotisivu: <a href='http://vvary.fi/haluatko-auttaa/tilaa-asukki/'>http://vvary.fi/haluatko-auttaa/tilaa-asukki/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_askel = {
    id: "lehdet_askel",
    title: "Askel",
    description: "Askel (1999-5/2002 ja 2003-2014)<br/>Julkaisija: Kotimaa Oy<br/>Kotisivu: <a href='http://www.askellehti.fi/'>http://www.askellehti.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_debatti = {
    id: "lehdet_debatti",
    title: "Debatti",
    description: "Debatti (2011-2/2014)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> 2016 kesällä ladattavissa olevat artikkelit.<br/>Julkaisija: Sosialidemokraattiset Opiskelijat SONK RY<br/>Kotisivu: <a href='https://sosialidemokraattisetopiskelijat.fi/debatti/'>https://sosialidemokraattisetopiskelijat.fi/debatti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ajolinja = {
    id: "lehdet_ajolinja",
    title: "Ajolinja",
    description: "Ajolinja (2009-2014)<br/>Julkaisija: B Yhtiöt Oy<br/>Kotisivu: <a href='http://www.boy.fi/ajo/'>http://www.boy.fi/ajo/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_diakonia = {
    id: "lehdet_diakonia",
    title: "Diakonia",
    description: "Diakonia (2010-2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Diakonia_2010-2015_-aineiston_sisaltamat_numerot.docx'>Luettelo aineiston sisältämistä numeroista</a><br/>Julkaisijat: Diakonia ry, Kirkon diakonia ja sielunhoito, Diakoniatyöntekijöiden Liitto, Suomen Kirkon Seurakuntaopiston Säätiö, Kirkkopalvelut, Suomen Merimieskirkko, Espoon Diakoniasäätiö, Oulun Diakonissalaitoksen Säätiö, Martinus-säätiö<br/>Kotisivu: <a href='http://sakasti.evl.fi/sakasti.nsf/sp2?open&cid=Content414A42-2-2'>http://sakasti.evl.fi/sakasti.nsf/sp2?open&cid=Content414A42-2-2</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};



settings.corpora.lehdet_elinehto = {
    id: "lehdet_elinehto",
    title: "Elinehto",
    description: "Elinehto (2010-1/2016)<br/>Julkaisija: Munuais- ja maksaliitto ry<br/>Kotisivu: <a href='http://www.muma.fi/munuais-_ja_maksaliitto/julkaisut/elinehto'>http://www.muma.fi/munuais-_ja_maksaliitto/julkaisut/elinehto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_emma = {
    id: "lehdet_emma",
    title: "EMMA",
    description: "EMMA (2007-1/2016)<br/>Julkaisija: EMMA - Espoon modernin taiteen museo<br/>Kotisivu: <a href='http://www.emma.museum/emmalehti'>http://www.emma.museum/emmalehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_entisesta_enemman = {
    id: "lehdet_entisesta_enemman",
    title: "Entisestä enemmän",
    description: "Entisestä enemmän (2006-2007)<br/>Julkaisija: Lounais-Suomen Jätehuolto Oy<br/>Kotisivu: <a href='https://www.lsjh.fi/fi/'>https://www.lsjh.fi/fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ernie = {
    id: "lehdet_ernie",
    title: "Ernie",
    description: "Ernie - EY:n sidosryhmälehti (2004-2014)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Luettelo_Ernie_2004-2014_-aineiston_numeroista.docx'>Luettelo aineiston sisältämistä numeroista</a><br/>Julkaisija: Ernst & Young Oy<br/>Kotisivu: <a href='http://www.ey.com/fi/fi/newsroom/pr-activities/articles/ernie_asiakaslehti'>http://www.ey.com/fi/fi/newsroom/pr-activities/articles/ernie_asiakaslehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_espanjan_sanomat = {
    id: "lehdet_espanjan_sanomat",
    title: "Espanjan Sanomat",
    description: "Espanjan Sanomat (2010-7-8/2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Espanjan_Sanomat_2010-7_8-2013_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Kotisivu: <a href='http://espanjansanomat.es/espanjansanomat/index.php/arkisto'>http://espanjansanomat.es/espanjansanomat/index.php/arkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_espoo = {
    id: "lehdet_espoo",
    title: "Espoo Esbo",
    description: "Espoo Esbo -lehti (2012-3/2016)<br/>Sisältää lehden kotisivuilla 2016 syksyllä ladattavissa olevat artikkelit.<br/>Julkaisija: Espoon kaupunki<br/>Kotisivu: <a href='http://www.espoo.fi/fi-FI/Espoon_kaupunki/Ajankohtaista/Espoo_Esbo_lehti%285630%29'>http://www.espoo.fi/fi-FI/Espoon_kaupunki/Ajankohtaista/Espoo_Esbo_lehti%285630%29</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_esri = {
    id: "lehdet_esri",
    title: "Esri",
    description: "Esri (2004-2014)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Esrin_numerot.docx'>Luettelo aineiston sisältämistä numeroista</a><br/>Julkaisija: Esri Finland Oy<br/>Kotisivu: <a href='http://www.esri.fi/yritysinfo/asiakaslehti/'>http://www.esri.fi/yritysinfo/asiakaslehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ethnos = {
    id: "lehdet_ethnos",
    title: "Ethnos",
    description: "Ethnos-tiedote ja Jäsenkirje (2/2001-2/2015)<br/>Julkaisija: Ethnos ry<br/>Kotisivu: <a href='http://www.ethnosry.org/jasenasiat/ethnos-tiedote/'>http://www.ethnosry.org/jasenasiat/ethnos-tiedote/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_eurooppalainen = {
    id: "lehdet_eurooppalainen",
    title: "Eurooppalainen",
    description: "Eurooppalainen-lehti (2007-2015)<br/>Julkaisija: Eurooppalainen Suomi ry<br/>Kotisivu: <a href='http://www.eurooppalainensuomi.fi/fi/publications/3/'>http://www.eurooppalainensuomi.fi/fi/publications/3/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_curly = {
    id: "lehdet_curly",
    title: "Curly",
    description: "Curly (4/2000-2/2016)<br/>Julkaisija: Curly ry<br/>Kotisivu: <a href='http://www.curly.fi/arkisto/'>http://www.curly.fi/arkisto/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_focus = {
    id: "lehdet_focus",
    title: "Focus",
    description: "Focus (2008-1/2014)<br/>Julkaisija: Metropolia Ammattikorkeakoulu<br/>Kotisivu: <a href='http://www.metropolia.fi/tietoa-metropoliasta/asiakaslehti-focus/'>http://www.metropolia.fi/tietoa-metropoliasta/asiakaslehti-focus/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_folium_classicum = {
    id: "lehdet_folium_classicum",
    title: "Folium Classicum",
    description: "Folium Classicum (2004-2012)<br/>Julkaisija: Klassillis-filologinen yhdistys r.y.<br/>Kotisivu: <a href='http://www.helsinki.fi/hum/kla/kfy/folium.html'>http://www.helsinki.fi/hum/kla/kfy/folium.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hkaksi = {
    id: "lehdet_hkaksi",
    title: "H2",
    description: "H2 (2007-3/2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/H2_2007-3_2013_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Haaga-Helian opiskelijakunta Helga<br/>Kotisivu: <a href='https://issuu.com/h2-lehti'>https://issuu.com/h2-lehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_haavi = {
    id: "lehdet_haavi",
    title: "Haavi",
    description: "Haavi (2008-2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Haavi_2008-2013_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Havis Amandan Nuorkauppakamari - Helsinki ry<br/>Kotisivu: <a href='http://www.havisamanda.com/Suomeksi/Amandat/Media'>http://www.havisamanda.com/Suomeksi/Amandat/Media</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hallaus = {
    id: "lehdet_hallaus",
    title: "Hallaus",
    description: "Hallaus (2009-2014)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Hallaus_2009-2014_-aineiston_numerot.docx'>Luettelo aineiston sisältämistä numeroista</a><br/>Julkaisija: Huutomerkki ry<br/>Kotisivu: <a href='http://huutomerkki.fi/yhdistys/toiminta/hallaus/'>http://huutomerkki.fi/yhdistys/toiminta/hallaus/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_helen = {
    id: "lehdet_helen",
    title: "Helen",
    description: "Helen-lehti (2010-1/2015)<br/>Sisältää lehden kotisivuilla 2016 kesällä ladattavissa olevat artikkelit.<br/>Julkaisija: Helen Oy<br/>Kotisivu: <a href='https://www.helen.fi/helen-oy/ajankohtaista/helen-lehti/'>https://www.helen.fi/helen-oy/ajankohtaista/helen-lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_diabetes_ja_laakari = {
    id: "lehdet_diabetes_ja_laakari",
    title: "Diabetes ja lääkäri",
    description: "Diabetes ja lääkäri (2005-1/2016)<br/>Julkaisija: Suomen Diabetesliitto ry<br/>Kotisivu: <a href='http://www.diabetes.fi/diabetesliitto/lehdet/diabetes_ja_laakari_-lehti/lehdet_pdf-muodossa'>http://www.diabetes.fi/diabetesliitto/lehdet/diabetes_ja_laakari_-lehti/lehdet_pdf-muodossa</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_evento = {
    id: "lehdet_evento",
    title: "Evento",
    description: "Evento (2012-2016)<br/>Julkaisija: Mediatalo Keskisuomalainen Oyj Aikakauslehtiryhmä<br/>Kotisivu: <a href='http://eventolehti.fi/'>http://eventolehti.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_helmeri = {
    id: "lehdet_helmeri",
    title: "Helmeri",
    description: "Helmeri (2006-1/2016)<br/>Julkaisija: Helsingin Merkonomit ry<br/>Kotisivu: <a href='http://www.helmeri.fi/helmerilehdet'>http://www.helmeri.fi/helmerilehdet</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_helsinginhenki = {
    id: "lehdet_helsinginhenki",
    title: "Helsingin Henki",
    description: "Helsingin Henki (2009-1/2014)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Helsingin_Henki_2009-1_2014_-aineistosta_puuttuvat_numerot_.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Helsingin kaupunginkanslia<br/>Kotisivu: <a href='http://www.hel.fi/www/kanslia/fi/julkaisut-ja-kuulutukset/julkaisut/helsingin-henki'>http://www.hel.fi/www/kanslia/fi/julkaisut-ja-kuulutukset/julkaisut/helsingin-henki</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hengitys = {
    id: "lehdet_hengitys",
    title: "Hengitys",
    description: "Hengitys (2/2012 - 2-3/2016)<br/>Sisältää lehden kotisivuilla 2016 syksyllä ladattavissa olevat artikkelit.<br/>Julkaisija: Hengitysliitto<br/>Kotisivu: <a href='http://www.hengitysliitto.fi/Julkaisut/Hengitys-lehti/#'>http://www.hengitysliitto.fi/Julkaisut/Hengitys-lehti/#</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_heppu = {
    id: "lehdet_heppu",
    title: "Heppu",
    description: "Heppu (2011-3/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Heppu_2011-3_2016_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Pääkaupunkiseudun Partiolaiset ry<br/>Kotisivu: <a href='http://www.paakaupunkiseudunpartiolaiset.fi/tietoa-meista/julkaisut/'>http://www.paakaupunkiseudunpartiolaiset.fi/tietoa-meista/julkaisut/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hima = {
    id: "lehdet_hima",
    title: "Hima",
    description: "Hima (3/2013-1/2016)<br/>Julkaisija: Helsingin kaupungin asunnot Oy<br/>Kotisivu: <a href='http://www.hekaoy.fi/asukaslehti-hima'>http://www.hekaoy.fi/asukaslehti-hima</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_huili = {
    id: "lehdet_huili",
    title: "Huili",
    description: "Huili-lehti (2-3/2013)<br/>Kotisivu: <a href='http://www.huililehti.net/'>http://www.huililehti.net/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_humanistilehti = {
    id: "lehdet_humanistilehti",
    title: "Humanistilehti",
    description: "Humanistilehti (2002-2010)<br/>Julkaisija: Helsingin Yliopiston Humanistinen tiedekunta<br/>Kotisivu: <a href='http://www.helsinki.fi/humanistilehti/pdf/index.htm'>http://www.helsinki.fi/humanistilehti/pdf/index.htm</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_jane_paulo = {
    id: "lehdet_jane_paulo",
    title: "Jane&Paulo",
    description: "Jane&Paulo (2012-2015)<br/>Julkaisija: Sosiaalialan korkeakoulutettujen ammattijärjestö Talentia ry<br/>Kotisivu: <a href='http://talentia.e-julkaisu.com/julkaisut/'>http://talentia.e-julkaisu.com/julkaisut/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_joensuun_uutiset = {
    id: "lehdet_joensuun_uutiset",
    title: "Joensuun Uutiset",
    description: "Joensuun Uutiset (2012-2013)<br/>Julkaisija: Joensuun kaupunki<br/>Kotisivu: <a href='http://www.joensuu.fi/joensuunuutisetvanha'>http://www.joensuu.fi/joensuunuutisetvanha</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_julkaisija = {
    id: "lehdet_julkaisija",
    title: "Julkaisija",
    description: "Julkaisija (2011-2014)<br/>Julkaisija: RPS Markkinointi Oy / RPS-yhtiöt<br/>Kotisivu: <a href='http://www.julkaisija.fi/lehti/'>http://www.julkaisija.fi/lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kalastuslehti = {
    id: "lehdet_kalastuslehti",
    title: "Kalastuslehti",
    description: "Kalastuslehti (2013-3/2015)<br/>Julkaisija: Krook Media Oy<br/>Kotisivu: <a href='http://www.kalamies.com/kalastus-media-video-netzine-tv-audio/kalastuslehti'>http://www.kalamies.com/kalastus-media-video-netzine-tv-audio/kalastuslehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_karhunpalvelus = {
    id: "lehdet_karhunpalvelus",
    title: "Karhunpalvelus",
    description: "Karhunpalvelus (2002-2015)<br/>Julkaisija: Porin kaupunki<br/>Kotisivu: <a href='http://www.pori.fi/henkilostopalvelut/karhunpalvelus.html'>http://www.pori.fi/henkilostopalvelut/karhunpalvelus.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kauppapolitiikka = {
    id: "lehdet_kauppapolitiikka",
    title: "Kauppapolitiikka",
    description: "Kauppapolitiikka (2013-1/2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Kauppapolitiikka_2013-1_2015_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Ulkoasiainministeriö<br/>Kotisivu: <a href='http://kauppapolitiikka.fi/tietoa-lehdesta/'>http://kauppapolitiikka.fi/tietoa-lehdesta/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kaupunkilainen = {
    id: "lehdet_kaupunkilainen",
    title: "Kaupunkilainen",
    description: "Kaupunkilainen (2/2012-1/2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Kaupunkilainen_2_2012-1_2015_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Lahden kaupunki<br/>Kotisivu: <a href='https://www.lahti.fi/tietoa-lahdesta/Lahti-info/kaupunkilainen-lehti'>https://www.lahti.fi/tietoa-lahdesta/Lahti-info/kaupunkilainen-lehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kaytannon_maamies = {
    id: "lehdet_kaytannon_maamies",
    title: "Käytännön maamies",
    description: "Käytännön maamies (2000-2013)<br/>Julkaisija: Agraari Oy<br/>Kotisivu: <a href='http://kaytannonmaamies.fi/'>http://kaytannonmaamies.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kemia_kemi = {
    id: "lehdet_kemia_kemi",
    title: "Kemia-Kemi",
    description: "Kemia-Kemi (2002-4/2016)<br/>Julkaisijat: Suomalaisten Kemistien Seura, Kemiallisteknillisen yhdistys ja Finska Kemistsamfundet<br/>Kotisivu: <a href='http://www.kemia-lehti.fi/nakoislehdet/'>http://www.kemia-lehti.fi/nakoislehdet/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kemilainen = {
    id: "lehdet_kemilainen",
    title: "Kemiläinen",
    description: "Kemiläinen (2012-1/2016)<br/>Julkaisija: Kemin kaupunki<br/>Kotisivu: <a href='http://www.kemi.fi/palvelut/viestinta/kemin-kaupungin-tiedotuslehti/'>http://www.kemi.fi/palvelut/viestinta/kemin-kaupungin-tiedotuslehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kontakt = {
    id: "lehdet_kontakt",
    title: "Kontakt",
    description: "Kontakt (2010-2013)<br/>Julkaisija: Suomi-Venäjä-Seura<br/>Kotisivu: <a href='http://www.venajaseura.com/etusivu/yhteystiedot/kontakt-jasenlehti'>http://www.venajaseura.com/etusivu/yhteystiedot/kontakt-jasenlehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_koti = {
    id: "lehdet_koti",
    title: "Koti",
    description: "Koti (2012-2014)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Koti_2012-2014_-aineiston_numerot.docx'>Luettelo aineiston sisältämistä numeroista</a><br/>Julkaisija: Maa- ja kotitalousnaisten Keskus<br/>Kotisivu: <a href='https://www.maajakotitalousnaiset.fi/kotijamaaseutu'>https://www.maajakotitalousnaiset.fi/kotijamaaseutu</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kotipuutarha = {
    id: "lehdet_kotipuutarha",
    title: "Kotipuutarha",
    description: "Kotipuutarha (2009-2014)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Kotipuutarha_2009-2014_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Kotipuutarha Puutarhaliitto<br/>Kotisivu: <a href='http://www.kotipuutarha.fi/lehti.html'>http://www.kotipuutarha.fi/lehti.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kumposti = {
    id: "lehdet_kumposti",
    title: "Kumposti",
    description: "Kumposti (2005-1/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Kumposti_2005-1_2016_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Kumpula-seura ry<br/>Kotisivu: <a href='http://kumpula.info/kumposti'>http://kumpula.info/kumposti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kunnallissuomi = {
    id: "lehdet_kunnallissuomi",
    title: "KunnallisSuomi",
    description: "KunnallisSuomi (2010-2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/KunnallisSuomi_2010-2013_-aineiston_numerot.txt'>Luettelo aineiston sisältämistä numeroista</a><br/>Julkaisija: Suomiviesti Oy<br/>Kotisivu: <a href='http://www.suomiviesti.fi/home/KunnllisSuomi/'>http://www.suomiviesti.fi/home/KunnllisSuomi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};


settings.corpora.lehdet_kuuloset = {
    id: "lehdet_kuuloset",
    title: "Kuuloset",
    description: "Kuuloset (4/2004-2013)<br/>Julkaisija: Helsingin Kuuloyhdistys ry<br/>Kotisivu: <a href='http://www.helky.fi/kuuloset/arkisto/'>http://www.helky.fi/kuuloset/arkisto/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kynnys = {
    id: "lehdet_kynnys",
    title: "Kynnys",
    description: "Kynnys (2010-2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Kynnys_2010-2013_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Kynnys ry<br/>Kotisivu: <a href='http://kynnys.fi/viestinta/kynnys-lehdet/'>http://kynnys.fi/viestinta/kynnys-lehdet/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_lapsenmaailma = {
    id: "lehdet_lapsenmaailma",
    title: "Lapsen Maailma",
    description: "Lapsen Maailma (3/2014)<br/>Julkaisija: Lastensuojelun Keskusliitto<br/>Kotisivu: <a href='http://lapsenmaailma.fi/arkisto/'>http://lapsenmaailma.fi/arkisto/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_legenda = {
    id: "lehdet_legenda",
    title: "Legenda",
    description: "Legenda (2002-2015)<br/>Julkaisija: Teema ry<br/>Kotisivu: <a href='http://teemary.org/?page_id=750'>http://teemary.org/?page_id=750</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_luokanopettaja = {
    id: "lehdet_luokanopettaja",
    title: "Luokanopettaja",
    description: "Luokanopettaja (3/2006-2/2015)<br/>Julkaisija: Suomen Luokanopettajat ry<br/>Kotisivu: <a href='http://www.luokanopettajaliitto.fi/index.php/luokanopettaja-lehti/lehdet'>http://www.luokanopettajaliitto.fi/index.php/luokanopettaja-lehti/lehdet</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_luuppisanomat = {
    id: "lehdet_luuppisanomat",
    title: "Luuppisanomat",
    description: "Luuppisanomat (1997-2013)<br/>Julkaisija: Luuppi ry<br/>Kotisivu: <a href='https://www.luuppi.fi/julkaisut'>https://www.luuppi.fi/julkaisut</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_me = {
    id: "lehdet_me",
    title: "Me",
    description: "Me (2014, 4/2015 - 6-7/2016)<br/>Julkaisija: Suomen Lähikauppa Oy<br/>Kotisivu: <a href='http://epaper.hansaprint.fi/melehti/Me-lehti.html'>http://epaper.hansaprint.fi/melehti/Me-lehti.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_mercurius = {
    id: "lehdet_mercurius",
    title: "Mercurius",
    description: "Mercurius (2004-3/2012)<br/>Julkaisija: Turun yliopiston kauppakorkeakoulu<br/>Kotisivu: <a href='http://www.utu.fi/fi/yksikot/tse/ajankohtaista/mercurius/Sivut/home.aspx'>http://www.utu.fi/fi/yksikot/tse/ajankohtaista/mercurius/Sivut/home.aspx</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_modin = {
    id: "lehdet_modin",
    title: "MODIN",
    description: "MODIN (2012-3/2015)<br/>Julkaisija: Muotikaupan Liitto<br/>Kotisivu: <a href='http://www.muotikaupanliitto.fi/modin/'>http://www.muotikaupanliitto.fi/modin/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_musetti = {
    id: "lehdet_musetti",
    title: "Musetti",
    description: "Musetti (2/2013-2/2015)<br/>Julkaisijat: Suomen Etnomusikologisen Seura ja Suomen Musiikkitieteellisen Seura<br/>Kotisivu: <a href='http://www.etnomusikologia.fi/p/musetti.html'>http://www.etnomusikologia.fi/p/musetti.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_nonsordino = {
    id: "lehdet_nonsordino",
    title: "NonSordino",
    description: "NonSordino (2006-1/2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/NonSordino_2006-1_2015_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Markkinointiviestinnän, -tutkimuksen ja digimedia-alan ammattilaiset MaMa ry<br/>Kotisivu: <a href='http://digimama.fi/digimama-jasenlehti/'>http://digimama.fi/digimama-jasenlehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ollaviiskytviisplus = {
    id: "lehdet_ollaviiskytviisplus",
    title: "OLLA55+",
    description: "OLLA55+ (1/2014)<br/>Julkaisija: BM media Oy<br/>Kotisivu: <a href=''></a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_omakotisanomat = {
    id: "lehdet_omakotisanomat",
    title: "Omakotisanomat",
    description: "Omakotisanomat (2011-2015)<br/>Julkaisija: Rakennustutkimus RTS Oy<br/>Kotisivu: <a href='http://www.suomirakentaa.fi/valintaoppaat/omakotisanomat'>http://www.suomirakentaa.fi/valintaoppaat/omakotisanomat</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ota_opiksi = {
    id: "lehdet_ota_opiksi",
    title: "Ota opiksi",
    description: "Ota opiksi (2012-2015)<br/>Julkaisija: Suomen Kansanopistoyhdistys ry<br/>Kotisivu: <a href='http://kansanopistot.fi/yhdistys/?linkki=19'>http://kansanopistot.fi/yhdistys/?linkki=19</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pakolainen = {
    id: "lehdet_pakolainen",
    title: "Pakolainen",
    description: "Pakolainen (2010-2014)<br/>Julkaisija: Suomen Pakolaisapu ry<br/>Kotisivu: <a href='http://pakolaisapu.fi/tag/pakolainen-lehti/'>http://pakolaisapu.fi/tag/pakolainen-lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_paraisten_kuulutukset = {
    id: "lehdet_paraisten_kuulutukset",
    title: "Paraisten Kuulutukset",
    description: "Paraisten Kuulutukset (4.1.-30.5.2013)<br/>Julkaisija: Förlags Ab Sydvästkusten<br/>Kotisivu: <a href='http://www.lehtiluukku.fi/lehti/paraisten-kuulutukset'>http://www.lehtiluukku.fi/lehti/paraisten-kuulutukset</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pelastusalan_ammattilainen = {
    id: "lehdet_pelastusalan_ammattilainen",
    title: "Pelastusalan ammattilainen",
    description: "Pelastusalan ammattilainen (2007-2014)<br/>Julkaisija: Suomen Palomiesliitto SPAL ry<br/>Kotisivu: <a href='http://www.palomiesliitto.fi/'>http://www.palomiesliitto.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url : sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pelastustieto = {
    id: "lehdet_pelastustieto",
    title: "Pelastustieto",
    description: "Pelastustieto (2007-2014)<br/>Julkaisija: Palo- ja pelastustieto ry<br/>Kotisivu: <a href='http://pelastustieto.fi/digilehti/'>http://pelastustieto.fi/digilehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pihlajisto_viikinmaki = {
    id: "lehdet_pihlajisto_viikinmaki",
    title: "Pihlajiston ja Viikinmäen asukaslehti",
    description: "Pihlajiston ja Viikinmäen asukaslehti (2009-2015)<br/>Julkaisija: Pihlajisto-Viikinmäki Asukasyhdistys PNV ry<br/>Kotisivu: <a href='http://kaupunginosat.net/pihlajisto/asukaslehti-mainmenu-891'>http://kaupunginosat.net/pihlajisto/asukaslehti-mainmenu-891</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pippuri = {
    id: "lehdet_pippuri",
    title: "Pippuri",
    description: "Pippuri (2012-2014)<br/>Julkaisija: Vasemmistonaiset<br/>Kotisivu: <a href='http://www.vasemmistonaiset.fi/pippuri-lehti/'>http://www.vasemmistonaiset.fi/pippuri-lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pirkkalainen = {
    id: "lehdet_pirkkalainen",
    title: "Pirkkalainen",
    description: "Pirkkalainen (2006-16/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Pirkkalainen_2006-16_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Pirkkala-Seura ry<br/>Kotisivu: <a href='http://www.pirkkalainen.com/'>http://www.pirkkalainen.com/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pointti = {
    id: "lehdet_pointti",
    title: "Pointti",
    description: "Pointti (2000-2013)<br/>Julkaisija: Porin ylioppilasyhdistys Pointer ry<br/>Kotisivu: <a href='https://porinylioppilaslehti.com/info/'>https://porinylioppilaslehti.com/info/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_poleemi = {
    id: "lehdet_poleemi",
    title: "Poleemi",
    description: "Poleemi (2009-2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Poleemi_2009-2013_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Poliittisen historian opiskelijat Polho ry<br/>Kotisivu: <a href='https://poleemi.wordpress.com/arkisto/'>https://poleemi.wordpress.com/arkisto/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_polemiikki = {
    id: "lehdet_polemiikki",
    title: "Polemiikki",
    description: "Polemiikki (2/2013, 2014-2/2016)<br/>Julkaisija: Pole-Kuntatieto Oy<br/>Kotisivu: <a href='http://kaks.fi/polemiikki-lehti/'>http://kaks.fi/polemiikki-lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_policy = {
    id: "lehdet_policy",
    title: "Policy",
    description: "Policy (2008, 2011-1/2013, 3-4/2015)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> 2016 kesällä ladattavissa olevat artikkelit.<br/>Julkaisija: Valtio-opin opiskelijat ry<br/>Kotisivu: <a href='http://blogs.helsinki.fi/voo-ry/policy/'>http://blogs.helsinki.fi/voo-ry/policy/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_poromies = {
    id: "lehdet_poromies",
    title: "Poromies",
    description: "Poromies (2009-2014)<br/>(aineisto sisältää vain asiatekstit)<br/>Julkaisija: Paliskuntain yhdistys<br/>Kotisivu: <a href='http://paliskunnat.fi/py/organisaatio/poromies-lehti/'>http://paliskunnat.fi/py/organisaatio/poromies-lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_print_media = {
    id: "lehdet_print_media",
    title: "Print&Media",
    description: "Print&Media (2011-2014)<br/>Julkaisija: Print&Media Publishing Oy<br/>Kotisivu: <a href='http://pmlehti.fi/lehti/#lehtiarkisto'>http://pmlehti.fi/lehti/#lehtiarkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pro_etelapohjanmaa = {
    id: "lehdet_pro_etelapohjanmaa",
    title: "Pro Etelä-Pohjanmaa",
    description: "Pro Etelä-Pohjanmaa (2/2012-2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Pro_Etela-Pohjanmaa_2012-2015_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Etelä-Pohjanmaan liitto<br/>Kotisivu: <a href='http://www.epliitto.fi/pro-etela-pohjanmaa--lehti'>http://www.epliitto.fi/pro-etela-pohjanmaa--lehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_promaint_kunnossapito = {
    id: "lehdet_promaint_kunnossapito",
    title: "Promaint/Kunnossapito",
    description: "Kunnossapito (2004-2007), Promaint (2008 - 1-2/2015)<br/>Julkaisija: Kunnossapitoyhdistys Promaint Ry<br/>Kotisivu: <a href='http://www.promaintlehti.fi/Lehtiarkisto'>http://www.promaintlehti.fi/Lehtiarkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_puutarha_sanomat = {
    id: "lehdet_puutarha_sanomat",
    title: "Puutarha-Sanomat",
    description: "Puutarha-Sanomat (2011-5/2015)<br/>Julkaisija: Puutarha-Sanomat<br/>Kotisivu: <a href='http://puutarha-sanomat.fi/arkistot/category/lehtinosto'>http://puutarha-sanomat.fi/arkistot/category/lehtinosto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_sofia = {
    id: "lehdet_sofia",
    title: "Sofia",
    description: "Sofia (2000-1/2016)<br/>Julkaisija: Helsingin kaupunginmuseo<br/>Kotisivu: <a href='http://www.helsinginkaupunginmuseo.fi/sofia-lehti/'>http://www.helsinginkaupunginmuseo.fi/sofia-lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_solidaarisuus = {
    id: "lehdet_solidaarisuus",
    title: "Solidaarisuus",
    description: "Solidaarisuus (2007-2014)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> 2016 kesällä ladattavissa olevat artikkelit.<br/>Julkaisija: Solidaarisuus<br/>Kotisivu: <a href='http://www.solidaarisuus.fi'>http://www.solidaarisuus.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_suomenmaa = {
    id: "lehdet_suomenmaa",
    title: "Suomenmaa",
    description: "Suomenmaa (2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Suomenmaa_2013_-aineiston_numerot.docx'>Luettelo aineiston sisältämistä numeroista</a><br/>Julkaisija: Suomenmaa<br/>Kotisivu: <a href='http://www.suomenmaa.fi/'>http://www.suomenmaa.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_sydan_hameen_lehti = {
    id: "lehdet_sydan_hameen_lehti",
    title: "Sydän-Hämeen Lehti",
    description: "Sydän-Hämeen Lehti (2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Sydan-Hameen_Lehti_2013_-aineiston_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Sydän-Hämeen Kustannus Oy<br/>Kotisivu: <a href='http://shl.fi/nakoislehdet/'>http://shl.fi/nakoislehdet/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_taku = {
    id: "lehdet_taku",
    title: "TAKU",
    description: "TAKU (2000-1/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/TAKU_2000-1_2016_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Taide- ja kulttuurialan ammattijärjestö TAKU ry<br/>Kotisivu: <a href='http://www.taku.fi/ajankohtaista/taku-lehti'>http://www.taku.fi/ajankohtaista/taku-lehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_taloustaito = {
    id: "lehdet_taloustaito",
    title: "Taloustaito",
    description: "Taloustaito (2009-2013)<br/>Julkaisija: Verotieto Oy<br/>Kotisivu: <a href='https://www.taloustaito.fi/teemat/lehti/'>https://www.taloustaito.fi/teemat/lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_infront = {
    id: "lehdet_infront",
    title: "inFront",
    description: "inFront (3/2009-1/2014)<br/>Julkaisija: EXPORT Finland<br/>Kotisivu: <a href='http://www.exportfinland.fi/infront'>http://www.exportfinland.fi/infront</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tek_verkkolehti = {
    id: "lehdet_tek_verkkolehti",
    title: "TEK verkkolehti",
    description: "TEK verkkolehti (7/2012-6/2013, 1/2015, 5/2015)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> 2016 kesällä ladattavissa olevat artikkelit.<br/>Julkaisija: Tekniikan Akateemiset TEK<br/>Kotisivu: <a href='https://lehti.tek.fi/'>https://lehti.tek.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_terveydeksi = {
    id: "lehdet_terveydeksi",
    title: "Terveydeksi!",
    description: "Terveydeksi! (2/2014, 4/2014)<br/>Julkaisija: Apteekkariliiton viestintäyhtiö PharmaPress Oy<br/>Kotisivu: <a href='http://www.apteekki.fi/terveydeksi.html'>http://www.apteekki.fi/terveydeksi.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_toimi = {
    id: "lehdet_toimi",
    title: "Toimi",
    description: "Toimi (2009-2014)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Toimi_2009-2014_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Erityisalojen Toimihenkilöliitto ERTO ry<br/>Kotisivu: <a href='https://www.erto.fi/palvelut/toimi-lehti'>https://www.erto.fi/palvelut/toimi-lehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tukilinja = {
    id: "lehdet_tukilinja",
    title: "Tukilinja",
    description: "Tukilinja (2010-2014)<br/>Julkaisija: Vammaisten koulutuksen ja työllistymisen tuki ry<br/>Kotisivu: <a href='http://www.tukilinja.fi/tukilinja-lehti/'>http://www.tukilinja.fi/tukilinja-lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tukiviesti = {
    id: "lehdet_tukiviesti",
    title: "Tukiviesti",
    description: "Tukiviesti (6/2010-1/2014)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Tukiviesti_6_2010-1_2014_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Kehitysvammaisten Tukiliitto ry<br/>Kotisivu: <a href='http://www.kvtl.fi/fi/tukiviesti-ja-leija/tukiviesti/'>http://www.kvtl.fi/fi/tukiviesti-ja-leija/tukiviesti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_turkuposti = {
    id: "lehdet_turkuposti",
    title: "Turkuposti",
    description: "Turkuposti & Turkupostin liitteet (2011-1/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Turkuposti__Turkupostin_liitteet_2011-1_2016_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Turun kaupunki<br/>Kotisivu: <a href='https://www.turku.fi/turku-tieto/julkaisut-ja-raportit/turkupostin-arkisto'>https://www.turku.fi/turku-tieto/julkaisut-ja-raportit/turkupostin-arkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tutkain = {
    id: "lehdet_tutkain",
    title: "Tutkain",
    description: "Tutkain (2010-2/2014)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Tutkain_2010-2_2014_-aineistosta_puuttuvat_numerot.docx'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Tiedekunnan opiskelijajärjestö Kannunvalajat ry<br/>Kotisivu: <a href='http://www.kannunvalajat.fi/tutkain/'>http://www.kannunvalajat.fi/tutkain/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};



settings.corpora.lehdet_ubik = {
    id: "lehdet_ubik",
    title: "Ubik",
    description: "Ubik (2012-3/2013)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> 2016 kesällä ladattavissa olevat artikkelit.<br/>Julkaisija: Suomen Ammattiin Opiskelevien Liitto – SAKKI ry<br/>Kotisivu: <a href='http://ubik.fi/nakoislehdet/'>http://ubik.fi/nakoislehdet/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uljas = {
    id: "lehdet_uljas",
    title: "Uljas",
    description: "Uljas (2014-4/2016)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> 2016 kesällä ladattavissa olevat artikkelit.<br/>Julkaisija: Itä-Suomen yliopiston ylioppilaskunta<br/>Kotisivu: <a href='http://www.uljas.net/lehdet/'>http://www.uljas.net/lehdet/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uniikki = {
    id: "lehdet_uniikki",
    title: "UNIIKKI",
    description: "UNIIKKI (2014-3/2015)<br/>Julkaisija: Yliopiston Apteekki<br/>Kotisivu: <a href='http://uniikki.fi/'>http://uniikki.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_universitas = {
    id: "lehdet_universitas",
    title: "Universitas",
    description: "Universitas (2012-2/2016)<br/>Julkaisija: Yliopistojen ja tutkimusalan henkilöstöliitto YHL<br/>Kotisivu: <a href='http://www.pardia.fi/yhl-etusivu/viestinta/universitas/'>http://www.pardia.fi/yhl-etusivu/viestinta/universitas/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_utain = {
    id: "lehdet_utain",
    title: "Utain",
    description: "Utain (2002-2013)<br/>Julkaisija: Viestinnän, median ja teatterin yksikkö, Tampereen yliopisto<br/>Kotisivu: <a href='http://utain.uta.fi/'>http://utain.uta.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uusiouutiset = {
    id: "lehdet_uusiouutiset",
    title: "Uusiouutiset",
    description: "Uusiouutiset - Suomen kiertotalouden erikoislehti (2005-2015)<br/>Kotisivu: <a href='http://www.uusiouutiset.fi/'>http://www.uusiouutiset.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uusipaiva = {
    id: "lehdet_uusipaiva",
    title: "Uusi Päivä",
    description: "Uusi Päivä (2011-2015)<br/>Julkaisija: Turun Vasemmistoliitto ry<br/>Kotisivu: <a href='http://www.turunvasemmisto.fi/19'>http://www.turunvasemmisto.fi/19</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uutis_jousi = {
    id: "lehdet_uutis_jousi",
    title: "Uutis-Jousi",
    description: "Uutis-Jousi (2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Uutis-Jousi_2013_-aineiston_numerot.txt'>Luettelo aineiston sisältämistä numeroista</a><br/>Julkaisija: Keskisuomalainen Oyj<br/>Kotisivu: <a href='http://www.uutis-jousi.fi/nakoislehti/'>http://www.uutis-jousi.fi/nakoislehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vaasan_ylioppilaslehti = {
    id: "lehdet_vaasan_ylioppilaslehti",
    title: "Vaasan Ylioppilaslehti",
    description: "Vaasan Ylioppilaslehti (5/2012-5/2013)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> 2016 kesällä ladattavissa olevat artikkelit.<br/>Julkaisija: Vaasan yliopiston ylioppilaskunta<br/>Kotisivu: <a href='http://www.vaasanylioppilaslehti.fi/'>http://www.vaasanylioppilaslehti.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_valitysuutiset = {
    id: "lehdet_valitysuutiset",
    title: "VälitysUutiset",
    description: "VälitysUutiset (2012-2013)<br/>Julkaisija: Kirjavälitys Oy<br/>Kotisivu: <a href='http://www.kirjavalitys.fi/'>http://www.kirjavalitys.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vammaisurheilu = {
    id: "lehdet_vammaisurheilu",
    title: "Vammaisurheilu & -liikunta",
    description: "Vammaisurheilu & -liikunta (2010-1/2016)<br/>Julkaisija: Suomen Vammaisurheilu ja -liikunta VAU ry<br/>Kotisivu: <a href='http://www.vammaisurheilu.fi/mika-on-vau/lehti/lehtiarkisto'>http://www.vammaisurheilu.fi/mika-on-vau/lehti/lehtiarkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vanhustyo = {
    id: "lehdet_vanhustyo",
    title: "Vanhustyö",
    description: "Vanhustyö (2009-2015)<br/>Julkaisija: Vanhustyön keskusliitto<br/>Kotisivu: <a href='http://www.vtkl.fi/fin/vaikutamme/vanhustyo_lehti/tutustu_lehteen/'>http://www.vtkl.fi/fin/vaikutamme/vanhustyo_lehti/tutustu_lehteen/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vankilavirkailija = {
    id: "lehdet_vankilavirkailija",
    title: "Vankilavirkailija",
    description: "Vankilavirkailija (2009-3/2011)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> 2016 kesällä ladattavissa olevat artikkelit.<br/>Julkaisija: Vankilavirkailijain Liitto VVL r.y.<br/>Kotisivu: <a href='http://www.vankilavirkailija.fi/lehdet'>http://www.vankilavirkailija.fi/lehdet</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vantaan_akseli = {
    id: "lehdet_vantaan_akseli",
    title: "Vantaan Akseli",
    description: "Vantaan Akseli (2009-1/2013)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> 2016 kesällä ladattavissa olevat artikkelit.<br/>Julkaisija: Vantaan Akselin kehitysryhmä<br/>Kotisivu: <a href='www.vantaanakseli.fi'>www.vantaanakseli.fi</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_via = {
    id: "lehdet_via",
    title: "Via",
    description: "Via (3/2013-3/2014)<br/>Julkaisija: Destia Oy<br/>Kotisivu: <a href='http://www.destia.fi/uutishuone/julkaisut/vian-arkisto.html'>http://www.destia.fi/uutishuone/julkaisut/vian-arkisto.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tatsi = {
    id: "lehdet_tatsi",
    title: "Tatsi",
    description: "Tatsi (2011-1/2016)<br/>Julkaisija: Työttömien ay-jäsenten tukiyhdistys ry<br/>Kotisivu: <a href='http://tatsi.org/tatsi-lehti/arkisto/'>http://tatsi.org/tatsi-lehti/arkisto/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tiedetoimittaja = {
    id: "lehdet_tiedetoimittaja",
    title: "Tiedetoimittaja",
    description: "Tiedetoimittaja (2008-2013)<br/>Julkaisija: Suomen tiedetoimittajain liitto ry<br/>Kotisivu: <a href='http://www.tiedetoimittajat.fi/tiedetoimittajalehti/tiedetoimittajat-arkisto/'>http://www.tiedetoimittajat.fi/tiedetoimittajalehti/tiedetoimittajat-arkisto/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_elamassa_kelansanomat = {
    id: "lehdet_elamassa_kelansanomat",
    title: "Elämässä/Kelan sanomat",
    description: "Kelan sanomat (2008), Elämässä (2009-2014)<br/>Julkaisija: Kansaneläkelaitos (Kela)<br/>Kotisivu: <a href='http://www.kela.fi/elamassa'>http://www.kela.fi/elamassa</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};



settings.corpora.lehdet_sosiaalivakuutus = {
    id: "lehdet_sosiaalivakuutus",
    title: "Sosiaalivakuutus",
    description: "Sosiaalivakuutus (2006-2010, 2015-2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Sosiaalivakuutus_2006_-_2010_2015_-_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Kansaneläkelaitos (Kela)<br/>Kotisivu: <a href='http://www.kela.fi/sosiaalivakuutus'>http://www.kela.fi/sosiaalivakuutus</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_cplehti = {
    id: "lehdet_cplehti",
    title: "CP-lehti",
    description: "CP-lehti (2010-1/2014)<br/>Julkaisija: Suomen CP-liitto ry<br/>Kotisivu: <a href='http://www.cp-liitto.fi/suomen_cp-liitto_ry/cp-lehti/arkisto'>http://www.cp-liitto.fi/suomen_cp-liitto_ry/cp-lehti/arkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_edimensio = {
    id: "lehdet_edimensio",
    title: "eDimensio",
    description: "eDimensio (2008-2013)<br/>Julkaisija: Matemaattisten aineiden opettajien liitto MAOL ry<br/>Kotisivu: <a href='http://www.maol.fi/julkaisut/edimensio/arkisto/?L=gdesjgsatmavb'>http://www.maol.fi/julkaisut/edimensio/arkisto/?L=gdesjgsatmavb</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_effortti = {
    id: "lehdet_effortti",
    title: "Effortti",
    description: "Effortti (2010-2016)<br/>Julkaisija: Suomen Tanssiterapiayhdistys ry<br/>Kotisivu: <a href='http://www.tanssiterapia.net/index.php?page=31'>http://www.tanssiterapia.net/index.php?page=31</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_helsinki_info = {
    id: "lehdet_helsinki_info",
    title: "Helsinki-info",
    description: "Helsinki-info (4/2004-3/2016)<br/>Julkaisija: Helsingin kaupunki<br/>Kotisivu: <a href='http://www.hel.fi/www/kanslia/helsinkiinfo-fi/arkisto/'>http://www.hel.fi/www/kanslia/helsinkiinfo-fi/arkisto/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hervannan_sanomat = {
    id: "lehdet_hervannan_sanomat",
    title: "Hervannan Sanomat",
    description: "Hervannan Sanomat (47/2012-9/2016)<br/>Julkaisija: Hervannan Sanomat<br/>Kotisivu: <a href='http://hervannansanomat.fi/nakoislehti/'>http://hervannansanomat.fi/nakoislehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hopealeijona = {
    id: "lehdet_hopealeijona",
    title: "Hopealeijona",
    description: "Hopealeijona (2/2003-2007)<br/>Julkaisija: Suomen Heraldinen Seura<br/>Kotisivu: <a href='http://www.heraldica.fi/Julkaisut/Hopea_leijona/hopealeijona.htm'>http://www.heraldica.fi/Julkaisut/Hopea_leijona/hopealeijona.htm</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hyva_asukas = {
    id: "lehdet_hyva_asukas",
    title: "Hyvä Asukas",
    description: "Hyvä Asukas (2012-3/2016)<br/>Julkaisija: Nokian kaupunki<br/>Kotisivu: <a href='http://www.nokiankaupunki.fi/kuntainfo/hallinto/viestinta/tiedotuslehti/'>http://www.nokiankaupunki.fi/kuntainfo/hallinto/viestinta/tiedotuslehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_impakti = {
    id: "lehdet_impakti",
    title: "Impakti",
    description: "Impakti (1995-1/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Impakti_1995-1_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Yva ry<br/>Kotisivu: <a href='http://www.yvary.fi/arkisto/impakti/'>http://www.yvary.fi/arkisto/impakti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_infors = {
    id: "lehdet_infors",
    title: "INFORS",
    description: "INFORS (1998-2016)<br/>Julkaisija: Suomen Operaatiotutkimusseura ry<br/>Kotisivu: <a href='http://www.operaatiotutkimus.fi/infors.html'>http://www.operaatiotutkimus.fi/infors.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_jargonia = {
    id: "lehdet_jargonia",
    title: "J@rgonia",
    description: "J@rgonia (2003-2016)<br/>Julkaisija: Historian ja etnologian laitoksen tutkijat ry<br/>Kotisivu: <a href='http://research.jyu.fi/jargonia/arkisto.shtml'>http://research.jyu.fi/jargonia/arkisto.shtml</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kalpa = {
    id: "lehdet_kalpa",
    title: "Kalpa",
    description: "Kalpa (2006-1/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Kalpa_2006-1_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Kadettioppilaskunta ry (KOK)<br/>Kotisivu: <a href='https://kadettitoverikunta.fi/index.htm?nav=kalpa&lang=fi'>https://kadettitoverikunta.fi/index.htm?nav=kalpa&lang=fi</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kansanopisto = {
    id: "lehdet_kansanopisto",
    title: "Kansanopisto",
    description: "Kansanopisto (2004-2011)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Kansanopisto_2004-2011_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Suomen Kansanopistoyhdistys<br/>Kotisivu: <a href='http://www.kansanopistot.fi/lehti/'>http://www.kansanopistot.fi/lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_karhunkierros = {
    id: "lehdet_karhunkierros",
    title: "Karhunkierros",
    description: "Karhunkierros (1990-2/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Karhunkierros_1990-2_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Satakuntalainen Osakunta<br/>Kotisivu: <a href='https://www.satakuntalainenosakunta.fi/fi/osakunta/karhunkierros/'>https://www.satakuntalainenosakunta.fi/fi/osakunta/karhunkierros/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kehittaja = {
    id: "lehdet_kehittaja",
    title: "Kehittäjä",
    description: "Kehittäjä (2/2005-2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Kehittaja_2_2005-2015_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Laurea-ammattikorkeakoulu Oy<br/>Kotisivu: <a href='https://www.laurea.fi/tutkimus-kehitys-ja-innovaatiot/tutustu-kehittaja-lehteen'>https://www.laurea.fi/tutkimus-kehitys-ja-innovaatiot/tutustu-kehittaja-lehteen</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kerberos = {
    id: "lehdet_kerberos",
    title: "Kerberos",
    description: "Kerberos (2000-2/2010)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Kerberos_2000-2_2010_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Kerberos<br/>Kotisivu: <a href='http://www.kolhoosi.fi/kerberos/vanhat.html'>http://www.kolhoosi.fi/kerberos/vanhat.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_keski_espoon_sanomat = {
    id: "lehdet_keski_espoon_sanomat",
    title: "Keski-Espoon Sanomat",
    description: "Keski-Espoon Sanomat (1/1990, 2001-2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Keski-Espoon_sanomat_1_1990_2001-2015_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Keski-Espoo-seura ry<br/>Kotisivu: <a href='http://www.keskiespooseura.fi/arkisto'>http://www.keskiespooseura.fi/arkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_keva = {
    id: "lehdet_keva",
    title: "Keva",
    description: "Keva (2010-2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Keva_2010-2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Keva<br/>Kotisivu: <a href='https://www.keva.fi/tama-on-keva/keva-lehti/'>https://www.keva.fi/tama-on-keva/keva-lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kide = {
    id: "lehdet_kide",
    title: "KIDE",
    description: "KIDE (4/2008-2009, 2012-3/2016)<br/>Julkaisija: Pääkaupunkiseudun Diabetesyhdistys ry<br/>Kotisivu: <a href='http://www.psdiabetes.fi/kide-jasenlehti/'>http://www.psdiabetes.fi/kide-jasenlehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};



settings.corpora.lehdet_aromi = {
    id: "lehdet_aromi",
    title: "Aromi",
    description: "Aromi - Ruoan ja Juoman Ammattilehti (2006-2013)<br/>Julkaisija: Mediatalo Keskisuomalainen Oyj Aikakauslehtiryhmä<br/>Kotisivu: <a href='http://aromilehti.fi/'>http://aromilehti.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_avec = {
    id: "lehdet_avec",
    title: "Avec",
    description: "Avec (2006-2013)<br/>Julkaisija: Mediatalo Keskisuomalainen Oyj Aikakauslehtiryhmä<br/>Kotisivu: <a href='http://aromilehti.fi'>http://aromilehti.fi</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora["lehdet_avec_perhelehti"] = {
    id: "lehdet_avec_perhelehti",
    title: "Avec – Paremman avioliiton perhelehti",
    description: "Avec – Paremman avioliiton perhelehti (2005-2016)<br/>Julkaisija: Parempi avioliitto ry<br/>Kotisivu: <a href='www.parempiavioliitto.fi/'>www.parempiavioliitto.fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};





settings.corpora.lehdet_poromies = {
    id: "lehdet_poromies",
    title: "Poromies",
    description: "Poromies (2009-2014)<br/>(aineisto sisältää vain asiatekstit)<br/>Julkaisija: Paliskuntain yhdistys<br/>Kotisivu: <a href='http://paliskunnat.fi/py/organisaatio/poromies-lehti/'>http://paliskunnat.fi/py/organisaatio/poromies-lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_promaint_kunnossapito = {
    id: "lehdet_promaint_kunnossapito",
    title: "Promaint/Kunnossapito",
    description: "Kunnossapito (2004-2007), Promaint (2008 - 1-2/2015)<br/>Julkaisija: Kunnossapitoyhdistys Promaint Ry<br/>Kotisivu: <a href='http://www.promaintlehti.fi/Lehtiarkisto'>http://www.promaintlehti.fi/Lehtiarkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kirjo = {
    id: "lehdet_kirjo",
    title: "Kirjo",
    description: "Kirjo (3/2002-2/2007, 3/2010-2/2011)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Kirjo_3_2002-2_2007_3_2010-2_2011_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Kirjallisuus- ja kulttuuriseura Kirjo<br/>Kotisivu: <a href='http://www.palladiumkirjat.fi/kirjo.htm'>http://www.palladiumkirjat.fi/kirjo.htm</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kita = {
    id: "lehdet_kita",
    title: "KITA",
    description: "KITA Kiinteistö & Talotekniikka (2010-2016)<br/>Julkaisija: PubliCo Oy<br/>Kotisivu: <a href='http://www.kita.fi/lehti.html'>http://www.kita.fi/lehti.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_koiviston_viesti = {
    id: "lehdet_koiviston_viesti",
    title: "Koiviston Viesti",
    description: "Koiviston Viesti (2007-9/2015)<br/>Julkaisija: Suomen Koivisto-Seura r.y.<br/>Kotisivu: <a href='http://www.koivistolaiset.net/Sivut/Koiviston%207_lehdet.html'>http://www.koivistolaiset.net/Sivut/Koiviston%207_lehdet.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_koor = {
    id: "lehdet_koor",
    title: "Koor",
    description: "Koor (2/2006-1/2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Koor_2_2006-1_2015_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Suomi-Somalia Seura ry<br/>Kotisivu: <a href='https://suomisomaliaseura.wordpress.com/arkisto/'>https://suomisomaliaseura.wordpress.com/arkisto/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kotosalla = {
    id: "lehdet_kotosalla",
    title: "Kotosalla",
    description: "Kotosalla (2007-2/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Kotosalla_2007-2_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Sallan kunta<br/>Kotisivu: <a href='http://www.salla.fi/Kotosallalehti'>http://www.salla.fi/Kotosallalehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kuljetusyrittaja = {
    id: "lehdet_kuljetusyrittaja",
    title: "Kuljetusyrittäjä",
    description: "Kuljetusyrittäjä (2007-8/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Kuljetusyrittaja_2007-2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: SKAL Kustannus Oy<br/>Kotisivu: <a href='https://www.skal.fi/julkaisut/kuljetusyrittaja-lehti/lehtiarkisto'>https://www.skal.fi/julkaisut/kuljetusyrittaja-lehti/lehtiarkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kumina = {
    id: "lehdet_kumina",
    title: "Kumina",
    description: "Kumina (2006-2013)<br/>Julkaisija: Kuntien asiantuntijat KUMULA ry<br/>Kotisivu: <a href='http://kumula.fi/kumula/kumina/arkisto/'>http://kumula.fi/kumula/kumina/arkisto/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kyvyt_kayttoon_vates = {
    id: "lehdet_kyvyt_kayttoon_vates",
    title: "Kyvyt käyttöön/Vates",
    description: "Vates-info (2005-2/2008), Kyvyt käyttöön (3/2008-2016)<br/>Julkaisija: Vates-säätiö<br/>Kotisivu: <a href='http://www.vates.fi/vates/aineistot/kyvyt-kayttoon-lehdet.html#kk2011asti'>http://www.vates.fi/vates/aineistot/kyvyt-kayttoon-lehdet.html#kk2011asti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_lahde_liikkeelle = {
    id: "lehdet_lahde_liikkeelle",
    title: "Lähde liikkeelle",
    description: "Lähde liikkeelle (2003-1/2014)<br/>Julkaisija: Ammattitutkintoaineiston laadunvarmistus ALVAR<br/>Kotisivu: <a href='http://www.lahdeliikkeelle.info/'>http://www.lahdeliikkeelle.info/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_maailma_kiitotie = {
    id: "lehdet_maailma_kiitotie",
    title: "Maa&Ilma/Kiitotie",
    description: "Kiitotie (2003-1/2006), Maa&Ilma (2/2006-2012)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Kiitotie_2003-1_2006_-aineistosta_puuttuvat_numerot.txt'>Luettelo Kiitotien puuttuvista numeroista</a><br/>Julkaisija: Finavia<br/>Kotisivu: <a href='https://www.finavia.fi/fi/tiedottaminen/arkisto/asiakaslehdet/'>https://www.finavia.fi/fi/tiedottaminen/arkisto/asiakaslehdet/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_materia = {
    id: "lehdet_materia",
    title: "Materia",
    description: "Materia (2010-4/2016)<br/>Julkaisija: Vuorimiesyhdistys - Bergmannaföreningen r.y.<br/>Kotisivu: <a href='http://www.vuorimiesyhdistys.fi/julkaisut/materia'>http://www.vuorimiesyhdistys.fi/julkaisut/materia</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_matkailusilma = {
    id: "lehdet_matkailusilma",
    title: "Matkailusilmä",
    description: "Matkailusilmä (2009-2/2016)<br/>Julkaisija: Visit Finland (Finpro ry)<br/>Kotisivu: <a href='http://www.matkailusilma.fi/digilehdet.html?_ga=1.76810901.1085719173.1461145697'>http://www.matkailusilma.fi/digilehdet.html?_ga=1.76810901.1085719173.1461145697</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_meripelastus = {
    id: "lehdet_meripelastus",
    title: "Meripelastus",
    description: "Meripelastus (2011-3/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Meripelastus_2011-3_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Helsingin Meripelastusyhdistys - Helsingfors Sjöräddningsförening ry<br/>Kotisivu: <a href='http://helsinki.meripelastus.fi/lehti-ja-esitteet'>http://helsinki.meripelastus.fi/lehti-ja-esitteet</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};





settings.corpora.lehdet_merkonomi = {
    id: "lehdet_merkonomi",
    title: "Merkonomi",
    description: "Merkonomi (2007-2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Merkonomi_2007-2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Suomen Merkonomiyhdistysten Liitto - SMYL ry<br/>Kotisivu: <a href='http://www.smyl.fi/wp/merkonominews/'>http://www.smyl.fi/wp/merkonominews/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_minna = {
    id: "lehdet_minna",
    title: "Minna",
    description: "Minna (2/2005-1/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Minna_2_2005-1_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Suomalainen Naisliitto ry<br/>Kotisivu: <a href='http://suomalainennaisliitto.fi/index.php?k=226027'>http://suomalainennaisliitto.fi/index.php?k=226027</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_motiva_mplus_xpress = {
    id: "lehdet_motiva_mplus_xpress",
    title: "Motiva m+/Motiva Xpress",
    description: "Motiva Xpress (2004-2012), Motiva m+ (2013-2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Motiva_m_2013-2016_Motiva_Xpress_2004-2012_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Motiva<br/>Kotisivu: <a href='http://www.motiva.fi/ajankohtaista/m_-lehti'>http://www.motiva.fi/ajankohtaista/m_-lehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_muusikko = {
    id: "lehdet_muusikko",
    title: "Muusikko",
    description: "Muusikko (2005-2012)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Muusikko_2005-2012_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Suomen Muusikkojen Liitto ry<br/>Kotisivu: <a href='http://www.muusikkojenliitto.fi/muusikko/arkisto.html'>http://www.muusikkojenliitto.fi/muusikko/arkisto.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_nakyva_nainen = {
    id: "lehdet_nakyva_nainen",
    title: "Näkyvä Nainen",
    description: "Näkyvä Nainen (2008-3/2014)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Nakyva_nainen_2008-3_2014_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Suomen NNKY-liitto<br/>Kotisivu: <a href='http://www.ywca.fi/jasenlehti/'>http://www.ywca.fi/jasenlehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ostrobotnia = {
    id: "lehdet_ostrobotnia",
    title: "Ostrobotnia",
    description: "Ostrobotnia (3/2003-1/2011, 2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Ostrobotnia__3_2003-1_2011_2015_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Pohjalainen Valtuuskunta<br/>Kotisivu: <a href='http://pv.osakunta.fi/ostro/'>http://pv.osakunta.fi/ostro/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
	text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_oulunkylainen = {
    id: "lehdet_oulunkylainen",
    title: "Oulunkyläinen",
    description: "Oulunkyläinen - Pohjoiset Esikaupungit -lehti (2002-2016)<br/>Julkaisija: Oulunkylä-seura<br/>Kotisivu: <a href='http://www.kaupunginosat.net/oulunkyla/oulunkylainen/oulunkylainen_lehti.htm'>http://www.kaupunginosat.net/oulunkyla/oulunkylainen/oulunkylainen_lehti.htm</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_patria = {
    id: "lehdet_patria",
    title: "Patria",
    description: "Patria (2008-1/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Patria_2008-1_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Patria Oyj<br/>Kotisivu: <a href='http://patria.fi/fi/media/esitteet-ja-julkaisut/patria-lehden-arkisto'>http://patria.fi/fi/media/esitteet-ja-julkaisut/patria-lehden-arkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_perussuomalainen = {
    id: "lehdet_perussuomalainen",
    title: "Perussuomalainen",
    description: "Perussuomalainen (7/2013-10/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Perussuomalainen_7_2013_-_10_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Perussuomalaiset rp<br/>Kotisivu: <a href='https://www.suomenuutiset.fi/lehtiarkisto/'>https://www.suomenuutiset.fi/lehtiarkisto/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pihlajamaki_info = {
    id: "lehdet_pihlajamaki_info",
    title: "Pihlajamäki.info/Pihlajamäen lähiölehti",
    description: "Pihlajamäen lähiölehti (2007-2015), Pihlajamäki.info (2016)<br/>Julkaisija: Pihlajamäki-seura ry<br/>Kotisivu: <a href='http://pihlajamaki.info/pihlajamen-lhilehti-mainmenu-937'>http://pihlajamaki.info/pihlajamen-lhilehti-mainmenu-937</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pirta = {
    id: "lehdet_pirta",
    title: "Pirta",
    description: "Pirta (2012-2016)<br/>Julkaisija: Kalevalaisten Naisten Liitto<br/>Kotisivu: <a href='http://www.kalevalaistennaistenliitto.fi/pirta.html'>http://www.kalevalaistennaistenliitto.fi/pirta.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_plari = {
    id: "lehdet_plari",
    title: "Plari",
    description: "Plari (3/2008-2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Plari_3_2008-2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Helsingin Eteläpohjalaiset ry<br/>Kotisivu: <a href='http://www.helsinginetelapohjalaiset.fi/?cat=13'>http://www.helsinginetelapohjalaiset.fi/?cat=13</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_prointerior = {
    id: "lehdet_prointerior",
    title: "Prointerior",
    description: "Prointerior (2004-2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Prointerior_2004-2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: PubliCo Oy<br/>Kotisivu: <a href='http://www.prointerior.fi/lehti/lehtiarkisto.html'>http://www.prointerior.fi/lehti/lehtiarkisto.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_proresto = {
    id: "lehdet_proresto",
    title: "Proresto",
    description: "Proresto (2011-2016)<br/>Julkaisija: PubliCo Oy<br/>Kotisivu: <a href='http://www.proresto.fi/lehtiarkisto.html'>http://www.proresto.fi/lehtiarkisto.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ruotuvaki = {
    id: "lehdet_ruotuvaki",
    title: "Ruotuväki",
    description: "Ruotuväki (22/2014-21/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Ruotuvaki_2014-2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Puolustusvoimat<br/>Kotisivu: <a href='http://ruotuvaki.fi/lehdet-2016'>http://ruotuvaki.fi/lehdet-2016</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_saariselka = {
    id: "lehdet_saariselka",
    title: "Saariselkä Nyt!",
    description: "Saariselkä Nyt! (2012-2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Saariselka_2012-2013_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Pasi Ruotsalainen<br/>Kotisivu: <a href='http://www.saariselka.net/arkisto.html'>http://www.saariselka.net/arkisto.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_saima = {
    id: "lehdet_saima",
    title: "Saima",
    description: "Saima (2009-2/2013, 3/2015-1/2016)<br/>Julkaisija: Itä-Suomen Yliopisto<br/>Kotisivu: <a href='http://www.uef.fi/fi/saima/arkisto'>http://www.uef.fi/fi/saima/arkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_secretarius = {
    id: "lehdet_secretarius",
    title: "Secretarius",
    description: "Secretarius (4/2012-2013)<br/>Julkaisija: Sihteeriyhdistys ry<br/>Kotisivu: <a href='http://www.sihteeriyhdistys.fi/fi/secretarius-lehti/secretarius-arkisto/?PHPSESSID=70b0d09d2c2dbb7a4826fcd126ce6ecc'>http://www.sihteeriyhdistys.fi/fi/secretarius-lehti/secretarius-arkisto/?PHPSESSID=70b0d09d2c2dbb7a4826fcd126ce6ecc</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_skrolli = {
    id: "lehdet_skrolli",
    title: "Skrolli",
    description: "Skrolli (2012-1/2016)<br/>Julkaisija: Skrolli ry<br/>Kotisivu: <a href='http://skrolli.fi/numerot'>http://skrolli.fi/numerot</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_sosso = {
    id: "lehdet_sosso",
    title: "Sössö",
    description: "Sössö (2003, 2005-2/2016)<br/>Julkaisija: TKK:n Sähköinsinöörikilta ry<br/>Kotisivu: <a href='http://sik.ayy.fi/fi/sosso/'>http://sik.ayy.fi/fi/sosso/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_sukuviesti = {
    id: "lehdet_sukuviesti",
    title: "Sukuviesti",
    description: "Sukuviesti (2005-2015)<br/>Julkaisija: Siposten Sukuseura ry<br/>Kotisivu: <a href='http://www.sipostensukuseura.com/sukuviesti'>http://www.sipostensukuseura.com/sukuviesti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_suomen_historiallinen = {
    id: "lehdet_suomen_historiallinen",
    title: "Suomen historiallisen seuran jäsenlehti",
    description: "Suomen historiallisen seuran jäsenlehti (3/1997-1/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Suomen_historiallisen_seuran_jasenlehti_3_1997-1_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Suomen Historiallinen Seura<br/>Kotisivu: <a href='http://www.histseura.fi/jasenlehtiarkisto.html'>http://www.histseura.fi/jasenlehtiarkisto.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_suomi_puola = {
    id: "lehdet_suomi_puola",
    title: "Suomi–Puola",
    description: "Suomi–Puola Finlandia–Polska (2009-2015)<br/>Julkaisija: Suomi-Puola Yhdistysten Liitto ry<br/>Kotisivu: <a href='http://www.suomi-puola.net/lehti'>http://www.suomi-puola.net/lehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_susikko = {
    id: "lehdet_susikko",
    title: "Susikko",
    description: "Susikko (2010-2/2016)<br/>Sisältää lehden kotisivuilla 2016 keväällä ladattavissa olevat artikkelit<br/>Julkaisija: Metsähistorian Seura ry<br/>Kotisivu: <a href='http://www.metsahistoria.fi/fi/julkaisut/susikko'>http://www.metsahistoria.fi/fi/julkaisut/susikko</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tamk_nyt = {
    id: "lehdet_tamk_nyt",
    title: "TAMK.nyt",
    description: "TAMK.nyt (2/2011-1/2016)<br/>Julkaisija: Tampereen ammattikorkeakoulu<br/>Kotisivu: <a href='http://www.tamk.fi/web/tamk/lehdet-ja-uutiskirjeet'>http://www.tamk.fi/web/tamk/lehdet-ja-uutiskirjeet</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tampere = {
    id: "lehdet_tampere",
    title: "Tampere",
    description: "Tampere (2002-3/2016)<br/>Julkaisija: Tampereen kaupungin viestintäyksikkö<br/>Kotisivu: <a href='http://www.tampere.fi/tampereen-kaupunki/yhteystiedot-ja-asiointi/viestinta/lehdet/tampere-lehti.html'>http://www.tampere.fi/tampereen-kaupunki/yhteystiedot-ja-asiointi/viestinta/lehdet/tampere-lehti.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tampereen_liikuntasanomat = {
    id: "lehdet_tampereen_liikuntasanomat",
    title: "Tampereen liikuntasanomat",
    description: "Tampereen liikuntasanomat (2/2005-3/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Tampereen_liikuntasanomat_2_2005-3_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Tampereen kaupungin liikuntapalvelut<br/>Kotisivu: <a href='http://www.tampere.fi/kulttuuri-ja-vapaa-aika/liikunta/liikuntasanomat.html'>http://www.tampere.fi/kulttuuri-ja-vapaa-aika/liikunta/liikuntasanomat.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tampu = {
    id: "lehdet_tampu",
    title: "Tampu",
    description: "Tampu (2009-1/2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Tampu_2009-2015_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Tampereen puhallinorkesteriyhdistys ry<br/>Kotisivu: <a href='http://www.tampu.fi/index.php?page=jasenlehti'>http://www.tampu.fi/index.php?page=jasenlehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tanhuviesti = {
    id: "lehdet_tanhuviesti",
    title: "Tanhuviesti",
    description: "Tanhuviesti (2009-2016)<br/>Julkaisijat: Suomalaisen Kansantanssin Ystävät ry, Kansantanssinuorten Liitto ry, Pelimannikilta ry<br/>Kotisivu: <a href='https://www.kansantanssinyst.fi/tanhuviesti/'>https://www.kansantanssinyst.fi/tanhuviesti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tanssiurheilija = {
    id: "lehdet_tanssiurheilija",
    title: "Tanssiurheilija",
    description: "Tanssiurheilija (2/2008-3/2016)<br/>Julkaisija: Suomen Tanssiurheiluliitto ry<br/>Kotisivu: <a href='https://www.zerrenlabs.com/client/tanssiurheilija/'>https://www.zerrenlabs.com/client/tanssiurheilija/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_elamantahdet_terve = {
    id: "lehdet_elamantahdet_terve",
    title: "Elämän tähdet/Terve",
    description: "Terve (2005-1/2011), Elämän tähdet (2011-2/2016)<br/>Sisältää lehden kotisivuilla 2016 syksyllä ladattavissa olevat artikkelit<br/>Julkaisija: Pirkanmaan sairaanhoitopiiri<br/>Kotisivu: <a href='http://www.tays.fi/fi-FI/Sairaanhoitopiiri/Sairaanhoitopiirin_julkaisut/Elaman_tahdet'>http://www.tays.fi/fi-FI/Sairaanhoitopiiri/Sairaanhoitopiirin_julkaisut/Elaman_tahdet</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_terve_pirkanmaa = {
    id: "lehdet_terve_pirkanmaa",
    title: "Terve Pirkanmaa",
    description: "Terve Pirkanmaa (2008-2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/TervePirkanmaa_2008-2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Pirkanmaan sairaanhoitopiiri<br/>Kotisivu: <a href='http://www.tays.fi/fi-FI/Sairaanhoitopiiri/Sairaanhoitopiirin_julkaisut/Terve_Pirkanmaa'>http://www.tays.fi/fi-FI/Sairaanhoitopiiri/Sairaanhoitopiirin_julkaisut/Terve_Pirkanmaa</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tervetuloa_jyvaskylaan = {
    id: "lehdet_tervetuloa_jyvaskylaan",
    title: "Tervetuloa Jyväskylään",
    description: "Tervetuloa Jyväskylään (2006-2013)<br/>Julkaisija: Jyväskylän kaupunki<br/>Kotisivu: <a href='http://www.jyvaskyla.fi/asuminen/uusiasukas'>http://www.jyvaskyla.fi/asuminen/uusiasukas</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tietoa_maasta = {
    id: "lehdet_tietoa_maasta",
    title: "Tietoa maasta",
    description: "Tietoa maasta (2004-3/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/TietoaMaasta_2004-3_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Maanmittauslaitos<br/>Kotisivu: <a href='http://www.maanmittauslaitos.fi/tietoa-maasta'>http://www.maanmittauslaitos.fi/tietoa-maasta</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tietoarkisto = {
    id: "lehdet_tietoarkisto",
    title: "Tietoarkisto",
    description: "Tietoarkisto (2000-2004, 2006-2015)<br/>Julkaisija: Yhteiskuntatieteellinen tietoarkisto<br/>Kotisivu: <a href='http://www.fsd.uta.fi/lehti/fi/'>http://www.fsd.uta.fi/lehti/fi/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tiimi = {
    id: "lehdet_tiimi",
    title: "Tiimi",
    description: "Tiimi (2003-2016)<br/>Julkaisija: A-klinikkasäätiö<br/>Kotisivu: <a href='http://www.a-klinikka.fi/tiimi/arkisto'>http://www.a-klinikka.fi/tiimi/arkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};


settings.corpora.lehdet_rautatievirkamies = {
    id: "lehdet_rautatievirkamies",
    title: "Rautatievirkamies",
    description: "Rautatievirkamies (2011-3/2016)<br/>Julkaisija: Rautatievirkamiesliitto r.y.<br/>Kotisivu: <a href='http://www.rautatievirkamiesliitto.fi/fi/ajankohtaista/lehti'>http://www.rautatievirkamiesliitto.fi/fi/ajankohtaista/lehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_toolilainen = {
    id: "lehdet_toolilainen",
    title: "Toolilainen",
    description: "Toolilainen (2009-3/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Toolilainen_2009-3_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Tool ry<br/>Kotisivu: <a href='http://www.tool.fi/toolilainen-lehti/'>http://www.tool.fi/toolilainen-lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tuntosarvi = {
    id: "lehdet_tuntosarvi",
    title: "Tuntosarvi",
    description: "Tuntosarvi (2011-11/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Tuntosarvi_2011-11_2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Suomen Kuurosokeat ry<br/>Kotisivu: <a href='http://www.kuurosokeat.fi/tuntosarvi/tuntosarvi_2011.php'>http://www.kuurosokeat.fi/tuntosarvi/tuntosarvi_2011.php</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tuulivoima_tuulienergia_tuulensilma = {
    id: "lehdet_tuulivoima_tuulienergia_tuulensilma",
    title: "Tuulivoima/Tuulienergia/Tuulensilmä",
    description: "Tuulensilmä (2003 - 2/2008), Tuulienergia (3/2008-2013), Tuulivoima (2014-2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Tuulivoima_2014-2016_Tuulienergia_3_2008-2013_Tuulensilma_2003-2_2008_-puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Suomen Tuulivoimayhdistys ry<br/>Kotisivu: <a href='http://www.tuulivoimayhdistys.fi/lehti/'>http://www.tuulivoimayhdistys.fi/lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uiotus = {
    id: "lehdet_uiotus",
    title: "Uiotus",
    description: "Uiotus (2008-1/2016)<br/>Julkaisija: Uudenmaan Insinööriopiskelijat UIO ry<br/>Kotisivu: <a href='http://uio.fi/palvelutjatoiminta/uiotus/index.dsp'>http://uio.fi/palvelutjatoiminta/uiotus/index.dsp</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_unioni = {
    id: "lehdet_unioni",
    title: "Unioni",
    description: "Unioni (2/2004-2013)<br/>Julkaisija: Ilmailualan Unioni IAU ry<br/>Kotisivu: <a href='http://www.iau.fi/index.php?mid=219'>http://www.iau.fi/index.php?mid=219</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_valkoinen_kaapio = {
    id: "lehdet_valkoinen_kaapio",
    title: "Valkoinen kääpiö",
    description: "Valkoinen kääpiö (1990-2016)<br/>Julkaisija: Jyväskylän Sirius ry<br/>Kotisivu: <a href='http://www.ursa.fi/yhd/sirius/sivut/sivu.php?sid=24'>http://www.ursa.fi/yhd/sirius/sivut/sivu.php?sid=24</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vantaan_asukaslehti = {
    id: "lehdet_vantaan_asukaslehti",
    title: "Vantaan kaupungin asukaslehti",
    description: "Vantaan kaupungin asukaslehti (2014-2016)<br/>Julkaisija: Vantaan Kaupunki<br/>Kotisivu: <a href='http://www.vantaa.fi/asukaslehti'>http://www.vantaa.fi/asukaslehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vapaa_ajattelija = {
    id: "lehdet_vapaa_ajattelija",
    title: "Vapaa Ajattelija",
    description: "Vapaa Ajattelija (2002-2/2007)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Vapaa_Ajattelija_2002-2007_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Vapaa-ajattelijain liitto ry<br/>Kotisivu: <a href='http://www.vapaa-ajattelijat.fi/lehti/'>http://www.vapaa-ajattelijat.fi/lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vasama = {
    id: "lehdet_vasama",
    title: "Vasama",
    description: "Vasama (2009-9/2016)<br/>Julkaisija: Sähköalojen ammattiliitto ry<br/>Kotisivu: <a href='http://www.sahkoliitto.fi/sahkoliitto/viestinta/vasama'>http://www.sahkoliitto.fi/sahkoliitto/viestinta/vasama</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_veturimies = {
    id: "lehdet_veturimies",
    title: "Veturimies",
    description: "Veturimies (2006-2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Veturimies_2006-2015_aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Veturimiesten liitto ry<br/>Kotisivu: <a href='http://www.vml.fi/veturimies-lehti/arkisto/'>http://www.vml.fi/veturimies-lehti/arkisto/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_via_helsinki = {
    id: "lehdet_via_helsinki",
    title: "Via Helsinki",
    description: "Via Helsinki (2009-1/2013)<br/>Julkaisija: Finavia<br/>Kotisivu: <a href='https://www.finavia.fi/fi/tiedottaminen/arkisto/asiakaslehdet/'>https://www.finavia.fi/fi/tiedottaminen/arkisto/asiakaslehdet/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vilkku = {
    id: "lehdet_vilkku",
    title: "Vilkku",
    description: "Vilkku (2006-2016)<br/>Julkaisija: Tampereen kaupungin viestintäyksikkö<br/>Kotisivu: <a href='http://www.tampere.fi/tampereen-kaupunki/yhteystiedot-ja-asiointi/viestinta/lehdet/vilkku.html'>http://www.tampere.fi/tampereen-kaupunki/yhteystiedot-ja-asiointi/viestinta/lehdet/vilkku.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_virta = {
    id: "lehdet_virta",
    title: "Virta",
    description: "Virta kulttuurilehti (2004-2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Virta_2004-2013_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Virta on vapaa kulttuurilehti. Jokainen kirjoittaja vastaa omista sanoistaan.<br/>Kotisivu: <a href='https://virtalehtiblog.wordpress.com/numerot/'>https://virtalehtiblog.wordpress.com/numerot/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_walpo = {
    id: "lehdet_walpo",
    title: "Walpo",
    description: "Walpo (2003-2015)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Walpo_2003-2015_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Turun yliopiston Politiikan tutkimuksen klubi ry (P-klubi)<br/>Kotisivu: <a href='http://www.p-klubi.fi/?id=arkisto'>http://www.p-klubi.fi/?id=arkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_yhteenveto = {
    id: "lehdet_yhteenveto",
    title: "Yhteenveto",
    description: "Yhteenveto (2015-3/2016)<br/>Julkaisija: Akavan Erityisalat AE ry<br/>Kotisivu: <a href='https://www.akavanerityisalat.fi/ajankohtaista/yhteenveto-jasenlehti/pdf-arkisto'>https://www.akavanerityisalat.fi/ajankohtaista/yhteenveto-jasenlehti/pdf-arkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_filename: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_yhys_tiedotuslehti = {
    id: "lehdet_yhys_tiedotuslehti",
    title: "YHYS-tiedotuslehti",
    description: "YHYS-tiedotuslehti (2/2005-2013)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/YHYS_2005-2013_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Yhteiskuntatieteellisen ympäristötutkimuksen seura ry<br/>Kotisivu: <a href='http://www.yhys.net/vuosien-2005-2013-tiedotuslehdet-pdf-muodossa/'>http://www.yhys.net/vuosien-2005-2013-tiedotuslehdet-pdf-muodossa/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_filename: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_yliopistolainen = {
    id: "lehdet_yliopistolainen",
    title: "Yliopistolainen",
    description: "Yliopistolainen (2013)<br/>Julkaisija: Helsingin yliopisto<br/>Kotisivu: <a href='http://www.helsinki.fi/yliopistolainen/arkistoidut.html'>http://www.helsinki.fi/yliopistolainen/arkistoidut.html</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_filename: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_yrittajasanomat = {
    id: "lehdet_yrittajasanomat",
    title: "Yrittäjäsanomat",
    description: "Yrittäjäsanomat (7/2010, 2012-8/2016)<br/><a href='https://kitwiki.csc.fi/twiki/pub/FinCLARIN/KielipankkiAineistotMuitaLehtia/Yrittajasanomat_7_2010_2012-2016_-aineistosta_puuttuvat_numerot.txt'>Luettelo puuttuvista numeroista</a><br/>Julkaisija: Suomen Yrittäjien Sypoint Oy<br/>Kotisivu: <a href='http://www.yrittajat.fi/suomenyrittajat/tiedotustoiminta/yrittajasanomat'>http://www.yrittajat.fi/suomenyrittajat/tiedotustoiminta/yrittajasanomat</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_filename: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_yritysetiikka = {
    id: "lehdet_yritysetiikka",
    title: "Yritysetiikka",
    description: "Yritysetiikka (2009-1/2016)<br/>Julkaisija: EBEN Suomi ry<br/>Kotisivu: <a href='http://www.eben-net.fi/yritysetiikka-lehti'>http://www.eben-net.fi/yritysetiikka-lehti</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_filename: {
            displayType: "hidden",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uusi_safiiri = {
    id: "lehdet_uusi_safiiri",
    title: "Uusi Safiiri",
    description: "Uusi Safiiri (2005-2013)<br/>Julkaisija: Via ry<br/>Kotisivu: <a href='http://www.via.fi/index.php?sivusto=uusi_safiiri&sivu=arkisto'>http://www.via.fi/index.php?sivusto=uusi_safiiri&sivu=arkisto</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_filename: {
            displayType: "hidden",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_syopasaation_focus = {
    id: "lehdet_syopasaation_focus",
    title: "Syöpäsäätiön Focus-lehti",
    description: "Syöpäsäätiön Focus-lehti (2009-2016)<br/>Julkaisija: Syöpäsäätiö<br/>Kotisivu: <a href='https://www.syopajarjestot.fi/julkaisut/focus-lehti/'>https://www.syopajarjestot.fi/julkaisut/focus-lehti/</a>",
    urn: "urn:nbn:fi:lb-2016021202",
    metadata_urn: "urn:nbn:fi:lb-2016011101",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};




settings.corpora.hsfi = {
    title : "HS.fi",
    description : "HS.fi uutiskommenttiaineisto",
    id : "hsfi",
    urn : "urn:nbn:fi:lb-2014052717",
    metadata_urn : "urn:nbn:fi:lb-2014052718",
    licence : {
	urn : "urn:nbn:fi:lb-20150304140",
	name : "CLARIN ACA +NC +anonymisointi",
	description : "Vain ei-kaupalliseen tutkimuskäyttöön. Nimimerkit tulee anonymisoida korpukseen viittaavissa julkaisuissa.",
    },
    limited_access : true,
    licence_type : "ACA",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        lemma : attrs.baseform,
        lemmacomp : attrs.baseform_compound,
        pos : attrs.pos_klk,
        msd : attrs.msd,
        dephead : attrs.dephead,
        deprel : attrs.deprel_tdt,
        ref : attrs.ref,
        lex : attrs.lemgram_hidden
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
	text_title : sattrs.text_title
    }

};


settings.corpora.reittidemo = {
    title : "Reitti A-siipeen",
    description : "Kahdenkeskisen videoidun keskustelun ”Reitti A-siipeen” yleiskielistetty litteraatti. Keskustelussa selvitetään reittiä tiettyyn Helsingin yliopiston Metsätalossa sijaitsevaan huoneeseen. Vapaasti käytettäväksi tarkoitettu näyteaineisto.",
    id : "reittidemo",
    urn : "urn:nbn:fi:lb-100110012817",
    metadata_urn : "urn:nbn:fi:lb-2014101401",
    licence : settings.licenceinfo.CC0,
    features : ["paragraphs", "parsed_tdt"],
    attributes : {
	spoken : attrs.spoken,
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

/* Suomalaisen kirjallisuuden klassikoita (SKK) */

settings.corpora.skk_aho = {
    title : "Aho",
    description : "Juhani Ahon teoksia vuosilta 1891–1921.",
    id : "skk_aho",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : {
	sentence_type : sattrs.sentence_type,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.skk_canth = {
    title : "Canth",
    description : "Suomalaisen kirjallisuuden klassikoita. Minna Canthin teoksia vuosilta 1884–1896.",
    id : "skk_canth",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
        sentence_type : sattrs.sentence_type,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.skk_finne = {
    title : "Finne",
    description : "Jalmari Finnen teoksia vuosilta 1914–1925.",
    id : "skk_finne",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
        sentence_type : sattrs.sentence_type,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.skk_jarnefelt = {
    title : "Järnefelt",
    description : "Arvid Järnefeltin teoksia vuosilta 1893–1930.",
    id : "skk_jarnefelt",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
        sentence_type : sattrs.sentence_type,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.skk_kailas = {
    title : "Kailas",
    description : "Uuno Kailaksen teoksia vuosilta 1921–1932.",
    id : "skk_kailas",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
        sentence_type : sattrs.sentence_type,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.skk_lassila = {
    title : "Lassila",
    description : "Kolme Maiju Lassilana parhaiten tunnetun Algoth Untolan (vuoteen 1901 Tietäväisen) teosta. Kukin on julkaistu eri taitelijanimellä: Pojat asialla on merkitty Maiju Lassilan kirjoittamaksi, Avuttomat J. I. Vatasen ja Kuoleman rajoilla Irmari Rantamalan. Vuosilta 1911–1915.",
    id : "skk_lassila",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
        sentence_type : sattrs.sentence_type,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.skk_linnankoski = {
    title : "Linnankoski",
    description : "Väinö Linnankoski: Laulu tulipunaisesta kukasta (1905).",
    id : "skk_linnankoski",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
        sentence_type : sattrs.sentence_type,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.skk_kramsu = {
    title : "Kramsu",
    description : "Kaarlo Kramsun runoelmia vuosilta 1878–1887.",
    id : "skk_kramsu",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
        sentence_type : sattrs.sentence_type,
        text_author : sattrs.text_author,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.skk_lehtonen = {
    title : "Lehtonen",
    description : "Joel Lehtosen teoksia vuosilta 1911–1934.",
    id : "skk_lehtonen",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
        sentence_type : sattrs.sentence_type,
        text_author : sattrs.text_author,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.skk_leino = {
    title : "Leino",
    description : "Eino Leinon kaikki alkuperäiskokoelmissa julkaistut runot ja runoelmat sekä runoja kokoelmien ulkopuolelta. Kirjailijan runonäytelmät eivät ole mukana.",
    id : "skk_leino",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
        sentence_type : sattrs.sentence_type,
        text_author : sattrs.text_author,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.skk_pakkala = {
    title : "Pakkala",
    description : "Teuvo Pakkalan teoksia vuosilta 1894–1913",
    id : "skk_pakkala",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
        sentence_type : sattrs.sentence_type,
        text_author : sattrs.text_author,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.skk_siljo = {
    title : "Siljo",
    description : "Juhani Siljon teoksia vuosilta 1910–1919",
    id : "skk_siljo",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
        sentence_type : sattrs.sentence_type,
        text_author : sattrs.text_author,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.skk_wilkuna = {
    title : "Wilkuna",
    description : "Kyösti Wilkuna, 1911 ",
    id : "skk_wilkuna",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
        sentence_type : sattrs.sentence_type,
        text_author : sattrs.text_author,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.skk_sodergran = {
    title : "Södergran",
    description : "Uuno Kailaksen suomennoksia Edith Södergranin teoksista vuosilta 1916–1925 (suom. 1929)",
    id : "skk_sodergran",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
        sentence_type : sattrs.sentence_type,
        text_author : sattrs.text_author,
        text_title : sattrs.text_title,
        text_distributor : sattrs.text_distributor,
        text_source : sattrs.text_source
    }
};

settings.corpora.ethesis_maabs = {
    title : "Gradutiivistelmät",
    description : "Pro gradu -tutkielmien suomenkielisiä abstrakteja 1999-2016",
    id : "ethesis_maabs",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_dissabs = {
    title : "Väitöstiivistelmät",
    description : "Väitöskirjojen suomenkielisiä abstrakteja 2006-2016",
    id : "ethesis_dissabs",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};



settings.corpora.ethesis_phd_far = {
    title : "Farmasia",
    description : "Väitöskirjat: Farmasian tiedekunta (2005, 2013)",
    id : "ethesis_phd_far",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_phd_teo = {
    title : "Teologinen",
    description : "Väitöskirjat: Teologinen tiedekunta (2000-2016)",
    id : "ethesis_phd_teo",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_phd_beh = {
    title : "Käyttäytymistieteellinen",
    description : "Väitöskirjat: Käyttäytymistieteellinen tiedekunta (1996, 2000-2016)",
    id : "ethesis_phd_beh",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_phd_valt = {
    title : "Valtiotieteellinen",
    description : "Väitöskirjat: Valtiotieteellinen tiedekunta (1999-2016)",
    id : "ethesis_phd_valt",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_phd_ot = {
    title : "Oikeustieteellinen",
    description : "Väitöskirjat: Oikeustieteellinen tiedekunta (2001, 2004-2010, 2012, 2014-2016)",
    id : "ethesis_phd_ot",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_phd_hum = {
    title : "Humanistinen",
    description : "Väitöskirjat: Humanistinen tiedekunta (2000-2016)",
    id : "ethesis_phd_hum",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_phd_bio = {
    title : "Bio- ja ympäristötieteellinen",
    description : "Väitöskirjat: Bio- ja ympäristötieteellinen tiedekunta (2005)",
    id : "ethesis_phd_bio",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_phd_el = {
    title : "Eläinlääketieteellinen",
    description : "Väitöskirjat: Eläinlääketieteellinen tiedekunta (2008)",
    id : "ethesis_phd_el",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_phd_mm = {
    title : "Maa- ja metsätieteellinen tiedekunta",
    description : "Väitöskirjat: Maa- ja metsätieteellinen tiedekunta (2000, 2006, 2008-2010, 2012-2014, 2016)",
    id : "ethesis_phd_mm",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_phd_med = {
    title : "Lääketieteellinen",
    description : "Väitöskirjat: Lääketieteellinen tiedekunta (2000, 2003-2004, 2006-2010, 2012, 2014)",
    id : "ethesis_phd_med",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_ma_far = {
    title : "Farmasia",
    description : "Gradut: Farmasian tiedekunta 2010-2016",
    id : "ethesis_ma_far",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_ma_teo = {
    title : "Teologinen",
    description : "Gradut: Teologinen tiedekunta 2000-2016",
    id : "ethesis_ma_teo",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_ma_beh = {
    title : "Käyttäytymistieteellinen",
    description : "Gradut: Käyttäytymistieteellinen tiedekunta 1998-2016",
    id : "ethesis_ma_beh",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_ma_valt = {
    title : "Valtiotieteellinen",
    description : "Gradut: Valtiotieteellinen tiedekunta 1996-2016",
    id : "ethesis_ma_valt",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_ma_ot = {
    title : "Oikeustieteellinen",
    description : "Gradut: Oikeustieteellinen tiedekunta 2001-2016",
    id : "ethesis_ma_ot",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_ma_hum = {
    title : "Humanistinen",
    description : "Gradut: Humanistinen tiedekunta 1998-2016",
    id : "ethesis_ma_hum",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_ma_sci = {
    title : "Matemaattis-luonnontieteellinen",
    description : "Gradut: Matemaattis-luonnontieteellinen tiedekunta 1996-2016",
    id : "ethesis_ma_sci",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_ma_ai = {
    title : "Aleksanteri-instituutti",
    description : "Gradut: Aleksanteri-instituutti 2001-2016",
    id : "ethesis_ma_ai",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_ma_bio = {
    title : "Bio- ja ympäristötieteellinen",
    description : "Gradut: Bio- ja ympäristötieteellinen tiedekunta 2003-2016",
    id : "ethesis_ma_bio",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};


settings.corpora.ethesis_ma_el = {
    title : "Lisensiaatintyöt: Eläinlääketieteellinen",
    description : "Lisensiaatintyöt: Eläinlääketieteellinen tiedekunta (2003-2016)",
    id : "ethesis_ma_el",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_ma_mm = {
    title : "Maa- ja metsätieteellinen tiedekunta",
    description : "Gradut: Maa- ja metsätieteellinen tiedekunta (2003-2016)",
    id : "ethesis_ma_mm",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_ma_med = {
    title : "Lisensiaatintyöt: Lääketieteellinen",
    description : "Lisensiaatintyöt: Lääketieteellinen tiedekunta (2010-2016)",
    id : "ethesis_ma_med",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : sattrlist.ethesis
};



/*
settings.corpora.kotus_klassikot = {
    title : "Suomalaisen kirjallisuuden klassikoita (näyte)",
    description : "Suomalaisen kirjallisuuden klassikoita (Kotimaisten kielten keskuksen aineisto)",
    id : "kotus_klassikot",
    urn : "urn:nbn:fi:lb-2015022401",
    metadata_urn : "urn:nbn:fi:lb-20140730186",
    licence : settings.licenceinfo.EUPL_11,
    homepage : settings.fn.kaino_homepage("klassikot/meta/klassikot"),
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
*/

/* FTC (Finnish Text Collection) aka SKTP */

// FTC (sub)corpus hierarchy
ftc_hierarchy = [
    ["lehdet", "Lehdet", [
	["aamu", "Aamulehti 1995, 1999", [
	    ["aamu1995", "Aamulehti 1995",],
	    ["aamu1999", "Aamulehti 1999",],
	] ],
	["demari", "Demari 1995, 1997–2000", [
	    ["demari1995", "Demari 1995",],
	    ["demari1997", "Demari 1997",],
	    ["demari1998", "Demari 1998",],
	    ["demari1999", "Demari 1999",],
	    ["demari2000", "Demari 2000",],
	] ],
	["hs1995", "Helsingin Sanomat 1995", [
	    ["hs1995ae", "Helsingin Sanomat 1995 Osasto AE",],
	    ["hs1995ak", "Helsingin Sanomat 1995 Osasto AK",],
	    ["hs1995et", "Helsingin Sanomat 1995 Osasto ET",],
	    ["hs1995hu", "Helsingin Sanomat 1995 Osasto HU",],
	    ["hs1995ka", "Helsingin Sanomat 1995 Osasto KA",],
	    ["hs1995kn", "Helsingin Sanomat 1995 Osasto KN",],
	    ["hs1995ku", "Helsingin Sanomat 1995 Osasto KU",],
	    ["hs1995ma_mn", "Helsingin Sanomat 1995 Osasto MA_MN",],
	    ["hs1995misc", "Helsingin Sanomat 1995 Osasto MISC",],
	    ["hs1995mp", "Helsingin Sanomat 1995 Osasto MP",],
	    ["hs1995nh", "Helsingin Sanomat 1995 Osasto NH",],
	    ["hs1995po", "Helsingin Sanomat 1995 Osasto PO",],
	    ["hs1995ro", "Helsingin Sanomat 1995 Osasto RO",],
	    ["hs1995rt", "Helsingin Sanomat 1995 Osasto RT",],
	    ["hs1995sp", "Helsingin Sanomat 1995 Osasto SP",],
	    ["hs1995st", "Helsingin Sanomat 1995 Osasto ST",],
	    ["hs1995ta_te", "Helsingin Sanomat 1995 Osasto TA_TE",],
	    ["hs1995tr", "Helsingin Sanomat 1995 Osasto TR",],
	    ["hs1995ul", "Helsingin Sanomat 1995 Osasto UL",],
	    ["hs1995vk", "Helsingin Sanomat 1995 Osasto VK",],
	    ["hs1995vs", "Helsingin Sanomat 1995 Osasto VS",],
	    ["hs1995yo", "Helsingin Sanomat 1995 Osasto YO",],
	] ],
	["hysa", "Hyvinkään Sanomat 1994, 1997", [
	    ["hysa1994", "Hyvinkään Sanomat 1994",],
	    ["hysa1997", "Hyvinkään Sanomat 1997",],
	] ],
	["hasa", "Hämeen Sanomat 1999–2000", [
	    ["hasa1999", "Hämeen Sanomat 1999",],
	    ["hasa2000", "Hämeen Sanomat 2000",],
	] ],
	["ilta1996", "Iltalehti 1996",],
	["kaleva1998_1999", "Kaleva 1998–1999",],
	["kangasa", "Kangasalan Sanomat",],
	["karj", "Karjalainen 1991–95, 1997–99", [
	    ["karj1991", "Karjalainen 1991",],
	    ["karj1992", "Karjalainen 1992",],
	    ["karj1993", "Karjalainen 1993",],
	    ["karj1994", "Karjalainen 1994",],
	    ["karj1995", "Karjalainen 1995",],
	    ["karj1997", "Karjalainen 1997",],
	    ["karj1998", "Karjalainen 1998",],
	    ["karj1999", "Karjalainen 1999",],
	    ["karj_unspec", "Karjalainen Määrittelemättömät",],
	] ],
	["kesu1999", "Keskisuomalainen 1999",],
	["tm1995_1997", "Tekniikan Maailma 1995–1997",],
	["tusa", "Turun Sanomat 1998–1999", [
	    ["tusa1998", "Turun Sanomat 1998",],
	    ["tusa1999", "Turun Sanomat 1999",],
	] ],
    ] ],
    ["otava1993", "Kustannusosakeyhtiö Otava 1993",],
];

// Common settings template for FTC, FSTC and Svenska Parole (may be
// overridden)
settings.templ.lemmie_common = {
    title : "",
    description : "",
    id : "",
    within : settings.spWithin,
    context : settings.spContext,
    limited_access : true,
    licence_type : "RES",
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_creator : sattrs.author,
	text_publisher : sattrs.publisher,
	text_wordcount : {
	    label : "text_word_count",
	},
	text_lemmie_id : {
	    label : "lemmie_text_id",
	},
	text_lang : {
	    label : "lang",
	    displayType : "select",
	    opts : settings.liteOptions,
	    translationKey : "",
	    dataset : [
		"fin",
		"eng",
		"swe",
	    ]
	},
	text_date : sattrs.date,
	text_filename : {
	    label : "file_name",
	},
	text_rights : {
	    label : "access_rights_cat",
	},
	text_contributor : {
	    label : "contributor",
	},
	text_source : {
	    label : "source",
	    displayType : "select",
	    localize : false,
	    opts : settings.liteOptions,
	    // dataset : [],
	},
	text_lemmie_corpus : {
	    label : "lemmie_corpus",
	},
	// // Always empty
	// text_type : {
	//     label : "text_type",
	// },
	text_subject : {
	    label : "subject",
	},
	// paragraph_id : sattrs.paragraph_id,
	paragraph_type : {
	    label : "paragraph_type",
	    displayType : "select",
	    translationKey : "paragraphtype_",
	    dataset : {},
	    opts : settings.liteOptions
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_within : {
	    label : "enclosing_elems",
	},
    }
};

// Settings template for FTC subcorpora
settings.templ.ftc = $.extend(true, {}, settings.templ.lemmie_common, {
    attributes : {
	lemma : attrs.baseform,
	pos : attrs.pos_textmorfo,
	msd : attrs.msd,
	id : attrs.id_hidden,
	lex : attrs.lemgram_hidden,
    },
    struct_attributes : {
	text_source : {
	    dataset : [
		"Aamulehti",
		"Demari",
		"Helsingin Sanomat",
		"Hyvinkään Sanomat",
		"Hämeen Sanomat",
		"Iltalehti",
		"Kaleva",
		"Kangasalan Sanomat",
		"Karjalainen",
		"Keskisuomalainen",
		"Otava",
		"Tekniikan Maailma",
		"Turun Sanomat",
	    ],
	},
	paragraph_type : {
	    dataset : {
		"author|docAuthor" : "author",
		"byline" : "byline",
		"caption" : "caption",
		"closer" : "closer",
		"date" : "date",
		"head" : "head",
		"hi" : "hi",
		"name" : "name",
		"num" : "num",
		"opener" : "opener",
		"p" : "p",
		"q" : "q",
		"quote" : "quote",
		"rs" : "rs",
		"signed" : "signed",
	    },
	},
    }
});

// Create the FTC corpus folder hierarchy and corpus settings
settings.fn.make_folder_hierarchy(
    settings.corporafolders.ftc, ftc_hierarchy,
    {
	id_prefix : "ftc_",
	description_prefix : "Suomen kielen tekstikokoelma: ",
	corpus_title_suffix : " (SKTP)",
	corpus_template : settings.templ.ftc,
    });

delete ftc_hierarchy;

// TODO: Add aliases for subcorpora, such as ftc_aamu (or
// ftc_aamulehti). Maybe integrate creating aliases to
// settings.fn.make_folder_hierarchy(), or maybe better yet, add a
// facility to take the alias property from corporafolder if the alias
// should cover all the corpora of a folder.
settings.corpus_aliases.ftc = "ftc_.*";


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

    var corpus_id_prefix = "kotus_ns_presidentti_";

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
    var corpus_ids = [];
    for (var i = 0; i < president_info_items.length; i++) {
	president_templ_fill.push(make_info(president_info_items[i]));
	corpus_ids.push(corpus_id_prefix + president_info_items[i][0]);
    }
    president_templ_fill.push(
	{ id : "muut",
	  title : "Muiden kuin tasavallan presidenttien uudenvuodenpuheet",
	  description : "Muiden kuin tasavallan presidenttien pitämät uudenvuodenpuheet: pääministeri Esko Aho (1993), eduskunnan puhemies Väinö Hakkila (1942), pääministeri Edwin Linkomies (1944), ministeri Mauno Pekkala (1945).",
	  homepage : make_homepage_info("muut") }
    );
    corpus_ids.push(corpus_id_prefix + "muut");
    settings.fn.add_corpus_settings(
	settings.templ.kotus_ns_presidentti,
	president_templ_fill,
	settings.corporafolders.other_texts.kotus_ns_presidentti,
	corpus_id_prefix
    );
    var joined_corpus_ids = corpus_ids.join(",");
    settings.corpus_aliases["ns_presidentti"] = joined_corpus_ids;
    settings.corpus_aliases["kotus_ns_presidentti"] = joined_corpus_ids;
}

settings.fn.make_president_corpora();


settings.corpora.kotus_lakidir = {
    title : "Lakeja ja direktiivejä",
    description : "Lakeja ja direktiivejä vuosilta 1980–2003 (Kotimaisten kielten keskuksen aineisto)",
    id : "kotus_lakidir",
    urn : "urn:nbn:fi:lb-2016081201",
    metadata_urn : "urn:nbn:fi:lb-20140730126",
    licence : settings.licenceinfo.EUPL_11,
    homepage : settings.fn.kaino_homepage("teko/meta/saadokset/saadokset"),
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

/*
settings.corpora.ns_saadokset = {
    title : "Lakeja ja direktiivejä (näyte)",
    description : "Lakeja ja direktiivejä vuosilta 2002–2003 (Kotimaisten kielten keskuksen aineisto)",
    id : "ns_saadokset",
    // No Korp URN yet
    metadata_urn : "urn:nbn:fi:lb-20140730126",
    licence : settings.licenceinfo.EUPL_11,
    homepage : settings.fn.kaino_homepage("teko/meta/saadokset/saadokset"),
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
*/
settings.corpora.kotus_sp = {
    title : "Sananparsikokoelma",
    description : "Suomen murteiden Sananparsikokoelma (1930-luvulta) (Kotimaisten kielten keskuksen aineisto)",
    id : "kotus_sp",
    urn : "urn:nbn:fi:lb-2016081202",
    metadata_urn : "urn:nbn:fi:lb-20140730176",
    licence : settings.licenceinfo.EUPL_11,
    homepage : settings.fn.kaino_homepage("sp/meta/sp"),
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
	// "a:q" : "a:q",
	"adv" : "adv",
	"adv:pron" : "adv:pron",
	"adv:pron:dem" : "adv:pron:dem",
	"adv:pron:int" : "adv:pron:int",
	"adv:pron:rel" : "adv:pron:rel",
	"adv:q" : "adv:q",
	// "cnj" : "cnj",
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
	// "stem" : "stem",
	"v" : "v",
    },
    opts : settings.liteOptions
};
// pos_las2 is for LAS2, which has codes similar to pos_la for
// LA-murre, but fewer (and a generic "cnj").
attrs.pos_las2 = {
    label : "pos",
    displayType : "select",
    translationKey : "posla_",
    dataset : {
	"a" : "a",
	"adv" : "adv",
	"cnj" : "cnj",
	"intj" : "intj",
	"n" : "n",
	// pos_la uses "n:prop" for only non-person proper names, so
	// we map "n:prop" here to correspond to any proper name.
	"n:prop" : "n:prop:any",
	"neg" : "neg",
	"num" : "num",
	"p:post" : "p:post",
	"p:pre" : "p:pre",
	// pos_la uses bare "pron" with a more specific meaning, so we
	// map "pron" here to correspond to any pronoun.
	"pron" : "pron:any",
	"UNK" : "UNK",
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
// nodes, in which the third element is a longer alias for the parish
// name and an optional fourth element is an object whose properties
// are used to override the property values in the tmeplate).
var la_murre_grouping = [
    ["LOU", "Lounaismurteet", [
	["VarE", "Eteläinen Varsinais-Suomi", [
	    ["karuna", "Karuna", "karuna"],
	    ["kisk", "Kisko", "kisko"],
	    ["muurl", "Muurla", "muurla"],
	    ["muuhal", "Muurla/Halikko", "muurla_halikko"],
	    ["paim", "Paimio", "paimio"],
	    ["pern", "Perniö", "pernio"],
	    ["uske", "Uskela", "uskela"],
	] ],
	["VarP", "Pohjoinen Varsinais-Suomi", [
	    ["eura", "Eura", "eura"],
	    ["eurj", "Eurajoki", "eurajoki"],
	    ["kalan", "Kalanti", "kalanti"],
	    ["kartl", "Karjala Tl", "karjala_tl"],
	    ["kust", "Kustavi", "kustavi"],
	    ["laptl", "Lappi Tl", "lappi_tl"],
	    ["luvi", "Luvia", "luvia"],
	    ["mask", "Masku", "masku"],
	    ["pyhm", "Pyhämaa", "pyhamaa"],
	    ["raum", "Rauma", "rauma"],
	    ["ryma", "Rymättylä", "rymattyla"],
	    ["tais", "Taivassalo", "taivassalo"],
	    ["velk", "Velkua", "velkua"],
	] ],
    ] ],
    ["LVÄ", "Lounaiset välimurteet", [
	["SatE", "Etelä-Satakunta", [
	    ["koke", "Kokemäki", "kokemaki"],
	    ["loim", "Loimaa", "loimaa"],
	    ["vamp", "Vampula", "vampula"],
	] ],
	["SatL", "Länsi-Satakunta", [
	    // Ahlainen has the whole text as a single paragraph,
	    // which causes problems in the Korp context view, so
	    // allow only the sentence context and sentence + clause
	    // within.
	    ["ahla", "Ahlainen", "ahlainen", {
		context : settings.defaultContext,
		within : settings.scWithin
	    }],
	    ["merk", "Merikarvia", "merikarvia"],
	    ["noor", "Noormarkku", "noormarkku"],
	    ["pori", "Pori", "pori"],
	] ],
	["VarY", "Varsinais-Suomen ylämaa", [
	    ["kostl", "Koski Tl", "koski_tl"],
	    ["poyt", "Pöytyä", "poytya"],
	    ["somero", "Somero", "somero"],
	    ["saky", "Säkylä", "sakyla"],
	    ["tarv", "Tarvasjoki", "tarvasjoki"],
	] ],
	["VarU", "Länsi-Uusimaa", [
	    ["samm", "Sammatti", "sammatti"],
	    ["viht", "Vihti", "vihti"],
	] ],
    ] ],
    ["HÄM", "Hämäläismurteet", [
	["HämE", "Etelä-Häme", [
	    ["hatt", "Hattula", "hattula"],
	    ["haus", "Hausjärvi", "hausjarvi"],
	    ["nurj", "Nurmijärvi", "nurmijarvi"],
	    ["renk", "Renko", "renko"],
	    ["saak", "Sääksmäki", "saaksmaki"],
	    ["tamm", "Tammela", "tammela"],
	] ],
	["HämK", "Kaakkois-Häme", [
	    ["asko", "Askola", "askola"],
	    ["asik", "Asikkala", "asikkala"],
	    ["lamm", "Lammi", "lammi"],
	] ],
	["HämP", "Pohjois-Häme", [
	    ["juup", "Juupajoki", "juupajoki"],
	    ["kuru", "Kuru", "kuru"],
	    ["luop", "Luopioinen", "luopioinen"],
	    ["pirk", "Pirkkala", "pirkkala"],
	    ["pohjasl", "Pohjaslahti", "pohjaslahti"],
	    ["vesl", "Vesilahti", "vesilahti"],
	] ],
	["SatP", "Pohjois-Satakunta", [
	    ["ikaa", "Ikaalinen", "ikaalinen"],
	    ["kanp", "Kankaanpää", "kankaanpaa"],
	    ["kark", "Karkku", "karkku"],
	    ["kihn", "Kihniö", "kihnio"],
	    ["punl", "Punkalaidun", "punkalaidun"],
	    ["suod", "Suodenniemi", "suodenniemi"],
	] ],
	["Kym", "Kymenlaakso", [
	    ["iitt", "Iitti", "iitti"],
	    ["lapinj", "Lapinjärvi", "lapinjarvi"],
	    ["suur", "Suursaari", "suursaari"],
	    ["vehk", "Vehkalahti", "vehkalahti"],
	] ],
    ] ],
    ["POH", "Pohjalaismurteet", [
	["PohE", "Etelä-Pohjanmaa", [
	    ["isoj", "Isojoki", "isojoki"],
	    ["kauhava", "Kauhava", "kauhava"],
	    ["kuri", "Kurikka", "kurikka"],
	    ["laih", "Laihia", "laihia"],
	    ["nrmo", "Nurmo", "nurmo"],
	    ["pers", "Peräseinäjoki", "peraseinajoki"],
	    ["yhar", "Ylihärmä", "yliharma"],
	] ],
	["PohK", "Keski-Pohjanmaa", [
	    ["haaj", "Haapajärvi", "haapajarvi"],
	    ["haav", "Haapavesi", "haapavesi"],
	    ["hima", "Himanka", "himanka"],
	    ["kest", "Kestilä", "kestila"],
	    ["lest", "Lestijärvi", "lestijarvi"],
	    ["pyhj", "Pyhäjoki", "pyhajoki"],
	    ["toho", "Toholampi", "toholampi"],
	    ["vete", "Veteli", "veteli"],
	    ["yvie", "Ylivieska", "ylivieska"],
	] ],
	["PohP", "Pohjois-Pohjanmaa", [
	    ["hail", "Hailuoto", "hailuoto"],
	    ["paav", "Paavola", "paavola"],
	    ["temm", "Temmes", "temmes"],
	    ["ylii", "Yli-Ii", "yli_ii"],
	    ["ykii", "Ylikiiminki", "ylikiiminki"],
	] ],
	["LänP", "Länsipohja", [
	    ["ator", "Alatornio", "alatornio"],
	    ["muon", "Muonio", "muonio"],
	] ],
	["PerP", "Peräpohjola", [
	    ["kemi", "Kemi", "kemi"],
	    ["rova", "Rovaniemi", "rovaniemi"],
	    ["sall", "Salla", "salla"],
	    ["soda", "Sodankylä", "sodankyla"],
	] ],
    ] ],
    ["SAV", "Savolaismurteet", [
	["KesE", "Eteläinen Keski-Suomi", [
	    ["joutsa", "Joutsa", "joutsa"],
	    ["jams", "Jämsä", "jamsa"],
	    ["sysm", "Sysmä", "sysma"],
	] ],
	["KesL", "Läntinen Keski-Suomi", [
	    ["lappa", "Lappajärvi", "lappajarvi"],
	    ["pihl", "Pihlajavesi", "pihlajavesi"],
	    ["soin", "Soini", "soini"],
	] ],
	["KesP", "Pohjoinen Keski-Suomi", [
	    ["kong", "Konginkangas", "konginkangas"],
	    ["lauk", "Laukaa", "laukaa"],
	    ["mult", "Multia", "multia"],
	    ["piht", "Pihtipudas", "pihtipudas"],
	] ],
	["SavE", "Etelä-Savo", [
	    ["enok", "Enonkoski", "enonkoski"],
	    ["mikk", "Mikkeli", "mikkeli"],
	    ["manh", "Mäntyharju", "mantyharju"],
	    ["punh", "Punkaharju", "punkaharju"],
	] ],
	["SavP", "Pohjois-Savo", [
	    ["hauv", "Haukivuori", "haukivuori"],
	    ["lapl", "Lapinlahti", "lapinlahti"],
	    ["lepp", "Leppävirta", "leppavirta"],
	    ["nils", "Nilsiä", "nilsia"],
	    ["rans", "Rantasalmi", "rantasalmi"],
	    ["raul", "Rautalampi", "rautalampi"],
	    ["riis", "Riistavesi", "riistavesi"],
	    ["tervo", "Tervo", "tervo"],
	    ["vier", "Vieremä", "vierema"],
	] ],
	["KarP", "Pohjois-Karjala", [
	    ["ilom", "Ilomantsi", "ilomantsi"],
	    ["juuk", "Juuka", "juuka"],
	    ["kiih", "Kiihtelysvaara", "kiihtelysvaara"],
	    ["kite", "Kitee", "kitee"],
	    ["kont", "Kontiolahti", "kontiolahti"],
	    ["lipe", "Liperi", "liperi"],
	] ],
	["Kai", "Kainuu", [
	    ["posi", "Posio", "posio"],
	    ["sotk", "Sotkamo", "sotkamo"],
	    ["suos", "Suomussalmi", "suomussalmi"],
	] ],
    ] ],
    ["KAA", "Kaakkoismurteet", [
	["KarE", "Etelä-Karjala", [
	    ["antr", "Antrea", "antrea"],
	    ["koiv", "Koivisto", "koivisto"],
	    ["lappe", "Lappee", "lappee"],
	    ["luum", "Luumäki", "luumaki"],
	    ["muol", "Muolaa", "muolaa"],
	    ["nuij", "Nuijamaa", "nuijamaa"],
	    ["ruok", "Ruokolahti", "ruokolahti"],
	    ["savt", "Savitaipale", "savitaipale"],
	    ["seis", "Seiskari", "seiskari"],
	    ["taip", "Taipalsaari", "taipalsaari"],
	] ],
	["KarK", "Keski-Karjala", [
	    ["lumv", "Lumivaara", "lumivaara"],
	    ["pari", "Parikkala", "parikkala"],
	    ["rautu", "Rautu", "rautu"],
	    ["raisa", "Räisälä", "raisala"],
	    ["sort", "Sortavala", "sortavala"],
	] ],
    ] ]
];

// LA-murre corpus name prefix, prefixed to a parish name
var la_murre_corpus_prefix = "lam_";
// Corpus name alias prefix, for redirecting the old, longer names to
// the new, shorter ones
var la_murre_alias_prefix = "la_murre_";

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
	    var corpname = la_murre_corpus_prefix + parishes[k][0]
	    la_murre_corpora.push(corpname);
	    settings.corpus_aliases[la_murre_alias_prefix + parishes[k][2]] =
		corpname;
	}
    }
}

// It would actually suffice to have the /korp-prefixed name now that
// /var/www/html/korp is a link to /var/www/html on the public server.
var la_murre_fulltext_url_prefix =
    ((! isPublicServer) ? "/korp" : "") + "/fulltext/la_murre/";

// Make LA-murre fulltext URLs with the sentence id as a fragment
// identifier and the number of the first and last token of the match
// as the query string. This function is used as a stringify_synthetic
// function for the fulltext URLs.
settings.fn.make_la_murre_fulltext_url = function (token_data) {
    var tokencnt = token_data.tokens.length;
    var match_start = 0;
    var match_end = 0;
    var in_match = false;
    for (var tokennum = 0; tokennum < tokencnt; tokennum++) {
	if (token_data.tokens[tokennum]._match) {
	    if (! in_match) {
		match_start = tokennum + 1;
		in_match = true;
	    }
	} else if (in_match) {
	    match_end = tokennum;
	    in_match = false;
	}
    }
    if (in_match) {
	match_end = tokencnt;
    }
    return (la_murre_fulltext_url_prefix
	    + token_data.struct_attrs.text_filename + ".html"
	    + "?" + match_start.toString() + "-" + match_end.toString()
	    + "#s" + token_data.struct_attrs.sentence_num);
};

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
		"" : "noncw",
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
	text_date : sattrs.date,
	text_session_descr : {
	    label : "interview_descr",
	},
	text_content_descr : {
	    label : "subject",
	},
	text_source_id : {
	    label : "original_source",
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
	paragraph_speaker_name : {
	    label : "speaker_name",
	    displayType : "hidden",
	},
	paragraph_speaker_age : {
	    label : "speaker_age",
	},
	paragraph_speaker_sex : {
	    label : "speaker_sex",
	    displayType : "select",
	    translationKey : "",
	    dataset : {
		"male" : "male",
		"female" : "female",
		"" : "unknown"
	    },
	    opts : settings.liteOptions,
	},
	paragraph_speaker_birthdate : {
	    label : "speaker_birthdate",
	},
	paragraph_speaker_descr : {
	    label : "speaker_descr",
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
	sentence_fulltext_link :  {
	    label : "show_fulltext",
	    type : "url",
	    url_opts : sattrs.link_url_opts,
	    synthetic : true,
	    stringify_synthetic : settings.fn.make_la_murre_fulltext_url,
	},
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
	    },
	    opts : settings.liteOptions
	},
	clause_depth : {
	    label : "clause_depth"
	},
	clause_partnum : {
	    label : "clause_partnum",
	}
    },
    sidebar_display_order : {
	attributes : [
	    "cleanword",
	    "lemma",
	    "pos",
	    "msd",
	    "func",
	    "cow",
	    "note",
	],
	struct_attributes : [
	    "text_dialect_region",
	    "text_dialect_group",
	    "text_parish",
	    /^text_/,
	    /^paragraph_/,
	    /^sentence_/,
	    /^clause_/,
	],
    },
    // Ignore any number of punctuation tokens between tokens in the
    // extended search
    ignore_between_tokens_cqp : '[pos="punct"]*',
};

// The following is now superseded with the more general
// settings.fn.make_folder_hierarchy.

// // Recursively make settings.corporafolders and settings.corpora for
// // the (sub)corpora of the la_murre corpus (based on
// // la_murre_grouping). main_folder is the folder to which to add the
// // folders or corpora in subfolder_tree. This could perhaps be
// // generalized for other corpora if needed.
// settings.fn.make_folders_la_murre = function (main_folder, subfolder_tree,
// 					      depth, leaf_depth) {
//     for (var i = 0; i < subfolder_tree.length; i++) {
// 	var subfolder_info = subfolder_tree[i];
// 	var descr = "Lauseopin arkiston murrekorpus: " + subfolder_info[1];
// 	if (depth < leaf_depth) {
// 	    var subfolder = {
// 		title : subfolder_info[1],
// 		description : descr
// 	    };
// 	    main_folder[subfolder_info[0]] = subfolder;
// 	    settings.fn.make_folders_la_murre(subfolder, subfolder_info[2],
// 					      depth + 1, leaf_depth);
// 	} else {
// 	    var templ_fill = {
// 		id : subfolder_info[0],
// 		title : subfolder_info[1] + " (LA-murre)",
// 		description : descr
// 	    };
// 	    // The optional fourth item in the corpus info list is an
// 	    // object that may be used to override the values in the
// 	    // template.
// 	    if (subfolder_info.length > 3) {
// 		$.extend(templ_fill, subfolder_info[3]);
// 	    }
// 	    settings.fn.add_corpus_settings(
// 		settings.templ.la_murre, [templ_fill], main_folder,
// 		la_murre_corpus_prefix);
// 	}
//     }
// };

// // Call the above recursive function
// settings.fn.make_folders_la_murre(
//     settings.corporafolders.spoken.la_murre, la_murre_grouping, 1, 3);

settings.fn.make_folder_hierarchy(
    settings.corporafolders.spoken.la_murre, la_murre_grouping,
    {
	id_prefix : la_murre_corpus_prefix,
	folder_description_prefix : "Lauseopin arkiston murrekorpus: ",
	corpus_title_suffix : " (LA-murre)",
	make_corpus_description : function (data) {
	    return "Lauseopin arkiston murrekorpus: " + data[1];
	},
	corpus_template : settings.templ.la_murre,
    });


// Construct a shorthand alias
settings.corpus_aliases.la_murre = la_murre_corpora.join(",");
settings.corpus_aliases["la-murre"] = settings.corpus_aliases.la_murre;

// Configure a short URL: preselect only the LA-murre corpus folder
// (all its subcorpora)
settings.short_url_config.la_murre =
    function () {
        settings.preselected_corpora = ["__spoken.la_murre"];
        // // Other modes and corpora could be excluded
        // settings.modeConfig = settings.modeConfig.slice(0, 1);
        // settings.fn.remove_matching_corpora(["lam_.*"], true);
    }
settings.short_url_config["la-murre"] = settings.short_url_config.la_murre;

// Delete the variables used for constructing the settings
delete la_murre_grouping;
delete la_murre_regions;
delete la_murre_groups;
delete la_murre_parishes;
delete la_murre_corpora;
delete la_murre_corpus_prefix;


// LAS2

attrlist.las2 = {
    lemma : attrs.baseform,
    pos : attrs.pos_las2,
    msd : attrs.msd,
    fun : attrs.func_la,
    com : {
        label : "note",
    },
    lex : attrs.lemgram_hidden
};

sattrlist.las2 = {
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
};

// Properties common to the LAS2 subcorpora
las2_common_props = {
    urn : "urn:nbn:fi:lb-2015050504",
    metadata_urn : "urn:nbn:fi:lb-201407167",
    homepage_url : "http://www.utu.fi/fi/yksikot/hum/yksikot/suomi-sgr/tutkimus/tutkimushankkeet/las2/Sivut/home.aspx",
    licence : {
	name : "CLARIN RES +PLAN +NC +LOC +ND",
	urn : "urn:nbn:fi:lb-20150304111"
    },
    limited_access : true,
    licence_type : "RES",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.las2,
    struct_attributes : sattrlist.las2,
};

settings.corpora.las2_tentit = {
    title : "LAS2 (tentit)",
    description : "Edistyneiden suomenoppijoiden korpus (tentit)",
    id : "las2_tentit",
};

settings.corpora.las2_esseet = {
    title : "LAS2 (esseet)",
    description : "Edistyneiden suomenoppijoiden korpus (esseet)",
    id : "las2_esseet",
};

// Add the common properties to the corpus settings of las2_tentit and
// las2_esseet
settings.fn.extend_corpus_settings(
    las2_common_props, ["las2_tentit", "las2_esseet"]);

delete las2_common_props;

settings.corpus_aliases.las2 = "las2_tentit,las2_esseet";


settings.corpora.sks_kivi_fi = {
    title : "Aleksis Kivi (SKS)",
    description : "Aleksis Kiven painetut teokset, kirjeet ja muu tunnettu tuotanto. Toimittaneet Sakari Katajamäki, Ossi Kokko ja Elina Kela. <a href='http://www.edith.fi/kivikorpus/index.htm'>Infosivu</a>",
    id : "sks_kivi_fi",
    // unselected : true,
    urn : "urn:nbn:fi:lb-201405273",
    metadata_urn : "urn:nbn:fi:lb-201405274",
    licence : settings.licenceinfo.CC_BY_NC,
    homepage_url : "http://www.edith.fi/kivikorpus/index.htm",
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
    urn : "urn:nbn:fi:lb-2014052711",
    metadata_urn : "urn:nbn:fi:lb-2014052712",
    licence : settings.licenceinfo.CC_BY_NC,
    homepage_url : "http://dbgw.finlit.fi/skvr/",
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


attrlist.mulcold_fi = {
    lemma : attrs.baseform,
    lemmacomp : attrs.baseform_compound,
    pos : attrs.pos_mulcold_fi,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos_mulcold_fi,
    ambmsd : attrs.ambiguous_msd,
    lex : attrs.lemgram_hidden
};
attrlist.mulcold_ru = {
    lemma : attrs.baseform,
    pos : attrs.pos_mulcold_ru,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos_mulcold_ru,
    ambmsd : attrs.ambiguous_msd,
    lex : attrs.lemgram_hidden
};
attrlist.mulcold_en = {
    lemma : attrs.baseform,
    pos : attrs.pos_mulcold_en,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos_mulcold_en,
    ambmsd : attrs.ambiguous_msd,
    lex : attrs.lemgram_hidden
};
attrlist.mulcold_sv = {
    lemma : attrs.baseform,
    lemmacomp : attrs.baseform_compound,
    pos : attrs.pos_mulcold_sv,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos_mulcold_sv,
    ambmsd : attrs.ambiguous_msd,
    lex : attrs.lemgram_hidden
};
attrlist.mulcold_de = {
};

attrlist.topling = {
    type : attrs.wordtype
};

attrlist.scotscorr = {
    w_note : attrs.word_note,
    w_supplement : attrs.word_supplement,
    w_full : attrs.word_correction,
    w_spacing : {
        label : "word_spacing",
        opts : settings.defaultOptions
    },
    w_typography : attrs.word_typography,
    w_state : {
        label : "word_state",
        opts : settings.defaultOptions
    }
};

/* SINEBRYCHOFF */

attrlist.sinebrychoff = {
    //footnote : attrs.word_note
};

sattrlist.sinebrychoff = {
    text_url : sattrs.original_url,
    text_date : {label : "date"},
    text_sender : { label : "topling_from" },
    text_receiver : { label : "topling_to"},
    text_id : { label : "text_id" }
};



/* OPUS */

/*
sattrlist.opus = {
    sentence_id : sattrs.sentence_id_hidden,
    text_title : {
        label : "title"
    }
};
*/

sattrlist.s24_update = {
    text_urlmsg : {
        label : "suomi24fi_urlmsg",
        type : "url",
        url_opts : sattrs.link_url_opts
    },
    text_urlboard : {
        label : "suomi24fi_urlboard",
        type : "url",
        url_opts : sattrs.link_url_opts
    },
    sentence_id : sattrs.sentence_id_hidden,
    text_title : sattrs.text_title,
    text_title_lemmas : {
	label : "title_lemmas",
    },
    text_date : sattrs.date,
    text_time : sattrs.text_time,
    text_cid : {
        label : "suomi24fi_cid",
    },
    text_discussionarea : {
        label : "suomi24fi_sect",
    },
    text_subsections : {
        label : "suomi24fi_sub",
    },
    text_anonnick : {
        label : "suomi24fi_user",
    },
    text_anonnick_lemmas : {
	label : "suomi24fi_user_lemmas",
    },
};

sattrlist.scotscorr = {
    sentence_id : sattrs.sentence_id_hidden,
    text_year : {label : "scotscorr_year"},
    text_fraser : {label : "scotscorr_fraser"},
    text_datefrom : sattrs.date,
    text_date : { label : "scotscorr_original_date" },
    text_from : { label : "topling_from" },
    text_to : { label : "topling_to"},
    text_bi : { label : "scotscorr_bi"},
    text_id : { label : "text_id" },
    text_fn : { label : "file_name"},
    text_ms : { label : "scotscorr_ms"},
    text_lcinf : { label : "scotscorr_lcinf"},
    text_lclet : { label : "scotscorr_lclet"},
    text_arg : { label : "scotscorr_arg"},
    text_srg : { label : "scotscorr_srg"},
    text_lettertype : { label : "scotscorr_lettertype"},
    text_scripttype : { label : "scotscorr_scripttype"},
    text_lettertypetwo : { label : "scotscorr_lettertype"},
    text_scripttypetwo : { label : "scotscorr_scripttype"},
    text_st : {label :  "scotscorr_st"},
    text_wc : { label : "scotscorr_wc"},
    text_largeregion : { label : "scotscorr_largeregion"}
};

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

attrlist.testerzya = {};
sattrlist.erme_debug = {}

sattrlist.erme = {
    text_author : {
        label : "text_author"
    },
    text_title : {
        label : "text_booktitle"
    },
    text_corrector : {
        label : "text_corrector"
    },
    text_year : {
        label : "text_year"
    },
    sentence_id : sattrs.sentence_id_hidden,
    sentence_pgno : {
        label : "page_num"
    },
    text_publisher : {
        label : "text_publisher"
    }
};

sattrlist.testerzya = {
    text_author : {
        label : "text_author"
    },
    text_title : {
        label : "text_title"
    },
    text_publisher : {
        label : "text_publisher"
    },
    text_corrector : {
        label : "text_corrector"
    },
    text_usage : {
        label : "text_usage"
    },
    text_year : {
        label : "text_year"
    },
    text_lang : {
        label : "klk_lang",
        displayType : "select",
        translationKey : "klk_lang_",
        dataset : {
            "izh" : "izh",
            "kca" : "kca",
            "mdf" : "mdf",
            "mns" : "mns",
            "mrj" : "mrj",
            "myv" : "myv",
            "sel" : "sel",
            "vep" : "vep",
            "yrk" : "yrk"
        },
        opts : settings.liteOptions
    },
    sentence_id : sattrs.sentence_id_hidden,
	sentence_section : {
        label : "sentence_section"
	    },
	sentence_chapno : {
        label : "sentence_chapno"
	    },
	paragraph_class : {
        label : "paragraph_class"
	    },
	paragraph_lang : {
        label : "paragraph_lang"
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

attrlist.fennougrica = {};

sattrlist.fennougrica = {
    within : settings.spWithin,
    context : settings.spContext,
    text_datefrom : sattrs.date,
    text_author : {
        label : "text_author"
    },
    text_title : {
        label : "text_title"
    },
    text_editor : {
        label : "klk_editor"
    },
    text_lang : {
        label : "klk_lang",
        displayType : "select",
        translationKey : "klk_lang_",
        dataset : {
            "izh" : "izh",
            "kca" : "kca",
            "mdf" : "mdf",
            "mns" : "mns",
            "mrj" : "mrj",
            "myv" : "myv",
            "sel" : "sel",
            "vep" : "vep",
            "yrk" : "yrk"
        },
        opts : settings.liteOptions

    },
    text_link : {
        url_opts : sattrs.link_url_opts,
        label : "klk_img_url",
        type : "url"
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

settings.corpusinfo.kfspc = {
    urn : "urn:nbn:fi:lb-201406035",
    metadata_urn : "urn:nbn:fi:lb-201406036",
    licence : settings.licenceinfo.CC_BY
};

settings.corpora.kfspc_fi = {
    title : "KFSPC suomi",
    description : "Kotus Finnish-Swedish Parallel Corpus, suomenkielinen osuus",
    id : "kfspc_fi",
    lang : "fin",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {
    },
    struct_attributes : sattrlist.kfspc
};

settings.fn.extend_corpus_settings(settings.corpusinfo.kfspc, ["kfspc_fi"]);


/* JRC-ACQUIS */

sattrlist.jrc_acquis = {
    sentence_id : sattrs.sentence_id_hidden,
    text_year : {
        label : "year"
    },
    text_title : sattrs.text_title,
    text_filename : {
        label : "file_name",
    }
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
	label : "text_id"
    },
    align_text_author : {
	label : "author"
    },
    align_text_title : {
	label : "title"
    },
    align_text_typeoftext : {
	label : "text_type"
    },
    align_text_genre : sattrs.mikhailov_text_genre,
    align_text_period : {
	label : "year"
    },
    align_text_publisher : {
	label : "publisher"
    },
    sentence_id : sattrs.sentence_id_hidden
};

sattrlist.legal = {
    text_code : {
	label : "text_id"
    },
    text_author : {
	label : "author"
    },
    text_title : {
	label : "title"
    },
    text_typeoftext : {
	label : "text_type"
    },
    text_genre : sattrs.mikhailov_text_genre,
    text_period : {
	label : "text_period"
    },
    text_publisher : {
	label : "publisher"
    },
    sentence_id : sattrs.sentence_id_hidden
};


settings.corpusinfo.firulex = {
    urn : "urn:nbn:fi:lb-201407162",
    metadata_urn : "urn:nbn:fi:lb-201407161",
    licence : settings.licenceinfo.CC_BY_ND,
    homepage_url : "https://mustikka.uta.fi/",
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

settings.fn.extend_corpus_settings(settings.corpusinfo.firulex,
				   ["legal_fi"]);


settings.corpusinfo.mulcold = {
    urn : "urn:nbn:fi:lb-201405277",
    metadata_urn : "urn:nbn:fi:lb-201405278",
    licence : settings.licenceinfo.CC_BY_ND,
    homepage_url : "https://mustikka.uta.fi/",
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

settings.fn.extend_corpus_settings(settings.corpusinfo.mulcold,
				   ["mulcold_fi"]);


/* ParFin common */

settings.corpusinfo.parfin = {
    urn : "urn:nbn:fi:lb-2015050506",
    metadata_urn : "urn:nbn:fi:lb-2014052710",
    lbr_id : "urn:nbn:fi:lb-2014052710",
    licence : {
	name : "CLARIN RES +NC +PLAN +INF",
	urn : "urn:nbn:fi:lb-2015041306",
    },
    homepage_url : "https://mustikka.uta.fi/",
};

sattrlist.parfin_base = {
    link_text_code : {
	label : "text_id"
    },
    link_txtnumber : {
	label : "text_number"
    },
    link_text_author : {
	label : "author"
    },
    link_text_title : {
	label : "title"
    },
    link_text_typeoftext : {
	label : "text_type"
    },
    link_text_genre : sattrs.mikhailov_text_genre,
    link_text_period : {
	label : "year"
    },
    link_text_publisher : {
	label : "publisher"
    },
    sentence_id : sattrs.sentence_id_hidden
};

sattrlist.parfin_fi = $.extend(
    true, {}, sattrlist.parfin_base,
    {
	link_text_author : {
	    label : "author",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_translator : {
	    label : "translator",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_title : {
	    label : "title",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_publisher : {
	    label : "publisher",
	    displayType : "select",
	    dataset : {
		"Kansa" : "Kansa",
		"Otava" : "Otava",
		"[Tt]ammi" : "Tammi",
		"Teos" : "Teos",
		"WSOY" : "WSOY",
	    },
	    localize : false,
	    opts : settings.liteOptions,
	},
    }
);

sattrlist.parfin_ru = $.extend(
    true, {}, sattrlist.parfin_fi,
    {
	link_text_title : {
	    label : "title",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_publisher : {
	    label : "publisher",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
    }
);

attrlist.parfin_fi = $.extend(
    true, {}, attrlist.mulcold_fi);

attrlist.parfin_ru = $.extend(
    true, {}, attrlist.mulcold_ru);


/* ParFin Finnish */

settings.corpora.parfin_fi = {
    id : "parfin_fi",
    title : "ParFin (suomi) [poistuva]",
    description : "ParFin – suomi–venäjä kaunokirjallisten tekstien rinnakkaiskorpus (suomenkieliset alkuperäistekstit)<br/>Suomenkielisiä kaunokirjallisia tekstejä vuosilta 1990–2010<br/><br/><strong>Huomaa, että ParFin 2016 korvaa tämän korpuksen, ja tämä korpus poistuu käytöstä helmikuussa 2017.</strong>",
    // TODO: Add paragraphs corresponding to link elements
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : attrlist.parfin_fi,
    struct_attributes : sattrlist.parfin_fi,
    limited_access : true,
    licence_type : "RES",
};

settings.fn.extend_corpus_settings(settings.corpusinfo.parfin, ["parfin_fi"]);


/* ParRus common */

attrlist.parrus_fi = $.extend(
    true, {}, attrlist.mulcold_fi);

attrlist.parrus_ru = $.extend(
    true, {}, attrlist.mulcold_ru);

sattrlist.parrus_fi = $.extend(
    true, {}, sattrlist.parfin_base,
    {
	link_text_author : {
	    label : "author",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_translator : {
	    label : "translator",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_title : {
	    label : "title",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_publisher : {
	    label : "publisher",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
    }
);

sattrlist.parrus_ru = $.extend(
    true, {}, sattrlist.parfin_base,
    {
	link_text_author : {
	    label : "author",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_translator : {
	    label : "translator",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_title : {
	    label : "title",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_publisher : {
	    label : "publisher",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
    }
);

settings.corpusinfo.parrus = {
    urn : "[to be added]",
    metadata_urn : "urn:nbn:fi:lb-20140730173",
    lbr_id : "urn:nbn:fi:lb-2014052710",
    licence : {
	name : "CLARIN RES +PLAN +NC +INF +ND",
	url : "urn:nbn:fi:lb-2016042705",
    },
    homepage_url : "https://mustikka.uta.fi/",
};

settings.corpora.parrus_fi = {
    id : "parrus_fi",
    title : "ParRus (suomi) [poistuva]",
    description : "ParRus – venäjä–suomi kaunokirjallisten tekstien rinnakkaiskorpus (suomenkieliset käännökset)<br/>Venäjänkielisten kaunokirjallisten tekstien (klassista ja 1900-luvun kirjallisuutta) käännöksiä suomeksi<br/><br/><strong>Huomaa, että ParRus 2016 korvaa tämän korpuksen, ja tämä korpus poistuu käytöstä helmikuussa 2017.</strong>",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    limited_access : true,
    licence_type : "RES",
    attributes : attrlist.parrus_fi,
    struct_attributes : sattrlist.parrus_fi,
};
settings.fn.extend_corpus_settings(settings.corpusinfo.parrus, ["parrus_fi"]);


/* ParFin 2016 common */

settings.corpusinfo.parfin_2016 = {
    // The URNs in the single-language version are different from
    // those in the parallel corpus.
    // urn : "[to be added]",
    // metadata_urn : "urn:nbn:fi:lb-2014052710",
    // licence : settings.licenceinfo.ParFinRus_2016_fi,
    lbr_id : "urn:nbn:fi:lb-2017020601",
    homepage_url : "https://mustikka.uta.fi/",
};

sattrlist.parfin_2016_base = {
    link_text_code : {
	label : "text_id"
    },
    // link_txtnumber : {
    // 	label : "text_number"
    // },
    link_text_author : {
	label : "author"
    },
    link_text_title : {
	label : "title"
    },
    // link_text_typeoftext : {
    // 	label : "text_type"
    // },
    // link_text_genre : sattrs.mikhailov_text_genre,
    // link_text_period : {
    // 	label : "year"
    // },
    link_text_publisher : {
	label : "publisher"
    },
    link_text_year : {
	label : "year",
    },
    link_text_yearorig : {
	label : "year_orig",
    },
    link_text_yeartr : {
	label : "year_transl",
    },
    sentence_id : sattrs.sentence_id_hidden
};

sattrlist.parfin_2016_fi = $.extend(
    true, {}, sattrlist.parfin_2016_base,
    {
	link_text_author : {
	    label : "author",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_translator : {
	    label : "translator",
	},
	link_text_title : {
	    label : "title",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_publisher : {
	    label : "publisher",
	    displayType : "select",
	    dataset : [
		"Kansa",
		"Otava",
		"Tammi",
		"Teos",
		"WSOY",
	    ],
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_year_orig : {
	    label : "year",
	},
    }
);

sattrlist.parfin_2016_ru = $.extend(
    true, {}, sattrlist.parfin_2016_fi,
    {
	link_text_title : {
	    label : "title",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_translator : {
	    label : "translator",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_publisher : {
	    label : "publisher",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
    }
);

attrlist.parfin_2016_fi = {
    lemma : attrs.baseform,
    lemmacomp : attrs.baseform_compound,
    pos : attrs.pos_ud_fi,
    msd : attrs.msd,
    dephead : attrs.dephead,
    deprel : attrs.deprel_ud_fi,
    ref : attrs.ref,
    lex : attrs.lemgram_hidden
};

attrlist.parfin_2016_ru = {
    lemma : attrs.baseform,
    lemmacomp : attrs.baseform_compound,
    pos : attrs.pos_uta_ru,
    msd : attrs.msd,
    dephead : attrs.dephead,
    deprel : attrs.deprel_uta_ru,
    ref : attrs.ref,
    lex : attrs.lemgram_hidden
};


/* ParFin 2016 Finnish */

settings.corpora.parfin_2016_fi = {
    id : "parfin_2016_fi",
    title : "ParFin 2016 (suomi)",
    description : "ParFin 2016 – suomi–venäjä kaunokirjallisten tekstien rinnakkaiskorpus (suomenkieliset alkuperäistekstit)<br/>Suomenkielisiä kaunokirjallisia tekstejä vuosilta 1910–2008<br/><br/><a href=\"http://universaldependencies.org/#fi\" target=\"_blank\">Annotaatioiden kuvaus</a>",
    urn : "urn:nbn:fi:lb-2016121602",
    metadata_urn : "urn:nbn:fi:lb-20161216211",
    licence : settings.licenceinfo.ParFinRus_2016_fi,
    context : settings.sentLinkContext,
    within : settings.sentLinkWithin,
    attributes : attrlist.parfin_2016_fi,
    struct_attributes : sattrlist.parfin_2016_fi,
    limited_access : true,
    licence_type : "RES",
};

settings.fn.extend_corpus_settings(settings.corpusinfo.parfin_2016,
				   ["parfin_2016_fi"]);



/* ParRus 2016 common */

attrlist.parrus_2016_fi = $.extend(
    true, {}, attrlist.parfin_2016_fi);

attrlist.parrus_2016_ru = $.extend(
    true, {}, attrlist.parfin_2016_ru);

sattrlist.parrus_2016_ru = $.extend(
    true, {}, sattrlist.parfin_2016_base,
    {
	link_text_author : {
	    label : "author",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_title : {
	    label : "title",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_publisher : {
	    label : "publisher",
	    displayType : "select",
	    dataset : [
		"",
		"Эксмо",
	    ],
	    localize : false,
	    opts : settings.liteOptions,
	},
    }
);

sattrlist.parrus_2016_fi = $.extend(
    true, {}, sattrlist.parfin_2016_base,
    {
	link_text_author : {
	    label : "author",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_translator : {
	    label : "translator",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_title : {
	    label : "title",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
	link_text_publisher : {
	    label : "publisher",
	    displayType : "select",
	    dataset : [
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
	    localize : false,
	    opts : settings.liteOptions,
	},
    }
);

settings.corpusinfo.parrus_2016 = {
    // The URNs in the single-language version are different from
    // those in the parallel corpus.
    // urn : "[to be added]",
    // metadata_urn : "urn:nbn:fi:lb-20140730173",
    // licence : settings.licenceinfo.ParFinRus_2016_fi,
    lbr_id : "urn:nbn:fi:lb-2017020601",
    homepage_url : "https://mustikka.uta.fi/",
};

settings.corpora.parrus_2016_fi = {
    id : "parrus_2016_fi",
    title : "ParRus 2016 (suomi)",
    description : "ParRus 2016 – venäjä–suomi kaunokirjallisten tekstien rinnakkaiskorpus (suomenkieliset käännökset)<br/>Venäjänkielisten kaunokirjallisten tekstien (klassista ja 1900-luvun kirjallisuutta) käännöksiä suomeksi<br/><br/><a href=\"http://universaldependencies.org/#fi\" target=\"_blank\">Annotaatioiden kuvaus</a>",
    urn : "urn:nbn:fi:lb-2016121606",
    metadata_urn : "urn:nbn:fi:lb-2016121613",
    licence : settings.licenceinfo.ParFinRus_2016_fi,
    context : settings.sentLinkContext,
    within : settings.sentLinkWithin,
    limited_access : true,
    licence_type : "RES",
    attributes : attrlist.parrus_2016_fi,
    struct_attributes : sattrlist.parrus_2016_fi,
};
settings.fn.extend_corpus_settings(settings.corpusinfo.parrus_2016,
				   ["parrus_2016_fi"]);




/*
 * Previously in Finnish National Library mode
 */

sattrlist.klk = {
    text_label : {
	// The label has the prefix klk_ because it might not have the
	// same meaning as "label" in some other contexts.
        label : "klk_label",
        opts : settings.defaultOptions,
    },
    text_publ_title : {
        label : "publication",
        opts : settings.defaultOptions,
    },
    /*
    text_publ_part : {
        label : "part",
        opts : settings.defaultOptions,
    },
    */
    text_publ_id : {
        label : "issn",
        opts : settings.defaultOptions,
    },
    text_issue_date : {
        label : "date",
        opts : settings.defaultOptions,
    },
    text_issue_no : {
        label : "issue_num",
        opts : settings.defaultOptions,
    },
    text_issue_title : {
        label : "issue_title",
        opts : settings.defaultOptions,
    },
    /*
    text_part_name : {
        label : "part_name",
        opts : settings.defaultOptions,
    },
    */
    text_elec_date : {
        label : "digitization_date",
        opts : settings.defaultOptions,
    },
    text_language : {
        label : "lang",
        displayType : "select",
        translationKey : "",
        opts : settings.liteOptions,
        dataset : {
            "fi" : "fin",
            "sv" : "swe",
            "et" : "est",
        }
    },
    /*
    text_page_id : {
        label : "page_id",
        opts : settings.defaultOptions,
    },
    */
    text_page_no : {
        label : "page_num",
        opts : settings.defaultOptions,
    },
    text_sentcount : {
        label : "sentence_count",
        displayType : "hidden",
    },
    text_tokencount : {
        label : "token_count",
        displayType : "hidden",
    },
    text_img_url : {
        label : "image_url",
        type : "url",
	displayType : "hidden",
    },
    /*
    text_dateto : {
        label : "dateto",
        displayType : "hidden",
    },
    text_datefrom : {
        label : "datefrom",
        displayType : "hidden",
    },
    */
    text_publ_type : {
	label : "publication_type",
	displayType : "select",
	translationKey : "publtype_",
	opts : settings.liteOptions,
	dataset : {
	    "aikakausi" : "journal",
	    "sanomalehti" : "newspaper"
	}
    },
    paragraph_id : {
        label : "paragraph_id",
        displayType : "hidden",
    },
    sentence_id : sattrs.sentence_id_hidden
};

sattrlist.klk_fi = $.extend({}, sattrlist.klk);
sattrlist.klk_fi_parsed = $.extend(
    {}, sattrlist.klk_fi,
    {
	sentence_parse_state : {
	    label : "parse_state",
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

sattrlist.klk_fi_parsed_pagelinks = $.extend(
    {}, sattrlist.klk_fi_parsed, sattrlist.klk_pagelinks);

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
	attrlist.klk_fi,
	attrlist.finer);

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
// // All KLK Fi corpora now have NER tags, so this is not needed
// var klk_fi_ner_years = settings.fn.make_yearlist(1820, 1820);

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

// for (var i = 0; i < klk_fi_ner_years.length; i++) {
//     var year = klk_fi_ner_years[i];
//     var corpsettings = settings.corpora["klk_fi_" + year.toString()];
//     corpsettings.attributes = $.extend({}, corpsettings.attributes,
// 				       attrlist.finer);
// }

delete klk_fi_parsed_years;
// delete klk_fi_ner_years;


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

/*
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
*/

settings.corpora.vnsk_asetus = {
    title : "Asetuksia",
    description : "Asetuksia",
    id : "vnsk_asetus",
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


settings.corpora.vnsk_kivi = {
    title : "Kivi",
    description : "Kivi",
    id : "vnsk_kivi",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_keckman = {
    title : "Keckman",
    description : "Keckman",
    id : "vnsk_keckman",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_cajan = {
    title : "Cajan",
    description : "Cajan",
    id : "vnsk_cajan",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_cajan = {
    title : "Cajan",
    description : "Cajan",
    id : "vnsk_cajan",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};


settings.corpora.vnsk_cannelin = {
    title : "Cannelin",
    description : "Cannelin",
    id : "vnsk_cannelin",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_aminoff = {
    title : "Aminoff",
    description : "Aminoff",
    id : "vnsk_aminoff",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_ahlholm = {
    title : "Ahlholm",
    description : "Ahlholm",
    id : "vnsk_ahlholm",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};


settings.corpora.vnsk_yksitt = {
    title : "Yksittäisiä",
    description : "Yksittäisiä",
    id : "vnsk_yksitt",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_aejmelaeus = {
    title : "Aejmelaeus",
    description : "Aejmelaeus",
    id : "vnsk_aejmelaeus",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_ahlman_kirjat = {
    title : "Ahlman kirjat",
    description : "Ahlman kirjat",
    id : "vnsk_ahlman_kirjat",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_ahlman_sanastot = {
    title : "Ahlman sanastot",
    description : "Ahlman sanastot",
    id : "vnsk_ahlman_sanastot",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_ahlqvist = {
    title : "Ahlqvist",
    description : "Ahlqvist",
    id : "vnsk_ahlqvist",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_akiander = {
    title : "Akiander",
    description : "Akiander",
    id : "vnsk_akiander",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_almanakka = {
    title : "Almanakka",
    description : "Almanakka",
    id : "vnsk_almanakka",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_anonyymi = {
    title : "Anonyymi",
    description : "Anonyymi",
    id : "vnsk_anonyymi",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_aulen = {
    title : "Aulen",
    description : "Aulen",
    id : "vnsk_aulen",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_backvall = {
    title : "Backvall",
    description : "Backvall",
    id : "vnsk_backvall",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_bocker = {
    title : "Bocker",
    description : "Bocker",
    id : "vnsk_bocker",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_bonsdorff = {
    title : "Bonsdorff",
    description : "Bonsdorff",
    id : "vnsk_bonsdorff",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_borenius = {
    title : "Borenius",
    description : "Borenius",
    id : "vnsk_borenius",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_borg = {
    title : "Borg",
    description : "Borg",
    id : "vnsk_borg",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_cantell = {
    title : "Cantell",
    description : "Cantell",
    id : "vnsk_cantell",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_corander = {
    title : "Corander",
    description : "Corander",
    id : "vnsk_corander",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_costiander = {
    title : "Costiander",
    description : "Costiander",
    id : "vnsk_costiander",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_dahlberg = {
    title : "Dahlberg",
    description : "Dahlberg",
    id : "vnsk_dahlberg",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_edlund = {
    title : "Edlund",
    description : "Edlund",
    id : "vnsk_edlund",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_eklof = {
    title : "Eklof",
    description : "Eklof",
    id : "vnsk_eklof",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_euren = {
    title : "Euren",
    description : "Euren",
    id : "vnsk_euren",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_europaeus = {
    title : "Europaeus",
    description : "Europaeus",
    id : "vnsk_europaeus",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_europaeus_sanastot = {
    title : "Europaeus sanastot",
    description : "Europaeus sanastot",
    id : "vnsk_europaeus_sanastot",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_fabritius = {
    title : "Fabritius",
    description : "Fabritius",
    id : "vnsk_fabritius",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_forsman = {
    title : "Forsman",
    description : "Forsman",
    id : "vnsk_forsman",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_forstrom = {
    title : "Forström",
    description : "Forström",
    id : "vnsk_forstrom",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_friman = {
    title : "Friman",
    description : "Friman",
    id : "vnsk_friman",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_frosterus = {
    title : "Frosterus",
    description : "Frosterus",
    id : "vnsk_frosterus",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_gottlund = {
    title : "Gottlund",
    description : "Gottlund",
    id : "vnsk_gottlund",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_granlund = {
    title : "Granlund",
    description : "Granlund",
    id : "vnsk_granlund",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_hannikainen = {
    title : "Hannikainen",
    description : "Hannikainen",
    id : "vnsk_hannikainen",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_hjelt = {
    title : "Hjelt",
    description : "Hjelt",
    id : "vnsk_hjelt",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_hordh = {
    title : "Hordh",
    description : "Hordh",
    id : "vnsk_hordh",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_hornborg = {
    title : "Hornborg",
    description : "Hornborg",
    id : "vnsk_hornborg",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_ignatius = {
    title : "Ignatius",
    description : "Ignatius",
    id : "vnsk_ignatius",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_ingman = {
    title : "Ingman",
    description : "Ingman",
    id : "vnsk_ingman",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_innain = {
    title : "Innain",
    description : "Innain",
    id : "vnsk_innain",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_juteini = {
    title : "Juteini",
    description : "Juteini",
    id : "vnsk_juteini",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_kemell = {
    title : "Kemell",
    description : "Kemell",
    id : "vnsk_kemell",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_kilpinen = {
    title : "Kilpinen",
    description : "Kilpinen",
    id : "vnsk_kilpinen",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_koskinen = {
    title : "Koskinen",
    description : "Koskinen",
    id : "vnsk_koskinen",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_krohn = {
    title : "Krohn",
    description : "Krohn",
    id : "vnsk_krohn",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_lagervall = {
    title : "Lagervall",
    description : "Lagervall",
    id : "vnsk_lagervall",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_lankela = {
    title : "Lankela",
    description : "Lankela",
    id : "vnsk_lankela",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_lavonius = {
    title : "Lavonius",
    description : "Lavonius",
    id : "vnsk_lavonius",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_lilius_anton = {
    title : "Lilius Anton",
    description : "Lilius Anton",
    id : "vnsk_lilius_anton",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_lilius_aukusti = {
    title : "Lilius Aukusti",
    description : "Lilius Aukusti",
    id : "vnsk_lilius_aukusti",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_lonnrot = {
    title : "Lönnrot",
    description : "Lönnrot",
    id : "vnsk_lonnrot",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_malmberg = {
    title : "Malmberg",
    description : "Malmberg",
    id : "vnsk_malmberg",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_mehilainen = {
    title : "Mehilainen",
    description : "Mehilainen",
    id : "vnsk_mehilainen",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_mela = {
    title : "Mela",
    description : "Mela",
    id : "vnsk_mela",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_meurman = {
    title : "Meurman",
    description : "Meurman",
    id : "vnsk_meurman",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_mmy = {
    title : "Maamiehen Ystävä",
    description : "Maamiehen Ystävä (1844-1845)",
    id : "vnsk_mmy",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_murman = {
    title : "Murman",
    description : "Murman",
    id : "vnsk_murman",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_muut = {
    title : "Muut",
    description : "Muut",
    id : "vnsk_muut",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_nyman = {
    title : "Nyman",
    description : "Nyman",
    id : "vnsk_nyman",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_ovs = {
    title : "Oulun Viikko-Sanomat",
    description : "Oulun Viikko-Sanomat (1829-1833, 1837, 1841)",
    id : "vnsk_ovs",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_polen = {
    title : "Polen",
    description : "Polen",
    id : "vnsk_polen",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_poppius = {
    title : "Poppius",
    description : "Poppius",
    id : "vnsk_poppius",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_puhuttelija = {
    title : "Puhuttelija",
    description : "Puhuttelija",
    id : "vnsk_puhuttelija",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_rein = {
    title : "Rein",
    description : "Rein",
    id : "vnsk_rein",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_roos = {
    title : "Roos",
    description : "Roos",
    id : "vnsk_roos",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_salmelainen = {
    title : "Salmelainen",
    description : "Salmelainen",
    id : "vnsk_salmelainen",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_salonius = {
    title : "Salonius",
    description : "Salonius",
    id : "vnsk_salonius",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_sanaluettelot = {
    title : "Sanaluettelot",
    description : "Sanaluettelot",
    id : "vnsk_sanaluettelot",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_sandberg = {
    title : "Sandberg",
    description : "Sandberg",
    id : "vnsk_sandberg",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_schroter = {
    title : "Schröter",
    description : "Schröter",
    id : "vnsk_schroter",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_sirelius = {
    title : "Sirelius",
    description : "Sirelius",
    id : "vnsk_sirelius",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_skogman = {
    title : "Skogman",
    description : "Skogman",
    id : "vnsk_skogman",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_smtr = {
    title : "Suomettaren vuosikertoja",
    description : "Suomettaren vuosikerrat (1847-1848)",
    id : "vnsk_smtr",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_sohlberg = {
    title : "Sohlberg",
    description : "Sohlberg",
    id : "vnsk_sohlberg",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_soldan = {
    title : "Soldan",
    description : "Soldan",
    id : "vnsk_soldan",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_ssv = {
    title : "Sanan Saattaja Viipurista",
    description : "Sanan Saattaja Viipurista",
    id : "vnsk_ssv",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_stahlberg = {
    title : "Ståhlberg",
    description : "Ståhlberg",
    id : "vnsk_stahlberg",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_tarvanen = {
    title : "Tarvanen",
    description : "Tarvanen",
    id : "vnsk_tarvanen",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_ticklen = {
    title : "Ticklen",
    description : "Ticklen",
    id : "vnsk_ticklen",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_tikkanen = {
    title : "Tikkanen",
    description : "Tikkanen",
    id : "vnsk_tikkanen",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_topelius = {
    title : "Topelius",
    description : "Topelius",
    id : "vnsk_topelius",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_toppelius = {
    title : "Toppelius",
    description : "Toppelius",
    id : "vnsk_toppelius",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_tvs = {
    title : "Turun Viikko-Sanomat",
    description : "Turun Viikko-Sanomat",
    id : "vnsk_tvs",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_varelius = {
    title : "Varelius",
    description : "Varelius",
    id : "vnsk_varelius",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_virsikirja = {
    title : "Virsikirja",
    description : "Virsikirja",
    id : "vnsk_virsikirja",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_wallin = {
    title : "Wallin",
    description : "Wallin",
    id : "vnsk_wallin",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_wikman = {
    title : "Wikman",
    description : "Wikman",
    id : "vnsk_wikman",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
};

settings.corpora.vnsk_wiwolin = {
    title : "Wiwolin",
    description : "Wiwolin",
    id : "vnsk_wiwolin",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.vnsk
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
    title : "Suomenkielinen Gutenberg -korpus",
    description : "Project Gutenbergin sisältämiä suomenkielisiä teoksia, joiden tekijänoikeus on päättynyt",
    id : "gutenberg",
    urn : "urn:nbn:fi:lb-2014102101",
    metadata_urn : "urn:nbn:fi:lb-2014100301",
    homepage : {
	url : "http://www.gutenberg.org/",
	name : "Project Gutenberg",
	no_label : true
    },
    // Is the following correct? According to META-SHARE, licence
    // would be CC BY.
    // licence_url : "http://www.gutenberg.org/wiki/Gutenberg:The_Project_Gutenberg_License",
    licence : settings.licenceinfo.CC_BY,
    within : settings.spWithin,
    context : settings.spContext,
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
    licence : settings.licenceinfo.CC_BY_40,
    features : ["paragraphs", "parsed_tdt", "finer"],
    attributes : {
        original : attrs.origword,
        normalized : {
            label : "murre_normalized",
            opts : settings.defaultOptions,
        },
        comment : {
	    label : "word_comment",
	    opts : settings.defaultOptions
	},
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

/* SINEBRYCHOFF */

settings.corpora.sinebrychoff_fi = {
    id : "sinebrychoff_fi",
    title: "Paul Sinebrychoffin kirjeenvaihto",
    description : "Paul Sinebrychoffin kirjeenvaihto, suomenkieliset käännökset",
    metadata_urn : "urn:nbn:fi:lb-201407303",
    licence : settings.licenceinfo.CC_BY_30,
    context : settings.spContext,
    within : settings.spWithin,
    attributes: attrlist.sinebrychoff,
    struct_attributes : sattrlist.sinebrychoff
};


/* TOPLING SUOMI */
/*
settings.corpora.topling_fi_test = {
    id : "topling_fi_test",
    title : "TOPLING (suomi, debug)",
    description : "TOPLING (suomi, debug)",
    context : settings.spContext,
    within : settings.spWithin,
    attributes : attrlist.topling,
    struct_attributes : sattrlist.topling
    };*/

settings.corpora.topling_fi = {
    id : "topling_fi",
    title : "Topling (suomi)",
    description : "Topling – Toisen kielen oppimisen polut, suomenkielinen osakorpus",
    urn : "urn:nbn:fi:lb-2016112902",
    metadata_urn : "urn:nbn:fi:lb-2016111802",
    lbr_id : "urn:nbn:fi:lb-20140730168",
    licence : {
	name : "CLARIN RES +NC +DEP 1.0",
	urn : "urn:nbn:fi:lb-2016112305"
    },
    homepage_url : "https://www.jyu.fi/topling",
    context : settings.spContext,
    within : settings.spWithin,
    limited_access : true,
    licence_type : "RES",
    attributes : attrlist.topling,
    struct_attributes : sattrlist.topling
};

settings.corpora.ceal_o = {
    title : "CEAL-o",
    description : "Classics of English and American Literature in Finnish (original)",
    id : "ceal_o",
    limited_access : true,
    licence_type : "RES",
    metadata_urn : "urn:nbn:fi:lb-2017011302",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {},
    struct_attributes : {
        text_title : sattrs.text_title,
        text_year : sattrs.date,
        text_author : {
            label : "text_author"
        },
        text_translator : sattrs.text_translator
    }
};

settings.corpora.ceal_s = {
    title : "CEAL-s",
    description : "Classics of English and American Literature in Finnish (scrambled)",
    id : "ceal_s",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    metadata_urn : "urn:nbn:fi:lb-2017011303",
    limited_access : true,
    licence_type : "ACA",
    attributes : {},
    struct_attributes : {
        text_title : sattrs.text_title,
        text_year : sattrs.date,
        text_author : {
            label : "text_author"
        },
        text_translator : sattrs.text_translator
    }
};

settings.corpora.arkisyn = {
    title : "Arkisyn",
    description : "Arkisyn",
    id : "arkisyn",
    urn : "urn:nbn:fi:lb-2017022702",
    metadata_urn : "urn:nbn:fi:lb-2017022801",
    licence : settings.licenceinfo.CC_BY_ND,
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        lemma : attrs.baseform,
        pos : attrs.pos_las2,
        fun : attrs.func_la,
        mrp : attrs.msd,
        origword : attrs.origword
    },
    struct_attributes : {
        text_filename : {
            label : "file_name",
        },
    }
};

settings.corpora.eduskunta = {
    title : "Eduskunta - transkriptiot",
    description : "Eduskunta - transkriptiot",
    id : "eduskunta",
    metadata_urn : "urn:nbn:fi:lb-2017020202",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.standard,
    struct_attributes : {
        text_filename : {
            label : "file_name",
        },
        text_date : sattrs.date,
        text_time : sattrs.text_time,
        paragraph_participant : {
            label : "speech_speakername"
        }
    }
};

settings.corpus_aliases["topling-fi"] = "topling_fi";


/* DMA – Digitaalinen muoto-opin arkisto (Digital Morphology Archives) */

// Return a stringify function for a dataset attribute attrname in the
// DMA corpus. The stringify function returns the value as mapped
// through the dataset, without localization.
settings.fn.dma_stringify_dataset_value = function (attrname) {
    return function (value) {
	return settings.corpora.dma.struct_attributes[attrname].dataset[value];
    };
};

settings.corpora.dma = {
    title : "DMA – Digitaalinen muoto-opin arkisto",
    description : "DMA – Digitaalinen muoto-opin arkisto<br/><a href='https://www.kielipankki.fi/tuki/korp-dma/' target='_blank'>Ohjeita DMA:n käyttämiseen Korpissa</a>, erityisesti verrattuna vanhaan CSC:n Tutkijan käyttöliittymän DMA:han<br/><strong>Huomaa</strong>, että vaikka aineiston tekstiosa on kaikkien käytettävisssä, PDF-muotoisten sanalippujen katseleminen edellyttää Kielipankin oikeudet -sovelluksen kautta haettua <a href='https://lbr.csc.fi/web/guest/catalogue?domain=LBR&resource=urn:nbn:fi:lb-201403261&target=application' target='_blank'>DMA:n käyttölupaa</a>.",
    id : "dma",
    urn : "urn:nbn:fi:lb-2016032102",
    metadata_urn : "urn:nbn:fi:lb-201403261",
    homepage_url : "http://www.helsinki.fi/fus/research/ma.html",
    // TODO (util.coffee): Allow an array of values for licence.
    licence : {
	name : "CC BY 4.0 (teksti) / CLARIN RES +PRIV +ND (PDF-sanaliput)",
	urn : "urn:nbn:fi:lb-2016042202",
    },
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	searchword : {
	    label : "search_word",
	    opts : settings.defaultOptions,
	}
    },
    struct_attributes : {
	text_dialect_region : {
	    label : "dialect_region",
	    displayType : "select",
	    localize : false,
	    // The values of the dataset are shown for the keys
	    // without localization.
	    stringify : settings.fn.dma_stringify_dataset_value(
		"text_dialect_region"),
	    dataset : {
		"1" : "1 Lounaismurteet",
		"2" : "2 Lounaiset välimurteet",
		"3" : "3 Hämäläismurteet",
		"4" : "4 Etelä-Pohjanmaan murteet",
		"5" : "5 Keski- ja Pohjois-Pohjanmaan murteet",
		"6" : "6 Peräpohjolan murteet",
		"7" : "7 Savolaismurteet",
		"8" : "8 Kaakkoismurteet",
	    },
	    opts : settings.liteOptions,
	},
	text_dialect_group : {
            label : "dialect_group",
	    displayType : "select",
	    localize : false,
	    stringify : function (value) {
		return (settings.corpora.dma.struct_attributes
			.text_dialect_group.dataset[value]
			.replace(/[\x00-\x1F ]+/g, ""));
	    },
	    dataset : {
		// The control characters \x01–\x08 are used to get
		// the desired sorting order. They are invisible in
		// the output, but could they cause problems in some
		// cases?
		"[1-6].?" : "\x011–6 Länsimurteet",
		"1." : "\x01  1 Lounaismurteet",
		"1a" : "\x01    1a pohjoisryhmä",
		"1b" : "\x01    1b itäryhmä",
		"2." : "\x02  2 Lounaiset välimurteet",
		"2a" : "\x02    2a Porin seudun murteet",
		"2b" : "\x02    2b Ala-Satakunnan murteet",
		"2c" : "\x02    2c Turun ylämaan murteet",
		"2d" : "\x02    2d Someron murre",
		"2e" : "\x02    2e Länsi-Uudenmaan murteet",
		"3." : "\x03  3 Hämäläismurteet",
		"3a" : "\x03    3a Ylä-Satakunnan murteet",
		"3b" : "\x03    3b perihämäläiset murteet",
		"3c" : "\x03    3c etelähämäläiset murteet",
		"3[d-f]" : "\x03    3d–f kaakkoishämäläiset murteet",
		"3d" : "\x03      3d Hollolan ryhmä",
		"3e" : "\x03      3e Porvoon ryhmä",
		"3f" : "\x03      3f Kymenlaakson ryhmä",
		"4" : "\x04  4 Etelä-Pohjanmaan murteet",
		"5." : "\x05  5 Keski- ja Pohjois-Pohjanmaan murteet",
		"5a" : "\x05    5a Keski-Pohjanmaan murteet",
		"5b" : "\x05    5b Pohjois-Pohjanmaan murteet",
		"6." : "\x06  6 Peräpohjolan murteet",
		"6a" : "\x06    6a Tornion murre",
		"6b" : "\x06    6b Jällivaaran murre",
		"6c" : "\x06    6c Kemin murre",
		"6d" : "\x06    6d Kemijärven murre",
		"6e" : "\x06    6e Ruijan murre",
		"[7-8]." : "\x077–8 Itämurteet",
		"7." : "\x07  7 Savolaismurteet",
		"7a" : "\x07    7a Päijät-Hämeen murteet",
		"7b" : "\x07    7b Etelä-Savon murteet",
		"7c" : "\x07    7c Säämingin–Kerimäen ryhmä",
		"7d" : "\x07    7d itäiset savolaismurteet",
		"7e" : "\x07    7e Pohjois-Savon murteet",
		"7f" : "\x07    7f Keski-Suomen murteet",
		"7g" : "\x07    7g savolaiskiilan murteet",
		"7h" : "\x07    7h Kainuun murteet",
		"7i" : "\x07    7i Vermlannin murteet",
		"8." : "\x08  8 Kaakkoismurteet",
		"8[a–b]" : "\x08    \x018a–b varsinaiset kaakkoismurteet",
		"8a" : "\x08    \x01  8a Länsi-Kannaksen murteet",
		"8b" : "\x08    \x01  8b Itä-Kannaksen murteet",
		"8c" : "\x08    8c Inkerin suomalaismurteet",
		"8d" : "\x08    8d Lemin murre",
		"8e" : "\x08    8e Sortavalan seudun murteet",
	    },
	    opts : settings.liteOptions,
	},
	text_parish_name : {
            label : "parish",
	    displayType : "select",
	    localize : false,
	    // translationKey : "",
	    dataset : [
		"Artjärvi",
		"Asikkala",
		"Askola",
		"Eurajoki",
		"Haapavesi",
		"Halikko",
		"Halsua",
		"Hausjärvi",
		"Heinjoki",
		"Heinävesi",
		"Himanka",
		"Hinnerjoki",
		"Hirvensalmi",
		"Honkajoki",
		"Honkilahti",
		"Ilmajoki",
		"Ilomantsi",
		"Isojoki",
		"Itä-Ruija",
		"Jalasjärvi",
		"Joutsa",
		"Joutseno",
		"Juupajoki",
		"Jällivaara",
		"Järvisaari",
		"Kaarina",
		"Kajaani",
		"Kalajoki",
		"Kalvola",
		"Kangasala",
		"Kankaanpää",
		"Kannonkoski",
		"Karstula",
		"Karttula",
		"Kauhava",
		"Kaustinen",
		"Kemijärvi",
		"Keminmlk",
		"Kerimäki",
		"Kesälahti",
		"Keuruu",
		"Kiikka",
		"Kitee",
		"Kittilä",
		"Kiuruvesi",
		"Kivennapa",
		"Koivisto",
		"Kolari",
		"Kontiolahti",
		"Korpilahti",
		"Kuhmoinen",
		"Kuivaniemi",
		"Kurikka",
		"Kuru",
		"Kymi",
		"Käkisalmi",
		"Kälviä",
		"Kärsämäki",
		"Laihia",
		"Laitila",
		"Lapinlahti",
		"Lappajärvi",
		"Lappee",
		"Laukaa",
		"Lavansaari",
		"Lemi",
		"Leppävirta",
		"Liperi",
		"Loimaa",
		"Luhanka",
		"Lumivaara",
		"Luumäki",
		"Markkova",
		"Masku",
		"Merikarvia",
		"Merimasku",
		"Miehikkälä",
		"Mietoinen",
		"Mikkelinmlk",
		"Myrskylä",
		"Mäntyharju",
		"Nivala",
		"Nousiainen",
		"Nummi",
		"Nurmes",
		"Orimattila",
		"Oulujoki",
		"Paavola",
		"Parkano",
		"Pattijoki",
		"Perho",
		"Pieksämäki",
		"Pielisjärvi",
		"Pihtipudas",
		"Polvijärvi",
		"Pori",
		"Pornainen",
		"Pudasjärvi",
		"Pyhäjoki",
		"Pyhäjärvi Ol.",
		"Pöytyä",
		"Raisi",
		"Rauma",
		"Rautio",
		"Reisjärvi",
		"Ristiina",
		"Ruokolahti",
		"Ruovesi",
		"Rymättylä",
		"Saarijärvi",
		"Salla",
		"Sauvo",
		"Savitaipale",
		"Siilinjärvi",
		"Simo",
		"Sodankylä",
		"Somero",
		"Sonkajärvi",
		"Sortavala",
		"Sumiainen",
		"Suomusjärvi",
		"Suomussalmi",
		"Sysmä",
		"Sääksmäki",
		"Sääminki",
		"Taivassalo",
		"Tammela",
		"Teisko",
		"Tuulos",
		"Tuusniemi",
		"Tuutari",
		"Töysä",
		"Uukuniemi",
		"Uurainen",
		"Uusikirkko Vpl.",
		"Valkeala",
		"Vehkalahti",
		"Vehmersalmi",
		"Vermlanti",
		"Vesanto",
		"Veteli",
		"Vihti",
		"Viipurin mlk.",
		"Virolahti",
		"Virrat",
		"Vähäkyrö",
		"Yli-Ii",
		"Ylihärmä",
		"Ylitornio",
		"Ypäjä",
		"Ähtäri",
	    ],
	    // // An alternative with dialect group code preprended
	    // stringify : settings.fn.dma_stringify_dataset_value(
	    // 	"text_parish_name"),
	    // dataset : {
	    // 	"Eurajoki" : "1a Eurajoki",
	    // 	"Hinnerjoki" : "1a Hinnerjoki",
	    // 	"Honkilahti" : "1a Honkilahti",
	    // 	"Laitila" : "1a Laitila",
	    // 	"Masku" : "1a Masku",
	    // 	"Merimasku" : "1a Merimasku",
	    // 	"Mietoinen" : "1a Mietoinen",
	    // 	"Nousiainen" : "1a Nousiainen",
	    // 	"Rauma" : "1a Rauma",
	    // 	"Rymättylä" : "1a Rymättylä",
	    // 	"Taivassalo" : "1a Taivassalo",
	    // 	"Halikko" : "1b Halikko",
	    // 	"Kaarina" : "1b Kaarina",
	    // 	"Sauvo" : "1b Sauvo",
	    // 	"Suomusjärvi" : "1b Suomusjärvi",
	    // 	"Merikarvia" : "2a Merikarvia",
	    // 	"Pori" : "2a Pori",
	    // 	"Loimaa" : "2b Loimaa",
	    // 	"Pöytyä" : "2c Pöytyä",
	    // 	"Somero" : "2d Somero",
	    // 	"Nummi" : "2e Nummi",
	    // 	"Vihti" : "2e Vihti",
	    // 	"Honkajoki" : "3a Honkajoki",
	    // 	"Kankaanpää" : "3a Kankaanpää",
	    // 	"Kiikka" : "3a Kiikka",
	    // 	"Parkano" : "3a Parkano",
	    // 	"Virrat" : "3a Virrat",
	    // 	"Juupajoki" : "3b Juupajoki",
	    // 	"Kalvola" : "3b Kalvola",
	    // 	"Kangasala" : "3b Kangasala",
	    // 	"Kuru" : "3b Kuru",
	    // 	"Ruovesi" : "3b Ruovesi",
	    // 	"Sääksmäki" : "3b Sääksmäki",
	    // 	"Teisko" : "3b Teisko",
	    // 	"Tuulos" : "3b Tuulos",
	    // 	"Hausjärvi" : "3c Hausjärvi",
	    // 	"Tammela" : "3c Tammela",
	    // 	"Ypäjä" : "3c Ypäjä",
	    // 	"Asikkala" : "3d Asikkala",
	    // 	"Orimattila" : "3d Orimattila",
	    // 	"Askola" : "3e Askola",
	    // 	"Myrskylä" : "3e Myrskylä",
	    // 	"Pornainen" : "3e Pornainen",
	    // 	"Artjärvi" : "3f Artjärvi",
	    // 	"Kymi" : "3f Kymi",
	    // 	"Valkeala" : "3f Valkeala",
	    // 	"Vehkalahti" : "3f Vehkalahti",
	    // 	"Ilmajoki" : "4 Ilmajoki",
	    // 	"Isojoki" : "4 Isojoki",
	    // 	"Jalasjärvi" : "4 Jalasjärvi",
	    // 	"Kauhava" : "4 Kauhava",
	    // 	"Kurikka" : "4 Kurikka",
	    // 	"Laihia" : "4 Laihia",
	    // 	"Töysä" : "4 Töysä",
	    // 	"Vähäkyrö" : "4 Vähäkyrö",
	    // 	"Ylihärmä" : "4 Ylihärmä",
	    // 	"Haapavesi" : "5a Haapavesi",
	    // 	"Halsua" : "5a Halsua",
	    // 	"Himanka" : "5a Himanka",
	    // 	"Kalajoki" : "5a Kalajoki",
	    // 	"Kälviä" : "5a Kälviä",
	    // 	"Kärsämäki" : "5a Kärsämäki",
	    // 	"Kaustinen" : "5a Kaustinen",
	    // 	"Nivala" : "5a Nivala",
	    // 	"Perho" : "5a Perho",
	    // 	"Pyhäjoki" : "5a Pyhäjoki",
	    // 	"Rautio" : "5a Rautio",
	    // 	"Reisjärvi" : "5a Reisjärvi",
	    // 	"Veteli" : "5a Veteli",
	    // 	"Kuivaniemi" : "5b Kuivaniemi",
	    // 	"Oulujoki" : "5b Oulujoki",
	    // 	"Paavola" : "5b Paavola",
	    // 	"Pattijoki" : "5b Pattijoki",
	    // 	"Yli-Ii" : "5b Yli-Ii",
	    // 	"Kolari" : "6a Kolari",
	    // 	"Ylitornio" : "6a Ylitornio",
	    // 	"Jällivaara" : "6b Jällivaara",
	    // 	"Keminmlk" : "6c Keminmlk",
	    // 	"Kittilä" : "6c Kittilä",
	    // 	"Simo" : "6c Simo",
	    // 	"Sodankylä" : "6c Sodankylä",
	    // 	"Kemijärvi" : "6d Kemijärvi",
	    // 	"Salla" : "6d Salla",
	    // 	"Itä-Ruija" : "6e Itä-Ruija",
	    // 	"Raisi" : "6e Raisi",
	    // 	"Joutsa" : "7a Joutsa",
	    // 	"Korpilahti" : "7a Korpilahti",
	    // 	"Kuhmoinen" : "7a Kuhmoinen",
	    // 	"Luhanka" : "7a Luhanka",
	    // 	"Sysmä" : "7a Sysmä",
	    // 	"Hirvensalmi" : "7b Hirvensalmi",
	    // 	"Mäntyharju" : "7b Mäntyharju",
	    // 	"Mikkelinmlk" : "7b Mikkelinmlk",
	    // 	"Ristiina" : "7b Ristiina",
	    // 	"Kerimäki" : "7c Kerimäki",
	    // 	"Sääminki" : "7c Sääminki",
	    // 	"Ilomantsi" : "7d Ilomantsi",
	    // 	"Kesälahti" : "7d Kesälahti",
	    // 	"Kitee" : "7d Kitee",
	    // 	"Kontiolahti" : "7d Kontiolahti",
	    // 	"Liperi" : "7d Liperi",
	    // 	"Nurmes" : "7d Nurmes",
	    // 	"Pielisjärvi" : "7d Pielisjärvi",
	    // 	"Polvijärvi" : "7d Polvijärvi",
	    // 	"Heinävesi" : "7e Heinävesi",
	    // 	"Karttula" : "7e Karttula",
	    // 	"Kiuruvesi" : "7e Kiuruvesi",
	    // 	"Lapinlahti" : "7e Lapinlahti",
	    // 	"Leppävirta" : "7e Leppävirta",
	    // 	"Pieksämäki" : "7e Pieksämäki",
	    // 	"Pyhäjärvi Ol." : "7e Pyhäjärvi Ol.",
	    // 	"Siilinjärvi" : "7e Siilinjärvi",
	    // 	"Sonkajärvi" : "7e Sonkajärvi",
	    // 	"Tuusniemi" : "7e Tuusniemi",
	    // 	"Vehmersalmi" : "7e Vehmersalmi",
	    // 	"Vesanto" : "7e Vesanto",
	    // 	"Kannonkoski" : "7f Kannonkoski",
	    // 	"Karstula" : "7f Karstula",
	    // 	"Laukaa" : "7f Laukaa",
	    // 	"Pihtipudas" : "7f Pihtipudas",
	    // 	"Saarijärvi" : "7f Saarijärvi",
	    // 	"Sumiainen" : "7f Sumiainen",
	    // 	"Uurainen" : "7f Uurainen",
	    // 	"Ähtäri" : "7g Ähtäri",
	    // 	"Keuruu" : "7g Keuruu",
	    // 	"Lappajärvi" : "7g Lappajärvi",
	    // 	"Kajaani" : "7h Kajaani",
	    // 	"Pudasjärvi" : "7h Pudasjärvi",
	    // 	"Suomussalmi" : "7h Suomussalmi",
	    // 	"Vermlanti" : "7i Vermlanti",
	    // 	"Heinjoki" : "8a Heinjoki",
	    // 	"Kivennapa" : "8a Kivennapa",
	    // 	"Koivisto" : "8a Koivisto",
	    // 	"Lappee" : "8a Lappee",
	    // 	"Lavansaari" : "8a Lavansaari",
	    // 	"Luumäki" : "8a Luumäki",
	    // 	"Miehikkälä" : "8a Miehikkälä",
	    // 	"Uusikirkko Vpl." : "8a Uusikirkko Vpl.",
	    // 	"Viipurin mlk." : "8a Viipurin mlk.",
	    // 	"Virolahti" : "8a Virolahti",
	    // 	"Joutseno" : "8b Joutseno",
	    // 	"Käkisalmi" : "8b Käkisalmi",
	    // 	"Lumivaara" : "8b Lumivaara",
	    // 	"Ruokolahti" : "8b Ruokolahti",
	    // 	"Järvisaari" : "8c Järvisaari",
	    // 	"Markkova" : "8c Markkova",
	    // 	"Tuutari" : "8c Tuutari",
	    // 	"Lemi" : "8d Lemi",
	    // 	"Savitaipale" : "8d Savitaipale",
	    // 	"Sortavala" : "8e Sortavala",
	    // 	"Uukuniemi" : "8e Uukuniemi",
	    // },
	    opts : settings.liteOptions,
	},
	text_village : {
	    label : "village",
	},
	text_parish : {
	    // Should we have this separately? The attribute parish
	    // contains the parish name with the dialect group code
	    // prepended. Or should "parish_name" actually be simply
	    // "parish"?
	    label : "parish",
	    displayType : "hidden",
	},
	sentence_comment : {
            label : "comment",
	},
	sentence_informant : {
	    label : "informant",
	},
	sentence_informant_sex : {
	    label : "informant_sex",
	    displayType : "select",
	    translationKey : "",
	    dataset : {
		"m" : "male",
		"n" : "female",
		"" : "unknown"
	    },
	    opts : settings.liteOptions,
	},
	sentence_informant_birthyear : {
            label : "informant_birthyear",
	},
	sentence_signum : {
	    label : "signum",
	    type : "set",
	    opts : settings.setOptions,
	    // This URL is in the sidebar (i) link
	    taginfo_url : "markup/dma_signumlist.html",
	    // The input field also has an (i) link opening a list of
	    // signums as links from which one can select. This has
	    // been copied and modified from the code for the the
	    // Swedish msd attribute.
	    extended_template : '<input class="arg_value" ng-model="model">' +
		'<span ng-click="onIconClick()" class="fa fa-info-circle"></span>',
	    controller : function($scope, $modal) {
		var modal = null;
		$scope.onIconClick = function() {
		    modal = $modal.open({
			template : '<div>' +
			    '<div class="modal-header">' +
			    '<h3 class="modal-title">{{\'signum\' | loc:lang}}</h3>' +
			    '<span ng-click="clickX()" class="close-x">×</span>' +
			    '</div>' +
			    '<div class="modal-body" ng-click="handleClick($event)" ng-include="\'markup/dma_signumlist_links.html\'"></div>' +
			    '</div>',
			scope : $scope
		    })
		}
		$scope.clickX = function(event) {
		    modal.close()
		}
		$scope.handleClick = function(event) {
		    val = $(event.target).parents("td").data("value");
		    // c.log ("signum selected:", val);
		    if(!val) return;
		    $scope.model = val;
		    // c.log ("signum updated $scope:", $scope);
		    modal.close();
		}
	    },
	},
	sentence_signumlist : {
	    label : "signum_list",
	    opts : settings.defaultOptions,
	},
	sentence_updated : {
	    displayType : "hidden",
	},
	sentence_location : {
	    label : "original_location",
	    opts : settings.defaultOptions,
	},
	sentence_text_words : {
	    label : "clause_any_wordform",
	    type : "set",
	    // This would benefit from having also other options than
	    // "is" and "is not" for a set-valued attribute, but that
	    // is not (yet) possible.
	    opts : settings.setOptions,
	    displayOnly : "search",
	},
	sentence_search_words : {
	    label : "clause_any_search_word",
	    type : "set",
	    // The same applies here as in sentence_text_words.
	    opts : settings.setOptions,
	    displayOnly : "search",
	},
	sentence_pdf : {
            label : "show_wordnote",
            opts : settings.defaultOptions,
            type : "url",
            url_opts : $.extend({}, sattrs.link_url_opts, {
                stringify_link : function (key, filename, attrs, html_attrs) {
		    if (! filename) {
			return "";
		    }
                    var fnames = filename.split(" ");
                    var output = ("<span rel='localize[" + attrs.label + "]'>"
				  + key + "</span> [RES]:");
                    for (var i = 0; i < fnames.length; i++) {
                        var fname = (fnames[i]
				     .replace(/ä/g, 'a')
				     .replace(/Ä/g, 'A')
				     .replace(/ö/g, 'o'));
                        var url = ("/dma/pdf/"
                                   + fname.slice(0, fname.lastIndexOf("_"))
                                   + "/" + fname);
                        output += ("<br/><a href='" + url + "' " + html_attrs
				   + ">" + fname + "</a>");
                    }
                    return output;
                }
            }),
	},
	sentence_id : sattrs.sentence_id,
    }
};


settings.corpora.ylilauta = {
    title : "Ylilauta",
    description : "Ylilauta",
    id : "ylilauta",
    urn : "urn:nbn:fi:lb-2015031802",
    metadata_urn : "urn:nbn:fi:lb-2015031802",
    licence : settings.licenceinfo.CC_BY_NC,
    homepage_url : "https://ylilauta.org",
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

/* SUOMI 24 */

// Properties urn, metadata_urn, licence and homepage_url of
// settings.corpora.s24_??? come from
// settings.corporafolders.internet.suomi24, so they should not be
// specified in the settings of the individual subcorpora.

settings.corpora.s24_001 = {
    title : "Suomi24 (1/10)",
    description : "Suomi24-keskustelut (1/10)",
    id : "s24_001",
    features : ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes : sattrlist.s24_update
};

settings.corpora.s24_002 = {
    title : "Suomi24 (2/10)",
    description : "Suomi24-keskustelut (2/10)",
    id : "s24_002",
    features : ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes : sattrlist.s24_update
};

settings.corpora.s24_003 = {
    title : "Suomi24 (3/10)",
    description : "Suomi24-keskustelut (3/10)",
    id : "s24_003",
    features : ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes : sattrlist.s24_update
};

settings.corpora.s24_004 = {
    title : "Suomi24 (4/10)",
    description : "Suomi24-keskustelut (4/10)",
    id : "s24_004",
    features : ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes : sattrlist.s24_update
};

settings.corpora.s24_005 = {
    title : "Suomi24 (5/10)",
    description : "Suomi24-keskustelut (5/10)",
    id : "s24_005",
    features : ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes : sattrlist.s24_update
};

settings.corpora.s24_006 = {
    title : "Suomi24 (6/10)",
    description : "Suomi24-keskustelut (6/10)",
    id : "s24_006",
    features : ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes : sattrlist.s24_update
};

settings.corpora.s24_007 = {
    title : "Suomi24 (7/10)",
    description : "Suomi24-keskustelut (7/10)",
    id : "s24_007",
    features : ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes : sattrlist.s24_update
};

settings.corpora.s24_008 = {
    title : "Suomi24 (8/10)",
    description : "Suomi24-keskustelut (8/10)",
    id : "s24_008",
    features : ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes : sattrlist.s24_update
};
/*
settings.corpora.s24_009test = {
    title : "Suomi24 (test)",
    description : "Suomi24-keskustelut (test)",
    id : "s24_009test",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.parsed_tdt,
    struct_attributes : sattrlist.s24_update
};
*/

settings.corpora.s24_009 = {
    title : "Suomi24 (9/10)",
    description : "Suomi24-keskustelut (9/10)",
    id : "s24_009",
    features : ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes : sattrlist.s24_update
};

settings.corpora.s24_010 = {
    title : "Suomi24 (10/10)",
    description : "Suomi24-keskustelut (10/10)",
    id : "s24_010",
    features : ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes : sattrlist.s24_update
};

settings.corpus_aliases.suomi24 = "s24_0[0-9][0-9]";

// Configure a short URL: preselect only the Suomi24 corpus folder
// (all its subcorpora)
settings.short_url_config.suomi24 =
    function () {
	settings.preselected_corpora = ["__internet.suomi24"];
    };


settings.corpora.s24 = {
    title : "Suomi24 2001–2014 (näyte)",
    description : "Suomi24-keskusteluja 2001–2014 (näyte).<br/>Tämä korpus sisältää osan <a href='http://keskustelu.suomi24.fi' target='_blank'>Suomi24-keskustelupalvelun</a> keskusteluista vuosilta 2001–2014; kaikki keskustelut (myös tämän korpuksen sisältämät) sisältyvät korpukseen <i>Suomi24</i>.<br/>(Tämä korpus näkyi aiemmin nimellä <i>Suomi24</i>.)",
    id : "s24",
    // URN information also in the corpus .info file; if you need to
    // update the URNs, you should also check it.
    // TODO: Update the URNs when the new URNs are available. (2015-12-01)
    // urn : "urn:nbn:fi:lb-2015040102",
    // metadata_urn : "urn:nbn:fi:lb-2015091701",
    licence : settings.licenceinfo.CC_BY_NC,
    homepage_url : "http://keskustelu.suomi24.fi",
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
    licence : {
	name : "CLARIN RES +PLAN +NC +INF +PRIV +DEP",
	urn : "urn:nbn:fi:lb-2015050501"
    },
    homepage_url : "http://www.oulu.fi/suomitoisenakielena/node/16078",
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
        text_levelcefrone : {
            label : "iclfi_levelcefrone"
	},
        text_levelcefrtwo : {
            label : "iclfi_levelcefrtwo"
	},
        text_otherlangs : {
            label : "iclfi_otherlangs"
	},
        text_levelcefrthree : {
            label : "iclfi_levelcefrthree"
        },
        text_levelcefrfour : {
            label : "iclfi_levelcefrfour"
        },
        text_cefrlevel : {
            label : "iclfi_cefrlevel"
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
    ["dma",
     "ftb(2|3_.*)",
     "reittidemo",
     "klk_fi_18[234][0-9]",
     "kotus_ns_presidentti_.*",
     "kotus_klassikot",
     "kotus_sananparret",
     "lam_.*",
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
// other properties. Each element is an object with the properties
// "test" (a function returning true for the attribute object if the
// extra properties should be added) and "props" (an object containing
// the extra properties to be added).
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
	var attr_group_names = ["attributes", "struct_attributes"];
	var attr_group_count = attr_group_names.length;
	for (var groupnum = 0; groupnum < attr_group_count; groupnum++) {
	    if (attr_group_names[groupnum] in corpus) {
		var attrs = corpus[attr_group_names[groupnum]];
		var extra_props_count = settings.attr_extra_properties.length;
		for (var attrname in attrs) {
		    for (var i = 0; i < extra_props_count; i++) {
			var attr_extra_props =
			    settings.attr_extra_properties[i];
			var attr = attrs[attrname];
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
}

// Add the extra properties to corpora
//
// FIXME: This works for attributes set via the "features" property
// only if the same attribute objects are referred to directly from
// some other corpus configuration. Fixing would probably require
// moving this to initialization code (util.coffee, main.coffee),
// which might also otherwise make sense. (Jyrki Niemi 2016-10-18)

settings.fn.add_attr_extra_properties(settings.corpora);


/*
 * TODO add all other copora settings here
 */



/*
 * MISC
 */


// label values here represent translation keys.
settings.arg_groups = {
    "word" : {
        word : {label : "word"}
    }
};

settings.reduce_helpers = {
    filterCorpora: function(rowObj) {
        return $.grepObj(rowObj, function(value, key) {
            return key != "total_value" && key != "hit_value" && $.isArray(value);
        });
    },
    getCorpora: function (dataContext) {
        var corpora = $.grepObj(settings.reduce_helpers.filterCorpora(dataContext), function(value, key) {
            return value[1] != null; // value[1] is an optimized value.relative
        });
        corpora = $.map(_.keys(corpora), function(item) {
	    // Leave out only the last underscore-separated component
	    // of the corpus name (probably "value", set in
	    // statistics_worker.js), to support corpus names (ids)
	    // containing underscores. (Jyrki Niemi 2015-09-17)
	    var lastUscore = item.lastIndexOf("_");
	    return ((lastUscore == -1 ? item : item.slice(0, lastUscore))
		    .toLowerCase());
            // return item.split("_")[0].toLowerCase();
        });
        return corpora;
    }
};

settings.reduce_statistics_pie_chart = function(row, cell, value, columnDef, dataContext) {
    if(value != "&Sigma;")
        value = value[0].replace(/:\d+/g, "")
    return $.format('<img id="circlediagrambutton__%s" src="img/stats2.png" class="arcDiagramPicture"/>', value);
};

settings.reduce_statistics = function(types, ignoreCase) {

    return function(row, cell, value, columnDef, dataContext) {

        var corpora = settings.reduce_helpers.getCorpora(dataContext);

        if(value == "&Sigma;")
            return "&Sigma;";

        var tokenLists = _.map(value, function(val) {
            return _.map(val.split('/'), function(as) {
                return as.split(" ");
            });
        });

        var typeIdx = types.indexOf(columnDef.id);
        var linkInnerHTML = settings.reduce_stringify(columnDef.id, tokenLists[0][typeIdx], corpora);

        var totalQuery = []

        var structAttrs =
	    settings.corpusListing.subsetFactory(corpora).getStructAttrs();

        // create one query part for each token
        for(var tokenIdx = 0; tokenIdx < tokenLists[0][0].length; tokenIdx++) {

            var andParts = []
            // for each reduce attribute: create a query part and then join all with &
            for(var typeIdx = 0; typeIdx < types.length; typeIdx++) {
                var type = types[typeIdx];
                var elems = _.map(tokenLists, function(tokenList) {
                    return tokenList[typeIdx][tokenIdx];
                });
                andParts.push(settings.reduce_cqp(
                    type, _.unique(elems), ignoreCase,
                    ! (type in structAttrs)));
            }
            totalQuery.push("[" + andParts.join(" & ") + "]");
        }
        var query = totalQuery.join(" ");

        var output = $("<span>",
            {
            "class" : "link",
            "data-query" : encodeURIComponent(query),
            "data-corpora" : JSON.stringify(corpora)
            }).html(linkInnerHTML).outerHTML();

        return output;
    }

};


// Get the html (no linking) representation of the result for the statistics table
settings.reduce_stringify = function(type, values, corpora) {
    switch(type) {
        case "word":
        case "msd":
            return values.join(" ");
        case "pos":
            var output =  _.map(values, function(token) {
                return $("<span>")
                .localeKey("pos_" + token)
                .outerHTML()
            }).join(" ");
            return output;
        case "saldo":
        case "prefix":
        case "suffix":
        case "lex":
        case "lemma":

            if(type == "saldo")
                stringify = util.saldoToString
            else if(type == "lemma")
                stringify = function(lemma) {return lemma.replace(/_/g, " ")}
            else
                stringify = util.lemgramToString

            var html = _.map(values, function(token) {
                if(token == "|")
                    return "–";
                return stringify(token.replace(/:\d+/g, ""), true);
            });

            return html.join(" ")

        case "deprel":
            var output =  _.map(values, function(token) {
                return $("<span>")
                .localeKey("deprel_" + token)
                .outerHTML()
            }).join(" ");
            return output;
        default: // structural and "non-standard" positional attributes
            var cl = settings.corpusListing.subsetFactory(corpora)
            var attrObj;
            var structAttrs = cl.getStructAttrs();
            // Also handle "non-standard" positional attributes (Jyrki
            // Niemi 2015-12-04)
            if (type in structAttrs) {
                attrObj = structAttrs[type];
            } else {
                attrObj = cl.getCurrentAttributes()[type];
            }
            var prefix = ""
            if(!_.isUndefined(attrObj) && attrObj.translationKey )
                prefix = attrObj.translationKey
            var mapped = _.map(values, function (value) {
                return util.getLocaleString(prefix + value)
            });
            return mapped.join(" ");
    }

};

// Get the cqp (part of) expression for linking in the statistics table
// input type [{type:?,value:? }]
settings.reduce_cqp = function(type, tokens, ignoreCase, isPosAttr) {

    if(!tokens) {
        return "";
    }
    switch(type) {
        case "saldo":
        case "prefix":
        case "suffix":
        case "lex":
        case "lemma":
            if(tokens[0] == "|")
                return "ambiguity(" + type + ") = 0";
            else
                var res;
                if(tokens.length > 1) {
                    var key = tokens[0].split(":")[0];
                    var variants = _.flatten(_.map(tokens, function(val) {
                        return window.regescape(val.split(":")[1]);
                    }));
                    res = key + ":" + "(" + variants.join("|") + ")";
                }
                else {
                    res = window.regescape(tokens[0]);
                }
                // Assume simple values (instead of feature set
                // values) for lemmas in other modes than "swedish"
                // and thus use the operator = instead of contains.
                // FIXME: This does not work for the MULCOLD corpus.
                // (Jyrki Niemi 2015-12-04)
                var comp_op = (type == "lemma"
                               && window.currentMode != "swedish"
                               ? " = " : " contains ");
                return type + comp_op + "'" + res + "'";
        case "word":
            s = $.format('word="%s"', [window.regescape(tokens[0])]);
            if(ignoreCase)
                s = s + ' %c'
            return s
        case "pos":
        case "deprel":
        case "msd":
            // val = tokens[0].replace(/\+/g, "\\+");
            // Escape all regex metacharacters (Jyrki Niemi 2015-12-04)
            return $.format('%s="%s"', [type, window.regescape(tokens[0])]);
        default: // structural and "non-standard" positional attributes
            // Prefix the name of the attribute with an underscore
            // only for structural attributes (Jyrki Niemi 2015-12-04)
            return $.format((isPosAttr ? '' : '_.') + '%s="%s"',
			    [type, window.regescape(tokens[0])]);
    }
};


delete attrs;
delete sattrs;
delete context;
delete ref;

settings.posset = {
   type : "set",
   label : "posset",
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
    type : "set",
    label : "baseform",
    opts : settings.setOptions,
    extended_template : "<input ng-model='model' >"
};
settings.fsvlex = {
    type : "set",
    label : "lemgram",
    displayType : "autocomplete",
    opts : settings.setOptions,
    extended_template : "<autoc model='model' placeholder='placeholder' type='lemgram'/>",
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
    extended_template : "<autoc model='model' placeholder='placeholder' type='lemgram'/>",
    opts : settings.setOptions,
    externalSearch : karpLemgramLink,
    internalSearch : true
};


settings.fsvdescription ='<a target="_blank" href="http://project2.sol.lu.se/fornsvenska/">Fornsvenska textbanken</a> är ett projekt som digitaliserar fornsvenska texter och gör dem tillgängliga över webben. Projektet leds av Lars-Olof Delsing vid Lunds universitet.';

var fsv_yngrelagar = {
    morf : 'fsvm',
    id : "fsv-yngrelagar",
    title : "Yngre lagar – Fornsvenska textbankens material",
    description : settings.fsvdescription,
    within : settings.defaultWithin,
    context : settings.spContext,
    attributes : {
        posset : settings.posset,
        lemma : settings.fsvlemma,
        lex : settings.fsvlex,
        variants : settings.fsvvariants
        },
    struct_attributes : {
        text_title : {
            label : "title",
            displayType : "select",
            localize : false,
            extended_template : selectType.extended_template,
            controller : selectType.controller,
            dataset : [
                "Kristoffers Landslag, nyskrivna flockar i förhållande till MEL",
                "Kristoffers Landslag, innehållsligt ändrade flockar i förhållande til MEL",
                "Kristoffers Landslag, flockar direkt hämtade från MEL",
                "Kristoffers Landslag"
                ],
        },
        text_date : {label : "date"}
    }
};

var fsv_aldrelagar = {
    morf : 'fsvm',
    id : "fsv-aldrelagar",
    title : "Äldre lagar – Fornsvenska textbankens material",
    description : settings.fsvdescription,
    within : settings.defaultWithin,
    context : settings.spContext,
    attributes : {
        posset : settings.posset,
        lemma : settings.fsvlemma,
        lex : settings.fsvlex,
        variants : settings.fsvvariants
                },
    struct_attributes : {
        text_title : {
            label : "title",
            displayType : "select",
            localize : false,
            extended_template : selectType.extended_template,
            controller : selectType.controller,
            dataset : [
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
        text_date : {label : "date"}
    }
};
