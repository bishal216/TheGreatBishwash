// Access the root element
const root = document.documentElement;

const toggleDarkMode = () => {
  root.classList.toggle("dark-mode");
};

const toggleColorblindMode = () => {
  root.classList.toggle("colorblind-mode");
};
