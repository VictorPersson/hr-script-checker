console.log("Content script is loaded");

const modHtml = (scriptActive) => {
  const infoTitle = document.querySelector("#hr-extension-main #main-header");

  console.log(infoTitle, scriptActive);

  infoTitle.innerText = `This site is ${
    scriptActive ? "" : "not"
  } running Hello Retail ${scriptActive ? "✔️" : "❌"}`;
};

chrome.storage.local.get(["scriptActive"], function (result) {
  const scriptActive = result.scriptActive.statusCode === 200;
  modHtml(scriptActive);
});
