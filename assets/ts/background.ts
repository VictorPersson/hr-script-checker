const tabsWithScript = new Map();
const tabsWithSupervisor = new Map();
const tabsWithPagesScript = new Map();

interface IRequest {
  url: string;
  tabId: number;
  statusCode: number;
  name: Iurl;
}

interface Iurl {
  name: string;
}

const updateIcon = (isScriptActive: boolean, tabId: number) => {
  chrome.action.setIcon({
    tabId: tabId,
    path: {
      16: `../images/hr_icon_${isScriptActive ? "active" : "inactive"}.png`,
    },
  });
};

const updatePopup = (isScriptActive: boolean, tabId: number) => {
  chrome.action.setPopup({
    tabId: tabId,
    popup: `../html/popup_${isScriptActive ? "active" : "inactive"}.html`,
  });
};

const updateContentScript = (tabId: number) => {
  console.log(tabId);

  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ["js/content.js"],
  });
};

const updateStorage = (data: object) => {
  chrome.storage.local.set({
    scriptActive: data || { statusCode: 404 },
  });
};

const checkMap = (id: number) => {
  return tabsWithScript.has(id) ? tabsWithScript.get(id) : 0;
};

const checkScript = (req: chrome.webRequest.WebResponseCacheDetails) => {
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

const checkSupervisorScript = (
  req: chrome.webRequest.WebResponseCacheDetails
) => {
  const supervisorFragment = "/main-supervisor.";
  if (req.url.match(supervisorFragment)) {
    chrome.webRequest.onCompleted.removeListener(checkSupervisorScript);

    updateIcon(req.statusCode === 200 ? true : false, req.tabId);
    updatePopup(req.statusCode === 200 ? true : false, req.tabId);

    req.statusCode === 200
      ? tabsWithSupervisor.set(req.tabId, req)
      : tabsWithSupervisor.delete(req.tabId);
  }
};

chrome.tabs.onActivated.addListener((activeInfo) =>
  updateContentScript(activeInfo.tabId)
);

chrome.tabs.onUpdated.addListener(
  (tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
    if (changeInfo.status) {
      chrome.webRequest.onCompleted.addListener(checkScript, {
        urls: ["<all_urls>"],
      });
    }

    if (changeInfo.status === "complete") {
      const scriptData = checkMap(tabId);
      updateStorage(scriptData);
      updateContentScript(tabId);
    }
  }
);
