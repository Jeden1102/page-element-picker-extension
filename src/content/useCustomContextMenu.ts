interface Position {
  left: number;
  top: number;
}

export const useCustomContextMenu = (
  target: HTMLDivElement,
  position: Position
) => {
  const CONTEXT_MENU_CLASS = "custom-context-menu";

  const createContextBox = () => {
    const div = document.createElement("div");
    div.classList.add(CONTEXT_MENU_CLASS);

    div.innerHTML = `
    <p>Siemka</p>
    `;

    div.style.left = `${position.left}px`;
    div.style.top = `${position.top}px`;

    document.body.appendChild(div);
  };

  const removeScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const closeContextMenu = () => {
    console.log("TERAz");
  };

  const handleOutsideClick = () => {
    document.body.addEventListener("mousedown", (ev) => {
      const target = ev.target as HTMLDivElement;
      if (target.classList.contains(CONTEXT_MENU_CLASS)) return;

      const isOutsideClick = !target.closest(".custom-context-menu");

      if (!isOutsideClick) return;

      closeContextMenu();
    });
  };

  const handleEscapeClick = () => {
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        closeContextMenu();
      }
    });
  };

  createContextBox();
  removeScroll();
  handleOutsideClick();
  handleEscapeClick();
};
