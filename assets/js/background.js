const tabsWithScript = new Map();

const updateIcon = (isScriptActive, tabId) => {
  chrome.action.setIcon({
    tabId: tabId,
    path: {
      16: `../images/hr_icon_${isScriptActive ? "active" : "inactive"}.png`,
    },
  });
};

const updatePopup = (isScriptActive, tabId) => {
  chrome.action.setPopup({
    tabId: tabId,
    popup: `../html/popup_${isScriptActive ? "active" : "inactive"}.html`,
  });
};

const updateStorage = (data) => {
  chrome.storage.local.set({
    scriptActive: data || { statusCode: 404 },
  });
};

const checkMap = (id) => {
  return tabsWithScript.has(id) ? tabsWithScript.get(id) : 0;
};

const checkScript = (req) => {
  const hrScriptFragment = "/scripts/company/awAddGift.js";
  if (req.url.match(hrScriptFragment)) {
    chrome.webRequest.onCompleted.removeListener(checkScript);

    updateIcon(req.statusCode === 200 ? true : false, req.tabId);
    updatePopup(req.statusCode === 200 ? true : false, req.tabId);

    req.statusCode === 200
      ? tabsWithScript.set(req.tabId, req)
      : tabsWithScript.delete(req.tabId);
  }
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status) {
    chrome.webRequest.onCompleted.addListener(checkScript, {
      urls: ["<all_urls>"],
    });
  }

  if (changeInfo.status === "complete") {
    const scriptData = checkMap(tabId);
    updateStorage(scriptData);
  }
});
