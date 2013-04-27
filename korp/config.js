/* lemma => grundform, base form
 * lexem => lemgram, lemgram
 * 
 */
var settings = {};
//var language = $.localize.data.locale;

settings.lemgramSelect = true;
settings.autocomplete = true;

settings.wordPictureMaxWords = 30;

settings.primaryColor = "rgb(221, 233, 255)";
settings.primaryLight = "rgb(242, 247, 255)";
settings.secondaryColor = "";
settings.corpora = {};
settings.defaultContext = {
	"1 sentence" : "1 sentence"
};
settings.spContext = {
	"1 sentence" : "1 sentence",
	"1 paragraph" : "1 paragraph"
};
settings.defaultWithin = {
	"sentence" : "sentence"	
};
settings.spWithin = {
	"sentence" : "sentence",
	"paragraph" : "paragraph"
};

settings.defaultLanguage = "fi";

/*
 * ATTRIBUTES
 */
// for optimization purposes
settings.cqp_prio = ['deprel', 'pos', 'msd', 'suffix', 'prefix', 'grundform', 'lemgram', 'saldo', 'word'];

settings.defaultOptions = {
	"is" : "is",
	"is_not" : "is_not",
	"starts_with" : "starts_with",
	"contains" : "contains",
	"ends_with" : "ends_with",
	"matches" : "matches"
};

settings.getTransformFunc = function(type, value, opt) {
	c.log("getTransformFunc", type, value);
	
	if(type == "word" && !value) return function() {return "";};
	
	if(type == "date_interval") {
		
		var from = value[0].toString() + "0101";
		var to = value[1].toString() + "1231";
		
		var operator1 = ">=", operator2 = "<=", bool = "&";
		if(opt == "is_not") {
			operator1 = "<";
			operator2 = ">";
			bool = "|";
		}
		
		return function() {
			return $.format("(int(_.text_datefrom) %s %s %s int(_.text_dateto) %s %s)", 
					[operator1, from, bool, operator2, to]);
		};
	
	}
};

settings.liteOptions = $.exclude(settings.defaultOptions, ["starts_with", "contains", "ends_with", "matches"]);

var attrs = {};  // positional attributes
var sattrs = {}; // structural attributes

attrs.pos = {
    label : "pos",
    displayType : "select",
    translationKey : "pos_",
    dataset : {
	"AB" : "AB",
	"MID|MAD|PAD" : "DL",
	"DT" : "DT",
	"HA" : "HA",
	"HD" : "HD",
	"HP" : "HP",
	"HS" : "HS",
	"IE" : "IE",
	"IN" : "IN",
	"JJ" : "JJ",
	"KN" : "KN",
	"NN" : "NN",
	"PC" : "PC",
	"PL" : "PL",
	"PM" : "PM",
	"PN" : "PN",
	"PP" : "PP",
	"PS" : "PS",
	"RG" : "RG",
	"RO" : "RO",
	"SN" : "SN",
	"UO" : "UO",
	"VB" : "VB"
    },
    opts : settings.liteOptions
};
attrs.pos_ftb2 = {
    label : "pos",
    displayType : "select",
    translationKey : "posftb2_",
    dataset : {
	"A" : "A",
	"Abbr" : "Abbr",
	"Adp" : "Adp",
	"Adv" : "Adv",
	"CC" : "CC",
	"Con" : "Con",
	"CS" : "CS",
	"Interj|INTERJ" : "Interj",
	"N|Noun" : "N",
	"Num" : "Num",
	"POST" : "POST",
	"Pron" : "Pron",
	"Pun" : "Pun",
	"V" : "V"
    },
    opts : settings.liteOptions
};
attrs.pos_ftb3 = {
    label : "pos",
    displayType : "select",
    translationKey : "posftb3_",
    dataset : {
	"A" : "A",
	"Abbr" : "Abbr",
	"Adp" : "Adp",
	"Adp|Po" : "Post",
	"Adv" : "Adv",
	"Art" : "Art",
	"CC" : "CC",
	"Con|C" : "Con",
	"CS" : "CS",
	"Forgn" : "Forgn",
	"Interj|INTERJ" : "Interj",
	"N|Noun" : "N",
	"Num" : "Num",
	"Pron" : "Pron",
	"PrfPrc" : "PrfPrc",
	"PrsPrc" : "PrsPrc",
	"Punct" : "Punct",
	"V" : "V",
	"[NON-TWOL]" : "NonTWOL"
    },
    opts : settings.liteOptions
};
attrs.pos_ftb3_orig = {
    label : "pos_orig",
    translationKey : "posftb3_",
    dataset : {
	"A" : "A",
	"Abbr" : "Abbr",
	"Adp" : "Adp",
	"Adp|Po" : "Post",
	"Adv" : "Adv",
	"Art" : "Art",
	"CC" : "CC",
	"Con|C" : "Con",
	"CS" : "CS",
	"Forgn" : "Forgn",
	"Interj|INTERJ" : "Interj",
	"N|Noun" : "N",
	"Num" : "Num",
	"Pron" : "Pron",
	"PrfPrc" : "PrfPrc",
	"PrsPrc" : "PrsPrc",
	"Punct" : "Punct",
	"V" : "V",
	"[NON-TWOL]" : "NonTWOL"
    },
    opts : settings.defaultOptions
};
attrs.pos_ftb31 = {
    label : "pos",
    displayType : "select",
    translationKey : "posftb3_",
    dataset : {
	"A" : "A",
	"Abbr" : "Abbr",
	"Adp" : "Adp",
	"Adv" : "Adv",
	"CC" : "CC",
	"CS" : "CS",
	"Forgn" : "Forgn",
	"Num" : "Num",
	"Pron" : "Pron",
	"PrfPrc" : "PrfPrc",
	"PrsPrc" : "PrsPrc",
	"AgPrc" : "AgPrc",
	"NegPrc" : "NegPrc",
	"Punct" : "Punct",
	"V" : "V",
	"TrunCo" : "TrunCo",
	"Unkwn" : "Unkwn"
    },
    opts : settings.liteOptions
};
attrs.pos_kotus = {
    label : "pos",
    displayType : "select",
    translationKey : "poskotus_",
    dataset : {
	"A" : "A",
	"ABBR" : "Abbr",
	"AD-A" : "AdA",
	"ADV" : "Adv",
	"C" : "Con",
	"DV-MA" : "DvMa",
	"N" : "N",
	"NUM" : "Num",
	"PCP1" : "Pcp1",
	"PCP2" : "Pcp2",
	"PP" : "Pp",
	"PRON" : "Pron",
	"PSP" : "Post",
	"PUNCT" : "Punct",
	"REFL/PRON" : "ReflPron",
	"#UNKNOWN" : "Unknown",
	"V" : "V"
    },
    opts : settings.liteOptions
};
attrs.pos_parrus_fi = {
    label : "pos",
    displayType : "select",
    translationKey : "posparrusfi_",
    dataset : {
	"A" : "A",
	"Abbr" : "Abbr",
	"ADV" : "Adv",
	"Aux" : "Aux",
	"CC" : "CC",
	"CS" : "CS",
	"Heur" : "Heur",
	"N" : "N",
	"NUM" : "Num",
	"POST" : "Post",
	"PRON" : "Pron",
	"pun" : "Punct",
	"V" : "V"
    },
    opts : settings.liteOptions
};
attrs.pos_parrus_ru = {
    label : "pos",
    displayType : "select",
    translationKey : "posparrusru_",
    dataset : {
	"Adj" : "Adj",
	"Conj" : "Conj",
	"Gerund" : "Gerund",
	"Noun" : "Noun",
	"Numeral" : "Numeral",
	"Part" : "Part",
	"Particle" : "Particle",
	"Preposition" : "Preposition",
	"Pron" : "Pron",
	"pun" : "Punct",
	"Verb" : "Verb"
    },
    opts : settings.liteOptions
};
attrs.msd = {
	label : "msd",
	opts : settings.defaultOptions
};
attrs.baseform = {
    label : "baseform",
    // type : "set",
    // displayType : "autocomplete",
    opts : settings.defaultOptions
};
attrs.baseform_ftb2 = {
    label : "baseform",
    // type : "set",
    // displayType : "autocomplete",
    opts : settings.defaultOptions
};
attrs.baseform_compound = {
    label : "baseform_compound",
    // type : "set",
    // displayType : "autocomplete",
    opts : settings.defaultOptions
};
attrs.lemgram = {
    label : "lemgram",
    type : "set",
    displayType : "autocomplete",
    opts : settings.liteOptions
};
attrs.lemgram_hidden = {
    label : "lemgram",
    type : "set",    // Seems to work only if this is "set" even if "hidden"
    displayType : "hidden",
    // opts : settings.liteOptions
};
attrs.saldo = {
	label : "saldo",
	type : "set",
	displayType : "autocomplete",
	opts : settings.liteOptions
};
attrs.dephead = {
	label : "dephead",
	displayType : "hidden"
};
attrs.deprel = {
    label : "deprel",
    displayType : "select",
    translationKey : "deprel_",
    dataset : {
	"++" : "++",
	"+A" : "+A",
	"+F" : "+F",
	"AA" : "AA",
	"AG" : "AG",
	"AN" : "AN",
	"AT" : "AT",
	"CA" : "CA",
	"DB" : "DB",
	"DT" : "DT",
	"EF" : "EF",
	"EO" : "EO",
	"ES" : "ES",
	"ET" : "ET",
	"FO" : "FO",
	"FP" : "FP",
	"FS" : "FS",
	"FV" : "FV",
	"I?" : "I?",
	"IC" : "IC",
	"IG" : "IG",
	"IK" : "IK",
	"IM" : "IM",
	"IO" : "IO",
	"IP" : "IP",
	"IQ" : "IQ",
	"IR" : "IR",
	"IS" : "IS",
	"IT" : "IT",
	"IU" : "IU",
	"IV" : "IV",
	"JC" : "JC",
	"JG" : "JG",
	"JR" : "JR",
	"JT" : "JT",
	"KA" : "KA",
	"MA" : "MA",
	"MS" : "MS",
	"NA" : "NA",
	"OA" : "OA",
	"OO" : "OO",
	"OP" : "OP",
	"PL" : "PL",
	"PR" : "PR",
	"PT" : "PT",
	"RA" : "RA",
	"SP" : "SP",
	"SS" : "SS",
	"TA" : "TA",
	"TT" : "TT",
	"UK" : "UK",
	"VA" : "VA",
	"VO" : "VO",
	"VS" : "VS",
	"XA" : "XA",
	"XF" : "XF",
	"XT" : "XT",
	"XX" : "XX",
	"YY" : "YY",
	"CJ" : "CJ",
	"HD" : "HD",
	"IF" : "IF",
	"PA" : "PA",
	"UA" : "UA",
	"VG" : "VG"
    },
    opts : settings.liteOptions
};
attrs.deprel_ftb2 = {
    label : "deprel",
    displayType : "select",
    translationKey : "deprelftb2_",
    dataset : {
	"advl" : "advl",
	"attr" : "attr",
	"aux" : "aux",
	"comp" : "comp",
	"conjunct" : "conjunct",
	"idiom|idom" : "idiom",
	"main" : "main",
	"mod" : "mod",
	"modal" : "modal",
	"obj" : "obj",
	"phrm" : "phrm",
	"phrv" : "phrv",
	"scomp" : "scomp",
	"subj" : "subj",
	"voc" : "voc",
	"_|-" : "_",
    },
    opts : settings.liteOptions
};
attrs.prefix = {
	label : "prefix",
	type : "set",
	displayType : "autocomplete",
	opts : settings.liteOptions
};
attrs.suffix = {
	label : "suffix",
	type : "set",
	displayType : "autocomplete",
	opts : settings.liteOptions
};
attrs.ref = {
	label : "ref",
	displayType : "hidden"
};
attrs.link = {
	label : "sentence_link"
};
attrs.text = {
    label : "text"
};
attrs.spoken = {
    label : "spoken",
    opts : settings.defaultOptions
};
attrs.origword = {
    label : "word_orig",
    opts : settings.defaultOptions
};
attrs.complword = {
    label : "word_completed",
    opts : settings.defaultOptions
};
attrs.id_hidden = {
	label : "id",
	displayType : "hidden",
	opts : settings.defaultOptions
};

sattrs.date = {
	label : "date",
	displayType : "date"
};

sattrs.text_title = {
    label : "text_title"
};
sattrs.text_distributor = {
    label : "text_distributor",
    displayType : "hidden"
};
sattrs.text_source = {
    label : "text_source"
};
sattrs.sentence_id_hidden = {
    label : "sentence_id",
    displayType : "hidden"
};
sattrs.sentence_id = {
    label : "sentence_id"
};
sattrs.sentence_n = {
    label : "sentence_n"
};
sattrs.paragraph_id = {
    label : "paragraph_id"
};
sattrs.paragraph_type = {
    label : "paragraph_type"
};


/*
 * FOLDERS
 */
 
settings.corporafolders = {};

/*
settings.corporafolders.sv = {
    title : "Svenska texter",
    contents : ["testcorpus"]
};
*/

settings.corporafolders.ftb = {
    title : "FinnTreeBank: suomen puupankki",
    contents : ["ftb2"]
};

settings.corporafolders.ftb.ftb3 = {
    title : "FinnTreeBank 3",
    contents : ["ftb3_europarl", "ftb3_jrcacquis"]
};

settings.corporafolders.kotus = {
    title : "Kotuksen korpuksia",
    contents : ["kotus_klassikot", "kotus_sananparret"]
};

settings.corporafolders.kotus.ns = {
    title : "Nykysuomen aineistoja",
    contents : ["ns_presidentti", "ns_saadokset"]
};

settings.corporafolders.la = {
    title : "Lauseopin arkisto",
    contents : ["la_murre"]
};

settings.corporafolders.fi = {
    title : "Muita suomenkielisiä aineistoja",
    contents : ["metsatalo"]
};



/*
 * CORPORA
 */

/*
settings.corpora.testcorpus = {
    title : "The Korp Test Corpus",
    description : "A test corpus for testing Korp.",
    id : "testcorpus",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        pos : attrs.pos
    },
    struct_attributes : {
    }
};
*/

/*
settings.corpora.testcorp = {
    title : "Testikorpus",
    description : "Testikorpus Korpin ominaisuuksien testaamiseksi",
    id : "testcorp",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	lemma : attrs.baseform,
        pos : attrs.pos
    },
    struct_attributes : {
	sentence_id : {
	    label : "sentence_id"
	}
    }
};
*/

settings.corpora.ftb2 = {
    title : "FinnTreeBank 2",
    description : "Finnish tree bank, version 2",
    id : "ftb2",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	lemma : attrs.baseform_ftb2,
        pos : attrs.pos_ftb2,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	subcorpus_name : {
	    label : "subcorpus_name",
	    displayType : "select",
	    translationKey : "subcorp_",
	    dataset : {
		// "news-samples" : "news-samples",
		// "sofie12" : "sofie12",
		"visk-sent" : "visk-sent",
		"wikipedia-samples" : "wikipedia-samples"
	    },
            opts : settings.liteOptions
	},
	sentence_id : sattrs.sentence_id_hidden
    }
};

/*
settings.corpora.ftb3 = {
    title : "FinnTreeBank 3",
    description : "Finnish tree bank, version 3: EuroParl, JRC Acquis",
    id : "ftb3",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	lemma : attrs.baseform_ftb2,
	lemmacomp : attrs.baseform_compound,
        pos : attrs.pos_ftb3,
	posorig : attrs.pos_ftb3_orig,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	subcorpus_name : {
	    label : "subcorpus_name",
	    displayType : "select",
	    translationKey : "ftb3_subcorp_",
	    dataset : {
		"JRC_Acquis" : "jrc-acquis",
		"EuroParl" : "europarl",
	    },
            opts : settings.liteOptions
	},
	file_name : {
	    label : "file_name",
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_line : {
	    label : "sentence_line",
	}
    }
};
*/

settings.corpora.ftb3_europarl = {
    title : "FinnTreeBank 3: EuroParl",
    description : "Suomen puupankki, versio 3: EuroParl (Euroopan parlamentin istuntoja)",
    id : "ftb3_europarl",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	lemma : attrs.baseform_ftb2,
	lemmacomp : attrs.baseform_compound,
	pos : attrs.pos_ftb31,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	file_name : {
	    label : "file_name",
	},
	chapter_id : {
	    label : "chapter_id",
	    displayType : "hidden",
	},
	chapter_title : {
	    label : "chapter_title",
	},
	paragraph_id : {
	    label : "paragraph_id",
	    displayType : "hidden",
	},
	speech_speakerid : {
	    label : "speech_speakerid",
	    displayType : "hidden",
	},
	speech_speakername : {
	    label : "speech_speakername",
	},
	speech_language : {
	    label : "speech_language",
	    displayType : "select",
	    translationKey : "ftb3_europarl_language_",
	    dataset : {
		"bg" : "bg",
		"cs" : "cs",
		"da" : "da",
		"de" : "de",
		"el" : "el",
		"en" : "en",
		"es" : "es",
		"et" : "et",
		"eu" : "eu",
		"fi" : "fi",
		"fr" : "fr",
		"ga" : "ga",
		"hu" : "hu",
		"it" : "it",
		"lt" : "lt",
		"lv" : "lv",
		"mt" : "mt",
		"nl" : "nl",
		"pl" : "pl",
		"pt" : "pt",
		"ro" : "ro",
		"sk" : "sk",
		"sl" : "sl",
		"sv" : "sv",
		"und" : "und",
	    },
	    opts : settings.liteOptions
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_line : {
	    label : "sentence_line",
	}
    }
};

settings.corpora.ftb3_jrcacquis = {
    title : "FinnTreeBank 3: JRC Acquis",
    description : "Suomen puupankki, versio 3: JRC Acquis (EU-säädöksiä)",
    id : "ftb3_jrcacquis",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	lemma : attrs.baseform_ftb2,
	lemmacomp : attrs.baseform_compound,
	pos : attrs.pos_ftb31,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	file_name : {
	    label : "file_name",
	},
	file_title : {
	    label : "file_title",
	},
	file_codetitle : {
	    label : "file_codetitle",
	},
	file_url : {
	    label : "file_url",
	    type : "url",
	},
	paragraph_id : {
	    label : "paragraph_id",
	    displayType : "hidden",
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_line : {
	    label : "sentence_line",
	}
    }
};

settings.corpora.metsatalo = {
    title : "Reitti A-siipeen",
    description : "Reitti (Metsätalon) A-siipeen: videon yleiskielistetty litteraatti",
    id : "metsatalo",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	lemma : attrs.baseform_ftb2,
        pos : attrs.pos_ftb2,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	spoken : attrs.spoken,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	sentence_id : sattrs.sentence_id_hidden
    }
};


settings.corpora.kotus_klassikot = {
    title : "Suomen kielen klassikoita -korpus",
    description : "Suomen kielen klassikoita",
    id : "kotus_klassikot",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	collection_id : {
	    label : "collection_id",
	    displayType : "hidden"
	},
	collection_title : {
	    label : "collection_title"
	},
	story_id : {
	    label : "story_id",
	    displayType : "hidden"
	},
	story_title : {
	    label : "story_title"
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_type : {
	    label : "sentence_type",
	    displayType : "select",
	    translationKey : "sentencetype_",
	    dataset : {
		"p" : "p",
		"head" : "head"
	    },
	    opts : settings.liteOptions
	}
    }
};

settings.corpora.ns_presidentti = {
    title : "Tasavallan presidenttien uudenvuodenpuheita",
    description : "Tasavallan presidenttien uudenvuodenpuheita (1935–2006)",
    id : "ns_presidentti",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	lemma : attrs.baseform,
	lemmacomp : attrs.baseform_compound,
        pos : attrs.pos_kotus,
	msd : attrs.msd,
	id : attrs.id_hidden,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	paragraph_id : sattrs.paragraph_id,
	paragraph_type : {
	    label : "paragraph_type",
	    displayType : "select",
	    translationKey : "paragraphtype_",
	    dataset : {
		"p" : "p",
		"head" : "head",
		"opener" : "opener",
	    },
	    opts : settings.liteOptions
	},
	paragraph_topic : {
	    label : "paragraph_topic"
	},
	sentence_id : sattrs.sentence_id_hidden
    }
};

settings.corpora.ns_saadokset = {
    title : "Lakeja ja direktiivejä",
    description : "Lakeja ja direktiivejä vuosilta 2002–2003",
    id : "ns_saadokset",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	lemma : attrs.baseform,
	lemmacomp : attrs.baseform_compound,
        pos : attrs.pos_kotus,
	msd : attrs.msd,
	id : attrs.id_hidden,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	div_id : {
	    label : "div_id",
	    displayType : "hidden",
	},
	div_type : {
	    label : "div_type",
	    displayType : "select",
	    translationKey : "divtype_",
	    dataset : {
		"section" : "section",
		"section/law" : "section_law",
		"section/end" : "section_end"
	    },
	    opts : settings.liteOptions
	},
	paragraph_id : sattrs.paragraph_id,
	paragraph_type : {
	    label : "paragraph_type",
	    displayType : "select",
	    translationKey : "paragraphtype_",
	    dataset : {
		"p" : "p",
		"head" : "head",
		"opener" : "opener",
		"closer" : "closer"
	    },
	    opts : settings.liteOptions
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_type : {
	    label : "sentence_type",
	    displayType : "select",
	    translationKey : "sentencetype_",
	    dataset : {
		"p" : "p",
		"head" : "head",
		"dateline" : "dateline",
		"signed" : "signed"
	    },
	    opts : settings.liteOptions
	}
    }
};

settings.corpora.kotus_sananparret = {
    title : "Sananparsikokoelma",
    description : "Suomen murteiden Sananparsikokoelma (1930-luvulta)",
    id : "kotus_sananparret",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	entry_location : {
	    label : "entry_location"
	},
	entry_collector : {
	    label : "entry_collector"
	},
	entry_date : {
	    label : "entry_date"
	},
	entry_standard : {
	    label : "entry_standard"
	},
	entry_dialect : {
	    label : "entry_dialect"
	},
	entry_usage : {
	    label : "entry_usage"
	},
	sentence_type : {
	    label : "sentence_type",
	    displayType : "select",
	    translationKey : "sayings_sentencetype_",
	    dataset : {
		"standard" : "standard",
		"dialect" : "dialect",
		"usage" : "usage"
	    },
	    opts : settings.liteOptions
	}
    }
};


attrs.pos_la = {
    label : "pos",
    displayType : "select",
    translationKey : "posla_",
    dataset : {
	"a" : "a",
	"a:pron" : "a:pron",
	"a:pron:dem" : "a:pron:dem",
	"a:pron:int" : "a:pron:int",
	"a:pron:rel" : "a:pron:rel",
	"a:q" : "a:q",
	"adv" : "adv",
	"adv:pron" : "adv:pron",
	"adv:pron:dem" : "adv:pron:dem",
	"adv:pron:int" : "adv:pron:int",
	"adv:pron:rel" : "adv:pron:rel",
	"adv:q" : "adv:q",
	"cnj:coord" : "cnj:coord",
	"cnj:rel" : "cnj:rel",
	"cnj:sub" : "cnj:sub",
	"muu" : "muu",
	"n" : "n",
	"neg" : "neg",
	"n:prop" : "n:prop",
	"n:prop:pname" : "n:prop:pname",
	"num:card" : "num:card",
	"num:murto" : "num:murto",
	"num:ord" : "num:ord",
	"num:ord_pron" : "num:ord_pron",
	"p:post" : "p:post",
	"p:pre" : "p:pre",
	"pron" : "pron",
	"pron:dem" : "pron:dem",
	"pron:int" : "pron:int",
	"pron:pers" : "pron:pers",
	"pron:pers12" : "pron:pers12",
	"pron:ref" : "pron:ref",
	"pron:rel" : "pron:rel",
	"punct" : "punct",
	"q" : "q",
	"stem" : "stem",
	"v" : "v",
    },
    opts : settings.liteOptions
};
attrs.func_la = {
    label : "func",
    displayType : "select",
    translationKey : "funcla_",
    dataset : {
	"advl" : "advl",
	"advl:p" : "advl:p",
	"advl:v" : "advl:v",
	"advmod" : "advmod",
	"amod" : "amod",
	"analysoimaton" : "analysoimaton",
	"compl:o" : "compl:o",
	"compl:q" : "compl:q",
	"compl:s" : "compl:s",
	"compl:x" : "compl:x",
	"infobj" : "infobj",
	"infsubj" : "infsubj",
	"irrall" : "irrall",
	"jälkiosa" : "jälkiosa",
	"lauseyhd" : "lauseyhd",
	"lkeyhd" : "lkeyhd",
	"sanayhd_lkeyhd" : "sanayhd_lkeyhd",
	"muu" : "muu",
	"neg:prt" : "neg:prt",
	"nmod" : "nmod",
	"npobj" : "npobj",
	"npsubj" : "npsubj",
	"nummod" : "nummod",
	"osma" : "osma",
	"pmod" : "pmod",
	"pred" : "pred",
	"pred2" : "pred2",
	"pred3" : "pred3",
	"pred:ref" : "pred:ref",
	"pred:toisto" : "pred:toisto",
	"subj:nonfin" : "subj:nonfin",
	"subj:stat" : "subj:stat",
    },
    opts : settings.liteOptions
};

settings.corpora.la_murre = {
    title : "Murrekorpus",
    description : "Lauseopin arkiston murrekorpus",
    id : "la_murre",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	cleanword : {
	    label : "cleanword",
	    opts : settings.defaultOptions
	},
	lemma : attrs.baseform,
        pos : attrs.pos_la,
	msd : attrs.msd,
	func : attrs.func_la,
	cow : {
	    label : "cowla",
	    displayType : "select",
	    translationKey : "cowla_",
	    dataset : {
		"cw" : "cw",
		"cw1" : "cw1",
		"cw2" : "cw2",
		"" : "noncw",
	    },
	    opts : settings.liteOptions
	},
	note : {
	    label : "note",
	    opts : settings.defaultOptions
	},
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	text_header : {
	    label : "text_header"
	},
	text_info : {
	    label : "text_info"
	},
	paragraph_type : {
	    label : "paragraph_type",
	    displayType : "select",
	    translationKey : "paragraphtype_",
	    dataset : {
		"interviewee" : "interviewee",
		"interviewer" : "interviewer",
		"noninterviewee" : "noninterviewee",
	    },
	    opts : settings.liteOptions
	},
	paragraph_id : {
	    label : "paragraph_id",
	    opts : settings.liteOptions
	},
	// paragraph_n : {
	//     label : "paragraph_n",
	//     opts : settings.liteOptions
	// },
	sentence_source : {
	    label : "sentence_source"
	},
	sentence_clnum : {
	    label : "sentence_clnum",
	    opts : settings.liteOptions
	},
	// sentence_sp : {
	//     label : "sentence_sp"
	// },
	sentence_num : {
	    label : "sentence_num",
	    opts : settings.liteOptions
	},
	sentence_wnum : {
	    label : "sentence_wnum",
	    opts : settings.liteOptions
	},
	sentence_id : sattrs.sentence_id_hidden,
	// {
	//     label : "sentence_id",
	//     opts : settings.liteOptions
	// },
	// clause_sinum : {
	//     label : "clause_sinum"
	// },
	clause_clnum : {
	    label : "clause_clnum",
	    opts : settings.liteOptions
	},
	clause_num : {
	    label : "clause_num",
	    opts : settings.liteOptions
	},
	clause_hier : {
	    label : "clause_hier",
	    displayType : "select",
	    translationKey : "clausehier_",
	    dataset : {
		"irrall" : "irrall",
		"main" : "main",
		"sub1" : "sub1",
		"sub2" : "sub2",
		"sub3" : "sub3",
		"sub4" : "sub4",
		"sub5" : "sub5",
		"muu" : "muu",
	    },
	    opts : settings.liteOptions
	},
	// clause_snum : {
	//     label : "clause_snum"
	// },
	clause_type : {
	    label : "clause_type",
	    displayType : "select",
	    translationKey : "clausetype_",
	    dataset : {
		"affdecl" : "affdecl",
		"negdecl" : "negdecl",
		"affint" : "affint",
		"negint" : "negint",
		"affopt" : "affopt",
		"negopt" : "negopt",
		"muu" : "muu",
	    },
	    opts : settings.liteOptions
	},
	// sentence_sinum : {
	//     label : "sentence_sinum",
	//     opts : settings.liteOptions
	// },
	clause_hallnum : {
	    label : "clause_hallnum",
	    opts : settings.liteOptions
	},
	clause_ora : {
	    label : "clause_ora",
	    displayType : "select",
	    translationKey : "clauseora_",
	    dataset : {
		"dir" : "dir",
		"" : "indir"
	    },
	    opts : settings.liteOptions
	}
    }
};


/*
 * MISC
 */

settings.cgi_script = "http://nyklait-09-01.hum.helsinki.fi/cgi-bin/korp/korp.cgi";
settings.lemgrams_cgi_script = "http://nyklait-09-01.hum.helsinki.fi/cgi-bin/korp/korp_lemgrams.cgi";

// label values here represent translation keys.
settings.arg_groups = {
	"word" : {
		word : {label : "word"}
	}
};


settings.reduce_stringify = function(type) {
	function filterCorpora(rowObj) {
		return $.grepObj(rowObj, function(value, key) {
			return key != "total_value" && $.isPlainObject(value);
		});
	}
	
	function getCorpora(dataContext) {
		var corpora = $.grepObj(filterCorpora(dataContext), function(value, key) {
			return value.relative != null;
		});
		corpora = $.map($.keys(corpora), function(item) {
			return item.split("_")[0].toLowerCase();
		});
		return corpora;
	}
	
	function appendDiagram(output, corpora, value) {
		if(corpora.length > 1)
			return output + $.format('<img id="circlediagrambutton__%s" src="img/stats2.png" class="arcDiagramPicture"/>', value);
		else
			return output;
	}
	var output = "";
	switch(type) {
	case "word":
	case "lemma":
	case "lemmacomp":
		return function(row, cell, value, columnDef, dataContext) {
			var corpora = getCorpora(dataContext);
			if(value == "&Sigma;") return appendDiagram(value, corpora, value);
			
			var query = $.map(dataContext.hit_value.split(" "), function(item) {
			    return "[" + type + "=" + '"' + item + '"]';
			}).join(" ");
			
			output = $("<span>", 
					{
					"class" : "link", 
					"data-query" : encodeURIComponent(query), 
					"data-corpora" : $.toJSON(corpora)
					}).text(value).outerHTML();
			return appendDiagram(output, corpora, value);
			 
		}; 
		
	case "pos":
		return function(row, cell, value, columnDef, dataContext) {
			var corpora = getCorpora(dataContext);
			if(value == "&Sigma;") return appendDiagram(value, corpora, value);
			var query = $.map(dataContext.hit_value.split(" "), function(item) {
				return $.format('[pos="%s"]', item);
			}).join(" ");
			output =  $.format("<span class='link' data-query='%s' data-corpora='%s' rel='localize[%s]'>%s</span> ", 
					[query, $.toJSON(corpora), value, util.getLocaleString("pos_" + value)]);
			return appendDiagram(output, corpora, value);
		};
	case "lex":
		return function(row, cell, value, columnDef, dataContext) {
		var corpora = getCorpora(dataContext);
		if(value == "&Sigma;") return appendDiagram(value, corpora, value);
		output = _.chain(value.split("|"))
				.filter(Boolean)
				.map(function(item) {
					return util.lemgramToString(item, true);
				})
				.value().join(", ");
		return appendDiagram(output, corpora, value);
		};
	case "prefix":
	case "suffix":
	case "saldo":
		return function(row, cell, value, columnDef, dataContext) {
		var corpora = getCorpora(dataContext);
		if(value == "&Sigma;") return appendDiagram(value, corpora, value);
		output = _.chain(value.split("|"))
				.filter(Boolean)
				.map(function(item) {
					return util.saldoToString(item, true);
				})
				.value().join(", ");
		return appendDiagram(output, corpora, value);
		};
	case "deprel":
		return function(row, cell, value, columnDef, dataContext) {
			var corpora = getCorpora(dataContext);
			if(value == "&Sigma;") return appendDiagram(value, corpora, value);
			var query = $.map(dataContext.hit_value.split(" "), function(item) {
				return $.format('[deprel="%s"]', item);
			}).join(" ");
			var output = $.format("<span class='link' data-query='%s' data-corpora='%s' rel='localize[%s]'>%s</span> ", 
					[query, $.toJSON(corpora),"deprel_" + value, util.getLocaleString("deprel_" + value)]);
			return appendDiagram(output, corpora, value);
			
		};
	default:
		return function(row, cell, value, columnDef, dataContext) {
			var corpora = getCorpora(dataContext);
			if(value == "&Sigma;") return appendDiagram(output, corpora, value);
			return appendDiagram(output, corpora, value);;
		};
	}
	
	return output;
};


delete attrs;
delete sattrs;
delete context;
delete ref;


var CorpusListing = new Class({
	initialize : function(corpora) {
		this.struct = corpora;
		this.corpora = _.values(corpora);
		this.selected = [];
	},
	
	get : function(key) {
		return this.struct[key];
	},
	
	list : function() {
		return this.corpora;
	},
	
	map : function(func) {
		return _.map(this.corpora, func);
	},
	
	
	/* Returns an array of all the selected corpora's IDs in uppercase */
	getSelectedCorpora : function() {
		return corpusChooserInstance.corpusChooser("selectedItems");
	},
	
	select : function(idArray) {
		this.selected = _.values(_.pick.apply(this, [this.struct].concat(idArray))); 
	},

	mapSelectedCorpora : function(f) {
		return _.map(this.selected, f);
	},
	// takes an array of mapping objs and returns their intersection
	_mapping_intersection : function(mappingArray) {
		return _.reduce(mappingArray, function(a,b) {
			var output = {};
			$.each(b, function(key, value) {
				if(b[key] != null)
					output[key] = value;
			});
			return output;
		}, {});
	},

	_mapping_union : function(mappingArray) {
		return _.reduce(mappingArray, function(a, b) {
			return $.extend({}, a, b);
		}, {});
	},

	getCurrentAttributes : function() {
		var attrs = this.mapSelectedCorpora(function(corpus) {
			return corpus.attributes;
		});
		
		return this._invalidateAttrs(attrs);
		
	},
	getStructAttrs : function() {
		var attrs = this.mapSelectedCorpora(function(corpus) {
			$.each(corpus.struct_attributes, function(key, value) {
				value["isStructAttr"] = true; 
			});
			return corpus.struct_attributes;
		});
		var rest = this._invalidateAttrs(attrs);
		
		// fix for combining dataset values
		var withDataset = _.filter(_.pairs(rest), function(item) {
			return item[1].dataset;
		});
		
		$.each(withDataset, function(i, item) {
			var key = item[0];
			var val = item[1];
			$.each(attrs, function(j, origStruct) {
				
				if(origStruct[key] && origStruct[key].dataset) {
					var ds = origStruct[key].dataset;
					if($.isArray(ds))
						ds = _.object(ds, ds);
					$.extend(val.dataset, ds);
				}
			});
		});
		return $.extend(rest, _.object(withDataset));
	},

	_invalidateAttrs : function(attrs) {
		var union = this._mapping_union(attrs);
		var intersection = this._mapping_intersection(attrs);
		$.each(union, function(key, value) {
			if(intersection[key] == null) {
				value["disabled"] = true;
			} else {
				delete value["disabled"];
			}
		});
		return union;
	},
	
	corpusHasAttr : function(corpus, attr) {
		return attr in $.extend({}, this.struct[corpus].attributes, this.struct[corpus].struct_attributes);
	},
	
	stringifySelected : function() {
		return _.chain(this.selected)
		.pluck("id")
		.invoke("toUpperCase")
		.value().join(",");
	},
	
	getAttrIntersection : function(attr) {
		
		var struct = _.map(this.selected, function(corpus) {
			return _.keys(corpus[attr]);
		});
		return _.intersection.apply(null, struct);
	},
	
	getAttrUnion : function(attr) {
		var struct = _.map(this.selected, function(corpus) {
			return _.keys(corpus[attr]);
		}); 
		return _.union.apply(null, struct);
	},
	
	getContextQueryString : function() {
		return $.grep($.map(_.pluck(settings.corpusListing.selected, "id"), function(id) {
			if("1 paragraph" in settings.corpora[id].context)
				return id.toUpperCase() + ":1 paragraph";
		}), Boolean).join();
	},
	getWithinQueryString : function() {
		return $.grep($.map(_.pluck(settings.corpusListing.selected, "id"), function(id) {
			if("paragraph" in settings.corpora[id].within)
				return id.toUpperCase() + ":paragraph";
		}), Boolean).join();
	}
	
});




var ParallelCorpusListing = new Class({
	Extends : CorpusListing,
	initialize : function(corpora) {
		var self = this;
		this.parallel_corpora = corpora;
		this.corpora = [];
		this.struct = {};
		$.each(corpora, function(__, struct) {
			$.each(struct, function(key, corp) {
				if(key == "default") return;
				self.corpora.push(corp);
				self.struct[corp.id] = corp;
			});
		});
		
	},
	
	select : function(idArray) {
		var self = this;
		this.selected = [];
		$.each(idArray, function(i, id) {
			var corp = self.struct[id];
			self.selected = self.selected.concat(self.getLinked(corp, true));
		});
	},
	
	getCurrentAttributes : function(lang) {
		var corpora = _.filter(this.selected, function(item) {
			return item.lang == lang;
		});
		var struct = _.reduce(corpora, function(a, b) {
			return $.extend({}, a.attributes, b.attributes);
		},{});
		return struct;
	},
	
	getStructAttrs : function(lang) {
		var corpora = _.filter(this.selected, function(item) {
			return item.lang == lang;
		});
		var struct = _.reduce(corpora, function(a, b) {
			return $.extend({}, a.struct_attributes, b.struct_attributes);
		},{});
		$.each(struct, function(key, val) {
			val["isStructAttr"] = true;
		});
		return struct;
	},
	
	
	getLinked : function(corp, andSelf) {
		andSelf = andSelf || false;
		var output = _.filter(this.corpora, function(item) {
			return item.parent == corp.parent && item !== corp;
		});
		if(andSelf)
			output.push(corp);
		return output;
	}

});



settings.corpusListing = new CorpusListing(settings.corpora);
