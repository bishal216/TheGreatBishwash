/**
 * Toggles the virtual keyboard on or off by creating or removing it from the DOM.
 */
const toggleVirtualKeyboard = () => {
  const keyboardContainer = document.getElementById("virtual-keyboard");
  const mainContent = keyboardContainer.previousElementSibling;

  // Check if the keyboard already exists
  if (keyboardContainer.hasChildNodes()) {
    // Keyboard exists: Remove all child nodes to hide it
    while (keyboardContainer.firstChild) {
      keyboardContainer.removeChild(keyboardContainer.firstChild);
    }
    mainContent.style.paddingBottom = "0px";
  } else {
    // Keyboard does not exist: Create the keyboard
    const rows = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["DEL", "Z", "X", "C", "V", "B", "N", "M", "ENTER"],
    ];

    rows.forEach((row) => {
      const rowContainer = document.createElement("div");
      rowContainer.classList.add("keyboard-row");

      row.forEach((key) => {
        const keyElement = document.createElement("div");
        keyElement.textContent = key;
        keyElement.classList.add("keyboard-key");

        // Add a special class for wide keys like "ENTER" and "DEL"
        if (key === "ENTER" || key === "DEL") {
          keyElement.classList.add("wide");
        }

        // Add a click event listener to simulate key presses
        keyElement.addEventListener("click", () => handleVirtualKeyPress(key));

        rowContainer.appendChild(keyElement);
      });

      keyboardContainer.appendChild(rowContainer);
    });
    const keyboardHeight = keyboardContainer.offsetHeight;
    mainContent.style.paddingBottom = `${keyboardHeight}px`;
  }
};

/**
 * Simulates a physical keyboard press by creating and dispatching a custom KeyboardEvent.
 * @param {string} key - The key that was virtually "pressed".
 */
const handleVirtualKeyPress = (key) => {
  const event = new KeyboardEvent("keydown", {
    key: key === "DEL" ? "Backspace" : key === "ENTER" ? "Enter" : key, // Map "DEL" to "Backspace" and handle "Enter"
    code:
      key === "DEL"
        ? "Backspace"
        : key === "ENTER"
        ? "Enter"
        : `Key${key.toUpperCase()}`, // Map "Enter" key properly
    bubbles: true,
    cancelable: true,
  });

  document.dispatchEvent(event);
};

// Start with keyboard ON
toggleVirtualKeyboard();
