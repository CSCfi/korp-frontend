/** @format */
const folderImg = require("../img/folder.png")
const korpIconImg = require("../img/korp_icon.png")
const jRejectBackgroundImg = require("../img/browsers/background_browser.gif")
require("../img/browsers/browser_chrome.gif")
require("../img/browsers/browser_firefox.gif")
require("../img/browsers/browser_safari.gif")
require("../img/browsers/browser_opera.gif")

window.util = {}

window.CorpusListing = class CorpusListing {
    constructor(corpora) {
        // // This would require calling util.initAvailableCorpora in
        // // advance, but it is currently done when processing the
        // // data returned by /corpus_info. Does it always work
        // // correctly that way?
        // if (corpora === settings.corpora) {
        //     util.removeUnavailableCorpora(corpora)
        //     util.adjustPreselectedCorpora()
        // }
        this.struct = corpora
        this.corpora = _.values(corpora)
        this.selected = _.filter(this.corpora, (corp) => !corp.limitedAccess)
    }

    get(key) {
        return this.struct[key]
    }

    list() {
        return this.corpora
    }

    map(func) {
        return _.map(this.corpora, func)
    }

    subsetFactory(idArray) {
        // returns a new CorpusListing instance from an id subset.
        idArray = _.invokeMap(idArray, "toLowerCase")
        const cl = new CorpusListing(_.pick(this.struct, ...idArray))
        cl.selected = cl.corpora
        return cl
    }

    // only applicable for parallel corpora
    getReduceLang() {}

    // Returns an array of all the selected corpora's IDs in uppercase
    getSelectedCorpora() {
        return corpusChooserInstance.corpusChooser("selectedItems")
    }

    select(idArray) {
        this.selected = _.values(_.pick.apply(this, [this.struct].concat(idArray)))
    }

    mapSelectedCorpora(f) {
        return _.map(this.selected, f)
    }

    // takes an array of mapping objs and returns their intersection
    _mapping_intersection(mappingArray) {
        return _.reduce(
            mappingArray,
            function (a, b) {
                const keys_intersect = _.intersection(_.keys(a), _.keys(b))
                const to_mergea = _.pick(a, ...keys_intersect)
                const to_mergeb = _.pick(b, ...keys_intersect)
                return _.merge({}, to_mergea, to_mergeb)
            } || {}
        )
    }

    _mapping_union(mappingArray) {
        return _.reduce(mappingArray, (a, b) => _.merge(a, b), {})
    }

    getCurrentAttributes(lang) {
        // lang not used here, only in parallel mode
        const attrs = this.mapSelectedCorpora((corpus) => corpus.attributes)
        return this._invalidateAttrs(attrs)
    }

    getCurrentAttributesIntersection() {
        const attrs = this.mapSelectedCorpora((corpus) => corpus.attributes)

        return this._mapping_intersection(attrs)
    }

    getStructAttrsIntersection() {
        const attrs = this.mapSelectedCorpora(function (corpus) {
            for (let key in corpus.structAttributes) {
                const value = corpus.structAttributes[key]
                value["isStructAttr"] = true
            }

            return corpus.structAttributes
        })
        return this._mapping_intersection(attrs)
    }

    getStructAttrs() {
        const attrs = this.mapSelectedCorpora(function (corpus) {
            for (let key in corpus.structAttributes) {
                const value = corpus.structAttributes[key]
                value["isStructAttr"] = true
            }

            // if a position attribute is declared as structural, include here
            const pos_attrs = _.pickBy(corpus.attributes, (val, key) => {
                return val.isStructAttr
            })
            return _.extend({}, pos_attrs, corpus.structAttributes)
        })
        const rest = this._invalidateAttrs(attrs)

        // TODO this code merges datasets from attributes with the same name and
        // should be moved to the code for extended controller "datasetSelect"
        const withDataset = _.filter(_.toPairs(rest), (item) => item[1].dataset)
        $.each(withDataset, function (i, item) {
            const key = item[0]
            const val = item[1]
            return $.each(attrs, function (j, origStruct) {
                if (origStruct[key] && origStruct[key].dataset) {
                    let ds = origStruct[key].dataset
                    if ($.isArray(ds)) {
                        ds = _.zipObject(ds, ds)
                    }

                    if (_.isArray(val.dataset)) {
                        val.dataset = _.zipObject(val.dataset, val.dataset)
                    }
                    return $.extend(val.dataset, ds)
                }
            })
        })

        return $.extend(rest, _.fromPairs(withDataset))
    }
    // End TODO

    getDefaultFilters() {
        return this._getFilters("intersection", "defaultFilters")
    }

    getCurrentFilters() {
        return this._getFilters(settings.filterSelection, "showFilters")
    }

    _getFilters(selection, filterType) {
        let attrNames = []
        let attrs = {}

        for (let corpus of this.selected) {
            if (filterType in corpus) {
                for (let filter of corpus[filterType]) {
                    if (!attrNames.includes(filter)) {
                        attrNames.push(filter)
                    }
                    if (!(filter in attrs)) {
                        attrs[filter] = {
                            settings: corpus.structAttributes[filter],
                            corpora: [corpus.id],
                        }
                    } else {
                        attrs[filter].corpora.push(corpus.id)
                    }
                }
            }
        }

        if (selection === "intersection") {
            const attrNames2 = []
            const attrs2 = {}
            const corpusCount = this.selected.length
            for (let attr of attrNames) {
                if (attrs[attr].corpora.length === corpusCount) {
                    attrNames2.push(attr)
                    attrs2[attr] = attrs[attr]
                }
            }
            attrNames = attrNames2
            attrs = attrs2
        }

        return [attrNames, attrs]
    }

    _invalidateAttrs(attrs) {
        const union = this._mapping_union(attrs)
        const intersection = this._mapping_intersection(attrs)
        $.each(union, function (key, value) {
            if (intersection[key] == null) {
                value["disabled"] = true
            } else {
                return delete value["disabled"]
            }
        })

        return union
    }

    // returns true if coprus has all attrs, else false
    corpusHasAttrs(corpus, attrs) {
        for (let attr of attrs) {
            if (
                attr !== "word" &&
                !(
                    attr in
                    $.extend(
                        {},
                        this.struct[corpus].attributes,
                        this.struct[corpus].structAttributes
                    )
                )
            ) {
                return false
            }
        }
        return true
    }

    stringifySelected() {
        return _.map(this.selected, "id")
            .map((a) => a.toUpperCase())
            .join(",")
    }

    stringifyAll() {
        return _.map(this.corpora, "id")
            .map((a) => a.toUpperCase())
            .join(",")
    }

    getWithinKeys() {
        const struct = _.map(this.selected, (corpus) => _.keys(corpus.within))
        return _.union(...(struct || []))
    }

    getContextQueryStringFromCorpusId(corpus_ids, prefer, avoid) {
        const corpora = _.map(corpus_ids, (corpus_id) => settings.corpora[corpus_id.toLowerCase()])
        return this.getContextQueryStringFromCorpora(_.compact(corpora), prefer, avoid)
    }

    getContextQueryString(prefer, avoid) {
        return this.getContextQueryStringFromCorpora(this.selected, prefer, avoid)
    }

    getContextQueryStringFromCorpora(corpora, prefer, avoid) {
        const output = []
        for (let corpus of corpora) {
            const contexts = _.keys(corpus.context)
            if (!contexts.includes(prefer)) {
                if (contexts.length > 1 && contexts.includes(avoid)) {
                    contexts.splice(contexts.indexOf(avoid), 1)
                }
                output.push(corpus.id.toUpperCase() + ":" + contexts[0])
            }
        }
        return _(output).compact().join()
    }

    getWithinParameters() {
        const defaultWithin = locationSearch().within || _.keys(settings.defaultWithin)[0]

        const output = []
        for (let corpus of this.selected) {
            const withins = _.keys(corpus.within)
            if (!withins.includes(defaultWithin)) {
                output.push(corpus.id.toUpperCase() + ":" + withins[0])
            }
        }
        const within = _(output).compact().join()
        return { default_within: defaultWithin, within }
    }

    getTimeInterval() {
        const all = _(this.selected)
            .map("time")
            .filter((item) => item != null)
            .map(_.keys)
            .flatten()
            .map(Number)
            .sort((a, b) => a - b)
            .value()

        return [_.first(all), _.last(all)]
    }

    getMomentInterval() {
        let from, to
        const toUnix = (item) => item.unix()

        const infoGetter = (prop) => {
            return _(this.selected)
                .map("info")
                .map(prop)
                .compact()
                .map((item) => moment(item))
                .value()
        }

        const froms = infoGetter("FirstDate")
        const tos = infoGetter("LastDate")

        if (!froms.length) {
            from = null
        } else {
            from = _.minBy(froms, toUnix)
        }
        if (!tos.length) {
            to = null
        } else {
            to = _.maxBy(tos, toUnix)
        }

        return [from, to]
    }

    getNonProtected() {
        return _.filter(this.corpora, (item) => !item.limitedAccess)
    }

    getTitle(corpus) {
        try {
            return this.struct[corpus].title
        } catch (e) {
            return c.log("gettitle broken", corpus)
        }
    }

    getWordGroup(withCaseInsentive) {
        const word = {
            group: "word",
            value: "word",
            label: "word",
        }
        if (withCaseInsentive) {
            const wordInsensitive = {
                group: "word",
                value: "word_insensitive",
                label: "word_insensitive",
            }
            return [word, wordInsensitive]
        } else {
            return [word]
        }
    }

    getWordAttributeGroups(lang, setOperator) {
        let allAttrs
        if (setOperator === "union") {
            allAttrs = this.getCurrentAttributes(lang)
        } else {
            allAttrs = this.getCurrentAttributesIntersection()
        }

        const attrs = []
        for (let key in allAttrs) {
            const obj = allAttrs[key]
            if (obj.displayType !== "hidden") {
                attrs.push(_.extend({ group: "word_attr", value: key }, obj))
            }
        }
        return attrs
    }

    getStructAttributeGroups(lang, setOperator) {
        let allAttrs
        if (setOperator === "union") {
            allAttrs = this.getStructAttrs(lang)
        } else {
            allAttrs = this.getStructAttrsIntersection(lang)
        }

        const common_keys = _.compact(
            _.flatten(_.map(this.selected, (corp) => _.keys(corp.common_attributes)))
        )
        const common = _.pick(settings.commonStructTypes, ...common_keys)

        let sentAttrs = []
        const object = _.extend({}, common, allAttrs)
        for (let key in object) {
            const obj = object[key]
            if (obj.displayType !== "hidden") {
                sentAttrs.push(_.extend({ group: "sentence_attr", value: key }, obj))
            }
        }

        sentAttrs = _.sortBy(sentAttrs, (item) => util.getLocaleString(item.label))

        return sentAttrs
    }

    getAttributeGroups(lang) {
        const words = this.getWordGroup(false)
        const attrs = this.getWordAttributeGroups(lang, "union")
        const sentAttrs = this.getStructAttributeGroups(lang, "union")
        return words.concat(attrs, sentAttrs)
    }

    getStatsAttributeGroups(lang) {
        const words = this.getWordGroup(true)

        const wordOp = settings.reduceWordAttributeSelector || "union"
        const attrs = this.getWordAttributeGroups(lang, wordOp)

        const structOp = settings.reduceStructAttributeSelector || "union"
        const sentAttrs = this.getStructAttributeGroups(lang, structOp)

        return words.concat(attrs, sentAttrs)
    }
}

// TODO never use this, remove when sure it is not used
window.search = (obj, val) => window.locationSearch(obj, val)

window.locationSearch = function (obj, val) {
    const s = angular.element("body").scope()

    const ret = safeApply(s.$root, function () {
        if (!obj) {
            return s.$root.locationSearch()
        }
        if (_.isObject(obj)) {
            obj = _.extend({}, s.$root.locationSearch(), obj)
            return s.$root.locationSearch(obj)
        } else {
            return s.$root.locationSearch(obj, val)
        }
    })

    if (val === null) {
        window.onHashChange()
    }
    return ret
}

window.initLocales = function () {
    const packages = ["locale", "corpora"]
    const prefix = "translations"
    const defs = []
    let loc_data = {}
    window.loc_data = loc_data
    const def = $.Deferred()
    for (let lang of settings.languages) {
        loc_data[lang] = {}
        for (let pkg of packages) {
            ;(function (lang, pkg) {
                let file = pkg + "-" + lang + ".json"
                file = prefix + "/" + file
                return defs.push(
                    $.ajax({
                        url: file,
                        dataType: "json",
                        cache: false,
                        success(data) {
                            return _.extend(loc_data[lang], data)
                        },
                    })
                )
            })(lang, pkg)
        }
    }

    $.when.apply($, defs).then(() => def.resolve(loc_data))

    return def
}

window.safeApply = function (scope, fn) {
    if (scope.$$phase || scope.$root.$$phase) {
        return fn(scope)
    } else {
        return scope.$apply(fn)
    }
}

window.util.setLogin = function () {
    for (let corp of authenticationProxy.loginObj.credentials) {
        $(`#hpcorpus_${corp.toLowerCase()}`).closest(".boxdiv.disabled").removeClass("disabled")
    }
    if (window.corpusChooserInstance) {
        window.corpusChooserInstance.corpusChooser("updateAllStates")
    }
    $(".err_msg", self).hide()
}

util.SelectionManager = function () {
    this.selected = $()
    this.aux = $()
}

util.SelectionManager.prototype.select = function (word, aux) {
    if (word == null || !word.length) {
        return
    }
    if (this.selected.length) {
        this.selected.removeClass("word_selected token_selected")
        this.aux.removeClass("word_selected aux_selected")
    }
    this.selected = word
    this.aux = aux || $()
    this.aux.addClass("word_selected aux_selected")
    word.addClass("word_selected token_selected")
}

util.SelectionManager.prototype.deselect = function () {
    if (!this.selected.length) {
        return
    }
    this.selected.removeClass("word_selected token_selected")
    this.selected = $()
    this.aux.removeClass("word_selected aux_selected")
    this.aux = $()
}

util.SelectionManager.prototype.hasSelected = function () {
    return this.selected.length > 0
}

util.getLocaleString = (key, lang) => util.getLocaleStringUndefined(key, lang) || key

util.getLocaleStringUndefined = function (key, lang) {
    if (!lang) {
        lang = window.lang || settings.defaultLanguage || "sv"
    }
    try {
        return window.loc_data[lang][key]
    } catch (e) {
        return undefined
    }
}

util.localize = function (root) {
    root = root || "body"
    $(root).localize()
}

util.lemgramToString = function (lemgram, appendIndex) {
    lemgram = _.trim(lemgram)
    let infixIndex = ""
    let concept = lemgram
    infixIndex = ""
    let type = ""
    if (util.isLemgramId(lemgram)) {
        const match = util.splitLemgram(lemgram)
        if (appendIndex != null && match.index !== "1") {
            infixIndex = $.format("<sup>%s</sup>", match.index)
        }
        concept = match.form.replace(/_/g, " ")
        type = match.pos.slice(0, 2)
    }
    return $.format(
        "%s%s <span class='wordclass_suffix'>(<span rel='localize[%s]'>%s</span>)</span>",
        [concept, infixIndex, type, util.getLocaleString(type)]
    )
}

const numberToSuperscript = {
    "1": "",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
    "0": "⁰",
}

// use this function to get a pretty printed lemgram with no HTML
util.lemgramToPlainString = function (lemgram) {
    const { form, pos, index } = util.splitLemgram(_.trim(lemgram))
    const infixIndex = _.map(index, (indexPart) => numberToSuperscript[indexPart]).join("")
    const concept = form.replace(/_/g, " ")
    const type = pos.slice(0, 2)
    return `${concept}${infixIndex} (${util.getLocaleString(type)})`
}

util.saldoRegExp = /(.*?)\.\.(\d\d?)(:\d+)?$/
util.saldoToString = function (saldoId, appendIndex) {
    const match = saldoId.match(util.saldoRegExp)
    let infixIndex = ""
    if (appendIndex != null && match[2] !== "1") {
        infixIndex = $.format("<sup>%s</sup>", match[2])
    }
    return $.format("%s%s", [match[1].replace(/_/g, " "), infixIndex])
}

util.saldoToPlaceholderString = function (saldoId, appendIndex) {
    const match = saldoId.match(util.saldoRegExp)
    let infixIndex = ""
    if (appendIndex != null && match[2] !== "1") {
        infixIndex = $.format(" (%s)", match[2])
    }
    return $.format("%s%s", [match[1].replace(/_/g, " "), infixIndex])
}

util.lemgramRegexp = /\.\.\w+\.\d\d?(:\d+)?$/
util.isLemgramId = (lemgram) => lemgram.search(util.lemgramRegexp) !== -1

util.splitLemgram = function (lemgram) {
    if (!util.isLemgramId(lemgram)) {
        throw new Error(`Input to util.splitLemgram is not a lemgram: ${lemgram}`)
    }
    const keys = ["morph", "form", "pos", "index", "startIndex"]
    const splitArray = lemgram.match(/((\w+)--)?(.*?)\.\.(\w+)\.(\d\d?)(:\d+)?$/).slice(2)
    return _.zipObject(keys, splitArray)
}

// Add download links for other formats, defined in
// settings.downloadFormats (Jyrki Niemi <jyrki.niemi@helsinki.fi>
// 2014-02-26/04-30)

util.setDownloadLinks = function (xhr_settings, result_data) {
    // If some of the required parameters are null, return without
    // adding the download links.
    if (
        !(
            xhr_settings != null &&
            result_data != null &&
            result_data.corpus_order != null &&
            result_data.kwic != null
        )
    ) {
        c.log("failed to do setDownloadLinks")
        return
    }

    if (result_data.hits === 0) {
        $("#download-links").hide()
        return
    }

    $("#download-links").show()

    // Get the number (index) of the corpus of the query result hit
    // number hit_num in the corpus order information of the query
    // result.
    const get_corpus_num = (hit_num) =>
        result_data.corpus_order.indexOf(result_data.kwic[hit_num].corpus)

    c.log("setDownloadLinks data:", result_data)
    $("#download-links").empty()
    // Corpora in the query result
    const result_corpora = result_data.corpus_order.slice(
        get_corpus_num(0),
        get_corpus_num(result_data.kwic.length - 1) + 1
    )
    // Settings of the corpora in the result, to be passed to the
    // download script
    const result_corpora_settings = {}
    let i = 0
    while (i < result_corpora.length) {
        const corpus_ids = result_corpora[i].toLowerCase().split("|")
        let j = 0
        while (j < corpus_ids.length) {
            const corpus_id = corpus_ids[j]
            result_corpora_settings[corpus_id] = settings.corpora[corpus_id]
            j++
        }
        i++
    }
    $("#download-links").append("<option value='init' rel='localize[download_kwic]'></option>")
    i = 0
    while (i < settings.downloadFormats.length) {
        const format = settings.downloadFormats[i]
        // NOTE: Using attribute rel="localize[...]" to localize the
        // title attribute requires a small change to
        // lib/jquery.localize.js. Without that, we could use
        // util.getLocaleString, but it would not change the
        // localizations immediately when switching languages but only
        // after reloading the page.
        // # title = util.getLocaleString('formatdescr_' + format)
        const option = $(`\
<option
    value="${format}"
    title="${util.getLocaleString(`formatdescr_${format}`)}"
    class="download_link">${format.toUpperCase()}</option>\
`)

        const download_params = {
            // query_params: JSON.stringify($.deparam.querystring(xhr_settings.url)),
            query_params: xhr_settings.url,
            format,
            korp_url: window.location.href,
            korp_server_url: settings.korpBackendURL,
            corpus_config: JSON.stringify(result_corpora_settings),
            corpus_config_info_keys: ["metadata", "licence", "homepage", "compiler"].join(","),
            urn_resolver: settings.urnResolver,
        }
        if ("downloadFormatParams" in settings) {
            if ("*" in settings.downloadFormatParams) {
                $.extend(download_params, settings.downloadFormatParams["*"])
            }
            if (format in settings.downloadFormatParams) {
                $.extend(download_params, settings.downloadFormatParams[format])
            }
        }
        option.appendTo("#download-links").data("params", download_params)
        i++
    }
    $("#download-links").off("change")
    $("#download-links")
        .localize()
        .click(false)
        .change(function (event) {
            const params = $(":selected", this).data("params")
            if (!params) {
                return
            }
            $.generateFile(settings.downloadCgiScript, params)
            const self = $(this)
            return setTimeout(() => self.val("init"), 1000)
        })
}

util.searchHash = function (type, value) {
    locationSearch({
        search: type + "|" + value,
        page: 0,
    })
}

let added_corpora_ids = []
util.loadCorporaFolderRecursive = function (first_level, folder) {
    let outHTML
    if (first_level) {
        outHTML = "<ul>"
    } else {
        // Let plugins filter the folder title shown in the popup,
        // based on folder configuration
        const folderTitle = plugins.callFilters(
            "formatPopupFolderTitle", folder.title || "", folder)
        // Let plugins filter the folder description shown in the
        // popup, based on folder configuration
        const folderDescr = plugins.callFilters(
            "formatPopupFolderInfo", folder.description || "", folder)
        outHTML = `<ul title="${folderTitle}" description="${escape(folderDescr)}">`
    }
    if (folder) {
        // This check makes the code work even if there isn't a ___settings.corporafolders = {};___ in config.js
        // Folders
        $.each(folder, function (fol, folVal) {
            if (! window.folderNonCorpusProps.includes(fol)) {
                outHTML += `<li>${util.loadCorporaFolderRecursive(false, folVal)}</li>`
            }
        })

        // Corpora
        if (folder["contents"] && folder["contents"].length > 0) {
            $.each(folder.contents, function (key, value) {
                outHTML += `<li id="${value}">${settings.corpora[value]["title"]}</li>`
                added_corpora_ids.push(value)
            })
        }
    }

    if (first_level) {
        // Add all corpora which have not been added to a corpus
        for (let val in settings.corpora) {
            let cont = false
            for (let usedid in added_corpora_ids) {
                if (added_corpora_ids[usedid] === val || settings.corpora[val].hide) {
                    cont = true
                }
            }
            if (cont) {
                continue
            }

            // Add it anyway:
            outHTML += `<li id='${val}'>${settings.corpora[val].title}</li>`
        }
    }
    outHTML += "</ul>"
    return outHTML
}

// Helper function to turn "8455999" into "8 455 999"
util.prettyNumbers = function (numstring) {
    const regex = /(\d+)(\d{3})/
    let outStrNum = numstring.toString()
    while (regex.test(outStrNum)) {
        outStrNum = outStrNum.replace(
            regex,
            `$1<span rel="localize[util_numbergroupseparator]">${util.getLocaleString(
                "util_numbergroupseparator"
            )}</span>$2`
        )
    }

    return outStrNum
}

util.suffixedNumbers = function (num) {
    let out = ""
    if (num < 1000) {
        // 232
        out = num.toString()
    } else if (num >= 1000 && num < 1e6) {
        // 232,21K
        out = (num / 1000).toFixed(2).toString() + "K"
    } else if (num >= 1e6 && num < 1e9) {
        // 232,21M
        out = (num / 1e6).toFixed(2).toString() + "M"
    } else if (num >= 1e9 && num < 1e12) {
        // 232,21G
        out = (num / 1e9).toFixed(2).toString() + "G"
    } else if (num >= 1e12) {
        // 232,21T
        out = (num / 1e12).toFixed(2).toString() + "T"
    }
    return out.replace(
        ".",
        `<span rel="localize[util_decimalseparator]">${util.getLocaleString(
            "util_decimalseparator"
        )}</span>`
    )
}

// Goes through the settings.corporafolders and recursively adds the settings.corpora hierarchically to the corpus chooser widget
util.loadCorpora = function () {
    added_corpora_ids = []
    const outStr = util.loadCorporaFolderRecursive(true, settings.corporafolders)
    window.corpusChooserInstance = $("#corpusbox")
        .corpusChooser({
            template: outStr,
            infoPopup(corpusID) {
                let baseLangSentenceHTML, baseLangTokenHTML, lang
                const corpusObj = settings.corpora[corpusID]
                let maybeInfo = ""
                // Let plugins filter the corpus description shown in
                // the popup, based on corpus configuration
                const corpusDescr = plugins.callFilters(
                    "formatPopupCorpusInfo",
                    corpusObj.description || "", corpusObj)
                if (corpusDescr) {
                    maybeInfo = `<br/><br/>${corpusDescr}`
                }
                const numTokens = corpusObj.info.Size
                const baseLang = settings.corpora[corpusID] && settings.corpora[corpusID].linkedTo
                if (baseLang) {
                    lang = ` (${util.getLocaleString(settings.corpora[corpusID].lang)})`
                    baseLangTokenHTML = `${util.getLocaleString(
                        "corpselector_numberoftokens"
                    )}: <b>${util.prettyNumbers(settings.corpora[baseLang].info.Size)}
</b> (${util.getLocaleString(settings.corpora[baseLang].lang)})<br/>\
`
                    baseLangSentenceHTML = `${util.getLocaleString(
                        "corpselector_numberofsentences"
                    )}: <b>${util.prettyNumbers(settings.corpora[baseLang].info.Sentences)}
</b> (${util.getLocaleString(settings.corpora[baseLang].lang)})<br/>\
`
                } else {
                    lang = ""
                    baseLangTokenHTML = ""
                    baseLangSentenceHTML = ""
                }

                const numSentences = corpusObj["info"]["Sentences"]
                let lastUpdate = corpusObj["info"]["Updated"]
                if (!lastUpdate) {
                    lastUpdate = "?"
                }
                let sentenceString = "-"
                if (numSentences) {
                    sentenceString = util.prettyNumbers(numSentences.toString())
                }

                // Let plugins filter the corpus description shown in
                // the popup, based on corpus configuration
                let corpusTitle = plugins.callFilters(
                    "formatPopupCorpusTitle", corpusObj.title || "", corpusObj)
                let output = `\
                    <b>
                        <img class="popup_icon" src="${korpIconImg}" />
                        ${corpusTitle}
                    </b>
                    ${maybeInfo}
                    <br/><br/>${baseLangTokenHTML}
                    ${util.getLocaleString("corpselector_numberoftokens")}:
                    <b>${util.prettyNumbers(numTokens)}</b>${lang}
                    <br/>${baseLangSentenceHTML}
                    ${util.getLocaleString("corpselector_numberofsentences")}:
                    <b>${sentenceString}</b>${lang}
                    <br/>
                    ${util.getLocaleString("corpselector_lastupdate")}:
                    <b>${lastUpdate}</b>
                    <br/><br/>`

                const supportsContext = _.keys(corpusObj.context).length > 1
                if (supportsContext) {
                    output += $("<div>").localeKey("corpselector_supports").html() + "<br>"
                }
                if (corpusObj.limitedAccess) {
                    output += $("<div>").localeKey("corpselector_limited").html()
                }
                return output
            },

            infoPopupFolder(indata) {
                const { corporaID } = indata
                const desc = indata.description
                let totalTokens = 0
                let totalSentences = 0
                let missingSentenceData = false
                $(corporaID).each(function (key, oneID) {
                    totalTokens += parseInt(settings.corpora[oneID]["info"]["Size"])
                    const oneCorpusSentences = settings.corpora[oneID]["info"]["Sentences"]
                    if (oneCorpusSentences) {
                        totalSentences += parseInt(oneCorpusSentences)
                    } else {
                        missingSentenceData = true
                    }
                })

                let totalSentencesString = util.prettyNumbers(totalSentences.toString())
                if (missingSentenceData) {
                    totalSentencesString += "+"
                }
                let maybeInfo = ""
                if (desc && desc !== "") {
                    maybeInfo = desc + "<br/><br/>"
                }
                let glueString = ""
                if (corporaID.length === 1) {
                    glueString = util.getLocaleString("corpselector_corporawith_sing")
                } else {
                    glueString = util.getLocaleString("corpselector_corporawith_plur")
                }
                return `<b><img src="${folderImg}" style="margin-right:4px; \
                        vertical-align:middle; margin-top:-1px"/>${
                            indata.title
                        }</b><br/><br/>${maybeInfo}<b>${
                    corporaID.length
                }</b> ${glueString}:<br/><br/><b>${util.prettyNumbers(
                    totalTokens.toString()
                )}</b> ${util.getLocaleString(
                    "corpselector_tokens"
                )}<br/><b>${totalSentencesString}</b> ${util.getLocaleString(
                    "corpselector_sentences"
                )}`
            },
        })
        .bind("corpuschooserchange", function (evt, corpora) {
            safeApply($("body").scope(), function (scope) {
                scope.$broadcast("corpuschooserchange", corpora)
            })
        })
    const selected = corpusChooserInstance.corpusChooser("selectedItems")
    settings.corpusListing.select(selected)
}

window.regescape = (s) => s.replace(/[.|?|+|*||'|()^$]/g, "\\$&").replace(/"/g, '""')

window.unregescape = (s) => s.replace(/\\/g, "").replace(/""/g, '"')

util.formatDecimalString = function (x, mode, statsmode, stringOnly) {
    if (_.includes(x, ".")) {
        const parts = x.split(".")
        const decimalSeparator = util.getLocaleString("util_decimalseparator")
        if (stringOnly) {
            return parts[0] + decimalSeparator + parts[1]
        }
        if (mode) {
            return (
                util.prettyNumbers(parts[0]) +
                '<span rel="localize[util_decimalseparator]">' +
                decimalSeparator +
                "</span>" +
                parts[1]
            )
        } else {
            return util.prettyNumbers(parts[0]) + decimalSeparator + parts[1]
        }
    } else {
        if (statsmode) {
            return x
        } else {
            return util.prettyNumbers(x)
        }
    }
}

util.browserWarn = function () {
    $.reject({
        reject: {
            msie5: true,
            msie6: true,
            msie7: true,
            msie8: true,
            msie9: true,
        },

        imagePath: _.split(jRejectBackgroundImg, "/").slice(0, -1).join("/"),
        display: ["firefox", "chrome", "safari", "opera"],
        browserInfo: {
            // Settings for which browsers to display
            firefox: {
                text: "Firefox", // Text below the icon
                url: "http://www.mozilla.com/firefox/",
            }, // URL For icon/text link

            safari: {
                text: "Safari",
                url: "http://www.apple.com/safari/download/",
            },

            opera: {
                text: "Opera",
                url: "http://www.opera.com/download/",
            },

            chrome: {
                text: "Chrome",
                url: "http://www.google.com/chrome/",
            },

            msie: {
                text: "Internet Explorer",
                url: "http://www.microsoft.com/windows/Internet-explorer/",
            },
        },

        header: "Du använder en omodern webbläsare", // Header of pop-up window
        paragraph1:
            "Korp använder sig av moderna webbteknologier som inte stödjs av din webbläsare. En lista på de mest populära moderna alternativen visas nedan. Firefox rekommenderas varmt.", // Paragraph 1
        paragraph2: "", // Paragraph 2
        closeMessage:
            "Du kan fortsätta ändå – all funktionalitet är densamma – men så fort du önskar att Korp vore snyggare och snabbare är det bara att installera Firefox, det tar bara en minut.", // Message displayed below closing link
        closeLink: "Stäng varningen", // Text for closing link
        //   header: 'Did you know that your Internet Browser is out of date?', // Header of pop-up window
        //     paragraph1: 'Your browser is out of date, and may not be compatible with our website. A list of the most popular web browsers can be found below.', // Paragraph 1
        //     paragraph2: 'Just click on the icons to get to the download page', // Paragraph 2
        //     closeMessage: 'By closing this window you acknowledge that your experience on this website may be degraded', // Message displayed below closing link
        //     closeLink: 'Close This Window', // Text for closing link
        closeCookie: true, // If cookies should be used to remmember if the window was closed (see cookieSettings for more options)
        // Cookie settings are only used if closeCookie is true
        cookieSettings: {
            path: "/", // Path for the cookie to be saved on (should be root domain in most cases)
            expires: 100000,
        },
    }) // Expiration Date (in seconds), 0 (default) means it ends with the current session
}

window.__ = {}
window.__.remove = function (arr, elem) {
    const index = arr.indexOf(elem)
    if (index !== -1) {
        return arr.splice(arr.indexOf(elem), 1)
    }
}


// Functions for modifying settings.corpora, settings.corporafolders
// and related data based on actually available corpora.


// util.initAvailableCorpora was used in Korp 5.0.10. Would it still
// be needed to initialize the list of available corpora before
// loading the mode files, which initialize settings.corpusListing, or
// is it enough to initialize them when calling /corpus_info?

// // Initialize window.availableCorpora; return a $.Deferred object.

// util.initAvailableCorpora = function () {
//     const handle_type = settings.handleUnavailableCorpora || "none"
//     if (handle_type === "none" || handle_type === "fatal") {
//         window.availableCorpora = null
//         return null
//     }
//     // Modelled after window.initLocales; is that appropriate?
//     const defs = []
//     window.availableCorpora = []
//     const def = $.Deferred()
//     defs.push($.ajax({
//         url: settings.cgi_script + '/info',
//         success(data) {
//             window.availableCorpora =
//                 data["corpora"].map((corp) => corp.toLowerCase())
//         }}))
//     $.when.apply($, defs).then(() => def.resolve(window.availableCorpora))
//     return def
// }

// Remove from the object corpora properties that do not correspond to
// any existing corpus listed in available_corpora, unless
// settings.handleUnavailableCorpora is "none" or "fatal". The object
// corpora is of the kind of settings.corpora and available_corpora
// may be either an array of lower-case corpus ids of an array of
// corpus info items as returned by /corpus_info. If some properties
// were removed, report the removal on the console based on the value
// of settings.handleUnavailableCorpora ("error", "warn" or "log").

util.removeUnavailableCorpora = function (corpora, available_corpora) {
    let remove_listed
    const handle_type = settings.handleUnavailableCorpora || "none"
    if (handle_type === "none" || handle_type === "fatal" ||
            available_corpora == null) {
        return
    }
    if ("corpora" in available_corpora) {
        // Convert the list of corpora as returned by /corpus_info
        available_corpora = _.map(
            _.keys(available_corpora.corpora),
            function (s) {
                return s.toLowerCase()
            }
        )
    }
    c.log('available_corpora', available_corpora)
    // Remove the non-listed corpora from settings.corpora
    const removed_corpora = util.filterListedCorpora(
        available_corpora, (remove_listed = false))
    if (removed_corpora.length > 0) {
        // Remove them from corpora (= settings.corpusListing.corpora)
        let corpnum = 0
        while (corpnum < corpora.length) {
            if (removed_corpora.includes(corpora[corpnum].id)) {
                corpora.splice(corpnum, 1)
            } else {
                corpnum++
            }
        }
        const message = "Unavailable corpora removed from configuration: "
        const msg_funcs = {
            error: c.error,
            warn: c.warn,
            log: c.log,
        }
        const msg_func = msg_funcs[handle_type] || c.log
        msg_func(message, removed_corpora)
        util.adjustPreselectedCorpora()
    }
}

// Recursively remove the corpora folders in folder that contain no
// corpora (or folders) that are in corpora_settings (default:
// settings.corpora). Returns true if folder is empty.

util.removeEmptyCorporafolders = function (
        folder, corpora_settings = settings.corpora) {
    let empty = true
    if ("contents" in folder) {
        const new_contents = []
        for (let corpname of folder.contents) {
            if (corpname in corpora_settings) {
                new_contents.push(corpname)
            }
        }
        if (new_contents.length === 0) {
            delete folder.contents
        } else {
            folder.contents = new_contents
            empty = false
        }
    }
    for (let prop of Object.keys(folder || {})) {
        if (! (prop in settings.corporafolder_properties)) {
            if (util.removeEmptyCorporafolders(folder[prop])) {
                delete folder[prop]
            } else {
                empty = false
            }
        }
    }
    return empty
}

// Filter corpora_settings (default: settings.corpora) by corpus ids in
// filter_list. By default, remove properties (corpora) whose names are
// not in filter_list, but if remove_listed is true, remove corpora
// whose names *are* in filter_list. After that, remove corpora folders
// in folder_settings (default: settings.corporafolders) that would be
// empty after removing the corpora.

util.filterListedCorpora = function (
        filter_list,
        remove_listed = false,
        corpora_settings = settings.corpora,
        folder_settings = settings.corporafolders) {
    const corpora_to_remove = util.filterListed(
        _.keys(corpora_settings), filter_list, remove_listed)
    for (let corpus of corpora_to_remove) {
        delete corpora_settings[corpus]
    }
    util.removeEmptyCorporafolders(folder_settings, corpora_settings)
    return corpora_to_remove
}

// Return values in base_list that are also in filter_list, except if
// keep_listed is false, in which case return values in base_list that
// are not in filter_list.

util.filterListed = function (base_list, filter_list, keep_listed = true) {
    const operation = keep_listed ? _.intersection : _.difference
    return operation(base_list, filter_list)
}

// Remove from settings.preselectedCorpora corpora not in
// settings.corpora and corpus folders not in settings.corporafolders.

util.adjustPreselectedCorpora = function () {
    if (! settings.preselectedCorpora) {
        return
    }

    const folderExists = function (folder, subfolders) {
        return (folder &&
                (subfolders.length === 0 ||
                 folderExists(folder[subfolders[0]], subfolders.slice(1))))
    }

    const adjusted = []

    const check_item = function (item, type, exists_func) {
        if (exists_func(item)) {
            adjusted.push(item)
        } else {
            c.log(`Removed unavailable ${type} ${item} from`
                  + ` settings.preselectedCorpora`)
        }
    }

    for (let item of settings.preselectedCorpora) {
        if (/^__/.test(item)) {
            check_item(item, "corpus folder",
                       (folder_path) => folderExists(
                           settings.corporafolders,
                           folder_path.substring(2).split(".")))
        } else {
            check_item(item, "corpus", (item) => item in settings.corpora)
        }
    }
    settings.preselectedCorpora = adjusted
}
