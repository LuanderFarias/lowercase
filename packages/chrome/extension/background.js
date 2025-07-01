const states = new Map();

chrome.action.onClicked.addListener(async (tab) => {
  const tabId = tab.id;
  const enabled = !states.get(tabId);
  states.set(tabId, enabled);

  chrome.tabs.sendMessage(tabId, {
    action: "toggle",
    enabled
  });

  chrome.action.setIcon({
    tabId,
    path: enabled ? "icon-on.png" : "icon.png"
  });
});