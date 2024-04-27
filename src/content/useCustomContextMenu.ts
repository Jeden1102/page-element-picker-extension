import { useCustomContextMenuContent } from "./useCustomConxtextMenuContent";

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

    const createContextBox = () => {
        const div = document.createElement("div");
        div.classList.add(CONTEXT_MENU_CLASS);

        div.innerHTML = `
    <p>Siemka</p>
    `;

        div.style.left = `${position.left}px`;
        div.style.top = `${position.top}px`;

        document.body.appendChild(div);

        contextMenu = div;
        useCustomContextMenuContent(target);
    };

    const toggleBodyScroll = () => {
        document.body.classList.toggle("hide-scroll");
    };

    const closeContextMenu = () => {
        if (!contextMenu) return;

        toggleBodyScroll();
        contextMenu.remove();
        target.classList.remove("picker-active");
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
    toggleBodyScroll();
    handleOutsideClick();
    handleEscapeClick();
};
