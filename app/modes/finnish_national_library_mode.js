
settings.primaryColor = "#cceecc";
settings.primaryLight = "#e2efe2";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

$("#lemgram_list_item").remove();
$("#results-lemgram").remove();
$("#showLineDiagram").remove();

klk_struct_attrs = {
    content_label : {
        label : "klk_label",
        opts : settings.defaultOptions,
    },
    content_publ_title : {
        label : "klk_publ_title",
        opts : settings.defaultOptions,
    },
    /*
    content_publ_part : {
        label : "klk_publ_part",
        opts : settings.defaultOptions,
    },
    */
    content_publ_id : {
        label : "klk_publ_id",
        opts : settings.defaultOptions,
    },
    content_issue_date : {
        label : "klk_issue_date",
        opts : settings.defaultOptions,
    },
    content_issue_no : {
        label : "klk_issue_no",
        opts : settings.defaultOptions,
    },
    content_issue_title : {
        label : "klk_issue_title",
        opts : settings.defaultOptions,
    },
    /*
    content_part_name : {
        label : "klk_part_name",
        opts : settings.defaultOptions,
    },
    */
    content_elec_date : {
        label : "klk_elec_date",
        opts : settings.defaultOptions,
    },
    content_language : {
        label : "klk_language",
        opts : settings.defaultOptions,
    },
    /*
    content_page_id : {
        label : "klk_page_id",
        opts : settings.defaultOptions,
    },
    */
    content_page_no : {
        label : "klk_page_no",
        opts : settings.defaultOptions,
    },
    content_sentcount : {
        label : "klk_sentcount",
        displayType : "hidden",
    },
    content_tokencount : {
        label : "klk_tokencount",
        displayType : "hidden",
    },
    content_img_url : {
        label : "klk_img_url",
        type : "url",
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


settings.corporafolders.klk_fi = {    
    title : "Suomenkieliset lehdet"
};


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

settings.corpusListing = new CorpusListing(settings.corpora);
