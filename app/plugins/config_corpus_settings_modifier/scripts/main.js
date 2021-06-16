
// Plugin config_corpus_settings_modifier
//
// A generic plugin for allowing corpus and corpus folder
// modifications to be defined in the configuration in functions
// settings.modifyCorpusSettings and settings.modifyFolderSettings.


console.log("plugin config_corpus_settings_modifier")


// Plugin class

class ConfigCorpusSettingsModifier {

    constructor () {
        // As the functionality is defined in the configuration, also
        // the possible required plugin features need to be defined
        // there.
        this.requiresFeatures =
            settings.corpusSettingsModifierRequiresFeatures || []
    }

    // Callback method

    // Modify corpus and corpus folder settings
    modifyCorpusConfigs (corpora, corpusFolders) {
        if (settings.modifyCorpusSettings || settings.modifyFolderSettings) {
            this._modifyCorpusSettings(corpora, corpusFolders)
        }
    }

    // Internal methods

    // Modify the settings of all corpora and corpus folders
    _modifyCorpusSettings (corpora, corpusFolders) {

        // Recursively delete the "_processed" property from corpus
        // folders
        const deleteFolderProcessedProperty = function (folder) {
            delete folder._processed
            for (let subfolderName in folder) {
                if (window.isSubfolderName(subfolderName)) {
                    deleteFolderProcessedProperty(folder[subfolderName])
                }
            }
        }
            
        // Process folders and corpora in folders
        this._modifyCorpusSettingsRecursive(corpusFolders, corpora)
        if (settings.modifyCorpusSettings) {
            // Process corpora not in any folder
            for (let corpusId in corpora) {
                const corpus = corpora[corpusId]
                if (! corpus._processed) {
                    settings.modifyCorpusSettings(corpus, null)
                }
                // Remove property "_processed" from the corpus
                delete corpus._processed
            }
        }
        if (settings.modifyFolderSettings) {
            // Remove property "_processed" from all folders
            deleteFolderProcessedProperty(corpusFolders)
        }
    }

    // Recursively modify the settings of folder and its subfolders
    // and corpora; corpora is provided as the object containing the
    // settings of all corpora.
    _modifyCorpusSettingsRecursive (folder, corpora) {
        // The parent folder of the children of folder
        const parentFolder = (
            folder === settings.corporafolders ? null : folder)
        if (settings.modifyCorpusSettings) {
            // Process the corpora directly within this folder
            for (let corpusId of folder.contents || []) {
                // Process only existing corpora not already processed
                if (corpusId in corpora && ! corpora[corpusId]._processed) {
                    const corpus = corpora[corpusId]
                    // Call the modification function defined in the
                    // configuration
                    settings.modifyCorpusSettings(corpus, parentFolder)
                    corpus._processed = true
                }
            }
        }
        // Recursively process subfolders 
        for (let subfolderName of Object.keys(folder || {})) {
            if (window.isSubfolderName(subfolderName)) {
                const subfolder = folder[subfolderName]
                if (settings.modifyFolderSettings) {
                    // Call the modification function for subfolder
                    settings.modifyFolderSettings(subfolder, parentFolder)
                }
                // Recurse
                this._modifyCorpusSettingsRecursive(subfolder, corpora)
            }
        }
        // Would it be faster to set the property unconditionally (and
        // clear it afterwards) than test?
        if (settings.modifyFolderSettings) {
            folder._processed = true
        }
    }

}


// Register the plugin
plugins.register(new ConfigCorpusSettingsModifier())
