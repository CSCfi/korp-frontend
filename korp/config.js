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
	"_" : "_"
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

sattrs.date = {
	label : "date",
	displayType : "date"
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
    contents : ["ftb2", "metsatalo"]
};

settings.corporafolders.kotus = {
    title : "Kotuksen korpukset",
    contents : ["vks"]
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
            opts : {
		"is" : "is",
		"is_not" : "is_not"
            }
	},
	sentence_id : {
	    label : "sentence_id",
	    displayType : "hidden"
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
	sentence_id : {
	    label : "sentence_id",
	    displayType : "hidden"
	}
    }
};


settings.corpora.vks = {
    title : "Vanha kirjasuomi",
    description : "Vanhan kirjasuomen korpus",
    languages : {
        VKS : "suomi"
    },
    within : {"sentence" : "sentence"},
    attributes : {},
    struct_attributes : {
	work_code : {
	    label : "vks_work_code",
	    displayType : "select",
	    translationKey : "vkswork_",
	    dataset : {
		"B1" : "B1"
	    },
	},
	book_code : {
	    label : "vks_book_code",
	    displayType : "select",
	    translationKey : "vksbook_",
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
	},
	chapter_code : {
	    label : "vks_chapter_code"
	},
	verse_code : {
	    label : "vks_verse_code"
	},
	sentence_id : {
	    label : "vks_sentence_id",
	    displayType : "hidden"
	},
	sentence_code : {
	    label : "vks_sentence_code"
	},
	sentence_page : {
	    label : "vks_sentence_page"
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
