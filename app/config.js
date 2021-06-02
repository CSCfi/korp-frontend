
var isLab = window.isLab || false;

settings.autocomplete = true;
settings.newMapEnabled = isLab;
settings.hitsPerPageDefault = 25
settings.hitsPerPageValues = [25,50,75,100,500,1000]
settings.enableBackendKwicDownload = false
settings.enableFrontendKwicDownload = true

settings.languages = ["sv", "en"];
// Names of UI languages in the languages themselves, as shown in the
// language menu, so they need not be localized
settings.languageNames = {
    "sv": "Svenska",
    "en": "English",
}
settings.defaultLanguage = "sv";

settings.downloadFormats = [
    "csv",
    "tsv",
    "annot",
    "ref",
];

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

// for extended search dropdown, can be 'union' or 'intersection'
settings.wordAttributeSelector = "union";
settings.structAttributeSelector = "union";

// for 'compile statistics by' selector, can be 'union' or 'intersection'
settings.reduceWordAttributeSelector = "intersection";
settings.reduceStructAttributeSelector = "intersection";

settings.filterSelection = "intersection"

settings.newsDeskUrl = "https://svn.spraakdata.gu.se/sb-arkiv/pub/component_news/json/korpnews.json";

settings.wordpictureTagset = {
    // supported pos-tags
    verb: "vb",

    noun: "nn",
    adjective: "jj",
    adverb: "ab",
    preposition: "pp",

    // dependency releations
    subject: "ss",
    object: "obj",
    adverbial: "adv",
    preposition_rel: "pa",
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
        [{rel: "preposition_rel", css_class: "color_yellow", field_reverse: true},
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
    preposition: [["_", {rel: "preposition_rel", css_class: "color_green"}]]

}

settings.visibleModes = 6
settings.modeConfig = [
    {
        localekey: "modern_texts",
        mode: "default"
    },
    {
        localekey: "parallel_texts",
        mode: "parallel"
    }
];

settings.primaryColor = "rgb(221, 233, 255)";
settings.primaryLight = "rgb(242, 247, 255)";

settings.defaultOverviewContext = "1 sentence"
settings.defaultReadingContext = "1 paragraph"

settings.defaultWithin = {
    "sentence": "sentence"
};

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

settings.korpBackendURL = "https://ws.spraakbanken.gu.se/ws/korp/v8";
settings.downloadCgiScript = "https://ws.spraakbanken.gu.se/ws/korp/download";

settings.mapCenter = {
  lat: 62.99515845212052,
  lng: 16.69921875,
  zoom: 4
};

settings.readingModeField = "sentence_id"

// Specify how to handle corpora defined in the configuration but not
// found by the backend. Supported values are:
// - "none" or "fatal": no handling: an undefined corpus causes an
//   error that stops loading Korp; the default if no value specified;
// - "error": error on the console;
// - "warn": warning on the console; and
// - "log": normal log message on the console.
// Handling unavailable corpora results in a somewhat slower startup
// of Korp, so it could be enabled only for development environments,
// so that the production environment would have a slightly faster
// startup.
settings.handleUnavailableCorpora = "fatal"

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
settings.lemgramComplete = null

// Corpus folder property names not to be treated as corpus ids, in
// addition to "title", "contents" and "description"
settings.corpusfolderNonCorpusProperties = []

// If settings.allowNoPreselectedCorpora is true, an empty
// settings.preselectedCorpora array results in no corpora
// preselected, instead of preselecting all unrestricted corpora
settings.allowNoPreselectedCorpora = false
