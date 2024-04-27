export const useCustomContextMenuContent = (target: HTMLDivElement) => {
  const scrapeOptions = {
    full: "Whole element",
    content: "Element content",
    attributes: [] as string[],
  };

  const getTargetAttributes = () => {
    const attrs = target.attributes;

    [...attrs].forEach(({ name }) => {
      scrapeOptions.attributes.push(name);
    });
  };

  getTargetAttributes();

  const heading = () => {
    return `
        <h2>Select type of content to be scraped.</h2>
        `;
  };

  const scrapeOption = (option: string) => {
    return `
    <div class="scrape-option">
    <input id="${option}" type="checkbox/>
    <label for="${option}">${option}</label>
    </div>
    `;
  };

  const scrapeOptionAttributesContent = () => {
    let content = "";

    scrapeOptions.attributes.forEach((option) => {
      content += scrapeOption(option);
    });
    return content;
  };

  const scrapeOptions

};
