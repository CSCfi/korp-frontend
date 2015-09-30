korpApp = angular.module("korpApp")

korpApp.controller "resultContainerCtrl", ($scope, searches, $location) ->
    $scope.searches = searches

korpApp.controller "kwicCtrl", class KwicCtrl
    setupHash : () ->
        c.log "setupHash", @scope.$id
        @utils.setupHash @scope, [
            key : "page"
            post_change : () =>
                c.log "post_change page hash", @scope.page
                @scope.pageObj.pager = (@scope.page or 0) + 1
                c.log "@scope.pageObj.pager", @scope.pageObj.pager
            val_in : Number
        ]
    initPage : () ->
        # @scope.pager = Number(@location.search().page) + 1 or 1
        c.log "initPage", @location.search().page
        @scope.pageObj =
            pager: Number(@location.search().page) + 1 or 1
        @scope.page = @scope.pageObj.pager - 1


    @$inject: ['$scope', "utils", "$location"]
    constructor: (@scope, @utils, @location) ->
        s = @scope
        $scope = @scope
        c.log "kwicCtrl init", $scope.$parent
        $location = @location

        s.active = true

        s.onexit = () ->
            c.log "onexit"
            s.$root.sidebar_visible = false

        punctArray = [",", ".", ";", ":", "!", "?", "..."]

        @initPage()

        s.$watch "pageObj.pager", (val) ->
            c.log "pageobj watch", val



        s.pageChange = ($event, page) ->
            c.log "pageChange", arguments
            $event.stopPropagation()
            s.page = page - 1



        @setupHash()
        s.onPageInput = ($event, page, numPages) ->
            if $event.keyCode == 13
                if page > numPages then page = numPages
                s.pageObj.pager = page
                s.page = Number(page) - 1

        readingChange = () ->
            c.log "reading change"

            if s.instance?.getProxy().pendingRequests.length
                window.pending = s.instance.getProxy().pendingRequests

                $.when(s.instance.getProxy().pendingRequests...).then () ->
                    c.log "readingchange makeRequest"
                    s.instance.makeRequest()

        s.setupReadingHash = () =>
            @utils.setupHash s, [
                key : "reading_mode",
                post_change : (isReading) =>
                    c.log "change reading mode", isReading
                    readingChange()
            ]

        s.setupReadingWatch = _.once () ->
            c.log "setupReadingWatch"
            init = true
            s.$watch "reading_mode", () ->
                if not init
                    readingChange()
                init = false



        s.toggleReading = () ->
            s.reading_mode = not s.reading_mode
            s.instance.centerScrollbar()

        s.hitspictureClick = (pageNumber) ->
            c.log "pageNumber", pageNumber
            s.page = Number(pageNumber)

        massageData = (sentenceArray) ->
            currentStruct = []
            prevCorpus = ""
            output = []
            isOpen = false
            for sentence, i in sentenceArray
                [matchSentenceStart, matchSentenceEnd] = findMatchSentence sentence
                {start, end} = sentence.match

                for j in [0...sentence.tokens.length]
                    wd = sentence.tokens[j]
                    if start <= j < end
                        _.extend wd, {_match : true}
                    if matchSentenceStart < j < matchSentenceEnd
                        _.extend wd, {_matchSentence : true}
                    if wd.word in punctArray
                        _.extend wd, {_punct : true}
                    if wd.structs?.open
                        wd._open = wd.structs.open
                        currentStruct = [].concat(currentStruct, wd.structs.open)
                        # c.log "currentStruct open", currentStruct
                        isOpen = true
                    else if isOpen and wd.structs?.close
                        wd._close = wd.structs.close
                        currentStruct = _.without currentStruct, wd.structs.close...
                        # c.log "currentStruct close", currentStruct, wd.structs.close

                    if isOpen
                        _.extend wd, {_struct : currentStruct} if currentStruct.length


                    if wd.structs?.close
                        currentStruct = []
                        isOpen = false


                if currentMode == "parallel"
                    mainCorpusId = sentence.corpus.split("|")[0].toLowerCase()
                    linkCorpusId = sentence.corpus.split("|")[1].toLowerCase()
                else
                    mainCorpusId = sentence.corpus.toLowerCase()

                id = (linkCorpusId or mainCorpusId)

                if prevCorpus != id
                    corpus = settings.corpora[id]
                    newSent = {newCorpus : corpus.title, noContext : _.keys(corpus.context).length == 1}
                    output.push newSent

                if i % 2 == 0
                    sentence._color = settings.primaryColor
                else
                    sentence._color = settings.primaryLight

                sentence.corpus = mainCorpusId

                output.push(sentence)
                if sentence.aligned
                    [corpus_aligned, tokens] = _.pairs(sentence.aligned)[0]
                    output.push
                        tokens : tokens
                        isLinked : true
                        corpus : corpus_aligned
                        _color : sentence._color


                prevCorpus = id

                # return sentence
            return output

        findMatchSentence = (sentence) ->
            span = []
            {start, end} = sentence.match
            decr = start
            incr = end
            while decr >= 0
                if "sentence" in (sentence.tokens[decr--].structs?.open or [])
                    span[0] = decr
                    break
            while incr < sentence.tokens.length
                if "sentence" in (sentence.tokens[incr++].structs?.close or [])
                    span[1] = incr
                    break

            return span





        s.kwic = []
        s.contextKwic = []
        s.setContextData = (data) ->
            s.contextKwic = massageData data.kwic

        s.setKwicData = (data) ->
            s.kwic = massageData(data.kwic)

        c.log "selectionManager"
        s.selectionManager = new util.SelectionManager()

        s.selectLeft = (sentence) ->
            if not sentence.match then return
            # c.log "left", sentence.tokens.slice 0, sentence.match.start
            sentence.tokens.slice 0, sentence.match.start

        s.selectMatch = (sentence) ->
            if not sentence.match then return
            from = sentence.match.start
            sentence.tokens.slice from, sentence.match.end

        s.selectRight = (sentence) ->
            if not sentence.match then return
            from = sentence.match.end
            len = sentence.tokens.length
            sentence.tokens.slice from, len


korpApp.controller "ExampleCtrl", class ExampleCtrl extends KwicCtrl
    @$inject: ['$scope', "utils", "$location"]
    constructor: (@scope, utils, $location) ->
        super(@scope, utils, $location)
        s = @scope

        s.pageChange = ($event, page) ->
            $event.stopPropagation()
            s.instance.current_page = page
            s.instance.makeRequest()


    initPage : () ->
        @scope.pageObj =
            pager : 0
        @scope.page = 0
    setupHash : () ->

korpApp.controller "StatsResultCtrl", ($scope, utils, $location, backend, searches, $rootScope) ->
    s = $scope

    s.onGraphShow = (data) ->
        c.log "show graph!", arguments
        $rootScope.graphTabs.push data




korpApp.controller "wordpicCtrl", ($scope, $location, utils, searches) ->
    $scope.word_pic = $location.search().word_pic?
    $scope.$watch (() -> $location.search().word_pic), (val) ->
        $scope.word_pic = Boolean(val)

    $scope.activate = () ->
        $location.search("word_pic", true)
        search = searches.activeSearch
        $scope.instance.makeRequest(search.val, search.type)


korpApp.controller "graphCtrl", ($scope) ->
    s = $scope
    s.active = true

    s.mode = "line"

    s.isGraph = () -> s.mode in ["line", "bar"]
    s.isTable = () -> s.mode == "table"

    # s.$watch "mode", (mode) ->
    #     c.log "mode", mode

    #     switch mode
    #         when "bar"
    #             safeApply s, () ->
    #                 s.instance.setBarMode()



korpApp.controller "compareCtrl", ($scope, $rootScope) ->
    s = $scope
    s.loading = true
    s.active = true



    s.promise.then ([data, cmp1, cmp2, reduce], xhr) ->
        s.loading = false
        if data.ERROR
            s.error = true
            return

        pairs = _.pairs data.loglike
        s.tables = _.groupBy  (pairs), ([word, val]) ->
            if val > 0 then "positive" else "negative"

        s.tables.negative = _.map s.tables.negative, ([word, val]) ->
            [word, val, data.set1[word]]
        s.tables.positive = _.map s.tables.positive, ([word, val]) ->
            [word, val, data.set2[word]]



        s.tables.positive = _.sortBy s.tables.positive, (tuple) -> tuple[1] * -1
        s.tables.negative = _.sortBy s.tables.negative, (tuple) -> (Math.abs tuple[1]) * -1
        s.reduce = reduce

        cl = settings.corpusListing.subsetFactory([].concat cmp1.corpora, cmp2.corpora)
        attributes = (_.extend {}, cl.getCurrentAttributes(), cl.getStructAttrs())
        s.stringify = attributes[_.str.strip(reduce, "_.")]?.stringify or angular.identity

        s.max = _.max pairs, ([word, val]) ->
            Math.abs val

        s.cmp1 = cmp1
        s.cmp2 = cmp2

        type = attributes[_.str.strip(reduce, "_.")]?.type

        op = if type == "set" then "contains" else "="
        cmps = [cmp1, cmp2]

        s.rowClick = (triple, cmp_index) ->
            cmp = cmps[cmp_index]

            c.log "triple", triple, cmp

            cqps = []

            for token in triple[0].split(" ")
                if type == "set" and token == "|"
                    cqps.push "[ambiguity(#{reduce}) = 0]"
                else
                    cqps.push CQP.fromObj
                        type : reduce
                        op : op
                        val : token

            cqpobj = CQP.concat cqps...

            cl = settings.corpusListing.subsetFactory cmp.corpora

            opts = {
                start : 0
                end : 24
                ajaxParams :
                    command : "query"
                    cqp : cmp.cqp
                    cqp2 : CQP.stringify cqpobj
                    corpus : cl.stringifySelected()
                    show_struct : _.keys cl.getStructAttrs()
                    expand_prequeries : false

            }
            $rootScope.kwicTabs.push opts

korpApp.controller "MapCtrl", ($scope, $rootScope, $location, $timeout, searches, nameEntitySearch, markers, geocoder) ->
    s = $scope
    s.loading = false
    s.hasResult = false


    s.$watch (() -> $location.search().result_tab), (val) ->        
        $timeout (() -> s.tabVisible = val == 1), 0 

    s.showMap = $location.search().show_map?
    s.$watch (() -> $location.search().show_map), (val) ->
        s.showMap = Boolean(val)
        if s.showMap
            currentCqp = getCqpExpr()
            currentCorpora = settings.corpusListing.stringifySelected(true)
            if currentCqp != s.lastSearch?.cqp or currentCorpora != s.lastSearch?.corpora
                s.hasResult = false

    s.activate = () ->
        $location.search("show_map", true)
        s.showMap = true
        cqpExpr = getCqpExpr()
        if cqpExpr
            nameEntitySearch.request cqpExpr

    getCqpExpr = () ->
        # TODO currently copy pasted from watch on "searches.activeSearch"
        search = searches.activeSearch
        cqpExpr = null
        if search?.type == "word"
            cqpExpr = simpleSearch.getCQP(search.val)
        else if search?.type == "lemgram"
            cqpExpr = "[lex contains '#{search.val}']"
        cqpExpr

    s.center =
      lat: 62.99515845212052
      lng: 16.69921875
      zoom: 4
    s.hoverTemplate = """<div><span>{{ 'map_name' | loc }}: </span> <span>{{name}}</span></div>
                         <div><span>{{ 'map_abs_occurrences' | loc }}: </span> <span>{{abs_occurrences}}</span></div>
                         <div><span>{{ 'map_rel_occurrences' | loc }}: </span> <span>{{rel_occurrences}}</span></div>"""
    s.markers = {}
    s.showTime = true
    
    s.$on "map_data_available", (_event, cqp, corpora) ->
        if s.showMap
            s.lastSearch = { cqp: cqp, corpora: corpora }
            s.loading = true
            updateMapData()
            s.hasResult = true
        
    updateMapData = () ->
        nameEntitySearch.promise.then (data) ->            
            if data.count != 0 
                markers(data.total.relative).then (markersResult) ->
                    mrks = markersResult.markers
                    for own key, value of mrks
                        do (key, value) ->
                            message = value.message
                            html = '<span class="link" ng-click="newKWICSearch()">' + message + '</span>'
                            
                            newScope = s.$new()
                            newScope.name = message
                            newScope.abs_occurrences = data.total.absolute[message]
                            newScope.rel_occurrences = Math.round((data.total.relative[message] + 0.00001) * 1000) / 1000 
                            newScope.newKWICSearch = () ->
                                cl = settings.corpusListing
                                                                
                                opts = {
                                    start : 0
                                    end : 24
                                    ajaxParams :
                                        command : "query"
                                        cqp : getCqpExpr()
                                        cqp2 : "[word='" + message + "' & pos='PM']"
                                        corpus : cl.stringifySelected()
                                        show_struct : _.keys cl.getStructAttrs()
                                        expand_prequeries : true                      
                                }
                                $rootScope.kwicTabs.push opts
                            
                            value.message = html
                            value.getMessageScope = () -> newScope
                            
                    s.markers = mrks
            else
                s.markers = {}
            s.loading = false
              
            
