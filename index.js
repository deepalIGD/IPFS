const Moralis = require("moralis").default;
const fs = require("fs");
const crypto = require('crypto');

require("dotenv").config();
/*
ABN, USI, Family Name, Given Name, and DOB 
*/

//take a hash of the data in data.json

// Read JSON data from file
fs.readFile('data.json', 'utf8', (err, jsonString) => {
    if (err) {
      console.log('Error reading file:', err);
      return;
    }
    
    try {
      // Parse JSON string to object
      const jsonData = JSON.parse(jsonString);
      
      // Stringify JSON object
      const jsonStringified = JSON.stringify(jsonData, null, 2);
      
      //console.log('JSON data:', jsonStringified);

      const hashedString = hashString(jsonStringified)  
      //upload the hash to ipfs
      console.log(hashedString);
      uploadToIpfs(hashedString);  

    } catch(err) {
      console.log('Error parsing JSON string:', err);
    }
  });



async function uploadToIpfs(hashedString){

    const fileUploads = [
        {
            path: "hashedEmployeedetails.json",
            content: hashedString
        }
      ]
    await Moralis.start({
        apiKey: process.env.MORALIS_KEY
    })

    const res = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: fileUploads
    })

    console.log(res.result)
}

// Function to hash a string using SHA-256
function hashString(inputString) {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
}

