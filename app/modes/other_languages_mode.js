// -*- coding: utf-8 -*-

settings.primaryColor = "#ffe7d2";
settings.primaryLight = "#fff4eb";
settings.autocomplete = true;
settings.lemgramSelect = true;
settings.wordpicture = false;

$("#lemgram_list_item").remove();
$("#results-lemgram").remove();


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


settings.corporafolders.english = {
    title : "Englanninkielisiä tekstejä",
    contents : ["mulcold_en", "topling"]
};

settings.corporafolders.german = {
    title : "Saksankielisiä tekstejä",
    contents : ["mulcold_de"],
    unselected : true
};

settings.corporafolders.russian = {
    title : "Venäjänkielisiä tekstejä",
    contents : ["legal_ru", "mulcold_ru"],
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

settings.corpora.legal_ru = {
    id : "legal_ru",
    title: "FiRuLex venäjä",
    description : "Jurdisia tekstejä (venäjä)",
    context : settings.defaultContext, 
    within : settings.defaultWithin, 
    attributes: attrlist.mulcold_ru,
    struct_attributes : sattrlist.legal
};

settings.corpora.topling = {
    id : "topling",
    title : "TOPLING (näytteitä)",
    description : "TOPLING (näytteitä)",
    context : settings.spContext,
    within : settings.spWithin,
    limited_access : true,
    licence_type : "RES",
    unselected : true,
    attributes : attrlist.topling,
    struct_attributes : sattrlist.topling
};

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
    unselected : true
};


var locally_available_corpora = ["(mulcold|legal)_.."];

if (! isPublicServer) {
    settings.fn.remove_matching_corpora(locally_available_corpora, true);
} else {
    settings.fn.remove_matching_corpora(["test.*"]);
}

delete locally_available_corpora;


settings.corpusListing = new CorpusListing(settings.corpora);
