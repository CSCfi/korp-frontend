
# window.searchProxy = new model.SearchProxy()
window.authenticationProxy = new model.AuthenticationProxy()
window.timeProxy = new model.TimeProxy()
creds = $.jStorage.get("creds")
console.log "creds (0)", creds
if creds
    authenticationProxy.loginObj = creds

# rewriting old url format to the angular one
if(location.hash.length && location.hash[1] != "?")
    location.hash = "#?" + _.str.lstrip(location.hash, "#")

t = $.now()

isDev = window.location.host is "localhost"
# deferred_load = $.get("markup/searchbar.html")
$.ajaxSetup
    dataType: "json"
    traditional: true

$.ajaxPrefilter "json", (options, orig, jqXHR) ->
    "jsonp" if options.crossDomain and not $.support.cors

# If using a short URL, execute the corresponding function
util.applyShortUrlConfig()

deferred_domReady = $.Deferred((dfd) ->
    $ ->
        mode = $.deparam.querystring().mode
        if mode? and mode isnt "default"
            $.getScript("modes/#{mode}_mode.js").done () ->
                # If using a short URL, execute the corresponding
                # function for mode-specific configuration
                util.applyShortUrlConfig()
                dfd.resolve()
            .error (jqxhr, settings, exception) ->
                c.error "Mode file parsing error: ", exception
        else
            dfd.resolve()



    return dfd
).promise()

loc_dfd = initLocales()
$(document).keyup (event) ->
    if event.keyCode == 27
        kwicResults?.abort()
        lemgramResults?.abort()
        statsResults?.abort()

$.when(loc_dfd, deferred_domReady).then ((loc_data) ->
    c.log "preloading done, t = ", $.now() - t

    # Map possible corpus id aliases to actual corpus ids in the URL hash
    # parameter "corpus". (Jyrki Niemi 2015-04-23)
    util.mapHashCorpusAliases()

    util.addDefaultTranslations()

    # These need to be before calling util.checkTryingRestrictedCorpora
    util.initCorpusSettingsLogicalCorpora()
    util.initCorpusSettingsLicenceCategory()

    angular.bootstrap(document, ['korpApp'])

    try
        corpus = search()["corpus"]
        if corpus
            # Save the corpora in the URL to url_corpora, because the
            # non-accessible corpora will be removed from the URL (and
            # unselected) before checking if the user tried to access
            # restricted corpora.
            url_corpora = corpus.split(",")
            settings.corpusListing.select url_corpora
        view.updateSearchHistory()
    catch e
        c.warn "ERROR setting corpora from location:", e


    $("body").addClass "lab" if isLab

    $("body").addClass "mode-" + currentMode
    util.browserWarn()


    $("#logo").click ->
        window.location = window.location.protocol + "//" + window.location.host + window.location.pathname + location.search
        false


    #TODO: why do i have to do this?
    $("#cog_menu .follow_link").click ->
        window.href = window.open($(this).attr("href"), $(this).attr("target") or "_self")

    $("#search_history").change (event) ->
        c.log "select", $(this).find(":selected")
        target = $(this).find(":selected")
        if _.str.contains target.val(), "http://"
            location.href = target.val()
        else if target.is(".clear")
            c.log "empty searches"
            $.jStorage.set("searches", [])
            view.updateSearchHistory()

    # reset creds if new session --matthies 2014-01-14
    if not sessionStorage.getItem("newSession")
        c.log "new session; creds to be deleted:", creds
        sessionStorage.setItem("newSession", true)
        $.jStorage.deleteKey("creds")
        c.log "delete creds"

    creds = $.jStorage.get("creds")
    # for some reason this matches after login after browser start, but not later. --matthies 28.11.13
    if creds
        util.setLogin()
    #     authenticationProxy.loginObj = creds
    c.log "creds", creds

    tab_a_selector = "ul .ui-tabs-anchor"


    $("#log_out").click ->
        $.each authenticationProxy.loginObj.credentials, (i, item) ->
            $(".boxdiv[data=#{item.toLowerCase()}]").addClass "disabled"

        authenticationProxy.loginObj = {}
        $.jStorage.deleteKey "creds"
        $("body").toggleClass "logged_in not_logged_in"
        $("#pass").val ""
        $("#corpusbox").corpusChooser "redraw"

    # Use Basic authentication if not specified explicitly
    settings.authenticationType ?= "basic"
    settings.authenticationType = settings.authenticationType.toLowerCase()
    # Modify the login (and logout) link according to authentication type
    # (janiemi 2014-01-13)
    switch settings.authenticationType
        when "shibboleth"
            # Change the href of login link to the one specified in config.js
            util.makeShibbolethLink(
                "#login", "shibbolethLoginUrl",
                (elem, href) -> elem.find("a").attr("href", href)
            )
            # Add an 'a' element to the logout link, href specified in
            # config.js, restricted corpora removed from the URL parameter
            # "corpus"
            util.makeShibbolethLink(
                "#log_out", "shibbolethLogoutUrl",
                (elem, href) -> elem.wrapInner("<a href='#{href}'></a>"),
                (href) => util.url_remove_corpora(
                    href, settings.corpusListing.getRestrictedCorpora())
            )
        when "basic"
            # Invoke JavaScript code from the login link
            for login_elem in ["#login", "#resCorporaLogin"]
                $(login_elem).find("a").attr("href", "javascript:")
        else
            # Otherwise no authentication, so hide the login link
            $("#login").css("display", "none")

    prevFragment = {}
    window.onHashChange = (event, isInit) ->
        c.log "onHashChange"
        hasChanged = (key) ->
            prevFragment[key] isnt search()[key]
        if hasChanged("lang")
            newLang = search().lang || settings.defaultLanguage
            $("body").scope().lang = newLang
            window.lang = newLang
            # loc_dfd = util.initLocalize()
            # loc_dfd.done ->
            util.localize()

            $("#languages").radioList "select", newLang

        display = search().display

        if isInit
            util.localize()

        prevFragment = _.extend {}, search()


    $(window).scroll ->
        $("#sidebar").sidebar "updatePlacement"


    #setup about link
    $("#about").click ->
        unless search().display?
            search display: "about"
        else
            search "about", null

    if settings.authenticationType != "shibboleth"
        $("#login").click ->
            unless search().display?
                search display: "login"
            else
                search "login", null

    else if search().shib_logged_in?
        # Shibboleth deals with username and password on the IdP-server side. Therefore I ripped out the login window
        # Note that this code is called *after* successful login via Shibboleth. -- matthies 28.11.13

        # We don't have a username/password, so I just call it with dummy values:
        authenticationProxy.makeRequest("dummyuser", "dummypass").done((data) ->
            if $("body").hasClass("not_logged_in")
                # for some reason the first login after browser start is caught further up (see my comment there)
                # and with the user from the previous browser session(!)
                # So if setLogin has been called already, we toggle and call it again. -- matthies 28.11.13
                util.setLogin()
            else
                $("body").toggleClass("logged_in not_logged_in")
                util.setLogin()

            # After Shibboleth login, if the URL parameter "corpus"
            # still contains corpora that the user is not allowed to
            # access, show the restricted corpora modal with the
            # option of applying for access rights.
            util.checkTryingRestrictedCorpora(url_corpora)
            search "shib_logged_in", null
        ).fail ->
            c.log "login fail"

    # If not logged in with Shibboleth, check if the user is trying to
    # access restricted corpora and show the restricted corpora modal
    # if needed.
    if not search().shib_logged_in?
        util.checkTryingRestrictedCorpora(url_corpora)

    $("#languages").radioList(
        change: ->
            c.log "lang change", $(this).radioList("getSelected").data("mode")
            search lang: $(this).radioList("getSelected").data("mode")
        # TODO: this does nothing?
        selected: settings.defaultLanguage


    )
    $("#sidebar").sidebar() #.sidebar "hide"
    # $("#simple_text")[0].focus()
    $(document).click ->
        $("#simple_text.ui-autocomplete-input").autocomplete "close"

    util.initCorpusSettingsFeatures()
    util.initCorpusSettingsLinkAttrs()
    util.initCorpusSettingsSyntheticAttrs()
    util.initCorpusSettingsAttrDisplayOrder()

    # FIXME: view.initSearchOptions should probably be executed only
    # after the corpora are set after a login, to ensure that
    # initSearchOptions gets options from all the selected corpora.
    # How to ensure that? (Jyrki Niemi 2017-01-26)
    setTimeout(() ->
        view.initSearchOptions()
        onHashChange null, true
    , 0)
    # Hide the "Loading..." message (Jyrki Niemi 2015-04-23)
    $("#loading-msg").animate
        opacity: 0
    , ->
        $(this).hide()
    $("#main").animate
        opacity: 1
    , ->
        $(this).css "opacity", ""

    # initTimeGraph()
    return
), ->
    c.log "failed to load some resource at startup.", arguments
    $("body").css(
        opacity: 1
        padding: 20
    ).html('<object class="korp_fail" type="image/svg+xml" data="img/korp_fail.svg">')
    .append "<p>The server failed to respond, please try again later.</p>"




window.getAllCorporaInFolders = (lastLevel, folderOrCorpus) ->
    outCorpora = []

    # Go down the alley to the last subfolder
    while "." in folderOrCorpus
        posOfPeriod = _.indexOf folderOrCorpus, "."
        leftPart = folderOrCorpus.substr(0, posOfPeriod)
        rightPart = folderOrCorpus.substr(posOfPeriod + 1)
        if lastLevel[leftPart]
            lastLevel = lastLevel[leftPart]
            folderOrCorpus = rightPart
        else
            break
    if lastLevel[folderOrCorpus]

        # Folder
        # Continue to go through any subfolders
        $.each lastLevel[folderOrCorpus], (key, val) ->
            outCorpora = outCorpora.concat getAllCorporaInFolders(lastLevel[folderOrCorpus], key) if key not in ["title", "contents", "description", "info"]


        # And add the corpora in this folder level
        outCorpora = outCorpora.concat lastLevel[folderOrCorpus]["contents"]
    else

        # Corpus
        outCorpora.push folderOrCorpus
    outCorpora




window.initTimeGraph = (def) ->
    timestruct = null
    all_timestruct = null
    restdata = null
    restyear = null
    hasRest = false

    onTimeGraphChange = () ->

    getValByDate = (date, struct) ->
        output = null
        $.each struct, (i, item) ->
            if date is item[0]
                output = item[1]
                false

        return output

    window.timeDeferred = timeProxy.makeRequest()
        .fail (error) ->
            $("#time_graph").html("<i>Could not draw graph due to a backend error.</i>")
        .done ([dataByCorpus, all_timestruct, rest]) ->

            for corpus, struct of dataByCorpus
                if corpus isnt "time"
                    cor = settings.corpora[corpus.toLowerCase()]
                    # Handle cases in which the settings do not
                    # contain all corpora for which the time
                    # information has been retrieved (for example, if
                    # some corpora have been disabled by a short URL
                    # configuration). FIXME: Retrieve time data only
                    # for the enabled corpora, so that the time graph
                    # would show data only for the enabled corpora.
                    # (Jyrki Niemi 2016-05-09)
                    if not cor
                        continue
                    timeProxy.expandTimeStruct struct
                    cor.non_time = struct[""]
                    struct = _.omit struct, ""
                    cor.time = struct
                    if _.keys(struct).length > 1
                        cor.common_attributes ?= {}
                        cor.common_attributes.date_interval = true

            safeApply $("body").scope(), (scope) ->
                scope.$broadcast("corpuschooserchange", corpusChooserInstance.corpusChooser("selectedItems"));
                def.resolve()


            onTimeGraphChange = (evt, data) ->
                # the 46 here is the presumed value of
                # the height of the graph
                one_px = max / 46

                normalize = (array) ->
                    _.map array, (item) ->
                        out = [].concat(item)
                        out[1] = one_px if out[1] < one_px and out[1] > 0
                        out

                output = _(settings.corpusListing.selected)
                    .pluck("time")
                    .filter(Boolean)
                    .map(_.pairs)
                    .flatten(true)
                    .reduce((memo, [a, b]) ->
                        if typeof memo[a] is "undefined"
                            memo[a] = b
                        else
                            memo[a] += b
                        memo
                    , {})

                max = _.reduce(all_timestruct, (accu, item) ->
                    return item[1] if item[1] > accu
                    return accu
                , 0)



                timestruct = timeProxy.compilePlotArray(output)
                endyear = all_timestruct.slice(-1)[0][0]
                yeardiff = endyear - all_timestruct[0][0]
                restyear = endyear + (yeardiff / 25)
                restdata = _(settings.corpusListing.selected)
                    .filter((item) ->
                        item.time
                    ).reduce((accu, corp) ->
                        accu + parseInt(corp.non_time or "0")
                    , 0)

                hasRest = yeardiff > 0

                plots = [
                    data: normalize([].concat(all_timestruct, [[restyear, rest]]))
                    bars:
                        fillColor: "lightgrey"
                ,
                    data: normalize(timestruct)
                    bars:
                        fillColor: "navy"
                ]
                if restdata
                    plots.push
                        data: normalize([[restyear, restdata]])
                        bars:
                            fillColor: "indianred"

                plot = $.plot($("#time_graph"), plots,
                    bars:
                        show: true
                        fill: 1
                        align: "center"

                    grid:
                        hoverable: true
                        borderColor: "white"

                    yaxis:
                        show: false

                    xaxis:
                        show: true
                        tickDecimals: 0

                    hoverable: true
                    colors: ["lightgrey", "navy"]
                )
                $.each $("#time_graph .tickLabel"), ->
                    $(this).hide() if parseInt($(this).text()) > new Date().getFullYear()



            $("#time_graph,#rest_time_graph").bind "plothover", _.throttle((event, pos, item) ->
                if item
                    date = item.datapoint[0]
                    header = $("<h4>")
                    if date is restyear && hasRest
                        header.text util.getLocaleString("corpselector_rest_time")
                        val = restdata
                        total = rest
                    else
                        header.text util.getLocaleString("corpselector_time") + " " + item.datapoint[0]
                        val = getValByDate(date, timestruct)
                        total = getValByDate(date, all_timestruct)

                    pTmpl = _.template("<p><span rel='localize[<%= loc %>]'></span>: <%= num %> <span rel='localize[corpselector_tokens]' </p>")
                    firstrow = pTmpl(
                        loc: "corpselector_time_chosen"
                        num: util.prettyNumbers(val or 0)
                    )
                    secondrow = pTmpl(
                        loc: "corpselector_of_total"
                        num: util.prettyNumbers(total)
                    )
                    time = item.datapoint[0]
                    $(".corpusInfoSpace").css top: $(this).parent().offset().top
                    $(".corpusInfoSpace").find("p").empty()
                    .append(header, "<span> </span>", firstrow, secondrow)
                    .localize().end()
                    .fadeIn "fast"
                else
                    $(".corpusInfoSpace").fadeOut "fast"
            , 100)

    opendfd = $.Deferred()
    $("#corpusbox").one "corpuschooseropen", ->
        opendfd.resolve()

    $.when(timeDeferred, opendfd).then ->
        $("#corpusbox").bind "corpuschooserchange", onTimeGraphChange
        onTimeGraphChange()
