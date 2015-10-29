
settings.wordpicture = false;
// settings.statistics = false;
var start_lang = "fin";

korpApp.controller("SearchCtrl", function($scope) {
    $scope.visibleTabs = [false, true, false, false];
    $scope.extendedTmpl = "modes/parallel_extended_tmpl.html";

    $scope.settings = settings
    $scope.showStats = function() {
        // c.log "showstats", settings.statistics, settings.statistics != false
        return settings.statistics != false
    	
    }
});
korpApp.controller("ParallelSearch", function($scope, $location, $rootScope, $timeout, searches) {
	var s = $scope;
	s.negates = [];

	if($location.search().parallel_corpora)
		s.langs = _.map($location.search().parallel_corpora.split(","), function(lang) {
			var obj = {lang : lang};
			if(search()["cqp_" + lang])
				obj.cqp = search()["cqp_" + lang];
			return obj;
		})

	else
		s.langs = [{lang : "fin"}];
	s.negChange = function() {
		$location.search("search", null)
	}
	c.log ("add langs watch")
	var onLangChange = function() {
		var currentLangList = _.pluck(s.langs, "lang");
		c.log("lang change", currentLangList)
		settings.corpusListing.setActiveLangs(currentLangList);
		$location.search("parallel_corpora", currentLangList.join(","))
		var struct = settings.corpusListing.getLinksFromLangs(currentLangList);
		function getLangMapping(excludeLangs) {
			return _(struct)
				.flatten()
				.filter(function(item) {
					return !_.contains(excludeLangs, item.lang);
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
			var linkedCorpus = _(langMapping[langobj.lang]).pluck("id").invoke("toUpperCase").join("|");
			
			try {
				var expanded = CQP.expandOperators(langobj.cqp);
			} catch(e) {
				c.log("parallel cqp parsing error", e)
				return
			}
			return ":LINKED_CORPUS:" + linkedCorpus + " " + neg + " " + expanded; 
		}).join("");

		_.each(s.langs, function(langobj, i) {
			search("cqp_" + langobj.lang , langobj.cqp);
		})
		$rootScope.extendedCQP = output;
		s.$broadcast("corpuschooserchange")
		searches.langDef.resolve()
		return output
	}
	s.$watch("langs", function() {
		onLangChange()
		
	}, true);


	s.onSubmit = function() {
		$location.search("search", null)
		$timeout( function() {
		    // within = s.within unless s.within in _.keys settings.defaultWithin
		    var within;
		    if(!s.within in _.keys(settings.defaultWithin))
			    within = s.within

		    $location.search("within", within || null)
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

	s.getEnabledLangs = function(i) {
		if(i === 0) {
			return _(settings.corpusListing.getLinksFromLangs([start_lang])).flatten()
			.pluck("lang").unique().value();
			
		}
		var currentLangList = _.pluck(s.langs, "lang");
		delete currentLangList[i];
		var firstlang;
		if(s.langs.length)
			 firstlang = s.langs[0].lang
		var other =  _(settings.corpusListing.getLinksFromLangs([firstlang || start_lang]))
			.flatten()
			.pluck("lang").unique().value();

		return _.difference(other, currentLangList);

	};
	s.addLangRow = function() {
		s.langs.push({lang : s.getEnabledLangs()[0]})
	}
	s.removeLangRow = function(i) {
		s.langs.pop();
	}

});

$("#search_options > div:last").remove();
$("#num_hits").prepend("<option value='10'>10</option>");

var c3 = view.KWICResults.prototype.constructor
view.KWICResults = Subclass(view.KWICResults, function() {
	c3.apply(this, arguments);
	this.selected = []
}, {

	selectWord : function(word, scope, sentence) {
		// c.log ("word, scope, sentence", word, scope, sentence)
		c3.prototype.selectWord.apply(this, arguments)
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
				if(_.contains(refs, linkNum)) {
					token._link_selected = true
					self.selected.push(token)
				}
			})

		} else {
			var links = _.pick(obj, function(val, key) {
				return _.str.startsWith(key, "wordlink")
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
		
	},

	clearLinks : function() {
		_.each(this.selected, function(word) {
			delete word._link_selected
		})
		this.selected = []
	}
});

// model.StatsProxy.prototype.makeRequest = function(){};

settings.primaryColor = "#FFF3D8";
settings.primaryLight = "#FFF9EE";

var context = {
	"defaultAligned" : {
		"1 sentence" : "1 sentence"
	},
/*
    	"sentenceAligned" : {
    	    "1 sentence" : "1 sentence"
    	},
    "spContext" : {
    	"1 sentence" : "1 sentence",
    	"1 paragraph" : "1 paragraph"
    },
*/
    	"alignAligned" : {
    		"1 align" : "1 align"
    	}
};

settings.preselected_corpora = ["europarl_v7_enfi_fi", "mulcold_fi"];

settings.corporafolders = {};

settings.corporafolders.europarl = {
    title : "HeKo-EuroParl 7",
    description : "Helsinki Korp EuroParl v7 -aineistokokoelma",
    contents : [
	"europarl_v7_enfi_fi",
	"europarl_v7_svfi_fi",
	"europarl_v7_defi_fi",
	"europarl_v7_frfi_fi",
	"europarl_v7_esfi_fi",
	"europarl_v7_etfi_fi",
    ],
};

settings.corporafolders.jrc = {
    title : "HeKo-JRC-Acquis",
    description : "Helsinki Korp JRC-Acquis -aineistokokoelma",
    contents : [
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
};

settings.corporafolders.opus_enfi = {
    title : "OPUS Finnish–English",
    contents : ['opus_opensub2011enfi_fi', 'opus_opensub2012enfi_fi',
		'opus_opensub2013enfi_fi', 'opus_opensub2015enfi_fi',
		'opus_ecb_enfi_fi', 'opus_emea_enfi_fi', 'opus_eubookshop_enfi_fi',
		'opus_dgt_enfi_fi', 'opus_tatoeba_enfi_fi', 'opus_php_enfi_fi',
		'opus_gnome_enfi_fi', 'opus_euconst_enfi_fi', 'opus_books_enfi_fi',
	       'opus_ubuntu_enfi_fi']
};

settings.corporafolders.opus_firu = {
    title : "OPUS Finnish–Russian",
    contents : ['opus_opensubtitles2011_firu_fi', 'opus_opensubtitles2012_firu_fi',
		'opus_eubookshop_firu_fi', 'opus_kde4_firu_fi', 'opus_opensubtitles_firu_fi',
		'opus_tatoeba_firu_fi', 'opus_php_firu_fi',
		'opus_gnome_firu_fi',
		'opus_ubuntu_firu_fi']
};

settings.corporafolders.opus_fisv = {
    title : "OPUS Finnish–Swedish",
    contents : ['opus_opensubtitles2011_fisv_fi', 'opus_opensubtitles2012_fisv_fi',
		'opus_opensubtitles2013_fisv_fi', 'opus_dgt_fisv_fi',
		'opus_kde4_fisv_fi', 'opus_emea_fisv_fi', 'opus_eubookshop_fisv_fi',
		'opus_gnome_fisv_fi', 'opus_euconst_fisv_fi', 'opus_php_fisv_fi',
		'opus_ubuntu_fisv_fi', 'opus_tatoeba_fisv_fi', 'opus_opensubtitles_fisv_fi']
};

settings.corporafolders.opus_defi = {
    title : "OPUS Finnish–German",
    contents : ['opus_opensubtitles2012_defi_fi', 'opus_opensubtitles2011_defi_fi',
		'opus_opensubtitles2013_defi_fi', 'opus_eubookshop_defi_fi', 'opus_dgt_defi_fi',
		'opus_kde4_defi_fi', 'opus_emea_defi_fi', 'opus_ecb_defi_fi', 'opus_ubuntu_defi_fi',
	        'opus_gnome_defi_fi', 'opus_tatoeba_defi_fi', 'opus_opensubtitles_defi_fi',
	        'opus_php_defi_fi',  'opus_euconst_defi_fi']
};

settings.corporafolders.opus_fifr = {
    title : "OPUS Finnish–French",
    contents : ['opus_dgt_fifr_fi',
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

settings.corporafolders.opus_dafi = {
    title : "OPUS Finnish–Danish",
    contents : ['opus_dgt_dafi_fi',
		'opus_eubookshop_dafi_fi',
		'opus_opensubtitles2012_dafi_fi',
		'opus_opensubtitles2013_dafi_fi',
		'opus_kde4_dafi_fi',
		'opus_ecb_dafi_fi']
};

settings.corporafolders.opus_fipl = {
    title : "OPUS Finnish–Polish",
    contents : ['opus_dgt_fipl_fi',
		'opus_opensubtitles2011_fipl_fi',
		'opus_opensubtitles2012_fipl_fi',
		'opus_opensubtitles2013_fipl_fi',
		'opus_emea_fipl_fi',
	       'opus_ecb_fipl_fi']
};

settings.corporafolders.opus_esfi = {
    title : "OPUS Finnish–Spanish",
    contents : ['opus_dgt_esfi_fi',
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

settings.corporafolders.opus_fipt = {
    title : "OPUS Finnish–Portuguese",
    contents : ['opus_dgt_fipt_fi',
		'opus_eubookshop_fipt_fi',
		'opus_opensubtitles2011_fipt_fi',
		'opus_opensubtitles2013_fipt_fi',
		'opus_opensubtitles_fipt_fi',
		'opus_emea_fipt_fi',
		'opus_ecb_fipt_fi']
};

settings.corporafolders.opus_etfi = {
    title : "OPUS Finnish–Estonian",
    contents : ['opus_dgt_etfi_fi',
		'opus_emea_etfi_fi',
		'opus_kde4_etfi_fi',
		'opus_opensubtitles2012_etfi_fi',
                'opus_opensubtitles2011_etfi_fi',
		'opus_opensubtitles2013_etfi_fi']
};

settings.corporafolders.opus_fiit = {
    title : "OPUS Finnish–Italian",
    contents : ['opus_dgt_fiit_fi',
		'opus_emea_fiit_fi',
		'opus_ecb_fiit_fi',
		'opus_opensubtitles2012_fiit_fi',
		'opus_opensubtitles2011_fiit_fi',
		'opus_opensubtitles2013_fiit_fi',
		'opus_eubookshop_fiit_fi']
};

settings.corporafolders.opus_fihu = {
    title : "OPUS Finnish–Hungarian",
    contents : ['opus_dgt_fihu_fi',
		'opus_emea_fihu_fi',
		'opus_ecb_fihu_fi',
		'opus_opensubtitles2012_fihu_fi',
		'opus_opensubtitles2011_fihu_fi',
		'opus_opensubtitles2013_fihu_fi',
		'opus_eubookshop_fihu_fi',
		'opus_kde4_fihu_fi']
};

settings.corporafolders.opus_finl = {
    title : "OPUS Finnish–Dutch",
    contents : ['opus_dgt_finl_fi',
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

settings.corporafolders.opus_fitrl = {
    title : "OPUS Finnish–Turkish",
    contents : ['opus_eubookshop_fitr_fi',
		'opus_gnome_fitr_fi',
		'opus_kde4_fitr_fi',
		'opus_opensubtitles2011_fitr_fi',
		'opus_opensubtitles2012_fitr_fi',
		'opus_opensubtitles2013_fitr_fi',
		'opus_php_fitr_fi',
		'opus_opensubtitles_fitr_fi']
};

settings.corporafolders.opus_csfi = {
    title : "OPUS Finnish–Czech",
    contents : ['opus_dgt_csfi_fi',
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

settings.corporafolders.opus_elfi = {
    title : "OPUS Finnish–Greek",
    contents : ['opus_dgt_elfi_fi',
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


/*
settings.corporafolders.kfspc = {
    title : "Kotus Finnish-Swedish Parallel Corpus (KFSPC)",
    contents : ["kfspc_fi"]
};
*/

/*
settings.corporafolders.parrus = {
    title : "ParRus",
    contents : ["parrus_fi"]
};
*/

/*
settings.corporafolders.mulcold = {
    title : "MULCOLD – Multilingual Corpus of Legal Documents",
    contents : ["mulcold_fi"]
};
*/


settings.corpora = {};


var linkref = {
	label : "linkref",
	displayType : "hidden"
}
var wordlink = {
	label : "wordlink",
	displayType : "hidden"
}

/* OPUS – Open Source Paraller Corpus */

settings.corpora.opus_opensubtitles2011_fitr_tr = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_fitr_tr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "tur",
    linked_to : ["opus_opensubtitles2011_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2011_fitr_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_fitr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fitr_tr = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_fitr_tr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "tur",
    linked_to : ["opus_opensubtitles2012_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_fitr_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_fitr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fitr_tr = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_fitr_tr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "tur",
    linked_to : ["opus_opensubtitles2013_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2013_fitr_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_fitr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles_fitr_tr = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_fitr_tr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "tur",
    linked_to : ["opus_opensubtitles_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles_fitr_fi = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_fitr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_eubookshop_fitr_tr = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_fitr_tr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "tur",
    linked_to : ["opus_eubookshop_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_fitr_fi = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_fitr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_kde4_fitr_tr = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_fitr_tr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "tur",
    linked_to : ["opus_kde4_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_kde4_fitr_fi = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_fitr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_kde4_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_gnome_fitr_tr = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_fitr_tr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "tur",
    linked_to : ["opus_gnome_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_gnome_fitr_fi = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_fitr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_gnome_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_php_fitr_tr = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_fitr_tr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "tur",
    linked_to : ["opus_php_fitr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_php_fitr_fi = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_fitr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_php_fitr_tr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_books_fifr_fr = {
    title : "Books",
    description : "A collection of translated literature",
    id : "opus_books_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_books_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_books_fifr_fi = {
    title : "Books",
    description : "A collection of translated literature",
    id : "opus_books_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_books_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fifr_fr = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_opensubtitles2012_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_fifr_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles_fifr_fr = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_opensubtitles_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles_fifr_fi = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_kde4_fifr_fr = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_kde4_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_kde4_fifr_fi = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_kde4_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_gnome_fifr_fr = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_gnome_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_gnome_fifr_fi = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_gnome_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_euconst_fifr_fr = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_euconst_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_euconst_fifr_fi = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_euconst_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_php_fifr_fr = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_php_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_php_fifr_fi = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_php_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ubuntu_fifr_fr = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_ubuntu_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ubuntu_fifr_fi = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ubuntu_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_tatoeba_fifr_fr = {
    title : "Tatoeba",
    description : "A DB of translated sentences",
    id : "opus_tatoeba_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_tatoeba_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_tatoeba_fifr_fi = {
    title : "Tatoeba",
    description : "A DB of translated sentences",
    id : "opus_tatoeba_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_tatoeba_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_esfi_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_esfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_esfi_es = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_esfi_es",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "spa",
    linked_to : ["opus_opensubtitles2011_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles_esfi_fi = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_esfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles_esfi_es = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_esfi_es",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "spa",
    linked_to : ["opus_opensubtitles_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_kde4_esfi_fi = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_esfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_kde4_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_kde4_esfi_es = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_esfi_es",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "spa",
    linked_to : ["opus_kde4_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_gnome_esfi_fi = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_esfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_gnome_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_gnome_esfi_es = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_esfi_es",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "spa",
    linked_to : ["opus_gnome_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_euconst_esfi_fi = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_esfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_euconst_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_euconst_esfi_es = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_esfi_es",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "spa",
    linked_to : ["opus_euconst_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_php_esfi_fi = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_esfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_php_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_php_esfi_es = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_esfi_es",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "spa",
    linked_to : ["opus_php_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ubuntu_esfi_fi = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_esfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ubuntu_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ubuntu_esfi_es = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_esfi_es",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "spa",
    linked_to : ["opus_ubuntu_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_tatoeba_esfi_fi = {
    title : "Tatoeba",
    description : "A DB of translated sentences",
    id : "opus_tatoeba_esfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_tatoeba_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_tatoeba_esfi_es = {
    title : "Tatoeba",
    description : "A DB of translated sentences",
    id : "opus_tatoeba_esfi_es",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "spa",
    linked_to : ["opus_tatoeba_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_books_esfi_fi = {
    title : "Books",
    description : "A collection of translated literature",
    id : "opus_books_esfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_books_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_books_esfi_es = {
    title : "Books",
    description : "A collection of translated literature",
    id : "opus_books_esfi_es",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "spa",
    linked_to : ["opus_books_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_europarl_csfi_fi = {
    title : "Europarl",
    description : "Europarl",
    id : "opus_europarl_csfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_europarl_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_europarl_csfi_cs = {
    title : "Europarl",
    description : "Europarl",
    id : "opus_europarl_csfi_cs",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "cze",
    linked_to : ["opus_europarl_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_gnome_fisv_sv = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_fisv_sv",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "swe",
    linked_to : ["opus_gnome_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_gnome_fisv_fi = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_fisv_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_gnome_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_euconst_fisv_sv = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_fisv_sv",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "swe",
    linked_to : ["opus_euconst_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_euconst_fisv_fi = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_fisv_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_euconst_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_php_fisv_sv = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_fisv_sv",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "swe",
    linked_to : ["opus_php_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_php_fisv_fi = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_fisv_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_php_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ubuntu_fisv_sv = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_fisv_sv",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "swe",
    linked_to : ["opus_ubuntu_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ubuntu_fisv_fi = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_fisv_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ubuntu_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_tatoeba_fisv_sv = {
    title : "Tatoeba",
    description : "A DB of translated sentences",
    id : "opus_tatoeba_fisv_sv",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "swe",
    linked_to : ["opus_tatoeba_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_tatoeba_fisv_fi = {
    title : "Tatoeba",
    description : "A DB of translated sentences",
    id : "opus_tatoeba_fisv_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_tatoeba_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles_fisv_sv = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_fisv_sv",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "swe",
    linked_to : ["opus_opensubtitles_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles_fisv_fi = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_fisv_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_elfi_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_elfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_elfi_el = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_elfi_el",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "gre",
    linked_to : ["opus_opensubtitles2011_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_elfi_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_elfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_elfi_el = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_elfi_el",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "gre",
    linked_to : ["opus_opensubtitles2012_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2013_elfi_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_elfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_elfi_el = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_elfi_el",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "gre",
    linked_to : ["opus_opensubtitles2013_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles_elfi_fi = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_elfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles_elfi_el = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_elfi_el",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "gre",
    linked_to : ["opus_opensubtitles_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_dgt_elfi_fi = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_elfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_elfi_el = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_elfi_el",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "gre",
    linked_to : ["opus_dgt_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_elfi_fi = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_elfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_eubookshop_elfi_el = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_elfi_el",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "gre",
    linked_to : ["opus_eubookshop_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_elfi_fi = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_elfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_emea_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_emea_elfi_el = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_elfi_el",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "gre",
    linked_to : ["opus_emea_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ecb_elfi_fi = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_elfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ecb_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ecb_elfi_el = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_elfi_el",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "gre",
    linked_to : ["opus_ecb_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_kde4_elfi_fi = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_elfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_kde4_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_kde4_elfi_el = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_elfi_el",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "gre",
    linked_to : ["opus_kde4_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_gnome_elfi_fi = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_elfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_gnome_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_gnome_elfi_el = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_elfi_el",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "gre",
    linked_to : ["opus_gnome_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_euconst_elfi_fi = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_elfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_euconst_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_euconst_elfi_el = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_elfi_el",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "gre",
    linked_to : ["opus_euconst_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ubuntu_elfi_fi = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_elfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ubuntu_elfi_el"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ubuntu_elfi_el = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_elfi_el",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "gre",
    linked_to : ["opus_ubuntu_elfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles_defi_fi = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles_defi_de = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_opensubtitles_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_gnome_defi_fi = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_gnome_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_gnome_defi_de = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_gnome_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_euconst_defi_fi = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_euconst_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_euconst_defi_de = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_euconst_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_php_defi_fi = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_php_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_php_defi_de = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_php_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ubuntu_defi_fi = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ubuntu_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ubuntu_defi_de = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_ubuntu_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_tatoeba_defi_fi = {
    title : "Tatoeba",
    description : "A DB of translated sentences",
    id : "opus_tatoeba_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_tatoeba_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_tatoeba_defi_de = {
    title : "Tatoeba",
    description : "A DB of translated sentences",
    id : "opus_tatoeba_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_tatoeba_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2011_csfi_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_csfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_csfi_cs = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_csfi_cs",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "cze",
    linked_to : ["opus_opensubtitles2011_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_csfi_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_csfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_csfi_cs = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_csfi_cs",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "cze",
    linked_to : ["opus_opensubtitles2012_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2013_csfi_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_csfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_csfi_cs = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_csfi_cs",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "cze",
    linked_to : ["opus_opensubtitles2013_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_dgt_csfi_fi = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_csfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_csfi_cs = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_csfi_cs",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "cze",
    linked_to : ["opus_dgt_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_csfi_fi = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_csfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_eubookshop_csfi_cs = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_csfi_cs",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "cze",
    linked_to : ["opus_eubookshop_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_csfi_fi = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_csfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_emea_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_emea_csfi_cs = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_csfi_cs",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "cze",
    linked_to : ["opus_emea_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ecb_csfi_fi = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_csfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ecb_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ecb_csfi_cs = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_csfi_cs",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "cze",
    linked_to : ["opus_ecb_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_kde4_csfi_fi = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_csfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_kde4_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_kde4_csfi_cs = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_csfi_cs",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "cze",
    linked_to : ["opus_kde4_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_gnome_csfi_fi = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_csfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_gnome_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_gnome_csfi_cs = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_csfi_cs",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "cze",
    linked_to : ["opus_gnome_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_euconst_csfi_fi = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_csfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_euconst_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_euconst_csfi_cs = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_csfi_cs",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "cze",
    linked_to : ["opus_euconst_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_php_csfi_fi = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_csfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_php_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_php_csfi_cs = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_csfi_cs",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "cze",
    linked_to : ["opus_php_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ubuntu_csfi_fi = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_csfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ubuntu_csfi_cs"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ubuntu_csfi_cs = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_csfi_cs",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "cze",
    linked_to : ["opus_ubuntu_csfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2011_finl_nl = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_finl_nl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dut",
    linked_to : ["opus_opensubtitles2011_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2011_finl_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_finl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_finl_nl = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_finl_nl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dut",
    linked_to : ["opus_opensubtitles2012_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_finl_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_finl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_finl_nl = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_finl_nl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dut",
    linked_to : ["opus_opensubtitles2013_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2013_finl_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_finl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_finl_nl = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_finl_nl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dut",
    linked_to : ["opus_dgt_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_dgt_finl_fi = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_finl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_eubookshop_finl_nl = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_finl_nl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dut",
    linked_to : ["opus_eubookshop_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_finl_fi = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_finl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_emea_finl_nl = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_finl_nl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dut",
    linked_to : ["opus_emea_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_finl_fi = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_finl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_emea_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ecb_finl_nl = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_finl_nl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dut",
    linked_to : ["opus_ecb_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ecb_finl_fi = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_finl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ecb_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_kde4_finl_nl = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_finl_nl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dut",
    linked_to : ["opus_kde4_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_kde4_finl_fi = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_finl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_kde4_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_gnome_finl_nl = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_finl_nl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dut",
    linked_to : ["opus_gnome_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_gnome_finl_fi = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_finl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_gnome_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_euconst_finl_nl = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_finl_nl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dut",
    linked_to : ["opus_euconst_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_euconst_finl_fi = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_finl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_euconst_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_php_finl_nl = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_finl_nl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dut",
    linked_to : ["opus_php_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_php_finl_fi = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_finl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_php_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ubuntu_finl_nl = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_finl_nl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dut",
    linked_to : ["opus_ubuntu_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ubuntu_finl_fi = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_finl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ubuntu_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_tatoeba_finl_nl = {
    title : "Tatoeba",
    description : "A DB of translated sentences",
    id : "opus_tatoeba_finl_nl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dut",
    linked_to : ["opus_tatoeba_finl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_tatoeba_finl_fi = {
    title : "Tatoeba",
    description : "A DB of translated sentences",
    id : "opus_tatoeba_finl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_tatoeba_finl_nl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_firu_ru = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_firu_ru",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "rus",
    linked_to : ["opus_opensubtitles2011_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2011_firu_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_firu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_kde4_firu_ru = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_firu_ru",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "rus",
    linked_to : ["opus_kde4_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_kde4_firu_fi = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_firu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_kde4_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_eubookshop_firu_ru = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_firu_ru",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "rus",
    linked_to : ["opus_eubookshop_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_firu_ru = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_firu_ru",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "rus",
    linked_to : ["opus_opensubtitles2012_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_firu_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_firu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_eubookshop_firu_fi = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_firu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_php_firu_ru = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_firu_ru",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "rus",
    linked_to : ["opus_php_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_php_firu_fi = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_firu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_php_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles_firu_ru = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_firu_ru",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "rus",
    linked_to : ["opus_opensubtitles_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles_firu_fi = {
    title : "OpenSubtitles",
    description : "OpenSubtitles",
    id : "opus_opensubtitles_firu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_tatoeba_firu_ru = {
    title : "Tatoeba",
    description : "A DB of translated sentences",
    id : "opus_tatoeba_firu_ru",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "rus",
    linked_to : ["opus_tatoeba_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_tatoeba_firu_fi = {
    title : "Tatoeba",
    description : "A DB of translated sentences",
    id : "opus_tatoeba_firu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_tatoeba_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ubuntu_firu_ru = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_firu_ru",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "rus",
    linked_to : ["opus_ubuntu_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ubuntu_firu_fi = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_firu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ubuntu_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_gnome_firu_ru = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_firu_ru",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "rus",
    linked_to : ["opus_gnome_firu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_gnome_firu_fi = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_firu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_gnome_firu_ru"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_gnome_enfi_fi = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_gnome_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_gnome_enfi_en = {
    title : "GNOME",
    description : "GNOME localization files",
    id : "opus_gnome_enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "en",
    linked_to : ["opus_gnome_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_euconst_enfi_fi = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_euconst_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_euconst_enfi_en = {
    title : "EUconst",
    description : "The European constitution",
    id : "opus_euconst_enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "en",
    linked_to : ["opus_euconst_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_books_enfi_fi = {
    title : "Books",
    description : "A collection of translated literature",
    id : "opus_books_enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_books_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_books_enfi_en = {
    title : "Books",
    description : "A collection of translated literature",
    id : "opus_books_enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "en",
    linked_to : ["opus_books_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_php_enfi_fi = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_php_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_php_enfi_en = {
    title : "PHP",
    description : "The PHP manual corpus",
    id : "opus_php_enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "en",
    linked_to : ["opus_php_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ubuntu_enfi_fi = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ubuntu_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ubuntu_enfi_en = {
    title : "Ubuntu",
    description : "Ubuntu localization files",
    id : "opus_ubuntu_enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "en",
    linked_to : ["opus_ubuntu_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_fihu_hu = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_fihu_hu",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "hun",
    linked_to : ["opus_opensubtitles2012_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_fihu_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_fihu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fihu_hu = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_fihu_hu",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "hun",
    linked_to : ["opus_opensubtitles2013_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2013_fihu_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_fihu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fihu_hu = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_fihu_hu",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "hun",
    linked_to : ["opus_opensubtitles2011_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2011_fihu_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_fihu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_fihu_hu = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_fihu_hu",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "hun",
    linked_to : ["opus_dgt_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_dgt_fihu_fi = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_fihu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ecb_fihu_hu = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_fihu_hu",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "hun",
    linked_to : ["opus_ecb_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ecb_fihu_fi = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_fihu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ecb_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_emea_fihu_hu = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_fihu_hu",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "hun",
    linked_to : ["opus_emea_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_fihu_fi = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_fihu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_emea_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_eubookshop_fihu_hu = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_fihu_hu",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "hun",
    linked_to : ["opus_eubookshop_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_fihu_fi = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_fihu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_kde4_fihu_hu = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_fihu_hu",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "hun",
    linked_to : ["opus_kde4_fihu_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_kde4_fihu_fi = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_fihu_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_kde4_fihu_hu"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_emea_fiit_it = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_fiit_it",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "ita",
    linked_to : ["opus_emea_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_fiit_fi = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_fiit_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_emea_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ecb_fiit_it = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_fiit_it",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "ita",
    linked_to : ["opus_ecb_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ecb_fiit_fi = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_fiit_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ecb_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fiit_it = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_fiit_it",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "por",
    linked_to : ["opus_opensubtitles2011_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2011_fiit_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_fiit_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fiit_it = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_fiit_it",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "ita",
    linked_to : ["opus_opensubtitles2013_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2013_fiit_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_fiit_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fiit_it = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_fiit_it",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "ita",
    linked_to : ["opus_opensubtitles2012_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_fiit_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_fiit_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_eubookshop_fiit_it = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_fiit_it",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "ita",
    linked_to : ["opus_eubookshop_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_fiit_fi = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_fiit_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_fiit_it = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_fiit_it",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "ita",
    linked_to : ["opus_dgt_fiit_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_dgt_fiit_fi = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_fiit_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_fiit_it"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ecb_fipt_pt = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_fipt_pt",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "por",
    linked_to : ["opus_ecb_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ecb_fipt_fi = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_fipt_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ecb_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_emea_fipt_pt = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_fipt_pt",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "por",
    linked_to : ["opus_emea_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_fipt_fi = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_fipt_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_emea_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fipt_pt = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_fipt_pt",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "por",
    linked_to : ["opus_opensubtitles2011_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2011_fipt_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_fipt_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fipt_pt = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_fipt_pt",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "por",
    linked_to : ["opus_opensubtitles2013_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2013_fipt_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_fipt_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};



settings.corpora.opus_eubookshop_fipt_pt = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_fipt_pt",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "por",
    linked_to : ["opus_eubookshop_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_fipt_fi = {
    title : "EUbookshop",
    description : "The EU bookshop corpus",
    id : "opus_eubookshop_fipt_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles_fipt_pt = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles_fipt_pt",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "por",
    linked_to : ["opus_opensubtitles_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles_fipt_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles_fipt_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_fipt_pt = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_fipt_pt",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "por",
    linked_to : ["opus_dgt_fipt_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_dgt_fipt_fi = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_fipt_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_fipt_pt"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_etfi_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_etfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_etfi_et"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_etfi_et = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_etfi_et",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "est",
    linked_to : ["opus_opensubtitles2011_etfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_etfi_fi = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_etfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_emea_etfi_et"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};
settings.corpora.opus_kde4_etfi_fi = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_etfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_kde4_etfi_et"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_kde4_etfi_et = {
    title : "KDE4",
    description : "KDE4 - KDE4 localization files (v.2)",
    id : "opus_kde4_etfi_et",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "est",
    linked_to : ["opus_kde4_etfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_etfi_et = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_etfi_et",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "est",
    linked_to : ["opus_emea_etfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_dgt_etfi_fi = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_etfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_etfi_et"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_etfi_et = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_etfi_et",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "est",
    linked_to : ["opus_dgt_etfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_etfi_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_etfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_etfi_et"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_etfi_et = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_etfi_et",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "est",
    linked_to : ["opus_opensubtitles2012_etfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};
settings.corpora.opus_opensubtitles2013_etfi_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_etfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_etfi_et"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_etfi_et = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_etfi_et",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "est",
    linked_to : ["opus_opensubtitles2013_etfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_fipl_pl = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_fipl_pl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "pol",
    linked_to : ["opus_emea_fipl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_fipl_fi = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_fipl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fim",
    linked_to : ["opus_emea_fipl_pl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ecb_fipl_pl = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_fipl_pl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "pol",
    linked_to : ["opus_ecb_fipl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ecb_fipl_fi = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_fipl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fim",
    linked_to : ["opus_ecb_fipl_pl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_fipl_pl = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_fipl_pl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "pol",
    linked_to : ["opus_dgt_fipl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_dgt_fipl_fi = {
    title : "DGT",
    description : "DGT - A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_fipl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_fipl_pl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fipl_pl = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_fipl_pl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "pol",
    linked_to : ["opus_opensubtitles2012_fipl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_fipl_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_fipl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_fipl_pl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fipl_pl = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_fipl_pl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "pol",
    linked_to : ["opus_opensubtitles2013_fipl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2013_fipl_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_fipl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_fipl_pl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fipl_pl = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_fipl_pl",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "pol",
    linked_to : ["opus_opensubtitles2011_fipl_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2011_fipl_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_fipl_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_fipl_pl"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_dafi_fi = {
    title : "DGT - A collection of EU Translation Memories provided by the JRC",
    description : "DGT",
    id : "opus_dgt_dafi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_dafi_da"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_dafi_da = {
    title : "DGT - A collection of EU Translation Memories provided by the JRC",
    description : "DGT",
    id : "opus_dgt_dafi_da",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dan",
    linked_to : ["opus_dgt_dafi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_dafi_fi = {
    title : "The EU bookshop corpus",
    description : "EUbookshop",
    id : "opus_eubookshop_dafi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_dafi_da"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_eubookshop_dafi_da = {
    title : "The EU bookshop corpus",
    description : "EUbookshop",
    id : "opus_eubookshop_dafi_da",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dan",
    linked_to : ["opus_eubookshop_dafi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_dafi_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles2012",
    id : "opus_opensubtitles2012_dafi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_dafi_da"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_dafi_da = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles2012",
    id : "opus_opensubtitles2012_dafi_da",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dan",
    linked_to : ["opus_opensubtitles2012_dafi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2013_dafi_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_dafi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_dafi_da"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_dafi_da = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_dafi_da",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dan",
    linked_to : ["opus_opensubtitles2013_dafi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_kde4_dafi_fi = {
    title : "KDE4 - KDE4 localization files (v.2)",
    description : "KDE4",
    id : "opus_kde4_dafi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_kde4_dafi_da"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_kde4_dafi_da = {
    title : "KDE4 - KDE4 localization files (v.2)",
    description : "KDE4",
    id : "opus_kde4_dafi_da",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dan",
    linked_to : ["opus_kde4_dafi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ecb_dafi_fi = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_dafi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ecb_dafi_da"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ecb_dafi_da = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_dafi_da",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "dan",
    linked_to : ["opus_ecb_dafi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};


settings.corpora.opus_dgt_esfi_fi = {
    title : "DGT - A collection of EU Translation Memories provided by the JRC",
    description : "DGT",
    id : "opus_dgt_esfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_esfi_es = {
    title : "DGT - A collection of EU Translation Memories provided by the JRC",
    description : "DGT",
    id : "opus_dgt_esfi_es",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "spa",
    linked_to : ["opus_dgt_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_esfi_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles2012",
    id : "opus_opensubtitles2012_esfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_esfi_es = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles2012",
    id : "opus_opensubtitles2012_esfi_es",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "spa",
    linked_to : ["opus_opensubtitles2012_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2013_esfi_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_esfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_esfi_es = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_esfi_es",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "spa",
    linked_to : ["opus_opensubtitles2013_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_esfi_fi = {
    title : "The EU bookshop corpus",
    description : "EUbookshop",
    id : "opus_eubookshop_esfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_esfi_es"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_eubookshop_esfi_es = {
    title : "The EU bookshop corpus",
    description : "EUbookshop",
    id : "opus_eubookshop_esfi_es",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "spa",
    linked_to : ["opus_eubookshop_esfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ecb_fifr_fr = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_ecb_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ecb_fifr_fi = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ecb_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_emea_fifr_fr = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_emea_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_fifr_fi = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_emea_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fifr_fr = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_opensubtitles2013_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2013_fifr_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fifr_fr = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles2011",
    id : "opus_opensubtitles2011_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_opensubtitles2011_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2011_fifr_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles2011",
    id : "opus_opensubtitles2011_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_eubookshop_fifr_fr = {
    title : "The EU bookshop corpus",
    description : "EUbookshop",
    id : "opus_eubookshop_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_eubookshop_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_fifr_fi = {
    title : "The EU bookshop corpus",
    description : "EUbookshop",
    id : "opus_eubookshop_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_fifr_fr = {
    title : "DGT - A collection of EU Translation Memories provided by the JRC",
    description : "DGT",
    id : "opus_dgt_fifr_fr",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fra",
    linked_to : ["opus_dgt_fifr_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_dgt_fifr_fi = {
    title : "DGT - A collection of EU Translation Memories provided by the JRC",
    description : "DGT",
    id : "opus_dgt_fifr_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_fifr_fr"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_kde4_defi_fi = {
    title : "KDE4",
    description : "KDE4",
    id : "opus_kde4_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_kde4_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_kde4_defi_de = {
    title : "KDE4",
    description : "KDE4",
    id : "opus_kde4_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_kde4_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};


settings.corpora.opus_emea_defi_fi = {
    title : "EMEA",
    description : "EMEA – European Medicines Agency documents",
    id : "opus_emea_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_emea_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_emea_defi_de = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_emea_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ecb_defi_fi = {
    title : "ECB",
    description : "ECB – European Central Bank corpus",
    id : "opus_ecb_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ecb_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ecb_defi_de = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_ecb_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_dgt_defi_fi = {
    title : "DGT",
    description : "DGT – A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_defi_de = {
    title : "DGT",
    description : "DGT – A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_dgt_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2013_defi_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_defi_de = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_opensubtitles2013_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2011_defi_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_defi_de = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles2011",
    id : "opus_opensubtitles2011_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_opensubtitles2011_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2012_defi_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_defi_de = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles2012",
    id : "opus_opensubtitles2012_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_opensubtitles2012_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_defi_fi = {
    title : "EUbookshop",
    description : "EUbookshop",
    id : "opus_eubookshop_defi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_defi_de"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_eubookshop_defi_de = {
    title : "EUbookshop",
    description : "EUbookshop",
    id : "opus_eubookshop_defi_de",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "deu",
    linked_to : ["opus_eubookshop_defi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_dgt_fisv_sv = {
    title : "DGT FI–SV",
    description : "A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_fisv_sv",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "swe",
    linked_to : ["opus_dgt_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_dgt_fisv_fi = {
    title : "DGT FI–SV",
    description : "A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_fisv_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_eubookshop_fisv_sv = {
    title : "EUbookshop",
    description : "EUbookshop",
    id : "opus_eubookshop_fisv_sv",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "swe",
    linked_to : ["opus_eubookshop_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_fisv_fi = {
    title : "EUbookshop",
    description : "EUbookshop",
    id : "opus_eubookshop_fisv_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fisv_fi = {
    title : "OpenSubtitles2012",
    description : "OpenSubtitles 2012",
    id : "opus_opensubtitles2012_fisv_fi",
    lang : "fin",
    linked_to : ["opus_opensubtitles2012_fisv_sv"],
    context: context.alignAligned,
    within: {"sentence":"sentence"},
    attributes : {},
    within : settings.spWithin,
    context : settings.spContext,
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2012_fisv_sv = {
    title : "OpenSubtitles2012 SV",
    description : "OpenSubtitles2012 SV",
    id : "opus_opensubtitles2012_fisv_sv",
    lang : "swe",
    linked_to : ["opus_opensubtitles2012_fisv_fi"],
    context: context.alignAligned,
    within: {"sentence":"sentence"},
    attributes : {},
    within : settings.spWithin,
    context : settings.spContext,
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2013_fisv_fi = {
    title : "OpenSubtitles2013",
    description : "OpenSubtitles 2013",
    id : "opus_opensubtitles2013_fisv_fi",
    lang : "fin",
    linked_to : ["opus_opensubtitles2013_fisv_sv"],
    context: context.alignAligned,
    within: {"sentence":"sentence"},
    attributes : {},
    within : settings.spWithin,
    context : settings.spContext,
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2013_fisv_sv = {
    title : "OpenSubtitles2013 SV",
    description : "OpenSubtitles2013 SV",
    id : "opus_opensubtitles2013_fisv_sv",
    lang : "swe",
    linked_to : ["opus_opensubtitles2013_fisv_fi"],
    context: context.alignAligned,
    within: {"sentence":"sentence"},
    attributes : {},
    within : settings.spWithin,
    context : settings.spContext,
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensubtitles2011_fisv_fi = {
    title : "OpenSubtitles2011",
    description : "OpenSubtitles 2011",
    id : "opus_opensubtitles2011_fisv_fi",
    lang : "fin",
    linked_to : ["opus_opensubtitles2011_fisv_sv"],
    context: context.alignAligned,
    within: {"sentence":"sentence"},
    attributes : {},
    within : settings.spWithin,
    context : settings.spContext,
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensubtitles2011_fisv_sv = {
    title : "OpenSubtitles2011 SV",
    description : "OpenSubtitles2011 SV",
    id : "opus_opensubtitles2011_fisv_sv",
    lang : "swe",
    linked_to : ["opus_opensubtitles2011_fisv_fi"],
    context: context.alignAligned,
    within: {"sentence":"sentence"},
    attributes : {},
    within : settings.spWithin,
    context : settings.spContext,
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_kde4_fisv_sv = {
    title : "KDE4",
    description : "KDE4",
    id : "opus_kde4_fisv_sv",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "swe",
    linked_to : ["opus_kde4_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_kde4_fisv_fi = {
    title : "KDE4 FI–SV",
    description : "A parallel corpus of KDE4 localization files (v.2)",
    id : "opus_kde4_fisv_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_kde4_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};


settings.corpora.opus_dgt_enfi_fi = {
    title : "DGT",
    description : "A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_dgt_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_dgt_enfi_en = {
    title : "DGT",
    description : "A collection of EU Translation Memories provided by the JRC",
    id : "opus_dgt_enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "eng",
    linked_to : ["opus_dgt_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_enfi_fi = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_emea_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_emea_enfi_en = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "eng",
    linked_to : ["opus_emea_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes : {
    },
    within : settings.spWithin,
    context : settings.spContext,
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_fisv_sv = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_fisv_sv",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "swe",
    linked_to : ["opus_emea_fisv_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_emea_fisv_fi = {
    title : "EMEA",
    description : "EMEA - European Medicines Agency documents",
    id : "opus_emea_fisv_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_emea_fisv_sv"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensub2013enfi_fi = {
    title : "OpenSubtitles2013",
    description : "Opensubtitles 2013",
    id : "opus_opensub2013enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensub2013enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensub2013enfi_en = {
    title : "Opensubtitles 2013 EN",
    description : "Opensubtitles 2013 EN",
    id : "opus_opensub2013enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "eng",
    linked_to : ["opus_opensub2013enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensub2015enfi_fi = {
    title : "Opensubtitles 2015",
    description : "Opensubtitles 2015",
    id : "opus_opensub2015enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensub2015enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensub2015enfi_en = {
    title : "Opensubtitles 2015 EN",
    description : "Opensubtitles 2015 EN",
    id : "opus_opensub2015enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "eng",
    linked_to : ["opus_opensub2015enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensub2011enfi_fi = {
    title : "OpenSubtitles2011",
    description : "Opensubtitles 2011",
    id : "opus_opensub2011enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensub2011enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensub2011enfi_en = {
    title : "Opensubtitles 2011 EN",
    description : "Opensubtitles 2011 EN",
    id : "opus_opensub2011enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "eng",
    linked_to : ["opus_opensub2011enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_opensub2012enfi_fi = {
    title : "OpenSubtitles2012",
    description : "Opensubtitles 2012",
    id : "opus_opensub2012enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_opensub2012enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_opensub2012enfi_en = {
    title : "Opensubtitles 2012 EN",
    description : "Opensubtitles 2012 EN",
    id : "opus_opensub2012enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "eng",
    linked_to : ["opus_opensub2012enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_ecb_enfi_fi = {
    title : "ECB",
    description : "ECB - European Central Bank corpus",
    id : "opus_ecb_enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_ecb_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_ecb_enfi_en = {
    title : "ECB EN",
    description : "ECB EN",
    id : "opus_ecb_enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "eng",
    linked_to : ["opus_ecb_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_enfi_en = {
    title : "EUbookshop",
    description : "EUbookshop",
    id : "opus_eubookshop_enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "eng",
    linked_to : ["opus_eubookshop_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus,
    hide : true
};

settings.corpora.opus_eubookshop_enfi_fi = {
    title : "EUbookshop",
    description : "EUbookshop",
    id : "opus_eubookshop_enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_eubookshop_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_tatoeba_enfi_fi = {
    title : "Tatoeba",
    description : "Käännettyjen lauseiden tietokanta (A DB of translated sentences)",
    id : "opus_tatoeba_enfi_fi",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "fin",
    linked_to : ["opus_tatoeba_enfi_en"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.opus
};

settings.corpora.opus_tatoeba_enfi_en = {
    title : "Tatoeba EN–FI EN",
    description : "A DB of translated sentences",
    id : "opus_tatoeba_enfi_en",
    urn : "urn_placeholder",
    metadata_urn : "urn:nbn:fi:lb-2015102201",
    lang : "eng",
    linked_to : ["opus_tatoeba_enfi_fi"],
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes : {
    },
    within : settings.spWithin,
    context : settings.spContext,
    struct_attributes : sattrlist.opus,
    hide : true
};

/* Europarl V7 */

settings.corpora.europarl_v7_enfi_en = {
    title : "EuroParl v7 EN",
    description : "euroParl_v7_enfi_en",
    id : "europarl_v7_enfi_en",
    urn : "urn:nbn:fi:lb-2015042002",
    metadata_urn : "urn:nbn:fi:lb-2015042001",
    lang : "eng",
    linked_to : ["europarl_v7_enfi_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.europarl_v7,
    hide : true
};


settings.corpora.europarl_v7_etfi_et = {
    title : "EuroParl v7 ET",
    description : "euroParl_v7_etfi_et",
    id : "europarl_v7_etfi_et",
    urn : "urn:nbn:fi:lb-2015042002",
    metadata_urn : "urn:nbn:fi:lb-2015042001",
    lang : "est",
    linked_to : ["europarl_v7_etfi_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.europarl_v7,
    hide : true
};

settings.corpora.europarl_v7_esfi_es = {
    title : "EuroParl v7 ES",
    description : "euroParl_v7_esfi_es",
    id : "europarl_v7_esfi_es",
    urn : "urn:nbn:fi:lb-2015042002",
    metadata_urn : "urn:nbn:fi:lb-2015042001",
    lang : "spa",
    linked_to : ["europarl_v7_esfi_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.europarl_v7,
    hide : true
};

settings.corpora.europarl_v7_frfi_fr = {
    title : "EuroParl v7 FR",
    description : "euroParl_v7_frfi_fr",
    id : "europarl_v7_frfi_fr",
    urn : "urn:nbn:fi:lb-2015042002",
    metadata_urn : "urn:nbn:fi:lb-2015042001",
    lang : "fra",
    linked_to : ["europarl_v7_frfi_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.europarl_v7,
    hide : true
};

settings.corpora.europarl_v7_defi_de = {
    title : "EuroParl v7 DE",
    description : "euroParl_v7_defi_de",
    id : "europarl_v7_defi_de",
    urn : "urn:nbn:fi:lb-2015042002",
    metadata_urn : "urn:nbn:fi:lb-2015042001",
    lang : "deu",
    linked_to : ["europarl_v7_defi_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.europarl_v7,
    hide : true
};

settings.corpora.europarl_v7_svfi_sv = {
    title : "EuroParl v7 SV",
    description : "euroParl_v7_svfi_sv",
    id : "europarl_v7_svfi_sv",
    urn : "urn:nbn:fi:lb-2015042002",
    metadata_urn : "urn:nbn:fi:lb-2015042001",
    lang : "swe",
    linked_to : ["europarl_v7_svfi_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.europarl_v7,
    hide : true
};

settings.corpora.europarl_v7_etfi_fi = {
    title : "EuroParl suomi–viro",
    description : "EuroParl suomi–viro-rinnakkaiskorpus (EuroParl v7)",
    id : "europarl_v7_etfi_fi",
    urn : "urn:nbn:fi:lb-2015042002",
    metadata_urn : "urn:nbn:fi:lb-2015042001",
    lang : "fin",
    linked_to : ["europarl_v7_etfi_et"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.europarl_v7
};

settings.corpora.europarl_v7_esfi_fi = {
    title : "EuroParl suomi–espanja",
    description : "EuroParl suomi–espanja-rinnakkaiskorpus (EuroParl v7)",
    id : "europarl_v7_esfi_fi",
    urn : "urn:nbn:fi:lb-2015042002",
    metadata_urn : "urn:nbn:fi:lb-2015042001",
    lang : "fin",
    linked_to : ["europarl_v7_esfi_es"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.europarl_v7
};

settings.corpora.europarl_v7_frfi_fi = {
    title : "EuroParl suomi–ranska",
    description : "EuroParl suomi–ranska-rinnakkaiskorpus (EuroParl v7)",
    id : "europarl_v7_frfi_fi",
    urn : "urn:nbn:fi:lb-2015042002",
    metadata_urn : "urn:nbn:fi:lb-2015042001",
    lang : "fin",
    linked_to : ["europarl_v7_frfi_fr"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.europarl_v7
};

settings.corpora.europarl_v7_defi_fi = {
    title : "EuroParl suomi–saksa",
    description : "EuroParl suomi–saksa-rinnakkaiskorpus (EuroParl v7)",
    id : "europarl_v7_defi_fi",
    urn : "urn:nbn:fi:lb-2015042002",
    metadata_urn : "urn:nbn:fi:lb-2015042001",
    lang : "fin",
    linked_to : ["europarl_v7_defi_de"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.europarl_v7
};

settings.corpora.europarl_v7_enfi_fi = {
    title : "EuroParl suomi–englanti",
    description : "EuroParl suomi–englanti-rinnakkaiskorpus (EuroParl v7)",
    id : "europarl_v7_enfi_fi",
    urn : "urn:nbn:fi:lb-2015042002",
    metadata_urn : "urn:nbn:fi:lb-2015042001",
    lang : "fin",
    linked_to : ["europarl_v7_enfi_en"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.europarl_v7
};

settings.corpora.europarl_v7_svfi_fi = {
    title : "EuroParl suomi–ruotsi",
    description : "EuroParl suomi–ruotsi-rinnakkaiskorpus (EuroParl v7)",
    id : "europarl_v7_svfi_fi",
    urn : "urn:nbn:fi:lb-2015042002",
    metadata_urn : "urn:nbn:fi:lb-2015042001",
    lang : "fin",
    linked_to : ["europarl_v7_svfi_sv"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.europarl_v7
};


/* KFSPC */
settings.corpora.kfspc_sv = {
    title : "Kotus Finnish-Swedish Parallel Corpus (ruotsi)",
    description : "KFSPC (ruotsi)",
    id : "kfspc_sv",
    urn : "urn:nbn:fi:lb-201406035",
    metadata_urn : "urn:nbn:fi:lb-201406036",
    lang : "swe",
    linked_to : ["kfspc_fi"],
    context: context.defaultAligned,
    within: {
        "sentence": "sentence"
        },
    attributes : {
    },
    struct_attributes : sattrlist.kfspc,
    hide : true
};

/* JRC */

settings.corpora.jrc_acquis_enfi_en = {
    title : "JRC-Acquis englanti",
    description : "jrc_acquis_enfi_en",
    id : "jrc_acquis_enfi_en",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061201",
    lang : "eng",
    linked_to : ["jrc_acquis_enfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis,
    hide : true
};

settings.corpora.jrc_acquis_enfi_fi = {
    title : "JRC-Acquis suomi–englanti",
    description : "JRC-Acquis suomi–englanti",
    id : "jrc_acquis_enfi_fi",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061201",
    lang : "fin",
    linked_to : ["jrc_acquis_enfi_en"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis
};


settings.corpora.jrc_acquis_hufi_hu = {
    title : "JRC-Acquis unkari",
    description : "jrc_acquis_hufi_hu",
    id : "jrc_acquis_hufi_hu",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061205",
    lang : "hun",
    linked_to : ["jrc_acquis_hufi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis,
    hide : true
};

settings.corpora.jrc_acquis_hufi_fi = {
    title : "JRC-Acquis suomi–unkari",
    description : "JRC-Acquis suomi–unkari",
    id : "jrc_acquis_hufi_fi",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061205",
    lang : "fin",
    linked_to : ["jrc_acquis_hufi_hu"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_frfi_fr = {
    title : "JRC-Acquis ranska",
    description : "jrc_acquis_frfi_fr",
    id : "jrc_acquis_frfi_fr",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061203",
    lang : "fra",
    linked_to : ["jrc_acquis_frfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis,
    hide : true
};

settings.corpora.jrc_acquis_frfi_fi = {
    title : "JRC-Acquis suomi–ranska",
    description : "JRC-Acquis suomi–ranska",
    id : "jrc_acquis_frfi_fi",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061203",
    lang : "fin",
    linked_to : ["jrc_acquis_frfi_fr"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_plfi_pl = {
    title : "JRC-Acquis puola",
    description : "jrc_acquis_plfi_pl",
    id : "jrc_acquis_plfi_pl",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061207",
    lang : "pol",
    linked_to : ["jrc_acquis_plfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis,
    hide : true
};

settings.corpora.jrc_acquis_plfi_fi = {
    title : "JRC-Acquis suomi–puola",
    description : "JRC-Acquis suomi–puola",
    id : "jrc_acquis_plfi_fi",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061207",
    lang : "fin",
    linked_to : ["jrc_acquis_plfi_pl"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_itfi_it = {
    title : "JRC-Acquis italia",
    description : "jrc_acquis_itfi_it",
    id : "jrc_acquis_itfi_it",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061206",
    lang : "ita",
    linked_to : ["jrc_acquis_itfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis,
    hide : true
};

settings.corpora.jrc_acquis_itfi_fi = {
    title : "JRC-Acquis suomi–italia",
    description : "JRC-Acquis suomi–italia",
    id : "jrc_acquis_itfi_fi",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061206",
    lang : "fin",
    linked_to : ["jrc_acquis_itfi_it"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_esfi_es = {
    title : "JRC-Acquis espanja",
    description : "jrc_acquis_esfi_es",
    id : "jrc_acquis_esfi_es",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061208",
    lang : "spa",
    linked_to : ["jrc_acquis_esfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis,
    hide : true
};

settings.corpora.jrc_acquis_esfi_fi = {
    title : "JRC-Acquis suomi–espanja",
    description : "JRC-Acquis suomi–espanja",
    id : "jrc_acquis_esfi_fi",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061208",
    lang : "fin",
    linked_to : ["jrc_acquis_esfi_es"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_etfi_et = {
    title : "JRC-Acquis viro",
    description : "jrc_acquis_etfi_et",
    id : "jrc_acquis_etfi_et",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061202",
    lang : "est",
    linked_to : ["jrc_acquis_etfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis,
    hide : true
};

settings.corpora.jrc_acquis_etfi_fi = {
    title : "JRC-Acquis suomi–viro",
    description : "JRC-Acquis suomi–viro",
    id : "jrc_acquis_etfi_fi",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061202",
    lang : "fin",
    linked_to : ["jrc_acquis_etfi_et"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_defi_de = {
    title : "JRC-Acquis saksa",
    description : "jrc_acquis_defi_de",
    id : "jrc_acquis_defi_de",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061204",
    lang : "deu",
    linked_to : ["jrc_acquis_defi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis,
    hide : true
};

settings.corpora.jrc_acquis_defi_fi = {
    title : "JRC-Acquis suomi–saksa",
    description : "JRC-Acquis suomi–saksa",
    id : "jrc_acquis_defi_fi",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061204",
    lang : "fin",
    linked_to : ["jrc_acquis_defi_de"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis
};

settings.corpora.jrc_acquis_svfi_sv = {
    title : "JRC-Acquis ruotsi",
    description : "jrc_acquis_svfi_sv",
    id : "jrc_acquis_svfi_sv",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061209",
    lang : "swe",
    linked_to : ["jrc_acquis_svfi_fi"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis,
    hide : true
};

settings.corpora.jrc_acquis_svfi_fi = {
    title : "JRC-Acquis suomi–ruotsi",
    description : "JRC-Acquis suomi–ruotsi",
    id : "jrc_acquis_svfi_fi",
    urn : "unspecified",
    metadata_urn : "urn:nbn:fi:lb-2015061209",
    lang : "fin",
    linked_to : ["jrc_acquis_svfi_sv"],
    context: context.alignAligned,
    within: {
        "sentence": "sentence"
    },
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
    },
    struct_attributes : sattrlist.jrc_acquis
};


/* */


/* KFSPC */
settings.corpora.kfspc_fi = {
    title : "Kotus Finnish-Swedish Parallel Corpus (suomi)",
    description : "KFSPC (suomi)",
    id : "kfspc_fi",
    urn : "urn:nbn:fi:lb-201406035",
    metadata_urn : "urn:nbn:fi:lb-201406036",
    lang : "fin",
    linked_to : ["kfspc_sv"],
    context : context.defaultAligned,
    within : {
        "sentence": "sentence"
        },
    attributes : {
    },
    struct_attributes : sattrlist.kfspc
};

/*
settings.corpora.europarl_fi = {
    id : "europarl_fi",
    lang : "fin",
    linked_to : ["europarl_en"],
    title: "EuroParl suomi–englanti-rinnakkaiskorpus",
    context: context.defaultAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: {},
    struct_attributes : {}
};

settings.corpora.europarl_en = {
    id : "europarl_en",
    lang : "eng",
    linked_to : ["europarl_fi"],
    title: "EuroParl suomi–englanti-rinnakkaiskorpus",
    context: context.defaultAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: {},
    struct_attributes : {},
    hide : true
};
*/


// Make a deep copy of sattrlist.mulcold and then extend it
sattrlist.parfin = $.extend(
    true, {}, sattrlist.mulcold,
    {
	align_text_translator : {
	    label : "text_translator"
	}
    }
);


settings.corpora.mulcold_fi = {
    id : "mulcold_fi",
    lang : "fin",
    linked_to : ["mulcold_en", "mulcold_sv", "mulcold_ru", "mulcold_de"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (suomi)",
    description : "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_fi,
    struct_attributes : sattrlist.mulcold
};

settings.corpora.mulcold_en = {
    id : "mulcold_en",
    lang : "eng",
    linked_to : ["mulcold_fi", "mulcold_sv", "mulcold_ru", "mulcold_de"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (englanti)",
    description : "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_en,
    struct_attributes : sattrlist.mulcold,
    hide : true
};

settings.corpora.mulcold_sv = {
    id : "mulcold_sv",
    lang : "swe",
    linked_to : ["mulcold_fi", "mulcold_en", "mulcold_ru", "mulcold_de"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (ruotsi)",
    description : "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_sv,
    struct_attributes : sattrlist.mulcold,
    hide : true
};

settings.corpora.mulcold_ru = {
    id : "mulcold_ru",
    lang : "rus",
    linked_to : ["mulcold_fi", "mulcold_en", "mulcold_sv", "mulcold_de"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (venäjä)",
    description : "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_ru,
    struct_attributes : sattrlist.mulcold,
    hide : true
};

settings.corpora.mulcold_de = {
    id : "mulcold_de",
    lang : "deu",
    linked_to : ["mulcold_fi", "mulcold_en", "mulcold_sv", "mulcold_ru"],
    title: "MULCOLD – Multilingual Corpus of Legal Documents (saksa)",
    description : "Monikielinen juridisten tekstien korpus: suomi–venäjä, suomi–ruotsi–englanti–venäjä, suomi–ruotsi–englanti–saksa, suomi–saksa",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_de,
    struct_attributes : sattrlist.mulcold,
    hide : true
};


settings.corpora.parfin_fi = {
    id : "parfin_fi",
    lang : "fin",
    linked_to : ["parfin_ru"],
    title: "ParFin",
    description : "Suomenkielisiä kaunokirjallisia teoksia ja niiden käännöksiä venäjäksi",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_fi,
    struct_attributes : sattrlist.parfin,
    limited_access : true,
    licence_type : "RES"
};

settings.corpora.parfin_ru = {
    id : "parfin_ru",
    lang : "rus",
    linked_to : ["parfin_fi"],
    title: "ParFin",
    description : "Suomenkielisiä kaunokirjallisia teoksia ja niiden käännöksiä venäjäksi",
    context: context.alignAligned,
    within: {
	"sentence": "sentence"
    },
    attributes: attrlist.mulcold_ru,
    struct_attributes : sattrlist.parfin,
    limited_access : true,
    licence_type : "RES",
    hide : true
};


/*
settings.parallel_corpora.testpar = {
    "default" : "testpar_fi",
    testpar_fi : {
	id : "testpar_fi",
	lang : "fin",
        parent : "testpar",
        title: "Testpar suomi–englanti-rinnakkaiskorpustesti",
        context: context.spContext,
        within: {
            "sentence" : "sentence"
        },
        attributes: {},
        struct_attributes : {}
    },
    testpar_en : {
	id : "testpar_en",
	lang : "eng",
        parent : "testpar",
        title: "Testpar suomi–englanti-rinnakkaiskorpustesti",
        context: context.spContext,
        within: {
            "sentence" : "sentence"
        },
        attributes: {},
        struct_attributes : {},
        hide : true
    }
};


settings.parallel_corpora.testpar4 = {
    "default" : "testpar4_fi",
    testpar4_fi : {
	id : "testpar4_fi",
	lang : "fin",
        parent : "testpar4",
        title: "Testpar4 suomi–englanti–ruotsi–saksa-rinnakkaiskorpustesti",
        context: context.spContext,
        within: {
            "sentence" : "sentence"
        },
        attributes: {},
        struct_attributes : {}
    },
    testpar4_en : {
	id : "testpar4_en",
	lang : "eng",
        parent : "testpar4",
        title: "Testpar4 suomi–englanti–ruotsi–saksa-rinnakkaiskorpustesti",
        context: context.spContext,
        within: {
            "sentence" : "sentence"
        },
        attributes: {},
        struct_attributes : {},
        hide : true
    },
    testpar4_sv : {
	id : "testpar4_sv",
	lang : "swe",
        parent : "testpar4",
        title: "Testpar4 suomi–englanti–ruotsi–saksa-rinnakkaiskorpustesti",
        context: context.spContext,
        within: {
            "sentence" : "sentence"
        },
        attributes: {},
        struct_attributes : {},
        hide : true
    },
    testpar4_de : {
	id : "testpar4_de",
	lang : "deu",
        parent : "testpar4",
        title: "Testpar4 suomi–englanti–ruotsi–saksa-rinnakkaiskorpustesti",
        context: context.spContext,
        within: {
            "sentence" : "sentence"
        },
        attributes: {},
        struct_attributes : {},
        hide : true
    }
};
*/


var locally_available_corpora = ["europarl_.*"];

if (! isPublicServer) {
    settings.fn.remove_matching_corpora(locally_available_corpora, true);
} else {
    settings.fn.remove_matching_corpora(["test.*"]);
}

delete locally_available_corpora;


settings.fn.add_attr_extra_properties(settings.corpora);


window.cl = settings.corpusListing = new ParallelCorpusListing(settings.corpora);
delete ParallelCorpusListing;
delete context;
