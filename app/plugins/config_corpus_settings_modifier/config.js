
// Plugin config_corpus_settings_modifier: default configuration
//
// Default values for settings.modifyCorpusSettings,
// settings.modifyFolderSettings and
// settings.corpusSettingsModifierRequiresFeatures, used only if they
// have not yet been defined.


plugins.setDefaultSettings({
    // Function (corpus, parentFolder) to modify corpus settings:
    // Arguments:
    // - corpus: corpus settings object in settings.corpora
    // - parentFolder: the parent folder of corpus in
    //   settings.corporafolders; undefined if the corpus is not in
    //   any folder
    // Returns: nothing
    // A null or undefined value (default) skips calling the function,
    // which is faster than using an empty function.
    modifyCorpusSettings: null,
    // Function (folder, parentFolder) to modify corpus folder
    // settings:
    // Arguments:
    // - folder: corpus folder settings object in
    //   settings.corporafolders
    // - parentFolder: the parent folder of folder in
    //   settings.corporafolders; undefined if folder is at the top
    //   level
    // Returns: nothing
    // A null or undefined value (default) skips calling the function,
    // which is faster than using an empty function.
    modifyFolderSettings: null,
    // A list of features provided by other plugins that the functions
    // modifying settings require (default: nothing required)
    corpusSettingsModifierRequiresFeatures: [],
})
