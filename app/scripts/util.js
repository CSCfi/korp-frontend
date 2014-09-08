var util = {};
// <!-- SelectionManager
util.SelectionManager = function() {
	this.selected = $();
	this.aux = $();
};

util.SelectionManager.prototype.select = function(word, aux) {
	if(word == null || !word.length) return;
	if(this.selected.length) {
		this.selected.removeClass("word_selected token_selected");
		this.aux.removeClass("word_selected aux_selected");
	}
		
	this.selected = word;
	
	this.aux = aux || $();
	this.aux.addClass("word_selected aux_selected");
	return word.addClass("word_selected token_selected");
};
util.SelectionManager.prototype.deselect = function() {
	if(!this.selected.length) return;
	this.selected.removeClass("word_selected token_selected");
	this.selected = $();
	this.aux.removeClass("word_selected aux_selected");
	this.aux = $();
};
util.SelectionManager.prototype.hasSelected = function() {
	return this.selected.length > 0;
};
// SelectionManager -->

util.getLocaleString = function(key) {
	if(!$.localize.data) {
		c.error("Locale string cannot be found because no data file has been read.");
		return;
	}
	var output = $.localize.data.locale[key] || $.localize.data.corpora[key];
	if(output == null && key != null)
		return key;
//		$.error("Could not find translation key " + key);
	return output;
};
util.initLocalize = function() {
	return $.localize("init", {
		packages : ["locale", "corpora"],
		pathPrefix : "translations",
		language : $.bbq.getState("lang") || settings.defaultLanguage,
		callback : function() {
			if(this.is(".num_hits")) {
				var selected = this.find("option:selected");
				c.log("selected", selected, util.getLocaleString(this.data("prefix")) + ": " + selected.text());
				selected.text(util.getLocaleString(this.data("prefix")) + ": " + selected.text());
			}
			this.find("[data-placeholder]").add(this.filter("[data-placeholder]")).each(function() {
				$(this).attr("placeholder", util.getLocaleString($(this).data("placeholder")));
			});
		}
	});
};
//TODO: get rid of this
util.localize = function(root) {
	root = root || "body"; 
	$(root).localize();
};

util.lemgramToString = function(lemgram, appendIndex) {
	var infixIndex = "";
	if(util.isLemgramId(lemgram)) {
		var match = util.splitLemgram(lemgram);
		if(appendIndex != null && match.index != "1") {
			infixIndex = $.format("<sup>%s</sup>", match.index);
		}
		var concept = match.form.replace(/_/g, " ");
		var type = match.pos.slice(0, 2);
	}
	else { // missing from saldo, and has the form word_NN instead.
		var concept = "";
		var type = "";
		try {
			 concept = lemgram.split("_")[0];
			 type = lemgram.split("_")[1].toLowerCase();
		} catch(e) {
			c.log("lemgramToString broken for ", lemgram);
		}
	}
	return $.format("%s%s <span class='wordclass_suffix'>(<span rel='localize[%s]'>%s</span>)</span>", 
			[concept, infixIndex, type, util.getLocaleString(type)]);
};

util.saldoRegExp = /(.*?)\.\.(\d\d?)(\:\d+)?$/;
util.saldoToString = function(saldoId, appendIndex) {
	var match = saldoId.match(util.saldoRegExp);
	var infixIndex = "";
	if(appendIndex != null && match[2] != "1")
		infixIndex = $.format("<sup>%s</sup>", match[2]);
	return $.format("%s%s", [match[1].replace(/_/g, " "), infixIndex]);
};
util.sblexArraytoString = function(idArray, labelFunction) {
	labelFunction = labelFunction || util.lemgramToString;
	var tempArray = $.map(idArray, function(lemgram){
		return labelFunction(lemgram, false);
	});
	return $.map(idArray, function(lemgram) {
		var isAmbigous = $.grep(tempArray, function(tempLemgram) {
			return tempLemgram == labelFunction(lemgram, false);
		}).length > 1;
		return labelFunction(lemgram, isAmbigous);
	});
};

util.lemgramRegexp = /\.\.\w+\.\d\d?(\:\d+)?$/;
util.isLemgramId = function(lemgram) {
	return lemgram.search(util.lemgramRegexp) != -1;
};
util.splitLemgram = function(lemgram) {
	if(!util.isLemgramId(lemgram)) {
		throw new Error("Input to util.splitLemgram is not a lemgram: " + lemgram);
		return;
	}
	var keys = ["morph", "form", "pos", "index", "startIndex"];
	var splitArray = lemgram.match(/((\w+)--)?(.*?)\.\.(\w+)\.(\d\d?)(\:\d+)?$/).slice(2);
	
	return _.object(keys, splitArray);
};

util.splitSaldo = function(saldo) {
	return saldo.match(util.saldoRegExp);
};

util.setJsonLink = function(settings){
	if(settings == null) {
		c.log("failed to update json link");
		return;
	}
	$('#json-link').attr('href', settings.url);
	$('#json-link').attr('title', 'JSON');
	$('#json-link').attr('rel', 'localize[formatdescr_json]');
	$('#json-link').localize();
	$('#json-link').show();
};

// Add download links for other formats, defined in
// settings.downloadFormats (Jyrki Niemi <jyrki.niemi@helsinki.fi>
// 2014-02-26/04-30)
util.setDownloadLinks = function(xhr_settings, result_data) {
    c.log("setDownloadLinks data:", result_data);
    $('#download-links').empty();
    for (var i = 0; i < settings.downloadFormats.length; i++) {
	var format = settings.downloadFormats[i];
	var link_id = format + '-link'
	// NOTE: Using attribute rel="localize[...]" to localize the
	// title attribute requires a small change to
	// lib/jquery.localize.js. Without that, we could use
	// util.getLocaleString, but it would not change the
	// localizations immediately when switching languages but only
	// after reloading the page.
	// // var title = util.getLocaleString('formatdescr_' + format);
	$('#download-links').append('<a href="javascript:" '
				    + ' id="' + link_id + '"'
				    + ' title="' + format + '"'
				    + ' rel="localize[formatdescr_' + format + ']"'
				    + ' class="download_link"><img src="img/'
				    + format + '.png" alt="'
				    + format.toUpperCase() + '" /></a>');
	var download_params = {
	    query_params: JSON.stringify(
		$.deparam.querystring(xhr_settings.url)),
	    // For large results in particular, it seems to be faster
	    // to perform the query again via korp_download.cgi than
	    // to pass the (processed) query result here. However, for
	    // a search with a large number of hits and a relatively
	    // small number of hits shown, it might be more efficient
	    // to pass the query result. Should we do differently
	    // depending on the size of the query result?
	    // query_result: JSON.stringify(result_data),
	    format: format,
	    korp_url: window.location.href,
	    korp_server_url: settings.cgi_script
	};
	if ('downloadFormatParams' in settings) {
	    if ('*' in settings.downloadFormatParams) {
		$.extend(download_params, settings.downloadFormatParams['*']);
	    }
	    if (format in settings.downloadFormatParams) {
		$.extend(download_params,
			 settings.downloadFormatParams[format]);
	    }
	}
	$('#' + link_id).click(
	    (function(params) {
		return function(e) {
		    $.generateFile(settings.download_cgi_script, params);
		    e.preventDefault();
		};
	    })(download_params));
    }
    $('#download-links').localize();
    $('#download-links').show();
    $('#download-links-container').show();
};

util.searchHash = function(type, value) {
	$.bbq.pushState({search: type + "|" + value, page : 0});
};



function loadCorporaFolderRecursive(first_level, folder) {

    // Format the possible licence type information to be suffixed to
    // the corpus name in the corpus selector. <span class="..."> does
    // not seem to work correctly here; it probably disturbs
    // transforming the corpus selector. (janiemi 2014-02-06)
    var format_licence_type = function(corpus_id) {
	var licence_type = settings.corpora[corpus_id]["licence_type"];
	c.log("licence_type", corpus_id, licence_type);
	return (licence_type ? ' [' + licence_type.toUpperCase() + ']' : "");
    }

	var outHTML;
	if (first_level) 
		outHTML = '<ul>';
	else {
	    // KLUDGE: Mark unselected folders in description (janiemi 2013-12-19)
	    outHTML = ('<ul title="' + folder.title
		       + '" description="' + (folder.description || "")
		       + (folder.info && settings.corpusExtraInfo
			  ? ((folder.description ? "<br/><br/>" : "")
			     + util.formatCorpusExtraInfo(
				 folder.info,
				 settings.corpusExtraInfo.corpus_infobox))
			  : "")
		       + (folder.unselected ? "### unselected" : "")
		       + '">');
	}
	if(folder) { //This check makes the code work even if there isn't a ___settings.corporafolders = {};___ in config.js
		// Folders
		$.each(folder, function(fol, folVal) {
			if (fol != "contents" && fol != "title"
			    && fol != "description" && fol != "unselected"
			    && fol != "info")
				outHTML += '<li>' + loadCorporaFolderRecursive(false, folVal) + "</li>";
		});
		// Corpora
		if (folder["contents"] && folder["contents"].length > 0) {
			$.each(folder.contents, function(key, value) {
				outHTML += '<li id="' + value + '">' + settings.corpora[value]["title"]
				+ format_licence_type(value) + '</li>';
				added_corpora_ids.push(value);
				
			});
		}
	}
	
	if(first_level) {
		// Add all corpora which have not been added to a corpus
		searchloop: for (var val in settings.corpora) {
			for (var usedid in added_corpora_ids) {
				if (added_corpora_ids[usedid] == val || settings.corpora[val].hide) {
					continue searchloop;
				}
			}
			// Add it anyway:
			outHTML += '<li id="' + val + '">' + settings.corpora[val].title + format_licence_type(val) + '</li>';
		}
	}
	outHTML += "</ul>";
	return outHTML;
}
// Helper function to turn 1.2345 into 1,2345 (locale dependent)
util.localizeFloat = function(float, nDec) {
	var lang = $("#languages").radioList("getSelected").data("lang");
	var sep = null;
	nDec = nDec || float.toString().split(".")[1].length;
	
	if(lang == "sv" || lang == "fi") {
		sep = ",";
	} else if(lang == "en") {
		sep = ".";
	}
	return $.format("%." + nDec + "f", float).replace(".", sep);
};

util.formatDecimalString = function(x, mode, statsmode) { // Use "," instead of "." if Swedish, if mode is
	// Split the string into two parts
	if(_.contains(x, ".")) {
    	var parts = x.split(".");
    	var decimalSeparator = util.getLocaleString("util_decimalseparator");
    	if(mode)
    		return prettyNumbers(parts[0]) + '<span rel="localize[util_decimalseparator]">' + decimalSeparator + '</span>' + parts[1];
    		//return x.replace(".",'<span rel="localize[util_decimalseparator]">' + decimalSeparator + '</span>');
    	else
    		return prettyNumbers(parts[0]) + decimalSeparator + parts[1];
    		//return x.replace(".", decimalSeparator);
	} else {
	    if(statsmode) {
	       return x;
	    } else {
	       return prettyNumbers(x);
	    }
	}
};


/* Helper function to turn "8455999" into "8 455 999" */
function prettyNumbers(numstring) {
	var regex = /(\d+)(\d{3})/;
	var outStrNum = numstring.toString();
  	while (regex.test(outStrNum)) {
    	outStrNum = outStrNum.replace(regex, '$1' + '<span rel="localize[util_numbergroupseparator]">' + util.getLocaleString("util_numbergroupseparator") + '</span>' + '$2');
  	}
  	return outStrNum;
}

/* Goes through the settings.corporafolders and recursively adds the settings.corpora hierarchically to the corpus chooser widget */
function loadCorpora() {
	added_corpora_ids = [];
	var outStr = loadCorporaFolderRecursive(true, settings.corporafolders);
	corpusChooserInstance = $('#corpusbox')
	.corpusChooser({
		template: outStr, 
	    infoPopup: function(corpusID) {
	    	var corpusObj = settings.corpora[corpusID];
	    	var maybeInfo = "";
	    	if(corpusObj.description)
	    		maybeInfo = "<br/><br/>" + corpusObj.description;
		var corpusExtraInfo = 
		    (settings.corpusExtraInfo
		     ? util.formatCorpusExtraInfo(
			 corpusObj, settings.corpusExtraInfo.corpus_infobox)
		     : undefined);
		if (corpusExtraInfo) {
		    maybeInfo += ((maybeInfo ? "<br/><br/>" : "")
				  + corpusExtraInfo);
		}
	    	var numTokens = corpusObj["info"]["Size"];
	    	var numSentences = corpusObj["info"]["Sentences"];
	    	var lastUpdate = corpusObj["info"]["Updated"];
	    	if (!lastUpdate) {
	       	    lastUpdate = "?";
	    	}
	    	var sentenceString = "-";
	    	if (numSentences)
	    		sentenceString = prettyNumbers(numSentences.toString());
	    	var output = '<b><img src="img/korp_icon.png" style="margin-right:4px; width:24px; height:24px; vertical-align:middle; margin-top:-1px"/>' +
	    	corpusObj.title + "</b>" + maybeInfo + "<br/><br/>" + util.getLocaleString("corpselector_numberoftokens") + 
	    	": <b>" + prettyNumbers(numTokens) + "</b><br/>" + util.getLocaleString("corpselector_numberofsentences") + ": <b>" + sentenceString + 
	    	"</b><br/>" + util.getLocaleString("corpselector_lastupdate") + ": <b>" + lastUpdate + "</b><br/><br/>";
	    	
	    	var supportsContext = _.keys(corpusObj.context).length > 1;
	    	if(supportsContext)
	    		output += $("<div>").localeKey("corpselector_supports").html();
	    	
	    	if(corpusObj.limited_access)
	    		output += $("<div>").localeKey("corpselector_limited").html();

	    	return output;
	    	
	    	
	    	
	    }, 
	    infoPopupFolder: function(indata) {
	    	var corporaID = indata.corporaID;
	    	var desc = indata.description;
	    	var totalTokens = 0;
	    	var totalSentences = 0;
	    	var missingSentenceData = false;
	    	$(corporaID).each(function(key,oneID) {
	    		totalTokens += parseInt(settings.corpora[oneID]["info"]["Size"]);
	    		var oneCorpusSentences = settings.corpora[oneID]["info"]["Sentences"];
	    		if (oneCorpusSentences)
	    			totalSentences += parseInt(oneCorpusSentences);
	    		else
	    			missingSentenceData = true;
	    	});
	    	var totalSentencesString = prettyNumbers(totalSentences.toString());
	    	if (missingSentenceData)
	    		totalSentencesString += "+";
	    	var maybeInfo = "";
	    	if(desc && desc != "")
	    		maybeInfo = desc + "<br/><br/>";
	    	var glueString = "";
	    	if(corporaID.length == 1)
	    		glueString = util.getLocaleString("corpselector_corporawith_sing");
	    	else
	    		glueString = util.getLocaleString("corpselector_corporawith_plur");
	    	return '<b><img src="img/folder.png" style="margin-right:4px; vertical-align:middle; margin-top:-1px"/>' + indata.title + 
	    	"</b><br/><br/>" + maybeInfo + "<b>" + corporaID.length + "</b> " + glueString + ":<br/><br/><b>" + prettyNumbers(totalTokens.toString()) + 
	    	"</b> " + util.getLocaleString("corpselector_tokens") + "<br/><b>" + totalSentencesString + "</b> " + util.getLocaleString("corpselector_sentences");
	    }
    }).bind("corpuschooserchange", function(evt, corpora) {
    	c.log("corpuschooserchange", corpora)
    	// c.log("corpus changed", corpora);
		settings.corpusListing.select(corpora);
		// if(_.keys(corpora).length < _.keys(settings.corpora).length) {
		// 	$.bbq.pushState({"corpus" : corpora.join(",")});
		// }
		var nonprotected = _.pluck(settings.corpusListing.getNonProtected(), "id")
		if(corpora.length && _.intersection(corpora, nonprotected).length != nonprotected.length) {
	        $.bbq.pushState({"corpus" : corpora.join(",")})
	        // search({"corpus" : corpora.join(",")})
		} else {
	        $.bbq.removeState("corpus")
		}
		if(corpora.length) {
			if(currentMode == "parallel")
				extendedSearch.reset();
			else 
				extendedSearch.refreshTokens();
			view.updateReduceSelect();
			view.updateContextSelect("within");
//			view.updateContextSelect("context");
		}
		var enableSearch = !!corpora.length;
		view.enableSearch(enableSearch);
    });
	settings.corpusListing.select(corpusChooserInstance.corpusChooser("selectedItems"));
}


util.makeAttrSelect = function(groups) {
	var arg_select = $("<select/>");
	$.each(groups, function(lbl, group) {
		if($.isEmptyObject(group)) {
			return;
		}
		var optgroup = $("<optgroup/>", {label : util.getLocaleString(lbl).toLowerCase(), "rel" : $.format("localize[%s]", lbl)})
		.appendTo(arg_select);
		$.each(group, function(key, val) {
			if(val.displayType == "hidden")
				return;
			
			$('<option/>',{rel : $.format("localize[%s]", val.label)})
			.val(key).text(util.getLocaleString(val.label) || "")
			.appendTo(optgroup)
			.data("dataProvider", val);

		});
	});
	return arg_select;
};

function regescape(s) {
    return s.replace(/[\.|\?|\+|\*|\|\'|\"\(\)\^\$]/g, "\\$&");
}

util.browserWarn = function() {
	$.reject({
		reject : {
			all : false,
			msie5 : true, msie6 : true, msie7 : true, msie8 : true
		},
		imagePath : "img/browsers/",
		display: ['firefox','chrome','safari','opera'],
		browserInfo: { // Settings for which browsers to display   
	        firefox: {   
	            text: 'Firefox', // Text below the icon   
	            url: 'http://www.mozilla.com/firefox/' // URL For icon/text link   
	        },   
	        safari: {   
	            text: 'Safari',   
	            url: 'http://www.apple.com/safari/download/'   
	        },   
	        opera: {   
	            text: 'Opera',   
	            url: 'http://www.opera.com/download/'   
	        },   
	        chrome: {   
	            text: 'Chrome',   
	            url: 'http://www.google.com/chrome/'   
	        }
	        ,   
	        msie: {   
	            text: 'Internet Explorer',   
	            url: 'http://www.microsoft.com/windows/Internet-explorer/'   
	        }
		},
		header: 'Du använder en omodern webbläsare', // Header of pop-up window   
	    paragraph1: 'Korp använder sig av moderna webbteknologier som inte stödjs av din webbläsare. En lista på de mest populära moderna alternativen visas nedan. Firefox rekommenderas varmt.', // Paragraph 1   
	    paragraph2: '', // Paragraph 2
	    closeMessage: 'Du kan fortsätta ändå – all funktionalitet är densamma – men så fort du önskar att Korp vore snyggare och snabbare är det bara att installera Firefox, det tar bara en minut.', // Message displayed below closing link   
	    closeLink: 'Stäng varningen', // Text for closing link   
//		header: 'Did you know that your Internet Browser is out of date?', // Header of pop-up window   
//	    paragraph1: 'Your browser is out of date, and may not be compatible with our website. A list of the most popular web browsers can be found below.', // Paragraph 1   
//	    paragraph2: 'Just click on the icons to get to the download page', // Paragraph 2
//	    closeMessage: 'By closing this window you acknowledge that your experience on this website may be degraded', // Message displayed below closing link   
//	    closeLink: 'Close This Window', // Text for closing link
    	closeCookie: true, // If cookies should be used to remmember if the window was closed (see cookieSettings for more options)   
        // Cookie settings are only used if closeCookie is true   
        cookieSettings: {   
            path: '/', // Path for the cookie to be saved on (should be root domain in most cases)   
            expires: 100000 // Expiration Date (in seconds), 0 (default) means it ends with the current session   
        }   
	});
};
// singleton for getting colors. use syntax util.colors.getNext()
util.colors = function() {
	util.colors = this;
	this.c = ["color_blue","color_purple","color_green","color_yellow","color_azure","color_red"];
	this.n = -1;
	this.getNext = function() {
		return this.c[++this.n % this.c.length];
	};
};
util.colors();

//from http://plugins.jquery.com/files/jquery.color.js.txt
//Parse strings looking for color tuples [255,255,255]
util.getRGB = function(color) {
	var result;

	// Check if we're already dealing with an array of colors
	if ( color && color.constructor == Array && color.length == 3 )
		return color;

	// Look for rgb(num,num,num)
	if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
		return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

	// Look for rgb(num%,num%,num%)
	if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
		return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

	// Look for #a0b1c2
	if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
		return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

	// Look for #fff
	if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
		return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

	// Otherwise, we're most likely dealing with a named color
	return colors[jQuery.trim(color).toLowerCase()];
};

util.changeColor = function(rgbstr, incr) {
	var rgb = util.getRGB(rgbstr);
    for(var i = 0; i < rgb.length; i++){
        rgb[i] = Math.max(0, Math.min(rgb[i] + incr, 255));
    }
    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
};


util.setLogin = function() {
	c.log("login success");
	$("body").toggleClass("logged_in not_logged_in");
	$.each(authenticationProxy.loginObj.credentials, function(i, item) {
		$($.format("#hpcorpus_%s", item.toLowerCase())).closest(".boxdiv.disabled").removeClass("disabled");
	});
	$("#log_out .usrname").text(authenticationProxy.loginObj.name);
	$(".err_msg", self).hide();
};



util.convertLMFFeatsToObjects = function(structure, key) {
	   // Recursively traverse a tree, expanding each "feat" array into a real object, with the key "feat-[att]":

	   if(structure != null) {
	       var output = null;

	       var theType = util.findoutType(structure);
	       if( theType == "object" ) {
	           output = {}

	           $.each(structure, function(inkey, inval) {
	               if( inkey == "feat" ) {

	                   var innerType = util.findoutType(inval);

	                   if( innerType == "array" ) {
	                       $.each(inval, function(fkey, fval) {
	                           var keyName = "feat_" + fval["att"];
	                           if( output[keyName] === undefined ) {
	                               output[keyName] = fval["val"];
	                           } else {
	                               if( $.isArray(output[keyName]) ) {
	                                   output[keyName].push(fval["val"]);
	                               } else {
	                                   var dummy = output[keyName];
	                                   output[keyName] = new Array();
	                                   output[keyName].push(dummy);
	                                   output[keyName].push(fval["val"]);
	                               }
	                           }
	                       });
	                   } else {
	                       var keyName = "feat_" + inval["att"];
	                       if( output[keyName] === undefined ) {
	                           output[keyName] = inval["val"];
	                       } else {
	                           if( $.isArray(output[keyName]) ) {
	                               output[keyName].push(inval["val"]);
	                           } else {
	                               var dummy = output[keyName];
	                               output[keyName] = new Array();
	                               output[keyName].push(dummy);
	                               output[keyName].push(inval["val"]);
	                           }
	                       }
	                   }

	               } else {
	                   output[inkey] = util.convertLMFFeatsToObjects(inval);
	               }
	           });

	       } else if( theType == "array" ) {
	           var dArr = new Array();
	           $.each(structure, function(inkey, inval) {
	               dArr.push(util.convertLMFFeatsToObjects(inval));
	           });
	           output = dArr;
	       } else {
	           output = structure;
	       }

	       return output;
	   } else {
	       return null;
	   }
	}

util.findoutType = function(variable) {
	   if( $.isArray(variable) ) {
	       return "array";
	   } else {
	       return typeof(variable);
	   }
	};


// Format extra information associated with a corpus object, typically
// a URN, licence information and various links. An optional second
// argument specifies a list of items (properties in the corpus
// configuration) to be formatted.
//
// The properties are usually composite objects which may contain the
// properties "name", "description" (not currently handled) and "url"
// or "urn". If the information contains "name", it is presented as
// follows: a label and a colon (unless the property "no_label" is
// true or the item is "homepage"), followed by the name as a link to
// the URN or URL (or if neither URN nor URL, no link). Otherwise, the
// label is a link to the URN or URL. The label is the localized
// string for the key "corpus_" + item name.
//
// If an item needs no separate name, the simple properties X_urn and
// X_url can be used instead of X: { urn: ... } (similarly for url).
// The item "urn" is treated specially: it shows the value of the
// "urn" property as the link text.

util.formatCorpusExtraInfo = function (corpusObj) {
    var info_items = (arguments.length > 1 && arguments[1]
                      ? arguments[1]
                      : ["urn", "metadata", "licence", "homepage", "compiler"]);

    // Get the value of a URN (preferred, prefixed with resolver URL)
    // or URL property in obj. The optional second argument specifies
    // the property name prefix to "urn" or "url".
    var getUrnOrUrl = function (obj) {
        var prefix = arguments.length > 1 ? arguments[1] : "";
        return (prefix + "urn" in obj
                ? settings.urnResolver + obj[prefix + "urn"]
                : obj[prefix + "url"]);
    };

    // Return a HTML link (or text) given link_info, which may contain
    // the properties "label", "url" and "text".
    var makeLinkItem = function (link_info) {
        var result = "";
        if (link_info.label) {
            result += link_info.label + ": ";
        }
        if (link_info.url) {
            result += ("<a href='" + link_info.url + "' target='_blank'>"
                       + link_info.text + "</a>");
        } else if (link_info.text) {
            result += link_info.text;
        }
        return result;
    };

    var result = "";
    for (var i = 0; i < info_items.length; i++) {
        var info_item = info_items[i];
        var link_info = {};
        var label = "";
        // Use rel='localize[...]' instead of util.getLocaleString, so
        // that the texts are re-localized immediately when switching
        // languages.
        label = ("<span rel='localize[corpus_" + info_item + "]'>"
                 + "Corpus " + info_item + "</span>");
        if (info_item == "urn" && corpusObj.urn) {
            link_info = { url: settings.urnResolver + corpusObj.urn,
                          text: corpusObj.urn,
                          label: label };
        } else if (info_item == "homepage" && ! ("homepage" in corpusObj)
                   && corpusObj.url) {
            // Assume that the top-level property "url" refers to the
            // home page of the corpus (unless the there is a property
            // "homepage").
            link_info = { url: corpusObj.url,
                          text: label };
        } else if (corpusObj[info_item]) {
            info_obj = corpusObj[info_item];
            link_info = { url: getUrnOrUrl(info_obj) };
            if (info_obj.name) {
                link_info.text = info_obj.name;
                if (! info_obj.no_label) {
                    link_info.label = label;
                }
            } else {
                link_info.text = label;
            }
        } else if (corpusObj[info_item + "_urn"]
                   || corpusObj[info_item + "_url"]) {
            // Simple *_urn or *_url properties
            link_info = { url: getUrnOrUrl(corpusObj, info_item + "_"),
                          text: label };
        }
        if (link_info.url || link_info.text) {
            if (result) {
                result += "<br/>";
            }
            result += makeLinkItem(link_info);
        }
    }           
    return result;
};


// Copy information from the "info" property of corpusObj to the top
// level of corpusObj. This information may come from the backend
// .info file or database. The same information can also be specified
// in top-level properties of the frontend config file, but the
// information from "info" overrides them, so that this information
// can be accessed uniformly through the top-level properties. A
// property name may contain a prefix indicating a section (Metadata,
// Licence or Compiler): these are converted to separate composite
// objects in corpusObj. For example, Licence_URL: X, Licence_Name: Y
// is converted to licence : { url: X, name: Y }.

util.copyCorpusInfoToConfig = function (corpusObj) {
    var info_key_sects = ["", "Metadata", "Licence", "Compiler"];
    var info_subkeys = ["Name", "Description", "URN", "URL"];
    var corpusInfo = corpusObj.info;
    for (var i = 0; i < info_key_sects.length; i++) {
        var sect = info_key_sects[i];
        var sect_name = sect.toLowerCase();
        var subobj = corpusObj;
        if (sect != "") {
            subobj = (sect_name in corpusObj ? corpusObj[sect_name] : {});
        }
        var info_key_prefix = sect + (sect == "" ? "" : "_");
        var added_properties = false;
        for (var j = 0; j < info_subkeys.length; j++) {
            var key = info_subkeys[j];
            var subkey = key.toLowerCase();
            var value = corpusInfo[info_key_prefix + key];
            if (value) {
                subobj[subkey] = value;
                added_properties = true;
            }
        }
        // Add only non-empty subobjects
        if (sect != "" && added_properties) {
            corpusObj[sect_name] = subobj;
        }
    }
}


// Propagate information in the properties of info to corpusFolder,
// all its subfolders (recursively) and corpora. Info items lower in
// the corpus folder tree override those from above.

util.propagateCorpusFolderInfo = function (corpusFolder, info) {

    // Copy properties from info to corpusConfig if they are missing
    // from corpusConfig. A composite property in corpusConfg
    // overrides all the values in info (coming from folder info).
    var addCorpusInfo = function (corpusConfig, info) {
	for (var prop_name in info) {
	    if (! (prop_name in corpusConfig)) {
		corpusConfig[prop_name] = info[prop_name];
	    }
	}
    };

    // The info in this folder overrides that coming from above
    if (corpusFolder.info) {
	info = $.extend(true, {}, info || {}, corpusFolder.info);
    }
    // Add or modify the info in this folder
    if (info) {
	corpusFolder.info = info;
    }
    // Propagate the info to the corpora in this folder
    if (info && corpusFolder.contents) {
	for (var i = 0; i < corpusFolder.contents.length; i++) {
	    addCorpusInfo(settings.corpora[corpusFolder.contents[i]], info);
	}
    }
    // Recursively process subfolders and propagate the info
    for (var prop_name in corpusFolder) {
	if (prop_name != "title" && prop_name != "description"
	    && prop_name != "contents" && prop_name != "unselected"
	    && prop_name != "info") {
	    c.log("propagate ", prop_name)
	    util.propagateCorpusFolderInfo(corpusFolder[prop_name], info);
	}
    }
}


// Initialize the link_attributes properties in all the corpora in
// settings.corpora.
util.initCorpusSettingsLinkAttrs = function () {
    for (var corpus in settings.corpora) {
        util.extractLinkAttrs(settings.corpora[corpus])
    }
};


// Initialize the link_attributes property in corpusInfo to contain
// the attributes with type "url" and url_opts.in_link_section true.
// These attributes are shown in a separate section in the sidebar.
// The original attributes are marked as hidden.
util.extractLinkAttrs = function (corpusInfo) {
    var extractLinkAttrs = function (attrs, link_attrs) {
        if (attrs !== undefined) {
            for (var attrname in attrs) {
		var attr = attrs[attrname]
                if (attr.type == "url" && attr.url_opts !== undefined
		    && attr.url_opts.in_link_section) {
                    link_attrs[attrname] = $.extend(true, {}, attr);
		    // The original attribute cannot be deleted
		    // (without making more modifications elsewhere)
		    // because Korp only requests from the backend the
		    // attributes mentioned in attributes or
		    // struct_attributes.
		    attrs[attrname].displayType = "hidden";
                }
            }
        }
    }
    var link_attrs = {};
    extractLinkAttrs(corpusInfo.attributes, link_attrs);
    extractLinkAttrs(corpusInfo.struct_attributes, link_attrs);
    corpusInfo.link_attributes = link_attrs;
};
