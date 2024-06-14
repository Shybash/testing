const connection = require('../config/db');

async function final_review(req, res) {
    const { id } = req.user;
    const userId = id;
    
    try {
        const sql = `
            SELECT 
                ai.phone AS account_mobilenumber, 
                ai.streetAddress1 AS account_streetAddress_1, 
                ai.streetAddress2 AS account_streetAddress_2,
                ai.city AS account_city, 
                ai.province AS account_province, 
                ai.country AS account_country, 
                ai.canadianResident AS canadianResident,
                ai.postalcode AS account_postalcode,
                bi.streetAddress1 AS business_streetAddress_1, 
                bi.streetAddress2 AS business_streetAddress_2, 
                bi.city AS business_city,
                bi.province AS business_province, 
                bi.country AS business_country, 
                bi.zipcode AS business_postalcode, 
                bi.cmp_type AS companyType,  
                bi.cmp_province AS businessProvince,
                bi.operateIn AS industry,
                bili.firstname AS billing_first_name, 
                bili.lastname AS billing_last_name, 
                bili.streetAddress1 AS billing_streetAddress_1,
                bili.streetAddress2 AS billing_streetAddress_2, 
                bili.city AS billing_city, 
                bili.region AS billing_province, 
                bili.country AS billing_country,
                bili.zipcode AS billing_postalcode
            FROM account_information ai
            LEFT JOIN business_information bi ON ai.user_id = bi.user_id
            LEFT JOIN billing_information bili ON ai.user_id = bili.user_id
            WHERE ai.user_id = ?
        `;
        
        connection.query(sql, [userId], (error, results) => {
            if (error) {
                console.error('Error fetching user information:', error);
                res.status(500).json({ error: 'Error fetching user information' });
            } else {
                if (results.length === 0) {
                    res.status(404).json({ error: 'User information not found' });
                } else {
                    // Log the results to inspect what data is being retrieved
                    console.log('Results:', results);
                    
                    // Send the first result as JSON response
                    res.json(results[0]);
                }
            }
        });
    } catch (err) {
        console.error('Error in final_review:', err);
        res.status(500).json({ error: 'Error fetching user information' });
    }
}

module.exports = {
    final_review
};
