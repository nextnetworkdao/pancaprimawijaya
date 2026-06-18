const fs = require('fs');
let content = fs.readFileSync('src/pages/public/Home.tsx', 'utf8');
content = content.replace(/#ee4d2d/g, '#16a34a');
content = content.replace(/#d73f22/g, '#15803d');
content = content.replace(/#ffbdae/g, '#bbf7d0');
content = content.replace(/text-red-50/g, 'text-green-50');
content = content.replace(/text-red-100/g, 'text-green-100');
fs.writeFileSync('src/pages/public/Home.tsx', content);
