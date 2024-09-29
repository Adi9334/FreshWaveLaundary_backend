const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./config/dbconfig.js');

// Import routes
const userRoutes = require('./routes/userRoutes.js');
const deleteuserRoutes = require('./routes/DeletedUsersRoutes.js');
const servicemasterRoutes = require('./routes/servicemaster_Routes.js');
const serviceitemmasterRoutes = require('./routes/serviceitemmaster_Routes.js');
const ordersRoutes = require('./routes/Orders_Routes.js');
const orderItemRoutes = require('./routes/order_item_Routes.js');
const addressRoutes = require('./routes/address_Routes.js');
const timeslotRoutes = require('./routes/Timeslot.js');
const faqRoutes = require('./routes/FQARoutes.js');
const userReviewRoutes = require('./routes/UserReviewRoutes.js');
const couponRoutes = require('./routes/CouponRoutes.js');
const pincodeRoutes = require('./routes/PincodeRoutes.js');
const { sendOTP, verifyOTP, resendOTP } = require('./controllers/AppOTP_Controller.js');
const uploadRoute = require('./routes/uploadRoutes.js');
const AppBannerRoutes = require('./routes/AppBannerRoutes.js');
const riderUserRoutes = require('./routes/riderUserRoutes.js');
const deleteriderUserRoutes = require('./routes/DeletedRiderUser.js');
const riderWalletRoutes = require('./routes/rider_wallet_routes.js'); // Updated name
const riderWalletTransactionsRoutes = require('./routes/rider_wallet_transactions_Route.js'); // Updated name

require('dotenv').config();
const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/laundry/apis', (req, res) => {
    res.send('Laundry APIs are available.');
});

app.use('/laundry/apis/RiderUser', riderUserRoutes);
app.use('/laundry/apis/DeleteRiderUser', deleteriderUserRoutes);
app.use('/laundry/apis/User', userRoutes);
app.use('/laundry/apis/DeleteUser', deleteuserRoutes);
app.use('/laundry/apis/Service', servicemasterRoutes);
app.use('/laundry/apis/Service/Item', serviceitemmasterRoutes);
app.use('/laundry/apis/Orders', ordersRoutes);
app.use('/laundry/apis/Order/Item', orderItemRoutes);
app.use('/laundry/apis/Address', addressRoutes);
app.use('/laundry/apis/Timeslot', timeslotRoutes);
app.use('/laundry/apis/FAQ', faqRoutes);
app.use('/laundry/apis/UserReview', userReviewRoutes);
app.use('/laundry/apis/Coupon', couponRoutes);
app.use('/laundry/apis/Pincode', pincodeRoutes);
app.use('/laundry/apis/Banner', AppBannerRoutes);
app.use('/laundry/apis/image', uploadRoute);
app.use('/laundry/apis/images', express.static('uploads'));

// Add new routes
app.use('/laundry/apis/rider_wallet', riderWalletRoutes);
app.use('/laundry/apis/rider_wallet_transactions', riderWalletTransactionsRoutes);

// OTP routes
app.post('/laundry/apis/send-otp', sendOTP);
app.post('/laundry/apis/verify-otp', verifyOTP);
app.post('/laundry/apis/resend-otp', resendOTP);

module.exports = app;
