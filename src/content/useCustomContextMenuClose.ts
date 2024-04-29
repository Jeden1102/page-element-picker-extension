export const useCustomContextMenuClose = (
  contextMenu: HTMLDivElement,
  target: HTMLDivElement
) => {
  if (!contextMenu) return;

  document.body.classList.toggle("hide-scroll");
  contextMenu.remove();
  target.classList.remove("picker-active");
};
