// Function to access the camera and start the stream
async function startCamera() {
    statusMessage.textContent = 'Requesting back camera access...';

    // 🛑 UPDATED CONSTRAINTS 🛑
    const constraints = {
        video: {
            // Tells the browser to prioritize the back camera
            facingMode: { exact: "environment" } 
        }
    };
    // 🛑 END UPDATED CONSTRAINTS 🛑

    try {
        // ... rest of your code ...
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        // Success: Attach the stream to the video element
        video.srcObject = stream;
        statusMessage.textContent = 'Back camera stream started!';
        startButton.style.display = 'none'; 

    } catch (err) {
        // ... error handling code ...
        console.error('Error accessing media devices: ', err);
        // If the device doesn't have an environment-facing camera, 
        // the promise will reject with an OverconstrainedError.
        // We can try to fall back to the default camera in the catch block.
        if (err.name === 'OverconstrainedError') {
            statusMessage.textContent = 'ERROR: Environment camera not found or restricted. Falling back to default...';
            // You can optionally call startCamera with a less strict constraint here.
        } else {
             // ... other error handling ...
        }
    }
}