
// Plugin corpuschooser_item_formatter
//
// A plugin to allow formatting corpus and folder titles in the corpus
// chooser according to the type of corpus or folder as initialized in
// the plugin config_logical_corpora.
//
// The actual formatting functions are defined in the
// settings.formatCorpusChooserItem object, as properties named
// according to the corpus and folder types: standaloneCorpus
// (corpus), subcorpus (corpus), corpusWithSubcorpora (folder),
// subcorpusCollection (folder) and corpusCollection (folder). The
// functions have the signature (title: string, item: object) ->
// string:
// - title: corpus or folder title
// - item: corpus or folder configuration object
// - Returns: formatted title as a string.
// The default functions defined in ../config.js return the title as
// is.


console.log("plugin corpuschooser_item_formatter")


// Plugin class

class CorpusChooserItemFormatter {

    constructor () {
        // The corpus and folder item types are used to choose the
        // formatting function
        this.requiresFeatures = [
            "corpusItemType",
        ]
    }

    // Callback methods

    // Format folder title using a function defined in the
    // configuration (default: no formatting). Note that this also
    // affects the title in the folder information popup.
    formatPopupFolderTitle (title, folder) {
        return settings.formatCorpusChooserItem[folder.info.folderType](
            title, folder)
    }

    // Format corpus title using a function defined in the
    // configuration (default: no formatting).
    formatCorpusChooserCorpusTitle (title, corpus) {
        return settings.formatCorpusChooserItem[corpus.corpusType](
            title, corpus)
    }

    // Filter the corpus title when shown in the corpus chooser
    // heading when only a single corpus is selected, as it uses the
    // value formatted by formatCorpusChooserCorpusTitle.
    filterCorpusChooserSingleSelectedCorpusName (corpusName) {
        // Remove HTML tags as they would be visible in the corpus
        // chooser heading when only a single corpus is selected
        return corpusName.replace(/<.*?>/g, "")
    }

}


// Register the plugin
plugins.register(new CorpusChooserItemFormatter())
