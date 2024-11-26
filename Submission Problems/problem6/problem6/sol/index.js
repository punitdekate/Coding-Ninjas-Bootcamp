// Please do not change the prewritten code
const Solution = async() => {
    // Write your code here
    const axios = require('axios');
    axios.get('https://api.codingninjas.com/api/v3/event_tags')
        .then(response => {
            // Handle response
            console.log(response.data);
        })
        .catch(err => {
            // Handle errors
            console.error(err);
        });
};
Solution();
module.exports = Solution;