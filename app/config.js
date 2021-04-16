
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
settings.isPublicServer = (window.location.hostname != "localhost");

c.log("Production server:", isProductionServer);

var baseURL = (window.location.protocol + "//" + window.location.hostname
               + window.location.pathname);

settings.autocomplete = true;
// Currently always enable the old map at Kielipankki, since we do not
// yet have data for the new map.
settings.enableMap = true;
settings.mapPosTag = ["PM", "NNP", "NNPS"]
settings.newMapEnabled = false;
// settings.enableMap = !isLab;
// settings.newMapEnabled = isLab;
// settings.wordpicture = false;
settings.hitsPerPageDefault = 25
settings.hitsPerPageValues = [25,50,75,100,500,1000]
// If settings.show_related_words is not defined, it is considered
// true.
settings.show_related_words = false;
settings.name_classification = false;
// Enable the option to restrict search context in the simple search
settings.simple_search_restrict_context = true;

// The lemgram service to use for autocompletion. If not specified,
// use Språkbanken's Karp. (Jyrki Niemi 2015-12-04)
settings.lemgramService = "FIN-CLARIN";
// The number of lemgrams to show in autocompletion (for the
// FIN-CLARIN lemgram service).
settings.autocompleteLemgramCount = 15;

// Specify how to handle corpora defined in the configuration but not
// found by the backend. Supported values are:
// - "none" or "fatal": no handling: an undefined corpus causes an
//   error that stops loading Korp; the default if no value specified;
// - "error": error on the console;
// - "warn": warning on the console; and
// - "log": normal log message on the console.
// Handling unavailable corpora results in a somewhat slower startup
// of Korp, currently at most about half a second. One option would
// be to enable it only for development environments, so that the
// production environment would have a slightly faster startup.
// (Jyrki Niemi 2017-12-13)
settings.handleUnavailableCorpora = "warn";

// If true, give a more detailed result error message in addition to
// "An error occurred". (Jyrki Niemi 2018-01-29)
settings.resultErrorDetails = true;

// Show the corpus hash parameter in the URL even when all corpora
// accessible to the user are selected, so that a Korp URL without the
// corpus parameter is unambiguous. (Jyrki Niemi 2018-02-05)
settings.showAllCorporaInHash = true;

settings.textDateAllowBareYears = true;

// Encode list-valued parameters for korp.cgi by extracting common
// prefixes. If not defined, considered false. (Jyrki Niemi
// 2017-09-29)
settings.encodeListParams = true;

// Compress query parameters to the backend to a single params_gz
// parameter. If not defined, considered false. (Jyrki Niemi
// 2018-02-02)
settings.compressBackendParams = true;
// Options for compressing backend query parameters
settings.compressBackendParamsOpts = {
    // The minimum length of the corpus parameter for which the whole
    // parameter list is compressed (default: 2000)
    corpus_min_length: 2000,
    // Also compress the parameter "command", which is by default left
    // outside params_gz for slightly easier frontend debugging
    // (default: false)
    compressed_command: false,
};

settings.enableBackendKwicDownload = false
settings.enableFrontendKwicDownload = true

// Enable passing additional information (UI language, search mode) to
// the backend for writing the backend log. If not defined, considered
// false. (Jyrki Niemi 2017-12-14)
settings.addBackendLogInfo = true;

settings.downloadFormats = [
    "annot",
    "ref",
    "sentences",
    "sentences_kwic",
    "text",
    "json",
    "nooj",
];
if (! isProductionServer) {
    settings.downloadFormats.push("vrt");
}

// Selection lists for physical formats, depending on the logical
// format: "formats" lists the formats (one of those in
// settings.downloadFormatParamsPhysical), "selected" is the selected
// one, initially the default.
// settings.downloadFormatParams[format].physical_formats needs to
// refer to physical_formats properties so that the object references
// are shared between different formats, for the selection to preserve
// the selected format in each physical format selection list even
// when changing the logical format back and forth. (Jyrki Niemi
// 2016-09-26)
physical_formats = {
    table: {
	formats: ["xls", "csv", "tsv", "html_table"],
	selected: "xls",
    },
    text: {
	formats: ["text_utf8", "html"],
	selected: "text_utf8",
    },
};

settings.downloadFormatParams = {
    "*": {
        structs: "+"
    },
    "annot": {
	format: "tokens",
	attrs: "+,-lex",
	match_marker: "***",
	physical_formats: physical_formats.table,
    },
    "ref": {
	format: "bibref",
	physical_formats: physical_formats.table,
    },
    "sentences": {
	format: "sentences",
	subformat: "lemmas-resultinfo",
	physical_formats: physical_formats.table,
    },
    // As "sentences", but match tokens and context tokens in separate
    // columns
    "sentences_kwic": {
	format: "sentences",
	subformat: "lemmas-resultinfo,lemmas-kwic",
	physical_formats: physical_formats.table,
    },
    "nooj": {
        attrs: "+"
    },
    "vrt": {
        attrs: "+"
    },
    "text": {
	format: "text",
	subformat: "sentences-bare",
	structs: "",
	physical_formats: physical_formats.text,
    },
};

settings.downloadFormatParamsPhysical = {
    "xls": {
	format_suffix: ",xls",
    },
    "csv": {
	format_suffix: ",csv",
    },
    "tsv": {
	format_suffix: ",tsv",
    },
    "text_utf8": {
    },
    "html": {
	format_suffix: ",html",
    },
    "html_table": {
	format_suffix: ",html_table",
    },
};

// delete physical_formats;

// Korp backend URL
settings.korpBackendURL =
    window.location.protocol + "//" + window.location.hostname + "/korp/api8";
// console.log("korpBackendURL: '" + settings.korpBackendURL + "'")
settings.downloadCgiScript = settings.cgi_prefix + "korp_download.cgi";

// The main Korp and Korp Labs URL for the links in the cog menu
settings.korp_url = {
    "main": (isProductionServer ? "/" : "/korp/"),
    "lab": (isProductionServer ? "/lab/" : "/korplab/")
};

settings.urnResolver = "http://urn.fi/";
settings.corpus_cite_base_url = "http://www.kielipankki.fi/viittaus/?key=";

// Set advanced_search_within to false to disable the within selection
// in the advanced search. If the value is undefined, assume true.
// (Jyrki Niemi 2015-09-24)
settings.advanced_search_within = true;

settings.languages = ["fi", "sv", "en"];
// Names of UI languages in the languages themselves, as shown in the
// language menu, so they need not be localized
settings.languageNames = {
    "fi": "Suomi",
    "sv": "Svenska",
    "en": "English",
}
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
    "sv": "sv-SE",
    "en": "gb-EN",
    "fi": "fi-FI",
};

// for extended search dropdown, can be 'union' or 'intersection'
settings.wordAttributeSelector = "union";
settings.structAttributeSelector = "union";

// for 'compile statistics by' selector, can be 'union' or 'intersection'
settings.reduceWordAttributeSelector = "intersection";
settings.reduceStructAttributeSelector = "intersection";

settings.groupStatistics = [];

settings.filterSelection = "intersection"

// settings.newsDeskUrl = "https://svn.spraakdata.gu.se/sb-arkiv/pub/component_news/json/korpnews.json";
settings.newsDeskUrl =
    window.location.protocol + "//" + window.location.hostname + "/"
    + window.location.pathname + "news/json/korp"
    + ((isProductionServerBeta || isLab) ? "beta" : "") + "news.json";

// authenticationType: "basic", "shibboleth" or "none"
settings.authenticationType = (isProductionServer ? "shibboleth" : "basic");
// Login and logout URLs to use with Shibboleth authentication if
// authenticationType == "shibboleth". Compress the hash parameters of
// the return URL to make exceeding the Apache URL length limit less
// likely.
// for eduGAIN / CSC Account:
// settings.shibbolethLoginUrl = baseURL + "shibboleth-ds/index.html";
settings.shibbolethLoginUrl = function (href) {
    return ("/shibboleth-ds/index.html?"
            + encodeURIComponent(util.compressUrlHashParams(
		(href || window.location.href) + "&shib_logged_in")));
};
// settings.shibbolethLogoutUrl =
//     "https://korp.csc.fi/Shibboleth.sso/Logout?return=" + encodeURI(baseURL);
settings.shibbolethLogoutUrl = function (href) {
    return ("/Shibboleth.sso/Logout?return="
            + encodeURIComponent(
		util.compressUrlHashParams(href || window.location.href)));
}

// Return a direct URL to the application of a corpus in Language Bank
// Rights based on lbr_id (an URN, either complete or without the
// common prefix "urn:nbn:fi:lb-"). if lbr_id is falsey, return the
// URL of the LBR main page.
settings.make_direct_LBR_URL = function (lbr_id) {
    console.log ("make_direct_LBR_URL", lbr_id);
    if (lbr_id) {
	return ("https://www.kielipankki.fi/lbr3/"
		+ (lbr_id.slice(0, 3) != "urn" ? "urn:nbn:fi:lb-" : "")
		+ lbr_id);
    } else {
	return "https://lbr.csc.fi";
    }
};


// The supported corpus extra info items, typically links. If you add
// a new item X, also remember to add corresponding translations for
// the link text to locale-??.json with the key "corpus_X".
settings.corpusExtraInfoItems = [
    "subcorpus_of",
    "pid",
    // PID is represented as a metadata link so a separate metadata
    // link is not needed.
    // // "metadata",
    "cite",
    "licence",
    "infopage",
    "urn",
    "homepage",
    "iprholder",
    "compiler",
    "download",
];

// The extra info (usually links) to be shown in the corpus info popup
// of the corpus chooser and the KWIC results sidebar.
settings.corpusExtraInfo = {
    infoPopup: settings.corpusExtraInfoItems,
    sidebar: [
	"subcorpus_of",
	"pid",
	// "metadata",
	"cite",
	"licence",
	"infopage",
	"urn",
	"download",
    ]
};

// Special handling for specified corpus extra info items: property
// names refer to info item names (keys) and their values are
// functions called by util.formatCorpusExtraInfo, with two arguments:
// - corpusObj: corpus configuration
// - label: the HTML generated for the label of the info item
// The functions should return an object for creating a link, with at
// least the property "url" or "text" (or both) and possibly "label"
// and "tooltip", or undefined if the default handling should be
// tried.
settings.makeCorpusExtraInfoItem = {
    subcorpus_of: function (corpusObj, label) {
	if (corpusObj.logical_corpus
	    && corpusObj.logical_corpus.title != corpusObj.title) {
	    return {
		text: corpusObj.logical_corpus.title,
		label: label,
	    };
	}
    },
    pid: function (corpusObj, label) {
        // If the PID of a corpus is not specified explicitly, use
        // the metadata URN.
        var pid = ((corpusObj.pid ? corpusObj.pid.urn : null)
		   || corpusObj.pid_urn
		   || (corpusObj.metadata ? corpusObj.metadata.urn : null)
		   || corpusObj.metadata_urn);
	if (pid) {
	    return {
		url: util.makeUrnUrl(pid),
		// Prevent breaking the URN at the hyphen by using
		// white-space: nowrap.
		text: ('<span style="white-space: nowrap;">' + pid +
		       '</span>'),
		label: label,
	    };
	}
    },
    cite: function (corpusObj, label) {
	if (corpusObj.cite_id && settings.corpus_cite_base_url) {
	    return {
                // Using ng-href would require using Angular $compile,
                // but how could we use it here or where should it be
                // called?
                // http://stackoverflow.com/questions/11771513/angularjs-jquery-how-to-get-dynamic-content-working-in-angularjs
                // url: settings.corpus_cite_base_url + corpusObj.cite_id +
                //      '&lang={{lang}}'
                // This does not change the lang parameter in the
                // corpus info popup, although it works in the sidebar.
                //
                // escape call is needed for a cite_id containing a &,
                // but the escaped % then seems to be escaped again
                // somewhere else. Where?
                url: (settings.corpus_cite_base_url
                      + escape(corpusObj.cite_id) + '&lang=' + window.lang),
                text: label,
	    };
	}
    },
    urn: function (corpusObj, label) {
	if (corpusObj.urn) {
	    return {
		url: util.makeUrnUrl(corpusObj.urn),
		text: label,
	    };
	}
    },
    homepage: function (corpusObj, label) {
        if (! ("homepage" in corpusObj) && corpusObj.url) {
            // Assume that the top-level property "url" refers to the
            // home page of the corpus (unless the there is a property
            // "homepage").
            return {
                url: corpusObj.url,
                text: label,
	    };
	}
    },
};


settings.wordPictureMaxWords = 30;

settings.wordpictureTagset = {
    // supported pos-tags
    verb: "vb",

    noun: "nn",
    adjective: "jj",
    adverb: "ab",
    // preposition: "pp",

    // dependency releations
    subject: "ss",
    object: "obj",
    adverbial: "adv",
    // preposition_rel: "pa",
    pre_modifier: "at",
    post_modifier: "et",
    adverbial2: "aa"
}


settings.wordPictureConf = {
    verb: [[
        {rel: "subject", css_class: "color_blue"},
        "_",
        {rel: "object", css_class: "color_purple"},
        {rel: "adverbial", css_class: "color_green"}
    ]],
    noun: [
        [ // {rel: "preposition_rel", css_class: "color_yellow", field_reverse: true},
         {rel: "pre_modifier", css_class: "color_azure"},
         "_",
         {rel: "post_modifier", css_class: "color_red"}],

        ["_", {rel: "subject", css_class: "color_blue", field_reverse: true, alt_label: "vb"}],
        [{rel: "object", css_class: "color_purple", field_reverse: true, alt_label: "vb"}, "_"]
    ],
    adjective: [
        ["_", {rel: "pre_modifier", css_class: "color_yellow", field_reverse: true}],
        [{rel: "adverbial2", css_class: "color_purple"}, "_"]
    ],
    adverb: [
        ["_", {rel: "adverbial", css_class: "color_yellow", field_reverse: true}],
        ["_", {rel: "adverbial2", css_class: "color_purple", field_reverse: true}]
    ],
    // preposition: [["_", {rel: "preposition_rel", css_class: "color_green"}]]

}


// The positional attribute in which to find place names, typically
// word or lemma
settings.placenameAttr = "lemma";
// Additional CQP attribute constraints for place names: different
// annotations for a proper name in different corpora. The value below
// is the one used by Språkbanken's Korp for Swedish (and other?)
// corpora, so it should be overridden in the configuration of
// individual modes as appropriate.
settings.placenameConstraint = "pos='PM' | pos='NNP' | pos='NNPS'";;


// Configure the grouping of name categories in name
// classification results.
settings.name_groups = [
    {label: "person", regex: "EnamexPrs.*"},
    {label: "place", regex: "EnamexLoc.*"},
    {label: "organization", regex: "EnamexOrg.*"},
    {label: "other", regex: "(Nu|Ti)mex.*"},
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

// Namespace for functions used in configuring corpora
settings.fn = {};
// Namespace for corpus configuration templates
settings.templ = {};
// Namespace for extra corpus info used in multiple corpora
settings.corpusinfo = {};

var karpLemgramLink = "https://spraakbanken.gu.se/karp/#?search=extended||and|lemgram|equals|<%= val.replace(/:\\d+/, '') %>";

// settings.primaryColor = "#DDE9FF";
// CHECK if having the same colour as the primary and the light one
// causes problems somewhere. (Jyrki Niemi 2017-12-01)
settings.primaryColor = "#CAD2E6";
settings.primaryLight = "#CAD2E6";

settings.defaultOverviewContext = "1 sentence"
settings.defaultReadingContext = "1 paragraph"

settings.defaultWithin = {
    "sentence": "sentence"
};
// TODO: Move these to modes/common.js
settings.spWithin = {
    "sentence": "sentence",
    "paragraph": "paragraph"
};
settings.spcWithin = {
    "sentence": "sentence",
    "paragraph": "paragraph",
    "clause": "clause",
};
settings.scWithin = {
    "sentence": "sentence",
    "clause": "clause",
};
settings.sentLinkContext = {
    "1 sentence": "1 sentence",
    "1 link": "1 link"
};
settings.sentLinkWithin = {
    "sentence": "sentence",
    "link": "link"
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
//
// As of version 5.0.6, Språkbanken's Korp has similar functionality
// implemented via the property "order" of attribute definitions. The
// orders here are converted to "order" properties, but maybe we
// should eventually migrate to having the "order" properties in the
// attribute definitions. (Jyrki Niemi 2017-10-20)
settings.default_sidebar_display_order = {
    attributes: [
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
    struct_attributes: [
	/^text_/,
	/^chapter_/,
	/^speech_/,
	/^paragraph_/,
	/^sentence_/,
	/^clause_/,
    ]
};

// The properties in settings.corpusFeatures.FEAT are added to corpus
// configurations (with recursive $.extend) whose property "features"
// (an array) contains "FEAT". (Jyrki Niemi 2016-10-18)
settings.corpusFeatures = {};

// for optimization purposes
settings.cqpPrio = ['deprel', 'pos', 'msd', 'suffix', 'prefix', 'grundform', 'lemgram', 'saldo', 'word'];

settings.defaultOptions = {
    "is": "=",
    "is_not": "!=",
    "starts_with": "^=",
    "contains": "_=",
    "ends_with": "&=",
    "matches": "*=",
    "matches_not": "!*=",
}

// settings.korpBackendURL = "https://ws.spraakbanken.gu.se/ws/korp/v8";
// settings.downloadCgiScript = "https://ws.spraakbanken.gu.se/ws/korp/download";

// Initial map centre: latitude, longitude and zoom level
settings.mapCenter = {
    // A geographical centre of Finland
    lat: 64.180708,
    lng: 25.803222,
    zoom: 4
};

settings.readingModeField = "sentence_id"

// settings.lemgramComplete is used to override the default Karp-based
// lemgram completion. If specified, it should be an object containing
// two functions:
// - makeHTTPArgs (wf, resources, corporaIDs, httpArgs) ->
//     { method: ..., url: ..., params: ... }
//   Create HTTP arguments for the lemgram completion call based on the
//   given arguments.
//   Arguments:
//   - wf: the word form (prefix) to complete
//   - resources: completion resources to use (need not be used)
//   - corporaIDs: ids of selected corpora
//   - httpArgs: default HTTP arguments object containing method, url
//     and params
//   Return value: HTTP arguments object containing method, url and params
// - makeLemgramList (data) -> [lemgram]
//   Extract lemgrams from data returned by the lemgram completion call.
//   Return value: list (array) of lemgrams as strings
settings.lemgramComplete = {
    makeHTTPArgs: function (wf, resources, corporaIDs, httpArgs) {
        httpArgs.url = settings.korpBackendURL + "/lemgram_complete"
        httpArgs.params = {
            wf: wf,
            corpus: corporaIDs.join(",").toUpperCase(),
        }
        return httpArgs
    },
    makeLemgramList: function (data) {
        return data.lemgrams
    },
}

// Corpus folder property names not to be treated as corpus ids, in
// addition to "title", "contents" and "description"
settings.corpusfolderNonCorpusProperties = ["info"]


/*
 * Modify the list of corpora
 */


// FIXME: Should the following functions be here or in common.js? They
// probably should eventually be moved to util.coffee or somewhere.
// (Jyrki Niemi 2017-10-24)


// corporafolder properties that are not names of subfolders.
// Represented as an object instead of an array, so that we can use
// the JavaScript "in" operator.
settings.corporafolder_properties = {
    title: "",
    description: "",
    contents: "",
    info: "",
    unselected: ""
};


// Remove non-existing or irrelevant corpora (and folders) based on
// the server from which the code is being run.
//
// NOTE: These functions have less use now that the corpus
// configurations for unavailable corpora are removed by default
// (util.removeUnavailableCorpora).
//
// settings.fn.remove_empty_corporafolders has been replaced by
// util.removeEmptyCorporafolders, but there is not yet an exact
// replacement for settings.fn.remove_matching_corpora that would
// remove corpora based on regular expressions.
//
// TODO: Remove these functions from here when a replacement for
// settings.fn.remove_matching_corpora has been implemented in util.


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


// Add extra properties to corpus attributes based on other
// properties. This is currently used to add extended_template and
// controller to attributes with displayType "select".
// Another approach would be to add these properties explicitly to all
// the relevant attribute objects, as Språkbanken have done. Both
// approaches probably have advantages and disadvantages (less
// redundancy vs. explicitness).


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


// Add corpus aliases that are expanded to the corpus ids matching the
// regular expression string corpus_id_patt (actually, a
// comma-separated list of regular expressions matching corpus ids).
//
// In addition to the explicitly specified corpus aliases, the
// function also adds variants with and without a "-korp" suffix and
// with underscores converted to dashes and dashes to underscores. If
// the specified corpus aliases contain an alias with "-korp-" or
// "_korp_" infix, also aliases without it are added.
//
// The optional third argument is an object containing options. The
// following options are supported:
//   override: if true, override an existing alias (default: no)
//   add_variants: if false, do not add the alias variants (default:
//     true)
settings.fn.add_corpus_aliases = function (corpus_id_patt, aliases) {
    var opts = arguments[2] || {};
    var override = opts.override || false;
    var add_variants = (opts.add_variants !== false);

    var add_dash_underscore_variants = function (aliases, alias) {
	if (alias.indexOf("_") > -1) {
	    aliases.push(alias.replace(/_/g, "-"));
	}
	if (alias.indexOf("-") > -1) {
	    aliases.push(alias.replace(/-/g, "_"));
	}
    }

    if (! _.isArray(aliases)) {
	aliases = [aliases];
    }
    for (var i = 0; i < aliases.length; i++) {
	var alias = aliases[i]
	var aliases2 = [alias];
	var alias2;
	if (add_variants) {
	    // Add alias variants:
	    // x -> x, x-korp, x_korp
	    // x-y | x_y | x-y-korp | x_y_korp -> x-y, x_y, x-y-korp, x_y_korp
	    add_dash_underscore_variants(aliases2, alias);
	    // This may add some aliases twice to alias2, but that
	    // does not matter in the end.
	    if (alias.match(/[_-]korp($|[_-])/)) {
		alias2 = alias.replace(/[_-]korp($|[_-])/, "$1");
		aliases2.push(alias2)
		add_dash_underscore_variants(aliases2, alias2);
	    } else {
		aliases2.push(alias + "-korp");
		add_dash_underscore_variants(aliases2, alias + "-korp");
	    }
	}
	for (var j = 0; j < aliases2.length; j++) {
	    alias2 = aliases2[j];
	    if (override || ! (alias2 in settings.corpus_aliases)) {
		settings.corpus_aliases[alias2] = corpus_id_patt;
	    }
	}
    }
};
