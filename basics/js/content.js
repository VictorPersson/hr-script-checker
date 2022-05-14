"use strict";

console.log("Content script loaded");

(function () {
  const checkPagesDiv = () => {
    const pagesDiv = document.querySelector("[id^=helloretail-category-page-]");
    if (!pagesDiv) return;
  };
})();
