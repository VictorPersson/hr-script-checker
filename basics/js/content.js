"use strict";

console.log("Content script loaded");
console.log(document.getElementById("main-header"));
console.log(document.querySelector("body"));

(function () {
  const checkPagesDiv = () => {
    const pagesDiv = document.querySelector("[id^=helloretail-category-page-]");
    if (!pagesDiv) return;
  };
})();
