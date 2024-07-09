let fs = require("fs");
let http = require("node:http");
let { parse } = require("node:querystring");
let server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let urlencoded = "application/x-www-form-urlencoded";
    if (req.headers["content-type"] === urlencoded) {
      let body = "";
      req.on("data", chunk => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
            const data = (body);
          return res.end(data);
        } catch (error) {
          console.log("error", error);
        }
      });
    }
  } else {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello World");
    } else if (req.url === "/form") {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.createReadStream("./main.html", "utf-8").pipe(res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  }
});

server.listen(5500, error => {
  if (error) {
    console.error("Server failed to start", error);
  } else {
    console.log(`Server running at http://localhost:5500`);
  }
});
