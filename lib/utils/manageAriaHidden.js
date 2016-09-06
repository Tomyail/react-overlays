'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ariaHidden = ariaHidden;
exports.hideSiblings = hideSiblings;
exports.showSiblings = showSiblings;

var BLACKLIST = ['template', 'script', 'style'];

var isHidable = function isHidable(_ref) {
  var nodeType = _ref.nodeType;
  var tagName = _ref.tagName;
  return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
};

var siblings = function siblings(container, mount, styles, cb) {
  mount = [].concat(mount);

  [].forEach.call(container.children, function (node) {
    if (mount.indexOf(node) === -1 && isHidable(node)) {
      cb(node, styles);
    }
  });
};

function ariaHidden(show, node, classStyles) {
  if (!node) {
    return;
  }

  if (show) {
    node.setAttribute('aria-hidden', 'true');

    var nodeClass = node.getAttribute('class');
    if (nodeClass) {
      nodeClass += ' ' + classStyles;
    } else {
      nodeClass = classStyles;
    }
    node.setAttribute('class', nodeClass);
  } else {
    node.removeAttribute('aria-hidden');
    node.removeAttribute('class');
  }
}

function hideSiblings(container, mountNode) {
  siblings(container, mountNode, styles, function (node, style) {
    return ariaHidden(true, node, styles);
  });
}

function showSiblings(container, mountNode) {
  siblings(container, mountNode, styles, function (node, style) {
    return ariaHidden(false, node, styles);
  });
}