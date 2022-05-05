const tabsWithScript = new Set();
const openWindows = new Set();
let focusedWindow;

const updateIcon = (isScriptActive, tabId) => {
  chrome.action.setIcon({
    tabId: tabId,
    path: {
      16: `hr_icon_${isScriptActive ? "active" : "inactive"}.png`,
    },
  });
  if (isScriptActive) tabsWithScript.add(tabId);
};

const msgReceived = (obj, sender, sendRes) => {
  updateIcon(obj.scriptActive, sender.tab.id);
};

const buttonClicked = (tab) => console.log(`Button clicked in tab: ${tab}`);

chrome.action.onClicked.addListener(buttonClicked);
chrome.runtime.onMessage.addListener(msgReceived);

chrome.tabs.onActivated.addListener(function (tab) {
  const scriptActive = tabsWithScript.has(tab.tabId);
  updateIcon(scriptActive, tab.tabId);
});

chrome.tabs.onRemoved.addListener(function (tab) {
  if (tabsWithScript.has(tab)) tabsWithScript.delete(tab);
});

chrome.windows.onCreated.addListener(function (window) {
  openWindows.add([window.id]);
  focusedWindow = window.id;
});

chrome.windows.onRemoved.addListener(function (window) {
  if (openWindows.has(window.id)) tabsWithScript.delete(window.id);
});
