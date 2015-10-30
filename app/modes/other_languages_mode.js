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
    title : "Englanninkielisiä tekstejä",
    contents : ["mulcold_en", "topling"]
};

settings.corporafolders.german = {
    title : "Saksankielisiä tekstejä",
    contents : ["mulcold_de"],
    // unselected : true
};

settings.corporafolders.russian = {
    title : "Venäjänkielisiä tekstejä",
    contents : ["legal_ru", "mulcold_ru"],
    // unselected : true
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


var locally_available_corpora = ["(mulcold|legal)_.."];

if (! isPublicServer) {
    settings.fn.remove_matching_corpora(locally_available_corpora, true);
} else {
    settings.fn.remove_matching_corpora(["test.*"]);
}

delete locally_available_corpora;


settings.fn.add_attr_extra_properties(settings.corpora);


settings.corpusListing = new CorpusListing(settings.corpora);
