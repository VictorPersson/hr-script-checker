const checkPagesDiv = () => {
  const pagesDiv = document.querySelector(
    "[id^=helloretail-category-page-]"
  ) as HTMLElement;

  const hierarchiesValue = Object.values(pagesDiv.dataset);

  const data = {
    html: pagesDiv,
    isPresent: pagesDiv ? true : false,
    id: pagesDiv?.id.split("-").pop(),
    hierarchies: hierarchiesValue,
  };

  console.log("Div check:", pagesDiv);

  chrome.storage.local.set({
    pagesDiv: pagesDiv ? data : {},
  });
};

checkPagesDiv();
