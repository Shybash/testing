const express = require('express');
const router = express.Router();
const addOrUpdateCompanyDetails = require('../Controllers/InsertCompDetails');
const { getCompanyDetails } = require('../Controllers/getCmpDetails');
const { loginUser } = require('../Controllers/loginController');
const authenticateUser = require('../middleware/auth');
const { registerUser } = require('../Controllers/RegisterController');
const { insertAccountInformation } = require('../Controllers/InsertAccInfo');
const { insertBusinessInformation } = require('../Controllers/InsertBussInfo');
const { getCompanyName } = require('../Controllers/getCmpName');
const { insertBillingInformation } = require('../Controllers/InsertBilling');
const { final_review } = require('../Controllers/finalReview');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/company-details',authenticateUser, addOrUpdateCompanyDetails);
router.get('/getCmpDetails', authenticateUser, getCompanyDetails); 
router.post('/acc_info',authenticateUser ,insertAccountInformation);
router.get('/getCmpName',authenticateUser, getCompanyName);
router.post('/bill_info',authenticateUser,insertBillingInformation);
router.get('/final_review',authenticateUser,final_review)
module.exports = router;
