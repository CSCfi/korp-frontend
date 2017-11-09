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

settings.autocomplete = true;
// Currently always enable the old map at Kielipankki, since we do not
// yet have data for the new map.
settings.enableMap = true;
settings.newMapEnabled = false;
// settings.enableMap = !isLab;
// settings.newMapEnabled = isLab;
// settings.wordpicture = false;
settings.hits_per_page_default = 25
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

settings.textDateAllowBareYears = true;

// Encode list-valued parameters for korp.cgi by extracting common
// prefixes. If not defined, considered false. (Jyrki Niemi
// 2017-09-29)
settings.encodeListParams = true;

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

delete physical_formats;

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
settings.word_attribute_selector = "union"
settings.struct_attribute_selector = "union"

// for 'compile statistics by' selector, can be 'union' or 'intersection'
settings.reduce_word_attribute_selector = "intersection"
settings.reduce_struct_attribute_selector = "intersection"

// settings.news_desk_url = "https://svn.spraakdata.gu.se/sb-arkiv/pub/component_news/json/korpnews.json";
settings.news_desk_url =
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
    "metadata",
    "licence",
    "cite",
    "urn",
    "homepage",
    "iprholder",
    "compiler",
    "download",
];

// The extra info (usually links) to be shown in the corpus info box
// of the corpus chooser and the KWIC results sidebar.
settings.corpusExtraInfo = {
    corpus_infobox: settings.corpusExtraInfoItems,
    sidebar: [
	"metadata",
	"licence",
	"cite",
	"urn",
	"download",
    ]
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
    post_modifier: "et"

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
    adjective: [["_", {rel: "pre_modifier", css_class: "color_yellow", field_reverse: true}]],
    adverb: [["_", {rel: "adverbial", css_class: "color_yellow", field_reverse: true}]],
    // preposition: [["_", {rel: "preposition_rel", css_class: "color_green"}]]

}


// The positional attribute in which to find place names, typically
// word or lemma
settings.placenameAttr = "lemma";
// Additional CQP attribute constraints for place names:
// different annotations for a proper name in different corpora
settings.placenameConstraint =
    "pos='PM' | pos='NNP' | pos='NNPS' | msd='.*(SUBCAT_)?(Prop|PROP).*' | pos='n:prop'";

// Initial map centre: latitude, longitude and zoom level
settings.mapCenter = {
    // A geographical centre of Finland
    lat: 64.180708,
    lng: 25.803222,
    zoom: 4
};


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

settings.primaryColor = "rgb(221, 233, 255)";
settings.primaryLight = "rgb(202, 210, 230)";
settings.secondaryColor = "";

settings.defaultOverviewContext = "1 sentence"
settings.defaultReadingContext = "1 paragraph"

settings.defaultContext = {
    "1 sentence": "1 sentence"
};
settings.spContext = {
    "1 sentence": "1 sentence",
    "1 paragraph": "1 paragraph"
};
settings.defaultWithin = {
    "sentence": "sentence"
};
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

// The properties in settings.corpus_features.FEAT are added to corpus
// configurations (with recursive $.extend) whose property "features"
// (an array) contains "FEAT". (Jyrki Niemi 2016-10-18)
settings.corpus_features = {};

settings.corpus_features.paragraphs = {
    within: settings.spWithin,
    context: settings.spContext,
};

// for optimization purposes
settings.cqp_prio = ['deprel', 'pos', 'msd', 'suffix', 'prefix', 'grundform', 'lemgram', 'saldo', 'word'];

settings.defaultOptions = {
    "is": "=",
    "is_not": "!=",
    "starts_with": "^=",
    "contains": "_=",
    "ends_with": "&=",
    "matches": "*=",
    "matches_not": "!*=",
}
settings.liteOptions = {
    "is": "=",
    "is_not": "!="
}
settings.setOptions = {
    "is": "contains",
    "is_not": "not contains"
};
settings.probabilitySetOptions = {
    "is": "highest_rank",
    "is_not": "not_highest_rank",
    "contains": "rank_contains",
    "contains_not": "not_rank_contains",
};


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


/*
 * TODO add all other copora settings here
 */



/*
 * MISC
 */


// label values here represent translation keys.
settings.arg_groups = {
    "word": {
        word: {label: "word"}
    }
};

