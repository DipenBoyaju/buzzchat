import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import dotenv from 'dotenv';
import getUserDetailsFromToken from '../helpers/getUserDetailsFromToken.js';
import UserModel from '../models/User.model.js';
import { ConversationModel, MessageModel } from '../models/Conversation.model.js';
import getConversation from '../helpers/getConversation.js';

dotenv.config();
const app = express()

// socket connection
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ['https://buzzchat-two.vercel.app'],
    // origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

//online user
const onlineUser = new Set();

io.on('connection', async (socket) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    socket.emit('error', 'Authentication error: No token provided');
    return socket.disconnect();
  }

  const user = await getUserDetailsFromToken(token);
  if (!user || user.message === 'Token has expired') {
    socket.emit('error', 'Authentication error: Token expired');
    return socket.disconnect();
  }

  console.log('User connected:', user?._id);
  socket.join(user?._id.toString());
  onlineUser.add(user?._id?.toString());

  io.emit('onlineUser', Array.from(onlineUser));

  socket.on('message-page', async (userId) => {
    console.log("userId", userId);

    const userDetails = await UserModel.findById(userId).select("-password")

    const payload = {
      _id: userDetails?._id,
      name: userDetails?.name,
      email: userDetails?.email,
      profile_pic: userDetails?.profile_pic,
      online: onlineUser.has(userId)
    }

    socket.emit('message-page', payload)

    const getConversationMessage = await ConversationModel.findOne({
      "$or": [
        { sender: user?._id, receiver: userId },
        { sender: userId, receiver: user?._id }
      ]
    }).populate('messages').sort({ updatedAt: -1 })

    socket.emit('message', getConversationMessage?.messages || [])
  })

  //new message

  socket.on('new message', async (data) => {
    console.log('new message', data);
    let conversation = await ConversationModel.findOne({
      "$or": [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender }
      ]
    })

    if (!conversation) {
      const createConversation = await ConversationModel({
        sender: data?.sender,
        receiver: data?.receiver
      })
      conversation = await createConversation.save()
    }

    const message = new MessageModel({
      text: data?.text,
      imageUrl: data?.imageUrl,
      videoUrl: data?.videoUrl,
      msgByUserId: data?.msgByUserId
    })

    const saveMessage = await message.save()

    const updateConversation = await ConversationModel.updateOne(
      { _id: conversation?._id },
      { "$push": { messages: saveMessage?._id } }
    )

    const getConversationMessage = await ConversationModel.findOne({
      "$or": [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender }
      ]
    }).populate('messages').sort({ updatedAt: -1 })

    io.to(data?.sender).emit('message', getConversationMessage?.messages || [])
    io.to(data?.receiver).emit('message', getConversationMessage?.messages || [])

    const conversationSender = await getConversation(data?.sender)
    const conversationReceiver = await getConversation(data?.receiver)

    io.to(data?.sender).emit('conversation', conversationSender)
    io.to(data?.receiver).emit('conversation', conversationReceiver)

  })

  //sidebar
  socket.on('sidebar', async (currentUserId) => {
    console.log("curentuser", currentUserId);

    const conversation = await getConversation(currentUserId)
    socket.emit('conversation', conversation)
  })

  socket.on('seen', async (msgByUserId) => {
    let conversation = await ConversationModel.findOne({
      "$or": [
        { sender: user._id, receiver: msgByUserId },
        { sender: msgByUserId, receiver: user?._id }
      ]
    })

    const conversationMessageId = conversation?.messages || []

    const updateMessages = await MessageModel.updateMany(
      { _id: { "$in": conversationMessageId }, msgByUserId: msgByUserId },
      { "$set": { seen: true } }
    )

    const conversationSender = await getConversation(user?._id?.toString())
    const conversationReceiver = await getConversation(msgByUserId)

    io.to(user?._id?.toString()).emit('conversation', conversationSender)
    io.to(msgByUserId).emit('conversation', conversationReceiver)
  })

  //disconnect
  socket.on('disconnect', () => {
    onlineUser.delete(user?._id?.toString());
    console.log('User disconnected:', socket.id);

    io.emit('onlineUser', Array.from(onlineUser));
  });
});


export { app, server }