korpApp = angular.module("korpApp")


korpApp.controller "SearchCtrl", ($scope, $location, utils, searches) ->
    $scope.visibleTabs = [true, true, true, true]
    $scope.extendedTmpl = "views/extended_tmpl.html"
    # for parallel mode
    searches.langDef.resolve()
    $scope.isCompareSelected = false


    $scope.$watch( (() -> $location.search().search_tab),
        (val) ->
            $scope.isCompareSelected = val == 3
    )

    $scope.$watch (() -> $location.search().word_pic), (val) ->
        $scope.word_pic = Boolean(val)

    $scope.$watch "word_pic", (val) ->
        $location.search("word_pic", Boolean(val) or null)

    $scope.$watch (() -> $location.search().show_map), (val) ->
        $scope.show_map = Boolean(val)

    $scope.$watch "show_map", (val) ->
        $location.search("show_map", Boolean(val) or null)

    $scope.settings = settings
    $scope.showStats = () ->
        return settings.statistics != false

    # $scope.getWithins was copied from "ExtendedSearch", so that it
    # can also be used in "AdvancedCtrl" (Jyrki Niemi 2015-09-24)
    $scope.getWithins = () ->
        union = settings.corpusListing.getWithinKeys()
        output = _.map union, (item) -> {value : item}
        return output


korpApp.controller "SimpleCtrl", ($scope, utils, $location, backend, $rootScope, searches, compareSearches, $modal) ->
    s = $scope

    # Simple prequery, prequery within and prequery attribute
    s.simple_prequery = ""
    s.prequery_within_opts = [
        "sentence"
        "paragraph"
        "text"
    ]
    s.prequery_within = s.prequery_within_opts[0]
    s.prequery_attr_opts = [
        # Word attribute name, localization key
        ["lemma", "baseforms"]
        ["word", "wordforms"]
    ]
    # s.prequery_attr = s.prequery_attr_opts[0][0]
    s.prequery_attr = "lemma|word"

    s.$on "popover_submit", (event, name) ->
        cqp = s.instance.getCQP()
        compareSearches.saveSearch {
            label : name or cqp
            cqp : cqp
            corpora : settings.corpusListing.getSelectedCorpora()
        }

    # Set the value of simple_prequery based on the URL parameter
    # simple_prequery
    s.$watch( (() -> $location.search().simple_prequery),
        (val) -> s.simple_prequery = val
    )

    s.stringifyRelatedHeader = (wd) ->
        wd.replace(/_/g, " ")

    s.stringifyRelated = (wd) ->
        util.saldoToString(wd)

    modalInstance = null
    s.clickRelated = (wd) ->
        modalInstance?.close()
        c.log "modalInstance", modalInstance
        $scope.$root.searchtabs()[1].select()
        s.$root.$broadcast "extended_set", "[saldo contains '#{wd}']"
        $location.search("search", "cqp|" + "[saldo contains '#{wd}']")

    s.relatedDefault = 3
    s.clickX = () ->
        modalInstance.dismiss()

    s.showAllRelated = () ->
        modalInstance = $modal.open(
            template: """
            <div class="modal-header">
                <h3 class="modal-title">{{'similar_header' | loc:lang}} (SWE-FN)</h3>
                <span ng-click="clickX()" class="close-x">×</span>
            </div>
            <div class="modal-body">
                <div ng-repeat="obj in relatedObj" class="col"><a target="_blank" ng-href="http://spraakbanken.gu.se/karp/#?lexicon=swefn&amp;search=extended||and|sense|equals|swefn--{{obj.label}}" class="header">{{stringifyRelatedHeader(obj.label)}}</a>
                  <div class="list_wrapper">
                      <ul>
                        <li ng-repeat="wd in obj.words"> <a ng-click="clickRelated(wd)" class="link">{{stringifyRelated(wd) + " "}}</a></li>
                      </ul>
                  </div>
                </div>
            </div>
            """
            scope : s
            size : 'lg'
            windowClass : "related"
        )

    s.searches = searches
    s.$watch "searches.activeSearch", (search) =>
        # if search.type in ["word", "lemgram"]
        c.log "search", search
        unless search then return
        page = Number($location.search().page) or 0
        c.log "activesearch", search
        s.relatedObj = null

        # Set URL parameters based on simple prequery variables
        if s.simple_prequery
            $location.search("simple_prequery", s.simple_prequery)
            $location.search("prequery_within", s.prequery_within)
            # $location.search("prequery_attr", s.prequery_attr)

        if search.type == "word"
            $("#simple_text input").val(search.val) # Necessary for displaying the wordform if it came from the URL
            s.simple_text = search.val
            cqp = simpleSearch.getCQP(search.val)
            c.log "simple search cqp", cqp
            if search.pageOnly
                searches.kwicRequest(cqp, true)
                return
            else
                searches.kwicSearch(cqp)
            # simpleSearch.makeLemgramSelect() if settings.lemgramSelect
            if settings.wordpicture != false and s.word_pic and " " not in search.val
                lemgramResults.makeRequest(search.val, "word")
                # lemgramProxy.makeRequest(search.val, "word", $.proxy(lemgramResults.onProgress, lemgramResults));
            else
                lemgramResults.resetView()

        else if search.type == "lemgram"
            s.placeholder = search.val
            s.simple_text = ""
            # cqp = "[lex contains '#{search.val}']"
            cqp = simpleSearch.getCQP()
            # Add possible prequery CQPs
            if s.simple_prequery
                # c.log("lemgram simple_prequery", cqp, s.simple_prequery)
                cqps = simpleSearch.makePrequeryCQPs(s.simple_prequery)
                cqps.push(cqp)
                # c.log("cqps", cqps)
                cqp = util.combineCQPs(cqps)
                c.log("searches.activeSearch prequeries cqp", cqp)
            # # Related-word search does not currently work for Finnish,
            # # so commented out. It would be nice if it could be
            # # language- or corpus-specific. (Jyrki Niemi 2015-04-14)
            # backend.relatedWordSearch(search.val).then (data) ->
            #     s.relatedObj = data
            
            if s.word_pic
                searches.lemgramSearch(search.val, s.prefix, s.suffix, search.pageOnly)
            else
                searches.kwicSearch(cqp, search.pageOnly)

        else
            s.placeholder = null
            s.simple_text = ""
            lemgramResults?.resetView()


    s.lemgramToString = (lemgram) ->
        unless lemgram then return
        util.lemgramToString(lemgram).replace(/<.*?>/g, "")

    utils.setupHash s, [
            key : "prefix"
        ,
            key : "suffix"
        ,
            key : "isCaseInsensitive"
        ,
            key : "prequery_within"
        # ,
        #     key : "prequery_attr"
    ]

    $scope.$on "btn_submit", () ->
        $location.search "within", null


korpApp.controller "ExtendedSearch", ($scope, utils, $location, backend, $rootScope, searches, compareSearches, $timeout) ->
    s = $scope
    s.$on "popover_submit", (event, name) ->
        compareSearches.saveSearch {
            label : name or $rootScope.extendedCQP
            cqp : $rootScope.extendedCQP
            corpora : settings.corpusListing.getSelectedCorpora()

        }

    s.searches = searches
    s.$on "btn_submit", () ->
        c.log "extended submit"
        $location.search("search", null)
        $location.search("page", null)
        $timeout( () ->
            $location.search("search", "cqp")
            within = s.within if s.within not in _.keys settings.defaultWithin
            $location.search "within", within
        , 0)


    s.$on "extended_set", ($event, val) ->
        c.log "extended_set", val
        s.cqp = val

    if $location.search().cqp
        s.cqp = $location.search().cqp

    s.$watch "cqp", (val) ->
        c.log "cqp change", val
        unless val then return
        try
            $rootScope.extendedCQP = CQP.expandOperators(val)
            # c.log "cqp expanded ops", $rootScope.extendedCQP
            # Add the possible ignorable tokens between tokens. This
            # makes the modified version to be shown in the advanced
            # search as the extended search expression.
            # (Jyrki Niemi 2015-09-25)
            $rootScope.extendedCQP =
                util.addIgnoreCQPBetweenTokens($rootScope.extendedCQP)
            # c.log "cqp added ignore", $rootScope.extendedCQP
        catch e
            c.log "cqp parse error:", e
        $location.search("cqp", val)




    s.withins = []

    s.getWithins = () ->
        union = settings.corpusListing.getWithinKeys()
        output = _.map union, (item) -> {value : item}
        return output

    s.$on "corpuschooserchange", () ->
        s.withins = s.getWithins()
        s.within = s.withins[0]?.value


korpApp.controller "ExtendedToken", ($scope, utils, $location) ->
    s = $scope
    c.log "ExtendedToken", s
    cqp = '[]'

    s.valfilter = utils.valfilter

    s.setDefault = (or_obj) ->
        # assign the first value from the opts
        opts = s.getOpts(or_obj.type)

        unless opts
            or_obj.op = "is"
        else
            or_obj.op = _.values(opts)[0][1]


        or_obj.val = ""

    # returning new array each time kills angular, hence the memoizing
    s.getOpts = _.memoize (type) ->
        unless type of s.typeMapping then return
        confObj = s.typeMapping?[type]
        unless confObj
            c.log "confObj missing", type, s.typeMapping
            return

        confObj = _.extend {}, (confObj?.opts or settings.defaultOptions)

        if confObj.type == "set"
            confObj.is = "contains"
        
        return _.pairs confObj


    onCorpusChange = (event, selected) ->
        # TODO: respece the setting 'word_attribute_selector' and similar
        # attrs = for key, obj of settings.corpusListing.getCurrentAttributes() when obj.displayType != "hidden"
        #     _.extend({group : "word_attr", value : key}, obj)

        # sent_attrs = for key, obj of settings.corpusListing.getStructAttrs() when obj.displayType != "hidden"
        #     _.extend({group : "sentence_attr", value : key}, obj)

        c.log "onCorpusChange", selected, s.l

        lang = s.$parent.$parent?.l?.lang
        # c.log "lang", lang
        s.types = settings.corpusListing.getAttributeGroups(lang)
        # "obj | mapper:valfilter as obj.label | loc:lang group by obj.group | loc:lang for obj in types"
        # s.typeOpts = []
        # for obj in types
        #     utils.valfilter obj
        s.typeMapping = _.object _.map s.types, (item) ->
            if item.isStructAttr
                ["_." + item.value, item]
            else
                [item.value, item]


        c.log "typeMapping", s.typeMapping
        # s.types = _.sortBy s.types, "label"



    s.$on "corpuschooserchange", onCorpusChange

    onCorpusChange()


    s.removeOr = (token, and_array, i) ->
        if and_array.length > 1
            and_array.splice(i, 1)
        else if token.and_block.length > 1
            token.and_block.splice (_.indexOf token.and_block, and_array), 1


    s.addAnd = (token) ->
        # c.log "s", s, s.token,
        token.and_block.push s.addOr([])

    toggleBound = (token, bnd) ->
        unless token.bound?[bnd]
            boundObj = {}
            boundObj[bnd] = true
            token.bound = _.extend (token.bound or {}), boundObj
        else
            delete token.bound?[bnd]

    s.toggleStart = (token) ->
        toggleBound(token, "lbound")
    s.toggleEnd = (token) ->
        toggleBound(token, "rbound")

    s.toggleRepeat = (token) ->
        unless token.repeat
            token.repeat = [1,1]
        else
            delete token.repeat


    s.getTokenCqp = ->
        if not s.token.cqp
            return ""
        s.token.cqp.match(/\[(.*)]/)[1]

    s.onInsertMousedown = (event) ->
        event.stopPropagation()



korpApp.controller "AdvancedCtrl", ($scope, compareSearches, $location, $timeout) ->
    s = $scope
    expr = ""
    if $location.search().search
        [type, expr...] = $location.search().search?.split("|")
        expr = expr.join("|")

    if type == "cqp"
        $scope.cqp = expr or "[]"
    else
        $scope.cqp = "[]"

    # $scope.getSimpleCQP = () ->
    #     out = simpleSearch.getCQP()
    #     c.log "getSimpleCQP", out
    #     out

    # Show the within selection list unless settings.advanced_search_within
    # is false. (Jyrki Niemi 2015-09-24)
    s.showWithin = if settings.advanced_search_within?
                       settings.advanced_search_within
                   else
                       true
    s.within = if s.showWithin
                   $location.search().within or "sentence"
               else
                   "sentence"

    $scope.$watch () ->
        simpleSearch?.getCQP()
    , (val) ->
        $scope.simpleCQP = val

    $scope.$on "popover_submit", (event, name) ->
        compareSearches.saveSearch {
            label : name or $rootScope.extendedCQP
            cqp : $scope.cqp
            corpora : settings.corpusListing.getSelectedCorpora()

        }

    $scope.$on "btn_submit", () ->
        c.log "advanced cqp", $scope.cqp
        $location.search "search", null
        $location.search "page", null
        $location.search "within", null
        $timeout( () ->
            # Copied from "ExtendedSearch" (Jyrki Niemi 2015-09-24)
            within = s.within unless s.within in _.keys settings.defaultWithin
            $location.search("within", within or null)
            $location.search "search", "cqp|" + $scope.cqp
        , 0)

    if s.showWithin
        # Copied from "ExtendedSearch" (Jyrki Niemi 2015-09-24)
        s.withins = []
        s.$on "corpuschooserchange", () ->
            s.withins = s.getWithins()


korpApp.filter "mapper", () ->
    return (item, f) ->
        return f(item)




korpApp.controller "CompareSearchCtrl", ($scope, utils, $location, backend, $rootScope, compareSearches) ->
    s = $scope
    s.valfilter = utils.valfilter

    # compareSearches.saveSearch {
    #     label : "frihet"
    #     cqp : "[lex contains 'frihet..nn.1']"
    #     corpora : ["VIVILL"]
    # }
    # compareSearches.saveSearch {
    #     label : "jämlikhet"
    #     cqp : "[lex contains 'jämlikhet..nn.1']"
    #     corpora : ["VIVILL"]
    # }

    s.savedSearches = compareSearches.savedSearches
    s.$watch "savedSearches.length", () ->
        s.cmp1 = compareSearches.savedSearches[0]
        s.cmp2 = compareSearches.savedSearches[1]
        unless s.cmp1 and s.cmp2 then return
        listing = settings.corpusListing.subsetFactory(_.uniq ([].concat s.cmp1.corpora, s.cmp2.corpora))
        s.currentAttrs = listing.getAttributeGroups()

    
    s.reduce = 'word'
    s.currentAttrs = []

    s.sendCompare = () ->
        ## todo backend supports multiple reduce parameters
        $rootScope.compareTabs.push backend.requestCompare(s.cmp1, s.cmp2, [s.reduce])

    s.deleteCompares = () ->
        compareSearches.flush()





korpApp.filter "loc", ($rootScope) ->
    (translationKey, lang) ->
        return util.getLocaleString translationKey, lang

