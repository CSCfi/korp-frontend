
// Plugin corpuschooser_item_formatter: default configuration
//
// Define default formatting functions returning the item titles
// intact.


// The default formatting function returns the title as is
const defaultFormatter = (title, obj) => title

// Initialize settings.formatCorpusChooserItem to empty object if it
// has not been defined
plugins.setDefaultSettings({
    formatCorpusChooserItem: {},
})

// Set the default formatting function for each corpus and folder type
// (as initialized in plugin config_logical_corpora) to
// defaultFormatter
plugins.setDefaultSettings(
    {
        standaloneCorpus: defaultFormatter,
        subcorpus: defaultFormatter,
        corpusWithSubcorpora: defaultFormatter,
        subcorpusCollection: defaultFormatter,
        corpusCollection: defaultFormatter,
    },
    settings.formatCorpusChooserItem)
