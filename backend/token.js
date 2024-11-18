const jwt = require('jsonwebtoken');

// Secret key for signing tokens (keep this secret and do not hardcode it)
const SECRET_KEY = "your_secret_key"; // Replace with a secure key or use environment variables

// Function to generate a JWT token
function generateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Function to verify a JWT token
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (err) {
        console.error("Token verification failed:", err);
        return null;
    }
}

// Usage example:

// Create a token
const payload = { userId: 123, username: "exampleUser" };
const token = generateToken(payload);

console.log("Generated Token:", token);

// Verify the token
const decodedData = verifyToken(token);
console.log("Decoded Data:", decodedData);
