import { useCustomContextMenu } from "./useCustomContextMenu";

export const usePagePicker = () => {
  const ACTIVE_CLASS = "picker-hovered";

  document.body.addEventListener("mousemove", (ev) => {
    const target = ev.target as HTMLDivElement;
    if (!target) return;
    if (!ev.shiftKey) return;

    removeActiveFromParent();

    target.classList.add(ACTIVE_CLASS);

    watchMouseLeave(target);
  });

  document.body.addEventListener("contextmenu", (ev: MouseEvent) => {
    const target = ev.target as HTMLDivElement;
    if (!target) return;
    if (!ev.shiftKey) return;
    ev.preventDefault();

    const position = { left: ev.clientX, top: ev.clientY };

    target.classList.add("picker-active");
    useCustomContextMenu(target, position);
  });

  /**
   * The function `watchMouseLeave` adds an event listener to a target HTML element that removes a
   * specified class when the mouse leaves the element.
   * @param {HTMLDivElement} target - The `target` parameter in the `watchMouseLeave` function is an
   * HTMLDivElement element to which the event listener for "mouseleave" is being added.
   */
  const watchMouseLeave = (target: HTMLDivElement) => {
    target.addEventListener("mouseleave", () => {
      target.classList.remove(ACTIVE_CLASS);
    });
  };

  /**
   * The function `removeActiveFromParent` removes the class `ACTIVE_CLASS` from all elements with the
   * class `picker-hovered`.
   */
  const removeActiveFromParent = () => {
    const activeElements = document.querySelectorAll(".picker-hovered");

    activeElements.forEach((el) => {
      const e = el as HTMLDivElement;
      e.classList.remove(ACTIVE_CLASS);
    });
  };
};
