
// Plugin shibboleth_auth: default configuration
//
// Default configuration for settings.getShibbolethLoginURL and
// settings.getShibbolethLogoutURL, used only if they have not yet
// been defined


// settings.getShibbolehtLoginURL: Function returning a URL for
// Shibboleth login page; the argument encodedURL is a URL-encoded
// URL to return to.
if (! settings.getShibbolethLoginURL) {
    settings.getShibbolethLoginURL = encodedURL =>
        "/shibboleth-ds/index.html?" + encodedURL
}

// settings.getShibbolehtLogoutURL: Function returning a URL for
// Shibboleth logout page; the argument encodedURL is a URL-encoded
// URL to return to.
if (! settings.getShibbolethLogoutURL) {
    settings.getShibbolethLogoutURL = encodedURL =>
        "/Shibboleth.sso/Logout?return=" + encodedURL
}
