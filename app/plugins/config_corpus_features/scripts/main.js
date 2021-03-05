
// Initialize properties in settings.corpora.* based on their property
// "features" and the properties in settings.corpus_features.

util.initCorpusSettingsFeatures = () => util.forAllCorpora(util.setCorpusFeatures);

// Extend corpus settings based on the values specified in the
// "features" property of a corpus configuration.
//
// The "features" property is an array, whose values should be keys
// (property names) of settings.corpus_features. The corpus
// configuration is extended by the corresponding property value in
// settings.corpus_features. Extension is recursive, so that if you
// specify, e.g. { attributes: ... }, the specified attributes are
// added to (instead of replacing) the explicit attributes in the
// corpus configuration.
//
// Would there be a case for recursive setting of features, so that if
// a value in settings.corpus_features contains a "features" property,
// the properties corresponding to it are also added? If so, should the
// properties specified by the nested "features" added before or after
// adding the explicit properties? (Jyrki Niemi 2016-10-18)

util.setCorpusFeatures = function (corpusInfo) {
    for (let featname of (corpusInfo.features || [])) {
        const features = (settings.corpus_features != null
                          ? settings.corpus_features[featname]
                          : undefined);
        // c.log "setCorpusFeatures", featname, features, corpusInfo
        if (! features) {
            c.warn("Warning: settings.corpus_features[\"" + featname +
                   "\"] not defined: referred to in settings.corpora." +
                   corpusInfo.id);
        } else {
            $.extend(true, corpusInfo, features);
        }
    }
};
