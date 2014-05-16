/* lemma => grundform, base form
 * lexem => lemgram, lemgram
 *
 */
var settings = {};

var isLab = window.isLab || false;

settings.lemgramSelect = true;
settings.autocomplete = true;
settings.textDateAllowBareYears = true;
settings.downloadFormats = ["csvp", "csv", "excel", "tsv", "text", "vrt"];

settings.downloadFormatParams = {
    "*": {
	structs: "+"
    },
    "csvp": {
	attrs: "+,-lex",
	match_marker: "***"
    },
    "excel": {
	attrs: "+,-lex",
	match_marker: "***"
    },
    "vrt": {
	attrs: "+"
    }
};

settings.wordPictureMaxWords = 30;

// authenticationType: "basic", "shibboleth" or "none"
settings.authenticationType = "basic";
// Login and logout URLs to use with Shibboleth authentication if
// authenticationType == "shibboleth"
// for eduGAIN / CSC Account:
settings.shibbolethLoginUrl = "/shibboleth-ds/index.html";
//settings.shibbolethLoginUrl = "https://haka.funet.fi/shibboleth/WAYF?entityID=https://sp.korp.csc.fi/&return=https%3A%2F%2Fkorp.csc.fi%2FShibboleth.sso%2FLogin%3FSAMLDS%3D1%26target%3Dhttps%253A%252F%252Fkorp.csc.fi%252F%2523display%253Dlogin";
settings.shibbolethLogoutUrl = "https://korp.csc.fi/Shibboleth.sso/Logout?return=https%3A%2F%2Fkorp.csc.fi%2F";

settings.urnResolver = "http://urn.fi/";


settings.modeConfig = [
    {
        localekey: "modern_texts",
        mode: "default"
    },
/*
    {
	localekey: "finnish_national_library_texts",
	mode: "finnish_national_library"
    },
    {
	localekey: "old_finnish_texts",
	mode: "old_finnish"
    },
*/
    {
	localekey: "swedish_texts",
	mode: "swedish"
    },
    {
	localekey: "other_languages_texts",
	mode: "other_languages"
    },
    {
        localekey: "parallel_texts",
        mode: "parallel"
    }
];




var karpLemgramLink = "http://spraakbanken.gu.se/karp/#search=cql%7C(lemgram+%3D+%22<%= val.replace(/:\\d+/, '') %>%22)+sortBy+lemgram";

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
settings.spcWithin = {
    "sentence" : "sentence",
    "paragraph" : "paragraph",
    "clause" : "clause"
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

	if(type == "word" && !value) return function() {return "";};

	if(type == "date_interval") {
		c.log("date_interval", arguments)
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

// settings.liteOptions = $.exclude(settings.defaultOptions, ["starts_with", "contains", "ends_with", "matches"]);
settings.liteOptions = _.omit.apply(null, [settings.defaultOptions, "starts_with", "contains", "ends_with", "matches"]);


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
	// "Interj|INTERJ" : "Interj",
	"Interj" : "Interj",
	// "N|Noun" : "N",
	"N" : "N",
	"Num" : "Num",
	"POST" : "POST",
	"Pron" : "Pron",
	"Pun" : "Pun",
	"V" : "V"
    },
    opts : settings.liteOptions
};
/*
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
*/
attrs.pos_ftb31 = {
    label : "pos",
    displayType : "select",
    translationKey : "posftb3_",
    dataset : {
	"A" : "A",
	"Abbr" : "Abbr",
	"Adp" : "Adp",
	"Adv" : "Adv",
	"AgPrc" : "AgPrc",
	"CC" : "CC",
	"CS" : "CS",
	"Forgn" : "Forgn",
	"Interj" : "Interj",
	"N" : "N",
	"NegPrc" : "NegPrc",
	"Num" : "Num",
	"PrfPrc" : "PrfPrc",
	"Pron" : "Pron",
	"PrsPrc" : "PrsPrc",
	"Punct" : "Punct",
	"TrunCo" : "TrunCo",
	"Unkwn" : "Unkwn",
	"V" : "V"
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
attrs.pos_mulcold_fi = {
    label : "pos",
    displayType : "select",
    translationKey : "posmulcoldfi_",
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
	"PREP" : "Prep",
	"PRON" : "Pron",
	"pun" : "Punct",
	"UNKNOWN" : "UNKNOWN",
	"V" : "V"
    },
    opts : settings.liteOptions
};
attrs.pos_mulcold_ru = {
    label : "pos",
    displayType : "select",
    translationKey : "posmulcoldru_",
    dataset : {
	"Adj" : "Adj",
	"Adv" : "Adv",
	"Conj" : "Conj",
	"Gerund" : "Gerund",
	"Interj" : "Interj",
	"Noun" : "Noun",
	"Numeral" : "Numeral",
	"Part" : "Part",
	"Particle" : "Particle",
	"Predicative" : "Predicative",
	"Preposition" : "Preposition",
	"Pron" : "Pron",
	"pun" : "Punct",
	"UNKNOWN" : "UNKNOWN",
	"Verb" : "Verb"
    },
    opts : settings.liteOptions
};
attrs.pos_mulcold_en = {
    label : "pos",
    displayType : "select",
    translationKey : "posmulcolden_",
    dataset : {
	"A" : "A",
	"ABBR" : "ABBR",
	"ADV" : "ADV",
	"CC" : "CC",
	"CS" : "CS",
	"DET" : "DET",
	"EN" : "EN",
	"Ex" : "EX",
	"INFMARK" : "INFMARK",
	"ING" : "ING",
	"N" : "N",
	"NEG-PART" : "NEG-PART",
	"NUM" : "NUM",
	"PREP" : "PREP",
	"PRON" : "PRON",
	"pun" : "Punct",
	"Rel" : "REL",
	"UNKNOWN" : "UNKNOWN",
	"V" : "V"
    },
    opts : settings.liteOptions
};
attrs.pos_mulcold_sv = {
    label : "pos",
    displayType : "select",
    translationKey : "posmulcoldsv_",
    dataset : {
	"A" : "A",
	"ADV" : "ADV",
	"CC" : "CC",
	"CS" : "CS",
	"DET" : "DET",
	"N" : "N",
	"NUM" : "NUM",
	"PREP" : "PREP",
	"PRON" : "PRON",
	"pun" : "Punct",
	"UNKNOWN" : "UNKNOWN",
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
    // type : "set",
    // displayType : "autocomplete",
    stringify : function(baseform) {
	    return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts : settings.defaultOptions
};
attrs.baseform_ftb2 = {
    label : "baseform",
    // type : "set",
    // displayType : "autocomplete",
    stringify : function(baseform) {
	    return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts : settings.defaultOptions
};
attrs.baseform_compound = {
    label : "baseform_compound",
    // type : "set",
    // displayType : "autocomplete",
    stringify : function(baseform) {
	    return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
    },
    opts : settings.defaultOptions
};
attrs.lemgram = {
    label : "lemgram",
    type : "set",
    displayType : "autocomplete",
    opts : settings.liteOptions,
    stringify : function(lemgram) {
	    return util.lemgramToString(lemgram, true);
    },
    // externalSearch : karpLemgramLink,
    internalSearch : true
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
	opts : settings.liteOptions,
	stringify : function(saldo) {
		return util.saldoToString(saldo, true);
	},
	externalSearch : "http://spraakbanken.gu.se/karp/#search-tab-1&search=cql|(saldo+%3D+<%= val %>)",
	internalSearch : true
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
	// "idiom|idom" : "idiom",
	"idiom" : "idiom",
	"main" : "main",
	"mod" : "mod",
	"modal" : "modal",
	"obj" : "obj",
	"phrm" : "phrm",
	"phrv" : "phrv",
	"scomp" : "scomp",
	"subj" : "subj",
	"voc" : "voc",
	"_" : "_",
    },
    opts : settings.liteOptions
};
attrs.prefix = {
	label : "prefix",
	type : "set",
	displayType : "autocomplete",
	opts : settings.liteOptions,
	stringify : function(lemgram) {
		return util.lemgramToString(lemgram, true);
	},
	externalSearch : karpLemgramLink,
	internalSearch : true
};
attrs.suffix = {
	label : "suffix",
	type : "set",
	displayType : "autocomplete",
	opts : settings.liteOptions,
	stringify : function(lemgram) {
		return util.lemgramToString(lemgram, true);
	},
	externalSearch : karpLemgramLink,
	internalSearch : true
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
attrs.tildeword = {
    label : "word_tilde",
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
attrs.ambiguous_lemma = {
    label : "ambiguous_lemma",
    opts : settings.defaultOptions
};
attrs.ambiguous_pos = {
    label : "ambiguous_pos",
    opts : settings.defaultOptions
};
attrs.ambiguous_msd = {
    label : "ambiguous_msd",
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

sattrs.text_time = {
    label : "text_time"
};

sattrs.paragraph_type = {
    label : "paragraph_type"
};

sattrs.text_genre = {
    label : "text_genre",
    displayType : "select",
    translationKey : "textgenre_",
    dataset : {
	"fiction" : "fiction",
	"law" : "law",
    },
    opts : settings.liteOptions
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

settings.corporafolders.klk_fi = {    
    title : "Kansalliskirjaston lehtikokoelman (KLK) suomenkieliset lehdet"
};

/*
settings.corporafolders.kotus = {
    title : "Kotuksen korpuksia (näytteitä)",
    contents : ["kotus_klassikot", "kotus_sananparret"]
};
*/

/*
settings.corporafolders.kotus.ns = {
    title : "Nykysuomen aineistoja (näytteitä)",
    contents : ["ns_presidentti", "ns_saadokset"]
};
*/

// settings.corporafolders.la = {
//     title : "Lauseopin arkisto",
//     contents : ["la_murre"/*, "las2"*/]
// };

/*
settings.corporafolders.sks = {
    title : "SKS:n aineistoja",
    contents : ["sks_kivi_fi", "skvr"]
};
*/

settings.corporafolders.literature = {
    title : "Kirjallisuutta",
    contents : ["kotus_klassikot", "sks_kivi_fi", "skvr"]
};

settings.corporafolders.legal = {
    title : "Juridisia tekstejä",
    contents : ["ns_saadokset", "legal_fi", "mulcold_fi"]
};

settings.corporafolders.other_texts = {
    title : "Muita tekstejä",
    contents : ["ns_presidentti"]
};

settings.corporafolders.spoken = {
    title : "Puhuttua kieltä (tekstiksi litteroituna)",
    contents : ["la_murre", "kotus_sananparret"],
    unselected : true
};

settings.corporafolders.learner = {
    title : "Suomenoppijoiden kieltä (suomi toisena tai vieraana kielenä)",
    contents : ["las2"],
    unselected : true
};

settings.corporafolders.vks = {
    title : "Vanhan kirjasuomen korpus",
    contents : [
	"vks_agricola",
	"vks_biblia",
	"vks_lait",
	"vks_saarnat",
	"vks_almanakat",
	"vks_bjorkqvist",
	"vks_frosterus",
	"vks_ganander",
	"vks_lizelius",
	"vks_lpetri",
	"vks_varia",
	"vks_virret"
    ],
    unselected : true
};

settings.corporafolders.vns = {
    title : "Varhaisnykysuomen korpus (näytteitä)",
    contents : ["vns_asetus", "vns_renqvist", "vns_renvall"],
    unselected : true
};

settings.corporafolders.test = {
    title : "Demo- ja testiaineistoja",
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
	},
	sentence_url : { 
	    label : "file_url",
	    type : "url"
	}
    }
};
*/

/*
settings.corpora.testcorp_deptree = {
    title : "Dependenssipuutesti",
    description : "Testikorpus Korpin dependenssipuun piirtämisen testaamiseksi",
    id : "testcorp_deptree",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	lemma : attrs.baseform_ftb2,
        pos : attrs.pos_ftb2,
	msd : attrs.msd,
	dephead : attrs.dephead,
	deprel : attrs.deprel_ftb2,
	ref : attrs.ref,
	spoken : attrs.spoken,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	sentence_id : sattrs.sentence_id_hidden
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
	ref : attrs.ref,
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
//    },
//    limited_access : true
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
	ref : attrs.ref,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	text_filename : {
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
	ref : attrs.ref,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	text_filename : {
	    label : "file_name",
	},
	text_title : {
	    label : "file_title",
	},
	text_codetitle : {
	    label : "file_codetitle",
	},
	text_url : {
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
	ref : attrs.ref,
	spoken : attrs.spoken,
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
	sentence_id : sattrs.sentence_id_hidden
    }
};


settings.corpora.kotus_klassikot = {
    title : "Suomalaisen kirjallisuuden klassikoita (näyte)",
    description : "Suomalaisen kirjallisuuden klassikoita (Kotimaisten kielten keskuksen aineisto)",
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
    title : "Tasavallan presidenttien uudenvuodenpuheita (näyte)",
    description : "Tasavallan presidenttien uudenvuodenpuheita (1935–2006) (Kotimaisten kielten keskuksen aineisto)",
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
    title : "Lakeja ja direktiivejä (näyte)",
    description : "Lakeja ja direktiivejä vuosilta 2002–2003 (Kotimaisten kielten keskuksen aineisto)",
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
    title : "Sananparsikokoelma (näyte)",
    description : "Suomen murteiden Sananparsikokoelma (1930-luvulta) (Kotimaisten kielten keskuksen aineisto)",
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
	"cnj" : "cnj",
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
    title : "Lauseopin arkiston murrekorpus",
    description : "Lauseopin arkiston murrekorpus",
    id : "la_murre",
    within : settings.spcWithin,
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

settings.corpora.las2 = {
    title : "LAS2",
    description : "Edistyneiden suomeoppijoiden korpus",
    id : "las2",
    within : settings.spWithin,
    context : settings.spContext,
    limited_access : true,
    licence_type : "RES",
    attributes : {
	lemma : attrs.baseform,
        pos : attrs.pos_la,
        mrp : attrs.msd,
        fun : attrs.func_la,
        com : {
            label : "note",
        },
	lex : attrs.lemgram_hidden
    },
    struct_attributes : {
        text_dateto : {
            label : "text_date",
        },
        text_datefrom : {
            label : "datefrom",
	    displayType : "hidden",
        },
        text_num : {
            label : "exam_num",
        },
        text_inf : {
            label : "text_inf",
        },
        text_tt : {
            label : "text_tt",
        },
        text_te : {
            label : "text_te",
        },
        text_lo : {
            label : "text_lo",
        },
        text_l1 : {
            label : "text_l1",
        }, 
        text_alin_cefr : {
            label : "text_alin_cefr",
        }, 
        text_ylin_cefr : {
            label : "text_ylin_cefr",
        },
        text_tekstin_cefr : {
            label : "text_tekstin_cefr",
        },
	text_inf_url : {
	    label : "text_inf_url",
	    type : "url",
	},
        div_id : {
            displayType : "hidden",
        },
        div_question : {
            label : "div_question",
        },
        paragraph_id : {
            displayType : "hidden",
        },
        paragraph_type : {
            displayType : "hidden",
        },
        sentence_id : sattrs.sentence_id_hidden,
        sentence_type : {
            displayType : "hidden",
        },
	clause_id : {
            displayType : "hidden",
        },
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
        clause_fun : {
            label : "clause_fun",
        },
        clause_com : {
            label : "note",
        }         
    }
};

settings.corpora.sks_kivi_fi = {
    title : "Aleksis Kivi (SKS)",
    description : "Aleksis Kiven painetut teokset, kirjeet ja muu tunnettu tuotanto. Toimittaneet Sakari Katajamäki, Ossi Kokko ja Elina Kela. <a href='http://www.edith.fi/kivikorpus/index.htm'>Infosivu</a>",
    id : "sks_kivi_fi",
    unselected : true,
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
	sketchyword : {
	    label : "sketchyword",
	    opts : settings.defaultOptions,
	},
	clean_note : {
	    label : "clean_note",
	    opts : settings.defaultOptions,
	},
	sketchy_note : {
	    label : "sketchy_note",
	    opts : settings.defaultOptions,
	},
	other_note : {
	    label : "other_note",
	    opts : settings.defaultOptions,
	},
	wtype : {
	    label : "wtype",
	    opts : settings.defaultOptions,
	}
    },
    struct_attributes : {
	text_idno : {
	    label : "kivi_text_idno",
	    opts : settings.defaultOptions,
	},
	text_author : {
	    label : "kivi_text_author",
	    opts : settings.defaultOptions,
	},
	text_title : {
	    label : "kivi_text_title",
	    opts : settings.defaultOptions,
	},
	text_byline : {
	    label : "kivi_text_byline",
	    opts : settings.defaultOptions,
	},
	text_settlement : {
	    label : "kivi_text_settlement",
	    opts : settings.defaultOptions,
	},
	text_repository : {
	    label : "kivi_text_repository",
	    opts : settings.defaultOptions,
	},
	text_publisher : {
	    label : "kivi_text_publisher",
	    opts : settings.defaultOptions,
	},
	text_distributor : {
	    label : "kivi_text_distributor",
	    opts : settings.defaultOptions,
	},
	text_bibl : {
	    label : "kivi_text_bibl",
	    displayType : "hidden",
	},
	text_bibl_type : {
	    label : "kivi_text_bibl_type",
	    displayType : "hidden",
	},
	text_lang : {
	    label : "kivi_text_lang",
	    opts : settings.defaultOptions,
	},
	text_note : {
	      label : "kivi_text_note",
	      opts : settings.defaultOptions,
	},
	text_date : {
              label : "kivi_text_date",
              opts : settings.defaultOptions,
        },
	section_id : {
	    label : "section_id",
	    displayType : "hidden",
	},
	section_type : {
	    label : "section_type",
	    opts : settings.defaultOptions,
	},
	section_subtype : {
	    label : "section_subtype",
	    opts : settings.defaultOptions,
	},
	/*
	section_subtype_n : {
	    label : "section_subtype_n",
	    displayType : "hidden",
	},*/
	paragraph_id : {
	    label : "paragraph_id",
	    displayType : "hidden",
	},
	paragraph_type : {
	    label : "paragraph_type",
	    opts : settings.defaultOptions,
	},
	paragraph_speaker : {
	    label : "paragraph_speaker",
	    opts : settings.defaultOptions,
	},
	sentence_id : sattrs.sentence_id_hidden,
	sentence_type : {
	    label : "sentence_type",
	    opts : settings.defaultOptions,
	}
    }
};

settings.corpora.skvr = {
    title : "SKVR",
    description : "SKS:n Suomen Kansan Vanhat Runot -korpus",
    id : "skvr",
    unselected : true,
    within : settings.spWithin,
    context : settings.spContext,
    attributes : {
        cleanword : {
            label : "cleanword",
            opts : settings.defaultOptions,
        },
        normalized : {
            label : "normalized",
            opts : settings.defaultOptions,
        }
    },
    struct_attributes : {
	text_id : {
            label : "skvr_item_id",
            displayType : "hidden",
        },
        text_osa : {
            label : "skvr_item_osa",
            opts : settings.defaultOptions,
        },
        text_loc : {
            label : "skvr_item_loc",
            opts : settings.defaultOptions,
        },
        text_inf : {
            label : "skvr_item_inf",
            opts : settings.defaultOptions,
        },
        text_tmp : {
            label : "skvr_item_tmp",
            opts : settings.defaultOptions,
        },
        text_col : {
            label : "skvr_item_col",
            opts : settings.defaultOptions,
        },
        text_idn : {
            label : "skvr_item_idn",
            opts : settings.defaultOptions,
        },
        text_nro : {
            label : "skvr_item_nro",
            opts : settings.defaultOptions,
        },
        text_sgn : {
            label : "skvr_item_sgn",
            opts : settings.defaultOptions,
        },
        text_p_code1 : {
            label : "skvr_item_p_code1",
            opts : settings.defaultOptions,
        },
        text_p_code2 : {
            label : "skvr_item_p_code2",
            opts : settings.defaultOptions,
        },
        text_k_code : {
            label : "skvr_item_k_code",
            opts : settings.defaultOptions,
        },
        text_y_code : {
            label : "skvr_item_y_code",
            opts : settings.defaultOptions,
        },
        text_refs : {
            label : "skvr_item_refs",
            opts : settings.defaultOptions,
	},
        text_cpt : {
            label : "skvr_item_cpt",
            opts : settings.defaultOptions,
        },
	paragraph_id : {
            displayType : "hidden",
        },
        sentence_id : sattrs.sentence_id_hidden,
        sentence_type : {
            label : "sentence_type",
            displayType : "select",
            translationKey : "skvr_stype_",
            dataset : {
                'verse':'verse',
                'comment':'comment',
                'editor_commentary':'editor',
                'caption':'caption' 
            },
            opts : settings.LiteOptions,
        },
        sentence_refs : {
            label : "sentence_refs",
            opts : settings.defaultOptions,
        }
    }
};


attrlist = {};
attrlist.mulcold_fi = {
    lemma : attrs.baseform,
    lemmacomp : attrs.baseform_compound,
    pos : attrs.pos_mulcold_fi,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos,
    ambmsd : attrs.ambiguous_msd,
    lex : attrs.lemgram_hidden
};
attrlist.mulcold_ru = {
    lemma : attrs.baseform,
    pos : attrs.pos_mulcold_ru,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos,
    ambmsd : attrs.ambiguous_msd,
    lex : attrs.lemgram_hidden
};
attrlist.mulcold_en = {
    lemma : attrs.baseform,
    pos : attrs.pos_mulcold_en,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos,
    ambmsd : attrs.ambiguous_msd,
    lex : attrs.lemgram_hidden
};
attrlist.mulcold_sv = {
    lemma : attrs.baseform,
    lemmacomp : attrs.baseform_compound,
    pos : attrs.pos_mulcold_sv,
    msd : attrs.msd,
    amblemma : attrs.ambiguous_lemma,
    ambpos : attrs.ambiguous_pos,
    ambmsd : attrs.ambiguous_msd,
    lex : attrs.lemgram_hidden
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

sattrlist.legal = {
    text_code : {
	label : "text_code"
    },
    text_author : {
	label : "text_author"
    },
    text_title : {
	label : "text_title"
    },
    text_typeoftext : {
	label : "text_typeoftext"
    },
    text_genre : sattrs.text_genre,
    text_period : {
	label : "text_period"
    },
    text_publisher : {
	label : "text_publisher"
    },
    sentence_id : sattrs.sentence_id_hidden
};


settings.corpora.legal_fi = {
    id : "legal_fi",
    title : "FiRuLex suomi",
    description : "Juridisia tekstejä (suomi)",
    context : settings.defaultContext, 
    within : settings.defaultWithin, 
    attributes: attrlist.mulcold_fi,
    struct_attributes : sattrlist.legal
};

settings.corpora.mulcold_fi = {
    id : "mulcold_fi",
    title : "MULCOLD suomi",
    description : "Multilingual Corpus of Legal Documents, suomenkielinen osa",
    context : settings.defaultContext, 
    within : settings.defaultWithin, 
    attributes: attrlist.mulcold_fi,
    struct_attributes : sattrlist.mulcold
};


/*
 * Previously in Finnish National Library mode
 */

klk_struct_attrs = {
    text_label : {
        label : "klk_label",
        opts : settings.defaultOptions,
    },
    text_publ_title : {
        label : "klk_publ_title",
        opts : settings.defaultOptions,
    },
    /*
    text_publ_part : {
        label : "klk_publ_part",
        opts : settings.defaultOptions,
    },
    */
    text_publ_id : {
        label : "klk_publ_id",
        opts : settings.defaultOptions,
    },
    text_issue_date : {
        label : "klk_issue_date",
        opts : settings.defaultOptions,
    },
    text_issue_no : {
        label : "klk_issue_no",
        opts : settings.defaultOptions,
    },
    text_issue_title : {
        label : "klk_issue_title",
        opts : settings.defaultOptions,
    },
    /*
    text_part_name : {
        label : "klk_part_name",
        opts : settings.defaultOptions,
    },
    */
    text_elec_date : {
        label : "klk_elec_date",
        opts : settings.defaultOptions,
    },
    text_language : {
        label : "klk_language",
        opts : settings.defaultOptions,
    },
    /*
    text_page_id : {
        label : "klk_page_id",
        opts : settings.defaultOptions,
    },
    */
    text_page_no : {
        label : "klk_page_no",
        opts : settings.defaultOptions,
    },
    text_sentcount : {
        label : "klk_sentcount",
        displayType : "hidden",
    },
    text_tokencount : {
        label : "klk_tokencount",
        displayType : "hidden",
    },
    text_img_url : {
        label : "klk_img_url",
        type : "url",
	displayType : "hidden",
    },
    text_dateto : {
        label : "klk_dateto",
        displayType : "hidden",
    },
    text_datefrom : {
        label : "klk_datefrom",
        displayType : "hidden",
    },
    paragraph_id : {
        label : "paragraph_id",
        displayType : "hidden",
    },
    sentence_id : sattrs.sentence_id_hidden
};

klk_pos_attrs = {
    ocr : {
	label : "OCR",
	opts : settings.defaultOptions,
    }
};


// Namespace for functions used in configuring corpora
settings.fn = {};


// Functions used for constructing settings.corpora and
// settings.corporafolders for corpora split by year


// Construct a list of years from start to end, years in opts.omit
// omitted, descending if opts.descending
settings.fn.make_yearlist = function(start, end, opts)
{
    var omit = [];
    var descending = false;
    var result = [];
    if (typeof opts !== 'undefined') {
	if ('descending' in opts) {
	    descending = opts.descending;
	}
	if ('omit' in opts) {
	    omit = opts.omit;
	}
    }
    for (var year = start; year <= end; year++) {
	if (omit.indexOf(year) == -1) {
	    result.push(year);
	}
    }
    if (descending) {
	result.reverse();
    }
    return result;
}

// Construct corpus settings by year and corpus folder settings by
// decade
settings.fn.make_corpus_settings_by_year_decade = function(
    folder_parent, folder_name_format, corpus_name_format,
    make_folder_settings_fn, make_corpus_settings_fn, yearlist)
{
    var decade = 0;
    var prev_decade = 0;
    var contents = [];

    function make_decade(decade) {
	if (contents) {
	    var folder_name = folder_name_format.replace("{decade}",
							 decade.toString());
	    folder_parent[folder_name] = make_folder_settings_fn(decade);
	    folder_parent[folder_name]["contents"] = contents;
	}
    }

    for (var yearnum = 0; yearnum < yearlist.length; yearnum++) {
	var year = yearlist[yearnum];
	decade = Math.floor(year / 10) * 10;
	if (decade != prev_decade && prev_decade != 0) {
	    make_decade(prev_decade);
	    contents = [];
	}
	var corpus_name = corpus_name_format.replace("{year}",
						      year.toString());
	contents.push(corpus_name);
	settings.corpora[corpus_name] = make_corpus_settings_fn(year,
								corpus_name);
	settings.corpora[corpus_name]["id"] = corpus_name;
	prev_decade = decade;
    }
    make_decade(prev_decade);
};

// Construct settings contents for a single KLK corpus
settings.fn.make_klk_corpus_settings = function(
    title_format, descr_format, year)
{
    var year_str = year.toString();
    var ctx_type = (year <= 1911 ? "sp" : "default");
    return {
	title : title_format.replace("{year}", year_str),
	description : descr_format.replace("{year}", year_str),
	within : settings[ctx_type + "Within"],
	context : settings[ctx_type + "Context"],
	attributes : klk_pos_attrs,
	struct_attributes : klk_struct_attrs
    };
}


// Generate settings.corpora and settings.corporafolders for the
// Finnish KLK corpora by using the above functions

settings.fn.make_corpus_settings_by_year_decade(
    settings.corporafolders.klk_fi, "fi_{decade}", "klk_fi_{year}",
    function(decade) {
	return {
	    title : decade.toString() + "-luku",
	    unselected : (decade <= 1880)
	};
    },
    function(year) {
	return settings.fn.make_klk_corpus_settings(
	    "KLK suomi {year}",
	    "Kansalliskirjaston suomenkielisiä sanoma- ja aikakauslehtiä vuodelta {year}",
	    year);
    },
    settings.fn.make_yearlist(1820, 2000,
			      {descending : true,
			       omit : [1828, 1843]})
);


/*
 * Previously in Old Finnish Mode
 */

sattrs.vks_sentence_id = {
    label : "vks_sentence_id"
};
sattrs.vks_sentence_cref = {
    label : "vks_sentence_cRef"
};
sattrs.vks_sentence_code = {
    label : "vks_sentence_code"
};
sattrs.vks_sentence_type = {
    label : "vks_sentence_type",
    translationKey : "vks_sentence_type_",
    dataset : {
	"sentence" : "Sentence",
	"heading" : "Heading" 
    }
};
sattrs.vks_text_year = {
    label : "vks_text_year"
};
sattrs.vks_text_title = {
    label : "vks_text_title"
};
sattrs.vks_sentence_page = {
    label : "vks_sentence_page"
};
sattrs.vks_sourcecode_code = {
    label : "vks_sourcecode_code"
};
sattrs.vks_sourcecode_page = {
    label : "vks_sourcecode_page"
};    
sattrs.vks_span_page = {
    label : "vks_span_page"
};

/*
sattrs.vksbib_book_code = {
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
};
// Copy the object so that the change does not affect the original.
sattrs.vksbib_sourcecode_book = $.extend({}, sattrs.vksbib_book_code);
sattrs.vksbib_sourcecode_book.label = "vksbib_sourcecode_book";
sattrs.vkslait_law_code = {
    label : "vkslait_law_code",
    displayType : "select",
    translationKey : "vkslaitlaw_",
    dataset : {
	"As1584" : "As1584",
	"As1593" : "As1593"
    },
    opts : settings.liteOptions
};
sattrs.vkslait_sourcecode_work = $.extend({}, sattrs.vkslait_law_code);
sattrs.vkslait_sourcecode_work.label = "vkslait_sourcecode_work";
sattrs.vkssaarnat_source_code = {
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
};
sattrs.vkssaarnat_sourcecode_work = $.extend({}, sattrs.vkssaarnat_source_code);
sattrs.vkssaarnat_sourcecode_work.label = "vkssaarnat_sourcecode_work";
*/

/*
settings.corpora.vks_biblia = {
    title : "Biblia (näyte)",
    description : "Vuoden 1642 raamatunsuomennos",
    id : "vks_biblia",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {},
    struct_attributes : {
	sourcecode_bibleref : {
	    label : "vksbib_sourcecode_bibleref"
	},
	sourcecode_book : sattrs.vksbib_sourcecode_book,
	sourcecode_chapter : {
	    label : "vksbib_sourcecode_chapter"
	},
	sourcecode_verse : {
	    label : "vksbib_sourcecode_verse"
	},
	sourcecode_code : sattrs.vks_sourcecode_code,
	sourcecode_page : sattrs.vks_sourcecode_page,
	work_code : {
	    label : "vks_work_code",
	    displayType : "hidden",
	},
	verse_bibleref : {
	    label : "vksbib_verse_bibleref"
	},
	book_code : sattrs.vksbib_book_code,
	chapter_code : {
	    label : "vksbib_chapter_code"
	},
	// chapter_bibleref : {
	//     label : "vksbib_chapter_bibleref"
	// },
	verse_code : {
	    label : "vksbib_verse_code"
	},
	sentence_id : sattrs.sentence_id_hidden,
	span_code : sattrs.vks_sentence_code,
	span_page : sattrs.vks_sentence_page
    }
};
*/

/*
settings.corpora.vks_lait = {
    title : "Laki- ja asetustekstejä (näyte)",
    description : "Laki- ja asetustekstejä",
    id : "vks_lait",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	word_orig : attrs.origword,
	word_completed : attrs.complword
    },
    struct_attributes : {
	sourcecode_work : sattrs.vkslait_sourcecode_work,
	sourcecode_code : sattrs.vks_sourcecode_code,
	sourcecode_page : sattrs.vks_sourcecode_page,
	law_code : sattrs.vkslait_law_code,
	sentence_id : sattrs.sentence_id_hidden,
	span_code : sattrs.vks_sentence_code,
	span_page : sattrs.vks_sentence_page
    }
};
*/

/*
settings.corpora.vks_saarnat = {
    title : "Ruumissaarnoja, puheita ja muistorunoja (näyte)",
    description : "Ruumissaarnoja, puheita ja muistorunoja",
    id : "vks_saarnat",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	word_orig : attrs.origword,
	word_completed : attrs.complword
    },
    struct_attributes : {
	sourcecode_work : sattrs.vkssaarnat_sourcecode_work,
	sourcecode_code : sattrs.vks_sourcecode_code,
	sourcecode_page : sattrs.vks_sourcecode_page,
	source_code : sattrs.vkssaarnat_source_code,
	sentence_id : sattrs.sentence_id_hidden,
	span_code : sattrs.vks_sentence_code,
	span_page : sattrs.vks_sentence_page
    }
};
*/

settings.corpora.vks_agricola = {
    title : "Mikael Agricolan teoksia",
    description : "Mikael Agricola: Suomalaisen Kirjallisuuden Seuran näköispainossarja Mikael Agricolan teoksista",
    id : "vks_agricola",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
	word_orig : attrs.origword,
	word_completed : attrs.complword,
	word_tilde : attrs.tildeword
    },
    struct_attributes : {
	text_year : sattrs.vks_text_year,
	text_title : sattrs.vks_text_title,
	sentence_type : sattrs.vks_sentence_type,
	sentence_code : sattrs.vks_sentence_code,
	sentence_id : sattrs.sentence_id_hidden,
	sentence_cRef : sattrs.vks_sentence_cref,
	span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_almanakat = {
    title : "Almanakkoja vuosilta 1705–1809",
    description : "Almanakkoja vuosilta 1705–1809",
    id : "vks_almanakat",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_biblia = {
    title : "Biblia 1642",
    description : "Vuoden 1642 raamatunsuomennos",
    id : "vks_biblia",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_bjorkqvist = {
    title : "Bjorkqvist 1801",
    description : "Uskon harjoitus Autuuteen, Sowitettu niiden Wuotisten \
Juhla- ja Sunnundai-Päiwäisten Evangeliumein Tutkinnoissa. Osat I–II 1801",
    id : "vks_bjorkqvist",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_frosterus = {
    title : "Frosterus 1791",
    description : "Hyödyllinen Huwitus Luomisen Töistä, Yxinkertaisille awuxi Jumalan Hywyden Tundoon ja Palweluxeen",
    id : "vks_frosterus",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_ganander = {
    title : "Christfried Ganander 1763–1788",
    description : "Gananderin teoksia",
    id : "vks_ganander",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_lait = {
    title : "Lakeja ja asetuksia 1500–1810",
    description : "Lakeja ja asetuksia 1500-, 1600-, 1700- ja 1800-luvuilta",
    id : "vks_lait",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_lizelius = {
    title : "Antti Lizelius 1756–1780",
    description : "Lizeliuksen teoksia vuosilta 1756–1780",
    id : "vks_lizelius",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_lpetri = {
    title : "Laurentius Petri 1644–1670",
    description : "Laurentius Petrin saarnoja 1644–1670",
    id : "vks_lpetri",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_saarnat = {
    title : "Ruumissaarnoja, puheita ja muistorunoja",
    description : "Ruumissaarnoja, puheita ja muistorunoja 1600- ja 1700-luvuilta",
    id : "vks_saarnat",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_varia = {
    title : "Varia",
    description : "Kokoelma tekstejä 1500-, 1600-, 1700- ja 1800-luvuilta",
    id : "vks_varia",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};

settings.corpora.vks_virret = {
    title : "Virret",
    description : "Virsiä",
    id : "vks_virret",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
        word_orig : attrs.origword,
        word_completed : attrs.complword,
        word_tilde : attrs.tildeword
    },
    struct_attributes : {
        text_year : sattrs.vks_text_year,
        text_title : sattrs.vks_text_title,
        sentence_type : sattrs.vks_sentence_type,
        sentence_code : sattrs.vks_sentence_code,
        sentence_id : sattrs.sentence_id_hidden,
        sentence_cRef : sattrs.vks_sentence_cref,
        span_page : sattrs.vks_span_page
    }
};


settings.corpora.vns_asetus = {
    title : "Asetuksia (näyte)",
    description : "Asetuksia",
    id : "vns_asetus",
    within : settings.spWithin,
    context : settings.spContext,
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
	    label : "lawparagraph_id"
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
    title : "Renqvist (näyte)",
    description : "Renqvist",
    id : "vns_renqvist",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : {
    },
    struct_attributes : {
	text_title : sattrs.text_title,
	text_distributor : sattrs.text_distributor,
	text_source : sattrs.text_source,
	paragraph_id : sattrs.paragraph_id,
	paragraph_type : sattrs.paragraph_type,
	sentence_id : sattrs.sentence_id_hidden,
	sentence_n : sattrs.sentence_n
    }
};

settings.corpora.vns_renvall = {
    title : "Renvall",
    description : "Gustaf Renvall: Suomalainen sana-kirja (1826)",
    id : "vns_renvall",
    within : settings.defaultWithin,
    context : settings.defaultContext,
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


/*
 * MISC
 */

settings.cgi_prefix = "http://nyklait-09-01.hum.helsinki.fi/cgi-bin/korp/";
settings.cgi_script = settings.cgi_prefix + "korp.cgi";
settings.lemgrams_cgi_script = settings.cgi_prefix + "korp_lemgrams.cgi";
settings.download_cgi_script = settings.cgi_prefix + "korp_download.cgi";


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
					"data-corpora" : JSON.stringify(corpora)
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
					[query, JSON.stringify(corpora), value, util.getLocaleString("pos_" + value)]);
			return appendDiagram(output, corpora, value);
		};
	case "prefix":
	case "suffix":
	case "lex":
		return function(row, cell, value, columnDef, dataContext) {
		var corpora = getCorpora(dataContext);
		if(value == "&Sigma;") return appendDiagram(value, corpora, value);
		else if(value == "|") return "-";
		output = _(value.split("|"))
				.filter(Boolean)
				.map(function(item) {
					var wrapper = $("<div>");
					$("<span>").html(util.lemgramToString(item, true)).attr("data-cqp", '[lex contains "' + item + '"]').appendTo(wrapper);
					return wrapper.html();
				})
				.join(", ");
		return appendDiagram(output, corpora, value);
		};
	case "saldo":
		return function(row, cell, value, columnDef, dataContext) {
		var corpora = getCorpora(dataContext);
		if(value == "&Sigma;") return appendDiagram(value, corpora, value);
		else if(value == "|") return "-";
		output = _(value.split("|"))
				.filter(Boolean)
				.map(function(item) {
					return util.saldoToString(item, true);
				})
				.join(", ");
		return appendDiagram(output, corpora, value);
		};
	case "deprel":
		return function(row, cell, value, columnDef, dataContext) {
			var corpora = getCorpora(dataContext);
			if(value == "&Sigma;") return appendDiagram(value, corpora, value);
			var query = $.map(dataContext.hit_value.split(" "), function(item) {
				return $.format('[deprel="%s"]', item);
			}).join(" ");
			output = $.format("<span class='link' data-query='%s' data-corpora='%s' rel='localize[%s]'>%s</span> ",
					[query, JSON.stringify(corpora),"deprel_" + value, util.getLocaleString("deprel_" + value)]);
			return appendDiagram(output, corpora, value);

		};
	default:
		return function(row, cell, value, columnDef, dataContext) {
			var corpora = getCorpora(dataContext);
			var query = $.map(dataContext.hit_value.split(" "), function(item) {
				return $.format('[%s="%s"]', [value, item]);
			}).join(" ");
			output = $.format("<span data-query='%s' data-corpora='%s' rel='localize[%s]'>%s</span> ",
					[query, $.toJSON(corpora),"deprel_" + value, util.getLocaleString(value)]);
			if(value == "&Sigma;") return appendDiagram(output, corpora, value);

			return appendDiagram(output, corpora, value);
		};
	}

	return output;
};


delete attrs;
delete sattrs;
delete context;
delete ref;




settings.posset = {
   type : "set",
   label : "pos",
   displayType : "select",
   translationKey : "pos_",
   dataset :  {
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
			}
};
settings.fsvlemma = {
	//pattern : "<a href='http://spraakbanken.gu.se/karp/#search=cql%7C(gf+%3D+%22<%= key %>%22)+sortBy+wf'><%= val %></a>",
  	type : "set",
  	label : "baseform",
  	displayType : "autocomplete",
  	stringify : function(baseform) {
		return baseform.replace(/:\d+$/,'').replace(/_/g,' ');
	}
//  	externalSearch : "http://spraakbanken.gu.se/karp/#search=cql%7C(gf+%3D+%22<%= val %>%22)+sortBy+lemgram",
//	internalSearch : true

};
settings.fsvlex = {
  	type : "set",
  	label : "lemgram",
  	displayType : "autocomplete",
  	stringify : function(str) {
  		return util.lemgramToString(str, true);
  	},
  	externalSearch : karpLemgramLink,
	internalSearch : true
};
settings.fsvvariants = {
  	type : "set",
  	label : "variants",
  	stringify : function(str) {
  		return util.lemgramToString(str, true);
  	},
  	displayType : "autocomplete",
  	opts : settings.liteOptions,
  	externalSearch : karpLemgramLink,
	internalSearch : true
};

settings.fsvdescription ='<a href="http://project2.sol.lu.se/fornsvenska/">Fornsvenska textbanken</a> är ett projekt som digitaliserar fornsvenska texter och gör dem tillgängliga över webben. Projektet leds av Lars-Olof Delsing vid Lunds universitet.';
var fsv_yngrelagar = {
	morf : 'fsvm',
	id : "fsv-yngrelagar",
	title : "Yngre lagar – Fornsvenska textbankens material",
	description : settings.fsvdescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : {
		posset : settings.posset,
		lemma : settings.fsvlemma,
		lex : settings.fsvlex,
		variants : settings.fsvvariants
		},
	struct_attributes : {
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Kristoffers Landslag, nyskrivna flockar i förhållande till MEL",
				"Kristoffers Landslag, innehållsligt ändrade flockar i förhållande til MEL",
				"Kristoffers Landslag, flockar direkt hämtade från MEL",
				"Kristoffers Landslag"
				],
		},
		text_date : {label : "date"}
	}
};

var fsv_aldrelagar = {
	morf : 'fsvm',
	id : "fsv-aldrelagar",
	title : "Äldre lagar – Fornsvenska textbankens material",
	description : settings.fsvdescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : {
		posset : settings.posset,
		lemma : settings.fsvlemma,
		lex : settings.fsvlex,
		variants : settings.fsvvariants
				},
	struct_attributes : {
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Yngre Västgötalagens äldsta fragment, Lydekini excerpter och anteckningar",
				"Tillägg till Upplandslagen, hskr A (Ups B 12)",
				"Södermannalagen, enligt Codex iuris Sudermannici",
				"Östgötalagen, fragment H, ur Kyrkobalken ur Skokloster Avdl I 145",
				"Yngre Västmannalagen, enl Holm B 57",
				"Vidhemsprästens anteckningar",
				"Magnus Erikssons Stadslag, exklusiva stadslagsflockar",
				"Södermannalagens additamenta, efter NKS 2237",
				"Hälsingelagen",
				"Yngre Västgötalagen, tillägg, enligt Holm B 58",
				"Östgötalagen, fragment C, ur Holm B 1709",
				"Yngre Västgötalagen, enligt Holm B 58",
				"Upplandslagen enl Schlyters utgåva och Codex Ups C 12, hskr A",
				"Skånelagen, enligt Holm B 76",
				"Östgötalagen, fragment D, ur Holm B 24",
				"Östgötalagen A, ur Holm B 50",
				"Äldre Västgötalagen",
				"Östgötalagen, fragment M, ur Holm B 196",
				"Gutalagen enligt Holm B 64",
				"Upplandslagen enligt Codex Holm B 199, Schlyters hskr B",
				"Smålandslagens kyrkobalk",
				"Dalalagen (Äldre Västmannalagen)",
				"Gutalagens additamenta enligt AM 54",
				"Bjärköarätten",
				"Magnus Erikssons Landslag",
				"Östgötalagen, fragment N, ur Köpenhamn AM 1056",
				"Södermannalagen stadsfästelse - Confirmatio, enligt NKS 2237",
				"Östgötalagen, fragment E, ur Ups B 22"
							],
		},
		text_date : {label : "date"}
	}
};




