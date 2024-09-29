
// Function to get the current timestamp
const now = () => {
    return new Date();
};

// Function to calculate expiry time (e.g., 5 minutes from now)
const opt_expire_at = () => {
    const expiryMinutes = 5; // Adjust this as per your application's requirements
    const now = new Date();
    now.setMinutes(now.getMinutes() + expiryMinutes);
    return now;
};

module.exports = {
    now,
    opt_expire_at
};
