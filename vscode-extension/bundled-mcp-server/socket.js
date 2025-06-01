// src/socket.ts
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
var channels = /* @__PURE__ */ new Map();
function handleConnection(ws) {
  console.log("New client connected");
  ws.send(JSON.stringify({
    type: "system",
    message: "Please join a channel to start chatting"
  }));
  ws.on("close", () => {
    console.log("Client disconnected");
    channels.forEach((clients, channelName) => {
      if (clients.has(ws)) {
        clients.delete(ws);
        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: "system",
              message: "A user has left the channel",
              channel: channelName
            }));
          }
        });
      }
    });
  });
  ws.on("message", (message) => {
    try {
      console.log("Received message from client:", message.toString());
      const data = JSON.parse(message.toString());
      if (data.type === "join") {
        const channelName = data.channel;
        if (!channelName || typeof channelName !== "string") {
          ws.send(JSON.stringify({
            type: "error",
            message: "Channel name is required"
          }));
          return;
        }
        if (!channels.has(channelName)) {
          channels.set(channelName, /* @__PURE__ */ new Set());
        }
        const channelClients = channels.get(channelName);
        channelClients.add(ws);
        ws.send(JSON.stringify({
          type: "system",
          message: `Joined channel: ${channelName}`,
          channel: channelName
        }));
        console.log("Sending message to client:", data.id);
        ws.send(JSON.stringify({
          type: "system",
          message: {
            id: data.id,
            result: "Connected to channel: " + channelName
          },
          channel: channelName
        }));
        channelClients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: "system",
              message: "A new user has joined the channel",
              channel: channelName
            }));
          }
        });
        return;
      }
      if (data.type === "message") {
        const channelName = data.channel;
        if (!channelName || typeof channelName !== "string") {
          ws.send(JSON.stringify({
            type: "error",
            message: "Channel name is required"
          }));
          return;
        }
        const channelClients = channels.get(channelName);
        if (!channelClients || !channelClients.has(ws)) {
          ws.send(JSON.stringify({
            type: "error",
            message: "You must join the channel first"
          }));
          return;
        }
        channelClients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            console.log("Broadcasting message to client:", data.message);
            client.send(JSON.stringify({
              type: "broadcast",
              message: data.message,
              sender: client === ws ? "You" : "User",
              channel: channelName
            }));
          }
        });
      }
    } catch (err) {
      console.error("Error handling message:", err);
    }
  });
}
var server = createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    });
    res.end();
    return;
  }
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain"
  });
  res.end("WebSocket server running");
});
var wss = new WebSocketServer({
  server,
  perMessageDeflate: false
});
wss.on("connection", handleConnection);
var PORT = process.env.FIGMA_WEBSOCKET_PORT ? parseInt(process.env.FIGMA_WEBSOCKET_PORT, 10) : 3055;
var HOST = process.env.FIGMA_WEBSOCKET_HOST || "localhost";
server.listen(PORT, HOST, () => {
  console.log(`WebSocket server started on host ${HOST} port ${PORT}`);
});
//# sourceMappingURL=socket.js.map