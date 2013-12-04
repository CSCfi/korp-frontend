
settings.primaryColor = "#eecccc";
settings.primaryLight = "#eee2e2";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

$("#lemgram_list_item").remove();
$("#results-lemgram").remove();
$("#showLineDiagram").remove();


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


settings.corpora = {};
settings.corporafolders = {};


settings.corporafolders.vks = {
    title : "Vanhan kirjasuomen korpus",
    contents : ["vks_biblia", "vks_lait", "vks_saarnat"]
};

settings.corporafolders.vns = {
    title : "Varhaisnykysuomen korpus",
    contents : ["vns_asetus", "vns_renqvist", "vns_renvall"]
};


settings.corpora.vks_biblia = {
    title : "Biblia",
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
    title : "Laki- ja asetustekstejä",
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
    title : "Ruumissaarnoja, puheita ja muistorunoja",
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
    title : "Asetuksia",
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
    title : "Renqvist",
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


settings.corpusListing = new CorpusListing(settings.corpora);
