import fs from 'fs';

export const exportCSV = (data, fileNum) => {
    let csvContent = data.map(row => row.join(",")).join("\n");
    fs.writeFileSync(`./src/result-${fileNum}.csv`, csvContent, 'utf8');
}