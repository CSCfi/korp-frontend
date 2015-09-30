(function() {
  var Sidebar;

  Sidebar = {
    options: {
      displayOrder: ["pos", "posset", "lemma", "lex", "saldo", "variants"].reverse()
    },
    _init: function() {},
    updateContent: function(sentenceData, wordData, corpus, tokens) {
      var corpusObj, sentence, word, _ref;
      this.element.html('<div id="selected_sentence" /><div id="selected_word" />');
      corpusObj = settings.corpora[corpus];
      $("<div />").html("<h4 rel='localize[corpus]'></h4> <p>" + corpusObj.title + "</p>").prependTo("#selected_sentence");
      if (!$.isEmptyObject(corpusObj.attributes)) {
        $("#selected_word").append($("<h4>").localeKey("word_attr"));
        this.renderCorpusContent("pos", wordData, sentenceData, corpusObj.attributes).appendTo("#selected_word");
      }
      if (!$.isEmptyObject(corpusObj.struct_attributes)) {
        $("#selected_sentence").append($("<h4>").localeKey("sentence_attr"));
        this.renderCorpusContent("struct", wordData, sentenceData, corpusObj.struct_attributes).appendTo("#selected_sentence");
      }
      if (!$.isEmptyObject(corpusObj.custom_attributes)) {
        _ref = this.renderCustomContent(wordData, sentenceData, corpusObj.custom_attributes), word = _ref[0], sentence = _ref[1];
        word.appendTo("#selected_word");
        sentence.appendTo("#selected_sentence");
      }
      this.element.localize();
      this.applyEllipse();
      if (corpusObj.attributes.deprel) {
        return this.renderGraph(tokens);
      }
    },
    renderGraph: function(tokens) {
      var outerW;
      outerW = $(window).width() - 80;
      return $("<span class='link show_deptree'>Visa träd</button>").localeKey("show_deptree").click(function() {
        var iframe, info;
        info = $("<span class='info' />");
        iframe = $('<iframe src="lib/deptrees/deptrees.html"></iframe>').css("width", outerW - 40).load(function() {
          var wnd;
          wnd = this.contentWindow;
          tokens = tokens;
          return wnd.draw_deptree.call(wnd, tokens, function(msg) {
            var type, val, _ref;
            _ref = _.head(_.pairs(msg)), type = _ref[0], val = _ref[1];
            return info.empty().append($("<span>").localeKey(type), $("<span>: </span>"), $("<span>").localeKey("" + type + "_" + val));
          });
        });
        return $("#deptree_popup").empty().append(info, iframe).dialog({
          height: 300,
          width: outerW
        }).parent().find(".ui-dialog-title").localeKey("dep_tree");
      }).appendTo(this.element);
    },
    renderCorpusContent: function(type, wordData, sentenceData, corpus_attrs) {
      var item, items, key, order, pairs, val, value, _i, _len, _ref, _ref1;
      if (type === "struct") {
        pairs = _.pairs(sentenceData);
      } else if (type === "pos") {
        pairs = _.pairs(wordData);
        _ref = wordData._struct || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _ref1 = item.split(" "), key = _ref1[0], val = _ref1[1];
          if (key in corpus_attrs) {
            pairs.push([key, val]);
          }
        }
      }
      order = this.options.displayOrder;
      pairs.sort(function(_arg, _arg1) {
        var a, b;
        a = _arg[0];
        b = _arg1[0];
        return $.inArray(b, order) - $.inArray(a, order);
      });
      items = (function() {
        var _j, _len1, _ref2, _results;
        _results = [];
        for (_j = 0, _len1 = pairs.length; _j < _len1; _j++) {
          _ref2 = pairs[_j], key = _ref2[0], value = _ref2[1];
          if (corpus_attrs[key]) {
            _results.push(this.renderItem(key, value, corpus_attrs[key], wordData, sentenceData));
          }
        }
        return _results;
      }).call(this);
      return $(items);
    },
    renderCustomContent: function(wordData, sentenceData, corpus_attrs) {
      var attrs, key, output, pos_items, struct_items;
      struct_items = [];
      pos_items = [];
      for (key in corpus_attrs) {
        attrs = corpus_attrs[key];
        output = this.renderItem(key, null, attrs, wordData, sentenceData);
        if (attrs.custom_type === "struct") {
          struct_items.push(output);
        } else if (attrs.custom_type === "pos") {
          pos_items.push(output);
        }
      }
      return [$(pos_items), $(struct_items)];
    },
    renderItem: function(key, value, attrs, wordData, sentenceData) {
      var address, getStringVal, inner, itr, li, lis, output, pattern, prefix, str_value, ul, val, valueArray, x;
      if (attrs.displayType === "hidden" || attrs.displayType === "date_interval") {
        return "";
      }
      output = $("<p><span rel='localize[" + attrs.label + "]'></span>: </p>");
      output.data("attrs", attrs);
      if (value === "|" || value === "") {
        output.append("<i rel='localize[empty]' style='color : grey'>${util.getLocaleString('empty')}</i>");
        return output;
      }
      if (attrs.type === "set") {
        pattern = attrs.pattern || '<span data-key="<% key %>"><%= val %></span>';
        ul = $("<ul>");
        getStringVal = function(str) {
          return _.reduce(_.invoke(_.invoke(str, "charCodeAt", 0), "toString"), function(a, b) {
            return a + b;
          });
        };
        valueArray = _.filter((value != null ? value.split("|") : void 0) || [], Boolean);
        if (key === "variants") {
          valueArray.sort(function(a, b) {
            var splita, splitb, strvala, strvalb;
            splita = util.splitLemgram(a);
            splitb = util.splitLemgram(b);
            strvala = getStringVal(splita.form) + splita.index + getStringVal(splita.pos);
            strvalb = getStringVal(splitb.form) + splitb.index + getStringVal(splitb.pos);
            return parseInt(strvala) - parseInt(strvalb);
          });
        }
        itr = _.isArray(valueArray) ? valueArray : _.values(valueArray);
        lis = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = itr.length; _i < _len; _i++) {
            x = itr[_i];
            if (!x.length) {
              continue;
            }
            val = (attrs.stringify || _.identity)(x);
            inner = $(_.template(pattern, {
              key: x,
              val: val
            }));
            if (attrs.translationKey != null) {
              prefix = attrs.translationKey || "";
              inner.localeKey(prefix + val);
            }
            li = $("<li></li>").data("key", x).append(inner);
            if (attrs.externalSearch) {
              address = _.template(attrs.externalSearch, {
                val: x
              });
              li.append($("<a href='" + address + "' class='external_link' target='_blank'></a>")).click(function(event) {
                return event.stopImmediatePropagation();
              });
            }
            if (attrs.internalSearch) {
              li.addClass("link").click(function() {
                var cqpVal;
                cqpVal = $(this).data("key");
                return search({
                  "search": "cqp|[" + key + " contains '" + cqpVal + "']"
                });
              });
            }
            _results.push(li);
          }
          return _results;
        })();
        ul.append(lis);
        output.append(ul);
        return output;
      }
      str_value = (attrs.stringify || _.identity)(value);
      if (attrs.type === "url") {
        return output.append("<a href='" + str_value + "' class='exturl sidebar_url' target='_blank'>" + (decodeURI(str_value)) + "</a>");
      } else if (key === "msd") {
        return output.append("<span class='msd'>" + str_value + "</span>\n    <a href='markup/msdtags.html' target='_blank'>\n        <span id='sidbar_info' class='ui-icon ui-icon-info'></span>\n    </a>\n</span>");
      } else if (attrs.pattern) {
        return output.append(_.template(attrs.pattern, {
          key: key,
          val: str_value,
          pos_attrs: wordData,
          struct_attrs: sentenceData
        }));
      } else {
        if (attrs.translationKey) {
          return output.append("<span rel='localize[" + attrs.translationKey + value + "]'></span>");
        } else {
          return output.append("<span>" + (str_value || '') + "</span>");
        }
      }
    },
    applyEllipse: function() {
      var totalWidth;
      totalWidth = this.element.width();
      return this.element.find(".sidebar_url").css("white-space", "nowrap").each(function() {
        var a, domain, midsection, oldtext, _results;
        _results = [];
        while ($(this).width() > totalWidth) {
          oldtext = $(this).text();
          a = $.trim(oldtext, "/").replace("...", "").split("/");
          domain = a.slice(2, 3);
          midsection = a.slice(3).join("/");
          midsection = "..." + midsection.slice(2);
          $(this).text(["http:/"].concat(domain, midsection).join("/"));
          if (midsection === "...") {
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    },
    _parseLemma: function(attr, tmplVal) {
      var seq;
      seq = [];
      if (attr != null) {
        seq = $.map(attr.split("|"), function(item) {
          var lemma;
          lemma = item.split(":")[0];
          if (tmplVal.pattern) {
            return $.format(tmplVal.pattern, [lemma, lemma]);
          } else {
            return lemma;
          }
        });
      }
      seq = $.grep(seq, function(itm) {
        return itm && itm.length;
      });
      return $.arrayToHTMLList(seq).outerHTML();
    },
    refreshContent: function(mode) {
      if (mode === "lemgramWarning") {
        return $.Deferred((function(_this) {
          return function(dfd) {
            return _this.element.load("markup/parse_warning.html", function() {
              util.localize();
              _this.element.addClass("ui-state-highlight").removeClass("kwic_sidebar");
              return dfd.resolve();
            });
          };
        })(this)).promise();
      } else {
        return this.element.removeClass("ui-state-highlight").addClass("kwic_sidebar");
      }
    },
    updatePlacement: function() {
      var max;
      max = Math.round($("#columns").position().top);
      if ($(window).scrollTop() < max) {
        return this.element.removeClass("fixed");
      } else {
        if ($("#left-column").height() > $("#sidebar").height()) {
          return this.element.addClass("fixed");
        }
      }
    }
  };

  $.widget("korp.sidebar", Sidebar);

  $.widget("korp.radioList", {
    options: {
      change: $.noop,
      separator: "|",
      selected: "default"
    },
    _create: function() {
      var self;
      this._super();
      self = this;
      $.each(this.element, function() {
        return $(this).children().wrap("<li />").click(function() {
          if (!$(this).is(".radioList_selected")) {
            self.select($(this).data("mode"));
            return self._trigger("change", $(this).data("mode"));
          }
        }).parent().prepend($("<span>").text(self.options.separator)).wrapAll("<ul class='inline_list' />");
      });
      this.element.find(".inline_list span:first").remove();
      return this.select(this.options.selected);
    },
    select: function(mode) {
      var target;
      this.options.selected = mode;
      target = this.element.find("a").filter(function() {
        return $(this).data("mode") === mode;
      });
      this.element.find(".radioList_selected").removeClass("radioList_selected");
      this.element.find(target).addClass("radioList_selected");
      return this.element;
    },
    getSelected: function() {
      return this.element.find(".radioList_selected");
    }
  });

  $.extend($.ui.autocomplete.prototype, {
    _renderItem: function(ul, item) {
      var li;
      li = $("<li></li>").data("ui-autocomplete-item", item).append($("<a></a>")[(this.options.html ? "html" : "text")](item.label)).appendTo(ul);
      if (!item["enabled"]) {
        li.addClass("autocomplete-item-disabled");
      }
      return li;
    },
    _renderMenu: function(ul, items) {
      var currentCategory, that;
      that = this;
      currentCategory = "";
      return $.each(items, function(index, item) {
        if (item.category && item.category !== currentCategory) {
          ul.append($("<li class='ui-autocomplete-category'></li>").localeKey(item.category));
          currentCategory = item.category;
        }
        return that._renderItem(ul, item);
      });
    }
  });

}).call(this);

//# sourceMappingURL=widgets.js.map
