
// Default configuration for corpusinfo_formatter
//
// Use the values specified here if no values have been specified
// before.
//
// The values specified here are those used in the Korp of Kielipankki
// – the Language Bank of Finland.


// Return the first defined value (including null) in values; if none
// of them is defined, return null.
// TODO: This function should be defined somewhere else, so that it
// would be available to other plugins, too.
const valueOrDefault = function (...values) {
    for (value of values) {
        if (value !== undefined) {
            return value
        }
    }
    return undefined
}


// The URN resolver URL to be prefixed to URNs in links.
// This should be set in the configuration as the default only informs
// that the value should be configured.
settings.urnResolver = valueOrDefault(
    settings.urnResolver,
    "[Please configure a value for settings.urnResolver]")

// The supported corpus extra info items, typically links. If you add
// a new item X, also remember to add corresponding translations for
// the link text to translations/locale-??.json (either here or in the
// global configuration) with the key "corpus_X".
settings.corpusExtraInfoItems = valueOrDefault(
    settings.corpusExtraInfoItems,
    [
        "subcorpus_of",
        "pid",
        "cite",
        "licence",
        "infopage",
        "urn",
        "homepage",
        "iprholder",
        "compiler",
        "download",
    ]);

// The extra info (typically links) to be shown in the corpus info
// popup of the corpus chooser and the KWIC results sidebar, in the
// order in which they are to be shown.
settings.corpusExtraInfo = valueOrDefault(
    settings.corpusExtraInfo,
    {
        infoPopup: settings.corpusExtraInfoItems,
        sidebar: [
            "subcorpus_of",
            "pid",
            "cite",
            "licence",
            "infopage",
            "urn",
            "download",
        ]
    });


// Special handling for specified corpus extra info items: property
// names refer to info item names (keys) and their values are
// functions called with two arguments:
// - corpusObj: corpus configuration
// - label: the HTML generated for the label of the info item
// The functions should return an object for creating a link, with at
// least the property "url" or "text" (or both) and possibly "label"
// and "tooltip", or undefined if the default handling should be
// tried.
settings.makeCorpusExtraInfoItem = valueOrDefault(
    settings.makeCorpusExtraInfoItem,
    {
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
    });
