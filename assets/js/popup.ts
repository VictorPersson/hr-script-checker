console.log("Content script is loaded");

chrome.storage.local.get(["scriptActive"], (result) => {
  const scriptActive: boolean = result.scriptActive.statusCode === 200;
  //modHtml(scriptActive);
});
