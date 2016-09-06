
const BLACKLIST = ['template', 'script', 'style'];

let isHidable = ({ nodeType, tagName }) =>
  nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;

let siblings = (container, mount,styles, cb) => {
  mount = [].concat(mount);

  [].forEach.call(container.children, node => {
    if (mount.indexOf(node) === -1 && isHidable(node)){
      cb(node, styles);
    }
  });
};

export function ariaHidden(show, node, classStyles){
  if (!node) {
    return;
  }

  if (show) {
    node.setAttribute('aria-hidden', 'true');
    node.setAttribute('class', classStyles);
  }
  else {
    node.removeAttribute('aria-hidden');
    node.removeAttribute('class');
  }
}

export function hideSiblings(container, mountNode){
  siblings(container, mountNode, node => ariaHidden(true, node));
}

export function showSiblings(container, mountNode){
  siblings(container, mountNode, node => ariaHidden(false, node));
}
