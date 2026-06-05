import http from 'http';

http.get('http://127.0.0.1:3000/api/pages', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log(parsed.slice(0, 2));
    } catch(e) { console.log(data.slice(0,500)) }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
