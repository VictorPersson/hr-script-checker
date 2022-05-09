const tabsWithScript = new Set();

const updateIcon = (isScriptActive, tabId) => {
  chrome.action.setIcon({
    tabId: tabId,
    path: {
      16: `../images/hr_icon_${isScriptActive ? "active" : "inactive"}.png`,
    },
  });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("Site updated");
  if (changeInfo.status) {
    chrome.webRequest.onCompleted.addListener(checkScript, {
      urls: ["<all_urls>"],
    });
    // Make sure we only call func if window is 100% laoded.
    // contactPopup(tabId, { scriptActive: true });
  }
});

const contactPopup = (tab, data) => {
  try {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, data, function (response) {
        console.log(response.responseBackground);
      });
    });
  } catch {
    console.log("Could not connect to popup");
  }
};

chrome.action.onClicked.addListener(contactPopup);

function checkScript(req) {
  const hrScriptFragment = /awAddGift\.js#,?\w+/;
  if (req.url.match(hrScriptFragment)) {
    console.log(`Script detected on: ${req.initiator} (${req.url})`);
    updateIcon(req.statusCode === 200 ? true : false, req.tabId);
    req.statusCode === 200
      ? tabsWithScript.add(req.tabId)
      : tabsWithScript.delete(req.tabId);
    chrome.webRequest.onCompleted.removeListener(checkScript);
  }
}
