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
settings.secondaryColor = "";
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
    opts : settings.defaultOptions
};
attrs.msd = {
	label : "msd",
	opts : settings.defaultOptions
};
attrs.baseform = {
    label : "baseform",
    // type : "set",
    // displayType : "autocomplete",
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
    id : "testcorpus",
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
    id : "ftb2",
    within : {"sentence" : "sentence"},
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
    id : "ftb3",
    within : {"sentence" : "sentence"},
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

settings.corpora.metsatalo = {
    title : "Reitti A-siipeen",
    description : "Reitti (Metsätalon) A-siipeen: videon yleiskielistetty litteraatti",
    id : "metsatalo",
    within : {"sentence" : "sentence"},
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


settings.corpora.vks_biblia = {
    title : "Biblia",
    description : "Vuoden 1642 raamatunsuomennos",
    id : "vks_biblia",
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
    id : "vks_lait",
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
    id : "vks_saarnat",
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
    id : "vns_asetus",
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
    id : "vns_renqvist",
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
    id : "vns_renvall",
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
    id : "kotus_klassikot",
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
    within : {"sentence" : "sentence"},
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
    id : "ns_saadokset",
    within : {"sentence" : "sentence"},
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
    id : "kotus_sananparret",
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
		word : {label : "word"}
	}
};


settings.reduce_stringify = function(type) {
	c.log("reduce_stringify", type)
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

	switch(type) {
	case "word":
	case "lemma":
	case "lemmacomp":
		return function(row, cell, value, columnDef, dataContext) {
			
			var corpora = getCorpora(dataContext);
			
			var query = $.map(dataContext.hit_value.split(" "), function(item) {
			    return "[" + type + "=" + '"' + item + '"]';
			}).join(" ");
			
			c.log("config query", query, encodeURIComponent(query),
			      corpora)
			var output = $.format("<span class='link' data-query='%s' data-corpora='%s'>" + value + "</span>", 
					[encodeURIComponent(query), $.toJSON(corpora)]);
			if(corpora.length > 1)
				output += $.format('<img id="circlediagrambutton__%s" src="img/stats2.png" class="arcDiagramPicture"/>', value);
			return output;
		}; 
	case "pos":
		return function(row, cell, value, columnDef, dataContext) {
			if(value == "&Sigma;") return value;
			var corpora = getCorpora(dataContext);
			var query = $.map(dataContext.hit_value.split(" "), function(item) {
				return $.format('[pos="%s"]', item);
			}).join(" ");
			return $.format("<span class='link' data-query='%s' data-corpora='%s' rel='localize[%s]'>%s</span> ", 
					[query, $.toJSON(corpora), value, util.getLocaleString("pos_" + value)]);
		};
	case "lex":
		return function(row, cell, value, columnDef, dataContext) {
		if(value == "&Sigma;") return value;
			return _.chain(value.split("|"))
				.filter(Boolean)
				.map(function(item) {
					return util.lemgramToString(item, true);
				})
				.value().join(", ");
		};
	case "prefix":
	case "suffix":
	case "saldo":
		return function(row, cell, value, columnDef, dataContext) {
		if(value == "&Sigma;") return value;
			return _.chain(value.split("|"))
				.filter(Boolean)
				.map(function(item) {
					return util.saldoToString(item, true);
				})
				.value().join(", ");
		};
	case "deprel":
		return function(row, cell, value, columnDef, dataContext) {
		if(value == "&Sigma;") return value;
		var corpora = getCorpora(dataContext);
		var query = $.map(dataContext.hit_value.split(" "), function(item) {
			return $.format('[deprel="%s"]', item);
		}).join(" ");
		return $.format("<span class='link' data-query='%s' data-corpora='%s' rel='localize[%s]'>%s</span> ", 
				[query, $.toJSON(corpora), value, util.getLocaleString("deprel_" + value)]);
	};
	default:
		return function(row, cell, value, columnDef, dataContext) {
			return value;
		};
	}
	
	
};


delete attrs;
delete sattrs;
delete within;
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
		return $.reduce(mappingArray, function(a,b) {
			var output = {};
			$.each(a, function(key, value) {
				if(b[key] != null)
					output[key] = value;
			});
			return output;
		});
	},

	_mapping_union : function(mappingArray) {
		return $.reduce(mappingArray, function(a, b) {
			return $.extend({}, a, b);
		}) || {};
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
		
		return this._invalidateAttrs(attrs);
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
		c.log("select", idArray)
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

