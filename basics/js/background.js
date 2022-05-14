const tabsWithScript = new Map();

const updateIcon = (isScriptActive, tabId) => {
  chrome.action.setIcon({
    tabId: tabId,
    path: {
      16: `../images/hr_icon_${isScriptActive ? "active" : "inactive"}.png`,
    },
  });
};

const updatePopup = (fileName, tabId) => {
  chrome.action.setPopup({
    tabId: tabId,
    popup: `../html/${fileName}`,
  });
};

const updateStorage = (data) => {
  chrome.storage.local.set({
    scriptActive: data || { statusCode: 404 },
  });
};

const checkScript = (req) => {
  const hrScriptFragment = "/scripts/company/awAddGift.js";
  if (req.url.match(hrScriptFragment)) {
    chrome.webRequest.onCompleted.removeListener(checkScript);

    updateIcon(req.statusCode === 200 ? true : false, req.tabId);
    updatePopup("popup.html", req.tabId);

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
    const scriptData = tabsWithScript.get(tabId);
    updateStorage(scriptData);
  }
});

chrome.windows.onFocusChanged.addListener(() => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const scriptData = tabsWithScript.get(tabs[0].id ?? 0);
    console.log(scriptData);
    updateStorage(scriptData);
    updatePopup("popup.html", tabs[0].id);
  });
});

chrome.tabs.onActivated.addListener((tab) => {
  const scriptData = tabsWithScript.get(tab.tabId ?? 0);
  updateStorage(scriptData);
  updatePopup("popup.html", tab.tabId);
});
