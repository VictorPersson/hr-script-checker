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
  console.log("Site updated", changeInfo);
  if (changeInfo.status) {
    chrome.webRequest.onCompleted.addListener(checkScript, {
      urls: ["<all_urls>"],
    });
    // Make sure we only call func if window is 100% laoded.
    // contactPopup(tabId, { scriptActive: true });
  }

  if (changeInfo.status === "complete") {
    chrome.storage.local.get(["scriptActive"], function (result) {
      console.log(result.scriptActive);
    });

    contactPopup(tabId, {
      scriptActive: tabsWithScript.has(tabId) ? true : false,
    });
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

/*
const checkScript = (req) => {
  const hrScriptFragment = "/scripts/company/awAddGift.js";
  if (req.url.startsWith(hrScriptFragment)) {
    chrome.webRequest.onCompleted.removeListener(checkScript);
    return {
      webRequest: { res: req },
      status: { scriptActive: req.statusCode === 200 ? true : false },
    };
  }
  return { webRequest: {}, status: { scriptActive: false } };
};
*/

const checkScript = (req) => {
  let obj = {};
  const hrScriptFragment = "/scripts/company/awAddGift.js";
  if (req.url.match(hrScriptFragment)) {
    chrome.webRequest.onCompleted.removeListener(checkScript);
    updateIcon(req.statusCode === 200 ? true : false, req.tabId);
    req.statusCode === 200
      ? tabsWithScript.add(req.tabId)
      : tabsWithScript.delete(req.tabId);
    Object.assign(obj, req);
  }
  chrome.storage.local.set({
    scriptActive: obj,
  });
};
