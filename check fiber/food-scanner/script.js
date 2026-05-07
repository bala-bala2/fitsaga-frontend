// Configuration placeholders
const CLARIFAI_API_KEY = 'YOUR_CLARIFAI_API_KEY';
const EDAMAM_APP_ID = 'YOUR_EDAMAM_APP_ID';
const EDAMAM_APP_KEY = 'YOUR_EDAMAM_APP_KEY';

// DOM Elements
const video = document.getElementById('videoElement');
const canvas = document.getElementById('canvasElement');
const scanBtn = document.getElementById('scanBtn');
const retryBtn = document.getElementById('retryBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');
const resultSection = document.getElementById('resultSection');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');

const foodNameTitle = document.getElementById('foodNameTitle');
const caloriesVal = document.getElementById('caloriesVal');
const proteinVal = document.getElementById('proteinVal');
const carbsVal = document.getElementById('carbsVal');
const fatVal = document.getElementById('fatVal');

// State
let stream = null;

// Initialize camera access
async function initCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' }, // Prefer back camera on mobile
            audio: false 
        });
        video.srcObject = stream;
    } catch (err) {
        console.error("Camera access error:", err);
        showError("Camera access denied. Please grant permission to use the camera.");
        scanBtn.disabled = true;
    }
}

// Capture frame from video and convert to optimized Base64
function captureImage() {
    // Resize image for optimization
    const TARGET_WIDTH = 500;
    const scale = TARGET_WIDTH / video.videoWidth;
    canvas.width = TARGET_WIDTH;
    canvas.height = video.videoHeight * scale;

    const ctx = canvas.getContext('2d');
    
    // Draw current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get base64 representation with JPEG compression
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    
    // Remove the data URI scheme prefix to get raw base64 string
    return dataUrl.split(',')[1];
}

// Call Clarifai API for food recognition
async function identifyFoodClarifai(base64Image) {
    const rawData = JSON.stringify({
        "user_app_id": {
            "user_id": "clarifai",
            "app_id": "main"
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "base64": base64Image
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + CLARIFAI_API_KEY,
            'Content-Type': 'application/json'
        },
        body: rawData
    };

    // Clarifai Food Item Recognition Model Version
    const MODEL_ID = 'food-item-recognition';
    const URL = `https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`;

    const response = await fetch(URL, requestOptions);
    
    if (!response.ok) {
        throw new Error('Failed to communicate with Food Recognition API.');
    }

    const data = await response.json();
    
    if (data.outputs && data.outputs[0] && data.outputs[0].data && data.outputs[0].data.concepts) {
        const concepts = data.outputs[0].data.concepts;
        if (concepts.length > 0) {
            // Return highest probability concept's name
            return concepts[0].name;
        }
    }
    
    throw new Error('No recognizable food detected in the image.');
}

// Call Edamam API to get nutrition info
async function getNutritionData(foodName) {
    // query "100g [food_name]" to get standard unit data
    const query = encodeURIComponent(`100g ${foodName}`);
    const url = `https://api.edamam.com/api/nutrition-data?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&nutrition-type=logging&ingr=${query}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Failed to fetch nutrition data.');
    }

    const data = await response.json();
    
    // If Edamam fails to find a match, it returns an empty totalNutrients object and 0 calories
    if (data.calories === 0 && Object.keys(data.totalNutrients).length === 0) {
        throw new Error(`Could not find nutrition info for "${foodName}". Try scanning again.`);
    }

    return {
        calories: Math.round(data.calories),
        protein: data.totalNutrients.PROCNT ? Math.round(data.totalNutrients.PROCNT.quantity) : 0,
        carbs: data.totalNutrients.CHOCDF ? Math.round(data.totalNutrients.CHOCDF.quantity) : 0,
        fat: data.totalNutrients.FAT ? Math.round(data.totalNutrients.FAT.quantity) : 0
    };
}

// UI State Management Functions
function showLoading(text) {
    loadingText.textContent = text;
    loadingOverlay.classList.remove('hidden');
    scanBtn.disabled = true;
    errorSection.classList.add('hidden');
    resultSection.classList.add('hidden');
}

function hideLoading() {
    loadingOverlay.classList.add('hidden');
    scanBtn.disabled = false;
}

function showError(msg) {
    errorMessage.textContent = msg;
    errorSection.classList.remove('hidden');
}

function showResults(foodName, nutrition) {
    foodNameTitle.textContent = `${foodName} (per 100g)`;
    caloriesVal.textContent = nutrition.calories;
    proteinVal.textContent = `${nutrition.protein}g`;
    carbsVal.textContent = `${nutrition.carbs}g`;
    fatVal.textContent = `${nutrition.fat}g`;
    
    resultSection.classList.remove('hidden');
}

// Main processing sequence
async function handleScan() {
    // Basic API Key validation
    if (CLARIFAI_API_KEY === 'YOUR_CLARIFAI_API_KEY') {
        showError("API keys are missing! Please configure Clarifai and Edamam API keys in script.js.");
        return;
    }

    try {
        errorSection.classList.add('hidden');
        
        // Step 1: Capture Image
        showLoading("Capturing image...");
        // brief delay for smooth UI feedback
        await new Promise(r => setTimeout(r, 100)); 
        const base64Image = captureImage();

        // Step 2: Identify Food
        showLoading("Identifying food...");
        const foodName = await identifyFoodClarifai(base64Image);

        // Step 3: Get Nutrition Data
        showLoading(`Analyzing ${foodName}...`);
        const nutrition = await getNutritionData(foodName);

        // Step 4: Display Results
        hideLoading();
        showResults(foodName, nutrition);
        
        // Toggle buttons
        scanBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');

    } catch (err) {
        console.error("Scan Process Error:", err);
        hideLoading();
        showError(err.message);
    }
}

// Reset UI for another scan
function resetScanner() {
    resultSection.classList.add('hidden');
    errorSection.classList.add('hidden');
    retryBtn.classList.add('hidden');
    scanBtn.classList.remove('hidden');
}

// Attach Event Listeners
scanBtn.addEventListener('click', handleScan);
retryBtn.addEventListener('click', resetScanner);

// Initialize camera right away
document.addEventListener('DOMContentLoaded', initCamera);
