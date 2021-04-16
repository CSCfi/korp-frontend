
// Initialize the property logical_corpus in settings.corpora.*. The
// logical corpus of a corpus may be either the physical corpus itself
// or a corpus folder containing the corpus (possibly indirectly).

util.initCorpusSettingsLogicalCorpora = function() {
    // Corpora in folders
    util.setFolderLogicalCorpora(settings.corporafolders);
    // Top-level corpora
    for (let corpus_id in settings.corpora) {
        const corpus = settings.corpora[corpus_id];
        if (!("logical_corpus" in corpus)) {
            corpus.logical_corpus = corpus;
        }
    }
};

// Recursively initialize the property logical_corpus of the corpora in
// the given folder. If the parameter logical_corpus not null, use it;
// otherwise, if the folder has property info.is_logical_corpus or
// info.urn, the folder represents the logical corpus; otherwise, the
// logical corpus is found deeper in the folder hierarchy or it is the
// same as the physical corpus.

util.setFolderLogicalCorpora = function(folder, logical_corpus = null) {
    c.log("setFolderLogicalCorpora", folder, logical_corpus != null ? logical_corpus.title : undefined);
    for (let corpus_id of folder.contents || []) {
        if (!(corpus_id in settings.corpora)) {
            continue;
        }
        const corpus = settings.corpora[corpus_id];
        corpus.logical_corpus = logical_corpus || settings.corpora[corpus_id];
    }
        // c.log "logical corpus of", corpus_id, "is", corpus.logical_corpus?.title
    for (let subfolder_name of Object.keys(folder || {})) {
        const subfolder = folder[subfolder_name];
        if (!["title", "contents", "description", "info"].includes(subfolder_name)) {
            const subfolder_logical_corpus =
                logical_corpus || ((subfolder.info != null ? subfolder.info.is_logical_corpus : undefined) ||
                                           (subfolder.info != null ? subfolder.info.urn : undefined) ?
                                       subfolder : undefined);
            util.setFolderLogicalCorpora(subfolder, subfolder_logical_corpus);
        }
    }
};
