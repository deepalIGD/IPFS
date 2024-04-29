const fs = require('fs');

// Generate JSON array with 10 entries
const data = [];
for (let i = 1; i <= 10000; i++) {
    data.push({
        "ABN": i,
        "USI": `S${i}`,
        "Family Name": `FName${i}`,
        "Given Name": `LName${i}`,
        "DOB": `1992/${i}`
    });
}

// Convert data array to JSON string
const jsonData = JSON.stringify(data, null, 2);

// Write JSON data to file
fs.writeFileSync('data.json', jsonData);

console.log('JSON data written to data.json file.');