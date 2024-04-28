export const useCustomContextMenuContent = (target: HTMLDivElement) => {
  const scrapeOptions = {
    attributes: [] as string[],
    others: {
      full: "Whole element",
      content: "Element content",
    },
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

  const scrapeOption = (option: string, optionLabel?: string) => {
    return `
    <div class="scrape-options__option">
    <input id="${option}" type="checkbox"/>
    <label for="${option}">${optionLabel ? optionLabel : option}</label>
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

  const scrapeOptionOthersContent = () => {
    let content = "";

    for (const [key, value] of Object.entries(scrapeOptions.others)) {
      content += scrapeOption(key, value);
    }

    return content;
  };

  const actions = () => {
    return `
        <div class="scrape-btns">
        <button class="scrape-btn save">Save scraping</button>
        <button class="scrape-btn cancel">Cancel</button>
        </div>
        `;
  };

  const template = `
    ${heading()}
    <div class="scrape-options">
    ${scrapeOptionAttributesContent()}
    ${scrapeOptionOthersContent()}
    </div>
    ${actions()}
    `;

  return template;
};
