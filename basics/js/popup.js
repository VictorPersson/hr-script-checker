console.log("Content script is loaded");

const modHtml = (scriptActive) => {
  console.log(scriptActive);
  const infoTitle = document.getElementById("main-header");

  infoTitle.innerText = `This site is ${
    scriptActive ? "" : "not"
  } running Hello Retail ${scriptActive ? "✔️" : "❌"}`;
};

const buildPopup = (status) => {
  scriptActive = status;
  if (location.hash == "#popup") {
    console.log(status);
    const infoTitle = document.getElementById("main-header");
    console.log(infoTitle);

    infoTitle.innerText = `This site is ${
      status ? "" : "not"
    } running Hello Retail ${status ? "✔️" : "❌"}`;
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  setScriptStatus(request.scriptActive).then(
    sendResponse({ responseBackground: "Response to background" })
  );
  return true;
});

chrome.storage.local.get(["scriptActive"], function (result) {
  console.log("RES:", result.scriptActive);

  const scriptActive = result.scriptActive.statusCode === 200;
  modHtml(scriptActive);
});
