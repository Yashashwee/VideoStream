// Function to find the back camera and start the stream
async function startCamera() {
    statusMessage.textContent = 'Searching for back camera device...';

    // 1. Get a list of all available media devices
    const devices = await navigator.mediaDevices.enumerateDevices();
    
    // 2. Filter the list to find the video input devices
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    
    // 3. Try to find the back camera based on label or facingMode hint
    let backCamera = videoDevices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('environment')
    );

    // Fallback: If no clear 'back' camera is labeled, 
    // we assume the last device in the list might be the one, 
    // or we'll just use the first available one if the list is small.
    if (!backCamera && videoDevices.length > 0) {
        // As a simple heuristic, sometimes the second device (index 1) is the back camera
        backCamera = videoDevices[1] || videoDevices[0]; 
    }

    if (!backCamera) {
        statusMessage.textContent = 'ERROR: No video input devices found.';
        return;
    }

    statusMessage.textContent = `Found camera: ${backCamera.label}. Starting stream...`;

    // 4. Use the specific device ID in the constraints
    const constraints = {
        video: {
            // Request the specific device found
            deviceId: { exact: backCamera.deviceId }
        }
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        video.srcObject = stream;
        statusMessage.textContent = 'Target camera stream started!';
        startButton.style.display = 'none'; 

    } catch (err) {
        console.error('Error accessing specific camera: ', err);
        statusMessage.textContent = `ERROR: Failed to start camera (${err.name}).`;
    }
}