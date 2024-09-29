const configDotenv = require('dotenv');
const { connectDB } = require('./config/dbconfig');
const app = require('./app');

configDotenv.config({
    path: './.env'
});

connectDB()
    .then(() => {
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((e) => {
        console.log("DB connection failed", e);
    });
