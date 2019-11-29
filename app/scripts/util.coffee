window.util = {}


class window.CorpusListing
    constructor: (corpora) ->
        if corpora == settings.corpora
            util.checkCorporafolderContents "settings.corporafolders"
            util.removeUnavailableCorpora corpora
            util.adjustPreselectedCorpora()
        @struct = corpora
        @corpora = _.values(corpora)
        @selected = _.filter @corpora, (corp) -> not corp.limited_access
        # The CQP expression to be inserted between token expressions
        # (and thus effectively ignored), currently only in the
        # extended search. (Jyrki Niemi 2016-03-17)
        @ignore_between_tokens_cqp = @updateIgnoreBetweenTokensCQP()

    get: (key) ->
        @struct[key]

    list: ->
        @corpora

    map: (func) ->
        _.map @corpora, func

    subsetFactory : (idArray) ->
        #returns a new CorpusListing instance from an id subset.
        idArray = _.invoke(idArray, "toLowerCase")
        cl = new CorpusListing _.pick @struct, idArray...
        cl.selected = cl.corpora
        return cl

    # only applicable for parallel corpora
    getReduceLang: ->
        return

    # Returns an array of all the selected corpora's IDs in uppercase
    getSelectedCorpora: ->
        corpusChooserInstance.corpusChooser "selectedItems"

    select: (idArray) ->
        c.log "CorpusListing.select", idArray
        @selected = _.values(_.pick.apply(this, [@struct].concat(idArray)))
        # CHECK: Is updating the ignorable tokens needed both here and
        # in controller "ExtendedSearch": $on "corpuschooserchange"
        # (search_controllers)? (Jyrki Niemi 2016-03-18)
        @updateIgnoreBetweenTokensCQP()
        c.log "CorpusListing.selected:", @selected
        @selected

    mapSelectedCorpora: (f) ->
        _.map @selected, f

    # Return the ids of all the corpora with restricted access
    getRestrictedCorpora: ->
        _(@corpora)
            .filter((corp) -> corp.limited_access)
            .pluck "id"
            .value()

    # Return the titles of the corpora given as the argument
    getTitles: (corpora) ->
        _(corpora)
            .map((corp) => @struct[corp])
            .pluck "title"
            .value()

    # takes an array of mapping objs and returns their intersection
    _mapping_intersection: (mappingArray) ->

        _.reduce mappingArray, ((a, b) ->
            keys_intersect = _.intersection (_.keys a), (_.keys b)
            to_mergea = _.pick a, keys_intersect...
            to_mergeb = _.pick b, keys_intersect...
            _.merge {}, to_mergea, to_mergeb
        ) or {}

    _mapping_union: (mappingArray) ->
        _.reduce mappingArray, ((a, b) ->
            _.merge a, b
        ), {}

    getCurrentAttributes: (lang) -> # lang not used here, only in parallel mode
        attrs = @mapSelectedCorpora((corpus) ->
            corpus.attributes
        )
        @_invalidateAttrs attrs

    getCurrentAttributesIntersection : () ->
        attrs = @mapSelectedCorpora((corpus) ->
            corpus.attributes
        )

        @_mapping_intersection attrs

    getStructAttrsIntersection: () ->
        attrs = @mapSelectedCorpora((corpus) ->
            for key, value of corpus.struct_attributes
                value["isStructAttr"] = true

            corpus.struct_attributes
        )
        @_mapping_intersection attrs


    getStructAttrs: ->
        attrs = @mapSelectedCorpora((corpus) ->
            for key, value of corpus.struct_attributes
                value["isStructAttr"] = true

            # if a position attribute is declared as structural, include here
            pos_attrs = _.pick corpus.attributes, (val, key) ->
                val.isStructAttr
            _.extend {}, pos_attrs, corpus.struct_attributes
        )
        rest = @_invalidateAttrs(attrs)

        # fix for combining dataset values
        withDataset = _.filter(_.pairs(rest), (item) ->
            item[1].dataset
        )
        $.each withDataset, (i, item) ->
            key = item[0]
            val = item[1]
            $.each attrs, (j, origStruct) ->
                if origStruct[key]?.dataset
                    ds = origStruct[key].dataset
                    ds = _.object(ds, ds) if $.isArray(ds)

                    val.dataset = (_.object val.dataset, val.dataset) if _.isArray val.dataset
                    $.extend val.dataset, ds


        $.extend rest, _.object(withDataset)

    _invalidateAttrs: (attrs) ->
        union = @_mapping_union(attrs)
        intersection = @_mapping_intersection(attrs)
        $.each union, (key, value) ->
            unless intersection[key]?
                value["disabled"] = true
            else
                delete value["disabled"]

        union

    # returns true if coprus has all attrs, else false
    corpusHasAttrs: (corpus, attrs) ->
        for attr in attrs
            unless attr == "word" or attr of $.extend({}, @struct[corpus].attributes, @struct[corpus].struct_attributes)
                return false
        return true

    stringifySelected: ->
        _(@selected).pluck("id").invoke("toUpperCase").join ","

    # Stringify selected corpora and encode them as a list parameter
    # for korp.cgi
    stringifySelectedEncode: ->
        util.encodeListParam @stringifySelected()

    stringifyAll: ->
        _(@corpora).pluck("id").invoke("toUpperCase").join ","

    getWithinKeys: () ->
        struct = _.map(@selected, (corpus) ->
            _.keys corpus.within
        )
        _.union struct...

    # Change the properties type and "default"type of the object
    # params, where type is "within" or "context", if that results in
    # a shorter overall value, to be passed to the Korp backend as
    # query parameters. (This reduces the chance of producing URLs too
    # long for the server.) The method chooses as the default value
    # the one that would result in the longest value as the
    # corpus-specific parameter. Modifying the values computed
    # elsewhere is simpler than trying to find out exactly how (or
    # based on what data) the values are computed and to do the same.
    # (Jyrki Niemi 2015-09-11)
    minimizeDefaultAndCorpusQueryString: (type, params) ->
        if not (params.corpus? and params[type])
            return params
        # It would save decoding the corpus list if this function were
        # always called for an unencoded list of corpora, but it would
        # require more modifications elsewhere.
        all_corpora = util.decodeListParam(params.corpus)
        c.log('minimize', type, params.corpus, params['default' + type],
              params[type], params[type].length)
        default_val = params['default' + type]
        value_corpora = {}
        nondefault_corpora = []
        for corpval in params[type].split(',')
            [corpname, val] = corpval.split(':')
            value_corpora[val] ?= []
            value_corpora[val].push(corpname)
            nondefault_corpora.push(corpname)
        default_corpora = _.difference(all_corpora, nondefault_corpora)
        value_corpora[default_val] =
            (value_corpora[default_val] or []).concat(default_corpora)
        # Find the longest value
        lengths = []
        for val, corpora of value_corpora
            lensum = 0
            for corp in corpora
                lensum += corp.length
            lengths.push(
                value: val
                # Also count URL-encoded commas and colons to be added
                # between corpus names, and corpus names and parameter
                # values
                length: lensum + (corpora.length * (val.length + 6)) -
                        if corpora.length == 1 then 3 else 0
            )
        maxval = _.max(lengths, 'length').value
        c.log 'minimizing', type, value_corpora, lengths, maxval
        if maxval == default_val and default_corpora.length > 0
            return params
        params['default' + type] = maxval
        # c.log maxval, params
        # Construct the non-default value string
        other_vals = []
        for val, corpora of value_corpora when (val != maxval and
                                                corpora.length > 0)
            # c.log val, corpora
            other_vals = other_vals.concat(
                [corp + ':' + val for corp in corpora])
        # c.log other_vals
        params[type] = other_vals.join(',')
        c.log('minimized', type, params['default' + type], params[type],
              params[type].length)
        if params[type] == ''
            delete params[type]
        return params

    minimizeWithinQueryString: (params) ->
        @minimizeDefaultAndCorpusQueryString 'within', params

    minimizeContextQueryString: (params) ->
        @minimizeDefaultAndCorpusQueryString 'context', params

    getContextQueryString: (prefer, avoid) ->
        output = for corpus in @selected
            contexts = _.keys corpus.context
            if prefer not in contexts
                if contexts.length > 1 and avoid in contexts
                    contexts.splice (contexts.indexOf avoid), 1
                corpus.id.toUpperCase() + ":" + contexts[0]
        return _(output).compact().join()

    getWithinParameters: () ->
        defaultWithin = search().within or _.keys(settings.defaultWithin)[0]

        output = for corpus in @selected
            withins = _.keys corpus.within
            if defaultWithin not in withins
                corpus.id.toUpperCase() + ":" + withins[0]
        within = _(output).compact().join()
        return { defaultwithin : defaultWithin, within : within }

    # The above getWithinParameters replaces getWithinQueryString as
    # 2015-11. Should we modify getWithinParameters similarly, or does
    # it work as the modified getWithinQueryString?
    # (Jyrki Niemi 2015-11-19)
    getWithinQueryString: ->
        # If the URL parameter within is other than the default, use
        # it for the corpora that have it in their within property.
        # (Jyrki Niemi 2015-08-26)
        prefer_within = search().within
        if prefer_within and prefer_within not of settings.defaultWithin
            output = for corpus in @selected
                if prefer_within of corpus.within
                    corpus.id.toUpperCase() + ":" + prefer_within
                else
                    false
            _(output).flatten().compact().join()
        else
            null

        # The original version was as follows. If a corpus has a
        # property within with more than one value other than that in
        # defaultWithin, each of them generates a CORPUS:within pair
        # to the output. Why? (Jyrki Niemi 2015-08-26)

        # output = for corpus in @selected
        #     withins = _.keys(corpus.within)
        #     for within in withins
        #         if within and within not of settings.defaultWithin
        #             corpus.id.toUpperCase() + ":" + within
        #         else
        #             false

        # _(output).flatten().compact().join()

    getMorphology: ->
        _(@selected).map((corpus) ->
            morf = corpus.morf or "saldom"
            morf.split "|"
        ).flatten().unique().join "|"

    getTimeInterval : ->
        all = _(@selected)
            .pluck("time")
            .filter((item) -> item?)
            .map(_.keys)
            .flatten()
            .map(Number)
            .sort((a, b) ->
                a - b
            ).value()


        return [_.first(all), _.last(all)]


    getMomentInterval : () ->
        toUnix = (item) -> item.unix()

        infoGetter = (prop) =>
            return _(@selected)
            .pluck("info")
            .pluck(prop)
            .compact()
            # Filter out null dates, as Moment converts them to having
            # a negative year and formats as 00-1, which causes a
            # backend error. However, a null date as
            # FirstDate/LastDate still causes an error in the backend.
            # (Jyrki Niemi 2018-06-11)
            .filter((val) -> val.slice(0, 10) != "0000-00-00")
            .map((item) -> moment(item))
            .value()



        froms = infoGetter("FirstDate")
        tos = infoGetter("LastDate")

        unless froms.length
            from = null
        else
            from = _.min froms, toUnix
        unless tos.length
            to = null
        else
            to = _.max tos, toUnix

        # c.log "first", infoGetter("FirstDate")
        [from, to]


    getNonProtected : () ->
        _.filter @corpora, (item) ->
            not item.limited_access

    getTitle : (corpus) ->
        try
            @struct[corpus].title
        catch e
            c.log "gettitle broken", corpus


    getWordGroup : (withCaseInsentive) ->
        word =
            group : "word"
            value : "word"
            label : "word"
        if withCaseInsentive
            wordInsensitive =
                group : "word"
                value : "word_insensitive"
                label : "word_insensitive"
            return [word, wordInsensitive]
        else
            return [word]

    getWordAttributeGroups : (lang, setOperator) ->
        if setOperator == 'union'
            allAttrs = @getCurrentAttributes(lang)
        else
            allAttrs = @getCurrentAttributesIntersection()
            
        attrs = for key, obj of allAttrs when obj.displayType != "hidden" and obj.displayOnly != "sidebar"
                    _.extend({group : "word_attr", value : key}, obj)
        return attrs

    getStructAttributeGroups : (lang, setOperator) ->
        if setOperator == 'union'
            allAttrs = @getStructAttrs(lang)
        else
            allAttrs = @getStructAttrsIntersection(lang)

        common_keys = _.compact _.flatten _.map @selected, (corp) -> _.keys corp.common_attributes
        common = _.pick settings.common_struct_types, common_keys...

        sentAttrs = for key, obj of (_.extend {}, common, allAttrs) when obj.displayType != "hidden" and obj.displayOnly != "sidebar"
                         _.extend({group : "sentence_attr", value : key}, obj)

        sentAttrs = _.sortBy sentAttrs, (item) ->
            util.getLocaleString(item.label)

        return sentAttrs


    # Update the CQP token expression to be ignored between tokens: it
    # takes effect only if all the selected corpora have the same
    # ignore expression (property ignore_between_tokens_cqp).
    # (Jyrki Niemi 2015-09-25, 2016-03-17)
    updateIgnoreBetweenTokensCQP : ->
        ignore_cqps =
            _(@selected)
            .pluck("ignore_between_tokens_cqp")
            .uniq()
            .value()
        # c.log "ignore_cqps", ignore_cqps
        @ignore_between_tokens_cqp =
            if ignore_cqps.length == 1
                ignore_cqps[0]
            else
                ""
        c.log "ignore_between_tokens_cqp", @ignore_between_tokens_cqp
        @ignore_between_tokens_cqp

    # Add a CQP token expression to be ignored between the individual
    # token expressions in cqp, based on the property
    # ignore_between_tokens_cqp of the corpus configuration. The
    # expression to be ignored is added only if all the selected
    # corpora have the same ignore expression and only in the extended
    # search (could be in the simple search as well) or if the
    # argument force is true.
    # CHECK: Is this the proper place to have this functionality?
    # (Jyrki Niemi 2015-09-25, 2016-03-17)
    addIgnoreBetweenTokensCQP : (cqp, force = false) ->
        # c.log "addIgnoreCQPBetweenTokens called", cqp, @ignore_between_tokens_cqp, search().search_tab
        # The value of search_tab seems to be sometimes an integer and
        # sometimes a string.
        if @ignore_between_tokens_cqp and
                (force or Number(search().search_tab) == 1)
            # c.log "addIgnoreCQPBetweenTokens before:", cqp
            cqp = @insertBetweenCQPTokens cqp, @ignore_between_tokens_cqp
            c.log "addIgnoreCQPBetweenTokens after:", cqp
        cqp

    # Insert the CQP expression insert_cqp between each pair of token
    # expressions in the CQP expression base_cqp (Jyrki Niemi
    # 2015-09-25, 2016-03-17)
    insertBetweenCQPTokens : (base_cqp, insert_cqp) ->
        # Split the original CQP expression so that each token
        # expression [...] and each string between them is a separate
        # string.
        cqp_tokens = base_cqp.match(
            /\[([^\]\"\']*("([^\\\"]|\\.)*"|'([^\\\']|\\.)*'))*[^\]\"\']*\]|([^\[]+)/g)
        # Find the last token proper, which need not be followed by
        # the insert expression, although it does not make a
        # difference in the result if it is optional.
        last_token_num = _(cqp_tokens)
                         .map((token) -> token.charAt(0) == "[")
                         .lastIndexOf(true)
        # Append the insert expression to each token expression and
        # enclose them together in parentheses, so that repetition and
        # other regexp operators work correctly for the augmented
        # token expression.
        result = for token, token_num in cqp_tokens
                     if token.charAt(0) == "[" and token_num < last_token_num
                         "(" + token + " " + insert_cqp + ")"
                     else
                         token
        result.join("")

    getAttributeGroups : (lang) ->
        words = @getWordGroup false
        attrs = @getWordAttributeGroups lang, 'union'
        @adjustWordAttributeGroup words, attrs
        sentAttrs = @getStructAttributeGroups lang, 'union'
        return words.concat attrs, sentAttrs

    getStatsAttributeGroups : (lang) ->
        words = @getWordGroup true

        wordOp = settings.reduce_word_attribute_selector or "union"
        attrs = @getWordAttributeGroups lang, wordOp
        @adjustWordAttributeGroup words, attrs

        structOp = settings.reduce_struct_attribute_selector or "union"
        sentAttrs = @getStructAttributeGroups lang, structOp

        # todo check if this is neccessary?
        sentAttrs = _.filter sentAttrs, (attr) -> attr.displayType isnt "date_interval"

        return words.concat attrs, sentAttrs

    # If the positional (word) attributes contain "word" (typically,
    # to add special features to searching word forms), replace with
    # it the "word" attribute in the group "word" and remove it from
    # the word attribute group, so that "word" is not duplicated in
    # the word attribute group. (Jyrki Niemi 2018-01-22)
    adjustWordAttributeGroup : (words, attrs) ->
        word_attr_num = _.findIndex(attrs, (obj) -> obj.value == "word")
        if word_attr_num != -1
            # c.log "adjustWordAttributeGroup", words, attrs, word_attr_num
            word_attr = attrs[word_attr_num]
            word_attr.group = "word"
            words[0] = word_attr
            attrs.splice(word_attr_num, 1)
            # c.log "=>", words, attrs
        return


class window.ParallelCorpusListing extends CorpusListing
    constructor: (corpora, activeLangs) ->
        super(corpora)
        @setActiveLangs(activeLangs)

    select: (idArray) ->
        @selected = []
        $.each idArray, (i, id) =>
            corp = @struct[id]
            @selected = @selected.concat(@getLinked(corp, true, false))

        @selected = _.unique @selected

    setActiveLangs : (langlist) ->
        @activeLangs = langlist

    getReduceLang : () ->
        return @activeLangs[0]

    getCurrentAttributes: (lang) ->
        corpora = _.filter(@selected, (item) ->
            item.lang is lang
        )
        struct = _.reduce(corpora, (a, b) ->
            $.extend {}, a.attributes, b.attributes
        , {})
        struct

    getStructAttrs: (lang) ->
        corpora = _.filter(@selected, (item) ->
            item.lang is lang
        )
        struct = _.reduce(corpora, (a, b) ->
            $.extend {}, a.struct_attributes, b.struct_attributes
        , {})
        $.each struct, (key, val) ->
            val["isStructAttr"] = true

        struct

    getStructAttrsIntersection: (lang) ->
        corpora = _.filter(@selected, (item) ->
            item.lang is lang
        )
        attrs = _.map corpora, (corpus) ->
            for key, value of corpus.struct_attributes
                value["isStructAttr"] = true

            corpus.struct_attributes
        @_mapping_intersection attrs

    getLinked : (corp, andSelf=false, only_selected=true) ->
        target = if only_selected then @selected else @struct
        # Would linked_to_inverse really be needed? Later on, it would
        # seem that Korp works fine without it. But why didn't it seem
        # to work earlier? (Jyrki Niemi 2017-01-31)
        # output = []
        # if corp.linked_to
        #     output = _.filter target, (item) ->
        #         # The configuration property linked_to_inverse lists
        #         # corpora that list this corpus in linked_to but that this
        #         # corpus does not explicitly link to. This may be needed
        #         # when more than two corpora are linked to each other but
        #         # in different combinations, e.g. when different
        #         # translations in the same language are represented both
        #         # as separate corpora (T1, T2, ...) (hidden from the
        #         # corpus listing) and as a single concatenated corpus (T).
        #         # In this case, the linked_to relation may link S -> T1
        #         # T2, T -> S. Without linked_to_inverse, a search from T
        #         # in language s would cause an error. (Jyrki Niemi
        #         # 2016-09-16)
        #         item.id in corp.linked_to
        # # if output.length == 0 and corp.linked_to_inverse
        # #     output = _.filter target, (item) ->
        # #         item.id in corp.linked_to_inverse
        output = _.filter target, (item) ->
            item.id in (corp.linked_to or [])
        output = [corp].concat output if andSelf
        output

    getEnabledByLang : (lang, andSelf=false, flatten=true) ->
        corps = _.filter @selected, (item) ->
            item["lang"] == lang
        output = _(corps).map((item) =>
            @getLinked item, andSelf
        ).value()

        if flatten then (_.flatten output) else output


    getLinksFromLangs : (activeLangs) ->
        if activeLangs.length == 1
            return @getEnabledByLang(activeLangs[0], true, false)
        # get the languages that are enabled given a list of active languages
        main = _.filter @selected, (corp) ->
            corp.lang == activeLangs[0]

        output = []
        for lang in activeLangs[1..]
            other = _.filter @selected, (corp) ->
                corp.lang == lang

            for cps in other
                linked = _(main).filter((mainCorpus) ->
                    cps.id in mainCorpus.linked_to
                ).value()

                output = output.concat _.map linked, (item) -> [item, cps]

        output

    getAttributeQuery : (attr) ->

      #gets the within and context queries

      struct = @getLinksFromLangs(@activeLangs)
      output = []
      $.each struct, (i, corps) ->

        mainId = corps[0].id.toUpperCase()
        mainIsPivot = !!corps[0].pivot

        other = corps.slice(1)

        pair = _.map(other, (corp) ->
            if mainIsPivot
                a = _.keys(corp[attr])[0]
            else
                a = _.keys(corps[0][attr])[0]
            mainId + "|" + corp.id.toUpperCase() + ":" + a
        )
        output.push pair

      output.join ","

    getContextQueryString: ->
        @getAttributeQuery("context")


    getWithinParameters : ->
        defaultWithin = search().within or _.keys(settings.defaultWithin)[0]
        within = @getAttributeQuery("within")
        return {defaultwithin : defaultWithin, within : within}



    stringifySelected : (onlyMain) ->

        struct = @getLinksFromLangs(@activeLangs)
        if onlyMain
            struct = _.map struct, (pair) =>
                _.filter pair, (item) =>
                    item.lang == @activeLangs[0]


            return _(struct).flatten().pluck("id").invoke("toUpperCase").join ","
        c.log("struct", struct)

        output = []
        # $.each(struct, function(i, item) {
        for item, i in struct
            main = item[0]

            pair = _.map item.slice(1), (corp) ->
                main.id.toUpperCase() + "|" + corp.id.toUpperCase()

            output.push(pair)
        return output.join(",")

    stringifySelectedEncode : (onlyMain) ->
        util.encodeListParam(@stringifySelected onlyMain)

    getTitle : (corpus) ->
        @struct[corpus.split("|")[1]].title


window.applyTo = (ctrl, f) ->
    s = getScope(ctrl)
    s.$apply f(s)

window.search = (obj, val) ->
    s = $("body").scope()

    # ret = s.$root.$apply () ->
    ret = safeApply s.$root, () ->
        # if obj or val
        unless obj then return s.$root.search()
        if _.isObject obj
            obj = _.extend {}, s.$root.search(), obj
            s.$root.search(obj)
        else
            s.$root.search(obj, val)

    onHashChange() if val == null
    return ret



window.initLocales = () ->
    packages = ["locale", "corpora"]
    prefix = "translations"
    defs = []
    window.loc_data = {}
    def = $.Deferred()
    for lang in settings.languages
        loc_data[lang] = {}
        for pkg in packages
            do (lang, pkg) ->
                file = pkg + "-" + lang + '.json'
                file = prefix + "/" + file
                defs.push $.ajax
                    url : file,
                    dataType : "json",
                    cache : false,
                    success : (data) ->
                        _.extend loc_data[lang], data

    $.when.apply($, defs).then () ->
        def.resolve loc_data

    return def


# Add default translations for localization keys missing missing a
# translation in some language if settings.defaultTranslations is
# defined and non-empty. Use the translation in the first language in
# settings.defaultTranslations that has a translation, or the
# localization key itself if the language is "KEY" (makes sense only
# as the last element of the list, since the key is always present).
# (Jyrki Niemi 2016-04-28)

util.addDefaultTranslations = () ->
    if not settings.defaultTranslations? or
            settings.defaultTranslations.length == 0
        return
    loc_data = window.loc_data
    all_keys = _(loc_data).map(_.keys).flatten().uniq().value()
    for lang in settings.languages
        # Could this be written more concisely using lodash methods?
        for key in all_keys
            if not (key of loc_data[lang])
                for lang2 in settings.defaultTranslations
                    if lang2 != lang
                        if lang2 == 'KEY'
                            loc_data[lang][key] = key
                            break
                        else if key of loc_data[lang2]
                            loc_data[lang][key] = loc_data[lang2][key]
                            break
    return


window.safeApply = (scope, fn) ->
    if (scope.$$phase || scope.$root.$$phase) then fn(scope) else scope.$apply(fn)

window.util.setLogin = () ->
    $("body").toggleClass("logged_in not_logged_in")

    for corp in authenticationProxy.loginObj.credentials
        $("#hpcorpus_#{corp.toLowerCase()}")
            .closest(".boxdiv.disabled").removeClass("disabled")
    if window.corpusChooserInstance
        window.corpusChooserInstance.corpusChooser "updateAllStates"

    $("#log_out .usrname").text(authenticationProxy.loginObj.name)
    $(".err_msg", self).hide()



util.SelectionManager = ->
    @selected = $()
    @aux = $()
    return

util.SelectionManager::select = (word, aux) ->
    return if not word? or not word.length
    if @selected.length
        @selected.removeClass "word_selected token_selected"
        @aux.removeClass "word_selected aux_selected"
    @selected = word
    @aux = aux or $()
    @aux.addClass "word_selected aux_selected"
    word.addClass "word_selected token_selected"

util.SelectionManager::deselect = ->
    return unless @selected.length
    @selected.removeClass "word_selected token_selected"
    @selected = $()
    @aux.removeClass "word_selected aux_selected"
    @aux = $()
    return

util.SelectionManager::hasSelected = ->
    @selected.length > 0

util.getLocaleString = (key, lang) ->
    return util.getLocaleStringUndefined(key, lang) or key


util.getLocaleStringUndefined = (key, lang) ->
    unless lang
        lang = window.lang or settings.defaultLanguage or "sv"
    try
        return loc_data[lang][key]
    catch e
        return undefined


util.localize = (root) ->
    root = root or "body"
    $(root).localize()
    return

util.lemgramToString = (lemgram, appendIndex) ->
    lemgram = _.str.trim(lemgram)
    infixIndex = ""
    concept = lemgram
    infixIndex = ""
    type = ""
    if util.isLemgramId(lemgram)
        match = util.splitLemgram(lemgram)
        infixIndex = $.format("<sup>%s</sup>", match.index) if appendIndex? and match.index isnt "1"
        concept = match.form.replace(/_/g, " ")
        type = match.pos.slice(0, 2)
    return $.format "%s%s <span class='wordclass_suffix'>(<span rel='localize[%s]'>%s</span>)</span>", [
        concept
        infixIndex
        type
        util.getLocaleString(type)
    ]

util.saldoRegExp = /(.*?)\.\.(\d\d?)(\:\d+)?$/
util.saldoToString = (saldoId, appendIndex) ->
    match = saldoId.match(util.saldoRegExp)
    infixIndex = ""
    infixIndex = $.format("<sup>%s</sup>", match[2]) if appendIndex? and match[2] isnt "1"
    $.format "%s%s", [
        match[1].replace(/_/g, " ")
        infixIndex
    ]

util.saldoToPlaceholderString = (saldoId, appendIndex) ->
    match = saldoId.match(util.saldoRegExp)
    infixIndex = ""
    infixIndex = $.format(" (%s)", match[2]) if appendIndex? and match[2] isnt "1"
    $.format "%s%s", [
        match[1].replace(/_/g, " ")
        infixIndex
    ]

util.sblexArraytoString = (idArray, labelFunction) ->
    labelFunction = labelFunction or util.lemgramToString
    return _.map idArray, (lemgram) -> labelFunction lemgram, true

    # TODO: remove this if all is well with the lemgram dropdown
    # tempArray = $.map(idArray, (lemgram) ->
    #     labelFunction lemgram, false
    # )
    # out = $.map idArray, (lemgram) ->
    #     isAmbigous = $.grep(tempArray, (tempLemgram) ->
    #         tempLemgram is labelFunction(lemgram, false)
    #     ).length > 1
    #     labelFunction lemgram, isAmbigous
    # return out


util.lemgramRegexp = /\.\.\w+\.\d\d?(\:\d+)?$/
util.isLemgramId = (lemgram) ->
    lemgram.search(util.lemgramRegexp) isnt -1

util.splitLemgram = (lemgram) ->
    unless util.isLemgramId(lemgram)
        throw new Error("Input to util.splitLemgram is not a lemgram: " + lemgram)
    keys = ["morph", "form", "pos", "index", "startIndex"]
    splitArray = lemgram.match(/((\w+)--)?(.*?)\.\.(\w+)\.(\d\d?)(\:\d+)?$/).slice(2)
    _.object keys, splitArray

util.splitSaldo = (saldo) ->
    saldo.match util.saldoRegExp


# Download KWIC in a format defined in settings.downloadFormats, given
# a Korp query URL (query_url) and the resulting data (result_data).
# (Jyrki Niemi <jyrki.niemi@helsinki.fi> 2014-02-26/04-30, 2016-05-17)

util.downloadKwic = (format_params, query_url, result_data) ->
    c.log "downloadKwic", format_params, query_url, result_data
    # If some of the required parameters are null, return without
    # downloading.
    if not (query_url? and result_data? and result_data.kwic?)
        c.log "downloadKwic failed"
        return

    if result_data.kwic.length == 0
        $('#download-links').hide()
        return
    $('#download-links').show()

    # Corpora in the query result
    result_corpora = _(result_data.kwic).pluck("corpus").uniq().value()
    # Settings of the corpora in the result, to be passed to the
    # download script
    result_corpora_settings = {}
    for result_corpus in result_corpora
        corpus_ids = result_corpus.toLowerCase().split("|")
        for corpus_id in corpus_ids
            result_corpora_settings[corpus_id] = settings.corpora[corpus_id]
    format = format_params.format
    download_params =
        query_params: JSON.stringify($.deparam.querystring(query_url))
        format: format
        korp_url: window.location.href
        korp_server_url: settings.cgi_script
        corpus_config: JSON.stringify(result_corpora_settings,
            (key, value) ->
                # logical_corpus may refer to the corpus object
                # itself, and since JSON does not support circular
                # objects, replace the value with corpus title
                if key == "logical_corpus" then value.title else value)
        # corpus_config_info_keys previously excluded "urn", but now
        # it is included if listed in settings.corpusExtraInfoItems.
        # Does it matter?
        corpus_config_info_keys:
            (settings.corpusExtraInfoItems or []).join(",")
        urn_resolver: settings.urnResolver
    if "downloadFormatParams" of settings
        if "*" of settings.downloadFormatParams
            $.extend download_params, settings.downloadFormatParams["*"]
        if format of settings.downloadFormatParams
            $.extend download_params, settings.downloadFormatParams[format]
        if "downloadFormatParamsPhysical" of settings
            phys_format = format_params.physical_format
            phys_formats = settings.downloadFormatParams[format]
                                   ?.physical_formats?.formats
            if phys_format? and phys_formats and phys_format in phys_formats
                phys_params = settings.downloadFormatParamsPhysical[phys_format]
                if "format_suffix" of phys_params
                    download_params.format += phys_params.format_suffix
    $.generateFile settings.download_cgi_script, download_params
    return


util.searchHash = (type, value) ->
    search
        search: type + "|" + value
        page: 0

    return

# $(window).trigger("hashchange")
added_corpora_ids = []
util.loadCorporaFolderRecursive = (first_level, folder) ->

    # Format the possible licence type information to be suffixed to
    # the corpus name in the corpus selector. <span class="..."> does
    # not seem to work correctly here; it probably disturbs
    # transforming the corpus selector.
    # (Jyrki Niemi 2014-02-06, 2015-02-10)
    format_licence_type = (corpus_id) ->
        licence_type = settings.corpora[corpus_id]["licence_type"]
        # c.log("licence_type", corpus_id, licence_type)
        if licence_type then " [" + licence_type.toUpperCase() + "]" else ""

    outHTML = undefined
    if first_level
        outHTML = "<ul>"
    else
        folder_descr = util.callPluginFunctionsValued(
            "CorpusInfoDescrProcessor", (folder.description or ""), folder)
        extra_info =
            if folder.info and settings.corpusExtraInfo
                util.formatCorpusExtraInfo(
                    folder.info,
                    info_items: settings.corpusExtraInfo.corpus_infobox)
            else
                ""
        folder_descr += ((if folder_descr and extra_info then "<br/><br/>" else "") +
            extra_info)
        outHTML = "<ul title=\"" + folder.title + "\" description=\"" + escape(folder_descr) + "\">"
    if folder #This check makes the code work even if there isn't a ___settings.corporafolders = {};___ in config.js
        # Folders
        $.each folder, (fol, folVal) ->
            outHTML += "<li>" + util.loadCorporaFolderRecursive(false, folVal) + "</li>" if fol isnt "contents" and fol isnt "title" and fol isnt "description" and fol isnt "info"
            return

        # Corpora
        if folder["contents"] and folder["contents"].length > 0
            $.each folder.contents, (key, value) ->
                outHTML += "<li id=\"" + value + "\">" + settings.corpora[value]["title"] + format_licence_type(value) + "</li>"
                added_corpora_ids.push value
                return

    if first_level

        # Add all corpora which have not been added to a corpus and
        # which are not hidden
        non_added_corpora_ids = _.difference(_.keys(settings.corpora),
                                             added_corpora_ids)
        for val in non_added_corpora_ids
            if not settings.corpora[val].hide
                outHTML += "<li id='#{val}'>#{settings.corpora[val].title + format_licence_type(val)}</li>"

    outHTML += "</ul>"
    outHTML

# Helper function to turn 1.2345 into 1,2345 (locale dependent)
# Use "," instead of "." if Swedish, if mode is
# Split the string into two parts

#return x.replace(".",'<span rel="localize[util_decimalseparator]">' + decimalSeparator + '</span>');

#return x.replace(".", decimalSeparator);

# Helper function to turn "8455999" into "8 455 999"
util.prettyNumbers = (numstring) ->
    regex = /(\d+)(\d{3})/
    outStrNum = numstring.toString()
    outStrNum = outStrNum.replace(regex, "$1" + "<span rel=\"localize[util_numbergroupseparator]\">" + util.getLocaleString("util_numbergroupseparator") + "</span>" + "$2") while regex.test(outStrNum)

    outStrNum

util.suffixedNumbers = (num) ->
    out = ""
    if num < 1000 # 232
        out = num.toString()
    else if 1000 <= num < 1e6 # 232,21K
        out = (num/1000).toFixed(2).toString() + "K"
    else if 1e6 <= num < 1e9 # 232,21M
        out = (num/1e6).toFixed(2).toString() + "M"
    else if 1e9 <= num < 1e12 # 232,21G
        out = (num/1e9).toFixed(2).toString() + "G"
    else if 1e12 <= num # 232,21T
        out = (num/1e12).toFixed(2).toString() + "T"
    return out.replace(".","<span rel=\"localize[util_decimalseparator]\">" + util.getLocaleString("util_decimalseparator") + "</span>")

# Goes through the settings.corporafolders and recursively adds the settings.corpora hierarchically to the corpus chooser widget
util.loadCorpora = ->
    added_corpora_ids = []

    # Run "plugin functions" for corpus folders and corpus settings.
    # The functions may use corpus information obtained in
    # Searches.getInfoData, so they cannot be run (reliably) in
    # main.coffee. (Jyrki Niemi 2018-07-05)
    util.forAllFolders(
        (folder) -> util.callPluginFunctions "CorpusFolderProcessor", folder)
    util.forAllCorpora(
        (config) -> util.callPluginFunctions "CorpusSettingsProcessor", config)

    outStr = util.loadCorporaFolderRecursive(true, settings.corporafolders)
    window.corpusChooserInstance = $("#corpusbox").corpusChooser(
        template: outStr
        infoPopup: (corpusID) ->
            corpusObj = settings.corpora[corpusID]
            maybeInfo = ""
            maybeInfo = "<br/><br/>" + corpusObj.description if corpusObj.description
            maybeInfo = util.callPluginFunctionsValued(
                "CorpusInfoDescrProcessor", (maybeInfo or ""), corpusObj)
            corpusExtraInfo =
                if settings.corpusExtraInfo
                    util.formatCorpusExtraInfo(
                        corpusObj,
                        info_items: settings.corpusExtraInfo.corpus_infobox)
                else
                    undefined
            if corpusExtraInfo
                maybeInfo += (if maybeInfo then "<br/><br/>" else "") + corpusExtraInfo
            numTokens = corpusObj.info.Size
            baseLangTokenHTML = ""
            baseLangSentenceHTML = ""
            baseLangs = settings.corpora[corpusID]?.linked_to
            if baseLangs
                lang = " (" + util.getLocaleString(settings.corpora[corpusID].lang) + ")"
                for baseLang in baseLangs
                    #baseLangTag = " (" + settings.corpora[baseLang].lang + ")"
                    baseLangTokenHTML += """#{util.getLocaleString("corpselector_numberoftokens")}: <b>#{util.prettyNumbers(settings.corpora[baseLang].info.Size)}
                    </b> (#{util.getLocaleString(settings.corpora[baseLang].lang)})<br/>
                    """
                    baseLangSentenceHTML += """#{util.getLocaleString("corpselector_numberofsentences")}: <b>#{util.prettyNumbers(settings.corpora[baseLang].info.Sentences)}
                    </b> (#{util.getLocaleString(settings.corpora[baseLang].lang)})<br/>
                    """
            else
                lang = ""

            numSentences = corpusObj["info"]["Sentences"]
            lastUpdate = corpusObj["info"]["Updated"]
            lastUpdate = "?" unless lastUpdate
            sentenceString = "-"
            sentenceString = util.prettyNumbers(numSentences.toString()) if numSentences

            output = """
            <b>
                <img class="popup_icon" src="img/korp_icon.png" />
                #{corpusObj.title}
            </b>
            #{maybeInfo}
            <br/><br/>#{baseLangTokenHTML}
            #{util.getLocaleString("corpselector_numberoftokens")}:
            <b>#{util.prettyNumbers(numTokens)}</b>#{lang}
            <br/>#{baseLangSentenceHTML}
            #{util.getLocaleString("corpselector_numberofsentences")}:
            <b>#{sentenceString}</b>#{lang}
            <br/>
            #{util.getLocaleString("corpselector_lastupdate")}:
            <b>#{lastUpdate}</b>
            <br/><br/>"""

            supportsContext = _.keys(corpusObj.context).length > 1
            output += $("<div>").localeKey("corpselector_supports").html() + "<br>" if supportsContext
            output += $("<div>").localeKey("corpselector_limited").html() if corpusObj.limited_access
            output

        infoPopupFolder: (indata) ->
            corporaID = indata.corporaID
            desc = indata.description
            totalTokens = 0
            totalSentences = 0
            missingSentenceData = false
            $(corporaID).each (key, oneID) ->
                totalTokens += parseInt(settings.corpora[oneID]["info"]["Size"])
                oneCorpusSentences = settings.corpora[oneID]["info"]["Sentences"]
                if oneCorpusSentences
                    totalSentences += parseInt(oneCorpusSentences)
                else
                    missingSentenceData = true
                return

            totalSentencesString = util.prettyNumbers(totalSentences.toString())
            totalSentencesString += "+" if missingSentenceData
            maybeInfo = ""
            maybeInfo = desc + "<br/><br/>" if desc and desc isnt ""
            glueString = ""
            if corporaID.length is 1
                glueString = util.getLocaleString("corpselector_corporawith_sing")
            else
                glueString = util.getLocaleString("corpselector_corporawith_plur")
            "<b><img src=\"img/folder.png\" style=\"margin-right:4px; vertical-align:middle; margin-top:-1px\"/>" + indata.title + "</b><br/><br/>" + maybeInfo + "<b>" + corporaID.length + "</b> " + glueString + ":<br/><br/><b>" + util.prettyNumbers(totalTokens.toString()) + "</b> " + util.getLocaleString("corpselector_tokens") + "<br/><b>" + totalSentencesString + "</b> " + util.getLocaleString("corpselector_sentences")
    ).bind("corpuschooserchange", (evt, corpora) ->
        c.log "corpuschooserchange", corpora

        # c.log("corpus changed", corpora);
        safeApply $("body").scope(), (scope) ->
            scope.$broadcast "corpuschooserchange", corpora
            return

        return
    )
    selected = corpusChooserInstance.corpusChooser("selectedItems")
    settings.corpusListing.select selected
    return

window.regescape = (s) ->
    s.replace /[\\.|?+*\'\"()^${}\[\]]/g, "\\$&"

util.localizeFloat = (float, nDec) ->
    lang = $("#languages").radioList("getSelected").data("lang")
    sep = null
    nDec = nDec or float.toString().split(".")[1].length
    # if lang is "sv"
    #     sep = ","
    # else sep = "." if lang is "en"
    sep = util.getLocaleString("util_decimalseparator")
    $.format("%." + nDec + "f", float).replace ".", sep

util.formatDecimalString = (x, mode, statsmode, stringOnly) ->
    if _.contains(x, ".")
        parts = x.split(".")
        decimalSeparator = util.getLocaleString("util_decimalseparator")
        return parts[0] + decimalSeparator + parts[1] if stringOnly
        if mode
            util.prettyNumbers(parts[0]) + "<span rel=\"localize[util_decimalseparator]\">" + decimalSeparator + "</span>" + parts[1]
        else
            util.prettyNumbers(parts[0]) + decimalSeparator + parts[1]
    else
        if statsmode
            x
        else
            util.prettyNumbers x

util.makeAttrSelect = (groups) ->
    arg_select = $("<select/>")
    $.each groups, (lbl, group) ->
        return if $.isEmptyObject(group)
        optgroup = $("<optgroup/>",
            label: util.getLocaleString(lbl).toLowerCase()
            rel: $.format("localize[%s]", lbl)
        ).appendTo(arg_select)
        $.each group, (key, val) ->
            return if val.displayType is "hidden"
            $("<option/>",
                rel: $.format("localize[%s]", val.label)
            ).val(key).text(util.getLocaleString(val.label) or "").appendTo(optgroup).data "dataProvider", val
            return

        return

    arg_select

util.browserWarn = ->
    $.reject
        reject:

            # all : false,
            msie5: true
            msie6: true
            msie7: true
            msie8: true
            msie9: true

        imagePath: "img/browsers/"
        display: [
            "firefox"
            "chrome"
            "safari"
            "opera"
        ]
        browserInfo: # Settings for which browsers to display
            firefox:
                text: "Firefox" # Text below the icon
                url: "http://www.mozilla.com/firefox/" # URL For icon/text link

            safari:
                text: "Safari"
                url: "http://www.apple.com/safari/download/"

            opera:
                text: "Opera"
                url: "http://www.opera.com/download/"

            chrome:
                text: "Chrome"
                url: "http://www.google.com/chrome/"

            msie:
                text: "Internet Explorer"
                url: "http://www.microsoft.com/windows/Internet-explorer/"

        header: "Du använder en omodern webbläsare" # Header of pop-up window
        paragraph1: "Korp använder sig av moderna webbteknologier som inte stödjs av din webbläsare. En lista på de mest populära moderna alternativen visas nedan. Firefox rekommenderas varmt." # Paragraph 1
        paragraph2: "" # Paragraph 2
        closeMessage: "Du kan fortsätta ändå – all funktionalitet är densamma – men så fort du önskar att Korp vore snyggare och snabbare är det bara att installera Firefox, det tar bara en minut." # Message displayed below closing link
        closeLink: "Stäng varningen" # Text for closing link
        #   header: 'Did you know that your Internet Browser is out of date?', // Header of pop-up window
        #     paragraph1: 'Your browser is out of date, and may not be compatible with our website. A list of the most popular web browsers can be found below.', // Paragraph 1
        #     paragraph2: 'Just click on the icons to get to the download page', // Paragraph 2
        #     closeMessage: 'By closing this window you acknowledge that your experience on this website may be degraded', // Message displayed below closing link
        #     closeLink: 'Close This Window', // Text for closing link
        closeCookie: true # If cookies should be used to remmember if the window was closed (see cookieSettings for more options)
        # Cookie settings are only used if closeCookie is true
        cookieSettings:
            path: "/" # Path for the cookie to be saved on (should be root domain in most cases)
            expires: 100000 # Expiration Date (in seconds), 0 (default) means it ends with the current session

    return

util.convertLMFFeatsToObjects = (structure, key) ->

    # Recursively traverse a tree, expanding each "feat" array into a real object, with the key "feat-[att]":
    if structure?
        output = null
        theType = util.findoutType(structure)
        if theType is "object"
            output = {}
            $.each structure, (inkey, inval) ->
                if inkey is "feat"
                    innerType = util.findoutType(inval)
                    if innerType is "array"
                        $.each inval, (fkey, fval) ->
                            keyName = "feat_" + fval["att"]
                            if not output[keyName]?
                                output[keyName] = fval["val"]
                            else
                                if $.isArray(output[keyName])
                                    output[keyName].push fval["val"]
                                else
                                    output[keyName] = [output[keyName], fval["val"]]
                            return

                    else
                        keyName = "feat_" + inval["att"]
                        if not output[keyName]?
                            output[keyName] = inval["val"]
                        else
                            if $.isArray(output[keyName])
                                output[keyName].push inval["val"]
                            else
                                output[keyName] = [output[keyName], inval["val"]]
                else
                    output[inkey] = util.convertLMFFeatsToObjects(inval)
                return

        else if theType is "array"
            dArr = new Array()
            $.each structure, (inkey, inval) ->
                dArr.push util.convertLMFFeatsToObjects(inval)
                return

            output = dArr
        else
            output = structure
        output
    else
        null

util.findoutType = (variable) ->
    if $.isArray(variable)
        "array"
    else
        typeof (variable)


# Format extra information associated with a corpus object, typically
# a URN, licence information and various links. An optional second
# argument specifies an object containing options as properties. The
# supported options are:
# - info_items: an array of items (properties in the corpus
#   configuration) to be formatted.
# - item_paragraphs: if true, enclose each item in <p>...</p>;
#   otherwise separate them with <br/>
#
# The information items are usually composite objects which may
# contain the properties "name", "description", and "url" or "urn". If
# the information contains "name", it is presented as follows: a label
# and a colon (unless the property "no_label" is true or the item is
# "homepage"), followed by the name as a link to the URN or URL (or if
# neither URN nor URL, no link). Otherwise, the label is a link to the
# URN or URL. The label is the localized string for the key "corpus_"
# + item name. The optional description is a represented as a tooltip
# (HTML title attribute).
#
# Alternatively, an information item may be an array of such composite
# object, in which case they are formatted in the order in which they
# are in the array. If a composite object in an array contains the
# property "subtype", the label is the localized string for the key
# "corpus_" + item name + "_" + the value of the subtype property.
#
# If an item needs no separate name, the simple properties X_urn and
# X_url can be used instead of X: { urn: ... } (similarly for url).
# The item "urn" is treated specially: it shows the value of the
# "urn" property as the link text.
#
# TODO: Add an option for presenting the description as a text
# following the link text. It could be used in the corpus info box
# instead of the tooltip.

util.formatCorpusExtraInfo = (corpusObj, opts = {}) ->
    info_items =
        if opts.info_items
            opts.info_items
        else
            settings.corpusExtraInfoItems? or []
    item_paragraphs = opts.item_paragraphs or false

    # Get the value of a URN (preferred, prefixed with resolver URL)
    # or URL property in obj. The optional second argument specifies
    # the property name prefix to "urn" or "url".
    getUrnOrUrl = (obj) ->
        prefix = if arguments.length > 1 then arguments[1] else ''
        if prefix + 'urn' of obj
            util.makeUrnUrl(obj[prefix + 'urn'])
        else
            obj[prefix + 'url']

    # Return an HTML link (or text), given link_info, which may
    # contain the properties "label", "url", "text" and "tooltip".
    makeLinkItem = (link_info) ->
        result = ''
        if link_info.label
            result += link_info.label + ': '
        if link_info.url
            href = if link_info.url.indexOf('{{') != -1
                       'ng-href'
                   else
                       'href'
            result += '<a ' + href + '=\'' + link_info.url +
                '\' target=\'_blank\'' +
                (if link_info.tooltip
                    ' title=\'' + link_info.tooltip + '\''
                else
                    '') +
                '>' + link_info.text + '</a>'
        else if link_info.text
            if link_info.tooltip
                result += '<span class=\'has_hover_text\' title=\'' +
                    link_info.tooltip + '\'>' + link_info.text + '</span>'
            else
                result += link_info.text
        result

    makeLinkInfos = (info_item) ->

        makeLabel = (info_item) ->
            # Use rel='localize[...]' instead of util.getLocaleString, so
            # that the texts are re-localized immediately when switching
            # languages.
            # TODO: Convert to use the new localization method
            if opts.static_localization
                util.getLocaleString('corpus_' + info_item)
            else
                '<span rel=\'localize[corpus_' + info_item + ']\'>' +
                    'Corpus ' + info_item + '</span>'

        makeLinkInfoBase = (info_obj, label) ->
            link_info = url: getUrnOrUrl(info_obj)
            if info_obj.name
                link_info.text = info_obj.name
                if ! info_obj.no_label
                    link_info.label = label
            else
                link_info.text = label
            if info_obj.description
                link_info.tooltip = info_obj.description
            return link_info

        linkInfoIsNotEmpty = (link_info) ->
            link_info and (link_info.url or link_info.text)

        link_info = null
        label = makeLabel(info_item)
        if (settings.makeCorpusExtraInfoItem and
                info_item of settings.makeCorpusExtraInfoItem)
            link_info = settings.makeCorpusExtraInfoItem[info_item](
                corpusObj, label)
        if not link_info
            corpus_info_item = corpusObj[info_item]
            if corpus_info_item
                if Array.isArray(corpus_info_item)
                    link_infos = []
                    base_label = label
                    for info_item_sub in corpus_info_item
                        if "subtype" of info_item_sub
                            label = makeLabel(
                                info_item + '_' + info_item_sub.subtype)
                        else
                            label = base_label
                        link_info_base = makeLinkInfoBase(info_item_sub, label)
                        if linkInfoIsNotEmpty(link_info_base)
                            link_infos.push(link_info_base)
                    return link_infos
                else
                    link_info = makeLinkInfoBase(corpus_info_item, label)
            else if (corpusObj[info_item + '_urn'] or
                     corpusObj[info_item + '_url'])
                # Simple *_urn or *_url properties
                link_info =
                    url: getUrnOrUrl(corpusObj, info_item + '_')
                    text: label
        if linkInfoIsNotEmpty(link_info)
            return [link_info]
        else
            return []

    result = []
    for info_item in info_items
        for link_info in makeLinkInfos(info_item)
            result.push(makeLinkItem(link_info))
    if item_paragraphs
        return '<p>' + result.join('</p><p>') + '</p>'
    else
        return result.join('<br/>')

# Return the URN resolver URL for an URN: prefix settings.urnResolver
# unless the URN string begins with "http".
util.makeUrnUrl = (urn) ->
    if urn.indexOf('http') != 0
        settings.urnResolver + urn
    else
        urn

# Copy information from the "info" property of corpusObj to the top
# level of corpusObj. This information may come from the backend .info
# file or database. The same information can also be specified in
# top-level properties of the frontend config file, but the
# information from "info" overrides them, so that this information can
# be accessed uniformly through the top-level properties. A property
# name may contain a prefix indicating a section (Metadata, Licence,
# Compiler, or other listed in settings.corpusExtraInfoItems): these
# are converted to separate composite objects in corpusObj. For
# example, Licence_URL: X, Licence_Name: Y is converted to licence : {
# url: X, name: Y }.

util.copyCorpusInfoToConfig = (corpusObj) ->
    info_key_sects =
        for item in settings.corpusExtraInfoItems when item != 'urn'
            item.charAt(0).toUpperCase() + item.slice(1)
    info_key_sects.push('')
    info_subkeys = [
        'Name'
        'Description'
        'URN'
        'URL'
    ]
    corpusInfo = corpusObj.info
    i = 0
    while i < info_key_sects.length
        sect = info_key_sects[i]
        sect_name = sect.toLowerCase()
        subobj = corpusObj
        if sect != ''
            subobj = if sect_name of corpusObj then corpusObj[sect_name] else {}
        info_key_prefix = sect + (if sect == '' then '' else '_')
        added_properties = false
        j = 0
        while j < info_subkeys.length
            key = info_subkeys[j]
            subkey = key.toLowerCase()
            value = corpusInfo[info_key_prefix + key]
            if value
                subobj[subkey] = value
                added_properties = true
            j++
        # Add only non-empty subobjects
        if sect != '' and added_properties
            corpusObj[sect_name] = subobj
        i++
    return

# Propagate information in the properties of info to corpusFolder,
# all its subfolders (recursively) and corpora. Info items lower in
# the corpus folder tree override those from above.

util.propagateCorpusFolderInfo = (corpusFolder, info) ->

    # Copy properties from info to corpusConfig if they are missing
    # from corpusConfig. A composite property in corpusConfig
    # overrides all the values in info (coming from folder info).
    addCorpusInfo = (corpusConfig, info) ->
        for prop_name of info
            if ! (prop_name of corpusConfig)
                corpusConfig[prop_name] = info[prop_name]
        return

    # The info in this folder overrides that coming from above
    if corpusFolder.info
        info = $.extend(true, {}, info or {}, corpusFolder.info)
    # Add or modify the info in this folder
    if info
        corpusFolder.info = info
    # Propagate the info to the corpora in this folder
    if info and corpusFolder.contents
        i = 0
        while i < corpusFolder.contents.length
            addCorpusInfo settings.corpora[corpusFolder.contents[i]], info
            i++
    # Recursively process subfolders and propagate the info
    for prop_name of corpusFolder
        if prop_name != 'title' and prop_name != 'description' and
                prop_name != 'contents' and prop_name != 'info'
            c.log 'propagate ', prop_name
            util.propagateCorpusFolderInfo corpusFolder[prop_name], info
    return


# Call function func for all corpora in settings.corpora with the
# corpus settings object as the first argument and optional args... as
# the rest. (Jyrki Niemi 2016-10-18, 2018-07-06)

util.forAllCorpora = (func, args...) ->
    for corpus of settings.corpora
        func settings.corpora[corpus], corpus, args...
    return

# Call function func for all corpus folders in settings.corporafolders
# and their subfolders, with the folder object and possible args as
# arguments. (Jyrki Niemi 2018-07-05)

util.forAllFolders = (func, args...) ->

    for_all_subfolders = (folder, func, args...) ->
        for own prop_name of folder
            if prop_name not in ["title", "description", "contents", "info"]
                func folder[prop_name], args...
                for_all_subfolders folder[prop_name], func, args...

    for_all_subfolders settings.corporafolders, func, args...


# Initialize the link_attributes properties in all the corpora in
# settings.corpora.
util.initCorpusSettingsLinkAttrs = () ->
    for corpus of settings.corpora
        util.extractLinkAttrs(settings.corpora[corpus])
    null

# Initialize the link_attributes property in corpusInfo to contain
# the attributes with type "url" and url_opts.in_link_section true.
# These attributes are shown in a separate section in the sidebar.
# The original attributes are marked as hidden.
util.extractLinkAttrs = (corpusInfo) ->

    extractLinkAttrs = (attrs, link_attrs) ->
        if attrs?
            for attrname of attrs
                attr = attrs[attrname]
                if attr.type == "url" and attr.url_opts? and attr.url_opts.in_link_section
                    if attr._link_attr
                        # This attribute was already handled via
                        # another reference; that happens when many
                        # corpora use the same attribute definitions
                        # objects.
                        link_attrs[attrname] = attr._link_attr
                    else
                        # Make a deep copy of the attr object
                        link_attrs[attrname] = $.extend(true, {}, attr)
                        # The original attribute cannot be deleted
                        # (without making more modifications
                        # elsewhere) because Korp only requests from
                        # the backend the attributes mentioned in
                        # attributes or struct_attributes.
                        attrs[attrname].displayType = "hidden"
                        attrs[attrname]._link_attr = link_attrs[attrname]

    link_attrs = {}
    extractLinkAttrs(corpusInfo.attributes, link_attrs)
    extractLinkAttrs(corpusInfo.struct_attributes, link_attrs)
    corpusInfo.link_attributes = link_attrs
    null


# Initialize the synthetic_attr_names property of all the corpora in
# settings.corpora.

util.initCorpusSettingsSyntheticAttrs = ->
    for corpus of settings.corpora
        util.setSyntheticAttrsInfo settings.corpora[corpus]
    return

# Initialize the synthetic_attr_names property of corpusInfo to
# contain the names of synthetic attributes (with property synthetic
# == true), separately for (positional) attributes, struct_attributes
# and link_attributes, so that Sidebar.renderContent (in widgets)
# need not find them out over and over again.

util.setSyntheticAttrsInfo = (corpusInfo) ->

    setSyntheticAttrs = (attrs, synthetic_list) ->
        if attrs != undefined
            for attrname of attrs
                attr = attrs[attrname]
                if attr.synthetic and attr.displayType != 'hidden'
                    synthetic_list.push attrname
        return

    corpusInfo.synthetic_attr_names =
        attributes: []
        struct_attributes: []
        link_attributes: []
    for attrtype of corpusInfo.synthetic_attr_names
        setSyntheticAttrs(
            corpusInfo[attrtype], corpusInfo.synthetic_attr_names[attrtype])
    return


# List the corpora (corpus ids) matching the regular expression regex.
# The regular expression is implicitly anchored to the beginning and
# end, so a corpus id must match it completely. The optional second
# argument is an object for options. If the option "inverse" is true,
# list corpora not matching regex. If the option "sort" is true, sort
# the corpus ids alphabetically.

util.listMatchingCorpora = (regex) ->
    corp_re = RegExp("^(" + regex + ")$")
    opts = if arguments.length > 1 then arguments[1] else {}
    inverse = opts.inverse
    result = []
    for corpus of settings.corpora
        match = corp_re.test(corpus)
        if (match and not inverse) or (inverse and not match)
            result.push(corpus)
    if opts.sort
        result.sort()
    return result


# Map possible corpus id aliases to actual corpus ids in the URL hash
# parameter "corpus". Aliases are defined in settings.corpus_aliases,
# whose property keys are aliases and values the actual corpus ids,
# separated by commas. The corpus ids may also be regular expressions
# that are expanded to the corpora mathing the regexp.
#
# Aliases can be useful if a corpus is renamed: the old name (id) can
# be retained as an alias to avoid breaking possible URLs containing
# the old id of the corpus. An alias may also be used a shorthand for
# a list of corpora. Regular expressions allow the denotation of the
# alias to expand if new corpora matching the regexp are added to Korp
# (or old ones removed). (Jyrki Niemi 2015-04-23, 2016-01-22)

util.mapHashCorpusAliases = () ->

    getUrlParam = (name) ->
        param_re = RegExp("\\b" + name + "=([^&;]*)")
        matches = window.location.hash.match(param_re)
        if matches? and matches.length > 1 then matches[1] else null

    expandAlias = (alias) ->
        if /[^a-z0-9_,-]/.test(alias)
            corpora = []
            corp_specs = alias.split(",")
            for corp_spec in corp_specs
                if /[^a-z0-9_,-]/.test(corp_spec)
                    corpora = corpora.concat(
                        util.listMatchingCorpora(corp_spec))
            return corpora.join(",")
        else
            return alias

    mapCorpusAliasList = (corpus) ->
        _.map(corpus.split(","),
              (corpus_id) ->
                  if corpus_id of settings.corpus_aliases
                      expandAlias(settings.corpus_aliases[corpus_id])
                  else
                      corpus_id
             )
        .join(",")

    if settings.corpus_aliases?
        orig_corpus = getUrlParam("corpus")
        if orig_corpus
            corpus = mapCorpusAliasList(orig_corpus)
            if corpus != orig_corpus
                c.log "mapHashCorpusAliases", orig_corpus, "->", corpus
                window.location.hash = window.location.hash.replace(
                    "corpus=" + orig_corpus, "corpus=" + corpus)
    return


# Initialize the "order" property (supported natively by Språkbanken's
# Korp) of all attributes of all the corpora in settings.corpora based
# on settings.default_sidebar_display_order and the corpus-specific
# sidebar_display_order properties.
#
# Even though might be better to move eventually to specifying order
# directly in the attribute definitions, as it is supported natively
# by Språkbanken's Korp, this might make the transition easier.

util.initCorpusSettingsAttrDisplayOrder = () ->
    util.forAllCorpora util.setAttrDisplayOrder

# Initialize the "order" property of each attribute of corpusInfo to
# contain the order number in which the attribute is to be shown in
# the sidebar (largest first), separately for (positional) attributes,
# struct_attributes and link_attributes.
#
# The order may be specified in corpusInfo.sidebar_display_order or
# the default settings.default_sidebar_display_order. These are
# objects with the keys attributes, struct_attributes and
# link_attributes, whose values are lists of attribute names or
# regular expressions matching attribute names, in the order in which
# the attributes should be shown. Attributes with an explicit order
# property in the definitions are shown first, and unlisted attributes
# are shown after the listed ones in the order JavaScript iterates
# over the attribute properties. The mutual order of multiple
# attributes matching a single regular expression is the JavaScript
# property iteration order. (Jyrki Niemi 2015-08-27, 2017-10-19)

util.setAttrDisplayOrder = (corpusInfo) ->

    # Add change attr_info[attr_name] to a copy of itself, extended
    # with {order: order}. We make a copy of the attribute definition
    # object, so that the order previoiusly assigned to an attribute
    # with a shared definition (when processing another corpus) does
    # not affect the order of this corpus. Copies require more memory,
    # since the attribute definitions are no longer shared, but it is
    # enough to make a shallow copy, so that the value of the dataset
    # property remains shared.
    set_order = (attr_info, attr_name, order) ->
        attr_info[attr_name] =
            $.extend({}, attr_info[attr_name], {order: order})

    for attr_type in ["attributes", "struct_attributes", "link_attributes"]
        order_spec = (corpusInfo.sidebar_display_order?[attr_type] or
                      settings.default_sidebar_display_order?[attr_type])
        # c.log "setAttrDisplayOrder", corpusInfo, order_spec
        if order_spec
            attr_info = corpusInfo[attr_type]
            # If all the attributes already have an order property,
            # nothing needs to be done here.
            existing_orders = _.pluck(attr_info, "order")
            if _.all(existing_orders)
                continue
            min_existing_order = _.min(existing_orders)
            if min_existing_order == Infinity
                min_existing_order = 100
            attr_names = _(attr_info)
                         .keys()
                         .filter((key) -> not attr_info[key].order?)
                         .value()
            # Add order values in a decreasing order below the minimum
            # existing one.
            next_order = min_existing_order - 1
            for pattern in order_spec
                if $.type(pattern) == "regexp"
                    for attr_name in attr_names
                        if attr_name.match(pattern) and
                                not attr_info[attr_name].order?
                            set_order attr_info, attr_name, next_order
                            next_order -= 1
                else if $.type(pattern) == "string"
                    index = $.inArray(pattern, attr_names)
                    if index != -1
                        set_order attr_info, attr_names[index], next_order
                        next_order -= 1
    return


# Initialize properties in settings.corpora.* based on their property
# "features" and the properties in settings.corpus_features.

util.initCorpusSettingsFeatures = () ->
    util.forAllCorpora util.setCorpusFeatures

# Extend corpus settings based on the values specified in the
# "features" property of a corpus configuration.
#
# The "features" property is an array, whose values should be keys
# (property names) of settings.corpus_features. The corpus
# configuration is extended by the corresponding property value in
# settings.corpus_features. Extension is recursive, so that if you
# specify, e.g. { attributes: ... }, the specified attributes are
# added to (instead of replacing) the explicit attributes in the
# corpus configuration.
#
# Would there be a case for recursive setting of features, so that if
# a value in settings.corpus_features contains a "features" property,
# the properties corresponding to it are also added? If so, should the
# properties specified by the nested "features" added before or after
# adding the explicit properties? (Jyrki Niemi 2016-10-18)

util.setCorpusFeatures = (corpusInfo) ->
    for featname in (corpusInfo.features or [])
        features = settings.corpus_features?[featname]
        # c.log "setCorpusFeatures", featname, features, corpusInfo
        if not features
            c.warn("Warning: settings.corpus_features[\"" + featname +
                   "\"] not defined: referred to in settings.corpora." +
                   corpusInfo.id)
        else
            $.extend(true, corpusInfo, features)
    return


# Initialize the property logical_corpus in settings.corpora.*. The
# logical corpus of a corpus may be either the physical corpus itself
# or a corpus folder containing the corpus (possibly indirectly).

util.initCorpusSettingsLogicalCorpora = () ->
    # Corpora in folders
    util.setFolderLogicalCorpora settings.corporafolders
    # Top-level corpora
    for corpus_id, corpus of settings.corpora
        unless "logical_corpus" of corpus
            corpus.logical_corpus = corpus
    return

# Recursively initialize the property logical_corpus of the corpora in
# the given folder. If the parameter logical_corpus not null, use it;
# otherwise, if the folder has property info.is_logical_corpus or
# info.urn, the folder represents the logical corpus; otherwise, the
# logical corpus is found deeper in the folder hierarchy or it is the
# same as the physical corpus.

util.setFolderLogicalCorpora = (folder, logical_corpus = null) ->
    c.log "setFolderLogicalCorpora", folder, logical_corpus?.title
    for corpus_id in folder.contents or []
        if not (corpus_id of settings.corpora)
            continue
        corpus = settings.corpora[corpus_id]
        corpus.logical_corpus = logical_corpus or settings.corpora[corpus_id]
        # c.log "logical corpus of", corpus_id, "is", corpus.logical_corpus?.title
    for own subfolder_name, subfolder of folder
        if subfolder_name not in ["title", "contents", "description", "info"]
            subfolder_logical_corpus =
                logical_corpus or (if subfolder.info?.is_logical_corpus or
                                           subfolder.info?.urn
                                       subfolder)
            util.setFolderLogicalCorpora(subfolder, subfolder_logical_corpus)
    return


# Initialize the properties licence_type and limited_access for all
# corpora based whether the licence name indicates that the corpus
# licence is CLARIN ACA or CLARIN RES. These properties would not need
# to be set in the configuration.

util.initCorpusSettingsLicenceCategory = () ->
    util.setFolderLicenceCategory settings.corporafolders
    for corpus_id, corpus of settings.corpora
        corpus.licence_type ?= corpus.licence?.category or
                               corpus.logical_corpus?.info?.licence?.category
        if corpus.licence_type in ["ACA", "ACA-Fi", "RES"]
            corpus.limited_access = true

# Set the info.licence.category (RES or ACA) of folder if it contains
# info.licence.name with CLARIN RES or CLARIN ACA, and recursively
# that of all its subfolders.

util.setFolderLicenceCategory = (folder) ->
    licence_name = folder.info?.licence?.name
    # c.log "licence_name", folder.title, licence_name
    if licence_name?
        category = /(?:CLARIN )?(ACA(-Fi)?|RES)/.exec(licence_name)?[1]
        if category?
            folder.info.licence.category = category
            # c.log "licence_category", category
    for own subfolder_name, subfolder of folder
        if subfolder_name not in ["title", "contents", "description", "info"]
            util.setFolderLicenceCategory subfolder


# Add additional CQP queries ("pre-queries") in cqp to params (Korp
# backend query parameters), after mapping them via cqp_mapper
# (default: identity). cqp can be either a string of CQP queries
# joined by || or an object. In a string, the first query is the
# unnumbered one and the last one is the main query, whose matches
# will be highlighted. (Jyrki Niemi 2015-06-18)

util.addCQPs = (params, cqp, cqp_mapper = (cqp) -> cqp) ->
    if typeof cqp == "string" or cqp instanceof String
        if cqp.indexOf("||") != -1
            cqps = cqp.split("||")
            params["cqp"] = cqp_mapper(cqps[0])
            params["cqp" + i.toString()] = cqp_mapper(cqps[i]) for i in [1...cqps.length]
        else
            params.cqp = cqp_mapper(cqp)
    else
        params[key] = cqp_mapper(val) for key, val of cqp when key.substr(0, 3) == "cqp"
    return

# Combine the CQP queries in the properties cqp and cqp[1-9][0-9]* of
# the object params or in the elements of the array params into a
# single string, joined by ||. (Jyrki Niemi 2015-06-18)

util.combineCQPs = (params) ->
    if $.isArray(params)
        return params.join("||")
    else
        cqp_keys = (
            key for key of Object.keys(params) when key.substr(0, 3) == "cqp")
        cqp_keys = _.sortBy cqp_keys, (key) ->
            parseInt(key.substr(4) or "0")
        return (params[key] for key in cqp_keys).join("||")


# Modify the defaultwithin parameter in params based on
# prequery_within. (Jyrki Niemi 2016-02-19)

util.addPrequeryWithin = (params) ->
    # FIXME/TODO: This will have to be changed if prequeries are
    # implemented in the extended search, as then the backend should
    # have a separate prequery_within parameter. Moreover, the query
    # for the map expands the main search to defaultwithin and
    # searches for place names in the expanded text. To correct that,
    # we might need to be able to tell the backend which prequeries
    # should be expanded and which should not.
    if params.cqp1 and search().prequery_within
        params.defaultwithin = search().prequery_within


# Execute the function settings.short_url_config[shorturl] to modify
# the configuration as desired if the last part of the URL path name
# component is shorturl. Also set window.short_url to shorturl.
# (Jyrki Niemi 2016-05-09)

util.applyShortUrlConfig = () ->
    window.short_url = null
    if settings.short_url_config
        last_path_comp = _.last(_.compact(window.location.pathname.split("/")))
        if last_path_comp and settings.short_url_config[last_path_comp]
            settings.short_url_config[last_path_comp](last_path_comp)
            window.short_url = last_path_comp
    # c.log("short URL", window.short_url)


# Set the current mode to mode and change the URL search parameter
# accordingly. Do not change mode if the search parameters already
# contains a mode parameter, unless override_explicit is true.
# (Jyrki Niemi 2016-05-09)

util.setMode = (mode, override_explicit = false) ->
    if mode != window.currentMode
        params = $.deparam.querystring()
        if override_explicit or not params.mode
            params.mode = mode
            window.location.search = "?" + $.param(params)


# Split a query comparison value key returned by the "loglike" command
# of the backend. The parameter "key" is a single value key,
# "reduce_attrs" is the array of reduce attribute names, and
# "attr_is_struct_attr" is a array of booleans indicating whether the
# corresponding reduce attribute is a structural attribute.
#
# Split the key to attribute values on "/" at most the number of
# reduce attributes less one times. Do not split values of structural
# attributes at spaces, since the same structural attribute value
# holds for all the tokens of the sentence (at least usually). This
# does not cover cases in which a positional (token) attribute may
# contain spaces, nor multi-token searches for strucutral attributes.
#
# FIXME: That still does not guarantee correct results for attribute
# values containing "/" with multiple reduce attributes, but at least
# it works in more cases. To fix more properly, use separators that do
# not occur in the attribute values, such as control characters. To
# retain backward compatibility of korp.cgi, the separators could be
# specified as parameters to korp.cgi.
#
# This function replaces the original inline code that does not take
# into account the number of attributes nor structural attributes (in
# compareCtrl (result_controllers.coffee) and backend/requestCompare
# (services.coffee)). (Jyrki Niemi 2016-12-13)

util.splitCompareKey = (key, reduce_attrs, attr_is_struct_attr) ->
    c.log "splitCompareKey", key, reduce_attrs, attr_is_struct_attr
    reduce_len = reduce_attrs.length
    if reduce_len > 1
        split_attrs = key.split "/"
        if split_attrs.length > reduce_len
            split_attrs[reduce_len..] = split_attrs[reduce_len..].join("/")
    else
        split_attrs = [key]
    c.log "split_attrs", split_attrs, reduce_attrs, reduce_len
    _.map split_attrs, (tokens, attr_idx) ->
        if attr_is_struct_attr[attr_idx]
            [tokens]
        else
            tokens.split " "


# Add to selector a Shibboleth login or logout link as defined by
# settings[url_prop]. If the link is a string, it is taken as a URL.
# If it is a function, it is used to generate the URL dynamically at
# link click time. The function is passed the URL in
# window.location.href as modified by the function url_filter
# (identity function by default). This allows passing the current URL
# (including parameters and hash) to the Shibboleth pages (scripts),
# which in turn allows retaining the state of Korp (mode, language,
# selected corpora, query) in login or logout. The function parameter
# add_link_fn is used to add the URL to the HTML. It should take two
# arguments: elem (corresponding to $(selector)) and href (the value
# of the href attribute of the a element to be set or added).
# (Jyrki Niemi 2015-05-06)

util.makeShibbolethLink = (selector, url_prop, add_link_fn,
                           url_filter = _.identity) ->
    url = settings[url_prop]
    if url?
        if typeof url != "function"
            add_link_fn($(selector), url)
        else
            add_link_fn($(selector), "javascript:")
            $(selector).find("a").click ((url_fn) ->
                (e) ->
                    e.preventDefault()
                    window.location.href = url_fn(
                        url_filter(window.location.href))
                    return
            )(url)
    else
        c.warn "settings.#{url_prop} not defined"
    return


# Return href with the corpora in the array corpora added to its URL
# parameter "corpus" (duplicates are removed).
util.url_add_corpora = (href, corpora) ->
    if href.indexOf("corpus=") == -1
        corpora_str = corpora.join(",")
        "#{href}&corpus=#{corpora_str}"
    else
        href_corpora = /&corpus=([^&]*)/.exec(href)[1].split(",")
        corpora_str = _.union(href_corpora, corpora).join(",")
        href.replace(/(&corpus=)[^&]+/, "$1#{corpora_str}")


# Return href with the corpora in the array corpora removed from its
# URL parameter "corpus".
util.url_remove_corpora = (href, corpora) ->
    if href.indexOf("corpus=") == -1
        href
    else
        href_corpora = /corpus=([^&]*)/.exec(href)[1].split(",")
        href_corpora = _.difference(href_corpora, corpora).join(",")
        # c.log "url_remove_corpora href before", href
        href = href.replace(/(&corpus=)[^&]+/, "$1#{href_corpora}")
        # c.log "url_remove_corpora href after", href
        href


# Display the restricted corpora access modal with the titles of the
# logical corpora of the corpora (corpus ids) given as the argument.

util.showRestrictedCorporaModal = (corpora) ->

    make_lbr_url = (logical_corpus) ->
        corpinfo = if logical_corpus.logical_corpus?
                       # Physical corpus is logical corpus
                       logical_corpus
                   else
                       # Corpus folder is logical corpus
                       logical_corpus.info
        settings.make_direct_LBR_URL(corpinfo?.lbr_id or
                                     corpinfo?.metadata_urn or
                                     corpinfo?.metadata?.urn)

    c.log "showRestrictedCorporaModal", corpora
    util.makeShibbolethLink(
        "#resCorporaLogin", "shibbolethLoginUrl",
        (elem, href) => elem.find("a").attr("href", href),
        (href) => util.url_add_corpora href, corpora)
    logical_corpora =
         _(corpora)
             .map((corp) -> settings.corpora[corp]?.logical_corpus)
             .unique()
             .compact()
             .value()
    # c.log "logical_corpora", logical_corpora
    if logical_corpora.length
        corpus_titles = _.pluck logical_corpora, "title"
        corpus_licence_cats = _.map logical_corpora, (corpinfo) ->
            corpinfo.info?.licence?.category or
            corpinfo.licence?.category or corpinfo.licence_type or
            "RES"
        corpus_lbr_urls = _.map logical_corpora, make_lbr_url
        c.log("You are not allowed to access the following corpora:",
              corpora, corpus_titles)
        $("#resCorporaList").html(
            _(_.zip corpus_titles, corpus_licence_cats, corpus_lbr_urls)
                .sortBy((elem) -> elem[0])
                .map(([title, lic, url]) ->
                         "<li><a href=\"#{url}\" target=\"_blank\">#{title} [#{lic}]</a></li>")
                .value())
        licence_cats =
            _(corpus_licence_cats)
                .unique()
                .compact()
                .map((s) -> s.replace('-', ''))
                .sortBy()
                .value()
                .join("").toLowerCase()
        c.log "licence_cats", licence_cats
        access_res_modal = $("#accessResCorporaModal")
        modal_class = "access-corpora-" + licence_cats
        access_res_modal.addClass modal_class
        access_res_modal.on("hidden.bs.modal", () ->
            access_res_modal.removeClass modal_class)
        # FIXME: A click on the Korp page header area still does not
        # close the modal but closes the corpus selector if open. A
        # click elsewhere would seem to work correctly.
        access_res_modal.on("click", (evt) ->
            evt.stopPropagation()
        )
        access_res_modal.modal()
    return


# Check if selected_corpora contains corpora which are currently not
# accessible. If it does, display the restricted corpora access modal.
# If selected_corpora contains restricted corpora accessible to the
# user, select them in the corpus selector.

util.checkTryingRestrictedCorpora = (selected_corpora) ->
    if not selected_corpora?.length
        return
    restricted_corpora = settings.corpusListing.getRestrictedCorpora()
    selected_restricted_corpora = _.intersection(restricted_corpora,
                                                 selected_corpora)
    if selected_restricted_corpora?.length
        creds = $.jStorage.get("creds")
        allowed = _.map((creds?.credentials or []),
                        (corp) -> corp.toLowerCase())
        non_allowed_corpora = _.difference selected_restricted_corpora, allowed
        if non_allowed_corpora?.length
            util.showRestrictedCorporaModal non_allowed_corpora
        allowed_restricted = _.intersection selected_restricted_corpora, allowed
        if allowed_restricted?.length
            selected_nonrestricted = _.difference(selected_corpora,
                                                  selected_restricted_corpora)
            selected_all = _.union selected_nonrestricted, allowed_restricted
            settings.corpusListing.select selected_all
            corpusChooserInstance?.corpusChooser "selectItems", selected_all
    return


# Show a modal dialogue with a link to re-logging in to Korp. (Jyrki
# Niemi 2018-02-06)

util.showReloginModal = () ->
    relogin_modal = $("#reloginModal")
    # Do not reopen the modal, even if showReloginModal is called
    # several times in a row. Note that in Bootstrap 4, the property
    # would be _isShown instead of isShown.
    # <https://stackoverflow.com/a/21341587>.
    if (relogin_modal.data("bs.modal") or {}).isShown
        return
    c.log "showReloginModal"
    # TODO: Support non-Shibboleth authentication.
    util.makeShibbolethLink(
        "#relogin", "shibbolethLoginUrl",
        (elem, href) => elem.find("a").attr("href", href))
    modal_class = "relogin"
    relogin_modal.addClass modal_class
    relogin_modal.on("hidden.bs.modal", () ->
        relogin_modal.removeClass modal_class)
    relogin_modal.on("click", (evt) ->
        evt.stopPropagation()
    )
    relogin_modal.modal()
    return


# Encoding list-valued parameters by extracting common prefixes (Jyrki
# Niemi 2017-09)

# Cache for the encoded values, since encoding long values is slowish
util.encoded_list_param_cache = {}

# Encode values as a list-valued parameter for korp.cgi. Reduce the
# length of the value by encoding common prefixes: LAM_AHLA,LAM_ANTR
# -> LAM_A(HLA,ANTR). values can be either an array or a string with
# items separated by commas. In addition, join the values in the
# output with output_sep; the default full stop need not be
# percent-encoded.
#
# TODO: Support extracting common prefixes from the ids of aligned
# corpora: PARFIN_2016_FI|PARFIN_2016_RU -> PARFIN_2016_(FI|RU). The
# vertical bar could also be encoded as a tilde to avoid percent
# encoding. (korp.cgi needs the appropriate decoding support.)

util.encodeListParam = (values, output_sep = ".") ->

    if not values?
        return ""

    # The minimum number of characters for a prefix
    min_prefix_len = 2
    group_overhead = encodeURIComponent("()").length

    # Calculate the number of common characters at the beginning of s1
    # and s2.
    _calc_common_prefix_len = (s1, s2) ->
        maxlen = _.max [s1.length, s2.length]
        i = 0
        while i < maxlen
            if s1.charAt(i) != s2.charAt(i)
                break
            i += 1
        return i

    # Calculate prefix groups based on the array prefix_lens, whose
    # each item is the length of a common prefix with the preceding
    # value. Return an array of triples (arrays) containing prefix
    # groups [start_index, end_index, common_prefix_length].
    #
    # NOTE: This functions uses heuristics and the result may not be
    # optimal, but it seems to work reasonably well. However, it is
    # slow for long lists. Maybe a better algorithm could be found
    # that would also be faster.
    _make_groups = (prefix_lens) ->
        groups = []

        # Add a group from start to end, having as the prefix length
        # the minimum in the prefix_lens of the range.
        _add_group = (start, end) ->
            if start > end
                return
            len = _.min prefix_lens.slice(start + 1, end + 1)
            if len < min_prefix_len or len == Infinity
                len = 0
            # c.log "add group", start, end, len
            groups.push [start, end, len]

        # The start index for the current prefix group
        start = 0
        i = 1
        # Effective prefix length: the minimum since start
        eff_len = prefix_lens[0]
        while i < prefix_lens.length
            len = prefix_lens[i]
            prev_len = prefix_lens[i - 1]
            if eff_len == 0 or prev_len < eff_len
                eff_len = prev_len
            # c.log "_make_groups", i, values[i], len, prev_len, eff_len
            if len < min_prefix_len
                # If the common prefix between this and the previous
                # item is shorter than min_prefix_len, add a group
                # ending in the previous item.
                # c.log "_make_groups len < min_prefix_len"
                _add_group start, i - 1
                start = i
                eff_len = len
            else if prev_len < min_prefix_len
                # Do nothing if the previous prefix length was below
                # the minimum: a new group will begin from it.
                # c.log "_make_groups prev_len < min_prefix_len"
            else if len < eff_len
                # If the common prefix between this and the previosu
                # item is shorter than the minimum since start, (try
                # to) calculate if it would save more space to have
                # this length since start or to begin a new group here.
                # c.log "_make_groups len < eff_len", (i - start) * eff_len - group_overhead, (i - start + 1) * len, i, start, eff_len, len
                # FIXME: The following condition is a bit hacky (found
                # by trial and error) and may not always produce
                # optimal results.
                if (i - start) * eff_len - group_overhead >
                        (i - start + 1) * len
                    # Better to begin a new group here, so end the
                    # current group to the previous item.
                    # c.log "_make_groups len < eff_len: add group"
                    _add_group start, i - 1
                    start = i
                    eff_len = len
            else if len > eff_len
                # If the common prefix between this and the previous
                # item is longer than the minimum since start, (try
                # to) calculate if it would save more space to end the
                # current group to the item before the previous one or
                # to include the previous item to the current group
                # with the current effective prefix length by checking
                # the following items that have a common prefix len of
                # at least as long as the current prefix len.
                # FIXME: The following condition is a bit hacky (found
                # by trial and error) and slowish and may not always
                # produce optimal results.
                j = i + 1
                while j < prefix_lens.length and prefix_lens[j] >= len and
                        ((j - start) * eff_len >=
                        (j - i + 1) * len - group_overhead)
                    j += 1
                # c.log "_make_groups len > eff_len", (j - start) * eff_len, (j - i + 1) * len - group_overhead, i, j, start, eff_len, len
                if (j - start) * eff_len < (j - i + 1) * len - group_overhead
                    # Better to begin a new group from the previous
                    # item, so end the current group to the item
                    # before that.
                    # c.log "_make_groups len > eff_len: add group"
                    _add_group start, i - 2
                    start = i - 1
                    eff_len = len
            i += 1
        # Add the remaining group
        _add_group start, prefix_lens.length - 1
        return groups

    # Generate a list of grouped values based on the original values
    # and their groupinng in groups.
    _make_elems = (values, groups) ->
        result = []
        for group in groups
            [start, end, prefix_len] = group
            if prefix_len == 0
                for i in [start .. end]
                    result.push values[i]
            else
                result.push(values[start].substring(0, prefix_len) +
                            "(" + values[start].substring(prefix_len))
                if end - start > 1
                    for i in [start + 1 .. end - 1]
                        result.push(values[i].substring(prefix_len))
                result.push(values[end].substring(prefix_len) + ")")
        return result

    # c.log "encodeListParam call", values
    if typeof values == "string" or values instanceof String
        values_str = values
        values = values.split(",")
    else
        values_str = values.join(",")
    if not settings.encodeListParams
        return values_str
    # Use a cached value if one exists, since recomputing it would
    # take time.
    if values_str of util.encoded_list_param_cache
        return util.encoded_list_param_cache[values_str]
    # The length of the prefix common with the previous item
    prefix_lens = []
    for value, i in values
        if i == 0
            prefix_lens.push(0)
        else
            prefix_lens.push(_calc_common_prefix_len(values[i - 1], value))
    groups = _make_groups(prefix_lens)
    # c.log "encodeListParam", values, prefix_lens, groups
    return _make_elems(values, groups).join(output_sep)

# Sort, uniquify and encode a list-valued parameter value for
# korp.cgi. (Does not preserve the original order.)

util.encodeListParamUniq = (values, output_sep = ".") ->
    return util.encodeListParam _.sortBy _.uniq(values), output_sep

# Decode the list-valued parameter str_list with common prefixes
# extracted into an array.

util.decodeListParam = (str_list) ->
    if not str_list
        return []
    values = str_list.split /[,.]/
    if not settings.encodeListParams
        return values
    result = []
    prefix = ""
    for elem in values
        match = /^([^()]*)([()])?(.*)$/.exec elem
        [_, pref, sep, suff] = match
        suff ?= ""
        if sep == "("
            prefix = pref
            result.push(prefix + suff)
        else if sep == ')'
            result.push(prefix + pref)
            prefix = ""
        else
            result.push(prefix + pref)
    return result

# Test functions for encodeListParam.
# TODO: Convert to # real unit tests for some testing framework.

# Return true if encoding a single string or array values and if a
# round-trip encoding and decoding produces the same result.

util.test_encodeListParam = (values) ->
    if $.isArray values
        values = values.join ","
    ec = util.encodeListParam values
    dc = (util.decodeListParam ec).join ","
    success = (dc == values)
    c.log "encodeListParam", values, "=>", ec, "=>", dc, "|",
        if success then "success" else "FAIL"
    return success

# Return true if all the values in values_list are encoded (and
# decoded) successfully.

util.test_encodeListParams = (values_list) ->
    success = true
    for values in values_list
        success = success and util.test_encodeListParam values
    return success

# Check some test cases.

util.testsuite_EncodeList = () ->
    util.test_encodeListParams [
        "foobar",
        "foo,bar",
        "foo,fbar",
        "lam_antr,lam_ahla,foobar",
        "foo,bar,baz,zoo",
        "lam_antr,lam_ahla,lam_kosk,lam_kell",
        "lam_antr,lam_ahla,lam_x,lam_y",
        "lam_antr,lam_ahla,lam_atestipiste_x,lam_atestipiste_y",
        "lam_antr,lam_ahla,lam_atestipiste_x,lam_atestipiste_y,lam_atestipiste_z",
        "lam_antr,lam_ahla,lam_xtestipiste_x,lam_xtestipiste_y",
        "lam_xtestipiste_x,lam_xtestipiste_y,lam_antr,lam_ahla",
        "lam_antr,lam_ahla,lam_x,lam_y,lam_ypsilon",
        "ftb2,ftb3_ep,ftb3_ja",
        "ftb3x_ep,ftb3x_ja,ftb2",
        "ftb3x_ep,ftb2,ftb3x_ja",
        "ftb2,ftb3x_ep,ftb3x_ja",
        "ftb3xx_ep,ftb3xx_ja,ftb2",
        "ftb2,ftb3xx_ep,ftb3xx_ja",
        "ftb3xx_ep,ftb2,ftb3xx_ja",
        "ethesis_ma_ai,ethesis_ma_bio,ethesis_ma_el,ethesis_ma_far,ethesis_phd_bio,ethesis_phd_el",
        "klk_fi_1991,klk_fi_1989,klk_fi_1988,klk_fi_1987,klk_fi_1986,klk_fi_1985,klk_fi_1984,klk_fi_1983,klk_fi_1982,klk_fi_1981,klk_fi_1980,klk_fi_1979",
        "s24,s24_1,s24,s24_2,s24",
    ]


# Functions related to compressing and decompressing the frontend URL
# hash for Shibboleth login and logout URL parameters. (Jyrki Niemi
# 2017-20-19)
#
# TODO: Also use prefix compression (util.encodeListParam,
# util.decodeListParam) for the "corpus" parameter to get slightly
# shorter compressed parameters.


# Replace the hash parameters (following "#?") of href with a single
# parameter "gz", whose value contains the original parameters
# compressed (with zlib) and Base64-encoded, if the length of the
# parameter list exceeds 2000 characters (or opts.min_length). If href
# is undefined, use window.location.href.

util.compressUrlHashParams = (href = null, opts = null) ->
    [fixed, params] = util.splitUrlOnHash(href)
    min_length = opts?.min_length or 2000
    if fixed.length + params.length < min_length
        return fixed + "#?" + params
    compressed = fixed + "#?gz=" + util.compressBase64(params)
    c.log "compressUrlHashParams", fixed + "#?" + params, "=>", compressed
    return compressed

# If href contains the hash parameter "gz", Base64-decode it,
# decompress and replace gz with the result. If href is undefined, use
# window.lcoation.href. Possible other hash parameters are kept
# instact.

util.decompressUrlHashParams = (href = null) ->
    [fixed, params] = util.splitUrlOnHash(href)
    if not /(^|&)gz=/.test(params)
        return href or window.location.href
    paramlist = params.split("&")
    for param, paramnum in paramlist
        if _.str.startsWith(param, "gz=")
            paramlist[paramnum] = util.decompressBase64(param.slice(3))
    uncompressed = fixed + "#?" + paramlist.join("&")
    c.log "decompressUrlHashParams", fixed + "?#" + params, "=>", uncompressed
    return uncompressed

# If the current URL (window.location.href) contains the compressed
# hash parameter gz, replace it with its decompressed value and use
# the uncompressed URL.

util.decompressActiveUrlHashParams = () ->
    new_href = util.decompressUrlHashParams()
    if new_href != window.location.href
        window.location.replace(new_href)
    return

# Compress str (with pako zlib), encode it in URI-safe Base64 and
# return it as a string. Parameter opts is passed to
# util.b64EncodeBytesUrlSafe.

util.compressBase64 = (str, opts) ->
    util.b64EncodeBytesUrlSafe(pako.deflate(str), opts)

# Decode URI-safe Base64-encoded string str, decompress it and return
# as a string.

util.decompressBase64 = (str) ->
    pako.inflate(util.b64DecodeBytesUrlSafe(str), {to: "string"})

# Split href on "#?" and return it as an array of the first and last
# part. If href is not specified, split window.location.href.

util.splitUrlOnHash = (href = null) ->
    href ?= window.location.href
    comps = href.split("#?")
    fixed = comps[0]
    params = comps[1..].join("#?")
    return [fixed, params]

# Base64-encode the byte array bytes and return the encoded string.
# Strip padding unless opts.keep_padding is true.
#
# This approach is somewhat simpler than operating with strings (see
# https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem)
# but is it faster?

util.b64EncodeBytesUrlSafe = (bytes, opts) ->
    # Array.prototype.slice.call is needed to convert a Uint8Array to
    # a plain Array, so that map also returns a plain Array (from
    # https://stackoverflow.com/a/12760681).
    result = (btoa(Array.prototype.slice.call(bytes)
                   .map((b) -> String.fromCharCode(b))
                   .join(""))
              .replace(/\+/g, "-").replace(/\//g, "_"))
    if not opts?.keep_padding
        result.replace(/=/g, "")
    else
        result

# Base64-decode the string str and return the result as a byte array.

util.b64DecodeBytesUrlSafe = (str) ->
    atob(str.replace(/-/g, "+").replace(/_/g, "/"))
    .split('')
    .map((c) -> c.charCodeAt(0))


# Compress the backend query parameters in data (by default excluding
# "command") to a single parameter "params_z" containing the
# parameters as a zlib-compressed Base64-encoded URI-encoded string.
# Return an object containing params_z and (by default) command.
# Parameters are compressed only if settings.compressBackendParams is
# true and if the length of the parameter "corpus" (or "set1_corpus"
# and "set2_corpus" together) exceeds a limit; otherwise the parameter
# data is returned as is. Options in opts override
# settings.compressBackendParamsOpts. (Jyrki Niemi 2018-02-02)

util.compressQueryParams = (data, opts) ->
    if not settings.compressBackendParams or
            not (data.corpus? or data.set1_corpus?)
        return data
    opts = $.extend({}, settings.compressBackendParamsOpts, opts)
    # Only the length of the corpus parameter is tested, since testing
    # the length of the whole parameter list would require calling
    # $.param (or similar) anyway, which this avoids for shorter
    # parameter lists.
    min_length = opts.corpus_min_length or 2000
    if ((data.corpus or "").length + (data.set1_corpus or "").length +
            (data.set2_corpus or "").length) < min_length
        return data
    params = $.param(data)
    if data.command? and not opts.compressed_command
        # Keep the "command" parameter uncompressed so that it is
        # easier to see which URL corresponds to what command in the
        # browser's developer tools. The whole result is (typically)
        # only two bytes longer than when also compressing "command".
        base_params = command: data.command
        params = params.replace(/command=.+?(&|$)/, "")
    else
        base_params = {}
    return $.extend(
            base_params,
            # Python's Base64-decoding in the backend requires padding
            params_z: util.compressBase64(params, keep_padding: true))


# Functions for modifying settings.corpora, settings.corporafolders
# and related data based on actually available corpora. (Jyrki Niemi
# 2017-12-13)


# Initialize window.availableCorpora; return a $.Deferred object.

util.initAvailableCorpora = () ->
    handle_type = settings.handleUnavailableCorpora or "none"
    if handle_type == "none" or handle_type == "fatal"
        window.availableCorpora = null
        return null
    # Modelled after window.initLocales; is that appropriate? (Jyrki
    # Niemi)
    defs = []
    window.availableCorpora = []
    def = $.Deferred()
    defs.push $.ajax
        url: settings.cgi_script
        data: "command=info"
        success: (data) ->
            window.availableCorpora =
                corp.toLowerCase() for corp in data["corpora"]
    $.when.apply($, defs).then () ->
        def.resolve window.availableCorpora
    return def

# Remove properties that do not correspond to any existing corpus from
# the object corpora (of the kind of settings.corpora), unless
# settings.handleUnavailableCorpora is "none" or "fatal". If some
# properties were removed, report the removal on the console based on
# the value of settings.handleUnavailableCorpora.

util.removeUnavailableCorpora = (corpora) ->
    handle_type = settings.handleUnavailableCorpora or "none"
    if handle_type == "none" or handle_type == "fatal" or
            not window.availableCorpora?
        return
    removed_corpora = util.filterListedCorpora(
            window.availableCorpora, remove_listed = false, corpora)
    if removed_corpora.length > 0
        message = "Unavailable corpora removed from configuration: "
        msg_funcs =
            warn: c.warn
            error: c.error
            log: c.log
        (msg_funcs[handle_type] or c.log)(message, removed_corpora)
    return

# Recursively remove the corpora folders in folder that contain no
# corpora (or folders) that are in corpora_settings (default:
# settings.corpora). Returns true if folder is empty.

util.removeEmptyCorporafolders = (
        folder, corpora_settings = settings.corpora) ->
    empty = true
    if "contents" of folder
        new_contents = []
        for corpname in folder.contents
            if corpname of corpora_settings
                new_contents.push corpname
        if new_contents.length == 0
            delete folder.contents
        else
            folder.contents = new_contents
            empty = false
    for own prop of folder
        if not (prop of settings.corporafolder_properties)
            if util.removeEmptyCorporafolders folder[prop]
                delete folder[prop]
            else
                empty = false
    return empty

# Filter corpora_settings (default: settings.corpora) by corpus ids in
# filter_list. By default, remove properties (corpora) whose names are
# not in filter_list, but if remove_listed is true, remove corpora
# whose names *are* in filter_list. After that, remove corpora folders
# in folder_settings (default: settings.corporafolders) that would be
# empty after removing the corpora.

util.filterListedCorpora = (
        filter_list, remove_listed = false,
        corpora_settings = settings.corpora,
        folder_settings = settings.corporafolders) ->
    corpora_to_remove = util.filterListed(
        _.keys(corpora_settings), filter_list, remove_listed)
    for corpus in corpora_to_remove
        delete corpora_settings[corpus]
    util.removeEmptyCorporafolders folder_settings, corpora_settings
    return corpora_to_remove

# Return values in base_list that are also in filter_list, except if
# keep_listed is false, in which case return values in base_list that
# are not in filter_list.

util.filterListed = (base_list, filter_list, keep_listed = true) ->
    operation = if keep_listed then _.intersection else _.difference
    return operation base_list, filter_list

# Remove from settings.preselected_corpora corpora not in
# settings.corpora and corpus folders not in settings.corporafolders.

util.adjustPreselectedCorpora = () ->

    folderExists = (folder, subfolders) ->
        return (folder and
                (subfolders.length == 0 or
                 folderExists(folder[subfolders[0]], subfolders.slice(1))))

    adjusted = []

    check_item = (item, type, exists_func) ->
        if exists_func item
            adjusted.push item
        else
            c.log "Removed unavailable #{type} #{item} from settings.preselected_corpora"

    for item in settings.preselected_corpora
        if /^__/.test item
            check_item item, "corpus folder", (folder_path) ->
                folderExists(settings.corporafolders,
                             folder_path.substring(2).split("."))
        else
            check_item item, "corpus", (item) -> item of settings.corpora
    settings.preselected_corpora = adjusted
    return


# Check if the contents property of folder (default:
# settings.corporafolders) or any of its subfolders (recursively)
# refers to a corpus without a configuration in corpora (default:
# settings.corpora). For each such unconfigured corpus, call
# missing_func (default: console.error) with a message argument.
# (Jyrki Niemi 2017-12-13)

util.checkCorporafolderContents = (
        folder_path = "settings.corporafolders",
        corpora = settings.corpora,
        folder = settings.corporafolders,
        missing_func = c.error) ->
    for corpname in (folder.contents or [])
        if not (corpname of corpora)
            missing_func(
                "#{folder_path}.contents refers to corpus #{corpname}" +
                " with no configuration")
    for own prop of folder
        if not (prop of settings.corporafolder_properties)
            util.checkCorporafolderContents(
                    "#{folder_path}.#{prop}", corpora, folder[prop],
                    missing_func)
    return


# Make info items for the "loginfo" parameter passed to the backend.
# This information describes the state of the Korp frontend, to be
# written to the backend log: currently the interface language and
# search mode. (Jyrki Niemi 2017-12-14)

util.makeLogInfoItems = () ->
    items = []
    search_tab_names =
        "0": "simple"
        "1": "ext"
        "2": "adv"
        "3": "comp"
    items.push("lang=" + (search().lang or settings.defaultLanguage))
    items.push("search=" + search_tab_names[search().search_tab or "0"])
    return items


# The code below could perhaps be a basis for a simple plugin facility
# for processing (modifying) corpus settings and the information in
# the corpus (and corpus folder) info box. (Jyrki Niemi 2018-07-05/06)


# Generic functions for plugin functions

# Plugin functions object: each property corresponds to a type of
# plugin function and its value is an array of functions of the type.
util.pluginFunctions = {}

# Add (register) plugin functions funcs of type; funcs may be either a
# single function or an array of functions.
# TODO: Should we perhaps also register plugin function types, to
# avoid registering plugins with incorrectly written types?

util.addPluginFunction = (type, funcs) ->
    if not (type of util.pluginFunctions)
        util.pluginFunctions[type] = []
    if not _.isArray(funcs)
        funcs = [funcs]
    util.pluginFunctions[type] = util.pluginFunctions[type].concat(funcs)

# Add plugin functions of possibly multiple types: types_funcs is an
# object whose properties are plugin function types and property
# values are functions or arrays of functions to be added to the
# corresponding function type.

util.addPluginFunctions = (types_funcs) ->
    for own type, funcs of types_funcs
        util.addPluginFunction type, funcs

# Call plugin functions of type in the order they are in
# util.pluginFunctions, with the (optional) arguments args...

util.callPluginFunctions = (type, args...) ->
    # c.log "callPluginFunctions", type, args...
    if type of util.pluginFunctions
        for func in util.pluginFunctions[type]
            func args...
    return

# Call plugin functions of type in the order they are in
# util.pluginFunctions, with the argument arg1 and optional rest...
# Each plugin function gets as its arg1 the return value of the
# previous function, and this function returns the value returned by
# the last plugin function.

util.callPluginFunctionsValued = (type, arg1, rest...) ->
    # c.log "callPluginFunctions", type, arg1, rest...
    if type of util.pluginFunctions
        for func in util.pluginFunctions[type]
            arg1 = func arg1, rest...
    return arg1


# "Plugin" functions for adding labels, such as "beta", to corpora,
# based on the "labels" property of the corpus (folder) configuration.
# (Jyrki Niemi 2018-07-05)

# Modify the corpus (folder) configuration config by appending each
# label specified in the "labels" property (an array of strings) to
# the corpus title in parentheses. If
# settings.corpus_label_texts[label] is defined, use it instead of the
# bare label.

util.addCorpusTitleLabel = (config) ->
    for label in (config.labels or config.info?.labels or [])
        label_text = settings.corpus_label_texts?[label] or label
        config.title += " (#{label_text})"
    return

# If the corpus (or folder) configuration config contains a "labels"
# property, append to the description text descr the localized text in
# corpuslabel_descr_<label> for each label. This is intended to work
# for the description in the corpus (folder) info box, because of
# using localization.

util.addCorpusInfoDescrLabel = (descr, config) ->
    for label in (config.labels or config.info?.labels or [])
        # Angular.js localization does not seem to work here. Why?
        descr += ((if descr then "<br/><br/>" else "") +
            "<span rel=\"localize[corpuslabel_descr_#{label}]\">#{label}</span>")
    return descr

# Add the function to the appropriate plugin function lists.
util.addPluginFunctions
    CorpusSettingsProcessor: util.addCorpusTitleLabel
    CorpusFolderProcessor: util.addCorpusTitleLabel
    CorpusInfoDescrProcessor: util.addCorpusInfoDescrLabel
