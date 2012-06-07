(function($) {
	$.localize = function(cmd, o) {
		if(!$.localize.data)
			$.localize.data = {"_all" : {}};

		if (cmd == "init") {
			var hasPkgs = $.any($.map(o.packages, function(item) {
				return !!$.localize.data[item]; 
			}));
			var dfds = [];
			// some language identifyer aliases
			var trans = {
				"swe"  : "sv",
				"sv" : "sv",
				"eng" : "en",
				"en" : "en"
			};
			var lang = o.language;
			if(lang in trans)
				lang = trans[o.language];
			$.localize.data.lang = lang;
			$.each(o.packages, function(i, pkg) {
				var file = pkg + "-" + lang + '.json';
				$.localize.data[pkg] = {};
				if (o.pathPrefix)
					file = o.pathPrefix + "/" + file;
				dfds.push($.ajax({
					url : file,
					dataType : "json",
					cache : false,
					success : function(data) {
						$.extend($.localize.data[pkg], data);
						$.extend($.localize.data["_all"], data);
					}
				}));

			});
			return $.when.apply($, dfds);
		} else if(cmd == "getLang") return $.localize.data.lang;

	};

	$.fn.localize = function() {
		//TODO: make this less slow.
		var data = $.localize.data["_all"];
		
		this.find("[rel^=localize]").each(function(i, elem) {
			var elem = $(elem);
			var key = elem.attr("rel").match(/localize\[(.*?)\]/)[1];
			var value = valueForKey(key, data);
			if (elem.is('input')) {
				elem.val(value);
			} else if (elem.is('optgroup')) {
				elem.attr("label", value);
			} else {
				elem.html(value);
			}

		});
		return this;
	};

	function valueForKey(key, data) {
		var keys = key.split(/\./);
		var value = data;
		while (keys.length > 0) {
			if (value) {
				value = value[keys.shift()];
			} else {
				return null;
			}
		}
		return value;
	}
})(jQuery);
