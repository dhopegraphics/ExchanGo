import { currentUser, users } from "./users";

export const tools = [
  {
    id: 1,
    toolName: "Adobe Photoshop",
    toolDetails:
      "A powerful software used for photo editing, graphic design, and digital art, widely used by professionals for creating visually appealing images.",
  },
  {
    id: 2,
    toolName: "Adobe Illustrator",
    toolDetails:
      "A vector graphics editor used by graphic designers to create logos, icons, illustrations, and other scalable vector artwork.",
  },
  {
    id: 3,
    toolName: "Figma",
    toolDetails:
      "A collaborative design tool used for creating user interfaces, wireframes, and prototypes, often used by UX/UI designers for teamwork.",
  },
  {
    id: 4,
    toolName: "Final Cut Pro",
    toolDetails:
      "A professional video editing software developed by Apple, used by video editors to create high-quality video content.",
  },
  {
    id: 5,
    toolName: "Adobe Premiere Pro",
    toolDetails:
      "A leading video editing software used by professionals for creating movies, TV shows, and web content.",
  },
  {
    id: 6,
    toolName: "DaVinci Resolve",
    toolDetails:
      "A video editing software that offers advanced features for color correction, visual effects, and professional audio post-production.",
  },
  {
    id: 7,
    toolName: "Sketch",
    toolDetails:
      "A vector-based design tool used by designers to create user interfaces and design systems, particularly popular in web and mobile design.",
  },
  {
    id: 8,
    toolName: "Canva",
    toolDetails:
      "A simplified graphic design platform used for creating social media graphics, presentations, posters, and other visual content.",
  },
  {
    id: 9,
    toolName: "Blender",
    toolDetails:
      "An open-source 3D computer graphics software used for creating animated films, visual effects, 3D models, and video games.",
  },
  {
    id: 10,
    toolName: "Adobe After Effects",
    toolDetails:
      "A motion graphics and visual effects software used by video editors to create animations, titles, and other special effects.",
  },
];

export const userTools = [
  {
    id: 1,
    userId: users[0].id,
    toolIds: [1, 3, 5, 4, 6], // User 0 uses Adobe Photoshop, Figma, and Adobe Premiere Pro
  },
  {
    id: 2,
    userId: users[1].id,
    toolIds: [2, 4, 6], // User 1 uses Adobe Illustrator, Final Cut Pro, and DaVinci Resolve
  },
  {
    id: 3,
    userId: users[2].id,
    toolIds: [3, 7, 8], // User 2 uses Figma, Sketch, and Canva
  },
  {
    id: 4,
    userId: users[3].id,
    toolIds: [1, 9, 10], // User 3 uses Adobe Photoshop, Blender, and Adobe After Effects
  },
  {
    id: 5,
    userId: currentUser.id,
    toolIds: [1, 3, 5, 4, 6],
  },
];

export const getUserTools = (userId) => {
  const userTool = userTools.find((tool) => tool.userId === userId);
  if (!userTool) return [];
  return userTool.toolIds.map((toolId) =>
    tools.find((tool) => tool.id === toolId)
  );
};
