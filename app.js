// Get references to the HTML elements
const video = document.getElementById('camera-feed');
const startButton = document.getElementById('start-button');
const statusMessage = document.getElementById('status-message');

// Function to access the camera and start the stream
async function startCamera() {
    statusMessage.textContent = 'Requesting camera access...';

    // Constraints object specifies the type of media we want
    const constraints = {
        video: true // We only want video, not audio (for now)
    };

    try {
        // Request access to the user's camera
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        // Success: Attach the stream to the video element
        video.srcObject = stream;
        statusMessage.textContent = 'Camera stream started!';
        startButton.style.display = 'none'; // Hide the button once started

    } catch (err) {
        // Failure: Handle errors (e.g., user denied access, no camera found)
        console.error('Error accessing media devices: ', err);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            statusMessage.textContent = 'ERROR: You denied camera access. Please refresh and try again.';
        } else if (err.name === 'NotFoundError') {
            statusMessage.textContent = 'ERROR: No camera device found on this system.';
        } else {
            statusMessage.textContent = `ERROR: ${err.name} - Could not start camera.`;
        }
    }
}

// Add event listener to the button
startButton.addEventListener('click', startCamera);

// Optional: Add some basic styling in the HTML file's <style> block
// to make the video element visible and centered.
// (You should copy this styling into your index.html <style> tag)
/*
#video-container {
    max-width: 80%;
    margin: 20px auto;
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
#camera-feed {
    width: 100%;
    height: auto;
    display: block;
}
*/