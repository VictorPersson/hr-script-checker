import { Node } from "typescript";

chrome.storage.local.get(["scriptActive"], (result) => {
  const scriptActive: boolean = result.scriptActive.statusCode === 200;
});

const buildExtension = () => {
  const menuTitles = ["Home", "Settings", "Admin"];

  menuTitles.forEach((title, index) => {
    const container = createHtml("DIV", ["hr-nav__menu-item"]);
    const header = createHtml(
      "H3",
      ["hr-nav__menu-item--title"],
      index.toString()
    );
    header.innerText = title;
    container.appendChild(header);
    menuBar.appendChild(container);
    if (index === 0) header.classList.add("hr-nav__menu-item--title--active");
  });

  b?.addEventListener("click", function (e) {
    const clicked = (e.target as HTMLElement).closest(
      ".hr-nav__menu-item--title"
    );
    if (!clicked) return;
    const tabs = document.querySelectorAll(".hr-nav__menu-item--title");
    tabs.forEach((tab) => {
      tab.classList.remove("hr-nav__menu-item--title--active");
    });
    clicked.classList.add("hr-nav__menu-item--title--active");
    updateMenu(+clicked.id);
    renderPage(+clicked.id);
  });
};

const fetchMenuData = (key: string) => {
  console.log(key, typeof key);

  let activeKeyTab: number = 0;
  chrome.storage.local.get("activeMenuTab", function (result) {
    console.log(
      "Value currently is " + result.activeMenuTab,
      typeof result.activeMenuTab
    );
    activeKeyTab = +result.key;
  });
  return activeKeyTab;
};

const updateMenu = (id: number) => {
  chrome.storage.local.set({
    activeMenuTab: id,
  });

  const main = document.querySelector("#hr-extension > main");
  (main as HTMLElement).dataset.activeSection = id.toString();

  const activeMenuSection = document.getElementById(id.toString());
  const tabs = document.querySelectorAll(".hr-nav__menu-item--title");

  tabs.forEach((tab) => {
    tab.classList.remove("hr-nav__menu-item--title--active");
  });
  activeMenuSection?.classList.add("hr-nav__menu-item--title--active");
};

const renderPage = (id: number) => {
  chrome.storage.local.get(["activeMenuTab"], (result) => {
    const currMenu: number = result.activeMenuTab;
    console.log(typeof currMenu);
    const main = document.querySelector("#hr-extension > main > .container");
    const oldMain = main?.cloneNode(true);
    main!.innerHTML = "";
    const div = createHtml("DIV", ["container--settings"]);
    if (currMenu === 0) {
      main?.appendChild(oldMain);
    } else if (currMenu === 1) {
      console.log("Render Settings");
      main?.appendChild(div);
    } else if (currMenu === 2) {
      console.log("Render Admin panel");
      main?.appendChild(div);
    }
  });
};

const createHtml = (type: string, classArr: string[], id?: string) => {
  const div = document.createElement(type);
  if (classArr.length) div.classList.add(...classArr);
  if (id) div.id = id;
  return div;
};

const createIcon = (classArr: string[]) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg?.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg?.setAttribute("viewBox", "0 0 448 448");
  if (classArr.length) svg.classList.add(...classArr);
  const iconPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  iconPath?.setAttribute("stroke", "grey");
  iconPath?.setAttribute("fill", "grey");
  iconPath?.setAttribute(
    "d",
    "M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
  );
  svg.appendChild(iconPath);
  return svg;
};

const b: HTMLElement = document.body;
const menuBar = createHtml("NAV", ["hr-nav"]);

b?.prepend(menuBar);
buildExtension();

const currMenuTab = fetchMenuData("activeMenuTab");
console.log("send" + currMenuTab);

updateMenu(currMenuTab);
