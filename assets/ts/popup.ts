chrome.storage.local.get(["scriptActive"], (result) => {
  const scriptActive: boolean = result.scriptActive.statusCode === 200;
});

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
const mainContainer = document.getElementById("hr-extension-main");

const menuDiv = createHtml("DIV", ["container--menu"]);
const icon = createIcon(["container--menu__icon"]);

menuDiv.appendChild(icon);
mainContainer?.appendChild(menuDiv);
