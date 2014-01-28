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
    title : "KLK - Ruotsinkieliset lehdet"
};


settings.corporafolders.klk_sv.sv_1770 = {
    title : "1770-luku",
    contents : ["klk_sv_1771",
                "klk_sv_1772",
                "klk_sv_1773",
                "klk_sv_1774",
                "klk_sv_1775",
                "klk_sv_1776",
                "klk_sv_1777",
                "klk_sv_1778",
               ]
};


settings.corporafolders.klk_sv.sv_1780 = {
    title : "1780-luku",
    contents : ["klk_sv_1782",
                "klk_sv_1783",
                "klk_sv_1784",
                "klk_sv_1785",
                "klk_sv_1789"
               ]
};


settings.corporafolders.klk_sv.sv_1790 = {
    title : "1790-luku",
    contents : ["klk_sv_1791",
                "klk_sv_1792",
                "klk_sv_1793",
                "klk_sv_1794",
                "klk_sv_1795",
                "klk_sv_1796",
                "klk_sv_1797",
                "klk_sv_1798",
                "klk_sv_1799"
               ]
};

settings.corporafolders.klk_sv.sv_1800 = {
    title : "1800-luku",
    contents : ["klk_sv_1800",
                "klk_sv_1801",
                "klk_sv_1802",
                "klk_sv_1803",
                "klk_sv_1804",
                "klk_sv_1805",
                "klk_sv_1806",
                "klk_sv_1807",
                "klk_sv_1808",
                "klk_sv_1809"
               ]
};

settings.corporafolders.klk_sv.sv_1810 = {
    title : "1810-luku",
    contents : ["klk_sv_1810",
                "klk_sv_1811",
                "klk_sv_1812",
                "klk_sv_1813",
                "klk_sv_1814",
                "klk_sv_1815",
                "klk_sv_1816",
                "klk_sv_1817",
                "klk_sv_1818",
                "klk_sv_1819"
               ]
};



settings.corporafolders.klk_sv.sv_1820 = {
    title : "1820-luku",
    contents : ["klk_sv_1820",
                "klk_sv_1821",
                "klk_sv_1822",
                "klk_sv_1823",
                "klk_sv_1824",
                "klk_sv_1825",
                "klk_sv_1826",
                "klk_sv_1827",
		"klk_sv_1828",
                "klk_sv_1829"
               ]
};

settings.corporafolders.klk_sv.sv_1830 = {
    title : "1830-luku",
    contents : ["klk_sv_1830",
                "klk_sv_1831",
                "klk_sv_1832",
                "klk_sv_1833",
                "klk_sv_1834",
                "klk_sv_1835",
                "klk_sv_1836",
                "klk_sv_1837",
                "klk_sv_1838",
                "klk_sv_1839"
               ]
};

settings.corporafolders.klk_sv.sv_1840 = {
    title : "1840-luku",
    contents : ["klk_sv_1840",
                "klk_sv_1841",
                "klk_sv_1842",
		"klk_sv_1843",
                "klk_sv_1844",
                "klk_sv_1845",
                "klk_sv_1846",
                "klk_sv_1847",
                "klk_sv_1848",
                "klk_sv_1849"
               ]
};

settings.corporafolders.klk_sv.sv_1850 = {
    title : "1850-luku",
    contents : ["klk_sv_1850",
                "klk_sv_1851",
                "klk_sv_1852",
                "klk_sv_1853",
                "klk_sv_1854",
                "klk_sv_1855",
                "klk_sv_1856",
                "klk_sv_1857",
                "klk_sv_1858",
                "klk_sv_1859"
               ]
};

settings.corporafolders.klk_sv.sv_1860 = {
    title : "1860-luku",
    contents : ["klk_sv_1860",
                "klk_sv_1861",
                "klk_sv_1862",
                "klk_sv_1863",
                "klk_sv_1864",
                "klk_sv_1865",
                "klk_sv_1866",
                "klk_sv_1867",
                "klk_sv_1868",
                "klk_sv_1869"
               ]
};

settings.corporafolders.klk_sv.sv_1870 = {
    title : "1870-luku",
    contents : ["klk_sv_1870",
                "klk_sv_1871",
                "klk_sv_1872",
                "klk_sv_1873",
                "klk_sv_1874",
                "klk_sv_1875",
                "klk_sv_1876",
                "klk_sv_1877",
                "klk_sv_1878",
                "klk_sv_1879"
               ]
};

settings.corporafolders.klk_sv.sv_1880 = {
    title : "1880-luku",
    contents : ["klk_sv_1880",
                "klk_sv_1881",
                "klk_sv_1882",
                "klk_sv_1883",
                "klk_sv_1884",
                "klk_sv_1885",
                "klk_sv_1886",
                "klk_sv_1887",
                "klk_sv_1888",
                "klk_sv_1889"
               ]
};

settings.corporafolders.klk_sv.sv_1890 = {
    title : "1890-luku",
    contents : ["klk_sv_1890",
                "klk_sv_1891",
                "klk_sv_1892",
                "klk_sv_1893",
                "klk_sv_1894",
                "klk_sv_1895",
                "klk_sv_1896",
                "klk_sv_1897",
                "klk_sv_1898",
                "klk_sv_1899"
               ]
};

settings.corporafolders.klk_sv.sv_1900 = {
    title : "1900-luku",
    contents : ["klk_sv_1900",
                "klk_sv_1901",
                "klk_sv_1902",
                "klk_sv_1903",
                "klk_sv_1904",
                "klk_sv_1905",
                "klk_sv_1906",
                "klk_sv_1907",
                "klk_sv_1908",
                "klk_sv_1909"
               ]
};

settings.corporafolders.klk_sv.sv_1910 = {
    title : "1910-luku",
    contents : ["klk_sv_1910",
                "klk_sv_1911",
                "klk_sv_1912",
                "klk_sv_1913",
                "klk_sv_1914",
                "klk_sv_1915",
                "klk_sv_1916",
                "klk_sv_1917",
                "klk_sv_1918",
                "klk_sv_1919"
               ]
};

settings.corporafolders.klk_sv.sv_1920 = {
    title : "1920-luku",
    contents : ["klk_sv_1920",
                "klk_sv_1921",
                "klk_sv_1922",
                "klk_sv_1923",
                "klk_sv_1924",
                "klk_sv_1925",
                "klk_sv_1926",
                "klk_sv_1927",
                "klk_sv_1928",
                "klk_sv_1929"
               ]
};

settings.corporafolders.klk_sv.sv_1930 = {
    title : "1930-luku",
    contents : ["klk_sv_1930",
                "klk_sv_1931",
                "klk_sv_1932",
                "klk_sv_1933",
                "klk_sv_1934",
                "klk_sv_1935",
                "klk_sv_1936",
                "klk_sv_1937",
                "klk_sv_1938",
                "klk_sv_1939"
               ]
};

settings.corporafolders.klk_sv.sv_1940 = {
    title : "1940-luku",
    contents : ["klk_sv_1940",
                "klk_sv_1941",
                "klk_sv_1942",
                "klk_sv_1943",
                "klk_sv_1944",
                "klk_sv_1945",
                "klk_sv_1946",
                "klk_sv_1947",
                "klk_sv_1948"
               ]
};


settings.corporafolders.klk_sv.sv_1980 = {
    title : "1980-luku",
    contents : ["klk_sv_1982",
                "klk_sv_1983",
                "klk_sv_1986"
               ]
};




settings.corpora.mulcold_sv = {
    id : "mulcold_sv",
    title: "MULCOLD ruotsi",
    description : "Multilingual Corpus of Legal Documents, ruotsinkielinen osa",
    context : settings.defaultContext, 
    within : settings.defaultWithin, 
    attributes: attrlist.mulcold_sv,
    struct_attributes : sattrlist.mulcold,
};

settings.corpora.klk_sv_1771 = {
    title : "1771",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1771",
    id : "klk_sv_1771",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1772 = {
    title : "1772",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1772",
    id : "klk_sv_1772",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1773 = {
    title : "1773",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1773",
    id : "klk_sv_1773",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1774 = {
    title : "1774",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1774",
    id : "klk_sv_1774",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1775 = {
    title : "1775",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1775",
    id : "klk_sv_1775",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1776 = {
    title : "1776",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1776",
    id : "klk_sv_1776",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1777 = {
    title : "1777",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1777",
    id : "klk_sv_1777",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1778 = {
    title : "1778",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1778",
    id : "klk_sv_1778",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};


settings.corpora.klk_sv_1782 = {
    title : "1782",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1782",
    id : "klk_sv_1782",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1783 = {
    title : "1783",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1783",
    id : "klk_sv_1783",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1784 = {
    title : "1784",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1784",
    id : "klk_sv_1784",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};


settings.corpora.klk_sv_1785 = {
    title : "1785",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1785",
    id : "klk_sv_1785",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};


settings.corpora.klk_sv_1789 = {
    title : "1789",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1789",
    id : "klk_sv_1789",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1791 = {
    title : "1791",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1791",
    id : "klk_sv_1791",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1792 = {
    title : "1792",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1792",
    id : "klk_sv_1792",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1793 = {
    title : "1793",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1793",
    id : "klk_sv_1793",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};


settings.corpora.klk_sv_1794 = {
    title : "1794",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1794",
    id : "klk_sv_1794",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1795 = {
    title : "1795",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1795",
    id : "klk_sv_1795",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1796 = {
    title : "1796",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1796",
    id : "klk_sv_1796",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1797 = {
    title : "1797",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1797",
    id : "klk_sv_1797",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1798 = {
    title : "1798",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1798",
    id : "klk_sv_1798",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1799 = {
    title : "1799",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1799",
    id : "klk_sv_1799",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1800 = {
    title : "1800",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1800",
    id : "klk_sv_1800",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1801 = {
    title : "1801",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1801",
    id : "klk_sv_1801",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1802 = {
    title : "1802",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1802",
    id : "klk_sv_1802",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1803 = {
    title : "1803",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1803",
    id : "klk_sv_1803",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1804 = {
    title : "1804",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1804",
    id : "klk_sv_1804",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1805 = {
    title : "1805",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1805",
    id : "klk_sv_1805",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1806 = {
    title : "1806",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1806",
    id : "klk_sv_1806",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1807 = {
    title : "1807",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1807",
    id : "klk_sv_1807",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1808 = {
    title : "1808",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1808",
    id : "klk_sv_1808",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1809 = {
    title : "1809",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1809",
    id : "klk_sv_1809",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1810 = {
    title : "1810",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1810",
    id : "klk_sv_1810",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1811 = {
    title : "1811",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1811",
    id : "klk_sv_1811",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1812 = {
    title : "1812",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1812",
    id : "klk_sv_1812",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1813 = {
    title : "1813",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1813",
    id : "klk_sv_1813",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1814 = {
    title : "1814",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1814",
    id : "klk_sv_1814",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1815 = {
    title : "1815",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1815",
    id : "klk_sv_1815",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1816 = {
    title : "1816",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1816",
    id : "klk_sv_1816",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1817 = {
    title : "1817",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1817",
    id : "klk_sv_1817",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1818 = {
    title : "1818",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1818",
    id : "klk_sv_1818",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1819 = {
    title : "1819",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1819",
    id : "klk_sv_1819",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1820 = {
    title : "1820",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1820",
    id : "klk_sv_1820",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1821 = {
    title : "1821",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1821",
    id : "klk_sv_1821",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1822 = {
    title : "1822",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1822",
    id : "klk_sv_1822",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1823 = {
    title : "1823",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1823",
    id : "klk_sv_1823",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1824 = {
    title : "1824",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1824",
    id : "klk_sv_1824",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1825 = {
    title : "1825",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1825",
    id : "klk_sv_1825",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1826 = {
    title : "1826",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1826",
    id : "klk_sv_1826",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1827 = {
    title : "1827",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1827",
    id : "klk_sv_1827",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1828 = {
    title : "1828",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1828",
    id : "klk_sv_1828",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1829 = {
    title : "1829",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1829",
    id : "klk_sv_1829",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1830 = {
    title : "1830",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1830",
    id : "klk_sv_1830",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1831 = {
    title : "1831",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1831",
    id : "klk_sv_1831",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1832 = {
    title : "1832",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1832",
    id : "klk_sv_1832",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1833 = {
    title : "1833",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1833",
    id : "klk_sv_1833",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1834 = {
    title : "1834",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1834",
    id : "klk_sv_1834",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1835 = {
    title : "1835",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1835",
    id : "klk_sv_1835",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1836 = {
    title : "1836",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1836",
    id : "klk_sv_1836",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1837 = {
    title : "1837",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1837",
    id : "klk_sv_1837",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1838 = {
    title : "1838",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1838",
    id : "klk_sv_1838",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1839 = {
    title : "1839",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1839",
    id : "klk_sv_1839",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1840 = {
    title : "1840",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1840",
    id : "klk_sv_1840",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1841 = {
    title : "1841",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1841",
    id : "klk_sv_1841",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1842 = {
    title : "1842",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1842",
    id : "klk_sv_1842",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1843 = {
    title : "1843",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1843",
    id : "klk_sv_1843",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1844 = {
    title : "1844",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1844",
    id : "klk_sv_1844",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1845 = {
    title : "1845",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1845",
    id : "klk_sv_1845",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1846 = {
    title : "1846",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1846",
    id : "klk_sv_1846",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1847 = {
    title : "1847",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1847",
    id : "klk_sv_1847",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1848 = {
    title : "1848",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1848",
    id : "klk_sv_1848",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1849 = {
    title : "1849",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1849",
    id : "klk_sv_1849",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1850 = {
    title : "1850",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1850",
    id : "klk_sv_1850",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1851 = {
    title : "1851",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1851",
    id : "klk_sv_1851",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1852 = {
    title : "1852",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1852",
    id : "klk_sv_1852",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1853 = {
    title : "1853",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1853",
    id : "klk_sv_1853",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1854 = {
    title : "1854",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1854",
    id : "klk_sv_1854",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1855 = {
    title : "1855",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1855",
    id : "klk_sv_1855",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1856 = {
    title : "1856",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1856",
    id : "klk_sv_1856",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1857 = {
    title : "1857",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1857",
    id : "klk_sv_1857",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1858 = {
    title : "1858",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1858",
    id : "klk_sv_1858",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1859 = {
    title : "1859",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1859",
    id : "klk_sv_1859",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1860 = {
    title : "1860",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1860",
    id : "klk_sv_1860",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1861 = {
    title : "1861",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1861",
    id : "klk_sv_1861",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1862 = {
    title : "1862",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1862",
    id : "klk_sv_1862",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1863 = {
    title : "1863",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1863",
    id : "klk_sv_1863",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1864 = {
    title : "1864",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1864",
    id : "klk_sv_1864",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1865 = {
    title : "1865",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1865",
    id : "klk_sv_1865",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1866 = {
    title : "1866",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1866",
    id : "klk_sv_1866",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1867 = {
    title : "1867",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1867",
    id : "klk_sv_1867",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1868 = {
    title : "1868",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1868",
    id : "klk_sv_1868",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1869 = {
    title : "1869",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1869",
    id : "klk_sv_1869",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1870 = {
    title : "1870",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1870",
    id : "klk_sv_1870",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1871 = {
    title : "1871",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1871",
    id : "klk_sv_1871",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1872 = {
    title : "1872",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1872",
    id : "klk_sv_1872",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1873 = {
    title : "1873",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1873",
    id : "klk_sv_1873",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1874 = {
    title : "1874",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1874",
    id : "klk_sv_1874",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1875 = {
    title : "1875",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1875",
    id : "klk_sv_1875",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1876 = {
    title : "1876",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1876",
    id : "klk_sv_1876",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1877 = {
    title : "1877",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1877",
    id : "klk_sv_1877",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1878 = {
    title : "1878",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1878",
    id : "klk_sv_1878",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1879 = {
    title : "1879",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1879",
    id : "klk_sv_1879",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1880 = {
    title : "1880",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1880",
    id : "klk_sv_1880",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1881 = {
    title : "1881",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1881",
    id : "klk_sv_1881",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1882 = {
    title : "1882",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1882",
    id : "klk_sv_1882",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1883 = {
    title : "1883",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1883",
    id : "klk_sv_1883",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1884 = {
    title : "1884",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1884",
    id : "klk_sv_1884",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1885 = {
    title : "1885",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1885",
    id : "klk_sv_1885",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1886 = {
    title : "1886",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1886",
    id : "klk_sv_1886",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1887 = {
    title : "1887",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1887",
    id : "klk_sv_1887",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1888 = {
    title : "1888",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1888",
    id : "klk_sv_1888",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1889 = {
    title : "1889",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1889",
    id : "klk_sv_1889",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1890 = {
    title : "1890",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1890",
    id : "klk_sv_1890",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1891 = {
    title : "1891",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1891",
    id : "klk_sv_1891",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1892 = {
    title : "1892",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1892",
    id : "klk_sv_1892",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1893 = {
    title : "1893",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1893",
    id : "klk_sv_1893",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1894 = {
    title : "1894",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1894",
    id : "klk_sv_1894",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1895 = {
    title : "1895",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1895",
    id : "klk_sv_1895",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1896 = {
    title : "1896",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1896",
    id : "klk_sv_1896",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1897 = {
    title : "1897",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1897",
    id : "klk_sv_1897",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1898 = {
    title : "1898",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1898",
    id : "klk_sv_1898",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1899 = {
    title : "1899",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1899",
    id : "klk_sv_1899",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1900 = {
    title : "1900",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1900",
    id : "klk_sv_1900",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1901 = {
    title : "1901",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1901",
    id : "klk_sv_1901",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1902 = {
    title : "1902",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1902",
    id : "klk_sv_1902",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1903 = {
    title : "1903",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1903",
    id : "klk_sv_1903",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1904 = {
    title : "1904",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1904",
    id : "klk_sv_1904",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1905 = {
    title : "1905",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1905",
    id : "klk_sv_1905",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1906 = {
    title : "1906",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1906",
    id : "klk_sv_1906",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1907 = {
    title : "1907",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1907",
    id : "klk_sv_1907",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1908 = {
    title : "1908",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1908",
    id : "klk_sv_1908",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1909 = {
    title : "1909",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1909",
    id : "klk_sv_1909",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1910 = {
    title : "1910",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1910",
    id : "klk_sv_1910",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1911 = {
    title : "1911",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1911",
    id : "klk_sv_1911",
    within : settings.spWithin,
    context : settings.spContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1912 = {
    title : "1912",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1912",
    id : "klk_sv_1912",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1913 = {
    title : "1913",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1913",
    id : "klk_sv_1913",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1914 = {
    title : "1914",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1914",
    id : "klk_sv_1914",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1915 = {
    title : "1915",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1915",
    id : "klk_sv_1915",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1916 = {
    title : "1916",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1916",
    id : "klk_sv_1916",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1917 = {
    title : "1917",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1917",
    id : "klk_sv_1917",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1918 = {
    title : "1918",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1918",
    id : "klk_sv_1918",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1919 = {
    title : "1919",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1919",
    id : "klk_sv_1919",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1920 = {
    title : "1920",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1920",
    id : "klk_sv_1920",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1921 = {
    title : "1921",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1921",
    id : "klk_sv_1921",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1922 = {
    title : "1922",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1922",
    id : "klk_sv_1922",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1923 = {
    title : "1923",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1923",
    id : "klk_sv_1923",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1924 = {
    title : "1924",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1924",
    id : "klk_sv_1924",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1925 = {
    title : "1925",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1925",
    id : "klk_sv_1925",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1926 = {
    title : "1926",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1926",
    id : "klk_sv_1926",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1927 = {
    title : "1927",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1927",
    id : "klk_sv_1927",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1928 = {
    title : "1928",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1928",
    id : "klk_sv_1928",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1929 = {
    title : "1929",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1929",
    id : "klk_sv_1929",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1930 = {
    title : "1930",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1930",
    id : "klk_sv_1930",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1931 = {
    title : "1931",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1931",
    id : "klk_sv_1931",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1932 = {
    title : "1932",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1932",
    id : "klk_sv_1932",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1933 = {
    title : "1933",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1933",
    id : "klk_sv_1933",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1934 = {
    title : "1934",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1934",
    id : "klk_sv_1934",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1935 = {
    title : "1935",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1935",
    id : "klk_sv_1935",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1936 = {
    title : "1936",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1936",
    id : "klk_sv_1936",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1937 = {
    title : "1937",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1937",
    id : "klk_sv_1937",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1938 = {
    title : "1938",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1938",
    id : "klk_sv_1938",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1939 = {
    title : "1939",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1939",
    id : "klk_sv_1939",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};


settings.corpora.klk_sv_1940 = {
    title : "1940",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1940",
    id : "klk_sv_1940",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1941 = {
    title : "1941",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1941",
    id : "klk_sv_1941",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1942 = {
    title : "1942",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1942",
    id : "klk_sv_1942",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1943 = {
    title : "1943",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1943",
    id : "klk_sv_1943",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1944 = {
    title : "1944",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1944",
    id : "klk_sv_1944",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1945 = {
    title : "1945",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1945",
    id : "klk_sv_1945",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1946 = {
    title : "1946",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1946",
    id : "klk_sv_1946",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1947 = {
    title : "1947",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1947",
    id : "klk_sv_1947",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1948 = {
    title : "1948",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1948",
    id : "klk_sv_1948",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1982 = {
    title : "1982",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1982",
    id : "klk_sv_1982",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1983 = {
    title : "1983",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1983",
    id : "klk_sv_1983",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};

settings.corpora.klk_sv_1986 = {
    title : "1986",
    description : "Ruotsinkielisiä sanoma- ja aikakauslehtiä vuodelta 1986",
    id : "klk_sv_1986",
    within : settings.defaultWithin,
    context : settings.defaultContext,
    attributes : klk_pos_attrs,
    struct_attributes : klk_struct_attrs
};



settings.corpusListing = new CorpusListing(settings.corpora);
