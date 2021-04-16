
// Plugin shibboleth_auth
//
// Callback methods for implementing authentication and authorization
// via Shibboleth.
//
// This in effect replaces the modal login dialogue with redirecting
// to a Shibboleth login page and intercepting the results of the
// backend /authenticate. The backend needs to have the shibauth
// plugin enabled.
//
// This is a reimplementation of Martin Matthiesen's Shibboleth
// authentication and authorization code by Jyrki Niemi.


console.log("plugin shibboleth_auth")


// Plugin class

class ShibbolethAuth {

    // Initialize object
    constructor () {
        // The AngularJS scope for header controller
        this._headerScope = null
        // Username as retrieved from authentication (is this needed?)
        this._username = null
    }

    // Callback methods called at hook points

    // Before loading the actual application, reset credentials if the
    // session is new. Credentials are saved in jStorage, which is not
    // reset between sessions. However, we wish to reset
    // Shibboleth-based credentials, so delete them if sessionStorage
    // item "sessionReset" is not set. data.jStorage refers to the
    // jStorage object.
    beforeLoadApp (data) {
        if (! sessionStorage.getItem("sessionReset")) {
            c.log("New session: deleting creds")
            data.jStorage.deleteKey("creds")
            sessionStorage.setItem("sessionReset", true)
        }
    }

    // Modify location: if location contains URL search parameter
    // saved_params, retrieve the fragment (hash) from a
    // sessionStorage item korp_params_KEY where KEY is the value of
    // saved_params, and delete saved_params. This facility is used to
    // pass the Shibboleth login and logout page the fragment
    // information without the risk of creating a too long URI.
    modifyLocation (location) {
        // c.log("shibauth.modifyLocation", location)
        const searchParams = new URLSearchParams(location.search)
        const savedParamsKey = searchParams.get("saved_params")
        if (savedParamsKey) {
            // c.log("modifyLocation: saved_params = ", savedParamsKey)
            const storageKey = "korp_params_" + savedParamsKey
            const savedParams = sessionStorage.getItem(storageKey)
            sessionStorage.removeItem(storageKey)
            window.location.hash = savedParams
            searchParams.delete("saved_params")
            window.location.search = searchParams.toString()
            // c.log("searchParams =", searchParams.toString())
        }
    }

    // Instead of showing the login modal, redirect to a Shibboleth
    // login URL, saving URI fragment with shib_logged_in=true added.
    beforeShowLogin () {
        // c.log("shibauth.beforeShowLogin")
        // For some reason (asynchronicity?), the login modal flashes
        // before the redirection takes place, so hide the Korp page
        // first.
        $("body").hide()
        this._redirectSaveParams(settings.getShibbolethLoginURL,
                                 "shib_logged_in=true")
    }

    // After making Korp recognize logout, redirect to a Shibboleth
    // logout URL.
    finishLogout () {
        // c.log("shibauth.finishLogout")
        this._redirectSaveParams(settings.getShibbolethLogoutURL)
    }

    // Add username from authData to loginObj and to this._username.
    filterLoginInfo (loginObj, authData) {
        // c.log("shibauth.filterLoginInfo", loginObj, authData)
        loginObj.name = this._username = authData.username
        return loginObj
    }

    // After a successful authentication request, set scope.username
    // to authData.username.
    onAuthRequestDone (authData, scope) {
        safeApply(scope, () => {
            scope.username = authData.username
        })
    }

    // Save the scope of the header controller to this._headerScope,
    // so that the methods onDomReady and _processShibbolethLogin can
    // access it. (Does not actually modify the controller.)
    modifyHeaderController (scope) {
        // c.log("shibauth.modifyHeaderController", scope)
        this._headerScope = scope
    }

    // When the DOM is ready, check if a Shibboleth login has been
    // performed.
    onDomReady (data) {
        // c.log("shibauth.domReady")
        this._processShibbolethLogin(this._headerScope)
    }

    // Internal methods

    // Save the current URI fragment and redirect to another URL
    //
    // Save the URI fragment (hash), with possible extraParams
    // appended, to sessionStorage key with korp_params_ + timestamp
    // and redirect to the URL returned by getURLFunc, called with the
    // current URI encoded, with fragment removed and URI search
    // parameter saved_params added with the timestamp as the value.
    _redirectSaveParams (getURLFunc, extraParams = "") {
        const paramId = Date.now().toString()
        const searchParams = new URLSearchParams(location.search)
        let hash = location.hash
        hash += (hash && extraParams ? "&" : "") + extraParams
        sessionStorage.setItem("korp_params_" + paramId, hash)
        searchParams.set("saved_params", paramId)
        const url = (location.origin + location.pathname +
                     "?" + searchParams.toString())
        location.replace(getURLFunc(encodeURIComponent(url)))
    }

    // If the search parameter contains "shib_logged_in", call
    // scope.loginSubmit with dummy user and password, and remove the
    // parameter shib_logged_in. scope should be the header controller
    // scope.
    _processShibbolethLogin (scope) {
        // c.log("shibauth._processShibbolethLogin", scope)
        if (locationSearch().shib_logged_in) {
            c.log("shib_logged_in")
            scope.loginSubmit("dummyuser", "dummypass", true)
            locationSearch("shib_logged_in", null)
        }
    }

};


// Register the plugin
plugins.register(new ShibbolethAuth())
