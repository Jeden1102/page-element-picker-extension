import { useCustomContextMenuContent } from "./useCustomConxtextMenuContent";
import { useCustomContextMenuClose } from "./useCustomContextMenuClose";

interface Position {
  left: number;
  top: number;
}

export const useCustomContextMenu = (
  target: HTMLDivElement,
  position: Position
) => {
  const CONTEXT_MENU_CLASS = "custom-context-menu";
  let contextMenu: HTMLDivElement | null = null;

  /**
   * The function `createContextBox` creates a custom context menu box at a specified position on the
   * page with custom content and attaches event listeners.
   */
  const createContextBox = () => {
    const div = document.createElement("div");
    div.classList.add(CONTEXT_MENU_CLASS);
    div.style.left = `${position.left}px`;
    div.style.top = `${position.top}px`;

    const content = useCustomContextMenuContent(target);

    div.innerHTML = content;
    document.body.appendChild(div);
    contextMenu = div;
    attachEvents();
  };

  /**
   * The function `closeContextMenu` closes a custom context menu if it is currently open.
   * @returns If the `contextMenu` variable is falsy, the function will return without doing anything.
   */
  const closeContextMenu = () => {
    if (!contextMenu) return;
    useCustomContextMenuClose(contextMenu, target);
    contextMenu = null;
  };

  /**
   * The `attachEvents` function attaches event listeners to the cancel button and save button in a
   * context menu.
   * @returns If either `cancelBtn` or `scrapeForm` is not found in the `contextMenu`, the function will
   * return early and nothing will be returned explicitly.
   */
  const attachEvents = () => {
    const cancelBtn = contextMenu?.querySelector(
      ".scrape-btn.cancel"
    ) as HTMLButtonElement;
    const scrapeForm = contextMenu?.querySelector(
      ".scrape-form"
    ) as HTMLFormElement;

    if (!cancelBtn || !scrapeForm) return;
    attachCancelEvent(cancelBtn);
    attachSaveEvent(scrapeForm);
  };

  /**
   * The function `attachCancelEvent` adds a click event listener to a button element that closes a
   * context menu when clicked.
   * @param {HTMLButtonElement} btn - HTMLButtonElement
   */
  const attachCancelEvent = (btn: HTMLButtonElement) => {
    btn.addEventListener("click", () => closeContextMenu());
  };

  /**
   * The function `attachSaveEvent` attaches a submit event listener to a button element and calls the
   * `handleSave` function when the event is triggered.
   * @param {HTMLFormElement} btn - The `btn` parameter is of type `HTMLFormElement`, which represents a
   * form element in the HTML document.
   */
  const attachSaveEvent = (btn: HTMLFormElement) => {
    btn.addEventListener("submit", (e) => handleSave(e));
  };

  /**
   * The `handleSave` function prevents the default form submission, extracts form data, saves it to
   * local storage, and shows a success message.
   * @param {Event} e - The `e` parameter in the `handleSave` function is an event object representing
   * the event that was triggered. In this case, it is of type `Event`. The function is using this event
   * object to prevent the default form submission behavior, extract form data, and then save the form
   * values to
   * @returns If the length of `formValues` is 0, the function will return early and not execute the
   * `saveToLocalStorage` and `showSuccessMessage` functions.
   */
  const handleSave = (e: Event) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues = Object.keys(Object.fromEntries(formData.entries()));

    if (formValues.length === 0) return;

    saveToLocalStorage(formValues, formData.get("key") as string);
    showSuccessMessage();
  };

  /**
   * The function `saveToLocalStorage` saves form values, URL, and selector to local storage in JSON
   * format.
   * @param {string[]} formValues - The `formValues` parameter in the `saveToLocalStorage` function is an
   * array of strings that contains the values from a form.
   * @param {string} key - Picker key.
   */
  const saveToLocalStorage = async (formValues: string[], key: string) => {
    await navigator.clipboard.writeText("");
    await navigator.clipboard.writeText(
      JSON.stringify({
        key,
        content: formValues,
        selector: getPath(target),
        source: "picker",
      })
    );
  };

  /**
   * The `showSuccessMessage` function updates the content of a context menu with a success message
   * related to saving a scrape.
   * @returns The `showSuccessMessage` function returns the success message template that includes a
   * heading and paragraphs with information about the successful save of a scrape.
   */
  const showSuccessMessage = () => {
    if (!contextMenu) return;
    const template = `
    <h1>Success!</h1>
    <p>Your scrape has been saved succesfully.</p>
    <p>If you have currently opened a tab with scraping for this page it will be automatic attached to your scrape</p>
    <p>If not, just navigate to the scrape tab and click the "Paste scrape" button</p>
    `;

    contextMenu.innerHTML = template;
  };

  /**
   * The function `getPath` in TypeScript returns the CSS selector path of an HTML element.
   * @param {HTMLElement} node - The `node` parameter in the `getPath` function is an HTMLElement that
   * represents an element in the DOM (Document Object Model). The function is designed to generate a CSS
   * selector path that can be used to uniquely identify the given element within its DOM hierarchy.
   * @returns The function `getPath` returns a string that represents the CSS selector path of the given
   * HTML element node.
   */
  const getPath = (node: HTMLElement) => {
    let path = [];
    while (node.nodeType === Node.ELEMENT_NODE) {
      let selector = node.nodeName.toLowerCase();

      let sib = node;
      let nth = 1;
      while ((sib = sib.previousElementSibling)) {
        if (sib.nodeName.toLowerCase() == selector) nth++;
      }
      path.unshift(selector);
      node = node.parentNode as HTMLElement;
    }
    return path.join(" > ");
  };

  /**
   * The `toggleBodyScroll` function toggles the "hide-scroll" class on the body element.
   */
  const toggleBodyScroll = () => {
    document.body.classList.toggle("hide-scroll");
  };

  /**
   * The `handleOutsideClick` function listens for mousedown events on the document body and closes a
   * context menu if the click occurs outside of the menu.
   */
  const handleOutsideClick = () => {
    document.body.addEventListener("mousedown", (ev) => {
      if (!contextMenu) return;
      const target = ev.target as HTMLDivElement;

      if (target.classList.contains(CONTEXT_MENU_CLASS)) return;

      const isOutsideClick = !target.closest(".custom-context-menu");

      if (!isOutsideClick) return;

      closeContextMenu();
    });
  };

  /**
   * The `handleEscapeClick` function listens for the "Escape" key press event and calls the
   * `closeContextMenu` function when the key is pressed.
   */
  const handleEscapeClick = () => {
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        closeContextMenu();
      }
    });
  };

  createContextBox();
  toggleBodyScroll();
  handleOutsideClick();
  handleEscapeClick();
};
