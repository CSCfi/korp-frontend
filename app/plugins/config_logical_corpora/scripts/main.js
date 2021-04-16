
// Plugin config_logical_corpora
//
// Callback methods to add logicalCorpus property to corpus
// configurations.


console.log("plugin config_logical_corpora")


// Plugin class

class ConfigLogicalCorpora {

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
        c.log("setFolderLogicalCorpora", folder,
              logicalCorpus != null ? logicalCorpus.title : undefined);
        for (let corpusId of folder.contents || []) {
            if (! (corpusId in corpora)) {
                continue;
            }
            const corpus = corpora[corpusId];
            corpus.logicalCorpus = logicalCorpus || corpora[corpusId];
        }
        // c.log("logical corpus of", corpusId, "is",
        //       corpus.logicalCorpus.title)
        for (let subfolderName of Object.keys(folder || {})) {
            const subfolder = folder[subfolderName];
            if (! window.folderNonCorpusProps.includes(subfolderName)) {
                const subfolderLogicalCorpus = (
                    logicalCorpus ||
                        ((subfolder.info != null
                          ? subfolder.info.isLogicalCorpus
                          : undefined) ||
                         (subfolder.info != null
                          ? subfolder.info.urn
                          : undefined)
                         ? subfolder
                         : undefined));
                this._setFolderLogicalCorpora(
                    subfolder, corpora, subfolderLogicalCorpus);
            }
        }
    }

}


// Register the plugin
plugins.register(new ConfigLogicalCorpora())
