/* lemma => grundform, base form
 * lexem => lemgram, lemgram
 *
 */
var settings = {};

var isLab = window.isLab || false;

settings.lemgramSelect = true;
settings.autocomplete = true;
settings.textDateAllowBareYears = true;
settings.downloadFormats = ["csv", "tsv", "text", "vrt"];

settings.downloadFormatConfig = {
    "csv": {
	structs: "+"
    },
    // "csvp": {
    // 	format: "csv",
    // 	structs: "+",
    // 	attrs: "+"
    // },
    "tsv": {
	structs: "+"
    },
    "text": {
	structs: "+"
    },
    "vrt": {
	structs: "+",
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
    title : "Vanhan kirjasuomen korpus (näytteitä)",
    contents : ["vks_biblia", "vks_lait", "vks_saarnat"],
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


var klk_missing_years = [1828, 1843];

settings.corporafolders.klk_fi.fi_2000 = {
    title : "2000-luku",
    contents : ["klk_fi_2000"]
};

for (var decade = 1990; decade >= 1820; decade -= 10) {
    var decade_str = decade.toString();
    var contents = [];
    for (var year = decade + 9; year >= decade; year--) {
	if (klk_missing_years.indexOf(year) == -1) {
	    contents.push("klk_fi_" + year.toString());
	}
    }
    settings.corporafolders.klk_fi["fi_" + decade_str] = {
	title : decade_str + "-luku",
	contents : contents
    };
    if (decade <= 1880) {
	settings.corporafolders.klk_fi["fi_" + decade_str]["unselected"] = true;
    }
}

for (var year = 1820; year <= 2000; year += 1) {
    if (klk_missing_years.indexOf(year) != -1) {
	continue;
    }
    var year_str = year.toString();
    var ctx_type = (year <= 1911 ? "sp" : "default");
    settings.corpora["klk_fi_" + year_str] = {
	title : "KLK " + year_str,
	description : "Kansalliskirjaston suomenkielisiä sanoma- ja aikakauslehtiä vuodelta " + year_str,
	id : "klk_fi_" + year_str,
	within : settings[ctx_type + "Within"],
	context : settings[ctx_type + "Context"],
	attributes : klk_pos_attrs,
	struct_attributes : klk_struct_attrs
    };
}
	

/*
settings.corporafolders.klk_fi.fi_1820 = {
    title : "1820-luku",
    contents : ["klk_fi_1820",
                "klk_fi_1821",
                "klk_fi_1822",
                "klk_fi_1823",
                "klk_fi_1824",
                "klk_fi_1825",
                "klk_fi_1826",
                "klk_fi_1827",
                "klk_fi_1829"
               ],
    unselected : true
};

settings.corporafolders.klk_fi.fi_1830 = {
    title : "1830-luku",
    contents : ["klk_fi_1830",
                "klk_fi_1831",
                "klk_fi_1832",
                "klk_fi_1833",
                "klk_fi_1834",
                "klk_fi_1835",
                "klk_fi_1836",
                "klk_fi_1837",
                "klk_fi_1838",
                "klk_fi_1839"
               ],
    unselected : true
};

settings.corporafolders.klk_fi.fi_1840 = {
    title : "1840-luku",
    contents : ["klk_fi_1840",
                "klk_fi_1841",
                "klk_fi_1842",
                "klk_fi_1844",
                "klk_fi_1845",
                "klk_fi_1846",
                "klk_fi_1847",
                "klk_fi_1848",
                "klk_fi_1849"
               ],
    unselected : true
};

settings.corporafolders.klk_fi.fi_1850 = {
    title : "1850-luku",
    contents : ["klk_fi_1850",
                "klk_fi_1851",
                "klk_fi_1852",
                "klk_fi_1853",
                "klk_fi_1854",
                "klk_fi_1855",
                "klk_fi_1856",
                "klk_fi_1857",
                "klk_fi_1858",
                "klk_fi_1859"
               ],
    unselected : true
};

settings.corporafolders.klk_fi.fi_1860 = {
    title : "1860-luku",
    contents : ["klk_fi_1860",
                "klk_fi_1861",
                "klk_fi_1862",
                "klk_fi_1863",
                "klk_fi_1864",
                "klk_fi_1865",
                "klk_fi_1866",
                "klk_fi_1867",
                "klk_fi_1868",
                "klk_fi_1869"
               ],
    unselected : true
};

settings.corporafolders.klk_fi.fi_1870 = {
    title : "1870-luku",
    contents : ["klk_fi_1870",
                "klk_fi_1871",
                "klk_fi_1872",
                "klk_fi_1873",
                "klk_fi_1874",
                "klk_fi_1875",
                "klk_fi_1876",
                "klk_fi_1877",
                "klk_fi_1878",
                "klk_fi_1879"
               ],
    unselected : true
};

settings.corporafolders.klk_fi.fi_1880 = {
    title : "1880-luku",
    contents : ["klk_fi_1880",
                "klk_fi_1881",
                "klk_fi_1882",
                "klk_fi_1883",
                "klk_fi_1884",
                "klk_fi_1885",
                "klk_fi_1886",
                "klk_fi_1887",
                "klk_fi_1888",
                "klk_fi_1889"
               ],
    unselected : true
};

settings.corporafolders.klk_fi.fi_1890 = {
    title : "1890-luku",
    contents : ["klk_fi_1890",
                "klk_fi_1891",
                "klk_fi_1892",
                "klk_fi_1893",
                "klk_fi_1894",
                "klk_fi_1895",
                "klk_fi_1896",
                "klk_fi_1897",
                "klk_fi_1898",
                "klk_fi_1899"
               ]
};

settings.corporafolders.klk_fi.fi_1900 = {
    title : "1900-luku",
    contents : ["klk_fi_1900",
                "klk_fi_1901",
                "klk_fi_1902",
                "klk_fi_1903",
                "klk_fi_1904",
                "klk_fi_1905",
                "klk_fi_1906",
                "klk_fi_1907",
                "klk_fi_1908",
                "klk_fi_1909"
               ]
};

settings.corporafolders.klk_fi.fi_1910 = {
    title : "1910-luku",
    contents : ["klk_fi_1910",
                "klk_fi_1911",
                "klk_fi_1912",
                "klk_fi_1913",
                "klk_fi_1914",
                "klk_fi_1915",
                "klk_fi_1916",
                "klk_fi_1917",
                "klk_fi_1918",
                "klk_fi_1919"
               ]
};

settings.corporafolders.klk_fi.fi_1920 = {
    title : "1920-luku",
    contents : ["klk_fi_1920",
                "klk_fi_1921",
                "klk_fi_1922",
                "klk_fi_1923",
                "klk_fi_1924",
                "klk_fi_1925",
                "klk_fi_1926",
                "klk_fi_1927",
                "klk_fi_1928",
                "klk_fi_1929"
               ]
};

settings.corporafolders.klk_fi.fi_1930 = {
    title : "1930-luku",
    contents : ["klk_fi_1930",
                "klk_fi_1931",
                "klk_fi_1932",
                "klk_fi_1933",
                "klk_fi_1934",
                "klk_fi_1935",
                "klk_fi_1936",
                "klk_fi_1937",
                "klk_fi_1938",
                "klk_fi_1939"
               ]
};

settings.corporafolders.klk_fi.fi_1940 = {
    title : "1940-luku",
    contents : ["klk_fi_1940",
                "klk_fi_1941",
                "klk_fi_1942",
                "klk_fi_1943",
                "klk_fi_1944",
                "klk_fi_1945",
                "klk_fi_1946",
                "klk_fi_1947",
                "klk_fi_1948",
                "klk_fi_1949"
               ]
};

settings.corporafolders.klk_fi.fi_1950 = {
    title : "1950-luku",
    contents : ["klk_fi_1950",
                "klk_fi_1951",
                "klk_fi_1952",
                "klk_fi_1953",
                "klk_fi_1954",
                "klk_fi_1955",
                "klk_fi_1956",
                "klk_fi_1957",
                "klk_fi_1958",
                "klk_fi_1959"
               ]
};

settings.corporafolders.klk_fi.fi_1960 = {
    title : "1960-luku",
    contents : ["klk_fi_1960",
                "klk_fi_1961",
                "klk_fi_1962",
                "klk_fi_1963",
                "klk_fi_1964",
                "klk_fi_1965",
                "klk_fi_1966",
                "klk_fi_1967",
                "klk_fi_1968",
                "klk_fi_1969"
               ]
};

settings.corporafolders.klk_fi.fi_1970 = {
    title : "1970-luku",
    contents : ["klk_fi_1970",
                "klk_fi_1971",
                "klk_fi_1972",
                "klk_fi_1973",
                "klk_fi_1974",
                "klk_fi_1975",
                "klk_fi_1976",
                "klk_fi_1977",
                "klk_fi_1978",
                "klk_fi_1979"
               ]
};

settings.corporafolders.klk_fi.fi_1980 = {
    title : "1980-luku",
    contents : ["klk_fi_1980",
                "klk_fi_1981",
                "klk_fi_1982",
                "klk_fi_1983",
                "klk_fi_1984",
                "klk_fi_1985",
                "klk_fi_1986",
                "klk_fi_1987",
                "klk_fi_1988",
                "klk_fi_1989"
               ]
};

settings.corporafolders.klk_fi.fi_1990 = {
    title : "1990-luku",
    contents : ["klk_fi_1990",
                "klk_fi_1991",
                "klk_fi_1992",
                "klk_fi_1993",
                "klk_fi_1994",
                "klk_fi_1995",
                "klk_fi_1996",
                "klk_fi_1997",
                "klk_fi_1998",
                "klk_fi_1999"
               ]
};

settings.corporafolders.klk_fi.fi_2000 = {
    title : "2000-luku",
    contents : ["klk_fi_2000"]
};

settings.corpora.klk_fi_1820 = {
    title : "1820",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1820",
    id : "klk_fi_1820",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1821 = {
    title : "1821",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1821",
    id : "klk_fi_1821",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1822 = {
    title : "1822",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1822",
    id : "klk_fi_1822",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1823 = {
    title : "1823",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1823",
    id : "klk_fi_1823",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1824 = {
    title : "1824",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1824",
    id : "klk_fi_1824",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1825 = {
    title : "1825",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1825",
    id : "klk_fi_1825",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1826 = {
    title : "1826",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1826",
    id : "klk_fi_1826",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1827 = {
    title : "1827",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1827",
    id : "klk_fi_1827",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1829 = {
    title : "1829",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1829",
    id : "klk_fi_1829",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1830 = {
    title : "1830",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1830",
    id : "klk_fi_1830",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1831 = {
    title : "1831",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1831",
    id : "klk_fi_1831",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1832 = {
    title : "1832",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1832",
    id : "klk_fi_1832",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1833 = {
    title : "1833",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1833",
    id : "klk_fi_1833",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1834 = {
    title : "1834",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1834",
    id : "klk_fi_1834",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1835 = {
    title : "1835",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1835",
    id : "klk_fi_1835",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1836 = {
    title : "1836",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1836",
    id : "klk_fi_1836",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1837 = {
    title : "1837",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1837",
    id : "klk_fi_1837",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1838 = {
    title : "1838",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1838",
    id : "klk_fi_1838",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1839 = {
    title : "1839",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1839",
    id : "klk_fi_1839",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1840 = {
    title : "1840",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1840",
    id : "klk_fi_1840",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1841 = {
    title : "1841",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1841",
    id : "klk_fi_1841",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1842 = {
    title : "1842",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1842",
    id : "klk_fi_1842",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1844 = {
    title : "1844",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1844",
    id : "klk_fi_1844",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1845 = {
    title : "1845",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1845",
    id : "klk_fi_1845",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1846 = {
    title : "1846",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1846",
    id : "klk_fi_1846",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1847 = {
    title : "1847",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1847",
    id : "klk_fi_1847",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1848 = {
    title : "1848",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1848",
    id : "klk_fi_1848",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1849 = {
    title : "1849",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1849",
    id : "klk_fi_1849",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1850 = {
    title : "1850",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1850",
    id : "klk_fi_1850",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1851 = {
    title : "1851",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1851",
    id : "klk_fi_1851",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1852 = {
    title : "1852",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1852",
    id : "klk_fi_1852",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1853 = {
    title : "1853",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1853",
    id : "klk_fi_1853",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1854 = {
    title : "1854",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1854",
    id : "klk_fi_1854",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1855 = {
    title : "1855",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1855",
    id : "klk_fi_1855",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1856 = {
    title : "1856",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1856",
    id : "klk_fi_1856",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1857 = {
    title : "1857",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1857",
    id : "klk_fi_1857",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1858 = {
    title : "1858",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1858",
    id : "klk_fi_1858",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1859 = {
    title : "1859",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1859",
    id : "klk_fi_1859",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1860 = {
    title : "1860",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1860",
    id : "klk_fi_1860",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1861 = {
    title : "1861",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1861",
    id : "klk_fi_1861",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1862 = {
    title : "1862",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1862",
    id : "klk_fi_1862",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1863 = {
    title : "1863",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1863",
    id : "klk_fi_1863",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1864 = {
    title : "1864",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1864",
    id : "klk_fi_1864",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1865 = {
    title : "1865",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1865",
    id : "klk_fi_1865",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1866 = {
    title : "1866",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1866",
    id : "klk_fi_1866",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1867 = {
    title : "1867",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1867",
    id : "klk_fi_1867",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1868 = {
    title : "1868",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1868",
    id : "klk_fi_1868",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1869 = {
    title : "1869",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1869",
    id : "klk_fi_1869",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1870 = {
    title : "1870",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1870",
    id : "klk_fi_1870",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1871 = {
    title : "1871",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1871",
    id : "klk_fi_1871",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1872 = {
    title : "1872",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1872",
    id : "klk_fi_1872",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1873 = {
    title : "1873",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1873",
    id : "klk_fi_1873",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1874 = {
    title : "1874",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1874",
    id : "klk_fi_1874",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1875 = {
    title : "1875",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1875",
    id : "klk_fi_1875",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1876 = {
    title : "1876",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1876",
    id : "klk_fi_1876",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1877 = {
    title : "1877",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1877",
    id : "klk_fi_1877",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1878 = {
    title : "1878",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1878",
    id : "klk_fi_1878",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1879 = {
    title : "1879",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1879",
    id : "klk_fi_1879",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1880 = {
    title : "1880",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1880",
    id : "klk_fi_1880",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1881 = {
    title : "1881",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1881",
    id : "klk_fi_1881",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1882 = {
    title : "1882",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1882",
    id : "klk_fi_1882",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1883 = {
    title : "1883",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1883",
    id : "klk_fi_1883",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1884 = {
    title : "1884",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1884",
    id : "klk_fi_1884",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1885 = {
    title : "1885",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1885",
    id : "klk_fi_1885",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1886 = {
    title : "1886",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1886",
    id : "klk_fi_1886",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1887 = {
    title : "1887",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1887",
    id : "klk_fi_1887",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1888 = {
    title : "1888",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1888",
    id : "klk_fi_1888",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1889 = {
    title : "1889",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1889",
    id : "klk_fi_1889",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1890 = {
    title : "1890",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1890",
    id : "klk_fi_1890",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1891 = {
    title : "1891",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1891",
    id : "klk_fi_1891",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1892 = {
    title : "1892",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1892",
    id : "klk_fi_1892",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1893 = {
    title : "1893",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1893",
    id : "klk_fi_1893",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1894 = {
    title : "1894",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1894",
    id : "klk_fi_1894",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1895 = {
    title : "1895",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1895",
    id : "klk_fi_1895",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1896 = {
    title : "1896",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1896",
    id : "klk_fi_1896",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1897 = {
    title : "1897",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1897",
    id : "klk_fi_1897",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1898 = {
    title : "1898",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1898",
    id : "klk_fi_1898",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1899 = {
    title : "1899",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1899",
    id : "klk_fi_1899",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1900 = {
    title : "1900",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1900",
    id : "klk_fi_1900",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1901 = {
    title : "1901",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1901",
    id : "klk_fi_1901",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1902 = {
    title : "1902",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1902",
    id : "klk_fi_1902",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1903 = {
    title : "1903",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1903",
    id : "klk_fi_1903",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1904 = {
    title : "1904",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1904",
    id : "klk_fi_1904",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1905 = {
    title : "1905",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1905",
    id : "klk_fi_1905",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1906 = {
    title : "1906",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1906",
    id : "klk_fi_1906",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1907 = {
    title : "1907",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1907",
    id : "klk_fi_1907",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1908 = {
    title : "1908",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1908",
    id : "klk_fi_1908",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1909 = {
    title : "1909",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1909",
    id : "klk_fi_1909",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1910 = {
    title : "1910",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1910",
    id : "klk_fi_1910",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1911 = {
    title : "1911",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1911",
    id : "klk_fi_1911",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1912 = {
    title : "1912",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1912",
    id : "klk_fi_1912",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1913 = {
    title : "1913",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1913",
    id : "klk_fi_1913",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1914 = {
    title : "1914",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1914",
    id : "klk_fi_1914",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1915 = {
    title : "1915",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1915",
    id : "klk_fi_1915",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1916 = {
    title : "1916",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1916",
    id : "klk_fi_1916",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1917 = {
    title : "1917",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1917",
    id : "klk_fi_1917",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1918 = {
    title : "1918",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1918",
    id : "klk_fi_1918",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1919 = {
    title : "1919",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1919",
    id : "klk_fi_1919",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1920 = {
    title : "1920",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1920",
    id : "klk_fi_1920",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1921 = {
    title : "1921",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1921",
    id : "klk_fi_1921",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1922 = {
    title : "1922",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1922",
    id : "klk_fi_1922",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1923 = {
    title : "1923",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1923",
    id : "klk_fi_1923",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1924 = {
    title : "1924",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1924",
    id : "klk_fi_1924",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1925 = {
    title : "1925",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1925",
    id : "klk_fi_1925",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1926 = {
    title : "1926",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1926",
    id : "klk_fi_1926",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1927 = {
    title : "1927",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1927",
    id : "klk_fi_1927",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1928 = {
    title : "1928",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1928",
    id : "klk_fi_1928",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1929 = {
    title : "1929",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1929",
    id : "klk_fi_1929",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1930 = {
    title : "1930",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1930",
    id : "klk_fi_1930",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1931 = {
    title : "1931",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1931",
    id : "klk_fi_1931",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1932 = {
    title : "1932",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1932",
    id : "klk_fi_1932",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1933 = {
    title : "1933",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1933",
    id : "klk_fi_1933",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1934 = {
    title : "1934",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1934",
    id : "klk_fi_1934",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1935 = {
    title : "1935",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1935",
    id : "klk_fi_1935",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1936 = {
    title : "1936",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1936",
    id : "klk_fi_1936",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1937 = {
    title : "1937",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1937",
    id : "klk_fi_1937",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1938 = {
    title : "1938",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1938",
    id : "klk_fi_1938",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1939 = {
    title : "1939",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1939",
    id : "klk_fi_1939",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1940 = {
    title : "1940",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1940",
    id : "klk_fi_1940",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1941 = {
    title : "1941",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1941",
    id : "klk_fi_1941",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1942 = {
    title : "1942",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1942",
    id : "klk_fi_1942",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1943 = {
    title : "1943",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1943",
    id : "klk_fi_1943",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1944 = {
    title : "1944",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1944",
    id : "klk_fi_1944",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1945 = {
    title : "1945",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1945",
    id : "klk_fi_1945",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1946 = {
    title : "1946",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1946",
    id : "klk_fi_1946",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1947 = {
    title : "1947",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1947",
    id : "klk_fi_1947",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1948 = {
    title : "1948",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1948",
    id : "klk_fi_1948",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1949 = {
    title : "1949",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1949",
    id : "klk_fi_1949",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1950 = {
    title : "1950",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1950",
    id : "klk_fi_1950",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1951 = {
    title : "1951",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1951",
    id : "klk_fi_1951",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1952 = {
    title : "1952",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1952",
    id : "klk_fi_1952",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1953 = {
    title : "1953",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1953",
    id : "klk_fi_1953",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1954 = {
    title : "1954",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1954",
    id : "klk_fi_1954",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1955 = {
    title : "1955",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1955",
    id : "klk_fi_1955",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1956 = {
    title : "1956",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1956",
    id : "klk_fi_1956",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1957 = {
    title : "1957",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1957",
    id : "klk_fi_1957",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1958 = {
    title : "1958",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1958",
    id : "klk_fi_1958",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1959 = {
    title : "1959",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1959",
    id : "klk_fi_1959",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1960 = {
    title : "1960",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1960",
    id : "klk_fi_1960",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1961 = {
    title : "1961",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1961",
    id : "klk_fi_1961",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1962 = {
    title : "1962",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1962",
    id : "klk_fi_1962",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1963 = {
    title : "1963",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1963",
    id : "klk_fi_1963",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1964 = {
    title : "1964",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1964",
    id : "klk_fi_1964",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1965 = {
    title : "1965",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1965",
    id : "klk_fi_1965",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1966 = {
    title : "1966",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1966",
    id : "klk_fi_1966",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1967 = {
    title : "1967",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1967",
    id : "klk_fi_1967",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1968 = {
    title : "1968",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1968",
    id : "klk_fi_1968",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1969 = {
    title : "1969",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1969",
    id : "klk_fi_1969",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1970 = {
    title : "1970",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1970",
    id : "klk_fi_1970",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1971 = {
    title : "1971",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1971",
    id : "klk_fi_1971",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1972 = {
    title : "1972",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1972",
    id : "klk_fi_1972",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1973 = {
    title : "1973",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1973",
    id : "klk_fi_1973",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1974 = {
    title : "1974",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1974",
    id : "klk_fi_1974",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1975 = {
    title : "1975",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1975",
    id : "klk_fi_1975",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1976 = {
    title : "1976",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1976",
    id : "klk_fi_1976",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1977 = {
    title : "1977",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1977",
    id : "klk_fi_1977",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1978 = {
    title : "1978",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1978",
    id : "klk_fi_1978",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1979 = {
    title : "1979",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1979",
    id : "klk_fi_1979",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1980 = {
    title : "1980",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1980",
    id : "klk_fi_1980",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1981 = {
    title : "1981",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1981",
    id : "klk_fi_1981",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1982 = {
    title : "1982",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1982",
    id : "klk_fi_1982",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1983 = {
    title : "1983",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1983",
    id : "klk_fi_1983",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1984 = {
    title : "1984",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1984",
    id : "klk_fi_1984",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1985 = {
    title : "1985",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1985",
    id : "klk_fi_1985",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1986 = {
    title : "1986",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1986",
    id : "klk_fi_1986",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1987 = {
    title : "1987",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1987",
    id : "klk_fi_1987",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1988 = {
    title : "1988",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1988",
    id : "klk_fi_1988",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1989 = {
    title : "1989",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1989",
    id : "klk_fi_1989",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1990 = {
    title : "1990",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1990",
    id : "klk_fi_1990",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1991 = {
    title : "1991",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1991",
    id : "klk_fi_1991",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1992 = {
    title : "1992",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1992",
    id : "klk_fi_1992",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1993 = {
    title : "1993",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1993",
    id : "klk_fi_1993",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1994 = {
    title : "1994",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1994",
    id : "klk_fi_1994",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1995 = {
    title : "1995",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1995",
    id : "klk_fi_1995",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1996 = {
    title : "1996",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1996",
    id : "klk_fi_1996",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1997 = {
    title : "1997",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1997",
    id : "klk_fi_1997",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1998 = {
    title : "1998",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1998",
    id : "klk_fi_1998",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_1999 = {
    title : "1999",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 1999",
    id : "klk_fi_1999",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_fi_2000 = {
    title : "2000",
    description : "Suomenkielisiä sanoma- ja aikakauslehtiä vuodelta 2000",
    id : "klk_fi_2000",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};
*/

/*
 * Previously in Old Finnish Mode
 */

sattrs.vks_sentence_code = {
    label : "vks_sentence_code"
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




