"use strict";

(function () {
  const isHrScriptPresent = () => {
    const allScripts = document.querySelectorAll("script");
    const regex = /awAddGift\.js#\w+/;
    const hrScripts = [...allScripts].filter((script) =>
      script.outerHTML.match(regex)
    );
    return hrScripts.length > 0;
  };

  const checkPagesDiv = () => {
    const pagesDiv = document.querySelector("[id^=helloretail-category-page-]");
    if (!pagesDiv) return;
  };

  if (!isHrScriptPresent()) return;

  console.log("Script found!");
  checkPagesDiv();
})();
