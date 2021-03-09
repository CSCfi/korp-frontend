
// Plugin config_corpus_features
//
// Callback method to initialize properties in settings.corpora.*
// based on their property "features" and the properties in
// settings.corpusFeatures.


console.log("plugin config_corpus_features")


// Class ConfigCorpusFeatures does not have internal state, but a
// class is defined so that the callback functions can call internal
// methods containing the actual implementation.

class ConfigCorpusFeatures {

    // Callback method called at a hook point

    // Call _setCorpusFeatures for all corpora in corpora
    modifyCorpusConfigs (corpora) {
        // c.log("ConfigCorpusFeatures.modifyCorpusConfigs", corpora)
        for (let corpusId in corpora) {
            this._setCorpusFeatures(corpora[corpusId])
        }
    }

    // Internal methods

    // Extend corpus settings based on the values specified in the
    // "features" property of a corpus configuration.
    //
    // The "features" property is an array, whose values should be
    // keys (property names) of settings.corpusFeatures. The corpus
    // configuration is extended by the corresponding property value
    // in settings.corpusFeatures. Extension is recursive, so that if
    // you specify, e.g. { attributes: ... }, the specified attributes
    // are added to (instead of replacing) the explicit attributes in
    // the corpus configuration.
    //
    // Would there be a case for recursive setting of features, so
    // that if a value in settings.corpusFeatures contains a
    // "features" property, the properties corresponding to it are
    // also added? If so, should the properties specified by the
    // nested "features" added before or after adding the explicit
    // properties? (Jyrki Niemi 2016-10-18)

    _setCorpusFeatures (corpusObj) {
        for (let featname of (corpusObj.features || [])) {
            const features = (settings.corpusFeatures != null
                              ? settings.corpusFeatures[featname]
                              : undefined);
            // c.log("_setCorpusFeatures", featname, features, corpusObj)
            if (! features) {
                c.warn("Warning: settings.corpusFeatures[\"" + featname +
                       "\"] not defined: referred to in settings.corpora." +
                       corpusObj.id);
            } else {
                $.extend(true, corpusObj, features);
            }
        }
    }

};


// Initialize settings.corpusFeatures to an empty object if it is not
// yet initialized
if (settings.corpusFeatures === undefined) {
    settings.corpusFeatures = {}
}


// Register the plugin
plugins.register(new ConfigCorpusFeatures())
