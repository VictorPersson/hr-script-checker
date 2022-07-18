const checkPagesDiv = () => {
  const pagesDiv = document.querySelector(
    "[id^=helloretail-category-page-]"
  ) as HTMLElement;

  const data = {
    html: pagesDiv ? pagesDiv : "",
    isPresent: pagesDiv ? true : false,
    id: pagesDiv?.id.split("-").pop(),
    hierarchies: pagesDiv ? Object.values(pagesDiv.dataset) : "",
  };

  chrome.storage.local.set({
    pagesDiv: data,
  });

  console.log("Category:", data.hierarchies);
  console.log("Running content script now: Updating script");
};

const reloadScript = () => {
  const reloadScriptBtn = document.getElementById("button-1");
  reloadScriptBtn?.addEventListener("click", function () {
    /*
    chrome.storage.local.set({ 
      reloadScript: true,
    });
    */
  });

  /*
  chrome.storage.local.get(["reloadScript"], (result) => {
    console.log(result.reloadScript);
    if (result.reloadScript) {
      // Trigger reload, to track a new page-view
      //ADDWISH_PARTNER_NS.api.reload();
      console.log("Reloading script");
    } else {
      console.log("Not reloading script");
    }
  });
  */
};

reloadScript();
checkPagesDiv();
