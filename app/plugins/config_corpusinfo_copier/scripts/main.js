
// Plugin config_corpusinfo_copier
//
// Callback methods to copy (extra) corpus information in the "info"
// property of a corpus configuration to top-level properties to
// propagate the information in a corpus folder to its corpora.


console.log("plugin config_corpusinfo_copier")

// Class ConfigCorpusInfoCopier does not have internal state, but a
// class is defined so that the callback functions can call internal
// methods containing the actual implementation.

class ConfigCorpusInfoCopier {

    constructor () {
        // Provide feature "corpusInfo"
        this.providesFeatures = ["corpusInfo"]
        // Internal constant values used in _copyCorpusInfoToConfig
        // Info key sections
        this._infoKeySects =
              settings.corpusExtraInfoItems
              .filter((item) => item !== "urn")
              .map((item) => item.charAt(0).toUpperCase() + item.slice(1));
        this._infoKeySects.push("");
        // Supported subkeys in the info items: a full key can be of
        // the form section + subkey
        this._infoSubkeys = [
            "Name",
            "Description",
            "URN",
            "URL"
        ];
    }

    // Callback methods called at hook points

    // Modify corpus and corpus folder configurations
    modifyCorpusConfigs (corpora, corpusFolders) {
        for (let folderId in corpusFolders) {
            this._propagateCorpusFolderInfo(corpusFolders[folderId], undefined)
        }
        for (let corpusId in corpora) {
            this._copyCorpusInfoToConfig(corpora[corpusId])
        }
    }

    // Internal methods

    // Copy information from the "info" property of corpusObj to the
    // top level of corpusObj. This information may come from the
    // backend .info file or database. The same information can also
    // be specified in top-level properties of the frontend config
    // file, but the information from "info" overrides them, so that
    // this information can be accessed uniformly through the
    // top-level properties. A property name may contain a prefix
    // indicating a section (Metadata, Licence, Compiler, or other
    // listed in settings.corpusExtraInfoItems): these are converted
    // to separate composite objects in corpusObj. For example,
    // Licence_URL: X, Licence_Name: Y is converted to licence : {
    // url: X, name: Y }.
    _copyCorpusInfoToConfig (corpusObj) {
        if (! corpusObj.info) {
            return;
        }
        const corpusInfo = corpusObj.info;
        for (let sect of this._infoKeySects) {
            const sect_name = sect.toLowerCase();
            let subobj = corpusObj;
            if (sect !== "") {
                subobj = sect_name in corpusObj ? corpusObj[sect_name] : {};
            }
            const info_key_prefix = sect + (sect === "" ? "" : "_");
            let added_properties = false;
            for (let key of this._infoSubkeys) {
                const subkey = key.toLowerCase();
                const value = corpusInfo[info_key_prefix + key];
                if (value) {
                    subobj[subkey] = value;
                    added_properties = true;
                }
            }
            // Add only non-empty subobjects
            if ((sect !== "") && added_properties) {
                corpusObj[sect_name] = subobj;
            }
        }
    }

    // Propagate information in the properties of info to
    // corpusFolder, all its subfolders (recursively) and corpora.
    // Info items lower in the corpus folder tree override those from
    // above.
    _propagateCorpusFolderInfo (corpusFolder, info) {

        // Copy properties from info to corpusConfig if they are
        // missing from corpusConfig. A composite property in
        // corpusConfig overrides all the values in info (coming
        // from folder info).
        const addCorpusInfo = function(corpusConfig, info) {
            for (let prop_name in info) {
                if (! (prop_name in corpusConfig)) {
                    corpusConfig[prop_name] = info[prop_name];
                }
            }
        };

        // The info in this folder overrides that coming from above
        if (corpusFolder.info) {
            info = $.extend(true, {}, info || {}, corpusFolder.info);
        } else if (info) {
            // Copy the info to this folder
            corpusFolder.info = $.extend(true, {}, info);
        }
        // Propagate the info to the corpora in this folder
        if (info && corpusFolder.contents) {
            for (let corpusId of corpusFolder.contents) {
                if (settings.corpora[corpusId]) {
                    addCorpusInfo(settings.corpora[corpusId], info);
                }
            }
        }
        // Recursively process subfolders and propagate the info
        for (let prop_name in corpusFolder) {
            if (window.isSubfolderName(prop_name)) {
                // c.log("propagate ", prop_name);
                this._propagateCorpusFolderInfo(corpusFolder[prop_name], info);
            }
        }
    }

};


// Register the plugin
plugins.register(new ConfigCorpusInfoCopier())
