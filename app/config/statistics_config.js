var statisticsFormatting = {}

// KLUDGE: A list of the names of positional attributes with an
// underscore, so that they will not be handled as structural
// attributes. It would be better to generate the list dynamically
// based on corpora, but it would be slightly more complicated as
// statistics_config.js is loaded before config.js and util.js. Maybe
// we could compute it on the first invocation of isPosAttr and save
// the value. (Jyrki Niemi 2017-10-27)
statisticsFormatting.posAttrNamesWithUnderscore =
    /^((word|lemma|pos|msd|dephead|deprel|ref)_.*|(clean|other|sketchy)_note)$/;

// Test if attrname is a positional attribute.
statisticsFormatting.isPosAttr = function (attrname) {
    return (attrname.indexOf("_") == -1
	    || attrname.match(statisticsFormatting.posAttrNamesWithUnderscore));
};

// A function to make a group value for grouping values in the
// statistics result.
//
// Apparently, the corresponding inline code was originally intended
// to remove the final colon and digits from lemma, saldo and lemgram
// values in the Swedish corpora tagged with Språkbanken's corpus
// pipeline. However, that is too broad for Kielipankki's corpora
// having annotations with colons, so this function makes the grouping
// value configurable. The function should be overridden in the
// Swedish mode. (Jyrki Niemi 2018-10-04)
//
// NOTE: The corresponding code has been changed in Korp 7.0.0.
statisticsFormatting.makeGroupingValue = function (value) {
    // The original code by Språkbanken:
    return value.replace(/(:.+?)(\/|$| )/g, "$2");
}

statisticsFormatting.getCqp = function(types, hitValue, ignoreCase) {
    var tokenLists = statisticsFormatting.splitHitValue(hitValue);

    var totalQuery = []

    // create one query part for each token
    for(var tokenIdx = 0; tokenIdx < tokenLists[0][0].length; tokenIdx++) {

        var andParts = []
        // for each reduce attribute: create a query part and then join all with &
        for(var typeIdx = 0; typeIdx < types.length; typeIdx++) {
            var type = types[typeIdx];
            var elems = _.map(tokenLists, function(tokenList) {
                return tokenList[typeIdx][tokenIdx];
            });
            andParts.push(statisticsFormatting.reduceCqp(
		type, _.unique(elems), ignoreCase,
		statisticsFormatting.isPosAttr(type)));
        }
        totalQuery.push("[" + andParts.join(" & ") + "]");
    }
    return totalQuery.join(" ");
}

// Get the cqp (part of) expression for linking in the statistics table
// input type [{type:?,value:? }]
statisticsFormatting.reduceCqp = function(type, tokens, ignoreCase, isPosAttr) {

    // Make a CQP expression testing for "value" in attribute "type"
    // that may have either simple or feature-set values (depending on
    // corpus).
    function make_opt_featset_cond(type, value) {
	return $.format('%s="%s" | %s contains "%s"',
			[type, value, type, value]);
    }

    if(!tokens) {
        return "";
    }
    switch(type) {
        case "saldo":
        case "prefix":
        case "suffix":
        case "lex":
        case "lemma":
        case "sense":
            if(tokens[0] == "|")
                return "ambiguity(" + type + ") = 0";
            else
                var res;
                if(tokens.length > 1) {
                    var key = tokens[0].split(":")[0];
                    
                    var variants = []
                    _.map(tokens, function(val) {
                        parts = val.split(":")
                        if(variants.length == 0) {
                            for(var idx = 0; idx < parts.length - 1; idx++)
                                variants.push([]);
                        }
                        for(var idx = 1; idx < parts.length; idx++)
                            variants[idx - 1].push(regescape(parts[idx]));
                    });

                    variants = _.map(variants, function(variant) {
                        return ":(" + variant.join("|") + ")"
                    });
                    
                    res = key + variants.join("")
                }
                else {
                    res = regescape(tokens[0]);
                }
                // Assume simple values (instead of feature-set
                // values) for lemmas in other modes than "swedish"
                // and thus use the operator = instead of contains. In
                // the Swedish mode, MULCOLD uses simple values
                // whereas the others use feature-set values, so allow
                // both. (Jyrki Niemi 2015-12-04, 2018-01-31)
                if (type == "lemma" && window.currentMode == "swedish") {
                    return make_opt_featset_cond(type, res);
                } else {
                    return $.format('%s="%s"', [type, res]);
                }
        case "word":
            s = 'word="'+ regescape(tokens[0]) + '"';
            if(ignoreCase)
                s = s + ' %c'
            return s
        case "pos":
        case "pos_major":
            var escaped_val = regescape(tokens[0]);
            if (window.currentMode != "other_languages") {
                return $.format('%s="%s"', [type, escaped_val]);
            } else {
                // Currently, the BYU corpora have feature-set values
                // for pos and pos_major, whereas the others have
                // single values, so test for both, even if it is
                // slower. FIXME: To avoid special-casing by mode and
                // attribute here, we might precompute attributes
                // which have feature-set or simple values (or either)
                // based on the currently selected corpora, but where
                // should that be done and how could we access the
                // information here? The information should be updated
                // whenever the set of selected corpora changes.
                // (Jyrki Niemi 2018-01-31)
                return make_opt_featset_cond(type, escaped_val);
            }
        case "deprel":
        case "msd":
            return $.format('%s="%s"', [type, regescape(tokens[0])]);
        default: // structural and "non-standard" positional attributes
            // Prefix the name of the attribute with an underscore
            // only for structural attributes (Jyrki Niemi 2015-12-04)
            // FIXME: This does not work for attributes with
            // feature-set values.
            return $.format((isPosAttr ? '' : '_.') + '%s="%s"',
			    [type, regescape(tokens[0])]);
    }
};

statisticsFormatting.reduceStatisticsPieChart = function(row, cell, value, columnDef, dataContext) {
    if(value != "&Sigma;") {
        value = statisticsFormatting.makeGroupingValue(value[0]);
    }
    return $.format('<img id="circlediagrambutton__%s" src="img/stats2.png" class="arcDiagramPicture"/>', value);
};

statisticsFormatting.splitHitValue = function(hitValue) {
    return _.map(hitValue, function(val) {
        return _.map(val.split('/'), function(as) {
            return as.split(" ");
        });
    });
};

statisticsFormatting.reduceStatistics = function(types, ignoreCase, corpora) {

    return function(row, cell, value, columnDef, dataContext) {

        if(value == "&Sigma;")
            return "&Sigma;";

        var tokenLists = statisticsFormatting.splitHitValue(value);

        var typeIdx = types.indexOf(columnDef.id);
        var linkInnerHTML = statisticsFormatting.reduceStringify(columnDef.id, tokenLists[0][typeIdx], corpora);

        var output = $("<span>",
            {
            "class": "statistics-link",
            "data-row": '' + row
            }).html(linkInnerHTML).outerHTML();

        return output;
    }
};

statisticsFormatting.getTexts = function(reduceVals, hitValue, corpora) {
    function htmlToPlaintext(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }
    
    var tokenLists = statisticsFormatting.splitHitValue(hitValue);
    return _.map(reduceVals, function (reduceVal, typeIdx) {
        return htmlToPlaintext(statisticsFormatting.reduceStringify(reduceVal, tokenLists[0][typeIdx], corpora))
    });
}


// Get the html (no linking) representation of the result for the statistics table
statisticsFormatting.reduceStringify = function(type, values, corpora) {
    switch(type) {
        case "word":
        case "msd":
            return values.join(" ");
        case "pos":
            var output =  _.map(values, function(token) {
                return $("<span>")
                .localeKey("pos_" + token)
                .outerHTML()
            }).join(" ");
            return output;
        case "saldo":
        case "prefix":
        case "suffix":
        case "lex":
        case "lemma":
        case "sense":

            if(type == "saldo" || type == "sense")
                stringify = util.saldoToString
            else if(type == "lemma")
                stringify = function(lemma) {return lemma.replace(/_/g, " ")}
            else
                stringify = util.lemgramToString

            var html = _.map(values, function(token) {
                if(token == "|")
                    return "–";
                return stringify(token.replace(/:.*/g, ""), true);
            });

            return html.join(" ")

        case "deprel":
            var output =  _.map(values, function(token) {
                return $("<span>")
                .localeKey("deprel_" + token)
                .outerHTML()
            }).join(" ");
            return output;
        default: // structural and "non-standard" positional attributes
            var cl = settings.corpusListing.subsetFactory(corpora)
            // Also handle "non-standard" positional attributes (Jyrki
            // Niemi 2015-12-04, 2017-10-27)
            if (statisticsFormatting.isPosAttr(type)) {
                attrObj = cl.getCurrentAttributes()[type];
            } else {
                attrObj = cl.getStructAttrs()[type];
            }
            var prefix = ""
            if(!_.isUndefined(attrObj) && attrObj.translationKey )
                prefix = attrObj.translationKey
            var mapped = _.map(values, function (value) {
                if(value === "" && prefix === "") {
                    return "-";
                // Språkbanken's Korp requires an English translation
                // for the localization to be used, but that is not
                // appropriate for Kielipankki's Korp. However, would
                // it be better to use the bare value instead of the
                // translation key if a translation in the active
                // language is missing? (Jyrki Niemi 2017-11-01)
                // } else if(loc_data["en"][prefix + value]) {
                //     return util.getLocaleString(prefix + value);
                } else {
                    return util.getLocaleString(prefix + value) || value;
                }
            });
            return mapped.join(" ");
    }

};
