import { describe, it, expect, beforeEach, vi } from "vitest";
import { addLink, links } from "./main";

describe("LinkDeck", () => {
  beforeEach(() => {
    // Reset DOM to match index.html structure required by main.ts
    document.body.innerHTML = `
      <div id="app">
        <div class="card">
          <input type="text" placeholder="Title" id="title" />
          <input type="text" placeholder="URL" id="url" />
          <button>Add</button>
        </div>
        <div class="link-section"></div>
      </div>
    `;

    // Clear localStorage
    localStorage.clear();

    // Reset links array (since it's a mutable array exported from main.ts)
    links.length = 0;
  });
  // ------------------------------
  // 📌 VALIDATION TESTS
  // ------------------------------
  it("should throw an error when invalid URL is provided", () => {
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const urlInput = document.getElementById("url") as HTMLInputElement;

    titleInput.value = "My Website";
    urlInput.value = "invalid-url";
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    expect(() => addLink()).toThrowError("Invalid URL");
    expect(links).toHaveLength(0);
    expect(alertSpy).toHaveBeenCalledWith("Invalid URL");
  });
  it("should throw and error when title or url is empty", () => {
    const titleInput = document.querySelector("#title") as HTMLInputElement;
    const urlInput = document.querySelector("#url") as HTMLInputElement;

    titleInput.value = "";
    urlInput.value = "";
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    expect(() => addLink()).toThrowError("Please enter both title and URL");
    expect(links).toHaveLength(0);
    expect(alertSpy).toHaveBeenCalledWith("Please enter both title and URL");
  });

  // ------------------------------
  // 📌 ADD LINK
  // ------------------------------
  it("adds a new link when addLink is called", () => {
    // arrange
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const urlInput = document.getElementById("url") as HTMLInputElement;

    titleInput.value = "My Website";
    urlInput.value = "https://example.com";

    // act
    addLink();

    // assert
    expect(links).toHaveLength(1);
    expect(links[0]).toEqual({
      title: "My Website",
      url: "https://example.com",
    });
    // Check if link is rendered in the DOM
    const linkTitle = document.querySelector(".link-title");
    const linkUrl = document.querySelector(".link-url");

    expect(linkTitle).toBeInTheDocument();
    expect(linkTitle?.textContent).toBe("My Website");
    expect(linkUrl?.textContent).toBe("https://example.com");
  });

  // ------------------------------
  // 📌 REMOVE LINK
  // ------------------------------
  it("should remove a link when user click trash icon button", () => {
    // arrange
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const urlInput = document.getElementById("url") as HTMLInputElement;

    titleInput.value = "My Website";
    urlInput.value = "https://example.com";
    addLink();
    // Check if link is added to the array
    expect(links).toHaveLength(1);
    expect(links[0]).toEqual({
      title: "My Website",
      url: "https://example.com",
    });

    // --- Act: simulate click delete button
    const deleteBtn = document.getElementById("delete-link") as HTMLElement;
    deleteBtn.click();

    // --- Assert: the item should be removed from the list
    expect(links).toHaveLength(0);

    const linkDiv = document.querySelector(".link-item");
    expect(linkDiv).not.toBeInTheDocument();
  });

  // ------------------------------
  // 📌 OPEN LINK
  // ------------------------------
  it("should open the link when user click the item container", () => {
    // arrange
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const urlInput = document.getElementById("url") as HTMLInputElement;

    titleInput.value = "My website";
    urlInput.value = "https://example.com";
    addLink();
    expect(links).toHaveLength(1);

    const linkDiv = document.querySelector(".link-item") as HTMLElement;

    // mock window.open
    const mockOpen = vi.spyOn(window, "open").mockImplementation(() => null);

    // --- Act: simulate click delete button
    linkDiv.click();

    // --- Assert: the item should be removed from the list
    expect(mockOpen).toHaveBeenCalledWith("https://example.com", "_blank");
  });
});
