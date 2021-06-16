
// Plugin config_logical_corpora
//
// Callback methods to add logicalCorpus property to corpus
// configurations.
//
// Also add corpusType to corpus configurations and info.folderType to
// corpus folder configurations:
// - corpus.corpusType is one of:
//   - standaloneCorpus: a corpus without subcorpora, consisting of a
//     single physical corpus
//   - subcorpus: a subcorpus of a corpus with subcorpora
// - folder.info.folderType is one of:
//   - corpusWithSubcorpora: the top folder of a corpus consisting of
//     subcorpora
//   - subcorpusCollection: an intermediate folder within a corpus
//     consisting of subcorpora
//   - corpusCollection: a collection of corpora, not a corpus itself


console.log("plugin config_logical_corpora")


// Plugin class

class ConfigLogicalCorpora {

    constructor () {
        // This plugin requires feature "corpusInfo"
        this.requiresFeatures = ["corpusInfo"]
        // This plugin provides features "logicalCorpus" and
        // "corpusItemType"; if some other plugin requires one of
        // them, its registering is deferred until after this plugin
        // has been registered.
        this.providesFeatures = [
            "logicalCorpus",
            "corpusItemType",
        ]
    }

    // Callback method

    // Initialize property logicalCorpus in all corpora.
    modifyCorpusConfigs (corpora, corporafolders) {
        this._initCorpusSettingsLogicalCorpora(corpora, corporafolders)
    }

    // Internal methods

    // Initialize the property logicalCorpus in settings.corpora.*.
    // The logical corpus of a corpus may be either the physical
    // corpus itself or a corpus folder containing the corpus
    // (possibly indirectly).
    _initCorpusSettingsLogicalCorpora (corpora, corporafolders) {
        // Corpora in folders
        this._setFolderLogicalCorpora(corporafolders, corpora);
        // Top-level corpora
        for (let corpusId in corpora) {
            const corpus = corpora[corpusId];
            if (! ("logicalCorpus" in corpus)) {
                corpus.logicalCorpus = corpus;
                // Top-level corpora are stand-alone corpora (a corpus
                // without subcorpora)
                corpus.corpusType = "standaloneCorpus";
            }
        }
    }

    // Recursively initialize the property logicalCorpus of the
    // corpora in the given folder. If the parameter logicalCorpus not
    // null, use it; otherwise, if the folder has property
    // info.isLogicalCorpus or info.urn, the folder represents the
    // logical corpus; otherwise, the logical corpus is found deeper
    // in the folder hierarchy or it is the same as the physical
    // corpus.
    _setFolderLogicalCorpora (folder, corpora, logicalCorpus = null) {
        // c.log("setFolderLogicalCorpora", folder,
        //       logicalCorpus != null ? logicalCorpus.title : undefined);
        if (logicalCorpus) {
            folder.info.logicalCorpus = logicalCorpus;
        }
        for (let corpusId of folder.contents || []) {
            if (! (corpusId in corpora)) {
                continue;
            }
            const corpus = corpora[corpusId];
            corpus.logicalCorpus = logicalCorpus || corpora[corpusId];
            // If within a logical corpus, this is a subcorpus,
            // otherwise a stand-alone corpus
            corpus.corpusType = (
                logicalCorpus ? "subcorpus" : "standaloneCorpus");
        }
        // c.log("logical corpus of", corpusId, "is",
        //       corpus.logicalCorpus.title)
        for (let subfolderName of Object.keys(folder || {})) {
            if (window.isSubfolderName(subfolderName)) {
                const subfolder = folder[subfolderName];
                if (! subfolder.info) {
                    subfolder.info = {};
                }
                const subfolderLogicalCorpus = (
                    logicalCorpus ||
                        ((subfolder.info.isLogicalCorpus ||
                          subfolder.info.urn)
                         ? subfolder
                         : null));
                // If this folder is (within) a logical corpus, a
                // subfolder is a collection of subcorpora; otherwise,
                // if the subfolder is a logical corpus, it is a
                // corpus with subcorpora; otherwise, the subfolder is
                // a collection of separate corpora
                subfolder.info.folderType = (
                    logicalCorpus
                        ? "subcorpusCollection"
                        : (subfolderLogicalCorpus
                           ? "corpusWithSubcorpora"
                           : "corpusCollection"));
                this._setFolderLogicalCorpora(
                    subfolder, corpora, subfolderLogicalCorpus);
            }
        }
    }

}


// Register the plugin
plugins.register(new ConfigLogicalCorpora())
