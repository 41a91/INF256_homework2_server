import { Router } from "express";
import type { MESSAGE_TYPE } from "../types/chat.js";
import {
  addMessageToChat,
  addUserToChat,
  createNewChat,
  getChatById,
  getChatsForUser,
  getMessagesForChat,
} from "../controllers/message.js";
import { getUserById } from "../controllers/user.js";

const router = Router();

router.post("/send", async (req, res) => {
  const message: string | undefined = req.body.message;
  const messageType: MESSAGE_TYPE | undefined = req.body.messageType;
  const chatId: number | null = req.body.chatId
    ? parseInt(req.body.chatId)
    : null;

  if (message && messageType && chatId && req.user) {
    //Need to insert the new message and retreive the most up-to-date messages for the chat
    const inserted = await addMessageToChat(
      chatId,
      req.user.id,
      messageType,
      message,
      message,
    );
    if (inserted === -1) {
      const messageList = await getMessagesForChat(chatId);
      res.json({ status: "success", data: { messages: messageList } });
    } else {
      res.status(500).send("Something went wrong while adding a new message");
    }
  } else {
    res.status(400).send(`You must provide a message and the message type`);
  }
});

router.post("/create", async (req, res) => {
  const name: string | undefined = req.body.name;

  if (name && req.user) {
    //Need to create a new chat and add the user who created the chat into the chat
    const newChat = await createNewChat(name);
    if (newChat != null) {
      const addUser = await addUserToChat(newChat, req.user.id);
      if (addUser != null) {
        //res.json({ status: "success", data: { chatId: newChat } });
      } else {
        res
          .status(500)
          .send("SOmething went wrong when adding a user to a new chat");
      }
    } else {
      res.status(500).send("Something went wrong when creating a new chat");
    }
  } else {
    res.status(400).send("YOu must provide a valid chat name");
  }
});

router.post("/add", async (req, res) => {
  const userId: number | null = req.body.userId
    ? parseInt(req.body.userId)
    : null;
  const chatId: number | null = req.body.chatId
    ? parseInt(req.body.chatId)
    : null;

  if (userId && chatId) {
    const userExists = await getUserById(userId);
    const chatExists = await getChatById(chatId);
    if (userExists && chatExists) {
      const added = await addUserToChat(chatId, userId);
      if (added != null) {
        res.json({ status: "success", data: null });
      } else {
        res
          .status(500)
          .send("Something went wrong while adding a user to a chat");
      }
    } else {
      res.status(400).send("You must provide a valid user");
    }
  } else {
    res.status(400).send("You must provide a valid user");
  }
});

router.get("/", async (req, res) => {
  if (req.user) {
    const chats = await getChatsForUser(req.user.id);
    res.json({ status: "success", data: { chats } });
  } else {
    res.status(500).send("Somehow got past auth without setting user info");
  }
});

router.get("/messages", async (req, res) => {
  const chatId: number | null = req.query.chatId
    ? parseInt(req.query.chatId as string)
    : null;
  if (req.user && chatId) {
    const messages = await getMessagesForChat(chatId);
    res.json({ status: "success", data: { messages } });
  } else {
    res.status(400).send("You must provide a valid chat");
  }
});

export default router;
