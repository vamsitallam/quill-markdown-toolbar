"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _quill = _interopRequireDefault(require("quill"));

var _hr = _interopRequireDefault(require("./formats/hr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

_quill["default"].register('formats/horizontal', _hr["default"]);

var Module = _quill["default"]["import"]('core/module');

var MarkdownToolbar = /*#__PURE__*/function (_Module) {
  _inherits(MarkdownToolbar, _Module);

  var _super = _createSuper(MarkdownToolbar);

  function MarkdownToolbar(quill, options) {
    var _this;

    _classCallCheck(this, MarkdownToolbar);

    _this = _super.call(this, quill, options);
    _this.quill = quill;
    var toolbar = quill.getModule('toolbar');
    toolbar.addHandler('markdown', _this.markdownHandler.bind(_assertThisInitialized(_this)));
    _this.matches = [{
      name: 'header',
      pattern: /^(#){1,6}\s/g,
      action: function action(text, pattern, lineStartIndex) {
        var match = pattern.exec(text);
        if (!match) return;
        var size = match[0].length;

        _this.quill.formatLine(lineStartIndex, text.length, 'header', size - 1);

        _this.quill.deleteText(lineStartIndex, size);
      }
    }, {
      name: 'blockquote',
      pattern: /^(>)\s/g,
      action: function action(text, pattern, lineStartIndex) {
        _this.quill.formatLine(lineStartIndex, 1, 'blockquote', true);

        _this.quill.deleteText(lineStartIndex, 2);
      }
    }, {
      name: 'code-block',
      multiline: true,
      pattern: /^`{3}/g,
      action: function action(startIndex, endIndex) {
        _this.quill.formatText(startIndex + 4, endIndex - (startIndex + 4), 'code-block', true);

        _this.quill.deleteText(startIndex, 4);

        _this.quill.deleteText(endIndex - 4, 4);
      }
    }, {
      name: 'bolditalic',
      pattern: /(?:\*|_){3}(.+?)(?:\*|_){3}/g,
      action: function action(text, pattern, lineStartIndex) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStartIndex + match.index;
        if (text.match(/^([*_ \n]+)$/g)) return;

        _this.quill.deleteText(startIndex, annotatedText.length);

        _this.quill.insertText(startIndex, matchedText, {
          bold: true,
          italic: true
        });
      }
    }, {
      name: 'bold',
      pattern: /(?:\*|_){2}(.+?)(?:\*|_){2}/g,
      action: function action(text, pattern, lineStartIndex) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStartIndex + match.index;
        if (text.match(/^([*_ \n]+)$/g)) return;

        _this.quill.deleteText(startIndex, annotatedText.length);

        _this.quill.insertText(startIndex, matchedText, {
          bold: true
        });
      }
    }, {
      name: 'italic',
      pattern: /(?:\*|_){1}(.+?)(?:\*|_){1}/g,
      action: function action(text, pattern, lineStartIndex) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStartIndex + match.index;
        if (text.match(/^([*_ \n]+)$/g)) return;

        _this.quill.deleteText(startIndex, annotatedText.length);

        _this.quill.insertText(startIndex, matchedText, {
          italic: true
        });
      }
    }, {
      name: 'strikethrough',
      pattern: /(?:~~)(.+?)(?:~~)/g,
      action: function action(text, pattern, lineStartIndex) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStartIndex + match.index;
        if (text.match(/^([*_ \n]+)$/g)) return;

        _this.quill.deleteText(startIndex, annotatedText.length);

        _this.quill.insertText(startIndex, matchedText, {
          strike: true
        });
      }
    }, {
      name: 'code',
      pattern: /`([^`\n\r]+)`/g,
      action: function action(text, pattern, lineStart) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;
        if (text.match(/^([*_ \n]+)$/g)) return;

        _this.quill.deleteText(startIndex, annotatedText.length);

        _this.quill.insertText(startIndex, matchedText, {
          code: true
        });
      }
    }, {
      name: 'hr',
      pattern: /^([-*]\s?){3}/g,
      action: function action(text, pattern, lineStart) {
        _this.quill.deleteText(lineStart, text.length);

        _this.quill.insertEmbed(lineStart + 1, 'hr', true, _quill["default"].sources.USER);

        _this.quill.insertText(lineStart + 2, "\n", _quill["default"].sources.SILENT);
      }
    }, {
      name: 'asterisk-ul',
      pattern: /^\s*[\*|\+|-]\s/g,
      action: function action(text, pattern, lineStart) {
        _this.quill.formatLine(lineStart, 1, 'list', 'unordered');

        _this.quill.deleteText(lineStart, 2);
      }
    }, {
      name: 'image',
      pattern: /(?:!\[(.+?)\])(?:\((.+?)\))/g,
      action: function action(text, pattern, lineStart) {
        var startIndex = text.search(pattern);
        var matchedText = text.match(pattern)[0];
        var hrefLink = text.match(/(?:\((.*?)\))/g)[0];

        if (startIndex !== -1) {
          _this.quill.deleteText(lineStart, matchedText.length);

          _this.quill.insertEmbed(lineStart, 'image', hrefLink.slice(1, hrefLink.length - 1));
        }
      }
    }, {
      name: 'link',
      pattern: /(?:\[(.+?)\])(?:\((.+?)\))/g,
      action: function action(text, pattern, lineStart) {
        var startIndex = text.search(pattern);
        var matchedText = text.match(pattern)[0];
        var hrefText = text.match(/(?:\[(.*?)\])/g)[0];
        var hrefLink = text.match(/(?:\((.*?)\))/g)[0];

        if (startIndex !== -1) {
          _this.quill.deleteText(lineStart, matchedText.length);

          _this.quill.insertText(lineStart, hrefText.slice(1, hrefText.length - 1), 'link', hrefLink.slice(1, hrefLink.length - 1));
        }
      }
    }];
    var markdown = document.querySelector('.ql-markdown');
    markdown.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="27" height="128" viewBox="0 0 208 128"><rect width="198" height="118" x="5" y="5" ry="10" stroke="#000" stroke-width="10" fill="none"/><path d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z"/></svg>';
    return _this;
  }

  _createClass(MarkdownToolbar, [{
    key: "markdownHandler",
    value: function markdownHandler() {
      var _this2 = this;

      var selection = this.quill.getSelection();
      if (selection.length === 0) return;
      var lines = this.quill.getLines(selection.index, selection.length);
      lines.forEach(function (line, index) {
        var lineText = line.domNode.textContent;

        var lineIndex = _this2.quill.getIndex(line);

        var oldLineText = null;

        while (oldLineText !== lineText) {
          oldLineText = lineText;

          var _iterator = _createForOfIteratorHelper(_this2.matches),
              _step;

          try {
            var _loop = function _loop() {
              var match = _step.value;
              var matchedText = lineText.match(match.pattern);

              if (matchedText) {
                // NOTE: `code-block` is a special case (multi-line)
                if (match.name === 'code-block') {
                  if (index + 1 === lines.length - 1) {
                    return "continue";
                  }

                  var restOfLines = lines.slice(index + 1, lines.length);
                  var lastIndex = restOfLines.findIndex(function (l) {
                    return l.domNode.textContent.match(match.pattern);
                  });

                  if (lastIndex === -1) {
                    return "continue";
                  }

                  match.action(_this2.quill.getIndex(line), _this2.quill.getIndex(restOfLines[lastIndex]));
                  lines.splice(index, lastIndex + 1);
                  return "break";
                } else {
                  match.action(lineText, match.pattern, lineIndex);

                  var updatedLine = _this2.quill.getLine(lineIndex)[0];

                  lineText = updatedLine.domNode.textContent;
                  return "break";
                }
              }
            };

            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _ret = _loop();

              if (_ret === "continue") continue;
              if (_ret === "break") break;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      });
    }
  }]);

  return MarkdownToolbar;
}(Module);

exports["default"] = MarkdownToolbar;