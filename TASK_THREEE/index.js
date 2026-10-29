const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const PORT = 5001;
const usersPath = path.join(__dirname, "data", "users.json");

function sendResponse(res, statusCode, contentType, data) {
  res.writeHead(statusCode, {
    "Content-Type": contentType,
  });
  res.end(data);
}

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  if (url === "/users" && method === "GET") {
    try {
      const data = await fs.readFile(usersPath, "utf8");
      sendResponse(res, 200, "application/json", data);
    } catch (error) {
      sendResponse(res, 500, "text/plain", "Internal Server Error");
    }
    return;
  }

  else if (url === "/signup" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const user = JSON.parse(body);

        if (!user.name || !user.email || !user.password) {
          sendResponse(res, 400, "text/plain", "All fields must be filled");
          return;
        }

        const data = await fs.readFile(usersPath, "utf8");
        const users = JSON.parse(data);

        const isFound = users.find((u) => u.email === user.email);
        if (isFound) {
          sendResponse(res, 409, "text/plain", "the user is altready existed");
        }

        users.push(user);

        await fs.writeFile(usersPath, JSON.stringify(users));

        sendResponse(
          res,
          201,
          "application/json",
          JSON.stringify({
            message: "User created",
            user: user,
          }),
        );
      } catch (error) {
        sendResponse(res, 400, "text/plain", "Invalid request");
      }
    });

    return;
  }
  else{
    sendResponse(res , 404 , "text/plain", "not found ")
  }


  sendResponse(res, 404, "text/plain", "Not Found");
});

server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
