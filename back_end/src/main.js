const axios = require('axios');

const API_URL = 'http://localhost:3001/api/getFileContent';
const FILE_NAME = 'categories.csv';

async function testApi() {
    try {

        const response = await axios.get(API_URL, {
            headers: {
                'X-File-Name': FILE_NAME, 
                'Content-Type': 'application/json',
            },
        });

        console.log('Réponse de l\'API :');
        console.log(response.data);
    } 
    catch (error) 
    {
        console.error('Erreur lors de l\'appel à l\'API :');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

testApi();
