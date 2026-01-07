// =======================================
// UI ELEMENT REFERENCES
// =======================================

// Main SOS container
const sosScreen = document.querySelector(".sos");

// Buttons
const flashBtn = document.querySelector(".flash-btn");
const sosBtn = document.querySelector(".sos-btn");

// =======================================
// STATE VARIABLES
// =======================================

// Camera flashlight state
let isFlashOn = false;
let cameraStream = null;

// Screen SOS flash state
let isSOSActive = false;
let sosInterval = null;

// =======================================
// REAL FLASHLIGHT (SAFE IMPLEMENTATION)
// =======================================

/**
 * Checks whether camera + torch API is supported
 */
function isFlashlightSupported() {
  return (
    navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === "function"
  );
}

/**
 * Turn ON the real flashlight (camera torch)
 */
async function turnFlashOn() {
  // SAFETY CHECK (THIS FIXES YOUR ERROR)
  if (!isFlashlightSupported()) {
    alert("Flashlight is not supported on this browser.");
    return;
  }

  try {
    // Request access to back camera
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" }
      }
    });

    // Get video track
    const track = cameraStream.getVideoTracks()[0];

    // Check torch capability
    const capabilities = track.getCapabilities();
    if (!capabilities.torch) {
      alert("This device does not have a flashlight.");
      turnFlashOff();
      return;
    }

    // Enable flashlight
    await track.applyConstraints({
      advanced: [{ torch: true }]
    });

    // Update UI + state
    isFlashOn = true;
    flashBtn.textContent = "TURN OFF FLASH";

  } catch (error) {
    alert("Camera access denied or unavailable.");
    console.error(error);
  }
}

/**
 * Turn OFF the flashlight
 */
function turnFlashOff() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }

  isFlashOn = false;
  flashBtn.textContent = "FLASHLIGHT";
}

/**
 * Toggle flashlight ON / OFF
 */
function toggleFlashlight() {
  if (isFlashOn) {
    turnFlashOff();
  } else {
    turnFlashOn();
  }
}

// =======================================
// SCREEN FLASH (NO PERMISSIONS)
// =======================================

/**
 * Start screen flashing (SOS mode)
 */
function startScreenFlash() {
  let isWhite = false;

  sosInterval = setInterval(() => {
    sosScreen.style.backgroundColor = isWhite ? "#0f0f0f" : "#ffffff";
    sosScreen.style.color = isWhite ? "#eaeaea" : "#000000";
    isWhite = !isWhite;
  }, 300);
}

/**
 * Stop screen flashing
 */
function stopScreenFlash() {
  clearInterval(sosInterval);
  sosInterval = null;

  sosScreen.style.backgroundColor = "#0f0f0f";
  sosScreen.style.color = "#eaeaea";
}

/**
 * Toggle SOS mode
 */
function toggleSOS() {
  if (isSOSActive) {
    stopScreenFlash();
    sosBtn.textContent = "SOS MODE";
    isSOSActive = false;
  } else {
    startScreenFlash();
    sosBtn.textContent = "STOP SOS";
    isSOSActive = true;
  }
}

// =======================================
// EVENT LISTENERS
// =======================================

// Flashlight toggle
flashBtn.addEventListener("click", toggleFlashlight);

// SOS screen flash
sosBtn.addEventListener("click", toggleSOS);

// =======================================
// CLEANUP (BATTERY + CAMERA SAFETY)
// =======================================

window.addEventListener("beforeunload", () => {
  if (isFlashOn) turnFlashOff();
  if (isSOSActive) stopScreenFlash();
});
