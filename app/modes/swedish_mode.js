// -*- coding: utf-8 -*-

settings.primaryColor = "#EEBA94";
settings.primaryLight = "#F5D4BB";
settings.autocomplete = true;
settings.lemgramSelect = true;
settings.wordpicture = false;
settings.show_related_words = true;


settings.preselected_corpora = ["mulcold_sv", "kfspc_sv"];


$("#lemgram_list_item").remove();
$("#results-lemgram").remove();

sattrlist.klk_sv = $.extend({}, sattrlist.klk);
sattrlist.klk_sv_parsed = $.extend(
    {}, sattrlist.klk_sv,
    {
        paragraph_n: {
            label: "sentence_n",
            displayType: "hidden"
        },
        sentence_n: {
            label: "sentence_n",
            displayType: "hidden"
        }
    });

sattrlist.klk_sv_parsed_pagelinks = $.extend(
    {}, sattrlist.klk_sv_parsed, sattrlist.klk_pagelinks);

attrlist.klk_sv = {
    ocr: {
        label: "OCR",
        opts: settings.defaultOptions,
    }
};

attrlist.klk_sv_parsed =
    $.extend(
        {
            pos: attrs.pos,
            msd: attrs.msd,
            lemma: attrs.baseform_sv,
            lex: attrs.lemgram,
            saldo: attrs.saldo,
            dephead: attrs.dephead,
            deprel: attrs.deprel,
            ref: attrs.ref,
            prefix: attrs.prefix,
            suffix: attrs.suffix
        },
        attrlist.klk_sv);

attrlist.klk_sv_parsed_pagelinks = attrlist.klk_sv_parsed;


settings.corpora = {};
settings.corporafolders = {};

/*
settings.corporafolders.koff = {
    title: "Paul Sinebrychoffs brevsamling",
    description: "Paul Sinebrychoffs brevsampling (1895-1908)",
    info: {
        metadata_urn: "urn:nbn:fi:lb-201407303",
        licence: settings.licenceinfo.CC_BY_30,
    },
    contents: ["sinebrychoff_orig", "sinebrychoff_fi"]
    };*/

/*
settings.corporafolders.koff = {
    title: "Paul Sinebrychoffs brevsamling",
    description: "Paul Sinebrychoffs brevsamling (1895-1908)",
    contents: ["sinebrychoff_orig", "sinebrychoff_fi"]
    };
*/

settings.corporafolders.finlex_par_test = {
    title : "Finlex-parallelltest (bara orden) - svenska delen",
    description : "Finlex-parallelltest (bara orden) - svenska delen",
    contents: ["test_asd_par_sv", "test_kko_sv", "test_kho_sv"],
    info: {
	licence: settings.licenceinfo.CC_BY,
    }
};

settings.corporafolders.ethesis = {
    title: "E-thesis",
    contents: ["ethesis_sv_dissabs", "ethesis_sv_maabs", "ethesis_sv_phd", "ethesis_sv_ma"],
    info: {
	cite_id: "e-thesis-sv",
    }
};

settings.corporafolders.klk_sv = {
    title: "Nationalbibliotekets svenskspråkiga tidningar och tidskrifter",
    description: "Svenskspråkiga tidningar och tidskrifter i Nationalbibliotekets digitala samlingar, Kielipankki-version",
    info: {
	urn: "urn:nbn:fi:lb-2014091901",
	metadata_urn: "urn:nbn:fi:lb-201405276",
	licence: settings.licenceinfo.CC_BY,
	cite_id: "KLK-sv",
    }
};

settings.corporafolders.fstc = {
    title: "Finlandssvensk textkorpus (UHLCS) (FISC/FSTC)",
    description: "Finlandssvensk textcorpus (UHLCS): delkorpusar som var i Lemmie-servicen, morfosyntaktiskt analyserade med SWECG",
    info: {
	urn: "urn:nbn:fi:lb-2016112318",
	metadata_urn: "urn:nbn:fi:lb-2016050213",
	lbr_id: "urn:nbn:fi:lb-2016050212",
	licence: {
	    name: "CLARIN RES +PLAN +NC +LOC +ND",
	    urn: "urn:nbn:fi:lb-20150304123",
	},
	homepage: {
	    name: "Beskrivning",
	    url: "https://kitwiki.csc.fi/twiki/bin/view/FinCLARIN/KielipankkiAineistotFstc",
	    no_label: true,
	},
	cite_id: "fstc-korp",
    },
};


var klk_sv_parsed_years = settings.fn.make_yearlist(1771, 1948);


// Generate settings.corpora and settings.corporafolders for the
// Swedish KLK corpora by using functions defined in config.js

settings.fn.make_corpus_settings_by_year_decade(
    settings.corporafolders.klk_sv, "sv_{decade}", "klk_sv_{year}",
    function(decade) {
        return { title: decade.toString() + "-talet" };
    },
    function(year) {
        return settings.fn.make_klk_corpus_settings(
            "Nationalbiblioteket svenska {year}",
            "Nationalbibliotekets svenskspråkiga tidningar och tidskrifter från {year}",
            "sv",
            year,
            klk_sv_parsed_years.indexOf(year) != -1);
    },
    settings.fn.make_yearlist(
        1771, 1948,
        {descending: true,
         omit: [1779, 1780, 1781, 1786, 1787, 1788, 1790]}
    )
);


delete klk_sv_parsed_years;

settings.corpora.test_asd_par_sv = {
    id : "test_asd_par_sv",
    title : "på svenska: Säädöskokoelmatesti (pelkät sanat)",
    description : "på svenska: Alkuperäisiä säädöksiä vuosilta 1920-2017.",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes: {},
    struct_attributes : {
	text_url : {
	    label : "URL",
	    type : "url",
	    url_opts : sattrs.link_url_opts
	}
    }
};

settings.corpora.test_kko_sv = {
    id : "test_kko_sv",
    title : "på svenska: Korkeimman oikeuden aineistotesti (pelkät sanat)",
    description : "på svenska: Alkuperäisiä aineistoja vuosilta 1980-2018.",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes: {},
    struct_attributes : {
	text_url : {
	    label : "URL",
	    type : "url",
	    url_opts : sattrs.link_url_opts
	}
    }
};

settings.corpora.test_kho_sv = {
    id : "test_kho_sv",
    title : "på svenska: Korkeimman hallinto-oikeuden aineistotesti (pelkät sanat)",
    description : "på svenska: Alkuperäisiä aineistoja vuosilta 2001-2018.",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes: {},
    struct_attributes : {
	text_url : {
	    label : "URL",
	    type : "url",
	    url_opts : sattrs.link_url_opts
	}
    }
};


/*ETHESIS*/
settings.corpora.ethesis_sv_ma = {
    title: "Masteruppsatser",
    description: "Masteruppsatser (1997-2016)",
    id: "ethesis_sv_ma",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_sv_maabs = {
    title: "Masteruppsatser (abstrakt)",
    description: "Masteruppsatser (abstrakt) (1999-2016)",
    id: "ethesis_sv_maabs",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_sv_dissabs = {
    title: "Doktorsavhandlingar (abstrakt)",
    description: "Doktorsavhandlingar (abstrakt) (2006-2016)",
    id: "ethesis_sv_dissabs",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_sv_phd = {
    title: "Doktorsavhandlingar",
    description: "Doktorsavhandlingar (2000-2016)",
    id: "ethesis_sv_phd",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.studentsvenska = {
    id: "studentsvenska",
    title: "Studentsvenska 79/80",
    description: "Studentsvenska 79/80",
    urn: "urn:nbn:fi:lb-2016081701",
    metadata_urn: "urn:nbn:fi:lb-20140730119",
    licence: {
	name: "CLARIN RES +PLAN +NC +PRIV 1.0",
	description: "CLARIN RES end-user licence +PLAN +NC +PRIV 1.0",
	urn: "urn:nbn:fi:lb-2016040410",
    },
    cite_id: "Studentsvenska",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    limited_access: true,
    licence_type: "RES",
    attributes: attrlist.studentsvenska,
    struct_attributes: sattrlist.studentsvenska
};


settings.corpora.mulcold_sv = {
    id: "mulcold_sv",
    title: "MULCOLD svenska",
    description: "Multilingual Corpus of Legal Documents, svenskspråkiga delen",
    cite_id: "MULCOLD",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.mulcold_sv,
    struct_attributes: sattrlist.mulcold,
};

settings.fn.extend_corpus_settings(settings.corpusinfo.mulcold,
				   ["mulcold_sv"]);


settings.corpora.topling_sv = {
    id: "topling_sv",
    title: "Topling (svenska)",
    description: "Topling – Inlärningsgångar i andraspråket, svensk delkorpus",
    urn: "urn:nbn:fi:lb-2016112903",
    metadata_urn: "urn:nbn:fi:lb-2016111801",
    lbr_id: "urn:nbn:fi:lb-20140730168",
    licence: {
	name: "CLARIN RES +NC +DEP 1.0",
	urn: "urn:nbn:fi:lb-2016112304",
    },
    homepage_url: "https://www.jyu.fi/topling",
    cite_id: "topling-sv",
    context: settings.spContext,
    within: settings.spWithin,
    limited_access: true,
    licence_type: "RES",
    // unselected: true,
    attributes: attrlist.topling,
    struct_attributes: sattrlist.topling
};

settings.corpus_aliases["topling-sv"] = "topling_sv";

settings.corpora.kfspc_sv = {
    title: "KFSPC svenska",
    description: "Kotus Finnish-Swedish Parallel Corpus, svenskspråkiga delen",
    id: "kfspc_sv",
    cite_id: "kfspc-korp-sv",
    lang: "swe",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: {
    },
    struct_attributes: sattrlist.kfspc,
};

settings.corpora.sinebrychoff_orig = {
    id: "sinebrychoff_orig",
    title: "Paul Sinebrychoffs brevsamling",
    description: "Paul Sinebrychoffs brevsamling",
    metadata_urn: "urn:nbn:fi:lb-201407303",
    licence: settings.licenceinfo.CC_BY_30,
    cite_id: "sinebrychoff-sv",
    context: settings.spContext,
    within: settings.spWithin,
    attributes: attrlist.sinebrychoff,
    struct_attributes: sattrlist.sinebrychoff
};



settings.fn.extend_corpus_settings(settings.corpusinfo.kfspc, ["kfspc_sv"]);


/* FSTC (Finland-Swedish Text Corpus) aka FISC */

// FSTC (sub)corpus hierarchy
fstc_hierarchy = [
    ["fnb", "Finska Notisbyrån 1999–2000", [
	["fnb1999", "Finska Notisbyrån 1999"],
	["fnb2000", "Finska Notisbyrån 2000"],
    ] ],
    ["hbl", "Hufvudstadsbladet 1998–1999", [
	["hbl1998", "Hufvudstadsbladet 1998"],
	["hbl1999", "Hufvudstadsbladet 1999"],
    ] ],
    ["jt", "Jakobstads Tidning 1999–2000", [
	["jt1999", "Jakobstads Tidning 1999"],
	["jt2000", "Jakobstads Tidning 2000"],
    ] ],
    ["soder", "Söderströms 1997–1999", [
	["soder_a", "Söderströms 1997–1999 A"],
	["soder_b", "Söderströms 1997–1999 B"],
    ] ],
    ["fisc", "FISC", "FISC – En finlandssvensk textkorpus", [
	["fisc_lit", "FISC Litteratur"],
	["fisc_myn", "FISC Myndighet"],
	["fisc_sak", "FISC Sakprosa"],
	["fisc_tid", "FISC Tidning"],
    ] ],
];

// Settings template for FSTC subcorpora
settings.templ.fstc = $.extend(true, {}, settings.templ.lemmie_common, {
    attributes: {
	lemma: attrs.baseform,
	lemmacomp: attrs.baseform_compound,
	pos: attrs.pos_swecg,
	msd: attrs.msd,
	id: attrs.id_hidden,
	lex: attrs.lemgram_hidden,
    },
    struct_attributes: {
	text_source: {
	    dataset: [
		"FISC Litteratur",
		"FISC Myndighet",
		"FISC Sakprosa",
		"FISC Tidning",
		"Finska Notisbyrån",
		"Hufvudstadsbladet",
		"Jakobstads Tidning",
		"Söderströms förlag",
	    ],
	},
	paragraph_type: {
	    // The values could be localized as in FTC, but we would
	    // need to decide the translations
	    localize: false,
	    translationKey: null,
	    dataset: {
		"author": "author",
		"bibl": "bibl",
		"body": "body",
		"byline": "byline",
		"caption": "caption",
		"closer": "closer",
		"date": "date",
		"div|div0|div1|div2|div3": "div",
		"emph": "emph",
		"entry": "entry",
		"footer": "footer",
		"group": "group",
		"head": "head",
		"header": "header",
		"hi": "hi",
		"item": "item",
		"l": "l",
		"list": "list",
		"note": "note",
		"omit": "omit",
		"opener": "opener",
		"p": "p",
		"q": "q",
		"quote": "quote",
		"resp": "resp",
		"rs": "rs",
		"signed": "signed",
		"title": "title",
	    },
	},
    }
});

// Create the FSTC corpus folder hierarchy and corpus settings
settings.fn.make_folder_hierarchy(
    settings.corporafolders.fstc, fstc_hierarchy,
    {
	id_prefix: "fstc_",
	description_prefix: "Finlandssvensk textkorpus (UHLCS): ",
	corpus_title_suffix: " (FSTC)",
	corpus_template: settings.templ.fstc,
    });

delete fstc_hierarchy;

// TODO: Add aliases for subcorpora, such as fstc_fnb
settings.corpus_aliases.fstc = "fstc_.*";


/* Svenska Parole */

settings.corpora.parole_sv = $.extend(true, {}, settings.templ.fstc, {
    title: "Svenska Parole",
    description: "Svenska Parole: sammanställd av Språkbanken vid Göteborgs unversitet, morfosyntaktiskt analyserad med SWECG",
    id: "parole_sv",
    urn: "urn:nbn:fi:lb-2016050208",
    metadata_urn: "urn:nbn:fi:lb-2016050211",
    licence: {
	name: "CLARIN RES +PLAN +NC +LOC +ND",
	urn: "urn:nbn:fi:lb-2015101602",
    },
    cite_id: "parole-sv",
    text_source: {
	dataset: ["Språkbanken, Göteborgs universitet"],
    },
    // Does it make sense to have a paragraph type with a single
    // value, to get the same structure as FSTC?
    paragraph_type: {
	dataset: ["p"]
    },
});



settings.fn.add_attr_extra_properties(settings.corpora);


settings.corpusListing = new CorpusListing(settings.corpora);
