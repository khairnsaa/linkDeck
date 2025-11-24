import "./style.css";

interface LinkItem {
  title: string;
  url: string;
}

export let links: LinkItem[] = getLinks();

function getLinks() {
  const links = localStorage.getItem("links");
  if (links) {
    return JSON.parse(links);
  }
  return [];
}

export function addLink() {
  const title = document.querySelector<HTMLInputElement>("#title")!.value;
  const url = document.querySelector<HTMLInputElement>("#url")!.value;

  if (!title || !url) {
    alert("Please enter both title and URL");
    throw new Error("Please enter both title and URL");
  }

  try {
    new URL(url.trim());
  } catch {
    alert("Invalid URL");
    throw new Error("Invalid URL");
  }
  links.push({ title, url });
  renderLinks();
  localStorage.setItem("links", JSON.stringify(links));
}

function renderLinks() {
  const linkSection = document.querySelector<HTMLDivElement>(".link-section");
  if (!linkSection) return;
  linkSection.innerHTML = "";
  links.forEach((link) => {
    const linkItem = document.createElement("div");
    linkItem.innerHTML = `
        <div class="card">
          <div class="link-item">
            <div class="link-left">
              <img src="/iconmonstr-globe-1.svg" alt="link-icon" />
              <div class="link-info">
                <p class="link-title">${link.title}</p>
                <a href="#" class="link-url"
                  >${link.url}</a
                >
              </div>
            </div>
            <div class="link-icons">
              <img
                src="/iconmonstr-trash-can-filled.svg"
                alt="trash-icon"
                id="delete-link"
              />
              <img src="/iconmonstr-arrow-67.svg" alt="arrow-icon" />
            </div>
          </div>
        </div>
        `;
    linkSection.appendChild(linkItem);
    linkItem
      .querySelector<HTMLImageElement>("#delete-link")!
      .addEventListener("click", (e) => {
        e.stopPropagation();
        removeLink(link.url);
      });

    linkItem
      .querySelector<HTMLDivElement>(".link-item")!
      .addEventListener("click", () => openLink(link.url));
  });
}

function removeLink(url: string) {
  links = links.filter((link) => link.url !== url);
  renderLinks();
  localStorage.setItem("links", JSON.stringify(links));
}

function openLink(url: string) {
  window.open(url, "_blank");
}

try {
  renderLinks();

  const addBtn = document.querySelector<HTMLButtonElement>("button");
  if (addBtn) {
    addBtn.addEventListener("click", addLink);
  }
} catch (e) {
  console.error("Top level error in main.ts:", e);
}
