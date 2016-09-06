// -*- coding: utf-8 -*-

settings.primaryColor = "#ffe7d2";
settings.primaryLight = "#fff4eb";
settings.autocomplete = true;
settings.lemgramSelect = true;
settings.wordpicture = false;

$("#lemgram_list_item").remove();
$("#results-lemgram").remove();


settings.preselected_corpora = ["mulcold_en"];


settings.corpora = {};
settings.corporafolders = {};

settings.spWithin = {
    "sentence" : "sentence",
    "paragraph" : "paragraph"
};

settings.spContext = {
    "1 sentence" : "1 sentence",
    "1 paragraph" : "1 paragraph"
};

settings.corporafolders.sust = {
    title : "sus-fieldwork",
    description : "sus-fieldwork",
    contents : ["sust_myv", "sust_kpv"]
};

settings.corporafolders.testikansio = {
    title : "ERME",
    description : "ERME",
    contents : ["erme_mdf", "erme_myv"]
};

settings.corporafolders.fennougrica = {
    title : "Fenno-Ugrica",
    contents : ["fennougrica_myv",
                "fennougrica_kca",
                "fennougrica_izh",
                "fennougrica_mhr",
                "fennougrica_mrj",
                "fennougrica_mns",
                "fennougrica_mdf",
                "fennougrica_sel",
                "fennougrica_yrk",
                "fennougrica_vep"]
};

settings.corporafolders.english = {
    title : "English / Englanti",
    description : "Texts in English<br/>Englanninkielisiä tekstejä",
    contents : ["mulcold_en", "elfa", "topling"]
};

settings.corporafolders.german = {
    title : "Deutsch / Saksa / German",
    description : "Texte auf Deutsch<br/>Saksankielisiä tekstejä<br/>Texts in German",
    contents : ["mulcold_de"],
    // unselected : true
};

settings.corporafolders.russian = {
    title : "Русский / Venäjä / Russian",
    description : "Tексты по-русски<br/>Venäjänkielisiä tekstejä<br/>Texts in Russian",
    contents : ["legal_ru", "mulcold_ru"],
    // unselected : true
};

settings.corporafolders.hcs2 = {
    title : "Helsinki Corpus of Swahili 2.0 (HCS 2.0)",
    description : "Helsinki Corpus of Swahili 2.0 (HCS 2.0) Annotated Version<br/><br><a href=\"https://www.kielipankki.fi/corpora/hcs2/\" target=\"_blank\">Corpus information page, including descriptions of annotation feature values (tags)</a>",
    info : {
	urn : "[to be added]",
	metadata_urn : "urn:nbn:fi:lb-2016011301",
	licence : settings.licenceinfo.ACA_NC,
    },
};


/* 
settings.corporafolders.scotscorr = {
    title : "ScotsCorr",
    contents : ["scots_f1550_1599",
                "scots_f1600_1649",
                "scots_f1650_1699",
                "scots_f1700_1749",
                "scots_m1550_1599",
                "scots_m1600_1649",
                "scots_m1650_1699",
                "scots_m1700_1749",
                "scots_royal"]
};
*/


/*
settings.corpora.fennougrica = {
    id : "fennougrica",
    title : "Fenno-Ugrica",
    description : "Fenno-Ugrica",
    metadata_urn : "urn:nbn:fi:lb-2014073056",
    homepage_url : "http://fennougrica.kansalliskirjasto.fi/",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.fennougrica,
    struct_attributes : sattrlist.fennougrica,
    unselected : true
};
*/

settings.corpora.sust_myv = {
    id : "sust_myv",
    title : "Ersä (näyte)",
    description : "Ersä",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.sust,
    struct_attributes : sattrlist.sust
};

settings.corpora.sust_kpv = {
    id : "sust_kpv",
    title : "Syrjääninkomi (näyte)",
    description : "Syrjääninkomi",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.sust,
    struct_attributes : sattrlist.sust
};

settings.corpora.fennougrica_izh = {
    id : "fennougrica_izh",
    title : "Inkeroinen",
    description : "Fenno-Ugrica, inkeroinen",
    metadata_urn : "urn:nbn:fi:lb-2014073056",
    homepage_url : "http://fennougrica.kansalliskirjasto.fi/",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.fennougrica,
    struct_attributes : sattrlist.fennougrica,
    unselected : true
};

settings.corpora.fennougrica_mhr = {
    id : "fennougrica_mhr",
    title : "Itämari",
    description : "Fenno-Ugrica, itämari",
    metadata_urn : "urn:nbn:fi:lb-2014073056",
    homepage_url : "http://fennougrica.kansalliskirjasto.fi/",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.fennougrica,
    struct_attributes : sattrlist.fennougrica,
    unselected : true
};

settings.corpora.fennougrica_kca = {
    id : "fennougrica_kca",
    title : "Hanti",
    description : "Fenno-Ugrica, hanti",
    metadata_urn : "urn:nbn:fi:lb-2014073056",
    homepage_url : "http://fennougrica.kansalliskirjasto.fi/",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.fennougrica,
    struct_attributes : sattrlist.fennougrica,
    unselected : true
};

settings.corpora.fennougrica_mdf = {
    id : "fennougrica_mdf",
    title : "Mokša",
    description : "Fenno-Ugrica, mokša",
    metadata_urn : "urn:nbn:fi:lb-2014073056",
    homepage_url : "http://fennougrica.kansalliskirjasto.fi/",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.fennougrica,
    struct_attributes : sattrlist.fennougrica,
    unselected : true
};

settings.corpora.fennougrica_mns = {
    id : "fennougrica_mns",
    title : "Mansi",
    description : "Fenno-Ugrica, mansi",
    metadata_urn : "urn:nbn:fi:lb-2014073056",
    homepage_url : "http://fennougrica.kansalliskirjasto.fi/",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.fennougrica,
    struct_attributes : sattrlist.fennougrica,
    unselected : true
};

settings.corpora.fennougrica_mrj = {
    id : "fennougrica_mrj",
    title : "Länsimari",
    description : "Fenno-Ugrica, länsimari",
    metadata_urn : "urn:nbn:fi:lb-2014073056",
    homepage_url : "http://fennougrica.kansalliskirjasto.fi/",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.fennougrica,
    struct_attributes : sattrlist.fennougrica,
    unselected : true
};

settings.corpora.fennougrica_myv = {
    id : "fennougrica_myv",
    title : "Ersä",
    description : "Fenno-Ugrica, ersä",
    metadata_urn : "urn:nbn:fi:lb-2014073056",
    homepage_url : "http://fennougrica.kansalliskirjasto.fi/",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.fennougrica,
    struct_attributes : sattrlist.fennougrica,
    unselected : true
};

settings.corpora.fennougrica_sel = {
    id : "fennougrica_sel",
    title : "Selkuppi",
    description : "Fenno-Ugrica, selkuppi",
    metadata_urn : "urn:nbn:fi:lb-2014073056",
    homepage_url : "http://fennougrica.kansalliskirjasto.fi/",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.fennougrica,
    struct_attributes : sattrlist.fennougrica,
    unselected : true
};

settings.corpora.fennougrica_vep = {
    id : "fennougrica_vep",
    title : "Vepsä",
    description : "Fenno-Ugrica, vepsä",
    metadata_urn : "urn:nbn:fi:lb-2014073056",
    homepage_url : "http://fennougrica.kansalliskirjasto.fi/",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.fennougrica,
    struct_attributes : sattrlist.fennougrica,
    unselected : true
};

settings.corpora.fennougrica_yrk = {
    id : "fennougrica_yrk",
    title : "Tundranenetsi",
    description : "Fenno-Ugrica, tundranenetsi",
    metadata_urn : "urn:nbn:fi:lb-2014073056",
    homepage_url : "http://fennougrica.kansalliskirjasto.fi/",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.fennougrica,
    struct_attributes : sattrlist.fennougrica,
    unselected : true
};

settings.corpora.mulcold_en = {
    id : "mulcold_en",
    title: "MULCOLD englanti",
    description : "Multilingual Corpus of Legal Documents, englanninkielinen osa",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes: attrlist.mulcold_en,
    struct_attributes : sattrlist.mulcold,
};

settings.corpora.mulcold_de = {
    id : "mulcold_de",
    title: "MULCOLD saksa",
    description : "Multilingual Corpus of Legal Documents, saksankielinen osa",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes: attrlist.mulcold_de,
    struct_attributes : sattrlist.mulcold,
};

settings.corpora.mulcold_ru = {
    id : "mulcold_ru",
    title: "MULCOLD venäjä",
    description : "Multilingual Corpus of Legal Documents, venäjänkielinen osa",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes: attrlist.mulcold_ru,
    struct_attributes : sattrlist.mulcold,
};

settings.fn.extend_corpus_settings(settings.corpusinfo.mulcold,
				   ["mulcold_en", "mulcold_de", "mulcold_ru"]);

settings.corpora.legal_ru = {
    id : "legal_ru",
    title: "FiRuLex venäjä",
    description : "Jurdisia tekstejä (venäjä)",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes: attrlist.mulcold_ru,
    struct_attributes : sattrlist.legal
};

settings.fn.extend_corpus_settings(settings.corpusinfo.firulex,
				   ["legal_ru"]);

settings.corpora.topling = {
    id : "topling",
    title : "TOPLING (näytteitä)",
    description : "TOPLING (näytteitä)",
    // No Korp URN yet
    metadata_urn : "urn:nbn:fi:lb-20140730168",
    licence : {
	name : "CLARIN RES +PLAN +NC +DEP",
	urn : "urn:nbn:fi:lb-20150304138"
    },
    homepage_url : "https://www.jyu.fi//topling",
    limited_access : true,
    licence_type : "RES",
    context : settings.spContext,
    within : settings.spWithin,
    // unselected : true,
    attributes : attrlist.topling,
    struct_attributes : sattrlist.topling
};


settings.corpora.elfa = {
    id : "elfa",
    title : "ELFA",
    description : "ELFA – The Corpus of English as a Lingua Franca in Academic Settings (anonymised transcriptions), preliminary Korp version<br>The ELFA corpus contains 1 million words of transcribed spoken academic ELF (approximately 131 hours of recorded speech). The recordings were made at the University of Tampere, the University of Helsinki, Tampere University of Technology, and Helsinki University of Technology.<br/>IPR holder: Professor Anna Mauranen, University of Helsinki",
    urn : "[to be added]",
    // FIXME: This is the top-level ELFA metadata URN; change it to
    // the one for the Korp version when available
    metadata_urn : "urn:nbn:fi:lb-201403262",
    licence : settings.licenceinfo.CC_BY,
    // TODO: Add an IPR holder item (or something like that) to the
    // standard info fields
    // compiler : {
    // 	name : "Anna Mauranen",
    // },
    context : settings.spContext,
    within : settings.spWithin,
    ignore_between_tokens_cqp : '[type != "word"]*',
    attributes : {
	type : {
	    label : "token_type",
	    displayType : "select",
	    // translationKey : "",
	    localize : false,
	    opts : settings.liteOptions,
	    dataset : {
		"word" : "word",
		"hesitation" : "hesitation",
		"pause" : "pause",
		"backchannel" : "backchannel",
		"overlap_begin" : "overlap begin",
		"overlap_end" : "overlap end",
		"voice_shift" : "voice shift",
		"mode_shift" : "mode shift",
		"unclear" : "unclear",
		"laugh" : "laugh",
		"cough" : "cough",
		"incident" : "incident",
		"sigh.*" : "sigh",
		"foreign.*|repeats the question in russian" : "foreign",
		"humming" : "humming",
		"name.*|(company|village) name|ethnic group|book title|.*e-mail address" : "name",
		"pronounces the sound" : "pronounces the sound",
		"pronounces the name" : "pronounces the name",
		"makes an attacking noise" : "makes an attacking noise",
		"inaudibly through the microphone" : "inaudibly through the microphone",
		"imitates barking" : "imitates barking",
		"gasp" : "gasp",
		"clicking his tongue" : "clicking tongue",
		"null" : "unspecified",
	    },
	},
	subtype : {
	    label : "token_subtype",
	    displayType : "select",
	    // translationKey : "",
	    localize : false,
	    opts : settings.liteOptions,
	    dataset : {
		"overlap" : "overlap",
		"unfinished" : "unfinished",
		"unclear" : "unclear",
		"begin" : "begin",
		"end" : "end",
		"anonymized_name" : "anonymized name",
		"foreign" : "foreign",
		"sic" : "sic",
		"null" : "unspecified",
	    },
	},
	mode : {
	    label : "action_type",
	    displayType : "select",
	    // translationKey : "",
	    localize : false,
	    opts : settings.liteOptions,
	    dataset : {
		"speaking" : "speaking",
		"reading_aloud" : "reading aloud",
		"writing_on_blackboard" : "writing on blackboard",
		"null" : "unspecified",
	    },
	},
	voice : {
	    label : "speaking_mode",
	    displayType : "select",
	    // translationKey : "",
	    localize : false,
	    opts : settings.liteOptions,
	    dataset : {
		"normal" : "normal",
		"laugh" : "laugh",
		"whisp" : "whisp",
		"mock_accent" : "mock accent",
		"mutter" : "mutter",
		"Finnish_pronunciation" : "Finnish pronunciation",
		"spelling" : "spelling",
		"imitating_stress" : "imitating stress",
		"Italian_pronunciation" : "Italian pronunciation",
		"Finnish_spelling" : "Finnish spelling",
		"null" : "unspecified",
	    },
	},
	tags : {
	    label : "enclosing_elements",
	    type : "set",
	    displayType : "hidden",
	},
	synch_id : {
	    label : "synch_id",
	    isStructAttr : true,
	},
	synch_speaker_id : {
	    label : "other_speaker_id",
	    isStructAttr : true,
	},
	synch_content : {
	    label : "other_speaker_content",
	    isStructAttr : true,
	},
    },
    struct_attributes : {
	text_id : {
	    label : "text_id",
	},
	text_domain : {
	    label : "academic_domain",
	    displayType : "select",
	    translationKey : "academic_domain_",
	    opts : settings.liteOptions,
	    dataset : [
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
	text_discipline : {
	    label : "academic_discipline",
	    displayType : "select",
	    localize : false,
	    opts : settings.liteOptions,
	    dataset : [
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
	text_event_type : {
	    label : "event_type",
	    displayType : "select",
	    // translationKey : "",
	    localize : false,
	    opts : settings.liteOptions,
	    dataset : [
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
	text_event_purpose : {
	    label : "event_purpose",
	    displayType : "select",
	    translationKey : "event_purpose_",
	    opts : settings.liteOptions,
	    dataset : [
		"discuss",
		"inform",
	    ],
	},
	text_event_num : {
	    label : "event_num",
	},
	text_event_part : {
	    label : "event_part",
	},
	text_title : {
	    label : "title",
	},
	text_notes : {
	    label : "notes",
	},
	text_preparedness : {
	    label : "preparedness",
	    displayType : "select",
	    translationKey : "preparedness_",
	    opts : settings.liteOptions,
	    dataset : [
		"true",
		"false",
	    ],
	},
	text_interaction_degree : {
	    label : "interaction_degree",
	    displayType : "select",
	    translationKey : "interaction_degree_",
	    opts : settings.liteOptions,
	    dataset : [
		"complete",
		"partial",
		"none",
	    ],
	},
	text_duration_minsec : {
	    label : "recording_duration",
	},
	text_recording_type : {
	    label : "recording_type",
	    displayType : "select",
	    // translationKey : "",
	    localize : false,
	    opts : settings.liteOptions,
	    dataset : [
		"conference",
		"university degree programme",
	    ],
	},
	text_num_speakers : {
	    label : "num_speakers",
	},
	text_num_participants : {
	    label : "num_participants",
	},
	text_date : {
	    label : "date",
	},
	text_publisher : {
	    displayType : "hidden",
	},
	paragraph_speaker_type : {
	    label : "speaker_identification",
	    displayType : "select",
	    translationKey : "speaker_ident_",
	    opts : settings.liteOptions,
	    dataset : [
		"identified",
		"several",
		"unidentified",
	    ],
	},
	paragraph_speaker_l1 : {
	    label : "speaker_l1",
	    type : "set",
	    displayType : "select",
	    translationKey : "",
	    opts : settings.setOptions,
	    dataset : {
		"ada-GH" : "ada-GH",
		"aka.*" : "aka",
		"aka-GH" : "aka-GH",
		"amh" : "amh",
		"ara" : "ara",
		"ben" : "ben",
		"ber" : "ber",
		"bul" : "bul",
		"cat" : "cat",
		"ces" : "ces",
		"cym" : "cym",
		"dag-GH" : "dag-GH",
		"dan" : "dan",
		"deu.*" : "deu",
		"deu-AT" : "deu-AT",
		"deu-CH" : "deu-CH",
		"ell" : "ell",
		"eng.*" : "eng",
		"eng-AU" : "eng-AU",
		"eng-BD" : "eng-BD",
		"eng-CA" : "eng-CA",
		"eng-CM" : "eng-CM",
		"eng-GB" : "eng-GB",
		"eng-GH" : "eng-GH",
		"eng-HK" : "eng-HK",
		"eng-IE" : "eng-IE",
		"eng-IN" : "eng-IN",
		"eng-JM" : "eng-JM",
		"eng-LB" : "eng-LB",
		"eng-NG" : "eng-NG",
		"eng-NZ" : "eng-NZ",
		"eng-TT" : "eng-TT",
		"eng-US" : "eng-US",
		"est" : "est",
		"fas" : "fas",
		"fin" : "fin",
		"fra.*" : "fra",
		"fra-BE" : "fra-BE",
		"hau-NG" : "hau-NG",
		"hay" : "hay",
		"heb" : "heb",
		"hin" : "hin",
		"hrv" : "hrv",
		"hun" : "hun",
		"ibo" : "ibo",
		"isl" : "isl",
		"ita" : "ita",
		"jpn" : "jpn",
		"kik.*" : "kik",
		"kik-KE" : "kik-KE",
		"lav" : "lav",
		"lit" : "lit",
		"nep" : "nep",
		"nld.*" : "nld",
		"nld-BE" : "nld-BE",
		"nor" : "nor",
		"orm-ET" : "orm-ET",
		"pol" : "pol",
		"por.*" : "por",
		"por-BR" : "por-BR",
		"qaa" : "qaa",
		"ron" : "ron",
		"rus" : "rus",
		"slk" : "slk",
		"som" : "som",
		"spa.*" : "spa",
		"spa-AR" : "spa-AR",
		"spa-CO" : "spa-CO",
		"spa-MX" : "spa-MX",
		"swe.*" : "swe",
		"swe-FI" : "swe-FI",
		"swh.*" : "swh",
		"swh-KE" : "swh-KE",
		"swh-TZ" : "swh-TZ",
		"tur" : "tur",
		"twi.*" : "twi",
		"twi-GH" : "twi-GH",
		"und.*" : "und",
		"und-CA" : "und-CA",
		"und-GH" : "und-GH",
		"und-TZ" : "und-TZ",
		"urd-PK" : "urd-PK",
		"uzb" : "uzb",
		"yor" : "yor",
		"zho" : "zho",
	    },
	},
	paragraph_speaker_role : {
	    label : "academic_role",
	    displayType : "select",
	    translationKey : "academic_role_",
	    opts : settings.liteOptions,
	    dataset : [
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
	paragraph_speaker_age : {
	    label : "age",
	    displayType : "select",
	    translationKey : "age_",
	    opts : settings.liteOptions,
	    dataset : [
		"17-23",
		"24-30",
		"31-50",
		"51-over",
		"unknown",
	    ],
	},
	paragraph_speaker_sex : {
	    label : "gender",
	    displayType : "select",
	    translationKey : "",
	    opts : settings.liteOptions,
	    dataset : {
		"male" : "male",
		"female" : "female",
		"unknown|null" : "unknown",
	    }
	},
	paragraph_speaker_id : {
	    label : "speaker_id",
	},
	paragraph_type : {
	    label : "speech_event_type",
	    displayType : "select",
	    translationKey : "speech_event_type_",
	    opts : settings.liteOptions,
	    dataset : [
		"utterance",
		"incident",
		"pause",
	    ],
	},
	paragraph_id : {
	    label : "turn_id",
	},
	sentence_id : sattrs.sentence_id_hidden,
    },
};


/*
settings.corpora.fennougrica_veps = {
    id : "fennougrica_veps",
    title : "Fenno-Ugrica: Vepsä (näyte)",
    description : "Fenno-Ugrica: Vepsä (näyte)",
    metadata_urn : "urn:nbn:fi:lb-2014073056",
    homepage_url : "http://fennougrica.kansalliskirjasto.fi/",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.fennougrica_veps,
    struct_attributes : sattrlist.fennougrica_veps,
    // unselected : true
};
*/



/* skotti
settings.corpora.scots_f1550_1599 = {
    id : "scots_f1550_1599",
    title : "Female 1550–1599",
    description : "Female 1550–1599",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {},
    struct_attributes : sattrlist.scotscorr
};

settings.corpora.scots_f1600_1649 = {
    id : "scots_f1600_1649",
    title : "Female 1600–1649",
    description : "Female 1600–1649",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {},
    struct_attributes : sattrlist.scotscorr
};

settings.corpora.scots_f1650_1699 = {
    id : "scots_f1650_1699",
    title : "Female 1650–1699",
    description : "Female 1650–1699",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {},
    struct_attributes : sattrlist.scotscorr
};

settings.corpora.scots_f1700_1749 = {
    id : "scots_f1700_1749",
    title : "Female 1700–1749",
    description : "Female 1700–1749",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {},
    struct_attributes : sattrlist.scotscorr
};

settings.corpora.scots_m1550_1599 = {
    id : "scots_m1550_1599",
    title : "Male 1550–1599",
    description : "Male 1550–1599",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {},
    struct_attributes : sattrlist.scotscorr
};

settings.corpora.scots_m1600_1649 = {
    id : "scots_m1600_1649",
    title : "Male 1600–1649",
    description : "Male 1600–1649",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {},
    struct_attributes : sattrlist.scotscorr
};

settings.corpora.scots_m1650_1699 = {
    id : "scots_m1650_1699",
    title : "Male 1650–1699",
    description : "Male 1650–1699",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {},
    struct_attributes : sattrlist.scotscorr
};

settings.corpora.scots_m1700_1749 = {
    id : "scots_m1700_1749",
    title : "Male 1700–1749",
    description : "Male 1700–1749",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {},
    struct_attributes : sattrlist.scotscorr
};

settings.corpora.scots_royal = {
    id : "scots_royal",
    title : "Royal",
    description : "Royal",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {},
    struct_attributes : sattrlist.scotscorr
};
*/
/*
settings.corpora.erzya = {
    id : "erzya",
    title : "Ersä (testikorpus)",
    description : "Ersä (testikorpus)",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.testerzya,
    struct_attributes : sattrlist.testerzya
    };*/

settings.corpora.erme_myv = {
    id : "erme_myv",
    title : "ERME (Ersä/Erzya)",
    description : "ERME (Ersä/Erzya)",
    licence : settings.licenceinfo.CC_BY,
    /*limited_access : true,
      licence_type : "ACA",*/
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.testerzya,
    struct_attributes : sattrlist.erme,
    unselected : true
};

settings.corpora.erme_mdf = {
    id : "erme_mdf",
    title : "ERME (Mokša/Moksha)",
    description : "ERME (Mokša/Moksha)",
    licence : settings.licenceinfo.CC_BY,
    /*limited_access : true,
    licence_type : "ACA",*/
    within : settings.spWithin,
    context : settings.spContext,
    attributes : attrlist.testerzya,
    struct_attributes : sattrlist.erme,
    unselected: true
};


settings.corpora.kildin_sample = {
    id : "kildin_sample",
    title : "Kildin Saami (sample)",
    description : "A test sample of the Corpus of Written Kildin Saami (2015)",
    metadata_urn : "urn:nbn:fi:lb-2015102001",
    licence : settings.licenceinfo.CC_BY,
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {},
    struct_attributes : {
	text_style : {
	    label : "style",
	    displayType : "select",
	    translationKey : "style_",
	    dataset : [
		"fiction",
		"non-fiction",
	    ],
            opts : settings.liteOptions,
	},
	text_medium : {
	    label : "medium",
	    displayType : "select",
	    translationKey : "medium_",
	    dataset : [
		"book",
		"periodical",
		"internet",
	    ],
            opts : settings.liteOptions,
	},
	text_language : {
	    label : "lang",
	    displayType : "select",
	    translationKey : "",
	    dataset : [
		"sjd",
	    ],
            opts : settings.liteOptions,
	},
	text_author : {
	    label : "author",
	},
	text_annotator : {
	    label : "annotator",
	},
	text_translator : {
	    label : "translator",
	},
	text_source : {
	    label : "source",
	},
	text_place : {
	    label : "place",
	},
	text_modus : {
	    label : "text_modus",
	    displayType : "select",
	    translationKey : "modus_",
	    dataset : [
		"written",
	    ],
            opts : settings.liteOptions,
	},
	text_year : {
	    label : "year",
	},
	text_genre : {
	    label : "genre",
	    displayType : "select",
	    translationKey : "genre_",
	    dataset : [
		"biography",
		"novel",
		"story",
	    ],
            opts : settings.liteOptions,
	},
	text_session_name : {
	    label : "session_name",
	},
	text_session_title : {
	    label : "session_title",
	},
	text_channel : {
	    label : "channel",
	    displayType : "select",
	    translationKey : "channel_",
	    dataset : [
		"original",
		"translation",
	    ],
            opts : settings.liteOptions,
	},
	text_editor : {
	    label : "editor",
	},
	sentence_orth_orig : {
	    label : "orig_orthography",
	},
	sentence_transl : {
	    label : "translation",
	},
	sentence_transl_lang : {
	    label : "translation_lang",
	    displayType : "select",
	    translationKey : "",
	    dataset : [
		"eng",
		"rus",
		"sms",
		"kpv",
	    ],
            opts : settings.liteOptions,
	},
	// sentence_id : {
	//     label : "",
	// },
	sentence_paragraph_boundary : {
	    label : "in_paragraph",
	    displayType : "select",
	    translationKey : "paraplace_",
	    dataset : {
		"begin" : "begin",
		"end" : "end",
		"begin+end" : "lone",
		"" : "middle",
	    },
            opts : settings.liteOptions,
	},
    }
};


/*
settings.corpora.swahili_sample = {
    id : "swahili_sample",
    title : "Swahili (sample)",
    description : "A test sample of the new Swahili corpus",
    // metadata_urn : "urn:nbn:fi:lb-",
    // licence : settings.licenceinfo.CC_BY,
    limited_access : true,
    licence_type : "ACA",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {
	lemma : attrs.baseform,
	pos : {
	    label : "pos",
	    displayType : "select",
	    // translationKey : "pos_",
	    localize : "false",
	    dataset : [
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
	    opts : settings.liteOptions,
	},
	msd : {
	    label : "msd",
	    taginfo_url : "",
	},
	gloss : {
	    label : "gloss",
	},
	syntax : {
	    label : "syntactic_function",
	},
	verbextra : {
	    label : "verb_features",
	},
    },
    struct_attributes : {
	sentence_id : sattrs.sentence_id_hidden,
    },
};
*/


settings.templ.hcs2_common = {
    id : "",
    title : "",
    description : "",
    limited_access : true,
    licence_type : "ACA",
    context : settings.defaultContext,
    within : settings.defaultWithin,
    attributes : {
	lemma : attrs.baseform,
	pos : {
	    label : "pos",
	    displayType : "select",
	    // translationKey : "pos_",
	    localize : "false",
	    dataset : [
		"A-UNINFL",
		"ABBR",
		"ADJ",
		"ADJ-PR-REL",
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
		"N",
		"NUM",
		"NUM-ROM",
		"POSS-PRON",
		"PREP",
		"PREP/ADV",
		"PRON",
		"PROPNAME",
		"REL-LI",
		"REL-LI-NEG",
		"REL-LI-VYO",
		"REL-SI",
		"REL-SI-VYO",
		"TITLE",
		"V",
		"V-BE",
		"V-DEF",
		"_",
	    ],
	    opts : settings.liteOptions,
	},
	msd : {
	    label : "msd",
	    taginfo_url : "",
	},
	gloss : {
	    label : "gloss",
	},
	syntax : {
	    label : "syntactic_function",
	    displayType : "select",
	    localize : "false",
	    dataset : [
		"@-FAUXV",
		"@-FMAINV",
		"@-FMAINV-n",
		"@-FMAINVkwisha<",
		"@<AD-A",
		"@<DN",
		"@<NADJ",
		"@<NDEM",
		"@<NH",
		"@<P",
		"@<QN",
		"@AD-A>",
		"@ADVL",
		"@AG",
		"@CC",
		"@CS",
		"@DN>",
		"@FAUXV",
		"@FMAINV",
		"@FMAINVintr",
		"@FMAINVintr-ass",
		"@FMAINVintr-def",
		"@FMAINVintr-loc",
		"@FMAINVtr+OBJ>",
		"@FMAINVtr-OBJ>",
		"@GCON",
		"@I-OBJ",
		"@NADJ",
		"@NADJ>",
		"@NDEM>",
		"@NH",
		"@OBJ",
		"@P>",
		"@PAT",
		"@PCOMPL-S",
		"@SUBJ",
		"@SUBJ+rel",
		"_",
	    ],
	    opts : settings.liteOptions,
	},
	msdextra : {
	    label : "extra_features",
	},
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_filename : sattrs.filename,
	text_year : sattrs.year,
	sentence_id : sattrs.sentence_id_hidden,
    },
};

hcs2_news_extra_props = {
    struct_attributes : {
	text_month : sattrs.month,
    }
};

hcs2_hierarchy = [
    ["old", "Old material", "Material up to 2003, mostly from HCS 1.0", [
	["old_books", "Books", {
	    struct_attributes : {
		text_author : sattrs.author,
		text_publisher : sattrs.text_publisher,
		text_place : sattrs.text_publ_place,
	    }
	}],
	["old_news", "News (old)", hcs2_news_extra_props],
    ] ],
    ["new", "New material", "Material after 2003, new to HCS 2.0", [
	["new_bunge", "Bunge", "Hansards of Tanzanian Parliament 2004–2006", {
	    struct_attributes : {
		text_month : sattrs.month,
		text_day : sattrs.day_of_month,
	    }
	}],
	["new_news", "News (new)", hcs2_news_extra_props],
    ] ],
];

settings.fn.make_folder_hierarchy(
    settings.corporafolders.hcs2, hcs2_hierarchy,
    {
	id_prefix : "hcs2_",
	title_prefix : "HCS 2.0: ",
	description_prefix : "Helsinki Corpus of Swahili 2.0 (HCS 2.0) Annotated Version: ",
	corpus_template : settings.templ.hcs2_common,
    });

delete hcs2_hierarchy;
delete hcs2_news_extra_props;

settings.corpus_aliases.hcs = "hcs2_.*";
settings.corpus_aliases.hcs2 = "hcs2_.*";

settings.corpora.besercorp = {
    title : "BeserCorp",
    description : "The Corpus of Beserman Udmurt",
    id : "besercorp",
    metadata_urn : "urn:nbn:fi:lb-2015081401",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : attrlist.besercorp,
    struct_attributes : {}
};


var locally_available_corpora = ["(mulcold|legal)_..",
				 "elfa",
				 "kildin_sample",
				 "swahili_sample"];

if (! isPublicServer) {
    settings.fn.remove_matching_corpora(locally_available_corpora, true);
} else {
    settings.fn.remove_matching_corpora(["test.*"]);
}

delete locally_available_corpora;


settings.fn.add_attr_extra_properties(settings.corpora);


settings.corpusListing = new CorpusListing(settings.corpora);
