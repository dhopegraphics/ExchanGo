import { users } from "./users";
import { currentUser } from "./users";
export const receivedMessages = [
  {
    id: "1",
    senderId: users[0].id,
    receiverId: currentUser.id,
    message: "Hey! Let Me Know What Are You Doing ?",
    time: "2024-10-01T11:29:00",
  },
  {
    id: "2",
    senderId: users[1].id,
    receiverId: currentUser.id,
    message: "Not much, just relaxing.",
    time: "2024-10-01T22:29:00",
  },
  {
    id: "3",
    senderId: users[2].id,
    receiverId: currentUser.id,
    message: "I'm just working on a project!",
    time: "2024-10-01T22:43:00",
  },
  {
    id: "4",
    senderId: users[3].id,
    receiverId: currentUser.id,
    message: "Hey! Let Me Know What Are You Doing ?",
    time: "2024-10-01T22:43:00",
  },
  {
    id: "5",
    senderId: users[4].id,
    receiverId: currentUser.id,
    message: "I'm planning to go out later.",
    time: "2024-10-02T22:20:00",
  },
  {
    id: "6",
    senderId: users[0].id,
    receiverId: currentUser.id,
    message: "So , what's your plan for the day?",

    time: "2024-10-02T11:29:00",
  },
];

// Follow-up messages sent from "me"
export const sentMessages = [
  {
    id: "1",
    senderId: currentUser.id, // Replace "me" with currentUser.id,
    receiverId: users[0].id,
    message: "I'm working on a project too!",
    time: "2024-10-01T11:30:00", // Corresponding time after received message
  },
  {
    id: "2",
    senderId: currentUser.id, // Replace "me" with currentUser.id,
    receiverId: users[1].id,
    message: "Sounds nice! What are you relaxing with?",
    time: "2024-10-01T22:30:00", // Corresponding time after received message
  },
  {
    id: "3",
    senderId: currentUser.id, // Replace "me" with currentUser.id,
    receiverId: users[2].id,
    message: "What project are you working on?",
    time: "2024-10-01T22:45:00", // Corresponding time after received message
  },
  {
    id: "4",
    senderId: currentUser.id, // Replace "me" with currentUser.id,
    receiverId: users[3].id,
    message: "Just relaxing and enjoying the evening!",
    time: "2024-10-01T22:45:00", // Corresponding time after received message
  },
  {
    id: "5",
    senderId: currentUser.id, // Replace "me" with currentUser.id,
    receiverId: users[4].id,
    message: "That sounds great! Where are you planning to go?",
    time: "2024-10-02T22:25:00", // Corresponding time after received message
  },
  {
    id: "6",
    senderId: currentUser.id, // Replace "me" with currentUser.id,
    receiverId: users[0].id,
    message: "I'm planning to go to the beach",
    time: "2024-10-02T22:30:00",
  },
];
