let mainContent = document.querySelector(".main-content");
if (mainContent) {
  mainContent.addEventListener("click", evt => {
    if (evt.target.classList.contains("identity__become-action")) {
      if (!confirm("Change identity?")) {
        evt.preventDefault();
      }
    }
  });
}
