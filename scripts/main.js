
// onDOMReady
$(function(){
	$.ajaxSetup({ 
		dataType: "jsonp",
		traditional: true
	});
	
	var deferred_sm = $.Deferred(function( dfd ){
		$.sm("korp_statemachine.xml", dfd.resolve);
	}).promise();
	
	var deferred_load = $.Deferred(function( dfd ){
		$("#searchbar").load("searchbar.html", dfd.resolve);
    }).promise();
	
	// this fires only when both have been loaded. 
	$.when(deferred_load, deferred_sm).then(function() {
		$.log("content load and sm init");
		loadCorpora();
		
		$.sm.start();
		var tab_a_selector = 'ul.ui-tabs-nav a';

		$("#search-tab").tabs({
			event : "change",
			show : function() {
				var selected = $("#search-tab").children("div:visible").attr("id").split("-")[1];
				$.sm.send("searchtab." + selected);
			}
		});
		$("#result-container").tabs({
			event : "change",
			show : function() {
				var currentId = $("#result-container").children("div:visible").attr("id");
				if(currentId == null) return;
				var selected = currentId.split("-")[1];
				$.sm.send("resultstab." + selected);
			} 
		});
		
		var tabs = $(".ui-tabs");
		tabs.find( tab_a_selector ).click(function() {
			var state = {},
			id = $(this).closest( '.ui-tabs' ).attr( 'id' ),
			// Get the index of this tab.
			idx = $(this).parent().prevAll().length;
			
			// Set the state!
			state[ id ] = idx;
			$.bbq.pushState( state );
		});
		
		$(window).bind( 'hashchange', function(e) {
			var prevFragment = $.bbq.prevFragment || {};
			tabs.each(function() {
				var idx = e.getState( this.id, true ) || 0;
				$(this).find( tab_a_selector ).eq( idx ).triggerHandler( 'change' );
			});
			var page = e.getState("page", true) || 0;
			kwicResults.setPage(page);
			
			var corpus = e.getState("corpus");
			if (corpus && corpus.length != 0 && corpus != prevFragment["corpus"]){
				var corp_array = corpus.split(',');
				corpusChooserInstance.corpusChooser("selectItems",corp_array);
				$("#select_corpus").val(corpus);
				didSelectCorpus();
			}
			function isValid(searchCommand) {
				return searchCommand && searchCommand.length;
			}
			
//			var searches = ["word", "lemgram", "saldo", "cqp"];
			
//			$.each(searches, function(i, item) {
			var search = e.getState("search");
			if(search == null || search === prevFragment["search"]) {
				$.bbq.prevFragment = $.deparam.fragment();
				return;
			}
			
			var type = search.split("|")[0];
			var value = search.split("|")[1];
			
//			if(!isValid(value) || value == prevFragment[item]) return; 
			switch(type) {
			case "word":
				//$('input[type=text]').val(value);
				extendedSearch.setOneToken("word", value);
				$.sm.send("submit.kwic");
				break;
			case "lemgram":
				extendedSearch.setOneToken("lex", value);
				$.sm.send("submit.lemgram", value);
				break;
			case "saldo":
				extendedSearch.setOneToken("saldo", value);
				$.sm.send("submit.kwic");
				break;
			case "cqp":
				advancedSearch.setCQP(value);
				$.sm.send("submit.kwic");
				break;
			}
//			});
			$.bbq.prevFragment = $.deparam.fragment();
		});
		
		$("#result-container").click(function(){
			util.SelectionManager.deselect();
		});
//	setup language
		$("#languages").children().click(function(){
			$("#languages").children().removeClass("lang_selected");
			$(this).addClass("lang_selected");
			util.localize();
		});
		$("[data-lang=" + $.defaultLanguage.split("-")[0] + "]").click();
		
//	move out sidebar
		hideSidebar();
		
		$("#simple_text")[0].focus();
//		util.parseQuery();
		
		$(document).click(function() {
			$("#simple_text").autocomplete("close");
		});
		resetQuery();
		
		$(window).trigger("hashchange");
	});
});
