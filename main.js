let installPrompt = null;
const installButton = document.querySelector("#install");

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


function disableInAppInstallPrompt() {
  installPrompt = null;
  installButton.setAttribute("hidden", "");
}

const video = document.getElementById('video');
const resultDiv = document.getElementById('result');

// Access the device camera
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
        video.srcObject = stream;
        video.setAttribute('playsinline', true); // Required to tell iOS to use inline video
        video.play();
        requestAnimationFrame(scanQRCode);
    })
    .catch(err => {
        console.error("Error accessing camera: ", err);
    });

function scanQRCode() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
            resultDiv.innerText = `QR Code Data: ${code.data}`;
            // Optionally, stop scanning after a successful read
            // return;
        }
    }
    requestAnimationFrame(scanQRCode);
}
