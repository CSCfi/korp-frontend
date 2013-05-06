
settings.primaryColor = "#F9D4D4";
settings.primaryLight = "#F9EDED";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

$("#lemgram_list_item").remove();
$("#results-lemgram").remove();
$("#showLineDiagram").remove();


settings.corpora = {};
settings.corporafolders = {};


settings.corpora.bibel1917 = {
	id : "bibel1917",
	title : "Bibeln 1917",
	description : "",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : {
		pos : attrs.pos,
		msd : attrs.msd,
		lemma : attrs.baseform,
		lex : attrs.lemgram,
		saldo : attrs.saldo,
		prefix : attrs.prefix,
		suffix : attrs.suffix,
		dephead : attrs.dephead,
		deprel : attrs.deprel,
		ref : attrs.ref,
	},
	struct_attributes : {
		"text_title" : {label : "title"},
		"chapter_name" : {label : "chapter"},
		"verse_name" : {label : "verse"},
		"text_date" : {label : "year"}
	}
};

settings.corpora.bibel1873dalin = {
	morf : 'saldom|dalinm|swedbergm',
	id : "bibel1873dalin",
	title : "Bibeln 1873",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : {
		pos : attrs.pos,
		msd : attrs.msd,
		lemma    : attrs.baseform,
		lex : attrs.lemgram,
		prefix : attrs.prefix,
		suffix : attrs.suffix,
		dephead : attrs.dephead,
		deprel : attrs.deprel,
		ref : attrs.ref
		
	},
	struct_attributes : {
		"text_title" : {label : "title"},
		"chapter_name" : {label : "chapter"},
		"verse_name" : {label : "verse"},
		"text_date" : {label : "year"}
	}
};

/*
settings.corpora.bibel1873 = {
	id : "bibel1873",
	title : "Bibeln 1873",
	description : "",
    within : settings.defaultWithin,
    context : settings.defaultContext,
	attributes : {
		pos : attrs.pos,
		msd : attrs.msd,
		lemma : attrs.baseform,
		lex : attrs.lemgram,
		saldo : attrs.saldo,
		prefix : attrs.prefix,
		suffix : attrs.suffix,
		dephead : attrs.dephead,
		deprel : attrs.deprel,
		ref : attrs.ref
	},
	struct_attributes : {
		"text_title" : {label : "title"},
        "chapter_name" : {label : "chapter"},
        "verse_name" : {label : "verse"},
		"text_date" : {label : "year"}
	}
};
*/


settings.corpusListing = new CorpusListing(settings.corpora);