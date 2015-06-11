
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
		    $location.search("search", "cqp|" + onLangChange())
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
				s.onSubmit()
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
	title : "EuroParl 7",
	contents : ["europarl_v7_enfi_fi", "europarl_v7_svfi_fi", "europarl_v7_defi_fi",
		    "europarl_v7_frfi_fi", "europarl_v7_esfi_fi", "europarl_v7_etfi_fi"]
};

settings.corporafolders.jrc = {
    title : "JRC-ACQUIS",
    contents : ["jrc_acquis_enfi_fi", "jrc_acquis_svfi_fi", "jrc_acquis_defi_fi",
		"jrc_acquis_esfi_fi", "jrc_acquis_etfi_fi", "jrc_acquis_frfi_fi",
		"jrc_acquis_itfi_fi", "jrc_acquis_hufi_fi", "jrc_acquis_plfi_fi"]
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
    metadata_urn : "unspecified",
    lang : "en",
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
    metadata_urn : "unspecified",
    lang : "fi",
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
    metadata_urn : "unspecified",
    lang : "hu",
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
    metadata_urn : "unspecified",
    lang : "fi",
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
    metadata_urn : "unspecified",
    lang : "fr",
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
    metadata_urn : "unspecified",
    lang : "fi",
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
    metadata_urn : "unspecified",
    lang : "pl",
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
    metadata_urn : "unspecified",
    lang : "fi",
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
    metadata_urn : "unspecified",
    lang : "it",
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
    metadata_urn : "unspecified",
    lang : "fi",
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
    metadata_urn : "unspecified",
    lang : "es",
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
    metadata_urn : "unspecified",
    lang : "fi",
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
    metadata_urn : "unspecified",
    lang : "et",
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
    metadata_urn : "unspecified",
    lang : "fi",
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
    metadata_urn : "unspecified",
    lang : "de",
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
    metadata_urn : "unspecified",
    lang : "fi",
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
    metadata_urn : "unspecified",
    lang : "sv",
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
    metadata_urn : "unspecified",
    lang : "fi",
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

attrlist = {};
attrlist.mulcold_fi = {
    lemma : attrs.baseform,
    lemmacomp : attrs.baseform_compound,
    pos : attrs.pos_mulcold_fi,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos,
    ambmsd : attrs.ambiguous_msd
};
attrlist.mulcold_ru = {
    lemma : attrs.baseform,
    pos : attrs.pos_mulcold_ru,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos,
    ambmsd : attrs.ambiguous_msd
};
attrlist.mulcold_en = {
    lemma : attrs.baseform,
    pos : attrs.pos_mulcold_en,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos,
    ambmsd : attrs.ambiguous_msd
};
attrlist.mulcold_sv = {
    lemma : attrs.baseform,
    lemmacomp : attrs.baseform_compound,
    pos : attrs.pos_mulcold_sv,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos,
    ambmsd : attrs.ambiguous_msd
};
attrlist.mulcold_de = {
};

sattrlist = {};
sattrlist.mulcold = {
    align_text_code : {
	label : "text_code"
    },
    align_text_author : {
	label : "text_author"
    },
    align_text_title : {
	label : "text_title"
    },
    align_text_typeoftext : {
	label : "text_typeoftext"
    },
    align_text_genre : sattrs.text_genre,
    align_text_period : {
	label : "text_period"
    },
    align_text_publisher : {
	label : "text_publisher"
    },
    sentence_id : sattrs.sentence_id_hidden
};
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
