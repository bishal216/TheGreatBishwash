/**
 * Toggles the visibility of the .game-setup element and updates the title accordingly.
 */
const toggleGameSetup = () => {
  const gameSetup = document.querySelector(".game-setup");
  const title = document.querySelector("#setup-title");

  if (gameSetup) {
    // Check if the children (excluding the title) are currently hidden
    const isHidden = Array.from(gameSetup.children).some(
      (child) => child !== title && child.style.display === "none"
    );

    if (isHidden) {
      // Show setup (excluding the title)
      changeTextContent(title, "n-ordle");
      Array.from(gameSetup.children).forEach((child) => {
        if (child !== title) {
          child.style.display = ""; // Reset to default display
        }
      });
    } else {
      // Hide setup (excluding the title)
      const noOfNordles = document.querySelector("#num-nordles").value;
      changeTextContent(title, `${noOfNordles}-ordle`);
      Array.from(gameSetup.children).forEach((child) => {
        if (child !== title) {
          child.style.display = "none"; // Hide non-title elements
        }
      });
    }
  }
};

/** Changes the text content of a given element. */
const changeTextContent = (element, newText) => {
  if (element) {
    element.textContent = newText;
  } else {
    console.error("Element not found to update text content.");
  }
};
