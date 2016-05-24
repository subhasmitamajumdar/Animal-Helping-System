(function() {
  var AbstractShape, Accordion, AccordionHorizontal, BreadCrumbs, BrowserChrome, BulletList, Button, ButtonBar, Callout, CardStack, Chart, CheckBox, CheckBoxGroup, CloseIcon, ColorPicker, ComboBox, DataGrid, DateChooser, DateField, Diamond, Ellipse, FlairComponentsGroup, GoogleMap, GroupBox, HorizontalRule, HotSpot, IPhoneBadge, IPhoneBar, IPhoneButtonBar, IPhoneCheckBox, IPhoneDotsBar, IPhoneHorizontalSlider, IPhoneLargeButton, IPhonePicker, IPhonePointyButton, IPhoneShell, IPhoneTableList, Icon, Image, Label, Line, Link, LinkBar, List, MenuBar, NumericStepper, Parallelogram, PasswordInput, Polygon, ProgressBar, RadioButtonGroup, RatingStars, Rectangle, ScratchOut, ScrollBar, Search, Slider, SpinningWheel, SplitterHorizontal, SplitterVertical, SubTitle, TabNavigator, TagCloud, Text, TextArea, TextInput, Title, TitleWindow, Tree, VerticalLabel, VideoPlayer, VolumeSlider, WebCamViewer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractShape = (function(_super) {
    __extends(AbstractShape, _super);

    function AbstractShape(definition) {
      this.definition = definition;
      AbstractShape.__super__.constructor.call(this, this.definition);
    }

    AbstractShape.prototype.attachTriggers = function() {
      var _this = this;
      this.labelHolder.on('click', function(event) {
        event.preventDefault();
        _this.dispatchEvent(MOUSE_CLICK, "", event);
        return false;
      });
      this.labelHolder.on('dblclick', function(event) {
        event.preventDefault();
        _this.dispatchEvent(MOUSE_DOUBLE_CLICK, "", event);
        return false;
      });
      this.labelHolder.on('mouseenter', function(event) {
        event.preventDefault();
        _this.dispatchEvent(MOUSE_ENTER, "", event);
        return false;
      });
      this.labelHolder.on('mouseleave', function(event) {
        event.preventDefault();
        _this.dispatchEvent(MOUSE_OUT, "", event);
        return false;
      });
      return this;
    };

    AbstractShape.prototype.onmouseleave = function(listener) {
      var _this = this;
      return this.labelHolder.on('mouseleave', function(event) {
        return listener(event);
      });
    };

    AbstractShape.prototype.doRenderProperties = function(e) {
      var p, props, v, _i, _len;
      props = PROPERTIES[this.className];
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        v = this.definition[p];
        switch (p) {
          case fb.StyleConstants.BOLD:
            e.css("font-weight", this.bold);
            break;
          case fb.StyleConstants.ITALIC:
            e.css("font-style", this.italic);
            break;
          case fb.StyleConstants.UNDERLINE:
            e.css("text-decoration", this.underline);
            break;
          case fb.StyleConstants.TEXTALIGN:
            e.css("text-align", this.textAlign);
            break;
          case fb.StyleConstants.LEADING:
            e.css("line-height", this.leading);
            break;
          case fb.StyleConstants.FONTSIZE:
            e.css("font-size", this.fontSize);
            break;
          case fb.StyleConstants.FONTCOLOR:
            e.css("color", this.fontColor);
            break;
          case fb.StyleConstants.FONTFAMILY:
            e.css("font-family", this.fontFamily);
        }
      }
      return this;
    };

    AbstractShape.prototype.doRenderProperty = function(p, v) {
      switch (p) {
        case fb.StyleConstants.BACKGROUNDCOLOR:
          return this.shape.attr("fill", v);
        case fb.StyleConstants.BACKGROUNDALPHA:
          return this.shape.attr("fill-opacity", v);
        case fb.StyleConstants.BORDERCOLOR:
          return this.shape.attr("stroke", v);
        case fb.StyleConstants.BORDERTHICKNESS:
          return this.shape.attr("stroke-width", v);
        case fb.StyleConstants.BOLD:
          return this.e.css("font-weight", v);
        case fb.StyleConstants.ITALIC:
          return this.e.css("font-style", v);
        case fb.StyleConstants.UNDERLINE:
          return this.e.css("text-decoration", v);
        case fb.StyleConstants.TEXTALIGN:
          return this.e.css("text-align", v);
        case fb.StyleConstants.FONTSIZE:
          return this.e.css("font-size", v);
        case fb.StyleConstants.FONTCOLOR:
          return this.e.css("color", v);
        case fb.StyleConstants.FONTFAMILY:
          return this.e.css("font-family", v);
      }
    };

    return AbstractShape;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.AbstractShape = AbstractShape;
  });

  Accordion = (function(_super) {
    var generateId;

    __extends(Accordion, _super);

    function Accordion(definition) {
      var t, tabids, thetabs, _i, _len;
      this.definition = definition;
      this.className = 'Accordion';
      Accordion.__super__.constructor.call(this, this.definition);
      this.tabs = unescape(this.definition.tabs).split(',');
      this.headerHeight = parseFloat(this.definition.headerHeight);
      this.showScrollbar = this.isTrue(this.definition.showScrollbar);
      this.tabComponentIds = [];
      if (this.definition.tabids == null) {
        this.definition.tabids = "";
      }
      thetabs = this.definition.tabids.split(";");
      for (_i = 0, _len = thetabs.length; _i < _len; _i++) {
        t = thetabs[_i];
        tabids = t.split(",");
        this.tabComponentIds.push(tabids);
      }
    }

    Accordion.prototype.doRender = function(e) {
      var content, i, label, self, tab, _i, _j, _len, _len1, _ref, _ref1;
      this.labels = [];
      content = $('<ul>');
      _ref = this.tabs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tab = _ref[_i];
        label = new fb.LabeledObject(tab, this);
        this.labels.push(label);
      }
      i = 0;
      this.selectedIndex = i;
      _ref1 = this.labels;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        label = _ref1[_j];
        content.append(this.makeTab(label));
        i++;
        if (label.selected) {
          this.selectedIndex = i;
        }
      }
      e.append(content);
      e.css('border-style', 'solid').css('border-width', this.borderThickness + 'px').css('border-color', this.borderColor);
      e.find("li").eq(this.selectedIndex).addClass("selected");
      self = this;
      e.find("li > span").on("click", function() {
        var index;
        index = $(this).parent().index();
        $(this).parent().parent().children().removeClass('selected');
        $(this).parent().addClass('selected');
        return self.showTab(index);
      });
      this.configureScrollBars(e);
      e.css("width", this.width - 2 * this.borderThickness).css("height", this.height - 2 * this.borderThickness);
      this.showTab(0);
      return this;
    };

    Accordion.prototype.fixTheTabs = function() {
      var c, compid, components, tabids, _i, _j, _len, _len1, _ref;
      this.tabComponents = [];
      _ref = this.tabComponentIds;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tabids = _ref[_i];
        components = [];
        for (_j = 0, _len1 = tabids.length; _j < _len1; _j++) {
          compid = tabids[_j];
          c = this.page.getComponent(compid);
          if (c) {
            components.push(c);
          }
        }
        this.tabComponents.push(components);
      }
      return this.tabComponents;
    };

    Accordion.prototype.showTab = function(index) {
      var c, components, _i, _j, _len, _len1;
      if (this.selectedIndex === index) {
        return this;
      }
      if (!this.tabComponents) {
        this.fixTheTabs();
      }
      components = this.tabComponents[this.selectedIndex];
      if (components) {
        for (_i = 0, _len = components.length; _i < _len; _i++) {
          c = components[_i];
          c.hidden = true;
          c.show(c.visible);
        }
      }
      this.selectedIndex = index;
      components = this.tabComponents[this.selectedIndex];
      if (components) {
        for (_j = 0, _len1 = components.length; _j < _len1; _j++) {
          c = components[_j];
          c.hidden = false;
          c.show(c.visible);
        }
      }
      this.e.find("li > span").eq(index).click();
      return this;
    };

    Accordion.prototype.makeTab = function(label) {
      var content, d, div, w;
      this.labels.push(label);
      content = $('<li>').attr('id', generateId()).css("text-align", this.textAlign);
      div = $('<span class="FlairBuilderWidgetLabel"></span>');
      d = $('<div></div>');
      label.render(d);
      div.append(d);
      w = this.width - 2 * this.borderThickness;
      div.css('width', w).css('height', (this.headerHeight - 1 * this.borderThickness) + "px").css('line-height', (this.headerHeight - 1 * this.borderThickness) + "px").css('background-color', this.backgroundColor);
      div.css('border-top-style', 'solid').css('border-top-width', this.borderThickness + 'px').css('border-top-color', this.borderColor);
      div.css('border-bottom-style', 'solid').css('border-bottom-width', this.borderThickness + 'px').css('border-bottom-color', this.borderColor);
      content.append(div);
      content.css('width', w);
      div = $('<div class="content"></div>');
      div.css('width', w).css('height', this.height - (this.tabs.length * this.headerHeight));
      content.append(div);
      return content;
    };

    Accordion.prototype.configureScrollBars = function(e) {
      var div, scrollbar, _i, _len, _ref, _results;
      if (this.showScrollbar) {
        _ref = e.find('.content');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          div = _ref[_i];
          div = $(div);
          scrollbar = fb.ScrollBar.getScrollbarContent(div.height());
          _results.push(div.append(scrollbar.css('height', div.height() + 1).css('bottom', '-1px').css('top', '-1px').css('border-color', this.borderColor)));
        }
        return _results;
      }
    };

    generateId = function() {
      fb.FlairComponent.idCounter++;
      return fb.FlairComponent.idCounter.toString(16);
    };

    Accordion.prototype.attachTriggers = function() {
      var _this = this;
      return this.e.find('li').on('click', $.proxy(function(event) {
        var li;
        event.preventDefault();
        li = $(event.currentTarget);
        _this.dispatchEvent(SELECTED_TAB_CHANGE, li.find('span.FlairBuilderWidgetLabel').text());
        return false;
      }, this));
    };

    return Accordion;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.Accordion = Accordion;
  });

  AccordionHorizontal = (function(_super) {
    var generateId;

    __extends(AccordionHorizontal, _super);

    function AccordionHorizontal(definition) {
      var t, tabids, thetabs, _i, _len;
      this.definition = definition;
      this.className = 'AccordionHorizontal';
      AccordionHorizontal.__super__.constructor.call(this, this.definition);
      this.tabs = unescape(this.definition.tabs).split(',');
      this.headerHeight = parseFloat(this.definition.headerHeight);
      this.showScrollbar = this.isTrue(this.definition.showScrollbar);
      this.tabComponents = [];
      if (this.definition.tabids == null) {
        this.definition.tabids = "";
      }
      thetabs = this.definition.tabids.split(";");
      for (_i = 0, _len = thetabs.length; _i < _len; _i++) {
        t = thetabs[_i];
        tabids = t.split(",");
        this.tabComponents.push(tabids);
      }
    }

    AccordionHorizontal.prototype.doRender = function(e) {
      var content, tab, _i, _len, _ref;
      this.labels = {};
      content = $('<ul>');
      _ref = this.tabs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tab = _ref[_i];
        content.append(this.makeTab(tab));
      }
      e.append(content);
      e.css('border-style', 'solid').css('border-width', this.borderThickness + 'px').css('border-color', this.borderColor);
      e.find("li > div").click(this.onClick);
      return this;
    };

    AccordionHorizontal.prototype.onClick = function() {
      var index;
      index = $(this).parent().index();
      $(this).parent().parent().children().removeClass('selected');
      return $(this).parent().addClass('selected');
    };

    AccordionHorizontal.prototype.makeTab = function(entry) {
      var content, div, label, span;
      this.labels[entry] = new fb.LabeledObject(entry, this);
      content = $('<li>');
      content.attr('id', generateId());
      label = this.labels[entry];
      if (label.selected) {
        content.addClass('selected');
      }
      div = $('<div class="tab"><span>' + label.htmlText + '</span></div>');
      span = div.find('span');
      this.labels[entry].render(span);
      span.css('width', this.height - 1);
      span.css('-moz-transform', 'rotate(-90deg) translate(0px, 0px)');
      span.css('-o-transform', 'rotate(-90deg) translate(0px, 0px)');
      span.css('-webkit-transform', 'rotate(-90deg) translate(0px, 0px)');
      span.css('transform', 'rotate(-90deg) translate(0px, 0px)');
      div.css('height', this.height).css('width', this.headerHeight).css('background-color', this.backgroundColor);
      div.css('border-left-style', 'solid').css('border-left-width', this.borderThickness + 'px').css('border-left-color', this.borderColor);
      div.css('border-right-style', 'solid').css('border-right-width', this.borderThickness + 'px').css('border-right-color', this.borderColor);
      content.append(div);
      content.css('height', this.height);
      div = $('<div class="content"></div>');
      div.css('height', this.height).css('width', this.width - (this.tabs.length * this.headerHeight) + 1);
      content.append(div);
      return content;
    };

    generateId = function() {
      fb.FlairComponent.idCounter++;
      return fb.FlairComponent.idCounter.toString(16);
    };

    AccordionHorizontal.prototype.attachTriggers = function() {
      return this.e.find('li').on('click', $.proxy(function(event) {
        var li;
        event.preventDefault();
        li = $(event.currentTarget);
        this.dispatchEvent(SELECTED_TAB_CHANGE, li.find('span.FlairBuilderWidgetLabel').text());
        return false;
      }, this));
    };

    return AccordionHorizontal;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.AccordionHorizontal = AccordionHorizontal;
  });

  BreadCrumbs = (function(_super) {
    __extends(BreadCrumbs, _super);

    function BreadCrumbs(definition) {
      this.definition = definition;
      this.className = 'BreadCrumbs';
      BreadCrumbs.__super__.constructor.call(this, this.definition);
      this.useProjectStructure = this.isTrue(this.definition.useProjectStructure);
      this.linkData = decodeURI(this.definition.data).split(',');
    }

    BreadCrumbs.prototype.doRender = function(e) {
      var entry, _i, _len, _ref,
        _this = this;
      this.labels = [];
      this.content = $('<ul class="FlairBuilderWidgetLabel">');
      if (this.useProjectStructure) {
        e.removeAttr("width");
        this.page.project.on("page-select", function(page) {
          var entry, _i, _len, _ref, _results;
          _this.content.empty();
          _this.linkData = page.getStructurePath();
          _ref = _this.linkData;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            entry = _ref[_i];
            _results.push(_this.content.append(_this.getEntryContent(entry)));
          }
          return _results;
        });
        this.linkData = this.page.getStructurePath();
      }
      _ref = this.linkData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        this.content.append(this.getEntryContent(entry));
      }
      e.append(this.content);
      return this;
    };

    BreadCrumbs.prototype.getEntryContent = function(entry) {
      var cntnt, label;
      label = new fb.LabeledObject(entry, this);
      this.labels.push(label);
      cntnt = $('<a href="#">' + label.htmlText + '</a>');
      label.render(cntnt);
      cntnt.css('text-decoration', this.underline).css('color', this.color);
      return $('<li>').append(cntnt);
    };

    BreadCrumbs.prototype.attachTriggers = function() {
      this.e.on('click', $.proxy(function(event) {
        var a, pg, txt;
        event.preventDefault();
        a = $(event.target);
        txt = a.text();
        if (this.useProjectStructure) {
          pg = this.page.project.getPageByName(txt);
          this.page.project.selectPage(pg.id);
        } else {
          this.dispatchEvent(ITEM_CLICK, txt, event);
        }
        return false;
      }, this));
      return this;
    };

    return BreadCrumbs;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.BreadCrumbs = BreadCrumbs;
  });

  BrowserChrome = (function(_super) {
    __extends(BrowserChrome, _super);

    function BrowserChrome(definition) {
      this.definition = definition;
      this.className = 'BrowserChrome';
      BrowserChrome.__super__.constructor.call(this, this.definition);
      this.pageTitle = this.definition.pageTitle;
      this.pageAddress = this.definition.pageAddress;
    }

    BrowserChrome.prototype.doRender = function(e) {
      var content, s;
      this.label = new fb.LabeledObject(this.pageTitle, this);
      s = this.appendTextCell(e, this.label.htmlText);
      this.label.render(s);
      content = $('<div class="navbar"><div class="back"/><div class="forward"/><div class="home"/><input type="text" name="url" class="url-bar" value="' + this.pageAddress + '"/><input type="text" name="search" class="search-bar"/></div>');
      e.append(content);
      return this;
    };

    return BrowserChrome;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.BrowserChrome = BrowserChrome;
  });

  BulletList = (function(_super) {
    __extends(BulletList, _super);

    function BulletList(definition) {
      this.definition = definition;
      this.className = 'BulletList';
      BulletList.__super__.constructor.call(this, this.definition);
      this.bulletData = unescape(this.definition.data).split('\r');
    }

    BulletList.prototype.doRender = function(e) {
      var cnt, content, entry, label, _i, _len, _ref;
      this.labels = [];
      content = $('<ul>');
      _ref = this.bulletData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        if (!entry || !entry.trim()) {
          continue;
        }
        label = new fb.LabeledObject(entry, this);
        this.labels.push(label);
        cnt = $('<li>' + label.htmlText + '</li>');
        label.render(cnt);
        content.append(cnt);
      }
      e.append(content);
      return this;
    };

    return BulletList;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.BulletList = BulletList;
  });

  Button = (function(_super) {
    __extends(Button, _super);

    function Button(definition) {
      this.definition = definition;
      this.className = "Button";
      Button.__super__.constructor.call(this, this.definition);
    }

    Button.prototype.doRender = function(e) {
      var s;
      this.label = new fb.LabeledObject(this.labelText, this);
      s = this.appendTextCell(e, this.label.htmlText);
      return this.label.render(s);
    };

    Button.prototype.attachTriggers = function() {
      this.e.on('click', $.proxy(function(event) {
        var item;
        event.preventDefault();
        item = $(event.target);
        this.dispatchEvent(MOUSE_CLICK, item.text(), event);
        return false;
      }, this));
      return this;
    };

    return Button;

  })(fb.FlairComponent);

  namespace("fb", function(exports) {
    return exports.Button = Button;
  });

  ButtonBar = (function(_super) {
    __extends(ButtonBar, _super);

    function ButtonBar(definition) {
      this.definition = definition;
      this.className = 'ButtonBar';
      ButtonBar.__super__.constructor.call(this, this.definition);
      this.buttonData = unescape(this.definition.data).split(',');
      this.direction = this.definition.direction;
    }

    ButtonBar.prototype.doRender = function(e) {
      var content, entry, item, n, _i, _len, _ref;
      this.labels = {};
      content = $('<ul class="' + this.direction + '">');
      n = 0;
      _ref = this.buttonData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        n++;
        this.labels[entry] = new fb.LabeledObject(entry, this);
        item = $('<li class="' + this.direction + '">' + this.labels[entry].htmlText + '</li>');
        this.labels[entry].render(item);
        if (this.labels[entry].selected) {
          item.addClass('selected');
        }
        content.append(item);
      }
      if (this.direction === 'horizontal') {
        content.find('li').css('width', Math.abs(this.width / n)).css('height', this.height).css('line-height', this.height + 'px');
      } else {
        content.find('li').css('width', this.width).css('height', Math.abs(this.height / n)).css('line-height', Math.abs(this.height / n) + 'px');
      }
      content.find('li').css('border-style', this.borderStyle).css('border-width', this.borderThickness + 'px');
      if (this.direction === 'horizontal') {
        content.find('li:last').css('width', Math.abs((this.width - (n - 1)) / n));
      }
      e.append(content);
      content.find('li').on('click', function(event) {
        var li;
        li = $(this);
        if (!li.hasClass('selected')) {
          li.parent().find('li').removeClass('selected');
          return li.addClass('selected');
        }
      });
      return this;
    };

    ButtonBar.prototype.doRenderProperties = function(e) {
      var p, props, v, _i, _len;
      props = PROPERTIES[this.className];
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        v = this.definition[p];
        switch (p) {
          case fb.StyleConstants.TEXTALIGN:
            e.css("text-align", this.textAlign);
            break;
          case fb.StyleConstants.LEADING:
            e.css("line-height", this.leading);
            break;
          case fb.StyleConstants.FONTSIZE:
            e.css("font-size", this.fontSize);
            break;
          case fb.StyleConstants.FONTCOLOR:
            e.css("color", this.fontColor);
            break;
          case fb.StyleConstants.FONTFAMILY:
            e.css("font-family", this.fontFamily);
            break;
          case fb.StyleConstants.BORDERCOLOR:
            e.css("border-color", this.borderColor);
            break;
          case fb.StyleConstants.BACKGROUNDCOLOR:
            e.find('li').css("background-color", this.backgroundColor);
        }
      }
      return this;
    };

    ButtonBar.prototype.attachTriggers = function() {
      this.e.find('li').on('click', $.proxy(function(event) {
        var li;
        event.preventDefault();
        li = $(event.target);
        this.dispatchEvent(ITEM_CLICK, li.text(), event);
        return false;
      }, this));
      return this;
    };

    return ButtonBar;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.ButtonBar = ButtonBar;
  });

  Callout = (function(_super) {
    __extends(Callout, _super);

    function Callout(definition) {
      this.definition = definition;
      this.className = 'Callout';
      Callout.__super__.constructor.call(this, this.definition);
      this.labelText = unescape(this.definition.label);
      this.annotation = unescape(this.definition.annotation);
    }

    Callout.prototype.doRender = function(e) {
      var content;
      this.appendTextCell(e, this.labelText);
      content = $('<div class="annotation">');
      this.label = new fb.LabeledObject(this.annotation, this);
      content.append(this.label.htmlText);
      this.label.render(content);
      content.css('background-color', this.backgroundColor);
      e.append(content);
      return e.css('border-radius', this.height / 2 + 'px').css('border-color', this.borderColor).css('border-style', this.borderStyle);
    };

    return Callout;

  })(fb.FlairComponent);

  this;

  namespace('fb', function(exports) {
    return exports.Callout = Callout;
  });

  CardStack = (function(_super) {
    __extends(CardStack, _super);

    function CardStack(definition) {
      var t, tabids, thetabs, _i, _len;
      this.definition = definition;
      this.className = 'CardStack';
      CardStack.__super__.constructor.call(this, this.definition);
      this.tabs = [];
      this.tabComponentIds = [];
      if (this.definition.tabids == null) {
        this.definition.tabids = "";
      }
      thetabs = this.definition.tabids.split(";");
      for (_i = 0, _len = thetabs.length; _i < _len; _i++) {
        t = thetabs[_i];
        tabids = t.split(",");
        this.tabComponentIds.push(tabids);
        this.tabs.push("A");
      }
    }

    CardStack.prototype.doRender = function(e) {
      this.selectedIndex = 0;
      return this;
    };

    CardStack.prototype.fixTheTabs = function() {
      var c, compid, components, tabids, _i, _j, _len, _len1, _ref;
      this.tabComponents = [];
      _ref = this.tabComponentIds;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tabids = _ref[_i];
        components = [];
        for (_j = 0, _len1 = tabids.length; _j < _len1; _j++) {
          compid = tabids[_j];
          c = this.page.getComponent(compid);
          if (c) {
            components.push(c);
          }
        }
        this.tabComponents.push(components);
      }
      return this.tabComponents;
    };

    CardStack.prototype.showTab = function(index) {
      var c, components, _i, _j, _len, _len1;
      if (this.selectedIndex === index) {
        return this;
      }
      if (!this.tabComponents) {
        this.fixTheTabs();
      }
      components = this.tabComponents[this.selectedIndex];
      if (components) {
        for (_i = 0, _len = components.length; _i < _len; _i++) {
          c = components[_i];
          c.hidden = true;
          c.show(c.visible);
        }
      }
      this.selectedIndex = index;
      components = this.tabComponents[this.selectedIndex];
      if (components) {
        for (_j = 0, _len1 = components.length; _j < _len1; _j++) {
          c = components[_j];
          c.hidden = false;
          c.show(c.visible);
        }
      }
      return this;
    };

    return CardStack;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.CardStack = CardStack;
  });

  Chart = (function(_super) {
    __extends(Chart, _super);

    Chart.prototype.D = 10;

    function Chart(definition) {
      this.definition = definition;
      this.className = 'Chart';
      Chart.__super__.constructor.call(this, this.definition);
      this.getDataPoints(unescape(this.definition.data).split('\r'));
      this.style = this.definition.style;
    }

    Chart.prototype.doRender = function(e) {
      var func;
      this.elem = e;
      func = $.proxy(this.performRender, this);
      setTimeout(func, 10);
      return this;
    };

    Chart.prototype.performRender = function() {
      var paper;
      paper = Raphael(this.elem.get()[0], this.width - 1, this.height - 1);
      if (this.style === 'pieChart') {
        this.drawPie(paper);
      } else if (this.style === 'columnChart') {
        this.drawColumns(paper);
      } else if (this.style === 'barChart') {
        this.drawBars(paper);
      } else if (this.style === 'lineChart') {
        this.drawLines(paper);
      }
      return this.attachTriggers();
    };

    Chart.prototype.doRenderProperties = function(e) {};

    Chart.prototype.getDataPoints = function(points) {
      var d, data, ord, val, _i, _len, _max;
      this.labels = [];
      this.values = [];
      this.sum = 1;
      this.max = 1;
      this.gap = 1;
      _max = 0;
      for (_i = 0, _len = points.length; _i < _len; _i++) {
        data = points[_i];
        d = data.split(',');
        this.labels.push(d[0]);
        val = parseFloat(d[1]);
        this.values.push(val);
        this.sum += val;
        if (val > _max) {
          _max = val;
        }
      }
      ord = (Math.ceil(_max).toString()).length - 1;
      if (_max <= 2 * Math.pow(10, ord)) {
        this.gap = 2 * Math.pow(10, ord - 1);
      } else if (_max <= 5 * Math.pow(10, ord)) {
        this.gap = 5 * Math.pow(10, ord - 1);
      } else if (_max <= 10 * Math.pow(10, ord)) {
        this.gap = 10 * Math.pow(10, ord - 1);
      }
      return this.max = Math.ceil(_max / this.gap) * this.gap;
    };

    Chart.prototype.drawColumns = function(paper) {
      var barLength, barWidth, borderThickness, chartHeight, chartWidth, color, crnr, i, label, labelComps, labelHeight, lbl, line, rect, xi, _i, _j, _len, _ref, _ref1, _ref2, _ref3, _ref4, _results;
      labelComps = [];
      _ref = this.labels;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        label = _ref[_i];
        lbl = paper.text(0, 0, label);
        lbl.attr("fill", this.color);
        lbl.attr('font-size', this.fontSize);
        lbl.attr("font-family", this.fontFamily);
        lbl.attr('font-weight', (_ref1 = this.bold) != null ? _ref1 : {
          "bold": "normal"
        });
        lbl.attr("font-style", (_ref2 = this.italic) != null ? _ref2 : {
          "italic": "normal"
        });
        lbl.attr('text-decoration', (_ref3 = this.underline) != null ? _ref3 : {
          "underline": "normal"
        });
        labelComps.push(lbl);
      }
      labelHeight = this.fontSize;
      borderThickness = parseFloat(this.borderThickness);
      crnr = this.D + 2 * borderThickness;
      line = paper.path("M " + crnr + " " + crnr + " L " + crnr + " " + (paper.height - borderThickness - labelHeight));
      line = paper.path("M " + crnr + " " + (paper.height - borderThickness - labelHeight) + " L " + (paper.width - crnr - borderThickness) + " " + (paper.height - borderThickness - labelHeight));
      chartWidth = paper.width - crnr - borderThickness - crnr;
      chartHeight = paper.height - crnr - borderThickness - labelHeight;
      barWidth = 2 * chartWidth / (3 * this.values.length + 1);
      _results = [];
      for (i = _j = 0, _ref4 = this.labels.length - 1; 0 <= _ref4 ? _j <= _ref4 : _j >= _ref4; i = 0 <= _ref4 ? ++_j : --_j) {
        label = labelComps[i];
        label.attr("y", paper.height - labelHeight / 2);
        xi = crnr + borderThickness + (i * 3 + 1) / 2 * barWidth;
        label.attr("x", xi + barWidth / 2);
        barLength = Math.ceil(this.values[i] / this.max * chartHeight);
        if (isNaN(barLength)) {
          barLength = 10;
        }
        color = this.getColor(i);
        rect = paper.rect(xi, paper.height - borderThickness - labelHeight - barLength, barWidth, barLength);
        _results.push(rect.attr("stroke", this.borderColor).attr("fill", color).attr('stroke-width', this.borderThickness));
      }
      return _results;
    };

    Chart.prototype.drawPie = function(paper) {
      var angle, barWidth, chartHeight, chartWidth, color, crnr, i, r, startAngle, _i, _ref, _results;
      crnr = this.D + 2 * parseFloat(this.borderThickness);
      chartWidth = paper.width - crnr - parseFloat(this.borderThickness) - crnr;
      chartHeight = paper.height - crnr - parseFloat(this.borderThickness);
      barWidth = 2 * chartWidth / (3 * this.values.length + 1);
      r = Math.min(chartWidth, chartHeight) / 2;
      startAngle = 0;
      _results = [];
      for (i = _i = 0, _ref = this.labels.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        color = this.getColor(i);
        angle = Math.ceil(this.values[i] / this.sum * 360);
        this.drawSector(paper.width / 2, paper.height / 2, r, startAngle, angle, 20, color, paper);
        _results.push(startAngle += angle);
      }
      return _results;
    };

    Chart.prototype.drawBars = function(paper) {
      var barLength, barWidth, borderThickness, chartHeight, chartWidth, color, crnr, i, label, labelComps, labelHeight, labelsWidth, lbl, line, rect, yi, _i, _j, _k, _len, _len1, _ref, _ref1, _ref2, _ref3, _ref4, _results;
      labelComps = [];
      _ref = this.labels;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        label = _ref[_i];
        lbl = paper.text(0, 0, label);
        lbl.attr("fill", this.color);
        lbl.attr('font-size', this.fontSize);
        lbl.attr("font-family", this.fontFamily);
        lbl.attr('font-weight', (_ref1 = this.bold) != null ? _ref1 : {
          "bold": "normal"
        });
        lbl.attr("font-style", (_ref2 = this.italic) != null ? _ref2 : {
          "italic": "normal"
        });
        lbl.attr('text-decoration', (_ref3 = this.underline) != null ? _ref3 : {
          "underline": "normal"
        });
        labelComps.push(lbl);
      }
      labelHeight = this.fontSize;
      borderThickness = parseFloat(this.borderThickness);
      crnr = this.D + 2 * borderThickness;
      labelsWidth = 0;
      for (_j = 0, _len1 = labelComps.length; _j < _len1; _j++) {
        label = labelComps[_j];
        if (label.attr("text").length * this.fontSize / 2 > labelsWidth) {
          labelsWidth = label.attr("text").length * this.fontSize / 2;
        }
      }
      labelsWidth = Math.max(crnr + borderThickness, labelsWidth + borderThickness) + 5;
      line = paper.path("M " + (labelsWidth + crnr - this.D) + " " + crnr + " L " + (labelsWidth + crnr - this.D) + " " + (paper.height - crnr - borderThickness));
      line = paper.path("M " + (labelsWidth + crnr - this.D) + " " + (paper.height - crnr - borderThickness) + " L " + (paper.width - crnr - borderThickness) + " " + (paper.height - crnr - borderThickness));
      chartWidth = paper.width - crnr - borderThickness - (labelsWidth + crnr - this.D);
      chartHeight = paper.height - crnr - borderThickness - crnr;
      barWidth = 2 * chartHeight / (3 * this.values.length + 1);
      _results = [];
      for (i = _k = 0, _ref4 = this.labels.length - 1; 0 <= _ref4 ? _k <= _ref4 : _k >= _ref4; i = 0 <= _ref4 ? ++_k : --_k) {
        label = labelComps[i];
        label.attr("width", labelsWidth);
        label.attr("x", borderThickness + this.fontSize);
        yi = paper.height - crnr - borderThickness - (i + 1) * 3 / 2 * barWidth;
        label.attr("y", yi + (barWidth + labelHeight) / 2);
        barLength = Math.ceil(this.values[i] / this.max * chartWidth);
        color = this.getColor(i);
        rect = paper.rect(labelsWidth + crnr - this.D, yi, barLength, barWidth);
        _results.push(rect.attr("stroke", this.borderColor).attr("fill", color).attr('stroke-width', this.borderThickness));
      }
      return _results;
    };

    Chart.prototype.drawLines = function(paper) {
      var barLength, barWidth, borderThickness, chartHeight, chartWidth, circle, color, crnr, i, label, labelComps, labelHeight, lbl, line, x0, xi, y0, yi, _i, _j, _k, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _results;
      labelComps = [];
      _ref = this.labels;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        label = _ref[_i];
        lbl = paper.text(0, 0, label);
        lbl.attr("fill", this.color);
        lbl.attr('font-size', this.fontSize);
        lbl.attr("font-family", this.fontFamily);
        lbl.attr('font-weight', (_ref1 = this.bold) != null ? _ref1 : {
          "bold": "normal"
        });
        lbl.attr("font-style", (_ref2 = this.italic) != null ? _ref2 : {
          "italic": "normal"
        });
        lbl.attr('text-decoration', (_ref3 = this.underline) != null ? _ref3 : {
          "underline": "normal"
        });
        labelComps.push(lbl);
      }
      labelHeight = this.fontSize;
      borderThickness = parseFloat(this.borderThickness);
      crnr = this.D + 2 * borderThickness;
      line = paper.path("M " + crnr + " " + crnr + " L " + crnr + " " + (paper.height - borderThickness - labelHeight));
      line = paper.path("M " + crnr + " " + (paper.height - borderThickness - labelHeight) + " L " + (paper.width - crnr - borderThickness) + " " + (paper.height - borderThickness - labelHeight));
      chartWidth = paper.width - crnr - borderThickness - crnr;
      chartHeight = paper.height - crnr - borderThickness - labelHeight;
      barWidth = 2 * chartWidth / (3 * this.values.length + 1);
      x0 = crnr;
      y0 = paper.height - borderThickness - labelHeight;
      for (i = _j = 0, _ref4 = this.labels.length - 1; 0 <= _ref4 ? _j <= _ref4 : _j >= _ref4; i = 0 <= _ref4 ? ++_j : --_j) {
        xi = crnr + borderThickness + (i * 3 + 1) / 2 * barWidth;
        xi = Math.round(xi + barWidth / 2);
        barLength = Math.ceil(this.values[i] / this.max * chartHeight);
        yi = paper.height - borderThickness - labelHeight - barLength;
        line = paper.path("M " + x0 + " " + y0 + " L " + xi + " " + yi);
        x0 = xi;
        y0 = yi;
      }
      _results = [];
      for (i = _k = 0, _ref5 = this.labels.length - 1; 0 <= _ref5 ? _k <= _ref5 : _k >= _ref5; i = 0 <= _ref5 ? ++_k : --_k) {
        label = labelComps[i];
        label.attr("y", paper.height - labelHeight / 2);
        xi = crnr + borderThickness + (i * 3 + 1) / 2 * barWidth;
        label.attr("width", 3 / 2 * barWidth);
        label.attr("x", xi + barWidth / 2);
        color = this.getColor(i);
        barLength = Math.ceil(this.values[i] / this.max * chartHeight);
        circle = paper.circle(Math.round(xi + barWidth / 2), paper.height - borderThickness - labelHeight - barLength, 3);
        _results.push(circle.attr('fill', color));
      }
      return _results;
    };

    Chart.prototype.drawSector = function(x0, y0, r, startAngle, angle, steps, color, paper) {
      var a, line, path, step, x, y, _i;
      x = x0;
      y = y0;
      path = "M " + x + " " + y;
      x = x0 + r * Math.sin(startAngle / 360 * 2 * Math.PI);
      y = y0 - r * Math.cos(startAngle / 360 * 2 * Math.PI);
      path += " L " + x + " " + y;
      for (step = _i = 0; 0 <= steps ? _i <= steps : _i >= steps; step = 0 <= steps ? ++_i : --_i) {
        a = startAngle + angle / steps * step;
        x = x0 + r * Math.sin(a / 360 * 2 * Math.PI);
        y = y0 - r * Math.cos(a / 360 * 2 * Math.PI);
        path += " L " + x + " " + y;
      }
      path += " L " + x0 + " " + y0 + "z";
      line = paper.path(path);
      return line.attr("fill", color);
    };

    Chart.prototype.getColor = function(step) {
      return adjustBrightness(0xC0C0C0, Math.ceil(this.values[step] / this.max * 100));
    };

    Chart.prototype.attachTriggers = function() {
      var icon,
        _this = this;
      icon = this.e.children().first();
      icon.on('click', $.proxy(function(event) {
        event.preventDefault();
        _this.dispatchEvent(MOUSE_CLICK, "", event);
        return false;
      }, this));
      icon.on('dblclick', $.proxy(function(event) {
        event.preventDefault();
        _this.dispatchEvent(MOUSE_DOUBLE_CLICK, "", event);
        return false;
      }, this));
      icon.mouseenter($.proxy(function(event) {
        event.preventDefault();
        _this.dispatchEvent(MOUSE_ENTER, "", event);
        return false;
      }, this));
      return icon.mouseleave($.proxy(function(event) {
        event.preventDefault();
        _this.dispatchEvent(MOUSE_OUT, "", event);
        return false;
      }, this));
    };

    return Chart;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.Chart = Chart;
  });

  CheckBox = (function(_super) {
    var generateId, makeCheckBox;

    __extends(CheckBox, _super);

    function CheckBox(definition) {
      this.definition = definition;
      this.className = 'CheckBox';
      CheckBox.__super__.constructor.call(this, this.definition);
      this.selected = this.definition.selected;
    }

    CheckBox.prototype.doRender = function(e) {
      e.append($(makeCheckBox(this.selected, this.labelText)));
      return this;
    };

    makeCheckBox = function(selected, entry) {
      var content, id, input, lbl;
      this.label = new fb.LabeledObject(entry, this);
      content = $('<div>');
      id = generateId();
      input = '<input type="checkbox" id="' + id + '"/>';
      if (this.label.selected) {
        $(input).attr('checked', 'checked');
      }
      content.append(input);
      lbl = $('<label for="' + id + '">' + this.label.htmlText + '</input>');
      content.append(lbl);
      this.label.render(lbl);
      lbl.css('width', this.width);
      return content.html();
    };

    generateId = function() {
      fb.FlairComponent.idCounter++;
      return fb.FlairComponent.idCounter.toString(16);
    };

    CheckBox.prototype.attachTriggers = function() {
      var checkbox;
      checkbox = $(this.e.children().first());
      return checkbox.on('click', $.proxy(function(event) {
        this.dispatchEvent(CHANGE);
        if (checkbox.is(':checked')) {
          return this.dispatchEvent(CHECKBOX_SELECTED);
        } else {
          return this.dispatchEvent(CHECKBOX_UNSELECTED);
        }
      }, this));
    };

    CheckBox.prototype.getPropertyValue = function(property) {
      if (property === fb.IS_SELECTED) {
        return true;
      } else if (property === fb.IS_NOT_SELECTED) {
        return false;
      }
    };

    return CheckBox;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.CheckBox = CheckBox;
  });

  CheckBoxGroup = (function(_super) {
    var generateId;

    __extends(CheckBoxGroup, _super);

    function CheckBoxGroup(definition) {
      this.definition = definition;
      this.className = 'CheckBoxGroup';
      CheckBoxGroup.__super__.constructor.call(this, this.definition);
      this.groupData = unescape(this.definition.data).split('\r');
      this.direction = this.definition.direction;
    }

    CheckBoxGroup.prototype.doRender = function(e) {
      var content, entry, _i, _len, _ref;
      this.labels = {};
      content = $('<ul>');
      content.css('width', this.width);
      _ref = this.groupData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        content.append($('<li>').append(this.makeCheckBox(entry)));
      }
      e.append($(content));
      if (this.direction === 'horizontal') {
        content.find('li').addClass('horizontal');
      }
      return this;
    };

    CheckBoxGroup.prototype.makeCheckBox = function(entry) {
      var content, id, lbl;
      this.labels[entry] = new fb.LabeledObject(entry, this);
      content = $('<div>');
      id = generateId();
      content.append('<input type="checkbox" id="' + id + '" value="' + this.labels[entry].label + '" ' + (this.labels[entry].selected ? 'checked="checked"' : '') + '/>');
      lbl = $('<label for="' + id + '">' + this.labels[entry].htmlText + '</input>');
      content.append(lbl);
      this.labels[entry].render(lbl);
      return content.html();
    };

    generateId = function() {
      fb.FlairComponent.idCounter++;
      return fb.FlairComponent.idCounter.toString(16);
    };

    CheckBoxGroup.prototype.attachTriggers = function() {
      return this.e.find('input').on('click', $.proxy(function(event) {
        var checkbox;
        checkbox = $(event.currentTarget);
        this.dispatchEvent(VALUE_CHANGE);
        if (checkbox.is(':checked')) {
          this.dispatchEvent(CHECKBOX_ITEM_SELECTED, checkbox.text());
        } else {
          this.dispatchEvent(CHECKBOX_ITEM_UNSELECTED, checkbox.text());
        }
        return this;
      }, this));
    };

    return CheckBoxGroup;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.CheckBoxGroup = CheckBoxGroup;
  });

  CloseIcon = (function(_super) {
    __extends(CloseIcon, _super);

    function CloseIcon(definition) {
      this.definition = definition;
      this.className = 'CloseIcon';
      CloseIcon.__super__.constructor.call(this, this.definition);
    }

    CloseIcon.prototype.doRender = function(e) {
      var circle, cx, cy, paper, path, size;
      if (this.borderColor === '#0') {
        this.borderColor = '#000000';
      }
      paper = Raphael(e.get()[0], this.width, this.height);
      size = Math.min(this.width, this.height);
      cx = cy = size / 2 + 1;
      circle = paper.circle(cx, cy, size / 2 - 2);
      circle.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
      circle.attr('fill', this.backgroundColor);
      path = paper.path("M " + 2 * cx / 3 + " " + 2 * cy / 3 + " L " + 4 * cx / 3 + " " + 4 * cx / 3);
      path.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
      path = paper.path("M " + 4 * cx / 3 + " " + 2 * cy / 3 + " L " + 2 * cx / 3 + " " + 4 * cy / 3);
      path.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
      return this;
    };

    CloseIcon.prototype.doRenderProperties = function(e) {};

    CloseIcon.prototype.attachTriggers = function() {
      var icon;
      icon = this.e.children().first();
      icon.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_CLICK, "", event);
        return false;
      }, this));
      icon.on('dblclick', $.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_DOUBLE_CLICK, "", event);
        return false;
      }, this));
      icon.mouseenter($.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_ENTER, "", event);
        return false;
      }, this));
      return icon.mouseleave($.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_OUT, "", event);
        return false;
      }, this));
    };

    return CloseIcon;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.CloseIcon = CloseIcon;
  });

  ColorPicker = (function(_super) {
    __extends(ColorPicker, _super);

    function ColorPicker(definition) {
      this.definition = definition;
      this.className = 'ColorPicker';
      ColorPicker.__super__.constructor.call(this, this.definition);
    }

    ColorPicker.prototype.doRender = function(e) {
      var content;
      content = $('<input id="color1" type="text" name="color1" />').attr('value', this.backgroundColor);
      e.append(content);
      content.colorPicker({
        colors: this.generatePallette()
      });
      return this;
    };

    ColorPicker.prototype.generatePallette = function() {
      var b, c1, g, item, j, pallette, r, ra, rb, spacer, x, _i, _j;
      pallette = [];
      spacer = '000000';
      c1 = ['000000', '333333', '666666', '999999', 'CCCCCC', 'FFFFFF', 'FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF'];
      ra = ["00", "00", "00", "00", "00", "00", "33", "33", "33", "33", "33", "33", "66", "66", "66", "66", "66", "66"];
      rb = ["99", "99", "99", "99", "99", "99", "CC", "CC", "CC", "CC", "CC", "CC", "FF", "FF", "FF", "FF", "FF", "FF"];
      g = ["00", "33", "66", "99", "CC", "FF", "00", "33", "66", "99", "CC", "FF", "00", "33", "66", "99", "CC", "FF"];
      b = ["00", "33", "66", "99", "CC", "FF", "00", "33", "66", "99", "CC", "FF"];
      for (x = _i = 0; _i <= 11; x = ++_i) {
        for (j = _j = 0; _j <= 19; j = ++_j) {
          if (j === 0) {
            item = c1[x];
          } else if (j === 1) {
            item = spacer;
          } else {
            if (x < 6) {
              r = ra[j - 2];
            } else {
              r = rb[j - 2];
            }
            item = "" + r + g[j - 2] + b[x];
          }
          pallette.push(item);
        }
      }
      return pallette;
    };

    return ColorPicker;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.ColorPicker = ColorPicker;
  });

  ComboBox = (function(_super) {
    __extends(ComboBox, _super);

    function ComboBox(definition) {
      this.definition = definition;
      this.className = 'ComboBox';
      ComboBox.__super__.constructor.call(this, this.definition);
      this.comboData = unescape(this.definition.data).split('\r');
    }

    ComboBox.prototype.doRender = function(e) {
      var content, entry, _i, _len, _ref;
      this.labels = [];
      content = $('<select>');
      _ref = this.comboData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        content.append(this.makeComboOption(entry));
      }
      content.css('width', this.width).css('height', this.height);
      e.append($(content));
      return this;
    };

    ComboBox.prototype.makeComboOption = function(entry) {
      var content, label;
      label = new fb.LabeledObject(entry, this);
      this.labels.push(label);
      content = $('<option value="' + entry + '"' + (label.selected ? ' selected="selected"' : '') + '>' + label.htmlText + "</option>");
      label.render(content);
      return content;
    };

    ComboBox.prototype.doRenderProperty = function(property, value) {
      var cmp;
      cmp = this.e.children().first();
      switch (property) {
        case BOLD:
          return cmp.css("font-weight", value);
        case ITALIC:
          return cmp.css("font-style", value);
        case UNDERLINE:
          return cmp.css("text-decoration", value);
        case TEXTALIGN:
          return cmp.css("text-align", value);
        case LEADING:
          return cmp.css("line-height", value);
        case FONTSIZE:
          return cmp.css("font-size", value);
        case FONTCOLOR:
          return cmp.css("color", value);
        case FONTFAMILY:
          return cmp.css("font-family", value);
        case BACKGROUNDCOLOR:
          return cmp.css("background-color", value);
        case BORDERCOLOR:
          return cmp.css("border-color", value);
        case BORDERTHICKNESS:
          return cmp.css("border-width", value + "px");
        case CORNERRADIUS:
          return cmp.css("border-radius", value);
      }
    };

    ComboBox.prototype.attachTriggers = function() {
      var combo,
        _this = this;
      combo = $(this.e.children().first());
      return combo.change(function(event) {
        event.preventDefault();
        _this.dispatchEvent(SELECTION_CHANGED, combo.find('option:selected').text());
        return false;
      });
    };

    ComboBox.prototype.getPropertyValue = function(property) {
      if (property === fb.SELECTED_VALUE) {
        return true;
      } else if (property === fb.SELECTED_INDEX) {
        return false;
      }
    };

    return ComboBox;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.ComboBox = ComboBox;
  });

  DataGrid = (function(_super) {
    var getRGBA;

    __extends(DataGrid, _super);

    function DataGrid(definition) {
      var item, split, tmp, _i, _len;
      this.definition = definition;
      this.className = 'DataGrid';
      DataGrid.__super__.constructor.call(this, this.definition);
      tmp = unescape(this.definition.data).split('\r');
      this.gridData = [];
      this.maxColumns = 0;
      for (_i = 0, _len = tmp.length; _i < _len; _i++) {
        item = tmp[_i];
        item = item.trim();
        if (!item) {
          continue;
        }
        split = item.split(",");
        this.maxColumns = Math.max(this.maxColumns, split.length);
        this.gridData.push(split);
      }
      this.showBorder = this.isTrue(this.definition.showBorder);
      this.style = this.definition.style;
      this.showHeader = this.isTrue(this.definition.showHeader);
      this.headerHeight = parseFloat(this.definition.headerHeight);
      this.rowHeight = parseFloat(this.definition.rowHeight);
      this.showScrollbar = this.isTrue(this.definition.showScrollbar);
      if (this.definition.colwidths != null) {
        this.colwidths = this.definition.colwidths.split(',');
      }
      if (this.style === "dataGridHLines" || this.style === "dataGridHVLines") {
        this.rowStyle = "row-line";
      } else {
        this.rowStyle = "";
      }
      if (this.style === "dataGridVLines" || this.style === "dataGridHVLines") {
        this.columnStyle = "column-line";
      } else {
        this.columnStyle = "";
      }
      this.alternate = false;
    }

    DataGrid.prototype.doRender = function(e) {
      var c, cell, computedHeight, content, index, item, source, _i, _j, _len, _ref, _ref1;
      source = [];
      _ref = this.gridData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (item) {
          source.push(this.getDataAndRank(item));
        }
      }
      computedHeight = 2 * this.borderThickness;
      if (this.showHeader) {
        computedHeight += this.headerHeight;
      }
      computedHeight += (this.gridData.length - 1) * this.rowHeight;
      content = this.processContent(source.shift(), source, true);
      e.append(content);
      if (computedHeight < this.height) {
        c = $("<div>");
        for (index = _j = 0, _ref1 = this.colwidths.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; index = 0 <= _ref1 ? ++_j : --_j) {
          cell = $('<div class="grid-cell">').css('width', this.colwidths[index]).css('height', this.height - computedHeight);
          cell.addClass(this.columnStyle);
          c.append(cell);
        }
        content.append($('<li id="last">').append(c));
      }
      e.find('div').css("border-color", this.borderColor);
      if (this.showBorder) {
        e.css("border-style", 'solid').css("border-width", this.borderThickness + "px");
      }
      e.find('li div.grid-row').on('click', function(event) {
        if ($(this).parent().children().length >= 2) {
          return $($(this).parent().children('ul')).toggleClass("collapsed");
        }
      });
      this.configureScrollBar(e);
      return this;
    };

    DataGrid.prototype.getDataAndRank = function(row) {
      var index, rank, _i, _ref;
      rank = 0;
      for (index = _i = 0, _ref = row.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; index = 0 <= _ref ? ++_i : --_i) {
        if (row[index].indexOf('-') === 0) {
          rank = row[index].lastIndexOf('-') + 1;
          if (rank !== 0) {
            row[index] = row[index].substring(rank);
          }
          break;
        }
      }
      return {
        row: row,
        rank: rank
      };
    };

    DataGrid.prototype.processContent = function(item, source, first) {
      var checkbox, checkboxes, content, id, rank, row, sub, _i, _len;
      rank = item.rank;
      content = $('<ul class="tree' + item.rank + '">');
      while (item != null) {
        if (item.rank === rank) {
          id = this.generateId();
          if (first) {
            row = this.buildHeader(item.row);
            first = false;
          } else {
            row = this.buildRow(item.row);
          }
          content.append($('<li class="tree' + rank + '_item">').append(row));
        } else {
          if (item.rank > rank) {
            sub = this.processContent(item, source, false);
            content.find('li:last-child').append(sub);
          } else {
            source.unshift(item);
            break;
          }
        }
        item = source.shift();
      }
      checkboxes = content.find('input[type="checkbox"]');
      first = true;
      for (_i = 0, _len = checkboxes.length; _i < _len; _i++) {
        checkbox = checkboxes[_i];
        if (first) {
          $(checkbox).on("change", function(event) {
            var check;
            event.preventDefault();
            check = $(this).is(':checked');
            return content.find('input[type="checkbox"]').attr('checked', check != null ? check : {
              'checked': ""
            });
          });
          first = false;
        } else {
          $(checkbox).on("change", function(event) {
            return $(this);
          });
        }
      }
      return content;
    };

    DataGrid.prototype.buildHeader = function(row) {
      var cell, cellData, content, index, processed, _i, _ref;
      content = $('<div class="grid-header">').css('height', this.headerHeight).css('background-color', this.backgroundColor);
      content.addClass(this.rowStyle);
      for (index = _i = 0, _ref = this.maxColumns - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; index = 0 <= _ref ? ++_i : --_i) {
        cellData = row.shift();
        processed = new fb.LabeledObject(cellData, this);
        if (processed.type === fb.LabeledObject.TYPE_CHECK) {
          cell = $('<div class="grid-header-cell">').append($('<div class="outer-checkbox-box"><div class="inner-checkbox-box"><input type="checkbox"/></div></div>').css('width', this.colwidths[index]).css('height', this.headerHeight));
          cell.css('width', this.colwidths[index]).css('height', this.headerHeight);
          cell.addClass(this.columnStyle);
        } else {
          cell = $('<div class="grid-header-cell">').append('<span>' + processed.htmlText + '</span>');
          cell.addClass(this.columnStyle);
          cell.css('width', this.colwidths[index]).css('height', this.headerHeight).css('line-height', this.headerHeight + "px");
        }
        content.append(cell);
      }
      if (!this.showHeader) {
        content.css('display', 'none');
      }
      return content;
    };

    DataGrid.prototype.buildRow = function(row) {
      var cell, cellData, content, index, processed, _i, _ref;
      content = $('<div class="grid-row">').css('height', this.rowHeight);
      if (this.alternate) {
        content.css('background-color', this.backgroundColor);
      }
      this.alternate = !this.alternate;
      content.addClass(this.rowStyle);
      for (index = _i = 0, _ref = this.maxColumns - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; index = 0 <= _ref ? ++_i : --_i) {
        cellData = row.shift();
        processed = new fb.LabeledObject(cellData, this);
        if (processed.type === fb.LabeledObject.TYPE_CHECK) {
          cell = $('<div class="grid-cell">').append($('<div class="outer-checkbox-box"><div class="inner-checkbox-box"><input type="checkbox"/></div></div>').css('width', this.colwidths[index]).css('height', this.rowHeight));
          cell.addClass(this.columnStyle);
          cell.css('width', this.colwidths[index]).css('height', this.rowHeight);
        } else {
          cell = $('<div class="grid-cell">').append('<span>' + processed.htmlText + '</span>');
          cell.addClass(this.columnStyle);
          cell.css('width', this.colwidths[index]).css('height', this.rowHeight).css('line-height', this.rowHeight + "px");
          cell.find("span").css('width', (cell.width() - 10) + "px").css("padding-top", (this.rowHeight - this.fontSize) / 2 + "px");
        }
        content.append(cell);
      }
      return content;
    };

    DataGrid.prototype.configureScrollBar = function(e) {
      var scrollbar;
      if (this.showScrollbar) {
        scrollbar = fb.ScrollBar.getScrollbarContent(e.height() - this.headerHeight);
        return e.append(scrollbar);
      }
    };

    DataGrid.prototype.doRenderProperties = function(e) {
      var p, props, v, _i, _len;
      props = PROPERTIES[this.className];
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        v = this.definition[p];
        switch (p) {
          case fb.StyleConstants.TEXTALIGN:
            e.css("text-align", this.textAlign);
            break;
          case fb.StyleConstants.LEADING:
            e.css("line-height", this.leading);
            break;
          case fb.StyleConstants.FONTSIZE:
            e.css("font-size", this.fontSize);
            break;
          case fb.StyleConstants.FONTCOLOR:
            e.css("color", this.fontColor);
            break;
          case fb.StyleConstants.FONTFAMILY:
            e.css("font-family", this.fontFamily);
            break;
          case fb.StyleConstants.BORDERCOLOR:
            e.css("border-color", this.borderColor);
        }
      }
      return this;
    };

    getRGBA = function(color, alpha) {
      var B, G, R;
      R = parseInt(color.substring(1, 3), 16);
      G = parseInt(color.substring(3, 5), 16);
      B = parseInt(color.substring(5, 7), 16);
      return 'rgba(' + R + ', ' + G + ', ' + B + ', ' + alpha + ')';
    };

    DataGrid.prototype.attachTriggers = function() {
      var grids;
      grids = this.e.find('.grid-row');
      grids.on('click', $.proxy(function(event) {
        this.dispatchEvent(GRID_ROW_CLICK);
        return this;
      }, this));
      grids.on('dblclick', $.proxy(function(event) {
        this.dispatchEvent(GRID_ROW_DOUBLECLICK);
        return this;
      }, this));
      return this;
    };

    DataGrid.prototype.getPropertyValue = function(property) {
      if (property === fb.HAS_SELECTED_ROWS) {
        return true;
      } else if (property === fb.HAS_NO_SELECTED_ROWS) {
        return false;
      } else if (property === fb.SELECTED_ROWS_COUNT) {
        return true;
      } else if (property === fb.SELECTED_INDEX) {
        return false;
      }
    };

    return DataGrid;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.DataGrid = DataGrid;
  });

  DateChooser = (function(_super) {
    __extends(DateChooser, _super);

    function DateChooser(definition) {
      this.definition = definition;
      this.className = 'DateChooser';
      DateChooser.__super__.constructor.call(this, this.definition);
      this.date = this.definition.date;
    }

    DateChooser.prototype.doRender = function(e) {
      e.datepicker({
        nextText: '>',
        prevText: '<'
      });
      e.css('color', this.color).css('border-style', 'solid').css('border-width', this.borderThickness + 'px').css('border-color', this.borderColor).css('background-color', this.backgroundColor);
      e.find('table').css('border-top-style', 'solid').css('border-top-width', this.borderThickness + 'px').css('border-top-color', this.borderColor);
      return this;
    };

    return DateChooser;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.DateChooser = DateChooser;
  });

  DateField = (function(_super) {
    __extends(DateField, _super);

    function DateField(definition) {
      this.definition = definition;
      this.className = 'DateField';
      DateField.__super__.constructor.call(this, this.definition);
      this.format = this.definition.format;
    }

    DateField.prototype.doRender = function(e) {
      var content;
      content = $('<input type="text" value="' + this.labelText + '"></input>');
      content.css('width', this.width).css('height', this.height);
      content.datepicker({
        dateFormat: this.format.toLowerCase().replace('yyyy', 'yy'),
        nextText: '>',
        prevText: '<'
      });
      content.datepicker('setDate', new Date());
      e.append(content);
      this.registerVariable();
      return this;
    };

    DateField.prototype.doRenderProperties = function(e) {
      var input;
      input = e.children().first();
      DateField.__super__.doRenderProperties.call(this, input);
      return this;
    };

    DateField.prototype.getVariableValue = function() {
      var input, value;
      input = this.e.children().first().eq(0);
      value = input.val();
      value = value.replace("/", "\\/");
      return value;
    };

    return DateField;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.DateField = DateField;
  });

  Diamond = (function(_super) {
    __extends(Diamond, _super);

    function Diamond(definition) {
      this.definition = definition;
      this.className = 'Diamond';
      Diamond.__super__.constructor.call(this, this.definition);
    }

    Diamond.prototype.doRender = function(e) {
      var h, paper, s, w;
      if (this.borderColor === '#0') {
        this.borderColor = '#000000';
      }
      paper = Raphael(e.get()[0], this.width, this.height);
      w = this.width / 2 - 1;
      h = this.height / 2 - 1;
      this.shape = paper.path("M " + w + " 1 L " + (this.width - 2) + " " + h + " L " + w + " " + (this.height - 2) + " L 1 " + h + " L " + w + " 1 z");
      this.shape.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness).attr("fill", this.backgroundColor);
      if (this.borderStyle === "dashed") {
        this.shape.attr('stroke-dasharray', "- ");
      }
      if (this.backgroundColor >= 0) {
        this.shape.attr('fill-opacity', this.backgroundAlpha);
      }
      this.labelHolder = $('<div class="textHolder">');
      this.label = new fb.LabeledObject(this.labelText, this);
      s = this.appendTextCell(this.labelHolder, this.label.htmlText);
      this.label.render(s);
      this.labelHolder.css('width', this.width).css('height', this.height);
      e.append(this.labelHolder);
      return this;
    };

    Diamond.prototype.doRenderProperties = function(e) {
      var p, props, v, _i, _len;
      props = PROPERTIES[this.className];
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        v = this.definition[p];
        switch (p) {
          case fb.StyleConstants.BOLD:
            e.css("font-weight", this.bold);
            break;
          case fb.StyleConstants.ITALIC:
            e.css("font-style", this.italic);
            break;
          case fb.StyleConstants.UNDERLINE:
            e.css("text-decoration", this.underline);
            break;
          case fb.StyleConstants.TEXTALIGN:
            e.css("text-align", this.textAlign);
            break;
          case fb.StyleConstants.LEADING:
            e.css("line-height", this.leading);
            break;
          case fb.StyleConstants.FONTSIZE:
            e.css("font-size", this.fontSize);
            break;
          case fb.StyleConstants.FONTCOLOR:
            e.css("color", this.fontColor);
            break;
          case fb.StyleConstants.FONTFAMILY:
            e.css("font-family", this.fontFamily);
        }
      }
      return this;
    };

    return Diamond;

  })(fb.AbstractShape);

  namespace('fb', function(exports) {
    return exports.Diamond = Diamond;
  });

  Ellipse = (function(_super) {
    __extends(Ellipse, _super);

    function Ellipse(definition) {
      this.definition = definition;
      this.className = 'Ellipse';
      Ellipse.__super__.constructor.call(this, this.definition);
    }

    Ellipse.prototype.doRender = function(e) {
      var paper, s;
      if (this.borderColor === '#0') {
        this.borderColor = '#000000';
      }
      paper = Raphael(e.get()[0], this.width, this.height);
      this.shape = paper.ellipse(this.width / 2, this.height / 2, this.width / 2 - this.borderThickness, this.height / 2 - this.borderThickness);
      this.shape.attr('stroke', this.borderColor).attr("fill", this.backgroundColor);
      if (this.borderStyle === "none") {
        this.shape.attr('stroke-width', 0);
      } else {
        this.shape.attr('stroke-width', this.borderThickness);
      }
      if (this.borderStyle === "dashed") {
        this.shape.attr('stroke-dasharray', "- ");
      }
      if (this.backgroundAlpha >= 0) {
        this.shape.attr('fill-opacity', this.backgroundAlpha);
      }
      this.labelHolder = $('<div class="textHolder">');
      this.label = new fb.LabeledObject(this.labelText, this);
      s = this.appendTextCell(this.labelHolder, this.label.htmlText);
      this.label.render(s);
      this.labelHolder.css('width', this.width).css('height', this.height);
      e.append(this.labelHolder);
      return this;
    };

    Ellipse.prototype.doRenderProperties = function(e) {
      var p, props, v, _i, _len;
      props = PROPERTIES[this.className];
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        v = this.definition[p];
        switch (p) {
          case fb.StyleConstants.BOLD:
            e.css("font-weight", this.bold);
            break;
          case fb.StyleConstants.ITALIC:
            e.css("font-style", this.italic);
            break;
          case fb.StyleConstants.UNDERLINE:
            e.css("text-decoration", this.underline);
            break;
          case fb.StyleConstants.TEXTALIGN:
            e.css("text-align", this.textAlign);
            break;
          case fb.StyleConstants.LEADING:
            e.css("line-height", this.leading);
            break;
          case fb.StyleConstants.FONTSIZE:
            e.css("font-size", this.fontSize);
            break;
          case fb.StyleConstants.FONTCOLOR:
            e.css("color", this.fontColor);
            break;
          case fb.StyleConstants.FONTFAMILY:
            e.css("font-family", this.fontFamily);
        }
      }
      return this;
    };

    return Ellipse;

  })(fb.AbstractShape);

  namespace('fb', function(exports) {
    return exports.Ellipse = Ellipse;
  });

  FlairComponentsGroup = (function(_super) {
    __extends(FlairComponentsGroup, _super);

    function FlairComponentsGroup(definition, page) {
      var c, component, _i, _len, _ref;
      this.definition = definition;
      this.page = page;
      this.className = 'FlairComponentsGroup';
      FlairComponentsGroup.__super__.constructor.call(this, this.definition);
      this.components = [];
      _ref = this.definition.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        component = fb.newComponent(c.clasz, c, this.page);
        if (!component) {
          continue;
        }
        component.container = this;
        component.page = this.page;
        this.page.register(component);
        this.components.push(component);
      }
    }

    FlairComponentsGroup.prototype.doRender = function(elem) {
      var component, e, _i, _len, _ref;
      elem.css("width", this.width).css("height", this.height);
      this.content = $('<div class="FlairComponentsGroupContent"></div>');
      this.content.css("top", -this.y).css("left", -this.x);
      _ref = this.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        e = $('<div class="FlairBuilderWidget"></div>');
        component.render(e);
        this.content.append(e);
        if (component.hidden || !component.visible) {
          e.css("display", "none");
        }
      }
      return elem.append(this.content);
    };

    return FlairComponentsGroup;

  })(fb.FlairComponent);

  namespace("fb", function(exports) {
    return exports.FlairComponentsGroup = FlairComponentsGroup;
  });

  GoogleMap = (function(_super) {
    __extends(GoogleMap, _super);

    function GoogleMap(definition) {
      this.definition = definition;
      this.className = 'GoogleMap';
      GoogleMap.__super__.constructor.call(this, this.definition);
    }

    GoogleMap.prototype.doRender = function(e) {
      var D, bottom, circle, content, h, left, paper, path, top, w, wh;
      content = $('<object data="images/map.svg" type="image/svg+xml"></object>');
      content.attr('width', this.width - 1).attr('height', this.height - 1);
      e.append(content);
      paper = Raphael(e.get()[0], this.width - 1, this.height - 1);
      paper.canvas.setAttribute('style', 'overflow:hidden; position:absolute');
      top = 20;
      left = 15;
      w = 50;
      h = 50;
      wh = Math.min(w, h) / 2;
      D = 5;
      circle = paper.circle(left + wh, top + wh, wh);
      circle.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness).attr("fill", "#FFFFFF");
      path = paper.path("M " + (left + wh - D) + " " + (top + 2 * D) + " L " + (left + wh) + " " + (top + D) + " L " + (left + wh + D) + " " + (top + 2 * D));
      path.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
      path = paper.path("M " + (left + 2 * wh - 2 * D) + " " + (top + wh - D) + " L " + (left + 2 * wh - D) + " " + (top + wh) + " L " + (left + 2 * wh - 2 * D) + " " + (top + wh + D));
      path.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
      path = paper.path("M " + (left + wh - D) + " " + (top + 2 * wh - 2 * D) + " L " + (left + wh) + " " + (top + 2 * wh - D) + " L " + (left + wh + D) + " " + (top + 2 * wh - 2 * D));
      path.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
      path = paper.path("M " + (left + 2 * D) + " " + (top + wh - D) + " L " + (left + D) + " " + (top + wh) + " L " + (left + 2 * D) + " " + (top + wh + D));
      path.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
      /* draw zoom        
      top = 90
      left = 32
      w = 15
      w2 = Math.round(w/2)
      h = @height/3
      if h > 100 
          h = 100
      
      rect = paper.rect(left, top, w, D)
      rect.attr('stroke', @borderColor).attr('stroke-width', @borderThickness).attr("fill", "#FFFFFF")
      
      rect = paper.rect(left + w/3, top + D, w/3, h - 2*D)
      rect.attr('stroke', @borderColor).attr('stroke-width', @borderThickness).attr("fill", "#FFFFFF")
      
      rect = paper.rect(left, top + h - D, w, D)
      rect.attr('stroke', @borderColor).attr('stroke-width', @borderThickness).attr("fill", "#FFFFFF")
      
      line = paper.path("M " + (left + w2 - 3) + (top + w2) + " L " + (left + w2 + 3) + (top + w2))
      line.attr('stroke', @borderColor).attr('stroke-width', @borderThickness)
      
      line = paper.path("M " + (left + w2) + (top + w2 - 3) + " L " + (left + w2) + (top + w2 + 3))
      line.attr('stroke', @borderColor).attr('stroke-width', @borderThickness)
      
      line = paper.path("M " + (left + w2 - 3) + (top + h - w2 + 1) + " L " + (left + w2 + 3) + (top + h - w2 + 1))
      line.attr('stroke', @borderColor).attr('stroke-width', @borderThickness)
      */

      left = 20;
      bottom = 5;
      w = 52;
      h = 10;
      path = paper.path("M " + left + " " + (this.height - h - bottom) + " L " + left + " " + (this.height - bottom));
      path.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
      path = paper.path("M " + left + " " + (this.height - h / 2 - bottom) + " L " + (left + w) + " " + (this.height - h / 2 - bottom));
      path.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
      path = paper.path("M " + (left + w) + " " + (this.height - h / 2 - bottom) + " L " + (left + w) + " " + (this.height - bottom));
      path.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
      path = paper.path("M " + (left + 2 * w / 3) + " " + (this.height - h - bottom) + " L " + (left + 2 * w / 3) + " " + (this.height - h / 2 - bottom));
      path.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
      return this;
    };

    return GoogleMap;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.GoogleMap = GoogleMap;
  });

  GroupBox = (function(_super) {
    __extends(GroupBox, _super);

    function GroupBox(definition) {
      this.definition = definition;
      this.className = 'GroupBox';
      GroupBox.__super__.constructor.call(this, this.definition);
      this.title = this.definition.title;
    }

    GroupBox.prototype.doRender = function(e) {
      var content, legend;
      this.label = new fb.LabeledObject(this.title, this);
      legend = $('<legend pos="' + this.textAlign + '"><span>' + new fb.LabeledObject(this.title, this).htmlText + '</span></legend>').css('top', 2);
      this.label.render(legend.find('span'));
      content = $('<fieldset>').append(legend);
      content.css('height', this.height - 8);
      e.append(content);
      e.css("padding-top", "8px");
      return this;
    };

    GroupBox.prototype.doRenderProperties = function(e) {
      var element;
      element = e.children().first();
      GroupBox.__super__.doRenderProperties.call(this, element);
      return this;
    };

    return GroupBox;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.GroupBox = GroupBox;
  });

  HorizontalRule = (function(_super) {
    __extends(HorizontalRule, _super);

    function HorizontalRule(definition) {
      this.definition = definition;
      this.className = 'HorizontalRule';
      HorizontalRule.__super__.constructor.call(this, this.definition);
    }

    HorizontalRule.prototype.doRender = function(e) {
      e.append($('<hr />'));
      return this;
    };

    return HorizontalRule;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.HorizontalRule = HorizontalRule;
  });

  HotSpot = (function(_super) {
    __extends(HotSpot, _super);

    function HotSpot(definition) {
      this.definition = definition;
      this.className = 'HotSpot';
      HotSpot.__super__.constructor.call(this, this.definition);
    }

    HotSpot.prototype.doRender = function(e) {
      return this;
    };

    HotSpot.prototype.attachTriggers = function() {
      this.e.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_CLICK, "", event);
        return false;
      }, this));
      this.e.mouseenter($.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_ENTER, "", event);
        return false;
      }, this));
      return this.e.mouseleave($.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_OUT, "", event);
        return false;
      }, this));
    };

    return HotSpot;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.HotSpot = HotSpot;
  });

  IPhoneBadge = (function(_super) {
    __extends(IPhoneBadge, _super);

    function IPhoneBadge(definition) {
      this.definition = definition;
      this.className = 'IPhoneBadge';
      this.definition.borderStyle = 'solid';
      this.definition.borderThickness = 2;
      IPhoneBadge.__super__.constructor.call(this, this.definition);
      if ($.browser.webkit) {
        this.width = this.width - 2 * this.borderThickness;
      }
      this.style = this.definition.style;
    }

    IPhoneBadge.prototype.doRender = function(e) {
      var c;
      e.css("font-weight", "bold").css("color", this.borderColor).css("text-align", "center").css("border-radius", "12px");
      c = "";
      if (this.style === "plus") {
        c = "+";
      } else if (this.style === "minus") {
        c = "&#8211;";
      } else if (this.style === "gt") {
        c = ">";
      } else if (this.style === "thick") {
        c = "v";
      }
      this.appendTextCell(e, c);
      return this;
    };

    return IPhoneBadge;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.IPhoneBadge = IPhoneBadge;
  });

  IPhoneBar = (function(_super) {
    __extends(IPhoneBar, _super);

    function IPhoneBar(definition) {
      this.definition = definition;
      this.className = 'IPhoneBar';
      this.definition.borderThickness = 0;
      IPhoneBar.__super__.constructor.call(this, this.definition);
      this.borderThickness = 0;
    }

    IPhoneBar.prototype.doRender = function(e) {
      var lighterDiv, s, titleDiv;
      this.label = new fb.LabeledObject(this.labelText, this);
      lighterDiv = $('<div>').css('width', this.width - 2 * this.borderThickness).css('height', this.height / 2).css('position', 'absolute').css('top', this.borderThickness + "px").css('left', this.borderThickness + "px").css('background', adjustBrightness(this.definition.backgroundColor, 25));
      e.append(lighterDiv);
      titleDiv = $('<div>').css('width', this.width - 2 * this.borderThickness).css('height', this.height - 2 * this.borderThickness).css('position', 'absolute').css('top', this.borderThickness + "px").css('left', this.borderThickness + "px").css('display', 'table');
      e.append(titleDiv);
      s = this.appendTextCell(titleDiv, this.label.htmlText);
      this.label.render(s);
      e.css("text-align", "center");
      return this;
    };

    return IPhoneBar;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.IPhoneBar = IPhoneBar;
  });

  IPhoneButtonBar = (function(_super) {
    __extends(IPhoneButtonBar, _super);

    function IPhoneButtonBar(definition) {
      this.definition = definition;
      this.className = 'IPhoneButtonBar';
      IPhoneButtonBar.__super__.constructor.call(this, this.definition);
      this.buttonData = unescape(this.definition.data).split(',');
    }

    IPhoneButtonBar.prototype.doRender = function(e) {
      var content, entry, item, lbl, n, _i, _len, _ref;
      this.labels = {};
      content = $('<ul>');
      n = 0;
      _ref = this.buttonData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        n++;
        lbl = new fb.LabeledObject(entry, this);
        this.labels[entry] = lbl;
        item = $('<li>' + lbl.htmlText + '</li>');
        lbl.render(item);
        if (lbl.selected) {
          item.addClass('selected');
        }
        content.append(item);
      }
      content.find('li').css('width', this.width / n).css('height', this.height).css('line-height', this.height + 'px');
      content.find('li').on('click', function(event) {
        var li;
        li = $(this);
        if (!li.hasClass('selected')) {
          li.parent().find('li').removeClass('selected');
          return li.addClass('selected');
        }
      });
      e.append(content);
      return this;
    };

    IPhoneButtonBar.prototype.doRenderProperties = function(e) {
      var p, props, v, _i, _len;
      props = PROPERTIES[this.className];
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        v = this.definition[p];
        switch (p) {
          case fb.StyleConstants.TEXTALIGN:
            e.css("text-align", this.textAlign);
            break;
          case fb.StyleConstants.LEADING:
            e.css("line-height", this.leading);
            break;
          case fb.StyleConstants.FONTSIZE:
            e.css("font-size", this.fontSize);
            break;
          case fb.StyleConstants.FONTCOLOR:
            e.css("color", this.fontColor);
            break;
          case fb.StyleConstants.FONTFAMILY:
            e.css("font-family", this.fontFamily);
            break;
          case fb.StyleConstants.BORDERCOLOR:
            e.find('li').css("border-color", this.borderColor);
        }
      }
      return this;
    };

    IPhoneButtonBar.prototype.attachTriggers = function() {
      this.e.find('li').on('click', $.proxy(function(event) {
        var li;
        event.preventDefault();
        li = $(event.target);
        this.dispatchEvent(ITEM_CLICK, li.text());
        return false;
      }, this));
      return this;
    };

    return IPhoneButtonBar;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.IPhoneButtonBar = IPhoneButtonBar;
  });

  IPhoneCheckBox = (function(_super) {
    __extends(IPhoneCheckBox, _super);

    function IPhoneCheckBox(definition) {
      this.definition = definition;
      this.className = 'IPhoneCheckBox';
      IPhoneCheckBox.__super__.constructor.call(this, this.definition);
      this.label = this.definition.label;
    }

    IPhoneCheckBox.prototype.doRender = function(e) {
      e.css("width", this.width).css("height", this.height + 2).css("border-radius", this.height);
      e.append("<div class=\"IPhoneCheckBoxKnob\" style=\"width:" + this.height + "px;height:" + this.height + "px;border-radius:" + this.height + "px;\"></div>");
      this.checked = this.label === 'ON';
      if (this.checked) {
        e.append("<div class=\"IPhoneCheckBoxLabel\">ON</div>");
        e.addClass("selected");
      } else {
        e.append("<div class=\"IPhoneCheckBoxLabel\">OFF</div>");
      }
      return this;
    };

    IPhoneCheckBox.prototype.getPropertyValue = function(property) {
      if (property === fb.IS_SELECTED) {
        return true;
      } else if (property === fb.IS_NOT_SELECTED) {
        return false;
      }
    };

    IPhoneCheckBox.prototype.attachTriggers = function() {
      var _this = this;
      return $(this.e).on('click', function(event) {
        event.preventDefault();
        _this.checked = !_this.checked;
        _this.dispatchEvent(CHANGE);
        if (_this.checked) {
          $(_this.e).addClass("selected");
          $(_this.e).find(".IPhoneCheckBoxLabel").text("ON");
          _this.dispatchEvent(CHECKBOX_SELECTED);
        } else {
          $(_this.e).removeClass("selected");
          $(_this.e).find(".IPhoneCheckBoxLabel").text("OFF");
          _this.dispatchEvent(CHECKBOX_UNSELECTED);
        }
        return false;
      });
    };

    return IPhoneCheckBox;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.IPhoneCheckBox = IPhoneCheckBox;
  });

  IPhoneDotsBar = (function(_super) {
    __extends(IPhoneDotsBar, _super);

    function IPhoneDotsBar(definition) {
      this.definition = definition;
      this.className = 'IPhoneDotsBar';
      IPhoneDotsBar.__super__.constructor.call(this, this.definition);
      this.dots = parseInt(this.definition.dots);
    }

    IPhoneDotsBar.prototype.doRender = function(e) {
      var allDots, i;
      i = 0;
      while (i < this.dots) {
        if (i === 0) {
          e.append('<span class="IPhoneDotsBarDot IPhoneDotsBarSelectedDot">&#9679;</span>');
        } else {
          e.append('<span class="IPhoneDotsBarDot">&#9679;</span>');
        }
        i++;
      }
      allDots = e.find('span');
      allDots.on('click', function() {
        allDots.removeClass('IPhoneDotsBarSelectedDot');
        $(this).addClass('IPhoneDotsBarSelectedDot');
        return i = $(this).index();
      });
      return this;
    };

    IPhoneDotsBar.prototype.attachTriggers = function() {
      this.e.find('span').on('click', $.proxy(function(event) {
        var span;
        span = $(event.target);
        this.dispatchEvent(ITEM_CLICK);
        return this;
      }, this));
      return this;
    };

    return IPhoneDotsBar;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.IPhoneDotsBar = IPhoneDotsBar;
  });

  IPhoneHorizontalSlider = (function(_super) {
    __extends(IPhoneHorizontalSlider, _super);

    function IPhoneHorizontalSlider(definition) {
      this.definition = definition;
      this.className = 'IPhoneHorizontalSlider';
      IPhoneHorizontalSlider.__super__.constructor.call(this, this.definition);
      this.selectedValue = parseInt(this.definition.selectedValue);
    }

    IPhoneHorizontalSlider.prototype.doRender = function(e) {
      var leftTrack, rightTrack, thumb, track,
        _this = this;
      track = $('<div class="SliderTrack"></div>');
      leftTrack = $('<div class="leftTrack"></div>');
      track.append(leftTrack);
      rightTrack = $('<div class="rightTrack"></div>');
      track.append(rightTrack);
      e.append(track);
      thumb = $('<div class="SliderThumb"></div>');
      track.append(thumb);
      leftTrack.css('width', 0);
      rightTrack.css('width', this.width);
      thumb.css("left", this.selectedValue);
      leftTrack.css('width', this.selectedValue + 11);
      rightTrack.css('width', this.width - this.selectedValue - 11);
      thumb.on('mousedown', function(event) {
        event.preventDefault();
        $(document).on("mousemove.slider", function(event) {
          var os, x;
          os = e.offset();
          x = event.pageX - 11 - os.left;
          x = Math.max(0, x);
          x = Math.min(x, _this.width - 21);
          thumb.css("left", x);
          leftTrack.css('width', x + 11);
          rightTrack.css('width', _this.width - x - 11);
          return false;
        });
        false;
        return $(document).on("mouseup.slider", function(event) {
          $(document).off("mousemove.slider");
          return $(document).off("mouseup.slider");
        });
      });
      return this;
    };

    return IPhoneHorizontalSlider;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.IPhoneHorizontalSlider = IPhoneHorizontalSlider;
  });

  IPhoneLargeButton = (function(_super) {
    __extends(IPhoneLargeButton, _super);

    function IPhoneLargeButton(definition) {
      this.definition = definition;
      this.className = 'IPhoneLargeButton';
      this.definition.borderThickness = 0;
      IPhoneLargeButton.__super__.constructor.call(this, this.definition);
    }

    IPhoneLargeButton.prototype.doRender = function(e) {
      var s;
      this.label = new fb.LabeledObject(this.labelText, this);
      s = this.appendTextCell(e, this.label.htmlText);
      return this.label.render(s);
    };

    IPhoneLargeButton.prototype.attachTriggers = function() {
      this.e.on('click', $.proxy(function(event) {
        var item;
        item = $(event.target);
        this.dispatchEvent(MOUSE_CLICK, item.text(), event);
        return this;
      }, this));
      return this;
    };

    return IPhoneLargeButton;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.IPhoneLargeButton = IPhoneLargeButton;
  });

  IPhonePicker = (function(_super) {
    __extends(IPhonePicker, _super);

    function IPhonePicker(definition) {
      this.definition = definition;
      this.className = 'IPhonePicker';
      IPhonePicker.__super__.constructor.call(this, this.definition);
      this.columns = this.data = unescape(this.definition.data).split('\r');
      this.borderThickness = 0;
    }

    IPhonePicker.prototype.doRender = function(e) {
      var c, column, content, lighterDiv, r, rows, titleDiv, viewer, _i, _j, _len, _len1, _ref;
      lighterDiv = $('<div class="lighterDiv">').css('width', this.width - 2 * this.borderThickness).css('height', this.height / 2);
      e.append(lighterDiv);
      titleDiv = $('<div>').css('width', this.width - 2 * this.borderThickness).css('height', this.height - 2 * this.borderThickness).css('position', 'absolute').css('top', this.borderThickness + "px").css('left', this.borderThickness + "px").css('display', 'table');
      e.append(titleDiv);
      content = $('<div class="IPhonePickerContent"></div>');
      content.css('height', this.height + 'px');
      _ref = this.columns;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        rows = c.split(',');
        column = $('<div class="IPhonePickerColumn"></div>');
        for (_j = 0, _len1 = rows.length; _j < _len1; _j++) {
          r = rows[_j];
          if (r === '') {
            r = '&nbsp;';
          }
          column.append('<div>' + r + '</div>');
        }
        content.append(column);
      }
      titleDiv.append(content);
      viewer = $('<div class="IPhonePickerViewer"><div></div></div>');
      viewer.css("top", (-((this.height - 12) / 2)) + 'px');
      if ($.browser.webkit) {
        viewer.css("top", (-(this.height - 5)) + 'px');
      }
      content.append(viewer);
      return this;
    };

    return IPhonePicker;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.IPhonePicker = IPhonePicker;
  });

  IPhonePointyButton = (function(_super) {
    __extends(IPhonePointyButton, _super);

    function IPhonePointyButton(definition) {
      this.definition = definition;
      this.className = 'IPhonePointyButton';
      IPhonePointyButton.__super__.constructor.call(this, this.definition);
      this.direction = this.definition.direction;
    }

    IPhonePointyButton.prototype.doRender = function(e) {
      var P, a, brdColor, div, paper, path, radius, s, shape;
      paper = Raphael(e.get()[0], this.width - 1, this.height - 1);
      brdColor = adjustBrightness(this.definition.backgroundColor, -25);
      P = 12;
      radius = 5;
      a = radius * 0.292893218813453;
      s = radius * 0.585786437626905;
      if (this.direction === 'left') {
        path = "M " + (paper.width - radius) + " 0 Q " + (paper.width - s) + " 0 " + (paper.width - a) + " " + a + " Q " + paper.width + " " + s + " " + paper.width + " " + radius + " L " + paper.width + " " + (paper.height - radius) + " Q " + paper.width + " " + (paper.height - s) + " " + (paper.width - a) + " " + (paper.height - a) + " Q " + paper.width + " " + (paper.height - s) + " " + (paper.width - radius) + " " + paper.height + " L " + P + " " + paper.height + " L 0 " + paper.height / 2 + " L " + P + " 0 L " + (paper.width - radius) + " 0 z";
        shape = paper.path(path);
      } else if (this.direction === 'normal') {
        shape = paper.rect(0, 0, paper.width, paper.height, radius);
      } else if (this.direction === 'right') {
        path = "M " + (paper.width - P) + " 0 L " + paper.width + " " + paper.height / 2 + " L " + (paper.width - P) + " " + paper.height + " L " + radius + " " + paper.height + " Q " + s + " " + paper.height + " " + a + " " + (paper.height - a) + " Q 0 " + (paper.height - s) + " 0 " + (paper.height - radius) + " L 0 " + radius + " Q 0 " + s + " " + a + " " + a + " Q " + s + " 0 " + radius + " 0 z";
        shape = paper.path(path);
      }
      shape.attr('stroke', brdColor).attr("stroke-width", 1).attr('fill', this.backgroundColor);
      if (this.direction === 'left') {
        path = "M " + (paper.width - radius) + " 0 Q " + (paper.width - s) + " 0 " + (paper.width - a) + " " + a + " Q " + paper.width + " " + s + " " + paper.width + " " + radius + " L " + paper.width + " " + paper.height / 2 + " L 0 " + paper.height / 2 + " L " + P + " 0 L " + paper.width + " 0 z";
        shape = paper.path(path);
      } else if (this.direction === 'normal') {
        path = "M " + (paper.width - radius) + " 0 Q " + (paper.width - s) + " 0 " + (paper.width - a) + " " + a + " Q " + paper.width + " " + s + " " + paper.width + " " + radius + " L " + paper.width + " " + paper.height / 2 + " L 0 " + paper.height / 2 + " L 0 " + radius + " Q 0 " + s + " " + a + " " + a + " Q " + s + " 0 " + radius + " 0 " + " L " + paper.width + " 0 z";
        shape = paper.path(path);
      } else if (this.direction === 'right') {
        path = "M " + radius + " 0 L " + (paper.width - P) + " 0 L " + paper.width + " " + paper.height / 2 + " L 0 " + paper.height / 2 + " L 0 " + radius + " Q 0 " + s + " " + a + " " + a + " Q " + s + " 0 " + radius + " 0 z";
        shape = paper.path(path);
      }
      shape.attr('stroke', "#FFFFFF").attr("stroke-width", 1).attr('stroke-opacity', 0).attr('fill', "#FFFFFF").attr('fill-opacity', 0.25);
      div = $('<div class="textHolder">');
      this.label = new fb.LabeledObject(this.labelText, this);
      s = this.appendTextCell(div, this.label.htmlText);
      this.label.render(s);
      div.css('width', this.width).css('height', this.height);
      e.append(div);
      return this;
    };

    IPhonePointyButton.prototype.attachTriggers = function() {
      this.e.on('click', $.proxy(function(event) {
        var item;
        item = $(event.target);
        this.dispatchEvent(MOUSE_CLICK, item.text(), event);
        return this;
      }, this));
      return this;
    };

    IPhonePointyButton.prototype.doRenderProperties = function(e) {
      var p, props, v, _i, _len;
      props = PROPERTIES[this.className];
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        v = this.definition[p];
        switch (p) {
          case fb.StyleConstants.BOLD:
            e.css("font-weight", this.bold);
            break;
          case fb.StyleConstants.ITALIC:
            e.css("font-style", this.italic);
            break;
          case fb.StyleConstants.UNDERLINE:
            e.css("text-decoration", this.underline);
            break;
          case fb.StyleConstants.TEXTALIGN:
            e.css("text-align", this.textAlign);
            break;
          case fb.StyleConstants.LEADING:
            e.css("line-height", this.leading);
            break;
          case fb.StyleConstants.FONTSIZE:
            e.css("font-size", this.fontSize);
            break;
          case fb.StyleConstants.FONTCOLOR:
            e.css("color", this.fontColor);
            break;
          case fb.StyleConstants.FONTFAMILY:
            e.css("font-family", this.fontFamily);
        }
      }
      return this;
    };

    return IPhonePointyButton;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.IPhonePointyButton = IPhonePointyButton;
  });

  IPhoneShell = (function(_super) {
    __extends(IPhoneShell, _super);

    function IPhoneShell(definition) {
      var tmp;
      this.definition = definition;
      this.className = 'IPhoneShell';
      IPhoneShell.__super__.constructor.call(this, this.definition);
      this.direction = this.definition.direction;
      if (this.width > this.height) {
        tmp = this.width;
        this.width = this.height;
        this.height = tmp;
      }
    }

    IPhoneShell.prototype.doRender = function(e) {
      var content, tr;
      content = $('<div class="iphone-outer"><div class="iphone-speaker"/><div class="iphone-screen"/><div class="iphone-button-outer"><div class="iphone-button-inner"</div></div></div>');
      content.css('width', this.width - 1).css('height', this.height - 1);
      e.append(content);
      if (this.direction === 'horizontal') {
        tr = Math.abs(this.height - this.width) / 2;
        e.css('-transform', "rotate(-90deg) translate(" + tr + 'px, ' + tr + 'px)');
        e.css('-moz-transform', "rotate(-90deg) translate(" + tr + 'px, ' + tr + 'px)');
        e.css('-o-transform', "rotate(-90deg) translate(" + tr + 'px, ' + tr + 'px)');
        e.css('-webkit-transform', "rotate(-90deg) translate(" + tr + 'px, ' + tr + 'px)');
        e.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)');
      }
      return this;
    };

    return IPhoneShell;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.IPhoneShell = IPhoneShell;
  });

  IPhoneTableList = (function(_super) {
    __extends(IPhoneTableList, _super);

    function IPhoneTableList(definition) {
      this.definition = definition;
      this.className = 'IPhoneTableList';
      IPhoneTableList.__super__.constructor.call(this, this.definition);
      this.rowData = unescape(this.definition.data).split('\r');
    }

    IPhoneTableList.prototype.doRender = function(e) {
      var content, re, row, _i, _len, _ref;
      content = $('<ul>');
      this.rowHeight = Math.floor(this.height / this.rowData.length);
      _ref = this.rowData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        re = this.makeRow(row);
        re.css('height', this.rowHeight - 1);
        content.append(re);
      }
      e.append(content);
      e.css('border-style', 'solid').css('border-width', this.borderThickness + 'px').css('border-color', this.borderColor);
      return this;
    };

    IPhoneTableList.prototype.makeRow = function(entry) {
      var content, data, icon, labeledObj, right, txt;
      data = this.parseData(entry);
      icon = data[0];
      labeledObj = data[1];
      right = data[2];
      content = $('<li>');
      if ((icon != null) && icon.length > 0) {
        content.append($('<div class="left FlairBuilderWidgetLabel">' + this.getLeftContent(icon) + '</div>'));
      }
      txt = $('<span class="FlairBuilderWidgetLabel">' + labeledObj.htmlText + '</span>');
      content.append(txt);
      labeledObj.render(txt);
      if (right != null) {
        content.append($('<div class="right FlairBuilderWidgetLabel">' + this.getRightContent(right) + '</div>'));
      }
      content.css('width', "100%").css('height', this.rowHeight - 1);
      return content;
    };

    IPhoneTableList.prototype.parseData = function(line) {
      var l, s1, s2, s3, terms;
      s1 = '';
      s2 = '';
      s3 = '';
      if (line.indexOf("+ ") === 0) {
        s1 = this.syntaxToSymbol("+");
        line = line.substring(2);
      } else if (line.indexOf("- ") === 0) {
        s1 = this.syntaxToSymbol("-");
        line = line.substring(2);
      } else if (line.indexOf("v ") === 0) {
        s1 = this.syntaxToSymbol("v");
        line = line.substring(2);
      } else if (line.indexOf("* ") === 0) {
        s1 = this.syntaxToSymbol("*");
        line = line.substring(2);
      } else if (line.indexOf("_ ") === 0) {
        s1 = this.syntaxToSymbol("_");
        line = line.substring(2);
      } else if (line.indexOf("__ ") === 0) {
        s1 = this.syntaxToSymbol("__");
        line = line.substring(3);
      }
      if (line.indexOf(",") > 0) {
        line = line.replace(/(?!\\),/g, '_FBCOMMAFB_');
        line = line.replace(/\\,/g, ',');
        terms = line.split('_FBCOMMAFB_');
        if (terms.length === 1) {
          s2 = terms[0];
        } else if (terms.length > 1) {
          s2 = terms[0];
          s3 = terms[terms.length - 1];
          s3 = s3.trim();
          if (s3 === '>') {
            s3 = 'menu';
          } else if (s3 === '=') {
            s3 = 'drag';
          } else if (s3 === '(>)') {
            s3 = 'gt';
          }
        } else {
          s2 = '';
          s3 = '';
        }
      } else {
        s2 = line;
      }
      l = new fb.LabeledObject(s2, this);
      return [s1, l, s3];
    };

    IPhoneTableList.prototype.syntaxToSymbol = function(item) {
      if (item === "+") {
        return "plus";
      } else if (item === "-") {
        return "minus";
      } else if (item === "v") {
        return "mark";
      } else if (item === "*") {
        return "bullet";
      } else if (item === "_") {
        return "empty";
      } else if (item === ">") {
        return "menu";
      } else if (item === "__") {
        return "EMPTY";
      } else {
        return '';
      }
    };

    IPhoneTableList.prototype.getLeftContent = function(data) {
      return '<div class="' + data + '">' + data + '</div>';
    };

    IPhoneTableList.prototype.getRightContent = function(data) {
      return '<div class="' + data + '">' + data + '</div>';
    };

    IPhoneTableList.prototype.attachTriggers = function() {
      this.e.find('li').on('click', $.proxy(function(event) {
        var item;
        event.preventDefault();
        item = $(event.currentTarget);
        this.dispatchEvent(LIST_ITEM_CLICK, $(item.children().eq(1)).text());
        return false;
      }, this));
      this.e.find('li').on('dblclick', $.proxy(function(event) {
        var item;
        event.preventDefault();
        item = $(event.currentTarget);
        this.dispatchEvent(LIST_ITEM_DOUBLECLICK, $(item.children().eq(1)).text());
        return false;
      }, this));
      return this;
    };

    return IPhoneTableList;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.IPhoneTableList = IPhoneTableList;
  });

  Icon = (function(_super) {
    __extends(Icon, _super);

    function Icon(definition) {
      this.definition = definition;
      this.className = 'Icon';
      this.definition.color = this.definition.backgroundColor;
      this.definition.backgroundColor = '';
      Icon.__super__.constructor.call(this, this.definition);
      this.fontColor = intToColorHex(this.definition.color);
      this.icon = this.definition.iconName;
      this.size = this.definition.size;
      if (this.icon.indexOf("flair:") === 0) {
        this.icon = this.icon.substr(6);
      }
      if (this.icon.indexOf("user:") === 0) {
        this.icon = this.icon.substr(5);
        this.custom = true;
      } else if (this.icon != null) {
        this.custom = false;
      }
    }

    Icon.prototype.doRender = function(e) {
      var ei;
      if (this.custom) {
        e.css('background', 'url(assets/' + this.icon + '.png)').css('background-size', 'contain').css('background-repeat', 'no-repeat');
      } else {
        ei = $('<i class="icon-' + this.icon + '"></i>');
        ei.css("color", this.fontColor);
        if (this.size === "XS") {
          ei.css("width", "16px").css("height", "16px").css("font-size", "21px").css("line-height", "16px");
        } else if (this.size === "S") {
          ei.css("width", "24px").css("height", "24px").css("font-size", "31px").css("line-height", "24px");
        } else if (this.size === "M") {
          ei.css("width", "32px").css("height", "32px").css("font-size", "42px").css("line-height", "32px");
        } else if (this.size === "L") {
          ei.css("width", "48px").css("height", "48px").css("font-size", "60px").css("line-height", "48px");
        } else if (this.size === "XL") {
          ei.css("width", "64px").css("height", "64px").css("font-size", "84px").css("line-height", "64px");
        }
        e.append(ei);
      }
      return this;
    };

    Icon.prototype.attachTriggers = function() {
      this.e.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_CLICK, "", event);
        return false;
      }, this));
      this.e.on('dblclick', $.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_DOUBLE_CLICK, "", event);
        return false;
      }, this));
      this.e.mouseenter($.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_ENTER, "", event);
        return false;
      }, this));
      return this.e.mouseleave($.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_OUT, "", event);
        return false;
      }, this));
    };

    return Icon;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.Icon = Icon;
  });

  Image = (function(_super) {
    __extends(Image, _super);

    function Image(definition) {
      this.definition = definition;
      this.className = 'Image';
      this.source = this.definition.source;
      if (this.source) {
        this.definition.borderThickness = 0;
      }
      Image.__super__.constructor.call(this, this.definition);
    }

    Image.prototype.doRender = function(e) {
      var paper, path;
      if (this.source) {
        e.css('border', '0px solid ' + this.borderColor);
        e.css('background', 'url(data:image/png;base64,' + this.source + ')');
      } else {
        e.css('border', this.borderThickness + 'px solid ' + this.borderColor);
        if (this.borderColor === '#0') {
          this.borderColor = '#000000';
        }
        paper = Raphael(this.e.get()[0], this.width, this.height);
        path = paper.path("M 0 0 L " + this.width + " " + this.height);
        path.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
        path = paper.path("M " + this.width + " 0 L 0 " + this.height);
        path.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
        path = paper.rect(this.borderThickness / 2, this.borderThickness / 2, this.width - this.borderThickness, this.height - this.borderThickness);
        path.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
      }
      e.css("width", this.width);
      return this;
    };

    Image.prototype.attachTriggers = function() {
      var icon;
      icon = this.e;
      icon.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_CLICK, "", event);
        return false;
      }, this));
      icon.on('dblclick', $.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_DOUBLE_CLICK, "", event);
        return false;
      }, this));
      icon.mouseenter($.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_ENTER, "", event);
        return false;
      }, this));
      return icon.mouseleave($.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_OUT, "", event);
        return false;
      }, this));
    };

    return Image;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.Image = Image;
  });

  Label = (function(_super) {
    __extends(Label, _super);

    function Label(definition) {
      this.definition = definition;
      this.className = "Label";
      Label.__super__.constructor.call(this, this.definition);
    }

    Label.prototype.doRender = function(e) {
      var s;
      this.label = new fb.LabeledObject(this.labelText, this);
      s = this.appendTextCell(e, this.label.htmlText);
      return this.label.render(s);
    };

    return Label;

  })(fb.FlairComponent);

  namespace("fb", function(exports) {
    return exports.Label = Label;
  });

  Line = (function(_super) {
    __extends(Line, _super);

    function Line(definition) {
      this.definition = definition;
      this.className = 'Line';
      Line.__super__.constructor.call(this, this.definition);
      this.style = this.definition.style;
      this.direction = parseFloat(this.definition.direction);
      this.curve = parseFloat(this.definition.curve);
      this.arrowStart = this.isTrue(this.definition.arrowStart);
      this.arrowEnd = this.isTrue(this.definition.arrowEnd);
    }

    Line.prototype.doRender = function(e) {
      var PIp12, aEnd, aStart, al, cal, d, line, paper, path, sal, x1, x2, y1, y2;
      paper = Raphael(e.get()[0], this.width, this.height);
      x1 = y1 = 0;
      x2 = paper.width;
      y2 = paper.height;
      PIp12 = Math.PI / 12;
      d = 10;
      if (this.direction === -1) {
        x1 = paper.width;
        y1 = 0;
        x2 = 0;
        y2 = paper.height;
      }
      if (paper.height <= 11) {
        if (paper.width > 11) {
          y1 = y2 = paper.height / 2;
        } else {
          if (direction === 1) {
            x1 = 0;
            x2 = paper.width;
          } else {
            x1 = x2 = paper.width / 2;
          }
        }
      } else {
        if (paper.width <= 11) {
          x1 = x2 = paper.width / 2;
        }
      }
      if (this.arrowStart || this.arrowEnd) {
        al = Math.atan2(paper.height * (1 - this.direction * this.curve), paper.width * (1 + this.direction * this.curve));
        sal = d * Math.sin(al + PIp12);
        cal = d * Math.cos(al + PIp12);
      }
      path = "M ";
      if (this.curve === 0 && !(this.arrowEnd || this.arrowStart)) {
        path += x1 + " " + y1 + " L " + x2 + " " + y2;
      } else {
        d = 10;
        path += x1 + ' ' + y1;
        if (this.direction === 1) {
          path += ' Q ' + (paper.width / 2 + this.curve * paper.width / 2) + " " + (paper.height / 2 - this.curve * paper.height / 2) + " " + x2 + " " + y2;
          if (this.arrowStart) {
            aStart = "M " + (x1 + cal) + " " + (y1 + sal) + " L " + x1 + " " + y1 + " L " + (x1 + d * Math.cos(al - PIp12)) + " " + (y1 + d * Math.sin(al - PIp12)) + " L " + (x1 + cal) + " " + (y1 + sal) + " z";
          }
          if (this.arrowEnd) {
            al = Math.atan2(paper.width * (1 - this.curve), paper.height * (1 + this.curve));
            sal = d * Math.sin(al + PIp12);
            cal = d * Math.cos(al + PIp12);
            aEnd = "M " + (x2 - sal) + " " + (y2 - cal) + " L " + x2 + " " + y2 + " L " + (x2 - d * Math.sin(al - PIp12)) + " " + (y2 - d * Math.cos(al - PIp12)) + " L " + (x2 - sal) + " " + (y2 - cal) + " z";
          }
        } else if (this.direction === -1) {
          path += ' Q ' + (paper.width / 2 + this.curve * paper.width / 2) + " " + (paper.height / 2 + this.curve * paper.height / 2) + " " + x2 + " " + y2;
          if (this.arrowStart) {
            al = Math.atan2(paper.height * (1 + this.curve), paper.width * (1 - this.curve));
            aStart = "M " + (x1 - cal) + " " + (y1 + sal) + " L " + x1 + " " + y1 + " L " + (x1 - d * Math.cos(al - PIp12)) + " " + (y1 + d * Math.sin(al - PIp12)) + " L " + (x1 - cal) + " " + (y1 + sal) + " z";
          }
          if (this.arrowEnd) {
            al = Math.atan2(paper.width * (1 + this.curve), paper.height * (1 - this.curve));
            sal = d * Math.sin(al + PIp12);
            cal = d * Math.cos(al + PIp12);
            aEnd = "M " + (x2 + sal) + " " + (y2 - cal) + " L " + x2 + " " + y2 + " L " + (x2 + d * Math.sin(al - PIp12)) + " " + (y2 - d * Math.cos(al - PIp12)) + " L " + (x2 + sal) + " " + (y2 - cal) + " z";
          }
        }
      }
      line = paper.path(path);
      line.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
      if (aStart) {
        line = paper.path(aStart);
        line.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
        line.attr("fill", this.borderColor);
      }
      if (aEnd) {
        line = paper.path(aEnd);
        line.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness);
        line.attr("fill", this.borderColor);
      }
      return this;
    };

    Line.prototype.doRenderProperties = function(e) {
      var p, props, v, _i, _len;
      props = PROPERTIES[this.className];
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        v = this.definition[p];
        switch (p) {
          case fb.StyleConstants.BOLD:
            e.css("font-weight", this.bold);
            break;
          case fb.StyleConstants.ITALIC:
            e.css("font-style", this.italic);
            break;
          case fb.StyleConstants.UNDERLINE:
            e.css("text-decoration", this.underline);
            break;
          case fb.StyleConstants.TEXTALIGN:
            e.css("text-align", this.textAlign);
            break;
          case fb.StyleConstants.LEADING:
            e.css("line-height", this.leading);
            break;
          case fb.StyleConstants.FONTSIZE:
            e.css("font-size", this.fontSize);
            break;
          case fb.StyleConstants.FONTCOLOR:
            e.css("color", this.fontColor);
            break;
          case fb.StyleConstants.FONTFAMILY:
            e.css("font-family", this.fontFamily);
        }
      }
      return this;
    };

    return Line;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.Line = Line;
  });

  Link = (function(_super) {
    __extends(Link, _super);

    function Link(definition) {
      this.definition = definition;
      this.className = "Link";
      Link.__super__.constructor.call(this, this.definition);
    }

    Link.prototype.doRender = function(e) {
      var s;
      this.label = new fb.LabeledObject(this.labelText, this);
      s = this.appendTextCell(e, this.label.htmlText);
      return this.label.render(s);
    };

    Link.prototype.attachTriggers = function() {
      this.e.on('click', $.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_CLICK, "", event);
        return false;
      }, this));
      this.e.mouseenter($.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_ENTER, "", event);
        return false;
      }, this));
      this.e.mouseleave($.proxy(function(event) {
        event.preventDefault();
        this.dispatchEvent(MOUSE_OUT, "", event);
        return false;
      }, this));
      return this;
    };

    return Link;

  })(fb.FlairComponent);

  namespace("fb", function(exports) {
    return exports.Link = Link;
  });

  LinkBar = (function(_super) {
    __extends(LinkBar, _super);

    function LinkBar(definition) {
      this.definition = definition;
      this.className = 'LinkBar';
      LinkBar.__super__.constructor.call(this, this.definition);
      this.linkData = decodeURI(this.definition.data).split(',');
    }

    LinkBar.prototype.doRender = function(e) {
      var content, entry, link, _i, _len, _ref;
      this.labels = [];
      content = $('<ul class="FlairBuilderWidgetLabel">');
      _ref = this.linkData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        link = this.getEntryContent(entry);
        content.append(link);
      }
      e.append($(content));
      return this;
    };

    LinkBar.prototype.getEntryContent = function(entry) {
      var content, label;
      label = new fb.LabeledObject(entry, this);
      this.labels.push(label);
      content = $('<a href="#">' + label.htmlText + '</a>');
      label.render(content);
      content.css('text-decoration', this.underline).css('color', this.color);
      return $('<li>').append(content);
    };

    LinkBar.prototype.attachTriggers = function() {
      var _this = this;
      return this.e.find('li').on('click', function(event) {
        var li;
        event.preventDefault();
        li = $(event.currentTarget);
        _this.dispatchEvent(ITEM_CLICK, li.text(), event);
        return false;
      });
    };

    return LinkBar;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.LinkBar = LinkBar;
  });

  List = (function(_super) {
    __extends(List, _super);

    function List(definition) {
      this.definition = definition;
      this.className = 'List';
      List.__super__.constructor.call(this, this.definition);
      this.listData = unescape(this.definition.data).split('\r');
      this.rowHeight = parseFloat(this.definition.rowHeight);
      this.showScrollbar = this.isTrue(this.definition.showScrollbar);
    }

    List.prototype.doRender = function(e) {
      var content, row, _i, _len, _ref;
      this.labels = [];
      content = $('<ul>');
      _ref = this.listData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        content.append(this.makeRow(row));
      }
      e.append(content);
      e.css('border-style', 'solid').css('border-width', this.borderThickness + 'px').css('border-color', this.borderColor);
      this.configureScrollBar(e);
      return this;
    };

    List.prototype.makeRow = function(entry) {
      var content, item, label;
      label = new fb.LabeledObject(entry, this);
      this.labels.push(label);
      item = $('<span class="FlairBuilderWidgetLabel">' + label.htmlText + '</span>');
      label.render(item);
      content = $('<li>').append(item);
      content.css('width', this.width).css('height', this.rowHeight).css('line-height', this.rowHeight + "px");
      return content;
    };

    List.prototype.configureScrollBar = function(e) {
      var scrollbar;
      if (this.showScrollbar) {
        scrollbar = fb.ScrollBar.getScrollbarContent(e.height(), 0);
        return e.append(scrollbar.css('top', 0));
      }
    };

    List.prototype.attachTriggers = function() {
      var _this = this;
      this.e.find('li').on('click', function(event) {
        var item;
        event.preventDefault();
        item = $(event.currentTarget);
        _this.dispatchEvent(LIST_ITEM_CLICK, item.text(), event);
        return false;
      });
      this.e.find('li').on('dblclick', function(event) {
        var item;
        event.preventDefault();
        item = $(event.currentTarget);
        _this.dispatchEvent(LIST_ITEM_DOUBLECLICK, item.text(), event);
        return false;
      });
      return this;
    };

    return List;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.List = List;
  });

  MenuBar = (function(_super) {
    var generateId;

    __extends(MenuBar, _super);

    function MenuBar(definition) {
      this.definition = definition;
      this.className = 'MenuBar';
      MenuBar.__super__.constructor.call(this, this.definition);
      this.horizontal = this.definition.style === 'horizontalButtonBar';
      this.useProjectStructure = this.isTrue(this.definition.useProjectStructure);
      this.data = decodeURI(this.definition.data).split('\r');
    }

    MenuBar.prototype.doRender = function(e) {
      var content, item, source, _i, _len, _ref;
      source = [];
      _ref = this.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        source.push(this.getDataAndRank(item));
      }
      content = this.processContent(source.shift(), source);
      e.append(content);
      return this;
    };

    MenuBar.prototype.getDataAndRank = function(item) {
      var rank;
      rank = item.lastIndexOf('-') + 1;
      if (rank !== 0) {
        item = item.substring(rank);
      }
      return {
        label: item,
        rank: rank
      };
    };

    MenuBar.prototype.processContent = function(item, source) {
      var content, id, label, labelItem, menuitem, rank, sub;
      rank = item.rank;
      content = $('<ul class="menu' + item.rank + '">');
      content.css('line-height', this.height + "px");
      while (item != null) {
        if (item.rank === rank) {
          id = this.generateId();
          label = new fb.LabeledObject(item.label, this);
          labelItem = $('<div class="FlairBuilderWidgetLabel"></div>');
          label.render(labelItem);
          menuitem = $('<li class="menu' + rank + '_item"><a id="' + id + '"></a></li>').css('height', this.height);
          menuitem.find("a").append(labelItem);
          content.append(menuitem);
        } else {
          if (item.rank > rank) {
            sub = this.processContent(item, source);
            content.find('li:last-child').append(sub);
          } else {
            source.unshift(item);
            break;
          }
        }
        item = source.shift();
      }
      return content;
    };

    generateId = function() {
      fb.FlairComponent.idCounter++;
      return fb.FlairComponent.idCounter.toString(16);
    };

    MenuBar.prototype.attachTriggers = function() {
      var _this = this;
      this.e.find('li').on('click', function(event) {
        var li, pg, txt;
        event.preventDefault();
        li = $(event.currentTarget);
        txt = $(li.children().first()).text();
        if (_this.useProjectStructure) {
          pg = _this.page.project.getPageByName(txt);
          _this.page.project.selectPage(pg.id);
        } else {
          _this.dispatchEvent(ITEM_CLICK, txt);
        }
        return false;
      });
      return this;
    };

    return MenuBar;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.MenuBar = MenuBar;
  });

  NumericStepper = (function(_super) {
    __extends(NumericStepper, _super);

    function NumericStepper(definition) {
      this.definition = definition;
      this.className = 'NumericStepper';
      NumericStepper.__super__.constructor.call(this, this.definition);
      this.minimum = parseFloat(this.definition.minimum);
      this.maximum = parseFloat(this.definition.maximum);
      this.stepSize = parseFloat(this.definition.stepSize);
      this.value = this.minimum;
    }

    NumericStepper.prototype.doRender = function(e) {
      var s, self;
      e.css("border", "1px solid #000000").css("font-size", "13px");
      this.borderThickness = '1';
      this.borderColor = "#000000";
      s = '<div class="NumericStepperValue"><div>' + this.minimum + '</div></div>' + '<div class="NumericStepperArrows" style="border-left: ' + this.borderThickness + 'px solid ' + this.borderColor + ';color:#333;height:' + (this.height - this.borderThickness) + 'px">' + '<div class="NumericStepperArrowUp" style="border-bottom: ' + this.borderThickness + 'px solid ' + this.borderColor + ';"><div>&#9650;</div></div>' + '<div class="NumericStepperArrowDown"><div>&#9660;</div></div>' + '</div>';
      s += '</div>';
      e.append(s);
      self = this;
      e.find(".NumericStepperArrowUp").click(function() {
        var v;
        v = self.value + self.stepSize;
        self.value = Math.min(self.maximum, v);
        return e.find(".NumericStepperValue > div").text(self.value);
      });
      e.find(".NumericStepperArrowDown").click(function() {
        var v;
        v = self.value - self.stepSize;
        self.value = Math.max(self.minimum, v);
        return e.find(".NumericStepperValue > div").text(self.value);
      });
      return this;
    };

    NumericStepper.prototype.doRenderProperties = function(e) {
      var element;
      element = e.children().first();
      NumericStepper.__super__.doRenderProperties.call(this, element);
      return this;
    };

    NumericStepper.prototype.getPropertyValue = function(property) {
      if (property === fb.SELECTED_NUMBER) {
        return true;
      }
    };

    return NumericStepper;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.NumericStepper = NumericStepper;
  });

  Parallelogram = (function(_super) {
    __extends(Parallelogram, _super);

    function Parallelogram(definition) {
      this.definition = definition;
      this.className = 'Parallelogram';
      Parallelogram.__super__.constructor.call(this, this.definition);
      this.style = this.definition.style;
      this.skewFactor = parseFloat(this.definition.skewFactor);
    }

    Parallelogram.prototype.doRender = function(e) {
      var hWidth, paper, s, skew;
      if (this.borderColor === '#0') {
        this.borderColor = '#000000';
      }
      skew = this.skewFactor * this.width;
      hWidth = this.width - skew;
      paper = Raphael(e.get()[0], this.width, this.height);
      if (this.style === "parallelogramLeft") {
        this.shape = paper.path("M 0 0 L " + hWidth + " 0 L " + this.width + " " + this.height + " L " + skew + " " + this.height + "L 0 0 z");
      } else {
        this.shape = paper.path("M " + skew + " 0 L " + this.width + " 0 L " + (this.width - skew) + " " + this.height + " L 0 " + this.height + " L " + skew + " 0 z");
      }
      this.shape.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness).attr("fill", this.backgroundColor);
      if (this.borderStyle === "dashed") {
        this.shape.attr('stroke-dasharray', "- ");
      }
      if (this.backgroundAlpha >= 0) {
        this.shape.attr('fill-opacity', this.backgroundAlpha);
      }
      this.labelHolder = $('<div class="textHolder">');
      this.label = new fb.LabeledObject(this.labelText, this);
      s = this.appendTextCell(this.labelHolder, this.label.htmlText);
      this.label.render(s);
      this.labelHolder.css('width', this.width).css('height', this.height);
      e.append(this.labelHolder);
      return this;
    };

    Parallelogram.prototype.doRenderProperties = function(e) {
      var p, props, v, _i, _len;
      props = PROPERTIES[this.className];
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        v = this.definition[p];
        switch (p) {
          case fb.StyleConstants.BOLD:
            e.css("font-weight", this.bold);
            break;
          case fb.StyleConstants.ITALIC:
            e.css("font-style", this.italic);
            break;
          case fb.StyleConstants.UNDERLINE:
            e.css("text-decoration", this.underline);
            break;
          case fb.StyleConstants.TEXTALIGN:
            e.css("text-align", this.textAlign);
            break;
          case fb.StyleConstants.LEADING:
            e.css("line-height", this.leading);
            break;
          case fb.StyleConstants.FONTSIZE:
            e.css("font-size", this.fontSize);
            break;
          case fb.StyleConstants.FONTCOLOR:
            e.css("color", this.fontColor);
            break;
          case fb.StyleConstants.FONTFAMILY:
            e.css("font-family", this.fontFamily);
        }
      }
      return this;
    };

    return Parallelogram;

  })(fb.AbstractShape);

  namespace('fb', function(exports) {
    return exports.Parallelogram = Parallelogram;
  });

  PasswordInput = (function(_super) {
    __extends(PasswordInput, _super);

    function PasswordInput(definition) {
      this.definition = definition;
      this.className = 'PasswordInput';
      PasswordInput.__super__.constructor.call(this, this.definition);
    }

    PasswordInput.prototype.doRender = function(e) {
      var content;
      content = $('<input type="password" value="' + this.labelText + '"></input>');
      content.css('width', this.width).css('height', this.height).css('line-height', this.fontSize + "px");
      e.append(content);
      return this;
    };

    PasswordInput.prototype.doRenderProperties = function(e) {
      var input;
      input = e.children().first();
      PasswordInput.__super__.doRenderProperties.call(this, input);
      return this;
    };

    PasswordInput.prototype.attachTriggers = function() {
      var input;
      input = this.e.children().eq(0);
      input.on('keypress', $.proxy(function(event) {
        if (event.keyCode === 13) {
          return this.trigger(KEYBOARD_ENTER, input.val());
        }
      }, this));
      input.on('blur', $.proxy(function(event) {
        return this.trigger(FOCUS_OUT, input.val());
      }, this));
      input.on('focus', $.proxy(function(event) {
        return this.trigger(FOCUS_IN, input.val());
      }, this));
      return input.on('change', $.proxy(function(event) {
        return this.trigger(CHANGE, input.val());
      }, this));
    };

    return PasswordInput;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.PasswordInput = PasswordInput;
  });

  Polygon = (function(_super) {
    __extends(Polygon, _super);

    function Polygon(definition) {
      var coord, point, points, toggle, _i, _len;
      this.definition = definition;
      this.className = 'Polygon';
      Polygon.__super__.constructor.call(this, this.definition);
      this.points = [];
      points = unescape(this.definition.points).split(',');
      point = [];
      toggle = true;
      for (_i = 0, _len = points.length; _i < _len; _i++) {
        coord = points[_i];
        point.push(coord);
        if (!toggle) {
          this.points.push(point);
          point = [];
        }
        toggle = !toggle;
      }
      this.points;
    }

    Polygon.prototype.doRender = function(e) {
      var command, d, paper, path, point, s, _i, _len, _ref;
      if ($.browser.mozilla) {
        d = 1;
      } else {
        d = 0;
      }
      paper = Raphael(e.get()[0], this.width + 2 * d, this.height);
      path = "";
      command = "M";
      _ref = this.points;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        path += command + " " + (point[0] * 1 + d) + " " + point[1] + " ";
        command = "L";
      }
      this.shape = paper.path(path);
      this.shape.attr('stroke', this.borderColor).attr("fill", this.backgroundColor);
      if (this.borderStyle === "none") {
        this.shape.attr('stroke-width', 0);
      } else {
        this.shape.attr('stroke-width', this.borderThickness);
      }
      if (this.borderStyle === "dashed") {
        this.shape.attr('stroke-dasharray', "- ");
      }
      if (this.backgroundAlpha >= 0) {
        this.shape.attr('fill-opacity', this.backgroundAlpha);
      }
      this.labelHolder = $('<div class="textHolder">');
      this.label = new fb.LabeledObject(this.labelText, this);
      s = this.appendTextCell(this.labelHolder, this.label.htmlText);
      this.label.render(s);
      this.labelHolder.css('width', this.width).css('height', this.height);
      e.append(this.labelHolder);
      return this;
    };

    Polygon.prototype.doRenderProperties = function(e) {
      var p, props, v, _i, _len;
      props = PROPERTIES[this.className];
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        v = this.definition[p];
        switch (p) {
          case fb.StyleConstants.BOLD:
            e.css("font-weight", this.bold);
            break;
          case fb.StyleConstants.ITALIC:
            e.css("font-style", this.italic);
            break;
          case fb.StyleConstants.UNDERLINE:
            e.css("text-decoration", this.underline);
            break;
          case fb.StyleConstants.TEXTALIGN:
            e.css("text-align", this.textAlign);
            break;
          case fb.StyleConstants.LEADING:
            e.css("line-height", this.leading);
            break;
          case fb.StyleConstants.FONTSIZE:
            e.css("font-size", this.fontSize);
            break;
          case fb.StyleConstants.FONTCOLOR:
            e.css("color", this.fontColor);
            break;
          case fb.StyleConstants.FONTFAMILY:
            e.css("font-family", this.fontFamily);
        }
      }
      return this;
    };

    return Polygon;

  })(fb.AbstractShape);

  namespace('fb', function(exports) {
    return exports.Polygon = Polygon;
  });

  ProgressBar = (function(_super) {
    __extends(ProgressBar, _super);

    function ProgressBar(definition) {
      this.definition = definition;
      this.className = 'ProgressBar';
      ProgressBar.__super__.constructor.call(this, this.definition);
      this.progress = parseFloat(this.definition.progress);
      if (!(this.progress >= 0)) {
        this.progress = 0;
      }
      if (!(this.progress <= 100)) {
        this.progress = 100;
      }
      this.indeterminate = this.isTrue(this.definition.indeterminate);
    }

    ProgressBar.prototype.doRender = function(e) {
      var content;
      content = $('<div class="indicator"></div>');
      content.css('width', this.progress + "%").css('height', (this.height - 2 - 2 * this.borderThickness) + "px").css('background-color', this.backgroundColor);
      e.append(content);
      e.css("border-color", this.borderColor).css('border-width', this.borderThickness + "px");
      return this;
    };

    ProgressBar.prototype.doRenderProperties = function(property, value) {};

    return ProgressBar;

  })(fb.FlairComponent);

  this;

  namespace('fb', function(exports) {
    return exports.ProgressBar = ProgressBar;
  });

  RadioButtonGroup = (function(_super) {
    var generateId;

    __extends(RadioButtonGroup, _super);

    function RadioButtonGroup(definition) {
      this.definition = definition;
      this.className = 'RadioButtonGroup';
      RadioButtonGroup.__super__.constructor.call(this, this.definition);
      this.groupData = unescape(this.definition.data).split('\r');
      this.selectedValue = '';
      this.direction = this.definition.direction;
    }

    RadioButtonGroup.prototype.doRender = function(e) {
      var content, entry, _i, _len, _ref;
      this.labels = [];
      content = $('<ul>');
      content.css('width', this.width);
      _ref = this.groupData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        content.append($('<li>').append(this.makeRadioButton(entry)));
      }
      if (this.direction === 'horizontal') {
        content.find('li').addClass('horizontal');
      }
      e.append($(content));
      return this;
    };

    RadioButtonGroup.prototype.makeRadioButton = function(entry) {
      var content, id, label, lbl;
      label = new fb.LabeledObject(entry, this);
      this.labels.push(label);
      content = $('<div>');
      id = generateId();
      content.append('<input type="radio" id="' + id + '" name="' + this.id + '" value="' + label.label + '" ' + (label.selected ? 'checked="checked"' : '') + '/>');
      lbl = $('<label for="' + id + '">' + label.htmlText + '</input>');
      content.append(lbl);
      label.render(lbl);
      if (label.selected) {
        this.selectedValue = content.children().eq(1).text();
      }
      return content.html();
    };

    generateId = function() {
      fb.FlairComponent.idCounter++;
      return fb.FlairComponent.idCounter.toString(16);
    };

    RadioButtonGroup.prototype.attachTriggers = function() {
      return this.e.find('input').on('click', $.proxy(function(event) {
        var btn, val;
        btn = $(event.currentTarget);
        this.dispatchEvent(VALUE_CHANGE);
        if (btn.is(':checked')) {
          val = btn.parent().children().eq(1).text();
          if (val !== this.selectedValue) {
            this.selectedValue = val;
            this.dispatchEvent(VALUE_CHANGE, val, event);
            this.dispatchEvent(SELECTION_CHANGED, val, event);
          }
        }
        return true;
      }, this));
    };

    RadioButtonGroup.prototype.getPropertyValue = function(property) {
      if (property === fb.SELECTED_PROPERTY) {
        return true;
      } else if (property === fb.SELECTED_INDEX) {
        return false;
      }
    };

    return RadioButtonGroup;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.RadioButtonGroup = RadioButtonGroup;
  });

  RatingStars = (function(_super) {
    __extends(RatingStars, _super);

    function RatingStars(definition) {
      this.definition = definition;
      this.className = 'RatingStars';
      RatingStars.__super__.constructor.call(this, this.definition);
      this.rating = parseInt(this.definition.rating);
    }

    RatingStars.prototype.doRender = function(e) {
      var i, self, star, stars;
      i = 1;
      while (i < 6) {
        if (i <= this.rating) {
          star = $('<span>&#9733;</span>');
        } else {
          star = $('<span>&#9734;</span>');
        }
        e.append(star);
        i++;
      }
      self = this;
      stars = e.find("span");
      stars.on('mouseover', function(event) {
        stars.html("&#9734;");
        i = $(this).index();
        return stars.slice(0, i + 1).html("&#9733;");
      });
      stars.on('mouseout', function(event) {
        stars.html("&#9734;");
        return stars.slice(0, self.rating + 1).html("&#9733;");
      });
      stars.on('click', function(event) {
        stars.html("&#9734;");
        i = $(this).index();
        self.rating = i;
        return stars.slice(0, i + 1).html("&#9733;");
      });
      return this;
    };

    return RatingStars;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.RatingStars = RatingStars;
  });

  Rectangle = (function(_super) {
    __extends(Rectangle, _super);

    function Rectangle(definition) {
      this.definition = definition;
      this.className = 'Rectangle';
      Rectangle.__super__.constructor.call(this, this.definition);
    }

    Rectangle.prototype.doRender = function(e) {
      var d, paper, s;
      if (this.borderColor === '#0') {
        this.borderColor = '#000000';
      }
      if ($.browser.mozilla) {
        d = 1;
      } else {
        d = 0;
      }
      paper = Raphael(e.get()[0], this.width + 2 * d, this.height);
      this.shape = paper.rect(0 + d, 0, this.width, this.height);
      if (this.borderStyle === "none") {
        this.shape.attr('stroke-width', 0);
      } else {
        this.shape.attr('stroke-width', this.borderThickness);
      }
      this.shape.attr('r', this.cornerRadius);
      this.shape.attr('stroke', this.borderColor);
      this.shape.attr("fill", this.backgroundColor);
      if (this.backgroundAlpha >= 0) {
        this.shape.attr('fill-opacity', this.backgroundAlpha);
      }
      if (this.borderStyle === "dashed") {
        this.shape.attr('stroke-dasharray', "- ");
      }
      this.labelHolder = $('<div class="textHolder">');
      this.label = new fb.LabeledObject(this.labelText, this);
      s = this.appendTextCell(this.labelHolder, this.label.htmlText);
      this.label.render(s);
      this.labelHolder.css('width', this.width).css('height', this.height);
      e.append(this.labelHolder);
      return this;
    };

    return Rectangle;

  })(fb.AbstractShape);

  namespace('fb', function(exports) {
    return exports.Rectangle = Rectangle;
  });

  ScratchOut = (function(_super) {
    __extends(ScratchOut, _super);

    function ScratchOut(definition) {
      this.definition = definition;
      this.className = 'ScratchOut';
      ScratchOut.__super__.constructor.call(this, this.definition);
    }

    ScratchOut.prototype.doRender = function(e) {
      var i, paper, path, s, step, stepCount, x, y, _i;
      if (this.borderColor === '#0') {
        this.borderColor = '#000000';
      }
      paper = Raphael(e.get()[0], this.width, this.height);
      step = Math.min(25, Math.min(this.width, this.height) / 5);
      stepCount = Math.round((this.width + this.height - 10) / step);
      path = "M ";
      s = 1;
      x = 0;
      y = 0;
      for (i = _i = 0; 0 <= stepCount ? _i <= stepCount : _i >= stepCount; i = 0 <= stepCount ? ++_i : --_i) {
        if (s > 0) {
          if (i * step > this.width) {
            x = this.width - 5;
            y = i * step - this.width;
          } else {
            x = i * step;
            y = 5;
          }
        } else {
          if (i * step > this.height) {
            x = i * step - this.height;
            y = this.height - 5;
          } else {
            x = 5;
            y = i * step;
          }
        }
        s = -s;
        path += x + " " + y;
        if (i < stepCount) {
          path += " L ";
        }
      }
      this.shape = paper.path(path);
      this.shape.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness).attr("fill", this.backgroundColor);
      this.labelHolder = $('<div class="textHolder">');
      this.labelHolder.css('width', this.width).css('height', this.height);
      e.append(this.labelHolder);
      return this;
    };

    ScratchOut.prototype.doRenderProperties = function(e) {};

    return ScratchOut;

  })(fb.AbstractShape);

  namespace('fb', function(exports) {
    return exports.ScratchOut = ScratchOut;
  });

  ScrollBar = (function(_super) {
    __extends(ScrollBar, _super);

    ScrollBar.scrollBar = '<div class="scrollbar_top"><div class="scrollbar_top_middle"><div class="scrollbar_arrow_up"></div></div></div><div class="scrollbar_caret" ><div class="scrollbar_caret_middle"><span></span></div></div><div class="scrollbar_bottom"><div class="scrollbar_bottom_middle"><div class="scrollbar_arrow_down"></div></div></div>';

    ScrollBar.getScrollbarContent = function(height) {
      var content;
      content = $('<div class="scrollbar"></div>').append(ScrollBar.scrollBar);
      content.css('height', height).css('position', 'absolute').css('right', -1).css('top', -1);
      return content;
    };

    function ScrollBar(definition) {
      this.definition = definition;
      this.className = 'ScrollBar';
      ScrollBar.__super__.constructor.call(this, this.definition);
    }

    ScrollBar.prototype.doRender = function(e) {
      var content;
      content = $(ScrollBar.scrollBar);
      e.append(content);
      e.find('.scrollbar_top').css('width', this.width).css('height', this.width + 1);
      e.find('.scrollbar_caret').css('width', this.width - 6);
      e.find('.scrollbar_bottom').css('width', this.width).css('height', this.width + 1);
      return this;
    };

    return ScrollBar;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.ScrollBar = ScrollBar;
  });

  Search = (function(_super) {
    __extends(Search, _super);

    function Search(definition) {
      this.definition = definition;
      this.className = 'Search';
      Search.__super__.constructor.call(this, this.definition);
    }

    Search.prototype.doRender = function(e) {
      var content;
      content = $('<div class="icon-search"></div>').css('font-size', this.fontSize + 4 + "px");
      e.append(content);
      content = $('<input type="text" value="' + this.labelText + '"></input>');
      content.css('width', this.width).css('height', this.height).css('line-height', this.fontSize + "px");
      e.append(content);
      return this;
    };

    Search.prototype.doRenderProperties = function(e) {
      var input;
      input = e.children().eq(1);
      Search.__super__.doRenderProperties.call(this, input);
      return this;
    };

    Search.prototype.attachTriggers = function() {
      var input;
      input = this.e.children().eq(1);
      return input.on('keypress', $.proxy(function(event) {
        if (event.keyCode === 13) {
          return this.trigger(KEYBOARD_ENTER, input.val());
        }
      }, this));
    };

    Search.prototype.getPropertyValue = function(property) {
      if (property === fb.TEXT_PROPERTY) {
        return true;
      }
    };

    return Search;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.Search = Search;
  });

  Slider = (function(_super) {
    __extends(Slider, _super);

    function Slider(definition) {
      this.definition = definition;
      this.className = 'Slider';
      Slider.__super__.constructor.call(this, this.definition);
      this.direction = this.definition.direction;
      this.minimum = this.definition.minimum;
      this.maximum = this.definition.maximum;
      this.stepSize = this.definition.stepSize;
      this.value = 0;
    }

    Slider.prototype.doRender = function(e) {
      var thumb, track,
        _this = this;
      if (this.direction === "horizontal") {
        e.addClass("HorizontalSlider");
      } else {
        e.addClass("VerticalSlider");
      }
      track = $('<div class="SliderTrack"></div>');
      e.append(track);
      thumb = $('<div class="SliderThumb"></div>');
      track.append(thumb);
      if (this.direction === 'vertical') {
        track.css('height', this.height - 1);
      }
      thumb.on('mousedown', function(event) {
        event.preventDefault();
        $(document).on("mousemove.slider", function(event) {
          var os, x, y;
          os = e.offset();
          if (_this.direction === "horizontal") {
            x = event.pageX - 7 - os.left;
            x = Math.max(0, x);
            x = Math.min(x, _this.width - 13);
            thumb.css("left", x);
          } else {
            y = event.pageY - 7 - os.top;
            y = Math.max(0, y);
            y = Math.min(y, _this.height - 13);
            thumb.css("top", y);
          }
          return false;
        });
        false;
        return $(document).on("mouseup.slider", function(event) {
          $(document).off("mousemove.slider");
          return $(document).off("mouseup.slider");
        });
      });
      return this;
    };

    Slider.prototype.getPropertyValue = function(property) {
      if (property === fb.SELECTED_NUMBER) {
        return true;
      }
    };

    return Slider;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.Slider = Slider;
  });

  SpinningWheel = (function(_super) {
    __extends(SpinningWheel, _super);

    function SpinningWheel(definition) {
      this.definition = definition;
      this.className = 'SpinningWheel';
      SpinningWheel.__super__.constructor.call(this, this.definition);
    }

    SpinningWheel.prototype.doRender = function(e) {
      var R, opts, r, self, spinner, target;
      e.css('background-color', '');
      self = this;
      r = Math.round((this.width - 30) / 2);
      R = this.width / 8;
      opts = {
        lines: 8,
        length: 0,
        width: R,
        radius: r,
        corners: 0,
        rotate: 8,
        color: self.backgroundColor,
        speed: 1,
        trail: 60,
        shadow: false,
        hwaccel: false,
        className: 'spinner',
        zIndex: 2e9,
        top: 0,
        left: 0
      };
      target = e.get(0);
      spinner = new Spinner(opts).spin(target);
      return this;
    };

    return SpinningWheel;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.SpinningWheel = SpinningWheel;
  });

  SplitterHorizontal = (function(_super) {
    __extends(SplitterHorizontal, _super);

    function SplitterHorizontal(definition) {
      this.definition = definition;
      this.className = 'SplitterHorizontal';
      SplitterHorizontal.__super__.constructor.call(this, this.definition);
    }

    SplitterHorizontal.prototype.doRender = function(e) {
      var content;
      content = $('<span id="dots">&#8226; &#8226; &#8226;</span>');
      e.append(content);
      return this;
    };

    return SplitterHorizontal;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.SplitterHorizontal = SplitterHorizontal;
  });

  SplitterVertical = (function(_super) {
    __extends(SplitterVertical, _super);

    function SplitterVertical(definition) {
      this.definition = definition;
      this.className = 'SplitterVertical';
      SplitterVertical.__super__.constructor.call(this, this.definition);
    }

    SplitterVertical.prototype.doRender = function(e) {
      var content;
      content = $('<div id="inner"><div id="dots">&#8226;<br/>&#8226;<br/>&#8226;</div></div>');
      e.append(content);
      return this;
    };

    return SplitterVertical;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.SplitterVertical = SplitterVertical;
  });

  SubTitle = (function(_super) {
    __extends(SubTitle, _super);

    function SubTitle(definition) {
      this.definition = definition;
      this.className = 'SubTitle';
      SubTitle.__super__.constructor.call(this, this.definition);
    }

    return SubTitle;

  })(fb.Label);

  namespace('fb', function(exports) {
    return exports.SubTitle = SubTitle;
  });

  TabNavigator = (function(_super) {
    __extends(TabNavigator, _super);

    function TabNavigator(definition) {
      var t, tabids, thetabs, _i, _len;
      this.definition = definition;
      this.className = 'TabNavigator';
      TabNavigator.__super__.constructor.call(this, this.definition);
      this.tabs = unescape(this.definition.tabs).split(',');
      this.backgroundColor = intToColorHex(this.definition.backgroundColor);
      this.borderColor = intToColorHex(this.definition.borderColor);
      this.borderThickness = this.definition.borderThickness;
      this.tabWidth = Math.floor(this.definition.tabWidth * 1);
      this.tabHeight = Math.floor(this.definition.tabHeight * 1);
      this.position = this.definition.position;
      this.tabComponentIds = [];
      if (this.definition.tabids == null) {
        this.definition.tabids = "";
      }
      thetabs = this.definition.tabids.split(";");
      for (_i = 0, _len = thetabs.length; _i < _len; _i++) {
        t = thetabs[_i];
        tabids = t.split(",");
        this.tabComponentIds.push(tabids);
      }
    }

    TabNavigator.prototype.doRender = function(e) {
      var after, content, horizontal, l, label, lis, self, tab, _i, _len, _ref;
      this.labels = [];
      after = this.position.indexOf("top-") > -1 || this.position.indexOf("left-") > -1;
      horizontal = this.position.indexOf("left-") > -1 || this.position.indexOf("right-") > -1;
      content = $('<div class="tabnavigator-content"></div>');
      this.tablist = $('<ul>');
      this.selectedIndex = 0;
      _ref = this.tabs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tab = _ref[_i];
        label = new fb.LabeledObject(tab, this);
        this.labels.push(label);
        this.tablist.append('<li><div>' + label.htmlText + '</div></li>');
      }
      this.tablist.addClass('tabnavigator-' + this.position);
      this.tablist.addClass('tabnavigator-tabs');
      if (!after) {
        e.append(content);
      }
      e.append(this.tablist);
      if (after) {
        e.append(content);
      }
      content.css('border-width', this.borderThickness + 'px').css('border-color', this.borderColor);
      if (horizontal) {
        l = 1 * this.tabWidth + 1 * this.borderThickness;
        if (this.position.indexOf("-middle") > -1) {
          this.tablist.css("padding", "" + (this.height - this.labels.length * this.tabHeight - (this.labels.length + 1) * this.borderThickness) / 2 + "px 0");
        } else if (this.position.indexOf("-top") > -1) {
          this.tablist.css("padding", "0");
        } else if (this.position.indexOf("-bottom") > -1) {
          this.tablist.css("padding", "" + (this.height - this.labels.length * this.tabHeight - (this.labels.length + 1) * this.borderThickness) + "px 0 0 0");
        }
        this.tablist.css("width", this.tabWidth - 1).css("height", this.height - 1);
        content.css("width", this.width - this.tabWidth).css("height", this.height);
        if (after) {
          content.css("left", l);
        } else {
          this.tablist.css("left", this.width - l);
        }
      } else {
        l = 1 * this.tabHeight + 1 * this.borderThickness;
        if (this.position.indexOf("-center") > -1) {
          this.tablist.css("padding", "0 " + (this.width - this.labels.length * this.tabWidth - (this.labels.length + 1) * this.borderThickness) / 2 + "px");
        } else if (this.position.indexOf("-left") > -1) {
          this.tablist.css("padding", "0");
        } else if (this.position.indexOf("-right") > -1) {
          this.tablist.css("padding", "0 0 0 " + (this.width - this.labels.length * this.tabWidth - (this.labels.length + 1) * this.borderThickness) + "px");
        }
        this.tablist.css("width", this.width).css("height", this.tabHeight);
        content.css("width", this.width + this.borderThickness * 1).css("height", this.height - this.tabHeight);
        if (after) {
          content.css("top", l);
        } else {
          this.tablist.css("top", this.height - l);
        }
      }
      lis = this.tablist.find('li');
      lis.css("width", this.tabWidth - 1).css("height", this.tabHeight).css('background-color', this.backgroundColor);
      lis.css('border-width', this.borderThickness + 'px').css('border-color', this.borderColor);
      this.tablist.find('li > div').css('text-align', this.textAlign);
      self = this;
      this.tablist.find('li > div').on('click', function(event) {
        var index;
        index = $(this).parent().index();
        return self.showTab(index);
      });
      return this;
    };

    TabNavigator.prototype.fixTheTabs = function() {
      var c, compid, components, tabids, _i, _j, _len, _len1, _ref;
      this.tabComponents = [];
      _ref = this.tabComponentIds;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tabids = _ref[_i];
        components = [];
        for (_j = 0, _len1 = tabids.length; _j < _len1; _j++) {
          compid = tabids[_j];
          c = this.page.getComponent(compid);
          if (c) {
            components.push(c);
          }
        }
        this.tabComponents.push(components);
      }
      return this.tabComponents;
    };

    TabNavigator.prototype.showTab = function(index) {
      var c, components, li, lis, _i, _j, _k, _len, _len1, _len2;
      if (this.selectedIndex === index) {
        return this;
      }
      if (!this.tabComponents) {
        this.fixTheTabs();
      }
      components = this.tabComponents[this.selectedIndex];
      if (components) {
        for (_i = 0, _len = components.length; _i < _len; _i++) {
          c = components[_i];
          c.hidden = true;
          c.show(c.visible);
        }
      }
      this.selectedIndex = index;
      components = this.tabComponents[this.selectedIndex];
      if (components) {
        for (_j = 0, _len1 = components.length; _j < _len1; _j++) {
          c = components[_j];
          c.hidden = false;
          c.show(c.visible);
        }
      }
      lis = this.tablist.find('li');
      for (_k = 0, _len2 = lis.length; _k < _len2; _k++) {
        li = lis[_k];
        $(li).css('background-color', this.backgroundColor).css("border-bottom-color", this.borderColor);
      }
      $(lis[index]).css("border-bottom-color", 'rgb(255, 255, 255)');
      return this;
    };

    TabNavigator.prototype.attachTriggers = function() {
      this.e.find('li').on('click', $.proxy(function(event) {
        var li;
        event.preventDefault();
        li = $(event.currentTarget);
        this.dispatchEvent(SELECTED_TAB_CHANGE, li.children().first().text());
        return false;
      }, this));
      return this;
    };

    return TabNavigator;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.TabNavigator = TabNavigator;
  });

  TagCloud = (function(_super) {
    var getItem, processTokens;

    __extends(TagCloud, _super);

    function TagCloud(definition) {
      var defaultTags, tokens;
      this.definition = definition;
      defaultTags = 'software statistics teaching technology tips tool tools toread travel tutorial tutorials tv twitter typography ubuntu usability video videos visualization web web\ 2.0 web\ design webdev wiki windows wordpress work writing youtube';
      this.className = 'TagCloud';
      TagCloud.__super__.constructor.call(this, this.definition);
      tokens = (this.definition.tags ? unescape(this.definition.tags) : defaultTags).split(' ');
      this.tags = processTokens(tokens);
    }

    TagCloud.prototype.doRender = function(e) {
      var content, tag, _i, _len, _ref;
      content = $('<div>');
      _ref = this.tags;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tag = _ref[_i];
        content.append(getItem(tag));
      }
      e.append(content.html());
      return this;
    };

    processTokens = function(tokens) {
      var list, listItem, token, _i, _len;
      listItem = '';
      list = [];
      for (_i = 0, _len = tokens.length; _i < _len; _i++) {
        token = tokens[_i];
        if (token[token.length - 1] === '\\') {
          listItems += token.substring(0, token.length - 2);
        } else {
          if (listItem) {
            list.push(listItem);
          } else {
            list.push(token);
          }
        }
      }
      return list;
    };

    getItem = function(tag) {
      var size;
      size = 6 + Math.round(18 * Math.random());
      return '<span style="font-size:' + size + 'px">' + tag + '</span> ';
    };

    return TagCloud;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.TagCloud = TagCloud;
  });

  Text = (function(_super) {
    __extends(Text, _super);

    function Text(definition) {
      var e;
      this.definition = definition;
      this.className = 'Text';
      Text.__super__.constructor.call(this, this.definition);
      try {
        this.labelText = decodeURI(this.labelText);
      } catch (_error) {
        e = _error;
      }
    }

    Text.prototype.doRender = function(e) {
      var s;
      this.label = new fb.LabeledObject(this.labelText, this);
      s = this.appendTextCell(e, this.label.htmlText);
      this.label.render(s);
      e.css('line-height', this.fontSize + "px");
      return this;
    };

    return Text;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.Text = Text;
  });

  TextArea = (function(_super) {
    __extends(TextArea, _super);

    function TextArea(definition) {
      this.definition = definition;
      this.className = 'TextArea';
      TextArea.__super__.constructor.call(this, this.definition);
    }

    TextArea.prototype.doRender = function(e) {
      var content;
      this.label = new fb.LabeledObject(this.labelText, this);
      content = $('<div contentEditable="true"> </div>');
      this.label.render(content);
      content.css('width', this.width).css('height', this.height);
      e.append(content);
      return this;
    };

    TextArea.prototype.doRenderProperties = function(e) {
      var input;
      input = e.children().first();
      TextArea.__super__.doRenderProperties.call(this, input);
      return this;
    };

    TextArea.prototype.attachTriggers = function() {
      var input;
      input = this.e.children().eq(0);
      input.on('blur', $.proxy(function(event) {
        return this.trigger(FOCUS_OUT, input.val());
      }, this));
      input.on('focus', $.proxy(function(event) {
        return this.trigger(FOCUS_IN, input.val());
      }, this));
      return input.on('change', $.proxy(function(event) {
        return this.trigger(CHANGE, input.val());
      }, this));
    };

    TextArea.prototype.getPropertyValue = function(property) {
      if (property === fb.TEXT_PROPERTY) {
        return "";
      }
    };

    return TextArea;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.TextArea = TextArea;
  });

  TextInput = (function(_super) {
    __extends(TextInput, _super);

    function TextInput(definition) {
      this.definition = definition;
      this.className = 'TextInput';
      TextInput.__super__.constructor.call(this, this.definition);
    }

    TextInput.prototype.doRender = function(e) {
      var content;
      content = $('<input type="text" value="' + this.labelText + '"></input>');
      content.css('width', this.width).css('height', this.height).css('line-height', this.fontSize + "px");
      e.append(content);
      this.registerVariable();
      return this;
    };

    TextInput.prototype.doRenderProperties = function(e) {
      var input;
      input = e.children().first();
      TextInput.__super__.doRenderProperties.call(this, input);
      return this;
    };

    TextInput.prototype.attachTriggers = function() {
      var input;
      input = this.e.children().eq(0);
      input.on('keypress', $.proxy(function(event) {
        if (event.keyCode === 13) {
          return this.trigger(KEYBOARD_ENTER, input.val());
        }
      }, this));
      input.on('keyup', $.proxy(function(event) {
        return this.updateVariableContext();
      }, this));
      input.on('blur', $.proxy(function(event) {
        return this.trigger(FOCUS_OUT, input.val());
      }, this));
      input.on('focus', $.proxy(function(event) {
        return this.trigger(FOCUS_IN, input.val());
      }, this));
      return input.on('change', $.proxy(function(event) {
        return this.trigger(CHANGE, input.val());
      }, this));
    };

    TextInput.prototype.getPropertyValue = function(property) {
      var input;
      input = this.e.children().eq(0);
      if (property === fb.TEXT_PROPERTY) {
        return input.val();
      } else if (property === fb.TEXT_LENGTH_PROPERTY) {
        return input.val().length;
      }
    };

    TextInput.prototype.getVariableValue = function() {
      var input;
      input = this.e.children().eq(0);
      return input.val();
    };

    return TextInput;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.TextInput = TextInput;
  });

  Title = (function(_super) {
    __extends(Title, _super);

    function Title(definition) {
      this.definition = definition;
      this.className = 'Title';
      Title.__super__.constructor.call(this, this.definition);
    }

    return Title;

  })(fb.Label);

  namespace('fb', function(exports) {
    return exports.Title = Title;
  });

  TitleWindow = (function(_super) {
    __extends(TitleWindow, _super);

    function TitleWindow(definition) {
      this.definition = definition;
      this.className = 'TitleWindow';
      TitleWindow.__super__.constructor.call(this, this.definition);
      this.minimize = this.isTrue(this.definition.minimize);
      this.maximize = this.isTrue(this.definition.maximize);
      this.close = this.isTrue(this.definition.close);
      this.showScrollbar = this.isTrue(this.definition.showScrollbar);
      this.headerHeight = this.definition.headerHeight * 1;
    }

    TitleWindow.prototype.doRender = function(e) {
      var c, compId, compIds, content, titleBar, titleBarContent, titleSpan, _i, _len;
      this.label = new fb.LabeledObject(this.labelText, this);
      titleSpan = $('<span>' + this.label.htmlText + '</span>');
      this.label.render(titleSpan);
      titleBar = $('<div class="TitleBar" style="height:' + (this.headerHeight - this.borderThickness) + 'px"></div>');
      titleBarContent = $('<div class="TitleBarContent"></div>');
      titleBar.append(titleBarContent);
      titleBarContent.append(titleSpan);
      if (this.close) {
        titleBarContent.append($('<div class="close">'));
      }
      if (this.maximize) {
        titleBarContent.append($('<div class="maximize">'));
      }
      if (this.minimize) {
        titleBarContent.append($('<div class="minimize">'));
      }
      titleBarContent.css("background-color", this.backgroundColor);
      e.append(titleBar);
      content = $('<div class="content">').css('height', this.height - this.headerHeight - this.borderThickness);
      e.append(content);
      this.configureScrollBar(content);
      this.components = [];
      if (this.definition.contains == null) {
        this.definition.contains = "";
      }
      compIds = this.definition.contains.split(",");
      for (_i = 0, _len = compIds.length; _i < _len; _i++) {
        compId = compIds[_i];
        c = this.page.getComponent(compId);
        if (c) {
          this.components.push(c);
        }
      }
      e.css("width", this.width - 2 * this.borderThickness);
      return this;
    };

    TitleWindow.prototype.configureScrollBar = function(e) {
      var scrollbar;
      if (this.showScrollbar) {
        scrollbar = fb.ScrollBar.getScrollbarContent(e.height() + 1 * this.borderThickness);
        return e.append(scrollbar);
      }
    };

    TitleWindow.prototype.doRenderProperties = function(e) {
      var p, props, v, _i, _len;
      props = PROPERTIES[this.className];
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        v = this.definition[p];
        switch (p) {
          case fb.StyleConstants.BOLD:
            e.css("font-weight", this.bold);
            break;
          case fb.StyleConstants.ITALIC:
            e.css("font-style", this.italic);
            break;
          case fb.StyleConstants.UNDERLINE:
            e.css("text-decoration", this.underline);
            break;
          case fb.StyleConstants.TEXTALIGN:
            e.css("text-align", this.textAlign);
            break;
          case fb.StyleConstants.LEADING:
            e.css("line-height", this.leading);
            break;
          case fb.StyleConstants.FONTSIZE:
            e.css("font-size", this.fontSize);
            break;
          case fb.StyleConstants.FONTCOLOR:
            e.css("color", this.fontColor);
            break;
          case fb.StyleConstants.FONTFAMILY:
            e.css("font-family", this.fontFamily);
            break;
          case fb.StyleConstants.BACKGROUNDCOLOR:
            e.css("background-color", '#FFFFFF');
            break;
          case fb.StyleConstants.BORDERCOLOR:
            e.css("border-color", this.borderColor);
            break;
          case fb.StyleConstants.BORDERTHICKNESS:
            e.css("border-width", this.borderThickness + "px");
            break;
          case fb.StyleConstants.CORNERRADIUS:
            e.css("border-radius", this.cornerRadius);
        }
      }
      return this;
    };

    return TitleWindow;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.TitleWindow = TitleWindow;
  });

  Tree = (function(_super) {
    var generateId;

    __extends(Tree, _super);

    function Tree(definition) {
      this.definition = definition;
      this.className = 'Tree';
      Tree.__super__.constructor.call(this, this.definition);
      this.data = unescape(this.definition.data).split('\r');
      this.rowHeight = parseFloat(this.definition.rowHeight);
    }

    Tree.prototype.doRender = function(e) {
      var content, item, rows, source, _i, _len, _ref;
      source = [];
      this.labels = [];
      _ref = this.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        source.push(this.getDataAndRank(item));
      }
      content = this.processContent(source.shift(), source);
      rows = content.find("li div.row-wrapper");
      rows.css("width", this.width - 1);
      rows.css("height", this.rowHeight);
      rows.on("click", function(event) {
        if ($(this).parent().children().length === 2) {
          $(this).parent().toggleClass("expanded");
        }
        return this;
      });
      e.append(content);
      content.css("height", this.height - 1);
      this.configureScrollBar(e);
      return this;
    };

    Tree.prototype.configureScrollBar = function(e) {
      var scrollbar;
      if (this.showScrollbar) {
        scrollbar = fb.ScrollBar.getScrollbarContent(e.height(), 0);
        return e.append(scrollbar.css('top', 0));
      }
    };

    Tree.prototype.getDataAndRank = function(item) {
      var rank;
      rank = item.lastIndexOf('-') + 1;
      if (rank !== 0) {
        item = item.substring(rank);
      }
      return {
        label: item,
        rank: rank
      };
    };

    Tree.prototype.processContent = function(item, source) {
      var content, label, lbl, rank, row, sub;
      rank = item.rank;
      content = $('<ul class="tree' + item.rank + '">');
      while (item != null) {
        if (item.rank === rank) {
          label = new fb.LabeledObject(item.label, this);
          this.labels.push(label);
          lbl = $('<div class="FlairBuilderWidgetLabel">' + label.htmlText + '</div>');
          label.render(lbl);
          row = $('<li class="expanded"><div class="row-wrapper FlairBuilderWidgetLabel"></div></li>');
          row.find("div").append(lbl);
          content.append(row);
        } else {
          if (item.rank > rank) {
            row.addClass("parent-row");
            sub = this.processContent(item, source);
            row.append(sub);
          } else {
            source.unshift(item);
            break;
          }
        }
        item = source.shift();
      }
      return content;
    };

    generateId = function() {
      fb.FlairComponent.idCounter++;
      return fb.FlairComponent.idCounter.toString(16);
    };

    Tree.prototype.attachTriggers = function() {
      this.e.find('li').on('click', $.proxy(function(event) {
        var item;
        event.preventDefault();
        item = $(event.currentTarget);
        this.dispatchEvent(LIST_ITEM_CLICK, item.children().first().text());
        return false;
      }, this));
      this.e.find('li').on('dblclick', $.proxy(function(event) {
        var item;
        event.preventDefault();
        item = $(event.currentTarget);
        this.dispatchEvent(LIST_ITEM_DOUBLECLICK, item.children().first().text());
        return false;
      }, this));
      return this;
    };

    Tree.prototype.getPropertyValue = function(property) {
      if (property === fb.HAS_SELECTED_ROWS) {
        return "";
      } else if (property === fb.HAS_NO_SELECTED_ROWS) {
        return "";
      } else if (property === fb.SELECTED_ROWS) {
        return "";
      } else if (property === fb.SELECTED_ROWS_COUNT) {
        return "";
      }
    };

    return Tree;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.Tree = Tree;
  });

  VerticalLabel = (function(_super) {
    __extends(VerticalLabel, _super);

    function VerticalLabel(definition) {
      this.definition = definition;
      this.className = 'VerticalLabel';
      VerticalLabel.__super__.constructor.call(this, this.definition);
    }

    VerticalLabel.prototype.doRender = function(e) {
      var s;
      this.label = new fb.LabeledObject(this.labelText, this);
      s = this.appendTextCell(e, this.label.htmlText);
      this.label.render(s);
      return this;
    };

    return VerticalLabel;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.VerticalLabel = VerticalLabel;
  });

  VideoPlayer = (function(_super) {
    __extends(VideoPlayer, _super);

    function VideoPlayer(definition) {
      this.definition = definition;
      this.className = 'VideoPlayer';
      VideoPlayer.__super__.constructor.call(this, this.definition);
    }

    VideoPlayer.prototype.doRender = function(e) {
      var paper, rect, square;
      if (this.borderColor === '#0') {
        this.borderColor = '#000000';
      }
      paper = Raphael(e.get()[0], this.width, this.height);
      rect = paper.rect(0, 0, this.width, this.height);
      rect.attr('stroke', this.borderColor).attr('stroke-width', this.borderThickness).attr("fill", "#FFFFFF");
      this.drawPlay(paper, this.width / 5, this.height / 5, this.width / 2, 43 * this.height / 100, this.borderColor, "#FFFFFF");
      this.drawPlay(paper, this.width / 10, this.height / 10, 20, 92 * this.height / 100, "#FFFFFF", this.borderColor);
      square = paper.rect(20 + this.height / 10, (92 * this.height / 100) - 5, 10, 10);
      square.attr('stroke', 'none').attr("fill", this.borderColor);
      rect = paper.rect(square.attrs.x + square.attrs.width + 10, (92 * this.height / 100) - 2.5, this.width - 120, 5);
      rect.attr('stroke', 'none').attr("fill", this.borderColor);
      rect = paper.rect(rect.attrs.x + rect.attrs.width + 10, (92 * this.height / 100) + 4, 2, 2);
      rect.attr('stroke', 'none').attr("fill", this.borderColor);
      rect = paper.rect(rect.attrs.x + rect.attrs.width + 3, (92 * this.height / 100) + 2, 2, 4);
      rect.attr('stroke', 'none').attr("fill", this.borderColor);
      rect = paper.rect(rect.attrs.x + rect.attrs.width + 3, 92 * this.height / 100, 2, 6);
      rect.attr('stroke', 'none').attr("fill", this.borderColor);
      rect = paper.rect(rect.attrs.x + rect.attrs.width + 3, (92 * this.height / 100) - 2, 2, 8);
      rect.attr('stroke', 'none').attr("fill", this.borderColor);
      rect = paper.rect(rect.attrs.x + rect.attrs.width + 3, (92 * this.height / 100) - 4, 2, 10);
      rect.attr('stroke', 'none').attr("fill", this.borderColor);
      rect = paper.rect(rect.attrs.x + rect.attrs.width + 3, (92 * this.height / 100) - 6, 2, 12);
      rect.attr('stroke', 'none').attr("fill", this.borderColor);
      return this;
    };

    VideoPlayer.prototype.drawPlay = function(paper, w, h, cx, cy, bg, fg) {
      var circle, d, l, path, r, triangle;
      d = Math.min(w, h);
      r = 6;
      l = (3 / r * d) / Math.cos(Math.PI / 6);
      circle = paper.circle(cx, cy, d / 2);
      circle.attr('stroke', 'none').attr("fill", bg);
      path = "M " + (cx + 2 / r * d) + " " + cy + " L " + (cx - 1 / r * d) + " " + (cy - l / 2) + " L " + (cx - 1 / r * d) + " " + (cy + l / 2) + " L " + (cx + 2 / r * d) + " " + cy + " z";
      triangle = paper.path(path);
      return triangle.attr('stroke', 'none').attr("fill", fg);
    };

    VideoPlayer.prototype.doRenderProperties = function(e) {
      return this;
    };

    return VideoPlayer;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.VideoPlayer = VideoPlayer;
  });

  VolumeSlider = (function(_super) {
    __extends(VolumeSlider, _super);

    function VolumeSlider(definition) {
      this.definition = definition;
      this.className = 'VolumeSlider';
      VolumeSlider.__super__.constructor.call(this, this.definition);
    }

    VolumeSlider.prototype.doRender = function(e) {
      var fig, h2, paper, path, xi;
      if ((this.borderColor == null) || this.borderColor === '#0') {
        this.borderColor = '#000000';
      }
      paper = Raphael(e.get()[0], this.width, this.height);
      xi = 0;
      h2 = this.height / 2;
      path = 'M ' + xi + " " + (h2 - 4) + ' L ' + (xi + 4) + " " + (h2 - 4) + ' L ' + (xi + 12) + " " + (h2 - 8) + ' L ' + (xi + 12) + " " + (h2 + 8) + ' L ' + (xi + 4) + " " + (h2 + 4) + ' L ' + xi + " " + (h2 + 4) + ' L ' + xi + " " + (h2 - 4) + ' z';
      fig = paper.path(path);
      fig.attr('stroke', this.borderColor).attr('stroke-width', 1).attr("fill", this.borderColor);
      xi += 16;
      fig = paper.rect(xi, h2 - 1, this.width - xi, 3, 2);
      fig.attr('stroke', this.borderColor).attr('stroke-width', 1).attr("fill", this.borderColor);
      fig = paper.circle(xi + 10, h2 + 1, 5);
      return fig.attr('stroke', this.borderColor).attr('stroke-width', 1).attr("fill", "#FFFFFF");
    };

    return VolumeSlider;

  })(fb.Label);

  namespace('fb', function(exports) {
    return exports.VolumeSlider = VolumeSlider;
  });

  WebCamViewer = (function(_super) {
    __extends(WebCamViewer, _super);

    function WebCamViewer(definition) {
      this.definition = definition;
      this.className = 'WebCamViewer';
      WebCamViewer.__super__.constructor.call(this, this.definition);
    }

    WebCamViewer.prototype.doRender = function(e) {
      var content;
      content = $('<object data="images/webcam.svg" type="image/svg+xml"></object>');
      content.attr('width', this.width - 1).attr('height', this.height - 1);
      e.append(content);
      return this;
    };

    WebCamViewer.prototype.doRenderProperties = function(e) {};

    return WebCamViewer;

  })(fb.FlairComponent);

  namespace('fb', function(exports) {
    return exports.WebCamViewer = WebCamViewer;
  });

}).call(this);
