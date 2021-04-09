settings.wordpicture = false;
settings.enableMap = false;
var start_lang = "fin";

settings.hitsPerPageDefault = 10
settings.hitsPerPageValues = [10,25,50,75,100,500,1000]

korpApp.controller("SearchCtrl", function($rootScope, $scope, $controller, $location) {
    // resolve globalFilterDef since globalFilter-directive is not used
    $rootScope.globalFilterDef.resolve()

    $controller(window.SearchCtrl, {$scope: $scope})
    $scope.visibleTabs = [false, true, false, false];
    $scope.extendedTmpl = "modes/parallel_extended_tmpl.html";

    $scope.corpusChangeListener() // remove prev listener
    $scope.$on("reduceattrupdate", function() {
        $scope.statCurrentAttrs = settings.corpusListing.getStatsAttributeGroups(settings.corpusListing.getReduceLang())
        $scope.statSelectedAttrs = $location.search().stats_reduce.split(',')
        insensitiveAttrs = $location.search().stats_reduce_insensitive
        if(insensitiveAttrs)
            $scope.statInsensitiveAttrs = insensitiveAttrs.split(',')
    });


    $scope.settings = settings
    $scope.showStatistics = true
    $scope.showStats = function() {
        return settings.statistics != false
    }
});

function parseLocationLangs() {
    try {
        var langs = _(location.hash.split("?")[1].split("&")).invoke("split", "=").object().value()["parallel_corpora"].split(",")
    } catch(e) {
        return [start_lang]
    }
    c.log("lang", langs)
    if(langs.length)
        return langs
    else
        return [start_lang]
}

korpApp.controller("ParallelSearch", function($scope, $location, $rootScope, $timeout, searches) {
    var s = $scope;
    s.negates = [];

    if($location.search().parallel_corpora)
        s.langs = _.map($location.search().parallel_corpora.split(","), function(lang) {
            var obj = {lang: lang};
            if(locationSearch()["cqp_" + lang])
                obj.cqp = locationSearch()["cqp_" + lang];
            return obj;
        })

    else
        s.langs = [{lang: "fin"}];
    s.negChange = function() {
        $location.search("search", null)
    }

    var onLangChange = function() {
        c.log("ParallelSearch language change");
        var currentLangList = _.map(s.langs, "lang");
        settings.corpusListing.setActiveLangs(currentLangList);
        $location.search("parallel_corpora", currentLangList.join(","))
        var struct = settings.corpusListing.getLinksFromLangs(currentLangList);
        function getLangMapping(excludeLangs) {
            return _(struct)
                .flatten()
                .filter(function(item) {
                    return !_.includes(excludeLangs, item.lang);
                }).groupBy("lang").value()
        }

        try {
            var output = CQP.expandOperators(s.langs[0].cqp);
        } catch(e) {
            c.log("parallel cqp parsing error", e)
            return
        }
        output += _.map(s.langs.slice(1), function(langobj, i) {
            var neg = s.negates[i + 1] ? "!" : "";
            var langMapping = getLangMapping(currentLangList.slice(0, i + 1));
            var linkedCorpus = _(langMapping[langobj.lang]).map("id").invokeMap("toUpperCase").join("|");

            try {
                var expanded = CQP.expandOperators(langobj.cqp);
            } catch(e) {
                c.log("parallel cqp parsing error", e)
                return
            }
            return ":LINKED_CORPUS:" + linkedCorpus + " " + neg + " " + expanded;
        }).join("");

        _.each(s.langs, function(langobj, i) {
            locationSearch("cqp_" + langobj.lang , langobj.cqp);
        })
        $rootScope.extendedCQP = output;
        s.$broadcast("corpuschooserchange");
        $rootScope.$broadcast("reduceattrupdate");
        searches.langDef.resolve();
        return output;
    }
    s.$watch("langs", function() {
        onLangChange()

    }, true);


    s.onSubmit = function() {
        $location.search("search", null)
        $timeout( function() {
            // $location.search("search", "cqp|" + onLangChange())
            util.searchHash("cqp", onLangChange())
            c.log ("onLangChange", onLangChange())
        }, 300) // <--
        // TODO: this is a little hacky.
        // if changed, look at ng-model-option debounce value as well
    }


    s.keydown = function($event) {
        if($event.keyCode == 13) { // enter
            // _.defer()
            var current = $(".arg_value:focus")
            c.log( "current", current)
            if(current.length) {

                $timeout(function() {
                    s.onSubmit()
                }, 0)

            }
        }
    }

    enabledLangsHelper = function(lang) {
        return _(settings.corpusListing.getLinksFromLangs([lang])).flatten().map("lang").uniq().value();
    }

    s.getEnabledLangs = function(i) {
        if(i === 0) {
            if(!s.langs[0].lang) {
                s.langs[0].lang = start_lang;
            }
            return enabledLangsHelper(start_lang);
        }
        var currentLangList = _.map(s.langs, "lang");
        delete currentLangList[i];
        var firstlang;
        if(s.langs.length)
             firstlang = s.langs[0].lang
        var other = enabledLangsHelper(firstlang || start_lang);
        var langResult = _.difference(other, currentLangList);
        if(s.langs[i] && (!s.langs[i].lang)) {
            s.langs[i].lang = langResult[0];
        }
        return langResult;
    };

    s.addLangRow = function() {
        s.langs.push({lang: s.getEnabledLangs()[0]})
    }
    s.removeLangRow = function(i) {
        s.langs.pop();
    }

});

view.KWICResults = class ParallelKwicResults extends view.KWICResults {

    selectWord(word, scope, sentence) {
        super.selectWord(word, scope, sentence)
        this.clearLinks()
        var self = this
        var obj = scope.wd

        if(!obj.linkref) return

        var corpus = settings.corpusListing.get(sentence.corpus)

        function findRef(ref, sentence) {
            var out = null
            _.each(sentence, function(word) {
                if(word.linkref == ref.toString()) {
                    out = word
                    return false
                }
            })
            return out
        }


        if(sentence.isLinked){ // a secondary language was clicked
            var sent_index = scope.$parent.$index
            // c.log ("sent_index", sent_index)
            var data = this.getActiveData()
            var mainSent = null
            while(data[sent_index]) {
                 var sent = data[sent_index]
                 if(!sent.isLinked) {
                     mainSent = sent
                     break
                 }
                sent_index--
            }

             // c.log( "mainSent", mainSent)
             var linkNum = Number(obj.linkref)
             var lang = corpus.id.split("-")[1]
             var mainCorpus = mainSent.corpus.split("-")[0]

            _.each(mainSent.tokens, function(token) {
                var refs = _.map(_.compact(token["wordlink-" + lang].split("|")), Number)
                if(_.includes(refs, linkNum)) {
                    token._link_selected = true
                    self.selected.push(token)
                }
            })

        } else {
            var links = _.pickBy(obj, function(val, key) {
                return _.startsWith(key, "wordlink")
            })
            _.each(links, function(val, key) {
                var wordsToLink = _.each(_.compact(val.split("|")), function(num) {
                    var lang = key.split("-")[1]
                    var mainCorpus = corpus.id.split("-")[0]

                    var link = findRef(num, sentence.aligned[mainCorpus + "-" + lang])
                    link._link_selected = true
                    self.selected.push(link)

                })
            })

        }
        safeApply($("body").scope(), $.noop)

    }

    clearLinks() {
        _.each(this.selected, function(word) {
            delete word._link_selected
        })
        this.selected = []
    }
}

model.StatsProxy = class ParallelStatsProxy extends model.StatsProxy {
    makeParameters(reduceVals, cqp, ignoreCase) {
        params = super.makeParameters(reduceVals, cqp, ignoreCase)


        params.within = settings.corpusListing.getAttributeQuery("within").replace(/\|.*?:/g, ":")

        return params
    }
}

// settings.primaryColor = "#7A90C3";
settings.primaryColor = "#CAD2E6";
settings.primaryLight = "#CAD2E6";

var context = {
    "defaultAligned": {
        // "1 link": "1 link"
        "1 sentence": "1 sentence"
    },
/*
    "sentenceAligned": {
        "1 sentence": "1 sentence"
    },
    "spContext": {
        "1 sentence": "1 sentence",
        "1 paragraph": "1 paragraph"
    },
*/
    "linkAligned": {
        "1 link": "1 link"
    },
    "alignAligned": {
        "1 align": "1 align"
    }
};

settings.preselectedCorpora = [
    "europarl_v7_enfi_fi",
    "mulcold_fi",
];

settings.defaultOverviewContext = "1 link";
settings.defaultReadingContext = "1 link";

settings.defaultWithin = { "sentence": "sentence" };
settings.linkWithin = { "link": "link" };

settings.corporafolders = {};

settings.corporafolders.europarl = {
    title: "HeKo-EuroParl 7",
    description: "Helsinki Korp EuroParl v7 -aineistokokoelma",
    contents: [
	"europarl_v7_enfi_fi",
	"europarl_v7_svfi_fi",
	"europarl_v7_defi_fi",
	"europarl_v7_frfi_fi",
	"europarl_v7_esfi_fi",
	"europarl_v7_etfi_fi",
    ],
    info: {
	urn: "urn:nbn:fi:lb-2015043012",
	metadata_urn: "urn:nbn:fi:lb-2015043011",
	licence: settings.licenceinfo.CC_BY,
	cite_id: "HeKo-Europarl",
    }
};

settings.corpus_aliases.europarl_v7 = "europarl_v7_.*_fi";
settings.corpus_aliases.europarl = settings.corpus_aliases.europarl_v7;

settings.corporafolders.jrc = {
    title: "HeKo-JRC-Acquis",
    description: "Helsinki Korp JRC-Acquis -aineistokokoelma",
    contents: [
	"jrc_acquis_enfi_fi",
	"jrc_acquis_svfi_fi",
	"jrc_acquis_defi_fi",
	"jrc_acquis_esfi_fi",
	"jrc_acquis_etfi_fi",
	"jrc_acquis_frfi_fi",
	"jrc_acquis_itfi_fi",
	"jrc_acquis_hufi_fi",
	"jrc_acquis_plfi_fi",
    ],
    info: {
	urn: "urn:nbn:fi:lb-2015062301",
	metadata_urn: "urn:nbn:fi:lb-2015061210",
	licence: settings.licenceinfo.CC_BY,
	cite_id: "HeKo-JRC-Acquis",
    }
};

settings.corpus_aliases.jrc_acquis = "jrc_acquis_.*fi";

settings.corporafolders.opus = {
    title: "OPUS",
    description: "OPUS – an open source parallel corpus",
    info: {
	urn: "urn:nbn:fi:lb-2016012101",
	metadata_urn: "urn:nbn:fi:lb-2015102201",
	licence: settings.licenceinfo.CC_BY_40,
	cite_id: "Opus-Korp",
    },
};

settings.corporafolders.opus.enfi = {
    title: "OPUS Finnish–English",
    contents: ['opus_opensub2011enfi_fi', 'opus_opensub2012enfi_fi',
		'opus_opensub2013enfi_fi', 'opus_opensub2015enfi_fi',
		'opus_ecb_enfi_fi', 'opus_emea_enfi_fi', 'opus_eubookshop_enfi_fi',
		'opus_dgt_enfi_fi', 'opus_tatoeba_enfi_fi', 'opus_php_enfi_fi',
		'opus_gnome_enfi_fi', 'opus_euconst_enfi_fi', 'opus_books_enfi_fi',
	       'opus_ubuntu_enfi_fi']
};

settings.corpus_aliases.opus_enfi = "opus_.*enfi_fi";
settings.corpus_aliases.opus_fien = "opus_.*enfi_fi";

settings.corporafolders.opus.firu = {
    title: "OPUS Finnish–Russian",
    contents: ['opus_opensubtitles2011_firu_fi', 'opus_opensubtitles2012_firu_fi',
		'opus_eubookshop_firu_fi', 'opus_kde4_firu_fi', 'opus_opensubtitles_firu_fi',
		'opus_tatoeba_firu_fi', 'opus_php_firu_fi',
		'opus_gnome_firu_fi',
		'opus_ubuntu_firu_fi']
};

settings.corpus_aliases.opus_firu = "opus_.*firu_fi";

settings.corporafolders.opus.fisv = {
    title: "OPUS Finnish–Swedish",
    contents: ['opus_opensubtitles2011_fisv_fi', 'opus_opensubtitles2012_fisv_fi',
		'opus_opensubtitles2013_fisv_fi', 'opus_dgt_fisv_fi',
		'opus_kde4_fisv_fi', 'opus_emea_fisv_fi', 'opus_eubookshop_fisv_fi',
		'opus_gnome_fisv_fi', 'opus_euconst_fisv_fi', 'opus_php_fisv_fi',
		'opus_ubuntu_fisv_fi', 'opus_tatoeba_fisv_fi', 'opus_opensubtitles_fisv_fi']
};

settings.corpus_aliases.opus_fisv = "opus_.*fisv_fi";

settings.corporafolders.opus.defi = {
    title: "OPUS Finnish–German",
    contents: ['opus_opensubtitles2012_defi_fi', 'opus_opensubtitles2011_defi_fi',
		'opus_opensubtitles2013_defi_fi', 'opus_eubookshop_defi_fi', 'opus_dgt_defi_fi',
		'opus_kde4_defi_fi', 'opus_emea_defi_fi', 'opus_ecb_defi_fi', 'opus_ubuntu_defi_fi',
	        'opus_gnome_defi_fi', 'opus_tatoeba_defi_fi', 'opus_opensubtitles_defi_fi',
	        'opus_php_defi_fi',  'opus_euconst_defi_fi']
};

settings.corpus_aliases.opus_defi = "opus_.*defi_fi";
settings.corpus_aliases.opus_fide = "opus_.*defi_fi";

settings.corporafolders.opus.fifr = {
    title: "OPUS Finnish–French",
    contents: ['opus_dgt_fifr_fi',
		'opus_emea_fifr_fi',
		'opus_ecb_fifr_fi',
		'opus_eubookshop_fifr_fi',
		'opus_opensubtitles2013_fifr_fi',
		'opus_opensubtitles2011_fifr_fi',
	        'opus_books_fifr_fi',
	        'opus_opensubtitles2012_fifr_fi',
	        'opus_opensubtitles_fifr_fi',
	        'opus_kde4_fifr_fi',
	        'opus_gnome_fifr_fi',
	        'opus_euconst_fifr_fi',
	        'opus_php_fifr_fi',
	        'opus_ubuntu_fifr_fi',
	        'opus_tatoeba_fifr_fi']
};

settings.corpus_aliases.opus_fifr = "opus_.*fifr_fi";

settings.corporafolders.opus.dafi = {
    title: "OPUS Finnish–Danish",
    contents: ['opus_dgt_dafi_fi',
		'opus_eubookshop_dafi_fi',
		'opus_opensubtitles2012_dafi_fi',
		'opus_opensubtitles2013_dafi_fi',
		'opus_kde4_dafi_fi',
		'opus_ecb_dafi_fi']
};

settings.corpus_aliases.opus_dafi = "opus_.*dafi_fi";
settings.corpus_aliases.opus_fida = "opus_.*dafi_fi";

settings.corporafolders.opus.fipl = {
    title: "OPUS Finnish–Polish",
    contents: ['opus_dgt_fipl_fi',
		'opus_opensubtitles2011_fipl_fi',
		'opus_opensubtitles2012_fipl_fi',
		'opus_opensubtitles2013_fipl_fi',
		'opus_emea_fipl_fi',
	       'opus_ecb_fipl_fi']
};

settings.corpus_aliases.opus_fipl = "opus_.*fipl_fi";

settings.corporafolders.opus.esfi = {
    title: "OPUS Finnish–Spanish",
    contents: ['opus_dgt_esfi_fi',
		'opus_eubookshop_esfi_fi',
		'opus_opensubtitles2012_esfi_fi',
		'opus_opensubtitles2013_esfi_fi',
                'opus_opensubtitles2011_esfi_fi',
                'opus_ecb_esfi_fi',
		'opus_emea_esfi_fi',
		'opus_euconst_esfi_fi',
		'opus_gnome_esfi_fi',
		'opus_kde4_esfi_fi',
		'opus_opensubtitles_esfi_fi',
		'opus_php_esfi_fi',
		'opus_tatoeba_esfi_fi',
		'opus_ubuntu_esfi_fi',
	       'opus_books_esfi_fi']
};

settings.corpus_aliases.opus_esfi = "opus_.*esfi_fi";
settings.corpus_aliases.opus_fies = "opus_.*esfi_fi";

settings.corporafolders.opus.fipt = {
    title: "OPUS Finnish–Portuguese",
    contents: ['opus_dgt_fipt_fi',
		'opus_eubookshop_fipt_fi',
		'opus_opensubtitles2011_fipt_fi',
		'opus_opensubtitles2013_fipt_fi',
		'opus_opensubtitles_fipt_fi',
		'opus_emea_fipt_fi',
		'opus_ecb_fipt_fi']
};

settings.corpus_aliases.opus_fipt = "opus_.*fipt_fi";

settings.corporafolders.opus.etfi = {
    title: "OPUS Finnish–Estonian",
    contents: ['opus_dgt_etfi_fi',
		'opus_emea_etfi_fi',
		'opus_kde4_etfi_fi',
		'opus_opensubtitles2012_etfi_fi',
                'opus_opensubtitles2011_etfi_fi',
		'opus_opensubtitles2013_etfi_fi']
};

settings.corpus_aliases.opus_etfi = "opus_.*etfi_fi";
settings.corpus_aliases.opus_fiet = "opus_.*etfi_fi";

settings.corporafolders.opus.fiit = {
    title: "OPUS Finnish–Italian",
    contents: ['opus_dgt_fiit_fi',
		'opus_emea_fiit_fi',
		'opus_ecb_fiit_fi',
		'opus_opensubtitles2012_fiit_fi',
		'opus_opensubtitles2011_fiit_fi',
		'opus_opensubtitles2013_fiit_fi',
		'opus_eubookshop_fiit_fi']
};

settings.corpus_aliases.opus_fiit = "opus_.*fiit_fi";

settings.corporafolders.opus.fihu = {
    title: "OPUS Finnish–Hungarian",
    contents: ['opus_dgt_fihu_fi',
		'opus_emea_fihu_fi',
		'opus_ecb_fihu_fi',
		'opus_opensubtitles2012_fihu_fi',
		'opus_opensubtitles2011_fihu_fi',
		'opus_opensubtitles2013_fihu_fi',
		'opus_eubookshop_fihu_fi',
		'opus_kde4_fihu_fi']
};

settings.corpus_aliases.opus_fihu = "opus_.*fihu_fi";

settings.corporafolders.opus.finl = {
    title: "OPUS Finnish–Dutch",
    contents: ['opus_dgt_finl_fi',
		'opus_ecb_finl_fi',
		'opus_emea_finl_fi',
		'opus_eubookshop_finl_fi',
		'opus_euconst_finl_fi',
		'opus_gnome_finl_fi',
		'opus_kde4_finl_fi',
		'opus_opensubtitles2011_finl_fi',
		'opus_opensubtitles2012_finl_fi',
		'opus_opensubtitles2013_finl_fi',
		'opus_php_finl_fi',
		'opus_tatoeba_finl_fi',
		'opus_ubuntu_finl_fi']
};

settings.corpus_aliases.opus_finl = "opus_.*finl_fi";

settings.corporafolders.opus.fitrl = {
    title: "OPUS Finnish–Turkish",
    contents: ['opus_eubookshop_fitr_fi',
		'opus_gnome_fitr_fi',
		'opus_kde4_fitr_fi',
		'opus_opensubtitles2011_fitr_fi',
		'opus_opensubtitles2012_fitr_fi',
		'opus_opensubtitles2013_fitr_fi',
		'opus_php_fitr_fi',
		'opus_opensubtitles_fitr_fi']
};

settings.corpus_aliases.opus_fitr = "opus_.*fitr_fi";

settings.corporafolders.opus.csfi = {
    title: "OPUS Finnish–Czech",
    contents: ['opus_dgt_csfi_fi',
		'opus_ecb_csfi_fi',
		'opus_emea_csfi_fi',
		'opus_eubookshop_csfi_fi',
		'opus_euconst_csfi_fi',
		'opus_gnome_csfi_fi',
		'opus_kde4_csfi_fi',
		'opus_opensubtitles2011_csfi_fi',
		'opus_opensubtitles2012_csfi_fi',
		'opus_opensubtitles2013_csfi_fi',
		'opus_php_csfi_fi',
		'opus_tatoeba_csfi_fi',
		'opus_ubuntu_csfi_fi',
	       'opus_europarl_csfi_fi']
};

settings.corpus_aliases.opus_csfi = "opus_.*csfi_fi";
settings.corpus_aliases.opus_fics = "opus_.*csfi_fi";

settings.corporafolders.opus.elfi = {
    title: "OPUS Finnish–Greek",
    contents: ['opus_dgt_elfi_fi',
		'opus_ecb_elfi_fi',
		'opus_emea_elfi_fi',
		'opus_eubookshop_elfi_fi',
		'opus_euconst_elfi_fi',
		'opus_gnome_elfi_fi',
		'opus_kde4_elfi_fi',
		'opus_opensubtitles2011_elfi_fi',
		'opus_opensubtitles2012_elfi_fi',
		'opus_opensubtitles2013_elfi_fi',
		'opus_php_elfi_fi',
		'opus_opensubtitles_elfi_fi',
		'opus_ubuntu_elfi_fi']
};

settings.corpus_aliases.opus_elfi = "opus_.*elfi_fi";
settings.corpus_aliases.opus_fiel = "opus_.*elfi_fi";


settings.corporafolders.parfin_parrus = {
    title: "ParFin, ParRus",
    contents: [
	"parfin_2016_fi",
	// "parrus_2016_fi",
	"parrus_2016_ru",
    ],
};

/*
settings.corporafolders.kfspc = {
    title: "Kotus Finnish-Swedish Parallel Corpus (KFSPC)",
    contents: ["kfspc_fi"]
};
*/

/*
settings.corporafolders.parrus = {
    title: "ParRus",
    contents: ["parrus_fi"]
};
*/

/*
settings.corporafolders.mulcold = {
    title: "MULCOLD – Multilingual Corpus of Legal Documents",
    contents: ["mulcold_fi"]
};
*/


settings.corpora = {};


var linkref = {
    label: "linkref",
    displayType: "hidden"
}
var wordlink = {
    label: "wordlink",
    displayType: "hidden"
}


/* CEAL */

settings.corporafolders.ceal = {
    title: "CEAL",
    description: "Englantilaisen ja amerikkalaisen kirjallisuuden klassikoita Kersti Juvan suomentamina, englanti–suomi-rinnakkaiskorpus<br/>Classics of English and American Literature as translated by Kersti Juva, English–Finnish parallel corpus",
	// <br/><br/><strong>Huomaa</strong>, että korpukset CEAL-o ja CEAL-s sisältävät samat tekstit, mutta CEAL-s:ssä kappaleet on sekoitettu kunkin teoksen sisällä, kun taas CEAL-o:ssa kappaleet ovat alkuperäisessä järjestyksessä. Hakuja varten kannattaa valita vain toinen korpus. CEAL-o vaatii aina henkilökohtaisen käyttöluvan."
    info: {
	metadata_urn: "urn:nbn:fi:lb-2020012801",
	iprholder: {
	    name: "Kersti Juva",
	},
    },
    contents: ["ceal_s_fi"]
};

sattrlist.ceal_common = {
    text_year: sattrs.year,
    text_author: {
	label: "author",
	displayType: "select",
	localize: false,
	opts: settings.liteOptions,
	dataset: [
	    "Jane Austen",
	    "Charles Dickens",
	    "Henry James",
	],
    },
    text_title: {
	label: "work_title",
    },
    text_translator: {
	label: "text_translator",
	// All the works in CEAL have been translated by Kersti Juva,
	// so having the translator as a search criterion would make
	// little sense. How about statistics and comparison?
	hideExtended: true,
	// hideStatistics: true,
	// hideCompare: true,
    },
};

var ceal_work_list = "Korpus sisältää seuraavat teokset Kersti Juvan käännöksinä sekä alkuperäisinä:<br/>The corpus contains the following works as translated by Kersti Juva and as original:<ul><li>Jane Austen: Ylpeys ja ennakkoluulo (Teos 2013) (Pride and Prejudice)</li><li>Charles Dickens: Kolea talo (Otava 2003) (Bleak House)</li><li>Henry James: Washingtonin aukio (Tammi 2006) (Washington Square)</li>";

settings.corpora.ceal_s_fi = {
    title: "CEAL (sekoitettu)",
    description: "Englantilaisen ja amerikkalaisen kirjallisuuden klassikoita Kersti Juvan suomentamina, englanti–suomi-rinnakkaiskorpus, sekoitetut kappaleet<br/>ceal-par-s: Classics of English and American Literature as translated by Kersti Juva, English–Finnish parallel corpus, scrambled paragraphs<br/><br/>" + ceal_work_list,
    context: context.linkAligned,
    within: settings.linkWithin,
    id: "ceal_s_fi",
    shortname: "ceal-par-s-korp",
    lang: "fin",
    urn: "urn:nbn:fi:lb-2020012802",
    metadata_urn: "urn:nbn:fi:lb-2020012801",
    licence: {
	name: "CLARIN ACA +AFFIL=EDU +NC 1.0",
	urn: "urn:nbn:fi:lb-2020012804",
    },
    cite_id: "ceal-par-s-korp",
    limitedAccess: true,
    licence_type: "ACA",
    attributes: attrlist.ud2_fi,
    structAttributes: sattrlist.ceal_common,
    linked_to: ["ceal_s_en"]
};

settings.corpora.ceal_s_en = {
    title: "CEAL (sekoitettu)",
    description: "Englantilaisen ja amerikkalaisen kirjallisuuden klassikoita Kersti Juvan suomentamina, englanti–suomi-rinnakkaiskorpus, sekoitetut kappaleet<br/>ceal-par-s: Classics of English and American Literature as translated by Kersti Juva, English–Finnish parallel corpus, scrambled paragraphs<br/><br/>" + ceal_work_list,
    context: context.linkAligned,
    within: settings.linkWithin,
    id: "ceal_s_en",
    shortname: "ceal-par-s-korp",
    lang: "eng",
    urn: "urn:nbn:fi:lb-2020012802",
    metadata_urn: "urn:nbn:fi:lb-2020012801",
    licence: {
	name: "CLARIN ACA +AFFIL=EDU +NC 1.0",
	urn: "urn:nbn:fi:lb-2020012803",
    },
    cite_id: "ceal-par-s-korp",
    limitedAccess: true,
    licence_type: "ACA",
    attributes: attrlist.ud2_en,
    structAttributes: sattrlist.ceal_common,
    linked_to: ["ceal_s_fi"],
    hide: true
};

delete ceal_work_list;


/* SEMFINLEX */

settings.corpora.semfinlex_asd_par_2018_fi = {
    id: "semfinlex_asd_par_2018_fi",
    lang: "fin",
    title : "Semfinlex: Alkuperäisiä säädöksiä (suomi–ruotsi)",
    description: "Eduskunnan alkuperäisiä säädöksiä vuosilta 1918–2018.",
    context: context.linkAligned,
    within: settings.linkWithin,
    licence : settings.licenceinfo.CC_BY,
    features: ["parsed_tdt"],
    structAttributes : {
	text_url : {
	    label : "URL",
	    type : "url",
	    url_opts : sattrs.link_url_opts
	},
	text_parl_statute_type: {
	    label: "parl_statute_type",
	    displayType: "select",
	    opts: settings.liteOptions,
	    translationKey: "parlstatutetype_",
	    dataset: [
		"laki",
		"asetus",
		"paatos",
		"ilmoitus",
		"tyojarjestys",
		"kirje",
		"luettelo",
		"kuulutus",
		"kaari",
		""
	    ]
	}
    },
    cite_id: "semfinlex-asd-par-2018-korp",
    urn: "urn:nbn:fi:lb-2019042606",
    metadata_urn: "urn:nbn:fi:lb-2019042605",
    linked_to: ["semfinlex_asd_par_2018_sv"]
}

settings.corpora.semfinlex_asd_par_2018_sv = {
    id: "semfinlex_asd_par_2018_sv",
    lang: "swe",
    title : "Semfinlex: Ursprungliga författningar (finska–svenska)",
    description: "Ett urval av ursprungliga författningar av Riksdagen från 1920–2018.",
    context: context.linkAligned,
    within: settings.linkWithin,
    licence : settings.licenceinfo.CC_BY,
    attributes : attrlist.parsed_sv,
    structAttributes : {
	text_url : {
	    label : "URL",
	    type : "url",
	    url_opts : sattrs.link_url_opts
	},
	text_parl_statute_type: {
	    label: "parl_statute_type",
	    displayType: "select",
	    opts: settings.liteOptions,
	    translationKey: "parlstatutetype_",
	    dataset: [
		"laki",
		"asetus",
		"paatos",
		"ilmoitus",
		"tyojarjestys",
		"kirje",
		"luettelo",
		"kuulutus",
		"kaari",
		""
	    ]
	}
    },
    cite_id: "semfinlex-asd-par-2018-korp",
    urn: "urn:nbn:fi:lb-2019042606",
    metadata_urn: "urn:nbn:fi:lb-2019042605",
    linked_to: ["semfinlex_asd_par_2018_fi"],
    hide: true
}

/* OPUS – Open Source Paraller Corpus */

settings.corpus_aliases.opus = "opus_.*_fi";

settings.corpora.opus_opensubtitles2011_fitr_tr = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linked_to: ["opus_opensubtitles2011_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fitr_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fitr_tr = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linked_to: ["opus_opensubtitles2012_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_fitr_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fitr_tr = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linked_to: ["opus_opensubtitles2013_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fitr_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_fitr_tr = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linked_to: ["opus_opensubtitles_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_fitr_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_fitr_tr = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linked_to: ["opus_eubookshop_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_fitr_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_fitr_tr = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linked_to: ["opus_kde4_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_fitr_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_kde4_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_fitr_tr = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linked_to: ["opus_gnome_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_fitr_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_gnome_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_fitr_tr = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_fitr_tr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "tur",
    linked_to: ["opus_php_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_fitr_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_fitr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_php_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_books_fifr_fr = {
    title: "Books",
    description: "A collection of translated literature",
    id: "opus_books_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_books_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_books_fifr_fi = {
    title: "Books",
    description: "A collection of translated literature",
    id: "opus_books_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_books_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fifr_fr = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_opensubtitles2012_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_fifr_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_fifr_fr = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_opensubtitles_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_fifr_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_fifr_fr = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_kde4_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_fifr_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_kde4_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_fifr_fr = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_gnome_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_fifr_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_gnome_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_fifr_fr = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_euconst_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_fifr_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_euconst_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_fifr_fr = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_php_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_fifr_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_php_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_fifr_fr = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_ubuntu_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_fifr_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ubuntu_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_fifr_fr = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_tatoeba_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_tatoeba_fifr_fi = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_tatoeba_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_esfi_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_esfi_es = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linked_to: ["opus_opensubtitles2011_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_esfi_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_esfi_es = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linked_to: ["opus_opensubtitles_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_esfi_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_kde4_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_esfi_es = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linked_to: ["opus_kde4_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_esfi_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_gnome_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_esfi_es = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linked_to: ["opus_gnome_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_esfi_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_euconst_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_esfi_es = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linked_to: ["opus_euconst_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_esfi_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_php_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_esfi_es = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linked_to: ["opus_php_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_esfi_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ubuntu_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_esfi_es = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linked_to: ["opus_ubuntu_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_tatoeba_esfi_fi = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_tatoeba_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_esfi_es = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linked_to: ["opus_tatoeba_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_books_esfi_fi = {
    title: "Books",
    description: "A collection of translated literature",
    id: "opus_books_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_books_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_books_esfi_es = {
    title: "Books",
    description: "A collection of translated literature",
    id: "opus_books_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linked_to: ["opus_books_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_europarl_csfi_fi = {
    title: "Europarl",
    description: "Europarl",
    id: "opus_europarl_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_europarl_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_europarl_csfi_cs = {
    title: "Europarl",
    description: "Europarl",
    id: "opus_europarl_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linked_to: ["opus_europarl_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_fisv_sv = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linked_to: ["opus_gnome_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_fisv_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_gnome_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_fisv_sv = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linked_to: ["opus_euconst_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_fisv_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_euconst_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_fisv_sv = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linked_to: ["opus_php_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_fisv_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_php_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_fisv_sv = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linked_to: ["opus_ubuntu_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_fisv_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ubuntu_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_fisv_sv = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linked_to: ["opus_tatoeba_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_tatoeba_fisv_fi = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_tatoeba_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_fisv_sv = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linked_to: ["opus_opensubtitles_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_fisv_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_elfi_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_elfi_el = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linked_to: ["opus_opensubtitles2011_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_elfi_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_elfi_el = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linked_to: ["opus_opensubtitles2012_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_elfi_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_elfi_el = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linked_to: ["opus_opensubtitles2013_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_elfi_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_elfi_el = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linked_to: ["opus_opensubtitles_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_elfi_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_elfi_el = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linked_to: ["opus_dgt_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_elfi_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_elfi_el = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linked_to: ["opus_eubookshop_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_elfi_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_emea_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_elfi_el = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linked_to: ["opus_emea_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_elfi_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ecb_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_elfi_el = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linked_to: ["opus_ecb_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_elfi_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_kde4_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_elfi_el = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linked_to: ["opus_kde4_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_elfi_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_gnome_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_elfi_el = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linked_to: ["opus_gnome_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_elfi_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_euconst_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_elfi_el = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linked_to: ["opus_euconst_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_elfi_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_elfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ubuntu_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_elfi_el = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_elfi_el",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "gre",
    linked_to: ["opus_ubuntu_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_defi_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_defi_de = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_opensubtitles_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_defi_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_gnome_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_defi_de = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_gnome_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_defi_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_euconst_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_defi_de = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_euconst_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_defi_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_php_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_defi_de = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_php_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_defi_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ubuntu_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_defi_de = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_ubuntu_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_tatoeba_defi_fi = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_tatoeba_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_defi_de = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_tatoeba_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_csfi_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_csfi_cs = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linked_to: ["opus_opensubtitles2011_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_csfi_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_csfi_cs = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linked_to: ["opus_opensubtitles2012_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_csfi_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_csfi_cs = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linked_to: ["opus_opensubtitles2013_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_csfi_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_csfi_cs = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linked_to: ["opus_dgt_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_csfi_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_csfi_cs = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linked_to: ["opus_eubookshop_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_csfi_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_emea_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_csfi_cs = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linked_to: ["opus_emea_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_csfi_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ecb_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_csfi_cs = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linked_to: ["opus_ecb_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_csfi_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_kde4_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_csfi_cs = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linked_to: ["opus_kde4_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_csfi_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_gnome_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_csfi_cs = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linked_to: ["opus_gnome_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_csfi_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_euconst_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_csfi_cs = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linked_to: ["opus_euconst_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_csfi_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_php_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_csfi_cs = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linked_to: ["opus_php_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_csfi_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_csfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ubuntu_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_csfi_cs = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_csfi_cs",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "cze",
    linked_to: ["opus_ubuntu_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_finl_nl = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linked_to: ["opus_opensubtitles2011_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_finl_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_finl_nl = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linked_to: ["opus_opensubtitles2012_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_finl_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_finl_nl = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linked_to: ["opus_opensubtitles2013_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_finl_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_finl_nl = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linked_to: ["opus_dgt_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_finl_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_finl_nl = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linked_to: ["opus_eubookshop_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_finl_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_finl_nl = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linked_to: ["opus_emea_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_finl_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_emea_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_finl_nl = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linked_to: ["opus_ecb_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_finl_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ecb_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_finl_nl = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linked_to: ["opus_kde4_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_finl_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_kde4_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_finl_nl = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linked_to: ["opus_gnome_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_finl_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_gnome_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_finl_nl = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linked_to: ["opus_euconst_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_finl_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_euconst_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_finl_nl = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linked_to: ["opus_php_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_finl_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_php_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_finl_nl = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linked_to: ["opus_ubuntu_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_finl_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ubuntu_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_finl_nl = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_finl_nl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dut",
    linked_to: ["opus_tatoeba_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_tatoeba_finl_fi = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_finl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_tatoeba_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_firu_ru = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linked_to: ["opus_opensubtitles2011_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_firu_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_firu_ru = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linked_to: ["opus_kde4_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_firu_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_kde4_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_firu_ru = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linked_to: ["opus_eubookshop_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_firu_ru = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linked_to: ["opus_opensubtitles2012_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_firu_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_firu_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_firu_ru = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linked_to: ["opus_php_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_firu_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_php_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_firu_ru = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linked_to: ["opus_opensubtitles_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_firu_fi = {
    title: "OpenSubtitles",
    description: "OpenSubtitles",
    id: "opus_opensubtitles_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_firu_ru = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linked_to: ["opus_tatoeba_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_tatoeba_firu_fi = {
    title: "Tatoeba",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_tatoeba_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_firu_ru = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linked_to: ["opus_ubuntu_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_firu_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ubuntu_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_firu_ru = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_firu_ru",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "rus",
    linked_to: ["opus_gnome_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_gnome_firu_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_firu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_gnome_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_enfi_fi = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_gnome_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_gnome_enfi_en = {
    title: "GNOME",
    description: "GNOME localization files",
    id: "opus_gnome_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "en",
    linked_to: ["opus_gnome_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_euconst_enfi_fi = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_euconst_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_euconst_enfi_en = {
    title: "EUconst",
    description: "The European constitution",
    id: "opus_euconst_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "en",
    linked_to: ["opus_euconst_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_books_enfi_fi = {
    title: "Books",
    description: "A collection of translated literature",
    id: "opus_books_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_books_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_books_enfi_en = {
    title: "Books",
    description: "A collection of translated literature",
    id: "opus_books_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "en",
    linked_to: ["opus_books_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_php_enfi_fi = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_php_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_php_enfi_en = {
    title: "PHP",
    description: "The PHP manual corpus",
    id: "opus_php_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "en",
    linked_to: ["opus_php_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ubuntu_enfi_fi = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ubuntu_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ubuntu_enfi_en = {
    title: "Ubuntu",
    description: "Ubuntu localization files",
    id: "opus_ubuntu_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "en",
    linked_to: ["opus_ubuntu_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_fihu_hu = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linked_to: ["opus_opensubtitles2012_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_fihu_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fihu_hu = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linked_to: ["opus_opensubtitles2013_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fihu_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fihu_hu = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linked_to: ["opus_opensubtitles2011_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fihu_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_fihu_hu = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linked_to: ["opus_dgt_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fihu_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_fihu_hu = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linked_to: ["opus_ecb_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_fihu_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ecb_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_fihu_hu = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linked_to: ["opus_emea_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fihu_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_emea_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_fihu_hu = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linked_to: ["opus_eubookshop_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_fihu_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_fihu_hu = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_fihu_hu",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "hun",
    linked_to: ["opus_kde4_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_fihu_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_fihu_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_kde4_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_fiit_it = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "ita",
    linked_to: ["opus_emea_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fiit_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_emea_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_fiit_it = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "ita",
    linked_to: ["opus_ecb_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_fiit_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ecb_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fiit_it = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linked_to: ["opus_opensubtitles2011_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fiit_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fiit_it = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "ita",
    linked_to: ["opus_opensubtitles2013_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fiit_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fiit_it = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "ita",
    linked_to: ["opus_opensubtitles2012_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_fiit_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_fiit_it = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "ita",
    linked_to: ["opus_eubookshop_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_fiit_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_fiit_it = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fiit_it",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "ita",
    linked_to: ["opus_dgt_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fiit_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fiit_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_fipt_pt = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linked_to: ["opus_ecb_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_fipt_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ecb_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_fipt_pt = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linked_to: ["opus_emea_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fipt_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_emea_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fipt_pt = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linked_to: ["opus_opensubtitles2011_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fipt_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fipt_pt = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linked_to: ["opus_opensubtitles2013_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fipt_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};



settings.corpora.opus_eubookshop_fipt_pt = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linked_to: ["opus_eubookshop_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_fipt_fi = {
    title: "EUbookshop",
    description: "The EU bookshop corpus",
    id: "opus_eubookshop_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles_fipt_pt = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linked_to: ["opus_opensubtitles_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles_fipt_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_fipt_pt = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fipt_pt",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "por",
    linked_to: ["opus_dgt_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fipt_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fipt_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_etfi_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_etfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_etfi_et"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_etfi_et = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_etfi_et",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "est",
    linked_to: ["opus_opensubtitles2011_etfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_etfi_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_etfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_emea_etfi_et"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};
settings.corpora.opus_kde4_etfi_fi = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_etfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_kde4_etfi_et"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_etfi_et = {
    title: "KDE4",
    description: "KDE4 – KDE4 localization files (v.2)",
    id: "opus_kde4_etfi_et",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "est",
    linked_to: ["opus_kde4_etfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_etfi_et = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_etfi_et",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "est",
    linked_to: ["opus_emea_etfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_etfi_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_etfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_etfi_et"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_etfi_et = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_etfi_et",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "est",
    linked_to: ["opus_dgt_etfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_etfi_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_etfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_etfi_et"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_etfi_et = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_etfi_et",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "est",
    linked_to: ["opus_opensubtitles2012_etfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};
settings.corpora.opus_opensubtitles2013_etfi_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_etfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_etfi_et"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_etfi_et = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_etfi_et",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "est",
    linked_to: ["opus_opensubtitles2013_etfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fipl_pl = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fipl_pl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "pol",
    linked_to: ["opus_emea_fipl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fipl_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fipl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fim",
    linked_to: ["opus_emea_fipl_pl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_fipl_pl = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fipl_pl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "pol",
    linked_to: ["opus_ecb_fipl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_fipl_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fipl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fim",
    linked_to: ["opus_ecb_fipl_pl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_fipl_pl = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fipl_pl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "pol",
    linked_to: ["opus_dgt_fipl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fipl_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fipl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_fipl_pl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fipl_pl = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fipl_pl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "pol",
    linked_to: ["opus_opensubtitles2012_fipl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_fipl_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fipl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_fipl_pl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fipl_pl = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fipl_pl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "pol",
    linked_to: ["opus_opensubtitles2013_fipl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fipl_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fipl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_fipl_pl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fipl_pl = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fipl_pl",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "pol",
    linked_to: ["opus_opensubtitles2011_fipl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fipl_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fipl_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_fipl_pl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_dafi_fi = {
    title: "DGT – A collection of EU Translation Memories provided by the JRC",
    description: "DGT",
    id: "opus_dgt_dafi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_dafi_da"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_dafi_da = {
    title: "DGT – A collection of EU Translation Memories provided by the JRC",
    description: "DGT",
    id: "opus_dgt_dafi_da",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dan",
    linked_to: ["opus_dgt_dafi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_dafi_fi = {
    title: "The EU bookshop corpus",
    description: "EUbookshop",
    id: "opus_eubookshop_dafi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_dafi_da"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_dafi_da = {
    title: "The EU bookshop corpus",
    description: "EUbookshop",
    id: "opus_eubookshop_dafi_da",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dan",
    linked_to: ["opus_eubookshop_dafi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_dafi_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles2012",
    id: "opus_opensubtitles2012_dafi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_dafi_da"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_dafi_da = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles2012",
    id: "opus_opensubtitles2012_dafi_da",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dan",
    linked_to: ["opus_opensubtitles2012_dafi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_dafi_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_dafi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_dafi_da"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_dafi_da = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_dafi_da",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dan",
    linked_to: ["opus_opensubtitles2013_dafi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_dafi_fi = {
    title: "KDE4 – KDE4 localization files (v.2)",
    description: "KDE4",
    id: "opus_kde4_dafi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_kde4_dafi_da"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_dafi_da = {
    title: "KDE4 – KDE4 localization files (v.2)",
    description: "KDE4",
    id: "opus_kde4_dafi_da",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dan",
    linked_to: ["opus_kde4_dafi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_dafi_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_dafi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ecb_dafi_da"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_dafi_da = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_dafi_da",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "dan",
    linked_to: ["opus_ecb_dafi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};


settings.corpora.opus_dgt_esfi_fi = {
    title: "DGT – A collection of EU Translation Memories provided by the JRC",
    description: "DGT",
    id: "opus_dgt_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_esfi_es = {
    title: "DGT – A collection of EU Translation Memories provided by the JRC",
    description: "DGT",
    id: "opus_dgt_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linked_to: ["opus_dgt_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_esfi_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles2012",
    id: "opus_opensubtitles2012_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_esfi_es = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles2012",
    id: "opus_opensubtitles2012_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linked_to: ["opus_opensubtitles2012_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_esfi_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_esfi_es = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linked_to: ["opus_opensubtitles2013_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_esfi_fi = {
    title: "The EU bookshop corpus",
    description: "EUbookshop",
    id: "opus_eubookshop_esfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_esfi_es = {
    title: "The EU bookshop corpus",
    description: "EUbookshop",
    id: "opus_eubookshop_esfi_es",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "spa",
    linked_to: ["opus_eubookshop_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_fifr_fr = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_ecb_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_fifr_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ecb_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_fifr_fr = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_emea_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fifr_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_emea_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fifr_fr = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_opensubtitles2013_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fifr_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fifr_fr = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles2011",
    id: "opus_opensubtitles2011_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_opensubtitles2011_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fifr_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles2011",
    id: "opus_opensubtitles2011_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_fifr_fr = {
    title: "The EU bookshop corpus",
    description: "EUbookshop",
    id: "opus_eubookshop_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_eubookshop_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_fifr_fi = {
    title: "The EU bookshop corpus",
    description: "EUbookshop",
    id: "opus_eubookshop_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_fifr_fr = {
    title: "DGT – A collection of EU Translation Memories provided by the JRC",
    description: "DGT",
    id: "opus_dgt_fifr_fr",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fra",
    linked_to: ["opus_dgt_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fifr_fi = {
    title: "DGT – A collection of EU Translation Memories provided by the JRC",
    description: "DGT",
    id: "opus_dgt_fifr_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_defi_fi = {
    title: "KDE4",
    description: "KDE4",
    id: "opus_kde4_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_kde4_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_kde4_defi_de = {
    title: "KDE4",
    description: "KDE4",
    id: "opus_kde4_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_kde4_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};


settings.corpora.opus_emea_defi_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_emea_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_defi_de = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_emea_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_defi_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ecb_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_defi_de = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_ecb_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_defi_fi = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_defi_de = {
    title: "DGT",
    description: "DGT – A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_dgt_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_defi_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_defi_de = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_opensubtitles2013_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_defi_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_defi_de = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles2011",
    id: "opus_opensubtitles2011_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_opensubtitles2011_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2012_defi_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_defi_de = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles2012",
    id: "opus_opensubtitles2012_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_opensubtitles2012_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_defi_fi = {
    title: "EUbookshop",
    description: "EUbookshop",
    id: "opus_eubookshop_defi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_defi_de = {
    title: "EUbookshop",
    description: "EUbookshop",
    id: "opus_eubookshop_defi_de",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "deu",
    linked_to: ["opus_eubookshop_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fisv_sv = {
    title: "DGT FI–SV",
    description: "A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linked_to: ["opus_dgt_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_dgt_fisv_fi = {
    title: "DGT FI–SV",
    description: "A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_eubookshop_fisv_sv = {
    title: "EUbookshop",
    description: "EUbookshop",
    id: "opus_eubookshop_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linked_to: ["opus_eubookshop_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_fisv_fi = {
    title: "EUbookshop",
    description: "EUbookshop",
    id: "opus_eubookshop_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fisv_fi = {
    title: "OpenSubtitles2012",
    description: "OpenSubtitles 2012",
    id: "opus_opensubtitles2012_fisv_fi",
    lang: "fin",
    linked_to: ["opus_opensubtitles2012_fisv_sv"],
    context: context.alignAligned,
    within: {"sentence":"sentence"},
    attributes: {},
    within: settings.spWithin,
    context: settings.spContext,
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fisv_sv = {
    title: "OpenSubtitles2012 SV",
    description: "OpenSubtitles2012 SV",
    id: "opus_opensubtitles2012_fisv_sv",
    lang: "swe",
    linked_to: ["opus_opensubtitles2012_fisv_fi"],
    context: context.alignAligned,
    within: {"sentence":"sentence"},
    attributes: {},
    within: settings.spWithin,
    context: settings.spContext,
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2013_fisv_fi = {
    title: "OpenSubtitles2013",
    description: "OpenSubtitles 2013",
    id: "opus_opensubtitles2013_fisv_fi",
    lang: "fin",
    linked_to: ["opus_opensubtitles2013_fisv_sv"],
    context: context.alignAligned,
    within: {"sentence":"sentence"},
    attributes: {},
    within: settings.spWithin,
    context: settings.spContext,
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fisv_sv = {
    title: "OpenSubtitles2013 SV",
    description: "OpenSubtitles2013 SV",
    id: "opus_opensubtitles2013_fisv_sv",
    lang: "swe",
    linked_to: ["opus_opensubtitles2013_fisv_fi"],
    context: context.alignAligned,
    within: {"sentence":"sentence"},
    attributes: {},
    within: settings.spWithin,
    context: settings.spContext,
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensubtitles2011_fisv_fi = {
    title: "OpenSubtitles2011",
    description: "OpenSubtitles 2011",
    id: "opus_opensubtitles2011_fisv_fi",
    lang: "fin",
    linked_to: ["opus_opensubtitles2011_fisv_sv"],
    context: context.alignAligned,
    within: {"sentence":"sentence"},
    attributes: {},
    within: settings.spWithin,
    context: settings.spContext,
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fisv_sv = {
    title: "OpenSubtitles2011 SV",
    description: "OpenSubtitles2011 SV",
    id: "opus_opensubtitles2011_fisv_sv",
    lang: "swe",
    linked_to: ["opus_opensubtitles2011_fisv_fi"],
    context: context.alignAligned,
    within: {"sentence":"sentence"},
    attributes: {},
    within: settings.spWithin,
    context: settings.spContext,
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_fisv_sv = {
    title: "KDE4",
    description: "KDE4",
    id: "opus_kde4_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linked_to: ["opus_kde4_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_kde4_fisv_fi = {
    title: "KDE4 FI–SV",
    description: "A parallel corpus of KDE4 localization files (v.2)",
    id: "opus_kde4_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_kde4_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};


settings.corpora.opus_dgt_enfi_fi = {
    title: "DGT",
    description: "A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_dgt_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_dgt_enfi_en = {
    title: "DGT",
    description: "A collection of EU Translation Memories provided by the JRC",
    id: "opus_dgt_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linked_to: ["opus_dgt_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_enfi_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_emea_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_emea_enfi_en = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linked_to: ["opus_emea_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: {
    },
    within: settings.spWithin,
    context: settings.spContext,
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fisv_sv = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fisv_sv",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "swe",
    linked_to: ["opus_emea_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_emea_fisv_fi = {
    title: "EMEA",
    description: "EMEA – European Medicines Agency documents",
    id: "opus_emea_fisv_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_emea_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensub2013enfi_fi = {
    title: "OpenSubtitles2013",
    description: "Opensubtitles 2013",
    id: "opus_opensub2013enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensub2013enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensub2013enfi_en = {
    title: "Opensubtitles 2013 EN",
    description: "Opensubtitles 2013 EN",
    id: "opus_opensub2013enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linked_to: ["opus_opensub2013enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensub2015enfi_fi = {
    title: "Opensubtitles 2015",
    description: "Opensubtitles 2015",
    id: "opus_opensub2015enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensub2015enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensub2015enfi_en = {
    title: "Opensubtitles 2015 EN",
    description: "Opensubtitles 2015 EN",
    id: "opus_opensub2015enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linked_to: ["opus_opensub2015enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensub2011enfi_fi = {
    title: "OpenSubtitles2011",
    description: "Opensubtitles 2011",
    id: "opus_opensub2011enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensub2011enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensub2011enfi_en = {
    title: "Opensubtitles 2011 EN",
    description: "Opensubtitles 2011 EN",
    id: "opus_opensub2011enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linked_to: ["opus_opensub2011enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_opensub2012enfi_fi = {
    title: "OpenSubtitles2012",
    description: "Opensubtitles 2012",
    id: "opus_opensub2012enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_opensub2012enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_opensub2012enfi_en = {
    title: "Opensubtitles 2012 EN",
    description: "Opensubtitles 2012 EN",
    id: "opus_opensub2012enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linked_to: ["opus_opensub2012enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_ecb_enfi_fi = {
    title: "ECB",
    description: "ECB – European Central Bank corpus",
    id: "opus_ecb_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_ecb_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_ecb_enfi_en = {
    title: "ECB EN",
    description: "ECB EN",
    id: "opus_ecb_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linked_to: ["opus_ecb_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_enfi_en = {
    title: "EUbookshop",
    description: "EUbookshop",
    id: "opus_eubookshop_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linked_to: ["opus_eubookshop_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus,
    hide: true
};

settings.corpora.opus_eubookshop_enfi_fi = {
    title: "EUbookshop",
    description: "EUbookshop",
    id: "opus_eubookshop_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_eubookshop_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_enfi_fi = {
    title: "Tatoeba",
    description: "Käännettyjen lauseiden tietokanta (A DB of translated sentences)",
    id: "opus_tatoeba_enfi_fi",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "fin",
    linked_to: ["opus_tatoeba_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.opus
};

settings.corpora.opus_tatoeba_enfi_en = {
    title: "Tatoeba EN–FI EN",
    description: "A DB of translated sentences",
    id: "opus_tatoeba_enfi_en",
    urn: "urn_placeholder",
    metadata_urn: "urn:nbn:fi:lb-2015102201",
    lang: "eng",
    linked_to: ["opus_tatoeba_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: {
    },
    within: settings.spWithin,
    context: settings.spContext,
    structAttributes: sattrlist.opus,
    hide: true
};

/* Europarl V7 */

settings.corpora.europarl_v7_enfi_en = {
    title: "EuroParl v7 EN",
    description: "euroParl_v7_enfi_en",
    id: "europarl_v7_enfi_en",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "eng",
    linked_to: ["europarl_v7_enfi_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7,
    hide: true
};


settings.corpora.europarl_v7_etfi_et = {
    title: "EuroParl v7 ET",
    description: "euroParl_v7_etfi_et",
    id: "europarl_v7_etfi_et",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "est",
    linked_to: ["europarl_v7_etfi_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7,
    hide: true
};

settings.corpora.europarl_v7_esfi_es = {
    title: "EuroParl v7 ES",
    description: "euroParl_v7_esfi_es",
    id: "europarl_v7_esfi_es",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "spa",
    linked_to: ["europarl_v7_esfi_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7,
    hide: true
};

settings.corpora.europarl_v7_frfi_fr = {
    title: "EuroParl v7 FR",
    description: "euroParl_v7_frfi_fr",
    id: "europarl_v7_frfi_fr",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fra",
    linked_to: ["europarl_v7_frfi_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7,
    hide: true
};

settings.corpora.europarl_v7_defi_de = {
    title: "EuroParl v7 DE",
    description: "euroParl_v7_defi_de",
    id: "europarl_v7_defi_de",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "deu",
    linked_to: ["europarl_v7_defi_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7,
    hide: true
};

settings.corpora.europarl_v7_svfi_sv = {
    title: "EuroParl v7 SV",
    description: "euroParl_v7_svfi_sv",
    id: "europarl_v7_svfi_sv",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "swe",
    linked_to: ["europarl_v7_svfi_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7,
    hide: true
};

settings.corpora.europarl_v7_etfi_fi = {
    title: "EuroParl suomi–viro",
    description: "EuroParl suomi–viro-rinnakkaiskorpus (EuroParl v7)",
    id: "europarl_v7_etfi_fi",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fin",
    linked_to: ["europarl_v7_etfi_et"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7
};

settings.corpora.europarl_v7_esfi_fi = {
    title: "EuroParl suomi–espanja",
    description: "EuroParl suomi–espanja-rinnakkaiskorpus (EuroParl v7)",
    id: "europarl_v7_esfi_fi",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fin",
    linked_to: ["europarl_v7_esfi_es"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7
};

settings.corpora.europarl_v7_frfi_fi = {
    title: "EuroParl suomi–ranska",
    description: "EuroParl suomi–ranska-rinnakkaiskorpus (EuroParl v7)",
    id: "europarl_v7_frfi_fi",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fin",
    linked_to: ["europarl_v7_frfi_fr"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7
};

settings.corpora.europarl_v7_defi_fi = {
    title: "EuroParl suomi–saksa",
    description: "EuroParl suomi–saksa-rinnakkaiskorpus (EuroParl v7)",
    id: "europarl_v7_defi_fi",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fin",
    linked_to: ["europarl_v7_defi_de"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7
};

settings.corpora.europarl_v7_enfi_fi = {
    title: "EuroParl suomi–englanti",
    description: "EuroParl suomi–englanti-rinnakkaiskorpus (EuroParl v7)",
    id: "europarl_v7_enfi_fi",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fin",
    linked_to: ["europarl_v7_enfi_en"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7
};

settings.corpora.europarl_v7_svfi_fi = {
    title: "EuroParl suomi–ruotsi",
    description: "EuroParl suomi–ruotsi-rinnakkaiskorpus (EuroParl v7)",
    id: "europarl_v7_svfi_fi",
    urn: "urn:nbn:fi:lb-2015042002",
    metadata_urn: "urn:nbn:fi:lb-2015042001",
    lang: "fin",
    linked_to: ["europarl_v7_svfi_sv"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.europarl_v7
};


/* JRC */

settings.corpora.jrc_acquis_enfi_en = {
    title: "JRC-Acquis englanti",
    description: "jrc_acquis_enfi_en",
    id: "jrc_acquis_enfi_en",
    urn: "urn:nbn:fi:lb-2015062302",
    metadata_urn: "urn:nbn:fi:lb-2015061201",
    lang: "eng",
    linked_to: ["jrc_acquis_enfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_enfi_fi = {
    title: "JRC-Acquis suomi–englanti",
    description: "JRC-Acquis suomi–englanti",
    id: "jrc_acquis_enfi_fi",
    urn: "urn:nbn:fi:lb-2015062302",
    metadata_urn: "urn:nbn:fi:lb-2015061201",
    lang: "fin",
    linked_to: ["jrc_acquis_enfi_en"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};


settings.corpora.jrc_acquis_hufi_hu = {
    title: "JRC-Acquis unkari",
    description: "jrc_acquis_hufi_hu",
    id: "jrc_acquis_hufi_hu",
    urn: "urn:nbn:fi:lb-2015062309",
    metadata_urn: "urn:nbn:fi:lb-2015061205",
    lang: "hun",
    linked_to: ["jrc_acquis_hufi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_hufi_fi = {
    title: "JRC-Acquis suomi–unkari",
    description: "JRC-Acquis suomi–unkari",
    id: "jrc_acquis_hufi_fi",
    urn: "urn:nbn:fi:lb-2015062309",
    metadata_urn: "urn:nbn:fi:lb-2015061205",
    lang: "fin",
    linked_to: ["jrc_acquis_hufi_hu"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_frfi_fr = {
    title: "JRC-Acquis ranska",
    description: "jrc_acquis_frfi_fr",
    id: "jrc_acquis_frfi_fr",
    urn: "urn:nbn:fi:lb-2015062307",
    metadata_urn: "urn:nbn:fi:lb-2015061203",
    lang: "fra",
    linked_to: ["jrc_acquis_frfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_frfi_fi = {
    title: "JRC-Acquis suomi–ranska",
    description: "JRC-Acquis suomi–ranska",
    id: "jrc_acquis_frfi_fi",
    urn: "urn:nbn:fi:lb-2015062307",
    metadata_urn: "urn:nbn:fi:lb-2015061203",
    lang: "fin",
    linked_to: ["jrc_acquis_frfi_fr"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_plfi_pl = {
    title: "JRC-Acquis puola",
    description: "jrc_acquis_plfi_pl",
    id: "jrc_acquis_plfi_pl",
    urn: "urn:nbn:fi:lb-2015062310",
    metadata_urn: "urn:nbn:fi:lb-2015061207",
    lang: "pol",
    linked_to: ["jrc_acquis_plfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_plfi_fi = {
    title: "JRC-Acquis suomi–puola",
    description: "JRC-Acquis suomi–puola",
    id: "jrc_acquis_plfi_fi",
    urn: "urn:nbn:fi:lb-2015062310",
    metadata_urn: "urn:nbn:fi:lb-2015061207",
    lang: "fin",
    linked_to: ["jrc_acquis_plfi_pl"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_itfi_it = {
    title: "JRC-Acquis italia",
    description: "jrc_acquis_itfi_it",
    id: "jrc_acquis_itfi_it",
    urn: "urn:nbn:fi:lb-2015062308",
    metadata_urn: "urn:nbn:fi:lb-2015061206",
    lang: "ita",
    linked_to: ["jrc_acquis_itfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_itfi_fi = {
    title: "JRC-Acquis suomi–italia",
    description: "JRC-Acquis suomi–italia",
    id: "jrc_acquis_itfi_fi",
    urn: "urn:nbn:fi:lb-2015062308",
    metadata_urn: "urn:nbn:fi:lb-2015061206",
    lang: "fin",
    linked_to: ["jrc_acquis_itfi_it"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_esfi_es = {
    title: "JRC-Acquis espanja",
    description: "jrc_acquis_esfi_es",
    id: "jrc_acquis_esfi_es",
    urn: "urn:nbn:fi:lb-2015062305",
    metadata_urn: "urn:nbn:fi:lb-2015061208",
    lang: "spa",
    linked_to: ["jrc_acquis_esfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_esfi_fi = {
    title: "JRC-Acquis suomi–espanja",
    description: "JRC-Acquis suomi–espanja",
    id: "jrc_acquis_esfi_fi",
    urn: "urn:nbn:fi:lb-2015062305",
    metadata_urn: "urn:nbn:fi:lb-2015061208",
    lang: "fin",
    linked_to: ["jrc_acquis_esfi_es"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_etfi_et = {
    title: "JRC-Acquis viro",
    description: "jrc_acquis_etfi_et",
    id: "jrc_acquis_etfi_et",
    urn: "urn:nbn:fi:lb-2015062306",
    metadata_urn: "urn:nbn:fi:lb-2015061202",
    lang: "est",
    linked_to: ["jrc_acquis_etfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_etfi_fi = {
    title: "JRC-Acquis suomi–viro",
    description: "JRC-Acquis suomi–viro",
    id: "jrc_acquis_etfi_fi",
    urn: "urn:nbn:fi:lb-2015062306",
    metadata_urn: "urn:nbn:fi:lb-2015061202",
    lang: "fin",
    linked_to: ["jrc_acquis_etfi_et"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_defi_de = {
    title: "JRC-Acquis saksa",
    description: "jrc_acquis_defi_de",
    id: "jrc_acquis_defi_de",
    urn: "urn:nbn:fi:lb-2015062304",
    metadata_urn: "urn:nbn:fi:lb-2015061204",
    lang: "deu",
    linked_to: ["jrc_acquis_defi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_defi_fi = {
    title: "JRC-Acquis suomi–saksa",
    description: "JRC-Acquis suomi–saksa",
    id: "jrc_acquis_defi_fi",
    urn: "urn:nbn:fi:lb-2015062304",
    metadata_urn: "urn:nbn:fi:lb-2015061204",
    lang: "fin",
    linked_to: ["jrc_acquis_defi_de"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_svfi_sv = {
    title: "JRC-Acquis ruotsi",
    description: "jrc_acquis_svfi_sv",
    id: "jrc_acquis_svfi_sv",
    urn: "urn:nbn:fi:lb-2015062303",
    metadata_urn: "urn:nbn:fi:lb-2015061209",
    lang: "swe",
    linked_to: ["jrc_acquis_svfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis,
    hide: true
};

settings.corpora.jrc_acquis_svfi_fi = {
    title: "JRC-Acquis suomi–ruotsi",
    description: "JRC-Acquis suomi–ruotsi",
    id: "jrc_acquis_svfi_fi",
    urn: "urn:nbn:fi:lb-2015062303",
    metadata_urn: "urn:nbn:fi:lb-2015061209",
    lang: "fin",
    linked_to: ["jrc_acquis_svfi_sv"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    structAttributes: sattrlist.jrc_acquis
};


/* KFSPC */

settings.corpora.kfspc_fi = {
    title: "Kotus Finnish-Swedish Parallel Corpus (suomi)",
    description: "KFSPC (suomi)",
    id: "kfspc_fi",
    cite_id: "kfspc-korp",
    lang: "fin",
    linked_to: ["kfspc_sv"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
        },
    features: ["parsed_tdt", "finer"],
    structAttributes: sattrlist.kfspc
};

settings.corpora.kfspc_sv = {
    title: "Kotus Finnish-Swedish Parallel Corpus (ruotsi)",
    description: "KFSPC (ruotsi)",
    id: "kfspc_sv",
    cite_id: "kfspc-korp",
    lang: "swe",
    linked_to: ["kfspc_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
        },
    attributes: {
    },
    structAttributes: sattrlist.kfspc,
    hide: true
};

settings.fn.extend_corpus_settings(settings.corpusinfo.kfspc,
				   ["kfspc_fi", "kfspc_sv"]);


/*
settings.corpora.europarl_fi = {
    id: "europarl_fi",
    lang: "fin",
    linked_to: ["europarl_en"],
    title: "EuroParl suomi–englanti-rinnakkaiskorpus",
    context: context.defaultAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: {},
    structAttributes: {}
};

settings.corpora.europarl_en = {
    id: "europarl_en",
    lang: "eng",
    linked_to: ["europarl_fi"],
    title: "EuroParl suomi–englanti-rinnakkaiskorpus",
    context: context.defaultAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: {},
    structAttributes: {},
    hide: true
};
*/


/*
// Make a deep copy of sattrlist.mulcold and then extend it
sattrlist.parfin = $.extend(
    true, {}, sattrlist.mulcold,
    {
	align_text_translator: {
	    label: "text_translator"
	}
    }
);
*/

settings.corpora.mulcold_fi = {
    id: "mulcold_fi",
    lang: "fin",
    linked_to: ["mulcold_en", "mulcold_sv", "mulcold_ru", "mulcold_de"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (suomi)",
    description: "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_fi,
    structAttributes: sattrlist.mulcold
};

settings.corpora.mulcold_en = {
    id: "mulcold_en",
    lang: "eng",
    linked_to: ["mulcold_fi", "mulcold_sv", "mulcold_ru", "mulcold_de"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (englanti)",
    description: "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_en,
    structAttributes: sattrlist.mulcold,
    hide: true
};

settings.corpora.mulcold_sv = {
    id: "mulcold_sv",
    lang: "swe",
    linked_to: ["mulcold_fi", "mulcold_en", "mulcold_ru", "mulcold_de"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (ruotsi)",
    description: "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_sv,
    structAttributes: sattrlist.mulcold,
    hide: true
};

settings.corpora.mulcold_ru = {
    id: "mulcold_ru",
    lang: "rus",
    linked_to: ["mulcold_fi", "mulcold_en", "mulcold_sv", "mulcold_de"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (venäjä)",
    description: "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_ru,
    structAttributes: sattrlist.mulcold,
    hide: true
};

settings.corpora.mulcold_de = {
    id: "mulcold_de",
    lang: "deu",
    linked_to: ["mulcold_fi", "mulcold_en", "mulcold_sv", "mulcold_ru"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (saksa)",
    description: "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_de,
    structAttributes: sattrlist.mulcold,
    hide: true
};

settings.fn.extend_corpus_settings(
    $.extend({}, settings.corpusinfo.mulcold, { cite_id: "MULCOLD", }),
    ["mulcold_fi", "mulcold_en", "mulcold_sv", "mulcold_ru", "mulcold_de"]);


/*
settings.corpora.parfin_fi = {
    id: "parfin_fi",
    lang: "fin",
    linked_to: ["parfin_ru"],
    title: "ParFin",
    description: "Suomenkielisiä kaunokirjallisia teoksia ja niiden käännöksiä venäjäksi",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_fi,
    structAttributes: sattrlist.parfin,
    limitedAccess: true,
    licence_type: "RES"
};

settings.corpora.parfin_ru = {
    id: "parfin_ru",
    lang: "rus",
    linked_to: ["parfin_fi"],
    title: "ParFin",
    description: "Suomenkielisiä kaunokirjallisia teoksia ja niiden käännöksiä venäjäksi",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_ru,
    structAttributes: sattrlist.parfin,
    limitedAccess: true,
    licence_type: "RES",
    hide: true
};

settings.fn.extend_corpus_settings(settings.corpusinfo.parfin,
				   ["parfin_fi", "parfin_ru"]);
*/


/* ParFin (updated version) */

/*
// Deprecated version

settings.corpora.parfin_fi = {
    id: "parfin_fi",
    lang: "fin",
    linked_to: ["parfin_ru"],
    attributes: attrlist.parfin_fi,
    structAttributes: sattrlist.parfin_fi,
};

settings.corpora.parfin_ru = {
    id: "parfin_ru",
    lang: "rus",
    linked_to: ["parfin_fi"],
    attributes: attrlist.parfin_ru,
    structAttributes: sattrlist.parfin_ru,
    hide: true,
};

settings.fn.extend_corpus_settings(
    {
	// Properties common to parfin_fi and parfin_ru
	title: "ParFin [poistuva]",
	description: "ParFin – suomi–venäjä kaunokirjallisten tekstien rinnakkaiskorpus<br/>Suomenkielisiä kaunokirjallisia tekstejä vuosilta 1990–2010 ja niiden käännöksiä venäjäksi virketasolla kohdistettuina<br/><br/><strong>Huomaa, että ParFin 2016 korvaa tämän korpuksen, ja tämä korpus poistuu käytöstä helmikuussa 2017.</strong>",
	context: context.linkAligned,
	within: settings.linkWithin,
	limitedAccess: true,
	licence_type: "RES",
    },
    ["parfin_fi", "parfin_ru"]
);
settings.fn.extend_corpus_settings(settings.corpusinfo.parfin,
				   ["parfin_fi", "parfin_ru"]);
*/


/* ParRus */

// parrus_fi contains all the parallel Finnish translations and it is
// linked to parrus_ru, so that a search in Finnish returns matches
// from any Finnish translation.
//
// However, parrus_ru is linked to the Finnish versions _fi1, _fi2,
// _fi3, each of which contains only a single translation of each
// text, so that searching in Russian should return results in each of
// the translations. (_fi1 contains translations of all texts, _fi2
// contains the second translations for the texts with at least two
// translations and _fi3 contains the third translations for texts
// that have three translations.)
//
// Both parrus_fi and parrus_ru are shown in the corpus selector,
// whereas the _fiN versions are not.

/*
// Deprecated version

settings.corpora.parrus_fi = {
    id: "parrus_fi",
    lang: "fin",
    linked_to: ["parrus_ru"],
    title: "ParRus (suomi) [poistuva]",
    description: "ParRus – venäjä–suomi kaunokirjallisten tekstien rinnakkaiskorpus<br/>Venäjänkielisiä kaunokirjallisia tekstejä (klassista ja 1900-luvun kirjallisuutta) ja niiden käännöksiä suomeksi kappaletasolla kohdistettuina.<br/><br/><strong>Huomaa:</strong> Tämä versio soveltuu parhaiten hakuihin, joissa haetaan ensisijaisesti suomenkielisistä käännöksistä. Jos samasta teoksesta on useita käännöksiä, tämä hakee niistä kaikista.<br/><br/><strong>Huomaa, että ParRus 2016 korvaa tämän korpuksen, ja tämä korpus poistuu käytöstä helmikuussa 2017.</strong>",
    attributes: attrlist.parrus_fi,
    structAttributes: sattrlist.parrus_fi,
};

settings.corpora.parrus_ru = {
    id: "parrus_ru",
    lang: "rus",
    linked_to: ["parrus_fi1", "parrus_fi2", "parrus_fi3"],
    // Needed to make searches in Finnish work in parrus_ru
    linked_to_inverse: ["parrus_fi"],
    title: "ParRus (venäjä) [poistuva]",
    description: "ParRus – venäjä–suomi kaunokirjallisten tekstien rinnakkaiskorpus<br/>Venäjänkielisiä kaunokirjallisia tekstejä (klassista ja 1900-luvun kirjallisuutta) ja niiden käännöksiä suomeksi kappaletasolla kohdistettuina.<br/><br/><strong>Huomaa:</strong> Tämä versio soveltuu parhaiten hakuihin, joissa haetaan ensisijaisesti venäjänkielisistä alkuperäisteksteistä. Jos samasta teoksesta on useita käännöksiä, niistä kukin näkyy tuloksessa erikseen.<br/><br/><strong>Huomaa, että ParRus 2016 korvaa tämän korpuksen, ja tämä korpus poistuu käytöstä helmikuussa 2017.</strong>",
    attributes: attrlist.parrus_ru,
    structAttributes: sattrlist.parrus_ru,
    // hide: true,
};


settings.corpora.parrus_fi1 = {
    id: "parrus_fi1",
    linked_to: ["parrus_ru", "parrus_fi2", "parrus_fi3"],
    title: "ParRus (suomenkielinen käännös 1)",
};

settings.corpora.parrus_fi2 = {
    id: "parrus_fi2",
    linked_to: ["parrus_ru", "parrus_fi1", "parrus_fi3"],
    title: "ParRus (suomenkielinen käännös 2)",
};

settings.corpora.parrus_fi3 = {
    id: "parrus_fi3",
    linked_to: ["parrus_ru", "parrus_fi1", "parrus_fi2"],
    title: "ParRus (suomenkielinen käännös 3)",
};

settings.fn.extend_corpus_settings(
    {
	// Properties common to parrus_fi1, parrus_fi2, parrus_fi3
	lang: "fin",
	description: "ParRus – venäjä–suomi kaunokirjallisten tekstien rinnakkaiskorpus",
	attributes: attrlist.parrus_fi,
	structAttributes: sattrlist.parrus_fi,
	hide: true,
    },
    ["parrus_fi1", "parrus_fi2", "parrus_fi3"]);

settings.fn.extend_corpus_settings(
    {
	// Properties common to all ParRus language versions
	context: context.linkAligned,
	within: settings.linkWithin,
	limitedAccess: true,
	licence_type: "RES"
    },
    ["parrus_fi", "parrus_fi1", "parrus_fi2", "parrus_fi3", "parrus_ru"]);

settings.fn.extend_corpus_settings(
    settings.corpusinfo.parrus,
    ["parrus_fi", "parrus_fi1", "parrus_fi2", "parrus_fi3", "parrus_ru"]);
*/


/* ParFin 2016 */

settings.corpora.parfin_2016_fi = {
    id: "parfin_2016_fi",
    lang: "fin",
    linked_to: ["parfin_2016_ru"],
    attributes: attrlist.parfin_2016_fi,
    structAttributes: sattrlist.parfin_2016_fi,
};

settings.corpora.parfin_2016_ru = {
    id: "parfin_2016_ru",
    lang: "rus",
    linked_to: ["parfin_2016_fi"],
    attributes: attrlist.parfin_2016_ru,
    structAttributes: sattrlist.parfin_2016_ru,
    hide: true,
};

settings.fn.extend_corpus_settings(
    {
	// Properties common to parfin_2016_fi and parfin_2016_ru
	title: "ParFin 2016",
	description: "ParFin 2016 – suomi–venäjä kaunokirjallisten tekstien rinnakkaiskorpus<br/>Suomenkielisiä kaunokirjallisia tekstejä vuosilta 1910–2008 ja niiden käännöksiä venäjäksi virketasolla kohdistettuina<br/>ParFin 2016: финско-русский корпус художественных текстов. Финская проза 1910–2008 гг. и ее переводы на русский язык, тексты выровнены на уровне предложений.<br/><br/><a href=\"http://universaldependencies.org/#fi\" target=\"_blank\">Suomen annotaatioiden kuvaus</a><br/><a href=\"http://nl.ijs.si/ME/V4/msd/html/msd-ru.html\" target=\"_blank\">Venäjän morfologisen ja sanaluokka-annotaation kuvaus (englanniksi)</a></br><a href=\"http://www.ruscorpora.ru/instruction-syntax.html\" target=\"_blank\">Venäjän syntaktisen annotaation kuvaus (venäjäksi)</a>",
	urn: "urn:nbn:fi:lb-2016121601",
	metadata_urn: "urn:nbn:fi:lb-2016121610",
	licence: settings.licenceinfo.ParFinRus_2016_fi,
	cite_id: "ParFin2016",
	context: context.linkAligned,
	// TODO: Make sure that sentLinkWithin works in all cases.
	within: settings.sentLinkWithin,
	limitedAccess: true,
	licence_type: "RES",
    },
    ["parfin_2016_fi", "parfin_2016_ru"]
);
settings.fn.extend_corpus_settings(settings.corpusinfo.parfin_2016,
				   ["parfin_2016_fi", "parfin_2016_ru"]);


/* ParRus 2016 */

// parrus_2016_fi contains all the parallel Finnish translations and
// it is linked to parrus_2016_ru, so that a search in Finnish returns
// matches from any Finnish translation.
//
// However, parrus_2016_ru is linked to the Finnish versions _fi1,
// _fi2, _fi3, _fi4, each of which contains only a single translation
// of each text, so that searching in Russian should return results in
// each of the translations. (_fi1 contains translations of all texts,
// _fi2, _fi3 and _fi4 contain the second, third and fourth
// translations, respectively, for the texts with at least that number
// of translations.)
//
// Searching in Finnish from parrus_2016_ru shows the results
// separately for each translation and for each search shows all the
// translations, which multiplies the "corpora" from which results are
// reported.
//
// Because of Mikhail Mikhailov's wishes, only parrus_2016_ru is shown
// in the corpus selector, even if searching from it in Finnish shows
// the same results several times.

settings.corpora.parrus_2016_ru = {
    title: "ParRus 2016",
    id: "parrus_2016_ru",
    lang: "rus",
    linked_to: ["parrus_2016_fi1", "parrus_2016_fi2", "parrus_2016_fi3",
		 "parrus_2016_fi4"],
    // linked_to_inverse appeared to be needed to make searches in
    // Finnish work in parrus_2016_ru. But now the searches seem to
    // work without that, although nothing related to that should have
    // been changed. Why is that? (Jyrki Niemi 2017-02-03)
    // linked_to_inverse: ["parrus_2016_fi"],
    attributes: attrlist.parrus_2016_ru,
    structAttributes: sattrlist.parrus_2016_ru,
};

settings.corpora.parrus_2016_fi = {
    title: "ParRus 2016 (suomi)",
    id: "parrus_2016_fi",
    linked_to: ["parrus_2016_ru"],
};

settings.corpora.parrus_2016_fi1 = {
    id: "parrus_2016_fi1",
    linked_to: ["parrus_2016_ru",
		 "parrus_2016_fi2", "parrus_2016_fi3", "parrus_2016_fi4"],
    title: "ParRus 2016 (suomenkielinen käännös 1)",
};

settings.corpora.parrus_2016_fi2 = {
    id: "parrus_2016_fi2",
    linked_to: ["parrus_2016_ru",
		 "parrus_2016_fi1", "parrus_2016_fi3", "parrus_2016_fi4"],
    title: "ParRus 2016 (suomenkielinen käännös 2)",
};

settings.corpora.parrus_2016_fi3 = {
    id: "parrus_2016_fi3",
    linked_to: ["parrus_2016_ru",
		 "parrus_2016_fi1", "parrus_2016_fi2", "parrus_2016_fi4"],
    title: "ParRus 2016 (suomenkielinen käännös 3)",
};

settings.corpora.parrus_2016_fi4 = {
    id: "parrus_2016_fi4",
    linked_to: ["parrus_2016_ru",
		 "parrus_2016_fi1", "parrus_2016_fi2", "parrus_2016_fi3"],
    title: "ParRus 2016 (suomenkielinen käännös 4)",
};

settings.fn.extend_corpus_settings(
    {
	// Properties common to all ParRus 2016 language versions
	description: "ParRus 2016 – venäjä–suomi kaunokirjallisten tekstien rinnakkaiskorpus<br/>Venäjänkielisiä kaunokirjallisia tekstejä (klassista ja 1900-luvun kirjallisuutta) ja niiden käännöksiä suomeksi kappaletasolla kohdistettuina.<br/>ParRus 2016: русско-русский корпус художественных текстов. Русская классическая и современная проза и ее переводы на финский язык, тексты выровнены на уровне абзацев.<br/><br/><strong>Huomaa:</strong> Suomeksi haettaessa hakutulos sisältää samoja tuloksia useaan kertaan.<br/><br/><a href=\"http://nl.ijs.si/ME/V4/msd/html/msd-ru.html\" target=\"_blank\">Venäjän morfologisen ja sanaluokka-annotaation kuvaus (englanniksi)</a></br><a href=\"http://www.ruscorpora.ru/instruction-syntax.html\" target=\"_blank\">Venäjän syntaktisen annotaation kuvaus (venäjäksi)</a><br/><a href=\"http://universaldependencies.org/#fi\" target=\"_blank\">Suomen annotaatioiden kuvaus</a>",
	urn: "urn:nbn:fi:lb-2016121604",
	metadata_urn: "urn:nbn:fi:lb-20140730173",
	licence: settings.licenceinfo.ParFinRus_2016_fi,
	cite_id: "ParRus2016",
	context: context.linkAligned,
	// TODO: Make sure that sentLinkWithin works in all cases.
	within: settings.sentLinkWithin,
	limitedAccess: true,
	licence_type: "RES"
    },
    ["parrus_2016_fi",
     "parrus_2016_fi1",
     "parrus_2016_fi2",
     "parrus_2016_fi3",
     "parrus_2016_fi4",
     "parrus_2016_ru"]);

settings.fn.extend_corpus_settings(
    settings.corpusinfo.parrus_2016,
    ["parrus_2016_fi",
     "parrus_2016_fi1",
     "parrus_2016_fi2",
     "parrus_2016_fi3",
     "parrus_2016_fi4",
     "parrus_2016_ru"]);

settings.fn.extend_corpus_settings(
    {
	// Properties common to parrus_2016_fiN
	lang: "fin",
	// description: "ParRus – venäjä–suomi kaunokirjallisten tekstien rinnakkaiskorpus",
	attributes: attrlist.parrus_2016_fi,
	structAttributes: sattrlist.parrus_2016_fi,
	hide: true,
    },
    ["parrus_2016_fi",
     "parrus_2016_fi1",
     "parrus_2016_fi2",
     "parrus_2016_fi3",
     "parrus_2016_fi4"]);


/*
settings.parallel_corpora.testpar = {
    "default": "testpar_fi",
    testpar_fi: {
	id: "testpar_fi",
	lang: "fin",
        parent: "testpar",
        title: "Testpar suomi–englanti-rinnakkaiskorpustesti",
        context: context.spContext,
        within: {
            "sentence": "sentence"
        },
        attributes: {},
        structAttributes: {}
    },
    testpar_en: {
	id: "testpar_en",
	lang: "eng",
        parent: "testpar",
        title: "Testpar suomi–englanti-rinnakkaiskorpustesti",
        context: context.spContext,
        within: {
            "sentence": "sentence"
        },
        attributes: {},
        structAttributes: {},
        hide: true
    }
};


settings.parallel_corpora.testpar4 = {
    "default": "testpar4_fi",
    testpar4_fi: {
	id: "testpar4_fi",
	lang: "fin",
        parent: "testpar4",
        title: "Testpar4 suomi–englanti–ruotsi–saksa-rinnakkaiskorpustesti",
        context: context.spContext,
        within: {
            "sentence": "sentence"
        },
        attributes: {},
        structAttributes: {}
    },
    testpar4_en: {
	id: "testpar4_en",
	lang: "eng",
        parent: "testpar4",
        title: "Testpar4 suomi–englanti–ruotsi–saksa-rinnakkaiskorpustesti",
        context: context.spContext,
        within: {
            "sentence": "sentence"
        },
        attributes: {},
        structAttributes: {},
        hide: true
    },
    testpar4_sv: {
	id: "testpar4_sv",
	lang: "swe",
        parent: "testpar4",
        title: "Testpar4 suomi–englanti–ruotsi–saksa-rinnakkaiskorpustesti",
        context: context.spContext,
        within: {
            "sentence": "sentence"
        },
        attributes: {},
        structAttributes: {},
        hide: true
    },
    testpar4_de: {
	id: "testpar4_de",
	lang: "deu",
        parent: "testpar4",
        title: "Testpar4 suomi–englanti–ruotsi–saksa-rinnakkaiskorpustesti",
        context: context.spContext,
        within: {
            "sentence": "sentence"
        },
        attributes: {},
        structAttributes: {},
        hide: true
    }
};
*/



settings.fn.add_attr_extra_properties(settings.corpora);


window.cl = settings.corpusListing = new ParallelCorpusListing(settings.corpora, parseLocationLangs());
delete ParallelCorpusListing;
delete context;
