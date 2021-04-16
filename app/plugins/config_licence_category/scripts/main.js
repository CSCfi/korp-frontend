
// Initialize the properties licence_type and limited_access for all
// corpora based whether the licence name indicates that the corpus
// licence is CLARIN ACA or CLARIN RES. These properties would not need
// to be set in the configuration.

util.initCorpusSettingsLicenceCategory = function() {
    util.setFolderLicenceCategory(settings.corporafolders);
    return (() => {
        const result = [];
        for (let corpus_id in settings.corpora) {
            const corpus = settings.corpora[corpus_id];
            if (corpus.licence_type == null) { corpus.licence_type = (corpus.licence != null ? corpus.licence.category : undefined) ||
                                   __guard__(__guard__(corpus.logical_corpus != null ? corpus.logical_corpus.info : undefined, x1 => x1.licence), x => x.category); }
            if (["ACA", "ACA-Fi", "RES"].includes(corpus.licence_type)) {
                result.push(corpus.limited_access = true);
            } else {
                result.push(undefined);
            }
        }
        return result;
    })();
};

// Set the info.licence.category (RES or ACA) of folder if it contains
// info.licence.name with CLARIN RES or CLARIN ACA, and recursively
// that of all its subfolders.

util.setFolderLicenceCategory = function(folder) {
    const licence_name = __guard__(folder.info != null ? folder.info.licence : undefined, x => x.name);
    // c.log "licence_name", folder.title, licence_name
    if (licence_name != null) {
        const category = __guard__(/(?:CLARIN )?(ACA(-Fi)?|RES)/.exec(licence_name), x1 => x1[1]);
        if (category != null) {
            folder.info.licence.category = category;
        }
    }
            // c.log "licence_category", category
    return (() => {
        const result = [];
        for (let subfolder_name of Object.keys(folder || {})) {
            const subfolder = folder[subfolder_name];
            if (!["title", "contents", "description", "info"].includes(subfolder_name)) {
                result.push(util.setFolderLicenceCategory(subfolder));
            } else {
                result.push(undefined);
            }
        }
        return result;
    })();
};
