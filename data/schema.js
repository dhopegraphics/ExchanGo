export const setupDatabase = async (db) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      profileImage TEXT,
      email TEXT NOT NULL,
      bio TEXT,
      featured INTEGER DEFAULT 0
    );
    
    CREATE TABLE IF NOT EXISTS communities (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      profileImage TEXT,
      bio TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      createdBy TEXT NOT NULL,
      FOREIGN KEY (createdBy) REFERENCES users(id)
    );
    
    CREATE TABLE IF NOT EXISTS joined_communities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      communityId INTEGER NOT NULL,
      userId TEXT NOT NULL,
      FOREIGN KEY (communityId) REFERENCES communities(id),
      FOREIGN KEY (userId) REFERENCES users(id),
      UNIQUE(communityId, userId)
    );
  `);
};

export const migrateInitialData = async (db) => {
  // Check if we've already migrated
  const { count } = await db.getFirstAsync(
    "SELECT COUNT(*) as count FROM users"
  );
  if (count > 0) return;

  // Insert users
  await db.execAsync(`
    INSERT INTO users (id, name, profileImage, email, bio, featured)
    VALUES 
      ('user123', 'Abin', 'https://example.com/image1.jpg', 'abin@example.com', 'I am a software developer', 0),
      ('user456', 'Sarah Lee', 'https://example.com/image2.jpg', 'sarah@example.com', 'I am a graphic designer', 1),
      ('user789', 'Mike Chen', 'https://example.com/image3.jpg', 'mike@example.com', 'I am a web developer', 0),
      ('user101', 'Jane Smith', 'https://example.com/image4.jpg', 'jane@example.com', 'I am a digital marketer', 1),
      ('user202', 'Alex Johnson', 'https://example.com/image5.jpg', 'alex@example.com', 'I am a music producer', 0),
      ('user303', 'Emily White', 'https://example.com/image6.jpg', 'emily@example.com', 'I am a film maker', 1),
      ('user404', 'David Green', 'https://example.com/image7.jpg', 'david@example.com', 'I am an animator', 0),
      ('user505', 'Sophia Lee', 'https://example.com/image8.jpg', 'sophia@example.com', 'I am a photographer', 1),
      ('user606', 'James Brown', 'https://example.com/image9.jpg', 'james@example.com', 'I am a writer', 0),
      ('user707', 'Olivia Davis', 'https://example.com/image10.jpg', 'olivia@example.com', 'I am a software developer', 0),
      ('user808', 'Ethan Wilson', 'https://example.com/image11.jpg', 'ethan@example.com', 'I am a graphic designer', 0),
      ('user909', 'Mia Johnson', 'https://example.com/image12.jpg', 'mia@example.com', 'I am a digital marketer', 0),
      ('user1010', 'Noah Lee', 'https://example.com/image13.jpg', 'noah@example.com', 'I am a software developer', 0),
      ('user1111', 'Liam Davis', 'https://example.com/image14.jpg', 'liam@example.com', 'I am a graphic designer', 0),
      ('user1212', 'Ava Martinez', 'https://example.com/image15.jpg', 'ava@example.com', 'I am a writer', 0),
      ('user1313', 'Mason Rodriguez', 'https://example.com/image16.jpg', 'mason@example.com', 'I am a software developer', 0),
      ('user1414', 'Ella Garcia', 'https://example.com/image17.jpg', 'ella@example.com', 'I am a graphic designer', 0),
      ('user1515', 'Liam Hernandez', 'https://example.com/image18.jpg', 'liam@example.com', 'I am a digital marketer', 0),
      ('user1616', 'Ava Kim', 'https://example.com/image19.jpg', 'ava@example.com', 'I am a software developer', 0),
      ('user1717', 'Mason Rodriguez', 'https://example.com/image20.jpg', 'mason@example.com', 'I am a graphic designer', 0),
      ('user1818', 'Ella Garcia', 'https://example.com/image21.jpg', 'ella@example.com', 'I am a digital marketer', 0),
      ('user1919', 'Liam Hernandez', 'https://example.com/image22.jpg', 'liam@example.com', 'I am a software developer', 0),
      ('dhopeIsaac', 'Isaac Mensah', 'https://example.com/image23.jpg', 'isaac.mensah@company.com', 'I am a software developer', 0);
  `);

  // Insert communities
  await db.execAsync(`
    INSERT INTO communities (id, name, profileImage, bio, createdAt, updatedAt, createdBy)
    VALUES
      (1, 'Graphic Design Community', 'https://example.com/community1.jpg', 'Unleash your creativity and explore the world of visual communication with fellow graphic design enthusiasts.', '2025-03-30T03:35:00Z', '2025-03-30T03:35:00Z', 'user123'),
      (2, 'Web Development Community', 'https://example.com/community2.jpg', 'Connect with developers, share coding tips, and stay up-to-date with the latest web technologies and best practices.', '2024-02-14T00:00:00Z', '2024-02-14T00:00:00Z', 'user456'),
      (3, 'Digital Marketing Community', 'https://example.com/community3.jpg', 'Discover the latest trends in digital marketing, share strategies, and network with marketing professionals from around the world.', '2024-08-14T00:00:00Z', '2024-08-14T00:00:00Z', 'user789'),
      (4, 'Music Production Community', 'https://example.com/community4.jpg', 'Collaborate with fellow musicians, share your tracks, and learn about the latest music production techniques and equipment.', '2024-03-14T00:00:00Z', '2024-03-14T00:00:00Z', 'user101'),
      (5, 'Film Making Community', 'https://example.com/community5.jpg', 'From screenwriting to post-production, join fellow filmmakers to discuss all aspects of the cinematic arts and showcase your work.', '2024-02-14T00:00:00Z', '2024-02-14T00:00:00Z', 'user202'),
      (6, 'Animation Community', 'https://example.com/community6.jpg', 'Bring your characters to life! Share animation techniques, discuss industry trends, and connect with fellow animators.', '2024-07-14T00:00:00Z', '2024-07-14T00:00:00Z', 'user303'),
      (7, 'Language Learning Community', 'https://example.com/community7.jpg', 'Embark on a linguistic journey! Practice with native speakers, share learning resources, and celebrate cultural diversity.', '2024-05-18T00:00:00Z', '2024-05-18T00:00:00Z', 'user789'),
      (8, 'Architecture Community', 'https://example.com/community8.jpg', 'Explore innovative designs, discuss sustainable building practices, and network with architects and enthusiasts worldwide.', '2024-05-18T00:00:00Z', '2024-05-18T00:00:00Z', 'user101'),
      (9, 'Illustration Community', 'https://example.com/community9.jpg', 'Showcase your artwork, get inspired by fellow illustrators, and discuss various illustration techniques and styles.', '2024-02-14T00:00:00Z', '2024-02-14T00:00:00Z', 'user202'),
      (10, 'Fitness Community', 'https://example.com/community10.jpg', 'Achieve your fitness goals together! Share workout tips, nutrition advice, and motivate each other to stay healthy and active.', '2024-02-14T00:00:00Z', '2024-02-14T00:00:00Z', 'user303'),
      (11, 'Cooking Community', 'https://example.com/community11.jpg', 'Explore culinary delights from around the world! Share recipes, cooking techniques, and food photography with fellow foodies.', '2024-02-14T00:00:00Z', '2024-02-14T00:00:00Z', 'user789'),
      (12, 'Travel Community', 'https://example.com/community12.jpg', 'Embark on virtual journeys, share travel stories, and get insider tips for your next adventure from fellow globetrotters.', '2024-02-14T00:00:00Z', '2024-02-14T00:00:00Z', 'user101'),
      (13, 'Photography Community', 'https://example.com/community13.jpg', 'Capture the world through your lens! Share your best shots, discuss photography techniques, and get inspired by stunning visuals.', '2024-02-14T00:00:00Z', '2024-02-14T00:00:00Z', 'user202'),
      (14, 'UI Design Community', 'https://example.com/community14.jpg', 'Create beautiful and intuitive interfaces! Discuss design trends, share resources, and get feedback on your UI projects.', '2024-02-14T00:00:00Z', '2024-02-14T00:00:00Z', 'user303'),
      (15, 'UX Design Community', 'https://example.com/community15.jpg', 'Enhance user experiences through thoughtful design. Share UX research, discuss methodologies, and solve design challenges together.', '2024-02-14T00:00:00Z', '2024-02-14T00:00:00Z', 'user1010'),
      (16, 'Data Science Community', 'https://example.com/community16.jpg', 'Dive into the world of data! Discuss machine learning, share analysis techniques, and explore the latest trends in data science.', '2024-02-14T00:00:00Z', '2024-02-14T00:00:00Z', 'user606'),
      (17, 'Blockchain Community', 'https://example.com/community17.jpg', 'Explore the revolutionary world of blockchain technology, discuss cryptocurrencies, and network with industry experts.', '2024-02-14T00:00:00Z', '2024-02-14T00:00:00Z', 'user404');
  `);

  // Insert joined communities
  await db.execAsync(`
    INSERT INTO joined_communities (communityId, userId)
    VALUES
      (1, 'user123'), (1, 'user456'), (1, 'user789'),
      (2, 'user101'), (2, 'user202'),
      (3, 'user303'), (3, 'user404'), (3, 'user505'),
      (4, 'user789'), (4, 'user101'), (4, 'user456'),
      (5, 'user101'), (5, 'user505'), (5, 'user404'), (5, 'user303'),
      (6, 'user303'), (6, 'user404'), (6, 'user505'),
      (7, 'user606'), (7, 'user707'), (7, 'user808'),
      (8, 'user456'), (8, 'user1010'), (8, 'user101'),
      (9, 'user202'), (9, 'user303'), (9, 'user404'),
      (10, 'user808'), (10, 'user909'), (10, 'user1010'), (10, 'user1111'),
      (11, 'user707'), (11, 'user101'), (11, 'user456'),
      (12, 'user789'), (12, 'user101'), (12, 'user202'),
      (13, 'user101'), (13, 'user202'), (13, 'user303'),
      (14, 'user505'), (14, 'user606'), (14, 'user707'),
      (15, 'user808'), (15, 'user707'), (15, 'user808'),
      (16, 'user1010'), (16, 'user1111'), (16, 'user1717'),
      (17, 'user1616'), (17, 'user1313'), (17, 'user1414');
  `);
};
