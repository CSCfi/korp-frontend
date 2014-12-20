
settings.wordpicture = false;
settings.showSimpleSearch = false;

$("#lemgram_list_item").remove();
$("#results-lemgram").remove();
$("#search_options > div:last").remove();
$("#num_hits").prepend("<option value='10'>10</option>");

// for the language selects
var lang_prio = ["fi"].reverse();
var start_lang = "fi";

// var c1 = view.ExtendedSearch.prototype.constructor
var ext = view.ExtendedSearch.prototype
view.ExtendedSearch = Subclass(view.ExtendedSearch, function(mainDivId) {
	ext.constructor.call(this, mainDivId);
	// c.log("parallel constructor")
	// this.parent(mainDivId);
	var self = this;
	$("#linkedLang").click(function() {
		self.makeLangRow();
	});
	$("#removeLang").click(function() {
		$(".lang_row:last").remove();
		$("#linkedLang").attr("disabled", null);
		self.onUpdate();

	});
	var langsel = this.getLangSelect().prependTo("#query_table")
	.change(function() {
		self.onUpdate();
		self.invalidate($(this));
	});

	var pc = $.bbq.getState("parallel_corpora");
	if(pc) {
		var self = this;
		pc = pc.split(",").reverse();
		langsel.val(pc.pop());
		$.each(pc, function(i, item) {
			self.makeLangRow(item);
		});
	}
	langsel.change();
}, {


	invalidate : function(select) {
		var index = select.closest(".lang_row,#query_table").index();
		$(".lang_row,#query_table").filter($.format(":gt(%s)", index)).each(function() {
			$("#removeLang").click();
		});
		var langs = this.getEnabledLangs($(".lang_select").first().val());
		if(!langs.length)
			$("#linkedLang").attr("disabled", "disabled");
		else
			$("#linkedLang").attr("disabled", null);

		this.refreshTokens();
	},

	reset : function() {
		// ext.refreshTokens.call(this);
		$(".lang_row", this.main).remove()
		$("#query_table .lang_select", this.main).remove();
		this.getLangSelect().prependTo("#query_table");

		this.invalidate($(".lang_select", this.main).first())
	},

	onUpdate : function() {
		var corps = _.map($(".lang_select").get(), function(item) {
			return $(item).val();
		});
		$.bbq.pushState({"parallel_corpora" : corps.join(",")});
	},

	makeLangRow : function(start_val) {
		var self = this;
		var newRow = $("<div class='lang_row' />");
		$("#linkedLang").before(newRow);
		this.setupContainer(newRow);
		this.getLangSelect()
		.prependTo(".lang_row:last")
		.change(function() {
			self.invalidate($(this));
		})
		.val(start_val | null).change();

		this.onUpdate();
	},

	getEnabledLangs : function(mainLang) {
		var currentLangList = _.map($(".lang_select").get(), function(item) {
			return $(item).val();
		});
		var other =  _(settings.corpusListing.getLinksFromLangs([mainLang || start_lang]))
			.flatten()
			.pluck("lang").unique().value();

		return _.difference(other, currentLangList);



		// if(activeLangs.length) {
		// 	var links = settings.corpusListing.getLinksFromLangs(activeLangs);
		// 	output = _(links).flatten().pluck("lang").unique().value();
		// } else {
		// 	output = _(settings.corpusListing.selected).map(function(item) {
		// 		return settings.corpusListing.getLinked(item, true);
		// 	})
		// 	.flatten()
		// 	.pluck("lang")
		// 	.unique()
		// 	.value()
		// }
		// c.log ("output, activeLangs", output, activeLangs)
		// output = _.difference(output, activeLangs);
		// output = output.sort(function(a, b) {
		//     return lang_prio.indexOf(b) - lang_prio.indexOf(a)
		// });

		// return output;

		// var output = [];
		// // get the languages that are enabled given a list of active languages
		// if(activeLangs.length) {

		// 	var enabled = settings.corpusListing.getEnabledByLang(activeLangs[0])
		// 	$.each(activeLangs, function(i, lang) {
		// 		var set = _(settings.corpusListing.getEnabledByLang(lang, true))
		// 			.map(function(item) {
		// 				return settings.corpusListing.getLinked(item);
		// 			})
		// 			.flatten()
		// 			.filter(function(item) {
		// 				return $.inArray(item.lang, activeLangs) == -1;
		// 			})
		// 			.value()

		// 		enabled = _.intersection(enabled, set)

		// 	});
			
		// 	output = _.pluck(enabled , "lang");
		// } else {
		// 	output = _(settings.corpusListing.selected).map(function(item) {
		// 		return settings.corpusListing.getLinked(item, true);
		// 	})
		// 	.flatten()
		// 	.pluck("lang")
		// 	.value()
		// }

		// output = output.sort(function(a, b) {
		//     return lang_prio.indexOf(b) - lang_prio.indexOf(a)
		// });

		// return _.uniq(output);

	},

	getLangSelect : function() {
		var ul = $("<select/>").addClass("lang_select");

		// var prevLang = $(".lang_select:last").val();

		var langs = this.getEnabledLangs($(".lang_select").first().val());


		ul.append($.map(langs, function(item) {
			return $("<option />", {"val" : item}).localeKey(item).get(0);
		}));
		return ul;
	},

	getCorporaQuery : function() {
		var currentLangList = _.map($(".lang_select").get(), function(item) {
			return $(item).val();
		});

		var struct = settings.corpusListing.getLinksFromLangs(currentLangList);
		var output = [];
		$.each(struct, function(i, item) {
			main = item[0]

			var pair = _.map(item.slice(1), function(corp) {
				return main.id.toUpperCase() + "|" + corp.id.toUpperCase();
			});
			output.push(pair);
		});
		return output.join(",")
	}

});

var c2 = view.AdvancedSearch.prototype.constructor
view.AdvancedSearch = Subclass(view.AdvancedSearch, function() {
	c2.apply(this, arguments);
}, {

	updateCQP : function() {
		var currentLangList = _.map($(".lang_select").get(), function(item) {
			return $(item).val();
		});

		var struct = settings.corpusListing.getLinksFromLangs(currentLangList);

		function getLangMapping(excludeLangs) {
			return _(struct)
				.flatten()
				.filter(function(item) {
					return !_.contains(excludeLangs, item.lang);
				}).groupBy("lang").value()
		}
		var query = $("#query_table .query_token").map(function() {
	    	return $(this).extendedToken("getCQP");
	    }).get().join(" ");
		if(currentLangList.length > 1) {
			$(".lang_row").each(function(i, item) {			
				cqp = $(this).find(".query_token").map(function() {
			    	return $(this).extendedToken("getCQP");
			    }).get().join(" ");

				var lang = $(".lang_select", this).val();
				var langMapping = getLangMapping(currentLangList.slice(0, i + 1));
				// c.log ("langMapping", langMapping)
				query += ":LINKED_CORPUS:" + _(langMapping[lang]).pluck("id").invoke("toUpperCase").join("|") + " " + cqp;

			});
		}
	    this.setCQP(query);
	    return query;
	}
});

var c3 = view.KWICResults.prototype.constructor
view.KWICResults = Subclass(view.KWICResults, function() {
	c3.apply(this, arguments);
}, {

	onWordClick : function(word, sentence) {
		var data = word.tmplItem().data;
		var currentSentence = sentence.aligned;
		if(!currentSentence) currentSentence = sentence;
		var i = Number(data.dephead);
		var aux = $(word.closest("tr").find(".word").get(i - 1));
		this.selectionManager.select(word, aux);

		var isLinked = word.closest("tr").is(".linked_sentence");
		var corpus = isLinked ? _.keys(sentence.aligned)[0] : sentence.corpus.split("|")[0].toLowerCase();

		this.scrollToShowWord(word);

		$("#sidebar").sidebar("updateContent", isLinked ? {} : sentence.structs, data, corpus);
	},

	renderKwicResult : function(data, sourceCQP) {
		var self = this;
		this.renderResult(".results_table.kwic", data, sourceCQP).done(function() {
			var offset = $(".table_scrollarea").scrollLeft(0);
			$(".linked_sentence span:first-child").each(function(i, linked) {
				var mainLeft = $(linked).closest("tr").prev().find("span:first").offset().left;
				$(linked).parent().css("padding-left", Math.round(mainLeft));
			});
			self.centerScrollbar();
		});
	}

});

model.StatsProxy.prototype.makeRequest = function(){};

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

settings.corporafolders = {};

settings.corporafolders.europarl = {
	title : "EuroParl 7",
	contents : ["europarl_fi"]
};

settings.corporafolders.kfspc = {
    title : "Kotus Finnish-Swedish Parallel Corpus (KFSPC)",
    contents : ["kfspc_fi"]
};

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
settings.parallel_corpora = {};


/* KFSPC */
settings.corpora.kfspc_sv = {
    title : "Kotus Finnish-Swedish Parallel Corpus (ruotsi)",
    description : "KFSPC (ruotsi)",
    id : "kfspc_sv",
    lang : "sv",
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

/* KFSPC */
settings.corpora.kfspc_fi = {
    title : "Kotus Finnish-Swedish Parallel Corpus (suomi)",
    description : "KFSPC (suomi)",
    id : "kfspc_fi",
    lang : "fi",
    linked_to : ["kfspc_sv"],
    context : context.defaultAligned,
    within : {
        "sentence": "sentence"
        },
    attributes : {
    },
    struct_attributes : sattrlist.kfspc
};

settings.corpora.europarl_fi = {
    id : "europarl_fi",
    lang : "fi",
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
    lang : "en",
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
    lang : "fi",
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
    lang : "en",
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
    lang : "sv",
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
    lang : "ru",
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
    lang : "de",
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
    lang : "fi",
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
    lang : "ru",
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
	lang : "fi",
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
	lang : "en",
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
	lang : "fi",
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
	lang : "en",
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
	lang : "sv",
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
	lang : "de",
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




window.cl = settings.corpusListing = new ParallelCorpusListing(settings.corpora);
delete ParallelCorpusListing;
delete context;
