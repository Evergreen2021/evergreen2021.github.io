let installPrompt = null;
const installButton = document.querySelector("#install");
alert("Hello world!");
/*
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
 alert("Hello! I am an alert box!!" + installPrompt);
  installButton.removeAttribute("hidden");
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) {
    return;
  }
  const result = await installPrompt.prompt();
  console.log(`Install prompt was: ${result.outcome}`);
  disableInAppInstallPrompt();
});

function disableInAppInstallPrompt() {
  installPrompt = null;
  installButton.setAttribute("hidden", "");
}*/
