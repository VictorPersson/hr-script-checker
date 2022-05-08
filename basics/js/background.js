const tabsWithScript = new Set();

const updateIcon = (isScriptActive, tabId) => {
  isScriptActive ? console.log("Setting script active") : "";
  chrome.action.setIcon({
    tabId: tabId,
    path: {
      16: `hr_icon_${isScriptActive ? "active" : "inactive"}.png`,
    },
  });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("Site updated");
  if (changeInfo.status) {
    chrome.webRequest.onCompleted.addListener(checkScript, {
      urls: ["<all_urls>"],
    });
  }
});

function checkScript(req) {
  const hrScriptFragment = /awAddGift\.js#\w+/;
  if (req.url.match(hrScriptFragment)) {
    updateIcon(req.statusCode === 200 ? true : false, req.tabId);
    req.statusCode === 200
      ? tabsWithScript.add(req.tabId)
      : tabsWithScript.delete(req.tabId);
    chrome.webRequest.onCompleted.removeListener(checkScript);
  }
}
