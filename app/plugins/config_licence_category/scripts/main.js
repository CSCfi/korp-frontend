
// Plugin config_licence_category
//
// Callback methods to add licenceType and limitedAccess properties to
// corpus configurations based on licence name.


console.log("plugin config_logical_corpora")


// Plugin class

class ConfigLicenceCategory {

    constructor () {
        // This plugin needs to be registered after a plugin providing
        // feature "logicalCorpus", so that its callback method is
        // called after the logicalCorpus property has been added.
        this.requiresFeatures = ["logicalCorpus"]
    }

    // Callback method

    // Initialize properties licenceType and limitedAccess to corpora
    // based on licence name.
    modifyCorpusConfigs (corpora, corporafolders) {
        this._initCorpusSettingsLicenceCategory (corpora, corporafolders)
    }

    // Internal methods

    // Initialize the properties licenceType and limitedAccess for all
    // corpora based whether the licence name indicates that the
    // corpus licence is CLARIN ACA or CLARIN RES. These properties
    // would not need to be set in the configuration.
    _initCorpusSettingsLicenceCategory (corpora, corporafolders) {
        this._setFolderLicenceCategory(corporafolders);
        const result = [];
        for (let corpusId in corpora) {
            const corpus = corpora[corpusId];
            if (corpus.licence && ! corpus.licence.category) {
                corpus.licence.category =
                    this._getLicenceCategory(corpus.licence)
            }
            if (corpus.licenceType == null) {
                corpus.licenceType = (
                    (corpus.licence && corpus.licence.category) ||
                        (corpus.logicalCorpus && corpus.logicalCorpus.info &&
                         corpus.logicalCorpus.info.licence &&
                         corpus.logicalCorpus.info.licence.category));
            }
            if (["ACA", "ACA-Fi", "RES"].includes(corpus.licenceType)) {
                corpus.limitedAccess = true;
            }
        }
    };

    // Set the info.licence.category (RES or ACA) of folder if it
    // contains info.licence.name with CLARIN RES or CLARIN ACA, and
    // recursively that of all its subfolders.
    _setFolderLicenceCategory (folder) {
        if (folder.info && folder.info.licence
            && ! folder.info.licence.category) {
            folder.info.licence.category =
                this._getLicenceCategory(folder.info.licence)
        }
        for (let subfolderName of Object.keys(folder || {})) {
            const subfolder = folder[subfolderName];
            if (! window.folderNonCorpusProps.includes(subfolderName)) {
                this._setFolderLicenceCategory(subfolder);
            }
        }
    };

    _getLicenceCategory (licenceObj) {
        const licenceName = licenceObj && licenceObj.name
        if (licenceName != null) {
            const match = /(?:CLARIN )?(ACA(-Fi)?|RES)/.exec(licenceName);
            if (match) {
                // c.log("licenceCategory", licenceName, match[1])
                return match[1];
            }
        }
        return undefined
    }

}


// Register the plugin
plugins.register(new ConfigLicenceCategory())
