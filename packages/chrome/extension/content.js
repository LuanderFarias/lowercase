let enabled = false;

function lowercaseTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    node.textContent = node.textContent.toLowerCase();
  }
}

function forceNoUppercaseStyles(root) {
  if (root.nodeType !== 1) return;

  root.querySelectorAll("*").forEach(el => {
    el.style.textTransform = "none";
  });
}

function applyForce() {
  lowercaseTextNodes(document.body);
  forceNoUppercaseStyles(document.body);
}

// add !important style globally
function injectImportantStyle() {
  const style = document.createElement("style");
  style.textContent = `* { text-transform: none !important; }`;
  document.head.appendChild(style);
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "toggle") {
    enabled = msg.enabled;
    if (enabled) {
      injectImportantStyle();
      applyForce();
    }
  }
});

const observer = new MutationObserver(() => {
  if (enabled) applyForce();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});