// -*- coding: utf-8 -*-

settings.primaryColor = "#edfcd5";
settings.primaryLight = "#f7fceb";
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
        paragraph_n : {
            label : "sentence_n",
            displayType : "hidden"
        },
        sentence_n : {
            label : "sentence_n",
            displayType : "hidden"
        }
    });

sattrlist.klk_sv_parsed_pagelinks = $.extend(
    {}, sattrlist.klk_sv_parsed, sattrlist.klk_pagelinks);

attrlist.klk_sv = {
    ocr : {
        label : "OCR",
        opts : settings.defaultOptions,
    }
};

attrlist.klk_sv_parsed =
    $.extend(
        {
            pos : attrs.pos,
            msd : attrs.msd,
            lemma : attrs.baseform_sv,
            lex : attrs.lemgram,
            saldo : attrs.saldo,
            dephead : attrs.dephead,
            deprel : attrs.deprel,
            ref : attrs.ref,
            prefix : attrs.prefix,
            suffix : attrs.suffix
        },
        attrlist.klk_sv);

attrlist.klk_sv_parsed_pagelinks = attrlist.klk_sv_parsed;


settings.corpora = {};
settings.corporafolders = {};

/*
settings.corporafolders.koff = {
    title : "Paul Sinebrychoffs brevsamling",
    description : "Paul Sinebrychoffs brevsampling (1895-1908)",
    info : {
        metadata_urn : "urn:nbn:fi:lb-201407303",
        licence : settings.licenceinfo.CC_BY_30,
    },
    contents : ["sinebrychoff_orig", "sinebrychoff_fi"]
    };*/

/*
settings.corporafolders.koff = {
    title: "Paul Sinebrychoffs brevsamling",
    description: "Paul Sinebrychoffs brevsamling (1895-1908)",
    contents: ["sinebrychoff_orig", "sinebrychoff_fi"]
    };
*/

settings.corporafolders.ethesis = {
    title : "E-thesis",
    contents : ["ethesis_sv_dissabs", "ethesis_sv_maabs", "ethesis_sv_phd", "ethesis_sv_ma"],
    info : {
	cite_id : "e-thesis-sv",
    }
};

settings.corporafolders.klk_sv = {
    title : "Nationalbibliotekets svenskspråkiga tidningar och tidskrifter",
    description : "Svenskspråkiga tidningar och tidskrifter i Nationalbibliotekets digitala samlingar, Kielipankki-version",
    info : {
	urn : "urn:nbn:fi:lb-2014091901",
	metadata_urn : "urn:nbn:fi:lb-201405276",
	licence : settings.licenceinfo.CC_BY,
	cite_id : "KLK-sv",
    }
};

settings.corporafolders.fstc = {
    title : "Finlandssvensk textkorpus (UHLCS) (FISC/FSTC)",
    description : "Finlandssvensk textcorpus (UHLCS): delkorpusar som var i Lemmie-servicen, morfosyntaktiskt analyserade med SWECG",
    info : {
	urn : "urn:nbn:fi:lb-2016112318",
	metadata_urn : "urn:nbn:fi:lb-2016050213",
	lbr_id : "urn:nbn:fi:lb-2016050212",
	licence : {
	    name : "CLARIN RES +PLAN +NC +LOC +ND",
	    urn : "urn:nbn:fi:lb-20150304123",
	},
	homepage : {
	    name : "Beskrivning",
	    url : "https://kitwiki.csc.fi/twiki/bin/view/FinCLARIN/KielipankkiAineistotFstc",
	    no_label : true,
	},
	cite_id : "fstc-korp",
    },
};

settings.corporafolders.yle_sv = {
    title : "Svenska Yles webbartiklar (beta)",
    description : "Svenska Yles webbartiklar (beta)<br/><br/>Mappen innehåller två korpusar med samma meningar men olik tillgänglighet och litet olika drag: den ena korpusen är öppen för alla, med meningarna i en blandad ordning inom varje text och utan utökad kontextvisning, medan den andra korpusen är tillgänglig för forskare, med meningarna i den ursprungliga ordningen och stöd till utökad kontextvisning.",
    contents : [
	"yle_sv_aca",
	"yle_sv_pub",
    ],
    info : {
	homepage : {
	    name : "Svenska Yle",
	    url : "https://svenska.yle.fi",
	    no_label : true,
	},
    },
};


var klk_sv_parsed_years = settings.fn.make_yearlist(1771, 1948);


// Generate settings.corpora and settings.corporafolders for the
// Swedish KLK corpora by using functions defined in config.js

settings.fn.make_corpus_settings_by_year_decade(
    settings.corporafolders.klk_sv, "sv_{decade}", "klk_sv_{year}",
    function(decade) {
        return { title : decade.toString() + "-talet" };
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
        {descending : true,
         omit : [1779, 1780, 1781, 1786, 1787, 1788, 1790]}
    )
);


delete klk_sv_parsed_years;

/*ETHESIS*/
settings.corpora.ethesis_sv_ma = {
    title : "Masteruppsatser",
    description : "Masteruppsatser (1997-2016)",
    id : "ethesis_sv_ma",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_sv_maabs = {
    title : "Masteruppsatser (abstrakt)",
    description : "Masteruppsatser (abstrakt) (1999-2016)",
    id : "ethesis_sv_maabs",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_sv_dissabs = {
    title : "Doktorsavhandlingar (abstrakt)",
    description : "Doktorsavhandlingar (abstrakt) (2006-2016)",
    id : "ethesis_sv_dissabs",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.ethesis
};

settings.corpora.ethesis_sv_phd = {
    title : "Doktorsavhandlingar",
    description : "Doktorsavhandlingar (2000-2016)",
    id : "ethesis_sv_phd",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : sattrlist.ethesis
};

settings.corpora.studentsvenska = {
    id : "studentsvenska",
    title: "Studentsvenska 79/80",
    description : "Studentsvenska 79/80",
    urn : "urn:nbn:fi:lb-2016081701",
    metadata_urn : "urn:nbn:fi:lb-20140730119",
    licence : {
	name : "CLARIN RES +PLAN +NC +PRIV 1.0",
	description : "CLARIN RES end-user licence +PLAN +NC +PRIV 1.0",
	urn : "urn:nbn:fi:lb-2016040410",
    },
    cite_id : "Studentsvenska",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    limited_access : true,
    licence_type : "RES",
    attributes: attrlist.studentsvenska,
    struct_attributes : sattrlist.studentsvenska
};


settings.corpora.mulcold_sv = {
    id : "mulcold_sv",
    title: "MULCOLD svenska",
    description : "Multilingual Corpus of Legal Documents, svenskspråkiga delen",
    cite_id : "MULCOLD",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes: attrlist.mulcold_sv,
    struct_attributes : sattrlist.mulcold,
};

settings.fn.extend_corpus_settings(settings.corpusinfo.mulcold,
				   ["mulcold_sv"]);


settings.corpora.topling_sv = {
    id : "topling_sv",
    title : "Topling (svenska)",
    description : "Topling – Inlärningsgångar i andraspråket, svensk delkorpus",
    urn : "urn:nbn:fi:lb-2016112903",
    metadata_urn : "urn:nbn:fi:lb-2016111801",
    lbr_id : "urn:nbn:fi:lb-20140730168",
    licence : {
	name : "CLARIN RES +NC +DEP 1.0",
	urn : "urn:nbn:fi:lb-2016112304",
    },
    homepage_url : "https://www.jyu.fi/topling",
    cite_id : "topling-sv",
    context : settings.spContext,
    within : settings.spWithin,
    limited_access : true,
    licence_type : "RES",
    // unselected : true,
    attributes : attrlist.topling,
    struct_attributes : sattrlist.topling
};

settings.corpus_aliases["topling-sv"] = "topling_sv";

settings.corpora.kfspc_sv = {
    title : "KFSPC svenska",
    description : "Kotus Finnish-Swedish Parallel Corpus, svenskspråkiga delen",
    id : "kfspc_sv",
    cite_id : "kfspc-korp-sv",
    lang : "swe",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {
    },
    struct_attributes : sattrlist.kfspc,
};

settings.corpora.sinebrychoff_orig = {
    id : "sinebrychoff_orig",
    title: "Paul Sinebrychoffs brevsamling",
    description : "Paul Sinebrychoffs brevsamling",
    metadata_urn : "urn:nbn:fi:lb-201407303",
    licence : settings.licenceinfo.CC_BY_30,
    cite_id : "sinebrychoff-sv",
    context : settings.spContext,
    within : settings.spWithin,
    attributes: attrlist.sinebrychoff,
    struct_attributes : sattrlist.sinebrychoff
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
    attributes : {
	lemma : attrs.baseform,
	lemmacomp : attrs.baseform_compound,
	pos : attrs.pos_swecg,
	msd : attrs.msd,
	id : attrs.id_hidden,
	lex : attrs.lemgram_hidden,
    },
    struct_attributes : {
	text_source : {
	    dataset : [
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
	paragraph_type : {
	    // The values could be localized as in FTC, but we would
	    // need to decide the translations
	    localize : false,
	    translationKey : null,
	    dataset : {
		"author" : "author",
		"bibl" : "bibl",
		"body" : "body",
		"byline" : "byline",
		"caption" : "caption",
		"closer" : "closer",
		"date" : "date",
		"div|div0|div1|div2|div3" : "div",
		"emph" : "emph",
		"entry" : "entry",
		"footer" : "footer",
		"group" : "group",
		"head" : "head",
		"header" : "header",
		"hi" : "hi",
		"item" : "item",
		"l" : "l",
		"list" : "list",
		"note" : "note",
		"omit" : "omit",
		"opener" : "opener",
		"p" : "p",
		"q" : "q",
		"quote" : "quote",
		"resp" : "resp",
		"rs" : "rs",
		"signed" : "signed",
		"title" : "title",
	    },
	},
    }
});

// Create the FSTC corpus folder hierarchy and corpus settings
settings.fn.make_folder_hierarchy(
    settings.corporafolders.fstc, fstc_hierarchy,
    {
	id_prefix : "fstc_",
	description_prefix : "Finlandssvensk textkorpus (UHLCS): ",
	corpus_title_suffix : " (FSTC)",
	corpus_template : settings.templ.fstc,
    });

delete fstc_hierarchy;

// TODO: Add aliases for subcorpora, such as fstc_fnb
settings.corpus_aliases.fstc = "fstc_.*";


/* Svenska Parole */

settings.corpora.parole_sv = $.extend(true, {}, settings.templ.fstc, {
    title : "Svenska Parole",
    description : "Svenska Parole: sammanställd av Språkbanken vid Göteborgs unversitet, morfosyntaktiskt analyserad med SWECG",
    id : "parole_sv",
    urn : "urn:nbn:fi:lb-2016050208",
    metadata_urn : "urn:nbn:fi:lb-2016050211",
    licence : {
	name : "CLARIN RES +PLAN +NC +LOC +ND",
	urn : "urn:nbn:fi:lb-2015101602",
    },
    cite_id : "parole-sv",
    text_source : {
	dataset : ["Språkbanken, Göteborgs universitet"],
    },
    // Does it make sense to have a paragraph type with a single
    // value, to get the same structure as FSTC?
    paragraph_type : {
	dataset : ["p"]
    },
});


/* Svenska YLE */

var transform_datetime = function (val) {
    // Add a zero-width space before "T" to allow more logical
    // line-breaking. of an ISO datetime value.
    return val.replace(/T/g, "\u200bT");
};

sattrlist.yle_sv_common = {
    text_main_department : {
	label : "main_section",
	displayType : "select",
	opts : settings.liteOptions,
	dataset : [
	    "",
	    "Abimix",
	    "Åboland",
	    "Alexandras örtagård",
	    "Använd hjärtat – Lupa välittää",
	    "Arkivet",
	    "Österbotten",
	    "Östnyland",
	    "Bakom parabolen",
	    "Barn",
	    "Bloggar",
	    "Blogg: Koivukangas kognition",
	    "Bolaget",
	    "Bygga och bo",
	    "Debatt",
	    "Efterlysningen",
	    "Ekonomi",
	    "Enkelbiljett till Europa",
	    "Eurovision",
	    "Eurovision 2012",
	    "Familj",
	    "Fart på Finland",
	    "Film och tv",
	    "Finlandssvenska hemlisar",
	    "Firarsvängen",
	    "Fixa högskolan",
	    "Fixa mobbningen I #tadetpåallvar",
	    "Fixa skärgården",
	    "Fotbolls-EM 2012",
	    "Frågor & svar",
	    "Hajbo",
	    "Hälsa",
	    "Historia",
	    "Hobby och hantverk",
	    "Huvudstadsregionen",
	    "Inrikes",
	    "Ishockey-VM 2012",
	    "Just nu",
	    "Klimat",
	    "Konst",
	    "Kontakta samhällsprogrammen",
	    "Kontakta Sporten",
	    "Kontakta Yle Österbotten",
	    "Kulturhistoria",
	    "Kultur och nöje",
	    "Litteratur",
	    "Lucia",
	    "Lyssna på Radio Vega Åboland!",
	    "Lyssna på Radio Vega Österbotten!",
	    "Lyssna på Radio Vega Västnyland!",
	    "Må bra",
	    "Maktbasen",
	    "Måndagssnack",
	    "Mat och dryck",
	    "Mat och fritid",
	    "Metallväktarna",
	    "Mitt. Ditt. Vårt. - Yle 90 år",
	    "Mitt jobb",
	    "Mitt Yle",
	    "Musik",
	    "Natur",
	    "#NiVetIngenting",
	    "Nyhetsskolan",
	    "OS i London 2012",
	    "På gång inom bolaget",
	    "Pekka Poutanens blogg",
	    "Poddar",
	    "Politik",
	    "Recensioner",
	    "Regioner",
	    "Resa",
	    "Samhälle",
	    "Så träffades vi ...",
	    "Sex & sånt",
	    "Slaget efter tolv",
	    "Slottsbalen",
	    "Sluta panta",
	    "Sommarjobb",
	    "Spel",
	    "Sport",
	    "Sportbloggen",
	    "Sportens sändningar",
	    "Stafettkarnevalen",
	    "svenska.yle.fi",
	    "Svenska.yle.fi",
	    "Syrien",
	    "Teknik",
	    "Titta och lyssna",
	    "Trädgård",
	    "Tro",
	    "Twitterbloggen",
	    "Unga. Nu!",
	    "Utrikes",
	    "Val",
	    "Valet i Åboland",
	    "Valet i huvudstadsregionen",
	    "Valet i Västnyland",
	    "Vardagsäventyr",
	    "Västnyland",
	    "Vega",
	    "Vetamix",
	    "Vetenskap",
	    "X3M",
	    "X3M / De bästa intervjuerna",
	    "Yle Fem",
	],
    },
    text_departments : {
	label : "sections",
	type : "set",
	opts : settings.setOpts,
	displayType : "select",
	dataset : [
	    "",
	    "Abimix",
	    "Åboland",
	    "Alexandras örtagård",
	    "Använd hjärtat – Lupa välittää",
	    "Arkivet",
	    "Bakom kulisserna",
	    "Bakom parabolen",
	    "Barn",
	    "Bastuliv",
	    "Belle epoque",
	    "Bildkonst och design",
	    "Bilen som passion",
	    "Bloggar",
	    "Blogg: Koivukangas kognition",
	    "Bolaget",
	    "Borgåbygdens Lucia",
	    "Bygga bastu",
	    "Bygga och bo",
	    "Datajournalistik",
	    "Dåtid nu - en kulturhistorisk tidsresa",
	    "Debatt",
	    "Efterlysningen",
	    "Ekonomi",
	    "Enkelbiljett till Europa",
	    "Eurovision",
	    "Eurovision 2012",
	    "Eurovisionen 60 år",
	    "Familj",
	    "Fart på Finland",
	    "Film",
	    "Film och tv",
	    "Finlandssvenska hemlisar",
	    "Firarsvängen",
	    "Fixa högskolan",
	    "Fixa mobbningen I #tadetpåallvar",
	    "Fixa skärgården",
	    "För media",
	    "Fotbolls-EM 2012",
	    "Frågor och svar",
	    "Frågor & svar",
	    "Gör din egen konst",
	    "Hajbo",
	    "Hälsa",
	    "Hannas eurovisionsblogg",
	    "Hermans medicinska anekdoter",
	    "Historia",
	    "Hobby och hantverk",
	    "Huvudstadsregionen",
	    "Inrikes",
	    "Ishockey-VM 2012",
	    "Jord- & skogsbruk",
	    "Just nu",
	    "Klimat",
	    "Konst",
	    "Kontakta Första sidan",
	    "Kontakta samhällsprogrammen",
	    "Kontakta Sporten",
	    "Kontakta Yle Huvudstadsregionen",
	    "Kontakta Yle Österbotten",
	    "Kontakta Yle Västnyland",
	    "Kulturhistoria",
	    "Kultur och nöje",
	    "Litteratur",
	    "Lucia",
	    "Lyssna på Radio Vega Åboland!",
	    "Lyssna på Radio Vega Österbotten!",
	    "Lyssna på Radio Vega Västnyland!",
	    "Må bra",
	    "Maktbasen",
	    "Måndagssnack",
	    "Mat och dryck",
	    "Mat och fritid",
	    "Metallväktarna",
	    "Mitt. Ditt. Vårt. - Yle 90 år",
	    "Mitt jobb",
	    "Mitt Yle",
	    "Musik",
	    "Nationalparkerna i Finland",
	    "Natur",
	    "#NiVetIngenting",
	    "Nordiska brev",
	    "Nyhetsskolan",
	    "Om Strömsö",
	    "Om Svenska Yle",
	    "OS i London 2012",
	    "Österbotten",
	    "Östnyland",
	    "På gång inom bolaget",
	    "Pekka Poutanens blogg",
	    "Poddar",
	    "Politik",
	    "Recensioner",
	    "Regioner",
	    "Resa",
	    "Samhälle",
	    "Så träffades vi ...",
	    "Scenkonst",
	    "Sex & sånt",
	    "Slaget efter tolv",
	    "Slottsbalen",
	    "Sluta panta",
	    "Sommarjobb",
	    "Spel",
	    "Sport",
	    "Sportbloggen",
	    "Sportens sändningar",
	    "Sport i Radio och TV",
	    "Spotlight 2.0",
	    "Stafettkarnevalen",
	    "Strömsö i Sameland",
	    "Strömsös trädgård",
	    "svenska.yle.fi",
	    "Svenska.yle.fi",
	    "Syrien",
	    "Teknik",
	    "Titta och lyssna",
	    "Tove100",
	    "Trädgård",
	    "Tro",
	    "Twitterbloggen",
	    "Unga. Nu!",
	    "Utrikes",
	    "Val",
	    "Valet i Åboland",
	    "Valet i huvudstadsregionen",
	    "Valet i Österbotten",
	    "Valet i Östnyland",
	    "Valet i Västnyland",
	    "Vardagsäventyr",
	    "Västnyland",
	    "Vega",
	    "Verkstad",
	    "Vetamix",
	    "Vetenskap",
	    "Webbdoktorn",
	    "X3M",
	    "X3M / De bästa intervjuerna",
	    "Yle Fem",
	    "Yles ansvar",
	],
    },
    text_id : {
	label : "text_id",
    },
    text_publisher : sattrs.text_publisher,
    text_url : sattrs.link_original,
    text_datetime_published : {
	label : "datetime_published",
	transform : transform_datetime,
    },
    text_datetime_content_modified : {
	label : "datetime_content_modified",
	transform : transform_datetime,
    },
    text_datetime_json_modified : {
	label : "datetime_json_modified",
	transform : transform_datetime,
    },
    // paragraph_id : {
    // },
    // sentence_id : {
    // },
    sentence_type : {
	label : "sentence_type",
	displayType : "select",
	opts : settings.liteOptions,
	translationKey : "textpart_",
	dataset : {
	    "alt" : "image_alt",
	    "by" : "byline",
	    "caption" : "caption",
	    "heading" : "heading",
	    "heading-alt" : "heading_alt",
	    "heading-caption" : "heading_caption",
	    "text" : "text",
	},
    },
};

sattrs.yle_sv_paragraph_type = {
    label : "paragraph_type",
    displayType : "select",
    opts : settings.liteOptions,
    translationKey : "textpart_",
    dataset : {
	"by" : "byline",
	"heading" : "heading",
	"headline" : "headline",
	"image" : "image",
	"lead" : "lead",
	"quote" : "quote",
	"shortSummary" : "short_summary",
	"summary" : "summary",
	"text" : "text",
    },
};


// settings.corpora.yle_sv_sample = {
//     title : "Svenska Yles webbartiklar (test)",
//     description : "Svenska Yles webbartiklar (test)",
//     id : "yle_sv_sample",
//     urn : "[to be added]",
//     metadata_urn : "urn:nbn:fi:lb-2016111401",
//     licence : settings.licenceinfo.ACA_NC,
//     cite_id : "yle-sv",
//     context : settings.spContext,
//     within : settings.spWithin,
//     limited_access : true,
//     licence_type : "ACA",
//     attributes : {},
//     struct_attributes : sattrlist.yle_sv_common,
// };

settings.corpora.yle_sv_aca = {
    title : "Svenska Yles webbartiklar 2012– (för forskare) (beta)",
    description : "Svenska Yles webbartiklar 2012–, version tillgänglig för forskare: meningarna i den ursprungliga ordningen och stöd till utökad kontextvisning",
    id : "yle_sv_aca",
    urn : "[to be added]",
    metadata_urn : "urn:nbn:fi:lb-2016111401",
    licence : settings.licenceinfo.ACA_NC,
    cite_id : "yle-sv",
    context : settings.spContext,
    within : settings.spWithin,
    limited_access : true,
    licence_type : "ACA",
    attributes : {},
    struct_attributes : $.extend(
	{}, sattrlist.yle_sv_common,
	{
	    paragraph_type : sattrs.yle_sv_paragraph_type,
	}),
};

settings.corpora.yle_sv_pub = {
    title : "Svenska Yles webbartiklar 2012– (för alla) (beta)",
    description : "Svenska Yles webbartiklar 2012–, version öppen för alla: meningarna i en blandad ordning inom varje text och ingen utökad kontextvisning",
    id : "yle_sv_pub",
    urn : "[to be added]",
    metadata_urn : "urn:nbn:fi:lb-2016111401",
    licence : settings.licenceinfo.CC_BY,
    cite_id : "yle-sv",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {},
    struct_attributes : $.extend(
	{}, sattrlist.yle_sv_common,
	{
	    sentence_paragraph_type : sattrs.yle_sv_paragraph_type,
	}),
};


if (! isPublicServer) {
    settings.fn.remove_matching_corpora(["mulcold_.*"], true);
}


settings.fn.add_attr_extra_properties(settings.corpora);


settings.corpusListing = new CorpusListing(settings.corpora);
