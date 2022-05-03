// Does it ever need to be emptied?
const currentTabs = [];

const updateIcon = (isScriptActive, tabId) => {
  chrome.action.setIcon(
    {
      path: {
        16: `hr_icon_${isScriptActive ? "active" : "inactive"}.png`,
      },
    },
    tabId
  );
  if (isScriptActive) currentTabs.push(tabId);
};

const msgReceived = (obj, sender, sendRes) => {
  updateIcon(obj.scriptActive, sender.tab.id);
};

const buttonClicked = (tab) => console.log(`Button clicked in tab: ${tab}`);

chrome.action.onClicked.addListener(buttonClicked);
chrome.runtime.onMessage.addListener(msgReceived);

chrome.tabs.onActivated.addListener(function (tab) {
  // BUG 1: When you drag tabs out in multiple windows, icon switches
  // glocally in all windows.
  const scriptActive = currentTabs.includes(tab.tabId);
  updateIcon(scriptActive, tab.tabId);
});
