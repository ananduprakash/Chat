import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

// Import route modules
import authRoutes from '#routes/authRoutes';
import messageRoutes from '#routes/messageRoutes';
import groupRoutes from '#routes/groupRoutes';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/groups', groupRoutes);

// Real-time communication setup
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (data) => {
    io.emit('message', data);  // Broadcast the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
