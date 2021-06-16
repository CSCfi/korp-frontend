var modernAttrs2 = _.extend({}, modernAttrs, {
    ne_ex: attrs.ne_ex,
    ne_type: attrs.ne_type,
    ne_subtype: attrs.ne_subtype,
    ne_name: attrs.ne_name,
    complemgram: {
        label: "complemgram",
        internalSearch: true,
        ranked: true,
        display: {
            expandList: {
                splitValue: function(value) { return value.split("+"); },
                searchKey: "lex",
                joinValues: " + ",
                stringify: function(lemgram) { return util.lemgramToString(lemgram, true); },
                linkAllValues: true
            }
        },
        type: "set",
        hideStatistics: true,
        hideExtended: true,
        hideCompare: true
    },
    compwf: {
        label: "compwf",
        display: {
            "expandList": {}
        },
        type: "set",
        hideStatistics: true,
        hideExtended: true,
        hideCompare: true
    },
    sense: {
        label: "sense",
        type: "set",
        ranked: true,
        display: {
            expandList: {
                internalSearch: function(key, value) { return "[" + key + " = '\\|" + regescape(value) + ":.*']"},
            }
        },
        stringify: function(sense) { return util.saldoToString(sense, true); },
        opts: settings.probabilitySetOptions,
        externalSearch: "https://spraakbanken.gu.se/karp/#?search=extended||and|sense|equals|<%= val %>",
        internalSearch: true,
        extended_template: settings.senseAutoComplete
    }
});
delete modernAttrs2.saldo;


// Proper nouns for TDT, FTB and LA annotations.
settings.placenameConstraint =
    "msd='.*\\b(SUBCAT_)?(Prop|PROP)\\b.*' | pos='n:prop'";

// Corpus and corpus folder label texts, to be appended to corpus
// title in parentheses
settings.corpus_label_texts = {
    // Should this be "beeta"?
    beta: "beta",
    test: "testi",
};


settings.corpora = {};
settings.corporafolders = {};


/*
 * FOLDERS
 */

settings.corporafolders = {};

/*
settings.corporafolders.sv = {
    title: "Svenska texter",
    contents: ["testcorpus"]
};
*/

settings.corporafolders.agricola = {
    title: "Agricola",
    description: "Mikael Agricolan teosten morfosyntaktinen tietokanta",
    contents: [
	"agricola_abckiria",
	"agricola_kasikiria",
	"agricola_messu",
	"agricola_piina",
	"agricola_profeetat",
	"agricola_psaltari",
	"agricola_rucouskiria",
	"agricola_sewsitestamenti",
	"agricola_veisut",
    ],
    info: {
	metadata_urn: "urn:nbn:fi:lb-2019121804",
        homepage_url: "http://www.utu.fi/fi/yksikot/hum/yksikot/suomi-sgr/palvelut-yhteistyo/arkistot/Sivut/home.aspx",
	urn: "urn:nbn:fi:lb-2019121803",
	cite_id: "agricola-v1-1-korp",
	shortname: "agricola-v1-1-korp",
	licence: settings.licenceinfo.CC_BY_ND_40,
	iprholder: {
	    name: "Turun yliopisto; Kotimaisten kielten keskus",
	},
    }    
};


settings.corporafolders.ethesis = {
    title: "E-thesis",
    contents: ["ethesis_maabs", "ethesis_dissabs"],
    info: {
	cite_id: "e-thesis-fi",
    }
};

settings.corporafolders.ethesis.matheses = {
    title: "Pro gradu -tutkielmat",
    contents: ["ethesis_ma_ai", "ethesis_ma_bio", "ethesis_ma_el", "ethesis_ma_far", "ethesis_ma_hum", "ethesis_ma_beh",
		"ethesis_ma_med", "ethesis_ma_mm", "ethesis_ma_sci", "ethesis_ma_ot", "ethesis_ma_teo", "ethesis_ma_valt"]
};

settings.corporafolders.ethesis.phdtheses = {
    title: "Väitöskirjat",
    contents: ["ethesis_phd_bio", "ethesis_phd_el", "ethesis_phd_far", "ethesis_phd_hum", "ethesis_phd_beh",
		"ethesis_phd_med", "ethesis_phd_mm", "ethesis_phd_ot", "ethesis_phd_teo", "ethesis_phd_valt"]
};

settings.corporafolders.ftb = {
    title: "FinnTreeBank: suomen puupankki",
    contents: ["ftb2"]
};

settings.corporafolders.ftb.ftb3 = {
    title: "FinnTreeBank 3",
    info: {
	urn: "urn:nbn:fi:lb-2016051001",
	metadata_urn: "urn:nbn:fi:lb-2016042602",
	licence: settings.licenceinfo.CC_BY_30,
	cite_id: "FinnTreeBank3-korp",
    },
    contents: ["ftb3_europarl", "ftb3_jrcacquis"]
};

settings.corporafolders.klk_fi = {
    title: "Kansalliskirjaston lehtikokoelman (KLK) suomenkieliset lehdet",
    description: "Kansalliskirjaston sanoma- ja aikakauslehtikokoelma, Kielipankki-versio, suomenkieliset lehdet",
    info: {
	urn: "urn:nbn:fi:lb-201405275",
	metadata_urn: "urn:nbn:fi:lb-201405276",
	licence: settings.licenceinfo.CC_BY,
	cite_id: "KLK-fi",
    }
};

/*
settings.corporafolders.kotus = {
    title: "Kotuksen korpuksia (näytteitä)",
    contents: ["kotus_klassikot", "kotus_sananparret"]
};
*/

/*
settings.corporafolders.kotus.ns = {
    title: "Nykysuomen aineistoja (näytteitä)",
    contents: ["ns_presidentti", "ns_saadokset"]
};
*/

/*
settings.corporafolders.la = {
    title: "Lauseopin arkisto",
    contents: ["la_murre", "las2"]
};

settings.corporafolders.sks = {
    title: "SKS:n aineistoja",
    contents: ["sks_kivi_fi", "skvr"]
};
*/

settings.corporafolders.kal = {
    title: "Kotuksen aikakauslehtikorpus",
    description: "Kotimaisten kielten keskuksen aikakauslehtikorpus",
    info: {
	metadata_urn: "urn:nbn:fi:lb-201407301",
	limited_access: true,
	licence_type: "ACA",
    }
};

settings.corporafolders.kal.kal_perus = {
    title: "Kotuksen aikakauslehtikorpus, tarkistamaton",
    description: "Kotimaisten kielten keskuksen aikakauslehtikorpus, OCR tarkistamaton",
    contents: ["kal_perus_ha", "kal_perus_la", "kal_perus_sk", "kal_perus_su"],
    info: {
	urn: "urn:nbn:fi:lb-2018060706",
	metadata_urn: "urn:nbn:fi:lb-2018060702",
	cite_id: "kotus-al-unrev-korp",
	licence: {
	    name: "CLARIN ACA +NC +DEP 1.0",
	    urn: "urn:nbn:fi:lb-2021030304",
	}
    }
};

settings.corporafolders.kal.kal_ydin = {
    title: "Kotuksen aikakauslehtikorpus, tarkistettu",
    description: "Kotimaisten kielten keskuksen aikakauslehtikorpus, OCR tarkistettu",
    contents: ["kal_ydin_ha", "kal_ydin_la", "kal_ydin_sk", "kal_ydin_su"],
    info: {
	urn: "urn:nbn:fi:lb-2018060705",
	metadata_urn: "urn:nbn:fi:lb-2018060701",
	cite_id: "kotus-al-rev-korp",
	licence: {
	    name: "CLARIN ACA +NC +DEP 1.0",
	    urn: "urn:nbn:fi:lb-2021030302",
	}
    }
};


settings.corporafolders.literature = {
    title: "Kirjallisuutta",
    contents: ["gutenberg", "sks_kivi_fi", "skvr",
	       "parfin_2016_fi", "parrus_2016_fi", "iijoki"]
};

settings.corporafolders.literature.kaannossuomi = {
    title: "Käännössuomen korpus",
    description: "Käännössuomen korpus on koostettu vuonna 1999 nykyisessä Itä-Suomen yliopistossa (silloisessa Joensuun yliopistossa sen kansainvälisen viestinnän laitoksella) Suomen Akatemian professori Anna Maurasen johtamassa tutkimushankkeessa Käännössuomi ja kääntämisen universaalit.<br/><br/>Korpus sisältää kaksi osaa: aluperin suomeksi kirjoitettua kieltä (alkusuomi) ja eri kielistä käännettyä kieltä (käännössuomi). Seuraavat tekstilajit ovat edustettuina aineistoissa: akateemiset tekstit, kaunokirjallisuus, lastenkirjallisuus, biografia, populaarikirjallisuus, viihdekirjallisuus, dekkarikirjallisuus ja tietokirjallisuus. Alkusuomen aineiston laajuus on yhteensä 5 465 293 sanaa ja käännössuomen aineiston 7 135 969 sanaa.",
    info: {
	urn: "urn:nbn:fi:lb-2019100803",
	metadata_urn: "urn:nbn:fi:lb-2019100801",
	licence: {
	    name: "CLARIN RES +NC +DEP 1.0",
	    urn: "urn:nbn:fi:lb-2019100805",
	},
	cite_id: "kaannossuomi-korp",
    },
    contents: ["alkusuomi", "kaannossuomi"]
};

settings.corporafolders.literature.skk = {
    title: "Suomalaisen kirjallisuuden klassikoita",
    contents: ["skk_aho","skk_canth","skk_finne","skk_jarnefelt","skk_kailas","skk_lassila","skk_linnankoski","skk_kramsu","skk_lehtonen","skk_leino","skk_pakkala","skk_siljo","skk_sodergran","skk_wilkuna"],
    info: {
	urn: "urn:nbn:fi:lb-2015022401",
	metadata_urn: "urn:nbn:fi:lb-20140730186",
	licence: settings.licenceinfo.EUPL_11,
	homepage: settings.fn.kaino_homepage("klassikot/meta/klassikot"),
	cite_id: "SKK",
    }
};

/*,"skk_canth","skk_finne","skk_jarnefelt","skk_kailas","skk_lassila","skk_linnankoski","skk_kramsu","skk_lehtonen","skk_\
leino","skk_pakkala","skk_siljo","skk_sodergran","skk_wilkuna"]
*/

settings.corporafolders.literature.ceal = {
    title: "CEAL",
    description: "Englantilaisen ja amerikkalaisen kirjallisuuden klassikoita suomeksi<br/>Classics of English and American Literature in Finnish<br/><br/><strong>Huomaa</strong>, että korpukset CEAL-o ja CEAL-s sisältävät samat tekstit, mutta CEAL-s:ssä kappaleet on sekoitettu kunkin teoksen sisällä, kun taas CEAL-o:ssa kappaleet ovat alkuperäisessä järjestyksessä. Hakuja varten kannattaa valita vain toinen korpus. CEAL-o vaatii aina henkilökohtaisen käyttöluvan.",
    info: {
	metadata_urn: "urn:nbn:fi:lb-2016110901",
	iprholder: {
	    name: "Kersti Juva",
	},
    },
    contents: ["ceal_o", "ceal_s"]
};

settings.corporafolders.legal = {
    title: "Juridisia tekstejä",
    contents: ["kotus_lakidir", "legal_fi", "mulcold_fi", "semfinlex"]
};

settings.corporafolders.internet = {
    title: "Internet-keskusteluaineistoja",
    contents: ["s24", "ylilauta", "hsfi"]
};

settings.corporafolders.internet.suomi24_2017h2 = {
    title: "Suomi24 2001–2017",
    // TODO: Change VRT download and metadata URN to point to the new
    // version when it is available
    description: "Suomi24 virkkeet -korpus 2001–2017, Korp-versio 1.2<br/><a href='http://keskustelu.suomi24.fi' target='_blank'>Suomi24-keskustelupalvelun</a> keskustelut vuosilta 2001–2017 (1.1.2001–31.12.2017).<br/>Aineistossa näkyy kaikkien keskustelujen sisältö enintään kappaletasolla.<br/>Aineisto on jaettu osakorpuksiin vuosittain.<br/>Tutkijat voivat myös ladata käyttöönsä <a href='http://urn.fi/urn:nbn:fi:lb-2019010801' target='_blank' title='Kuvailutiedot'>koko Suomi24 2001–2017 -aineiston</a> Kielipankin <a href='http://urn.fi/urn:nbn:fi:lb-2019010802' target='_blank'>latauspalvelusta</a> (<a href='http://urn.fi/urn:nbn:fi:lb-20150304151' target='_blank'>lisenssi</a>).<br/><br/>(Tämä aineisto näkyi beetatestausvaiheessa Korpissa nimellä <i>Suomi24 virkkeet -korpus (2017H2)</i> ja aineiston ensimmäinen versio nimellä <i>Suomi24 2017H2</i>.)<br/><br/>2021-04-21: Aineistosta on nyt käytössä päivitetty versio 1.2, jonka kuhunkin virkkeeseen on lisätty virkkeen tunnetilaa (sentiment) ilmaiseva polaarisuustieto (positiivinen, neutraali, negatiivinen). Polaarisuustieto on tuotettu luokittimella, joka on opetettu <a href='https://arxiv.org/pdf/2012.02613.pdf' target='_blank'>FinnSentiment-aineistolla</a>.<br/><br/>2020-02-20: Aineistosta on nyt käytössä korjattu versio 1.1. Se sisältää aiemmasta versiosta vuosilta 2009–2012 ja 2014 puuttuneet kirjoittajan nimimerkkitiedot, ja kaikissa nimimerkeissä merkit <i>'</i>, <i>\"</i> ja <i>&amp;</i> näkyvät sellaisinaan, eivät <i>&amp;apos;</i>, <i>&amp;quot;</i> ja <i>&amp;amp;</i>. Lisäksi aineiston nimessä on korvattu <i>2017H2</i> vuosivälillä <i>2001–2017</i>.<br/><br/>2020-01-21: Aineiston dependenssijäsennykset ja -relaatiot on korjattu 2019-12-19. Myös sanakuva toimii periaatteessa, mutta aineiston koon vuoksi valitettavasti ei aina käytännössä. Selvitämme asiaa. Nimientunnistustiedot ovat toistaiseksi vain vanhemmassa Suomi24 2016H2 -aineistossa.</strong>",
    contents: [
	"s24_2001",
	"s24_2002",
	"s24_2003",
	"s24_2004",
	"s24_2005",
	"s24_2006",
	"s24_2007",
	"s24_2008",
	"s24_2009",
	"s24_2010",
	"s24_2011",
	"s24_2012",
	"s24_2013",
	"s24_2014",
	"s24_2015",
	"s24_2016",
	"s24_2017",
    ],
    info: {
	urn: "urn:nbn:fi:lb-2020021804",
	metadata_urn: "urn:nbn:fi:lb-2020021803",
	licence: settings.licenceinfo.CC_BY_NC,
	homepage_url: "http://keskustelu.suomi24.fi",
	cite_id: "suomi24-2001-2017-korp-v1-2",
	shortname: "suomi24-2001-2017-korp-v1-2",
    }
};

settings.corporafolders.internet.suomi24 = {
    title: "Suomi24 2016H2",
    description: "<a href='http://keskustelu.suomi24.fi' target='_blank'>Suomi24-keskustelupalvelun</a> keskustelut 1.1.2001–24.9.2016.<br/><br/><strong>Huomaa</strong>, että aineisto ei ole kattava mainitulta aikaväliltä. <strong>Käytä ensisijaisesti uudempaa ja selvästi kattavampaa <a href='http://urn.fi/urn:nbn:fi:lb-2019021101' target='_blank'>Suomi24 2017H2 -aineistoa</a></strong>, jollet tarvitse vertailukelpoisuutta tähän aineistoon perustuvan tutkimuksen kanssa.<br/><br/>Aineistossa näkyy kaikkien keskustelujen sisältö enintään kappaletasolla.<br/>Aineisto on jaettu useaan osakorpukseen suuren kokonsa vuoksi.<br/>Tutkijat voivat myös ladata käyttöönsä <a href='http://urn.fi/urn:nbn:fi:lb-201412171' target='_blank' title='Kuvailutiedot'>koko Suomi24-aineiston</a> Kielipankin <a href='http://urn.fi/urn:nbn:fi:lb-2015040801' target='_blank'>latauspalvelusta</a> (<a href='http://urn.fi/urn:nbn:fi:lb-20150304151' target='_blank'>lisenssi</a>).<br/><br/>(Tämä aineisto näkyi ennen Suomi24 2017H2 -version julkaisemista Korpissa nimellä <i>Suomi24</i>.)",
    contents: [
	"s24_001",
	"s24_002",
	"s24_003",
	"s24_004",
	"s24_005",
	"s24_006",
	"s24_007",
	"s24_008",
	"s24_009",
	"s24_010"
    ],
    info: {
	urn: "urn:nbn:fi:lb-2015120401",
	metadata_urn: "urn:nbn:fi:lb-2017021505",
	licence: settings.licenceinfo.CC_BY_NC,
	homepage_url: "http://keskustelu.suomi24.fi",
	cite_id: "Suomi24-korp-2016H2",
    }
};

settings.corporafolders.lehdet = {
    title: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä",
    info: {
	urn: "urn:nbn:fi:lb-201711241",
	metadata_urn: "urn:nbn:fi:lb-2017091901",
	licence: settings.licenceinfo.CC_BY_40,
	cite_id: "lehdet90ff-v2",
    }
};

settings.corporafolders.lehdet.tiedelehdet = {
    title: "Tiedelehtiä",
    description: "1990- ja 2000-luvun suomalaisia tiedelehtiä",
}

settings.corporafolders.lehdet.tiedelehdet.ag = {
    title: "A–G",
    description: "1990- ja 2000-luvun suomalaisia tiedelehtiä (A–G-alkuiset)",
    contents: [
	"tiedelehdet_30paivaa",
	"tiedelehdet_aakusti",
	"tiedelehdet_agricola",
	"tiedelehdet_aidinkieli",
	"tiedelehdet_aikuiskasvatus",
	"tiedelehdet_aluejaymparisto",
	"tiedelehdet_ammattikasvatuksen_aikakauskirja",
	"tiedelehdet_apollon",
	"tiedelehdet_areiopagi",
	"tiedelehdet_ats",
	"tiedelehdet_auraica",
	"tiedelehdet_automaatiovayla",
	"tiedelehdet_avain",
	"tiedelehdet_baptria",
	"tiedelehdet_bryobrotherella",
	"tiedelehdet_diakonia",
	"tiedelehdet_elo",
	"tiedelehdet_ennenjanyt",
	"tiedelehdet_geofoorumi",
	"tiedelehdet_geologi",
	"tiedelehdet_glossae",
	]
};

settings.corporafolders.lehdet.tiedelehdet.hk = {
    title: "H–K",
    description: "1990- ja 2000-luvun suomalaisia tiedelehtiä (H–K-alkuiset)",
    contents: [
	"tiedelehdet_harukaze",
	"tiedelehdet_havina",
	"tiedelehdet_hiidenkivi",
	"tiedelehdet_historiallinen",
	"tiedelehdet_historianystava",
	"tiedelehdet_idantutkimus",
	"tiedelehdet_ilmansuojelu",
	"tiedelehdet_informaatio",
	"tiedelehdet_janus",
	"tiedelehdet_hykirjasto",
	"tiedelehdet_kasvu",
	"tiedelehdet_kieliskooppi",
	"tiedelehdet_kliinlab",
	"tiedelehdet_kognitiivinen",
	"tiedelehdet_kompositio",
	"tiedelehdet_kosmopolis",
	"tiedelehdet_kulttuurintutkimus",
	"tiedelehdet_kulutustutkimus",
	"tiedelehdet_kunnallistiede",
	"tiedelehdet_kuntoutus",
	]
};

settings.corporafolders.lehdet.tiedelehdet.lp = {
    title: "L–P",
    description: "1990- ja 2000-luvun suomalaisia tiedelehtiä (L–P-alkuiset)",
    contents: [
	"tiedelehdet_liikenteensuunta_v2",
	"tiedelehdet_liiketalous",
	"tiedelehdet_liikuntajatiede",
	"tiedelehdet_lounaishame",
	"tiedelehdet_maaseudunuusiaika",
	"tiedelehdet_matkailututkimus",
	"tiedelehdet_mediajaviestinta",
	"tiedelehdet_metsatiede",
	"tiedelehdet_muinaistutkija",
	"tiedelehdet_musiikinsuunta",
	"tiedelehdet_musiikkikasv",
	"tiedelehdet_niinnain_v2",
	"tiedelehdet_nimi",
	"tiedelehdet_nayttamo_tutkimus",
	"tiedelehdet_poliittinentalous",
	"tiedelehdet_prologi",
	"tiedelehdet_psykologia",
	]
};


settings.corporafolders.lehdet.tiedelehdet.rs = {
    title: "R–S",
    description: "1990- ja 2000-luvun suomalaisia tiedelehtiä (R–S-alkuiset)",
    contents: [
	"tiedelehdet_rakmek",
	"tiedelehdet_ravitsemus",
	"tiedelehdet_ruralia",
	"tiedelehdet_sananjalka",
	"tiedelehdet_siirtolaisuus",
	"tiedelehdet_skas",
	"tiedelehdet_skeptikko",
	"tiedelehdet_skholion",
	"tiedelehdet_solubiologi",
	"tiedelehdet_sosiaalilaaketiede",
	"tiedelehdet_sosiologia",
	"tiedelehdet_suo",
	"tiedelehdet_susa",
	"tiedelehdet_kirkkohistoria",
	"tiedelehdet_sydanaani",
	"tiedelehdet_synnyt",
	]
};

settings.corporafolders.lehdet.tiedelehdet.ty = {
    title: "T–Y",
    description: "1990- ja 2000-luvun suomalaisia tiedelehtiä (T–Y-alkuiset)",
    contents: [
	"tiedelehdet_tahiti",
	"tiedelehdet_taimiuutiset",
	"tiedelehdet_teologinen",
	"tiedelehdet_terminfo",
	"tiedelehdet_terra",
	"tiedelehdet_thanatos",
	"tiedelehdet_tiedejaase",
	"tiedelehdet_tieteessatapahtuu",
	"tiedelehdet_tktlehti",
	"tiedelehdet_tietolinja",
	"tiedelehdet_toksikologi",
	"tiedelehdet_transmitteri",
	"tiedelehdet_trio",
	"tiedelehdet_tutkimustiedote",
	"tiedelehdet_tutkivasos",
	"tiedelehdet_tyoelama",
	"tiedelehdet_ura",
	"tiedelehdet_uskonnontutkija",
	"tiedelehdet_vartija",
	"tiedelehdet_versus",
	"tiedelehdet_virittaja",
	"tiedelehdet_walbum",
	"tiedelehdet_yhdyskuntasuunnittelu",
	"tiedelehdet_yhteiskuntapolitiikka",
	"tiedelehdet_ymparistohistoria",
    ]
};

settings.corporafolders.lehdet.muut_lehdet = {
    title: "Muita lehtiä",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä",
}

settings.corporafolders.lehdet.muut_lehdet.a = {
    title: "A",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (A-alkuiset)",
    contents: [
	"lehdet_aalto_university_magazine",
	"lehdet_aarre",
	"lehdet_aino",
	"lehdet_ajolinja",
	"lehdet_akavalainen",
	"lehdet_allergia",
	"lehdet_ammattisotilas",
	"lehdet_amnesty",
	"lehdet_ananda",
	"lehdet_animalia",
	"lehdet_anti",
	"lehdet_antimilitaristi_sivari",
	"lehdet_apaja",
	"lehdet_aplodi",
	"lehdet_arkkitehtiuutiset",
	"lehdet_aromi",
	"lehdet_aselehti",
	"lehdet_askel",
	"lehdet_asukas",
	"lehdet_asukki",
	"lehdet_asuminen_yhteiskunta",
	"lehdet_asuntoinfo",
	"lehdet_aurora",
	"lehdet_avainlehti",
	"lehdet_avec",
	"lehdet_avec_perhelehti",
	"lehdet_avh",
	"lehdet_avvisio",
  ]
};

settings.corporafolders.lehdet.muut_lehdet.bcd = {
    title: "B, C, D",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (B-, C- ja D-alkuiset)",
    contents: [
	"lehdet_bof_online",
	"lehdet_canews",
	"lehdet_cplehti",
	"lehdet_curly",
	"lehdet_debatti",
	"lehdet_diabetes_ja_laakari",
	"lehdet_diakonia",
    ]
}

settings.corporafolders.lehdet.muut_lehdet.e = {
    title: "E",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (E-alkuiset)",
    contents: [
	"lehdet_edimensio",
	"lehdet_effortti",
	"lehdet_ekonomi",
	"lehdet_elinehto",
	"lehdet_elamantahdet_terve",
	"lehdet_elamassa_kelansanomat",
	"lehdet_elore",
	"lehdet_emma",
	"lehdet_entisesta_enemman",
	"lehdet_ernie",
	"lehdet_espanjan_sanomat",
	"lehdet_espoo",
	"lehdet_esri",
	"lehdet_ethnos",
	"lehdet_eurooppalainen",
	"lehdet_euro_talous",
	"lehdet_evento",
     ]
}

settings.corporafolders.lehdet.muut_lehdet.f = {
    title: "F",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (F-alkuiset)",
    contents: [
	"lehdet_focus",
	"lehdet_folium_classicum",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.h = {
    title: "H",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (H-alkuiset)",
    contents: [
	"lehdet_hkaksi",
	"lehdet_haagalainen",
	"lehdet_haavi",
	"lehdet_hallaus",
	"lehdet_helen",
	"lehdet_helmeri",
	"lehdet_helmi",
	"lehdet_helsinginhenki",
	"lehdet_helsinki_info",
	"lehdet_hengitys",
	"lehdet_heppu",
	"lehdet_hervannan_sanomat",
	"lehdet_hima",
	"lehdet_hopealeijona",
	"lehdet_huili",
	"lehdet_humanistilehti",
	"lehdet_husari",
	"lehdet_hyva_asukas",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.ij = {
    title: "I, J",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (I- ja J-alkuiset)",
    contents: [
	"lehdet_impakti",
	"lehdet_infors",
	"lehdet_infront",
	"lehdet_jane_paulo",
	"lehdet_jargonia",
	"lehdet_joensuun_uutiset",
	"lehdet_julkaisija",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.k = {
    title: "K",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (K-alkuiset)",
    contents: [
	"lehdet_kalastuslehti",
	"lehdet_kalpa",
	"lehdet_kansanopisto",
	"lehdet_karhunkierros",
	"lehdet_karhunpalvelus",
	"lehdet_kauppapolitiikka",
	"lehdet_kaupunkilainen",
	"lehdet_kehittaja",
	"lehdet_kemia_kemi",
	"lehdet_kemilainen",
	"lehdet_kerberos",
	"lehdet_keski_espoon_sanomat",
	"lehdet_keva",
	"lehdet_kide",
	"lehdet_kide_taidelehti",
	"lehdet_kielipolku_dysfasia",
	"lehdet_kirjo",
	"lehdet_kita",
	"lehdet_koiviston_viesti",
	"lehdet_kontakt",
	"lehdet_koor",
	"lehdet_koti",
	"lehdet_kotipuutarha",
	"lehdet_kotosalla",
	"lehdet_kuljetusyrittaja",
	"lehdet_kulttuurivihkot",
	"lehdet_kumina",
	"lehdet_kumposti",
	"lehdet_kunnallissuomi",
	"lehdet_kuuloset",
	"lehdet_kuuloviesti",
	"lehdet_kynnys",
	"lehdet_kyvyt_kayttoon_vates",
	"lehdet_kaytannon_maamies",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.l = {
    title: "L",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (L-alkuiset)",
    contents: [
	"lehdet_lapsenmaailma",
	"lehdet_legenda",
	"lehdet_leija",
	"lehdet_luokanopettaja",
	"lehdet_luuppisanomat",
	"lehdet_lahde_liikkeelle",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.m = {
    title: "M",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (M-alkuiset)",
    contents: [
	"lehdet_maailma_kiitotie",
	"lehdet_materia",
	"lehdet_matkailusilma",
	"lehdet_me",
	"lehdet_mercurius",
	"lehdet_meripelastus",
	"lehdet_merkonomi",
	"lehdet_minna",
	"lehdet_mirator",
	"lehdet_modin",
	"lehdet_motiva_mplus_xpress",
	"lehdet_musetti",
	"lehdet_muusikko",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.no = {
    title: "N, O",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (N- ja O-alkuiset)",
    contents: [
	"lehdet_nonsordino",
	"lehdet_nakyva_nainen",
	"lehdet_ollaviiskytviisplus",
	"lehdet_omakotisanomat",
	"lehdet_ostrobotnia",
	"lehdet_ota_opiksi",
	"lehdet_oulunkylainen",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.p = {
    title: "P",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (P-alkuiset)",
    contents: [
	"lehdet_pakolainen",
	"lehdet_palveluesimies",
	"lehdet_paraisten_kuulutukset",
	"lehdet_pardianyt",
	"lehdet_pariperhe",
	"lehdet_partio_jalki",
	"lehdet_patria",
	"lehdet_pelastusalan_ammattilainen",
	"lehdet_pelastustieto",
	"lehdet_perussuomalainen",
	"lehdet_pihlajamaki_info",
	"lehdet_pihlajisto_viikinmaki",
	"lehdet_pippuri",
	"lehdet_pirkkalainen",
	"lehdet_pirta",
	"lehdet_pispalalainen",
	"lehdet_plari",
	"lehdet_pointti",
	"lehdet_poleemi",
	"lehdet_polemiikki",
	"lehdet_policy",
	"lehdet_poromies",
	"lehdet_print_media",
	"lehdet_pro_etelapohjanmaa",
	"lehdet_prointerior",
	"lehdet_promaint_kunnossapito",
	"lehdet_proresto",
	"lehdet_puulehti",
	"lehdet_puutarha_sanomat",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.r = {
    title: "R",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (R-alkuiset)",
    contents: [
	"lehdet_rautalampilehti",
	"lehdet_rautatievirkamies",
	"lehdet_ruotuvaki",
	"lehdet_ronsy",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.s = {
    title: "S",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (S-alkuiset)",
    contents: [
	"lehdet_saarijarvelainen",
	"lehdet_saariselka",
	"lehdet_saima",
	"lehdet_secretarius",
	"lehdet_selkosanomat",
	"lehdet_signum",
	"lehdet_skrolli",
	"lehdet_sofia",
	"lehdet_solidaarisuus",
	"lehdet_sosiaalivakuutus",
	"lehdet_stiiknafuulia",
	"lehdet_sukuviesti",
	"lehdet_suomen_historiallinen",
	"lehdet_suomenmaa",
	"lehdet_seniorilehti",
	"lehdet_suomi_puola",
	"lehdet_super",
	"lehdet_susikko",
	"lehdet_sydan_hameen_lehti",
	"lehdet_syopa",
	"lehdet_syopasaation_focus",
	"lehdet_sosso",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.t = {
    title: "T",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (T-alkuiset)",
    contents: [
	"lehdet_taku",
	"lehdet_talentia",
	"lehdet_taloustaito",
	"lehdet_tamk_nyt",
	"lehdet_tampere",
	"lehdet_kauppakamarilehti",
	"lehdet_tampereen_liikuntasanomat",
	"lehdet_tampu",
	"lehdet_tanhuviesti",
	"lehdet_tanssiurheilija",
	"lehdet_tapaturmavakuutus",
	"lehdet_tapiolan_asiakaslehti",
	"lehdet_tatsi",
	"lehdet_tek_verkkolehti",
	"lehdet_teollisuussuomi",
	"lehdet_terve_elama",
	"lehdet_terve_pirkanmaa",
	"lehdet_tervetuloa_jyvaskylaan",
	"lehdet_terveydeksi",
	"lehdet_tiedetoimittaja",
	"lehdet_tiedosta",
	"lehdet_tietoa_maasta",
	"lehdet_tietoarkisto",
	"lehdet_tiimi",
	"lehdet_toimi",
	"lehdet_toisinsanoen",
	"lehdet_toolilainen",
	"lehdet_tukijalka",
	"lehdet_tukilinja",
	"lehdet_tukiviesti",
	"lehdet_tuntosarvi",
	"lehdet_turkuposti",
	"lehdet_tutkain",
	"lehdet_tuulivoima_tuulienergia_tuulensilma",
	"lehdet_tyoelake",
	"lehdet_taydellinenympyra",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.u = {
    title: "U",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (U-alkuiset)",
    contents: [
	"lehdet_ubik",
	"lehdet_uiotus",
	"lehdet_uljas",
	"lehdet_uniikki",
	"lehdet_unioni",
	"lehdet_universitas",
	"lehdet_universitaschydenius",
	"lehdet_utain",
	"lehdet_uusiouutiset",
	"lehdet_uusipaiva",
	"lehdet_uusi_safiiri",
	"lehdet_uutis_jousi",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.vw = {
    title: "V, W",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (V- ja W-alkuiset)",
    contents: [
	"lehdet_vaasan_ylioppilaslehti",
	"lehdet_valkoinen_kaapio",
	"lehdet_valkonauha",
	"lehdet_vammaisurheilu",
	"lehdet_vanhustyo",
	"lehdet_vankilavirkailija",
	"lehdet_vantaan_akseli",
	"lehdet_vantaan_asukaslehti",
	"lehdet_vapaa_ajattelija",
	"lehdet_vasama",
	"lehdet_koskinen",
	"lehdet_veturimies",
	"lehdet_via",
	"lehdet_via_helsinki",
	"lehdet_vilkku",
	"lehdet_virallinenlehti",
	"lehdet_virilactis",
	"lehdet_virta",
	"lehdet_valitysuutiset",
	"lehdet_walpo",
	"lehdet_wieteri",
  ]
}

settings.corporafolders.lehdet.muut_lehdet.y = {
    title: "Y",
    description: "1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä (Y-alkuiset)",
    contents: [
	"lehdet_yhteenveto",
	"lehdet_yhteishyva",
	"lehdet_yhteishyva_ruoka",
	"lehdet_yhys_tiedotuslehti",
	"lehdet_yliopistolainen",
	"lehdet_yrittajasanomat",
	"lehdet_yritysetiikka",
    ]
};


settings.corporafolders.webnews = {
    title: "Verkkouutisia",
};


settings.corporafolders.webnews.ylenews_fi = {
    title: "Ylen suomenkielinen uutisarkisto",
    description: "Ylen suomenkielinen uutisarkisto<br/><br/>Kansiossa on kaksi korpusta, jotka sisältävät samat virkkeet mutta joilla on erilaiset käyttöehdot ja ominaisuudet: kaikille avoimen korpuksen virkkeet on sekoitettu kunkin tekstin sisällä eikä se tue laajennettua kontekstia, kun taas tutkijoiden käytettävissä olevan korpuksen virkkeet ovat alkuperäisessä järjestyksessä ja se tukee laajennettua kontekstia.<br/><br/>Huomaa, että korpus sisältää selkouutiset, jotka ovat Korpissa myös erillisenä aineistonaan.",
    info: {
	homepage: {
	    name: "Yle Uutiset",
	    url: "https://yle.fi",
	    no_label: true,
	},
    },
};

settings.corporafolders.webnews.ylenews_fi.a = {
    title: "Ylen suomenkielinen uutisarkisto 2011–2018 (tutkijoille)",
    description: "Ylen suomenkielinen uutisarkisto 2011–2018, Korp<br/>Tutkijoiden käytettävissä oleva versio: virkkeet alkuperäisessä järjestyksessä ja tuki laajennetulle kontekstille.<br/><br/>Aineisto on jaettu osakorpuksiin vuosittain, ja tekstit kunkin vuoden sisällä on järjestetty muokkausajankohdan mukaan.<br/><br/>Huomaa, että korpus sisältää selkouutiset, jotka ovat Korpissa myös erillisenä aineistonaan.",
    // Contents are added later with settings.fn.add_corpus_settings
    contents: [],
    info: {
	urn: "urn:nbn:fi:lb-2019121005",
	metadata_urn: "urn:nbn:fi:lb-2019121003",
	licence: {
	    name: "CLARIN ACA +NC 1.0",
	    urn: "urn:nbn:fi:lb-2019121002",
	},
	cite_id: "ylenews-fi-2011-2018-korp",
    }
};

settings.corporafolders.webnews.ylenews_fi.s = {
    title: "Ylen suomenkielinen uutisarkisto 2011–2018 (kaikille)",
    description: "Ylen suomenkielinen uutisarkisto 2011–2018, sekoitettu, Korp<br/>Kaikille avoin versio: virkkeet sekoitettuina kunkin tekstin sisällä ja ilman laajennetun kontekstin tukea.<br/><br/>Aineisto on jaettu osakorpuksiin vuosittain, ja tekstit kunkin vuoden sisällä on järjestetty muokkausajankohdan mukaan.<br/><br/>Huomaa, että korpus sisältää selkouutiset, jotka ovat Korpissa myös erillisenä aineistonaan.",
    // Contents are added later with settings.fn.add_corpus_settings
    contents: [],
    info: {
	urn: "urn:nbn:fi:lb-2019121006",
	metadata_urn: "urn:nbn:fi:lb-2019121004",
	licence: settings.licenceinfo.CC_BY,
	cite_id: "ylenews-fi-2011-2018-s-korp",
    }
};




settings.corporafolders.ftc = {
    title: "Suomen kielen tekstikokoelma (SKTP/FTC)",
    description: "Suomen kielen tekstikokoelma: Lemmie-palvelussa olleet osakorpukset",
    info: {
	urn: "urn:nbn:fi:lb-2014052719",
	metadata_urn: "urn:nbn:fi:lb-2016050207",
	lbr_id: "urn:nbn:fi:lb-201403268",
	licence: {
	    name: "CLARIN RES +PLAN +NC +ND",
	    urn: "urn:nbn:fi:lb-20150304137",
	},
	// KitWiki is no longer available and there is no replacement page yet
	// homepage: {
	//     name: "Aineiston kuvaus",
	//     url: "https://kitwiki.csc.fi/twiki/bin/view/FinCLARIN/KielipankkiAineistotFtc",
	//     no_label: true,
	// },
	cite_id: "ftc-korp",
    },
};

settings.corporafolders.other_texts = {
    title: "Muita tekstejä",
    contents: [
	"kfspc_fi",
	"opensub_fi_2017",
	"finstud",
	"yoaineet",
    ]
};

settings.corporafolders.other_texts.kotus_ns_presidentti = {
    title: "Tasavallan presidenttien uudenvuodenpuheet",
    description: "Tasavallan presidenttien uudenvuodenpuheiden kokoelmassa on kaikki tasavallan presidenttien pitämät uudenvuodenpuheet vuosilta 1935–2007. Muutaman kerran puheen on pitänyt joku muu kuin presidentti. Nämäkin puheet sisältyvät aineistoon.<br/>Kokoelma on järjestetty presidenteittäin ja vuosittain. Kokoelma koostuu lehtileikkeistä, konekirjoitusliuskoista, kirjojen sivuista, lehdistötiedotteista ja verkkoteksteistä. Aineistoa on hankittu arkistoista, kirjoista ja Internetistä.",
    // Contents will be filled in when constructing the corpus
    // settings
    contents: [],
    info: {
	// URN information also in the corpus .info files; if you need
	// to update the URNs, you should also check them.
	urn: "urn:nbn:fi:lb-20151001",
    	metadata_urn: "urn:nbn:fi:lb-20140730150",
	licence: settings.licenceinfo.EUPL_11,
	homepage: settings.fn.kaino_homepage(
	    "teko/meta/presidentti/presidentti"),
    	compiler: {
    	    name: "Kotimaisten kielten keskus",
    	    url: "http://www.kotus.fi/",
    	    no_label: true
	},
	cite_id: "uudenvuodenpuheet",
    }
}

settings.corporafolders.legal.semfinlex = {
    title: "Semfinlex",
    description: "Valikoima Eduskunnan alkuperäisiä säädöksiä (1917–2018 sekä muutamia varhaisempia), KKO:n päätöksiä (1980–2018) ja KHO:n päätöksiä (1987–2018).<br/><br/>2019-09-02: Huomaa, että aineiston <strong>dependenssijäsennykset ja -relaatiot poikkeavat merkittävästi</strong> aiemmin samalla jäsentimellä jäsennettyjen aineistojen jäsennyksistä. Selvitämme asiaa. <strong>Jos tarvitset dependenssijäsennystietoja, käytä toistaiseksi muita aineistoja.</strong>",
    contents: ["semfinlex_asd_fi_2018", "semfinlex_kko_fi_2018", "semfinlex_kho_fi_2018"],
    info: {
	licence: settings.licenceinfo.CC_BY,
	cite_id: "semfinlex",
    }
}

settings.corporafolders.spoken = {
    title: "Puhuttua kieltä (tekstiksi litteroituna)",
    contents: ["kotus_sp", "skn", "dma", "arkisyn"],
    // unselected: true
};

settings.corporafolders.spoken.la_murre = {
    title: "Lauseopin arkiston murrekorpus",
    description: "Lauseopin arkiston murrekorpus edustaa kaikkia nykyisen Suomen alueella puhuttuja suomen kielen murteita sekä lisäksi niitä murteita, joita puhuttiin Neuvostoliitolle viime sotien yhteydessä luovutetuilla alueilla ennen alueiden luovuttamista. Puhujat ovat syntyneet vuosina 1860–1910 (suurin osa 1880-luvulla) ja haastattelut on tehty 1950–1970-luvuilla, jolloin puhujat ovat olleet keskimäärin 80-vuotiaita.<br/>Yhdestä pitäjänmurteesta on yleensä valittu käsiteltäväksi yksi noin tunnin laajuinen äänite. Murreaineisto on litteroitu sekä koodattu morfologisesti ja syntaktisesti. Tässä on saatavilla korpuksen versio, jossa litteraatit on karkeasti kohdistettu alkuperäisiin äänitteisiin.",
    // unselected: true,
    info: {
	urn: "urn:nbn:fi:lb-2014052715",
	metadata_urn: "urn:nbn:fi:lb-2014052716",
	licence: settings.licenceinfo.CC_BY_ND_40,
	infopage_url: "https://www.kielipankki.fi/aineistot/la-murre/",
	cite_id: "LA-murre-korp",
    }
 };


settings.corporafolders.selkokieli = {
    title: "Selkokieli",
    description: "Selkokieliaineistoja<br/><br/><strong>Huomaa</strong>, että selkokieliset lehdet ovat edelleen osa aineistoa <i>1990- ja 2000-luvun suomalaisia aikakaus- ja sanomalehtiä</i>. Niistä tulevat hakutulokset näkyvät kuitenkin vain yhteen kertaan, vaikka ne olisi valittu sekä osana selkokieliaineistoja että osana muita lehtiä.",
};


settings.corporafolders.selkokieli.lehdet = {
    title: "Selkokielisiä lehtiä",
    // Note the magazines are referred to both here and in
    // lehdet.muut_lehdet. As a side-effect, if a Korp URL refers to
    // these corpus ids, they are duplicated and shown in both places
    // in the corpus chooser, and the number of corpora in the corpus
    // chooser title bar counts them twice. However, search results
    // come only once from each corpus, as is desirable.
    contents: [
	"lehdet_leija",
	"lehdet_selkosanomat",
    ],
};


settings.corporafolders.selkokieli.ylenews_fi_selko = {
    title: "Ylen suomenkielisen uutisarkiston selkouutiset",
    description: "Ylen suomenkielisen uutisarkiston selkouutiset<br/><br/>Kansiossa on kaksi korpusta, jotka sisältävät samat virkkeet mutta joilla on erilaiset käyttöehdot ja ominaisuudet: kaikille avoimen korpuksen virkkeet on sekoitettu kunkin tekstin sisällä eikä se tue laajennettua kontekstia, kun taas tutkijoiden käytettävissä olevan korpuksen virkkeet ovat alkuperäisessä järjestyksessä ja se tukee laajennettua kontekstia.<br/><br/>Huomaa, että selkouutiset ovat myös osana laajempaa Ylen suomenkielinen uutisarkisto -aineistoa.",
    contents: [
	       "ylenews_fi_2011_2018_selko_a",
	       "ylenews_fi_2011_2018_selko_s",
	       ],
    info: {
	homepage: {
	    name: "Yle Uutiset selkosuomeksi",
	    url: "https://yle.fi/uutiset/osasto/selkouutiset/",
	    no_label: true,
	},
    },
};


settings.corporafolders.learner = {
    title: "Suomenoppijoiden kieltä (suomi toisena tai vieraana kielenä)",
    contents: ["iclfi", "topling_fi"],
    // unselected: true
};

settings.corporafolders.learner.las2 = {
    title: "LAS2 – Edistyneiden suomenoppijoiden korpus",
    info: {
        urn: "urn:nbn:fi:lb-2016041201",
        metadata_urn: "urn:nbn:fi:lb-201407167",
        homepage_url: "http://www.utu.fi/fi/yksikot/hum/yksikot/suomi-sgr/tutkimus/tutkimushankkeet/las2/Sivut/home.aspx",
        licence: {
            name: "CLARIN RES +PLAN +NC +INF +LOC +ND",
            urn: "urn:nbn:fi:lb-2015041305",
        },
	cite_id: "LAS2",
    },
    contents: ["las2_tentit", "las2_esseet"]
};

settings.corporafolders.vks = {
    title: "Vanhan kirjasuomen korpus",
    contents: [
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
    info: {
	urn: "urn:nbn:fi:lb-201407166",
	metadata_urn: "urn:nbn:fi:lb-201407165",
	licence: settings.licenceinfo.EUPL_11,
	homepage: settings.fn.kaino_homepage("vks/meta/vks"),
	cite_id: "VKS",
    },
    // unselected: true
};

settings.corporafolders.vns = {
    title: "Varhaisnykysuomen korpus",
    /*contents: ["vns_asetus", "vns_renqvist", "vns_renvall"],*/
    contents: ["vnsk_aejmelaeus","vnsk_ahlholm","vnsk_ahlman_kirjat","vnsk_ahlman_sanastot","vnsk_ahlqvist","vnsk_akiander","vnsk_aminoff","vnsk_almanakka","vnsk_anonyymi","vnsk_asetus","vnsk_aulen","vnsk_backvall","vnsk_bocker","vnsk_bonsdorff","vnsk_borenius","vnsk_borg","vnsk_cajan","vnsk_cannelin","vnsk_cantell","vnsk_canth","vnsk_corander","vnsk_costiander","vnsk_dahlberg","vnsk_edlund","vnsk_eklof","vnsk_euren","vnsk_europaeus","vnsk_europaeus_sanastot","vnsk_fabritius","vnsk_forsman","vnsk_forstrom","vnsk_friman","vnsk_frosterus","vnsk_gottlund","vnsk_granlund","vnsk_hannikainen","vnsk_hjelt","vnsk_hordh","vnsk_hornborg","vnsk_ignatius","vnsk_ingman","vnsk_innain","vnsk_juteini","vnsk_keckman","vnsk_kemell","vnsk_kilpinen","vnsk_kivi","vnsk_koskinen","vnsk_krohn","vnsk_lagervall","vnsk_lankela","vnsk_lavonius","vnsk_lilius_anton","vnsk_lilius_aukusti","vnsk_lonnrot","vnsk_malmberg","vnsk_mehilainen","vnsk_mela","vnsk_meurman","vnsk_mmy","vnsk_murman","vnsk_muut","vnsk_nyman","vnsk_ovs","vnsk_polen","vnsk_poppius","vnsk_puhuttelija","vnsk_rein","vns_renvall","vnsk_roos","vnsk_salmelainen","vnsk_salonius","vnsk_sanaluettelot","vnsk_sandberg","vnsk_schroter","vnsk_sirelius","vnsk_skogman","vnsk_smtr","vnsk_sohlberg","vnsk_soldan","vnsk_ssv","vnsk_stahlberg","vnsk_tarvanen","vnsk_ticklen","vnsk_tikkanen","vnsk_topelius","vnsk_toppelius","vnsk_tvs","vnsk_varelius","vnsk_virsikirja","vnsk_wallin","vnsk_wikman","vnsk_wiwolin","vnsk_yksitt"],
    info: {
	urn: "urn:nbn:fi:lb-2016081203",
	metadata_urn: "urn:nbn:fi:lb-20140730147",
	licence: settings.licenceinfo.EUPL_11,
	homepage: settings.fn.kaino_homepage("1800/meta/1800"),
	cite_id: "VNSK",
    },
    // unselected: true
};

settings.corporafolders.test = {
    title: "Demo- ja testiaineistoja",
    contents: ["reittidemo"]
};



/*
 * PRESELECTED CORPORA
 * Folders will be expanded to all corpora. Optionally prefix folders with __ , which will be ignored.
 */
// TODO: this should be moved when modern texts are moved to their own mode
if(window.currentMode == "default")
    settings.preselected_corpora = ["reittidemo", "__ftb"];

/*
 * CORPORA
 */

/*
settings.corpora.testcorpus = {
    title: "The Korp Test Corpus",
    description: "A test corpus for testing Korp.",
    id: "testcorpus",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
        pos: attrs.pos
    },
    struct_attributes: {
    }
};
*/

/*
settings.corpora.testcorp = {
    title: "Testikorpus",
    description: "Testikorpus Korpin ominaisuuksien testaamiseksi",
    id: "testcorp",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    // limited_access: true,
    attributes: {
	lemma: attrs.baseform,
        pos: attrs.pos
    },
    struct_attributes: {
	sentence_id: {
	    label: "sentence_id"
	},
	sentence_url: {
	    label: "file_url",
	    type: "url"
	}
    }
};
*/

/*
settings.corpora.testcorp_deptree = {
    title: "Dependenssipuutesti",
    description: "Testikorpus Korpin dependenssipuun piirtämisen testaamiseksi",
    id: "testcorp_deptree",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
	lemma: attrs.baseform_ftb2,
        pos: attrs.pos_ftb2,
	msd: attrs.msd,
	dephead: attrs.dephead,
	deprel: attrs.deprel_ftb2,
	ref: attrs.ref,
	spoken: attrs.spoken,
	lex: attrs.lemgram_hidden
    },
    struct_attributes: {
	sentence_id: sattrs.sentence_id_hidden
    }
};
*/

settings.corpora.kal_perus_ha = {
    title: "Historiallinen Aikakauskirja (tarkistamaton)",
    description: "Historiallinen Aikakauskirja; numerot 1917, 1920, 1925, 1935, 1945 (OCR tarkistamaton)",
    id: "kal_perus_ha",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
	text_title: sattrs.text_title,
        text_year: sattrs.year,
        text_issue: {
            label: "issue"
        },
        text_publisher: sattrs.text_publisher,
        text_year_digitized: {
            label: "digitized"
        },
        text_date_modified: {
            label: "modified"
        },
        text_wordcount: {
            label: "wordcount"
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    }
};


settings.corpora.kal_perus_la = {
    title: "Lakimies (tarkistamaton)",
    description: "Lakimies; numerot 1917, 1920, 1925, 1935, 1945, 1955, 1965, 1972 (OCR tarkistamaton)",
    id: "kal_perus_la",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
	text_title: sattrs.text_title,
        text_year: sattrs.year,
        text_issue: {
            label: "issue"
        },
        text_publisher: sattrs.text_publisher,
        text_year_digitized: {
            label: "digitized"
        },
        text_date_modified: {
            label: "modified"
        },
        text_wordcount: {
            label: "wordcount"
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    }
};


settings.corpora.kal_perus_sk = {
    title: "Suomen Kuvalehti (tarkistamaton)",
    description: "Suomen Kuvalehti; numerot 1916, 1917, 1925, 1935, 1945, 1955, 1965, 1972 (OCR tarkistamaton)",
    id: "kal_perus_sk",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
	text_title: sattrs.text_title,
        text_year: sattrs.year,
        text_issue: {
            label: "issue"
        },
        text_publisher: sattrs.text_publisher,
        text_year_digitized: {
            label: "digitized"
        },
        text_date_modified: {
            label: "modified"
        },
        text_wordcount: {
            label: "wordcount"
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    }
};

settings.corpora.kal_perus_su = {
    title: "Suomi (tarkistamaton)",
    description: "Suomi; numerot 1917, 1920, 1923, 1935, 1938 (OCR tarkistamaton)",
    id: "kal_perus_su",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
	text_title: sattrs.text_title,
        text_year: sattrs.year,
        text_issue: {
            label: "issue"
        },
        text_publisher: sattrs.text_publisher,
        text_year_digitized: {
            label: "digitized"
        },
        text_date_modified: {
            label: "modified"
        },
        text_wordcount: {
            label: "wordcount"
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    }
};

settings.corpora.kal_ydin_ha = {
    title: "Historiallinen Aikakauskirja (tarkistettu)",
    description: "Historiallinen Aikakauskirja; numero 1/1935 (OCR tarkistettu)",
    id: "kal_ydin_ha",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
	text_title: sattrs.text_title,
        text_year: sattrs.year,
        text_issue: {
            label: "issue"
        },
        text_page: {
            label: "page"
        },
        text_publisher: sattrs.text_publisher,
        text_year_digitized: {
            label: "digitized"
        },
        text_date_modified: {
            label: "modified"
        },
        text_wordcount: {
            label: "wordcount"
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    }
};

settings.corpora.kal_ydin_la = {
    title: "Lakimies (tarkistettu)",
    description: "Lakimies; numero 1935 (OCR tarkistettu)",
    id: "kal_ydin_la",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
	text_title: sattrs.text_title,
        text_year: sattrs.year,
        text_issue: {
            label: "issue"
        },
        text_page: {
            label: "page"
        },
        text_publisher: sattrs.text_publisher,
        text_year_digitized: {
            label: "digitized"
        },
        text_date_modified: {
            label: "modified"
        },
        text_wordcount: {
            label: "wordcount"
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    }
};

settings.corpora.kal_ydin_sk = {
    title: "Suomen Kuvalehti (tarkistettu)",
    description: "Suomen Kuvalehti; neljä numeroa (4, 17, 30 ja 43) per vuosi 1917, 1925, 1935, 1945, 1955, 1965 ja 1972 (OCR tarkistettu)",
    id: "kal_ydin_sk",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
	text_title: sattrs.text_title,
        text_year: sattrs.year,
        text_issue: {
            label: "issue"
        },
        text_page: {
            label: "page"
        },
        text_publisher: sattrs.text_publisher,
        text_year_digitized: {
            label: "digitized"
        },
        text_date_modified: {
            label: "modified"
        },
        text_wordcount: {
            label: "wordcount"
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    }
};

settings.corpora.kal_ydin_su = {
    title: "Suomi (tarkistettu)",
    description: "Suomi; numero 1935 (OCR tarkistettu)",
    id: "kal_ydin_su",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
	text_title: sattrs.text_title,
        text_year: sattrs.year,
        text_issue: {
            label: "issue"
        },
        text_page: {
            label: "page"
        },
        text_publisher: sattrs.text_publisher,
        text_year_digitized: {
            label: "digitized"
        },
        text_date_modified: {
            label: "modified"
        },
        text_wordcount: {
            label: "wordcount"
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    }
};

settings.corpora.semfinlex_asd_fi_2018 = {
    id: "semfinlex_asd_fi_2018",
    lang: "fin",
    title: "Alkuperäisiä säädöksiä",
    description: "Eduskunnan alkuperäisiä säädöksiä vuosilta 1734, 1868, 1889, 1895, 1896, 1898, 1901, 1906, 1907 ja 1917–2018.",
    urn: "urn:nbn:fi:lb-2020052702",
    metadata_urn: "urn:nbn:fi:lb-2020052701",
    licence : settings.licenceinfo.CC_BY,
    features: ["paragraphs", "parsed_tdt"],
    struct_attributes : {
	text_url : {
	    label : "URL",
	    type : "url",
	    url_opts : sattrs.link_url_opts
	},
	text_parl_statute_type: {
            label: "parl_statute_type",
	    displayType: "select",
	    opts: settings.liteOptions,
	    translationKey: "parlstatutetype_",
	    dataset: [
		"laki",
		"asetus",
		"paatos",
		"ilmoitus",
		"tyojarjestys",
		"kirje",
		"luettelo",
		"kuulutus",
		"kaari",
		""
	    ]
	}
    },
}

settings.corpora.semfinlex_kko_fi_2018 = {
    id: "semfinlex_kko_fi_2018",
    lang: "fin",
    title: "KKO:n päätöksiä",
    description: "Korkeimman oikeuden päätöksiä vuosilta 1980–2018.",
    urn: "urn:nbn:fi:lb-2019042608",
    metadata_urn: "urn:nbn:fi:lb-2019042607",
    licence : settings.licenceinfo.CC_BY,
    features: ["paragraphs", "parsed_tdt"],
    struct_attributes : {
	text_url : {
	    label : "URL",
	    type : "url",
	    url_opts : sattrs.link_url_opts
	},
	text_keywords: {label: "keywords"}
    },
}

settings.corpora.semfinlex_kho_fi_2018 = {
    id: "semfinlex_kho_fi_2018",
    lang: "fin",
    title: "KHO:n päätöksiä",
    description: "Korkeimman hallinto-oikeuden päätöksiä vuosilta 1987–2018.",
    urn: "urn:nbn:fi:lb-2019042608",
    metadata_urn: "urn:nbn:fi:lb-2019042607",
    licence : settings.licenceinfo.CC_BY,
    features: ["paragraphs", "parsed_tdt"],
    struct_attributes : {
	text_url : {
	    label : "URL",
	    type : "url",
	    url_opts : sattrs.link_url_opts
	},
	text_keywords: {label: "keywords"}
    },
}

settings.corpora.finstud = {
    id: "finstud",
    title: "Finstud 86",
    description: "Finstud 86",
    urn: "urn:nbn:fi:lb-2016090610",
    metadata_urn: "urn:nbn:fi:lb-20140730158",
    licence: {
	name: "CLARIN RES +PLAN +NC +PRIV 1.0",
	urn: "urn:nbn:fi:lb-2016041802",
    },
    cite_id: "FinStud86",
    limited_access: true,
    licence_type: "RES",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.finstud,
    struct_attributes: sattrlist.finstud
};


settings.corpora.ftb2 = {
    title: "FinnTreeBank 2",
    description: "Finnish tree bank, version 2",
    id: "ftb2",
    urn: "urn:nbn:fi:lb-201407164",
    metadata_urn: "urn:nbn:fi:lb-2016042406",
    licence: settings.licenceinfo.CC_BY_30,
    cite_id: "FinnTreeBank2-korp",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
	lemma: attrs.baseform_ftb2,
        pos: attrs.pos_ftb2,
	msd: attrs.msd,
	dephead: attrs.dephead,
	deprel: attrs.deprel_ftb2,
	ref: attrs.ref,
	lex: attrs.lemgram_hidden
    },
    struct_attributes: {
	subcorpus_name: {
	    label: "subcorpus_name",
	    displayType: "select",
	    translationKey: "subcorp_",
	    dataset: {
		// "news-samples": "news-samples",
		// "sofie12": "sofie12",
		"visk-sent": "visk-sent",
		"wikipedia-samples": "wikipedia-samples"
	    },
            opts: settings.liteOptions
	},
	sentence_id: sattrs.sentence_id_hidden
    }
//    },
//    limited_access: true
};

/*
settings.corpora.ftb3 = {
    title: "FinnTreeBank 3",
    description: "Finnish tree bank, version 3: EuroParl, JRC Acquis",
    id: "ftb3",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
	lemma: attrs.baseform_ftb2,
	lemmacomp: attrs.baseform_compound,
        pos: attrs.pos_ftb3,
	posorig: attrs.pos_ftb3_orig,
	msd: attrs.msd,
	dephead: attrs.dephead,
	deprel: attrs.deprel_ftb2,
	lex: attrs.lemgram_hidden
    },
    struct_attributes: {
	subcorpus_name: {
	    label: "subcorpus_name",
	    displayType: "select",
	    translationKey: "ftb3_subcorp_",
	    dataset: {
		"JRC_Acquis": "jrc-acquis",
		"EuroParl": "europarl",
	    },
            opts: settings.liteOptions
	},
	file_name: {
	    label: "file_name",
	},
	sentence_id: sattrs.sentence_id_hidden,
	sentence_line: {
	    label: "sentence_line",
	}
    }
};
*/

settings.corpora.ftb3_europarl = {
    title: "FinnTreeBank 3: EuroParl",
    description: "Suomen puupankki, versio 3: EuroParl (Euroopan parlamentin istuntoja)",
    id: "ftb3_europarl",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
	lemma: attrs.baseform_ftb2,
	lemmacomp: attrs.baseform_compound,
	pos: attrs.pos_ftb31,
	msd: attrs.msd,
	dephead: attrs.dephead,
	deprel: attrs.deprel_ftb2,
	ref: attrs.ref,
	lex: attrs.lemgram_hidden
    },
    struct_attributes: {
	text_filename: {
	    label: "file_name",
	},
	chapter_id: {
	    label: "chapter_id",
	    displayType: "hidden",
	},
	chapter_title: {
	    label: "chapter_title",
	},
	paragraph_id: {
	    label: "paragraph_id",
	    displayType: "hidden",
	},
	speech_speakerid: {
	    label: "speech_speakerid",
	    displayType: "hidden",
	},
	speech_speakername: {
	    label: "speech_speakername",
	},
	speech_language: {
	    label: "speech_language",
	    displayType: "select",
	    translationKey: "ftb3_europarl_language_",
	    dataset: {
		"bg": "bg",
		"cs": "cs",
		"da": "da",
		"de": "de",
		"el": "el",
		"en": "en",
		"es": "es",
		"et": "et",
		"eu": "eu",
		"fi": "fi",
		"fr": "fr",
		"ga": "ga",
		"hu": "hu",
		"it": "it",
		"lt": "lt",
		"lv": "lv",
		"mt": "mt",
		"nl": "nl",
		"pl": "pl",
		"pt": "pt",
		"ro": "ro",
		"sk": "sk",
		"sl": "sl",
		"sv": "sv",
		"und": "und",
	    },
	    opts: settings.liteOptions
	},
	sentence_id: sattrs.sentence_id_hidden,
	sentence_line: {
	    label: "sentence_line",
	},
    }
};

settings.corpora.ftb3_jrcacquis = {
    title: "FinnTreeBank 3: JRC Acquis",
    description: "Suomen puupankki, versio 3: JRC Acquis (EU-säädöksiä)",
    id: "ftb3_jrcacquis",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
	lemma: attrs.baseform_ftb2,
	lemmacomp: attrs.baseform_compound,
	pos: attrs.pos_ftb31,
	msd: attrs.msd,
	dephead: attrs.dephead,
	deprel: attrs.deprel_ftb2,
	ref: attrs.ref,
	lex: attrs.lemgram_hidden
    },
    struct_attributes: {
	text_filename: {
	    label: "file_name",
	},
	text_title: {
	    label: "file_title",
	},
	text_codetitle: {
	    label: "file_codetitle",
	},
	text_url: {
	    label: "file_url",
	    type: "url",
	},
	paragraph_id: {
	    label: "paragraph_id",
	    displayType: "hidden",
	},
	sentence_id: sattrs.sentence_id_hidden,
	sentence_line: {
	    label: "sentence_line",
	}
    }
};

/* ==== TIEDELEHTIÄ ==== */

settings.corpus_aliases.tiedelehdet = "tiedelehdet_.*";

settings.corpora.tiedelehdet_hiidenkivi = {
    title: "Hiidenkivi",
    description: "Hiidenkivi (2009–2012)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisijat: Kotimaisten kielten keskus, Suomalaisen Kirjallisuuden Seura, Suomen Kotiseutuliitto<br/>Kotisivu: <a href='http://www.hiidenkivi-lehti.fi/'>http://www.hiidenkivi-lehti.fi/</a>",
    id: "tiedelehdet_hiidenkivi",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: {
            label: "text_title"
        },
        text_year: {
            label: "year"
        },
        text_issue: {
            label: "issue"
        },
    }
};


settings.corpora.tiedelehdet_versus = {
    title: "Versus",
    description: "Versus (2/2011–1/2015)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Alue- ja ympäristöntutkimuksen seura<br/>Kotisivu: <a href='http://www.ays.fi/versus/'>http://www.ays.fi/versus/</a>",
    id: "tiedelehdet_versus",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: {
            label: "text_title"
        },
        text_year: {
            label: "year"
        },
        text_issue: {
            label: "issue"
        },
    }
};


settings.corpora.tiedelehdet_kasvu = {
    title: "Kasvu",
    description: "Kasvu (2012–1/2016)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Talentia ry<br/>Kotisivu: <a href='http://talentia.e-julkaisu.com/julkaisut/'>http://talentia.e-julkaisu.com/julkaisut/</a>",
    id: "tiedelehdet_kasvu",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: {
            label: "text_title"
        },
        text_year: {
            label: "year"
        },
        text_issue: {
            label: "issue"
        },
    }
};


settings.corpora.tiedelehdet_liikuntajatiede = {
    title: "Liikunta ja tiede (tutkimusartikkelit)",
    description: "Liikunta ja tiede (2008–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet tutkimusartikkelit<br/>Julkaisija: Liikuntatieteellinen Seura ry<br/>Kotisivu: <a href='http://www.lts.fi/liikunta-tiede-lehti'>http://www.lts.fi/liikunta-tiede-lehti</a>",
    id: "tiedelehdet_liikuntajatiede",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue"
        },
        text_year: {
            label: "year"
        }
    }
};

settings.corpora.tiedelehdet_liikenteensuunta_v2 = {
    title: "Liikenteen suunta",
    description: "Liikenteen suunta (2010–2/2014)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Liikennevirasto<br/>Kotisivu: <a href='http://www.liikenteensuunta.fi/fi/'>http://www.liikenteensuunta.fi/fi/</a>",
    id: "tiedelehdet_liikenteensuunta_v2",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue"
        },
        text_year: {
            label: "year"
        }
    }
};

settings.corpora.tiedelehdet_informaatio = {
    title: "Informaatiotutkimus",
    description: "Informaatiotutkimus (2000–2015)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Informaatiotutkimuksen yhdistys<br/>Kotisivu: <a href='http://ojs.tsv.fi/index.php/inf'>http://ojs.tsv.fi/index.php/inf</a>",
    id: "tiedelehdet_informaatio",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "issue"
        }
    }
};


settings.corpora.tiedelehdet_hykirjasto = {
    title: "Kansalliskirjasto-lehti/Helsingin yliopiston kirjaston tiedotuslehti",
    description: "Helsingin yliopiston kirjaston tiedotuslehti (2000–2002) / Kansalliskirjasto-lehti (2003–2013)<br/>Sisältää lehden <a href='http://elektra.helsinki.fi/lehdet.html'>Elektra-tietokannassa</a> keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Kansalliskirjasto<br/>Kotisivu: <a href='https://www.kansalliskirjasto.fi/fi/search?keys=yleistieto%20tiedotus%20kansalliskirjastolehti'>https://www.kansalliskirjasto.fi/</a>",
    id: "tiedelehdet_hykirjasto",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_geologi = {
    title: "Geologi",
    description: "Geologi (2000, 2006–2013)<br/>Sisältää lehden kotisivulla ja <a href='http://elektra.helsinki.fi/lehdet.html'>Elektra-tietokannassa</a> keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen Geologinen Seura<br/>Kotisivu: <a href='http://www.geologinenseura.fi/geologi-lehti/'>http://www.geologinenseura.fi/geologi-lehti/</a>",
    id: "tiedelehdet_geologi",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        }
    }
};

settings.corpora.tiedelehdet_musiikinsuunta = {
    title: "Musiikin suunta",
    description: "Musiikin suunta (2003–2013)<br/>Sisältää lehden <a href='http://elektra.helsinki.fi/lehdet.html'>Elektra-tietokannassa</a> keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen etnomusikologinen seura<br/>Kotisivu: <a href='http://www.etnomusikologia.fi/julkaisut/Mus.suunta.htm'>http://www.etnomusikologia.fi/julkaisut/</a>",
    id: "tiedelehdet_musiikinsuunta",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "issue"
        }
    }
};


settings.corpora.tiedelehdet_susa = {
    title: "Suomalais-Ugrilaisen Seuran Aikakauskirja",
    description: "Suomalais-Ugrilaisen Seuran Aikakauskirja (2006, 2011, 2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomalais-Ugrilainen seura<br/>Kotisivu: <a href='http://www.sgr.fi/susa/susa_fi.html'>http://www.sgr.fi/susa/</a>",
    id: "tiedelehdet_susa",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_year: {
            label: "year"
        }
    }
};

settings.corpora.tiedelehdet_sosiaalilaaketiede = {
    title: "Sosiaalilääketieteellinen Aikakauslehti",
    description: "Sosiaalilääketieteellinen Aikakauslehti (2006–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Sosiaalilääketieteellinen yhdistys ry<br/>Kotisivu: <a href='http://ojs.tsv.fi/index.php/SA/index'>http://ojs.tsv.fi/index.php/SA/index</a>",
    id: "tiedelehdet_sosiaalilaaketiede",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_niinnain_v2 = {
    title: "niin & näin",
    description: "niin & näin (2000–4/2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Eurooppalaisen filosofian seura ry<br/>Kotisivu: <a href='http://netn.fi/lehti'>http://netn.fi/</a>",
    id: "tiedelehdet_niinnain_v2",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_year: {
            label: "year"
        }
    }
};

settings.corpora.tiedelehdet_skeptikko = {
    title: "Skeptikko",
    description: "Skeptikko (2000–2015)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Skepsis ry<br/>Kotisivu: <a href='http://www.skepsis.fi/Julkaisuja/Skeptikkolehti.aspx'>http://www.skepsis.fi/</a>",
    id: "tiedelehdet_skeptikko",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue"
        },
        text_year: {
            label: "year"
        }
    }
};

settings.corpora.tiedelehdet_suo = {
    title: "Suo",
    description: "Suo (2005–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suoseura<br/>Kotisivu: <a href='http://www.suoseura.fi/suo/'>http://www.suoseura.fi/suo/</a>",
    id: "tiedelehdet_suo",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue"
        },
        text_year: {
            label: "year"
        }
    }
};

settings.corpora.tiedelehdet_teologinen = {
    title: "Teologinen Aikakauskirja",
    description: "Teologinen Aikakauskirja (2004–2013)<br/>Julkaisija: Teologinen Julkaisuseura ry<br/>Kotisivu: <a href='http://www.tatt.fi/'>http://www.tatt.fi/</a>",
    id: "tiedelehdet_teologinen",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue"
        },
        text_year: {
            label: "year"
        }
    }
};

settings.corpora.tiedelehdet_tieteessatapahtuu = {
    title: "Tieteessä tapahtuu",
    description: "Tieteessä tapahtuu (2000–2015)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Tieteellisten seurain valtuuskunta<br/><a href='http://www.tieteessatapahtuu.fi/'>http://www.tieteessatapahtuu.fi/</a>",
    id: "tiedelehdet_tieteessatapahtuu",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "date"
        },
        text_citation: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_terminfo = {
    title: "Terminfo",
    description: "Terminfo (2010–2015)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Sanastokeskus TSK<br/>Kotisivu: <a href='http://www.terminfo.fi/'>http://www.terminfo.fi/</a>",
    id: "tiedelehdet_terminfo",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue"
        },
        text_year: {
            label: "year"
        }
    }
};

settings.corpora.tiedelehdet_tktlehti = {
    title: "Tietojenkäsittelytiede",
    description: "Tietojenkäsittelytiede (2003–2015)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Tieojenkäsittelytieteen seura<br/>Kotisivu: <a href='http://www.cse.tkk.fi/fi/tkt-lehti/'>http://www.cse.tkk.fi/fi/tkt-lehti/</a>",
    id: "tiedelehdet_tktlehti",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue"
        },
        text_year: {
            label: "year"
        },
        text_date: sattrs.date
    }
};

settings.corpora.tiedelehdet_synnyt = {
    title: "Synnyt",
    description: "Synnyt (2004–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Synnyt/Origins<br/>Kotisivu: <a href='https://wiki.aalto.fi/display/Synnyt/Home'>https://wiki.aalto.fi/display/Synnyt/Home</a>",
    id: "tiedelehdet_synnyt",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue"
        },
        text_year: {
            label: "year"
        }
    }
};

settings.corpora.tiedelehdet_muinaistutkija = {
    title: "Muinaistutkija",
    description: "Muinaistutkija (2000–2012)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen arkeologinen seura<br/>Kotisivu: <a href='http://www.sarks.fi/mt/etusivu.html'>http://www.sarks.fi/mt/etusivu.html</a>",
    id: "tiedelehdet_muinaistutkija",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_date: {
            label: "year"
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }

    }
};


settings.corpora.tiedelehdet_tutkivasos = {
    title: "Tutkiva Sosiaalityö",
    description: "Tutkiva Sosiaalityö (2010–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Sosiaalityön tutkimuksen seura<br/>Kotisivu: <a href='http://www.sosiaalityontutkimuksenseura.fi/Tutkiva_sosiaality%C3%B6'>http://www.sosiaalityontutkimuksenseura.fi/Tutkiva_sosiaality%C3%B6</a>",
    id: "tiedelehdet_tutkivasos",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year"
        }
    }
};

settings.corpora.tiedelehdet_tiedejaase = {
    title: "Tiede ja Ase",
    description: "Tiede ja Ase (2000–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen sotatieteellinen seura<br/>Kotisivu: <a href='http://ojs.tsv.fi/index.php/ta'>http://ojs.tsv.fi/index.php/ta</a>",
    id: "tiedelehdet_tiedejaase",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "issue"
        }
    }
};


settings.corpora.tiedelehdet_avain = {
    title: "Avain",
    description: "Kirjallisuudentutkimuksen aikakauslehti Avain (2004–2015)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Kirjallisuudentutkijain Seura<br/>Kotisivu: <a href='http://pro.tsv.fi/skts/avain.html'>http://pro.tsv.fi/skts/avain.html</a>",
    id: "tiedelehdet_avain",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_ennenjanyt = {
    title: "Ennen ja nyt",
    description: "Ennen ja nyt (2001–1/2016)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisijat: Agricola -Suomen historiaverkko, Historiallinen Yhdistys ry, Suomen Historiallinen Seura ry ja Turun Historiallinen Yhdistys ry.<br/>Kotisivu: <a href='http://www.ennenjanyt.net/'>http://www.ennenjanyt.net/</a>",
    id: "tiedelehdet_ennenjanyt",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_historianystava = {
    title: "Historian ystävä",
    description: "Historian ystävä (2010–1/2016)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Historian Ystäväin Liitto<br/>Kotisivu: <a href='http://www.historianyst.fi/historianystava/'>http://www.historianyst.fi/historianystava/</a>",
    id: "tiedelehdet_historianystava",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_ilmansuojelu = {
    title: "Ilmansuojelu-lehti",
    description: "Ilmansuojelu-lehti (2007–2015)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Ilmansuojeluyhdistys ry<br/>Kotisivu: <a href='https://isy.fi/julkaisut/ilmansuojelulehti/'>https://isy.fi/julkaisut/ilmansuojelulehti/</a>",
    id: "tiedelehdet_ilmansuojelu",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_kieliskooppi = {
    title: "Kieliskooppi",
    description: "Kieliskooppi (2012–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Jyväskylän yliopiston kielikampus<br/>Kotisivu:<a href='http://research.jyu.fi/kieliskooppi/journals/'>http://research.jyu.fi/kieliskooppi/journals/</a>",
    id: "tiedelehdet_kieliskooppi",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title
    }
};

settings.corpora.tiedelehdet_kosmopolis = {
title: "Kosmopolis",
    description: "Kosmopolis (2000–2013)<br/>Sisältää lehden <a href='http://elektra.helsinki.fi/lehdet.html'>Elektra-tietokannassa</a> keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen rauhantutkimusyhdistys<br/>Kotisivu: <a href='http://rauhantutkimus.fi/content/kosmopolis/'>http://rauhantutkimus.fi/content/kosmopolis/</a>",
    id: "tiedelehdet_kosmopolis",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
    text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
	label: "text_author"
	    },
        text_citationpublisher: {
	label: "text_publisher"
	    },
        text_citationtitle: {
	label: "text_title"
	    },
        text_citationdate: {
	label: "year"
	    },
        text_citation: {
	label: "issue"
	    }
    }
};

settings.corpora.tiedelehdet_poliittinentalous = {
    title: "Poliittinen talous",
    description: "Poliittinen talous (1/2013–1/2014)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Poliittisen talouden tutkimuksen seura<br/>Kotisivu: <a href='http://poliittinentalous.fi/ojs/'>http://poliittinentalous.fi/ojs/</a>",
    id: "tiedelehdet_poliittinentalous",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet
    }
};


settings.corpora.tiedelehdet_skas = {
    title: "SKAS",
    description: "SKAS (2007–2013)<br/>Julkaisija: Suomen keskiajan arkeologian seura<br/>Kotisivu: <a href='http://www.skas.fi/skas-lehti/'>http://www.skas.fi/skas-lehti/</a>",
    id: "tiedelehdet_skas",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_tahiti = {
    title: "TAHITI",
    description: "TAHITI – Taidehistoria tieteenä (1/2011–4/2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Taidehistorian seura<br/>Kotisivu: <a href='http://tahiti.fi/'>http://tahiti.fi/</a>",
    id: "tiedelehdet_tahiti",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_vartija = {
    title: "Vartija-lehti",
    description: "Vartija-lehti (2006–2/2015)<br/>Julkaisija: Vartija-lehden kannatusyhdistys<br/>Kotisivu: <a href='http://www.vartija-lehti.fi/'>http://www.vartija-lehti.fi/</a>",
    id: "tiedelehdet_vartija",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_yhteiskuntapolitiikka = {
    title: "Yhteiskuntapolitiikka",
    description: "Yhteiskuntapolitiikka (1998–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Terveyden ja hyvinvoinnin laitos<br/>Kotisivu: <a href='https://www.thl.fi/fi/web/yhteiskuntapolitiikka/'>https://www.thl.fi/fi/web/yhteiskuntapolitiikka/</a> ",
    id: "tiedelehdet_yhteiskuntapolitiikka",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_tietolinja = {
    title: "Tietolinja",
    description: "Tietolinja (1/2000–2/2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Kansalliskirjasto<br/>Kotisivu: <a href='http://tietolinja.kansalliskirjasto.fi/'>http://tietolinja.kansalliskirjasto.fi/</a>",
    id: "tiedelehdet_tietolinja",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_mediajaviestinta = {
    title: "Media & Viestintä/Tiedotustutkimus",
    description: "Tiedotustutkimus (2005–2009) / Media & Viestintä (2010–2014)<br/>Julkaisija: Media- ja viestintätieteellinen seura<br/>Kotisivu: <a href='http://mediaviestinta.fi/blogi/'>http://mediaviestinta.fi/blogi/</a>",
    id: "tiedelehdet_mediajaviestinta",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_issue: {
	    label: "issue"
        }
    }
};


settings.corpora.tiedelehdet_terra = {
    title: "Terra",
    description: "Terra (2000–2013)<br/>Sisältää lehden <a href='http://elektra.helsinki.fi/lehdet.html'>Elektra-tietokannassa</a> keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen maantieteellinen seura<br/>Kotisivu: <a href='http://www.helsinki.fi/maantiede/geofi/terra/'>http://www.helsinki.fi/maantiede/geofi/terra/</a>",
    id: "tiedelehdet_terra",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "issue"
        }
    }
};


settings.corpora.tiedelehdet_rakmek = {
    title: "Rakenteiden mekaniikka",
    description: "Rakenteiden mekaniikka (2000–2014)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Rakenteiden mekaniikan seura<br/>Kotisivu: <a href='http://rmseura.tkk.fi/rmlehti/'>http://rmseura.tkk.fi/rmlehti/</a>",
    id: "tiedelehdet_rakmek",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }

    }
};

settings.corpora.tiedelehdet_nimi = {
    title: "NMI-Bulletin",
    description: "NMI-Bulletin (2002–2003, 2007–2012)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Niilo Mäki instituutti<br/>Kotisivu: <a href='http://bulletin.nmi.fi/arkisto/'>http://bulletin.nmi.fi/arkisto/</a>",
    id: "tiedelehdet_nimi",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_prologi = {
    title: "Prologi",
    description: "Prologi (2009–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Prologos ry<br/>Kotisivu: <a href='http://prologos.fi/prologi/'>http://prologos.fi/prologi/</a>",
    id: "tiedelehdet_prologi",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_metsatiede = {
    title: "Metsätieteen aikakauskirja",
    description: "Metsätieteen aikakauskirja (2000–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Luonnonvarakeskus & Suomen Metsätieteellinen Seura<br/>Kotisivu: <a href='http://www.metla.fi/aikakauskirja/'>http://www.metla.fi/aikakauskirja/</a>",
    id: "tiedelehdet_metsatiede",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_ravitsemus = {
    title: "Ravitsemuskatsaus",
    description: "Ravitsemuskatsaus (2007–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Maito ja Terveys ry<br/>Kotisivu: <a href='http://www.maitojaterveys.fi/www/fi/ravitsemuskatsaus/lehdet/index.php'>http://www.maitojaterveys.fi/www/fi/ravitsemuskatsaus/lehdet/index.php</a>",
    id: "tiedelehdet_ravitsemus",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue"
        }

    }
};

settings.corpora.tiedelehdet_kulutustutkimus = {
    title: "Kulutustutkimus.Nyt",
    description: "Kulutustutkimus.Nyt (2007–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Kulutustutkimuksen seura ry<br/>Kotisivu: <a href='http://www.kulutustutkimus.net/nyt/'>http://www.kulutustutkimus.net/nyt/</a>",
    id: "tiedelehdet_kulutustutkimus",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue"
        }

    }
};

settings.corpora.tiedelehdet_sananjalka = {
    title: "Sananjalka",
    description: "Sananjalka (2006–2013)<br/>Sisältää lehden <a href='http://elektra.helsinki.fi/lehdet.html'>Elektra-tietokannassa</a> keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen kielen seura<br/>Kotisivu: <a href='http://www.suomenkielenseura.fi/sananjalka/'>http://www.suomenkielenseura.fi/sananjalka/</a>",
    id: "tiedelehdet_sananjalka",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "issue"
        }
    }
};


settings.corpora.tiedelehdet_kirkkohistoria = {
    title: "Suomen kirkkohistoriallisen seuran vuosikirja",
    description: "Suomen kirkkohistoriallisen seuran vuosikirja (2000–2014)<br/>Sisältää lehden <a href='http://elektra.helsinki.fi/lehdet.html'>Elektra-tietokannassa</a> keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen kirkkohistoriallinen seura<br/>Kotisivu: <a href='http://www.skhs.fi/julkaisut/vuosikirja/'>http://www.skhs.fi/julkaisut/vuosikirja/</a>",
    id: "tiedelehdet_kirkkohistoria",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "issue"
        }
    }
};


settings.corpora.tiedelehdet_skholion = {
    title: "Skholion",
    description: "Skholion (2009–1/2012)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen Bysantin tutkimuksen seura ry<br/>Kotisivu: <a href='http://www.protsv.fi/bts/BTSskholion.html'>http://www.protsv.fi/bts/BTSskholion.html</a>",
    id: "tiedelehdet_skholion",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }

    }
};


settings.corpora.tiedelehdet_siirtolaisuus = {
    title: "Siirtolaisuus-Migration",
    description: "Siirtolaisuus-Migration (2000–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Siirtolaisuusinstituutti<br/>Kotisivu: <a href='http://www.migrationinstitute.fi/fi/julkaisut/siirtolaisuus-migration'>http://www.migrationinstitute.fi/fi/julkaisut/siirtolaisuus-migration</a>",
    id: "tiedelehdet_siirtolaisuus",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }

    }
};



settings.corpora.tiedelehdet_taimiuutiset = {
    title: "Taimiuutiset",
    description: "Taimiuutiset (2000–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Luonnonvarakeskus Suonenjoki<br/>Kotisivu: <a href='http://www.metla.fi/taimiuutiset/'>http://www.metla.fi/taimiuutiset/</a>",
    id: "tiedelehdet_taimiuutiset",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue"
        }

    }
};

settings.corpora.tiedelehdet_kulttuurintutkimus = {
    title: "Kulttuurintutkimus",
    description: "Kulttuurintutkimus (2004–2013)<br/>Sisältää lehden kotisivulla ja <a href='http://elektra.helsinki.fi/lehdet.html'>Elektra-tietokannassa</a> keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Kulttuurintutkimuksen seura ry<br/>Kotisivu: <a href='http://www.kulttuurintutkimus.fi/lehti/'>http://www.kulttuurintutkimus.fi/lehti/</a>",
    id: "tiedelehdet_kulttuurintutkimus",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_matkailututkimus = {
    title: "Matkailututkimus",
    description: "Matkailututkimus (2005–2013)<br/>Sisältää lehden <a href='http://elektra.helsinki.fi/lehdet.html'>Elektra-tietokannassa</a> keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen matkailututkimuksen seura ry<br/>Kotisivu: <a href='http://matkailututkimus.org/'>http://matkailututkimus.org/</a>",
    id: "tiedelehdet_matkailututkimus",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_kunnallistiede = {
    title: "Kunnallistieteellinen aikakauskirja",
    description: "Kunnallistieteellinen aikakauskirja (2002–2012)<br/>Sisältää lehden <a href='http://elektra.helsinki.fi/lehdet.html'>Elektra-tietokannassa</a> keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Kunnallistieteen yhdistys<br/>Kotisivu: <a href='http://www.kunnallistiede.fi/aikakauskirja/'>http://www.kunnallistiede.fi/aikakauskirja/</a>",
    id: "tiedelehdet_kunnallistiede",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_maaseudunuusiaika = {
    title: "Maaseudun uusi aika",
    description: "Maaseudun uusi aika (2000–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Maaseudun uusi aika -yhdistys<br/>Kotisivu: <a href='http://www.mua.fi/lehti/'>http://www.mua.fi/lehti/</a>",
    id: "tiedelehdet_maaseudunuusiaika",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        /*text_title: sattrs.text_title,*/
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};


settings.corpora.tiedelehdet_elo = {
    title: "Elinikäisen ohjauksen verkkolehti",
    description: "Elinikäisen ohjauksen verkkolehti (2011–2014)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: JAMK ammatillinen opettajakorkeakoulu<br/>Kotisivu: <a href='http://verkkolehdet.jamk.fi/elo/'>http://verkkolehdet.jamk.fi/elo/</a>",
    id: "tiedelehdet_elo",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_bryobrotherella = {
    title: "Bryobrotherella",
    description: "Bryobrotherella (2008–2012)<br/>Julkaisija: Suomen Sammalseura<br/>Kotisivu: <a href='http://www.suomensammalseura.fi/'>http://www.suomensammalseura.fi</a>",
    id: "tiedelehdet_bryobrotherella",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_lounaishame = {
    title: "Lounais-Hämeen Luonto",
    description: "Lounais-Hämeen Luonto (2000–2010)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Lounais-Hämeen Luonnonsuojeluyhdistys ry<br/>Kotisivu: <a href='http://www.lounaisluonto.net/'>http://www.lounaisluonto.net/</a>",
    id: "tiedelehdet_lounaishame",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_kompositio = {
    title: "Kompositio",
    description: "Kompositio (2007–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen Säveltäjät ry<br/>Kotisivu: <a href='http://www.composers.fi/tietoa-yhdistyksesta/kompositio/'>http://www.composers.fi/tietoa-yhdistyksesta/kompositio/</a>",
    id: "tiedelehdet_kompositio",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_liiketalous = {
    title: "Liiketaloudellinen Aikakauskirja",
    description: "Liiketaloudellinen Aikakauskirja (2000–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Liiketaloustieteellinen Yhdistys ry<br/>Kotisivu: <a href='http://lta.hse.fi/'>http://lta.hse.fi/</a>",
    id: "tiedelehdet_liiketalous",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};


settings.corpora.tiedelehdet_geofoorumi = {
    title: "GeoFoorumi",
    description: "GeoFoorumi (2006–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Geologian tutkimuskeskus (GTK)<br/><a href='http://www.gtk.fi/ajankohtaista/painotuotteet/geofoorumi/'>http://www.gtk.fi/ajankohtaista/painotuotteet/geofoorumi/</a>",
    id: "tiedelehdet_geofoorumi",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_agricola = {
    title: "Agricolan Tietosanomat",
    description: "Agricolan Tietosanomat (2000)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: <br/>Kotisivu: <a href='http://agricola.utu.fi/julkaisut/tietosanomat/'>http://agricola.utu.fi/julkaisut/tietosanomat/</a>",
    id: "tiedelehdet_agricola",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_atitle: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_author: sattrs.article_author,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_diakonia = {
    title: "Diakonian tutkimus –aikakauskirja",
    description: "Diakonian tutkimus -aikakauskirja (2004–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Diakonian Tutkimuksen Seura<br/>Kotisivu: <a href='http://dts.fi/aikakauskirja/'>http://dts.fi/aikakauskirja/</a>",
    id: "tiedelehdet_diakonia",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        /*text_url: sattrs.link_lehdet,*/
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_psykologia = {
    title: "Psykologia-lehti",
    description: "Psykologia-lehti (2009–2010)<br/>Julkaisija: Suomen psykologinen seura<br/>Kotisivu: <a href='http://www.psykologia.fi/'>http://www.psykologia.fi/</a>",
    id: "tiedelehdet_psykologia",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        /*text_url: sattrs.link_lehdet,*/
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_ruralia = {
    title: "Ruralia-lehti",
    description: "Ruralia-lehti (2006–2014)<br/>Julkaisija: Ruralia-instituutti<br/>Kotisivu: <a href='http://www.helsinki.fi/ruralia/'>http://www.helsinki.fi/ruralia/</a>",
    id: "tiedelehdet_ruralia",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_historiallinen = {
    title: "Historiallinen Aikakauskirja",
    description: "Historiallinen Aikakauskirja (2001–2013)<br/>Sisältää lehden <a href='http://elektra.helsinki.fi/lehdet.html'>Elektra-tietokannassa</a> keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen Historiallinen Seura & Historian Ystäväin Liitto<br/>Kotisivu: <a href='http://www.historiallinenaikakauskirja.fi/'>http://www.historiallinenaikakauskirja.fi/</a>",
    id: "tiedelehdet_historiallinen",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_havina = {
    title: "Havina",
    description: "Havina (2009–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Oulun yliopisto, Historiatieteet</br>Kotisivu: <a href='http://www.havina.net/'>http://www.havina.net/</a>",
    id: "tiedelehdet_havina",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_atitle: sattrs.text_title,
        text_date: sattrs.date,
        text_url: sattrs.link_lehdet,
        text_author: sattrs.article_author,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_harukaze = {
    title: "Harukaze",
    description: "Harukaze (2000–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Japani-opinnot, Oulun yliopisto, Oulu<br/>Kotisivu: <a href='http://www.oulu.fi/Harukaze/'>http://www.oulu.fi/Harukaze/</a>",
    id: "tiedelehdet_harukaze",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_atitle: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_author: sattrs.article_author,
        text_date: sattrs.date,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_glossae = {
    title: "Glossae",
    description: "Glossae (2000–2012)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Keskiajan opinto- ja tutkimusyhdistys<br/>Kotisivu: <a href='http://www.glossa.fi/glossae/arkisto.php'>http://www.glossa.fi/glossae/arkisto.php</a>",
    id: "tiedelehdet_glossae",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};


settings.corpora.tiedelehdet_musiikkikasv = {
    title: "Musiikkikasvatuslehti",
    description: "Musiikkikasvatuslehti (2014)<br/>Julkaisijat: Sibelius-Akatemia & Suomen Taidekasvatuksen tutkimusseura<br/>Kotisivu: <a href='http://www2.siba.fi/musiikkikasvatuslehti/'>http://www2.siba.fi/musiikkikasvatuslehti/</a>",
    id: "tiedelehdet_musiikkikasv",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_areiopagi = {
    title: "Areiopagi",
    description: "Areiopagi (2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Areiopagi ry<br/>Kotisivu: <a href='http://www.areiopagi.fi/'>http://www.areiopagi.fi/</a>",
    id: "tiedelehdet_areiopagi",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_atitle: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_author: sattrs.article_author,
        text_issue: {
            label: "issue"
        }
    }
};


settings.corpora.tiedelehdet_ats = {
    title: "ATS-Ydintekniikka",
    description: "ATS-Ydintekniikka (2000–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen Atomiteknillinen Seura<br/>Kotisivu: <a href='http://www.ats-fns.fi/fi/ats-ydintekniikka/lehdet'>http://www.ats-fns.fi/fi/ats-ydintekniikka/lehdet</a>",
    id: "tiedelehdet_ats",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        /*text_url: sattrs.link_lehdet,*/
        text_issue: {
            label: "issue"
        }
    }
};


settings.corpora.tiedelehdet_auraica = {
    title: "Auraica",
    description: "Auraica (2008–2012)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Porthan-Seura ry<br/>Kotisivu: <a href='http://ojs.tsv.fi/index.php/Aur/issue/archive'>http://ojs.tsv.fi/index.php/Aur/issue/archive</a>",
    id: "tiedelehdet_auraica",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_aikuiskasvatus = {
    title: "Aikuiskasvatus",
    description: "Aikuiskasvatus (2011–2014)<br/><a href='https://www.kielipankki.fi/wp-content/uploads/Aikuiskasvatus_artikkeliluettelo.pdf'>Artikkeliluettelo</a><br/>Julkaisijat: Aikuiskasvatuksen Tutkimusseura ry ja Kansanvalistusseura<br/>Kotisivu: <a href='http://www.doria.fi/handle/10024/7300'>http://www.doria.fi/handle/10024/7300</a>",
    id: "tiedelehdet_aikuiskasvatus",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_atitle: sattrs.text_title,
        /*text_date: sattrs.date,*/
        text_author: sattrs.article_author,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_toksikologi = {
    title: "Toksikologi-lehti",
    description: "Toksikologi-lehti (2000–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen toksikologiyhdistys<br/>Kotisivu: <a href='http://www.toksikologit.fi/lehti.html'>http://www.toksikologit.fi/lehti.html</a>",
    id: "tiedelehdet_toksikologi",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_walbum = {
    title: "W-album",
    description: "W-album (2004–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Turun Eläin- ja Kasvitieteellisen seuran Hyönteiskerho<br/>Kotisivu: <a href='http://org.utu.fi/harrastus/TEKS/w-album/'>http://org.utu.fi/harrastus/TEKS/w-album/</a>",
    id: "tiedelehdet_walbum",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_tyoelama = {
    title: "Työelämän tutkimus",
    description: "Työelämän tutkimus (2003–2012)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Työelämän tutkimusyhdistys<br/>Kotisivu: <a href='http://www.tyoelamantutkimus.fi/tyoelaman-tutkimus-arbetslivsforskning-lehtitidskrift/lehdet/'>http://www.tyoelamantutkimus.fi/tyoelaman-tutkimus-arbetslivsforskning-lehtitidskrift/lehdet/</a>",
    id: "tiedelehdet_tyoelama",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet
    }
};

settings.corpora.tiedelehdet_ura = {
    title: "Ura/Valtiotieteilijä",
    description: "Valtiotieteilijä (2009–2011), Ura (2012–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Yhteiskunta-alan korkeakoulutetut ry<br/>Kotisivu: <a href='http://uralehti.fi/arkisto/'>http://uralehti.fi/arkisto/</a>",
    id: "tiedelehdet_ura",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_virittaja = {
    title: "Virittäjä",
    description: "Virittäjä (3/2006–4/2013)<br/>Sisältää lehden kotisivulla ja <a href='http://elektra.helsinki.fi/lehdet.html'>Elektra-tietokannassa</a> keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Kotikielen seura<br/>Kotisivu: <a href='http://www.kotikielenseura.fi/virittaja/verkkolehti/'>http://www.kotikielenseura.fi/virittaja/verkkolehti/</a>",
    id: "tiedelehdet_virittaja",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_citationabstracthtmlurl: sattrs.link_lehdet,
        text_citationauthors: {
            label: "text_author"
        },
        text_citationpublisher: {
            label: "text_publisher"
        },
        text_citationtitle: {
            label: "text_title"
        },
        text_citationdate: {
            label: "year"
        },
        text_citation: {
            label: "lehdet_issue"
        }
    }
};

settings.corpora.tiedelehdet_ymparistohistoria = {
    title: "Ympäristöhistoria",
    description: "Ympäristöhistoria (2011–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: <br/>Kotisivu: <a href='http://www.uta.fi/yky/tutkimus/historia/projektit/iehg/Ymparistohistoria/12011.html'>http://www.uta.fi/yky/tutkimus/historia/projektit/iehg/Ymparistohistoria/12011.html</a>",
    id: "tiedelehdet_ymparistohistoria",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }

    }
};

settings.corpora.tiedelehdet_trio = {
    title: "Trio",
    description: "Trio (2012–2014)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Sibelius Akatemia (DocMus)<br/>Kotisivu: <a href='http://www5.siba.fi/services-for-all/publications/printed-publications/periodicals'>http://www5.siba.fi/services-for-all/publications/printed-publications/periodicals</a>",
    id: "tiedelehdet_trio",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue"
        }

    }
};

settings.corpora.tiedelehdet_transmitteri = {
    title: "Transmitteri",
    description: "Transmitteri (2000–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen farmakologiyhdistys<br/>Kotisivu: <a href='http://www.sfy.fi/transmitteri.html'>http://www.sfy.fi/transmitteri.html</a>",
    id: "tiedelehdet_transmitteri",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet
    }
};


settings.corpora.tiedelehdet_thanatos = {
    title: "Thanatos",
    description: "Thanatos (2012–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomalaisen Kuolemantutkimuksen Seura ry<br/>Kotisivu: <a href='http://thanatos-journal.com/'>http://thanatos-journal.com/</a>",
    id: "tiedelehdet_thanatos",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet
    }
};



settings.corpora.tiedelehdet_aluejaymparisto = {
    title: "Alue ja ympäristö",
    description: "Alue ja ympäristö (2005–2014)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Alue- ja ympäristötutkimuksen seura<br/>Kotisivu: <a href='http://www.ays.fi/aluejaymparisto'>http://www.ays.fi/aluejaymparisto</a>",
    id: "tiedelehdet_aluejaymparisto",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        /*text_date: sattrs.date,*/
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_aakusti = {
    title: "Aakusti",
    description: "Aakusti (2008–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Savon kielen seura ry<br/>Kotisivu: <a href='http://savonkielenseura.fi/arkistosivu/'>http://savonkielenseura.fi/arkistosivu/</a>",
    id: "tiedelehdet_aakusti",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        /*text_date: sattrs.date,*/
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_30paivaa = {
    title: "30 Päivää",
    description: "30 Päivää (2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Sosiaalialan korkeakoulutettujen ammattijärjestö Talentia ry<br/>Kotisivu: <a href='http://www.talentia.isinteksas.com/julkaisut/'>http://www.talentia.isinteksas.com/julkaisut/</a>",
    id: "tiedelehdet_30paivaa",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        /*text_date: sattrs.date,*/
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_aidinkieli = {
    title: "Aikakauskirja Äidinkielen opetustiede",
    description: "Aikakauskirja Äidinkielen opetustiede (2008–2012)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Äidinkielen Opetustieteen Seura ry<br/>Kotisivu: <a href='http://www.aidinkielenopetustieteenseurary.com/'>http://www.aidinkielenopetustieteenseurary.com/</a>",
    id: "tiedelehdet_aidinkieli",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        /*text_date: sattrs.date,*/
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.tiedelehdet_kognitiivinen = {
    title: "Kognitiivinen psykoterapia",
    description: "Kognitiivinen psykoterapia (2004–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Kognitiivisen psykoterapian yhdistys<br/>Kotisivu: <a href='http://www.kognitiivinenpsykoterapia.fi/'>http://www.kognitiivinenpsykoterapia.fi/</a>",
    id: "tiedelehdet_kognitiivinen",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet
    }
};


settings.corpora.tiedelehdet_automaatiovayla = {
    id: "tiedelehdet_automaatiovayla",
    title: "Automaatioväylä",
    description: "Automaatioväylä (5/2012–4/2016)<br/>Julkaisija: Automaatioväylä Oy<br/>Kotisivu: <a href='http://www.automaatiovayla.fi/category/lehtiarkisto/'>http://www.automaatiovayla.fi/category/lehtiarkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_filename: {
            displayType: "hidden",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_baptria = {
    id: "tiedelehdet_baptria",
    title: "Baptria",
    description: "Baptria (2010–2/2011)<br/>Julkaisija: Suomen Perhostutkijain Seura ry<br/>Kotisivu: <a href='http://www.perhostutkijainseura.fi/fi/J%C3%A4senlehti+Baptria.html'>http://www.perhostutkijainseura.fi/fi/J%C3%A4senlehti+Baptria.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_filename: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_idantutkimus = {
    id: "tiedelehdet_idantutkimus",
    title: "Idäntutkimus",
    description: "Idäntutkimus (2/2003–2/2016)<br/>Julkaisija: Idäntutkimus, Venäjän ja Itä-Euroopan tutkimuksen seura ry<br/>Kotisivu: <a href='http://www.helsinki.fi/idantutkimus/arkisto.htm'>http://www.helsinki.fi/idantutkimus/arkisto.htm</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_filename: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_kliinlab = {
    id: "tiedelehdet_kliinlab",
    title: "Kliinlab",
    description: "Kliinlab (2000–2016)<br/>Julkaisija: Suomen kliinisen kemian yhdistys<br/>Kotisivu: <a href='http://www.skky.fi/kliinlab-lehti'>http://www.skky.fi/kliinlab-lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_filename: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_yhdyskuntasuunnittelu = {
    id: "tiedelehdet_yhdyskuntasuunnittelu",
    title: "Yhdyskuntasuunnittelu",
    description: "Yhdyskuntasuunnittelu (3–4/1990, 4/1993–3/1995, 1/1998, 2/2000–2012)<br/>Julkaisija: Yhdyskuntasuunnittelun seura<br/>Kotisivu: <a href='http://www.yss.fi/yhdyskuntasuunnittelu-lehti/kirjoituksia-vuosien-varrelta'>http://www.yss.fi/yhdyskuntasuunnittelu-lehti/kirjoituksia-vuosien-varrelta</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_url: sattrs.link_lehdet,
        text_filename: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_nayttamo_tutkimus = {
    id: "tiedelehdet_nayttamo_tutkimus",
    title: "Näyttämö & tutkimus",
    description: "Näyttämö & tutkimus (2005, 2006, 2009, 2011, 2014)<br/>Julkaisija: Teatterintutkimuksen seura ry<br/>Kotisivu: <a href='http://teats.fi/category/nayttamo_et_tutkimus/'>http://teats.fi/category/nayttamo_et_tutkimus/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_sosiologia = {
    id: "tiedelehdet_sosiologia",
    title: "Sosiologia",
    description: "Sosiologia (2000–2013)<br/>Julkaisija: The Westermarck Society ry<br/>Kotisivu: <a href='http://www.sosiologia.fi/'>http://www.sosiologia.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_sydanaani = {
    id: "tiedelehdet_sydanaani",
    title: "Sydänääni",
    description: "Sydänääni (2013)<br/>Julkaisija: Suomen Kardiologinen Seura ry<br/>Kotisivu: <a href='https://www.fincardio.fi/julkaisut/sydanaani/'>https://www.fincardio.fi/julkaisut/sydanaani/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_ammattikasvatuksen_aikakauskirja = {
    id: "tiedelehdet_ammattikasvatuksen_aikakauskirja",
    title: "Ammattikasvatuksen aikakauskirja",
    description: "Ammattikasvatuksen aikakauskirja (2006–2016)<br/>Sisältää lehden kotisivulla kesällä 2017 ladattavissa olleet artikkelit.<br/>Julkaisija: Ammatillisen koulutuksen tutkimusseura OTTU ry<br/>Kotisivu: <a href='https://akakk.fi/arkisto/'>https://akakk.fi/arkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_apollon = {
    id: "tiedelehdet_apollon",
    title: "Apollon",
    description: "Apollon (2012–2013)<br/>Sisältää lehden kotisivulla kesällä 2017 ladattavissa olleet artikkelit.<br/>Julkaisija: Iltakoulu ry<br/>Kotisivu: <a href='http://iltakoulu.org/julkaisut/apollon/'>http://iltakoulu.org/julkaisut/apollon/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_solubiologi = {
    id: "tiedelehdet_solubiologi",
    title: "Solubiologi",
    description: "Solubiologi (2007–2014)<br/>Julkaisija: Suomen Solubiologit ry<br/>Kotisivu: <a href='http://www.suomensolubiologit.fi/solubiologi-lehti/'>http://www.suomensolubiologit.fi/solubiologi-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_tutkimustiedote = {
    id: "tiedelehdet_tutkimustiedote",
    title: "Tutkimustiedote",
    description: "Tutkimustiedote (2000–2014)<br/>Julkaisija: Suomen Pankki<br/>Kotisivu: <a href='https://www.suomenpankki.fi/fi/media-ja-julkaisut/julkaisut/selvitykset-ja-raportit/tutkimustiedote'>https://www.suomenpankki.fi/fi/media-ja-julkaisut/julkaisut/selvitykset-ja-raportit/tutkimustiedote</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};



/* ===== LEHTIÄ ===== */

settings.corpus_aliases.muut_lehdet = "lehdet_.*";

settings.corpora.lehdet_selkosanomat = {
    title: "Selkosanomat/Selkouutiset",
    description: "Selkouutiset (18/2010–2011), Selkosanomat (2012–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Selkokeskus / Kehitysvammaliitto<br/>Kotisivu: <a href='http://selkosanomat.fi/'>http://selkosanomat.fi/</a>",
    id: "lehdet_selkosanomat",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue"
        }
    }
};

settings.corpora.lehdet_leija = {
    title: "Leija",
    description: "Leija (2009–3/2016)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Kehitysvammaisen tukiliitto ry<br/>Kotisivu: <a href='http://www.kvtl.fi/fi/me-itse/ajankohtaista/leija-lehti/'>http://www.kvtl.fi/fi/me-itse/ajankohtaista/leija-lehti/</a>",
    id: "lehdet_leija",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: {
            label: "text_title"
        },
        text_year: {
            label: "year"
        },
        text_issue: {
            label: "issue"
        },
    }
};

settings.corpora.lehdet_ekonomi = {
    title: "Ekonomi",
    description: "Ekonomi (2013–2014)<br/>Julkaisija: Suomen Ekonomiliitto<br/>Kotisivu: <a href='http://www.ekonomilehti.fi/'>http://www.ekonomilehti.fi/</a>",
    id: "lehdet_ekonomi",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_date: sattrs.date,
        text_url: sattrs.link_lehdet,
	text_issue: {
	    label: "issue"
	}
    }
};

settings.corpora.lehdet_toisinsanoen = {
    title: "Toisin sanoen",
    description: "Toisin sanoen (2005–2014)<br/>Kotisivu: <a href='http://www.toisinsanoen.fi/'>http://www.toisinsanoen.fi/</a>",
    id: "lehdet_toisinsanoen",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_date: sattrs.date,
        text_category: {
            label: "text_category"
        },
        text_author: {
            label: "article_author"
        },
    }
};

settings.corpora.lehdet_koskinen = {
    title: "Verkkolehti Koskinen",
    description: "Verkkolehti Koskinen – Kymenlaakson ammattikorkeakoulun verkkolehti (1996–2013)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Kymenlaakson ammattikorkeakoulu<br/>Kotisivu: <a href='http://www.kyamk.fi/Ajankohtaista/Verkkolehti%20Koskinen/'>http://www.kyamk.fi/Ajankohtaista/Verkkolehti%20Koskinen/</a>",
    id: "lehdet_koskinen",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_date: sattrs.date,
        text_url: sattrs.link_lehdet
    }
};


settings.corpora.lehdet_aarre = {
    id: "lehdet_aarre",
    title: "Aarre",
    description: "Aarre – Lehti Metsästä (2013–3/2015)<br/>Kotisivu: <a href='http://www.aarrelehti.fi/'>http://www.aarrelehti.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};



settings.corpora.lehdet_aino = {
    id: "lehdet_aino",
    title: "Aino",
    description: "Ylioppilaslehti Aino (2010–2015)<br/>Julkaisija: Aalto-yliopiston ylioppilaskunta<br/>Kotisivu: <a href='http://ainolehti.fi/aino/'>http://ainolehti.fi/aino/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_akavalainen = {
    id: "lehdet_akavalainen",
    title: "Akavalainen",
    description: "Akavalainen (2006–2013)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Akava, Korkeakoulutettujen työmarkkinakeskusjärjestö<br/>Kotisivu: <a href='http://www.akava.fi/akavalainen'>http://www.akava.fi/akavalainen</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_allergia = {
    id: "lehdet_allergia",
    title: "Allergia & Astma",
    description: "Allergia & Astma (2012–2014)<br/>Julkaisija: Allergia- ja Astmaliitto ry<br/>Kotisivu: <a href='http://www.allergia.fi/julkaisut/allergia-astma/'>http://www.allergia.fi/julkaisut/allergia-astma/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ammattisotilas = {
    id: "lehdet_ammattisotilas",
    title: "Ammattisotilas",
    description: "Ammattisotilas (5/2015–1/2016)<br/>Julkaisija: Aliupseeriliitto ry<br/>Kotisivu: <a href='http://www.aliupseeriliitto.fi/ammattisotilas'>http://www.aliupseeriliitto.fi/ammattisotilas</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_amnesty = {
    id: "lehdet_amnesty",
    title: "Amnesty",
    description: "Amnesty (3/2009–2013)<br/>Julkaisija: Amnesty International Suomen osasto ry<br/>Kotisivu: <a href='https://www.amnesty.fi/tietoa-meista/amnesty-lehti/'>https://www.amnesty.fi/tietoa-meista/amnesty-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ananda = {
    id: "lehdet_ananda",
    title: "Ananda",
    description: "Ananda (2005–1/2016)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Ananda-lehti/Trax Oy<br/>Kotisivu: <a href='http://www.anandalehti.fi/'>http://www.anandalehti.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_animalia = {
    id: "lehdet_animalia",
    title: "Animalia",
    description: "Animalia-lehti (2/2010–1/2016)<br/>Julkaisija: Animalia ry<br/>Kotisivu: <a href='http://animalia.fi/tietoa-animaliasta/animalia-lehti/'>http://animalia.fi/tietoa-animaliasta/animalia-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};


settings.corpora.lehdet_antimilitaristi_sivari = {
    id: "lehdet_antimilitaristi_sivari",
    title: "Antimilitaristi/Sivari & totaali",
    description: "Sivari & totaali (1990–1991, 1998–2003, 2007–2013), Antimilitaristi (2014–2015)<br/>Julkaisija: Aseistakieltäytyjäliitto ry<br/>Kotisivu: <a href='http://akl-web.fi/sivari_et_totaali/lehti_numeroittain'>http://akl-web.fi/sivari_et_totaali/lehti_numeroittain</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_filename: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};



settings.corpora.lehdet_apaja = {
    id: "lehdet_apaja",
    title: "Apaja",
    description: "Apaja (2006–1/2011)<br/>Sisältää lehden kotisivulla syksyllä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Riista- ja kalatalouden tutkimuslaitos<br/>Kotisivu: <a href='http://www.rktl.fi/julkaisut/p/apaja/'>http://www.rktl.fi/julkaisut/p/apaja/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_aselehti = {
    id: "lehdet_aselehti",
    title: "Ase-lehti",
    description: "Ase-lehti (2010–2014)<br/>Julkaisija: Ase-Lehti Oy<br/>Kotisivu: <a href='http://www.aselehti.fi/'>http://www.aselehti.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_aromi = {
    id: "lehdet_aromi",
    title: "Aromi",
    description: "Aromi – Ruoan ja Juoman Ammattilehti (2006–2013)<br/>Julkaisija: Mediatalo Keskisuomalainen Oyj Aikakauslehtiryhmä<br/>Kotisivu: <a href='http://aromilehti.fi/'>http://aromilehti.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_asukas = {
    id: "lehdet_asukas",
    title: "Asukas",
    description: "Asukas – Asiakaslehti VVO:n Asukkaille (2006–2014)<br/>Sisältää lehden kotisivulla syksyllä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: VVO-yhtymä Oyj<br/>Kotisivu: <a href='https://asukas.vvo.fi/kodikaslehti/'>https://asukas.vvo.fi/kodikaslehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_asuminen_yhteiskunta = {
    id: "lehdet_asuminen_yhteiskunta",
    title: "Asuminen ja Yhteiskunta",
    description: "Asuminen ja Yhteiskunta (2011–1/2016)<br/>Sisältää lehden kotisivulla syksyllä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Asukasliitto ry<br/>Kotisivu: <a href='http://www.asukasliitto.fi/ajankohtaista/asuminen_ja_yhteiskunta_lehti/'>http://www.asukasliitto.fi/ajankohtaista/asuminen_ja_yhteiskunta_lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_asuntoinfo = {
    id: "lehdet_asuntoinfo",
    title: "Asuntoinfo",
    description: "Asuntoinfo (3–5/2013)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> kesällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: BM Media Oy<br/>Kotisivu: <a href='http://www.lehtiluukku.fi/pub?id=51682'>http://www.lehtiluukku.fi/pub?id=51682</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_aurora = {
    id: "lehdet_aurora",
    title: "Aurora",
    description: "Aurora – Turun yliopiston sidosryhmälehti (2010–1/2013)<br/>Julkaisija: Turun yliopiston viestintä<br/>Kotisivu: <a href='http://www.utu.fi/fi/Palvelut/medialle/aurora/lue-verkossa/Sivut/home.aspx'>http://www.utu.fi/fi/Palvelut/medialle/aurora/lue-verkossa/Sivut/home.aspx</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_avainlehti = {
    id: "lehdet_avainlehti",
    title: "Avain-lehti",
    description: "Avain-lehti (2013–2014)<br/>(sisältää vain tutkimus- ja oikeus-palstat)<br/>Julkaisija: Neuroliitto ry<br/>Kotisivu: <a href='http://www.ms-liitto.fi/avain'>http://www.ms-liitto.fi/avain</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_avec = {
    id: "lehdet_avec",
    title: "Avec",
    description: "Avec (2006–2013)<br/>Julkaisija: Mediatalo Keskisuomalainen Oyj Aikakauslehtiryhmä<br/>Kotisivu: <a href='http://aromilehti.fi'>http://aromilehti.fi</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora["lehdet_avec_perhelehti"] = {
    id: "lehdet_avec_perhelehti",
    title: "Avec – Paremman avioliiton perhelehti",
    description: "Avec – Paremman avioliiton perhelehti (2005–2016)<br/>Julkaisija: Parempi avioliitto ry<br/>Kotisivu: <a href='www.parempiavioliitto.fi/'>www.parempiavioliitto.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_asukki = {
    id: "lehdet_asukki",
    title: "Asukki",
    description: "Asukki (4/2006 – 2–3/2015)<br/>Sisältää lehden kotisivulla syksyllä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Vailla vakinaista asuntoa ry<br/>Kotisivu: <a href='http://vvary.fi/haluatko-auttaa/tilaa-asukki/'>http://vvary.fi/haluatko-auttaa/tilaa-asukki/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_askel = {
    id: "lehdet_askel",
    title: "Askel",
    description: "Askel (1999–5/2002 ja 2003–2014)<br/>Julkaisija: Kotimaa Oy<br/>Kotisivu: <a href='http://www.askellehti.fi/'>http://www.askellehti.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_debatti = {
    id: "lehdet_debatti",
    title: "Debatti",
    description: "Debatti (2011–2/2014)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> kesällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Sosialidemokraattiset Opiskelijat SONK RY<br/>Kotisivu: <a href='https://sosialidemokraattisetopiskelijat.fi/debatti/'>https://sosialidemokraattisetopiskelijat.fi/debatti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ajolinja = {
    id: "lehdet_ajolinja",
    title: "Ajolinja",
    description: "Ajolinja (2009–2014)<br/>Julkaisija: B Yhtiöt Oy<br/>Kotisivu: <a href='http://www.boy.fi/ajo/'>http://www.boy.fi/ajo/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_diakonia = {
    id: "lehdet_diakonia",
    title: "Diakonia",
    description: "Diakonia (2010–2015)<br/>Julkaisijat: Diakonia ry, Kirkon diakonia ja sielunhoito, Diakoniatyöntekijöiden Liitto, Suomen Kirkon Seurakuntaopiston Säätiö, Kirkkopalvelut, Suomen Merimieskirkko, Espoon Diakoniasäätiö, Oulun Diakonissalaitoksen Säätiö, Martinus-säätiö<br/>Kotisivu: <a href='http://sakasti.evl.fi/sakasti.nsf/sp2?open&cid=Content414A42-2-2'>http://sakasti.evl.fi/sakasti.nsf/sp2?open&cid=Content414A42-2-2</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};



settings.corpora.lehdet_elinehto = {
    id: "lehdet_elinehto",
    title: "Elinehto",
    description: "Elinehto (2010–1/2016)<br/>Julkaisija: Munuais- ja maksaliitto ry<br/>Kotisivu: <a href='http://www.muma.fi/munuais-_ja_maksaliitto/julkaisut/elinehto'>http://www.muma.fi/munuais-_ja_maksaliitto/julkaisut/elinehto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_emma = {
    id: "lehdet_emma",
    title: "EMMA",
    description: "EMMA (2007–1/2016)<br/>Julkaisija: EMMA – Espoon modernin taiteen museo<br/>Kotisivu: <a href='http://www.emma.museum/emmalehti'>http://www.emma.museum/emmalehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_entisesta_enemman = {
    id: "lehdet_entisesta_enemman",
    title: "Entisestä enemmän",
    description: "Entisestä enemmän (2006–2007)<br/>Julkaisija: Lounais-Suomen Jätehuolto Oy<br/>Kotisivu: <a href='https://www.lsjh.fi/fi/'>https://www.lsjh.fi/fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ernie = {
    id: "lehdet_ernie",
    title: "Ernie",
    description: "Ernie – EY:n sidosryhmälehti (2004–2014)<br/>Julkaisija: Ernst & Young Oy<br/>Kotisivu: <a href='http://www.ey.com/fi/fi/newsroom/pr-activities/articles/ernie_asiakaslehti'>http://www.ey.com/fi/fi/newsroom/pr-activities/articles/ernie_asiakaslehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_espanjan_sanomat = {
    id: "lehdet_espanjan_sanomat",
    title: "Espanjan Sanomat",
    description: "Espanjan Sanomat (2010–7-8/2013)<br/>Kotisivu: <a href='http://espanjansanomat.es/espanjansanomat/index.php/arkisto'>http://espanjansanomat.es/espanjansanomat/index.php/arkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_espoo = {
    id: "lehdet_espoo",
    title: "Espoo Esbo",
    description: "Espoo Esbo -lehti (2012–3/2016)<br/>Sisältää lehden kotisivulla syksyllä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Espoon kaupunki<br/>Kotisivu: <a href='http://www.espoo.fi/fi-FI/Espoon_kaupunki/Ajankohtaista/Espoo_Esbo_lehti%285630%29'>http://www.espoo.fi/fi-FI/Espoon_kaupunki/Ajankohtaista/Espoo_Esbo_lehti%285630%29</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_esri = {
    id: "lehdet_esri",
    title: "Esri",
    description: "Esri (2004–2014)<br/>Julkaisija: Esri Finland Oy<br/>Kotisivu: <a href='http://www.esri.fi/yritysinfo/asiakaslehti/'>http://www.esri.fi/yritysinfo/asiakaslehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ethnos = {
    id: "lehdet_ethnos",
    title: "Ethnos",
    description: "Ethnos-tiedote ja Jäsenkirje (2/2001–2/2015)<br/>Julkaisija: Ethnos ry<br/>Kotisivu: <a href='http://www.ethnosry.org/jasenasiat/ethnos-tiedote/'>http://www.ethnosry.org/jasenasiat/ethnos-tiedote/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_eurooppalainen = {
    id: "lehdet_eurooppalainen",
    title: "Eurooppalainen",
    description: "Eurooppalainen-lehti (2007–2015)<br/>Julkaisija: Eurooppalainen Suomi ry<br/>Kotisivu: <a href='http://www.eurooppalainensuomi.fi/fi/publications/3/'>http://www.eurooppalainensuomi.fi/fi/publications/3/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_curly = {
    id: "lehdet_curly",
    title: "Curly",
    description: "Curly (4/2000–2/2016)<br/>Julkaisija: Curly ry<br/>Kotisivu: <a href='http://www.curly.fi/arkisto/'>http://www.curly.fi/arkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_focus = {
    id: "lehdet_focus",
    title: "Focus",
    description: "Focus (2008–1/2014)<br/>Julkaisija: Metropolia Ammattikorkeakoulu<br/>Kotisivu: <a href='http://www.metropolia.fi/tietoa-metropoliasta/asiakaslehti-focus/'>http://www.metropolia.fi/tietoa-metropoliasta/asiakaslehti-focus/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_folium_classicum = {
    id: "lehdet_folium_classicum",
    title: "Folium Classicum",
    description: "Folium Classicum (2004–2012)<br/>Julkaisija: Klassillis-filologinen yhdistys r.y.<br/>Kotisivu: <a href='http://www.helsinki.fi/hum/kla/kfy/folium.html'>http://www.helsinki.fi/hum/kla/kfy/folium.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hkaksi = {
    id: "lehdet_hkaksi",
    title: "H2",
    description: "H2 (2007–3/2013)<br/>Julkaisija: Haaga-Helian opiskelijakunta Helga<br/>Kotisivu: <a href='https://issuu.com/h2-lehti'>https://issuu.com/h2-lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_haavi = {
    id: "lehdet_haavi",
    title: "Haavi",
    description: "Haavi (2008–2013)<br/>Julkaisija: Havis Amandan Nuorkauppakamari – Helsinki ry<br/>Kotisivu: <a href='http://www.havisamanda.com/Suomeksi/Amandat/Media'>http://www.havisamanda.com/Suomeksi/Amandat/Media</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hallaus = {
    id: "lehdet_hallaus",
    title: "Hallaus",
    description: "Hallaus (2009–2014)<br/>Julkaisija: Huutomerkki ry<br/>Kotisivu: <a href='http://huutomerkki.fi/yhdistys/toiminta/hallaus/'>http://huutomerkki.fi/yhdistys/toiminta/hallaus/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_helen = {
    id: "lehdet_helen",
    title: "Helen",
    description: "Helen-lehti (2010–1/2015)<br/>Sisältää lehden kotisivulla kesällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Helen Oy<br/>Kotisivu: <a href='https://www.helen.fi/helen-oy/ajankohtaista/helen-lehti/'>https://www.helen.fi/helen-oy/ajankohtaista/helen-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_diabetes_ja_laakari = {
    id: "lehdet_diabetes_ja_laakari",
    title: "Diabetes ja lääkäri",
    description: "Diabetes ja lääkäri (2005–1/2016)<br/>Julkaisija: Suomen Diabetesliitto ry<br/>Kotisivu: <a href='http://www.diabetes.fi/diabetesliitto/lehdet/diabetes_ja_laakari_-lehti/lehdet_pdf-muodossa'>http://www.diabetes.fi/diabetesliitto/lehdet/diabetes_ja_laakari_-lehti/lehdet_pdf-muodossa</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_evento = {
    id: "lehdet_evento",
    title: "Evento",
    description: "Evento (2012–2016)<br/>Julkaisija: Mediatalo Keskisuomalainen Oyj Aikakauslehtiryhmä<br/>Kotisivu: <a href='http://eventolehti.fi/'>http://eventolehti.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_helmeri = {
    id: "lehdet_helmeri",
    title: "Helmeri",
    description: "Helmeri (2006–1/2016)<br/>Julkaisija: Helsingin Merkonomit ry<br/>Kotisivu: <a href='http://www.helmeri.fi/helmerilehdet'>http://www.helmeri.fi/helmerilehdet</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_helsinginhenki = {
    id: "lehdet_helsinginhenki",
    title: "Helsingin Henki",
    description: "Helsingin Henki (2009–1/2014)<br/>Julkaisija: Helsingin kaupunginkanslia<br/>Kotisivu: <a href='http://www.hel.fi/www/kanslia/fi/julkaisut-ja-kuulutukset/julkaisut/helsingin-henki'>http://www.hel.fi/www/kanslia/fi/julkaisut-ja-kuulutukset/julkaisut/helsingin-henki</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hengitys = {
    id: "lehdet_hengitys",
    title: "Hengitys",
    description: "Hengitys (2/2012 – 2–3/2016)<br/>Sisältää lehden kotisivulla syksyllä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Hengitysliitto<br/>Kotisivu: <a href='http://www.hengitysliitto.fi/Julkaisut/Hengitys-lehti/#'>http://www.hengitysliitto.fi/Julkaisut/Hengitys-lehti/#</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_heppu = {
    id: "lehdet_heppu",
    title: "Heppu",
    description: "Heppu (2011–3/2016)<br/>Julkaisija: Pääkaupunkiseudun Partiolaiset ry<br/>Kotisivu: <a href='http://www.paakaupunkiseudunpartiolaiset.fi/tietoa-meista/julkaisut/'>http://www.paakaupunkiseudunpartiolaiset.fi/tietoa-meista/julkaisut/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hima = {
    id: "lehdet_hima",
    title: "Hima",
    description: "Hima (3/2013–1/2016)<br/>Julkaisija: Helsingin kaupungin asunnot Oy<br/>Kotisivu: <a href='http://www.hekaoy.fi/asukaslehti-hima'>http://www.hekaoy.fi/asukaslehti-hima</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_huili = {
    id: "lehdet_huili",
    title: "Huili",
    description: "Huili-lehti (2–3/2013)<br/>Kotisivu: <a href='http://www.huililehti.net/'>http://www.huililehti.net/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_humanistilehti = {
    id: "lehdet_humanistilehti",
    title: "Humanistilehti",
    description: "Humanistilehti (2002–2010)<br/>Julkaisija: Helsingin Yliopiston Humanistinen tiedekunta<br/>Kotisivu: <a href='http://www.helsinki.fi/humanistilehti/pdf/index.htm'>http://www.helsinki.fi/humanistilehti/pdf/index.htm</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_jane_paulo = {
    id: "lehdet_jane_paulo",
    title: "Jane&Paulo",
    description: "Jane&Paulo (2012–2015)<br/>Julkaisija: Sosiaalialan korkeakoulutettujen ammattijärjestö Talentia ry<br/>Kotisivu: <a href='http://talentia.e-julkaisu.com/julkaisut/'>http://talentia.e-julkaisu.com/julkaisut/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_joensuun_uutiset = {
    id: "lehdet_joensuun_uutiset",
    title: "Joensuun Uutiset",
    description: "Joensuun Uutiset (2012–2013)<br/>Julkaisija: Joensuun kaupunki<br/>Kotisivu: <a href='http://www.joensuu.fi/joensuunuutisetvanha'>http://www.joensuu.fi/joensuunuutisetvanha</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_julkaisija = {
    id: "lehdet_julkaisija",
    title: "Julkaisija",
    description: "Julkaisija (2011–2014)<br/>Julkaisija: RPS Markkinointi Oy / RPS-yhtiöt<br/>Kotisivu: <a href='http://www.julkaisija.fi/lehti/'>http://www.julkaisija.fi/lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kalastuslehti = {
    id: "lehdet_kalastuslehti",
    title: "Kalastuslehti",
    description: "Kalastuslehti (2013–3/2015)<br/>Julkaisija: Krook Media Oy<br/>Kotisivu: <a href='http://www.kalamies.com/kalastus-media-video-netzine-tv-audio/kalastuslehti'>http://www.kalamies.com/kalastus-media-video-netzine-tv-audio/kalastuslehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_karhunpalvelus = {
    id: "lehdet_karhunpalvelus",
    title: "Karhunpalvelus",
    description: "Karhunpalvelus (2002–2015)<br/>Julkaisija: Porin kaupunki<br/>Kotisivu: <a href='http://www.pori.fi/henkilostopalvelut/karhunpalvelus.html'>http://www.pori.fi/henkilostopalvelut/karhunpalvelus.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kauppapolitiikka = {
    id: "lehdet_kauppapolitiikka",
    title: "Kauppapolitiikka",
    description: "Kauppapolitiikka (2013–1/2015)<br/>Julkaisija: Ulkoasiainministeriö<br/>Kotisivu: <a href='http://kauppapolitiikka.fi/tietoa-lehdesta/'>http://kauppapolitiikka.fi/tietoa-lehdesta/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kaupunkilainen = {
    id: "lehdet_kaupunkilainen",
    title: "Kaupunkilainen",
    description: "Kaupunkilainen (2/2012–1/2015)<br/>Julkaisija: Lahden kaupunki<br/>Kotisivu: <a href='https://www.lahti.fi/tietoa-lahdesta/Lahti-info/kaupunkilainen-lehti'>https://www.lahti.fi/tietoa-lahdesta/Lahti-info/kaupunkilainen-lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kaytannon_maamies = {
    id: "lehdet_kaytannon_maamies",
    title: "Käytännön maamies",
    description: "Käytännön maamies (2000–2013)<br/>Julkaisija: Agraari Oy<br/>Kotisivu: <a href='http://kaytannonmaamies.fi/'>http://kaytannonmaamies.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kemia_kemi = {
    id: "lehdet_kemia_kemi",
    title: "Kemia-Kemi",
    description: "Kemia-Kemi (2002–4/2016)<br/>Julkaisijat: Suomalaisten Kemistien Seura, Kemiallisteknillisen yhdistys ja Finska Kemistsamfundet<br/>Kotisivu: <a href='http://www.kemia-lehti.fi/nakoislehdet/'>http://www.kemia-lehti.fi/nakoislehdet/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kemilainen = {
    id: "lehdet_kemilainen",
    title: "Kemiläinen",
    description: "Kemiläinen (2012–1/2016)<br/>Julkaisija: Kemin kaupunki<br/>Kotisivu: <a href='http://www.kemi.fi/palvelut/viestinta/kemin-kaupungin-tiedotuslehti/'>http://www.kemi.fi/palvelut/viestinta/kemin-kaupungin-tiedotuslehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kontakt = {
    id: "lehdet_kontakt",
    title: "Kontakt",
    description: "Kontakt (2010–2013)<br/>Julkaisija: Suomi-Venäjä-Seura<br/>Kotisivu: <a href='http://www.venajaseura.com/etusivu/yhteystiedot/kontakt-jasenlehti'>http://www.venajaseura.com/etusivu/yhteystiedot/kontakt-jasenlehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_koti = {
    id: "lehdet_koti",
    title: "Koti",
    description: "Koti (2012–2014)<br/>Julkaisija: Maa- ja kotitalousnaisten Keskus<br/>Kotisivu: <a href='https://www.maajakotitalousnaiset.fi/kotijamaaseutu'>https://www.maajakotitalousnaiset.fi/kotijamaaseutu</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kotipuutarha = {
    id: "lehdet_kotipuutarha",
    title: "Kotipuutarha",
    description: "Kotipuutarha (2009–2014)<br/>Julkaisija: Kotipuutarha Puutarhaliitto<br/>Kotisivu: <a href='http://www.kotipuutarha.fi/lehti.html'>http://www.kotipuutarha.fi/lehti.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kumposti = {
    id: "lehdet_kumposti",
    title: "Kumposti",
    description: "Kumposti (2005–1/2016)<br/>Julkaisija: Kumpula-seura ry<br/>Kotisivu: <a href='http://kumpula.info/kumposti'>http://kumpula.info/kumposti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kunnallissuomi = {
    id: "lehdet_kunnallissuomi",
    title: "KunnallisSuomi",
    description: "KunnallisSuomi (2010–2013)<br/>Julkaisija: Suomiviesti Oy<br/>Kotisivu: <a href='http://www.suomiviesti.fi/home/KunnllisSuomi/'>http://www.suomiviesti.fi/home/KunnllisSuomi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};


settings.corpora.lehdet_kuuloset = {
    id: "lehdet_kuuloset",
    title: "Kuuloset",
    description: "Kuuloset (4/2004–2013)<br/>Julkaisija: Helsingin Kuuloyhdistys ry<br/>Kotisivu: <a href='http://www.helky.fi/kuuloset/arkisto/'>http://www.helky.fi/kuuloset/arkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kynnys = {
    id: "lehdet_kynnys",
    title: "Kynnys",
    description: "Kynnys (2010–2013)<br/>Julkaisija: Kynnys ry<br/>Kotisivu: <a href='http://kynnys.fi/viestinta/kynnys-lehdet/'>http://kynnys.fi/viestinta/kynnys-lehdet/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_lapsenmaailma = {
    id: "lehdet_lapsenmaailma",
    title: "Lapsen Maailma",
    description: "Lapsen Maailma (3/2014)<br/>Julkaisija: Lastensuojelun Keskusliitto<br/>Kotisivu: <a href='http://lapsenmaailma.fi/arkisto/'>http://lapsenmaailma.fi/arkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_legenda = {
    id: "lehdet_legenda",
    title: "Legenda",
    description: "Legenda (2002–2015)<br/>Julkaisija: Teema ry<br/>Kotisivu: <a href='http://teemary.org/?page_id=750'>http://teemary.org/?page_id=750</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_luokanopettaja = {
    id: "lehdet_luokanopettaja",
    title: "Luokanopettaja",
    description: "Luokanopettaja (3/2006–2/2015)<br/>Julkaisija: Suomen Luokanopettajat ry<br/>Kotisivu: <a href='http://www.luokanopettajaliitto.fi/index.php/luokanopettaja-lehti/lehdet'>http://www.luokanopettajaliitto.fi/index.php/luokanopettaja-lehti/lehdet</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_luuppisanomat = {
    id: "lehdet_luuppisanomat",
    title: "Luuppisanomat",
    description: "Luuppisanomat (1997–2013)<br/>Julkaisija: Luuppi ry<br/>Kotisivu: <a href='https://www.luuppi.fi/julkaisut'>https://www.luuppi.fi/julkaisut</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_me = {
    id: "lehdet_me",
    title: "Me",
    description: "Me (2014, 4/2015 – 6–7/2016)<br/>Julkaisija: Suomen Lähikauppa Oy<br/>Kotisivu: <a href='http://epaper.hansaprint.fi/melehti/Me-lehti.html'>http://epaper.hansaprint.fi/melehti/Me-lehti.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_mercurius = {
    id: "lehdet_mercurius",
    title: "Mercurius",
    description: "Mercurius (2004–3/2012)<br/>Julkaisija: Turun yliopiston kauppakorkeakoulu<br/>Kotisivu: <a href='http://www.utu.fi/fi/yksikot/tse/ajankohtaista/mercurius/Sivut/home.aspx'>http://www.utu.fi/fi/yksikot/tse/ajankohtaista/mercurius/Sivut/home.aspx</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_modin = {
    id: "lehdet_modin",
    title: "MODIN",
    description: "MODIN (2012–3/2015)<br/>Julkaisija: Muotikaupan Liitto<br/>Kotisivu: <a href='http://www.muotikaupanliitto.fi/modin/'>http://www.muotikaupanliitto.fi/modin/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_musetti = {
    id: "lehdet_musetti",
    title: "Musetti",
    description: "Musetti (2/2013–2/2015)<br/>Julkaisijat: Suomen Etnomusikologisen Seura ja Suomen Musiikkitieteellisen Seura<br/>Kotisivu: <a href='http://www.etnomusikologia.fi/p/musetti.html'>http://www.etnomusikologia.fi/p/musetti.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_nonsordino = {
    id: "lehdet_nonsordino",
    title: "NonSordino",
    description: "NonSordino (2006–1/2015)<br/>Julkaisija: Markkinointiviestinnän, -tutkimuksen ja digimedia-alan ammattilaiset MaMa ry<br/>Kotisivu: <a href='http://digimama.fi/digimama-jasenlehti/'>http://digimama.fi/digimama-jasenlehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ollaviiskytviisplus = {
    id: "lehdet_ollaviiskytviisplus",
    title: "OLLA55+",
    description: "OLLA55+ (1/2014)<br/>Julkaisija: BM media Oy<br/>Kotisivu: <a href=''></a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_omakotisanomat = {
    id: "lehdet_omakotisanomat",
    title: "Omakotisanomat",
    description: "Omakotisanomat (2011–2015)<br/>Julkaisija: Rakennustutkimus RTS Oy<br/>Kotisivu: <a href='http://www.suomirakentaa.fi/valintaoppaat/omakotisanomat'>http://www.suomirakentaa.fi/valintaoppaat/omakotisanomat</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ota_opiksi = {
    id: "lehdet_ota_opiksi",
    title: "Ota opiksi",
    description: "Ota opiksi (2012–2015)<br/>Julkaisija: Suomen Kansanopistoyhdistys ry<br/>Kotisivu: <a href='http://kansanopistot.fi/yhdistys/?linkki=19'>http://kansanopistot.fi/yhdistys/?linkki=19</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pakolainen = {
    id: "lehdet_pakolainen",
    title: "Pakolainen",
    description: "Pakolainen (2010–2014)<br/>Julkaisija: Suomen Pakolaisapu ry<br/>Kotisivu: <a href='http://pakolaisapu.fi/tag/pakolainen-lehti/'>http://pakolaisapu.fi/tag/pakolainen-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_paraisten_kuulutukset = {
    id: "lehdet_paraisten_kuulutukset",
    title: "Paraisten Kuulutukset",
    description: "Paraisten Kuulutukset (4.1.–30.5.2013)<br/>Julkaisija: Förlags Ab Sydvästkusten<br/>Kotisivu: <a href='http://www.lehtiluukku.fi/lehti/paraisten-kuulutukset'>http://www.lehtiluukku.fi/lehti/paraisten-kuulutukset</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pelastusalan_ammattilainen = {
    id: "lehdet_pelastusalan_ammattilainen",
    title: "Pelastusalan ammattilainen",
    description: "Pelastusalan ammattilainen (2007–2014)<br/>Julkaisija: Suomen Palomiesliitto SPAL ry<br/>Kotisivu: <a href='http://www.palomiesliitto.fi/'>http://www.palomiesliitto.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pelastustieto = {
    id: "lehdet_pelastustieto",
    title: "Pelastustieto",
    description: "Pelastustieto (2007–2014)<br/>Julkaisija: Palo- ja pelastustieto ry<br/>Kotisivu: <a href='http://pelastustieto.fi/digilehti/'>http://pelastustieto.fi/digilehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pihlajisto_viikinmaki = {
    id: "lehdet_pihlajisto_viikinmaki",
    title: "Pihlajiston ja Viikinmäen asukaslehti",
    description: "Pihlajiston ja Viikinmäen asukaslehti (2009–2015)<br/>Julkaisija: Pihlajisto-Viikinmäki Asukasyhdistys PNV ry<br/>Kotisivu: <a href='http://kaupunginosat.net/pihlajisto/asukaslehti-mainmenu-891'>http://kaupunginosat.net/pihlajisto/asukaslehti-mainmenu-891</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pippuri = {
    id: "lehdet_pippuri",
    title: "Pippuri",
    description: "Pippuri (2012–2014)<br/>Julkaisija: Vasemmistonaiset<br/>Kotisivu: <a href='http://www.vasemmistonaiset.fi/pippuri-lehti/'>http://www.vasemmistonaiset.fi/pippuri-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pirkkalainen = {
    id: "lehdet_pirkkalainen",
    title: "Pirkkalainen",
    description: "Pirkkalainen (2006–16/2016)<br/>Julkaisija: Pirkkala-Seura ry<br/>Kotisivu: <a href='http://www.pirkkalainen.com/'>http://www.pirkkalainen.com/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pointti = {
    id: "lehdet_pointti",
    title: "Pointti",
    description: "Pointti (2011–1/2015)<br/>Julkaisija: Porin ylioppilasyhdistys Pointer ry<br/>Kotisivu: <a href='https://porinylioppilaslehti.com/info/'>https://porinylioppilaslehti.com/info/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_poleemi = {
    id: "lehdet_poleemi",
    title: "Poleemi",
    description: "Poleemi (2009–2013)<br/>Julkaisija: Poliittisen historian opiskelijat Polho ry<br/>Kotisivu: <a href='https://poleemi.wordpress.com/arkisto/'>https://poleemi.wordpress.com/arkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_polemiikki = {
    id: "lehdet_polemiikki",
    title: "Polemiikki",
    description: "Polemiikki (2/2013, 2014–2/2016)<br/>Julkaisija: Pole-Kuntatieto Oy<br/>Kotisivu: <a href='http://kaks.fi/polemiikki-lehti/'>http://kaks.fi/polemiikki-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_policy = {
    id: "lehdet_policy",
    title: "Policy",
    description: "Policy (2008, 2011–1/2013, 3–4/2015)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> kesällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Valtio-opin opiskelijat ry<br/>Kotisivu: <a href='http://blogs.helsinki.fi/voo-ry/policy/'>http://blogs.helsinki.fi/voo-ry/policy/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_poromies = {
    id: "lehdet_poromies",
    title: "Poromies",
    description: "Poromies (2009–2014)<br/>(aineisto sisältää vain asiatekstit)<br/>Julkaisija: Paliskuntain yhdistys<br/>Kotisivu: <a href='http://paliskunnat.fi/py/organisaatio/poromies-lehti/'>http://paliskunnat.fi/py/organisaatio/poromies-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_print_media = {
    id: "lehdet_print_media",
    title: "Print&Media",
    description: "Print&Media (2011–2014)<br/>Julkaisija: Print&Media Publishing Oy<br/>Kotisivu: <a href='http://pmlehti.fi/lehti/#lehtiarkisto'>http://pmlehti.fi/lehti/#lehtiarkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pro_etelapohjanmaa = {
    id: "lehdet_pro_etelapohjanmaa",
    title: "Pro Etelä-Pohjanmaa",
    description: "Pro Etelä-Pohjanmaa (2012–2015)<br/>Julkaisija: Etelä-Pohjanmaan liitto<br/>Kotisivu: <a href='http://www.epliitto.fi/pro-etela-pohjanmaa--lehti'>http://www.epliitto.fi/pro-etela-pohjanmaa--lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_promaint_kunnossapito = {
    id: "lehdet_promaint_kunnossapito",
    title: "Promaint/Kunnossapito",
    description: "Kunnossapito (2004–2007), Promaint (2008 – 1–2/2015)<br/>Julkaisija: Kunnossapitoyhdistys Promaint Ry<br/>Kotisivu: <a href='http://www.promaintlehti.fi/Lehtiarkisto'>http://www.promaintlehti.fi/Lehtiarkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_puutarha_sanomat = {
    id: "lehdet_puutarha_sanomat",
    title: "Puutarha-Sanomat",
    description: "Puutarha-Sanomat (2011–5/2015)<br/>Julkaisija: Puutarha-Sanomat<br/>Kotisivu: <a href='http://puutarha-sanomat.fi/arkistot/category/lehtinosto'>http://puutarha-sanomat.fi/arkistot/category/lehtinosto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_sofia = {
    id: "lehdet_sofia",
    title: "Sofia",
    description: "Sofia (2000–1/2016)<br/>Julkaisija: Helsingin kaupunginmuseo<br/>Kotisivu: <a href='http://www.helsinginkaupunginmuseo.fi/sofia-lehti/'>http://www.helsinginkaupunginmuseo.fi/sofia-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_solidaarisuus = {
    id: "lehdet_solidaarisuus",
    title: "Solidaarisuus",
    description: "Solidaarisuus (2007–2014)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> kesällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Solidaarisuus<br/>Kotisivu: <a href='http://www.solidaarisuus.fi'>http://www.solidaarisuus.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_suomenmaa = {
    id: "lehdet_suomenmaa",
    title: "Suomenmaa",
    description: "Suomenmaa (2013)<br/>Julkaisija: Suomenmaa<br/>Kotisivu: <a href='http://www.suomenmaa.fi/'>http://www.suomenmaa.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_sydan_hameen_lehti = {
    id: "lehdet_sydan_hameen_lehti",
    title: "Sydän-Hämeen Lehti",
    description: "Sydän-Hämeen Lehti (2013)<br/>Julkaisija: Sydän-Hämeen Kustannus Oy<br/>Kotisivu: <a href='http://shl.fi/nakoislehdet/'>http://shl.fi/nakoislehdet/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_taku = {
    id: "lehdet_taku",
    title: "TAKU",
    description: "TAKU (3/2009–1/2016)<br/>Julkaisija: Taide- ja kulttuurialan ammattijärjestö TAKU ry<br/>Kotisivu: <a href='http://www.taku.fi/ajankohtaista/taku-lehti'>http://www.taku.fi/ajankohtaista/taku-lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_taloustaito = {
    id: "lehdet_taloustaito",
    title: "Taloustaito",
    description: "Taloustaito (2009–2013)<br/>Julkaisija: Verotieto Oy<br/>Kotisivu: <a href='https://www.taloustaito.fi/teemat/lehti/'>https://www.taloustaito.fi/teemat/lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_infront = {
    id: "lehdet_infront",
    title: "inFront",
    description: "inFront (3/2009–1/2014)<br/>Julkaisija: EXPORT Finland<br/>Kotisivu: <a href='http://www.exportfinland.fi/infront'>http://www.exportfinland.fi/infront</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tek_verkkolehti = {
    id: "lehdet_tek_verkkolehti",
    title: "TEK verkkolehti",
    description: "TEK verkkolehti (7/2012–6/2013, 1/2015, 5/2015)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> kesällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Tekniikan Akateemiset TEK<br/>Kotisivu: <a href='https://lehti.tek.fi/'>https://lehti.tek.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_terveydeksi = {
    id: "lehdet_terveydeksi",
    title: "Terveydeksi!",
    description: "Terveydeksi! (2/2014, 4/2014)<br/>Julkaisija: Apteekkariliiton viestintäyhtiö PharmaPress Oy<br/>Kotisivu: <a href='http://www.apteekki.fi/terveydeksi.html'>http://www.apteekki.fi/terveydeksi.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_toimi = {
    id: "lehdet_toimi",
    title: "Toimi",
    description: "Toimi (2009–2014)<br/>Julkaisija: Erityisalojen Toimihenkilöliitto ERTO ry<br/>Kotisivu: <a href='https://www.erto.fi/palvelut/toimi-lehti'>https://www.erto.fi/palvelut/toimi-lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tukilinja = {
    id: "lehdet_tukilinja",
    title: "Tukilinja",
    description: "Tukilinja (2010–2014)<br/>Julkaisija: Vammaisten koulutuksen ja työllistymisen tuki ry<br/>Kotisivu: <a href='http://www.tukilinja.fi/tukilinja-lehti/'>http://www.tukilinja.fi/tukilinja-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tukiviesti = {
    id: "lehdet_tukiviesti",
    title: "Tukiviesti",
    description: "Tukiviesti (6/2010–1/2014)<br/>Julkaisija: Kehitysvammaisten Tukiliitto ry<br/>Kotisivu: <a href='http://www.kvtl.fi/fi/tukiviesti-ja-leija/tukiviesti/'>http://www.kvtl.fi/fi/tukiviesti-ja-leija/tukiviesti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_turkuposti = {
    id: "lehdet_turkuposti",
    title: "Turkuposti",
    description: "Turkuposti & Turkupostin liitteet (2011–1/2016)<br/>Julkaisija: Turun kaupunki<br/>Kotisivu: <a href='https://www.turku.fi/turku-tieto/julkaisut-ja-raportit/turkupostin-arkisto'>https://www.turku.fi/turku-tieto/julkaisut-ja-raportit/turkupostin-arkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tutkain = {
    id: "lehdet_tutkain",
    title: "Tutkain",
    description: "Tutkain (2010–2/2014)<br/>Julkaisija: Tiedekunnan opiskelijajärjestö Kannunvalajat ry<br/>Kotisivu: <a href='http://www.kannunvalajat.fi/tutkain/'>http://www.kannunvalajat.fi/tutkain/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};



settings.corpora.lehdet_ubik = {
    id: "lehdet_ubik",
    title: "Ubik",
    description: "Ubik (2012–3/2013)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> kesällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen Ammattiin Opiskelevien Liitto – SAKKI ry<br/>Kotisivu: <a href='http://ubik.fi/nakoislehdet/'>http://ubik.fi/nakoislehdet/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uljas = {
    id: "lehdet_uljas",
    title: "Uljas",
    description: "Uljas (2014–4/2016)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> kesällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Itä-Suomen yliopiston ylioppilaskunta<br/>Kotisivu: <a href='http://www.uljas.net/lehdet/'>http://www.uljas.net/lehdet/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uniikki = {
    id: "lehdet_uniikki",
    title: "UNIIKKI",
    description: "UNIIKKI (2014–3/2015)<br/>Julkaisija: Yliopiston Apteekki<br/>Kotisivu: <a href='http://uniikki.fi/'>http://uniikki.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_universitas = {
    id: "lehdet_universitas",
    title: "Universitas",
    description: "Universitas (2012–2/2016)<br/>Julkaisija: Yliopistojen ja tutkimusalan henkilöstöliitto YHL<br/>Kotisivu: <a href='http://www.pardia.fi/yhl-etusivu/viestinta/universitas/'>http://www.pardia.fi/yhl-etusivu/viestinta/universitas/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_utain = {
    id: "lehdet_utain",
    title: "Utain",
    description: "Utain (2002–2013)<br/>Julkaisija: Viestinnän, median ja teatterin yksikkö, Tampereen yliopisto<br/>Kotisivu: <a href='http://utain.uta.fi/'>http://utain.uta.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uusiouutiset = {
    id: "lehdet_uusiouutiset",
    title: "Uusiouutiset",
    description: "Uusiouutiset – Suomen kiertotalouden erikoislehti (2005–2015)<br/>Kotisivu: <a href='http://www.uusiouutiset.fi/'>http://www.uusiouutiset.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uusipaiva = {
    id: "lehdet_uusipaiva",
    title: "Uusi Päivä",
    description: "Uusi Päivä (2011–2015)<br/>Julkaisija: Turun Vasemmistoliitto ry<br/>Kotisivu: <a href='http://www.turunvasemmisto.fi/19'>http://www.turunvasemmisto.fi/19</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uutis_jousi = {
    id: "lehdet_uutis_jousi",
    title: "Uutis-Jousi",
    description: "Uutis-Jousi (2013)<br/>Julkaisija: Keskisuomalainen Oyj<br/>Kotisivu: <a href='http://www.uutis-jousi.fi/nakoislehti/'>http://www.uutis-jousi.fi/nakoislehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vaasan_ylioppilaslehti = {
    id: "lehdet_vaasan_ylioppilaslehti",
    title: "Vaasan Ylioppilaslehti",
    description: "Vaasan Ylioppilaslehti (5/2012–5/2013)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> kesällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Vaasan yliopiston ylioppilaskunta<br/>Kotisivu: <a href='http://www.vaasanylioppilaslehti.fi/'>http://www.vaasanylioppilaslehti.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_valitysuutiset = {
    id: "lehdet_valitysuutiset",
    title: "VälitysUutiset",
    description: "VälitysUutiset (2012–2013)<br/>Julkaisija: Kirjavälitys Oy<br/>Kotisivu: <a href='http://www.kirjavalitys.fi/'>http://www.kirjavalitys.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vammaisurheilu = {
    id: "lehdet_vammaisurheilu",
    title: "Vammaisurheilu & -liikunta",
    description: "Vammaisurheilu & -liikunta (2010–1/2016)<br/>Julkaisija: Suomen Vammaisurheilu ja -liikunta VAU ry<br/>Kotisivu: <a href='http://www.vammaisurheilu.fi/mika-on-vau/lehti/lehtiarkisto'>http://www.vammaisurheilu.fi/mika-on-vau/lehti/lehtiarkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vanhustyo = {
    id: "lehdet_vanhustyo",
    title: "Vanhustyö",
    description: "Vanhustyö (2009–2015)<br/>Julkaisija: Vanhustyön keskusliitto<br/>Kotisivu: <a href='http://www.vtkl.fi/fin/vaikutamme/vanhustyo_lehti/tutustu_lehteen/'>http://www.vtkl.fi/fin/vaikutamme/vanhustyo_lehti/tutustu_lehteen/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vankilavirkailija = {
    id: "lehdet_vankilavirkailija",
    title: "Vankilavirkailija",
    description: "Vankilavirkailija (2009–3/2011)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> kesällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Vankilavirkailijain Liitto VVL r.y.<br/>Kotisivu: <a href='http://www.vankilavirkailija.fi/lehdet'>http://www.vankilavirkailija.fi/lehdet</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vantaan_akseli = {
    id: "lehdet_vantaan_akseli",
    title: "Vantaan Akseli",
    description: "Vantaan Akseli (2009–1/2013)<br/>Sisältää <a href='https://issuu.com'>Issuussa</a> kesällä 2016 ladattavissa olleet artikkelit.<br/>Julkaisija: Vantaan Akselin kehitysryhmä<br/>Kotisivu: <a href='www.vantaanakseli.fi'>www.vantaanakseli.fi</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_via = {
    id: "lehdet_via",
    title: "Via",
    description: "Via (3/2013–3/2014)<br/>Julkaisija: Destia Oy<br/>Kotisivu: <a href='http://www.destia.fi/uutishuone/julkaisut/vian-arkisto.html'>http://www.destia.fi/uutishuone/julkaisut/vian-arkisto.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tatsi = {
    id: "lehdet_tatsi",
    title: "Tatsi",
    description: "Tatsi (2011–1/2016)<br/>Julkaisija: Työttömien ay-jäsenten tukiyhdistys ry<br/>Kotisivu: <a href='http://tatsi.org/tatsi-lehti/arkisto/'>http://tatsi.org/tatsi-lehti/arkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tiedetoimittaja = {
    id: "lehdet_tiedetoimittaja",
    title: "Tiedetoimittaja",
    description: "Tiedetoimittaja (2008–2013)<br/>Julkaisija: Suomen tiedetoimittajain liitto ry<br/>Kotisivu: <a href='http://www.tiedetoimittajat.fi/tiedetoimittajalehti/tiedetoimittajat-arkisto/'>http://www.tiedetoimittajat.fi/tiedetoimittajalehti/tiedetoimittajat-arkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_elamassa_kelansanomat = {
    id: "lehdet_elamassa_kelansanomat",
    title: "Elämässä/Kelan sanomat",
    description: "Kelan sanomat (2008), Elämässä (2009–2014)<br/>Julkaisija: Kansaneläkelaitos (Kela)<br/>Kotisivu: <a href='http://www.kela.fi/elamassa'>http://www.kela.fi/elamassa</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};



settings.corpora.lehdet_sosiaalivakuutus = {
    id: "lehdet_sosiaalivakuutus",
    title: "Sosiaalivakuutus",
    description: "Sosiaalivakuutus (2006–2010, 2015–2016)<br/>Julkaisija: Kansaneläkelaitos (Kela)<br/>Kotisivu: <a href='http://www.kela.fi/sosiaalivakuutus'>http://www.kela.fi/sosiaalivakuutus</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_cplehti = {
    id: "lehdet_cplehti",
    title: "CP-lehti",
    description: "CP-lehti (2010–1/2014)<br/>Julkaisija: Suomen CP-liitto ry<br/>Kotisivu: <a href='http://www.cp-liitto.fi/suomen_cp-liitto_ry/cp-lehti/arkisto'>http://www.cp-liitto.fi/suomen_cp-liitto_ry/cp-lehti/arkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_edimensio = {
    id: "lehdet_edimensio",
    title: "eDimensio",
    description: "eDimensio (2008–2013)<br/>Julkaisija: Matemaattisten aineiden opettajien liitto MAOL ry<br/>Kotisivu: <a href='http://www.maol.fi/julkaisut/edimensio/arkisto/?L=gdesjgsatmavb'>http://www.maol.fi/julkaisut/edimensio/arkisto/?L=gdesjgsatmavb</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_effortti = {
    id: "lehdet_effortti",
    title: "Effortti",
    description: "Effortti (2010–2016)<br/>Julkaisija: Suomen Tanssiterapiayhdistys ry<br/>Kotisivu: <a href='http://www.tanssiterapia.net/index.php?page=31'>http://www.tanssiterapia.net/index.php?page=31</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_helsinki_info = {
    id: "lehdet_helsinki_info",
    title: "Helsinki-info",
    description: "Helsinki-info (4/2004–3/2016)<br/>Julkaisija: Helsingin kaupunki<br/>Kotisivu: <a href='http://www.hel.fi/www/kanslia/helsinkiinfo-fi/arkisto/'>http://www.hel.fi/www/kanslia/helsinkiinfo-fi/arkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hervannan_sanomat = {
    id: "lehdet_hervannan_sanomat",
    title: "Hervannan Sanomat",
    description: "Hervannan Sanomat (47/2012–9/2016)<br/>Julkaisija: Hervannan Sanomat<br/>Kotisivu: <a href='http://hervannansanomat.fi/nakoislehti/'>http://hervannansanomat.fi/nakoislehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hopealeijona = {
    id: "lehdet_hopealeijona",
    title: "Hopealeijona",
    description: "Hopealeijona (2/2003–2007)<br/>Julkaisija: Suomen Heraldinen Seura<br/>Kotisivu: <a href='http://www.heraldica.fi/Julkaisut/Hopea_leijona/hopealeijona.htm'>http://www.heraldica.fi/Julkaisut/Hopea_leijona/hopealeijona.htm</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_hyva_asukas = {
    id: "lehdet_hyva_asukas",
    title: "Hyvä Asukas",
    description: "Hyvä Asukas (2012–3/2016)<br/>Julkaisija: Nokian kaupunki<br/>Kotisivu: <a href='http://www.nokiankaupunki.fi/kuntainfo/hallinto/viestinta/tiedotuslehti/'>http://www.nokiankaupunki.fi/kuntainfo/hallinto/viestinta/tiedotuslehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_impakti = {
    id: "lehdet_impakti",
    title: "Impakti",
    description: "Impakti (1995–1/2016)<br/>Julkaisija: Yva ry<br/>Kotisivu: <a href='http://www.yvary.fi/arkisto/impakti/'>http://www.yvary.fi/arkisto/impakti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_infors = {
    id: "lehdet_infors",
    title: "INFORS",
    description: "INFORS (1998–2016)<br/>Julkaisija: Suomen Operaatiotutkimusseura ry<br/>Kotisivu: <a href='http://www.operaatiotutkimus.fi/infors.html'>http://www.operaatiotutkimus.fi/infors.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_jargonia = {
    id: "lehdet_jargonia",
    title: "J@rgonia",
    description: "J@rgonia (2003–2016)<br/>Julkaisija: Historian ja etnologian laitoksen tutkijat ry<br/>Kotisivu: <a href='http://research.jyu.fi/jargonia/arkisto.shtml'>http://research.jyu.fi/jargonia/arkisto.shtml</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kalpa = {
    id: "lehdet_kalpa",
    title: "Kalpa",
    description: "Kalpa (2006–1/2016)<br/>Julkaisija: Kadettioppilaskunta ry (KOK)<br/>Kotisivu: <a href='https://kadettitoverikunta.fi/index.htm?nav=kalpa&lang=fi'>https://kadettitoverikunta.fi/index.htm?nav=kalpa&lang=fi</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kansanopisto = {
    id: "lehdet_kansanopisto",
    title: "Kansanopisto",
    description: "Kansanopisto (2004–2011)<br/>Julkaisija: Suomen Kansanopistoyhdistys<br/>Kotisivu: <a href='http://www.kansanopistot.fi/lehti/'>http://www.kansanopistot.fi/lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_karhunkierros = {
    id: "lehdet_karhunkierros",
    title: "Karhunkierros",
    description: "Karhunkierros (1990–2/2016)<br/>Julkaisija: Satakuntalainen Osakunta<br/>Kotisivu: <a href='https://www.satakuntalainenosakunta.fi/fi/osakunta/karhunkierros/'>https://www.satakuntalainenosakunta.fi/fi/osakunta/karhunkierros/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kehittaja = {
    id: "lehdet_kehittaja",
    title: "Kehittäjä",
    description: "Kehittäjä (2/2005–2015)<br/>Julkaisija: Laurea-ammattikorkeakoulu Oy<br/>Kotisivu: <a href='https://www.laurea.fi/tutkimus-kehitys-ja-innovaatiot/tutustu-kehittaja-lehteen'>https://www.laurea.fi/tutkimus-kehitys-ja-innovaatiot/tutustu-kehittaja-lehteen</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kerberos = {
    id: "lehdet_kerberos",
    title: "Kerberos",
    description: "Kerberos (2000–2/2010)<br/>Julkaisija: Kerberos<br/>Kotisivu: <a href='http://www.kolhoosi.fi/kerberos/vanhat.html'>http://www.kolhoosi.fi/kerberos/vanhat.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_keski_espoon_sanomat = {
    id: "lehdet_keski_espoon_sanomat",
    title: "Keski-Espoon Sanomat",
    description: "Keski-Espoon Sanomat (1/1990, 2001–2015)<br/>Julkaisija: Keski-Espoo-seura ry<br/>Kotisivu: <a href='http://www.keskiespooseura.fi/arkisto'>http://www.keskiespooseura.fi/arkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_keva = {
    id: "lehdet_keva",
    title: "Keva",
    description: "Keva (2010–2016)<br/>Julkaisija: Keva<br/>Kotisivu: <a href='https://www.keva.fi/tama-on-keva/keva-lehti/'>https://www.keva.fi/tama-on-keva/keva-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kide = {
    id: "lehdet_kide",
    title: "KIDE",
    description: "KIDE (4/2008–2009, 2012–3/2016)<br/>Julkaisija: Pääkaupunkiseudun Diabetesyhdistys ry<br/>Kotisivu: <a href='http://www.psdiabetes.fi/kide-jasenlehti/'>http://www.psdiabetes.fi/kide-jasenlehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};



settings.corpora.lehdet_aromi = {
    id: "lehdet_aromi",
    title: "Aromi",
    description: "Aromi – Ruoan ja Juoman Ammattilehti (2006–2013)<br/>Julkaisija: Mediatalo Keskisuomalainen Oyj Aikakauslehtiryhmä<br/>Kotisivu: <a href='http://aromilehti.fi/'>http://aromilehti.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_avec = {
    id: "lehdet_avec",
    title: "Avec",
    description: "Avec (2006–2013)<br/>Julkaisija: Mediatalo Keskisuomalainen Oyj Aikakauslehtiryhmä<br/>Kotisivu: <a href='http://aromilehti.fi'>http://aromilehti.fi</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora["lehdet_avec_perhelehti"] = {
    id: "lehdet_avec_perhelehti",
    title: "Avec – Paremman avioliiton perhelehti",
    description: "Avec – Paremman avioliiton perhelehti (2005–2016)<br/>Julkaisija: Parempi avioliitto ry<br/>Kotisivu: <a href='www.parempiavioliitto.fi/'>www.parempiavioliitto.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};





settings.corpora.lehdet_poromies = {
    id: "lehdet_poromies",
    title: "Poromies",
    description: "Poromies (2009–2014)<br/>(aineisto sisältää vain asiatekstit)<br/>Julkaisija: Paliskuntain yhdistys<br/>Kotisivu: <a href='http://paliskunnat.fi/py/organisaatio/poromies-lehti/'>http://paliskunnat.fi/py/organisaatio/poromies-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_promaint_kunnossapito = {
    id: "lehdet_promaint_kunnossapito",
    title: "Promaint/Kunnossapito",
    description: "Kunnossapito (2004–2007), Promaint (2008 – 1–2/2015)<br/>Julkaisija: Kunnossapitoyhdistys Promaint Ry<br/>Kotisivu: <a href='http://www.promaintlehti.fi/Lehtiarkisto'>http://www.promaintlehti.fi/Lehtiarkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kirjo = {
    id: "lehdet_kirjo",
    title: "Kirjo",
    description: "Kirjo (3/2002–2/2007, 3/2010–2/2011)<br/>Julkaisija: Kirjallisuus- ja kulttuuriseura Kirjo<br/>Kotisivu: <a href='http://www.palladiumkirjat.fi/kirjo.htm'>http://www.palladiumkirjat.fi/kirjo.htm</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kita = {
    id: "lehdet_kita",
    title: "KITA",
    description: "KITA Kiinteistö & Talotekniikka (2010–2016)<br/>Julkaisija: PubliCo Oy<br/>Kotisivu: <a href='http://www.kita.fi/lehti.html'>http://www.kita.fi/lehti.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_koiviston_viesti = {
    id: "lehdet_koiviston_viesti",
    title: "Koiviston Viesti",
    description: "Koiviston Viesti (2007–9/2015)<br/>Julkaisija: Suomen Koivisto-Seura r.y.<br/>Kotisivu: <a href='http://www.koivistolaiset.net/Sivut/Koiviston%207_lehdet.html'>http://www.koivistolaiset.net/Sivut/Koiviston%207_lehdet.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_koor = {
    id: "lehdet_koor",
    title: "Koor",
    description: "Koor (2/2006–1/2015)<br/>Julkaisija: Suomi-Somalia Seura ry<br/>Kotisivu: <a href='https://suomisomaliaseura.wordpress.com/arkisto/'>https://suomisomaliaseura.wordpress.com/arkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kotosalla = {
    id: "lehdet_kotosalla",
    title: "Kotosalla",
    description: "Kotosalla (2007–2/2016)<br/>Julkaisija: Sallan kunta<br/>Kotisivu: <a href='http://www.salla.fi/Kotosallalehti'>http://www.salla.fi/Kotosallalehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kuljetusyrittaja = {
    id: "lehdet_kuljetusyrittaja",
    title: "Kuljetusyrittäjä",
    description: "Kuljetusyrittäjä (2007–8/2016)<br/>Julkaisija: SKAL Kustannus Oy<br/>Kotisivu: <a href='https://www.skal.fi/julkaisut/kuljetusyrittaja-lehti/lehtiarkisto'>https://www.skal.fi/julkaisut/kuljetusyrittaja-lehti/lehtiarkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kumina = {
    id: "lehdet_kumina",
    title: "Kumina",
    description: "Kumina (2006–2013)<br/>Julkaisija: Kuntien asiantuntijat KUMULA ry<br/>Kotisivu: <a href='http://kumula.fi/kumula/kumina/arkisto/'>http://kumula.fi/kumula/kumina/arkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kyvyt_kayttoon_vates = {
    id: "lehdet_kyvyt_kayttoon_vates",
    title: "Kyvyt käyttöön/Vates",
    description: "Vates-info (2005–2/2008), Kyvyt käyttöön (3/2008–2016)<br/>Julkaisija: Vates-säätiö<br/>Kotisivu: <a href='http://www.vates.fi/vates/aineistot/kyvyt-kayttoon-lehdet.html#kk2011asti'>http://www.vates.fi/vates/aineistot/kyvyt-kayttoon-lehdet.html#kk2011asti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_lahde_liikkeelle = {
    id: "lehdet_lahde_liikkeelle",
    title: "Lähde liikkeelle",
    description: "Lähde liikkeelle (2003–1/2014)<br/>Julkaisija: Ammattitutkintoaineiston laadunvarmistus ALVAR<br/>Kotisivu: <a href='http://www.lahdeliikkeelle.info/'>http://www.lahdeliikkeelle.info/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_maailma_kiitotie = {
    id: "lehdet_maailma_kiitotie",
    title: "Maa&Ilma/Kiitotie",
    description: "Kiitotie (2003–1/2006), Maa&Ilma (2/2006–2012)<br/>Julkaisija: Finavia<br/>Kotisivu: <a href='https://www.finavia.fi/fi/tiedottaminen/arkisto/asiakaslehdet/'>https://www.finavia.fi/fi/tiedottaminen/arkisto/asiakaslehdet/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_materia = {
    id: "lehdet_materia",
    title: "Materia",
    description: "Materia (2010–4/2016)<br/>Julkaisija: Vuorimiesyhdistys – Bergmannaföreningen r.y.<br/>Kotisivu: <a href='http://www.vuorimiesyhdistys.fi/julkaisut/materia'>http://www.vuorimiesyhdistys.fi/julkaisut/materia</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_matkailusilma = {
    id: "lehdet_matkailusilma",
    title: "Matkailusilmä",
    description: "Matkailusilmä (2009–2/2016)<br/>Julkaisija: Visit Finland (Finpro ry)<br/>Kotisivu: <a href='http://www.matkailusilma.fi/digilehdet.html?_ga=1.76810901.1085719173.1461145697'>http://www.matkailusilma.fi/digilehdet.html?_ga=1.76810901.1085719173.1461145697</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_meripelastus = {
    id: "lehdet_meripelastus",
    title: "Meripelastus",
    description: "Meripelastus (2011–3/2016)<br/>Julkaisija: Helsingin Meripelastusyhdistys – Helsingfors Sjöräddningsförening ry<br/>Kotisivu: <a href='http://helsinki.meripelastus.fi/lehti-ja-esitteet'>http://helsinki.meripelastus.fi/lehti-ja-esitteet</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};





settings.corpora.lehdet_merkonomi = {
    id: "lehdet_merkonomi",
    title: "Merkonomi",
    description: "Merkonomi (2007–2016)<br/>Julkaisija: Suomen Merkonomiyhdistysten Liitto – SMYL ry<br/>Kotisivu: <a href='http://www.smyl.fi/wp/merkonominews/'>http://www.smyl.fi/wp/merkonominews/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_minna = {
    id: "lehdet_minna",
    title: "Minna",
    description: "Minna (2/2005–1/2016)<br/>Julkaisija: Suomalainen Naisliitto ry<br/>Kotisivu: <a href='http://suomalainennaisliitto.fi/index.php?k=226027'>http://suomalainennaisliitto.fi/index.php?k=226027</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_motiva_mplus_xpress = {
    id: "lehdet_motiva_mplus_xpress",
    title: "Motiva m+/Motiva Xpress",
    description: "Motiva Xpress (2004–2012), Motiva m+ (2013–2016)<br/>Julkaisija: Motiva<br/>Kotisivu: <a href='http://www.motiva.fi/ajankohtaista/m_-lehti'>http://www.motiva.fi/ajankohtaista/m_-lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_muusikko = {
    id: "lehdet_muusikko",
    title: "Muusikko",
    description: "Muusikko (2005–2012)<br/>Julkaisija: Suomen Muusikkojen Liitto ry<br/>Kotisivu: <a href='http://www.muusikkojenliitto.fi/muusikko/arkisto.html'>http://www.muusikkojenliitto.fi/muusikko/arkisto.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_nakyva_nainen = {
    id: "lehdet_nakyva_nainen",
    title: "Näkyvä Nainen",
    description: "Näkyvä Nainen (2008–3/2014)<br/>Julkaisija: Suomen NNKY-liitto<br/>Kotisivu: <a href='http://www.ywca.fi/jasenlehti/'>http://www.ywca.fi/jasenlehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ostrobotnia = {
    id: "lehdet_ostrobotnia",
    title: "Ostrobotnia",
    description: "Ostrobotnia (3/2003–1/2011, 2015)<br/>Julkaisija: Pohjalainen Valtuuskunta<br/>Kotisivu: <a href='http://pv.osakunta.fi/ostro/'>http://pv.osakunta.fi/ostro/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
	text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_oulunkylainen = {
    id: "lehdet_oulunkylainen",
    title: "Oulunkyläinen",
    description: "Oulunkyläinen – Pohjoiset Esikaupungit -lehti (2002–2016)<br/>Julkaisija: Oulunkylä-seura<br/>Kotisivu: <a href='http://www.kaupunginosat.net/oulunkyla/oulunkylainen/oulunkylainen_lehti.htm'>http://www.kaupunginosat.net/oulunkyla/oulunkylainen/oulunkylainen_lehti.htm</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_patria = {
    id: "lehdet_patria",
    title: "Patria",
    description: "Patria (2008–1/2016)<br/>Julkaisija: Patria Oyj<br/>Kotisivu: <a href='http://patria.fi/fi/media/esitteet-ja-julkaisut/patria-lehden-arkisto'>http://patria.fi/fi/media/esitteet-ja-julkaisut/patria-lehden-arkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_perussuomalainen = {
    id: "lehdet_perussuomalainen",
    title: "Perussuomalainen",
    description: "Perussuomalainen (2004–10/2016)<br/>Julkaisija: Perussuomalaiset rp<br/>Kotisivu: <a href='https://www.suomenuutiset.fi/lehtiarkisto/'>https://www.suomenuutiset.fi/lehtiarkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pihlajamaki_info = {
    id: "lehdet_pihlajamaki_info",
    title: "Pihlajamäki.info/Pihlajamäen lähiölehti",
    description: "Pihlajamäen lähiölehti (2007–2015), Pihlajamäki.info (2016)<br/>Julkaisija: Pihlajamäki-seura ry<br/>Kotisivu: <a href='http://pihlajamaki.info/pihlajamen-lhilehti-mainmenu-937'>http://pihlajamaki.info/pihlajamen-lhilehti-mainmenu-937</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pirta = {
    id: "lehdet_pirta",
    title: "Pirta",
    description: "Pirta (2012–2016)<br/>Julkaisija: Kalevalaisten Naisten Liitto<br/>Kotisivu: <a href='http://www.kalevalaistennaistenliitto.fi/pirta.html'>http://www.kalevalaistennaistenliitto.fi/pirta.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_plari = {
    id: "lehdet_plari",
    title: "Plari",
    description: "Plari (3/2008–2016)<br/>Julkaisija: Helsingin Eteläpohjalaiset ry<br/>Kotisivu: <a href='http://www.helsinginetelapohjalaiset.fi/?cat=13'>http://www.helsinginetelapohjalaiset.fi/?cat=13</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_prointerior = {
    id: "lehdet_prointerior",
    title: "Prointerior",
    description: "Prointerior (2004–2016)<br/>Julkaisija: PubliCo Oy<br/>Kotisivu: <a href='http://www.prointerior.fi/lehti/lehtiarkisto.html'>http://www.prointerior.fi/lehti/lehtiarkisto.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_proresto = {
    id: "lehdet_proresto",
    title: "Proresto",
    description: "Proresto (2011–2016)<br/>Julkaisija: PubliCo Oy<br/>Kotisivu: <a href='http://www.proresto.fi/lehtiarkisto.html'>http://www.proresto.fi/lehtiarkisto.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ruotuvaki = {
    id: "lehdet_ruotuvaki",
    title: "Ruotuväki",
    description: "Ruotuväki (22/2014–21/2016)<br/>Julkaisija: Puolustusvoimat<br/>Kotisivu: <a href='http://ruotuvaki.fi/lehdet-2016'>http://ruotuvaki.fi/lehdet-2016</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_saariselka = {
    id: "lehdet_saariselka",
    title: "Saariselkä Nyt!",
    description: "Saariselkä Nyt! (2012–2013)<br/>Julkaisija: Pasi Ruotsalainen<br/>Kotisivu: <a href='http://www.saariselka.net/arkisto.html'>http://www.saariselka.net/arkisto.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_saima = {
    id: "lehdet_saima",
    title: "Saima",
    description: "Saima (2009–2/2013, 3/2015–1/2016)<br/>Julkaisija: Itä-Suomen Yliopisto<br/>Kotisivu: <a href='http://www.uef.fi/fi/saima/arkisto'>http://www.uef.fi/fi/saima/arkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_secretarius = {
    id: "lehdet_secretarius",
    title: "Secretarius",
    description: "Secretarius (4/2012–2013)<br/>Julkaisija: Sihteeriyhdistys ry<br/>Kotisivu: <a href='http://www.sihteeriyhdistys.fi/fi/secretarius-lehti/secretarius-arkisto/?PHPSESSID=70b0d09d2c2dbb7a4826fcd126ce6ecc'>http://www.sihteeriyhdistys.fi/fi/secretarius-lehti/secretarius-arkisto/?PHPSESSID=70b0d09d2c2dbb7a4826fcd126ce6ecc</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_skrolli = {
    id: "lehdet_skrolli",
    title: "Skrolli",
    description: "Skrolli (2012–1/2016)<br/>Julkaisija: Skrolli ry<br/>Kotisivu: <a href='http://skrolli.fi/numerot'>http://skrolli.fi/numerot</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_sosso = {
    id: "lehdet_sosso",
    title: "Sössö",
    description: "Sössö (2003, 2005–2/2016)<br/>Julkaisija: TKK:n Sähköinsinöörikilta ry<br/>Kotisivu: <a href='http://sik.ayy.fi/fi/sosso/'>http://sik.ayy.fi/fi/sosso/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_sukuviesti = {
    id: "lehdet_sukuviesti",
    title: "Sukuviesti",
    description: "Sukuviesti (2005–2015)<br/>Julkaisija: Siposten Sukuseura ry<br/>Kotisivu: <a href='http://www.sipostensukuseura.com/sukuviesti'>http://www.sipostensukuseura.com/sukuviesti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_suomen_historiallinen = {
    id: "lehdet_suomen_historiallinen",
    title: "Suomen historiallisen seuran jäsenlehti",
    description: "Suomen historiallisen seuran jäsenlehti (3/1997–1/2016)<br/>Julkaisija: Suomen Historiallinen Seura<br/>Kotisivu: <a href='http://www.histseura.fi/jasenlehtiarkisto.html'>http://www.histseura.fi/jasenlehtiarkisto.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_suomi_puola = {
    id: "lehdet_suomi_puola",
    title: "Suomi–Puola",
    description: "Suomi–Puola Finlandia–Polska (2009–2015)<br/>Julkaisija: Suomi-Puola Yhdistysten Liitto ry<br/>Kotisivu: <a href='http://www.suomi-puola.net/lehti'>http://www.suomi-puola.net/lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_susikko = {
    id: "lehdet_susikko",
    title: "Susikko",
    description: "Susikko (2010–2/2016)<br/>Sisältää lehden kotisivulla keväällä 2016 ladattavissa olleet artikkelit<br/>Julkaisija: Metsähistorian Seura ry<br/>Kotisivu: <a href='http://www.metsahistoria.fi/fi/julkaisut/susikko'>http://www.metsahistoria.fi/fi/julkaisut/susikko</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tamk_nyt = {
    id: "lehdet_tamk_nyt",
    title: "TAMK.nyt",
    description: "TAMK.nyt (2/2011–1/2016)<br/>Julkaisija: Tampereen ammattikorkeakoulu<br/>Kotisivu: <a href='http://www.tamk.fi/web/tamk/lehdet-ja-uutiskirjeet'>http://www.tamk.fi/web/tamk/lehdet-ja-uutiskirjeet</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tampere = {
    id: "lehdet_tampere",
    title: "Tampere",
    description: "Tampere (2002–3/2016)<br/>Julkaisija: Tampereen kaupungin viestintäyksikkö<br/>Kotisivu: <a href='http://www.tampere.fi/tampereen-kaupunki/yhteystiedot-ja-asiointi/viestinta/lehdet/tampere-lehti.html'>http://www.tampere.fi/tampereen-kaupunki/yhteystiedot-ja-asiointi/viestinta/lehdet/tampere-lehti.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tampereen_liikuntasanomat = {
    id: "lehdet_tampereen_liikuntasanomat",
    title: "Tampereen liikuntasanomat",
    description: "Tampereen liikuntasanomat (2/2005–3/2016)<br/>Julkaisija: Tampereen kaupungin liikuntapalvelut<br/>Kotisivu: <a href='http://www.tampere.fi/kulttuuri-ja-vapaa-aika/liikunta/liikuntasanomat.html'>http://www.tampere.fi/kulttuuri-ja-vapaa-aika/liikunta/liikuntasanomat.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
	text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tampu = {
    id: "lehdet_tampu",
    title: "Tampu",
    description: "Tampu (2009–1/2015)<br/>Julkaisija: Tampereen puhallinorkesteriyhdistys ry<br/>Kotisivu: <a href='http://www.tampu.fi/index.php?page=jasenlehti'>http://www.tampu.fi/index.php?page=jasenlehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tanhuviesti = {
    id: "lehdet_tanhuviesti",
    title: "Tanhuviesti",
    description: "Tanhuviesti (2009–2016)<br/>Julkaisijat: Suomalaisen Kansantanssin Ystävät ry, Kansantanssinuorten Liitto ry, Pelimannikilta ry<br/>Kotisivu: <a href='https://www.kansantanssinyst.fi/tanhuviesti/'>https://www.kansantanssinyst.fi/tanhuviesti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tanssiurheilija = {
    id: "lehdet_tanssiurheilija",
    title: "Tanssiurheilija",
    description: "Tanssiurheilija (2/2008–3/2016)<br/>Julkaisija: Suomen Tanssiurheiluliitto ry<br/>Kotisivu: <a href='https://www.zerrenlabs.com/client/tanssiurheilija/'>https://www.zerrenlabs.com/client/tanssiurheilija/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
	text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_elamantahdet_terve = {
    id: "lehdet_elamantahdet_terve",
    title: "Elämän tähdet/Terve",
    description: "Terve (2005–1/2011), Elämän tähdet (2011–2/2016)<br/>Sisältää lehden kotisivulla syksyllä 2016 ladattavissa olleet artikkelit<br/>Julkaisija: Pirkanmaan sairaanhoitopiiri<br/>Kotisivu: <a href='http://www.tays.fi/fi-FI/Sairaanhoitopiiri/Sairaanhoitopiirin_julkaisut/Elaman_tahdet'>http://www.tays.fi/fi-FI/Sairaanhoitopiiri/Sairaanhoitopiirin_julkaisut/Elaman_tahdet</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_terve_pirkanmaa = {
    id: "lehdet_terve_pirkanmaa",
    title: "Terve Pirkanmaa",
    description: "Terve Pirkanmaa (2008–2016)<br/>Julkaisija: Pirkanmaan sairaanhoitopiiri<br/>Kotisivu: <a href='http://www.tays.fi/fi-FI/Sairaanhoitopiiri/Sairaanhoitopiirin_julkaisut/Terve_Pirkanmaa'>http://www.tays.fi/fi-FI/Sairaanhoitopiiri/Sairaanhoitopiirin_julkaisut/Terve_Pirkanmaa</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tervetuloa_jyvaskylaan = {
    id: "lehdet_tervetuloa_jyvaskylaan",
    title: "Tervetuloa Jyväskylään",
    description: "Tervetuloa Jyväskylään (2006–2013)<br/>Julkaisija: Jyväskylän kaupunki<br/>Kotisivu: <a href='http://www.jyvaskyla.fi/asuminen/uusiasukas'>http://www.jyvaskyla.fi/asuminen/uusiasukas</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
	text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tietoa_maasta = {
    id: "lehdet_tietoa_maasta",
    title: "Tietoa maasta",
    description: "Tietoa maasta (2004–3/2016)<br/>Julkaisija: Maanmittauslaitos<br/>Kotisivu: <a href='http://www.maanmittauslaitos.fi/tietoa-maasta'>http://www.maanmittauslaitos.fi/tietoa-maasta</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tietoarkisto = {
    id: "lehdet_tietoarkisto",
    title: "Tietoarkisto",
    description: "Tietoarkisto (2000–2004, 2006–2015)<br/>Julkaisija: Yhteiskuntatieteellinen tietoarkisto<br/>Kotisivu: <a href='http://www.fsd.uta.fi/lehti/fi/'>http://www.fsd.uta.fi/lehti/fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tiimi = {
    id: "lehdet_tiimi",
    title: "Tiimi",
    description: "Tiimi (2003–2016)<br/>Julkaisija: A-klinikkasäätiö<br/>Kotisivu: <a href='http://www.a-klinikka.fi/tiimi/arkisto'>http://www.a-klinikka.fi/tiimi/arkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};


settings.corpora.lehdet_rautatievirkamies = {
    id: "lehdet_rautatievirkamies",
    title: "Rautatievirkamies",
    description: "Rautatievirkamies (2011–3/2016)<br/>Julkaisija: Rautatievirkamiesliitto r.y.<br/>Kotisivu: <a href='http://www.rautatievirkamiesliitto.fi/fi/ajankohtaista/lehti'>http://www.rautatievirkamiesliitto.fi/fi/ajankohtaista/lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_id: sattrs.hidden,
	text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_toolilainen = {
    id: "lehdet_toolilainen",
    title: "Toolilainen",
    description: "Toolilainen (2009–3/2016)<br/>Julkaisija: Tool ry<br/>Kotisivu: <a href='http://www.tool.fi/toolilainen-lehti/'>http://www.tool.fi/toolilainen-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tuntosarvi = {
    id: "lehdet_tuntosarvi",
    title: "Tuntosarvi",
    description: "Tuntosarvi (2011–11/2016)<br/>Julkaisija: Suomen Kuurosokeat ry<br/>Kotisivu: <a href='http://www.kuurosokeat.fi/tuntosarvi/tuntosarvi_2011.php'>http://www.kuurosokeat.fi/tuntosarvi/tuntosarvi_2011.php</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tuulivoima_tuulienergia_tuulensilma = {
    id: "lehdet_tuulivoima_tuulienergia_tuulensilma",
    title: "Tuulivoima/Tuulienergia/Tuulensilmä",
    description: "Tuulensilmä (2003–2/2008), Tuulienergia (3/2008–2013), Tuulivoima (2014–2016)<br/>Julkaisija: Suomen Tuulivoimayhdistys ry<br/>Kotisivu: <a href='http://www.tuulivoimayhdistys.fi/lehti/'>http://www.tuulivoimayhdistys.fi/lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uiotus = {
    id: "lehdet_uiotus",
    title: "Uiotus",
    description: "Uiotus (2008–1/2016)<br/>Julkaisija: Uudenmaan Insinööriopiskelijat UIO ry<br/>Kotisivu: <a href='http://uio.fi/palvelutjatoiminta/uiotus/index.dsp'>http://uio.fi/palvelutjatoiminta/uiotus/index.dsp</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_unioni = {
    id: "lehdet_unioni",
    title: "Unioni",
    description: "Unioni (4/2005–2013)<br/>Julkaisija: Ilmailualan Unioni IAU ry<br/>Kotisivu: <a href='http://www.iau.fi/index.php?mid=219'>http://www.iau.fi/index.php?mid=219</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_valkoinen_kaapio = {
    id: "lehdet_valkoinen_kaapio",
    title: "Valkoinen kääpiö",
    description: "Valkoinen kääpiö (1990–2016)<br/>Julkaisija: Jyväskylän Sirius ry<br/>Kotisivu: <a href='http://www.ursa.fi/yhd/sirius/sivut/sivu.php?sid=24'>http://www.ursa.fi/yhd/sirius/sivut/sivu.php?sid=24</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vantaan_asukaslehti = {
    id: "lehdet_vantaan_asukaslehti",
    title: "Vantaan kaupungin asukaslehti",
    description: "Vantaan kaupungin asukaslehti (2014–2016)<br/>Julkaisija: Vantaan Kaupunki<br/>Kotisivu: <a href='http://www.vantaa.fi/asukaslehti'>http://www.vantaa.fi/asukaslehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vapaa_ajattelija = {
    id: "lehdet_vapaa_ajattelija",
    title: "Vapaa Ajattelija",
    description: "Vapaa Ajattelija (2002–2/2007)<br/>Julkaisija: Vapaa-ajattelijain liitto ry<br/>Kotisivu: <a href='http://www.vapaa-ajattelijat.fi/lehti/'>http://www.vapaa-ajattelijat.fi/lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vasama = {
    id: "lehdet_vasama",
    title: "Vasama",
    description: "Vasama (2009–9/2016)<br/>Julkaisija: Sähköalojen ammattiliitto ry<br/>Kotisivu: <a href='http://www.sahkoliitto.fi/sahkoliitto/viestinta/vasama'>http://www.sahkoliitto.fi/sahkoliitto/viestinta/vasama</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_veturimies = {
    id: "lehdet_veturimies",
    title: "Veturimies",
    description: "Veturimies (2006–2015)<br/>Julkaisija: Veturimiesten liitto ry<br/>Kotisivu: <a href='http://www.vml.fi/veturimies-lehti/arkisto/'>http://www.vml.fi/veturimies-lehti/arkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_via_helsinki = {
    id: "lehdet_via_helsinki",
    title: "Via Helsinki",
    description: "Via Helsinki (2/2012, 1/2013)<br/>Julkaisija: Finavia<br/>Kotisivu: <a href='https://www.finavia.fi/fi/tiedottaminen/arkisto/asiakaslehdet/'>https://www.finavia.fi/fi/tiedottaminen/arkisto/asiakaslehdet/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_vilkku = {
    id: "lehdet_vilkku",
    title: "Vilkku",
    description: "Vilkku (2006–2016)<br/>Julkaisija: Tampereen kaupungin viestintäyksikkö<br/>Kotisivu: <a href='http://www.tampere.fi/tampereen-kaupunki/yhteystiedot-ja-asiointi/viestinta/lehdet/vilkku.html'>http://www.tampere.fi/tampereen-kaupunki/yhteystiedot-ja-asiointi/viestinta/lehdet/vilkku.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_virta = {
    id: "lehdet_virta",
    title: "Virta",
    description: "Virta kulttuurilehti (2004–2013)<br/>Julkaisija: Virta on vapaa kulttuurilehti. Jokainen kirjoittaja vastaa omista sanoistaan.<br/>Kotisivu: <a href='https://virtalehtiblog.wordpress.com/numerot/'>https://virtalehtiblog.wordpress.com/numerot/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_walpo = {
    id: "lehdet_walpo",
    title: "Walpo",
    description: "Walpo (2003–2015)<br/>Julkaisija: Turun yliopiston Politiikan tutkimuksen klubi ry (P-klubi)<br/>Kotisivu: <a href='http://www.p-klubi.fi/?id=arkisto'>http://www.p-klubi.fi/?id=arkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_yhteenveto = {
    id: "lehdet_yhteenveto",
    title: "Yhteenveto",
    description: "Yhteenveto (2015–3/2016)<br/>Julkaisija: Akavan Erityisalat AE ry<br/>Kotisivu: <a href='https://www.akavanerityisalat.fi/ajankohtaista/yhteenveto-jasenlehti/pdf-arkisto'>https://www.akavanerityisalat.fi/ajankohtaista/yhteenveto-jasenlehti/pdf-arkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_filename: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_yhys_tiedotuslehti = {
    id: "lehdet_yhys_tiedotuslehti",
    title: "YHYS-tiedotuslehti",
    description: "YHYS-tiedotuslehti (2/2005–2013)<br/>Julkaisija: Yhteiskuntatieteellisen ympäristötutkimuksen seura ry<br/>Kotisivu: <a href='http://www.yhys.net/vuosien-2005–2013-tiedotuslehdet-pdf-muodossa/'>http://www.yhys.net/vuosien-2005–2013-tiedotuslehdet-pdf-muodossa/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_filename: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_yliopistolainen = {
    id: "lehdet_yliopistolainen",
    title: "Yliopistolainen",
    description: "Yliopistolainen (2013)<br/>Julkaisija: Helsingin yliopisto<br/>Kotisivu: <a href='http://www.helsinki.fi/yliopistolainen/arkistoidut.html'>http://www.helsinki.fi/yliopistolainen/arkistoidut.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_filename: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_yrittajasanomat = {
    id: "lehdet_yrittajasanomat",
    title: "Yrittäjäsanomat",
    description: "Yrittäjäsanomat (7/2010, 2012–8/2016)<br/>Julkaisija: Suomen Yrittäjien Sypoint Oy<br/>Kotisivu: <a href='http://www.yrittajat.fi/suomenyrittajat/tiedotustoiminta/yrittajasanomat'>http://www.yrittajat.fi/suomenyrittajat/tiedotustoiminta/yrittajasanomat</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_filename: {
            displayType: "hidden",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_yritysetiikka = {
    id: "lehdet_yritysetiikka",
    title: "Yritysetiikka",
    description: "Yritysetiikka (2009–1/2016)<br/>Julkaisija: EBEN Suomi ry<br/>Kotisivu: <a href='http://www.eben-net.fi/yritysetiikka-lehti'>http://www.eben-net.fi/yritysetiikka-lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_filename: {
            displayType: "hidden",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_uusi_safiiri = {
    id: "lehdet_uusi_safiiri",
    title: "Uusi Safiiri",
    description: "Uusi Safiiri (2005–2013)<br/>Julkaisija: Via ry<br/>Kotisivu: <a href='http://www.via.fi/index.php?sivusto=uusi_safiiri&sivu=arkisto'>http://www.via.fi/index.php?sivusto=uusi_safiiri&sivu=arkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_filename: {
            displayType: "hidden",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_syopasaation_focus = {
    id: "lehdet_syopasaation_focus",
    title: "Syöpäsäätiön Focus-lehti",
    description: "Syöpäsäätiön Focus-lehti (2009–2016)<br/>Julkaisija: Syöpäsäätiö<br/>Kotisivu: <a href='https://www.syopajarjestot.fi/julkaisut/focus-lehti/'>https://www.syopajarjestot.fi/julkaisut/focus-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: {
            displayType: "hidden",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
	text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};


settings.corpora.lehdet_aalto_university_magazine = {
    id: "lehdet_aalto_university_magazine",
    title: "Aalto University Magazine",
    description: "Aalto University Magazine (1–16)<br/>Julkaisija: Aalto-yliopisto, viestintäpalvelut<br/>Kotisivu: <a href='http://www.aalto.fi/fi/current/magazine/'>http://www.aalto.fi/fi/current/magazine/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_aplodi = {
    id: "lehdet_aplodi",
    title: "Aplodi",
    description: "Aplodi (2/2012–1/2013)<br/>Julkaisija: Aplodi – Kulttuurimyymälä ja matkailuneuvonta<br/>Kotisivu: <a href='http://www.aplodi.fi/'>http://www.aplodi.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_canews = {
    id: "lehdet_canews",
    title: "CANews",
    description: "CANews (2009-kesä/2013)<br/>Julkaisija: Förlags Ab Lindan Kustannus Oy<br/>Kotisivu: <a href='http://canews.fi/fi/node/347'>http://canews.fi/fi/node/347</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_elore = {
    id: "lehdet_elore",
    title: "Elore",
    description: "Elore (2005–2016)<br/>Julkaisija: Suomen Kansantietouden Tutkijain Seura ry<br/>Kotisivu: <a href='http://www.elore.fi/lehtiarkisto/'>http://www.elore.fi/lehtiarkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_helmi = {
    id: "lehdet_helmi",
    title: "Helmi",
    description: "Helmi (2009–2014)<br/>Julkaisija: Helmi Ry<br/>Kotisivu: <a href='https://issuu.com/helmiry'>https://issuu.com/helmiry</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kielipolku_dysfasia = {
    id: "lehdet_kielipolku_dysfasia",
    title: "Kielipolku/Dysfasia",
    description: "Dysfasia (4/2009–2010), Kielipolku (2011–2013)<br/>Julkaisija: Aivoliitto ry<br/>Kotisivu: <a href='https://www.aivoliitto.fi/aivoliitto_ry/lehdet/kielipolku/lehtiarkisto'>https://www.aivoliitto.fi/aivoliitto_ry/lehdet/kielipolku/lehtiarkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kulttuurivihkot = {
    id: "lehdet_kulttuurivihkot",
    title: "Kulttuurivihkot",
    description: "Kulttuurivihkot (2–3/2003–2012)<br/>Julkaisija: Domirola Oy<br/>Kotisivu: <a href='http://kulttuurivihkot.fi/lehti/pdf'>http://kulttuurivihkot.fi/lehti/pdf</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_partio_jalki = {
    id: "lehdet_partio_jalki",
    title: "Partio ja Jälki-liite",
    description: "Partio ja Jälki-liite (4/2011–3/2013)<br/>Julkaisija: Suomen Partiolaiset – Finlands Scouter ry<br/>Kotisivu: <a href='https://www.partio.fi/partiolaisille/partio-lehti'>https://www.partio.fi/partiolaisille/partio-lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pispalalainen = {
    id: "lehdet_pispalalainen",
    title: "Pispalalainen",
    description: "Pispalalainen (2/2015, 1/2016)<br/>Julkaisija: Pispalan kumppanuus ry<br/>Kotisivu: <a href='http://www.pispala.fi/pispalalainen/'>http://www.pispala.fi/pispalalainen/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_rautalampilehti = {
    id: "lehdet_rautalampilehti",
    title: "Rautalampilehti",
    description: "Rautalampilehti (3/2007–4/2017)<br/>Julkaisija: Viestirauta Oy<br/>Kotisivu: <a href='http://www.rautalampilehti.fi/lehtiarkisto'>http://www.rautalampilehti.fi/lehtiarkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_talentia = {
    id: "lehdet_talentia",
    title: "Talentia",
    description: "Talentia (2010–3/2017)<br/>Julkaisija: Sosiaalialan korkeakoulutettujen ammattijärjestö Talentia ry<br/>Kotisivu: <a href='http://talentia.e-julkaisu.com/lehti/'>http://talentia.e-julkaisu.com/lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_teollisuussuomi = {
    id: "lehdet_teollisuussuomi",
    title: "TeollisuusSuomi",
    description: "TeollisuusSuomi (syyskuu 2015, syyskuu 2016)<br/>Julkaisija: Suomiviesti Oy<br/>Kotisivu: <a href='http://www.suomiviesti.fi/home/teollisuussuomi/'>http://www.suomiviesti.fi/home/teollisuussuomi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tyoelake = {
    id: "lehdet_tyoelake",
    title: "Työeläke",
    description: "Työeläke (2006–2/2017)<br/>Julkaisija: Eläketurvakeskus<br/>Kotisivu: <a href='http://www.etk.fi/blogit/pdf_cat/tyoelake-lehti/'>http://www.etk.fi/blogit/pdf_cat/tyoelake-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_universitaschydenius = {
    id: "lehdet_universitaschydenius",
    title: "Universitas Chydenius",
    description: "Universitas Chydenius (2006–1/2015)<br/>Julkaisija: Kokkolan yliopistokeskus Chydenius<br/>Kotisivu: <a href='https://www.chydenius.fi/tutkimus/julkaisut/universitas-chydenius'>https://www.chydenius.fi/tutkimus/julkaisut/universitas-chydenius</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_uskonnontutkija = {
    id: "tiedelehdet_uskonnontutkija",
    title: "Uskonnontutkija",
    description: "Uskonnontutkija (2006, 2/2007, 2012–2016)<br/>Julkaisija: Suomen Uskontotieteellinen Seura<br/>Kotisivu: <a href='http://uskonnontutkija.fi/arkisto/'>http://uskonnontutkija.fi/arkisto/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_virallinenlehti = {
    id: "lehdet_virallinenlehti",
    title: "Virallinen lehti",
    description: "Virallinen lehti (1999–48/2017)<br/>Julkaisija: Valtioneuvoston kanslia<br/>Kotisivu: <a href='https://www.credita.fi/vl/lehti'>https://www.credita.fi/vl/lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_yhteishyva = {
    id: "lehdet_yhteishyva",
    title: "Yhteishyvä",
    description: "Yhteishyvä (2/2014–2/2017)<br/>Julkaisija: Suomen Osuuskauppojen Keskuskunta<br/>Kotisivu: <a href='http://view.24mags.com/library/yhteishyv%C3%A4'>http://view.24mags.com/library/yhteishyv%C3%A4</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_yhteishyva_ruoka = {
    id: "lehdet_yhteishyva_ruoka",
    title: "Yhteishyvä ruoka",
    description: "Yhteishyvä ruoka (2/2014–2/2017)<br/>Julkaisija: Suomen Osuuskauppojen Keskuskunta<br/>Kotisivu: <a href='http://view.24mags.com/library/yhteishyv%C3%A4?cat=209'>http://view.24mags.com/library/yhteishyv%C3%A4?cat=209</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_husari = {
    id: "lehdet_husari",
    title: "Husari",
    description: "Husari (1/2009, 2014–3/2016)<br/>Julkaisija: Uudenmaan sairaanhoitopiirin kuntayhtymä<br/>Kotisivu: <a href='http://www.hus.fi/hus-tietoa/uutishuone/husari/lehtiarkisto/Sivut/default.aspx'>http://www.hus.fi/hus-tietoa/uutishuone/husari/lehtiarkisto/Sivut/default.aspx</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_janus = {
    id: "tiedelehdet_janus",
    title: "Janus",
    description: "Janus (2004–1/2017)<br/>Sisältää lehden kotisivulla kesällä 2017 ladattavissa olleet artikkelit.<br/>Julkaisija: Sosiaalipoliittinen yhdistys ja Sosiaalityön tutkimuksen seura<br/>Kotisivu: <a href='http://ojs.tsv.fi/index.php/janus/issue/archive?issuesPage=1#issues'>http://ojs.tsv.fi/index.php/janus/issue/archive?issuesPage=1#issues</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kuuloviesti = {
    id: "lehdet_kuuloviesti",
    title: "Kuuloviesti",
    description: "Kuuloviesti (2011–2/2016)<br/>Julkaisija: Kuuloliitto ry<br/>Kotisivu: <a href='https://www.kuuloliitto.fi/'>https://www.kuuloliitto.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_mirator = {
    id: "lehdet_mirator",
    title: "Mirator",
    description: "Mirator (2000–1/2016)<br/>Sisältää lehden kotisivulla kesällä 2017 ladattavissa olleet artikkelit.<br/>Julkaisija: Mirator c/o Glossa ry<br/>Kotisivu: <a href='http://www.glossa.fi/mirator/index_fi.html'>http://www.glossa.fi/mirator/index_fi.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_palveluesimies = {
    id: "lehdet_palveluesimies",
    title: "Palveluesimies",
    description: "Palveluesimies (2011–1/2017)<br/>Julkaisija: Kaupanalan esimiesliitto KEY ry<br/>Kotisivu: <a href='http://www.esimiesliitto.com/jasenedut-ja-palvelut/palveluesimieslehti/'>http://www.esimiesliitto.com/jasenedut-ja-palvelut/palveluesimieslehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pardianyt = {
    id: "lehdet_pardianyt",
    title: "PardiaNyt",
    description: "PardiaNyt (2014–2016)<br/>Julkaisija: Palkansaajajärjestö Pardia ry<br/>Kotisivu: <a href='http://www.pardia.fi/viestinta/pardianyt-jasenlehti2/'>http://www.pardia.fi/viestinta/pardianyt-jasenlehti2/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_pariperhe = {
    id: "lehdet_pariperhe",
    title: "Pari & Perhe",
    description: "Pari & Perhe (2007–2014)<br/>Julkaisija: Väestöliitto ry<br/>Kotisivu: <a href='http://www.vaestoliitto.fi/media/pari_perhe-lehti/arkisto'>http://www.vaestoliitto.fi/media/pari_perhe-lehti/arkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};


settings.corpora.lehdet_avh = {
    id: "lehdet_avh",
    title: "AVH",
    description: "AVH (4/2009–2/2014)<br/>Julkaisija: Aivoliitto ry<br/>Kotisivu: <a href='https://issuu.com/strokery'>https://issuu.com/strokery</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.tiedelehdet_kuntoutus = {
    id: "tiedelehdet_kuntoutus",
    title: "Kuntoutus",
    description: "Kuntoutus (2011–2012)<br/>Julkaisija: Kuntoutussäätiö<br/>Kotisivu: <a href='https://issuu.com/search?q=kuntoutus-lehti'>https://issuu.com/search?q=kuntoutus-lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_haagalainen = {
    id: "lehdet_haagalainen",
    title: "Haagalainen",
    description: "Haagalainen (2005–4/2009)<br/>Julkaisija: Haagalaisen Tuki – Stöd ry<br/>Kotisivu: <a href='http://www.haagalainen.com/arkistovanhat.htm'>http://www.haagalainen.com/arkistovanhat.htm</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_ronsy = {
    id: "lehdet_ronsy",
    title: "Rönsy",
    description: "Rönsy (2004–2015)<br/>Julkaisija: Vihreiden nuorten ja opiskelijoiden liitto ry<br/>Kotisivu: <a href='http://www.vino.fi/ronsy/ronsyn-numerot'>http://www.vino.fi/ronsy/ronsyn-numerot</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_signum = {
    id: "lehdet_signum",
    title: "Signum",
    description: "Signum (2005–1/2017)<br/>Sisältää lehden kotisivulla kesällä 2017 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen Tieteellisen Kirjastoseura<br/>Kotisivu: <a href='http://ojs.tsv.fi/index.php/signum/issue/archive'>http://ojs.tsv.fi/index.php/signum/issue/archive</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_stiiknafuulia = {
    id: "lehdet_stiiknafuulia",
    title: "Stiiknafuulia",
    description: "Stiiknafuulia (2/2011–9/2013)<br/>Julkaisija: Oulun kirjailijaseura ry<br/>Kotisivu: <a href='http://www.oulunkirjailijaseura.fi/stiiknafuulia/stiiknafuulia'>http://www.oulunkirjailijaseura.fi/stiiknafuulia/stiiknafuulia</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_url: sattrs.link_lehdet,
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tiedosta = {
    id: "lehdet_tiedosta",
    title: "Tiedosta",
    description: "Tiedosta (2015–2016)<br/>Julkaisija: TIEKE Tietoyhteiskunnan kehittämiskeskus ry<br/>Kotisivu: <a href='http://www.tieke.fi/display/julkaisut/Tiedosta+-+lehti'>http://www.tieke.fi/display/julkaisut/Tiedosta+-+lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_taydellinenympyra = {
    id: "lehdet_taydellinenympyra",
    title: "Täydellinen ympyrä",
    description: "Täydellinen ympyrä (2011–1/2017)<br/>Julkaisija: Tampereen Taiteilijaseura ry<br/>Kotisivu: <a href='http://tampereen-taiteilijaseura.fi/tampereen-taiteilijaseura-ry/taydellinen-ympyra-lehti/'>http://tampereen-taiteilijaseura.fi/tampereen-taiteilijaseura-ry/taydellinen-ympyra-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_valkonauha = {
    id: "lehdet_valkonauha",
    title: "Valkonauha",
    description: "Valkonauha (4/2012–2/2017)<br/>Julkaisija: Suomen Valkonauhaliitto ry<br/>Kotisivu: <a href='http://www.suomenvalkonauhaliitto.fi/julkaisut/valkonauha-lehti'>http://www.suomenvalkonauhaliitto.fi/julkaisut/valkonauha-lehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_virilactis = {
    id: "lehdet_virilactis",
    title: "Viri Lactis",
    description: "Viri Lactis (1997, 2005–2011, 2013)<br/>Julkaisija: Maitotalousylioppilaiden yhdistys, Viri Lactis ry<br/>Kotisivu: <a href='http://www.protsv.fi/mts/virilactis.htm'>http://www.protsv.fi/mts/virilactis.htm</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_arkkitehtiuutiset = {
    id: "lehdet_arkkitehtiuutiset",
    title: "Arkkitehtiuutiset",
    description: "Arkkitehtiuutiset (2010–4/2017)<br/>Sisältää lehden kotisivulla kesällä 2017 ladattavissa olleet artikkelit.<br/>Julkaisija: Suomen Arkkitehtiliitto ry SAFA<br/>Kotisivu: <a href='http://www.safa.fi/fin/julkaisut/arkkitehtiuutiset_au/nbspnbsparkisto'>http://www.safa.fi/fin/julkaisut/arkkitehtiuutiset_au/nbspnbsparkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_avvisio = {
    id: "lehdet_avvisio",
    title: "AV-Visio",
    description: "AV-Visio (2012–2015)<br/>Julkaisija: AVITA ry<br/>Kotisivu: <a href='http://www.av-visio.fi/'>http://www.av-visio.fi/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kide_taidelehti = {
    id: "lehdet_kide_taidelehti",
    title: "Kide – Lapin yliopiston tiede- ja taidelehti",
    description: "Kide – Lapin yliopiston tiede- ja taidelehti (2010–1/2017)<br/>Julkaisija: Lapin yliopisto/Viestintä<br/>Kotisivu: <a href='https://www.ulapland.fi/FI/Yliopisto/Kide-%E2%80%93-Lapin-yliopiston-tiede--ja-taidelehti/Aiemmat-numerot'>https://www.ulapland.fi/FI/Yliopisto/Kide-%E2%80%93-Lapin-yliopiston-tiede--ja-taidelehti/Aiemmat-numerot</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_puulehti = {
    id: "lehdet_puulehti",
    title: "Puu-lehti",
    description: "Puu-lehti (3/1999–1/2017)<br/>Julkaisija: Puuinfo Oy<br/>Kotisivu: <a href='http://www.puuinfo.fi/puulehti'>http://www.puuinfo.fi/puulehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_saarijarvelainen = {
    id: "lehdet_saarijarvelainen",
    title: "Saarijärveläinen",
    description: "Saarijärveläinen (14/2012–11/2017)<br/>Julkaisija: Maakunnan Sanomat<br/>Kotisivu: <a href='http://www.saarijarvelainen.fi/nakoislehti/'>http://www.saarijarvelainen.fi/nakoislehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_seniorilehti = {
    id: "lehdet_seniorilehti",
    title: "Suomen Seniorilehti",
    description: "Suomen Seniorilehti (2014–1/2017)<br/>Julkaisija: Suomen Senioriliike ry<br/>Kotisivu: <a href='https://www.senioriliike.fi/jasenlehti/suomen-seniorilehti/'>https://www.senioriliike.fi/jasenlehti/suomen-seniorilehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_super = {
    id: "lehdet_super",
    title: "Super",
    description: "Super (2008–10/2015)<br/>Julkaisija: Suomen lähi- ja perushoitajaliitto SuPer ry<br/>Kotisivu: <a href='http://www.superliitto.fi/viestinta/super-lehti/super-lehden-arkisto'>http://www.superliitto.fi/viestinta/super-lehti/super-lehden-arkisto</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_filename: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_syopa = {
    id: "lehdet_syopa",
    title: "Syöpä",
    description: "Syöpä (2014–2/2017)<br/>Julkaisija: Syöpäjärjestöt<br/>Kotisivu: <a href='https://www.syopajarjestot.fi/julkaisut/syopa-lehti/'>https://www.syopajarjestot.fi/julkaisut/syopa-lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_kauppakamarilehti = {
    id: "lehdet_kauppakamarilehti",
    title: "Tampereen Kauppakamarilehti",
    description: "Tampereen Kauppakamarilehti (2015–3/2017)<br/>Julkaisija: Tampereen kauppakamari<br/>Kotisivu: <a href='http://www.tampereenkauppakamarilehti.fi/nakoislehti'>http://www.tampereenkauppakamarilehti.fi/nakoislehti</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tapaturmavakuutus = {
    id: "lehdet_tapaturmavakuutus",
    title: "Tapaturmavakuutus",
    description: "Tapaturmavakuutus (2008–2009, 2013–1/2017)<br/>Julkaisija: Tapaturmavakuutuskeskus<br/>Kotisivu: <a href='http://www.tvk.fi/tietopalvelu-ja-julkaisut/lehti/'>http://www.tvk.fi/tietopalvelu-ja-julkaisut/lehti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_filename: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tapiolan_asiakaslehti = {
    id: "lehdet_tapiolan_asiakaslehti",
    title: "Tapiolan lähiseudun asiakaslehti",
    description: "Tapiolan lähiseudun asiakaslehti (2005–5/2017)<br/>Sisältää lehden kotisivulla kesällä 2017 ladattavissa olleet artikkelit.<br/>Julkaisija: Oy Quality International QI Ltd Ab<br/>Kotisivu: <a href='http://www.tapiolan.com/lehti.html'>http://www.tapiolan.com/lehti.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_terve_elama = {
    id: "lehdet_terve_elama",
    title: "Terve elämä",
    description: "Terve elämä (2006–2009)<br/>Sisältää lehden kotisivulla kesällä 2017 ladattavissa olleet artikkelit.<br/>Julkaisija: Juho Vainion Säätiö<br/>Kotisivu: <a href='http://www.juhovainionsaatio.fi/pages/suomeksi/terve-elaemae/artikkelit.php?p=10'>http://www.juhovainionsaatio.fi/pages/suomeksi/terve-elaemae/artikkelit.php?p=10</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_issue: {
            label: "issue",
        },
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_tukijalka = {
    id: "lehdet_tukijalka",
    title: "Tukijalka",
    description: "Tukijalka (1/2014)<br/>Julkaisija: Vammaisurheilun Tuki ry<br/>Kotisivu: <a href='http://vammaisurheiluntuki.com/tukijalka.html'>http://vammaisurheiluntuki.com/tukijalka.html</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_filename: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_anti = {
    id: "lehdet_anti",
    title: "Anti",
    description: "Anti (2/2004–1/2008, 1/2016–1/2017)<br/>Julkaisija: Iltakoulu ry<br/>Kotisivu: <a href='http://iltakoulu.org/julkaisut/anti/'>http://iltakoulu.org/julkaisut/anti/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_title: sattrs.text_title,
        text_year: {
            label: "year",
        },
        text_issue: {
            label: "issue",
        },
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_wieteri = {
    id: "lehdet_wieteri",
    title: "Wieteri",
    description: "Wieteri (2010–2013)<br/>Julkaisija: Espoon kaupunki<br/>Kotisivu: <a href='http://www.espoo.fi/fi-FI/Espoon_kaupunki/Tietoa_Espoosta/Julkaisut/Henkilostolehti_Wieteri(30745)'>http://www.espoo.fi/fi-FI/Espoon_kaupunki/Tietoa_Espoosta/Julkaisut/Henkilostolehti_Wieteri(30745)</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        text_title: sattrs.text_title,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_bof_online = {
    id: "lehdet_bof_online",
    title: "BoF Online",
    description: "BoF Online (2007–4/2015)<br/>Julkaisija: Suomen Pankki<br/>Kotisivu: <a href='https://www.suomenpankki.fi/fi/media-ja-julkaisut/julkaisut/selvitykset-ja-raportit/bof_online/'>https://www.suomenpankki.fi/fi/media-ja-julkaisut/julkaisut/selvitykset-ja-raportit/bof_online/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_issue: {
            label: "issue",
        },
        text_title: sattrs.text_title,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpora.lehdet_euro_talous = {
    id: "lehdet_euro_talous",
    title: "Euro & talous",
    description: "Euro & talous (1999–2016)<br/>Julkaisija: Suomen Pankki<br/>Kotisivu: <a href='https://www.suomenpankki.fi/fi/media-ja-julkaisut/julkaisut/euro--talous/'>https://www.suomenpankki.fi/fi/media-ja-julkaisut/julkaisut/euro--talous/</a>",
    licence: settings.licenceinfo.CC_BY_40,
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_id: sattrs.hidden,
        text_url: sattrs.link_lehdet,
        text_year: {
            label: "year",
        },
        text_title: sattrs.text_title,
        text_issue: {
            label: "issue",
        },
        text_filename: sattrs.hidden,
        paragraph_id: sattrs.paragraph_id_hidden,
        sentence_id: sattrs.sentence_id_hidden,
    },
};


// Corpus aliases for lehdet90ff-v2. An alternative value could be
// "tiedelehdet_.*,lehdet.*" but that would change if new corpora with
// the id prefixes are added. A better option (that would require some
// coding) might be to have in the corpus definitions a property such
// as
//     versions : ["lehdet90ff-v2"]
settings.corpus_aliases.lehdet90ff_v2 =
    settings.corpus_aliases["lehdet90ff-v2"] =
    "tiedelehdet_30paivaa,tiedelehdet_aakusti,tiedelehdet_agricola,tiedelehdet_aidinkieli,tiedelehdet_aikuiskasvatus,tiedelehdet_aluejaymparisto,tiedelehdet_ammattikasvatuksen_aikakauskirja,tiedelehdet_apollon,tiedelehdet_areiopagi,tiedelehdet_ats,tiedelehdet_auraica,tiedelehdet_automaatiovayla,tiedelehdet_avain,tiedelehdet_baptria,tiedelehdet_bryobrotherella,tiedelehdet_diakonia,tiedelehdet_elo,tiedelehdet_ennenjanyt,tiedelehdet_geofoorumi,tiedelehdet_geologi,tiedelehdet_glossae,tiedelehdet_harukaze,tiedelehdet_havina,tiedelehdet_hiidenkivi,tiedelehdet_historiallinen,tiedelehdet_historianystava,tiedelehdet_idantutkimus,tiedelehdet_ilmansuojelu,tiedelehdet_informaatio,tiedelehdet_janus,tiedelehdet_hykirjasto,tiedelehdet_kasvu,tiedelehdet_kieliskooppi,tiedelehdet_kliinlab,tiedelehdet_kognitiivinen,tiedelehdet_kompositio,tiedelehdet_kosmopolis,tiedelehdet_kulttuurintutkimus,tiedelehdet_kulutustutkimus,tiedelehdet_kunnallistiede,tiedelehdet_kuntoutus,tiedelehdet_liikenteensuunta_v2,tiedelehdet_liiketalous,tiedelehdet_liikuntajatiede,tiedelehdet_lounaishame,tiedelehdet_maaseudunuusiaika,tiedelehdet_matkailututkimus,tiedelehdet_mediajaviestinta,tiedelehdet_metsatiede,tiedelehdet_muinaistutkija,tiedelehdet_musiikinsuunta,tiedelehdet_musiikkikasv,tiedelehdet_niinnain_v2,tiedelehdet_nimi,tiedelehdet_nayttamo_tutkimus,tiedelehdet_poliittinentalous,tiedelehdet_prologi,tiedelehdet_psykologia,tiedelehdet_rakmek,tiedelehdet_ravitsemus,tiedelehdet_ruralia,tiedelehdet_sananjalka,tiedelehdet_siirtolaisuus,tiedelehdet_skas,tiedelehdet_skeptikko,tiedelehdet_skholion,tiedelehdet_solubiologi,tiedelehdet_sosiaalilaaketiede,tiedelehdet_sosiologia,tiedelehdet_suo,tiedelehdet_susa,tiedelehdet_kirkkohistoria,tiedelehdet_sydanaani,tiedelehdet_synnyt,tiedelehdet_tahiti,tiedelehdet_taimiuutiset,tiedelehdet_teologinen,tiedelehdet_terminfo,tiedelehdet_terra,tiedelehdet_thanatos,tiedelehdet_tiedejaase,tiedelehdet_tieteessatapahtuu,tiedelehdet_tktlehti,tiedelehdet_tietolinja,tiedelehdet_toksikologi,tiedelehdet_transmitteri,tiedelehdet_trio,tiedelehdet_tutkimustiedote,tiedelehdet_tutkivasos,tiedelehdet_tyoelama,tiedelehdet_ura,tiedelehdet_uskonnontutkija,tiedelehdet_vartija,tiedelehdet_versus,tiedelehdet_virittaja,tiedelehdet_walbum,tiedelehdet_yhdyskuntasuunnittelu,tiedelehdet_yhteiskuntapolitiikka,tiedelehdet_ymparistohistoria,lehdet_aalto_university_magazine,lehdet_aarre,lehdet_aino,lehdet_ajolinja,lehdet_akavalainen,lehdet_allergia,lehdet_ammattisotilas,lehdet_amnesty,lehdet_ananda,lehdet_animalia,lehdet_anti,lehdet_antimilitaristi_sivari,lehdet_apaja,lehdet_aplodi,lehdet_arkkitehtiuutiset,lehdet_aromi,lehdet_aselehti,lehdet_askel,lehdet_asukas,lehdet_asukki,lehdet_asuminen_yhteiskunta,lehdet_asuntoinfo,lehdet_aurora,lehdet_avainlehti,lehdet_avec,lehdet_avec_perhelehti,lehdet_avh,lehdet_avvisio,lehdet_bof_online,lehdet_canews,lehdet_cplehti,lehdet_curly,lehdet_debatti,lehdet_diabetes_ja_laakari,lehdet_diakonia,lehdet_edimensio,lehdet_effortti,lehdet_ekonomi,lehdet_elinehto,lehdet_elamantahdet_terve,lehdet_elamassa_kelansanomat,lehdet_elore,lehdet_emma,lehdet_entisesta_enemman,lehdet_ernie,lehdet_espanjan_sanomat,lehdet_espoo,lehdet_esri,lehdet_ethnos,lehdet_eurooppalainen,lehdet_euro_talous,lehdet_evento,lehdet_focus,lehdet_folium_classicum,lehdet_hkaksi,lehdet_haagalainen,lehdet_haavi,lehdet_hallaus,lehdet_helen,lehdet_helmeri,lehdet_helmi,lehdet_helsinginhenki,lehdet_helsinki_info,lehdet_hengitys,lehdet_heppu,lehdet_hervannan_sanomat,lehdet_hima,lehdet_hopealeijona,lehdet_huili,lehdet_humanistilehti,lehdet_husari,lehdet_hyva_asukas,lehdet_impakti,lehdet_infors,lehdet_infront,lehdet_jane_paulo,lehdet_jargonia,lehdet_joensuun_uutiset,lehdet_julkaisija,lehdet_kalastuslehti,lehdet_kalpa,lehdet_kansanopisto,lehdet_karhunkierros,lehdet_karhunpalvelus,lehdet_kauppapolitiikka,lehdet_kaupunkilainen,lehdet_kehittaja,lehdet_kemia_kemi,lehdet_kemilainen,lehdet_kerberos,lehdet_keski_espoon_sanomat,lehdet_keva,lehdet_kide,lehdet_kide_taidelehti,lehdet_kielipolku_dysfasia,lehdet_kirjo,lehdet_kita,lehdet_koiviston_viesti,lehdet_kontakt,lehdet_koor,lehdet_koti,lehdet_kotipuutarha,lehdet_kotosalla,lehdet_kuljetusyrittaja,lehdet_kulttuurivihkot,lehdet_kumina,lehdet_kumposti,lehdet_kunnallissuomi,lehdet_kuuloset,lehdet_kuuloviesti,lehdet_kynnys,lehdet_kyvyt_kayttoon_vates,lehdet_kaytannon_maamies,lehdet_lapsenmaailma,lehdet_legenda,lehdet_leija,lehdet_luokanopettaja,lehdet_luuppisanomat,lehdet_lahde_liikkeelle,lehdet_maailma_kiitotie,lehdet_materia,lehdet_matkailusilma,lehdet_me,lehdet_mercurius,lehdet_meripelastus,lehdet_merkonomi,lehdet_minna,lehdet_mirator,lehdet_modin,lehdet_motiva_mplus_xpress,lehdet_musetti,lehdet_muusikko,lehdet_nonsordino,lehdet_nakyva_nainen,lehdet_ollaviiskytviisplus,lehdet_omakotisanomat,lehdet_ostrobotnia,lehdet_ota_opiksi,lehdet_oulunkylainen,lehdet_pakolainen,lehdet_palveluesimies,lehdet_paraisten_kuulutukset,lehdet_pardianyt,lehdet_pariperhe,lehdet_partio_jalki,lehdet_patria,lehdet_pelastusalan_ammattilainen,lehdet_pelastustieto,lehdet_perussuomalainen,lehdet_pihlajamaki_info,lehdet_pihlajisto_viikinmaki,lehdet_pippuri,lehdet_pirkkalainen,lehdet_pirta,lehdet_pispalalainen,lehdet_plari,lehdet_pointti,lehdet_poleemi,lehdet_polemiikki,lehdet_policy,lehdet_poromies,lehdet_print_media,lehdet_pro_etelapohjanmaa,lehdet_prointerior,lehdet_promaint_kunnossapito,lehdet_proresto,lehdet_puulehti,lehdet_puutarha_sanomat,lehdet_rautalampilehti,lehdet_rautatievirkamies,lehdet_ruotuvaki,lehdet_ronsy,lehdet_saarijarvelainen,lehdet_saariselka,lehdet_saima,lehdet_secretarius,lehdet_selkosanomat,lehdet_signum,lehdet_skrolli,lehdet_sofia,lehdet_solidaarisuus,lehdet_sosiaalivakuutus,lehdet_stiiknafuulia,lehdet_sukuviesti,lehdet_suomen_historiallinen,lehdet_suomenmaa,lehdet_seniorilehti,lehdet_suomi_puola,lehdet_super,lehdet_susikko,lehdet_sydan_hameen_lehti,lehdet_syopa,lehdet_syopasaation_focus,lehdet_sosso,lehdet_taku,lehdet_talentia,lehdet_taloustaito,lehdet_tamk_nyt,lehdet_tampere,lehdet_kauppakamarilehti,lehdet_tampereen_liikuntasanomat,lehdet_tampu,lehdet_tanhuviesti,lehdet_tanssiurheilija,lehdet_tapaturmavakuutus,lehdet_tapiolan_asiakaslehti,lehdet_tatsi,lehdet_tek_verkkolehti,lehdet_teollisuussuomi,lehdet_terve_elama,lehdet_terve_pirkanmaa,lehdet_tervetuloa_jyvaskylaan,lehdet_terveydeksi,lehdet_tiedetoimittaja,lehdet_tiedosta,lehdet_tietoa_maasta,lehdet_tietoarkisto,lehdet_tiimi,lehdet_toimi,lehdet_toisinsanoen,lehdet_toolilainen,lehdet_tukijalka,lehdet_tukilinja,lehdet_tukiviesti,lehdet_tuntosarvi,lehdet_turkuposti,lehdet_tutkain,lehdet_tuulivoima_tuulienergia_tuulensilma,lehdet_tyoelake,lehdet_taydellinenympyra,lehdet_ubik,lehdet_uiotus,lehdet_uljas,lehdet_uniikki,lehdet_unioni,lehdet_universitas,lehdet_universitaschydenius,lehdet_utain,lehdet_uusiouutiset,lehdet_uusipaiva,lehdet_uusi_safiiri,lehdet_uutis_jousi,lehdet_vaasan_ylioppilaslehti,lehdet_valkoinen_kaapio,lehdet_valkonauha,lehdet_vammaisurheilu,lehdet_vanhustyo,lehdet_vankilavirkailija,lehdet_vantaan_akseli,lehdet_vantaan_asukaslehti,lehdet_vapaa_ajattelija,lehdet_vasama,lehdet_koskinen,lehdet_veturimies,lehdet_via,lehdet_via_helsinki,lehdet_vilkku,lehdet_virallinenlehti,lehdet_virilactis,lehdet_virta,lehdet_valitysuutiset,lehdet_walpo,lehdet_wieteri,lehdet_yhteenveto,lehdet_yhteishyva,lehdet_yhteishyva_ruoka,lehdet_yhys_tiedotuslehti,lehdet_yliopistolainen,lehdet_yrittajasanomat,lehdet_yritysetiikka";



settings.corpora.hsfi = {
    title: "HS.fi",
    description: "HS.fi-uutiskommenttiaineisto",
    id: "hsfi",
    urn: "urn:nbn:fi:lb-2014052717",
    metadata_urn: "urn:nbn:fi:lb-2014052718",
    licence: {
	urn: "urn:nbn:fi:lb-20150304140",
	name: "CLARIN ACA +NC +anonymisointi",
	description: "Vain ei-kaupalliseen tutkimuskäyttöön. Nimimerkit tulee anonymisoida korpukseen viittaavissa julkaisuissa.",
    },
    cite_id: "HS.fi",
    limited_access: true,
    licence_type: "ACA",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
        lemma: attrs.baseform,
        lemmacomp: attrs.baseform_compound,
        pos: attrs.pos_klk,
        msd: attrs.msd,
        dephead: attrs.dephead,
        deprel: attrs.deprel_tdt,
        ref: attrs.ref,
        lex: attrs.lemgram_hidden
    },
    struct_attributes: {
        sentence_id: sattrs.sentence_id_hidden,
	text_id: {
	    label: "text_id"
	},
	text_time: {
	    label: "text_time"
	    },
	text_date: {
	    label: "text_date"
	},
	text_fulldate: {
	    label: "timestamp",
	    displayType: "hidden"
	},
	text_publicnick: {
	    label: "text_publicnick",
	},
	text_title: sattrs.text_title
    }

};


settings.corpora.karjalansuomi = {
    title: "Karjalansuomi",
    description: "Karjalan suomen sanomalehtikorpus: Karjalan Sanomat (2012–2014)<br/>Julkaisija: Periodika-kustantamo<br/>Kotisivu: <a href='http://karjalansanomat.ru/'>http://karjalansanomat.ru/</a>",
    id: "karjalansuomi",
    urn: "urn:nbn:fi:lb-2016112501",
    metadata_urn: "urn:nbn:fi:lb-2014092601",
    licence: {
	name: "CLARIN ACA 1.0",
	urn: "urn:nbn:fi:lb-2016112302",
    },
    cite_id: "Karjalansuomi",
    limited_access: true,
    licence_type: "ACA",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {},
    struct_attributes: {
        text_title: sattrs.text_title,
        text_year: sattrs.date,
        text_type: {
            label: "type"
        },
        text_issue: {
            label: "issue"
        }

    }
};

settings.corpus_aliases.lehdet_ks = "karjalansuomi";


settings.corpora.reittidemo = {
    title: "Reitti A-siipeen",
    description: "Kahdenkeskisen videoidun keskustelun ”Reitti A-siipeen” yleiskielistetty litteraatti. Keskustelussa selvitetään reittiä tiettyyn Helsingin yliopiston Metsätalossa sijaitsevaan huoneeseen. Vapaasti käytettäväksi tarkoitettu näyteaineisto.",
    id: "reittidemo",
    urn: "urn:nbn:fi:lb-100110012817",
    metadata_urn: "urn:nbn:fi:lb-2014101401",
    cite_id: "Reittidemo-korp",
    licence: settings.licenceinfo.CC0,
    features: ["paragraphs", "parsed_tdt"],
    attributes: {
	spoken: attrs.spoken,
    },
    struct_attributes: {
	text_author: sattrs.author,
	text_title: sattrs.title,
	text_year: sattrs.publ_year,
	paragraph_id: sattrs.paragraph_id_hidden,
	sentence_id: sattrs.sentence_id_hidden,
	utterance_id: {
	    label: "utterance_num",
	},
	utterance_participant: {
	    label: "speaker",
	    displayType: "select",
	    dataset: [
		"ML",
		"TA"
	    ],
	    opts: settings.liteOptions
	},
	utterance_begin_time: {
	    label: "utterance_begin_time"
	},
	utterance_end_time: {
	    label: "utterance_end_time"
	},
	utterance_duration: {
	    label: "utterance_duration"
	},
	utterance_annex_link: sattrs.link_show_video_annex,
    }
};

/* Suomalaisen kirjallisuuden klassikoita (SKK) */

settings.corpora.skk_aho = {
    title: "Aho",
    description: "Juhani Ahon teoksia vuosilta 1891–1921.",
    id: "skk_aho",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	sentence_type: sattrs.sentence_type,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.skk_canth = {
    title: "Canth",
    description: "Suomalaisen kirjallisuuden klassikoita. Minna Canthin teoksia vuosilta 1884–1896.",
    id: "skk_canth",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    features: ["parsed_tdt", "finer"],
    struct_attributes: {
        sentence_type: sattrs.sentence_type,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.skk_finne = {
    title: "Finne",
    description: "Jalmari Finnen teoksia vuosilta 1914–1925.",
    id: "skk_finne",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    features: ["parsed_tdt", "finer"],
    struct_attributes: {
        sentence_type: sattrs.sentence_type,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.skk_jarnefelt = {
    title: "Järnefelt",
    description: "Arvid Järnefeltin teoksia vuosilta 1893–1930.",
    id: "skk_jarnefelt",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    features: ["parsed_tdt", "finer"],
    struct_attributes: {
        sentence_type: sattrs.sentence_type,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.skk_kailas = {
    title: "Kailas",
    description: "Uuno Kailaksen teoksia vuosilta 1921–1932.",
    id: "skk_kailas",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    features: ["parsed_tdt", "finer"],
    struct_attributes: {
        sentence_type: sattrs.sentence_type,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.skk_lassila = {
    title: "Lassila",
    description: "Kolme Maiju Lassilana parhaiten tunnetun Algoth Untolan (vuoteen 1901 Tietäväisen) teosta. Kukin on julkaistu eri taitelijanimellä: Pojat asialla on merkitty Maiju Lassilan kirjoittamaksi, Avuttomat J. I. Vatasen ja Kuoleman rajoilla Irmari Rantamalan. Vuosilta 1911–1915.",
    id: "skk_lassila",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    features: ["parsed_tdt", "finer"],
    struct_attributes: {
        sentence_type: sattrs.sentence_type,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.skk_linnankoski = {
    title: "Linnankoski",
    description: "Väinö Linnankoski: Laulu tulipunaisesta kukasta (1905).",
    id: "skk_linnankoski",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    features: ["parsed_tdt", "finer"],
    struct_attributes: {
        sentence_type: sattrs.sentence_type,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.skk_kramsu = {
    title: "Kramsu",
    description: "Kaarlo Kramsun runoelmia vuosilta 1878–1887.",
    id: "skk_kramsu",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    features: ["parsed_tdt", "finer"],
    struct_attributes: {
        sentence_type: sattrs.sentence_type,
        text_author: sattrs.text_author,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.skk_lehtonen = {
    title: "Lehtonen",
    description: "Joel Lehtosen teoksia vuosilta 1911–1934.",
    id: "skk_lehtonen",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: {
        sentence_type: sattrs.sentence_type,
        text_author: sattrs.text_author,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.skk_leino = {
    title: "Leino",
    description: "Eino Leinon kaikki alkuperäiskokoelmissa julkaistut runot ja runoelmat sekä runoja kokoelmien ulkopuolelta. Kirjailijan runonäytelmät eivät ole mukana.",
    id: "skk_leino",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    features: ["parsed_tdt", "finer"],
    struct_attributes: {
        sentence_type: sattrs.sentence_type,
        text_author: sattrs.text_author,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.skk_pakkala = {
    title: "Pakkala",
    description: "Teuvo Pakkalan teoksia vuosilta 1894–1913",
    id: "skk_pakkala",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    features: ["parsed_tdt", "finer"],
    struct_attributes: {
        sentence_type: sattrs.sentence_type,
        text_author: sattrs.text_author,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.skk_siljo = {
    title: "Siljo",
    description: "Juhani Siljon teoksia vuosilta 1910–1919",
    id: "skk_siljo",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    features: ["parsed_tdt", "finer"],
    struct_attributes: {
        sentence_type: sattrs.sentence_type,
        text_author: sattrs.text_author,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.skk_wilkuna = {
    title: "Wilkuna",
    description: "Kyösti Wilkuna, 1911 ",
    id: "skk_wilkuna",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    features: ["parsed_tdt", "finer"],
    struct_attributes: {
        sentence_type: sattrs.sentence_type,
        text_author: sattrs.text_author,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.skk_sodergran = {
    title: "Södergran",
    description: "Uuno Kailaksen suomennoksia Edith Södergranin teoksista vuosilta 1916–1925 (suom. 1929)",
    id: "skk_sodergran",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    features: ["parsed_tdt", "finer"],
    struct_attributes: {
        sentence_type: sattrs.sentence_type,
        text_author: sattrs.text_author,
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source
    }
};

settings.corpora.ethesis_maabs = {
    title: "Gradutiivistelmät",
    description: "Pro gradu -tutkielmien suomenkielisiä abstrakteja 1999–2016",
    id: "ethesis_maabs",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_dissabs = {
    title: "Väitöstiivistelmät",
    description: "Väitöskirjojen suomenkielisiä abstrakteja 2006–2016",
    id: "ethesis_dissabs",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};



settings.corpora.ethesis_phd_far = {
    title: "Farmasia",
    description: "Väitöskirjat: Farmasian tiedekunta (2005, 2013)",
    id: "ethesis_phd_far",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_phd_teo = {
    title: "Teologinen",
    description: "Väitöskirjat: Teologinen tiedekunta (2000–2016)",
    id: "ethesis_phd_teo",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_phd_beh = {
    title: "Käyttäytymistieteellinen",
    description: "Väitöskirjat: Käyttäytymistieteellinen tiedekunta (1996, 2000–2016)",
    id: "ethesis_phd_beh",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_phd_valt = {
    title: "Valtiotieteellinen",
    description: "Väitöskirjat: Valtiotieteellinen tiedekunta (1999–2016)",
    id: "ethesis_phd_valt",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_phd_ot = {
    title: "Oikeustieteellinen",
    description: "Väitöskirjat: Oikeustieteellinen tiedekunta (2001, 2004–2010, 2012, 2014–2016)",
    id: "ethesis_phd_ot",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_phd_hum = {
    title: "Humanistinen",
    description: "Väitöskirjat: Humanistinen tiedekunta (2000–2016)",
    id: "ethesis_phd_hum",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_phd_bio = {
    title: "Bio- ja ympäristötieteellinen",
    description: "Väitöskirjat: Bio- ja ympäristötieteellinen tiedekunta (2005)",
    id: "ethesis_phd_bio",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_phd_el = {
    title: "Eläinlääketieteellinen",
    description: "Väitöskirjat: Eläinlääketieteellinen tiedekunta (2008)",
    id: "ethesis_phd_el",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_phd_mm = {
    title: "Maa- ja metsätieteellinen tiedekunta",
    description: "Väitöskirjat: Maa- ja metsätieteellinen tiedekunta (2000, 2006, 2008–2010, 2012–2014, 2016)",
    id: "ethesis_phd_mm",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_phd_med = {
    title: "Lääketieteellinen",
    description: "Väitöskirjat: Lääketieteellinen tiedekunta (2000, 2003–2004, 2006–2010, 2012, 2014)",
    id: "ethesis_phd_med",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_ma_far = {
    title: "Farmasia",
    description: "Gradut: Farmasian tiedekunta 2010–2016",
    id: "ethesis_ma_far",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_ma_teo = {
    title: "Teologinen",
    description: "Gradut: Teologinen tiedekunta 2000–2016",
    id: "ethesis_ma_teo",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_ma_beh = {
    title: "Käyttäytymistieteellinen",
    description: "Gradut: Käyttäytymistieteellinen tiedekunta 1998–2016",
    id: "ethesis_ma_beh",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_ma_valt = {
    title: "Valtiotieteellinen",
    description: "Gradut: Valtiotieteellinen tiedekunta 1996–2016",
    id: "ethesis_ma_valt",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_ma_ot = {
    title: "Oikeustieteellinen",
    description: "Gradut: Oikeustieteellinen tiedekunta 2001–2016",
    id: "ethesis_ma_ot",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_ma_hum = {
    title: "Humanistinen",
    description: "Gradut: Humanistinen tiedekunta 1998–2016",
    id: "ethesis_ma_hum",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_ma_sci = {
    title: "Matemaattis-luonnontieteellinen",
    description: "Gradut: Matemaattis-luonnontieteellinen tiedekunta 1996–2016",
    id: "ethesis_ma_sci",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_ma_ai = {
    title: "Aleksanteri-instituutti",
    description: "Gradut: Aleksanteri-instituutti 2001–2016",
    id: "ethesis_ma_ai",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_ma_bio = {
    title: "Bio- ja ympäristötieteellinen",
    description: "Gradut: Bio- ja ympäristötieteellinen tiedekunta 2003–2016",
    id: "ethesis_ma_bio",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};


settings.corpora.ethesis_ma_el = {
    title: "Lisensiaatintyöt: Eläinlääketieteellinen",
    description: "Lisensiaatintyöt: Eläinlääketieteellinen tiedekunta (2003–2016)",
    id: "ethesis_ma_el",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_ma_mm = {
    title: "Maa- ja metsätieteellinen tiedekunta",
    description: "Gradut: Maa- ja metsätieteellinen tiedekunta (2003–2016)",
    id: "ethesis_ma_mm",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};

settings.corpora.ethesis_ma_med = {
    title: "Lisensiaatintyöt: Lääketieteellinen",
    description: "Lisensiaatintyöt: Lääketieteellinen tiedekunta (2010–2016)",
    id: "ethesis_ma_med",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.standard,
    struct_attributes: sattrlist.ethesis
};



/*
settings.corpora.kotus_klassikot = {
    title: "Suomalaisen kirjallisuuden klassikoita (näyte)",
    description: "Suomalaisen kirjallisuuden klassikoita (Kotimaisten kielten keskuksen aineisto)",
    id: "kotus_klassikot",
    urn: "urn:nbn:fi:lb-2015022401",
    metadata_urn: "urn:nbn:fi:lb-20140730186",
    licence: settings.licenceinfo.EUPL_11,
    homepage: settings.fn.kaino_homepage("klassikot/meta/klassikot"),
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: {
	text_title: sattrs.text_title,
	text_distributor: sattrs.text_distributor,
	text_source: sattrs.text_source,
	collection_id: {
	    label: "collection_id",
	    displayType: "hidden"
	},
	collection_title: {
	    label: "collection_title"
	},
	story_id: {
	    label: "story_id",
	    displayType: "hidden"
	},
	story_title: {
	    label: "story_title"
	},
	sentence_id: sattrs.sentence_id_hidden,
	sentence_type: {
	    label: "sentence_type",
	    displayType: "select",
	    translationKey: "sentencetype_",
	    dataset: {
		"p": "p",
		"head": "head"
	    },
	    opts: settings.liteOptions
	}
    }
};
*/

/* FTC (Finnish Text Collection) aka SKTP */

// FTC (sub)corpus hierarchy
ftc_hierarchy = [
    ["lehdet", "Lehdet", [
	["aamu", "Aamulehti 1995, 1999", [
	    ["aamu1995", "Aamulehti 1995",],
	    ["aamu1999", "Aamulehti 1999",],
	] ],
	["demari", "Demari 1995, 1997–2000", [
	    ["demari1995", "Demari 1995",],
	    ["demari1997", "Demari 1997",],
	    ["demari1998", "Demari 1998",],
	    ["demari1999", "Demari 1999",],
	    ["demari2000", "Demari 2000",],
	] ],
	["hs1995", "Helsingin Sanomat 1995", [
	    ["hs1995ae", "Helsingin Sanomat 1995 Osasto AE",],
	    ["hs1995ak", "Helsingin Sanomat 1995 Osasto AK",],
	    ["hs1995et", "Helsingin Sanomat 1995 Osasto ET",],
	    ["hs1995hu", "Helsingin Sanomat 1995 Osasto HU",],
	    ["hs1995ka", "Helsingin Sanomat 1995 Osasto KA",],
	    ["hs1995kn", "Helsingin Sanomat 1995 Osasto KN",],
	    ["hs1995ku", "Helsingin Sanomat 1995 Osasto KU",],
	    ["hs1995ma_mn", "Helsingin Sanomat 1995 Osasto MA_MN",],
	    ["hs1995misc", "Helsingin Sanomat 1995 Osasto MISC",],
	    ["hs1995mp", "Helsingin Sanomat 1995 Osasto MP",],
	    ["hs1995nh", "Helsingin Sanomat 1995 Osasto NH",],
	    ["hs1995po", "Helsingin Sanomat 1995 Osasto PO",],
	    ["hs1995ro", "Helsingin Sanomat 1995 Osasto RO",],
	    ["hs1995rt", "Helsingin Sanomat 1995 Osasto RT",],
	    ["hs1995sp", "Helsingin Sanomat 1995 Osasto SP",],
	    ["hs1995st", "Helsingin Sanomat 1995 Osasto ST",],
	    ["hs1995ta_te", "Helsingin Sanomat 1995 Osasto TA_TE",],
	    ["hs1995tr", "Helsingin Sanomat 1995 Osasto TR",],
	    ["hs1995ul", "Helsingin Sanomat 1995 Osasto UL",],
	    ["hs1995vk", "Helsingin Sanomat 1995 Osasto VK",],
	    ["hs1995vs", "Helsingin Sanomat 1995 Osasto VS",],
	    ["hs1995yo", "Helsingin Sanomat 1995 Osasto YO",],
	] ],
	["hysa", "Hyvinkään Sanomat 1994, 1997", [
	    ["hysa1994", "Hyvinkään Sanomat 1994",],
	    ["hysa1997", "Hyvinkään Sanomat 1997",],
	] ],
	["hasa", "Hämeen Sanomat 1999–2000", [
	    ["hasa1999", "Hämeen Sanomat 1999",],
	    ["hasa2000", "Hämeen Sanomat 2000",],
	] ],
	["ilta1996", "Iltalehti 1996",],
	["kaleva1998_1999", "Kaleva 1998–1999",],
	["kangasa", "Kangasalan Sanomat",],
	["karj", "Karjalainen 1991–95, 1997–99", [
	    ["karj1991", "Karjalainen 1991",],
	    ["karj1992", "Karjalainen 1992",],
	    ["karj1993", "Karjalainen 1993",],
	    ["karj1994", "Karjalainen 1994",],
	    ["karj1995", "Karjalainen 1995",],
	    ["karj1997", "Karjalainen 1997",],
	    ["karj1998", "Karjalainen 1998",],
	    ["karj1999", "Karjalainen 1999",],
	    ["karj_unspec", "Karjalainen Määrittelemättömät",],
	] ],
	["kesu1999", "Keskisuomalainen 1999",],
	["tm1995_1997", "Tekniikan Maailma 1995–1997",],
	["tusa", "Turun Sanomat 1998–1999", [
	    ["tusa1998", "Turun Sanomat 1998",],
	    ["tusa1999", "Turun Sanomat 1999",],
	] ],
    ] ],
    ["otava1993", "Kustannusosakeyhtiö Otava 1993",],
];

// Settings template for FTC subcorpora
settings.templ.ftc = $.extend(true, {}, settings.templ.lemmie_common, {
    attributes: {
	lemma: attrs.baseform,
	pos: attrs.pos_textmorfo,
	msd: attrs.msd,
	id: attrs.id_hidden,
	lex: attrs.lemgram_hidden,
    },
    struct_attributes: {
	text_source: {
	    dataset: [
		"Aamulehti",
		"Demari",
		"Helsingin Sanomat",
		"Hyvinkään Sanomat",
		"Hämeen Sanomat",
		"Iltalehti",
		"Kaleva",
		"Kangasalan Sanomat",
		"Karjalainen",
		"Keskisuomalainen",
		"Otava",
		"Tekniikan Maailma",
		"Turun Sanomat",
	    ],
	},
	paragraph_type: {
	    dataset: {
		"author|docAuthor": "author",
		"byline": "byline",
		"caption": "caption",
		"closer": "closer",
		"date": "date",
		"head": "head",
		"hi": "hi",
		"name": "name",
		"num": "num",
		"opener": "opener",
		"p": "p",
		"q": "q",
		"quote": "quote",
		"rs": "rs",
		"signed": "signed",
	    },
	},
    }
});

// Create the FTC corpus folder hierarchy and corpus settings
settings.fn.make_folder_hierarchy(
    settings.corporafolders.ftc, ftc_hierarchy,
    {
	id_prefix: "ftc_",
	description_prefix: "Suomen kielen tekstikokoelma: ",
	corpus_title_suffix: " (SKTP)",
	corpus_template: settings.templ.ftc,
    });

delete ftc_hierarchy;

// TODO: Add aliases for subcorpora, such as ftc_aamu (or
// ftc_aamulehti). Maybe integrate creating aliases to
// settings.fn.make_folder_hierarchy(), or maybe better yet, add a
// facility to take the alias property from corporafolder if the alias
// should cover all the corpora of a folder.
settings.corpus_aliases.ftc = "ftc_.*";


/*
settings.corpora.ns_presidentti = {
    title: "Tasavallan presidenttien uudenvuodenpuheita (näyte)",
    description: "Tasavallan presidenttien uudenvuodenpuheita (1935–2006) (Kotimaisten kielten keskuksen aineisto)",
    id: "ns_presidentti",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
	lemma: attrs.baseform,
	lemmacomp: attrs.baseform_compound,
        pos: attrs.pos_kotus,
	msd: attrs.msd,
	id: attrs.id_hidden,
	lex: attrs.lemgram_hidden
    },
    struct_attributes: {
	text_title: sattrs.text_title,
	text_distributor: sattrs.text_distributor,
	text_source: sattrs.text_source,
	paragraph_id: sattrs.paragraph_id,
	paragraph_type: {
	    label: "paragraph_type",
	    displayType: "select",
	    translationKey: "paragraphtype_",
	    dataset: {
		"p": "p",
		"head": "head",
		"opener": "opener",
	    },
	    opts: settings.liteOptions
	},
	paragraph_topic: {
	    label: "paragraph_topic"
	},
	sentence_id: sattrs.sentence_id_hidden
    }
};
*/


settings.templ.kotus_ns_presidentti = {
    title: "",
    description: "",
    id: "",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
	lemma: attrs.baseform,
	lemmacomp: attrs.baseform_compound,
	pos: attrs.pos_kotus,
	msd: attrs.msd,
	id: attrs.id_hidden,
	lex: attrs.lemgram_hidden
    },
    struct_attributes: {
	text_title: sattrs.text_title,
	text_distributor: sattrs.text_distributor,
	// text_source: sattrs.text_source,
	text_author: sattrs.author,
	text_author_birthyear: sattrs.author_birthyear,
	text_author_deathyear: sattrs.author_deathyear,
	text_date: sattrs.date,
	text_url: sattrs.link_fulltext,
	// text_original_url: sattrs.link_original,
	// text_collection_url contains the URL of the subcorpus main
	// page (the speeches of a certain president) in the Kaino
	// service.
	// text_collection_url: ...,
	paragraph_id: sattrs.paragraph_id,
	paragraph_type: {
	    label: "paragraph_type",
	    displayType: "select",
	    translationKey: "paragraphtype_",
	    dataset: {
		"p": "p",
		"head": "head",
		"opener": "opener",
	    },
	    opts: settings.liteOptions
	},
	paragraph_topic: {
	    label: "paragraph_topic"
	},
	paragraph_span: {
	    label: "paragraph_span"
	},
	sentence_id: sattrs.sentence_id_hidden,
	sentence_url: sattrs.context_url
    }
};


settings.fn.make_president_corpora = function () {

    var corpus_id_prefix = "kotus_ns_presidentti_";

    var make_homepage_info = function (id) {
	return {
	    name: "Korpus Kaino-palvelussa",
	    url: ("http://kaino.kotus.fi/korpus/teko/meta/presidentti/"
		   + id + "/" + id + "_coll_rdf.xml"),
	    no_label: true
	};
    };

    var make_info = function (arglist) {
	var id = arglist[0];
	var firstname = arglist[1];
	var lastname = arglist[2];
	var years = arglist[3];
	var extradescr = (arglist.length > 4 ? " " + arglist[4] : "");
	return {
	    id: id,
	    title: "Presidentti " + lastname + " uudenvuodenpuheet",
	    description: ("Kokoelma sisältää presidentti " + firstname + " "
			   + lastname + " pitämät uudenvuodenpuheet (" + years
			   + ")." + extradescr),
	    // Note that in this way the link text is not localized,
	    // unlike that for a URL attribute could be. The same
	    // information is also found in the structural attribute
	    // text_collection_url.
	    homepage: make_homepage_info(id)
	};
    };

    // The descriptions come from the metadata of Kotus.
    var extradescr_tpk = "Aineisto on kerätty Tasavallan presidentin kanslian Internet-sivustolta <a target='_blank' href='http://www.tpk.fi'>www.tpk.fi</a>.";
    var president_info_items = [
	["ahtisaari", "Martti", "Ahtisaaren", "1995–2000", extradescr_tpk],
	["halonen", "Tarja", "Halosen", "2001–2007", extradescr_tpk],
	["kallio", "Kyösti", "Kallion", "1938–1940"],
	["kekkonen", "Urho", "Kekkosen", "1957–1981",
	 "Vuosien 1957–1967 puheet ovat teoksesta <i>Puheita ja kirjoituksia 2</i> (Weilin &amp; Göös 1967), muissa alkutekstinä on presidentin kanslian lehdistötiedote."],
	["koivisto", "Mauno", "Koiviston", "1982–1994"],
	["paasikivi", "J. K.", "Paasikiven", "1946–1956"],
	["ryti", "Risto", "Rydin", "1941, 1943"],
	["svinhufvud", "P. E.", "Svinhufvudin", "1935–1937"]
    ];
    var president_templ_fill = [];
    var corpus_ids = [];
    for (var i = 0; i < president_info_items.length; i++) {
	president_templ_fill.push(make_info(president_info_items[i]));
	corpus_ids.push(corpus_id_prefix + president_info_items[i][0]);
    }
    president_templ_fill.push(
	{ id: "muut",
	  title: "Muiden kuin tasavallan presidenttien uudenvuodenpuheet",
	  description: "Muiden kuin tasavallan presidenttien pitämät uudenvuodenpuheet: pääministeri Esko Aho (1993), eduskunnan puhemies Väinö Hakkila (1942), pääministeri Edwin Linkomies (1944), ministeri Mauno Pekkala (1945).",
	  homepage: make_homepage_info("muut") }
    );
    corpus_ids.push(corpus_id_prefix + "muut");
    settings.fn.add_corpus_settings(
	settings.templ.kotus_ns_presidentti,
	president_templ_fill,
	settings.corporafolders.other_texts.kotus_ns_presidentti,
	corpus_id_prefix
    );
    var joined_corpus_ids = corpus_ids.join(",");
    settings.corpus_aliases["ns_presidentti"] = joined_corpus_ids;
    settings.corpus_aliases["kotus_ns_presidentti"] = joined_corpus_ids;
}

settings.fn.make_president_corpora();


settings.corpora.kotus_lakidir = {
    title: "Lakeja ja direktiivejä",
    description: "Lakeja ja direktiivejä vuosilta 1980–2003 (Kotimaisten kielten keskuksen aineisto)",
    id: "kotus_lakidir",
    urn: "urn:nbn:fi:lb-2016081201",
    metadata_urn: "urn:nbn:fi:lb-20140730126",
    // TODO: Check that & is paased correctly to the URL
    cite_id: "Lakeja&direktiiveja",
    licence: settings.licenceinfo.EUPL_11,
    homepage: settings.fn.kaino_homepage("teko/meta/saadokset/saadokset"),
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
        lemma: attrs.baseform,
        lemmacomp: attrs.baseform_compound,
        pos: attrs.pos_kotus,
        msd: attrs.msd,
        id: attrs.id_hidden,
        lex: attrs.lemgram_hidden
    },
    struct_attributes: {
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source,
        div_id: {
            label: "div_id",
            displayType: "hidden",
        },
        div_type: {
            label: "div_type",
            displayType: "select",
            translationKey: "divtype_",
            dataset: {
                "section": "section",
                "section/law": "section_law",
                "section/end": "section_end"
            },
            opts: settings.liteOptions
        },
        paragraph_id: sattrs.paragraph_id,
        paragraph_type: {
            label: "paragraph_type",
            displayType: "select",
            translationKey: "paragraphtype_",
            dataset: {
                "p": "p",
                "head": "head",
                "opener": "opener",
                "closer": "closer"
            },
            opts: settings.liteOptions
	},
        sentence_id: sattrs.sentence_id_hidden,
        sentence_type: {
            label: "sentence_type",
            displayType: "select",
            translationKey: "sentencetype_",
            dataset: {
                "p": "p",
                "head": "head",
                "dateline": "dateline",
                "signed": "signed"
            },
            opts: settings.liteOptions
        }
    }
};

/*
settings.corpora.ns_saadokset = {
    title: "Lakeja ja direktiivejä (näyte)",
    description: "Lakeja ja direktiivejä vuosilta 2002–2003 (Kotimaisten kielten keskuksen aineisto)",
    id: "ns_saadokset",
    // No Korp URN yet
    metadata_urn: "urn:nbn:fi:lb-20140730126",
    licence: settings.licenceinfo.EUPL_11,
    homepage: settings.fn.kaino_homepage("teko/meta/saadokset/saadokset"),
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
	lemma: attrs.baseform,
	lemmacomp: attrs.baseform_compound,
        pos: attrs.pos_kotus,
	msd: attrs.msd,
	id: attrs.id_hidden,
	lex: attrs.lemgram_hidden
    },
    struct_attributes: {
	text_title: sattrs.text_title,
	text_distributor: sattrs.text_distributor,
	text_source: sattrs.text_source,
	div_id: {
	    label: "div_id",
	    displayType: "hidden",
	},
	div_type: {
	    label: "div_type",
	    displayType: "select",
	    translationKey: "divtype_",
	    dataset: {
		"section": "section",
		"section/law": "section_law",
		"section/end": "section_end"
	    },
	    opts: settings.liteOptions
	},
	paragraph_id: sattrs.paragraph_id,
	paragraph_type: {
	    label: "paragraph_type",
	    displayType: "select",
	    translationKey: "paragraphtype_",
	    dataset: {
		"p": "p",
		"head": "head",
		"opener": "opener",
		"closer": "closer"
	    },
	    opts: settings.liteOptions
	},
	sentence_id: sattrs.sentence_id_hidden,
	sentence_type: {
	    label: "sentence_type",
	    displayType: "select",
	    translationKey: "sentencetype_",
	    dataset: {
		"p": "p",
		"head": "head",
		"dateline": "dateline",
		"signed": "signed"
	    },
	    opts: settings.liteOptions
	}
    }
};
*/
settings.corpora.kotus_sp = {
    title: "Sananparsikokoelma",
    description: "Suomen murteiden Sananparsikokoelma (1930-luvulta) (Kotimaisten kielten keskuksen aineisto)",
    id: "kotus_sp",
    urn: "urn:nbn:fi:lb-2016081202",
    metadata_urn: "urn:nbn:fi:lb-20140730176",
    licence: settings.licenceinfo.EUPL_11,
    homepage: settings.fn.kaino_homepage("sp/meta/sp"),
    cite_id: "Sananparsikokoelma",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    features: ["parsed_tdt", "finer"],
    struct_attributes: {
	text_title: sattrs.text_title,
	text_distributor: sattrs.text_distributor,
	text_source: sattrs.text_source,
	entry_location: {
	    label: "entry_location"
	},
	entry_collector: {
	    label: "entry_collector"
	},
	entry_date: {
	    label: "entry_date"
	},
	entry_standard: {
	    label: "entry_standard"
	},
	entry_dialect: {
	    label: "entry_dialect"
	},
	entry_usage: {
	    label: "entry_usage"
	},
	sentence_type: {
	    label: "sentence_type",
	    displayType: "select",
	    translationKey: "sayings_sentencetype_",
	    dataset: {
		"standard": "standard",
		"dialect": "dialect",
		"usage": "usage"
	    },
	    opts: settings.liteOptions
	}
    }
};


attrs.pos_la = {
    label: "pos",
    displayType: "select",
    translationKey: "posla_",
    dataset: {
	"a": "a",
	"a:pron": "a:pron",
	"a:pron:dem": "a:pron:dem",
	"a:pron:int": "a:pron:int",
	"a:pron:rel": "a:pron:rel",
	// "a:q": "a:q",
	"adv": "adv",
	"adv:pron": "adv:pron",
	"adv:pron:dem": "adv:pron:dem",
	"adv:pron:int": "adv:pron:int",
	"adv:pron:rel": "adv:pron:rel",
	"adv:q": "adv:q",
	// "cnj": "cnj",
	"cnj:coord": "cnj:coord",
	"cnj:rel": "cnj:rel",
	"cnj:sub": "cnj:sub",
	"intj": "intj",
	"muu": "muu",
	"n": "n",
	"neg": "neg",
	"n:prop": "n:prop",
	"n:prop:pname": "n:prop:pname",
	"num:card": "num:card",
	"num:murto": "num:murto",
	"num:ord": "num:ord",
	"num:ord_pron": "num:ord_pron",
	"p:post": "p:post",
	"p:pre": "p:pre",
	"pron": "pron",
	"pron:dem": "pron:dem",
	"pron:int": "pron:int",
	"pron:pers": "pron:pers",
	"pron:pers12": "pron:pers12",
	"pron:ref": "pron:ref",
	"pron:rel": "pron:rel",
	"punct": "punct",
	"q": "q",
	// "stem": "stem",
	"v": "v",
    },
    opts: settings.liteOptions
};
// pos_las2 is for LAS2, which has codes similar to pos_la for
// LA-murre, but fewer (and a generic "cnj").
attrs.pos_las2 = {
    label: "pos",
    displayType: "select",
    translationKey: "posla_",
    dataset: {
	"a": "a",
	"adv": "adv",
	"cnj": "cnj",
	"intj": "intj",
	"n": "n",
	// pos_la uses "n:prop" for only non-person proper names, so
	// we map "n:prop" here to correspond to any proper name.
	"n:prop": "n:prop:any",
	"neg": "neg",
	"num": "num",
	"p:post": "p:post",
	"p:pre": "p:pre",
	// pos_la uses bare "pron" with a more specific meaning, so we
	// map "pron" here to correspond to any pronoun.
	"pron": "pron:any",
	"UNK": "UNK",
	"v": "v",
    },
    opts: settings.liteOptions
};
attrs.func_la = {
    label: "func",
    displayType: "select",
    translationKey: "funcla_",
    dataset: {
	"advl": "advl",
	"advl:p": "advl:p",
	"advl:v": "advl:v",
	"advmod": "advmod",
	"amod": "amod",
	"analysoimaton": "analysoimaton",
	"compl:o": "compl:o",
	"compl:q": "compl:q",
	"compl:s": "compl:s",
	"compl:x": "compl:x",
	"infobj": "infobj",
	"infsubj": "infsubj",
	"irrall": "irrall",
	"jälkiosa": "jälkiosa",
	"lauseyhd": "lauseyhd",
	"lkeyhd": "lkeyhd",
	"sanayhd_lkeyhd": "sanayhd_lkeyhd",
	"muu": "muu",
	"neg:prt": "neg:prt",
	"nmod": "nmod",
	"npobj": "npobj",
	"npsubj": "npsubj",
	"nummod": "nummod",
	"osma": "osma",
	"pmod": "pmod",
	"pred": "pred",
	"pred2": "pred2",
	"pred3": "pred3",
	"pred:ref": "pred:ref",
	"pred:toisto": "pred:toisto",
	"subj:nonfin": "subj:nonfin",
	"subj:stat": "subj:stat",
    },
    opts: settings.liteOptions
};


// LA-murre: The Finnish Dialect Syntax Archive (Lauseopin arkiston
// murrekorpus)
// The logical corpus is divided into physical (Korp) corpora by
// parish (dialect).

// Dialect regions, their dialect groups and their parishes. A tree
// structure represented as an array of arrays: the first element is
// the internal code or id of the item, the second its human-readable
// name, and the third an array of its child elements (except in leaf
// nodes, in which the third element is a longer alias for the parish
// name and an optional fourth element is an object whose properties
// are used to override the property values in the tmeplate).
var la_murre_grouping = [
    ["LOU", "Lounaismurteet", [
	["VarE", "Eteläinen Varsinais-Suomi", [
	    ["karuna", "Karuna", "karuna"],
	    ["kisk", "Kisko", "kisko"],
	    ["muurl", "Muurla", "muurla"],
	    ["muuhal", "Muurla/Halikko", "muurla_halikko"],
	    ["paim", "Paimio", "paimio"],
	    ["pern", "Perniö", "pernio"],
	    ["uske", "Uskela", "uskela"],
	] ],
	["VarP", "Pohjoinen Varsinais-Suomi", [
	    ["eura", "Eura", "eura"],
	    ["eurj", "Eurajoki", "eurajoki"],
	    ["kalan", "Kalanti", "kalanti"],
	    ["kartl", "Karjala Tl", "karjala_tl"],
	    ["kust", "Kustavi", "kustavi"],
	    ["laptl", "Lappi Tl", "lappi_tl"],
	    ["luvi", "Luvia", "luvia"],
	    ["mask", "Masku", "masku"],
	    ["pyhm", "Pyhämaa", "pyhamaa"],
	    ["raum", "Rauma", "rauma"],
	    ["ryma", "Rymättylä", "rymattyla"],
	    ["tais", "Taivassalo", "taivassalo"],
	    ["velk", "Velkua", "velkua"],
	] ],
    ] ],
    ["LVÄ", "Lounaiset välimurteet", [
	["SatE", "Etelä-Satakunta", [
	    ["koke", "Kokemäki", "kokemaki"],
	    ["loim", "Loimaa", "loimaa"],
	    ["vamp", "Vampula", "vampula"],
	] ],
	["SatL", "Länsi-Satakunta", [
	    // Ahlainen has the whole text as a single paragraph,
	    // which causes problems in the Korp context view, so
	    // allow only the sentence context and sentence + clause
	    // within.
	    ["ahla", "Ahlainen", "ahlainen", {
		context: settings.defaultContext,
		within: settings.scWithin
	    }],
	    ["merk", "Merikarvia", "merikarvia"],
	    ["noor", "Noormarkku", "noormarkku"],
	    ["pori", "Pori", "pori"],
	] ],
	["VarY", "Varsinais-Suomen ylämaa", [
	    ["kostl", "Koski Tl", "koski_tl"],
	    ["poyt", "Pöytyä", "poytya"],
	    ["somero", "Somero", "somero"],
	    ["saky", "Säkylä", "sakyla"],
	    ["tarv", "Tarvasjoki", "tarvasjoki"],
	] ],
	["VarU", "Länsi-Uusimaa", [
	    ["samm", "Sammatti", "sammatti"],
	    ["viht", "Vihti", "vihti"],
	] ],
    ] ],
    ["HÄM", "Hämäläismurteet", [
	["HämE", "Etelä-Häme", [
	    ["hatt", "Hattula", "hattula"],
	    ["haus", "Hausjärvi", "hausjarvi"],
	    ["nurj", "Nurmijärvi", "nurmijarvi"],
	    ["renk", "Renko", "renko"],
	    ["saak", "Sääksmäki", "saaksmaki"],
	    ["tamm", "Tammela", "tammela"],
	] ],
	["HämK", "Kaakkois-Häme", [
	    ["asko", "Askola", "askola"],
	    ["asik", "Asikkala", "asikkala"],
	    ["lamm", "Lammi", "lammi"],
	] ],
	["HämP", "Pohjois-Häme", [
	    ["juup", "Juupajoki", "juupajoki"],
	    ["kuru", "Kuru", "kuru"],
	    ["luop", "Luopioinen", "luopioinen"],
	    ["pirk", "Pirkkala", "pirkkala"],
	    ["pohjasl", "Pohjaslahti", "pohjaslahti"],
	    ["vesl", "Vesilahti", "vesilahti"],
	] ],
	["SatP", "Pohjois-Satakunta", [
	    ["ikaa", "Ikaalinen", "ikaalinen"],
	    ["kanp", "Kankaanpää", "kankaanpaa"],
	    ["kark", "Karkku", "karkku"],
	    ["kihn", "Kihniö", "kihnio"],
	    ["punl", "Punkalaidun", "punkalaidun"],
	    ["suod", "Suodenniemi", "suodenniemi"],
	] ],
	["Kym", "Kymenlaakso", [
	    ["iitt", "Iitti", "iitti"],
	    ["lapinj", "Lapinjärvi", "lapinjarvi"],
	    ["suur", "Suursaari", "suursaari"],
	    ["vehk", "Vehkalahti", "vehkalahti"],
	] ],
    ] ],
    ["POH", "Pohjalaismurteet", [
	["PohE", "Etelä-Pohjanmaa", [
	    ["isoj", "Isojoki", "isojoki"],
	    ["kauhava", "Kauhava", "kauhava"],
	    ["kuri", "Kurikka", "kurikka"],
	    ["laih", "Laihia", "laihia"],
	    ["nrmo", "Nurmo", "nurmo"],
	    ["pers", "Peräseinäjoki", "peraseinajoki"],
	    ["yhar", "Ylihärmä", "yliharma"],
	] ],
	["PohK", "Keski-Pohjanmaa", [
	    ["haaj", "Haapajärvi", "haapajarvi"],
	    ["haav", "Haapavesi", "haapavesi"],
	    ["hima", "Himanka", "himanka"],
	    ["kest", "Kestilä", "kestila"],
	    ["lest", "Lestijärvi", "lestijarvi"],
	    ["pyhj", "Pyhäjoki", "pyhajoki"],
	    ["toho", "Toholampi", "toholampi"],
	    ["vete", "Veteli", "veteli"],
	    ["yvie", "Ylivieska", "ylivieska"],
	] ],
	["PohP", "Pohjois-Pohjanmaa", [
	    ["hail", "Hailuoto", "hailuoto"],
	    ["paav", "Paavola", "paavola"],
	    ["temm", "Temmes", "temmes"],
	    ["ylii", "Yli-Ii", "yli_ii"],
	    ["ykii", "Ylikiiminki", "ylikiiminki"],
	] ],
	["LänP", "Länsipohja", [
	    ["ator", "Alatornio", "alatornio"],
	    ["muon", "Muonio", "muonio"],
	] ],
	["PerP", "Peräpohjola", [
	    ["kemi", "Kemi", "kemi"],
	    ["rova", "Rovaniemi", "rovaniemi"],
	    ["sall", "Salla", "salla"],
	    ["soda", "Sodankylä", "sodankyla"],
	] ],
    ] ],
    ["SAV", "Savolaismurteet", [
	["KesE", "Eteläinen Keski-Suomi", [
	    ["joutsa", "Joutsa", "joutsa"],
	    ["jams", "Jämsä", "jamsa"],
	    ["sysm", "Sysmä", "sysma"],
	] ],
	["KesL", "Läntinen Keski-Suomi", [
	    ["lappa", "Lappajärvi", "lappajarvi"],
	    ["pihl", "Pihlajavesi", "pihlajavesi"],
	    ["soin", "Soini", "soini"],
	] ],
	["KesP", "Pohjoinen Keski-Suomi", [
	    ["kong", "Konginkangas", "konginkangas"],
	    ["lauk", "Laukaa", "laukaa"],
	    ["mult", "Multia", "multia"],
	    ["piht", "Pihtipudas", "pihtipudas"],
	] ],
	["SavE", "Etelä-Savo", [
	    ["enok", "Enonkoski", "enonkoski"],
	    ["mikk", "Mikkeli", "mikkeli"],
	    ["manh", "Mäntyharju", "mantyharju"],
	    ["punh", "Punkaharju", "punkaharju"],
	] ],
	["SavP", "Pohjois-Savo", [
	    ["hauv", "Haukivuori", "haukivuori"],
	    ["lapl", "Lapinlahti", "lapinlahti"],
	    ["lepp", "Leppävirta", "leppavirta"],
	    ["nils", "Nilsiä", "nilsia"],
	    ["rans", "Rantasalmi", "rantasalmi"],
	    ["raul", "Rautalampi", "rautalampi"],
	    ["riis", "Riistavesi", "riistavesi"],
	    ["tervo", "Tervo", "tervo"],
	    ["vier", "Vieremä", "vierema"],
	] ],
	["KarP", "Pohjois-Karjala", [
	    ["ilom", "Ilomantsi", "ilomantsi"],
	    ["juuk", "Juuka", "juuka"],
	    ["kiih", "Kiihtelysvaara", "kiihtelysvaara"],
	    ["kite", "Kitee", "kitee"],
	    ["kont", "Kontiolahti", "kontiolahti"],
	    ["lipe", "Liperi", "liperi"],
	] ],
	["Kai", "Kainuu", [
	    ["posi", "Posio", "posio"],
	    ["sotk", "Sotkamo", "sotkamo"],
	    ["suos", "Suomussalmi", "suomussalmi"],
	] ],
    ] ],
    ["KAA", "Kaakkoismurteet", [
	["KarE", "Etelä-Karjala", [
	    ["antr", "Antrea", "antrea"],
	    ["koiv", "Koivisto", "koivisto"],
	    ["lappe", "Lappee", "lappee"],
	    ["luum", "Luumäki", "luumaki"],
	    ["muol", "Muolaa", "muolaa"],
	    ["nuij", "Nuijamaa", "nuijamaa"],
	    ["ruok", "Ruokolahti", "ruokolahti"],
	    ["savt", "Savitaipale", "savitaipale"],
	    ["seis", "Seiskari", "seiskari"],
	    ["taip", "Taipalsaari", "taipalsaari"],
	] ],
	["KarK", "Keski-Karjala", [
	    ["lumv", "Lumivaara", "lumivaara"],
	    ["pari", "Parikkala", "parikkala"],
	    ["rautu", "Rautu", "rautu"],
	    ["raisa", "Räisälä", "raisala"],
	    ["sort", "Sortavala", "sortavala"],
	] ],
    ] ]
];

// LA-murre corpus name prefix, prefixed to a parish name
var la_murre_corpus_prefix = "lam_";
// Corpus name alias prefix, for redirecting the old, longer names to
// the new, shorter ones
var la_murre_alias_prefix = "la_murre_";

// Extract dialect regions, groups, parishes and corpus names from
// la_murre_grouping
var la_murre_regions = [];
var la_murre_groups = [];
var la_murre_parishes = [];
var la_murre_corpora = [];
for (var i = 0; i < la_murre_grouping.length; i++) {
    la_murre_regions.push(la_murre_grouping[i][0]);
    var groups = la_murre_grouping[i][2];
    for (var j = 0; j < groups.length; j++) {
	la_murre_groups.push(groups[j][0]);
	var parishes = groups[j][2];
	for (var k = 0; k < parishes.length; k++) {
	    la_murre_parishes.push(parishes[k][1]);
	    var corpname = la_murre_corpus_prefix + parishes[k][0]
	    la_murre_corpora.push(corpname);
	    settings.corpus_aliases[la_murre_alias_prefix + parishes[k][2]] =
		corpname;
	}
    }
}

// It would actually suffice to have the /korp-prefixed name now that
// /var/www/html/korp is a link to /var/www/html on the public server.
var la_murre_fulltext_url_prefix =
    ((! isPublicServer) ? "/korp" : "") + "/fulltext/la_murre/";

// Make LA-murre fulltext URLs with the sentence id as a fragment
// identifier and the number of the first and last token of the match
// as the query string. This function is used as a stringify_synthetic
// function for the fulltext URLs.
settings.fn.make_la_murre_fulltext_url = function (token_data) {
    var tokencnt = token_data.tokens.length;
    var match_start = 0;
    var match_end = 0;
    var in_match = false;
    for (var tokennum = 0; tokennum < tokencnt; tokennum++) {
	if (token_data.tokens[tokennum]._match) {
	    if (! in_match) {
		match_start = tokennum + 1;
		in_match = true;
	    }
	} else if (in_match) {
	    match_end = tokennum;
	    in_match = false;
	}
    }
    if (in_match) {
	match_end = tokencnt;
    }
    return (la_murre_fulltext_url_prefix
	    + token_data.struct_attrs.text_filename + ".html"
	    + "?" + match_start.toString() + "-" + match_end.toString()
	    + "#s" + token_data.struct_attrs.sentence_num);
};

// The corpus settings template for the LA-murre corpora
settings.templ.la_murre = {
    // title: "Lauseopin arkiston murrekorpus",
    // description: "Lauseopin arkiston murrekorpus",
    // id: "la_murre",
    within: settings.spcWithin,
    context: settings.spContext,
    attributes: {
	cleanword: {
	    label: "cleanword",
	    opts: settings.defaultOptions
	},
	lemma: attrs.baseform,
        pos: attrs.pos_la,
	msd: attrs.msd,
	func: attrs.func_la,
	cow: {
	    label: "cowla",
	    displayType: "select",
	    translationKey: "cowla_",
	    dataset: {
		"cw": "cw",
		"cw1": "cw1",
		"cw2": "cw2",
		"": "noncw",
	    },
	    opts: settings.liteOptions
	},
	note: {
	    label: "note",
	    opts: settings.defaultOptions
	},
	lex: attrs.lemgram_hidden
    },
    struct_attributes: {
	text_header: {
	    label: "text_header"
	},
	text_info: {
	    label: "text_info"
	},
	text_dialect_region: {
	    label: "dialect_region",
	    displayType: "select",
	    translationKey: "dialect_region_",
	    dataset: la_murre_regions,
	    opts: settings.liteOptions
	},
	text_dialect_group: {
	    label: "dialect_group",
	    displayType: "select",
	    translationKey: "dialect_group_",
	    dataset: la_murre_groups,
	    opts: settings.liteOptions
	},
	text_parish: {
	    label: "parish",
	    displayType: "select",
	    localize: false,
	    dataset: la_murre_parishes,
	    opts: settings.liteOptions
	},
	text_parish_title: {
	    label: "text_title",
	},
	text_filename: {
	    label: "file_name",
	    displayType: "hidden"
	},
	text_date: sattrs.date,
	text_session_descr: {
	    label: "interview_descr",
	},
	text_content_descr: {
	    label: "subject",
	},
	text_source_id: {
	    label: "original_source",
	},
	paragraph_type: {
	    label: "paragraph_type",
	    displayType: "select",
	    translationKey: "paragraphtype_",
	    dataset: {
		"interviewee": "interviewee",
		"interviewer": "interviewer",
		"noninterviewee": "noninterviewee",
	    },
	    opts: settings.liteOptions
	},
	paragraph_id: {
	    label: "paragraph_id",
	},
	paragraph_speaker: {
	    label: "speaker",
	},
	paragraph_speaker_name: {
	    label: "speaker_name",
	    displayType: "hidden",
	},
	paragraph_speaker_age: {
	    label: "speaker_age",
	},
	paragraph_speaker_sex: {
	    label: "speaker_sex",
	    displayType: "select",
	    translationKey: "",
	    dataset: {
		"male": "male",
		"female": "female",
		"": "unknown"
	    },
	    opts: settings.liteOptions,
	},
	paragraph_speaker_birthdate: {
	    label: "speaker_birthdate",
	},
	paragraph_speaker_descr: {
	    label: "speaker_descr",
	},
	paragraph_begin_time: {
	    label: "speech_begin_time"
	},
	paragraph_duration: {
	    label: "speech_duration"
	},
	paragraph_annex_link: sattrs.link_prefixed(
	    "listen_speech",
	    "https://lat.csc.fi/ds/annex/runLoader?"),
	// sentence_source: {
	//     label: "sentence_source"
	// },
	sentence_clnum: {
	    label: "sentence_clnum",
	},
	sentence_num: {
	    label: "sentence_num",
	},
	sentence_wnum: {
	    label: "sentence_wnum",
	},
	sentence_id: sattrs.sentence_id_hidden,
	sentence_begin_time: {
	    label: "sentence_begin_time"
	},
	sentence_duration: {
	    label: "sentence_duration"
	},
	sentence_annex_link: sattrs.link_prefixed(
	    "listen_sentence",
	    "https://lat.csc.fi/ds/annex/runLoader?"),
	sentence_fulltext_link:  {
	    label: "show_fulltext",
	    type: "url",
	    url_opts: sattrs.link_url_opts,
	    synthetic: true,
	    stringify_synthetic: settings.fn.make_la_murre_fulltext_url,
	},
	clause_clnum: {
	    label: "clause_clnum",
	},
	clause_num: {
	    label: "clause_num",
	},
	clause_hier: {
	    label: "clause_hier",
	    displayType: "select",
	    translationKey: "clausehier_",
	    dataset: [
		"irrall",
		"main",
		"sub1",
		"sub2",
		"sub3",
		"sub4",
		"sub5",
		"muu",
	    ],
	    opts: settings.liteOptions
	},
	clause_type: {
	    label: "clause_type",
	    displayType: "select",
	    translationKey: "clausetype_",
	    dataset: [
		"affdecl",
		"negdecl",
		"affint",
		"negint",
		"affopt",
		"negopt",
		"muu",
	    ],
	    opts: settings.liteOptions
	},
	clause_hallnum: {
	    label: "clause_hallnum",
	},
	clause_ora: {
	    label: "clause_ora",
	    displayType: "select",
	    translationKey: "clauseora_",
	    dataset: {
		"dir": "dir",
		"": "other",
	    },
	    opts: settings.liteOptions
	},
	clause_depth: {
	    label: "clause_depth"
	},
	clause_partnum: {
	    label: "clause_partnum",
	}
    },
    sidebar_display_order: {
	attributes: [
	    "cleanword",
	    "lemma",
	    "pos",
	    "msd",
	    "func",
	    "cow",
	    "note",
	],
	struct_attributes: [
	    "text_dialect_region",
	    "text_dialect_group",
	    "text_parish",
	    /^text_/,
	    /^paragraph_/,
	    /^sentence_/,
	    /^clause_/,
	],
    },
    // Ignore any number of punctuation tokens between tokens in the
    // extended search
    ignore_between_tokens_cqp: '[pos="punct"]*',
};

// The following is now superseded with the more general
// settings.fn.make_folder_hierarchy.

// // Recursively make settings.corporafolders and settings.corpora for
// // the (sub)corpora of the la_murre corpus (based on
// // la_murre_grouping). main_folder is the folder to which to add the
// // folders or corpora in subfolder_tree. This could perhaps be
// // generalized for other corpora if needed.
// settings.fn.make_folders_la_murre = function (main_folder, subfolder_tree,
// 					      depth, leaf_depth) {
//     for (var i = 0; i < subfolder_tree.length; i++) {
// 	var subfolder_info = subfolder_tree[i];
// 	var descr = "Lauseopin arkiston murrekorpus: " + subfolder_info[1];
// 	if (depth < leaf_depth) {
// 	    var subfolder = {
// 		title: subfolder_info[1],
// 		description: descr
// 	    };
// 	    main_folder[subfolder_info[0]] = subfolder;
// 	    settings.fn.make_folders_la_murre(subfolder, subfolder_info[2],
// 					      depth + 1, leaf_depth);
// 	} else {
// 	    var templ_fill = {
// 		id: subfolder_info[0],
// 		title: subfolder_info[1] + " (LA-murre)",
// 		description: descr
// 	    };
// 	    // The optional fourth item in the corpus info list is an
// 	    // object that may be used to override the values in the
// 	    // template.
// 	    if (subfolder_info.length > 3) {
// 		$.extend(templ_fill, subfolder_info[3]);
// 	    }
// 	    settings.fn.add_corpus_settings(
// 		settings.templ.la_murre, [templ_fill], main_folder,
// 		la_murre_corpus_prefix);
// 	}
//     }
// };

// // Call the above recursive function
// settings.fn.make_folders_la_murre(
//     settings.corporafolders.spoken.la_murre, la_murre_grouping, 1, 3);

settings.fn.make_folder_hierarchy(
    settings.corporafolders.spoken.la_murre, la_murre_grouping,
    {
	id_prefix: la_murre_corpus_prefix,
	folder_description_prefix: "Lauseopin arkiston murrekorpus: ",
	corpus_title_suffix: " (LA-murre)",
	make_corpus_description: function (data) {
	    return "Lauseopin arkiston murrekorpus: " + data[1];
	},
	corpus_template: settings.templ.la_murre,
    });


// Construct a shorthand alias
settings.corpus_aliases.la_murre = la_murre_corpora.join(",");
settings.corpus_aliases["la-murre"] = settings.corpus_aliases.la_murre;

// Configure a short URL: preselect only the LA-murre corpus folder
// (all its subcorpora)
settings.short_url_config.la_murre =
    function () {
        settings.preselected_corpora = ["__spoken.la_murre"];
        // // Other modes and corpora could be excluded
        // settings.modeConfig = settings.modeConfig.slice(0, 1);
        // settings.fn.remove_matching_corpora(["lam_.*"], true);
    }
settings.short_url_config["la-murre"] = settings.short_url_config.la_murre;

// Delete the variables used for constructing the settings
delete la_murre_grouping;
delete la_murre_regions;
delete la_murre_groups;
delete la_murre_parishes;
delete la_murre_corpora;
delete la_murre_corpus_prefix;


// LAS2

attrlist.las2 = {
    lemma: attrs.baseform,
    pos: attrs.pos_las2,
    msd: attrs.msd,
    fun: attrs.func_la,
    com: {
        label: "note",
    },
    lex: attrs.lemgram_hidden
};

sattrlist.las2 = {
    text_dateto: {
        label: "text_date",
    },
    text_datefrom: {
        label: "datefrom",
	displayType: "hidden",
    },
    text_num: {
        label: "exam_num",
    },
    text_inf: {
        label: "text_inf",
    },
    text_tt: {
        label: "text_tt",
    },
    text_te: {
        label: "text_te",
    },
    text_lo: {
        label: "text_lo",
    },
    text_l1: {
        label: "text_l1",
    },
    text_alin_cefr: {
        label: "text_alin_cefr",
    },
    text_ylin_cefr: {
        label: "text_ylin_cefr",
    },
    text_tekstin_cefr: {
        label: "text_tekstin_cefr",
    },
    // // Uncomment when showing info pages is implemented
    // text_inf_url: {
    //     label: "text_inf_url",
    //     type: "url",
    // },
    div_id: {
        displayType: "hidden",
    },
    div_question: {
        label: "div_question",
    },
    paragraph_id: {
        displayType: "hidden",
    },
    paragraph_type: {
        displayType: "hidden",
    },
    sentence_id: sattrs.sentence_id_hidden,
    sentence_type: {
        displayType: "hidden",
    },
    clause_id: {
        displayType: "hidden",
    },
    clause_type: {
        label: "clause_type",
        displayType: "select",
        translationKey: "clausetype_",
        dataset: {
            "affdecl": "affdecl",
            "negdecl": "negdecl",
            "affint": "affint",
            "negint": "negint",
            "affopt": "affopt",
            "negopt": "negopt",
            "muu": "muu",
        },
        opts: settings.liteOptions
    },
    clause_fun: {
        label: "clause_fun",
    },
    clause_com: {
        label: "note",
    }
};

// Properties common to the LAS2 subcorpora
las2_common_props = {
    urn: "urn:nbn:fi:lb-2015050504",
    metadata_urn: "urn:nbn:fi:lb-201407167",
    homepage_url: "http://www.utu.fi/fi/yksikot/hum/yksikot/suomi-sgr/tutkimus/tutkimushankkeet/las2/Sivut/home.aspx",
    licence: {
	name: "CLARIN RES +PLAN +NC +LOC +ND",
	urn: "urn:nbn:fi:lb-20150304111"
    },
    cite_id: "LAS2",
    limited_access: true,
    licence_type: "RES",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.las2,
    struct_attributes: sattrlist.las2,
};

settings.corpora.las2_tentit = {
    title: "LAS2 (tentit)",
    description: "Edistyneiden suomenoppijoiden korpus (tentit)",
    id: "las2_tentit",
};

settings.corpora.las2_esseet = {
    title: "LAS2 (esseet)",
    description: "Edistyneiden suomenoppijoiden korpus (esseet)",
    id: "las2_esseet",
};

// Add the common properties to the corpus settings of las2_tentit and
// las2_esseet
settings.fn.extend_corpus_settings(
    las2_common_props, ["las2_tentit", "las2_esseet"]);

delete las2_common_props;

settings.corpus_aliases.las2 = "las2_tentit,las2_esseet";

// AGRICOLA

attrlist.agricola = {
    lemma: attrs.baseform,
    pos: {
	label: "pos",
    },
    nrm: {
        label: "normalized_lemma",
    },
    type: {
	label: "lang",
	displayType: "select",
	translationKey: "agricola_lang_",
	dataset: {
	    "": "fin",
	    "swe": "swe",
	    "lat": "lat",
	    "gre": "gre",
	    "heb": "heb",
	},
	opts: settings.liteOptions
    },	
    mrp: attrs.msd,
    fun: {
	label: "func",
    },
    com: {
        displayType: "hidden",
    },
    tunit: {
        label: "comp_tense",
	displayType: "select",
	translationKey: "agricola_tense_",
	dataset: {
	    "f": "f",
	    "p": "p",
	    "pl": "pl",
	    "p pl": "ppl",
	},
    }
};

sattrlist.agricola = {
    text_title: {
        label: "text_title",
    },
    text_dateto: {
	displayType: "hidden",
    },
    text_datefrom: {
        displayType: "hidden",
    },
    text_timeto: {
        displayType: "hidden",
    },
    text_timefrom: {
        displayType: "hidden",
    },
    text_date_orig: {
        label: "text_date",
    },
    div_id: {
        displayType: "hidden",
    },
    paragraph_id: {
        displayType: "hidden",
    },
    sentence_id: sattrs.sentence_id_hidden,
    sentence_type: {
        displayType: "hidden",
    },
    sentence_biblia: {
        label: "bible_index",
    },
    sentence_loc: {
        label: "location",
    },
    clause_id: {
        displayType: "hidden",
    },
    clause_loc: {
        displayType: "hidden",
    },
    clause_biblia: {
        displayType: "hidden",
    },
    clause_type: {
        label: "clause_type",
        displayType: "select",
        translationKey: "clausetype_",
        dataset: {
            "affdecl": "affdecl",
            "negdecl": "negdecl",
            "affint": "affint",
            "negint": "negint",
            "affopt": "affopt",
            "negopt": "negopt",
            "muu": "muu",
        },
        opts: settings.liteOptions
    },
    clause_depth: {
	label: "clause_depth"
    },
    clause_partnum: {
	label: "clause_partnum",
    }
};

settings.corpora.agricola_abckiria = {
    id: "agricola_abckiria",
    title: "Agricola: Abckiria",
    description: "Mikael Agricolan teosten morfosyntaktinen tietokanta: Abckiria",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.agricola,
    struct_attributes: sattrlist.agricola
};

settings.corpora.agricola_kasikiria = {
    id: "agricola_kasikiria",
    title: "Agricola: Käsikiria",
    description: "Mikael Agricolan teosten morfosyntaktinen tietokanta: Käsikiria Castesta ia muista Christikunnan Menoista",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.agricola,
    struct_attributes: sattrlist.agricola
};

settings.corpora.agricola_messu = {
    id: "agricola_messu",
    title: "Agricola: Messu",
    description: "Mikael Agricolan teosten morfosyntaktinen tietokanta: Messu eli Herran echtolinen",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.agricola,
    struct_attributes: sattrlist.agricola
};

settings.corpora.agricola_piina = {
    id: "agricola_piina",
    title: "Agricola: Piina",
    description: "Mikael Agricolan teosten morfosyntaktinen tietokanta: Se meiden Herran Jesusen Christusen Pina, ylesnousemus ia taiuaisen astumus, niste Neliest Euangelisterist coghottu",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.agricola,
    struct_attributes: sattrlist.agricola
};

settings.corpora.agricola_profeetat = {
    id: "agricola_profeetat",
    title: "Agricola: Ne Prophetat",
    description: "Mikael Agricolan teosten morfosyntaktinen tietokanta: Ne Prophetat. Haggai. SacharJa. Maleachi.",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.agricola,
    struct_attributes: sattrlist.agricola
};

settings.corpora.agricola_psaltari = {
    id: "agricola_psaltari",
    title: "Agricola: Dauidin Psaltari",
    description: "Mikael Agricolan teosten morfosyntaktinen tietokanta: Dauidin Psaltari",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.agricola,
    struct_attributes: sattrlist.agricola
};

settings.corpora.agricola_rucouskiria = {
    id: "agricola_rucouskiria",
    title: "Agricola: Rucouskiria",
    description: "Mikael Agricolan teosten morfosyntaktinen tietokanta: Rucouskiria Bibliasta",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.agricola,
    struct_attributes: sattrlist.agricola
};

settings.corpora.agricola_sewsitestamenti = {
    id: "agricola_sewsitestamenti",
    title: "Agricola: Se Wsi Testamenti",
    description: "Mikael Agricolan teosten morfosyntaktinen tietokanta: Se Wsi Testamenti",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.agricola,
    struct_attributes: sattrlist.agricola
};

settings.corpora.agricola_veisut = {
    id: "agricola_veisut",
    title: "Agricola: Weisut",
    description: "Mikael Agricolan teosten morfosyntaktinen tietokanta: Weisut ia Ennustoxet Mosesen Laista ia Prophetista Wloshaetut",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.agricola,
    struct_attributes: sattrlist.agricola
};

settings.corpus_aliases.agricola = "agricola_.*";
settings.corpus_aliases["agricola-korp"] = "agricola_.*";


// SKS-KIVI

settings.corpora.sks_kivi_fi = {
    title: "Aleksis Kivi (SKS)",
    description: "Aleksis Kiven painetut teokset, kirjeet ja muu tunnettu tuotanto. Toimittaneet Sakari Katajamäki, Ossi Kokko ja Elina Kela. <a href='http://www.edith.fi/kivikorpus/index.htm'>Infosivu</a>",
    id: "sks_kivi_fi",
    // unselected: true,
    urn: "urn:nbn:fi:lb-201405273",
    metadata_urn: "urn:nbn:fi:lb-201405274",
    licence: settings.licenceinfo.CC_BY_NC,
    cite_id: "Kivi",
    homepage_url: "http://www.edith.fi/kivikorpus/index.htm",
    features: ["paragraphs", "parsed_tdt", "finer"],
    attributes: {
	sketchyword: {
	    label: "sketchyword",
	    opts: settings.defaultOptions,
	},
	clean_note: {
	    label: "clean_note",
	    opts: settings.defaultOptions,
	},
	sketchy_note: {
	    label: "sketchy_note",
	    opts: settings.defaultOptions,
	},
	other_note: {
	    label: "other_note",
	    opts: settings.defaultOptions,
	},
	wtype: {
	    label: "wtype",
	    opts: settings.defaultOptions,
	}
    },
    struct_attributes: {
	text_idno: {
	    label: "kivi_text_idno",
	    opts: settings.defaultOptions,
	},
	text_author: {
	    label: "kivi_text_author",
	    opts: settings.defaultOptions,
	},
	text_title: {
	    label: "kivi_text_title",
	    opts: settings.defaultOptions,
	},
	text_byline: {
	    label: "kivi_text_byline",
	    opts: settings.defaultOptions,
	},
	text_settlement: {
	    label: "kivi_text_settlement",
	    opts: settings.defaultOptions,
	},
	text_repository: {
	    label: "kivi_text_repository",
	    opts: settings.defaultOptions,
	},
	text_publisher: {
	    label: "kivi_text_publisher",
	    opts: settings.defaultOptions,
	},
	text_distributor: {
	    label: "kivi_text_distributor",
	    opts: settings.defaultOptions,
	},
	text_bibl: {
	    label: "kivi_text_bibl",
	    displayType: "hidden",
	},
	text_bibl_type: {
	    label: "kivi_text_bibl_type",
	    displayType: "hidden",
	},
	text_lang: {
	    label: "kivi_text_lang",
	    opts: settings.defaultOptions,
	},
	text_note: {
	      label: "kivi_text_note",
	      opts: settings.defaultOptions,
	},
	text_date: {
              label: "kivi_text_date",
              opts: settings.defaultOptions,
        },
	section_id: {
	    label: "section_id",
	    displayType: "hidden",
	},
	section_type: {
	    label: "section_type",
	    opts: settings.defaultOptions,
	},
	section_subtype: {
	    label: "section_subtype",
	    opts: settings.defaultOptions,
	},
	/*
	section_subtype_n: {
	    label: "section_subtype_n",
	    displayType: "hidden",
	},*/
	paragraph_id: {
	    label: "paragraph_id",
	    displayType: "hidden",
	},
	paragraph_type: {
	    label: "paragraph_type",
	    opts: settings.defaultOptions,
	},
	paragraph_speaker: {
	    label: "paragraph_speaker",
	    opts: settings.defaultOptions,
	},
	sentence_id: sattrs.sentence_id_hidden,
	sentence_type: {
	    label: "sentence_type",
	    opts: settings.defaultOptions,
	}
    }
};

settings.corpora.opensub_fi_2017 = {
    title: "OpenSubtitles 2017",
    description: "Opensubtitles.org-sivuston jakamat elokuvien ja tv-ohjelmien suomenkieliset tekstitykset",
    licence: settings.licenceinfo.CC_BY_40,
    id: "opensub_fi_2017",
    urn: "urn:nbn:fi:lb-2018060404",
    metadata_urn: "urn:nbn:fi:lb-2018060403",
    lang: "fin",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.parsed_tdt_ud1,
    struct_attributes: {
	text_country: {
	    label: "opensub_text_country",
	    type: "set",
	    opts: settings.setOptions,
	    displayType: "select",
	    dataset: [
		"Afghanistan",
		"Algeria",
		"Angola",
		"Argentina",
		"Aruba",
		"Australia",
		"Austria",
		"Bahamas",
		"Belarus",
		"Belgium",
		"Bolivia",
		"Bosnia and Herzegovina",
		"Botswana",
		"Brazil",
		"Bulgaria",
		"Burkina Faso",
		"Cambodia",
		"Cameroon",
		"Canada",
		"Chile",
		"China",
		"Colombia",
		"Croatia",
		"Cuba",
		"Cyprus",
		"Czechoslovakia",
		"Czech Republic",
		"Denmark",
		"Dominican Republic",
		"Ecuador",
		"Egypt",
		"Estonia",
		"Faroe Islands",
		"Federal Republic of Yugoslavia",
		"Finland",
		"France",
		"Georgia",
		"Germany",
		"Ghana",
		"Greece",
		"Hong Kong",
		"Hungary",
		"Iceland",
		"India",
		"Indonesia",
		"Iran",
		"Iraq",
		"Ireland",
		"Isle Of Man",
		"Israel",
		"Italy",
		"Jamaica",
		"Japan",
		"Kazakhstan",
		"Latvia",
		"Lebanon",
		"Liberia",
		"Libya",
		"Liechtenstein",
		"Lithuania",
		"Luxembourg",
		"Macao",
		"Malaysia",
		"Malta",
		"Mexico",
		"Moldova",
		"Monaco",
		"Mongolia",
		"Morocco",
		"Namibia",
		"Netherlands",
		"New Zealand",
		"North Korea",
		"Norway",
		"Palestine",
		"Panama",
		"Paraguay",
		"Peru",
		"Philippines",
		"Poland",
		"Portugal",
		"Puerto Rico",
		"Qatar",
		"Republic of Macedonia",
		"Romania",
		"Russia",
		"Rwanda",
		"Saudi Arabia",
		"Serbia",
		"Singapore",
		"Slovakia",
		"Slovenia",
		"South Africa",
		"South Korea",
		"Soviet Union",
		"Spain",
		"Sri Lanka",
		"Sweden",
		"Switzerland",
		"Taiwan",
		"Tanzania",
		"Thailand",
		"Tunisia",
		"Turkey",
		"UK",
		"Ukraine",
		"United Arab Emirates",
		"Uruguay",
		"USA",
		"Venezuela",
		"West Germany",
		"Yugoslavia",
		"Zambia",
		"_"
	      ],
	},
	text_lang_orig: {
	    label: "opensub_text_lang_orig",
	    type: "set",
	    opts: settings.setOptions,
	    displayType: "select",
	    dataset: [
		"Abkhazian",
		"Aboriginal",
		"Acholi",
		"Afrikaans",
		"Albanian",
		"Algonquin",
		"American Sign Language",
		"Amharic",
		"Ancient (to 1453)",
		"Apache languages",
		"Arabic",
		"Aramaic",
		"Arapaho",
		"Armenian",
		"Assamese",
		"Assyrian Neo-Aramaic",
		"Athapascan languages",
		"Awadhi",
		"Azerbaijani",
		"Bambara",
		"Basque",
		"Belarusian",
		"Bengali",
		"Berber languages",
		"Bhojpuri",
		"Bosnian",
		"Brazilian Sign Language",
		"Breton",
		"British Sign Language",
		"Bulgarian",
		"Burmese",
		"Cantonese",
		"Catalan",
		"Chechen",
		"Chinese",
		"Cornish",
		"Corsican",
		"Cree",
		"Croatian",
		"Czech",
		"Danish",
		"Dari",
		"Dutch",
		"Egyptian (Ancient)",
		"English",
		"Esperanto",
		"Estonian",
		"Ewe",
		"Faroese",
		"Filipino",
		"Finnish",
		"Flemish",
		"French",
		"Gallegan",
		"Georgian",
		"German",
		"Greek",
		"Greenlandic",
		"Gujarati",
		"Hakka",
		"Hawaiian",
		"Hebrew",
		"Hindi",
		"Hmong",
		"Hokkien",
		"Hungarian",
		"Icelandic",
		"Indian Sign Language",
		"Indonesian",
		"Inuktitut",
		"Irish",
		"Italian",
		"Japanese",
		"Japanese Sign Language",
		"Kabyle",
		"Kazakh",
		"Khmer",
		"Kirundi",
		"Klingon",
		"Korean",
		"Korean Sign Language",
		"Kurdish",
		"Lao",
		"Latin",
		"Latvian",
		"Lingala",
		"Lithuanian",
		"Luxembourgish",
		"Macedonian",
		"Malay",
		"Malayalam",
		"Maltese",
		"Mandarin",
		"Maori",
		"Mapudungun",
		"Marathi",
		"Maya",
		"Mende",
		"Min Nan",
		"Mohawk",
		"Mongolian",
		"Navajo",
		"Neapolitan",
		"Nepali",
		"Norse",
		"North American Indian",
		"Norwegian",
		"Nyanja",
		"Occitan",
		"Old",
		"Old English",
		"Panjabi",
		"Papiamento",
		"Pawnee",
		"Persian",
		"Polish",
		"Polynesian",
		"Portuguese",
		"Pushto",
		"Quechua",
		"Quenya",
		"Romanian",
		"Romany",
		"Russian",
		"Saami",
		"Sanskrit",
		"Scots",
		"Scottish Gaelic",
		"Serbian",
		"Serbo-Croatian",
		"Shanghainese",
		"Sicilian",
		"Sign Languages",
		"Sindarin",
		"Sinhalese",
		"Sioux",
		"Slovak",
		"Slovenian",
		"Somali",
		"Southern Sotho",
		"Spanish",
		"Spanish Sign Language",
		"Swahili",
		"Swedish",
		"Swiss German",
		"Syriac",
		"Tagalog",
		"Tamil",
		"Tatar",
		"Thai",
		"Tibetan",
		"Tigrigna",
		"Tok Pisin",
		"Tonga",
		"Turkish",
		"Ukrainian",
		"Ungwatsi",
		"Urdu",
		"Vietnamese",
		"Washoe",
		"Welsh",
		"Wolof",
		"Xhosa",
		"Yiddish",
		"Zulu",
		"_"
	    ],
	},
	text_genre: {
	    label: "opensub_text_genre",
	    type: "set",
	    opts: settings.setOptions,
	    displayType: "select",
	    dataset: [
		"Action",
		"Adult",
		"Adventure",
		"Animation",
		"Biography",
		"Comedy",
		"Crime",
		"Documentary",
		"Drama",
		"Family",
		"Fantasy",
		"Film-Noir",
		"Game-Show",
		"History",
		"Horror",
		"Music",
		"Musical",
		"Mystery",
		"News",
		"Reality-TV",
		"Romance",
		"Sci-Fi",
		"Short",
		"Sport",
		"Talk-Show",
		"Thriller",
		"War",
		"Western",
		"_"
	      ],
	},
	text_year: { label: "year" },
    }
};

settings.corpora.skvr = {
    title: "SKVR",
    description: "SKS:n Suomen Kansan Vanhat Runot -korpus",
    id: "skvr",
    // unselected: true,
    urn: "urn:nbn:fi:lb-2014052711",
    metadata_urn: "urn:nbn:fi:lb-2014052712",
    licence: settings.licenceinfo.CC_BY_NC,
    homepage_url: "http://dbgw.finlit.fi/skvr/",
    cite_id: "SKVR",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
        cleanword: {
            label: "cleanword",
            opts: settings.defaultOptions,
        },
        normalized: {
            label: "normalized",
            opts: settings.defaultOptions,
        }
    },
    struct_attributes: {
	text_id: {
            label: "skvr_item_id",
            displayType: "hidden",
        },
        text_osa: {
            label: "skvr_item_osa",
            opts: settings.defaultOptions,
        },
        text_loc: {
            label: "skvr_item_loc",
            opts: settings.defaultOptions,
        },
        text_inf: {
            label: "skvr_item_inf",
            opts: settings.defaultOptions,
        },
        text_tmp: {
            label: "skvr_item_tmp",
            opts: settings.defaultOptions,
        },
        text_col: {
            label: "skvr_item_col",
            opts: settings.defaultOptions,
        },
        text_idn: {
            label: "skvr_item_idn",
            opts: settings.defaultOptions,
        },
        text_nro: {
            label: "skvr_item_nro",
            opts: settings.defaultOptions,
        },
        text_sgn: {
            label: "skvr_item_sgn",
            opts: settings.defaultOptions,
        },
        text_p_code1: {
            label: "skvr_item_p_code1",
            opts: settings.defaultOptions,
        },
        text_p_code2: {
            label: "skvr_item_p_code2",
            opts: settings.defaultOptions,
        },
        text_k_code: {
            label: "skvr_item_k_code",
            opts: settings.defaultOptions,
        },
        text_y_code: {
            label: "skvr_item_y_code",
            opts: settings.defaultOptions,
        },
        text_refs: {
            label: "skvr_item_refs",
            opts: settings.defaultOptions,
	},
        text_cpt: {
            label: "skvr_item_cpt",
            opts: settings.defaultOptions,
        },
	paragraph_id: {
            displayType: "hidden",
        },
        sentence_id: sattrs.sentence_id_hidden,
        sentence_type: {
            label: "sentence_type",
            displayType: "select",
            translationKey: "skvr_stype_",
            dataset: {
                'verse':'verse',
                'comment':'comment',
                'editor_commentary':'editor',
                'caption':'caption'
            },
            opts: settings.liteOptions,
        },
        sentence_refs: {
            label: "sentence_refs",
            opts: settings.defaultOptions,
        }
    }
};


sattrlist.s24_update = {
    text_urlmsg: {
        label: "suomi24fi_urlmsg",
        type: "url",
        url_opts: sattrs.link_url_opts
    },
    text_urlboard: {
        label: "suomi24fi_urlboard",
        type: "url",
        url_opts: sattrs.link_url_opts
    },
    sentence_id: sattrs.sentence_id_hidden,
    text_title: sattrs.text_title,
    text_title_lemmas: {
	label: "title_lemmas",
    },
    text_date: sattrs.date,
    text_time: sattrs.text_time,
    text_tid: {
	label: "discussion_thread_id",
    },
    text_cid: {
        label: "suomi24fi_cid",
    },
    text_discussionarea: {
        label: "suomi24fi_sect",
    },
    text_subsections: {
        label: "suomi24fi_sub",
    },
    text_anonnick: {
        label: "suomi24fi_user",
    },
    text_anonnick_lemmas: {
	label: "suomi24fi_user_lemmas",
    },
};


// KFSPC

settings.corpora.kfspc_fi = {
    title: "KFSPC suomi",
    description: "Kotus Finnish-Swedish Parallel Corpus, suomenkielinen osuus",
    id: "kfspc_fi",
    cite_id: "kfspc-korp-fi",
    lang: "fin",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    features: ["parsed_tdt", "finer"],
    struct_attributes: sattrlist.kfspc
};

settings.fn.extend_corpus_settings(settings.corpusinfo.kfspc, ["kfspc_fi"]);

// Ylioppilasaineet

settings.corpora.yoaineet = {
    id: "yoaineet",
    title: "Ylioppilasaineet",
    description: "Ylioppilaskokelaiden äidinkielen (suomen) esseitä vuosilta 1994, 1999 ja 2004",
    urn: "urn:nbn:fi:lb-2019032801",
    metadata_urn: "urn:nbn:fi:lb-2017030301",
    licence: {
        name: "CLARIN RES +NC +PRIV 1.0",
        urn: "urn:nbn:fi:lb-2017030601",
    },
    cite_id: "ylioppilasaineet",
    limited_access: true,
    licence_type: "RES",
    features: ["paragraphs", "parsed_tdt", "finer"],
    attributes: {
	namecat_omorfi: attrs.namecat_omorfi,
    },
    struct_attributes: {
	text_id: sattrs.hidden,
	text_year: sattrs.year,
	text_author: sattrs.text_author,
	text_author_name_type: sattrs.author_name_type,
	text_author_sex: sattrs.sex,
	text_title: sattrs.text_title,
	text_topic_num: {
	    label: "topic_number"
	},
	text_grade_teacher: {
	    label: "grade_teacher"
	},
	text_grade_censor: {
	    label: "grade_censor"
	},    
	paragraph_id: sattrs.paragraph_id_hidden,
	sentence_id: sattrs.sentence_id_hidden,
    },
};

settings.corpus_aliases.ylioppilasaineet = "yoaineet";
settings.corpus_aliases["yo-aineet"] = "yoaineet";


// FiRuLex

settings.corpora.legal_fi = {
    id: "legal_fi",
    title: "FiRuLex suomi",
    description: "Juridisia tekstejä (suomi)",
    cite_id: "FiRuLex-fi",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.mulcold_fi,
    struct_attributes: sattrlist.legal
};

settings.fn.extend_corpus_settings(settings.corpusinfo.firulex,
				   ["legal_fi"]);


// MULCOLD

settings.corpora.mulcold_fi = {
    id: "mulcold_fi",
    title: "MULCOLD suomi",
    description: "Multilingual Corpus of Legal Documents, suomenkielinen osa",
    cite_id: "MULCOLD",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.mulcold_fi,
    struct_attributes: sattrlist.mulcold
};

settings.fn.extend_corpus_settings(settings.corpusinfo.mulcold,
				   ["mulcold_fi"]);


/* ParFin Finnish */

/*
// Deprecated version
settings.corpora.parfin_fi = {
    id: "parfin_fi",
    title: "ParFin (suomi) [poistuva]",
    description: "ParFin – suomi–venäjä kaunokirjallisten tekstien rinnakkaiskorpus (suomenkieliset alkuperäistekstit)<br/>Suomenkielisiä kaunokirjallisia tekstejä vuosilta 1990–2010<br/><br/><strong>Huomaa, että ParFin 2016 korvaa tämän korpuksen, ja tämä korpus poistuu käytöstä helmikuussa 2017.</strong>",
    // TODO: Add paragraphs corresponding to link elements
    context: settings.defaultContext,
    within: settings.defaultWithin,
    attributes: attrlist.parfin_fi,
    struct_attributes: sattrlist.parfin_fi,
    limited_access: true,
    licence_type: "RES",
};

settings.fn.extend_corpus_settings(settings.corpusinfo.parfin, ["parfin_fi"]);
*/


/* ParRus Finnish */

/*
// Deprecated version
settings.corpora.parrus_fi = {
    id: "parrus_fi",
    title: "ParRus (suomi) [poistuva]",
    description: "ParRus – venäjä–suomi kaunokirjallisten tekstien rinnakkaiskorpus (suomenkieliset käännökset)<br/>Venäjänkielisten kaunokirjallisten tekstien (klassista ja 1900-luvun kirjallisuutta) käännöksiä suomeksi<br/><br/><strong>Huomaa, että ParRus 2016 korvaa tämän korpuksen, ja tämä korpus poistuu käytöstä helmikuussa 2017.</strong>",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    limited_access: true,
    licence_type: "RES",
    attributes: attrlist.parrus_fi,
    struct_attributes: sattrlist.parrus_fi,
};
settings.fn.extend_corpus_settings(settings.corpusinfo.parrus, ["parrus_fi"]);
*/


/* ParFin 2016 Finnish */

settings.corpora.parfin_2016_fi = {
    id: "parfin_2016_fi",
    title: "ParFin 2016 (suomi)",
    description: "ParFin 2016 – suomi–venäjä kaunokirjallisten tekstien rinnakkaiskorpus (suomenkieliset alkuperäistekstit)<br/>Suomenkielisiä kaunokirjallisia tekstejä vuosilta 1910–2008<br/><br/><a href=\"http://universaldependencies.org/#fi\" target=\"_blank\">Annotaatioiden kuvaus</a>",
    urn: "urn:nbn:fi:lb-2016121602",
    metadata_urn: "urn:nbn:fi:lb-20161216211",
    licence: settings.licenceinfo.ParFinRus_2016_fi,
    cite_id: "ParFin2016",
    context: settings.sentLinkContext,
    within: settings.sentLinkWithin,
    attributes: attrlist.parfin_2016_fi,
    struct_attributes: sattrlist.parfin_2016_fi,
    limited_access: true,
    licence_type: "RES",
};

settings.fn.extend_corpus_settings(settings.corpusinfo.parfin_2016,
				   ["parfin_2016_fi"]);


/* ParRus 2016 Finnish */

settings.corpora.parrus_2016_fi = {
    id: "parrus_2016_fi",
    title: "ParRus 2016 (suomi)",
    description: "ParRus 2016 – venäjä–suomi kaunokirjallisten tekstien rinnakkaiskorpus (suomenkieliset käännökset)<br/>Venäjänkielisten kaunokirjallisten tekstien (klassista ja 1900-luvun kirjallisuutta) käännöksiä suomeksi<br/><br/><a href=\"http://universaldependencies.org/#fi\" target=\"_blank\">Annotaatioiden kuvaus</a>",
    urn: "urn:nbn:fi:lb-2016121606",
    metadata_urn: "urn:nbn:fi:lb-2016121613",
    licence: settings.licenceinfo.ParFinRus_2016_fi,
    cite_id: "ParRus2016",
    context: settings.sentLinkContext,
    within: settings.sentLinkWithin,
    limited_access: true,
    licence_type: "RES",
    attributes: attrlist.parrus_2016_fi,
    struct_attributes: sattrlist.parrus_2016_fi,
};
settings.fn.extend_corpus_settings(settings.corpusinfo.parrus_2016,
				   ["parrus_2016_fi"]);




/*
 * Previously in Finnish National Library mode
 */

sattrlist.klk_fi = $.extend({}, sattrlist.klk);
sattrlist.klk_fi_parsed = $.extend(
    {}, sattrlist.klk_fi,
    {
	sentence_parse_state: {
	    label: "parse_state",
	    displayType: "select",
	    translationKey: "parse_state_",
	    opts: settings.liteOptions,
	    dataset: {
		"parsed": "parsed",
		"tagged": "tagged"
	    }
	},
	sentence_local_id: {
	    label: "local_id",
	    displayType: "hidden"
	}
    });

sattrlist.klk_fi_parsed_pagelinks = $.extend(
    {}, sattrlist.klk_fi_parsed, sattrlist.klk_pagelinks);

attrlist.klk_fi = {
    ocr: {
	label: "OCR",
	opts: settings.defaultOptions
    }
};

attrlist.klk_fi_parsed =
    $.extend(
	{
	    lemma: attrs.baseform,
	    lemmacomp: attrs.baseform_compound,
	    pos: attrs.pos_klk,
	    msd: attrs.msd,
	    dephead: attrs.dephead,
	    deprel: attrs.deprel_tdt,
	    ref: attrs.ref,
	    lex: attrs.lemgram_hidden
	},
	attrlist.klk_fi,
	attrlist.finer);

attrlist.klk_fi_parsed_pagelinks = attrlist.klk_fi_parsed;


var klk_fi_parsed_years = settings.fn.make_yearlist(1820, 2000);
// // All KLK Fi corpora now have NER tags, so this is not needed
// var klk_fi_ner_years = settings.fn.make_yearlist(1820, 1820);

// Generate settings.corpora and settings.corporafolders for the
// Finnish KLK corpora by using the above functions

settings.fn.make_corpus_settings_by_year_decade(
    settings.corporafolders.klk_fi, "fi_{decade}", "klk_fi_{year}",
    function(decade) {
	return {
	    title: decade.toString() + "-luku",
	    // unselected: (decade <= 1880)
	};
    },
    function(year) {
	return settings.fn.make_klk_corpus_settings(
	    "KLK suomi {year}",
	    "Kansalliskirjaston suomenkielisiä sanoma- ja aikakauslehtiä vuodelta {year}",
	    "fi",
	    year,
	    klk_fi_parsed_years.indexOf(year) != -1);
    },
    settings.fn.make_yearlist(1820, 2000,
			      {descending: true,
			       omit: [1828, 1843]})
);

// for (var i = 0; i < klk_fi_ner_years.length; i++) {
//     var year = klk_fi_ner_years[i];
//     var corpsettings = settings.corpora["klk_fi_" + year.toString()];
//     corpsettings.attributes = $.extend({}, corpsettings.attributes,
// 				       attrlist.finer);
// }

delete klk_fi_parsed_years;
// delete klk_fi_ner_years;


/*
 * Previously in Old Finnish Mode
 */

sattrs.vks_sentence_id = {
    label: "vks_sentence_id"
};
sattrs.vks_sentence_cref = {
    label: "vks_sentence_cRef"
};
sattrs.vks_sentence_code = {
    label: "vks_sentence_code"
};
sattrs.vks_sentence_type = {
    label: "vks_sentence_type",
    displayType: "select",
    translationKey: "vks_sentence_type_",
    dataset: [
	"sentence",
	"heading",
    ],
};
sattrs.vks_text_year = {
    label: "vks_text_year"
};
sattrs.vks_text_title = {
    label: "vks_text_title"
};
sattrs.vks_sentence_page = {
    label: "vks_sentence_page"
};
sattrs.vks_sourcecode_code = {
    label: "vks_sourcecode_code"
};
sattrs.vks_sourcecode_page = {
    label: "vks_sourcecode_page"
};
sattrs.vks_span_page = {
    label: "vks_span_page"
};

/*
sattrs.vksbib_book_code = {
    label: "vksbib_book_code",
    displayType: "select",
    translationKey: "vksbibbook_",
    dataset: {
	"VT4": "VT4",
	"Jes": "Jes",
	"Jer": "Jer",
	"Vlt": "Vlt",
	"Hes": "Hes",
	"Dan": "Dan",
	"Hos": "Hos",
	"Joel": "Joel",
	"Am": "Am",
	"Ob": "Ob",
	"Jon": "Jon",
	"Mik": "Mik",
	"Nah": "Nah",
	"Hab": "Hab",
	"Sef": "Sef",
	"Hgg": "Hgg",
	"Sak": "Sak",
	"Mal": "Mal",
    },
    opts: settings.liteOptions
};
// Copy the object so that the change does not affect the original.
sattrs.vksbib_sourcecode_book = $.extend({}, sattrs.vksbib_book_code);
sattrs.vksbib_sourcecode_book.label = "vksbib_sourcecode_book";
sattrs.vkslait_law_code = {
    label: "vkslait_law_code",
    displayType: "select",
    translationKey: "vkslaitlaw_",
    dataset: {
	"As1584": "As1584",
	"As1593": "As1593"
    },
    opts: settings.liteOptions
};
sattrs.vkslait_sourcecode_work = $.extend({}, sattrs.vkslait_law_code);
sattrs.vkslait_sourcecode_work.label = "vkslait_sourcecode_work";
sattrs.vkssaarnat_source_code = {
    label: "vkssaarnat_source_code",
    displayType: "select",
    translationKey: "vkssaarnatsource_",
    dataset: {
	"Swahn1706": "Swahn1706",
	"Wall1706": "Wall1706",
	"Sten1750": "Sten1750",
	"Rein1750": "Rein1750",
	"Sten1771": "Sten1771",
	"Varia1756a": "Varia1756a",
	"Paz1764": "Paz1764",
	"Elgf1768": "Elgf1768",
	"Laih1768": "Laih1768",
	"GLyra1772": "GLyra1772",
	"Sax1776": "Sax1776",
	"Äjm1779": "Äjm1779",
	"Widen1780": "Widen1780",
	"Popp1781": "Popp1781"
    },
    opts: settings.liteOptions
};
sattrs.vkssaarnat_sourcecode_work = $.extend({}, sattrs.vkssaarnat_source_code);
sattrs.vkssaarnat_sourcecode_work.label = "vkssaarnat_sourcecode_work";
*/

/*
settings.corpora.vks_biblia = {
    title: "Biblia (näyte)",
    description: "Vuoden 1642 raamatunsuomennos",
    id: "vks_biblia",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {},
    struct_attributes: {
	sourcecode_bibleref: {
	    label: "vksbib_sourcecode_bibleref"
	},
	sourcecode_book: sattrs.vksbib_sourcecode_book,
	sourcecode_chapter: {
	    label: "vksbib_sourcecode_chapter"
	},
	sourcecode_verse: {
	    label: "vksbib_sourcecode_verse"
	},
	sourcecode_code: sattrs.vks_sourcecode_code,
	sourcecode_page: sattrs.vks_sourcecode_page,
	work_code: {
	    label: "vks_work_code",
	    displayType: "hidden",
	},
	verse_bibleref: {
	    label: "vksbib_verse_bibleref"
	},
	book_code: sattrs.vksbib_book_code,
	chapter_code: {
	    label: "vksbib_chapter_code"
	},
	// chapter_bibleref: {
	//     label: "vksbib_chapter_bibleref"
	// },
	verse_code: {
	    label: "vksbib_verse_code"
	},
	sentence_id: sattrs.sentence_id_hidden,
	span_code: sattrs.vks_sentence_code,
	span_page: sattrs.vks_sentence_page
    }
};
*/

/*
settings.corpora.vks_lait = {
    title: "Laki- ja asetustekstejä (näyte)",
    description: "Laki- ja asetustekstejä",
    id: "vks_lait",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
	word_orig: attrs.origword,
	word_completed: attrs.complword
    },
    struct_attributes: {
	sourcecode_work: sattrs.vkslait_sourcecode_work,
	sourcecode_code: sattrs.vks_sourcecode_code,
	sourcecode_page: sattrs.vks_sourcecode_page,
	law_code: sattrs.vkslait_law_code,
	sentence_id: sattrs.sentence_id_hidden,
	span_code: sattrs.vks_sentence_code,
	span_page: sattrs.vks_sentence_page
    }
};
*/

/*
settings.corpora.vks_saarnat = {
    title: "Ruumissaarnoja, puheita ja muistorunoja (näyte)",
    description: "Ruumissaarnoja, puheita ja muistorunoja",
    id: "vks_saarnat",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
	word_orig: attrs.origword,
	word_completed: attrs.complword
    },
    struct_attributes: {
	sourcecode_work: sattrs.vkssaarnat_sourcecode_work,
	sourcecode_code: sattrs.vks_sourcecode_code,
	sourcecode_page: sattrs.vks_sourcecode_page,
	source_code: sattrs.vkssaarnat_source_code,
	sentence_id: sattrs.sentence_id_hidden,
	span_code: sattrs.vks_sentence_code,
	span_page: sattrs.vks_sentence_page
    }
};
*/

settings.corpora.vks_agricola = {
    title: "Mikael Agricolan teoksia",
    description: "Mikael Agricolan teokset: Mikael Agricolan teosten 1–3 uudistettu näköispainos (WSOY: Porvoo 1987)",
    id: "vks_agricola",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
	word_orig: attrs.origword,
	word_completed: attrs.complword,
	word_tilde: attrs.tildeword
    },
    struct_attributes: {
	text_year: sattrs.vks_text_year,
	text_title: sattrs.vks_text_title,
	text_title_facsimile: {
	    label: "facsimile_title",
	},
	sentence_type: sattrs.vks_sentence_type,
	sentence_code: sattrs.vks_sentence_code,
	sentence_id: sattrs.sentence_id_hidden,
	sentence_cRef: sattrs.vks_sentence_cref,
	span_page: sattrs.vks_span_page
    }
};

settings.corpora.vks_almanakat = {
    title: "Almanakkoja vuosilta 1705–1809",
    description: "Almanakkoja vuosilta 1705–1809",
    id: "vks_almanakat",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
        word_orig: attrs.origword,
        word_completed: attrs.complword,
        word_tilde: attrs.tildeword
    },
    struct_attributes: {
        text_year: sattrs.vks_text_year,
        text_title: sattrs.vks_text_title,
        sentence_type: sattrs.vks_sentence_type,
        sentence_code: sattrs.vks_sentence_code,
        sentence_id: sattrs.sentence_id_hidden,
        sentence_cRef: sattrs.vks_sentence_cref,
        span_page: sattrs.vks_span_page
    }
};

settings.corpora.vks_biblia = {
    title: "Biblia 1642",
    description: "Vuoden 1642 raamatunsuomennos",
    id: "vks_biblia",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
        word_orig: attrs.origword,
        word_completed: attrs.complword,
        word_tilde: attrs.tildeword
    },
    struct_attributes: {
        text_year: sattrs.vks_text_year,
        text_title: sattrs.vks_text_title,
        sentence_type: sattrs.vks_sentence_type,
        sentence_code: sattrs.vks_sentence_code,
        sentence_id: sattrs.sentence_id_hidden,
        sentence_cRef: sattrs.vks_sentence_cref,
        span_page: sattrs.vks_span_page
    }
};

settings.corpora.vks_bjorkqvist = {
    title: "Bjorkqvist 1801",
    description: "Uskon harjoitus Autuuteen, Sowitettu niiden Wuotisten \
Juhla- ja Sunnundai-Päiwäisten Evangeliumein Tutkinnoissa. Osat I–II 1801",
    id: "vks_bjorkqvist",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
        word_orig: attrs.origword,
        word_completed: attrs.complword,
        word_tilde: attrs.tildeword
    },
    struct_attributes: {
        text_year: sattrs.vks_text_year,
        text_title: sattrs.vks_text_title,
        sentence_type: sattrs.vks_sentence_type,
        sentence_code: sattrs.vks_sentence_code,
        sentence_id: sattrs.sentence_id_hidden,
        sentence_cRef: sattrs.vks_sentence_cref,
        span_page: sattrs.vks_span_page
    }
};

settings.corpora.vks_frosterus = {
    title: "Frosterus 1791",
    description: "Hyödyllinen Huwitus Luomisen Töistä, Yxinkertaisille awuxi Jumalan Hywyden Tundoon ja Palweluxeen",
    id: "vks_frosterus",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
        word_orig: attrs.origword,
        word_completed: attrs.complword,
        word_tilde: attrs.tildeword
    },
    struct_attributes: {
        text_year: sattrs.vks_text_year,
        text_title: sattrs.vks_text_title,
        sentence_type: sattrs.vks_sentence_type,
        sentence_code: sattrs.vks_sentence_code,
        sentence_id: sattrs.sentence_id_hidden,
        sentence_cRef: sattrs.vks_sentence_cref,
        span_page: sattrs.vks_span_page
    }
};

settings.corpora.vks_ganander = {
    title: "Christfried Ganander 1763–1788",
    description: "Gananderin teoksia",
    id: "vks_ganander",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
        word_orig: attrs.origword,
        word_completed: attrs.complword,
        word_tilde: attrs.tildeword
    },
    struct_attributes: {
        text_year: sattrs.vks_text_year,
        text_title: sattrs.vks_text_title,
        sentence_type: sattrs.vks_sentence_type,
        sentence_code: sattrs.vks_sentence_code,
        sentence_id: sattrs.sentence_id_hidden,
        sentence_cRef: sattrs.vks_sentence_cref,
        span_page: sattrs.vks_span_page
    }
};

settings.corpora.vks_lait = {
    title: "Lakeja ja asetuksia 1500–1810",
    description: "Lakeja ja asetuksia 1500-, 1600-, 1700- ja 1800-luvuilta",
    id: "vks_lait",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
        word_orig: attrs.origword,
        word_completed: attrs.complword,
        word_tilde: attrs.tildeword
    },
    struct_attributes: {
        text_year: sattrs.vks_text_year,
        text_title: sattrs.vks_text_title,
        sentence_type: sattrs.vks_sentence_type,
        sentence_code: sattrs.vks_sentence_code,
        sentence_id: sattrs.sentence_id_hidden,
        sentence_cRef: sattrs.vks_sentence_cref,
        span_page: sattrs.vks_span_page
    }
};

settings.corpora.vks_lizelius = {
    title: "Antti Lizelius 1756–1780",
    description: "Lizeliuksen teoksia vuosilta 1756–1780",
    id: "vks_lizelius",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
        word_orig: attrs.origword,
        word_completed: attrs.complword,
        word_tilde: attrs.tildeword
    },
    struct_attributes: {
        text_year: sattrs.vks_text_year,
        text_title: sattrs.vks_text_title,
        sentence_type: sattrs.vks_sentence_type,
        sentence_code: sattrs.vks_sentence_code,
        sentence_id: sattrs.sentence_id_hidden,
        sentence_cRef: sattrs.vks_sentence_cref,
        span_page: sattrs.vks_span_page
    }
};

settings.corpora.vks_lpetri = {
    title: "Laurentius Petri 1644–1670",
    description: "Laurentius Petrin saarnoja 1644–1670",
    id: "vks_lpetri",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
        word_orig: attrs.origword,
        word_completed: attrs.complword,
        word_tilde: attrs.tildeword
    },
    struct_attributes: {
        text_year: sattrs.vks_text_year,
        text_title: sattrs.vks_text_title,
        sentence_type: sattrs.vks_sentence_type,
        sentence_code: sattrs.vks_sentence_code,
        sentence_id: sattrs.sentence_id_hidden,
        sentence_cRef: sattrs.vks_sentence_cref,
        span_page: sattrs.vks_span_page
    }
};

settings.corpora.vks_saarnat = {
    title: "Ruumissaarnoja, puheita ja muistorunoja",
    description: "Ruumissaarnoja, puheita ja muistorunoja 1600- ja 1700-luvuilta",
    id: "vks_saarnat",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
        word_orig: attrs.origword,
        word_completed: attrs.complword,
        word_tilde: attrs.tildeword
    },
    struct_attributes: {
        text_year: sattrs.vks_text_year,
        text_title: sattrs.vks_text_title,
        sentence_type: sattrs.vks_sentence_type,
        sentence_code: sattrs.vks_sentence_code,
        sentence_id: sattrs.sentence_id_hidden,
        sentence_cRef: sattrs.vks_sentence_cref,
        span_page: sattrs.vks_span_page
    }
};

settings.corpora.vks_varia = {
    title: "Varia",
    description: "Kokoelma tekstejä 1500-, 1600-, 1700- ja 1800-luvuilta",
    id: "vks_varia",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
        word_orig: attrs.origword,
        word_completed: attrs.complword,
        word_tilde: attrs.tildeword
    },
    struct_attributes: {
        text_year: sattrs.vks_text_year,
        text_title: sattrs.vks_text_title,
        sentence_type: sattrs.vks_sentence_type,
        sentence_code: sattrs.vks_sentence_code,
        sentence_id: sattrs.sentence_id_hidden,
        sentence_cRef: sattrs.vks_sentence_cref,
        span_page: sattrs.vks_span_page
    }
};

settings.corpora.vks_virret = {
    title: "Virret",
    description: "Virsiä",
    id: "vks_virret",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
        word_orig: attrs.origword,
        word_completed: attrs.complword,
        word_tilde: attrs.tildeword
    },
    struct_attributes: {
        text_year: sattrs.vks_text_year,
        text_title: sattrs.vks_text_title,
        sentence_type: sattrs.vks_sentence_type,
        sentence_code: sattrs.vks_sentence_code,
        sentence_id: sattrs.sentence_id_hidden,
        sentence_cRef: sattrs.vks_sentence_cref,
        span_page: sattrs.vks_span_page
    }
};

/*
settings.corpora.vns_asetus = {
    title: "Asetuksia (näyte)",
    description: "Asetuksia",
    id: "vns_asetus",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    struct_attributes: {
	text_title: sattrs.text_title,
	text_distributor: sattrs.text_distributor,
	text_source: sattrs.text_source,
	article_id: {
	    label: "article_id"
	},
	paragraph_id: {
	    label: "lawparagraph_id"
	},
	sentence_type: {
	    label: "sentence_type",
	    displayType: "select",
	    translationKey: "sentencetype_",
	    dataset: {
		"p": "p",
		"head": "head",
		"opening": "opening"
	    },
	    opts: settings.liteOptions
	},
	sentence_id: sattrs.sentence_id_hidden,
	hi_rend: {
	    label: "hi_rend",
	    displayType: "select",
	    translationKey: "hirend_",
	    dataset: {
		"bold": "bold"
	    },
	    opts: settings.liteOptions
	}
    }
};

settings.corpora.vns_renqvist = {
    title: "Renqvist (näyte)",
    description: "Renqvist",
    id: "vns_renqvist",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: {
	text_title: sattrs.text_title,
	text_distributor: sattrs.text_distributor,
	text_source: sattrs.text_source,
	paragraph_id: sattrs.paragraph_id,
	paragraph_type: sattrs.paragraph_type,
	sentence_id: sattrs.sentence_id_hidden,
	sentence_n: sattrs.sentence_n
    }
};
*/

settings.corpora.vnsk_asetus = {
    title: "Asetuksia",
    description: "Asetuksia",
    id: "vnsk_asetus",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
    },
    struct_attributes: {
        text_title: sattrs.text_title,
        text_distributor: sattrs.text_distributor,
        text_source: sattrs.text_source,
        article_id: {
            label: "article_id"
        },
        paragraph_id: {
            label: "lawparagraph_id"
        },
        sentence_type: {
            label: "sentence_type",
            displayType: "select",
            translationKey: "sentencetype_",
            dataset: {
                "p": "p",
                "head": "head",
                "opening": "opening"
            },
            opts: settings.liteOptions
        },
        sentence_id: sattrs.sentence_id_hidden,
        hi_rend: {
            label: "hi_rend",
            displayType: "select",
            translationKey: "hirend_",
            dataset: {
                "bold": "bold"
            },
            opts: settings.liteOptions
        }
    }
};


settings.corpora.vnsk_kivi = {
    title: "Kivi",
    description: "Kivi",
    id: "vnsk_kivi",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_keckman = {
    title: "Keckman",
    description: "Keckman",
    id: "vnsk_keckman",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_cajan = {
    title: "Cajan",
    description: "Cajan",
    id: "vnsk_cajan",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_cajan = {
    title: "Cajan",
    description: "Cajan",
    id: "vnsk_cajan",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};


settings.corpora.vnsk_cannelin = {
    title: "Cannelin",
    description: "Cannelin",
    id: "vnsk_cannelin",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_aminoff = {
    title: "Aminoff",
    description: "Aminoff",
    id: "vnsk_aminoff",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_ahlholm = {
    title: "Ahlholm",
    description: "Ahlholm",
    id: "vnsk_ahlholm",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};


settings.corpora.vnsk_yksitt = {
    title: "Yksittäisiä",
    description: "Yksittäisiä",
    id: "vnsk_yksitt",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_aejmelaeus = {
    title: "Aejmelaeus",
    description: "Aejmelaeus",
    id: "vnsk_aejmelaeus",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_ahlman_kirjat = {
    title: "Ahlman kirjat",
    description: "Ahlman kirjat",
    id: "vnsk_ahlman_kirjat",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_ahlman_sanastot = {
    title: "Ahlman sanastot",
    description: "Ahlman sanastot",
    id: "vnsk_ahlman_sanastot",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_ahlqvist = {
    title: "Ahlqvist",
    description: "Ahlqvist",
    id: "vnsk_ahlqvist",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_akiander = {
    title: "Akiander",
    description: "Akiander",
    id: "vnsk_akiander",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_almanakka = {
    title: "Almanakka",
    description: "Almanakka",
    id: "vnsk_almanakka",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_anonyymi = {
    title: "Anonyymi",
    description: "Anonyymi",
    id: "vnsk_anonyymi",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_aulen = {
    title: "Aulen",
    description: "Aulen",
    id: "vnsk_aulen",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_backvall = {
    title: "Backvall",
    description: "Backvall",
    id: "vnsk_backvall",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_bocker = {
    title: "Bocker",
    description: "Bocker",
    id: "vnsk_bocker",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_bonsdorff = {
    title: "Bonsdorff",
    description: "Bonsdorff",
    id: "vnsk_bonsdorff",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_borenius = {
    title: "Borenius",
    description: "Borenius",
    id: "vnsk_borenius",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_borg = {
    title: "Borg",
    description: "Borg",
    id: "vnsk_borg",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_cantell = {
    title: "Cantell",
    description: "Cantell",
    id: "vnsk_cantell",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_corander = {
    title: "Corander",
    description: "Corander",
    id: "vnsk_corander",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_costiander = {
    title: "Costiander",
    description: "Costiander",
    id: "vnsk_costiander",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_dahlberg = {
    title: "Dahlberg",
    description: "Dahlberg",
    id: "vnsk_dahlberg",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_edlund = {
    title: "Edlund",
    description: "Edlund",
    id: "vnsk_edlund",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_eklof = {
    title: "Eklof",
    description: "Eklof",
    id: "vnsk_eklof",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_euren = {
    title: "Euren",
    description: "Euren",
    id: "vnsk_euren",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_europaeus = {
    title: "Europaeus",
    description: "Europaeus",
    id: "vnsk_europaeus",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_europaeus_sanastot = {
    title: "Europaeus sanastot",
    description: "Europaeus sanastot",
    id: "vnsk_europaeus_sanastot",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_fabritius = {
    title: "Fabritius",
    description: "Fabritius",
    id: "vnsk_fabritius",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_forsman = {
    title: "Forsman",
    description: "Forsman",
    id: "vnsk_forsman",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_forstrom = {
    title: "Forström",
    description: "Forström",
    id: "vnsk_forstrom",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_friman = {
    title: "Friman",
    description: "Friman",
    id: "vnsk_friman",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_frosterus = {
    title: "Frosterus",
    description: "Frosterus",
    id: "vnsk_frosterus",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_gottlund = {
    title: "Gottlund",
    description: "Gottlund",
    id: "vnsk_gottlund",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_granlund = {
    title: "Granlund",
    description: "Granlund",
    id: "vnsk_granlund",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_hannikainen = {
    title: "Hannikainen",
    description: "Hannikainen",
    id: "vnsk_hannikainen",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_hjelt = {
    title: "Hjelt",
    description: "Hjelt",
    id: "vnsk_hjelt",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_hordh = {
    title: "Hordh",
    description: "Hordh",
    id: "vnsk_hordh",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_hornborg = {
    title: "Hornborg",
    description: "Hornborg",
    id: "vnsk_hornborg",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_ignatius = {
    title: "Ignatius",
    description: "Ignatius",
    id: "vnsk_ignatius",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_ingman = {
    title: "Ingman",
    description: "Ingman",
    id: "vnsk_ingman",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_innain = {
    title: "Innain",
    description: "Innain",
    id: "vnsk_innain",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_juteini = {
    title: "Juteini",
    description: "Juteini",
    id: "vnsk_juteini",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_kemell = {
    title: "Kemell",
    description: "Kemell",
    id: "vnsk_kemell",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_kilpinen = {
    title: "Kilpinen",
    description: "Kilpinen",
    id: "vnsk_kilpinen",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_koskinen = {
    title: "Koskinen",
    description: "Koskinen",
    id: "vnsk_koskinen",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_krohn = {
    title: "Krohn",
    description: "Krohn",
    id: "vnsk_krohn",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_lagervall = {
    title: "Lagervall",
    description: "Lagervall",
    id: "vnsk_lagervall",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_lankela = {
    title: "Lankela",
    description: "Lankela",
    id: "vnsk_lankela",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_lavonius = {
    title: "Lavonius",
    description: "Lavonius",
    id: "vnsk_lavonius",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_lilius_anton = {
    title: "Lilius Anton",
    description: "Lilius Anton",
    id: "vnsk_lilius_anton",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_lilius_aukusti = {
    title: "Lilius Aukusti",
    description: "Lilius Aukusti",
    id: "vnsk_lilius_aukusti",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_lonnrot = {
    title: "Lönnrot",
    description: "Lönnrot",
    id: "vnsk_lonnrot",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_malmberg = {
    title: "Malmberg",
    description: "Malmberg",
    id: "vnsk_malmberg",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_mehilainen = {
    title: "Mehilainen",
    description: "Mehilainen",
    id: "vnsk_mehilainen",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_mela = {
    title: "Mela",
    description: "Mela",
    id: "vnsk_mela",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_meurman = {
    title: "Meurman",
    description: "Meurman",
    id: "vnsk_meurman",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_mmy = {
    title: "Maamiehen Ystävä",
    description: "Maamiehen Ystävä (1844–1845)",
    id: "vnsk_mmy",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_murman = {
    title: "Murman",
    description: "Murman",
    id: "vnsk_murman",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_muut = {
    title: "Muut",
    description: "Muut",
    id: "vnsk_muut",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_nyman = {
    title: "Nyman",
    description: "Nyman",
    id: "vnsk_nyman",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_ovs = {
    title: "Oulun Viikko-Sanomat",
    description: "Oulun Viikko-Sanomat (1829–1833, 1837, 1841)",
    id: "vnsk_ovs",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_polen = {
    title: "Polen",
    description: "Polen",
    id: "vnsk_polen",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_poppius = {
    title: "Poppius",
    description: "Poppius",
    id: "vnsk_poppius",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_puhuttelija = {
    title: "Puhuttelija",
    description: "Puhuttelija",
    id: "vnsk_puhuttelija",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_rein = {
    title: "Rein",
    description: "Rein",
    id: "vnsk_rein",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_roos = {
    title: "Roos",
    description: "Roos",
    id: "vnsk_roos",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_salmelainen = {
    title: "Salmelainen",
    description: "Salmelainen",
    id: "vnsk_salmelainen",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_salonius = {
    title: "Salonius",
    description: "Salonius",
    id: "vnsk_salonius",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_sanaluettelot = {
    title: "Sanaluettelot",
    description: "Sanaluettelot",
    id: "vnsk_sanaluettelot",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_sandberg = {
    title: "Sandberg",
    description: "Sandberg",
    id: "vnsk_sandberg",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_schroter = {
    title: "Schröter",
    description: "Schröter",
    id: "vnsk_schroter",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_sirelius = {
    title: "Sirelius",
    description: "Sirelius",
    id: "vnsk_sirelius",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_skogman = {
    title: "Skogman",
    description: "Skogman",
    id: "vnsk_skogman",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_smtr = {
    title: "Suomettaren vuosikertoja",
    description: "Suomettaren vuosikerrat (1847–1848)",
    id: "vnsk_smtr",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_sohlberg = {
    title: "Sohlberg",
    description: "Sohlberg",
    id: "vnsk_sohlberg",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_soldan = {
    title: "Soldan",
    description: "Soldan",
    id: "vnsk_soldan",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_ssv = {
    title: "Sanan Saattaja Viipurista",
    description: "Sanan Saattaja Viipurista",
    id: "vnsk_ssv",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_stahlberg = {
    title: "Ståhlberg",
    description: "Ståhlberg",
    id: "vnsk_stahlberg",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_tarvanen = {
    title: "Tarvanen",
    description: "Tarvanen",
    id: "vnsk_tarvanen",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_ticklen = {
    title: "Ticklen",
    description: "Ticklen",
    id: "vnsk_ticklen",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_tikkanen = {
    title: "Tikkanen",
    description: "Tikkanen",
    id: "vnsk_tikkanen",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_topelius = {
    title: "Topelius",
    description: "Topelius",
    id: "vnsk_topelius",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_toppelius = {
    title: "Toppelius",
    description: "Toppelius",
    id: "vnsk_toppelius",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_tvs = {
    title: "Turun Viikko-Sanomat",
    description: "Turun Viikko-Sanomat",
    id: "vnsk_tvs",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_varelius = {
    title: "Varelius",
    description: "Varelius",
    id: "vnsk_varelius",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_virsikirja = {
    title: "Virsikirja",
    description: "Virsikirja",
    id: "vnsk_virsikirja",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_wallin = {
    title: "Wallin",
    description: "Wallin",
    id: "vnsk_wallin",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_wikman = {
    title: "Wikman",
    description: "Wikman",
    id: "vnsk_wikman",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vnsk_wiwolin = {
    title: "Wiwolin",
    description: "Wiwolin",
    id: "vnsk_wiwolin",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: sattrlist.vnsk
};

settings.corpora.vns_renvall = {
    title: "Renvall",
    description: "Gustaf Renvall: Suomalainen sana-kirja (1826)",
    id: "vns_renvall",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
    },
    struct_attributes: {
	text_title: sattrs.text_title,
	text_distributor: sattrs.text_distributor,
	text_source: sattrs.text_source,
/*	sentence_form: {
	    label: "dict_form"
	},
	sentence_example: {
	    label: "dict_example"
	},
	sentence_pos: {
	    label: "pos"
	},
	sentence_xref: {
	    label: "dict_xref"
	},
	sentence_etym: {
	    label: "dict_etym"
	},
	sentence_etymlang: {
	    label: "dict_etymlang",
	    displayType: "select",
	    translationKey: "dictetymlang_",
	    dataset: {
		"ru": "ru",
		"ve": "ve"
	    },
	    opts: settings.liteOptions
	},  */
	item_itemtype: {
	    label: "dict_itemtype",
	    displayType: "select",
	    translationKey: "dictitemtype_",
	    dataset: {
		"orth": "orth",
		"pos": "pos",
		"eg": "eg",
		"xr": "xr",
		"etym": "etym",
		"note": "note"
	    },
	    opts: settings.liteOptions
	},
	item_type: {
	    label: "dict_item_type"
	},
	item_lang: {
	    label: "dict_etymlang",
	    displayType: "select",
	    translationKey: "dictetymlang_",
	    dataset: {
		"ru": "ru",
		"ve": "ve"
	    },
	    opts: settings.liteOptions
	},
    }
};

settings.corpora.gutenberg = {
    title: "Suomenkielinen Gutenberg -korpus",
    description: "Project Gutenbergin sisältämiä suomenkielisiä teoksia, joiden tekijänoikeus on päättynyt",
    id: "gutenberg",
    urn: "urn:nbn:fi:lb-2014102101",
    metadata_urn: "urn:nbn:fi:lb-2014100301",
    homepage: {
	url: "http://www.gutenberg.org/",
	name: "Project Gutenberg",
	no_label: true
    },
    // Is the following correct? According to META-SHARE, licence
    // would be CC BY.
    // licence_url: "http://www.gutenberg.org/wiki/Gutenberg:The_Project_Gutenberg_License",
    licence: settings.licenceinfo.CC_BY,
    cite_id: "Gutenberg",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
	text_title: sattrs.text_title,
	sentence_id: sattrs.sentence_id_hidden,
	text_author: sattrs.text_author,
	text_producers: sattrs.text_producers,
	text_ebookid: sattrs.text_ebook_id,
	text_translator: sattrs.text_translator,
	text_published: sattrs.text_published,
        text_url: sattrs.link_gutenberg,
	text_directurl: sattrs.text_link_gutenberg
/*
	text_producers: sattrs.text_producers,
	sentence_id: sattrs.sentence_id_hidden
        text_title: sattrs.text_title,
        text_author: sattrs.text_author,
        p_id: sattrs.paragraph_id,
        s_id: sattrs.sentence_id_hidden,
        s_type: sattrs.sentence_type
*/
    }
};

/* testiversio
settings.corpora.suomi24fi = {
    title: "Suomi24",
    description: "suomi24.fi -forumin keskustelut (2001–2014)",
    id: "suomi24fi",
    urn: "urn:nbn:fi:lb-201412171",
    metadata_urn: "urn:nbn:fi:lb-201412171",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
	lemma: attrs.baseform,
	pos: attrs.pos_klk,
	msd: attrs.msd,
	dephead: attrs.dephead
    },
    struct_attributes: {
        text_title: sattrs.text_title,
        text_date: sattrs.date,
        text_time: sattrs.text_time,
        text_sect: {
            label: "suomi24fi_sect",
        },
        text_sub: {
            label: "suomi24fi_sub",
        },
        text_user: {
            label: "suomi24fi_user",
        },
        sentence_id: sattrs.sentence_id_hidden,

        text_urlmsg: {
            label: "suomi24fi_urlmsg",
            type: "url",
            url_opts: sattrs.link_url_opts
        },

	text_urlboard: {
            label: "suomi24fi_urlboard",
            type: "url",
            url_opts: sattrs.link_url_opts
        }
    }
};
*/

settings.corpus_aliases.murre = "skn";

settings.corpora.skn = {
    title: "SKN – Suomen kielen näytteitä",
    description: "SKN – Suomen kielen näytteitä",
    id: "skn",
    urn: "urn:nbn:fi:lb-201407141",
    metadata_urn: "urn:nbn:fi:lb-201407141",
    licence: settings.licenceinfo.CC_BY_40,
    cite_id: "SKN-korp",
    features: ["paragraphs", "parsed_tdt", "finer"],
    attributes: {
        original: attrs.origword,
        normalized: {
            label: "murre_normalized",
            opts: settings.defaultOptions,
        },
        comment: {
	    label: "word_comment",
	    opts: settings.defaultOptions
	},
    },
    struct_attributes: {
        text_title: sattrs.text_title,
        text_date: sattrs.date,
        text_editor: {
            label: "murre_editor"
	},
        text_parish: {
            label: "murre_parish"
	},
        text_dialect_region: {
            label: "murre_dialect_region"
	},
        text_dialect_group: {
            label: "murre_dialect_group"
	},
        text_name: {
            label: "file_name",
        },
        paragraph_speaker: {
            label: "murre_speaker"
	},
        paragraph_sex: {
            label: "murre_sex"
	},
        paragraph_role: {
            label: "murre_role"
	},
        sentence_urlview: {
            label: "murre_urlview",
            type: "url",
            url_opts: sattrs.link_url_opts
        },
        text_urlvaw: {
            label: "murre_urlwav",
            type: "url",
            url_opts: sattrs.link_url_opts
        },
        text_urltextgrid: {
            label: "murre_urltextgrid",
            type: "url",
            url_opts: sattrs.link_url_opts
        },
        text_urleaf: {
            label: "murre_urleaf",
            type: "url",
            url_opts: sattrs.link_url_opts
        }
    }
};

/* SINEBRYCHOFF */

settings.corpora.sinebrychoff_fi = {
    id: "sinebrychoff_fi",
    title: "Paul Sinebrychoffin kirjeenvaihto",
    description: "Paul Sinebrychoffin kirjeenvaihto, suomenkieliset käännökset",
    metadata_urn: "urn:nbn:fi:lb-201407303",
    licence: settings.licenceinfo.CC_BY_30,
    cite_id: "sinebrychoff-fi",
    features: ["paragraphs", "parsed_tdt", "finer"],
    // attributes: attrlist.sinebrychoff,
    struct_attributes: sattrlist.sinebrychoff
};


/* TOPLING SUOMI */
/*
settings.corpora.topling_fi_test = {
    id: "topling_fi_test",
    title: "TOPLING (suomi, debug)",
    description: "TOPLING (suomi, debug)",
    context: settings.spContext,
    within: settings.spWithin,
    attributes: attrlist.topling,
    struct_attributes: sattrlist.topling
    };*/

settings.corpora.topling_fi = {
    id: "topling_fi",
    title: "Topling (suomi)",
    description: "Topling – Toisen kielen oppimisen polut, suomenkielinen osakorpus",
    urn: "urn:nbn:fi:lb-2016112902",
    metadata_urn: "urn:nbn:fi:lb-2016111802",
    lbr_id: "urn:nbn:fi:lb-20140730168",
    licence: {
	name: "CLARIN RES +NC +DEP 1.0",
	urn: "urn:nbn:fi:lb-2016112305"
    },
    homepage_url: "https://www.jyu.fi/topling",
    cite_id: "topling-fi",
    limited_access: true,
    licence_type: "RES",
    features: ["paragraphs", "parsed_tdt", "finer"],
    attributes: attrlist.topling,
    struct_attributes: sattrlist.topling
};


// CEAL

sattrlist.ceal_common = {
    text_title: {
	label: "work_title",
	displayType: "select",
	localize: false,
	opts: settings.liteOptions,
	dataset: [
	    "Ylpeys ja ennakkoluulo",
	    "Kolea talo",
	    "Washingtonin aukio",
	],
    },
    text_year: sattrs.year,
    text_author: {
	label: "author",
	displayType: "select",
	localize: false,
	opts: settings.liteOptions,
	dataset: [
	    "Jane Austen",
	    "Charles Dickens",
	    "Henry James",
	],
    },
    text_translator: {
	label: "text_translator",
	// All the works in CEAL have been translated by Kersti Juva,
	// so having the translator as a search criterion would make
	// little sense. How about statistics and comparison?
	hideExtended: true,
	// hideStatistics: true,
	// hideCompare: true,
    },
};

var ceal_work_list = "Korpus sisältää seuraavat Kersti Juvan kääntämät teokset:<ul><li>Jane Austen: Ylpeys ja ennakkoluulo (Teos 2013) (Pride and Prejudice)</li><li>Charles Dickens: Kolea talo (Otava 2003) (Bleak House)</li><li>Henry James: Washingtonin aukio (Tammi 2006) (Washington Square)</li>";

settings.corpora.ceal_o = {
    title: "CEAL-o",
    description: "Englantilaisen ja amerikkalaisen kirjallisuuden klassikoita suomeksi, kappaleet alkuperäisessä järjestyksessä<br/>CEAL-o: Classics of English and American Literature in Finnish, paragraphs in the original order<br/><br/>" + ceal_work_list,
    id: "ceal_o",
    urn: "urn:nbn:fi:lb-2018011201",
    metadata_urn: "urn:nbn:fi:lb-2017011302",
    licence: {
	name: "CLARIN RES +NC 1.0",
	urn: "urn:nbn:fi:lb-2017011306",
    },
    cite_id: "ceal-o",
    limited_access: true,
    licence_type: "RES",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: $.extend(
	{}, sattrlist.ceal_common,
	{
	    part_num: sattrs.part_num,
	    chapter_num: sattrs.chapter_num,
	}),
};

settings.corpora.ceal_s = {
    title: "CEAL-s",
    description: "Englantilaisen ja amerikkalaisen kirjallisuuden klassikoita suomeksi, sekoitetut kappaleet<br/>CEAL-s: Classics of English and American Literature in Finnish, scrambled paragraphs<br/><br/>" + ceal_work_list,
    id: "ceal_s",
    urn: "urn:nbn:fi:lb-2018011202",
    metadata_urn: "urn:nbn:fi:lb-2017011303",
    licence: {
	name: "CLARIN ACA +AFFIL=EDU +NC 1.0",
	urn: "urn:nbn:fi:lb-2017011308",
    },
    cite_id: "ceal-s",
    limited_access: true,
    licence_type: "ACA",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: sattrlist.ceal_common,
};

delete ceal_work_list;

attrlist.kaannossuomi = {
    ref: attrs.ref,
    lemma: attrs.baseform,
    lemmacomp: attrs.baseform_compound,
    pos: attrs.pos_ud2_fi,
    msd: attrs.msd,
    dephead: attrs.dephead,
    deprel: attrs.deprel_tdt,
    spaces: { label: "", displayType: "hidden" },
    initid: { label: "", displayType: "hidden" },
};

sattrlist.kaannossuomi = {
    text_author: { label: "text_author" },
    text_title: { label: "text_title" },
    text_year: { label: "year" },
    text_orig_lang: {
	label: "origlang",
	displayType: "select",
	opts: settings.liteOptions,
	translationKey: "kaannossuomi_",
	dataset: [
	    "fin",
	    "eng",
	    "rus",
	    "ger",
	    "fre",
	    "est",
	    "swe",
	    "spa",
	    "nor",
	    "hun",
	    "dut",
	]
    },
    text_genre: {
	label: "text_genre",
	displayType: "select",
	opts: settings.liteOptions,
	translationKey: "kaannossuomi_",
	dataset: [
	    "academic",
	    "biography",
	    "crime_fiction",
	    "fiction",
	    "popular_fiction",
	    "popular_science",
	    "childrens_literature",
	    "kauno",
	]
    },
    text_filename: { label: "file_name" },
};

settings.corpora.alkusuomi = {
    title: "Käännössuomen korpus - alkusuomi",
    description: "Eri kielistä käännettyä kieltä",
    lang: "fin",
    id: "alkusuomi",
    //urn: "",
    metadata_urn: "urn:nbn:fi:lb-2019100801",
    /*licence: {
	name: "",
	urn: "",
    },
    cite_id: "",*/
    limited_access: true,
    licence_type: "RES",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.kaannossuomi,
    struct_attributes: sattrlist.kaannossuomi,
};

settings.corpora.kaannossuomi = {
    title: "Käännössuomen korpus - käännössuomi",
    description: "Aluperin suomeksi kirjoitettua kieltä",
    lang: "fin",
    id: "kaannossuomi",
    //urn: "",
    metadata_urn: "urn:nbn:fi:lb-2019100801",
    /*licence: {
	name: "",
	urn: "",
    },
    cite_id: "",*/
    limited_access: true,
    licence_type: "RES",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: attrlist.kaannossuomi,
    struct_attributes: sattrlist.kaannossuomi,
};

settings.corpora.arkisyn = {
    title: "Arkisyn",
    description: "Arkisyn",
    id: "arkisyn",
    urn: "urn:nbn:fi:lb-2017022702",
    metadata_urn: "urn:nbn:fi:lb-2017022801",
    licence: settings.licenceinfo.CC_BY_ND,
    cite_id: "ArkiSyn-korp",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
        lemma: attrs.baseform,
        pos: attrs.pos_las2,
        fun: attrs.func_la,
        mrp: attrs.msd,
        origword: attrs.origword
    },
    struct_attributes: {
        text_filename: {
            label: "file_name",
        },
    }
};

settings.corpora.iijoki = {
    id: "iijoki",
    cite_id: "iijoki-korp",
    urn: "urn:nbn:fi:lb-2019102102",
    metadata_urn: "urn:nbn:fi:lb-2019102101",
    lang: "fin",
    title: "Kalle Päätalon Iijoki-sarja",
    description: "Iijoki, Oulun yliopiston Päätalo-kokoelma, Kielipankki Korp -versio<br/><br/>Kalle Päätalon Iijoki-sarja sisältää yhteensä 26 kirjaa.<br/>Aineisto on jäsennetty Turku Neural Parser Pipeline (TNPP) -jäsentimellä.<br/><strong>Huomaa</strong>, että aineisto sisältää murresanoja, joiden perusmuotoistamiseen jäsennysmenetelmillä ei ole luotettavia keinoja.",
    limited_access: true,
    licence_type: "ACA",
    licence: {
	name: "CLARIN ACA +NC +DEP 1.0",
	urn: "urn:nbn:fi:lb-2019102106"
    },
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.ud2_fi,
    struct_attributes: {
        text_title: { label: "work_title", order: 3 },
	text_year: { label: "text_year", order: 2 },
	text_filename: { label: "file_name", order: 1 },
    }
};


// Generate a declaration for a custom structural attribute showing in
// hh:mm:ss.xxx format the milliseconds value of an actual structural
// attribute.
// Arguments:
// - label: the localization label for the custom attribute
// - base_attr: the id of the structural attribute with a milliseconds
//   value
settings.fn.make_hms_custom_attr = function (label, base_attr) {
    return {
        customType: "struct",
        label: label,
        order: 6,
        renderItem: function (key, value, attrs, wordData, sentenceData,
                              tokens) {
            // console.log(base_attr + "_hms", key, value, attrs, wordData,
	    // 		sentenceData, tokens);
            return settings.fn.ms_to_hms(sentenceData[base_attr]);
        }
    };
};


settings.corpora.eduskunta = {
    title: "Eduskunnan täysistunnot",
    description: "Eduskunnan täysistunnot, Kielipankin Korp-versio 1.5<br/><br/>Aineisto sisältää 10.9.2008–1.7.2016 pidettyjen eduskunnan täysistuntojen videotallenteista tehdyt transkriptiot.<br/>Hakutuloksissa kustakin puhunnoksesta on linkki vastaavaan kohtaan alkuperäisessä videossa (muutamia poikkeuksia lukuun ottamatta). Osa aineistosta on tarjolla myös <a href=\"https://lat.csc.fi\" target=\"_blank\">Kielipankin LAT-palvelussa</a>, jolloin hakutuloksissa on linkki myös istunnon LAT-versioon.<br/><br/>Huomaa, että kohdistetussa pöytäkirjaversiossa esiintyy virheitä ja siihen on lisätty ylimääräisiä merkkauksia automaattisen tunnistusprosessin yhteydessä. Ne äänitteen kohdat, joille ei ole automaattisessa kohdistuksessa löytynyt hyvää vastinetta pöytäkirjan tekstistä, on tunnistettu kokonaan automaattisesti, joten tällaisissa kohdissa saattaa olla kummallista tai virheellistä sisältöä.<br/>Teksti on jäsennetty suomen kielen jäsentimellä, joten alkuperäisten pöytäkirjojen ruotsinkieliset kohdat on yleensä merkitty sanaluokaltaan vierassanoiksi.",
    id: "eduskunta",
    urn: "urn:nbn:fi:lb-2019112221",
    metadata_urn: "urn:nbn:fi:lb-2019101621",
    licence: [
	{
	    subtype: "text",
	    name: "CLARIN PUB +BY +PRIV 1.0",
	    description: "CLARIN PUB loppukäyttäjän lisenssisopimus +BY +PRIV 1.0",
	    urn: "urn:nbn:fi:lb-2019112821",
	},
	{
	    subtype: "audiovideo",
	    name: "CLARIN PUB +BY +PRIV +ND +OTHER 1.0",
	    description: "CLARIN PUB loppukäyttäjän lisenssisopimus +BY +PRIV +ND +OTHER 1.0",
	    urn: "urn:nbn:fi:lb-2019112621",
	},
    ],
    cite_id: "eduskunta-v1.5-korp",
    homepage: {
	urn: "http://urn.fi/urn:nbn:fi:lb-2019111922",
	name: "Eduskunnan täysistuntojen verkkolähetysten tallenteet",
	description: "META-SHARE-kuvailutietosivu, josta linkki eduskunnan täysistuntojen verkkolähetysten tallenteisiin",
	no_label: true,
    },
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: {
        text_filename: {
            label: "file_name",
        },
        text_date: {
	    label: "publication_date_2",
	},
        text_time: {
	    label: "publication_time",
	},
	text_session_duration: {
	    label: "session_duration_ms",
	},
        text_original_video : {
	    label : "original_video",
	    type : "url",
	    url_opts: {
		hide_url: true,
		new_window: true,
	    },
	},
	text_original_transcript : {
	    label : "original_transcript",
	    type : "url",
	    url_opts: {
		hide_url: true,
		new_window: true,
	    },
	},
        paragraph_speaker: {
            label: "speaker_name"
        },
	paragraph_speaker_parl_group: {
            label: "speaker_parl_group",
	    displayType: "select",
	    opts: settings.liteOptions,
	    translationKey: "parlgroup_",
	    dataset: [
		"kd",
		"kesk",
		"kok",
		"m11",
		"ps",
		"r",
		"sd",
		"vas",
		"vihr",
		"vr",
		""
	    ]
        },
	paragraph_speaker_role: {
	    label: "speakerrole",
	    displayType: "select",
	    opts: settings.liteOptions,
	    translationKey: "speakerrole_",
	    dataset: [
		"puhemies",
		"ensimmainen_varapuhemies",
		"toinen_varapuhemies",
		"paaministeri",
		"valtiovarainministeri",
		"elinkeinoministeri",
		"peruspalveluministeri",
		"sosiaali_ja_terveysministeri",
		"oikeusministeri",
		"tyoministeri",
		"ulkoasiainministeri",
		"maa_ja_metsatalousministeri",
		"opetusministeri",
		"puolustusministeri",
		"hallinto_ja_kuntaministeri",
		"ymparistoministeri",
		"liikenneministeri",
		"sisaasiainministeri",
		"sisaministeri",
		"oikeus_ja_tyoministeri",
		"kehitysministeri",
		"puhuja",
		"asunto_ja_viestintaministeri",
		"perhe_ja_peruspalveluministeri",
		"kulttuuri_ja_urheiluministeri",
		"opetus_ja_kulttuuriministeri",
		"viestintaministeri",
		"opetus_ja_viestintaministeri",
		"maatalous_ja_ymparistoministeri",
		"maahanmuutto_ja_eurooppaministeri",
		"ulkomaankauppa_ja_kehitysministeri",
		"asuntoministeri",
		"liikenne_ja_viestintaministeri",
		"liikenne_ja_kuntaministeri",
		"eurooppa_ja_ulkomaankauppaministeri",
		"kulttuuri_ja_asuntoministeri",
		"kunta_ja_uudistusministeri",
		"eduskunnan_oikeusasiamies",
		"ikapuhemies",
		"valtioneuvoston_oikeuskansleri",
		"varajasen",
		"valtioneuvoston_apulaisoikeuskansleri",
		""
	    ]
	},
	paragraph_speech_type: {
            label: "speech_type",
	    displayType: "select",
	    opts: settings.liteOptions,
	    translationKey: "speechtype_",
	    dataset: [
		"ryhmapuheenvuoro",
		"esittelypuheenvuoro",
		"vastauspuheenvuoro",
		"koputtaa",
		""
	    ]
        },
	paragraph_participant: {
	    label: "speaker"
	},
	utterance_id: {
	    label: "utterance_num",
	},
	utterance_begin_time: {
	    label: "utterance_begin_time_ms",
	},
	utterance_end_time: {
	    label: "utterance_end_time_ms",
	},
	utterance_duration: {
	    label: "utterance_duration_ms"
	},
	// The valid_video_times attribute needs to be retrieved, as
	// it is used to determine if the video page link is shown.
	utterance_valid_video_times: sattrs.hidden,
	utterance_videopage_link: {
	    label: "show_video",
	    type: "url",
	    url_opts: sattrs.link_url_opts,
	    synthetic: true,
	    order: 50,
	    stringify_synthetic: function (token_data) {
		if (token_data.struct_attrs.utterance_valid_video_times
		    == "no") {
		    return undefined;
		} else {
		    return settings.fn.make_videopage_url(
			"eduskunta",
			token_data,
			token_data.struct_attrs.text_original_video
			// Temporary fix for ä's missing from URL
			// attribute values; this is probably not
			// needed any more, but it does not hurt,
			// either.
			    .replace(/Kevt/, "Kevät")
			    .replace(/keskuu/, "kesäkuu")
			    .replace(/heinkuu/, "heinäkuu"),
			[],
			["utterance_videopage_link",
			 "utterance_annex_link",
			 "utterance_annex_link_synth",]);
		}
	    },
	},
	// Kludge to get the LAT/Annex link after the other video
	// link, as synthetic attributes are currently shown after
	// non-synthetic ones.
	utterance_annex_link: sattrs.hidden,
	utterance_annex_link_synth: $.extend(
	    {}, sattrs.link_show_video_annex,
	    {
		synthetic: true,
		order: 40,
		stringify_synthetic: function (token_data) {
		    return token_data.struct_attrs.utterance_annex_link;
		},
	    }),
    },
    custom_attributes: {
	text_session_duration: settings.fn.make_hms_custom_attr(
	    "session_duration", "text_session_duration"),
	utterance_begin_time_hms: settings.fn.make_hms_custom_attr(
	    "utterance_begin_time", "utterance_begin_time"),
	utterance_end_time_hms: settings.fn.make_hms_custom_attr(
	    "utterance_end_time", "utterance_end_time"),
	utterance_duration_hms: settings.fn.make_hms_custom_attr(
	    "utterance_duration", "utterance_duration"),
    },
};

// Support "eduskunta_test" as an alias
settings.corpus_aliases["eduskunta_test"] = "eduskunta";


settings.corpus_aliases["topling-fi"] = "topling_fi";


/* DMA – Digitaalinen muoto-opin arkisto (Digital Morphology Archives) */

// Return a stringify function for a dataset attribute attrname in the
// DMA corpus. The stringify function returns the value as mapped
// through the dataset, without localization.
settings.fn.dma_stringify_dataset_value = function (attrname) {
    return function (value) {
	return settings.corpora.dma.struct_attributes[attrname].dataset[value];
    };
};

settings.corpora.dma = {
    title: "DMA – Digitaalinen muoto-opin arkisto",
    description: "DMA – Digitaalinen muoto-opin arkisto<br/><a href='https://www.kielipankki.fi/tuki/korp-dma/' target='_blank'>Ohjeita DMA:n käyttämiseen Korpissa</a>, erityisesti verrattuna vanhaan CSC:n Tutkijan käyttöliittymän DMA:han<br/><strong>Huomaa</strong>, että vaikka aineiston tekstiosa on kaikkien käytettävisssä, PDF-muotoisten sanalippujen katseleminen edellyttää Kielipankin oikeudet -sovelluksen kautta haettua <a href='https://lbr.csc.fi/web/guest/catalogue?domain=LBR&resource=urn:nbn:fi:lb-201403261&target=application' target='_blank'>DMA:n käyttölupaa</a>.",
    id: "dma",
    urn: "urn:nbn:fi:lb-2016032102",
    metadata_urn: "urn:nbn:fi:lb-201403261",
    homepage_url: "http://www.helsinki.fi/fus/research/ma.html",
    // TODO (util.coffee): Allow an array of values for licence.
    licence: {
	name: "CC BY 4.0 (teksti) / CLARIN RES +PRIV +ND (PDF-sanaliput)",
	urn: "urn:nbn:fi:lb-2016042202",
    },
    cite_id: "dma",
    within: settings.defaultWithin,
    context: settings.defaultContext,
    attributes: {
	searchword: {
	    label: "search_word",
	    opts: settings.defaultOptions,
	}
    },
    struct_attributes: {
	text_dialect_region: {
	    label: "dialect_region",
	    displayType: "select",
	    localize: false,
	    // The values of the dataset are shown for the keys
	    // without localization.
	    stringify: settings.fn.dma_stringify_dataset_value(
		"text_dialect_region"),
	    dataset: {
		"1": "1 Lounaismurteet",
		"2": "2 Lounaiset välimurteet",
		"3": "3 Hämäläismurteet",
		"4": "4 Etelä-Pohjanmaan murteet",
		"5": "5 Keski- ja Pohjois-Pohjanmaan murteet",
		"6": "6 Peräpohjolan murteet",
		"7": "7 Savolaismurteet",
		"8": "8 Kaakkoismurteet",
	    },
	    opts: settings.liteOptions,
	},
	text_dialect_group: {
            label: "dialect_group",
	    displayType: "select",
	    localize: false,
	    stringify: function (value) {
		return (settings.corpora.dma.struct_attributes
			.text_dialect_group.dataset[value]
			.replace(/[\x00-\x1F ]+/g, ""));
	    },
	    dataset: {
		// The control characters \x01–\x08 are used to get
		// the desired sorting order. They are invisible in
		// the output, but could they cause problems in some
		// cases?
		// FIXME: Yes: the control characters seem to be shown
		// as symbols in the extended search selection list in
		// Chromium on Linux, even though they are invisible
		// in Firefox on Linux.
		"[1-6].?": "\x011–6 Länsimurteet",
		"1.": "\x01  1 Lounaismurteet",
		"1a": "\x01    1a pohjoisryhmä",
		"1b": "\x01    1b itäryhmä",
		"2.": "\x02  2 Lounaiset välimurteet",
		"2a": "\x02    2a Porin seudun murteet",
		"2b": "\x02    2b Ala-Satakunnan murteet",
		"2c": "\x02    2c Turun ylämaan murteet",
		"2d": "\x02    2d Someron murre",
		"2e": "\x02    2e Länsi-Uudenmaan murteet",
		"3.": "\x03  3 Hämäläismurteet",
		"3a": "\x03    3a Ylä-Satakunnan murteet",
		"3b": "\x03    3b perihämäläiset murteet",
		"3c": "\x03    3c etelähämäläiset murteet",
		"3[d-f]": "\x03    3d–f kaakkoishämäläiset murteet",
		"3d": "\x03      3d Hollolan ryhmä",
		"3e": "\x03      3e Porvoon ryhmä",
		"3f": "\x03      3f Kymenlaakson ryhmä",
		"4": "\x04  4 Etelä-Pohjanmaan murteet",
		"5.": "\x05  5 Keski- ja Pohjois-Pohjanmaan murteet",
		"5a": "\x05    5a Keski-Pohjanmaan murteet",
		"5b": "\x05    5b Pohjois-Pohjanmaan murteet",
		"6.": "\x06  6 Peräpohjolan murteet",
		"6a": "\x06    6a Tornion murre",
		"6b": "\x06    6b Jällivaaran murre",
		"6c": "\x06    6c Kemin murre",
		"6d": "\x06    6d Kemijärven murre",
		"6e": "\x06    6e Ruijan murre",
		"[7-8].": "\x077–8 Itämurteet",
		"7.": "\x07  7 Savolaismurteet",
		"7a": "\x07    7a Päijät-Hämeen murteet",
		"7b": "\x07    7b Etelä-Savon murteet",
		"7c": "\x07    7c Säämingin–Kerimäen ryhmä",
		"7d": "\x07    7d itäiset savolaismurteet",
		"7e": "\x07    7e Pohjois-Savon murteet",
		"7f": "\x07    7f Keski-Suomen murteet",
		"7g": "\x07    7g savolaiskiilan murteet",
		"7h": "\x07    7h Kainuun murteet",
		"7i": "\x07    7i Vermlannin murteet",
		"8.": "\x08  8 Kaakkoismurteet",
		"8[a–b]": "\x08    \x018a–b varsinaiset kaakkoismurteet",
		"8a": "\x08    \x01  8a Länsi-Kannaksen murteet",
		"8b": "\x08    \x01  8b Itä-Kannaksen murteet",
		"8c": "\x08    8c Inkerin suomalaismurteet",
		"8d": "\x08    8d Lemin murre",
		"8e": "\x08    8e Sortavalan seudun murteet",
	    },
	    opts: settings.liteOptions,
	},
	text_parish_name: {
            label: "parish",
	    displayType: "select",
	    localize: false,
	    // translationKey: "",
	    dataset: [
		"Artjärvi",
		"Asikkala",
		"Askola",
		"Eurajoki",
		"Haapavesi",
		"Halikko",
		"Halsua",
		"Hausjärvi",
		"Heinjoki",
		"Heinävesi",
		"Himanka",
		"Hinnerjoki",
		"Hirvensalmi",
		"Honkajoki",
		"Honkilahti",
		"Ilmajoki",
		"Ilomantsi",
		"Isojoki",
		"Itä-Ruija",
		"Jalasjärvi",
		"Joutsa",
		"Joutseno",
		"Juupajoki",
		"Jällivaara",
		"Järvisaari",
		"Kaarina",
		"Kajaani",
		"Kalajoki",
		"Kalvola",
		"Kangasala",
		"Kankaanpää",
		"Kannonkoski",
		"Karstula",
		"Karttula",
		"Kauhava",
		"Kaustinen",
		"Kemijärvi",
		"Keminmlk",
		"Kerimäki",
		"Kesälahti",
		"Keuruu",
		"Kiikka",
		"Kitee",
		"Kittilä",
		"Kiuruvesi",
		"Kivennapa",
		"Koivisto",
		"Kolari",
		"Kontiolahti",
		"Korpilahti",
		"Kuhmoinen",
		"Kuivaniemi",
		"Kurikka",
		"Kuru",
		"Kymi",
		"Käkisalmi",
		"Kälviä",
		"Kärsämäki",
		"Laihia",
		"Laitila",
		"Lapinlahti",
		"Lappajärvi",
		"Lappee",
		"Laukaa",
		"Lavansaari",
		"Lemi",
		"Leppävirta",
		"Liperi",
		"Loimaa",
		"Luhanka",
		"Lumivaara",
		"Luumäki",
		"Markkova",
		"Masku",
		"Merikarvia",
		"Merimasku",
		"Miehikkälä",
		"Mietoinen",
		"Mikkelinmlk",
		"Myrskylä",
		"Mäntyharju",
		"Nivala",
		"Nousiainen",
		"Nummi",
		"Nurmes",
		"Orimattila",
		"Oulujoki",
		"Paavola",
		"Parkano",
		"Pattijoki",
		"Perho",
		"Pieksämäki",
		"Pielisjärvi",
		"Pihtipudas",
		"Polvijärvi",
		"Pori",
		"Pornainen",
		"Pudasjärvi",
		"Pyhäjoki",
		"Pyhäjärvi Ol.",
		"Pöytyä",
		"Raisi",
		"Rauma",
		"Rautio",
		"Reisjärvi",
		"Ristiina",
		"Ruokolahti",
		"Ruovesi",
		"Rymättylä",
		"Saarijärvi",
		"Salla",
		"Sauvo",
		"Savitaipale",
		"Siilinjärvi",
		"Simo",
		"Sodankylä",
		"Somero",
		"Sonkajärvi",
		"Sortavala",
		"Sumiainen",
		"Suomusjärvi",
		"Suomussalmi",
		"Sysmä",
		"Sääksmäki",
		"Sääminki",
		"Taivassalo",
		"Tammela",
		"Teisko",
		"Tuulos",
		"Tuusniemi",
		"Tuutari",
		"Töysä",
		"Uukuniemi",
		"Uurainen",
		"Uusikirkko Vpl.",
		"Valkeala",
		"Vehkalahti",
		"Vehmersalmi",
		"Vermlanti",
		"Vesanto",
		"Veteli",
		"Vihti",
		"Viipurin mlk.",
		"Virolahti",
		"Virrat",
		"Vähäkyrö",
		"Yli-Ii",
		"Ylihärmä",
		"Ylitornio",
		"Ypäjä",
		"Ähtäri",
	    ],
	    // // An alternative with dialect group code preprended
	    // stringify: settings.fn.dma_stringify_dataset_value(
	    // 	"text_parish_name"),
	    // dataset: {
	    // 	"Eurajoki": "1a Eurajoki",
	    // 	"Hinnerjoki": "1a Hinnerjoki",
	    // 	"Honkilahti": "1a Honkilahti",
	    // 	"Laitila": "1a Laitila",
	    // 	"Masku": "1a Masku",
	    // 	"Merimasku": "1a Merimasku",
	    // 	"Mietoinen": "1a Mietoinen",
	    // 	"Nousiainen": "1a Nousiainen",
	    // 	"Rauma": "1a Rauma",
	    // 	"Rymättylä": "1a Rymättylä",
	    // 	"Taivassalo": "1a Taivassalo",
	    // 	"Halikko": "1b Halikko",
	    // 	"Kaarina": "1b Kaarina",
	    // 	"Sauvo": "1b Sauvo",
	    // 	"Suomusjärvi": "1b Suomusjärvi",
	    // 	"Merikarvia": "2a Merikarvia",
	    // 	"Pori": "2a Pori",
	    // 	"Loimaa": "2b Loimaa",
	    // 	"Pöytyä": "2c Pöytyä",
	    // 	"Somero": "2d Somero",
	    // 	"Nummi": "2e Nummi",
	    // 	"Vihti": "2e Vihti",
	    // 	"Honkajoki": "3a Honkajoki",
	    // 	"Kankaanpää": "3a Kankaanpää",
	    // 	"Kiikka": "3a Kiikka",
	    // 	"Parkano": "3a Parkano",
	    // 	"Virrat": "3a Virrat",
	    // 	"Juupajoki": "3b Juupajoki",
	    // 	"Kalvola": "3b Kalvola",
	    // 	"Kangasala": "3b Kangasala",
	    // 	"Kuru": "3b Kuru",
	    // 	"Ruovesi": "3b Ruovesi",
	    // 	"Sääksmäki": "3b Sääksmäki",
	    // 	"Teisko": "3b Teisko",
	    // 	"Tuulos": "3b Tuulos",
	    // 	"Hausjärvi": "3c Hausjärvi",
	    // 	"Tammela": "3c Tammela",
	    // 	"Ypäjä": "3c Ypäjä",
	    // 	"Asikkala": "3d Asikkala",
	    // 	"Orimattila": "3d Orimattila",
	    // 	"Askola": "3e Askola",
	    // 	"Myrskylä": "3e Myrskylä",
	    // 	"Pornainen": "3e Pornainen",
	    // 	"Artjärvi": "3f Artjärvi",
	    // 	"Kymi": "3f Kymi",
	    // 	"Valkeala": "3f Valkeala",
	    // 	"Vehkalahti": "3f Vehkalahti",
	    // 	"Ilmajoki": "4 Ilmajoki",
	    // 	"Isojoki": "4 Isojoki",
	    // 	"Jalasjärvi": "4 Jalasjärvi",
	    // 	"Kauhava": "4 Kauhava",
	    // 	"Kurikka": "4 Kurikka",
	    // 	"Laihia": "4 Laihia",
	    // 	"Töysä": "4 Töysä",
	    // 	"Vähäkyrö": "4 Vähäkyrö",
	    // 	"Ylihärmä": "4 Ylihärmä",
	    // 	"Haapavesi": "5a Haapavesi",
	    // 	"Halsua": "5a Halsua",
	    // 	"Himanka": "5a Himanka",
	    // 	"Kalajoki": "5a Kalajoki",
	    // 	"Kälviä": "5a Kälviä",
	    // 	"Kärsämäki": "5a Kärsämäki",
	    // 	"Kaustinen": "5a Kaustinen",
	    // 	"Nivala": "5a Nivala",
	    // 	"Perho": "5a Perho",
	    // 	"Pyhäjoki": "5a Pyhäjoki",
	    // 	"Rautio": "5a Rautio",
	    // 	"Reisjärvi": "5a Reisjärvi",
	    // 	"Veteli": "5a Veteli",
	    // 	"Kuivaniemi": "5b Kuivaniemi",
	    // 	"Oulujoki": "5b Oulujoki",
	    // 	"Paavola": "5b Paavola",
	    // 	"Pattijoki": "5b Pattijoki",
	    // 	"Yli-Ii": "5b Yli-Ii",
	    // 	"Kolari": "6a Kolari",
	    // 	"Ylitornio": "6a Ylitornio",
	    // 	"Jällivaara": "6b Jällivaara",
	    // 	"Keminmlk": "6c Keminmlk",
	    // 	"Kittilä": "6c Kittilä",
	    // 	"Simo": "6c Simo",
	    // 	"Sodankylä": "6c Sodankylä",
	    // 	"Kemijärvi": "6d Kemijärvi",
	    // 	"Salla": "6d Salla",
	    // 	"Itä-Ruija": "6e Itä-Ruija",
	    // 	"Raisi": "6e Raisi",
	    // 	"Joutsa": "7a Joutsa",
	    // 	"Korpilahti": "7a Korpilahti",
	    // 	"Kuhmoinen": "7a Kuhmoinen",
	    // 	"Luhanka": "7a Luhanka",
	    // 	"Sysmä": "7a Sysmä",
	    // 	"Hirvensalmi": "7b Hirvensalmi",
	    // 	"Mäntyharju": "7b Mäntyharju",
	    // 	"Mikkelinmlk": "7b Mikkelinmlk",
	    // 	"Ristiina": "7b Ristiina",
	    // 	"Kerimäki": "7c Kerimäki",
	    // 	"Sääminki": "7c Sääminki",
	    // 	"Ilomantsi": "7d Ilomantsi",
	    // 	"Kesälahti": "7d Kesälahti",
	    // 	"Kitee": "7d Kitee",
	    // 	"Kontiolahti": "7d Kontiolahti",
	    // 	"Liperi": "7d Liperi",
	    // 	"Nurmes": "7d Nurmes",
	    // 	"Pielisjärvi": "7d Pielisjärvi",
	    // 	"Polvijärvi": "7d Polvijärvi",
	    // 	"Heinävesi": "7e Heinävesi",
	    // 	"Karttula": "7e Karttula",
	    // 	"Kiuruvesi": "7e Kiuruvesi",
	    // 	"Lapinlahti": "7e Lapinlahti",
	    // 	"Leppävirta": "7e Leppävirta",
	    // 	"Pieksämäki": "7e Pieksämäki",
	    // 	"Pyhäjärvi Ol.": "7e Pyhäjärvi Ol.",
	    // 	"Siilinjärvi": "7e Siilinjärvi",
	    // 	"Sonkajärvi": "7e Sonkajärvi",
	    // 	"Tuusniemi": "7e Tuusniemi",
	    // 	"Vehmersalmi": "7e Vehmersalmi",
	    // 	"Vesanto": "7e Vesanto",
	    // 	"Kannonkoski": "7f Kannonkoski",
	    // 	"Karstula": "7f Karstula",
	    // 	"Laukaa": "7f Laukaa",
	    // 	"Pihtipudas": "7f Pihtipudas",
	    // 	"Saarijärvi": "7f Saarijärvi",
	    // 	"Sumiainen": "7f Sumiainen",
	    // 	"Uurainen": "7f Uurainen",
	    // 	"Ähtäri": "7g Ähtäri",
	    // 	"Keuruu": "7g Keuruu",
	    // 	"Lappajärvi": "7g Lappajärvi",
	    // 	"Kajaani": "7h Kajaani",
	    // 	"Pudasjärvi": "7h Pudasjärvi",
	    // 	"Suomussalmi": "7h Suomussalmi",
	    // 	"Vermlanti": "7i Vermlanti",
	    // 	"Heinjoki": "8a Heinjoki",
	    // 	"Kivennapa": "8a Kivennapa",
	    // 	"Koivisto": "8a Koivisto",
	    // 	"Lappee": "8a Lappee",
	    // 	"Lavansaari": "8a Lavansaari",
	    // 	"Luumäki": "8a Luumäki",
	    // 	"Miehikkälä": "8a Miehikkälä",
	    // 	"Uusikirkko Vpl.": "8a Uusikirkko Vpl.",
	    // 	"Viipurin mlk.": "8a Viipurin mlk.",
	    // 	"Virolahti": "8a Virolahti",
	    // 	"Joutseno": "8b Joutseno",
	    // 	"Käkisalmi": "8b Käkisalmi",
	    // 	"Lumivaara": "8b Lumivaara",
	    // 	"Ruokolahti": "8b Ruokolahti",
	    // 	"Järvisaari": "8c Järvisaari",
	    // 	"Markkova": "8c Markkova",
	    // 	"Tuutari": "8c Tuutari",
	    // 	"Lemi": "8d Lemi",
	    // 	"Savitaipale": "8d Savitaipale",
	    // 	"Sortavala": "8e Sortavala",
	    // 	"Uukuniemi": "8e Uukuniemi",
	    // },
	    opts: settings.liteOptions,
	},
	text_village: {
	    label: "village",
	},
	text_parish: {
	    // Should we have this separately? The attribute parish
	    // contains the parish name with the dialect group code
	    // prepended. Or should "parish_name" actually be simply
	    // "parish"?
	    label: "parish",
	    displayType: "hidden",
	},
	sentence_comment: {
            label: "comment",
	},
	sentence_informant: {
	    label: "informant",
	},
	sentence_informant_sex: {
	    label: "informant_sex",
	    displayType: "select",
	    translationKey: "",
	    dataset: {
		"m": "male",
		"n": "female",
		"": "unknown"
	    },
	    opts: settings.liteOptions,
	},
	sentence_informant_birthyear: {
            label: "informant_birthyear",
	},
	sentence_signum: {
	    label: "signum",
	    type: "set",
	    opts: settings.setOptions,
	    // This URL is in the sidebar (i) link
	    taginfo_url: "markup/dma_signumlist.html",
	    // The input field also has an (i) link opening a list of
	    // signums as links from which one can select. This has
	    // been copied and modified from the code for the the
	    // Swedish msd attribute.
	    extended_template: '<input class="arg_value" ng-model="model">' +
		'<span ng-click="onIconClick()" class="fa fa-info-circle"></span>',
	    controller: function($scope, $uibModal) {
		var modal = null;
		$scope.onIconClick = function() {
		    modal = $uibModal.open({
			template: '<div>' +
			    '<div class="modal-header">' +
			    '<h3 class="modal-title">{{\'signum_long\' | loc:lang}}</h3>' +
			    '<span ng-click="clickX()" class="close-x">×</span>' +
			    '</div>' +
			    '<div class="modal-body" ng-click="handleClick($event)" ng-include="\'markup/dma_signumlist_links.html\'" style="font-size: 80%;"></div>' +
			    '</div>',
			scope: $scope
		    })
		}
		$scope.clickX = function(event) {
		    modal.close()
		}
		$scope.handleClick = function(event) {
		    val = $(event.target).parents("td").data("value");
		    // c.log ("signum selected:", val);
		    if(!val) return;
		    $scope.model = val;
		    // c.log ("signum updated $scope:", $scope);
		    modal.close();
		}
	    },
	},
	sentence_signumlist: {
	    label: "signum_list",
	    opts: settings.defaultOptions,
	},
	sentence_updated: {
	    displayType: "hidden",
	},
	sentence_location: {
	    label: "original_location",
	    opts: settings.defaultOptions,
	},
	sentence_text_words: {
	    label: "clause_any_wordform",
	    type: "set",
	    // This would benefit from having also other options than
	    // "is" and "is not" for a set-valued attribute, but that
	    // is not (yet) possible.
	    opts: settings.setOptions,
	    displayOnly: "search",
	},
	sentence_search_words: {
	    label: "clause_any_search_word",
	    type: "set",
	    // The same applies here as in sentence_text_words.
	    opts: settings.setOptions,
	    displayOnly: "search",
	},
	sentence_pdf: {
            label: "show_wordnote",
            opts: settings.defaultOptions,
            type: "url",
            url_opts: $.extend({}, sattrs.link_url_opts, {
                stringify_link: function (key, filename, attrs, html_attrs) {
		    if (! filename) {
			return "";
		    }
                    var fnames = filename.split(" ");
                    var output = ("<span rel='localize[" + attrs.label + "]'>"
				  + key + "</span> [RES]:");
                    for (var i = 0; i < fnames.length; i++) {
                        var fname = (fnames[i]
				     .replace(/ä/g, 'a')
				     .replace(/Ä/g, 'A')
				     .replace(/ö/g, 'o'));
                        var url = ("/dma/pdf/"
                                   + fname.slice(0, fname.lastIndexOf("_"))
                                   + "/" + fname);
                        output += ("<br/><a href='" + url + "' " + html_attrs
				   + ">" + fname + "</a>");
                    }
                    return output;
                }
            }),
	},
	sentence_id: sattrs.sentence_id,
    }
};


settings.corpora.ylilauta = {
    title: "Ylilauta",
    description: "Ylilauta",
    id: "ylilauta",
    urn: "urn:nbn:fi:lb-2015031802",
    metadata_urn: "urn:nbn:fi:lb-2015031802",
    licence: settings.licenceinfo.CC_BY_NC,
    homepage_url: "https://ylilauta.org",
    cite_id: "Ylilauta",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
	/*
	lemma: attrs.baseform,
	pos: attrs.pos_klk,
	msd: attrs.msd,
	syn: attrs.deprel_tdt*/
        lemma: attrs.baseform,
        lemmacomp: attrs.baseform_compound,
        pos: attrs.pos_klk,
        msd: attrs.msd,
        dephead: attrs.dephead,
        deprel: attrs.deprel_tdt,
        ref: attrs.ref,
        lex: attrs.lemgram_hidden,
        nertag: attrs.ner_tags
    },
    struct_attributes: {
        text_title: sattrs.text_title,
        text_date: sattrs.date,
        text_clock: sattrs.text_time,
        text_sec: {
            label: "suomi24fi_sect",
        }
    }
};

/* SUOMI 24 */

// Properties urn, metadata_urn, licence and homepage_url of
// settings.corpora.s24_??? come from
// settings.corporafolders.internet.suomi24, so they should not be
// specified in the settings of the individual subcorpora.

settings.corpora.s24_001 = {
    title: "Suomi24 2016H2: 1/10",
    description: "Suomi24-keskustelut, versio 2016H2, osa 1/10",
    id: "s24_001",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: sattrlist.s24_update
};

settings.corpora.s24_002 = {
    title: "Suomi24 2016H2: 2/10",
    description: "Suomi24-keskustelut, versio 2016H2, osa 2/10",
    id: "s24_002",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: sattrlist.s24_update
};

settings.corpora.s24_003 = {
    title: "Suomi24 2016H2: 3/10",
    description: "Suomi24-keskustelut, versio 2016H2, osa 3/10",
    id: "s24_003",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: sattrlist.s24_update
};

settings.corpora.s24_004 = {
    title: "Suomi24 2016H2: 4/10",
    description: "Suomi24-keskustelut, versio 2016H2, osa 4/10",
    id: "s24_004",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: sattrlist.s24_update
};

settings.corpora.s24_005 = {
    title: "Suomi24 2016H2: 5/10",
    description: "Suomi24-keskustelut, versio 2016H2, osa 5/10",
    id: "s24_005",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: sattrlist.s24_update
};

settings.corpora.s24_006 = {
    title: "Suomi24 2016H2: 6/10",
    description: "Suomi24-keskustelut, versio 2016H2, osa 6/10",
    id: "s24_006",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: sattrlist.s24_update
};

settings.corpora.s24_007 = {
    title: "Suomi24 2016H2: 7/10",
    description: "Suomi24-keskustelut, versio 2016H2, osa 7/10",
    id: "s24_007",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: sattrlist.s24_update
};

settings.corpora.s24_008 = {
    title: "Suomi24 2016H2: 8/10",
    description: "Suomi24-keskustelut, versio 2016H2, osa 8/10",
    id: "s24_008",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: sattrlist.s24_update
};
/*
settings.corpora.s24_009test = {
    title: "Suomi24 (test)",
    description: "Suomi24-keskustelut (test)",
    id: "s24_009test",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: attrlist.parsed_tdt,
    struct_attributes: sattrlist.s24_update
};
*/

settings.corpora.s24_009 = {
    title: "Suomi24 2016H2: 9/10",
    description: "Suomi24-keskustelut, versio 2016H2, osa 9/10",
    id: "s24_009",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: sattrlist.s24_update
};

settings.corpora.s24_010 = {
    title: "Suomi24 2016H2: 10/10",
    description: "Suomi24-keskustelut, versio 2016H2, osa 10/10",
    id: "s24_010",
    features: ["paragraphs", "parsed_tdt", "finer"],
    struct_attributes: sattrlist.s24_update
};

settings.corpus_aliases.suomi24 = "s24_0(0[1-9]|10)";
settings.corpus_aliases["suomi24-2016h2"] = "s24_0(0[1-9]|10)";
settings.corpus_aliases.suomi24_2016h2
    = settings.corpus_aliases["suomi24-2016h2"];

// Configure a short URL: preselect only the Suomi24 corpus folder
// (all its subcorpora)
settings.short_url_config.suomi24 =
    function () {
	settings.preselected_corpora = ["__internet.suomi24"];
    };


settings.corpora.s24 = {
    title: "Suomi24 2001–2014 (näyte)",
    description: "Suomi24-keskusteluja 2001–2014 (näyte).<br/>Tämä korpus sisältää osan <a href='http://keskustelu.suomi24.fi' target='_blank'>Suomi24-keskustelupalvelun</a> keskusteluista vuosilta 2001–2014; kaikki keskustelut (myös tämän korpuksen sisältämät) sisältyvät korpukseen <i>Suomi24</i>.<br/>(Tämä korpus näkyi aiemmin nimellä <i>Suomi24</i>.)",
    id: "s24",
    // URN information also in the corpus .info file; if you need to
    // update the URNs, you should also check it.
    // TODO: Update the URNs when the new URNs are available. (2015-12-01)
    // urn: "urn:nbn:fi:lb-2015040102",
    // metadata_urn: "urn:nbn:fi:lb-2015091701",
    licence: settings.licenceinfo.CC_BY_NC,
    homepage_url: "http://keskustelu.suomi24.fi",
    cite_id: "Suomi24-2001-2014-korp",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
	/*
        lemma: attrs.baseform,
        pos: attrs.pos_klk,
        msd: {
            label: "msd",
            opts: settings.defaultOptions
        },
        dep: {
            label: "dephead",
            opts: settings.defaultOptions
        },
        syn: attrs.deprel_tdt,
        unk: attrs.ner_tags*/

        lemma: attrs.baseform,
        lemmacomp: attrs.baseform_compound,
        pos: attrs.pos_klk,
        msd: attrs.msd,
        dephead: attrs.dephead,
        deprel: attrs.deprel_tdt,
        ref: attrs.ref,
        lex: attrs.lemgram_hidden,
        nertag: attrs.ner_tags
    },
    struct_attributes: {
        text_title: sattrs.text_title,
        text_date: sattrs.date,
        text_time: sattrs.text_time,
        text_sect: {
            label: "suomi24fi_sect",
        },
        text_sub: {
            label: "suomi24fi_sub",
        },
        text_user: {
            label: "suomi24fi_user",
        },
        sentence_id: sattrs.sentence_id_hidden,

        text_urlmsg: {
            label: "suomi24fi_urlmsg",
            type: "url",
            url_opts: sattrs.link_url_opts
        },
        text_urlboard: {
            label: "suomi24fi_urlboard",
            type: "url",
            url_opts: sattrs.link_url_opts
        }
    }
};


/* Suomi24 2001–2017 (previously 2017H2) */

sattrlist.s24_2018 = {
    text_title: sattrs.title,
    // text_datetime: sattrs.datetime,
    text_date: sattrs.date,
    text_time: sattrs.time,
    // text_datetime_approximated: settings.fn.make_bool_attr(
    //	"timestamp_approximated"),
    text_author: {
	label: "writer_nickname",
    },
    text_author_logged_in: settings.fn.make_bool_attr("user_logged_in"),
    text_author_nick_registered: settings.fn.make_bool_attr("registered_nick"),
    text_topic_names: {
	label: "s24_topic_full",
    },
    text_topic_name_top: {
	label: "s24_topic_main",
	displayType: "select",
	localize: false,
	dataset: [
	    "Ajanviete",
	    "Ajoneuvot ja liikenne",
	    "Harrastukset",
	    "Koti ja rakentaminen",
	    // "Kysy Mitä Vain",
	    "Lemmikit",
	    "Matkailu",
	    "Muoti ja kauneus",
	    "Nuoret",
	    "Paikkakunnat",
	    "Perhe",
	    "Ruoka ja juoma",
	    "Ryhmät",
	    "Seksi",
	    "Suhteet",
	    // "Suomi24 Blogi ★",
	    "Talous",
	    "Terveys",
	    "Tiede ja teknologia",
	    "Työ ja opiskelu",
	    "Urheilu ja kuntoilu",
	    "Viihde ja kulttuuri",
	    "Yhteiskunta",
	],
	opts: settings.liteOptions,
	hideSidebar: true,
    },
    text_topic_name_leaf: {
	label: "s24_topic_leaf",
	hideSidebar: true,
    },
    // text_topic_names_set: {
    //	label: "s24_topic_set",
    //	type: "set",
    //	opts: settings.setOptions,
    // },
    // text_topic_nums: {
    //	label: "s24_topic_nums",
    // },
    // text_topic_nums_set: {
    //	label: "s24_topic_nums_set",
    // },
    text_topic_adultonly: settings.fn.make_bool_attr("s24_topic_is_adultonly"),
    text_msg_type: {
	label: "message_type",
	displayType: "select",
	translationKey: "msgtype_",
	dataset: [
	    "thread_start",
	    "comment",
	],
	opts: settings.liteOptions,
    },
    text_empty: settings.fn.make_bool_attr("message_is_completely_empty"),
    text_id: {
	label: "text_id",
    },
    text_thread_id: {
	label: "message_thread_id",
    },
    text_thread_start_datetime: {
	label: "message_thread_start_timestamp",
    },
    text_comment_id: {
	label: "comment_id",
	pattern: "<%=settings.fn.make_explained_value(val, {'0': 'thread_start_message'})%>",
    },
    text_parent_comment_id: {
	label: "parent_comment_id",
	pattern: "<%=settings.fn.make_explained_value(val, {'0': 'thread_start_message'})%>",
    },
    text_parent_datetime: {
	label: "parent_timestamp",
    },
    text_quoted_comment_id: {
	label: "quoted_comment_id",
	pattern: "<%=settings.fn.make_explained_value(val, {'0': 'no_quotation'})%>",
    },
    text_filename_vrt: sattrs.filename,
    text_thread_link: {
	label: "show_orig_thread",
	type: "url",
	url_opts: sattrs.link_url_opts,
	synthetic: true,
	stringify_synthetic: function (token_data) {
	    return ("https://keskustelu.suomi24.fi/t/"
		    + token_data.struct_attrs.text_thread_id);
	},
    },
    text_comment_link: {
	label: "show_orig_message",
	type: "url",
	url_opts: sattrs.link_url_opts,
	synthetic: true,
	stringify_synthetic: function (token_data) {
	    var comment_id = token_data.struct_attrs.text_comment_id
	    var url = ("https://keskustelu.suomi24.fi/t/"
		       + token_data.struct_attrs.text_thread_id);
	    if (comment_id != "0") {
		url += "#comment-" + token_data.struct_attrs.text_comment_id;
	    }
	    return url;
	},
    },
    paragraph_type: {
	label: "paragraph_type",
	displayType: "select",
	translationKey: "paratype_",
	dataset: {
	    "title": "heading",
	    "body": "paragraph",
	    "empty": "empty",
	},
	opts: settings.liteOptions,
    },
    sentence_id: sattrs.sentence_id_hidden,
    sentence_polarity: {
        label: "sentence_polarity",
        displayType: "select",
        translationKey: "polarity_",
        dataset: [
            "pos",
            "neut",
            "neg",
        ],
        opts: settings.liteOptions,
    },
};

settings.templ.s24_2018 = {
    title: "",
    description: "",
    id: "",
    features: ["paragraphs", "parsed_tdt", "spaces"],
    struct_attributes: sattrlist.s24_2018,
};

settings.fn.add_corpus_settings(
    settings.templ.s24_2018,
    (function (year1, year2) {
	var result = [];
	for (var y = year1; y <= year2; y++) {
	    var ystr = y.toString();
	    result.push({
		title: "Suomi24 2001–2017: " + ystr,
		description: (
		    "Suomi24 virkkeet -korpus 2001–2017, Korp-versio 1.2: "
			+ ystr
			+ "<br/>Suomi24-keskustelujen viestit vuodelta "
			+ ystr),
		id: ystr,
	    });
	}
	return result;
    })(2001, 2017),
    settings.corporafolders.s24_2017h2,
    "s24_");

settings.fn.add_corpus_aliases(
    "s24_20(0[1-9]|1[0-7])",
    [
        "suomi24-2017h2",
        "suomi24-2001-2017",
        "suomi24-2001-2017-korp-v1-1",
        "suomi24-2001-2017-korp-v1-2",
    ]);


settings.corpora.iclfi = {
    title: "ICLFI – Kansainvälinen oppijansuomen korpus",
    description: "ICLFI – International Corpus of Learner Finnish – Kansainvälinen oppijansuomen korpus",
    id: "iclfi",
    urn: "urn:nbn:fi:lb-20140730163",
    metadata_urn: "urn:nbn:fi:lb-20140730163",
    licence: {
	name: "CLARIN RES +PLAN +NC +INF +PRIV +DEP",
	urn: "urn:nbn:fi:lb-2015050501"
    },
    homepage_url: "http://www.oulu.fi/suomitoisenakielena/node/16078",
    cite_id: "ICLFI",
    limited_access: true,
    licence_type: "RES",
    within: settings.spWithin,
    context: settings.spContext,
    attributes: {
        lemma: attrs.baseform,
        msd: attrs.msd
        /*dephead: attrs.dephead,
        deprel: attrs.deprel_tdt,
        ref: attrs.ref*/
    },
    struct_attributes: {
        text_place: {
            label: "iclfi_place"
	},
        text_year: {
            label: "iclfi_year"
	},
        text_medium: {
            label: "iclfi_medium"
	},
        text_code: {
            label: "iclfi_code"
	},
        text_dob: {
            label: "iclfi_dob"
	},
        text_sex: {
            label: "iclfi_sex"
	},
        text_pob: {
            label: "iclfi_pob"
	},
        text_infloc: {
            label: "iclfi_infloc"
	},
        text_inflang: {
            label: "iclfi_inflang"
	},
        text_infmotherlang: {
            label: "iclfi_infmotherlang"
	},
        text_inffatherlang: {
            label: "iclfi_inffatherlang"
	},
        text_finnishathome: {
            label: "iclfi_finnishathome"
	},
        text_taugthfinnish: {
            label: "iclfi_taugthfinnish"
	},
        text_teacherlang: {
            label: "iclfi_teacherlang"
	},
        text_beentofinland: {
            label: "iclfi_beentofinland"
	},
        text_book: {
            label: "iclfi_book"
	},
        text_levelhour: {
            label: "iclfi_levelhour"
	},
        text_levelcefrone: {
            label: "iclfi_levelcefrone"
	},
        text_levelcefrtwo: {
            label: "iclfi_levelcefrtwo"
	},
        text_otherlangs: {
            label: "iclfi_otherlangs"
	},
        text_levelcefrthree: {
            label: "iclfi_levelcefrthree"
        },
        text_levelcefrfour: {
            label: "iclfi_levelcefrfour"
        },
        text_cefrlevel: {
            label: "iclfi_cefrlevel"
        },
        text_texttype: {
            label: "iclfi_texttype"
	},
        text_exercise: {
            label: "iclfi_exercise"
	},
        text_examtype: {
            label: "iclfi_examtype"
	},
        text_limitedtime: {
            label: "iclfi_limitedtime"
	},
        text_wherewritten: {
            label: "iclfi_wherewritten"
	},
        text_aids: {
            label: "iclfi_aids"
	},
        text_filename: {
            label: "iclfi_filename"
	}
    }
};


/* YLE News Finnish */


sattrlist.ylenews_fi_common = {
    text_main_department: {
	label: "main_section",
	displayType: "select",
	opts: settings.liteOptions,
	dataset: [
		  "100 päivää",
		  "1917",
		  "8 myyttiä työstä",
		  "Abitreenit",
		  "aihe",
		  "Akuutti",
		  "Au pairit",
		  "Battle",
		  "Blogit",
		  "Digitalsummit",
		  "Digitreenit ",
		  "Docventures",
		  "Dokumentit",
		  "Dox@net",
		  "Draama",
		  "Egenland",
		  "Elektroninen urheilu",
		  "Elokuvat",
		  "Elossa 24h",
		  "Eläinsairaala",
		  "Eläkesäätiö",
		  "Elämä",
		  "Elämä pelissä",
		  "Elävä arkisto",
		  "Erikoiset",
		  "Etusivu",
		  "E-urheilu",
		  "Euroviisut 2014",
		  "Euroviisut 2015",
		  "Euroviisut 2016",
		  "Euroviisut 2017",
		  "Euroviisut 2018",
		  "Flinkkilä & Tastula",
		  "FOMO",
		  "FTW",
		  "Futisvanhemmat",
		  "Galaxi",
		  "Goals-sarja",
		  "Hasbeen",
		  "Helsinki Script",
		  "Historia",
		  "Hulahulasuomi",
		  "Huono ystävä",
		  "Huumori",
		  "Hyvät katsojat",
		  "Ihmeelliset aivot",
		  "Imettäjät",
		  "Itämeren heinäkuu",
		  "Janna Rantala",
		  "Jenny+",
		  "Kadonnut",
		  "Kandit",
		  "Kansainvälinen Paulon sellokilpailu 2018",
		  "Kekkonen",
		  "Kids@docs",
		  "Kirjat",
		  "Kirjojen Suomi",
		  "Klassinen",
		  "Klassinen Suomi",
		  "Klassisen juttuarkisto",
		  "Koti",
		  "Kulttuuri",
		  "Kulttuuricocktail",
		  "Kulttuurin välikysymys",
		  "Kuningaskuluttaja",
		  "Kuusijuhla",
		  "Lapset",
		  "Lovemilla",
		  "Luonto",
		  "Luontovuosi",
		  "Lupa välittää",
		  "Lähiö",
		  "Marja Hintikka Live",
		  "Meidän luokka",
		  "Mennään metsään",
		  "Meri Louhos",
		  "Miljoona linnunpönttöä",
		  "MOT",
		  "Musiikki",
		  "Muumilaakso",
		  "Muuttopäiväkirjat",
		  "Naurun tasapaino",
		  "Nettiä ikä kaikki",
		  "Noin viikon uutiset",
		  "Nuoret",
		  "Nuorille. Nyt!",
		  "Nyt",
		  "Nyt tai ei koskaan",
		  "Näkökulmat",
		  "Ohjelmat",
		  "Oi maamme",
		  "Olen jossain",
		  "Olivia18",
		  "Operaatio Alaska",
		  "Operaatio Mannerheim",
		  "Oppiminen",
		  "Orkesterikone",
		  "Oscar-gaala",
		  "Parasta nyt",
		  "Pasila",
		  "Perjantai",
		  "Podcastit",
		  "Presidentti",
		  "Prophecy",
		  "Puoli seitsemän",
		  "Putkiremontti",
		  "Rikos ja oikeus",
		  "Robomestarit",
		  "RSO",
		  "Ruoka",
		  "Sadan vuoden talo",
		  "Satuhäät",
		  "Sekasin",
		  "Seksi-Suomen Historia",
		  "Shortdox",
		  "Sinun tarinasi",
		  "Sisujengi",
		  "Slush",
		  "Strömsö",
		  "Summeri",
		  "Suomi",
		  "SuomiLOVE",
		  "Suomi on venäläinen",
		  "Syke",
		  "Tangomarkkinat 2014",
		  "Tangomarkkinat 2015",
		  "Tangomarkkinat 2016",
		  "Tartu mikkiin",
		  "Teiniäidit",
		  "Tekijänä",
		  "Tellus",
		  "Terveys",
		  "The Heroes of The Baltic Sea",
		  "Tiede",
		  "Tietoa ohjelmista",
		  "To Nightwish With Love",
		  "Tove Jansson 100v",
		  "Tuhkimotarinoita",
		  "Tyyli",
		  "UMK17",
		  "UMK18",
		  "UMK18 Saara Aalto",
		  "UMK19",
		  "UMK2014",
		  "UMK 2015",
		  "UMK 2016",
		  "Urheilu",
		  "Urheilusuomi",
		  "Uusi päivä",
		  "Vaakakapina",
		  "Vaiheessa - 10 erilaista elämänvalintaa",
		  "Valmennuskoulu",
		  "Valokuvan voimaa",
		  "Vanhemmuus",
		  "Vapaa-aika",
		  "Vihreät Valot",
		  "Viihde",
		  "Ville 30 päivässä",
		  "Villi kortti",
		  "Väärät bileet",
		  "We want more",
		  "Y",
		  "Yhteiskunta",
		  "Yle Beta",
		  "Yle Forum",
		  "Yleisradio",
		  "Yle kilpailutukset",
		  "Yle Kipinä",
		  "Yle Klassinen",
		  "Yle Puhe",
		  "Yle Radio 1",
		  "Yle Radio Suomi",
		  "Yle Teema",
		  "Yle TV1",
		  "Yle TV2",
		  "YleX",
		  ],
    },
    text_departments: {
	label: "sections",
	type: "set",
	opts: settings.setOptions,
	displayType: "select",
	dataset: [
		  "100 päivää",
		  "101 kirjaa",
		  "1917",
		  "8 myyttiä työstä",
		  "Aalto",
		  "Abitreenit",
		  "AFK",
		  "Äidinkieli",
		  "aihe",
		  "Aikaleima",
		  "Ajankohtainen kolmonen",
		  "Akuutti",
		  "Arkkitehtuuri",
		  "Artikkelit",
		  "Askartelu ja käsityöt",
		  "Atte Blom",
		  "Au pairit",
		  "Battle",
		  "Biologia",
		  "Blog",
		  "Blogit",
		  "Digitalsummit",
		  "Digitreenit ",
		  "Docventures",
		  "Docventures-yhteisö muuttaa maailmaa",
		  "Dokumentit",
		  "Draama",
		  "Egenland",
		  "Eläinsairaala",
		  "Eläkesäätiö",
		  "Elämä",
		  "Elämänkatsomustieto",
		  "Elämäntaidot",
		  "Elämä pelissä",
		  "Elävä arkisto",
		  "Elävän arkiston blogi",
		  "Elektroninen urheilu",
		  "Elokuvat",
		  "Elossa 24h",
		  "Englanti",
		  "Eränkävijät",
		  "Espanja",
		  "Etusivu",
		  "E-urheilu",
		  "Euroviisut 2014",
		  "Euroviisut 2015",
		  "Euroviisut 2016",
		  "Euroviisut 2017",
		  "Euroviisut 2018",
		  "Even myshörna",
		  "Filosofia",
		  "Flinkkilä & Tastula",
		  "FOLK",
		  "FOMO",
		  "FTW",
		  "Futisvanhemmat",
		  "Fysiikka",
		  "Galaxi",
		  "Gambatte! − vuosi Japanissa",
		  "Goals-sarja",
		  "Hahmot",
		  "HD",
		  "Helsinki Script",
		  "Henkilöt",
		  "Hetkiä Kalliossa",
		  "Hetki New Yorkissa",
		  "Historia",
		  "Hulahulasuomi",
		  "Hullujenhautausmaa",
		  "Hulluus kylässä",
		  "Huono ystävä",
		  "Huume-Suomi",
		  "Huumori",
		  "Huumorivirkkaajan päiväkirja",
		  "Hyvät katsojat",
		  "Ihmeelliset aivot",
		  "Ihminen ja yhteiskunta",
		  "Imettäjät",
		  "In English",
		  "Interaktiiviset",
		  "Isä, äiti ja media",
		  "Italia",
		  "Itämeren heinäkuu",
		  "Itämeren merirosvot",
		  "Janna Rantala",
		  "Jante redux",
		  "Jatkuu",
		  "Jean Sibelius 150v",
		  "Jean Sibelius -viulukilpailu",
		  "Jenny+",
		  "Jenny ja läskimyytinmurtajat",
		  "Juice goes Nenäpäivä",
		  "#junapummit",
		  "Jutut",
		  "Kadonnut",
		  "Kahden polven treffit",
		  "Kaikkien aikojen tangokuninkaalliset",
		  "Kaikki kilpailutyöt",
		  "Kandit",
		  "Kansainvälinen Paulon sellokilpailu 2018",
		  "Kare Eskolan blogi",
		  "Kasvatusviisautta kiireisille",
		  "Katoava Pohjola",
		  "Kehitys kehittyy",
		  "Kekkonen",
		  "Kemia",
		  "Kesärannan linnut: Lokit ja Tiirat",
		  "Kesärannan linnut: Vesilintuja",
		  "Kevät",
		  "Kids@docs",
		  "Kielet",
		  "Kieltolaki",
		  "Kirjat",
		  "Kirjojen Suomi",
		  "Klassinen",
		  "Klassinen Suomi",
		  "Klassisen juttuarkisto",
		  "Konsertit, kausi 2011-2012",
		  "Konsertit, kausi 2012-2013",
		  "Konsertit, kausi 2013-2014",
		  "Konsertit, kausi 2014-2015",
		  "Konsertit, kausi 2015-2016",
		  "Konsertit, kausi 2016-2017",
		  "Konsertit, kausi 2017-2018",
		  "Konsertit, kausi 2018-2019",
		  "Koodauksen MM",
		  "Koti",
		  "Koulutus",
		  "Kuka lintulaudallani ruokailee: opas talvilintujen tunnistamiseen",
		  "Kulttuuri",
		  "Kulttuuricocktail",
		  "Kulttuurin välikysymys",
		  "Kulttuuriosasto",
		  "Kuluttajakysymykset",
		  "Kuningaskuluttaja",
		  "Kuningaskuluttajan näkökulmat",
		  "Kuningaskuluttajan testit",
		  "Kuningas Matti ja ysäristit",
		  "Kuusijuhla",
		  "Kuvia",
		  "Lähetykset",
		  "Lähiö",
		  "Lahjapaketit",
		  "Laitakaupungin kanat",
		  "Läpimurto",
		  "Lappeenrannan laulukilpailut 2016",
		  "Lapset",
		  "Latina",
		  "Lomamatka 80-luvulle",
		  "Lovemilla",
		  "Luonto",
		  "Luontovuosi",
		  "Lupa välittää",
		  "Maantiede",
		  "Maatuskan mitoissa",
		  "Mannerheimit",
		  "Marja Hintikka Live",
		  "Markus Kajo",
		  "Matematiikka",
		  "Media- ja digitaidot",
		  "Medialle",
		  "Meidän luokka",
		  "Meille töihin?",
		  "Mennään metsään",
		  "Menneisyyden metsästäjät",
		  "Meri Louhos",
		  "Metsien kätkemä",
		  "Miljoona linnunpönttöä",
		  "Minä",
		  "Mirjam Helin -laulukilpailu 2014",
		  "MMM",
		  "Mokasiko media?",
		  "MOT",
		  "Muksun mukana",
		  "Musiikin kevät 1918",
		  "Musiikki",
		  "Musiikkineuvola",
		  "Muuttolintujen matkassa: opas syysmuuttajien tunnistamiseen",
		  "Muuttopäiväkirjat",
		  "Näkökulma",
		  "Näkökulmat",
		  "Nappituntuma",
		  "Naurun tasapaino",
		  "Näyttelijät",
		  "Neljäs kansainvälinen Maj Lind -pianokilpailu 2017",
		  "Nettiä ikä kaikki",
		  "Noin viikon uutiset",
		  "Nosteessa",
		  "Nuoret",
		  "Nuorille. Nyt!",
		  "Nyt",
		  "Nyt tai ei koskaan",
		  "Ohjelmat",
		  "Oi maamme",
		  "Olen jossain",
		  "Olivia",
		  "Olivia18",
		  "Olotila",
		  "Omalääkäri",
		  "Onnenongintaa",
		  "Operaatio Alaska",
		  "Operaatio Mannerheim",
		  "Opettajalle",
		  "Oppiaineet ja yo-kokeet",
		  "Oppiminen",
		  "Oppimistaidot",
		  "Orkesteri",
		  "Oscar-gaala",
		  "Paineessa",
		  "Päivikin ryhtihaaste",
		  "Parasta aikaa",
		  "Parasta nyt",
		  "Parhaat palat",
		  "Pasila",
		  "Pasi Toiviainen",
		  "Peltsin kova vuosi",
		  "Perjantai",
		  "Pertti Kurikan Nimipäivät",
		  "Peter von Bagh",
		  "Pikku Kakkonen",
		  "Pimeä historia",
		  "Pizzastipendi",
		  "Podcastit",
		  "Polkupyörämatkalla - joka päivä",
		  "Polvillaan",
		  "Portugali",
		  "Presidentti",
		  "Prisma Studio",
		  "Prophecy",
		  "Psykologia",
		  "Pulloposti",
		  "Puoli seitsemän",
		  "Putkiremontti",
		  "Puutarha",
		  "Rakenna soitin!",
		  "Rakkautta ensikuulemalla",
		  "Ranska",
		  "Rauhassa",
		  "rekryle",
		  "Rikos ja oikeus",
		  "Robomestarit",
		  "RSO",
		  "RSO in English",
		  "Ruoka",
		  "Ruoka ja juoma",
		  "Ruokamuistoja",
		  "Ruotsi",
		  "Saame",
		  "Sadan vuoden talo",
		  "Saksa",
		  "Saksaa uusin silmin",
		  "Satuhäät",
		  "Sekasin",
		  "Seksi-Suomen Historia",
		  "Seniorin seurassa",
		  "Shortdox",
		  "Sideways 2018",
		  "Sielukoulu",
		  "Silkkiä ja säveliä",
		  "SILTA-yleisötyö ",
		  "Sinun tarinasi",
		  "Sisujengi",
		  "Sivuraiteilla",
		  "Slush",
		  "#sota39",
		  "Sound Tracker",
		  "Strömsö",
		  "Summeri",
		  "Suomeksi",
		  "Suomen kielen alkeet",
		  "Suomi",
		  "SuomiLOVE",
		  "Suomi on venäläinen",
		  "Suosikkimusavideot",
		  "Syke",
		  "Syötävä kaupunki",
		  "Tangomarkkinakilpailijat 2014: miehet",
		  "Tangomarkkinakilpailijat 2014: naiset",
		  "Tangomarkkinakilpailijat 2015: miehet",
		  "Tangomarkkinakilpailijat 2015: naiset",
		  "Tangomarkkinat 2014",
		  "Tangomarkkinat 2015",
		  "Tangomarkkinat 2016",
		  "Tangomarkkinat juttuarkisto 2015",
		  "Tanssiva karhu",
		  "Tapio Wirkkala 100v",
		  "Tarinanmetsästäjät",
		  "Tartu mikkiin",
		  "tech.yle.fi",
		  "Teeman elokuvafestivaali",
		  "Teeman elokuvafestivaali 2016",
		  "Teemat",
		  "Teiniäidit",
		  "Tekijänä",
		  "Tellus",
		  "Terveiset musiikkimatkalta",
		  "Terveys",
		  "Terveystieto",
		  "Testi",
		  "The Heroes of The Baltic Sea",
		  "Tiede",
		  "Tiedeblogi",
		  "Tiedotteet",
		  "Tien päällä",
		  "Tietoa ohjelmista",
		  "Titanicilla",
		  "Tohtori Raimo",
		  "To Nightwish With Love",
		  "Tove Jansson 100v",
		  "Tuhkimotarinoita",
		  "Tulevaisuuden tusina",
		  "Tuotantoyhtiöille",
		  "Tyhmyreille",
		  "Tyttärenä tässä",
		  "Tyyli",
		  "Ulkomaiset sarjat",
		  "UMK17",
		  "UMK18",
		  "UMK18 Saara Aalto",
		  "UMK2014",
		  "UMK 2015",
		  "UMK 2016",
		  "UPplus",
		  "Ura 30 sekunnissa",
		  "Urheilu",
		  "Urheilusuomi",
		  "Usein kysyttyä",
		  "Uskonto",
		  "Uuden Päivän musiikki",
		  "Uusi päivä",
		  "Vaakakapina",
		  "#vaalit56",
		  "Väärät bileet",
		  "Vaiheessa - 10 erilaista elämänvalintaa",
		  "Valmennuskoulu",
		  "Valokuvan voimaa",
		  "Vanhemmuus",
		  "Vanhempien seksikoulu",
		  "Vapaa-aika",
		  "Vastaukset",
		  "Vastuullisuus",
		  "Venäjä",
		  "Vieraskynä",
		  "Vihreät Valot",
		  "Viihde",
		  "Viikko koulussa",
		  "Viikonloppulista",
		  "Vikasietotila",
		  "Ville 30 päivässä",
		  "Villein matkavideo",
		  "Villen keittiö 30 minuutissa",
		  "Villi kortti",
		  "We want more",
		  "Y",
		  "Yhteiskunta",
		  "Yhteiskuntaoppi",
		  "Yle Areena",
		  "Yle Beta",
		  "Yle Beta Challenge",
		  "yle.fi/aihe/uusimmat",
		  "Yle Forum",
		  "Yleisradio",
		  "Yle kilpailutukset",
		  "Yle Kipinä",
		  "Yle Klassinen",
		  "Yle Live",
		  "Ylen siisti kesäduuni",
		  "Ylen talous",
		  "Yle Puhe",
		  "Yle Radio 1",
		  "Yle Radio Suomi",
		  "Yle Teema",
		  "Yle TV1",
		  "Yle TV2",
		  "YleX",
		  "Y:n blogi",
		  "Ystäväni hevonen",
		  ],
    },    
    text_id: {
	label: "text_id",
    },
    text_publisher: sattrs.text_publisher,
    text_url: sattrs.link_original,
    text_datetime_published: {
	label: "datetime_published",
	stringify: settings.fn.stringify_iso_datetime,
    },
    text_datetime_content_modified: {
	label: "datetime_content_modified",
	stringify: settings.fn.stringify_iso_datetime,
    },
    text_datetime_json_modified: {
	label: "datetime_json_modified",
	stringify: settings.fn.stringify_iso_datetime,
    },
    paragraph_id: sattrs.hidden,
    sentence_id: sattrs.hidden,
    sentence_type: {
	label: "sentence_type",
	displayType: "select",
	opts: settings.liteOptions,
	translationKey: "textpart_",
	dataset: {
	    "alt": "image_alt",
	    "by": "byline",
	    "caption": "caption",
	    "heading": "heading",
	    "heading-alt": "heading_alt",
	    "heading-caption": "heading_caption",
	    "text": "text",
	},
    },
};

sattrs.ylenews_fi_paragraph_type = {
    label: "paragraph_type",
    displayType: "select",
    opts: settings.liteOptions,
    translationKey: "textpart_",
    dataset: {
	"by": "byline",
	"heading": "heading",
	"headline": "headline",
	"image": "image",
	"lead": "lead",
	"quote": "quote",
	"shortSummary": "short_summary",
	"summary": "summary",
	"text": "text",
    },
};


settings.templ.ylenews_fi_a = {
    title: "Ylen suomenkielinen uutisarkisto {} (tutkijoille)",
    description: "Ylen suomenkielinen uutisarkisto 2011–2018, Korp: vuosi {}<br/>Tutkijoiden käytettävissä oleva versio: virkkeet alkuperäisessä järjestyksessä ja tuki laajennetulle kontekstille.",
    id: "ylenews_fi_{}_a",
    limited_access: true,
    licence_type: "ACA",
    features: ["paragraphs", "parsed_tdt"],
    struct_attributes: $.extend(
        {}, sattrlist.ylenews_fi_common,
        {
	    paragraph_type: sattrs.ylenews_fi_paragraph_type,
	}),
};

settings.fn.add_corpus_settings(
    settings.templ.ylenews_fi_a,
    [2011, 2018],
    settings.corporafolders.webnews.ylenews_fi.a,
    "ylenews_fi_{}_a");

// settings.corpus_aliases["ylenews_fi_2018h2_a"] = "ylenews_fi_201[1-8]_a";
settings.corpus_aliases["ylenews_fi_2011_2018_a"]
    = settings.corpus_aliases["ylenews-fi-2011-2018-korp"]
    = settings.corpus_aliases["ylenews-fi-2011-2018"]
    = "ylenews_fi_201[1-8]_a";

    
settings.templ.ylenews_fi_s = {
    title: "Ylen suomenkielinen uutisarkisto {} (kaikille)",
    description: "Ylen suomenkielinen uutisarkisto 2011–2018, Korp: vuosi {}<br/>Kaikille avoin versio: virkkeet sekoitettuina kunkin tekstin sisällä ja ilman laajennetun kontekstin tukea",
    id: "ylenews_fi_2011_2018_s",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    features: ["parsed_tdt"],
    struct_attributes: $.extend(
        {}, sattrlist.ylenews_fi_common,
        {
	    sentence_paragraph_type: sattrs.ylenews_fi_paragraph_type,
	}),
};


settings.fn.add_corpus_settings(
    settings.templ.ylenews_fi_s,
    [2011, 2018],
    settings.corporafolders.webnews.ylenews_fi.s,
    "ylenews_fi_{}_s");

// settings.corpus_aliases["ylenews_fi_2018h2_s"] = "ylenews_fi_201[1-8]_s";
settings.corpus_aliases["ylenews_fi_2011_2018_s"]
    = settings.corpus_aliases["ylenews-fi-2011-2018-s-korp"]
    = settings.corpus_aliases["ylenews-fi-2011-2018-s"]
    = "ylenews_fi_201[1-8]_s";
	

/* YLE Finnish Easy-to-read*/


sattrlist.ylenews_fi_selko_common = {

    text_id: {
	label: "text_id",
    },
    text_publisher: sattrs.text_publisher,
    text_url: sattrs.link_original,
    text_datetime_published: {
	label: "datetime_published",
	stringify: settings.fn.stringify_iso_datetime,
    },
    text_datetime_content_modified: {
	label: "datetime_content_modified",
	stringify: settings.fn.stringify_iso_datetime,
    },
    text_datetime_json_modified: {
	label: "datetime_json_modified",
	stringify: settings.fn.stringify_iso_datetime,
    },
    // paragraph_id: {
    // },
    // sentence_id: {
    // },
    sentence_type: {
	label: "sentence_type",
	displayType: "select",
	opts: settings.liteOptions,
	translationKey: "textpart_",
	dataset: {
	    "alt": "image_alt",
	    "by": "byline",
	    "caption": "caption",
	    "heading": "heading",
	    "heading-alt": "heading_alt",
	    "heading-caption": "heading_caption",
	    "text": "text",
	},
    },
};


sattrs.ylenews_fi_selko_paragraph_type = {
    label: "paragraph_type",
    displayType: "select",
    opts: settings.liteOptions,
    translationKey: "textpart_",
    dataset: {
	"by": "byline",
	"heading": "heading",
	"headline": "headline",
	"image": "image",
	"lead": "lead",
	"quote": "quote",
	"shortSummary": "short_summary",
	"summary": "summary",
	"text": "text",
    },
};

settings.corpora.ylenews_fi_2011_2018_selko_a = {
    title: "Ylen suomenkielisen uutisarkiston selkouutiset 2011–2018 (tutkijoille)",
    description: "Ylen suomenkielisen uutisarkiston selkouutiset 2011–2018, Korp<br/>Tutkijoiden käytettävissä oleva versio: virkkeet alkuperäisessä järjestyksessä ja tuki laajennetulle kontekstille.<br/><br/>Huomaa, että selkouutiset ovat myös osana laajempaa Ylen suomenkielinen uutisarkisto -aineistoa.",
    id: "ylenews_fi_2011_2018_selko_a",
    urn: "urn:nbn:fi:lb-2019121205",
    metadata_urn: "urn:nbn:fi:lb-2019121203",
    cite_id: "ylenews-fi-2011-2018-selko-korp",
    limited_access: true,
    licence_type: "ACA",
    licence: {
	name: "CLARIN ACA +NC 1.0",
	urn: "urn:nbn:fi:lb-2019121202",
    },
    features: ["paragraphs", "parsed_tdt"],
    struct_attributes: $.extend(
        {}, sattrlist.ylenews_fi_selko_common,
        {
	    paragraph_type: sattrs.ylenews_fi_selko_paragraph_type,
        }),
};


settings.corpus_aliases["ylenews-fi-2011-2018-selko-korp"]
    = settings.corpus_aliases["ylenews-fi-2011-2018-selko"]
    = "ylenews_fi_2011_2018_selko_a";


settings.corpora.ylenews_fi_2011_2018_selko_s = {
    title: "Ylen suomenkielisen uutisarkiston selkouutiset 2011–2018 (kaikille)",
    description: "Ylen suomenkielisen uutisarkiston selkouutiset 2011–2018, sekoitettu, Korp<br/>Kaikille avoin versio: virkkeet sekoitettuina kunkin tekstin sisällä ja ilman laajennetun kontekstin tukea.<br/><br/>Huomaa, että selkouutiset ovat myös osana laajempaa Ylen suomenkielinen uutisarkisto -aineistoa.",
    id: "ylenews_fi_2011_2018_selko_s",
    urn: "urn:nbn:fi:lb-2019121206",
    metadata_urn: "urn:nbn:fi:lb-2019121204",
    licence: settings.licenceinfo.CC_BY,
    cite_id: "ylenews-fi-2011-2018-selko-s-korp",
    context: settings.defaultContext,
    within: settings.defaultWithin,
    features: ["parsed_tdt"],
    struct_attributes: $.extend(
        {}, sattrlist.ylenews_fi_selko_common,
        {
	    sentence_paragraph_type: sattrs.ylenews_fi_selko_paragraph_type,
	}),
};


settings.corpus_aliases["ylenews-fi-2011-2018-selko-s-korp"]
    = settings.corpus_aliases["ylenews-fi-2011-2018-selko-s"]
    = "ylenews_fi_2011_2018_selko_s";


// Add the extra properties to corpora
//
// FIXME: This works for attributes set via the "features" property
// only if the same attribute objects are referred to directly from
// some other corpus configuration. Fixing would probably require
// moving this to initialization code (util.coffee, main.coffee),
// which might also otherwise make sense. (Jyrki Niemi 2016-10-18)

settings.fn.add_attr_extra_properties(settings.corpora);


settings.corpusListing = new CorpusListing(settings.corpora);
