let installPrompt = null;
const installButton = document.querySelector("#install");
const nfcButton = document.querySelector("#nfc");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
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

nfcButton.addEventListener("click", async () => {
    if ('NFC' in window) {
        const nfc = new NDEFReader();

        // Request NFC permission
        nfc
            .scan()
            .then(() => {
                console.log("NFC scan started successfully.");
                nfc.onreading = event => {
                    const message = event.message;
                    console.log("NFC tag read:", message);
                    for (const record of message.records) {
                    document.getElementById('text').value = record.data;
                        console.log("Record type:", record.recordType);
                        console.log("MIME type:", record.mediaType);
                        console.log("Data:", record.data);
                    }
                };
            })
            .catch(error => {
                console.error("Error starting NFC scan:", error);
            });
    } else {
        document.getElementById('text').value = "NFC not supported";
        console.log("NFC is not supported on this device.");
    }
});

function disableInAppInstallPrompt() {
  installPrompt = null;
  installButton.setAttribute("hidden", "");
}
