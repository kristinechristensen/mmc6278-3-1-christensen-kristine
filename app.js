require('dotenv').config()
const express = require('express')
const app = express()

/**************************************************************** 
// TODO: import the getCityInfo and getJobs functions from util.js
**************************************************************** */
const {getJobs, getCityInfo} = require('./util');

/**************************************************************** 
// TODO: Statically serve the public folder
**************************************************************** */

app.use(express.static('public'));



/**************************************************************** 
// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return 
// the result as JSON.

// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)

// If no city info or jobs are found,
// the endpoint should return a 404 status
**************************************************************** */

app.route('/api/city/:city')
   .get(async (req, res)=> {
    
    //get city information from jobs & cityInfo
    const jobs = await getJobs(req.params.city);
    const cityInfo = await getCityInfo(req.params.city);

    //create object to store info
    const jobCityInfo = {jobs, cityInfo};

    
    //if no city info OR jobs are found - return a 404 error if job or city infor is  not available.
    
    if (jobs || cityInfo) {
        res.json(jobCityInfo)
    }
    else {
        res.status(404).json({error:'There is no job or city info available at this time. Check back later'})
    }
})

module.exports = app
