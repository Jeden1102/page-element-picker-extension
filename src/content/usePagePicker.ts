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

  document.body.addEventListener("contextmenu", (ev) => {
    ev.preventDefault();
    const target = ev.target as HTMLDivElement;
    if (!target) return;
    if (!ev.shiftKey) return;

    useCustomContextMenu(target);
  });

  const watchMouseLeave = (target: HTMLDivElement) => {
    target.addEventListener("mouseleave", () => {
      target.classList.remove(ACTIVE_CLASS);
    });
  };

  const removeActiveFromParent = () => {
    const activeElements = document.querySelectorAll(".picker-hovered");

    activeElements.forEach((el) => {
      const e = el as HTMLDivElement;
      e.classList.remove(ACTIVE_CLASS);
    });
  };
};