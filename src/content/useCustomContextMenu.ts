interface Position {
  left: number;
  top: number;
}

export const useCustomContextMenu = (
  target: HTMLDivElement,
  position: Position
) => {
  const createContextBox = () => {
    const div = document.createElement("div");
    div.classList.add("custom-context-menu");

    div.innerHTML = "SIEMANKO";

    div.style.left = `${position.left}px`;
    div.style.top = `${position.top}px`;

    document.body.appendChild(div);
  };

  const removeScroll = () => {};

  const handleOutsideClick = () => {};

  createContextBox();
};
