// -*- coding: utf-8 -*-

settings.primaryColor = "#ffe7d2";
settings.primaryLight = "#fff4eb";
settings.autocomplete = true;
settings.lemgramSelect = true;
settings.wordpicture = false;

$("#lemgram_list_item").remove();
$("#results-lemgram").remove();


// Proper nouns for BYU and HCS2 annotations.
settings.placenameConstraint = "pos contains 'np1?' | pos='PROPNAME'";


settings.preselected_corpora = ["mulcold_en"];


settings.corpora = {};
settings.corporafolders = {};

settings.spWithin = {
    "sentence": "sentence",
    "paragraph": "paragraph"
};

settings.spContext = {
    "1 sentence": "1 sentence",
    "1 paragraph": "1 paragraph"
};

settings.corporafolders.oracc = {
    title: "ORACC",
    description: "ORACC – Open Richly Annotated Cuneiform Corpus",
    contents: ["oracc_cams", "oracc_dcclt", "oracc_ribo", "oracc_rinap", "oracc_saao", "oracc_other"],
    info: {
        licence: settings.licenceinfo.CC_BY_30,
	cite_id: "ORACC",
    }
};

settings.corporafolders.testikansio = {
    title: "ERME",
    description: "ERME: Erzya and Moksha Extended Corpora",
    contents: ["erme_mdf", "erme_myv"]
};

settings.corporafolders.fennougrica = {
    title: "Fenno-Ugrica",
    contents: ["fennougrica_myv",
                "fennougrica_kca",
                "fennougrica_izh",
                "fennougrica_mhr",
                "fennougrica_mrj",
                "fennougrica_mns",
                "fennougrica_mdf",
                "fennougrica_sel",
                "fennougrica_yrk",
                "fennougrica_vep"],
    info: {
	cite_id: "Fenno-ugrica",
    },
};

settings.corporafolders.english = {
    title: "English / Englanti",
    description: "Texts in English<br/>Englanninkielisiä tekstejä",
    contents: ["mulcold_en", "elfa", "topling_en"]
};

settings.corporafolders.german = {
    title: "Deutsch / Saksa / German",
    description: "Texte auf Deutsch<br/>Saksankielisiä tekstejä<br/>Texts in German",
    contents: ["mulcold_de", "ethesis_de"],
    // unselected: true
};

settings.corporafolders.french = {
    title: "Français / Ranska / French",
    description: "Textes en français<br/>Ranskankielisiä tekstejä<br/>Texts in French",
    contents: ["ethesis_fr"],
    // unselected: true
};

settings.corporafolders.spanish = {
    title: "Español / Espanja / Spanish",
    description: "Textos on español<br/>Espanjankielisiä tekstejä<br/>Texts in Spanish",
    contents: ["ethesis_es"],
    // unselected: true
};


settings.corporafolders.russian = {
    title: "Русский / Venäjä / Russian",
    description: "Tексты по-русски<br/>Venäjänkielisiä tekstejä<br/>Texts in Russian",
    contents: [
	"legal_ru",
	"mulcold_ru",
	"parrus_2016_ru",
	"parfin_2016_ru",
	"ethesis_ru"
    ],
    // unselected: true
};

settings.corporafolders.english.ethesis = {
    title: "E-thesis",
    description: "Corpus of University of Helsinki theses and dissertations<br/><a href='https://ethesis.helsinki.fi/'>https://ethesis.helsinki.fi/</a>",
    contents: ["ethesis_en_dissabs", "ethesis_en_maabs"],
    info: {
	cite_id: "e-thesis-en",
    }
};

settings.corporafolders.english.ethesis.phdtheses = {
    title: "Doctoral dissertations",
    contents: ["ethesis_en_phd_mm", "ethesis_en_phd_hum", "ethesis_en_phd_bio", "ethesis_en_phd_beh",
                "ethesis_en_phd_ot", "ethesis_en_phd_med", "ethesis_en_phd_far", "ethesis_en_phd_math",
                "ethesis_en_phd_valt", "ethesis_en_phd_teo", "ethesis_en_phd_el"]
};

settings.corporafolders.english.ethesis.matheses = {
    title: "Master's theses",
    contents: ["ethesis_en_ma_mm", "ethesis_en_ma_ai", "ethesis_en_ma_hum", "ethesis_en_ma_bio", "ethesis_en_ma_beh",
                "ethesis_en_ma_far", "ethesis_en_ma_ot", "ethesis_en_ma_med", "ethesis_en_ma_sci",
                "ethesis_en_ma_valt", "ethesis_en_ma_teo", "ethesis_en_ma_el"]
};


var byu_fulltext_note = "<br/><br/><strong>Note:</strong> To follow the US Fair Use Law, every 200 words, ten words have been removed and replaced with “@” (<a href='http://corpus.byu.edu/full-text/limitations.asp' target='_blank'>more information</a>).";

settings.corporafolders.english.coca = {
    title: "COCA: Corpus of Contemporary American English (beta)",
    description: "COCA: Corpus of Contemporary American English – Kielipankki Korp version 2017H1 (beta)<br/><br/>The COCA corpus contains about 520 million words in 220,000 texts of US English from the years 1990–2015. The corpus is evenly divided into spoken, fiction, magazine, newspaper and academic genres." + byu_fulltext_note,
    // contents will be added further below
    info: {
	urn: "urn:nbn:fi:lb-2017061933",
	metadata_urn: "urn:nbn:fi:lb-2017061922",
	licence: {
	    name: "ACA-Fi (Academic users in Finland)",
	    url: "https://www.kielipankki.fi/lic/coca-korp/?lang=en",
	},
	cite_id: "coca-korp-2017H1",
	homepage_url: "http://corpus.byu.edu/full-text/intro.asp",
	compiler: {
	    name: "Prof. Mark Davies, Brigham Young University",
	    url: "http://davies-linguistics.byu.edu/personal/",
	},
    },
};

settings.corporafolders.english.coha = {
    title: "COHA: Corpus of Historical American English (beta)",
    description: "COHA: Corpus of Historical American English – Kielipankki Korp version 2017H1 (beta)<br/><br/>The COHA corpus contains about 400 million words in 107,000 texts of US English from the years 1810–2009. Each decade has roughly the same balance of fiction, popular magazine, newspaper, and non-fiction books." + byu_fulltext_note,
    // contents will be added futher below
    info: {
	urn: "urn:nbn:fi:lb-2017061934",
	metadata_urn: "urn:nbn:fi:lb-2017061925",
	licence: {
	    name: "ACA-Fi (Academic users in Finland)",
	    url: "https://www.kielipankki.fi/lic/coha-korp/?lang=en",
	},
	cite_id: "coha-korp-2017H1",
	homepage_url: "http://corpus.byu.edu/full-text/intro.asp",
	compiler: {
	    name: "Prof. Mark Davies, Brigham Young University",
	    url: "http://davies-linguistics.byu.edu/personal/",
	},
    },
};

settings.corporafolders.english.glowbe = {
    title: "GloWbE: Global Web-based English (beta)",
    description: "GloWbE: Global Web-based English – Kielipankki Korp version 2017H1 (beta)<br/><br/>The GloWbE corpus contains about 1.8 billion words on 1.8 million Web pages of English from the United States, Great Britain, Australia, India and 16 other countries, collected in 2013. About 60% of the text is from blogs." + byu_fulltext_note,
    // contents will be added futher below
    info: {
	urn: "urn:nbn:fi:lb-2017061935",
	metadata_urn: "urn:nbn:fi:lb-2017061928",
	licence: {
	    name: "ACA-Fi (Academic users in Finland)",
	    url: "https://www.kielipankki.fi/lic/glowbe-korp/?lang=en",
	},
	cite_id: "glowbe-korp-2017H1",
	homepage_url: "http://corpus.byu.edu/full-text/intro.asp",
	compiler: {
	    name: "Prof. Mark Davies, Brigham Young University",
	    url: "http://davies-linguistics.byu.edu/personal/",
	},
    },
};

settings.corporafolders.hcs2 = {
    title: "Helsinki Corpus of Swahili 2.0 (HCS 2.0)",
    description: "Helsinki Corpus of Swahili 2.0 (HCS 2.0) Annotated Version<br/><br><a href=\"https://www.kielipankki.fi/corpora/hcs2/\" target=\"_blank\">Corpus information page, including descriptions of annotation feature values (tags)</a>",
    info: {
	urn: "urn:nbn:fi:lb-201608301",
	metadata_urn: "urn:nbn:fi:lb-2016011301",
	lbr_id: "urn:nbn:fi:lb-2014032624",
	licence: {
	    name: "CLARIN ACA +NC 1.0",
	    urn: "urn:nbn:fi:lb-2016112310",
	},
	cite_id: "hcs-a-v2",
    },
};

settings.corporafolders.sust = {
    title: "SUS-kenttätyö (näyte)",
    description: "Suomalais-Ugrilaisen Seuran kenttätyökorpus (näyte)",
    // The Finno-Ugrian Society Fieldwork Corpus (sample)<br/>
    info: {
	metadata_urn: "urn:nbn:fi:lb-2016092001",
	licence: settings.licenceinfo.CC_BY_NC,
    },
    contents: ["sust_myv", "sust_kpv", "sust_mdf"]
};

settings.corporafolders.english.scotscorr = {
    title: "ScotsCorr (beta)",
    // Description copied from META-SHARE
    description: "Helsinki Corpus of Scottish Correspondence (1540–1750)<br/><br/>The corpus comprises circa 0.5 million tokens (417,709 words) of early Scottish correspondence by male and female writers dating from the period 1540–1750. The corpus consists of transcripts of original letter manuscripts, which reproduce the text disallowing any modernisation, normalisation or emendation. Language-external variables such as date, region, gender, addressee, hand and script type have been coded into the database. The writers originate from fifteen different regions of Scotland; these can be grouped to represent the areas of North, North-East, Central, South-East, and South-West. In addition, there are two categories of informants that have not been defined by geographical origin: representatives of the court and professional people such as members of the clergy. The proportion of female informants in the corpus is 21 per cent.<br/><br/><strong>Please note</strong> that the Korp version of the corpus is in test use and may change without notification, although the corpus data itself should be stable.<br/><br/><a href='https://www.kielipankki.fi/corpora/scotscorr/' target='_blank'>ScotsCorr information page with links to documentation</a>.",
    info: {
	urn: "urn:nbn:fi:lb-2016121607",
	metadata_urn: "urn:nbn:fi:lb-201411071",
	// Use the generic ACA+NC licence information but add a URN
	// directing to a licence page specific to ScotsCorr (URN
	// overrides the URL in settings.licenceinfo.ACA_NC).
	licence: $.extend(true, {},
			   settings.licenceinfo.ACA_NC,
			   { urn: "urn:nbn:fi:lb-2016051203" }),
	// General ACA status application, since ScotsCorr does not
	// have one of its own
	lbr_id: "urn:nbn:fi:lb-2016110710",
	iprholder: {
	    name: "Anneli Meurman-Solin",
	},
	cite_id: "ScotsCorr",
    },
    contents: [
        "scots_royal",
        "scots_m1540_1599",
        "scots_f1540_1599",
        "scots_m1600_1649",
        "scots_f1600_1649",
        "scots_m1650_1699",
        "scots_f1650_1699",
        "scots_m1700_1749",
        "scots_f1700_1749",
    ],
};


/*
settings.corpora.fennougrica = {
    id: "fennougrica",
    title: "Fenno-Ugrica",
    description: "Fenno-Ugrica",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.fennougrica,
    struct_attributes: sattrlist.fennougrica,
    unselected: true
};
*/

settings.corpora.oracc_other = {
    id: "oracc_other",
    title: "Others",
    description: "Others",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.oracc,
    struct_attributes: sattrlist.oracc,
};

settings.corpora.oracc_saao = {
    id: "oracc_saao",
    title: "State Archives of Assyria Online",
    description: "SAAo – State Archives of Assyria Online",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.oracc,
    struct_attributes: sattrlist.oracc,
};

settings.corpora.oracc_ribo = {
    id: "oracc_ribo",
    title: "Royal Inscriptions of Babylonia online",
    description: "RIBo – Royal Inscriptions of Babylonia online",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.oracc,
    struct_attributes: sattrlist.oracc,
};

settings.corpora.oracc_rinap = {
    id: "oracc_rinap",
    title: "Royal Inscriptions of the Neo-Assyrian Period",
    description: "RINAP – Royal Inscriptions of the Neo-Assyrian Period",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.oracc,
    struct_attributes: sattrlist.oracc,
};

settings.corpora.oracc_dcclt = {
    id: "oracc_dcclt",
    title: "Digital Corpus of Cuneiform Lexical Texts",
    description: "DCCLT – Digital Corpus of Cuneiform Lexical Texts",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.oracc,
    struct_attributes: sattrlist.oracc,
};

settings.corpora.oracc_cams = {
    id: "oracc_cams",
    title: "Corpus of Ancient Mesopotamian Scholarship",
    description: "CAMS – Corpus of Ancient Mesopotamian Scholarship",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.oracc,
    struct_attributes: sattrlist.oracc,
};

settings.corpora.ethesis_ru = {
    title: "E-thesis",
    description: "E-thesis. Corpus of theses and dissertations (2005-2016)",
    id: "ethesis_ru",
    cite_id: "e-thesis-ru",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_es = {
    title: "E-thesis",
    description: "E-thesis. Corpus of theses and dissertations (2003-2015)",
    id: "ethesis_es",
    cite_id: "e-thesis-es",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_fr = {
    title: "E-thesis",
    description: "E-thesis. Corpus of theses and dissertations (2000-2016)",
    id: "ethesis_fr",
    cite_id: "e-thesis-fr",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_de = {
    title: "E-thesis",
    description: "E-thesis. Corpus of theses and dissertations (1997-2016)",
    id: "ethesis_de",
    cite_id: "e-thesis-de",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};


sattrlist.sust_common = {
    text_lang: {
	label: "lang",
	displayType: "select",
	translationKey: "",
	dataset: [
	    "kpv",
	    "mdf",
	    "myv",
	],
	opts: settings.liteOptions,
    },
    text_recdate: {
        label: "interview_date"
    },
    text_interviewee: {
        label: "interviewee"
    },
    text_interviewer: {
        label: "interviewer"
    },
    text_locale: {
        label: "locality"
    },
    text_locale_orig: {
        label: "locality_orig"
    },
    text_locale_rus: {
        label: "locality_russian"
    },
    text_id_orig: {
	label: "text_title_orig",
    },
    text_id_deu: {
	label: "text_title_transl",
    },
    // text_title: {
    //     label: "text_title"
    // },
    text_publ_name: {
	label: "publication_name",
    },
    text_issue: {
        label: "text_issue"
    },
    text_publisher: {
        label: "publisher"
    },
    text_publ_year: {
        label: "publication_year"
    },
    text_publ_place: {
	label: "publication_place",
    },
    /*
    text_author: {
        label: "text_author"
	},*/
    // text_pgli: {
    //     label: "sentence_line"
    // },
    text_corryear: {
        label: "text_correction_year"
    },
    text_corrector: {
        label: "text_corrector"
    },
    text_collection: {
	label: "text_collection",
	displayType: "hidden",
    },
    text_genre_deu: {
	label: "genre",
    },
    text_comment_deu: {
	label: "comment_german",
    },
    text_pagerange: {
	label: "text_page_range",
    },
    text_licence: {
	label: "licence",
    },
    text_status_eng: {
	label: "text_status",
    },
    text_type: {
	label: "text_type",
    },
    text_textnum: {
	label: "text_num",
    },
    sentence_type: {
	label: "sentence_type",
    },
    // sentence_chapno: {
    //     label: "sentence_chapno",
    // },
    // paragraph_parttitle: {
    //     label: "paragraph_title",
    // },
    // paragraph_lang: {
    //     label: "paragraph_lang",
    // },
    sentence_orig: {
        label: "transcription",
    },
    sentence_transl_deu: {
        label: "translation_german",
    },
    sentence_pagenum: {
        label: "page_num",
    },
    sentence_pageline: {
        label: "page_line",
    },
    sentence_paranum: {
        label: "paragraph_num",
    },
    sentence_sentnum: {
        label: "sentence_num",
    },
};


attrlist.sust_common = {
    ref: attrs.ref,
    phon: {
	label: "transcription",
    },
};

attrlist.sust_tagged = $.extend(true, attrlist.sust_common, {
    lemma: {
	label: "lemma",
    },
    pos: {
	label: "pos",
	displayType: "select",
	translationKey: "pos_",
	dataset: {
	    "A": "A",
	    "Adv": "Adv",
	    "CC": "CC",
	    "CLB": "PUnct",
	    "N": "N",
	    "Num": "Num",
	    "Pcle": "Particle",
	    "Po": "Post",
	    "Pron": "Pron",
	    "V": "V",
	    null: null,
	},
	opts: settings.liteOptions,
    },
    msd: {
	label: "msd",
	taginfo_url: "",
    },
});


settings.corpora.sust_mdf = {
    id: "sust_mdf",
    title: "SUS-kenttätyö: mokša (näyte)",
    description: "Suomalais-Ugrilaisen Seuran kenttätyökorpus: mokša (näyte)",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.sust_tagged,
    struct_attributes: sattrlist.sust_common
};

settings.corpora.sust_myv = {
    id: "sust_myv",
    title: "SUS-kenttätyö: ersä (näyte)",
    description: "Suomalais-Ugrilaisen Seuran kenttätyökorpus: ersä (näyte)",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.sust_tagged,
    struct_attributes: sattrlist.sust_common
};

settings.corpora.sust_kpv = {
    id: "sust_kpv",
    title: "SUS-kenttätyö: komisyrjääni (näyte)",
    description: "Suomalais-Ugrilaisen Seuran kenttätyökorpus: komisyrjääni (näyte)",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.sust_tagged,
    struct_attributes: sattrlist.sust_common
};

settings.corpora.fennougrica_izh = {
    id: "fennougrica_izh",
    title: "Inkeroinen",
    description: "Fenno-Ugrica, inkeroinen",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.fennougrica,
    struct_attributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_mhr = {
    id: "fennougrica_mhr",
    title: "Itämari",
    description: "Fenno-Ugrica, itämari",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.fennougrica,
    struct_attributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_kca = {
    id: "fennougrica_kca",
    title: "Hanti",
    description: "Fenno-Ugrica, hanti",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.fennougrica,
    struct_attributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_mdf = {
    id: "fennougrica_mdf",
    title: "Mokša",
    description: "Fenno-Ugrica, mokša",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.fennougrica,
    struct_attributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_mns = {
    id: "fennougrica_mns",
    title: "Mansi",
    description: "Fenno-Ugrica, mansi",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.fennougrica,
    struct_attributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_mrj = {
    id: "fennougrica_mrj",
    title: "Länsimari",
    description: "Fenno-Ugrica, länsimari",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.fennougrica,
    struct_attributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_myv = {
    id: "fennougrica_myv",
    title: "Ersä",
    description: "Fenno-Ugrica, ersä",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.fennougrica,
    struct_attributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_sel = {
    id: "fennougrica_sel",
    title: "Selkuppi",
    description: "Fenno-Ugrica, selkuppi",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.fennougrica,
    struct_attributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_vep = {
    id: "fennougrica_vep",
    title: "Vepsä",
    description: "Fenno-Ugrica, vepsä",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.fennougrica,
    struct_attributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.fennougrica_yrk = {
    id: "fennougrica_yrk",
    title: "Tundranenetsi",
    description: "Fenno-Ugrica, tundranenetsi",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.fennougrica,
    struct_attributes: sattrlist.fennougrica,
    unselected: true
};

settings.corpora.mulcold_en = {
    id: "mulcold_en",
    title: "MULCOLD englanti",
    description: "Multilingual Corpus of Legal Documents, englanninkielinen osa",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.mulcold_en,
    struct_attributes: sattrlist.mulcold,
};

settings.corpora.mulcold_de = {
    id: "mulcold_de",
    title: "MULCOLD saksa",
    description: "Multilingual Corpus of Legal Documents, saksankielinen osa",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.mulcold_de,
    struct_attributes: sattrlist.mulcold,
};

settings.corpora.mulcold_ru = {
    id: "mulcold_ru",
    title: "MULCOLD venäjä",
    description: "Multilingual Corpus of Legal Documents, venäjänkielinen osa",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.mulcold_ru,
    struct_attributes: sattrlist.mulcold,
};

settings.fn.extend_corpus_settings(settings.corpusinfo.mulcold,
				   ["mulcold_en", "mulcold_de", "mulcold_ru"]);

settings.corpora.legal_ru = {
    id: "legal_ru",
    title: "FiRuLex venäjä",
    description: "Jurdisia tekstejä (venäjä)",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.mulcold_ru,
    struct_attributes: sattrlist.legal
};

settings.fn.extend_corpus_settings(settings.corpusinfo.firulex,
				   ["legal_ru"]);


/* E-thesis en */

settings.corpora.ethesis_en_ma_ot = {
    title: "Law",
    description: "Faculty of Law (2010-2015)",
    id: "ethesis_en_ma_ot",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_ma_med = {
    title: "Medicine",
    description: "Faculty of Medicine (2009-2015)",
    id: "ethesis_en_ma_med",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_ma_el = {
    title: "Veterinary Medicine",
    description: "Faculty of Veterinary Medicine (2003-2016)",
    id: "ethesis_en_ma_el",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};


settings.corpora.ethesis_en_ma_hum = {
    title: "Arts",
    description: "Faculty of Arts (1997-2016)",
    id: "ethesis_en_ma_hum",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};


settings.corpora.ethesis_en_ma_beh = {
    title: "Behavioural Sciences",
    description: "Faculty of Behavioural Sciences (2000-2016)",
    id: "ethesis_en_ma_beh",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_ma_bio = {
    title: "Biological and Environmental Sciences",
    description: "Faculty of Biological and Environmental Sciences (2006-2015)",
    id: "ethesis_en_ma_bio",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_ma_far = {
    title: "Pharmacy",
    description: "Faculty of Pharmacy (2003, 2010-2016)",
    id: "ethesis_en_ma_far",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_ma_mm = {
    title: "Agriculture and Forestry",
    description: "Agriculture and Forestry (2002-2016)",
    id: "ethesis_en_ma_mm",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_ma_sci = {
    title: "Science",
    description: "Faculty of Science (1999-2016)",
    id: "ethesis_en_ma_sci",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_ma_teo = {
    title: "Theology",
    description: "Faculty of Theology (2006-2016)",
    id: "ethesis_en_ma_teo",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_ma_valt = {
    title: "Social Sciences",
    description: "Faculty of Social Sciences (1999-2016)",
    id: "ethesis_en_ma_valt",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_ma_ai = {
    title: "Aleksanteri Institute",
    description: "Aleksanteri Institute (2009-2015)",
    id: "ethesis_en_ma_ai",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_maabs = {
    title: "Master's thesis abstracts",
    description: "Master's thesis abstracts (1999-2016)",
    id: "ethesis_en_maabs",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_dissabs = {
    title: "Doctoral dissertation abstracts",
    description: "Doctoral disseration abstracts (2006-2016)",
    id: "ethesis_en_dissabs",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_phd_beh = {
    title: "Behavioural Sciences",
    description: "Faculty of Behavioural Sciences (1999-2016)",
    id: "ethesis_en_phd_beh",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_phd_bio = {
    title: "Biological and Environmental Sciences",
    description: "Faculty of Biological and Environmental Sciences (1997-2016)",
    id: "ethesis_en_phd_bio",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_phd_el = {
    title: "Veterinary Medicine",
    description: "Faculty of Veterinary Medicine (1999-2016)",
    id: "ethesis_en_phd_el",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_phd_far = {
    title: "Pharmacy",
    description: "Faculty of Pharmacy (1999-2016)",
    id: "ethesis_en_phd_far",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_phd_mm = {
    title: "Agriculture and Forestry",
    description: "Agriculture and Forestry (1999-2016)",
    id: "ethesis_en_phd_mm",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_phd_hum = {
    title: "Arts",
    description: "Faculty of Arts (1989, 1998-2016)",
    id: "ethesis_en_phd_hum",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_phd_math = {
    title: "Science",
    description: "Faculty of Science (1992, 1995-2016)",
    id: "ethesis_en_phd_math",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_phd_ot = {
    title: "Law",
    description: "Faculty of Law (2002, 2004-2016)",
    id: "ethesis_en_phd_ot",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_phd_teo = {
    title: "Theology",
    description: "Faculty of Theology (2002-2016)",
    id: "ethesis_en_phd_teo",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_phd_med = {
    title: "Medicine",
    description: "Faculty of Medicine (1998-2016)",
    id: "ethesis_en_phd_med",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_en_phd_valt = {
    title: "Social Sciences",
    description: "Faculty Social Sciences (1999-2016)",
    id: "ethesis_en_phd_valt",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.ethesis
};

/* ParRus ru */

/*
// Deprecated version
settings.corpora.parrus_ru = {
    id: "parrus_ru",
    title: "ParRus (venäjä) [deprecated]",
    description: "ParRus – venäjä–suomi kaunokirjallisten tekstien rinnakkaiskorpus (venäjänkieliset alkuperäistekstit)<br/>Venäjänkielisiä kaunokirjallisia tekstejä (klassista ja 1900-luvun kirjallisuutta)<br/><br/><strong>Please note that ParRus 2016 replaces this corpus, and this corpus will be taken out of use at the beginning of 2017.</strong>",
    // TODO: Add paragraphs corresponding to link elements
    context: settings.defaultContext,
    within: settings.defaultWithin,
    limited_access: true,
    licence_type: "RES",
    attributes: attrlist.parrus_ru,
    struct_attributes: sattrlist.parrus_ru,
};
settings.fn.extend_corpus_settings(settings.corpusinfo.parrus, ["parrus_ru"]);
*/

/* ParFin ru */

/*
// Deprecated version
settings.corpora.parfin_ru = {
    id: "parfin_ru",
    title: "ParFin (venäjä) [deprecated]",
    description: "ParFin – suomi–venäjä kaunokirjallisten tekstien rinnakkaiskorpus (venäjänkieliset käännökset)<br/>Suomenkielisten kaunokirjallisten tekstien (vuosilta 1990–2010) käännöksiä venäjäksi<strong>Please note that ParRus 2016 replaces this corpus, and this corpus will be taken out of use at the beginning of 2017.</strong>",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    limited_access: true,
    licence_type: "RES",
    attributes: attrlist.parfin_ru,
    struct_attributes: sattrlist.parfin_ru,
};
settings.fn.extend_corpus_settings(settings.corpusinfo.parfin, ["parfin_ru"]);
*/

/* ParRus 2016 ru */

settings.corpora.parrus_2016_ru = {
    id: "parrus_2016_ru",
    title: "ParRus 2016 (русский)",
    description: "ParRus 2016: русско-финский корпус художественных текстов. Русская классическая и современная проза.<br/><br/><a href=\"http://nl.ijs.si/ME/V4/msd/html/msd-ru.html\" target=\"_blank\">Venäjän morfologisen ja sanaluokka-annotaation kuvaus (englanniksi)</a></br><a href=\"http://www.ruscorpora.ru/instruction-syntax.html\" target=\"_blank\">Venäjän syntaktisen annotaation kuvaus (venäjäksi)</a>",
    urn: "urn:nbn:fi:lb-2016121605",
    metadata_urn: "urn:nbn:fi:lb-2016121614",
    licence: settings.licenceinfo.ParFinRus_2016_en,
    cite_id: "ParRus2016",
    context: settings.sentLinkContext,
    within: settings.sentLinkWithin,
    limited_access: true,
    licence_type: "RES",
    attributes: attrlist.parrus_2016_ru,
    struct_attributes: sattrlist.parrus_2016_ru,
};
settings.fn.extend_corpus_settings(settings.corpusinfo.parrus_2016,
				   ["parrus_2016_ru"]);


/* ParFin 2016 ru */

settings.corpora.parfin_2016_ru = {
    id: "parfin_2016_ru",
    title: "ParFin 2016 (русский)",
    description: "ParFin 2016: финско-русский корпус художественных текстов. Переводы финской прозы 1910-2008 гг. на русский язык.<br/><br/><a href=\"http://nl.ijs.si/ME/V4/msd/html/msd-ru.html\" target=\"_blank\">Venäjän morfologisen ja sanaluokka-annotaation kuvaus (englanniksi)</a></br><a href=\"http://www.ruscorpora.ru/instruction-syntax.html\" target=\"_blank\">Venäjän syntaktisen annotaation kuvaus (venäjäksi)</a>",
    urn: "urn:nbn:fi:lb-2016121603",
    metadata_urn: "urn:nbn:fi:lb-2016121612",
    licence: settings.licenceinfo.ParFinRus_2016_en,
    cite_id: "ParFin2016",
    context: settings.sentLinkContext,
    within: settings.sentLinkWithin,
    limited_access: true,
    licence_type: "RES",
    attributes: attrlist.parfin_2016_ru,
    struct_attributes: sattrlist.parfin_2016_ru,
};
settings.fn.extend_corpus_settings(settings.corpusinfo.parfin_2016,
				   ["parfin_2016_ru"]);


settings.corpora.topling_en = {
    id: "topling_en",
    title: "Topling (English)",
    description: "Topling – Paths in Second Language Acquisition, English subcorpus",
    urn: "urn:nbn:fi:lb-2016112901",
    metadata_urn: "urn:nbn:fi:lb-2016111803",
    lbr_id: "urn:nbn:fi:lb-20140730168",
    licence: {
	name: "CLARIN RES +NC +DEP 1.0",
	urn: "urn:nbn:fi:lb-2016112308"
    },
    homepage_url: "https://www.jyu.fi/topling",
    cite_id: "topling-en",
    limited_access: true,
    licence_type: "RES",
    context: settings.spContext,
    within: settings.spWithin,
    // unselected: true,
    attributes: attrlist.topling,
    struct_attributes: sattrlist.topling
};

settings.corpus_aliases["topling-en"] = "topling_en";


settings.corpora.elfa = {
    id: "elfa",
    title: "ELFA",
    description: "ELFA – The Corpus of English as a Lingua Franca in Academic Settings (anonymised transcriptions), preliminary Korp version<br>The ELFA corpus contains 1 million words of transcribed spoken academic ELF (approximately 131 hours of recorded speech). The recordings were made at the University of Tampere, the University of Helsinki, Tampere University of Technology, and Helsinki University of Technology.",
    urn: "urn:nbn:fi:lb-2016061301",
    metadata_urn: "urn:nbn:fi:lb-2016061302",
    licence: settings.licenceinfo.CC_BY,
    iprholder: {
	name: "Professor Anna Mauranen, University of Helsinki",
    },
    cite_id: "ELFA-korp",
    context: settings.spContext,
    within: settings.spWithin,
    ignore_between_tokens_cqp: '[type != "word"]*',
    attributes: {
	type: {
	    label: "token_type",
	    displayType: "select",
	    // translationKey: "",
	    localize: false,
	    opts: settings.liteOptions,
	    dataset: {
		"word": "word",
		"hesitation": "hesitation",
		"pause": "pause",
		"backchannel": "backchannel",
		"overlap_begin": "overlap begin",
		"overlap_end": "overlap end",
		"voice_shift": "voice shift",
		"mode_shift": "mode shift",
		"unclear": "unclear",
		"laugh": "laugh",
		"cough": "cough",
		"incident": "incident",
		"sigh.*": "sigh",
		"foreign.*|repeats the question in russian": "foreign",
		"humming": "humming",
		"name.*|(company|village) name|ethnic group|book title|.*e-mail address": "name",
		"pronounces the sound": "pronounces the sound",
		"pronounces the name": "pronounces the name",
		"makes an attacking noise": "makes an attacking noise",
		"inaudibly through the microphone": "inaudibly through the microphone",
		"imitates barking": "imitates barking",
		"gasp": "gasp",
		"clicking his tongue": "clicking tongue",
		"null": "unspecified",
	    },
	},
	subtype: {
	    label: "token_subtype",
	    displayType: "select",
	    // translationKey: "",
	    localize: false,
	    opts: settings.liteOptions,
	    dataset: {
		"overlap": "overlap",
		"unfinished": "unfinished",
		"unclear": "unclear",
		"begin": "begin",
		"end": "end",
		"anonymized_name": "anonymized name",
		"foreign": "foreign",
		"sic": "sic",
		"null": "unspecified",
	    },
	},
	mode: {
	    label: "action_type",
	    displayType: "select",
	    // translationKey: "",
	    localize: false,
	    opts: settings.liteOptions,
	    dataset: {
		"speaking": "speaking",
		"reading_aloud": "reading aloud",
		"writing_on_blackboard": "writing on blackboard",
		"null": "unspecified",
	    },
	},
	voice: {
	    label: "speaking_mode",
	    displayType: "select",
	    // translationKey: "",
	    localize: false,
	    opts: settings.liteOptions,
	    dataset: {
		"normal": "normal",
		"laugh": "laugh",
		"whisp": "whisp",
		"mock_accent": "mock accent",
		"mutter": "mutter",
		"Finnish_pronunciation": "Finnish pronunciation",
		"spelling": "spelling",
		"imitating_stress": "imitating stress",
		"Italian_pronunciation": "Italian pronunciation",
		"Finnish_spelling": "Finnish spelling",
		"null": "unspecified",
	    },
	},
	tags: {
	    label: "enclosing_elements",
	    type: "set",
	    displayType: "hidden",
	},
	synch_id: {
	    label: "synch_id",
	    isStructAttr: true,
	},
	synch_speaker_id: {
	    label: "other_speaker_id",
	    isStructAttr: true,
	},
	synch_content: {
	    label: "other_speaker_content",
	    isStructAttr: true,
	},
    },
    struct_attributes: {
	text_id: {
	    label: "text_id",
	},
	text_domain: {
	    label: "academic_domain",
	    displayType: "select",
	    translationKey: "academic_domain_",
	    opts: settings.liteOptions,
	    dataset: [
		"behavioural_sciences",
		"economics_and_administration",
		"humanities",
		"medicine",
		"natural_sciences",
		"other",
		"social_sciences",
		"technology",
	    ],
	},
	text_discipline: {
	    label: "academic_discipline",
	    displayType: "select",
	    localize: false,
	    opts: settings.liteOptions,
	    dataset: [
		"accounting",
		"automation engineering",
		"biology",
		"cell biology",
		"cultural studies",
		"economics",
		"education",
		"forestry",
		"forest products chemistry",
		"genetics",
		"haematology",
		"history of science & technology",
		"industrial engineering and management",
		"information sciences",
		"information technology",
		"internal medicine",
		"international relations",
		"journalism and mass communication",
		"management studies",
		"materials engineering",
		"mathematics",
		"multidisciplinary",
		"neurology",
		"other",
		"philosophy",
		"physics",
		"political history",
		"political science",
		"public health",
		"regional studies",
		"Russian studies",
		"Slavonic philology",
		"social history",
		"social policy",
		"social policy and social work",
		"sociology",
		"Swedish philology",
		"translation studies",
		"virology",
		"women's studies",
	    ],
	},
	text_event_type: {
	    label: "event_type",
	    displayType: "select",
	    // translationKey: "",
	    localize: false,
	    opts: settings.liteOptions,
	    dataset: [
		"conference discussion",
		"conference presentation",
		"doctoral defence discussion",
		"doctoral defence presentation",
		"ISSS seminar discussion",
		"lecture",
		"lecture discussion",
		"panel discussion",
		"post-graduate seminar discussion",
		"post-graduate seminar presentation",
		"presentation",
		"seminar discussion",
		"seminar presentation",
	    ],
	},
	text_event_purpose: {
	    label: "event_purpose",
	    displayType: "select",
	    translationKey: "event_purpose_",
	    opts: settings.liteOptions,
	    dataset: [
		"discuss",
		"inform",
	    ],
	},
	text_event_num: {
	    label: "event_num",
	},
	text_event_part: {
	    label: "event_part",
	},
	text_title: {
	    label: "title",
	},
	text_notes: {
	    label: "notes",
	},
	text_preparedness: {
	    label: "preparedness",
	    displayType: "select",
	    translationKey: "preparedness_",
	    opts: settings.liteOptions,
	    dataset: [
		"true",
		"false",
	    ],
	},
	text_interaction_degree: {
	    label: "interaction_degree",
	    displayType: "select",
	    translationKey: "interaction_degree_",
	    opts: settings.liteOptions,
	    dataset: [
		"complete",
		"partial",
		"none",
	    ],
	},
	text_duration_minsec: {
	    label: "recording_duration",
	},
	text_recording_type: {
	    label: "recording_type",
	    displayType: "select",
	    // translationKey: "",
	    localize: false,
	    opts: settings.liteOptions,
	    dataset: [
		"conference",
		"university degree programme",
	    ],
	},
	text_num_speakers: {
	    label: "num_speakers",
	},
	text_num_participants: {
	    label: "num_participants",
	},
	text_date: {
	    label: "date",
	},
	text_publisher: {
	    displayType: "hidden",
	},
	paragraph_speaker_type: {
	    label: "speaker_identification",
	    displayType: "select",
	    translationKey: "speaker_ident_",
	    opts: settings.liteOptions,
	    dataset: [
		"identified",
		"several",
		"unidentified",
	    ],
	},
	paragraph_speaker_l1: {
	    label: "speaker_l1",
	    type: "set",
	    displayType: "select",
	    translationKey: "",
	    opts: settings.setOptions,
	    dataset: {
		"ada-GH": "ada-GH",
		"aka.*": "aka",
		"aka-GH": "aka-GH",
		"amh": "amh",
		"ara": "ara",
		"ben": "ben",
		"ber": "ber",
		"bul": "bul",
		"cat": "cat",
		"ces": "ces",
		"cym": "cym",
		"dag-GH": "dag-GH",
		"dan": "dan",
		"deu.*": "deu",
		"deu-AT": "deu-AT",
		"deu-CH": "deu-CH",
		"ell": "ell",
		"eng.*": "eng",
		"eng-AU": "eng-AU",
		"eng-BD": "eng-BD",
		"eng-CA": "eng-CA",
		"eng-CM": "eng-CM",
		"eng-GB": "eng-GB",
		"eng-GH": "eng-GH",
		"eng-HK": "eng-HK",
		"eng-IE": "eng-IE",
		"eng-IN": "eng-IN",
		"eng-JM": "eng-JM",
		"eng-LB": "eng-LB",
		"eng-NG": "eng-NG",
		"eng-NZ": "eng-NZ",
		"eng-TT": "eng-TT",
		"eng-US": "eng-US",
		"est": "est",
		"fas": "fas",
		"fin": "fin",
		"fra.*": "fra",
		"fra-BE": "fra-BE",
		"hau-NG": "hau-NG",
		"hay": "hay",
		"heb": "heb",
		"hin": "hin",
		"hrv": "hrv",
		"hun": "hun",
		"ibo": "ibo",
		"isl": "isl",
		"ita": "ita",
		"jpn": "jpn",
		"kik.*": "kik",
		"kik-KE": "kik-KE",
		"lav": "lav",
		"lit": "lit",
		"nep": "nep",
		"nld.*": "nld",
		"nld-BE": "nld-BE",
		"nor": "nor",
		"orm-ET": "orm-ET",
		"pol": "pol",
		"por.*": "por",
		"por-BR": "por-BR",
		"qaa": "qaa",
		"ron": "ron",
		"rus": "rus",
		"slk": "slk",
		"som": "som",
		"spa.*": "spa",
		"spa-AR": "spa-AR",
		"spa-CO": "spa-CO",
		"spa-MX": "spa-MX",
		"swe.*": "swe",
		"swe-FI": "swe-FI",
		"swh.*": "swh",
		"swh-KE": "swh-KE",
		"swh-TZ": "swh-TZ",
		"tur": "tur",
		"twi.*": "twi",
		"twi-GH": "twi-GH",
		"und.*": "und",
		"und-CA": "und-CA",
		"und-GH": "und-GH",
		"und-TZ": "und-TZ",
		"urd-PK": "urd-PK",
		"uzb": "uzb",
		"yor": "yor",
		"zho": "zho",
	    },
	},
	paragraph_speaker_role: {
	    label: "academic_role",
	    displayType: "select",
	    translationKey: "academic_role_",
	    opts: settings.liteOptions,
	    dataset: [
		"junior staff",
		"junior staff and research student",
		"masters student",
		"other",
		"research student",
		"senior staff",
		"undergraduate",
		"unknown",
	    ],
	},
	paragraph_speaker_age: {
	    label: "age",
	    displayType: "select",
	    translationKey: "age_",
	    opts: settings.liteOptions,
	    dataset: [
		"17-23",
		"24-30",
		"31-50",
		"51-over",
		"unknown",
	    ],
	},
	paragraph_speaker_sex: {
	    label: "gender",
	    displayType: "select",
	    translationKey: "",
	    opts: settings.liteOptions,
	    dataset: {
		"male": "male",
		"female": "female",
		"unknown|null": "unknown",
	    }
	},
	paragraph_speaker_id: {
	    label: "speaker_id",
	},
	paragraph_type: {
	    label: "speech_event_type",
	    displayType: "select",
	    translationKey: "speech_event_type_",
	    opts: settings.liteOptions,
	    dataset: [
		"utterance",
		"incident",
		"pause",
	    ],
	},
	paragraph_id: {
	    label: "turn_id",
	},
	sentence_id: sattrs.sentence_id_hidden,
    },
};


/*
settings.corpora.fennougrica_veps = {
    id: "fennougrica_veps",
    title: "Fenno-Ugrica: Vepsä (näyte)",
    description: "Fenno-Ugrica: Vepsä (näyte)",
    metadata_urn: "urn:nbn:fi:lb-2014073056",
    homepage_url: "http://fennougrica.kansalliskirjasto.fi/",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.fennougrica_veps,
    struct_attributes: sattrlist.fennougrica_veps,
    // unselected: true
};
*/


/* attrlist.scotscorr is currently not used */
attrlist.scotscorr = {
    w_note: attrs.word_note,
    w_supplement: attrs.word_supplement,
    w_full: attrs.word_correction,
    w_spacing: {
        label: "word_spacing",
        opts: settings.defaultOptions
    },
    w_typography: attrs.word_typography,
    w_state: {
        label: "word_state",
        opts: settings.defaultOptions
    }
};

sattrlist.scotscorr = {
    sentence_id: sattrs.sentence_id_hidden,
    text_from: { label: "writer" },
    text_to: { label: "addressee" },
    text_year: { label: "year" },
    // text_datefrom: sattrs.date,
    text_date: { label: "date" },
    text_fraser: { label: "scotscorr_fraser" },
    text_lcinf: {
	label: "scotscorr_lcinf",
	displayType: "select",
	opts: settings.liteOptions,
	localize: false,
	dataset: {
	    // The control characters \x01–\x08 are used to get the
	    // desired sorting order in the selection list. They are
	    // invisible in the output, but could they cause problems
	    // in some cases?
	    "Moray|Invernessshire|Sutherland|Ross": "\x01North",
	    "Moray": "\x01    Moray",
	    "Invernessshire": "\x01    Invernessshire",
	    "Sutherland": "\x01    Sutherland",
	    "Ross": "\x01    Ross",
	    "Aberdeenshire|Angus": "\x02North-East",
	    "Aberdeenshire": "\x02    Aberdeenshire",
	    "Angus": "\x02    Angus",
	    "Perthshire|Lanarkshire": "\x03Central",
	    "Perthshire": "\x03    Perthshire",
	    "Lanarkshire": "\x03    Lanarkshire",
	    "Fife|Lothian|East Lothian|Stirlingshire|Borders": "\x04South-East",
	    "Fife": "\x04    Fife",
	    "Lothian": "\x04    Lothian",
	    "East Lothian": "\x04    East Lothian",
	    "Stirlingshire": "\x04    Stirlingshire",
	    "Borders": "\x04    Borders",
	    "Argyllshire|Ayrshire|South-West": "\x05South-West",
	    "Argyllshire": "\x05    Argyllshire",
	    "Ayrshire": "\x05    Ayrshire",
	    "South-West": "\x05    South-West",
	    "Court": "\x06Court",
	    "Professional": "\x07Professional",
	    "unlocalised": "\x08unlocalised",
	},
    },
    text_largeregion: {
	label: "scotscorr_largeregion",
	displayType: "select",
	opts: settings.liteOptions,
	localize: false,
	dataset: {
	    // The control characters \x01–\x08 are used to get the
	    // desired sorting order in the selection list. They are
	    // invisible in the output, but could they cause problems
	    // in some cases?
	    "North": "\x01North",
	    "North-East": "\x02North-East",
	    "Central": "\x03Central",
	    "South-East": "\x04South-East",
	    "South-West": "\x05South-West",
	    "Court": "\x06Court",
	    "Professional": "\x07Professional",
	    "Unlocalised": "\x08Unlocalised",
	},
    },
    text_lclet: { label: "scotscorr_lclet" },
    text_wgr: {
	label: "scotscorr_srg",
	displayType: "select",
	opts: settings.liteOptions,
	localize: false,
	dataset: [
	    "female",
	    "male",
	    "royal",
	    "unspecified",
	],
    },
    text_agr: {
	label: "scotscorr_arg",
	displayType: "select",
	opts: settings.liteOptions,
	localize: false,
	dataset: [
	    "female",
	    "male",
	    "royal",
	    "unspecified",
	],
    },
    text_lettertype: {
	label: "scotscorr_hand",
	displayType: "select",
	opts: settings.liteOptions,
	localize: false,
	dataset: [
	    "autograph",
	    "information unavailable",
	    "non-autograph",
	],
    },
    text_scripttype: {
	label: "scotscorr_scripttype",
	displayType: "select",
	opts: settings.liteOptions,
	localize: false,
	dataset: [
	    "information unavailable",
	    "initial and final formulae and signature",
	    "italic",
	    "letter-closing formula",
	    "letter-closing formula and signature",
	    "non-secretary",
	    "secretary",
	    "signature",
	    "signatures",
	    "signature and insertion",
	    "the letter-closing formula and the signature",
	    "the signature",
	    "unspecified",
	],
    },
    text_lettertype2: {
	label: "scotscorr_hand2",
	displayType: "select",
	opts: settings.liteOptions,
	localize: false,
	dataset: [
	    "autograph",
	    "information unavailable",
	    "non-autograph",
	],
    },
    text_scripttype2: {
	label: "scotscorr_scripttype",
	displayType: "select",
	opts: settings.liteOptions,
	localize: false,
	dataset: [
	    "copy",
	    "information unavailable",
	    "non-secretary",
	    "secretary",
	],
    },
    text_wc: { label: "num_words" },
    text_id: { label: "text_id" },
    text_fn: { label: "file_name" },
    text_ms: { label: "scotscorr_ms" },
    text_bi: { label: "scotscorr_bi" },
    text_st: { label: "scotscorr_st" },
};

// Add a multiple-selection list to the word, with one level of
// collapsible grouping by the first character of the word (required
// to make the list work reasonably fast for a large number of words).
// The resulting value is a regular expression. This could be
// generalized, maybe to an Angular directive.
attrs.scotscorr_word = {
    label: "word",
    opts: settings.defaultOptions,
    // The input field also has "list" icon, which is a link opening a
    // list of words with checkboxes from which the user can select.
    // This has been copied and modified from the code for the the
    // Swedish msd attribute.
    // TODO: Parametrize the default template in the directive
    // "tokenValue" so that possibly changes to it would be reflected
    // here automatically. The additional features here could be
    // simply parameter values
    extended_template: '<input class="arg_value arg_value_wordselector"' +
	' ng-model="input"' +
	' ng-model-options=\'{debounce : {default : 300, blur : 0}, updateOn: "default blur"}\'' +
	' ng-change="inputChange()" escaper' +
	' placeholder=\'<{{"any" | loc:lang}}>\'>' +
	'<span ng-click="onIconClick()" class="fa fa-list list-link-icon"' +
	' title="{{\'scotscorr_open_wordlist\' | loc:lang}}"></span>' +
	'<a href="http://www.dsl.ac.uk/" target="_blank"' +
	' title="Dictionary of the Scots Language">' +
	'<span class="fa fa-book book-link-icon"></span></a>' +
	' <span class="val_mod" popper' +
	' ng-class=\'{sensitive : case == "sensitive", insensitive : case == "insensitive"}\'>' +
	' Aa ' +
	'</span>' +
        '<ul class="mod_menu popper_menu dropdown-menu">' +
        '<li><a ng-click="makeSensitive()">{{"case_sensitive" | loc:lang}}</a></li>' +
        '<li><a ng-click="makeInsensitive()">{{"case_insensitive" | loc:lang}}</a></li>' +
        '</ul>',
    controller: function ($scope, $uibModal) {
	var s = $scope;
	var modal = null;
	s.words = [];
	s.groups = [];
	s.group_template = "";
	s.selected_words = [];
	s.selected_words_str = "";
	s.selected_freq = 0;
	s.total_freq = 0;
	s["case"] = "sensitive";
	// Add a thousands separator to a number
	s.pretty_num = function (num) {
	    return util.prettyNumbers(num);
	};
	// Make a template for the counts of selected and all tokens
	// and their frequencies.
	s.make_counts_template = function (tokens_sel, tokens_all, freq_sel,
					   freq_all) {
	    var pretty_num = function (val) {
		return ('<span ng-bind-html="pretty_num(' + val +
			') | trust"></span>');
	    }
	    // FIXME: Add thousands separators to the numbers shown in
	    // the tooltip.
	    return ('<span ng-attr-title="{{' + tokens_sel.toString() + '}}' +
		    ' {{\'scotscorr_selected_words_with_freq\' | loc:lang}} {{' +
		    freq_sel.toString() + '}}">' +
		    pretty_num(tokens_sel) +
		    // ' / ' +
		    // pretty_num(tokens_all) +
		    ';&nbsp; <span class="wordselector-freq"> ' +
		    pretty_num(freq_sel) +
		    // ' / ' +
		    // pretty_num(freq_all) +
		    '</span></span>');
	};
	// Process the word data (words and their frequencies grouped,
	// possibly hierarchically) and create s.words, s.groups and
	// s.group_template. The structure is represented as an array
	// of nested arrays, whose first item is the word or group
	// label and the second item the absolute frequency for a word
	// and an array of arrays for a group. Groups may be nested,
	// but a group may contain either groups or words, not both.
	// To make things simpler in Angular, s.group_template
	// contains all the groups explicitly written out but the
	// words are represented using ng-repeat.
	var make_word_list = function (data, groupstack) {
	    // c.log("scotscorr_word data", data);
	    var words_seen = false;
	    for (var i = 0; i < data.length; i++) {
		if (_.isArray(data[i][1])) {
		    var group = {
			name: data[i][0],
			words: [],
			numwords: 0,
			numselected: 0,
			totalfreq: 0,
			selectedfreq: 0,
			shown: false
		    };
		    var groupnum = s.groups.length;
		    s.groups.push(group);
		    groupstack.push(group);
		    var groupref = 'groups[' + groupnum.toString() + ']';
		    s.group_template += '<li>' +
			'<span class="wordselector-group-arrow"></span>' +
			'<span class="wordselector-group-heading" ng-click="toggleGroup(' + groupref + ')">' +
			'<img ng-src="img/{{' + groupref + '.shown ? \'extended\' : \'collapsed\'}}.png"/> ' +
			'<span class="wordselector-group-name">' + group.name + '</span>' +
			// Em quad
			'&#x2001;</span>' +
			'<span class="wordselector-group-extra"> (' +
			s.make_counts_template(groupref + '.numselected',
					       groupref + '.numwords',
					       groupref + '.selectedfreq',
					       groupref + '.totalfreq') +
			')</span>' +
			'<div ng-if="' + groupref + '.shown">' +
			'<ul>';
		    make_word_list(data[i][1], groupstack);
		    groupstack.pop();
		    s.group_template += '</ul></div></li>';
		} else {
		    if (! words_seen) {
			var groupref =
			    'groups[' + (s.groups.length - 1).toString() + ']';
			s.group_template +=
			'<li ng-repeat="word in ' + groupref + '.words">' +
			    '<input type="checkbox" ng-model="word.selected" ng-click="update(e, word.word)">' +
			    // &#x2000; = en quad
			    '<span ng-class="\'wordselector-word-\' + (word.selected ? \'\' : \'un\') + \'selected\'">&#x2000;{{word.word}}</span>' +
			    '&#x2000;(<span class="wordselector-freq" ng-bind-html="pretty_num(word.freq) | trust"></span>)</input>' +
			    '</li>';
			words_seen = true;
		    }
		    s.words.push({word: data[i][0],
				  freq: data[i][1],
				  groups: groupstack.slice(),
				  selected: false});
		}
	    }
	}
	$.getJSON(
	    "corpus_info/scotscorr-words.json",
	    function (data) {
		make_word_list(data, []);
		for (var i = 0; i < s.words.length; i++) {
		    var word = s.words[i];
		    s.total_freq += word.freq;
		    for (var j = 0; j < word.groups.length; j++) {
			var group = word.groups[j];
			group.words.push(word);
			group.numwords += 1;
			group.totalfreq += word.freq;
		    }
		}
		// c.log("scotscorr_word words", s.words);
		// c.log("scotscorr_word groups", s.groups,
		//       s.group_words);
		c.log('scotscorr group_template', s.group_template);
	    }
	);
	// Executed on clicking the list icon
	s.onIconClick = function () {
	    s.setSelected();
	    modal = $uibModal.open({
		template: '<div>' +
		    '<div class="modal-header">' +
		    '<h3 class="modal-title">{{\'wordlist\' | loc:lang}} (ScotsCorr)</h3>' +
		    '<span ng-click="done()" class="close-x">×</span>' +
		    '</div>' +
		    '<div class="modal-header">' +
		    '<div class="modal-value">' +
		    '<a href="http://www.dsl.ac.uk/" target="_blank"><span class="fa fa-book book-link-icon"></span> Dictionary of the Scots Language</a>' +
		    '</div>' +
		    '<div class="modal-value">' +
		    '<p><span class="modal-value-heading">{{\'selected_words\' | loc:lang}}</span> (' +
		    s.make_counts_template('selected_words.length',
					   'words.length',
					   'selected_freq',
					   'total_freq') +
		    '): <span id="wordselector-selected-words"><span ng-bind-html="selected_words_str | trust"></span></span></p>' +
		    '</div>' +
		    '<div class="modal-buttons">' +
		    '<button type="button" class="btn btn-default" ng-click="done()">{{\'button_done\' | loc:lang}}</button>' +
		    '<button type="button" class="btn btn-default" ng-click="clearSelected()">{{\'button_clear\' | loc:lang}}</button>' +
		    '<button type="button" class="btn btn-default" ng-click="cancel()">{{\'button_cancel\' | loc:lang}}</button>' +
		    '</div>' +
                    '</div>' +
		    '<div class="modal-body modal-wordselector" style="overflow-y: auto; font-size: 80%">' +
		    '<ul>' +
		    s.group_template +
		    '</ul>' +
		    '</div>' +
		    '</div>',
		scope: s
	    });
	};
	// Set the selected property of words based on the current
	// input value
	s.setSelected = function () {
	    s.input_prev = s.input;
	    var op = s.$parent.orObj.op;
	    var select_fn = null;
	    if (s.input == "" || op == "!=" || op == "!*=") {
		// Nothing selected for the empty word nor the negated
		// operations
		s.selected_words = [];
		select_fn = function (word) { return false; };
	    } else if (op == "=") {
		// Select only the word literally
		s.selected_words = [s.input];
		select_fn = function (word) { return word == s.input };
	    } else {
		// Construct a regular expression for testing if a
		// word matches the condition. This assumes that the
		// CQP regular expressions are are compatible with
		// JavaScript RegExps, as they (mostly) are.
		var word_re = "";
		if (op == "*=") {
		    // Regular expression
		    word_re = "^(" + s.input + ")$";
		} else if (op == "^=") {
		    // Starts with
		    word_re = "^(" + window.regescape(s.input) + ")";
		} else if (op == "&=") {
		    // Ends with
		    word_re = "(" + window.regescape(s.input) + ")$";
		} else if (op == "_=") {
		    // Contains
		    word_re = window.regescape(s.input)
		}
		// c.log("matching", word_re);
		word_re = RegExp(word_re);
		select_fn = function (word) { return word_re.test(word); };
	    }
	    // c.log("scotscorr_word setSelected", s.selected_words);
	    for (var i = 0; i < s.words.length; i++) {
		s.words[i].selected = select_fn(s.words[i].word);
		// if (s.words[i].selected) {c.log("selected:", s.words[i].word);}
	    }
	    // s.selected_words_str = s.selected_words.join("\u2000");
	    s.update();
	};
	// Clear the case-insensitive flag (restore the default)
	s.makeSensitive = function () {
	    s["case"] = "sensitive";
	    if (s.orObj.flags != null) {
		delete s.orObj.flags.c;
	    }
	};
	// Set the case-insensitive flag
	s.makeInsensitive = function () {
	    var flags = s.orObj.flags || {};
	    flags["c"] = true;
	    s.orObj.flags = flags;
	    s["case"] = "insensitive";
	};
	// Update s.selected_words based on the selected property
	// in the elements of s.words. The arguments are
	// currently not used.
	s.update = function (event, word) {
	    c.log("scotscorr_word update", word, event,
		  _.filter(s.words, "selected"));
	    // We could use the words in s.selected_words, but
	    // how could we retain the order of the words, that is,
	    // how could an added word be added at the right position
	    // in the list?
	    var selected_words = _.filter(s.words, "selected");
	    s.selected_words = _.pluck(selected_words, "word");
	    for (var j = 0; j < s.groups.length; j++) {
		s.groups[j].numselected = s.groups[j].selectedfreq = 0;
	    }
	    // Join with an en quad
	    s.selected_words_str =
		_.map(selected_words,
		      function (word) {
			  return (word.word.replace(/&/g, "&amp;")
				  .replace(/</g, "&lt;").replace(/>/g, "&gt;") +
				  '&nbsp;(<span class="wordselector-freq">' +
				  s.pretty_num(word.freq.toString()) +
				  '</span>)');
		      })
		.join("\u2000");
	    s.selected_freq = 0;
	    for (var i = 0; i < selected_words.length; i++) {
		var selword = selected_words[i];
		s.selected_freq += selword.freq;
		for (var j = 0; j < selword.groups.length; j++) {
		    var group = selword.groups[j];
		    group.numselected += 1;
		    group.selectedfreq += selword.freq;
		}
	    }
	    c.log("scotscorr_word selected", s.selected_words);
	};
	// Toggle a group
	s.toggleGroup = function (group, event) {
	    group.shown = ! group.shown;
	}
	// Set the input value based on the selected words
	s.done = function (event) {
	    modal.close();
	    if (s.selected_words.length > 1) {
		s.input = (
		    _.map(s.selected_words, window.regescape)
			.join("|"));
		// Force regular expression
		s.$parent.orObj.op = "*=";
	    } else {
		s.input = (s.selected_words.length == 1
			   ? s.selected_words[0]
			   : "");
		// For a single word, use "=" unless the word is the
		// same as before
		if (s.input != s.input_prev) {
		    s.$parent.orObj.op = "=";
		}
	    }
	    // s.inputChange() (from escaper) seems to be needed to
	    // update the input value to the model; specifying it in
	    // the ng-change attribute of the template appears not to
	    // suffice.
	    s.inputChange();
	    c.log("scotscorr_word input", s.input);
	};
	// Clear the selected words
	s.clearSelected = function (event) {
	    for (var i = 0; i < s.words.length; i++) {
		s.words[i].selected = false;
	    }
	    s.selected_words = [];
	    s.selected_words_str = "";
	    s.selected_freq = 0;
	    for (var j = 0; j < s.groups.length; j++) {
		s.groups[j].numselected = s.groups[j].selectedfreq = 0;
	    }
	    // s.update();
	};
	// Cancel: retain the original input value
	s.cancel = function (event) {
	    modal.close();
	};
    },
};


settings.corpora.scots_f1540_1599 = {
    id: "scots_f1540_1599",
    title: "ScotsCorr: Female 1540–1599 (beta)",
    description: "Helsinki Corpus of Scottish Correspondence: Female 1540–1599",
};

settings.corpora.scots_f1600_1649 = {
    id: "scots_f1600_1649",
    title: "ScotsCorr: Female 1600–1649 (beta)",
    description: "Helsinki Corpus of Scottish Correspondence: Female 1600–1649",
};

settings.corpora.scots_f1650_1699 = {
    id: "scots_f1650_1699",
    title: "ScotsCorr: Female 1650–1699 (beta)",
    description: "Helsinki Corpus of Scottish Correspondence: Female 1650–1699",
};

settings.corpora.scots_f1700_1749 = {
    id: "scots_f1700_1749",
    title: "ScotsCorr: Female 1700–1749 (beta)",
    description: "Helsinki Corpus of Scottish Correspondence: Female 1700–1749",
};

settings.corpora.scots_m1540_1599 = {
    id: "scots_m1540_1599",
    title: "ScotsCorr: Male 1540–1599 (beta)",
    description: "Helsinki Corpus of Scottish Correspondence: Male 1540–1599",
};

settings.corpora.scots_m1600_1649 = {
    id: "scots_m1600_1649",
    title: "ScotsCorr: Male 1600–1649 (beta)",
    description: "Helsinki Corpus of Scottish Correspondence: Male 1600–1649",
};

settings.corpora.scots_m1650_1699 = {
    id: "scots_m1650_1699",
    title: "ScotsCorr: Male 1650–1699 (beta)",
    description: "Helsinki Corpus of Scottish Correspondence: Male 1650–1699",
};

settings.corpora.scots_m1700_1749 = {
    id: "scots_m1700_1749",
    title: "ScotsCorr: Male 1700–1749 (beta)",
    description: "Helsinki Corpus of Scottish Correspondence: Male 1700–1749",
};

settings.corpora.scots_royal = {
    id: "scots_royal",
    title: "ScotsCorr: Royal (beta)",
    description: "Helsinki Corpus of Scottish Correspondence: Royal",
};

settings.fn.extend_corpus_settings(
    {
	context: {
	    // 2 preceding and following lines, but not crossing
	    // sentence boundaries. Note that this context syntax with
	    // a secondary context requires a modified korp.cgi (Git
	    // tag backend_20161201_secondary_contexts).
	    "3 line/1 sentence": "3 line/1 sentence",
	    // In ScotsCorr, sentence, paragraph and text are all the
	    // same regions, but only paragraph works here, since it
	    // is the default "reading mode" context.
	    "1 paragraph": "1 paragraph"
	},
	within: settings.defaultWithin,
	limited_access: isPublicServer,
	licence_type: "ACA",
	attributes: {
	    // This currently adds "word" also as a word attribute in
	    // attribute selection list, but it works in the same way
	    // as the word itself.
	    word: attrs.scotscorr_word,
	    comment: {
		label: "word_related_comment",
	    },
	},
	struct_attributes: sattrlist.scotscorr,
	ignore_between_tokens_cqp: '[word="[^a-zA-Z0-9]+|\\{.*"]*',
    },
    [
	"scots_f1540_1599",
	"scots_m1540_1599",
	"scots_f1600_1649",
	"scots_m1600_1649",
	"scots_f1650_1699",
	"scots_m1650_1699",
	"scots_f1700_1749",
	"scots_m1700_1749",
	"scots_royal",
    ]);

settings.corpus_aliases.scotscorr = "scots_.*";


/*
settings.corpora.erzya = {
    id: "erzya",
    title: "Ersä (testikorpus)",
    description: "Ersä (testikorpus)",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.testerzya,
    struct_attributes: sattrlist.testerzya
    };*/

settings.corpora.erme_myv = {
    id: "erme_myv",
    title: "Ersä/Erzya",
    description: "ERME: Ersä/Erzya",
    licence: settings.licenceinfo.CC_BY,
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.testerzya,
    struct_attributes: sattrlist.erme,
    unselected: true
};

settings.corpora.erme_mdf = {
    id: "erme_mdf",
    title: "Mokša/Moksha",
    description: "ERME: Mokša/Moksha",
    licence: settings.licenceinfo.CC_BY,
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.testerzya,
    struct_attributes: sattrlist.erme,
    unselected: true
};


settings.corpora.kildin_sample = {
    id: "kildin_sample",
    title: "Kildin Saami (sample)",
    description: "A test sample of the Corpus of Written Kildin Saami (2015)",
    metadata_urn: "urn:nbn:fi:lb-2015102001",
    licence: settings.licenceinfo.CC_BY,
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: {},
    struct_attributes: {
	text_style: {
	    label: "style",
	    displayType: "select",
	    translationKey: "style_",
	    dataset: [
		"fiction",
		"non-fiction",
	    ],
            opts: settings.liteOptions,
	},
	text_medium: {
	    label: "medium",
	    displayType: "select",
	    translationKey: "medium_",
	    dataset: [
		"book",
		"periodical",
		"internet",
	    ],
            opts: settings.liteOptions,
	},
	text_language: {
	    label: "lang",
	    displayType: "select",
	    translationKey: "",
	    dataset: [
		"sjd",
	    ],
            opts: settings.liteOptions,
	},
	text_author: {
	    label: "author",
	},
	text_annotator: {
	    label: "annotator",
	},
	text_translator: {
	    label: "translator",
	},
	text_source: {
	    label: "source",
	},
	text_place: {
	    label: "place",
	},
	text_modus: {
	    label: "text_modus",
	    displayType: "select",
	    translationKey: "modus_",
	    dataset: [
		"written",
	    ],
            opts: settings.liteOptions,
	},
	text_year: {
	    label: "year",
	},
	text_genre: {
	    label: "genre",
	    displayType: "select",
	    translationKey: "genre_",
	    dataset: [
		"biography",
		"novel",
		"story",
	    ],
            opts: settings.liteOptions,
	},
	text_session_name: {
	    label: "session_name",
	},
	text_session_title: {
	    label: "session_title",
	},
	text_channel: {
	    label: "channel",
	    displayType: "select",
	    translationKey: "channel_",
	    dataset: [
		"original",
		"translation",
	    ],
            opts: settings.liteOptions,
	},
	text_editor: {
	    label: "editor",
	},
	sentence_orth_orig: {
	    label: "orig_orthography",
	},
	sentence_transl: {
	    label: "translation",
	},
	sentence_transl_lang: {
	    label: "translation_lang",
	    displayType: "select",
	    translationKey: "",
	    dataset: [
		"eng",
		"rus",
		"sms",
		"kpv",
	    ],
            opts: settings.liteOptions,
	},
	// sentence_id: {
	//     label: "",
	// },
	sentence_paragraph_boundary: {
	    label: "in_paragraph",
	    displayType: "select",
	    translationKey: "paraplace_",
	    dataset: {
		"begin": "begin",
		"end": "end",
		"begin+end": "lone",
		"": "middle",
	    },
            opts: settings.liteOptions,
	},
    }
};


/*
settings.corpora.swahili_sample = {
    id: "swahili_sample",
    title: "Swahili (sample)",
    description: "A test sample of the new Swahili corpus",
    // metadata_urn: "urn:nbn:fi:lb-",
    // licence: settings.licenceinfo.CC_BY,
    limited_access: true,
    licence_type: "ACA",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: {
	lemma: attrs.baseform,
	pos: {
	    label: "pos",
	    displayType: "select",
	    // translationKey: "pos_",
	    localize: "false",
	    dataset: [
		"ADJ",
		"ADJ-POST",
		"ADJ-PRE",
		"ADV",
		"AG-PART",
		"CC",
		"COLON",
		"COMMA",
		"CONJ",
		"DEM",
		"DOUBLE-QUOTE-OPENING",
		"GEN-CON",
		"GEN-CON-KWA",
		"LEFT-PARENTHESIS",
		"N",
		"NUM",
		"PREP",
		"PRON",
		"PROPNAME",
		"RIGHT-PARENTHESIS",
		"SINGLE-QUOTE-OPENING",
		"V",
		"V-BE",
		"_",
	    ],
	    opts: settings.liteOptions,
	},
	msd: {
	    label: "msd",
	    taginfo_url: "",
	},
	gloss: {
	    label: "gloss",
	},
	syntax: {
	    label: "syntactic_function",
	},
	verbextra: {
	    label: "verb_features",
	},
    },
    struct_attributes: {
	sentence_id: sattrs.sentence_id_hidden,
    },
};
*/


settings.templ.hcs2_common = {
    id: "",
    title: "",
    description: "",
    limited_access: true,
    licence_type: "ACA",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: {
	lemma: attrs.baseform,
	pos: {
	    label: "pos",
	    displayType: "select",
	    // translationKey: "pos_",
	    localize: "false",
	    // The dataset currently excludes tags for punctuation
	    // marks
	    dataset: [
		"ABBR",
		"ADJ",
		"A-UNINFL",
		"ADV",
		"AG-PART",
		"CC",
		"CONJ",
		"CONJ/CC",
		"DEM",
		"EXCLAM",
		"GEN-CON",
		"GEN-CON-KWA",
		"INTERROG",
		"MWE",
		"N",
		"NUM",
		"NUM-ROM",
		"POSS-PRON",
		"PREP",
		"PREP/ADV",
		"PRON",
		"PROPNAME",
		"REL-LI",
		"REL-LI-VYO",
		"REL-SI",
		"REL-SI-VYO",
		"TITLE",
		"V",
		"V-BE",
		"V-DEF",
		"_",
	    ],
	    opts: settings.liteOptions,
	},
	msd: {
	    label: "msd",
	    taginfo_url: "",
	},
	gloss: {
	    label: "gloss",
	},
	syntax: {
	    label: "syntactic_function",
	    displayType: "select",
	    localize: "false",
	    dataset: [
		"@A>",
		"@<AD-A",
		"@AD-A>",
		"@ADVL",
		"@AG",
		"@CC",
		"@CS",
		"@<DN",
		"@DN>",
		"@FAUXV",
		"@-FAUXV",
		"@FMAINV",
		"@-FMAINV",
		"@FMAINVintr",
		"@FMAINVintr-ass",
		"@FMAINVintr-def",
		"@FMAINVintr-loc",
		"@-FMAINVkwisha<",
		"@-FMAINV-n",
		"@FMAINVtr-OBJ>",
		"@FMAINVtr+OBJ>",
		"@GCON",
		"@I-OBJ",
		"@NADJ",
		"@<NADJ",
		"@NADJ>",
		"@<NDEM",
		"@NDEM>",
		"@NH",
		"@<NH",
		"@OBJ",
		"@<P",
		"@P>",
		"@PAT",
		"@PCOMPL-S",
		"@QN",
		"@<QN",
		"@SUBJ",
		"@SUBJ+rel",
		"_",
	    ],
	    opts: settings.liteOptions,
	},
	msdextra: {
	    label: "extra_features",
	},
	lex: attrs.lemgram_hidden,
    },
    struct_attributes: {
	text_title: sattrs.text_title,
	text_filename: sattrs.filename,
	text_year: sattrs.year,
	sentence_id: sattrs.sentence_id_hidden,
    },
};

hcs2_news_extra_props = {
    struct_attributes: {
	text_month: sattrs.month,
    }
};

hcs2_hierarchy = [
    ["old", "Old material", "Material up to 2003, mostly from HCS 1.0", [
	["old_books", "Books", {
	    struct_attributes: {
		text_author: sattrs.author,
		text_publisher: sattrs.text_publisher,
		text_place: sattrs.text_publ_place,
	    }
	}],
	["old_news", "News (old)", hcs2_news_extra_props],
    ] ],
    ["new", "New material", "Material after 2003, new to HCS 2.0", [
	["new_bunge", "Bunge", "Hansards of Tanzanian Parliament 2004–2006", {
	    struct_attributes: {
		text_month: sattrs.month,
		text_day: sattrs.day_of_month,
	    }
	}],
	["new_news", "News (new)", hcs2_news_extra_props],
    ] ],
];

settings.fn.make_folder_hierarchy(
    settings.corporafolders.hcs2, hcs2_hierarchy,
    {
	id_prefix: "hcs2_",
	title_prefix: "HCS 2.0: ",
	description_prefix: "Helsinki Corpus of Swahili 2.0 (HCS 2.0) Annotated Version: ",
	corpus_template: settings.templ.hcs2_common,
    });

delete hcs2_hierarchy;
delete hcs2_news_extra_props;

settings.corpus_aliases.hcs = "hcs2_.*";
settings.corpus_aliases.hcs2 = "hcs2_.*";


settings.corpora.besercorp = {
    title: "BeserCorp",
    description: "The Corpus of Beserman Udmurt",
    id: "besercorp",
    metadata_urn: "urn:nbn:fi:lb-2015081401",
    cite_id: "BeserCorp",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.besercorp,
    struct_attributes: {}
};


// Mark Davies's corpora

// Common definitions

attrlist.byu = {
    lemma: $.extend({}, attrs.baseform, { order: 50 }),
    pos_major: {
	label: "major_pos",
	type: "set",
	displayType: "select",
	translationKey: "pos_",
	opts: settings.setOptions,
	order: 49,
	// TODO: Map the UD2 PoS codes below to existing PoS keys
	dataset: {
	    "ADJ": "ADJ",
	    "ADP": "ADP",
	    "ADV": "ADV",
	    "CCONJ": "CCONJ",
	    "DET": "DET",
	    "INTJ": "INTJ",
	    "NOUN": "NOUN",
	    "NUM": "NUM",
	    "PART": "PART",
	    "PRON": "PRON",
	    "PROPN": "PROPN",
	    "PUNCT": "PUNCT",
	    "SCONJ": "SCONJ",
	    "SYM": "SYM",
	    "VERB": "VERB",
	    "X": "X",
	},
    },
    pos: {
	label: "detailed_pos",
	type: "set",
	displayType: "select",
	translationKey: "pos_",
	opts: settings.setOptions,
	order: 48,
	// PoS tags from http://ucrel.lancs.ac.uk/claws7tags.html,
	// with some additions of BYU.
	dataset: {
	    "appge": "byu_appge",
	    "a": "byu_a",       // Not in CLAWS7
	    "at": "byu_at",
	    "at1": "byu_at1",
	    "bcl": "byu_bcl",
	    "c": "byu_c",       // Not in CLAWS7
	    "cc": "byu_cc",
	    "ccb": "byu_ccb",
	    "cs": "byu_cs",
	    "csa": "byu_csa",
	    "csn": "byu_csn",
	    "cst": "byu_cst",
	    "csw": "byu_csw",
	    "d": "byu_d",       // Not in CLAWS7
	    "da": "byu_da",
	    "da1": "byu_da1",
	    "da2": "byu_da2",
	    "dar": "byu_dar",
	    "dat": "byu_dat",
	    "db": "byu_db",
	    "db2": "byu_db2",
	    "dd": "byu_dd",
	    "dd1": "byu_dd1",
	    "dd2": "byu_dd2",
	    "ddq": "byu_ddq",
	    "ddqge": "byu_ddqge",
	    "ddqv": "byu_ddqv",
	    "ex": "byu_ex",
	    "f": "byu_f",       // Not in CLAWS7
	    "fo": "byu_fo",
	    "fu": "byu_fu",
	    "fw": "byu_fw",
	    "ge": "byu_ge",
	    "i": "byu_i",       // Not in CLAWS7
	    "if": "byu_if",
	    "ii": "byu_ii",
	    "io": "byu_io",
	    "iw": "byu_iw",
	    "j": "byu_j",       // Not in CLAWS7
	    "jj": "byu_jj",
	    "jjr": "byu_jjr",
	    "jjt": "byu_jjt",
	    "jk": "byu_jk",
	    "m": "byu_m",       // Not in CLAWS7
	    "m#": "byu_m#",     // Not in CLAWS7
	    "m\$": "byu_m$",     // Not in CLAWS7
	    "m#": "byu_m1",     // Not in CLAWS7
	    "mc": "byu_mc",
	    "mc1": "byu_mc1",
	    "mc2": "byu_mc2",
	    "mcge": "byu_mcge",
	    "mcmc": "byu_mcmc",
	    "md": "byu_md",
	    "mf": "byu_mf",
	    "n": "byu_n",       // Not in CLAWS7
	    "nd1": "byu_nd1",
	    "nn": "byu_nn",
	    "nn1": "byu_nn1",
	    "nn2": "byu_nn2",
	    "nna": "byu_nna",
	    "nnb": "byu_nnb",
	    "nnl1": "byu_nnl1",
	    "nnl2": "byu_nnl2",
	    "nno": "byu_nno",
	    "nno2": "byu_nno2",
	    "nnt1": "byu_nnt1",
	    "nnt2": "byu_nnt2",
	    "nnu": "byu_nnu",
	    "nnu1": "byu_nnu1",
	    "nnu2": "byu_nnu2",
	    "np": "byu_np",
	    "np1": "byu_np1",
	    "np2": "byu_np2",
	    "npd1": "byu_npd1",
	    "npd2": "byu_npd2",
	    "npm1": "byu_npm1",
	    "npm2": "byu_npm2",
	    "npx": "byu_npx",   // Not in CLAWS7
	    "null": "byu_null", // Not in CLAWS7
	    "p": "byu_p",       // Not in CLAWS7
	    "pn": "byu_pn",
	    "pn1": "byu_pn1",
	    "pnqo": "byu_pnqo",
	    "pnqs": "byu_pnqs",
	    "pnqv": "byu_pnqv",
	    "pnx1": "byu_pnx1",
	    "ppge": "byu_ppge",
	    "pph1": "byu_pph1",
	    "ppho1": "byu_ppho1",
	    "ppho2": "byu_ppho2",
	    "pphs1": "byu_pphs1",
	    "pphs2": "byu_pphs2",
	    "ppio1": "byu_ppio1",
	    "ppio2": "byu_ppio2",
	    "ppis1": "byu_ppis1",
	    "ppis2": "byu_ppis2",
	    "ppx1": "byu_ppx1",
	    "ppx2": "byu_ppx2",
	    "ppy": "byu_ppy",
	    "ra": "byu_ra",
	    "rex": "byu_rex",
	    "rg": "byu_rg",
	    "rgq": "byu_rgq",
	    "rgqv": "byu_rgqv",
	    "rgr": "byu_rgr",
	    "rgt": "byu_rgt",
	    "rl": "byu_rl",
	    "rp": "byu_rp",
	    "rpk": "byu_rpk",
	    "rr": "byu_rr",
	    "rrq": "byu_rrq",
	    "rrqv": "byu_rrqv",
	    "rrr": "byu_rrr",
	    "rrt": "byu_rrt",
	    "rt": "byu_rt",
	    "to": "byu_to",
	    "uh": "byu_uh",
	    "v": "byu_v",       // Not in CLAWS7
	    "vb0": "byu_vb0",
	    "vbdr": "byu_vbdr",
	    "vbdz": "byu_vbdz",
	    "vbg": "byu_vbg",
	    "vbi": "byu_vbi",
	    "vbm": "byu_vbm",
	    "vbn": "byu_vbn",
	    "vbr": "byu_vbr",
	    "vbz": "byu_vbz",
	    "vd": "byu_vd",     // Not in CLAWS7
	    "vd0": "byu_vd0",
	    "vdd": "byu_vdd",
	    "vdg": "byu_vdg",
	    "vdi": "byu_vdi",
	    "vdn": "byu_vdn",
	    "vdz": "byu_vdz",
	    "vh0": "byu_vh0",
	    "vhd": "byu_vhd",
	    "vhg": "byu_vhg",
	    "vhi": "byu_vhi",
	    "vhn": "byu_vhn",
	    "vhz": "byu_vhz",
	    "vm": "byu_vm",
	    "vmk": "byu_vmk",
	    "vv0": "byu_vv0",
	    "vvd": "byu_vvd",
	    "vvg": "byu_vvg",
	    "vvgk": "byu_vvgk",
	    "vvi": "byu_vvi",
	    "vvn": "byu_vvn",
	    "vvnk": "byu_vvnk",
	    "vvz": "byu_vvz",
	    "x": "byu_x",       // Not in CLAWS7
	    "xx": "byu_xx",
	    "xxy": "byu_xxy",   // Not in CLAWS7
	    "y": "Punct",   // Not in CLAWS7
	    "[-!\\\"(),.:;?]|\\\"@|\\.\\.\\.": "byu_y0",  // Not in CLAWS7
	    "z": "byu_z",       // Not in CLAWS7
	    "z'": "byu_z'",     // Not in CLAWS7
	    "zz1": "byu_zz1",
	    "zz2": "byu_zz2",
	    "zzc": "byu_zzc",   // Not in CLAWS7
	    "zzq": "byu_zzq",   // Not in CLAWS7
	    "GAP": "byu_GAP",   // Not in CLAWS7
	    "UNKNOWN": "Unknown",   // Not in CLAWS7
	},
    },
    posorig: {
	label: "pos_orig",
	order: 47,
    },
    msd_ambig: {
	label: "ambiguous_msd",
	order: 46,
	transform: function(val) {
	    return val.replace(/(.)\|(.)/g, "$1\n|$2");
	},
    },
    lex: attrs.lemgram_hidden,
    // // This does not seem to work without a valued attribute.
    // gap: {
    //	label: "deleted",
    //	isStructAttr: true,
    // },
};

sattrlist.byu_common = {
    text_year: sattrs.year,
    text_title: sattrs.text_title,
    text_id: {
	label: "text_id",
    },
    text_wordcount: {
	label: "text_word_count",
    },
    text_filename: {
	label: "file_name"
    },
    // paragraph_id: {
    // },
    paragraph_type: {
	label: "paragraph_type",
	displayType: "select",
	translationKey: "paratype_",
	opts: settings.liteOptions,
	dataset: [
	    "paragraph",
	    "heading",
	    "paragraph/heading",
	    "sentence",
	],
    },
    // sentence_id: {
    // },
    sentence_gaps: {
	label: "sentence_part_deleted",
	displayType: "select",
	translationKey: "",
	opts: settings.liteOptions,
	dataset: [
	    "yes",
	    "no",
	],
    },
};


// COCA

sattrlist.coca = $.extend(
    true, {}, sattrlist.byu_common,
    {
	text_genre: {
	    label: "genre",
	    displayType: "select",
	    translationKey: "genre_",
	    opts: settings.liteOptions,
	    dataset: {
		"ACAD": "academic",
		"FIC": "fiction",
		"MAG": "popular_magazine",
		"NEWS": "newspaper",
		"SPOK": "spoken",
	    },
	},
	text_subgenre: {
	    label: "subgenre",
	},
	text_source: {
	    label: "source",
	},
	text_publ_info: {
	    label: "publication_info",
	},
    });

settings.templ.coca_common = {
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.byu,
    struct_attributes: sattrlist.coca,
};

var coca_hierarchy = [
    ["fic", "Fiction"],
    ["mag", "Magazine"],
    ["news", "Newspaper"],
    ["acad", "Academic"],
    ["spok", "Spoken"],
];

settings.fn.make_folder_hierarchy(
    settings.corporafolders.english.coca, coca_hierarchy,
    {
	id_prefix: "coca_",
	title_prefix: "COCA: ",
	title_suffix: " (beta)",
	description_prefix: "COCA: Corpus of Contemporary American English (genre: ",
	description_suffix: ") – Kielipankki Korp version 2017H1 (beta)",
	corpus_template: settings.templ.coca_common,
    });

delete coca_hierarchy;

settings.corpus_aliases.coca = "coca_.*";
settings.corpus_aliases["coca-2017h1"] = "coca_.*";


// COHA

sattrlist.coha =  $.extend(
    true, {}, sattrlist.byu_common,
    {
	text_genre: {
	    label: "genre",
	    displayType: "select",
	    translationKey: "genre_",
	    opts: settings.liteOptions,
	    dataset: {
		"FIC": "fiction",
		"MAG": "popular_magazine",
		"NEWS": "newspaper",
		"NF": "non-fiction_book",
	    },
	},
	text_author: {
	    label: "author",
	},
	text_publ_info: {
	    label: "publication_info",
	},
	// LCC is non-empty only for non-fiction; should it be defined
	// only there?
	text_lcc: {
	    label: "lib_congress_classif",
	    displayType: "select",
	    // translationKey: "lcc_",
	    opts: settings.liteOptions,
	    dataset: {
		"A": "A – General Works",
		"B": "B – Philosophy. Psychology. Religion",
		"C": "C – Auxiliary Sciences of History",
		"D": "D – World History and History of Europe, Asia, Africa, Australia, New Zealand, etc.",
		"E": "E – History of the Americas",
		"F": "F – History of the Americas",
		"G": "G – Geography. Anthropology. Recreation",
		"H": "H – Social Sciences",
		"J": "J – Political Science",
		"K": "K – Law",
		"L": "L – Education",
		"M": "M – Music and Books on Music",
		"N": "N – Fine Arts",
		"P": "P – Language and Literature",
		"Q": "Q – Science",
		"R": "R – Medicine",
		"S": "S – Agriculture",
		"T": "T – Technology",
		"U": "U – Military Science",
		"V": "V – Naval Science",
		"Z": "Z – Bibliography. Library Science. Information Resources (General)",
		"": "(unclassified)",
	    }
	},
    });

settings.templ.coha_common = {
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.byu,
    struct_attributes: sattrlist.coha,
};

// Make a corpus/folder hierarchy for COHA (to be used as an argument
// to settings.fn.make_folder_hierarchy): decades as folders, decades
// with genres as corpora from start_decade to end_decade (inclusive),
// with the genres listed in an array of two-elemen arrays (corpus id
// suffix, genre name).
function make_coha_hierarchy (start_decade, end_decade, genres) {
    var result = [];
    for (var decade = start_decade; decade <= end_decade; decade += 10) {
	var decade_str = decade.toString() + "s";
	var genre_hierarchy = []
	for (var i = 0; i < genres.length; i++) {
	    var genre = genres[i];
	    genre_hierarchy.push([decade_str + "_" + genre[0],
				  decade_str + " " + genre[1]]);
	}
	result.push([decade_str, decade_str, genre_hierarchy]);
    }
    return result;
}

var coha_genres_nonews = [["fic", "fiction"],
			  ["mag", "popular magazines"],
			  ["nf", "non-fiction books"]];
var coha_genres_news = [["fic", "fiction"],
			["mag", "popular magazines"],
			["news", "newspapers"],
			["nf", "non-fiction books"]];

// No news before 1860s
var coha_hierarchy =
    make_coha_hierarchy(1810, 1850, coha_genres_nonews)
    .concat(make_coha_hierarchy(1860, 2000, coha_genres_news));

settings.fn.make_folder_hierarchy(
    settings.corporafolders.english.coha, coha_hierarchy,
    {
	id_prefix: "coha_",
	title_prefix: "COHA: ",
	title_suffix: " (beta)",
	description_prefix: "COHA: Corpus of Historical American English: ",
	description_suffix: " – Kielipankki Korp version 2017H1 (beta)",
	corpus_template: settings.templ.coha_common,
    });

delete coha_genres_nonews;
delete coha_genres_news;
delete coha_hierarchy;

settings.corpus_aliases.coha = "coha_.*";
settings.corpus_aliases["coha-2017h1"] = "coha_.*";


// GloWbE

// Countries sorted by region and perhaps approximate size
var glowbe_countries = [
    // North America
    ["us", "United States"],
    ["ca", "Canada"],
    // Europe
    ["gb", "Great Britain"],
    ["ie", "Ireland"],
    // Australia and Oceania
    ["au", "Australia"],
    ["nz", "New Zealand"],
    // South Asia
    ["in", "India"],
    ["lk", "Sri Lanka"],
    ["pk", "Pakistan"],
    ["bd", "Bangladesh"],
    // South-East Asia
    ["sg", "Singapore"],
    ["my", "Malaysia"],
    ["ph", "Philippines"],
    ["hk", "Hong Kong"],
    // Africa
    ["za", "South Africa"],
    ["ng", "Nigeria"],
    ["gh", "Ghana"],
    ["ke", "Kenya"],
    ["tz", "Tanzania"],
    // The Caribbean
    ["jm", "Jamaica"],
];

sattrlist.glowbe = $.extend(
    true, {}, sattrlist.byu_common,
    {
	// The country and genre are always the same for each subcorpus,
	// but they could have use if more than one subcorpus is selected.
	text_country: {
	    label: "country",
	    displayType: "select",
	    translationKey: "country_",
	    opts: settings.liteOptions,
	    // Uppercase country codes
	    dataset: (_.unzip(glowbe_countries)[0]
		       .map(function (s) { return s.toUpperCase(); })),
	},
	text_genre: {
	    label: "genre",
	    displayType: "select",
	    translationKey: "genre_",
	    opts: settings.liteOptions,
	    dataset: {
		"B": "blog",
		"G": "general",
	    }
	},
	text_url: sattrs.original_url,
	text_webdomain: {
	    label: "web_domain_name",
	},
    });

settings.templ.glowbe_common = {
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.byu,
    struct_attributes: sattrlist.glowbe,
};

// Make a corpus/folder hierarchy for GloWbE (to be used as an
// argument to settings.fn.make_folder_hierarchy) based on the list of
// country codes and names: countries as folders, countries with
// genres (general or blog) as corpora.
function make_glowbe_hierarchy (countries) {
    var result = [];
    for (var i = 0; i < countries.length; i++) {
	var country = countries[i];
	result.push([
	    country[0], country[1], [
		[country[0] + "_genl", country[1] + ": general"],
		[country[0] + "_blog", country[1] + ": blogs"],
	    ]
	])
    }
    return result;
}

settings.fn.make_folder_hierarchy(
    settings.corporafolders.english.glowbe,
    make_glowbe_hierarchy(glowbe_countries),
    {
	id_prefix: "glowbe_",
	title_prefix: "GloWbE: ",
	title_suffix: " (beta)",
	description_prefix: "GloWbE: Global Web-based English: ",
	description_suffix: " – Kielipankki Korp version 2017H1 (beta)",
	corpus_template: settings.templ.glowbe_common,
    });

delete glowbe_countries;

settings.corpus_aliases.glowbe = "glowbe_.*";
settings.corpus_aliases["glowbe-2017h1"] = "glowbe_.*";



settings.fn.add_attr_extra_properties(settings.corpora);


settings.corpusListing = new CorpusListing(settings.corpora);
