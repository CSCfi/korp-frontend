// -*- coding: utf-8 -*-

settings.primaryColor = "#edfcd5";
settings.primaryLight = "#f7fceb";
settings.autocomplete = true;
settings.lemgramSelect = true;
settings.wordpicture = false;

$("#lemgram_list_item").remove();
$("#results-lemgram").remove();


settings.corpora = {};
settings.corporafolders = {};


settings.corpora.mulcold_sv = {
    id : "mulcold_sv",
    title: "MULCOLD ruotsi",
    description : "Multilingual Corpus of Legal Documents, ruotsinkielinen osa",
    context : settings.defaultContext, 
    within : settings.defaultWithin, 
    attributes: attrlist.mulcold_sv,
    struct_attributes : sattrlist.mulcold,
};


settings.corpusListing = new CorpusListing(settings.corpora);
