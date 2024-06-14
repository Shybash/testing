const express = require('express');
const router = express.Router();
const addOrUpdateCompanyDetails = require('../Controllers/InsertCompDetails');
const { getCompanyDetails } = require('../Controllers/getCmpDetails');
const { loginUser } = require('../Controllers/loginController');
const authenticateUser = require('../middleware/auth');
const { registerUser } = require('../Controllers/RegisterController');
const { insertAccountInformation } = require('../Controllers/InsertAccInfo');
const { InsertBussInfo } = require('../Controllers/InsertBussInfo');
const { getCompanyName } = require('../Controllers/getCmpName');
const { insertBillingInformation } = require('../Controllers/InsertBilling');
const { final_review } = require('../Controllers/finalReview');
const { updateCompanyDetails } = require('../Controllers/updateCmp');

//get router
router.get('/getCmpDetails', authenticateUser, getCompanyDetails); 
router.get('/getName',authenticateUser, getCompanyName);


//post router
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/company-details',authenticateUser, addOrUpdateCompanyDetails);
router.post('/acc_info',authenticateUser,insertAccountInformation);
router.post('/buss_info',authenticateUser,InsertBussInfo);
router.post('/bill_info',authenticateUser,insertBillingInformation);
router.put('/update',authenticateUser,updateCompanyDetails);
router.get('/final_review',authenticateUser,final_review);
module.exports = router;
