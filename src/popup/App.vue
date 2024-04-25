<template>
  <div class="container">
    <h1>
      Welcome to page element picker extesion.
    </h1>
    <p class="light">
      The extension is active.
    </p>
    <p>
      To select and element from the page, press 'alt', hover over an element
      and left click.
    </p>
    <p>
      An pop-up will appear and allow you to extract specific element or its
      attributes.
    </p>
    <div class="flex">
      <a
        title="Proceed to product page."
        target="_blank"
        href="https://google.com"
        >Product</a
      >
      <a
        title="Proceed to guide page."
        target="_blank"
        href="https://google.com"
        >Guide</a
      >
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Gruppo&family=Inter:wght@100..900&family=Ultra&display=swap");

$black: #151522;

body {
  font-family: "Inter", sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  background: $black;
  color: #f8f8fa;
  padding: 20px;

  h1,
  p {
    margin: 0;
  }

  h1 {
    font-weight: 400;
    min-width: 300px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;

    &.light {
      font-weight: 300;
      margin-bottom: 8px;
    }
  }

  .flex {
    display: flex;
    gap: 12px;
    margin-top: 12px;

    a {
      all: unset;
      background: #ffbd42;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $black;
      font-size: 14px;
      text-transform: uppercase;
      padding: 10px 20px;
      font-weight: 600;
      gap: 12px;
      cursor: pointer;
    }
  }
}
</style>
