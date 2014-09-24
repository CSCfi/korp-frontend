settings.primaryColor = "#F7D1E4";
settings.primaryLight = "#FFEBF5";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.struct_attribute_selector = "intersection"
settings.word_attribute_selector   = "intersection" 
settings.reduce_word_attribute_selector = "intersection" 

// FSV
settings.fsvattributes = {
	lemma : settings.fsvlemma,
	lex : settings.fsvlex,
	posset : settings.posset,
	variants : settings.fsvvariants
};

//SDHK
settings.sdhkstructs = {
	text_id : {
		label : "fulltext",
		pattern : "<a href='http://www.nad.riksarkivet.se/SDHK?EndastDigitaliserat=false&SDHK=<%= val %>&page=1&postid=Dipl_<%= val %>&tab=post' target='_blank'>Riksarkivet <%=val %></a>",
		opts : settings.liteOptions,
		internalSearch : false
	},
	text_lang : { label : "lang" },
	text_place : { label : "city" },
	text_date : { label : "date" },
};

//DIGI

digidailydescription = '<a href="http://digidaily.kb.se/">Digidaily</a> är ett utvecklingsprojekt där Riksarkivet, Kungliga biblioteket och Mittuniversitetet tillsammans ska utveckla rationella metoder och processer för digitalisering av dagstidningar.'
settings.digidailyattributes = {
	lemma : attrs.baseform,
	pos : attrs.pos,
	lex : attrs.lemgram,
	dephead : attrs.dephead,
	deprel : attrs.deprel,
	ref : attrs.ref,
	saldo : attrs.saldo,
	prefix : attrs.prefix,
	suffix : attrs.suffix
};
settings.digidailystruct_attributes = {
	text_title : {
		label : "title",
		displayType : "select",
		localize : false,
 		opts : settings.liteOptions
	},
	text_date : {label : "date"}
};
settings.sdhkdescription ='Svenskt Diplomatarium - från <a href="http://www.riksarkivet.se/sdhk" target="_blank">Riksarkivet</a>';

//RUNEBERG

settings.runebergattributes = {
	msd : attrs.msd,
	lemma : attrs.baseform,
	lex : attrs.lemgram,
	saldo : attrs.saldo,
	prefix : attrs.prefix,
	suffix : attrs.suffix,
	dephead : attrs.dephead,
	deprel : attrs.deprel,
	ref : attrs.ref,
	typograph : {
        	label : "typography",
        	type : "set",
		displayType : "select",
		translationKey : "fab_",
		dataset : [
			"footnote",
			"small",
			"headline",
			"italic"
			],
		opts : settings.liteOptions
        }
};
settings.runebergstruct_attributes = {
	text_title : {
		label : "title",
		displayType : "select",
		localize : false,
 		opts : settings.liteOptions
	},
	text_date : {label : "date"}
};


$("#lemgram_list_item").remove();
$("#results-lemgram").remove();
//$("#showLineDiagram").remove();

settings.corpora = {};
settings.corporafolders = {};


settings.corporafolders.fsvb = {
	title : "Fornsvenska textbanken",
	contents : ["fsv-profanprosa","fsv-verser"],
        description : settings.fsvdescription
};


settings.corporafolders.fsvb.aldre = {
	title : "Äldre fornsvenska",
	contents : ["fsv-aldrelagar", "fsv-aldrereligiosprosa"]
};

settings.corporafolders.fsvb.yngre = {
	title : "Yngre fornsvenska",
	contents : ["fsv-yngrelagar",  "fsv-yngrereligiosprosa", "fsv-yngretankebocker"]
};

settings.corporafolders.fsvb.nysvenska = {
	title : "Nysvenska",
	contents : ["fsv-nysvensklagar",  "fsv-nysvenskdalin", "fsv-nysvenskkronikor", "fsv-nysvenskovrigt", "fsv-nysvenskbibel"]
};

settings.corporafolders.medeltid = {
	title : "Medeltidsbrev, Svenskt Diplomatarium",
	contents : ["sdhk-svenska", "sdhk-norska", "sdhk-tyska", "sdhk-latin", "sdhk-ovrigt"],
        description :'Svenskt Diplomatarium - från <a href="http://www.riksarkivet.se/sdhk" target="_blank">Riksarkivet</a>'
};

settings.corporafolders.digidaily = {
	title : "Kubhist",
	contents : ["digidaily-dalpilen","digidaily-goteborgsweckoblad","digidaily-gotlandstidning",
                    "digidaily-faluposten","digidaily-fahluweckoblad","digidaily-jonkopingsbladet",
                    "digidaily-folketsrost","digidaily-bollnastidning","digidaily-norraskane",
                    "digidaily-lindesbergsallehanda","digidaily-blekingsposten","digidaily-postochinrikestidning",
                    "digidaily-stockholmsposten","digidaily-kalmar","digidaily-wernamotidning",
                    "digidaily-gotheborgsweckolista","digidaily-ostgotaposten","digidaily-ostergotlandsveckoblad",
                    "digidaily-wermlandslanstidning","digidaily-tidningforwenersborgsstadochlan"].sort(),
        description : digidailydescription
};

settings.corporafolders.lag = {
	title : "Äldre lagtexter",
	contents : ["tankebok", "lag1734","forarbeten1734", "lag1800"],
        description : "Lagtexter från 1600- ,1700- och 1800-talet."
};
settings.corporafolders.bibel = {
	title : "Äldre biblar",
	contents : ["bibel1917", "bibel1873dalin"],
        description : "Bibeln, 1873 och 1917 års utgåvor"
};

settings.corporafolders.runeberg = {
	title : "Runeberg",
	contents : ["runeberg-diverse", "runeberg-rost", "runeberg-svtidskr", "runeberg-urdagkron", "runeberg-tiden", "runeberg-biblblad", "runeberg-folkbbl"],
        description : "Tidskrifter från Projekt Runeberg"
}


settings.corporafolders.akerbruk1700 = {
	title : "Åkerbruk och gödsel",
	contents : ["akerbruk", "kvah"],
        description : "Texter om jordbruk från 1700-talet."
}


settings.corpora.lb = {
	id : "lb",
	title : "Litteraturbanken",
	description : 'Samtliga etexter och sökbara faksimiler från <a href="http://litteraturbanken.se/">Litteraturbanken.se</a>.',
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : {
		pos : attrs.pos,
		msd : attrs.msd,
		lemma : attrs.baseform,
		lex : attrs.lemgram,
		saldo : attrs.saldo,
		dephead : attrs.dephead,
		deprel : attrs.deprel,
		ref : attrs.ref,
		prefix : attrs.prefix,
		suffix : attrs.suffix
	},
	struct_attributes : {
		"text_title" : {label : "title"},
		"text_author" : {label : "author"},
		"text_url" : {label : "verk", type : "url"},
		"text_source" : {label : "source"},
		"text_date" : {label : "imprintyear"},
		"page_n" : {label : "page"},
		"page_url" : {label : "pagelink", type : "url"}
	}
};


settings.corpora.ekeblad = {
	id : "ekeblad",
	title : "Ekeblads brev",
	description : 'Breven till Claes. Elektronisk utgåva av Sture Alléns edition 1965',
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : {
		pos : attrs.pos,
		lemma : attrs.baseform,
		lex : attrs.lemgram,
		ref : attrs.ref,
	},
	struct_attributes : {
		"text_title" : {label : "title"},
		"text_author" : {label : "author"},
		"text_date" : {label : "date"},
		"paragraph_date" : {label : "datering"}
	}
};


settings.corpora["fsv-aldrelagar"] = fsv_aldrelagar;

settings.corpora["fsv-aldrereligiosprosa"] = {
        morf : 'fsvm',
	id : "fsv-aldrereligiosprosa",
	title : "Äldre religiös prosa – Fornsvenska textbankens material",
	description : settings.fsvdescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.fsvattributes,
	struct_attributes : {
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Birgittaautograferna",
				"Fornsvenska legendariet enligt Codex Bureanus",
				"Pentateuchparafrasen, enligt MB I A",
				"Pentateuchparafrasen B, enligt MB I B",
				"Fornsvenska legendariet enligt Codex Bildstenianus"
			],
		},
		text_date : {label : "date"}
	}
};

settings.corpora["fsv-profanprosa"] = {
        morf : 'fsvm',
 	id : "fsv-profanprosa",
	title : "Profan prosa – Fornsvenska textbankens material",
	description : settings.fsvdescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.fsvattributes,
	struct_attributes : {
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Barlaam och Josaphat, ur Codex Holm A 49 Nådendals klosterbok",
				"Sju vise mästare B, Nådendals klosterbok, Codex Holm A 49",
				"Didrik av Bern, hand A",
   	   	   	   	"Sverige krönika, eller Prosaiska krönikan efter Holm D 26",
				"Konungastyrelsen, Bureus utgåva",
				"Didrik av Bern, hand B",
				"Namnlös och Valentin, ur Codex Holm D 4a",
				"Sju vise mästare C, efter Codex Askabyensis",
				"Historia Trojana, ur Codex Holm D 3a",
				"Sju vise mästare A, ur Codex Holm D 4"
                                ]
			},
		text_date : {label : "date"}
	}
};

settings.corpora["fsv-verser"] = {
        morf : 'fsvm',
	id : "fsv-verser",
	title : "Verser – Fornsvenska textbankens material",
	description : settings.fsvdescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.fsvattributes,
	struct_attributes : {
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Fornsvenska Ordspråk",
				"Erikskrönikan, ur Spegelbergs bok, Codex Holm D2" ,
				"Fredrik av Normandie",
				"Ivan Lejonriddaren, ur SFSS Bd 50 Uppsala 1931",
				"Flores och Blanzeflor",
				"Karlskrönikan"
			]
		},
		text_date : {label : "date"}
	}
};

settings.corpora["fsv-yngrelagar"] = fsv_yngrelagar;

settings.corpora["fsv-yngrereligiosprosa"] = {
	id : "fsv-yngrereligiosprosa",
        morf : 'fsvm',
	title : "Yngre religiös prosa – Fornsvenska textbankens material",
	description : settings.fsvdescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.fsvattributes,
	struct_attributes : {
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Johannes döparens födelse ur Codex Bildstenianus Ups C 528",
				"Jesu lidandes bägare och hans blods utgjutelse",
				"Svenska Medeltidspostillor 1, enligt AM 787",
				"Esthers bok, ur Codex Holm A1",
				"Gregorius av Armenien B, ur Codex Holm A 49 Nådendals klosterbok",
				"Legenden om Sankt Sigfrid, ur Codex Bilstenianus",
				"Legenden om Sankta Jakelina, ur Linköpingslegendariet, Benz 39",
				"S.Johannis Theologi uppenbarelse",
				"Legenden om Sankta Elisabet av Brabant, ur Linköpingslegendariet, Benz 39",
				"Legenden om Sankta Elisabet av Ungern",
				"Legenden om Sankt Joakim, ur Codex Holm A 3",
				"Sankta Anna, enligt Codex Benz 9",
				"Sancta Clara, ur Codex Oxenstiernianus",
				"Sancti Marci Euangelium",
				"Legenden om Sankta Tekla, ur Linköpingslegendariet, Benz 39",
				"Om Erik den helige, efter Codex Vat Reg Lat 525",
				"Legenden om Stephanus påve, ur Linköpingslegendariet, Benz 39, översatt av Herr Jöns Ewangelista",
				"Legenden om Sankt Germanus och Genoveva, ur Codex Holm A 49 Nådendals klosterbok",
				"Legender om Germanus \\(2\\), ur Codex Holm A 49 Nådendals klosterbok",
				"Utdrag ur Legenden om St Mektild, ur Lund Mh 20",
				"Legenden om Sankt Paulus omvändelse, ur Codex Bildstenianus",
				"Legenden om Maria ov Oegnies",
				"Svenska Medeltidspostillor 5, enligt Linc T 181",
				"Legenden om Sankta Felicula och Petronella, ur Linköpingslegendariet, Benz 39'",
				"Legenden om Katarina av Egypten, ur Codex Holm A 3",
				"Svenska Medeltidspostillor 2, enligt Lund Mh 51 och HUB",
				"Legenden om Sankt Alexius ur Linköpingslegendariet",
				"Birgittas uppenbarelser, Sju stycken, fordom i Codex Bergmannius, Lund Mh 20",
				"Birgittas uppenbarelser, återöversättningen, första redaktionen, Bok 7",
				"Sancti Joannisoppenbarilse",
				"Gregorius Stylista, eller Gregorius på stenen, ur Linköpingslegendariet, Benz 39",
				"Själens kloster,översatt av Jöns Budde",
				"Sankt Ansgarii leverne av Rimbertus, ur Codex Holm A 49 Nådendals klosterbok",
				"Vår herres födelse, ur Codex Holm A 3",
				"Bonaventura, kapitel 6",
				"Exodus 16, ur Holm A3",
				"S Stephani saga, ur Linköpingslegendariet, Benz 39, översatt av Johannes Mathei",
				"Ängelens diktamen, ur Codex Oxenstiernianus",
				"Järteckensboken, ur Codex Oxenstiernianus",
				"Gregorius av Armenien A, ur Codex Bergmannius, Lund Mh 20",
				"Legender om Briccius",
				"Legenden om Sankt Macarius Romanus",
				"Legenden om Sankta Amalberga",
				"Legenden om Sankta Phara, ur Linköpingslegendariet, Benz 39",
				"Legenden om Sankta Maria \\(F\\)",
				"Legenden om Sankta Maria \\(E\\), ur Codex Holm A 3",
				"Den heliga Elisabet av Ungerns uppenbarelser A",
				"Patrikssagan, efter Codex Bildstenianus \\(Ups C 528\\)",
				"Bonaventuras betraktelser, Kapitel 7 ur Holm A 3",
				"Sagan om den helige Blasius, ur Codex Oxenstiernianus",
				"Heliga Birgittas uppenbarelser ur Codex Oxenstiernianus",
				"Birgittas uppenbarelser, åttonde boken, ur Cod Holm A 44",
				"Nicodemi evangelium enligt Codex Oxenstiernianus",
				"Apostla gernigar, ur Codex Oxenstiernianus",
				"Judits bok, ur Codex Holm A 1",
				"Lucidarius, redaktion B, ur Holm A 58, Jöns Buddes bok",
				"Sanct Bartholomei moder, eller Kvinnan utan händer, ur Linköpingslegendariet, översatt av Karl Benedictsson",
				"Codex Bildstenianus; strödda legender Hand I",
				"Regula Salvatoris och Revelationes Extravagantes, ur Berlin KB 3762",
				"Legenden om Sankt Albinus",
				"Birgittas uppenbarelser, Birgittinernorska efter Skokloster 5 kvart",
				"Legenden om Erik den helige, ur Codex Bildstenianus Ups C 528",
				"Legenden om Sankta Joleida, ur Linköpingslegendariet, Benz 39",
				"Birgittas uppenbarelser, återöversättingen, andra redaktionen, Bok 4-8",
				"Den heliga Birgittas liv, Vita abbreviata ur Holm A 33",
				"Legenden om Sankta Macra, ur Nådendals klosterbok",
				"Legenden om Johannes Chrysostomus, ur Linköpingslegendariet, Benz 39",
				"Ruths bok, enligt Holm A 1",
				"Legenden om Germanus \\(1b\\), ur Codex Bildstenianus Ups C 528",
				"Elisabet av Ungerns uppenbarelser B",
				"Legender om Genoveva, ur Codex Holm A 49 Nådendals klosterbok",
				"Legenden om Olav den helige, ur Codex Bildstenianus",
				"Stimulus Amoris, efter Cod Holm A 9",
				"Sjusovaresagan, ur Linköpingslegendariet, Benz 39",
				"Katarina av Sverige, ur Codex Holm A 58, Jöns Buddes bok",
				"Legenden om Sankta Rakel, ur Linköpingslegendariet, Benz 39",
				"Birgittas uppenbarelser Bok 1-3, ur Codex Holm A 33",
				"Legeneden om Magnus Jarl av Okenöarna",
				"Bonaventuras betraktelser, Codex Bergmannius, Lund Mh 20",
				"Vitæpatrum - Helga manna lefverne, ur Codex Oxenstiernianus",
				"Legenden om Sankta Otilia, ur Linköpingslegendariet, Benz 39",
				"Heliga Barbara, ur Codex Oxenstiernianus",
				"Legenden om Paulus och Johannes, ur Codex Bildstenianus, hand IV",
				"Själens tröst, ur Codex Holm A 108",
				"Sankt Emerentia och Sankt Anna; översatt från tyska av Lars Elfsson ur Linköpingslegendariet, Benz 39",
				"Karl Magnus, enl Cod Holm D 4",
				"Legenden om Blasius \\(1b\\) ur Ups C 528",
				"Legenden om tre konungar, ur Ups C 528",
				"Legenden om Sankt Servacius",
				"Bonaventuras betraktelser, kapitel 63 ur Holm A 3"
			],
		},
		text_date : {label : "date"}
	}
};

settings.corpora["fsv-yngretankebocker"] = {
        morf : 'fsvm',
	id : "fsv-yngretankebocker",
	title : "Yngre tankeböcker – Fornsvenska textbankens material",
	description : settings.fsvdescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.fsvattributes,
	struct_attributes : {
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Läkebok 1: blandad läkedom, ur Codex AM",
				"Läkebok 11: Månaderna, efter KBs handskrift med gammal signatur K 45, supplerad på Danska ur codex Grensholmensis",
				"Läkebok, 8 ur codex Grensholmensis i Linköping",
				"Läkebok 4, ur Codex Holm A 49",
				"Läkebok 2, ur pappershandskriften Ups C 601",
				"Bondakonst av Peder Månsson",
    	    	    	    	"Läkedomar, codex Ups Benz 22",
				"Läkebok 5 och 6, ur Codex 19 Benz",
				"Läkebok 7, efter Codex linc M 5",
				"Läkebok 10: Zoodiaken, månaderna m m, efter hskr i Rålambska samlingen",
				"Läkedom, efter Peder Månssons handskrift i Linköpings Stiftsbibliotek"
			],
		},
		text_date : {label : "date"}
	}
};

settings.corpora["fsv-nysvenskbibel"] = {
 
	id : "fsv-nysvenskbibel",
	title : "Nysvenska bibelböcker – Fornsvenska textbankens material",
	description : settings.fsvdescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : {},
	struct_attributes : {
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Gustav Vasas Bibel, Markusevanguliet",
				"Gustav Vasas Bibel, Lukasevangeliet"
			]
		},
		text_date : {label : "date"}
	}
};

settings.corpora["fsv-nysvenskdalin"] = {
	id : "fsv-nysvenskdalin",
	title : "Dalin: then swänska argus – Fornsvenska textbankens material",
	description : settings.fsvdescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : {},
	struct_attributes : {
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Dalin: Then Swänska Argus"
			],
		},
		text_date : {label : "date"}
	}
};

settings.corpora["fsv-nysvenskkronikor"] = {
	id : "fsv-nysvenskkronikor",
	title : "Nysvenska krönikor – Fornsvenska textbankens material",
	description : settings.fsvdescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : {},
	struct_attributes : {
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Peder Swarts krönika",
				"Per Brahes krönika",
				"Olaus Petris Krönika, stil B",
				"Olaus Petris Krönika, stil A",
				"Olaus Petris Krönika"
			],
		},
		text_date : {label : "date"}
	}
};

settings.corpora["fsv-nysvenskovrigt"] = {
	id : "fsv-nysvenskovrigt",
	title : "Nysvenska, övrigt – Fornsvenska textbankens material",
	description : settings.fsvdescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : {},
	struct_attributes : {
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Runius: Prosastycken",
				"Mag. Joh. Qvirfelds himmelska örtegårds-sällskap",
				"Gyllenborg: Svenska sprätthöken",
				"Jon Stålhammars brev",
				"Agneta Horns levnadsbeskrivning",
				"Beskrifning öfwer Sweriges Lapmarker 1747 av Pehr Högström, kap 1-4",
				"AnnaVasas brev",
				"Carl Carlsson Gyllenhielms anteckningar",
				"Samuel Columbus: Mål-roo eller Roo-mål",
				"Haqvin Spegel: Dagbok",
				"UrbanHiärne: Stratonice"
			],
		},
		text_date : {label : "date"}
	}
};

settings.corpora["fsv-nysvensklagar"] = {
	id : "fsv-nysvensklagar",
	title : "Nysvenska lagar – Fornsvenska textbankens material",
	description : settings.fsvdescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : { lemma : settings.fsvlemma,
	            lex : settings.fsvlex,
        },
	struct_attributes : {
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Missgiernings Balk",
				"Giftermåls balk \\(1734\\)",
			],
		},
		text_date : {label : "date"}
	}
};


settings.corpora["digidaily-dalpilen"] = {
	morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-dalpilen",
	title : "Dalpilen",
	description : "",
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
	struct_attributes : settings.digidailystruct_attributes,
};



settings.corpora["digidaily-goteborgsweckoblad"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-goteborgsweckoblad",
	title : "Göteborgs weckoblad",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};
	
settings.corpora["digidaily-gotlandstidning"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-gotlandstidning",
	title : "Gotlands tidning",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};


settings.corpora["digidaily-faluposten"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-faluposten",
	title : "Faluposten",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};

settings.corpora["digidaily-fahluweckoblad"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-fahluweckoblad",
	title : "Fahlu weckoblad",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};

settings.corpora["digidaily-jonkopingsbladet"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-jonkopingsbladet",
	title : "Jönköpingsbladet",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};


settings.corpora["digidaily-folketsrost"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-folketsrost",
	title : "Folkets röst",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};

settings.corpora["digidaily-bollnastidning"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-bollnastidning",
	title : "Bollnäs tidning",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};
		

settings.corpora["digidaily-norraskane"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-norraskane",
	title : "Norra Skåne",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};

settings.corpora["digidaily-lindesbergsallehanda"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-lindesbergsallehanda",
	title : "Lindesbergs allehanda",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};

settings.corpora["digidaily-blekingsposten"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-blekingsposten",
	title : "Blekingsposten",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};


settings.corpora["digidaily-postochinrikestidning"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-postochinrikestidning",
	title : "Post- och Inrikes Tidningar",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};

settings.corpora["digidaily-stockholmsposten"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-stockholmsposten",
	title : "Stockholmsposten",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};


settings.corpora["digidaily-kalmar"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-kalmar",
	title : "Kalmar",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};

settings.corpora["digidaily-wernamotidning"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-wernamotidning",
	title : "Wernamo tidning",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};

settings.corpora["digidaily-gotheborgsweckolista"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-gotheborgsweckolista",
	title : "Götheborgs weckolista",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};


settings.corpora["digidaily-ostgotaposten"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-ostgotaposten",
	title : "Östgötaposten",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};

settings.corpora["digidaily-ostergotlandsveckoblad"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-ostergotlandsveckoblad",
	title : "Östergötlands veckoblad",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};

settings.corpora["digidaily-wermlandslanstidning"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-wermlandslanstidning",
	title : "Wermlands läns tidning",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};

settings.corpora["digidaily-tidningforwenersborgsstadochlan"] = {
    morf : 'saldom|dalinm|swedbergm',
	id : "digidaily-tidningforwenersborgsstadochlan",
	title : "Tidning för Wenersborgs stad och län",
	description : digidailydescription,
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : settings.digidailyattributes,
       
	struct_attributes : settings.digidailystruct_attributes,
};




settings.corpora["sdhk-svenska"] = {
	id : "sdhk-svenska",
	title : "Medeltidsbrev - Svenska",
	description : settings.sdhkdescription,
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : {},
	struct_attributes : settings.sdhkstructs
};

settings.corpora["sdhk-norska"] = {
	id : "sdhk-norska",
	title : "Medeltidsbrev - Norska",
	description : settings.sdhkdescription,
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : {},
	struct_attributes : settings.sdhkstructs
};

settings.corpora["sdhk-tyska"] = {
	id : "sdhk-tyska",
	title : "Medeltidsbrev - Tyska",
	description : settings.sdhkdescription,
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : {},
	struct_attributes : settings.sdhkstructs
};

settings.corpora["sdhk-latin"] = {
	id : "sdhk-latin",
	title : "Medeltidsbrev - Latin",
	description : settings.sdhkdescription,
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : {},
	struct_attributes : settings.sdhkstructs
};

settings.corpora["sdhk-ovrigt"] = {
	id : "sdhk-ovrigt",
	title : "Medeltidsbrev - Övriga språk",
	description : settings.sdhkdescription,
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : {},
	struct_attributes : settings.sdhkstructs
};

settings.corpora["tankebok"] = {
    morf : 'swedbergm|dalinm',
	id : "tankebok",
	title : "Stockholms stads tänkeböcker",
	description : "Stockholms stads tänkeböcker från 1626",
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : {
    	posset :  settings.posset,
		lemma : attrs.baseform,
		lex : attrs.lemgram
    },
	struct_attributes : {
		text_date : {label : "date"},
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Stockholms stads tänkebok - Koncept ",
				"Stockholms stads tänkebok - Notariat",
				"Stockholms stads tänkebok - Renskr "
			],
            opts : settings.liteOptions

		},
		paragraph_marginal : {label : "paragraph_marginal"}
	}
};

settings.corpora["lag1734"] = {
    morf : 'swedbergm|dalinm',
	id : "lag1734",
	title : "1734 års lag",
	description : "Materialet utgörs av balkarna i själva lagtexten, förordet samt domarreglerna. Materialet är inskrivet för hand och korrekturläst, men en del fel finns fortfarande kvar.",
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : {
		lemma : attrs.baseform,
		lex : attrs.lemgram,
        typograph : {
            label : "typography",
            type : "set",
			displayType : "select",
			translationKey : "fab_",
			dataset : [
				"bold",
				"smallcaps",
				"headline",
				"marginal",
				"footnote",
				"italic",
				"emphasis"
			],
			opts : settings.liteOptions

        },
    },
	struct_attributes : {
		//paragraph_marginal : {label : "paragraph_marginal"},
		text_date : {label : "date"},
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"1734 års lag Förord",
				"1734 års lag Domareregler",
				"1734 års lag Lagtext",
			],
            opts : settings.liteOptions
		}
	}
};

settings.corpora["forarbeten1734"] = {
    morf : 'swedbergm|dalinm',
	id : "forarbeten1734",
	title : "1734 års förarbeten",
	description : "Förarbetena till 1734 års lag utgörs av material från lagkommissionen till 1734 års lag. Materialet är från 1686–1735, utgivet av Vilhelsm Sjögren 1900–1909. Materialet utgörs av protokoll från sammanträdena (vol. 1–3); lagkommissionens förslag (vol. 4 –6); utlåtanden över lagkommissionens förslag (vol. 7) samt riksdagshandlingar angående lagkommissionens förslag (vol. 8). Materialet är OCR-skannat med manuell efterarbetning.",
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : {
		lemma : attrs.baseform,
		lex : attrs.lemgram,
        typograph : {
            label : "typography",
            type : "set",
			displayType : "select",
			translationKey : "fab_",
			dataset : [
				"bold",
				"smallcaps",
				"headline",
				"marginal",
				"footnote",
				"italic",
				"emphasis"
			],
			opts : settings.liteOptions

        },
    },
	struct_attributes : {
		//paragraph_marginal : {label : "paragraph_marginal"},
		text_date : {label : "date"},
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"1734 års lag Förarbeten vol 1",
				"1734 års lag Förarbeten vol 2",
				"1734 års lag Förarbeten vol 3",
				"1734 års lag Förarbeten vol 4",
				"1734 års lag Förarbeten vol 5",
				"1734 års lag Förarbeten vol 6",
				"1734 års lag Förarbeten vol 7",
				"1734 års lag Förarbeten vol 8"
			],
            opts : settings.liteOptions
		}
	}
};


settings.corpora["lag1800"] = {
    morf : 'saldom|dalinm',
	id : "lag1800",
	title : "Lagar från 1800-talet",
	description : "Regeringsformen 1809 med ändringar 1809-1974, Författningssamling Låssa kyrkas arkiv 1800",
	within : settings.defaultWithin,
	context : settings.spContext,
	attributes : {
    	posset :  settings.posset,
		lemma : attrs.baseform,
		lex : attrs.lemgram,
		saldo : attrs.saldo,
		prefix : attrs.prefix,
		suffix : attrs.suffix
	},
	struct_attributes : {
		text_title : {
			localize : false,
			label : "title",
			displayType : "select",
			dataset : [
				"Författningssamling 1800 Låssa kyrkas arkiv",
				"Regeringsformen 1809 "
			],
            opts : settings.liteOptions

		},
		text_date : {label : "date"},
		text_marginal : {label : "paragraph_marginal"}
	}
};

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

settings.corpora["runeberg-folkbbl"] = {
	morf : 'swedbergm|dalinm|saldom',
	id : "runeberg-folkbbl",
	title : "Folkbiblioteksbladet",
	description : "",
	within : settings.spWithin,
	context : settings.spContext,
	attributes : settings.runebergattributes,
	struct_attributes : settings.runebergstruct_attributes,

};

settings.corpora["runeberg-biblblad"] = {
	morf : 'swedbergm|dalinm|saldom',
	id : "runeberg-biblblad",
	title : "Biblioteksbladet",
	description : "",
	within : settings.spWithin,
	context : settings.spContext,
	attributes : settings.runebergattributes,
	struct_attributes : settings.runebergstruct_attributes,

};


settings.corpora["runeberg-diverse"] = {
	morf : 'swedbergm|dalinm|saldom',
	id : "runeberg-diverse",
	title : "Diverse tidningar",
	description : "Brand, De ungas tidning, Det nya Sverige, Elegant, Hvar 8 dag, Nyare Conversations-Bladet, Sundsvalls tidning, Varia",
	within : settings.spWithin,
	context : settings.spContext,
	attributes : settings.runebergattributes,
	struct_attributes : settings.runebergstruct_attributes,

};

settings.corpora["runeberg-rost"] = {
	morf : 'swedbergm|dalinm|saldom',
	id : "runeberg-rost",
	title : "Rösträtt för kvinnor",
	description : "",
	within : settings.spWithin,
	context : settings.spContext,
	attributes : settings.runebergattributes,
	struct_attributes : settings.runebergstruct_attributes,

};

settings.corpora["runeberg-svtidskr"] = {
	morf : 'swedbergm|dalinm|saldom',
	id : "runeberg-svtidskr",
	title : "Svensk Tidskrift",
	description : "",
	within : settings.spWithin,
	context : settings.spContext,
	attributes : settings.runebergattributes,
	struct_attributes : settings.runebergstruct_attributes,

};
settings.corpora["runeberg-tiden"] = {
	morf : 'swedbergm|dalinm|saldom',
	id : "runeberg-tiden",
	title : "Tiden",
	description : "",
	within : settings.spWithin,
	context : settings.spContext,
	attributes : settings.runebergattributes,
	struct_attributes : settings.runebergstruct_attributes,

};

settings.corpora["runeberg-urdagkron"] = {
	morf : 'swedbergm|dalinm|saldom',
	id : "runeberg-urdagkron",
	title : "Ur Dagens Krönika",
	description : "",
	within : settings.spWithin,
	context : settings.spContext,
	attributes : settings.runebergattributes,
	struct_attributes : settings.runebergstruct_attributes,
};


settings.corpora.kioping = {
	morf : 'swedbergm|dalinm|saldom',
	id : "kioping",
	title : "Nils Matsson Kiöpings resor",
	description : "Reseskildringar från 1674 och 1743",
	within : settings.spWithin,
	context : settings.spContext,
	attributes : {
		msd : attrs.msd,
     		lemma : attrs.baseform,
     		lex : attrs.lemgram,
     		saldo : attrs.saldo,
     		prefix : attrs.prefix,
     		suffix : attrs.suffix,
     		dephead : attrs.dephead,
     		deprel : attrs.deprel,
     		ref : attrs.ref,
		typograph : {
        	    label : "typography",
        	    type : "set",
				displayType : "select",
				translationKey : "fab_",
				dataset : [
					"antikva",
					"smallcaps",
					"headline",
					"italic",
					"unclear",
					"gap"
					//"kustod"
				],
				opts : settings.liteOptions
        	
                }
	},

	struct_attributes : {
		text_date : {label : "date"},
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Een kort Beskriffning Uppå Trenne Reesor och Peregrinationer, sampt Konungarijket Japan",
				"BESKRIFNING Om En RESA GENOM ASIA, AFRICA Och många andra HEDNA LÄNDER "
			],
			opts : settings.liteOptions
		},
                "chapter_name" : {label : "chapter"},
	}


};


settings.corpora['akerbruk'] = {
	morf : 'swedbergm|dalinm|saldom',
	id : "akerbruk",
	title : "Åkerbruk",
	description : "Den Engelska åker-mannen och fåra-herden är översatt från engelska av Jacob Serenius 1727, och är en handbok i åkerbruk och fårskötsel.  En grundelig kundskap om svenska åkerbruket är skriven av Magnus Stridsberg 1727, och är en handbok om åkerbruk.",
	within : settings.spWithin,
	context : settings.spContext,
	attributes : {
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
		text_date : {label : "date"},
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
                                "Engelska Åker-Mannen.",
                                "En kort beskrifning om jordförbättring med gräsfröen.",
                                "En Grundelig Kundskap Om Swenska Åkerbruket / Först I Gemen."
	
		],
			opts : settings.liteOptions
		},
                "chapter_name" : {label : "chapter"},
	}


};

settings.corpora['kvah'] = {
	morf : 'swedbergm|dalinm|saldom',
	id : "kvah",
	title : "KVAH",
	description : "18 artiklar från kungliga vetenskapsakademiens handlingar. Alla artiklarna handlar om åkerbruk och gödsel. De är från 1740–1778.",
	within : settings.spWithin,
	context : settings.spContext,
	attributes : {
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
		text_date : {label : "date"},
		text_title : {
			label : "title",
			displayType : "select",
			localize : false,
			dataset : [
				"Swar på den andra frågan, i 2. Qvartalet : huruledes säden på en åker må ständigt kunna ökas til 40 kornet.",
				"Herr Inspectoren BRANDBERGS RÖN och Försök til Landtbrukets förbättrande.Framgifne Af SAM: SCHULTZE",
				"BESKRIFNING På En ny Sånings-Machine, påfunnen och til Kongl. Vetensk. Academien ingifven, Af DANIEL THUNBERG. ",
				"BESKRIFNING på Tork-Häsjor och Trösk-vagnar, som brukas i Wäster-Norrland, Ingifven af NILS GISSLER, M. D. Lector vid Hernösands Gymnasium.",
				"Tankar om Landtbrukets upodlande genom ymnig ock god Gödsels samlande i Städerna.",
				"Skolmästaren Herr ANDERS HELLSTRÖMS FÖRSÖK at förbättra Sånings-Machiner",
				"ÅKER-REDSKAP Af Järn, inrättade af H. Baron. J.BRAUNER." ,
				"Påminnelse vid sättet at göda åkrar; af JOH. J. HAARTMAN, M.D. med. Professor i Åbo, Ridd. af K. Wasa Orden.",
				"Om obrunnen gödsels förmån på åkrar, framför den som är brunnen. af PEHR WASSTRÖM",
				" BESKRIFNING På de i Norrland brukelige Trösk-vältar, af PEHR HELLZÉN, lector vid Hernösands Gymnasium.",
				"Om Sånings-Machins förbättring ock nytta",
				"Et sätt at göda och så vigare, än med Sånings Machin Af SACHAR. WESTBCK ",
				"Et ankommit Bref om Sånings- under Namn af  .",
				"Rön om Åkerbrukets nyttiga främjande medelst Utsädets och Gödslens wissa besparning. Framgifwit af SACHARIAS WESTBECK, Kyrkoherde uti Öst-Löfsta Församling i .",
				" Försök til Säds utsåning med Machine, anstälde på Fullerö Sätesgård, år 1759, Af CARL JOHAN CRONSTEDT.",
				"Om en ny påfunnen Tuf-Plog."
	
		],
			opts : settings.liteOptions
		},
                "chapter_name" : {label : "chapter"},
	}


};





settings.corpusListing = new CorpusListing(settings.corpora);
