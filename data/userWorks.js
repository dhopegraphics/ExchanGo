import { currentUser, users } from "./users";
import { imageDataURL } from "../constants/ImageData";
import { videoLinks } from "../constants/videoData";
export const UserWorksUpload = [
  {
    id: "1",
    uploaderId: users[7].id,
    uploadWork: imageDataURL[0],
    uploadedAt: "2024-10-01T22:29:00",
    type: "image",
  },
  {
    id: "2",
    uploaderId: users[8].id,
    uploadWork: imageDataURL[5],
    uploadedAt: "2024-08-01T22:20:00",
    type: "image",
  },
  {
    id: "3",
    uploaderId: users[0].id,
    uploadWork: imageDataURL[3],
    uploadedAt: "2024-09-01T22:29:00",
    type: "image",
  },
  {
    id: "4",
    uploaderId: users[1].id,
    uploadWork: imageDataURL[1],
    uploadedAt: "2024-10-01T22:20:00",
    type: "image",
  },
  {
    id: "5",
    uploaderId: users[7].id,
    uploadWork: imageDataURL[0],
    uploadedAt: "2024-10-03T09:29:00",
    type: "image",
  },
  {
    id: "6",
    uploaderId: users[8].id,
    uploadWork: imageDataURL[5],
    uploadedAt: "2024-10-01T08:20:00",
  },
  {
    id: "7",
    senderId: users[0].id,
    uploadWork: imageDataURL[8],
    uploadedAt: "2024-10-01T10:29:00",
    type: "image",
  },
  {
    id: "8",
    uploaderId: users[1].id,
    uploadWork: imageDataURL[9],
    uploadedAt: "2024-10-02T22:20:00",
    type: "image",
  },
  {
    id: "9",
    uploaderId: currentUser.id,
    uploadWork: imageDataURL[12],
    uploadedAt: "2024-10-03T22:29:00",
    type: "image",
  },
  {
    id: "10",
    uploaderId: currentUser.id,
    uploadWork: imageDataURL[14],
    uploadedAt: "2024-10-03T18:29:00",
    type: "image",
  },
  {
    id: "11",
    uploaderId: currentUser.id,
    uploadWork: imageDataURL[15],
    uploadedAt: "2024-10-03T17:29:00",
    type: "image",
  },
  {
    id: "12",
    uploaderId: currentUser.id,
    uploadWork: videoLinks[2],
    uploadedAt: "2024-10-01T22:20:00",
    type: "video",
    thumbnail: imageDataURL[7], // Thumbnail for video
  },
];
