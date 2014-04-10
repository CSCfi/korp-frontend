// -*- coding: utf-8 -*-

settings.primaryColor = "#edfcd5";
settings.primaryLight = "#f7fceb";
settings.autocomplete = true;
settings.lemgramSelect = true;
settings.wordpicture = false;

$("#lemgram_list_item").remove();
$("#results-lemgram").remove();

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

settings.corpora = {};
settings.corporafolders = {};


settings.corporafolders.klk_sv = {
    title : "Kansalliskirjaston lehtikokoelman (KLK) ruotsinkieliset lehdet"
};


// Generate settings.corpora and settings.corporafolders for the
// Swedish KLK corpora by using functions defined in config.js

settings.fn.make_corpus_settings_by_year_decade(
    settings.corporafolders.klk_sv, "sv_{decade}", "klk_sv_{year}",
    function(decade) {
	return { title : decade.toString() + "-luku" };
    },
    function(year) {
	return settings.fn.make_klk_corpus_settings(
	    "KLK ruotsi {year}",
	    "Kansalliskirjaston ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta {year}",
	    year);
    },
    [1986, 1983, 1982].concat(
	settings.fn.make_yearlist(1771, 1948,
				  {descending : true,
				   omit : [1779, 1780, 1781, 1786, 1787, 1788,
					   1790]}))
);


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
