/* lemma => grundform, base form
 * lexem => lemgram, lemgram
 * 
 */
var settings = {};
//var language = $.localize.data.locale;

settings.lemgramSelect = true;
settings.autocomplete = true;

settings.primaryColor = "rgb(221, 233, 255)";
settings.primaryLight = "rgb(242, 247, 255)";
settings.corpora = {};
settings.defaultContext = {
	"1 sentence" : "1 sentence"
};
settings.defaultWithin = {
	"sentence" : "sentence"	
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
	"ends_with" : "ends_with",
	"matches" : "matches"
};
settings.liteOptions = $.exclude(settings.defaultOptions, ["starts_with", "ends_with", "matches"]);

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
	"V" : "V",
    },
    opts : settings.liteOptions
};
attrs.msd = {
	label : "msd",
	opts : settings.defaultOptions
};
attrs.baseform = {
    label : "baseform",
    type : "set",
    displayType : "autocomplete",
    opts : settings.liteOptions
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
sattrs.vks_sentence_code = {
    label : "vks_sentence_code"
};
sattrs.vks_sentence_page = {
    label : "vks_sentence_page"
};
sattrs.para_id = {
    label : "para_id"
};
sattrs.para_type = {
    label : "para_type"
};


var within = {
	"defaultStruct" : {
		"sentence" : "sentence"
	}
};

var context = {
	"defaultAligned" : {
		"1 link" : "1 link"
	}
};

/*
 * FOLDERS
 */
 
settings.corporafolders = {};

settings.corporafolders.sv = {
    title : "Svenska texter",
    contents : ["testcorpus"]
};

settings.corporafolders.fi = {
    title : "Suomenkielisiä tekstejä",
    contents : ["metsatalo"]
};

settings.corporafolders.ftb = {
    title : "FinnTreeBank: suomen puupankki",
    contents : ["ftb2", "ftb3"]
};

settings.corporafolders.kotus = {
    title : "Kotuksen korpukset",
    contents : ["kotus_klassikot", "kotus_sananparret"]
};

settings.corporafolders.kotus.vks = {
    title : "Vanhan kirjasuomen korpus",
    contents : ["vks_biblia", "vks_lait", "vks_saarnat"]
};

settings.corporafolders.kotus.vns = {
    title : "Varhaisnykysuomen korpus",
    contents : ["vns_asetus", "vns_renqvist", "vns_renvall"]
};

settings.corporafolders.kotus.ns = {
    title : "Nykysuomen aineistoja",
    contents : ["ns_presidentti", "ns_saadokset"]
};



/*
 * CORPORA
 */

settings.corpora.testcorpus = {
    title : "The Korp Test Corpus",
    description : "A test corpus for testing Korp.",
    languages : {
        TESTCORPUS : "svenska"
    },
    within : {"sentence" : "sentence"},
    attributes : {
        pos : attrs.pos
    },
    struct_attributes : {
    }
};

settings.corpora.ftb2 = {
    title : "FinnTreeBank 2",
    description : "Finnish tree bank, version 2",
    languages : {
        FTB2 : "suomi"
    },
    within : {"sentence" : "sentence"},
    attributes : {
	lemma : attrs.baseform_ftb2,
        pos : attrs.pos_ftb2,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	lemgram : attrs.lemgram_hidden
    },
    struct_attributes : {
	subcorpus_name : {
	    label : "subcorpus_name",
	    displayType : "select",
	    translationKey : "subcorp_",
	    dataset : {
		"news-samples" : "news-samples",
		"sofie12" : "sofie12",
		"visk-sent" : "visk-sent",
		"wikipedia-samples" : "wikipedia-samples"
	    },
            opts : settings.liteOptions
	},
	sentence_id : sattrs.sentence_id_hidden
    }
};

settings.corpora.ftb3 = {
    title : "FinnTreeBank 3",
    description : "Finnish tree bank, version 3: EuroParl, JRC Acquis",
    languages : {
        FTB3 : "suomi"
    },
    within : {"sentence" : "sentence"},
    attributes : {
	lemma : attrs.baseform_ftb2,
	lemmacomp : attrs.baseform_compound,
        pos : attrs.pos_ftb3,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	lemgram : attrs.lemgram_hidden
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

settings.corpora.metsatalo = {
    title : "Reitti A-siipeen",
    description : "Reitti (Metsätalon) A-siipeen: videon yleiskielistetty litteraatti",
    languages : {
        FTB2 : "suomi"
    },
    within : {"sentence" : "sentence"},
    attributes : {
	lemma : attrs.baseform_ftb2,
        pos : attrs.pos_ftb2,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	spoken : attrs.spoken,
	lemgram : attrs.lemgram_hidden
    },
    struct_attributes : {
	sentence_id : sattrs.sentence_id_hidden
    }
};


settings.corpora.vks_biblia = {
    title : "Biblia",
    description : "Vuoden 1642 raamatunsuomennos",
    languages : {
        VKS_BIBLIA : "suomi"
    },
    within : {"sentence" : "sentence"},
    attributes : {},
    struct_attributes : {
	work_code : {
	    label : "vks_work_code",
	    displayType : "hidden",
	},
	book_code : {
	    label : "vksbib_book_code",
	    displayType : "select",
	    translationKey : "vksbibbook_",
	    dataset : {
		"VT4" : "VT4",
		"Jes" : "Jes",
		"Jer" : "Jer",
		"Vlt" : "Vlt",
		"Hes" : "Hes",
		"Dan" : "Dan",
		"Hos" : "Hos",
		"Joel" : "Joel",
		"Am" : "Am",
		"Ob" : "Ob",
		"Jon" : "Jon",
		"Mik" : "Mik",
		"Nah" : "Nah",
		"Hab" : "Hab",
		"Sef" : "Sef",
		"Hgg" : "Hgg",
		"Sak" : "Sak",
		"Mal" : "Mal",
	    },
	    opts : settings.liteOptions
	},
	chapter_code : {
	    label : "vksbib_chapter_code"
	},
	verse_code : {
	    label : "vksbib_verse_code"
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_code : sattrs.vks_sentence_code,
	sentence_page : sattrs.vks_sentence_page
    }
};

settings.corpora.vks_lait = {
    title : "Laki- ja asetustekstejä",
    description : "Laki- ja asetustekstejä",
    languages : {
        VKS_LAIT : "suomi"
    },
    within : {"sentence" : "sentence"},
    attributes : {
	word_orig : attrs.origword,
	word_completed : attrs.complword
    },
    struct_attributes : {
	law_code : {
	    label : "vkslait_law_code",
	    displayType : "select",
	    translationKey : "vkslaitlaw_",
	    dataset : {
		"As1584" : "As1584",
		"As1593" : "As1593"
	    },
	    opts : settings.liteOptions
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_code : sattrs.vks_sentence_code,
	sentence_page : sattrs.vks_sentence_page
    }
};

settings.corpora.vks_saarnat = {
    title : "Ruumissaarnoja, puheita ja muistorunoja",
    description : "Ruumissaarnoja, puheita ja muistorunoja",
    languages : {
        VKS_SAARNAT : "suomi"
    },
    within : {"sentence" : "sentence"},
    attributes : {
	word_orig : attrs.origword,
	word_completed : attrs.complword
    },
    struct_attributes : {
	source_code : {
	    label : "vkssaarnat_source_code",
	    displayType : "select",
	    translationKey : "vkssaarnatsource_",
	    dataset : {
		"Swahn1706" : "Swahn1706",
		"Wall1706" : "Wall1706",
		"Sten1750" : "Sten1750",
		"Rein1750" : "Rein1750",
		"Sten1771" : "Sten1771",
		"Varia1756a" : "Varia1756a",
		"Paz1764" : "Paz1764",
		"Elgf1768" : "Elgf1768",
		"Laih1768" : "Laih1768",
		"GLyra1772" : "GLyra1772",
		"Sax1776" : "Sax1776",
		"Äjm1779" : "Äjm1779",
		"Widen1780" : "Widen1780",
		"Popp1781" : "Popp1781"
	    },
	    opts : settings.liteOptions
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_code : sattrs.vks_sentence_code,
	sentence_page : sattrs.vks_sentence_page
    }
};


settings.corpora.vns_asetus = {
    title : "Asetuksia",
    description : "Asetuksia",
    languages : {
        VNS_ASETUS : "suomi"
    },
    within : {"sentence" : "sentence"},
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	article_id : {
	    label : "article_id"
	},
	paragraph_id : {
	    label : "paragraph_id"
	},
	sentence_type : {
	    label : "sentence_type",
	    displayType : "select",
	    translationKey : "sentencetype_",
	    dataset : {
		"p" : "p",
		"head" : "head",
		"opening" : "opening"
	    },
	    opts : settings.liteOptions
	},
	sentence_id : sattrs.sentence_id_hidden,
	hi_rend : {
	    label : "hi_rend",
	    displayType : "select",
	    translationKey : "hirend_",
	    dataset : {
		"bold" : "bold"
	    },
	    opts : settings.liteOptions
	}
    }
};

settings.corpora.vns_renqvist = {
    title : "Renqvist",
    description : "Renqvist",
    languages : {
        VNS_RENQVIST : "suomi"
    },
    within : {"sentence" : "sentence"},
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	para_id : sattrs.para_id,
	para_type : sattrs.para_type,
	sentence_id : sattrs.sentence_id_hidden,
	sentence_n : sattrs.sentence_n
    }
};

settings.corpora.vns_renqvist = {
    title : "Renqvist",
    description : "Renqvist",
    languages : {
        VNS_RENQVIST : "suomi"
    },
    within : {"sentence" : "sentence"},
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	para_id : sattrs.para_id,
	para_type : sattrs.para_type,
	sentence_id : sattrs.sentence_id_hidden,
	sentence_n : sattrs.sentence_n
    }
};

settings.corpora.vns_renvall = {
    title : "Renvall",
    description : "Gustaf Renvall: Suomalainen sana-kirja (1826)",
    languages : {
        VNS_RENVALL : "suomi"
    },
    within : {"sentence" : "sentence"},
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
/*	sentence_form : {
	    label : "dict_form"
	},
	sentence_example : {
	    label : "dict_example"
	},
	sentence_pos : {
	    label : "pos"
	},
	sentence_xref : {
	    label : "dict_xref"
	},
	sentence_etym : {
	    label : "dict_etym"
	},
	sentence_etymlang : {
	    label : "dict_etymlang",
	    displayType : "select",
	    translationKey : "dictetymlang_",
	    dataset : {
		"ru" : "ru",
		"ve" : "ve"
	    },
	    opts : settings.liteOptions
	},  */
	item_itemtype : {
	    label : "dict_itemtype",
	    displayType : "select",
	    translationKey : "dictitemtype_",
	    dataset : {
		"orth" : "orth",
		"pos" : "pos",
		"eg" : "eg",
		"xr" : "xr",
		"etym" : "etym",
		"note" : "note"
	    },
	    opts : settings.liteOptions
	},
	item_type : {
	    label : "dict_item_type"
	},
	item_lang : {
	    label : "dict_etymlang",
	    displayType : "select",
	    translationKey : "dictetymlang_",
	    dataset : {
		"ru" : "ru",
		"ve" : "ve"
	    },
	    opts : settings.liteOptions
	},
    }
};

settings.corpora.kotus_klassikot = {
    title : "Suomen kielen klassikoita -korpus",
    description : "Suomen kielen klassikoita",
    languages : {
        KOTUS_KLASSIKOT : "suomi"
    },
    within : {"sentence" : "sentence"},
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
	story_id : {
	    label : "story_id",
	    displayType : "hidden"
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
    languages : {
        NS_PRESIDENTTI : "suomi"
    },
    within : {"sentence" : "sentence"},
    attributes : {
	lemma : attrs.baseform,
	lemmacomp : attrs.baseform_compound,
        pos : attrs.pos_kotus,
	msd : attrs.msd,
	id : attrs.id_hidden,
	lemgram : attrs.lemgram_hidden
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	para_id : sattrs.para_id,
	para_type : {
	    label : "para_type",
	    displayType : "select",
	    translationKey : "paratype_",
	    dataset : {
		"p" : "p",
		"head" : "head",
		"opener" : "opener",
	    },
	    opts : settings.liteOptions
	},
	para_topic : {
	    label : "para_topic"
	},
	sentence_id : sattrs.sentence_id_hidden
    }
};

settings.corpora.ns_saadokset = {
    title : "Lakeja ja direktiivejä",
    description : "Lakeja ja direktiivejä vuosilta 2002–2003",
    languages : {
        NS_SAADOKSET : "suomi"
    },
    within : {"sentence" : "sentence"},
    attributes : {
	lemma : attrs.baseform,
	lemmacomp : attrs.baseform_compound,
        pos : attrs.pos_kotus,
	msd : attrs.msd,
	id : attrs.id_hidden,
	lemgram : attrs.lemgram_hidden
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
	para_id : sattrs.para_id,
	para_type : {
	    label : "para_type",
	    displayType : "select",
	    translationKey : "paratype_",
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
    languages : {
        KOTUS_SANANPARRET : "suomi"
    },
    within : {"sentence" : "sentence"},
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


/*
 * MISC
 */

settings.cgi_script = "http://nyklait-09-01.hum.helsinki.fi/cgi-bin/korp/korp.cgi";
settings.lemgrams_cgi_script = "http://nyklait-09-01.hum.helsinki.fi/cgi-bin/korp/korp_lemgrams.cgi";

// label values here represent translation keys.
settings.arg_groups = {
	"word" : {
		word : {label : "word"},
		anyword : {label : "any", opts : {}}
	}
};


settings.inner_args = {
	anyword : function(s) {
		return "";
	}
};

delete attrs;
delete sattrs;
delete within;
delete context;
delete ref;
