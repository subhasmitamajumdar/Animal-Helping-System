(function() {
  var LETTERS, NUMBERS,
    __slice = [].slice;

  window.intToColorHex = function(value) {
    var hex;
    hex = parseInt(value).toString(16);
    hex = "#000000".substr(0, 7 - hex.length) + hex;
    return hex;
  };

  window.namespace = function(target, name, block) {
    var item, top, _i, _len, _ref, _ref1;
    if (arguments.length < 3) {
      _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
    }
    top = target;
    _ref1 = name.split('.');
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      item = _ref1[_i];
      target = target[item] || (target[item] = {});
    }
    return block(target, top);
  };

  window.adjustBrightness = function(rgb, brite) {
    var b, g, r;
    if (brite === 0) {
      return rgb;
    }
    if (brite < 0) {
      brite = (100 + brite) / 100;
      r = ((rgb >> 16) & 0xFF) * brite;
      g = ((rgb >> 8) & 0xFF) * brite;
      b = (rgb & 0xFF) * brite;
    } else {
      brite /= 100;
      r = (rgb >> 16) & 0xFF;
      g = (rgb >> 8) & 0xFF;
      b = rgb & 0xFF;
      r += (0xFF - r) * brite;
      g += (0xFF - g) * brite;
      b += (0xFF - b) * brite;
      r = Math.min(r, 255);
      g = Math.min(g, 255);
      b = Math.min(b, 255);
    }
    return intToColorHex((r << 16) | (g << 8) | b);
  };

  window.extend = function(obj, mixin) {
    var method, name;
    for (name in mixin) {
      method = mixin[name];
      obj[name] = method;
    }
    return obj;
  };

  window.include = function(klass, mixin) {
    return extend(klass.prototype, mixin);
  };

  LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'];

  NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  window.generateFbID = function(prefix, length) {
    var i, id, type;
    id = prefix;
    i = 0;
    while (i < length) {
      i++;
      type = Math.round(Math.random());
      if (type === 0) {
        id += LETTERS[Math.round(Math.random() * LETTERS.length)];
      } else {
        id += NUMBERS[Math.round(Math.random() * NUMBERS.length)];
      }
    }
    return id;
  };

}).call(this);
;(function() {
  var BACKGROUNDALPHA, BACKGROUNDCOLOR, BOLD, BORDER, BORDERCOLOR, BORDERSTYLE, BORDERTHICKNESS, CHANGE, CHECKBOX_ITEM_SELECTED, CHECKBOX_ITEM_UNSELECTED, CHECKBOX_SELECTED, CHECKBOX_UNSELECTED, CORNERRADIUS, FBBrowseCardStack, FBBrowseForFile, FBCloseCurrentFloatingPane, FBCloseLayer, FBClosePopUpAction, FBDelayInsertAction, FBDispatchCustomEvent, FBEVENTS, FBEnableDisableComponents, FBGoToPageAction, FBGoToURLAction, FBIfCondtionPassed, FBMoveComponents, FBOpenPopUpAction, FBShowFloatingPane, FBShowHideComponents, FBShowLayer, FBShowMessage, FBUpdateStyling, FBUpdateVariableAction, FOCUS_IN, FOCUS_OUT, FONTCOLOR, FONTFAMILY, FONTSIZE, FlairComponent, FlairPage, FlairProject, GRID_ROW_CLICK, GRID_ROW_DOUBLECLICK, GROUP_ON_LOAD, IMAGE, ITALIC, ITEM_CLICK, KEYBOARD_ENTER, LABELTEXT, LEADING, LIST_ITEM_CLICK, LIST_ITEM_DOUBLECLICK, MOUSE_CLICK, MOUSE_DOUBLE_CLICK, MOUSE_ENTER, MOUSE_OUT, PAGE_CUSTOM_EVENT, PAGE_ON_LOAD, PROPERTIES, PageLayer, SELECTED_TAB_CHANGE, SELECTION_CHANGED, STYLE, StyleConstants, TEXTALIGN, TOOLTIPTEXT, UNDERLINE, VALUE_CHANGE, behaviorsMixin, newComponent, triggerByID;

  FlairProject = (function() {
    function FlairProject(definition) {
      var p, page, pgs, v, vars, _i, _j, _k, _len, _len1, _len2, _ref;
      this.definition = definition;
      _.extend(this, Backbone.Events);
      this.name = this.definition.name;
      this.defaultpage = this.definition.defaultpage;
      if (this.defaultpage.indexOf("#") === 0) {
        this.defaultpage = this.defaultpage.substr(1);
      }
      this.pages = [];
      pgs = this.definition.pages;
      for (_i = 0, _len = pgs.length; _i < _len; _i++) {
        p = pgs[_i];
        page = new FlairPage(p, this);
        page.project = this;
        this.pages.push(page);
      }
      this.variables = {};
      vars = this.definition.variables;
      if (vars != null) {
        for (_j = 0, _len1 = vars.length; _j < _len1; _j++) {
          v = vars[_j];
          this.variables[v.name] = v.value;
        }
      }
      this.structure = this.definition.structure;
      if (this.structure) {
        _ref = this.structure;
        for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
          p = _ref[_k];
          this.findPage(p);
        }
      }
    }

    FlairProject.prototype.findPage = function(p) {
      var page, pi, _i, _len, _ref;
      if (p.id.indexOf("#") === 0) {
        p.id = p.id.substr(1);
      }
      page = this.getPage(p.id);
      if (page) {
        page.item = p;
      }
      _ref = p.subpages;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pi = _ref[_i];
        pi.parent = p;
        this.findPage(pi);
      }
      return this;
    };

    FlairProject.prototype.getDefaultPage = function() {
      var p, _i, _len, _ref;
      _ref = this.pages;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        if (p.id === this.defaultpage) {
          return p;
        }
      }
      return this.pages[0];
    };

    FlairProject.prototype.getPage = function(pageId) {
      var p, _i, _len, _ref;
      _ref = this.pages;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        if (p.id === pageId) {
          return p;
        }
      }
      return null;
    };

    FlairProject.prototype.getPageByName = function(pageName) {
      var p, _i, _len, _ref;
      _ref = this.pages;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        if (p.name === pageName) {
          return p;
        }
      }
      return null;
    };

    FlairProject.prototype.selectPage = function(pageId) {
      var page;
      page = this.getPage(pageId);
      if (!page) {
        page = this.getDefaultPage();
      }
      this.trigger("page-select", page);
      return this;
    };

    FlairProject.prototype.getVariable = function(varName) {
      return this.variables[varName];
    };

    FlairProject.prototype.putVariable = function(varName, varValue) {
      this.variables[varName] = varValue;
      return this.trigger("variable-change");
    };

    FlairProject.prototype.dispatchEvent = function(eventType) {
      var p, _i, _len, _ref;
      _ref = this.pages;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        p.trigger(eventType);
      }
      return this;
    };

    return FlairProject;

  })();

  behaviorsMixin = {
    loadBehaviors: function() {
      var a, actionDefinition, actionID, b, trigger, _i, _len, _ref;
      this.behaviors = [];
      if (!this.definition.behaviors) {
        this.definition.behaviors = [];
      }
      _ref = this.definition.behaviors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        actionID = b.id;
        actionDefinition = b.action;
        trigger = triggerByID(b.trigger);
        a = null;
        switch (actionID) {
          case FBGoToPageAction:
            a = new fb.GoToPageAction(actionDefinition, this);
            break;
          case FBShowLayer:
            a = new fb.ShowLayer(actionDefinition, this);
            break;
          case FBCloseLayer:
            a = new fb.CloseLayer(actionDefinition, this);
            break;
          case FBBrowseCardStack:
            a = new fb.BrowseCardStack(actionDefinition, this);
            break;
          case FBShowHideComponents:
            a = new fb.ShowHideComponents(actionDefinition, this);
            break;
          case FBEnableDisableComponents:
            a = new fb.EnableDisableComponents(actionDefinition, this);
            break;
          case FBMoveComponents:
            a = new fb.MoveComponents(actionDefinition, this);
            break;
          case FBUpdateStyling:
            a = new fb.UpdateStyling(actionDefinition, this);
            break;
          case FBDelayInsertAction:
            break;
          case FBIfCondtionPassed:
            a = new fb.IfCondtionPassed(actionDefinition, this);
            break;
          case FBBrowseForFile:
            break;
          case FBGoToURLAction:
            a = new fb.GoToURLAction(actionDefinition, this);
            break;
          case FBUpdateVariableAction:
            a = new fb.UpdateVariableAction(actionDefinition, this);
            break;
          case FBDispatchCustomEvent:
            a = new fb.DispatchCustomEvent(actionDefinition, this);
        }
        if (!(a === null) && !(trigger === null)) {
          a.trigger = trigger;
          a.item = b.item;
          this.behaviors.push(a);
        }
      }
      return this;
    },
    attachBehaviors: function() {
      var a, self, _i, _len, _ref;
      self = this;
      _ref = this.behaviors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        a = _ref[_i];
        a.trigger.attach(this, a);
        this.on(a.trigger.id, function(eventType, data, event) {
          self.executeBehaviors(eventType, data, event);
          return false;
        });
      }
      return this;
    },
    executeBehaviors: function(eventType, data, event) {
      var a, actions, p, _i, _j, _len, _len1, _ref;
      actions = [];
      if (eventType === MOUSE_OUT.id && event) {
        if ((event.offsetX > 0 && event.offsetX < this.width) && (event.offsetY > 0 && event.offsetY < this.height)) {
          return this;
        }
      }
      _ref = this.behaviors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        a = _ref[_i];
        if (a.trigger.id === eventType) {
          if (typeof p !== "undefined" && p !== null) {
            p.next = a;
          }
          actions.push(a);
          p = a;
        }
      }
      if (actions.length > 0) {
        for (_j = 0, _len1 = actions.length; _j < _len1; _j++) {
          a = actions[_j];
          a.execute(data);
        }
      }
      return this;
    }
  };

  FlairPage = (function() {
    function FlairPage(definition, project) {
      var c, compnts, component, l, layer, layrs, _i, _j, _len, _len1;
      this.definition = definition;
      this.project = project;
      _.extend(this, Backbone.Events);
      this.page = this;
      this.id = this.definition.id;
      if (this.id.indexOf("#") === 0) {
        this.id = this.id.substr(1);
      }
      this.name = this.definition.name;
      this.width = this.definition.width;
      this.height = this.definition.height;
      this.firstTimeLoad = true;
      this.master = this.definition.master;
      if ((this.master != null) && this.master.indexOf("#") === 0) {
        this.master = this.master.substr(1);
      }
      compnts = this.definition.components;
      this.components = [];
      for (_i = 0, _len = compnts.length; _i < _len; _i++) {
        c = compnts[_i];
        component = newComponent(c.clasz, c, this);
        if (!component) {
          continue;
        }
        component.page = this;
        component.container = this;
        this.register(component);
        this.components.push(component);
      }
      layrs = this.definition.layers;
      this.layers = [];
      if (layrs != null) {
        for (_j = 0, _len1 = layrs.length; _j < _len1; _j++) {
          l = layrs[_j];
          layer = new PageLayer(l, this);
          layer.page = this;
          this.layers.push(layer);
        }
      }
      this.loadBehaviors();
    }

    FlairPage.prototype.render = function(viewer) {
      var component, e, _i, _len, _ref;
      if (!this.element) {
        this.element = $('<div class="FlairBuilderPage"></div>');
        this.element.css("width", this.width).css("height", 0);
        _ref = this.components;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          component = _ref[_i];
          e = $('<div class="FlairBuilderWidget"></div>');
          component.render(e);
          this.element.append(e);
          if (component.hidden || !component.visible) {
            e.css("display", "none");
          }
        }
      }
      viewer.append(this.element);
      this.attachBehaviors();
      return this;
    };

    FlairPage.prototype.register = function(c) {
      if (!this.registry) {
        this.registry = {};
      }
      return this.registry[c.id] = c;
    };

    FlairPage.prototype.getComponent = function(id) {
      if (!this.registry) {
        return null;
      }
      return this.registry[id];
    };

    FlairPage.prototype.getStructurePath = function() {
      var p, path;
      path = [this.item.name];
      p = this.item.parent;
      while (p) {
        path.push(p.name);
        p = p.parent;
      }
      return path = path.reverse();
    };

    FlairPage.prototype.dispatchPageLoad = function(isMaster) {
      if (isMaster && !this.firstTimeLoad) {
        return;
      }
      this.firstTimeLoad = false;
      this.trigger(PAGE_ON_LOAD.id, PAGE_ON_LOAD.id);
      return this.triggerGroupOnLoad(this.components);
    };

    FlairPage.prototype.triggerGroupOnLoad = function(cmps) {
      var c, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = cmps.length; _i < _len; _i++) {
        c = cmps[_i];
        if (c.className === "FlairComponentsGroup") {
          c.trigger(GROUP_ON_LOAD.id, GROUP_ON_LOAD.id);
          _results.push(this.triggerGroupOnLoad(c.components));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    FlairPage.prototype.showLayer = function(layerID, action) {
      var l, _i, _len, _ref;
      _ref = this.layers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        l = _ref[_i];
        if (l.id === layerID) {
          this.project.trigger("layer-select", l, action);
          break;
        }
      }
      return this;
    };

    return FlairPage;

  })();

  include(FlairPage, behaviorsMixin);

  PageLayer = (function() {
    PageLayer.prototype.page = null;

    function PageLayer(definition, page) {
      var c, compnts, component, _i, _len;
      this.definition = definition;
      this.page = page;
      _.extend(this, Backbone.Events);
      this.id = this.definition.id;
      this.name = this.definition.name;
      compnts = this.definition.components;
      this.components = [];
      for (_i = 0, _len = compnts.length; _i < _len; _i++) {
        c = compnts[_i];
        component = newComponent(c.clasz, c, this.page);
        if (!component) {
          continue;
        }
        component.page = this.page;
        component.container = this;
        this.page.register(component);
        this.components.push(component);
      }
    }

    PageLayer.prototype.render = function(viewer) {
      var component, e, maxx, maxy, _i, _len, _ref;
      if (!this.element) {
        this.element = $('<div class="FlairBuilderPageLayer"></div>');
        this.content = $('<div class="PageLayerContent"></div>');
        this.element.append(this.content);
        this.minx = 10000;
        this.miny = 10000;
        maxx = 0;
        maxy = 0;
        _ref = this.components;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          component = _ref[_i];
          e = $('<div class="FlairBuilderWidget"></div>');
          component.render(e);
          if (this.minx > component.x) {
            this.minx = component.x;
          }
          if (this.miny > component.y) {
            this.miny = component.y;
          }
          if (maxx < component.x + component.width) {
            maxx = component.x + component.width;
          }
          if (maxy > component.y + component.height) {
            maxy = component.y + component.height;
          }
          this.content.append(e);
          if (component.hidden || !component.visible) {
            e.css("display", "none");
          }
        }
        this.width = maxx - this.minx;
        this.height = maxy - this.miny;
        this.element.css("width", this.width).css("height", this.height);
        this.content.css("top", -this.miny).css("left", -this.minx);
      }
      viewer.append(this.element);
      return this;
    };

    return PageLayer;

  })();

  FlairComponent = (function() {
    FlairComponent.idCounter = 0;

    FlairComponent.prototype.className = "Unknown";

    FlairComponent.prototype.page = null;

    FlairComponent.prototype.container = null;

    function FlairComponent(definition) {
      this.definition = definition;
      _.extend(this, Backbone.Events);
      this.id = this.definition.id;
      this.name = this.definition.name;
      this.width = parseFloat(this.definition.width);
      this.height = parseFloat(this.definition.height);
      this.x = parseFloat(this.definition.x);
      this.y = parseFloat(this.definition.y);
      this.hidden = this.isTrue(this.definition.hidden);
      this.visible = this.isTrue(this.definition.visible);
      this.enabled = this.isTrue(this.definition.enabled);
      this.fixed = this.isTrue(this.definition.fixed);
      this.loadProperties();
      this.loadBehaviors();
    }

    FlairComponent.prototype.render = function(e) {
      var l, viewer,
        _this = this;
      this.e = e;
      this.e.addClass(this.className);
      this.loadPosition(this.e);
      this.doRender(this.e);
      this.doRenderProperties(this.e);
      this.attachBehaviors();
      this.attachTriggers();
      if (this.fixed) {
        this.e.addClass("FlairBuilderWidgetFixed");
        viewer = $("#flairbuilder_html_viewer");
        l = viewer.offset().left;
        this.e.css("left", this.x + parseFloat(l));
        $(window).on("resize", function() {
          l = viewer.offset().left;
          return _this.e.css("left", _this.x + parseFloat(l));
        });
      }
      return this.e;
    };

    FlairComponent.prototype.attachTriggers = function() {};

    FlairComponent.prototype.onmouseleave = function(listener) {};

    FlairComponent.prototype.generateId = function() {
      FlairComponent.idCounter++;
      return FlairComponent.idCounter.toString(16);
    };

    FlairComponent.prototype.loadProperties = function() {
      var p, props, v, _i, _len;
      props = PROPERTIES[this.className];
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        v = this.definition[p];
        switch (p) {
          case BOLD:
            this.bold = this.isTrue(v, "bold", "normal");
            break;
          case ITALIC:
            this.italic = this.isTrue(v, "italic", "normal");
            break;
          case UNDERLINE:
            this.underline = this.isTrue(v, "underline", "none");
            break;
          case LABELTEXT:
            this.labelText = v;
            break;
          case TEXTALIGN:
            this.textAlign = v;
            break;
          case LEADING:
            this.leading = parseInt(v) + this.fontSize;
            break;
          case FONTSIZE:
            this.fontSize = parseInt(v);
            break;
          case FONTCOLOR:
            this.fontColor = intToColorHex(v);
            break;
          case FONTFAMILY:
            this.fontFamily = v;
            break;
          case STYLE:
            this.style = v;
            break;
          case BORDER:
            this.border = true;
            break;
          case BACKGROUNDCOLOR:
            this.backgroundColor = intToColorHex(v);
            break;
          case BACKGROUNDALPHA:
            this.backgroundAlpha = v;
            break;
          case BORDERCOLOR:
            this.borderColor = intToColorHex(v);
            break;
          case BORDERTHICKNESS:
            this.borderThickness = v;
            break;
          case BORDERSTYLE:
            this.borderStyle = v;
            break;
          case CORNERRADIUS:
            this.cornerRadius = parseInt(v);
        }
      }
      return this;
    };

    FlairComponent.prototype.captureCurrentState = function() {
      var p, props, _i, _len;
      props = PROPERTIES[this.className];
      this.currentState = {};
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        if (p === FONTCOLOR) {
          this.currentState["fontColor"] = this.fontColor;
        }
        this.currentState[p] = this[p];
      }
      return this;
    };

    FlairComponent.prototype.isTrue = function(v, trueValue, falseValue) {
      if (trueValue == null) {
        trueValue = true;
      }
      if (falseValue == null) {
        falseValue = false;
      }
      if (v === "true") {
        return trueValue;
      } else {
        return falseValue;
      }
    };

    FlairComponent.prototype.isSimilarTo = function(c) {
      if (this.className !== c.className) {
        return false;
      }
      return (this.height === c.height) || (this.width === c.width);
    };

    FlairComponent.prototype.loadPosition = function(elem) {
      elem.css("width", this.width).css("height", this.height).css("left", this.x).css("top", this.y);
      return elem;
    };

    FlairComponent.prototype.doRenderProperties = function(e) {
      var p, props, v, _i, _len;
      props = PROPERTIES[this.className];
      for (_i = 0, _len = props.length; _i < _len; _i++) {
        p = props[_i];
        v = this.definition[p];
        switch (p) {
          case BOLD:
            e.css("font-weight", this.bold);
            break;
          case ITALIC:
            e.css("font-style", this.italic);
            break;
          case UNDERLINE:
            e.css("text-decoration", this.underline);
            break;
          case TEXTALIGN:
            e.css("text-align", this.textAlign);
            break;
          case LEADING:
            e.css("line-height", this.leading + "px");
            break;
          case FONTSIZE:
            e.css("font-size", this.fontSize);
            break;
          case FONTCOLOR:
            e.css("color", this.fontColor);
            break;
          case FONTFAMILY:
            e.css("font-family", this.fontFamily);
            break;
          case BACKGROUNDCOLOR:
            e.css("background-color", this.backgroundColor);
            break;
          case BORDERCOLOR:
            e.css("border-color", this.borderColor);
            break;
          case BORDERTHICKNESS:
            if (this.borderStyle === "solid") {
              e.css("border-width", this.borderThickness + "px");
            } else {
              e.css("border-width", "0px");
            }
            break;
          case BORDERSTYLE:
            e.css("border-style", "solid");
            break;
          case CORNERRADIUS:
            e.css("border-radius", this.cornerRadius);
        }
      }
      return this;
    };

    FlairComponent.prototype.doRenderProperty = function(property, value) {
      switch (property) {
        case BOLD:
          this.e.css("font-weight", value);
          break;
        case ITALIC:
          this.e.css("font-style", value);
          break;
        case UNDERLINE:
          this.e.css("text-decoration", value);
          break;
        case TEXTALIGN:
          this.e.css("text-align", value);
          break;
        case LEADING:
          this.e.css("line-height", value + "px");
          break;
        case FONTSIZE:
          this.e.css("font-size", value);
          break;
        case FONTCOLOR:
          this.e.css("color", value);
          break;
        case FONTFAMILY:
          this.e.css("font-family", value);
          break;
        case BACKGROUNDCOLOR:
          this.e.css("background-color", value);
          break;
        case BORDERCOLOR:
          this.e.css("border-color", value);
          break;
        case BORDERTHICKNESS:
          if (this.borderStyle === "solid") {
            e.css("border-width", this.borderThickness + "px");
          } else {
            e.css("border-width", "0px");
          }
          break;
        case BORDERSTYLE:
          this.e.css("border-style", "solid");
          break;
        case CORNERRADIUS:
          this.e.css("border-radius", value);
      }
      return this;
    };

    FlairComponent.prototype.doRender = function(elem) {
      return this;
    };

    FlairComponent.prototype.show = function(visible) {
      this.visible = visible;
      if (!this.hidden) {
        if (this.visible) {
          return this.e.css("display", "");
        } else {
          return this.e.css("display", "none");
        }
      } else {
        return this.e.css("display", "none");
      }
    };

    FlairComponent.prototype.enable = function(enabled) {
      this.enabled = enabled;
      if (this.enabled) {

      } else {

      }
    };

    FlairComponent.prototype.appendTextCell = function(e, text) {
      var s;
      s = $('<div class="FlairBuilderWidgetLabel">' + text + '</div>');
      e.append(s);
      return s;
    };

    FlairComponent.prototype.showUnimplementedWarning = function(e) {
      e.addClass("FlairBuilderUnimplementedWidget");
      e.css("text-align", "center").css("text-decoration", "none");
      return this.appendTextCell(e, this.className + "");
    };

    FlairComponent.prototype.dispatchEvent = function(eventType, data, event) {
      return this.trigger(eventType, eventType, data, event);
    };

    FlairComponent.prototype.registerVariable = function() {
      var v;
      if (this.name) {
        v = this.page.name + "::" + this.name;
        return this.page.project.putVariable(v, this.getVariableValue());
      }
    };

    FlairComponent.prototype.getVariableValue = function() {
      return "";
    };

    FlairComponent.prototype.updateVariableContext = function() {
      var v;
      if (this.name) {
        v = this.page.name + "::" + this.name;
        return this.page.project.putVariable(v, this.getVariableValue());
      }
    };

    return FlairComponent;

  })();

  include(FlairComponent, behaviorsMixin);

  BOLD = "bold";

  ITALIC = "italic";

  UNDERLINE = "underline";

  LABELTEXT = "label";

  IMAGE = "image";

  TOOLTIPTEXT = "tooltipText";

  TEXTALIGN = "textAlign";

  LEADING = "leading";

  FONTSIZE = "fontSize";

  FONTCOLOR = "color";

  FONTFAMILY = "fontFamily";

  STYLE = "style";

  BORDER = "BORDER";

  BACKGROUNDCOLOR = "backgroundColor";

  BACKGROUNDALPHA = "backgroundAlpha";

  BORDERCOLOR = "borderColor";

  BORDERTHICKNESS = "borderThickness";

  BORDERSTYLE = "borderStyle";

  CORNERRADIUS = "cornerRadius";

  PROPERTIES = {};

  PROPERTIES["FlairComponentsGroup"] = [];

  PROPERTIES["FlairCustomComponent"] = [];

  PROPERTIES["Accordion"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, TEXTALIGN, BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS];

  PROPERTIES["AccordionHorizontal"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS];

  PROPERTIES["BreadCrumbs"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY];

  PROPERTIES["Button"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, TEXTALIGN, BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS, LABELTEXT, STYLE];

  PROPERTIES["ButtonBar"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, TEXTALIGN, BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, STYLE];

  PROPERTIES["Callout"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE];

  PROPERTIES["CardStack"] = [BACKGROUNDCOLOR, BACKGROUNDALPHA, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS, STYLE];

  PROPERTIES["ScrollingBox"] = [BACKGROUNDCOLOR, BACKGROUNDALPHA, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS];

  PROPERTIES["CheckBox"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, LABELTEXT];

  PROPERTIES["ColorPicker"] = [BACKGROUNDCOLOR];

  PROPERTIES["CloseIcon"] = [BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS];

  PROPERTIES["Chart"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, TEXTALIGN, BACKGROUNDCOLOR, BACKGROUNDALPHA, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, STYLE];

  PROPERTIES["ComboBox"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, BORDERCOLOR];

  PROPERTIES["DataGrid"] = [FONTFAMILY, FONTSIZE, BORDERCOLOR, BORDERTHICKNESS, BACKGROUNDCOLOR, STYLE];

  PROPERTIES["DateChooser"] = [FONTFAMILY, FONTSIZE, FONTCOLOR, BORDERCOLOR, BORDERTHICKNESS, BACKGROUNDCOLOR];

  PROPERTIES["DateField"] = [];

  PROPERTIES["FloatingPane"] = [BACKGROUNDCOLOR, BACKGROUNDALPHA, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS, STYLE];

  PROPERTIES["GroupBox"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, TEXTALIGN, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE];

  PROPERTIES["HorizontalRule"] = [];

  PROPERTIES["HorizontalSlider"] = [];

  PROPERTIES["HotSpot"] = [];

  PROPERTIES["Icon"] = [BACKGROUNDCOLOR];

  PROPERTIES["Image"] = [BORDERCOLOR, BORDERTHICKNESS];

  PROPERTIES["Label"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, LABELTEXT];

  PROPERTIES["VerticalLabel"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, LABELTEXT];

  PROPERTIES["Title"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, LABELTEXT];

  PROPERTIES["Link"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, LABELTEXT];

  PROPERTIES["LinkBar"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY];

  PROPERTIES["List"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, BORDERCOLOR, BORDERTHICKNESS, BACKGROUNDCOLOR];

  PROPERTIES["MenuBar"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, BACKGROUNDCOLOR, BACKGROUNDALPHA, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS, STYLE];

  PROPERTIES["NumericStepper"] = [];

  PROPERTIES["PasswordInput"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, TEXTALIGN, BACKGROUNDCOLOR, BACKGROUNDALPHA, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS, LABELTEXT];

  PROPERTIES["CheckBoxGroup"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, STYLE];

  PROPERTIES["RadioButtonGroup"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, STYLE];

  PROPERTIES["Rectangle"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, BACKGROUNDCOLOR, BACKGROUNDALPHA, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS, LABELTEXT];

  PROPERTIES["Ellipse"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, BACKGROUNDCOLOR, BACKGROUNDALPHA, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, LABELTEXT];

  PROPERTIES["Diamond"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, BACKGROUNDCOLOR, BACKGROUNDALPHA, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, LABELTEXT];

  PROPERTIES["Parallelogram"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, BACKGROUNDCOLOR, BACKGROUNDALPHA, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, LABELTEXT, STYLE];

  PROPERTIES["Line"] = [BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, STYLE];

  PROPERTIES["ScratchOut"] = [BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE];

  PROPERTIES["Polygon"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, BACKGROUNDCOLOR, BACKGROUNDALPHA, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS, LABELTEXT];

  PROPERTIES["Search"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS, LABELTEXT];

  PROPERTIES["TabNavigator"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, TEXTALIGN];

  PROPERTIES["Text"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, LABELTEXT];

  PROPERTIES["TagCloud"] = [FONTCOLOR, FONTFAMILY, TEXTALIGN];

  PROPERTIES["BulletList"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, LABELTEXT];

  PROPERTIES["TextArea"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, LABELTEXT, BACKGROUNDCOLOR, BACKGROUNDALPHA, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS];

  PROPERTIES["TextInput"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, TEXTALIGN, BACKGROUNDCOLOR, BACKGROUNDALPHA, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS, LABELTEXT];

  PROPERTIES["Title"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, LABELTEXT];

  PROPERTIES["SubTitle"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, LEADING, FONTFAMILY, TEXTALIGN, LABELTEXT];

  PROPERTIES["TitleWindow"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, TEXTALIGN, BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, LABELTEXT];

  PROPERTIES["BrowserChrome"] = [BACKGROUNDCOLOR];

  PROPERTIES["Tree"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS];

  PROPERTIES["VerticalRule"] = [];

  PROPERTIES["SplitterVertical"] = [BORDERCOLOR];

  PROPERTIES["SplitterHorizontal"] = [BORDERCOLOR];

  PROPERTIES["Slider"] = [STYLE];

  PROPERTIES["ScrollBar"] = [STYLE];

  PROPERTIES["SpinningWheel"] = [BACKGROUNDCOLOR];

  PROPERTIES["ProgressBar"] = [BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS];

  PROPERTIES["RatingStars"] = [BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS];

  PROPERTIES["VolumeSlider"] = [];

  PROPERTIES["VideoPlayer"] = [BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE];

  PROPERTIES["WebCamViewer"] = [BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE];

  PROPERTIES["GoogleMap"] = [BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE];

  PROPERTIES["IPhoneShell"] = [STYLE];

  PROPERTIES["IPhoneBar"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, LABELTEXT];

  PROPERTIES["IPhonePointyButton"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, BACKGROUNDCOLOR, LABELTEXT, STYLE];

  PROPERTIES["IPhoneLargeButton"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, TEXTALIGN, BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS, LABELTEXT];

  PROPERTIES["IPhoneCheckBox"] = [];

  PROPERTIES["IPhoneHorizontalSlider"] = [];

  PROPERTIES["IPhoneTableList"] = [BACKGROUNDCOLOR, BORDERCOLOR, BORDERTHICKNESS, BORDERSTYLE, CORNERRADIUS];

  PROPERTIES["IPhoneButtonBar"] = [BOLD, ITALIC, UNDERLINE, FONTCOLOR, FONTSIZE, FONTFAMILY, BACKGROUNDCOLOR, LABELTEXT];

  PROPERTIES["IPhoneDotsBar"] = [];

  PROPERTIES["IPhonePicker"] = [];

  PROPERTIES["IPhoneBadge"] = [BACKGROUNDCOLOR, BORDERTHICKNESS, BORDERSTYLE, BORDERCOLOR, STYLE];

  window.PROPERTIES = PROPERTIES;

  FBEVENTS = {};

  PAGE_ON_LOAD = {
    id: "flair:pageOnLoad",
    name: 'Page loaded',
    attach: function(c, action) {}
  };

  GROUP_ON_LOAD = {
    id: "flair:groupOnLoad",
    name: 'Group loaded',
    attach: function(c, action) {}
  };

  PAGE_CUSTOM_EVENT = {
    id: "flair:customEvent",
    name: 'Custom Event',
    attach: function(c, action) {}
  };

  MOUSE_CLICK = {
    id: "flair:mouseClick",
    name: 'Mouse click',
    attach: function(c, action) {}
  };

  MOUSE_DOUBLE_CLICK = {
    id: "flair:mouseDoubleClick",
    name: 'Mouse double click',
    attach: function(c, action) {}
  };

  SELECTION_CHANGED = {
    id: "flair:selectionChanged",
    name: 'Selection changed',
    attach: function(c, action) {}
  };

  ITEM_CLICK = {
    id: "flair:itemClick",
    name: 'Item clicked',
    attach: function(c, action) {}
  };

  LIST_ITEM_CLICK = {
    id: "flair:listItemClick",
    name: 'Item clicked',
    attach: function(c, action) {}
  };

  LIST_ITEM_DOUBLECLICK = {
    id: "flair:listItemDoubleClick",
    name: 'Item double click',
    attach: function(c, action) {}
  };

  SELECTED_TAB_CHANGE = {
    id: "flair:tabChange",
    name: 'Selected tab change',
    attach: function(c, action) {}
  };

  GRID_ROW_CLICK = {
    id: "flair:gridRowClick",
    name: 'Row selected',
    attach: function(c, action) {}
  };

  GRID_ROW_DOUBLECLICK = {
    id: "flair:gridRowDoubleClick",
    name: 'Row double click',
    attach: function(c, action) {}
  };

  VALUE_CHANGE = {
    id: "flair:valueChanged",
    name: 'Change',
    attach: function(c, action) {}
  };

  CHANGE = {
    id: "flair:change",
    name: 'Change',
    attach: function(c, action) {}
  };

  CHECKBOX_SELECTED = {
    id: "flair:checkboxSelected",
    name: 'Select',
    attach: function(c, action) {}
  };

  CHECKBOX_UNSELECTED = {
    id: "flair:checkboxUnselected",
    name: 'Unselect',
    attach: function(c, action) {}
  };

  CHECKBOX_ITEM_SELECTED = {
    id: "flair:checkboxItemSelected",
    name: 'Select',
    attach: function(c, action) {}
  };

  CHECKBOX_ITEM_UNSELECTED = {
    id: "flair:checkboxItemUnselected",
    name: 'Unselect',
    attach: function(c, action) {}
  };

  FOCUS_OUT = {
    id: "flair:focusOut",
    name: 'Focus lost',
    attach: function(c, action) {}
  };

  FOCUS_IN = {
    id: "flair:focusIn",
    name: 'Focus on',
    attach: function(c, action) {}
  };

  MOUSE_OUT = {
    id: "flair:mouseOut",
    name: 'Mouse out',
    attach: function(c, action) {}
  };

  MOUSE_ENTER = {
    id: "flair:mouseEnter",
    name: 'Mouse enter',
    attach: function(c, action) {}
  };

  KEYBOARD_ENTER = {
    id: "flair:keyboardEnter",
    name: 'Keyboard Enter',
    attach: function(c, action) {}
  };

  window.PAGE_ON_LOAD = PAGE_ON_LOAD.id;

  window.GROUP_ON_LOAD = GROUP_ON_LOAD.id;

  window.PAGE_CUSTOM_EVENT = PAGE_CUSTOM_EVENT.id;

  window.MOUSE_CLICK = MOUSE_CLICK.id;

  window.MOUSE_DOUBLE_CLICK = MOUSE_DOUBLE_CLICK.id;

  window.SELECTION_CHANGED = SELECTION_CHANGED.id;

  window.ITEM_CLICK = ITEM_CLICK.id;

  window.LIST_ITEM_CLICK = LIST_ITEM_CLICK.id;

  window.LIST_ITEM_DOUBLECLICK = LIST_ITEM_DOUBLECLICK.id;

  window.SELECTED_TAB_CHANGE = SELECTED_TAB_CHANGE.id;

  window.GRID_ROW_CLICK = GRID_ROW_CLICK.id;

  window.GRID_ROW_DOUBLECLICK = GRID_ROW_DOUBLECLICK.id;

  window.VALUE_CHANGE = VALUE_CHANGE.id;

  window.CHANGE = CHANGE.id;

  window.CHECKBOX_SELECTED = CHECKBOX_SELECTED.id;

  window.CHECKBOX_UNSELECTED = CHECKBOX_UNSELECTED.id;

  window.CHECKBOX_ITEM_SELECTED = CHECKBOX_ITEM_SELECTED.id;

  window.CHECKBOX_ITEM_UNSELECTED = CHECKBOX_ITEM_UNSELECTED.id;

  window.FOCUS_OUT = FOCUS_OUT.id;

  window.FOCUS_IN = FOCUS_IN.id;

  window.MOUSE_OUT = MOUSE_OUT.id;

  window.MOUSE_ENTER = MOUSE_ENTER.id;

  window.KEYBOARD_ENTER = KEYBOARD_ENTER.id;

  triggerByID = function(triggerID) {
    switch (triggerID) {
      case PAGE_ON_LOAD.id:
        return PAGE_ON_LOAD;
      case GROUP_ON_LOAD.id:
        return GROUP_ON_LOAD;
      case PAGE_CUSTOM_EVENT.id:
        return PAGE_CUSTOM_EVENT;
      case MOUSE_CLICK.id:
        return MOUSE_CLICK;
      case MOUSE_DOUBLE_CLICK.id:
        return MOUSE_DOUBLE_CLICK;
      case SELECTION_CHANGED.id:
        return SELECTION_CHANGED;
      case ITEM_CLICK.id:
        return ITEM_CLICK;
      case LIST_ITEM_CLICK.id:
        return LIST_ITEM_CLICK;
      case LIST_ITEM_DOUBLECLICK.id:
        return LIST_ITEM_DOUBLECLICK;
      case SELECTED_TAB_CHANGE.id:
        return SELECTED_TAB_CHANGE;
      case GRID_ROW_CLICK.id:
        return GRID_ROW_CLICK;
      case GRID_ROW_DOUBLECLICK.id:
        return GRID_ROW_DOUBLECLICK;
      case VALUE_CHANGE.id:
        return VALUE_CHANGE;
      case CHANGE.id:
        return CHANGE;
      case CHECKBOX_SELECTED.id:
        return CHECKBOX_SELECTED;
      case CHECKBOX_UNSELECTED.id:
        return CHECKBOX_UNSELECTED;
      case CHECKBOX_ITEM_SELECTED.id:
        return CHECKBOX_ITEM_SELECTED;
      case CHECKBOX_ITEM_UNSELECTED.id:
        return CHECKBOX_ITEM_UNSELECTED;
      case FOCUS_OUT.id:
        return FOCUS_OUT;
      case FOCUS_IN.id:
        return FOCUS_IN;
      case MOUSE_OUT.id:
        return MOUSE_OUT;
      case MOUSE_ENTER.id:
        return MOUSE_ENTER;
      case KEYBOARD_ENTER.id:
        return KEYBOARD_ENTER;
    }
    return null;
  };

  FBGoToPageAction = "flair:GoToPageAction";

  FBShowLayer = "flair:ShowLayer";

  FBCloseLayer = "flair:CloseLayer";

  FBBrowseCardStack = "flair:BrowseCardStack";

  FBShowHideComponents = "flair:ShowHideComponents";

  FBEnableDisableComponents = "flair:EnableDisableComponents";

  FBMoveComponents = "flair:MoveComponents";

  FBUpdateStyling = "flair:UpdateStyling";

  FBDelayInsertAction = "flair:DelayInsertAction";

  FBIfCondtionPassed = "flair:IfConditionPassed";

  FBBrowseForFile = "flair:BrowseForFile";

  FBGoToURLAction = "flair:GoToURLAction";

  FBUpdateVariableAction = "flair:UpdateVariableAction";

  FBDispatchCustomEvent = "flair:DispatchCustomEvent";

  FBShowMessage = "flair:ShowMessage";

  FBShowFloatingPane = "flair:ShowFloatingPane";

  FBCloseCurrentFloatingPane = "flair:CloseCurrentFloatingPane";

  FBOpenPopUpAction = "flair:OpenPopUpAction";

  FBClosePopUpAction = "flair:ClosePopUpAction";

  FBEVENTS["Accordion"] = [SELECTED_TAB_CHANGE];

  FBEVENTS["AccordionHorizontal"] = [SELECTED_TAB_CHANGE];

  FBEVENTS["BreadCrumbs"] = [ITEM_CLICK];

  FBEVENTS["Button"] = [MOUSE_CLICK];

  FBEVENTS["ButtonBar"] = [ITEM_CLICK];

  FBEVENTS["Callout"] = [];

  FBEVENTS["CardStack"] = [];

  FBEVENTS["ScrollingBox"] = [];

  FBEVENTS["CheckBox"] = [CHANGE, CHECKBOX_SELECTED, CHECKBOX_UNSELECTED];

  FBEVENTS["ColorPicker"] = [];

  FBEVENTS["CloseIcon"] = [MOUSE_CLICK, MOUSE_DOUBLE_CLICK, MOUSE_ENTER, MOUSE_OUT];

  FBEVENTS["Chart"] = [MOUSE_CLICK, MOUSE_DOUBLE_CLICK, MOUSE_ENTER, MOUSE_OUT];

  FBEVENTS["ComboBox"] = [SELECTION_CHANGED];

  FBEVENTS["DataGrid"] = [GRID_ROW_CLICK, GRID_ROW_DOUBLECLICK];

  FBEVENTS["DateChooser"] = [];

  FBEVENTS["DateField"] = [];

  FBEVENTS["FloatingPane"] = [];

  FBEVENTS["GroupBox"] = [];

  FBEVENTS["HorizontalRule"] = [];

  FBEVENTS["HorizontalSlider"] = [];

  FBEVENTS["HotSpot"] = [MOUSE_CLICK, MOUSE_ENTER, MOUSE_OUT];

  FBEVENTS["Icon"] = [MOUSE_CLICK, MOUSE_DOUBLE_CLICK, MOUSE_ENTER, MOUSE_OUT];

  FBEVENTS["Image"] = [MOUSE_CLICK, MOUSE_DOUBLE_CLICK, MOUSE_ENTER, MOUSE_OUT];

  FBEVENTS["VerticalLabel"] = [];

  FBEVENTS["Title"] = [];

  FBEVENTS["LinkBar"] = [ITEM_CLICK];

  FBEVENTS["List"] = [LIST_ITEM_CLICK, LIST_ITEM_DOUBLECLICK];

  FBEVENTS["MenuBar"] = [ITEM_CLICK];

  FBEVENTS["NumericStepper"] = [];

  FBEVENTS["PasswordInput"] = [CHANGE, KEYBOARD_ENTER, FOCUS_IN, FOCUS_OUT];

  FBEVENTS["CheckBoxGroup"] = [VALUE_CHANGE, CHECKBOX_ITEM_SELECTED, CHECKBOX_ITEM_UNSELECTED];

  FBEVENTS["RadioButtonGroup"] = [VALUE_CHANGE, SELECTION_CHANGED];

  FBEVENTS["Rectangle"] = [MOUSE_CLICK, MOUSE_DOUBLE_CLICK, MOUSE_ENTER, MOUSE_OUT];

  FBEVENTS["Ellipse"] = [MOUSE_CLICK, MOUSE_DOUBLE_CLICK, MOUSE_ENTER, MOUSE_OUT];

  FBEVENTS["Diamond"] = [MOUSE_CLICK, MOUSE_DOUBLE_CLICK, MOUSE_ENTER, MOUSE_OUT];

  FBEVENTS["Parallelogram"] = [MOUSE_CLICK, MOUSE_DOUBLE_CLICK, MOUSE_ENTER, MOUSE_OUT];

  FBEVENTS["Line"] = [];

  FBEVENTS["ScratchOut"] = [MOUSE_CLICK, MOUSE_DOUBLE_CLICK, MOUSE_ENTER, MOUSE_OUT];

  FBEVENTS["Polygon"] = [MOUSE_CLICK, MOUSE_DOUBLE_CLICK, MOUSE_ENTER, MOUSE_OUT];

  FBEVENTS["Search"] = [KEYBOARD_ENTER];

  FBEVENTS["TabNavigator"] = [SELECTED_TAB_CHANGE];

  FBEVENTS["Text"] = [];

  FBEVENTS["TagCloud"] = [];

  FBEVENTS["BulletList"] = [];

  FBEVENTS["TextArea"] = [CHANGE, FOCUS_IN, FOCUS_OUT];

  FBEVENTS["TextInput"] = [CHANGE, KEYBOARD_ENTER, FOCUS_IN, FOCUS_OUT];

  FBEVENTS["Title"] = [];

  FBEVENTS["SubTitle"] = [];

  FBEVENTS["TitleWindow"] = [];

  FBEVENTS["BrowserChrome"] = [];

  FBEVENTS["Tree"] = [LIST_ITEM_CLICK, LIST_ITEM_DOUBLECLICK];

  FBEVENTS["VerticalRule"] = [];

  FBEVENTS["SplitterVertical"] = [];

  FBEVENTS["SplitterHorizontal"] = [];

  FBEVENTS["Slider"] = [];

  FBEVENTS["ScrollBar"] = [];

  FBEVENTS["SpinningWheel"] = [];

  FBEVENTS["ProgressBar"] = [];

  FBEVENTS["RatingStars"] = [];

  FBEVENTS["VideoPlayer"] = [];

  FBEVENTS["VolumeSlider"] = [];

  FBEVENTS["WebCamViewer"] = [];

  FBEVENTS["GoogleMap"] = [];

  FBEVENTS["IPhoneShell"] = [];

  FBEVENTS["IPhoneBar"] = [];

  FBEVENTS["IPhonePointyButton"] = [MOUSE_CLICK];

  FBEVENTS["IPhoneLargeButton"] = [MOUSE_CLICK];

  FBEVENTS["IPhoneCheckBox"] = [CHANGE, CHECKBOX_SELECTED, CHECKBOX_UNSELECTED];

  FBEVENTS["IPhoneHorizontalSlider"] = [];

  FBEVENTS["IPhoneTableList"] = [LIST_ITEM_CLICK, LIST_ITEM_DOUBLECLICK];

  FBEVENTS["IPhoneButtonBar"] = [ITEM_CLICK];

  FBEVENTS["IPhoneDotsBar"] = [ITEM_CLICK];

  FBEVENTS["IPhonePicker"] = [];

  FBEVENTS["IPhoneBadge"] = [];

  window.FBEVENTS = FBEVENTS;

  newComponent = function(clasz, def, page) {
    var c;
    c = null;
    switch (clasz) {
      case "Accordion":
        c = new fb.Accordion(def);
        break;
      case "AccordionHorizontal":
        c = new fb.AccordionHorizontal(def);
        break;
      case "BreadCrumbs":
        c = new fb.BreadCrumbs(def);
        break;
      case "Button":
        c = new fb.Button(def);
        break;
      case "ButtonBar":
        c = new fb.ButtonBar(def);
        break;
      case "Callout":
        c = new fb.Callout(def);
        break;
      case "CardStack":
        c = new fb.CardStack(def);
        break;
      case "ScrollingBox":
        c = new fb.ScrollingBox(def);
        break;
      case "CheckBox":
        c = new fb.CheckBox(def);
        break;
      case "ColorPicker":
        c = new fb.ColorPicker(def);
        break;
      case "CloseIcon":
        c = new fb.CloseIcon(def);
        break;
      case "Chart":
        c = new fb.Chart(def);
        break;
      case "ComboBox":
        c = new fb.ComboBox(def);
        break;
      case "DataGrid":
        c = new fb.DataGrid(def);
        break;
      case "DateChooser":
        c = new fb.DateChooser(def);
        break;
      case "DateField":
        c = new fb.DateField(def);
        break;
      case "FloatingPane":
        c = new fb.FloatingPane(def);
        break;
      case "GroupBox":
        c = new fb.GroupBox(def);
        break;
      case "HorizontalRule":
        c = new fb.HorizontalRule(def);
        break;
      case "HorizontalSlider":
        c = new fb.HorizontalSlider(def);
        break;
      case "HotSpot":
        c = new fb.HotSpot(def);
        break;
      case "Icon":
        c = new fb.Icon(def);
        break;
      case "Image":
        c = new fb.Image(def);
        break;
      case "Label":
        c = new fb.Label(def);
        break;
      case "VerticalLabel":
        c = new fb.VerticalLabel(def);
        break;
      case "Title":
        c = new fb.Title(def);
        break;
      case "Link":
        c = new fb.Link(def);
        break;
      case "LinkBar":
        c = new fb.LinkBar(def);
        break;
      case "List":
        c = new fb.List(def);
        break;
      case "MenuBar":
        c = new fb.MenuBar(def);
        break;
      case "NumericStepper":
        c = new fb.NumericStepper(def);
        break;
      case "PasswordInput":
        c = new fb.PasswordInput(def);
        break;
      case "CheckBoxGroup":
        c = new fb.CheckBoxGroup(def);
        break;
      case "RadioButtonGroup":
        c = new fb.RadioButtonGroup(def);
        break;
      case "Rectangle":
        c = new fb.Rectangle(def);
        break;
      case "Ellipse":
        c = new fb.Ellipse(def);
        break;
      case "Diamond":
        c = new fb.Diamond(def);
        break;
      case "Parallelogram":
        c = new fb.Parallelogram(def);
        break;
      case "Line":
        c = new fb.Line(def);
        break;
      case "ScratchOut":
        c = new fb.ScratchOut(def);
        break;
      case "Polygon":
        c = new fb.Polygon(def);
        break;
      case "Search":
        c = new fb.Search(def);
        break;
      case "TabNavigator":
        c = new fb.TabNavigator(def);
        break;
      case "Text":
        c = new fb.Text(def);
        break;
      case "TagCloud":
        c = new fb.TagCloud(def);
        break;
      case "BulletList":
        c = new fb.BulletList(def);
        break;
      case "TextArea":
        c = new fb.TextArea(def);
        break;
      case "TextInput":
        c = new fb.TextInput(def);
        break;
      case "Title":
        c = new fb.Title(def);
        break;
      case "SubTitle":
        c = new fb.SubTitle(def);
        break;
      case "TitleWindow":
        c = new fb.TitleWindow(def);
        break;
      case "BrowserChrome":
        c = new fb.BrowserChrome(def);
        break;
      case "Tree":
        c = new fb.Tree(def);
        break;
      case "VerticalRule":
        c = new fb.VerticalRule(def);
        break;
      case "SplitterVertical":
        c = new fb.SplitterHorizontal(def);
        break;
      case "SplitterHorizontal":
        c = new fb.SplitterVertical(def);
        break;
      case "Slider":
        c = new fb.Slider(def);
        break;
      case "ScrollBar":
        c = new fb.ScrollBar(def);
        break;
      case "SpinningWheel":
        c = new fb.SpinningWheel(def);
        break;
      case "ProgressBar":
        c = new fb.ProgressBar(def);
        break;
      case "RatingStars":
        c = new fb.RatingStars(def);
        break;
      case "VideoPlayer":
        c = new fb.VideoPlayer(def);
        break;
      case "VolumeSlider":
        c = new fb.VolumeSlider(def);
        break;
      case "WebCamViewer":
        c = new fb.WebCamViewer(def);
        break;
      case "GoogleMap":
        c = new fb.GoogleMap(def);
        break;
      case "IPhoneShell":
        c = new fb.IPhoneShell(def);
        break;
      case "IPhoneBar":
        c = new fb.IPhoneBar(def);
        break;
      case "IPhonePointyButton":
        c = new fb.IPhonePointyButton(def);
        break;
      case "IPhoneLargeButton":
        c = new fb.IPhoneLargeButton(def);
        break;
      case "IPhoneCheckBox":
        c = new fb.IPhoneCheckBox(def);
        break;
      case "IPhoneHorizontalSlider":
        c = new fb.IPhoneHorizontalSlider(def);
        break;
      case "IPhoneTableList":
        c = new fb.IPhoneTableList(def);
        break;
      case "IPhoneButtonBar":
        c = new fb.IPhoneButtonBar(def);
        break;
      case "IPhoneDotsBar":
        c = new fb.IPhoneDotsBar(def);
        break;
      case "IPhonePicker":
        c = new fb.IPhonePicker(def);
        break;
      case "IPhoneBadge":
        c = new fb.IPhoneBadge(def);
        break;
      case "FlairComponentsGroup":
        c = new fb.FlairComponentsGroup(def, page);
    }
    return c;
  };

  StyleConstants = (function() {
    function StyleConstants() {}

    StyleConstants.BOLD = "bold";

    StyleConstants.ITALIC = "italic";

    StyleConstants.UNDERLINE = "underline";

    StyleConstants.LABELTEXT = "label";

    StyleConstants.IMAGE = "image";

    StyleConstants.TOOLTIPTEXT = "tooltipText";

    StyleConstants.TEXTALIGN = "textAlign";

    StyleConstants.LEADING = "leading";

    StyleConstants.FONTSIZE = "fontSize";

    StyleConstants.FONTCOLOR = "color";

    StyleConstants.FONTFAMILY = "fontFamily";

    StyleConstants.STYLE = "style";

    StyleConstants.BORDER = "BORDER";

    StyleConstants.BACKGROUNDCOLOR = "backgroundColor";

    StyleConstants.BACKGROUNDALPHA = "backgroundAlpha";

    StyleConstants.BORDERCOLOR = "borderColor";

    StyleConstants.BORDERTHICKNESS = "borderThickness";

    StyleConstants.BORDERSTYLE = "borderStyle";

    StyleConstants.CORNERRADIUS = "cornerRadius";

    return StyleConstants;

  })();

  namespace('fb', function(exports) {
    exports.StyleConstants = StyleConstants;
    exports.BOLD = BOLD;
    exports.ITALIC = ITALIC;
    exports.UNDERLINE = UNDERLINE;
    exports.LABELTEXT = LABELTEXT;
    exports.IMAGE = IMAGE;
    exports.TOOLTIPTEXT = TOOLTIPTEXT;
    exports.TEXTALIGN = TEXTALIGN;
    exports.LEADING = LEADING;
    exports.FONTSIZE = FONTSIZE;
    exports.FONTCOLOR = FONTCOLOR;
    exports.FONTFAMILY = FONTFAMILY;
    exports.STYLE = STYLE;
    exports.BORDER = BORDER;
    exports.BACKGROUNDCOLOR = BACKGROUNDCOLOR;
    exports.BACKGROUNDALPHA = BACKGROUNDALPHA;
    exports.BORDERCOLOR = BORDERCOLOR;
    exports.BORDERTHICKNESS = BORDERTHICKNESS;
    exports.BORDERSTYLE = BORDERSTYLE;
    return exports.CORNERRADIUS = CORNERRADIUS;
  });

  namespace("fb", function(exports) {
    exports.FlairProject = FlairProject;
    exports.FlairPage = FlairPage;
    exports.FlairComponent = FlairComponent;
    return exports.newComponent = newComponent;
  });

}).call(this);
;(function() {
  var FlairBuilderViewer;

  FlairBuilderViewer = (function() {
    function FlairBuilderViewer(element) {
      this.element = element;
    }

    FlairBuilderViewer.prototype.display = function(project) {
      var page, pageid,
        _this = this;
      this.project = project;
      pageid = $(location).attr("hash");
      if (pageid.indexOf("#") === 0) {
        pageid = pageid.substr(1);
      }
      if (pageid) {
        page = this.project.getPage(pageid);
      } else {
        page = this.project.getDefaultPage();
      }
      this.project.on("page-select", function(newpage) {
        return _this.selectPage(newpage);
      });
      this.project.on("layer-select", function(layer, action) {
        return _this.selectLayer(layer, action);
      });
      this.project.on("show-as-popup", function(components) {
        return _this.showAsPopup(components);
      });
      this.project.selectPage(pageid);
      return this;
    };

    FlairBuilderViewer.prototype.selectPage = function(page, isMaster) {
      var m;
      if (isMaster == null) {
        isMaster = false;
      }
      this.element.css("width", page.width).css("height", page.height);
      this.element.contents().detach();
      if (page.master) {
        m = this.project.getPage(page.master);
        if (m) {
          this.selectPage(m, true);
        }
      }
      page.render(this.element);
      return page.dispatchPageLoad(isMaster);
    };

    FlairBuilderViewer.prototype.selectLayer = function(layer, action) {
      var e;
      layer.render(this.element);
      e = layer.element;
      if (action.positioning === "relative") {
        return e.css("top", (action.host.y + action.position.y) + "px").css("left", (action.host.x + action.position.x) + "px");
      } else {
        return e.css("top", action.position.y + "px").css("left", action.position.x + "px");
      }
    };

    FlairBuilderViewer.prototype.showAsPopup = function(components) {
      var c, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = components.length; _i < _len; _i++) {
        c = components[_i];
        c.e.detach();
        _results.push(this.element.append(c.e));
      }
      return _results;
    };

    return FlairBuilderViewer;

  })();

  namespace("fb", function(exports) {
    return exports.FlairBuilderViewer = FlairBuilderViewer;
  });

}).call(this);
;(function() {
  var BOLD_EXPR, CHECKBOX_EXPR, COLOR_EXPR, ESCAPED_BACKSLASH, ESCAPED_CLOSE_ACCOLDADE, ESCAPED_CLOSING_BRACKET, ESCAPED_DASH, ESCAPED_DOLLAR, ESCAPED_OPENING_BRACKET, ESCAPED_OPEN_ACCOLDADE, ESCAPED_SLASH, ESCAPED_STAR, EXPAND_EXPR, FLAIRBUILDER_ICONS, ITALIC_EXPR, LINK_EXPR, LabeledObject, NEWLINE_EXPR, UNDERLINE_EXPR, VARIABLE_EXPR;

  String.prototype.reverse = function() {
    return this.split('').reverse().join('');
  };

  LabeledObject = (function() {
    var children, enabled, expanded, htmlText, label, selected, toggled, type;

    LabeledObject.TYPE_CHECK = 'check';

    LabeledObject.TYPE_EXPAND = 'expand';

    LabeledObject.TYPE_NORMAL = 'normal';

    LabeledObject.TYPE_DROPDOWN = 'dropdown';

    LabeledObject.TYPE_RADIO = 'radio';

    LabeledObject.TYPE_SEPARATOR = 'separator';

    children = [];

    label = '';

    htmlText = '';

    type = '';

    enabled = false;

    toggled = false;

    selected = false;

    expanded = false;

    function LabeledObject(label, component) {
      this.label = label;
      this.component = component;
      this.parse(this.label);
    }

    LabeledObject.prototype.render = function(element) {
      var _this = this;
      this.element = element;
      this.element.html(this.htmlText);
      return this.element.find("a").click(function(event) {
        var p, page_name, ref, t;
        ref = $(event.target).attr("href");
        t = ref.split(":");
        if (t && t.length === 2) {
          page_name = t[1];
          p = _this.component.page.project.getPageByName(page_name);
          if (p) {
            return _this.component.page.project.selectPage(p.id);
          }
        }
      });
    };

    LabeledObject.prototype.parse = function(expression) {
      var ICONS_EXPR, indx, linkText, m, match, matches, n, pageName, s, value, vard, _i, _j, _len, _len1,
        _this = this;
      this.label = expression;
      if (!expression) {
        this.selected = false;
        this.image = null;
        this.expanded = false;
        this.htmlText = '';
        return;
      }
      expression = expression.reverse();
      vard = 0;
      matches = VARIABLE_EXPR.exec(expression);
      while ((matches != null) && matches.length > 0 && vard < 5) {
        for (_i = 0, _len = matches.length; _i < _len; _i++) {
          match = matches[_i];
          m = match.reverse();
          m = m.substr(1);
          m = this.component.page.name + "::" + m;
          value = this.component.page.project.getVariable(m);
          if (value == null) {
            value = match;
          } else {
            value = value.reverse();
          }
          expression = expression.replace(match, value);
        }
        matches = VARIABLE_EXPR.exec(expression);
        vard++;
      }
      if (vard > 0 && this.component && !this.listenerAdded) {
        this.listenerAdded = true;
        this.component.page.project.on("variable-change", function() {
          _this.parse(_this.label);
          return _this.render(_this.element);
        });
      }
      expression = expression.replace(/</g, ';tl&');
      expression = expression.replace(/\\\\,/g, ',');
      expression = expression.replace(ITALIC_EXPR, ">i/<$1>i<");
      expression = expression.replace(COLOR_EXPR, ">tnof/<$1>'$2#'=roloc tnof<");
      ICONS_EXPR = /}(\\.|[a-z|A-Z|0-9|:|_|-]+|\s)+{(?!\\)/g;
      matches = ICONS_EXPR.exec(expression);
      expression = expression.replace(ESCAPED_SLASH, "/");
      if ((matches != null) && matches.length > 0) {
        m = matches[0];
        m = m.substring(1, m.length - 1);
        if (m.indexOf(":") > -1) {
          m = m.substring(0, m.indexOf(":"));
        }
        m = m.reverse();
        n = m;
        if (n != null) {
          n = n.reverse();
          n = '>i/<>"' + n + '-noci noci-lebal"=ssalc i<';
        } else {
          n = "";
        }
        expression = expression.replace(ICONS_EXPR, n);
      }
      expression = expression.replace(ESCAPED_OPEN_ACCOLDADE, "{");
      expression = expression.replace(ESCAPED_CLOSE_ACCOLDADE, "}");
      expression = expression.replace(BOLD_EXPR, ">b/<$1>b<");
      expression = expression.replace(ESCAPED_STAR, "*");
      expression = expression.replace(UNDERLINE_EXPR, ">u/<$1>u<");
      expression = expression.replace(ESCAPED_DASH, "_");
      expression = expression.replace(NEWLINE_EXPR, ">/rb<");
      matches = CHECKBOX_EXPR.exec(expression);
      if ((matches != null) && matches.length > 0) {
        m = matches[0];
        if (m.length === 3) {
          this.selected = true;
        } else {
          this.selected = false;
        }
        this.type = LabeledObject.TYPE_CHECK;
        expression = expression.replace(CHECKBOX_EXPR, '');
      } else {
        this.selected = false;
      }
      matches = EXPAND_EXPR.exec(expression);
      if ((matches != null) && matches.length > 0) {
        m = matches[0];
        if (m === "]-[") {
          this.expanded = true;
        } else {
          this.expanded = false;
        }
        this.type = LabeledObject.TYPE_EXPAND;
        expression = expression.replace(EXPAND_EXPR, '');
      } else {
        this.expanded = false;
      }
      expression = expression.replace(ESCAPED_OPENING_BRACKET, "[");
      expression = expression.replace(ESCAPED_CLOSING_BRACKET, "]");
      expression = expression.replace(ESCAPED_DOLLAR, '$');
      matches = expression.match(LINK_EXPR);
      if ((matches != null) && matches.length > 0) {
        expression = expression.replace(LINK_EXPR, "</a></u></font>".reverse() + "$1" + "<font color='#003399'><u><a href='event:#'>".reverse());
        for (_j = 0, _len1 = matches.length; _j < _len1; _j++) {
          match = matches[_j];
          indx = match.indexOf("#");
          if (indx > 0 && indx < match.length - 1 && !(match.substr(indx - 2, 1) === '\\')) {
            linkText = match.substr(1, indx - 1);
            pageName = match.substr(indx + 1, match.length - indx - 2);
            s = ("<a href='event:#'>" + match.substr(1, match.length - 2).reverse() + "</a>").reverse();
            expression = expression.replace(s, ("<a href='event:" + pageName.reverse() + "'>" + linkText.reverse() + "</a>").reverse());
          }
        }
      }
      expression = expression.replace(ESCAPED_BACKSLASH, "");
      expression = expression.replace(/;Dx#&/g, ">rb/<");
      expression = expression.reverse();
      return this.htmlText = expression;
    };

    LabeledObject.prototype.capitalize = function(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };

    LabeledObject.prototype.stripHtml = function() {
      return htmlText;
    };

    return LabeledObject;

  })();

  ESCAPED_OPEN_ACCOLDADE = /{\\/g;

  ESCAPED_CLOSE_ACCOLDADE = /}\\/g;

  ITALIC_EXPR = /\/((\.|[^\/])+)\/(?!\\)/g;

  ESCAPED_SLASH = /\/\\/g;

  BOLD_EXPR = /\*((\.|[^\*])+)\*(?!\\)/g;

  ESCAPED_STAR = /\*\\/g;

  UNDERLINE_EXPR = /_((\\.|[^_])+)_(?!\\)/g;

  ESCAPED_DASH = /_\\/g;

  NEWLINE_EXPR = /n\\(?!\\)/g;

  CHECKBOX_EXPR = /\](((\\.|[x|X]?)+))\[(?!\\)/g;

  EXPAND_EXPR = /\]((\\.|[-|+]?)+)\[(?!\\)/g;

  LINK_EXPR = /\]((\.|[^\]])+)\[(?!\\)/g;

  ESCAPED_OPENING_BRACKET = /\[\\/;

  ESCAPED_CLOSING_BRACKET = /\]\\/;

  ESCAPED_BACKSLASH = /\\(?!\\)/g;

  ESCAPED_DOLLAR = /\$(?!\\)/g;

  VARIABLE_EXPR = /[a-z|A-Z|0-9]+[a-z|A-Z]\$(?!\\)/g;

  COLOR_EXPR = /}roloc{([^{]*)}([a-f|0-9|A-F]{6})\:roloc{/g;

  FLAIRBUILDER_ICONS = {
    "AddComment": "icon-comment-alt",
    "AddPage": "icon-plus",
    "AIM": "icon",
    "AlarmClock": "icon-time",
    "Alert": "icon-warning-sign",
    "Alert2": "icon-warning-sign",
    "Anchor": "icon-link",
    "AppForm": "icon",
    "AppFormAdd": "icon",
    "AppFormDelete": "icon",
    "AppFormEdit": "icon",
    "Application": "icon",
    "Archive": "icon-download-alt",
    "ArrowRefresh": "icon-refresh",
    "Asterisk": "icon-asterisk",
    "BackSpace": "icon",
    "BackSpace2": "icon",
    "Baloon": "icon-comment-alt",
    "Battery": "icon",
    "Blogger": "icon",
    "Bold": "icon-bold",
    "Book": "icon-book",
    "Box": "icon-inbox",
    "Bricks": "icon",
    "Briefcase": "icon-briefcase",
    "Broadcast": "icon-rss",
    "Building": "icon",
    "Bullets": "icon-th-list",
    "Calendar": "icon-calendar",
    "Camera": "icon-camera",
    "Cart": "icon-shopping-cart",
    "CellBars": "icon-signal",
    "CellPhone": "icon",
    "ChartBar": "icon-bar-chart",
    "ChartLine": "icon",
    "ChartOrganization": "icon-sitemap",
    "ChartPie": "icon",
    "CheckMark": "icon-ok",
    "Circle": "icon",
    "CircledMinus": "icon-minus-sign",
    "CircledPlus": "icon-plus-sign",
    "Close": "icon-remove-circle",
    "Cloud": "icon-cloud",
    "Club": "icon",
    "Columns": "icon-columns",
    "Comments": "icon-comments-alt",
    "Contact": "icon-user",
    "Contacts": "icon-user",
    "Contrast": "icon-adjust",
    "Copy": "icon-copy",
    "Copyright": "icon",
    "CoverFlow": "icon",
    "CreativeCommons": "icon",
    "Cup": "icon-glass",
    "Cursor": "icon",
    "Cut": "icon-cut",
    "Dash": "icon-minus",
    "DataBase": "icon-hdd",
    "Date": "icon-calendar",
    "Delicious": "icon",
    "Digg": "icon",
    "Disconnect": "icon-link",
    "DiskMultiple": "icon-save",
    "DocEmpty": "icon-file",
    "DocExcel": "icon-file",
    "DocPDF": "icon-file",
    "DocWord": "icon-file",
    "Dollar": "icon-money",
    "Door": "icon-signout",
    "DoorIn": "icon-signin",
    "Dot": "icon",
    "DotHollow": "icon",
    "DoubleArrow": "icon-resize-horizontal",
    "DownArrow": "icon-arrow-down",
    "DownFillTriangle": "icon-caret-down",
    "DownLeftArrow": "icon-arrow-down",
    "Download": "icon-download-alt",
    "DownRightArrow": "icon-arrow-right",
    "DownTriangle": "icon-caret-down",
    "DriveCdEmpty": "icon-hdd",
    "Dvd": "icon-play-circle",
    "Eject": "icon-eject",
    "Ellipsis": "icon",
    "Email": "icon-envelope",
    "Emoticon": "icon",
    "Euro": "icon-money",
    "ExclamationPoint": "icon-exclamation-sign",
    "Export": "icon-signout",
    "Eye": "icon-eye-open",
    "Facebook": "icon-facebook",
    "File": "icon-file",
    "Filter": "icon-filter",
    "Flag": "icon-flag",
    "Flickr": "icon",
    "Folder": "icon-folder-close",
    "FolderExplore": "icon-search",
    "FolderUser": "icon-user",
    "Forbidden": "icon-ban-circle",
    "Forward": "icon-forward",
    "ForwardChapter": "icon-fast-forward",
    "FriendFeed": "icon",
    "FullScreen": "icon-fullscreen",
    "FullScreenExit": "icon-resize-small",
    "Gear": "icon-cog",
    "GeoLocation": "icon-screenshot",
    "GeoLocation2": "icon-map-marker",
    "Gmail": "icon-envelope",
    "Google": "icon-google-plus",
    "GooglePlus": "icon-google-plus",
    "Grid": "icon-th",
    "Gt": "icon-chevron-right",
    "GtCircled": "icon-circle-arrow-right",
    "HandClose": "icon",
    "HandOpen": "icon-hand-up",
    "HandPoint": "icon-hand-up",
    "Heart": "icon-heart",
    "Help": "icon-question-sign",
    "Help2": "icon-question-sign",
    "HLines": "icon-reorder",
    "HomeLink": "icon-globe",
    "HomeMobile": "icon-home",
    "HourGlass": "icon-time",
    "HouseGo": "icon-home",
    "IBeam": "icon-text-height",
    "Indent": "icon-indent-left",
    "Image": "icon-picture",
    "Import": "icon-signin",
    "Info": "icon-info-sign",
    "Info2": "icon-info-sign",
    "IPod": "icon-music",
    "Italic": "icon-italic",
    "Jewel": "icon-sort",
    "JumpBack": "icon-arrow-left",
    "JumpOut": "icon-share",
    "Key": "icon-key",
    "Layers": "icon-th-large",
    "LeftArrow": "icon-arrow-left",
    "LeftFillTriangle": "icon-caret-left",
    "LeftTriangle": "icon-caret-left",
    "LightBulb": "icon-beaker",
    "Lightning": "icon-bolt",
    "Line": "icon-magic",
    "Link": "icon-magnet",
    "Linkedin": "icon-linkedin",
    "LinkGlobe": "icon-globe",
    "List": "icon-align-justify",
    "Lock": "icon-lock",
    "LockOpen": "icon-unlock",
    "Map": "icon-map-marker",
    "Mic": "icon-music",
    "Minus": "icon-minus",
    "Money": "icon-money",
    "Music": "icon-music",
    "Note": "icon-file",
    "Number0": "icon",
    "Number1": "icon",
    "Number2": "icon",
    "Number3": "icon",
    "Number4": "icon",
    "Number5": "icon",
    "Number6": "icon",
    "Number7": "icon",
    "Number8": "icon",
    "Number9": "icon",
    "NumberedList": "icon-list-ol",
    "OpenFolder": "icon-folder-open",
    "OpenID": "icon",
    "Outdent": "icon-indent-right",
    "Package": "icon-inbox",
    "PageAttach": "icon-paper-clip",
    "PageCode": "icon-file",
    "Pages": "icon-copy",
    "PageWhiteActionscript": "icon-file",
    "Pallete": "icon-dashboard",
    "PaperClip": "icon-paper-clip",
    "Paste": "icon-paste",
    "Pause": "icon-pause",
    "Pencil": "icon-pencil",
    "PhoneDial": "icon-phone",
    "PhoneHang": "icon-phone",
    "Pill": "icon-leaf",
    "Plugin": "icon-th-large",
    "Plus": "icon-plus",
    "PlusBig": "icon-plus",
    "PortletEdit": "icon",
    "PortletHelp": "icon",
    "PortletMaximize": "icon",
    "PortletMinimize": "icon",
    "Pound": "icon-money",
    "Power": "icon-off",
    "Print": "icon-print",
    "PushPin": "icon-pushpin",
    "Recycle": "icon-refresh",
    "Reddit": "icon",
    "Redo": "icon-undo",
    "Registered": "icon",
    "Reload": "icon-repeat",
    "Report": "icon-book",
    "Rewind": "icon-backward",
    "RewindChapter": "icon-fast-backward",
    "RightArrow": "icon-arrow-right",
    "RightFillTriangle": "icon-caret-right",
    "RightTriangle": "icon-caret-right",
    "RSS": "icon-rss",
    "Sadface": "icon",
    "Save": "icon-save",
    "Screen": "icon-dashboard",
    "Search": "icon-search",
    "ShapeAlignBottom": "icon",
    "ShapeAlignCenter": "icon",
    "ShapeAlignLeft": "icon",
    "ShapeAlignMiddle": "icon",
    "ShapeAlignRight": "icon",
    "ShapeAlignTop": "icon",
    "ShapeFlipHorizontal": "icon",
    "ShapeFlipVertical": "icon",
    "ShapeGroup": "icon",
    "ShapeHandles": "icon",
    "ShapeMoveBack": "icon",
    "ShapeMoveBackwards": "icon",
    "ShapeMoveForwards": "icon",
    "ShapeMoveFront": "icon",
    "ShapeRotateACW": "icon",
    "ShapeRotateCW": "icon",
    "Shapes": "icon",
    "ShapeUngroup": "icon",
    "Share": "icon-share",
    "Shuffle": "icon-random",
    "SimpleArrow": "icon-arrow-right",
    "Skype": "icon",
    "SmallClock": "icon-time",
    "SoundNone": "icon-volume-off",
    "Spades": "icon-heart",
    "SpellCheck": "icon-ok",
    "Spinning": "icon-asterisk",
    "SquaredMinus": "icon-minus",
    "SquaredPlus": "icon-plus",
    "Star": "icon-star",
    "Stop": "icon-stop",
    "StrikeThrough": "icon-strikethrough",
    "StumbleUpon": "icon",
    "Style": "icon-font",
    "Table": "icon-table",
    "Tag": "icon-tags",
    "Tape": "icon-music",
    "Telephone": "icon-phone",
    "TextAlignCenter": "icon-align-center",
    "TextAlignLeft": "icon-align-left",
    "TextAlignRight": "icon-align-right",
    "TextColumns": "icon-columns",
    "TextDropcaps": "icon-font",
    "TextHeading1": "icon",
    "TextHeading2": "icon",
    "TextHeading3": "icon",
    "TextHeading4": "icon",
    "TextHeading5": "icon",
    "TextHeading6": "icon",
    "TextKerning": "icon-text-height",
    "TextLetterOmega": "icon",
    "TextLetterspacing": "icon-text-width",
    "TextLinespacing": "icon-text-height",
    "TextOvercase": "icon-font",
    "TextPaddingBottom": "icon",
    "TextPaddingLeft": "icon",
    "TextPaddingRight": "icon",
    "TextPaddingTop": "icon",
    "ThreeG": "icon",
    "Thumbnails": "icon-th-large",
    "ThumbsDown": "icon-hand-down",
    "ThumbsUp": "icon-hand-right",
    "Trademark": "icon",
    "Trash": "icon-trash",
    "Trash2": "icon-trash",
    "Truck": "icon-truck",
    "Twitter": "icon-twitter",
    "Underline": "icon-underline",
    "Undo": "icon-undo",
    "UpArrow": "icon-arrow-up",
    "Update": "icon-arrow-down",
    "UpDownFillTriangle": "icon-sort",
    "UpFillTriangle": "icon-sort-up",
    "UpLeftArrow": "icon-arrow-up",
    "UpRightArrow": "icon-arrow-up",
    "UpTriangle": "icon-caret-up",
    "User": "icon-user",
    "Users": "icon-group",
    "Videocamera": "icon-facetime-video",
    "VLines": "icon-reorder",
    "Volume": "icon-volume-up",
    "Wireless": "icon-signal",
    "World": "icon-globe",
    "Write": "icon-table",
    "X": "icon-remove",
    "YIM": "icon",
    "YouTube": "icon",
    "ZoomIn": "icon-zoom-in",
    "ZoomOut": "icon-zoom-out"
  };

  namespace("fb", function(exports) {
    exports.LabeledObject = LabeledObject;
    return exports.FLAIRBUILDER_ICONS = FLAIRBUILDER_ICONS;
  });

}).call(this);
;(function() {
  var BOOLEAN, BehaviorExecutionCondition, BehaviorExecutionConditionCase, HAS_NO_SELECTED_ROWS, HAS_SELECTED_ROWS, IS_NOT_SELECTED, IS_NOT_VALIDATED, IS_SELECTED, IS_VALIDATED, LIST, NUMBER, NUMBER_LIST, Operator, PROPERTY_VALUE, SELECTED_INDEX, SELECTED_INDICES, SELECTED_NUMBER, SELECTED_ROWS, SELECTED_ROWS_COUNT, SELECTED_VALUE, SELF_VALUE, STRING, TEXT, TEXT_LENGTH, propById;

  Operator = {
    IS: 'is',
    CONTAINS: 'contains',
    CONTAINS_NOT: 'containsnot',
    STARTS_WITH: 'startswith',
    ENDS_WITH: 'endswith',
    IS_NOT: 'isnot',
    IS_LESS_THAN: 'islessthan',
    IS_GREATER_THAN: 'isgreaterthan',
    IS_TRUE: 'istrue',
    IS_FALSE: 'isfalse',
    INCLUDE: 'include',
    INCLUDE_NOT: 'dontinclude'
  };

  STRING = {
    id: "string",
    operators: [Operator.IS, Operator.IS_NOT, Operator.CONTAINS, Operator.CONTAINS_NOT, Operator.STARTS_WITH, Operator.ENDS_WITH]
  };

  NUMBER = {
    id: "number",
    operators: [Operator.IS, Operator.IS_NOT, Operator.IS_LESS_THAN, Operator.IS_GREATER_THAN]
  };

  BOOLEAN = {
    id: "boolean",
    operators: [Operator.IS_TRUE, Operator.IS_FALSE]
  };

  LIST = {
    id: "list",
    operators: [Operator.INCLUDE, Operator.INCLUDE_NOT]
  };

  NUMBER_LIST = {
    id: "number list",
    operators: []
  };

  SELF_VALUE = {
    id: "self value",
    operators: []
  };

  PROPERTY_VALUE = {
    id: "propval",
    name: "value",
    type: STRING
  };

  SELECTED_VALUE = {
    id: "selopt",
    name: "selected option",
    type: STRING
  };

  SELECTED_NUMBER = {
    id: "selval",
    name: "selected value",
    type: NUMBER
  };

  SELECTED_INDEX = {
    id: "selindx",
    name: "selected index",
    type: NUMBER
  };

  IS_SELECTED = {
    id: "issel",
    name: "is selected",
    type: SELF_VALUE
  };

  IS_NOT_SELECTED = {
    id: "isnotsel",
    name: "is not selected",
    type: SELF_VALUE
  };

  TEXT = {
    id: "enttext",
    name: "entered text",
    type: STRING
  };

  TEXT_LENGTH = {
    id: "textlength",
    name: "text length",
    type: NUMBER
  };

  IS_VALIDATED = {
    id: "isvalid",
    name: "is validated",
    type: SELF_VALUE
  };

  IS_NOT_VALIDATED = {
    id: "isnotvalid",
    name: "is not validated",
    type: SELF_VALUE
  };

  HAS_SELECTED_ROWS = {
    id: "hasrowssel",
    name: "has rows selected",
    type: SELF_VALUE
  };

  HAS_NO_SELECTED_ROWS = {
    id: "hasnorowssel",
    name: "has no rows selected",
    type: SELF_VALUE
  };

  SELECTED_ROWS_COUNT = {
    id: "selrowscount",
    name: "selected rows count",
    type: NUMBER
  };

  SELECTED_ROWS = {
    id: "selrows",
    name: "selected rows",
    type: LIST
  };

  SELECTED_INDICES = {
    id: "selinds",
    name: "selected indices",
    type: NUMBER_LIST
  };

  propById = function(propid) {
    switch (propid) {
      case PROPERTY_VALUE.id:
        return PROPERTY_VALUE;
      case SELECTED_VALUE.id:
        return SELECTED_VALUE;
      case SELECTED_NUMBER.id:
        return SELECTED_NUMBER;
      case SELECTED_INDEX.id:
        return SELECTED_INDEX;
      case IS_SELECTED.id:
        return IS_SELECTED;
      case IS_NOT_SELECTED.id:
        return IS_NOT_SELECTED;
      case TEXT.id:
        return TEXT;
      case TEXT_LENGTH.id:
        return TEXT_LENGTH;
      case IS_VALIDATED.id:
        return IS_VALIDATED;
      case IS_NOT_VALIDATED.id:
        return IS_NOT_VALIDATED;
      case HAS_SELECTED_ROWS.id:
        return HAS_SELECTED_ROWS;
      case HAS_NO_SELECTED_ROWS.id:
        return HAS_NO_SELECTED_ROWS;
      case SELECTED_ROWS_COUNT.id:
        return SELECTED_ROWS_COUNT;
      case SELECTED_ROWS.id:
        return SELECTED_ROWS;
      case SELECTED_INDICES.id:
        return SELECTED_INDICES;
      default:
        return null;
    }
  };

  BehaviorExecutionCondition = (function() {
    BehaviorExecutionCondition.ALL = "ALL";

    BehaviorExecutionCondition.ANY = "ANY";

    function BehaviorExecutionCondition(host, definition) {
      var c, caze, _i, _len, _ref;
      this.host = host;
      this.policy = definition.policy;
      this.cases = [];
      if (definition.cases != null) {
        _ref = definition.cases;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          caze = new BehaviorExecutionConditionCase(this.host, c);
          this.cases.push(caze);
        }
      }
    }

    BehaviorExecutionCondition.prototype.evaluate = function() {
      var caze, result, _i, _len, _ref;
      result = false;
      if (!this.host || !this.host.page) {
        return result;
      }
      if (!this.cases || this.cases.length === 0) {
        result = true;
      }
      _ref = this.cases;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        caze = _ref[_i];
        if (!caze.target) {
          caze.target = this.host.page.getComponent(caze.targetID);
        }
        caze.host = this.host;
        result = caze.evaluate();
        if (!result && this.policy === BehaviorExecutionCondition.ALL) {
          return false;
        }
        if (result && this.policy === BehaviorExecutionCondition.ANY) {
          return true;
        }
      }
      return result;
    };

    return BehaviorExecutionCondition;

  })();

  BehaviorExecutionConditionCase = (function() {
    function BehaviorExecutionConditionCase(host, definition) {
      var prop;
      this.host = host;
      this.target = null;
      this.targetID = definition.targetID;
      this.variable = definition.variable;
      this.variableName = definition.variableName;
      prop = definition.property;
      this.property = propById(prop);
      this.operator = definition.operator;
      this.value = definition.value;
    }

    BehaviorExecutionConditionCase.prototype.evaluate = function() {
      var isVar, project, propertyValue, result, theString;
      if (!this.property || !this.host) {
        return false;
      }
      isVar = this.variable === "true";
      if (!isVar && !this.target) {
        if (this.host && this.host.page && this.targetID) {
          this.target = this.host.page.getComponent(this.targetID);
        }
        if (!this.target) {
          return false;
        }
      }
      propertyValue = null;
      if (isVar && this.variableName) {
        project = this.host.page.project;
        propertyValue = project.getVariable(this.variableName);
      } else {
        propertyValue = this.target.getPropertyValue(this.property);
      }
      if (this.property.type === STRING) {
        if (typeof propertyValue === fb.LabeledObject) {
          theString = propertyValue.stripHtml();
        } else {
          theString = propertyValue;
        }
        if (!this.value) {
          this.value = '';
        }
        if (!theString) {
          return false;
        } else if (this.operator === Operator.IS) {
          result = theString === this.value;
        } else if (this.operator === Operator.IS_NOT) {
          result = theString !== this.value;
        } else if (this.operator === Operator.CONTAINS) {
          result = theString.indexOf(this.value) > -1;
        } else if (this.operator === Operator.CONTAINS_NOT) {
          result = theString.indexOf(this.value) < 0;
        } else if (this.operator === Operator.STARTS_WITH) {
          result = theString.indexOf(this.value) === 0;
        } else if (this.operator === Operator.ENDS_WITH) {
          result = theString.indexOf(this.value) === (theString.length - this.value.length);
        }
      } else if (this.property.type === BOOLEAN) {
        if (this.operator === Operator.IS_TRUE) {
          result = propertyValue === "true";
        } else if (this.operator === Operator.IS_FALSE) {
          result = propertyValue === "false";
        }
      } else if (this.property.type === SELF_VALUE) {
        result = propertyValue === "true";
      }
      return result;
    };

    return BehaviorExecutionConditionCase;

  })();

  namespace("fb", function(exports) {
    exports.BehaviorExecutionCondition = BehaviorExecutionCondition;
    exports.BehaviorExecutionConditionCase = BehaviorExecutionConditionCase;
    exports.PROPERTY_VALUE = PROPERTY_VALUE;
    exports.SELECTED_VALUE = SELECTED_VALUE;
    exports.SELECTED_NUMBER = SELECTED_NUMBER;
    exports.SELECTED_INDEX = SELECTED_INDEX;
    exports.IS_SELECTED = IS_SELECTED;
    exports.IS_NOT_SELECTED = IS_NOT_SELECTED;
    exports.TEXT_PROPERTY = TEXT;
    exports.TEXT_LENGTH_PROPERTY = TEXT_LENGTH;
    exports.IS_VALIDATED = IS_VALIDATED;
    exports.IS_NOT_VALIDATED = IS_NOT_VALIDATED;
    exports.HAS_SELECTED_ROWS = HAS_SELECTED_ROWS;
    exports.HAS_NO_SELECTED_ROWS = HAS_NO_SELECTED_ROWS;
    exports.SELECTED_ROWS_COUNT = SELECTED_ROWS_COUNT;
    exports.SELECTED_ROWS = SELECTED_ROWS;
    return exports.SELECTED_INDICES = SELECTED_INDICES;
  });

}).call(this);
;(function() {
  var BACKGROUNDALPHA, BACKGROUNDCOLOR, BOLD, BORDER, BORDERCOLOR, BORDERSTYLE, BORDERTHICKNESS, BrowseCardStack, BrowseForFile, CORNERRADIUS, CloseLayer, DelayInsertAction, DispatchCustomEvent, EnableDisableComponents, FONTCOLOR, FONTFAMILY, FONTSIZE, FlairAbstractAction, GoToPageAction, GoToURLAction, IMAGE, ITALIC, IfCondtionPassed, LABELTEXT, LEADING, MoveComponents, STYLE, ShowHideComponents, ShowLayer, TEXTALIGN, TOOLTIPTEXT, UNDERLINE, UpdateStyling, UpdateVariableAction,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  FlairAbstractAction = (function() {
    function FlairAbstractAction(definition, host) {
      this.host = host;
      this.trigger = 'UNKNOWN';
      this.item = definition.item;
    }

    FlairAbstractAction.prototype.execute = function(dataItem) {
      var s1, s2;
      if (dataItem != null) {
        dataItem = dataItem.trim();
      }
      if ((this.item != null) && (dataItem != null) && this.item !== "$ANY$") {
        s1 = encodeURI(dataItem);
        s1 = s1.replace(/%C2%A0/g, "%20");
        s2 = encodeURI(this.item);
        if (s1 !== s2) {
          return false;
        }
      }
      return this.doExecute(dataItem);
    };

    FlairAbstractAction.prototype.doExecute = function(dataItem) {};

    FlairAbstractAction.prototype.done = function(dataItem) {
      var result;
      if (this.next != null) {
        result = this.next.execute(dataItem);
      } else {
        result = false;
      }
      return result;
    };

    FlairAbstractAction.prototype.isTrue = function(v, trueValue, falseValue) {
      if (trueValue == null) {
        trueValue = true;
      }
      if (falseValue == null) {
        falseValue = false;
      }
      if (v === "true") {
        return trueValue;
      } else {
        return falseValue;
      }
    };

    return FlairAbstractAction;

  })();

  GoToPageAction = (function(_super) {
    __extends(GoToPageAction, _super);

    function GoToPageAction(definition, host) {
      this.host = host;
      GoToPageAction.__super__.constructor.call(this, definition, this.host);
      this.pageID = definition.pageID;
      this.gotoOption = definition.gotoOption;
    }

    GoToPageAction.prototype.doExecute = function(dataItem) {
      $(location).attr("hash", this.pageID);
      return this.done(dataItem);
    };

    return GoToPageAction;

  })(FlairAbstractAction);

  ShowLayer = (function(_super) {
    __extends(ShowLayer, _super);

    function ShowLayer(definition, host) {
      var p;
      this.host = host;
      ShowLayer.__super__.constructor.call(this, definition, this.host);
      this.layerID = definition.layer;
      p = definition.position.split(",");
      this.position = {
        x: parseFloat(p[0]),
        y: parseFloat(p[1])
      };
      this.positioning = definition.positioning;
      this.closeOnMouseOut = definition.closeOnMouseOut;
      this.closeOnClickOutside = definition.closeOnClickOutside;
      this.modal = definition.modal;
    }

    ShowLayer.prototype.doExecute = function(dataItem) {
      var closeLayer,
        _this = this;
      this.host.page.showLayer(this.layerID, this);
      if (this.closeOnClickOutside === "true") {
        closeLayer = function() {
          _this.host.e.parents(".FlairBuilderViewer").first().find(".FlairBuilderPageLayer").detach();
          return $(document).off("click", closeLayer);
        };
        $(document).on("click", closeLayer);
      }
      if (this.closeOnMouseOut === "true") {
        closeLayer = function() {
          _this.host.e.parents(".FlairBuilderViewer").first().find(".FlairBuilderPageLayer").detach();
          return $(document).off("click", closeLayer);
        };
        $(document).on("click", closeLayer);
      }
      return this.done(dataItem);
    };

    return ShowLayer;

  })(FlairAbstractAction);

  CloseLayer = (function(_super) {
    __extends(CloseLayer, _super);

    function CloseLayer(definition, host) {
      this.host = host;
      CloseLayer.__super__.constructor.call(this, definition, this.host);
      this.type = definition.type;
    }

    CloseLayer.prototype.doExecute = function(dataItem) {
      if (this.host.e != null) {
        if (this.type === "current") {
          this.host.e.parents(".FlairBuilderPageLayer").detach();
        } else {
          this.host.e.parents(".FlairBuilderViewer").first().find(".FlairBuilderPageLayer").detach();
        }
      }
      return this.done(dataItem);
    };

    return CloseLayer;

  })(FlairAbstractAction);

  BrowseCardStack = (function(_super) {
    __extends(BrowseCardStack, _super);

    BrowseCardStack.GOTOINDEX = "Index";

    BrowseCardStack.INDEXVALUEOPTION_SPECIFY = "ivo-specify";

    BrowseCardStack.INDEXVALUEOPTION_RANDOM = "ivo-random";

    BrowseCardStack.INDEXVALUEOPTION_ITEMVALUE = "ivo-itemlabel";

    BrowseCardStack.INDEXVALUEOPTION_ITEMINDEX = "ivo-itemindex";

    BrowseCardStack.GOTOFIRST = "First";

    BrowseCardStack.GOTOLAST = "Last";

    BrowseCardStack.GOTOPREVIOUS = "Previous";

    BrowseCardStack.GOTONEXT = "Next";

    function BrowseCardStack(definition, host) {
      this.host = host;
      BrowseCardStack.__super__.constructor.call(this, definition, this.host);
      this.targetID = definition.targetID;
      this.goRoundCards = definition.goRoundCards;
      this.browseType = definition.browseType;
      if (this.browseType === BrowseCardStack.GOTOINDEX) {
        this.indexValueOption = definition.indexValueOption;
        if (this.indexValueOption === BrowseCardStack.INDEXVALUEOPTION_SPECIFY) {
          this.gotoIndex = parseInt(definition.gotoIndex);
        }
      }
    }

    BrowseCardStack.prototype.doExecute = function(dataItem) {
      var card, index, length, newIndex;
      card = this.host.page.getComponent(this.targetID);
      if (!card || !card.tabs) {
        return this;
      }
      index = card.selectedIndex;
      if (index == null) {
        return;
      }
      length = card.tabs.length;
      if (this.browseType === BrowseCardStack.GOTONEXT) {
        if (index < length - 1) {
          index++;
        } else if (this.goRoundCards === "true") {
          index = 0;
        }
      } else if (this.browseType === BrowseCardStack.GOTOPREVIOUS) {
        if (index > 0) {
          index--;
        } else if (this.goRoundCards === "true") {
          index = length - 1;
        }
      } else if (this.browseType === BrowseCardStack.GOTOFIRST) {
        index = 0;
      } else if (this.browseType === BrowseCardStack.GOTOLAST) {
        index = length - 1;
      } else if (this.browseType === BrowseCardStack.GOTOINDEX) {
        newIndex = card.selectedIndex;
        if (this.indexValueOption === BrowseCardStack.INDEXVALUEOPTION_SPECIFY) {
          if (this.gotoIndex > 0 && this.gotoIndex <= length) {
            newIndex = this.gotoIndex - 1;
          }
        } else if (this.indexValueOption === BrowseCardStack.INDEXVALUEOPTION_RANDOM) {
          while (newIndex === index) {
            newIndex = Math.floor(Math.random * length);
          }
        }
        index = newIndex;
      }
      card.showTab(index);
      this.done(dataItem);
      return true;
    };

    return BrowseCardStack;

  })(FlairAbstractAction);

  ShowHideComponents = (function(_super) {
    __extends(ShowHideComponents, _super);

    function ShowHideComponents(definition, host) {
      this.host = host;
      ShowHideComponents.__super__.constructor.call(this, definition, this.host);
      this.targets = definition.targets;
      this.type = definition.type;
      this.hideSimilar = this.isTrue(definition.hideSimilar);
      this.pushOrPull = this.isTrue(definition.pushOrPull);
      this.showAsPopUp = this.isTrue(definition.showAsPopUp);
    }

    ShowHideComponents.prototype.doExecute = function(dataItem) {
      var c, ct, cts, id, ids, showSimilar, similars, t, theTargets, _i, _j, _k, _l, _len, _len1, _len10, _len11, _len2, _len3, _len4, _len5, _len6, _len7, _len8, _len9, _m, _n, _o, _p, _q, _r, _s, _t;
      if (!this.targets) {
        return false;
      }
      ids = this.targets.split(",");
      theTargets = [];
      if (this.type === "show") {
        for (_i = 0, _len = ids.length; _i < _len; _i++) {
          id = ids[_i];
          c = this.host.page.getComponent(id);
          if (c) {
            theTargets.push(c);
            if (this.pushOrPull && !c.visible && !this.showAsPopUp) {
              this.pushDown(c);
            }
            c.show(true);
          }
        }
        if (this.hideSimilar && theTargets.length > 0) {
          t = theTargets[0];
          c = t.container;
          cts = c.components;
          similars = [];
          for (_j = 0, _len1 = cts.length; _j < _len1; _j++) {
            ct = cts[_j];
            if (theTargets.indexOf(ct) > -1) {
              continue;
            }
            for (_k = 0, _len2 = theTargets.length; _k < _len2; _k++) {
              t = theTargets[_k];
              if (t.isSimilarTo(ct)) {
                similars.push(ct);
                break;
              }
            }
          }
          if (similars.length > 0) {
            for (_l = 0, _len3 = similars.length; _l < _len3; _l++) {
              ct = similars[_l];
              if (this.pushOrPull && ct.visible) {
                this.pullUp(ct);
              }
              ct.show(false);
            }
          } else if (c.className === "FlairComponentsGroup") {
            this.searchSimilarComponents(c, theTargets);
          }
        }
        if (this.showAsPopUp) {
          this.host.page.project.trigger('show-as-popup', theTargets);
        }
      } else if (this.type === "hide") {
        for (_m = 0, _len4 = ids.length; _m < _len4; _m++) {
          id = ids[_m];
          c = this.host.page.getComponent(id);
          if (c) {
            theTargets.push(c);
            if (this.pushOrPull && c.visible) {
              this.pullUp(c);
            }
            c.show(false);
          }
        }
        showSimilar = this.hideSimilar;
        if (showSimilar && theTargets.length > 0) {
          t = theTargets[0];
          c = t.container;
          cts = c.components;
          similars = [];
          for (_n = 0, _len5 = cts.length; _n < _len5; _n++) {
            ct = cts[_n];
            if (theTargets.indexOf(ct) > -1) {
              continue;
            }
            for (_o = 0, _len6 = theTargets.length; _o < _len6; _o++) {
              t = theTargets[_o];
              if (t.isSimilarTo(ct)) {
                similars.push(ct);
                break;
              }
            }
          }
          if (similars.length > 0) {
            for (_p = 0, _len7 = similars.length; _p < _len7; _p++) {
              ct = similars[_p];
              if (this.pushOrPull && !ct.visible) {
                this.pushDown(ct);
              }
              ct.show(true);
            }
          } else if (c.className === "FlairComponentsGroup") {
            this.searchSimilarComponents(c, theTargets);
          }
        }
      } else if (this.type === "toggle") {
        for (_q = 0, _len8 = ids.length; _q < _len8; _q++) {
          id = ids[_q];
          c = this.host.page.getComponent(id);
          if (c) {
            theTargets.push(c);
            if (this.pushOrPull) {
              if (c.visible) {
                this.pullUp(c);
              }
              if (!c.visible) {
                this.pushDown(c);
              }
            }
            c.show(!c.visible);
          }
        }
        if (this.hideSimilar && theTargets.length > 0) {
          t = theTargets[0];
          c = t.container;
          cts = c.components;
          similars = [];
          for (_r = 0, _len9 = cts.length; _r < _len9; _r++) {
            ct = cts[_r];
            if (theTargets.indexOf(ct) > -1) {
              continue;
            }
            for (_s = 0, _len10 = theTargets.length; _s < _len10; _s++) {
              t = theTargets[_s];
              if (t.isSimilarTo(ct)) {
                similars.push(ct);
                break;
              }
            }
          }
          if (similars.length > 0) {
            for (_t = 0, _len11 = similars.length; _t < _len11; _t++) {
              ct = similars[_t];
              if (this.pushOrPull && !ct.visible) {
                this.pushDown(ct);
              }
              if (this.pushOrPull && ct.visible) {
                this.pullUp(ct);
              }
              ct.show(!ct.visible);
            }
          } else if (c.className === "FlairComponentsGroup") {
            this.searchSimilarComponents(c, theTargets);
          }
        }
      }
      return this;
    };

    ShowHideComponents.prototype.searchSimilarComponents = function(c, targets) {
      var component, cs, p, _i, _len, _results;
      p = c.container;
      cs = p.components;
      _results = [];
      for (_i = 0, _len = cs.length; _i < _len; _i++) {
        component = cs[_i];
        if (component === c) {
          continue;
        }
        if (component.className === "FlairComponentsGroup") {
          _results.push(this.searchSimilarComponentsIn(component, targets));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    ShowHideComponents.prototype.searchSimilarComponentsIn = function(c, targets) {
      var ct, cts, show, similars, t, _i, _j, _k, _len, _len1, _len2, _results;
      cts = c.components;
      similars = [];
      for (_i = 0, _len = cts.length; _i < _len; _i++) {
        ct = cts[_i];
        if (targets.indexOf(ct) > -1) {
          continue;
        }
        for (_j = 0, _len1 = targets.length; _j < _len1; _j++) {
          t = targets[_j];
          if (ct.isSimilarTo(t)) {
            similars.push(ct);
            break;
          }
        }
      }
      _results = [];
      for (_k = 0, _len2 = similars.length; _k < _len2; _k++) {
        ct = similars[_k];
        show = false;
        show = (this.type === "hide") || (this.type === "toggle" && !ct.visible);
        if (this.pushOrPull) {
          if (show && !ct.visible) {
            this.pushDown(ct);
          }
          if (!show && ct.visible) {
            this.pullUp(ct);
          }
        }
        _results.push(ct.show(show));
      }
      return _results;
    };

    ShowHideComponents.prototype.pushDown = function(t) {
      var c, components, container, cs, ny, _i, _j, _len, _len1, _results;
      container = t.container;
      components = [];
      while (container) {
        cs = container.components;
        for (_i = 0, _len = cs.length; _i < _len; _i++) {
          c = cs[_i];
          if (c.y >= t.y && (c.x < t.x + t.width && c.x + c.width > t.x)) {
            components.push(c);
          }
        }
        container = container.container;
      }
      components.sort(function(a, b) {
        return a.y - b.y;
      });
      _results = [];
      for (_j = 0, _len1 = components.length; _j < _len1; _j++) {
        c = components[_j];
        if (c === t) {
          continue;
        }
        ny = c.y + t.height - 1;
        c.y = ny;
        _results.push($(c.e).css("top", ny));
      }
      return _results;
    };

    ShowHideComponents.prototype.pullUp = function(t) {
      var c, components, container, cs, ny, _i, _j, _len, _len1, _results;
      container = t.container;
      components = [];
      while (container) {
        cs = container.components;
        for (_i = 0, _len = cs.length; _i < _len; _i++) {
          c = cs[_i];
          if (c.y >= t.y && c.y >= t.y + t.height - 1 && (c.x < t.x + t.width && c.x + c.width > t.x)) {
            components.push(c);
          }
        }
        container = container.container;
      }
      components.sort(function(a, b) {
        return a.y - b.y;
      });
      _results = [];
      for (_j = 0, _len1 = components.length; _j < _len1; _j++) {
        c = components[_j];
        if (c === t) {
          continue;
        }
        ny = c.y - t.height + 1;
        c.y = ny;
        _results.push($(c.e).css("top", ny));
      }
      return _results;
    };

    return ShowHideComponents;

  })(FlairAbstractAction);

  EnableDisableComponents = (function(_super) {
    __extends(EnableDisableComponents, _super);

    function EnableDisableComponents(definition, host) {
      this.host = host;
      EnableDisableComponents.__super__.constructor.call(this, definition, this.host);
      this.targets = definition.targets;
      this.type = definition.type;
    }

    EnableDisableComponents.prototype.doExecute = function(dataItem) {
      var c, id, ids, _i, _j, _k, _len, _len1, _len2;
      if (!this.targets) {
        return false;
      }
      ids = this.targets.split(",");
      if (this.type === "enable") {
        for (_i = 0, _len = ids.length; _i < _len; _i++) {
          id = ids[_i];
          c = this.host.page.getComponent(id);
          if (c) {
            c.enable(true);
          }
        }
      } else if (this.type === "disable") {
        for (_j = 0, _len1 = ids.length; _j < _len1; _j++) {
          id = ids[_j];
          c = this.host.page.getComponent(id);
          if (c) {
            c.enable(false);
          }
        }
      } else if (this.type === "toggle") {
        for (_k = 0, _len2 = ids.length; _k < _len2; _k++) {
          id = ids[_k];
          c = this.host.page.getComponent(id);
          if (c) {
            c.enable(!c.enabled);
          }
        }
      }
      return this;
    };

    return EnableDisableComponents;

  })(FlairAbstractAction);

  MoveComponents = (function(_super) {
    __extends(MoveComponents, _super);

    function MoveComponents(definition, host) {
      this.host = host;
      MoveComponents.__super__.constructor.call(this, definition, this.host);
      this.animate = this.isTrue(definition.animate);
      this.move = this.isTrue(definition.move);
      this.resize = this.isTrue(definition.move);
      this.moveType = definition.moveType;
      this.resizeType = definition.resizeType;
      this.duration = parseFloat(definition.duration);
      if (!this.animate) {
        this.duration = 0;
      }
      this.coordinates = definition.coordinates;
    }

    MoveComponents.prototype.doExecute = function(dataItem) {
      var c, coord, coords, h, id, objects, r, scoord, w, x, y, _i, _len;
      if (!this.coordinates) {
        return false;
      }
      coords = this.coordinates.split(";");
      objects = [];
      for (_i = 0, _len = coords.length; _i < _len; _i++) {
        scoord = coords[_i];
        coord = scoord.split(",");
        id = coord[0];
        x = coord[1] * 1;
        y = coord[2] * 1;
        w = coord[3] * 1;
        h = coord[4] * 1;
        c = this.host.page.getComponent(id);
        if (c) {
          r = {};
          if (this.move) {
            if (this.moveType === "absolutely") {
              r.top = y;
              r.left = x;
            } else if (this.moveType === "closely") {
              r.top = this.host.y + y;
              r.left = this.host.x + x;
            } else {
              r.top = c.y + y;
              r.left = c.x + x;
            }
            c.x = r.left;
            c.y = r.top;
          }
          if (this.resize) {
            if (this.resizeType === "absolutely") {
              r.width = w;
              r.height = h;
            } else if (this.resizeType === "closely") {
              r.width = this.host.width + width;
              r.height = this.host.height + height;
            } else {
              r.width = c.width + width;
              r.height = c.height + height;
            }
            c.width = r.width;
            c.height = r.height;
          }
          $(c.e).animate(r, this.duration * 1000);
        }
      }
      return this;
    };

    return MoveComponents;

  })(FlairAbstractAction);

  UpdateStyling = (function(_super) {
    __extends(UpdateStyling, _super);

    function UpdateStyling(definition, host) {
      var p, v, _i, _len, _ref;
      this.host = host;
      UpdateStyling.__super__.constructor.call(this, definition, this.host);
      this.targets = definition.targets;
      this.properties = definition.properties;
      this.props = this.properties.split(",");
      this.values = {};
      _ref = this.props;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        v = definition[p];
        switch (p) {
          case BOLD:
            this.values.bold = this.isTrue(v, "bold", "normal");
            break;
          case ITALIC:
            this.values.italic = this.isTrue(v, "italic", "normal");
            break;
          case UNDERLINE:
            this.values.underline = this.isTrue(v, "underline", "none");
            break;
          case LABELTEXT:
            this.values.labelText = v;
            break;
          case TEXTALIGN:
            this.values.textAlign = v;
            break;
          case LEADING:
            this.values.leading = parseInt(v);
            break;
          case FONTSIZE:
            this.values.fontSize = parseInt(v);
            break;
          case FONTCOLOR:
            this.values.fontColor = this.values.color = intToColorHex(parseInt(v));
            break;
          case FONTFAMILY:
            this.values.fontFamily = v;
            break;
          case STYLE:
            this.values.style = v;
            break;
          case BORDER:
            this.values.border = true;
            break;
          case BACKGROUNDCOLOR:
            this.values.backgroundColor = intToColorHex(parseInt(v));
            break;
          case BACKGROUNDALPHA:
            this.values.backgroundAlpha = v;
            break;
          case BORDERCOLOR:
            this.values.borderColor = intToColorHex(parseInt(v));
            break;
          case BORDERTHICKNESS:
            this.values.borderThickness = v;
            break;
          case BORDERSTYLE:
            this.values.borderStyle = v;
            break;
          case CORNERRADIUS:
            this.values.cornerRadius = parseInt(v);
        }
      }
      this.revertOnMouseExit = this.isTrue(definition.revertOnMouseExit);
      this.revertSimilar = this.isTrue(definition.revertSimilar);
      this;
    }

    UpdateStyling.prototype.doExecute = function(dataItem) {
      var c, ct, cts, id, ids, p, similars, t, theTargets, v, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref, _ref1,
        _this = this;
      ids = this.targets.split(",");
      theTargets = [];
      this.stateId = generateFbID("fbsid", 5);
      this.hoverState = {};
      for (_i = 0, _len = ids.length; _i < _len; _i++) {
        id = ids[_i];
        c = this.host.page.getComponent(id);
        if (c) {
          theTargets.push(c);
          if (this.revertOnMouseExit) {
            this.hoverState[id] = {};
            _ref = this.props;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              p = _ref[_j];
              v = c[p];
              if (p === FONTCOLOR) {
                v = c.fontColor;
                this.hoverState[id]["fontColor"] = v;
              }
              this.hoverState[id][p] = v;
            }
          }
          if (!c.currentState) {
            c.captureCurrentState();
          }
          c.currentState.fbsid = this.stateId;
          _ref1 = this.props;
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            p = _ref1[_k];
            v = this.values[p];
            c[p] = v;
            c.doRenderProperty(p, v);
          }
        }
      }
      if (this.revertSimilar && theTargets.length > 0) {
        t = theTargets[0];
        c = t.container;
        cts = c.components;
        similars = [];
        for (_l = 0, _len3 = cts.length; _l < _len3; _l++) {
          ct = cts[_l];
          if (theTargets.indexOf(ct) > -1) {
            continue;
          }
          for (_m = 0, _len4 = theTargets.length; _m < _len4; _m++) {
            t = theTargets[_m];
            if (t.isSimilarTo(ct)) {
              similars.push(ct);
              break;
            }
          }
        }
        if (similars.length > 0) {
          for (_n = 0, _len5 = similars.length; _n < _len5; _n++) {
            ct = similars[_n];
            this.resetProperties(ct);
          }
        } else if (c.className === "FlairComponentsGroup") {
          this.searchSimilarComponents(c, theTargets);
        }
      }
      if (this.revertOnMouseExit) {
        $(document).on("mousemove.UpdateStyling" + this.stateId, function(event) {
          var o;
          o = _this.host.e.offset();
          if ((event.pageX > o.left && event.pageX < (o.left + _this.host.width)) && (event.pageY > o.top && event.pageY < (o.top + _this.host.height))) {
            return false;
          } else {
            $(document).off("mousemove.UpdateStyling" + _this.stateId);
            return _this.revert(true);
          }
        });
      }
      return this;
    };

    UpdateStyling.prototype.searchSimilarComponents = function(c, targets) {
      var component, cs, p, _i, _len, _results;
      p = c.container;
      cs = p.components;
      _results = [];
      for (_i = 0, _len = cs.length; _i < _len; _i++) {
        component = cs[_i];
        if (component === c) {
          continue;
        }
        if (component.className === "FlairComponentsGroup") {
          _results.push(this.searchSimilarComponentsIn(component, targets));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    UpdateStyling.prototype.searchSimilarComponentsIn = function(c, targets) {
      var ct, cts, similars, t, _i, _j, _k, _len, _len1, _len2, _results;
      cts = c.components;
      similars = [];
      for (_i = 0, _len = cts.length; _i < _len; _i++) {
        ct = cts[_i];
        if (targets.indexOf(ct) > -1) {
          continue;
        }
        for (_j = 0, _len1 = targets.length; _j < _len1; _j++) {
          t = targets[_j];
          if (ct.isSimilarTo(t)) {
            similars.push(ct);
            break;
          }
        }
      }
      _results = [];
      for (_k = 0, _len2 = similars.length; _k < _len2; _k++) {
        ct = similars[_k];
        _results.push(this.resetProperties(ct));
      }
      return _results;
    };

    UpdateStyling.prototype.revert = function(hover) {
      var c, id, ids, state, _i, _len;
      ids = this.targets.split(",");
      for (_i = 0, _len = ids.length; _i < _len; _i++) {
        id = ids[_i];
        c = this.host.page.getComponent(id);
        if (!c) {
          continue;
        }
        state = c.currentState;
        if (hover && (!state || this.stateId !== state.fbsid)) {
          continue;
        }
        this.resetProperties(c, hover);
      }
      return this;
    };

    UpdateStyling.prototype.resetProperties = function(c, hover) {
      var p, v, values, _i, _len, _ref, _results;
      if (c && c.currentState) {
        if (hover) {
          values = this.hoverState[c.id];
        } else {
          values = c.currentState;
        }
        _ref = this.props;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          v = values[p];
          c[p] = v;
          _results.push(c.doRenderProperty(p, v));
        }
        return _results;
      }
    };

    return UpdateStyling;

  })(FlairAbstractAction);

  DelayInsertAction = (function(_super) {
    __extends(DelayInsertAction, _super);

    function DelayInsertAction(definition, host) {
      this.host = host;
      DelayInsertAction.__super__.constructor.call(this, definition, this.host);
    }

    DelayInsertAction.prototype.doExecute = function(dataItem) {};

    return DelayInsertAction;

  })(FlairAbstractAction);

  IfCondtionPassed = (function(_super) {
    __extends(IfCondtionPassed, _super);

    function IfCondtionPassed(definition, host) {
      this.host = host;
      IfCondtionPassed.__super__.constructor.call(this, definition, this.host);
      this.condition = new fb.BehaviorExecutionCondition(this.host, definition.condition);
    }

    IfCondtionPassed.prototype.doExecute = function(dataItem) {
      var result;
      return result = this.condition.evaluate();
    };

    return IfCondtionPassed;

  })(FlairAbstractAction);

  BrowseForFile = (function(_super) {
    __extends(BrowseForFile, _super);

    function BrowseForFile(definition, host) {
      this.host = host;
      BrowseForFile.__super__.constructor.call(this, definition, this.host);
    }

    BrowseForFile.prototype.doExecute = function(dataItem) {};

    return BrowseForFile;

  })(FlairAbstractAction);

  GoToURLAction = (function(_super) {
    __extends(GoToURLAction, _super);

    function GoToURLAction(definition, host) {
      this.host = host;
      GoToURLAction.__super__.constructor.call(this, definition, this.host);
      this.url = definition.url;
    }

    GoToURLAction.prototype.doExecute = function(dataItem) {
      return window.location = this.url;
    };

    return GoToURLAction;

  })(FlairAbstractAction);

  UpdateVariableAction = (function(_super) {
    __extends(UpdateVariableAction, _super);

    function UpdateVariableAction(definition, host) {
      this.host = host;
      UpdateVariableAction.__super__.constructor.call(this, definition, this.host);
      this.variableName = definition.variableName;
      this.updateType = definition.updateType;
      this.variableValue = definition.variableValue;
      this.stepValue = definition.stepValue;
    }

    UpdateVariableAction.prototype.doExecute = function(dataItem) {
      this.host.page.project.putVariable(this.variableName, this.variableValue);
      return this.host.page.project.trigger("variable-change");
    };

    return UpdateVariableAction;

  })(FlairAbstractAction);

  DispatchCustomEvent = (function(_super) {
    __extends(DispatchCustomEvent, _super);

    function DispatchCustomEvent(definition, host) {
      this.host = host;
      DispatchCustomEvent.__super__.constructor.call(this, definition, this.host);
      this.eventType = definition.eventType;
      this.dispatchToPages = definition.dispatchToPages;
    }

    DispatchCustomEvent.prototype.doExecute = function(dataItem) {
      if (this.dispatchToPages === "true") {
        return this.host.page.project.dispatchEvent("flair:customEvent", this.eventType);
      } else {
        return this.host.container.dispatchEvent("flair:customEvent", this.eventType);
      }
    };

    return DispatchCustomEvent;

  })(FlairAbstractAction);

  BOLD = "bold";

  ITALIC = "italic";

  UNDERLINE = "underline";

  LABELTEXT = "label";

  IMAGE = "image";

  TOOLTIPTEXT = "tooltipText";

  TEXTALIGN = "textAlign";

  LEADING = "leading";

  FONTSIZE = "fontSize";

  FONTCOLOR = "color";

  FONTFAMILY = "fontFamily";

  STYLE = "style";

  BORDER = "BORDER";

  BACKGROUNDCOLOR = "backgroundColor";

  BACKGROUNDALPHA = "backgroundAlpha";

  BORDERCOLOR = "borderColor";

  BORDERTHICKNESS = "borderThickness";

  BORDERSTYLE = "borderStyle";

  CORNERRADIUS = "cornerRadius";

  namespace("fb", function(exports) {
    exports.GoToPageAction = GoToPageAction;
    exports.ShowLayer = ShowLayer;
    exports.CloseLayer = CloseLayer;
    exports.BrowseCardStack = BrowseCardStack;
    exports.ShowHideComponents = ShowHideComponents;
    exports.EnableDisableComponents = EnableDisableComponents;
    exports.MoveComponents = MoveComponents;
    exports.UpdateStyling = UpdateStyling;
    exports.DelayInsertAction = DelayInsertAction;
    exports.IfCondtionPassed = IfCondtionPassed;
    exports.BrowseForFile = BrowseForFile;
    exports.GoToURLAction = GoToURLAction;
    exports.UpdateVariableAction = UpdateVariableAction;
    return exports.DispatchCustomEvent = DispatchCustomEvent;
  });

}).call(this);
