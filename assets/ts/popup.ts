chrome.storage.local.get(["scriptActive"], (result) => {
  const scriptActive: boolean = result.scriptActive.statusCode === 200;
});

const buildExtension = (main: HTMLElement, header: HTMLElement) => {
  main.dataset.activeSection = "0";
  const menuTitles = ["Status", "Settings", "Admin"];

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
    updateMain();
  });

  const h1 = createHtml("H1", ["hr-header__main-header"]);
  const h3 = createHtml("H3", ["hr-header__sub-header"]);
  h1.innerText = "This page is using Hello Retail. ✅";
  h3.innerText = "Hello Retail main script detected on this page.";
  header.appendChild(h1).after(h3);

  updateMain();
};

const fetchMenuData = (key: string) => {
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

const updateMain = () => {
  chrome.storage.local.get(["activeMenuTab"], (result) => {
    const currMenu: number = result.activeMenuTab;
    const main = document.querySelector("#hr-extension > main") as HTMLElement;
    main.innerHTML = "";
    if (currMenu === 0) {
      renderStatus(main);
    } else if (currMenu === 1) {
      renderSettings(main);
    } else if (currMenu === 2) {
      renderAdmin(main);
    }
    updateMenu(currMenu);
  });
};

const renderStatus = (main: HTMLElement) => {
  console.log("Now update status");

  const statusDiv = createHtml("DIV", ["status-container"]);
  const pagesH4 = createHtml("H4", ["status-container__mainHeader"]);
  const pagesH5 = createHtml("H5", ["status-container__secondHeader"]);

  chrome.storage.local.get(["pagesDiv"], (result) => {
    console.log("Check pages");
    console.log(result);
    if (result.pagesDiv.isPresent) {
      pagesH4.innerHTML = `✅ Detected Pages div with ID: <span>${result.pagesDiv.id}</span>`;
      pagesH5.innerHTML = `✅ Supplied data/path: <span>${result.pagesDiv.hierarchies}</span>`;
    } else {
      pagesH5.innerText = "No pages div detected on this page";
    }
  });

  statusDiv.appendChild(pagesH4).after(pagesH5);
  main.appendChild(statusDiv);
};

const renderSettings = (main: HTMLElement) => {
  const settings = ["Main script", "Reload script", "Setting 2", "Setting 3"];

  const buildSettings = (text: string, index: Number) => {
    const container = createHtml("DIV", ["container"]);
    const containerSettings = createHtml("DIV", ["container--settings"]);

    const checkboxContainer = createHtml("DIV", ["checkbox--container"]);
    const checkboxTooltip = createHtml("SPAN", ["checkbox--tooltip"]);
    const checkboxButton = createHtml("DIV", ["checkbox--button"], "button");
    const checkboxInput = createHtml("INPUT", ["checkbox"], `button-${index}`);
    const checkboxKnob = createHtml("DIV", ["knobs"]);
    const checkboxSpan = createHtml("SPAN");
    (checkboxInput as HTMLInputElement).type = "checkbox";
    checkboxSpan.innerText = "NO";
    checkboxKnob.appendChild(checkboxSpan);

    checkboxTooltip.innerText = text;

    checkboxButton.appendChild(checkboxInput).after(checkboxKnob);
    checkboxContainer.appendChild(checkboxTooltip).after(checkboxButton);

    main
      .appendChild(container)
      .appendChild(containerSettings)
      .appendChild(checkboxContainer);
  };

  settings.forEach((setting, index) => buildSettings(setting, index));

  const reloadScriptBtn = document.getElementById("button-1");
  console.log(reloadScriptBtn);

  reloadScriptBtn?.addEventListener("click", function () {
    console.log("Reloading Hello Retail script...");

    /*
    chrome.storage.local.set({
      reloadScript: true,
    });
    */
  });
};

const renderAdmin = (main: HTMLElement) => {
  main.innerText = "Admin text";
};

const createHtml = (type: string, classArr?: string[], id?: string) => {
  const div = document.createElement(type);
  if (classArr) div.classList.add(...classArr);
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
const header = createHtml("HEADER", ["hr-header"]);
const main = createHtml("MAIN", ["hr-main"]);

b?.prepend(menuBar);
b?.appendChild(header);
b?.appendChild(main);

buildExtension(main, header);

console.log("Test");
