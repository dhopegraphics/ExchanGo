import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Client,
  Databases,
  Account,
  ID,
  Storage,
  Query,
} from "react-native-appwrite";

const AppwriteContext = createContext();

export const useAppwrite = () => useContext(AppwriteContext);

export const AppwriteProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Appwrite client setup
  const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

  const databases = new Databases(client);
  const account = new Account(client);
  const storage = new Storage(client);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setCurrentUser(user);
      } catch {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Fetch all users (requires admin privileges)
  const getAllUsers = async () => {
    try {
      const users = await account.list();
      if (!currentUser) return users; // fallback if currentUser not loaded
      // Filter out the current user
      const filteredUsers = {
        ...users,
        users: users.users.filter((user) => user.$id !== currentUser.$id),
      };
      return filteredUsers;
    } catch (error) {
      throw error;
    }
  };
  // Dynamic CRUD operations
  const createDocument = async (
    databaseId,
    collectionId,
    data,
    permissions = []
  ) => {
    try {
      const response = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        data,
        permissions
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateDocument = async (
    databaseId,
    collectionId,
    documentId,
    data,
    permissions = []
  ) => {
    try {
      const response = await databases.updateDocument(
        databaseId,
        collectionId,
        documentId,
        data,
        permissions
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const deleteDocument = async (databaseId, collectionId, documentId) => {
    try {
      await databases.deleteDocument(databaseId, collectionId, documentId);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const getDocuments = async (
    databaseId,
    collectionId,
    queries = [Query.limit(100)]
  ) => {
    try {
      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        queries
      );
      return response.documents;
    } catch (error) {
      throw error;
    }
  };

  // Storage helpers (optional)
  const uploadFile = async (bucketId, file, permissions = []) => {
    try {
      const response = await storage.createFile(
        bucketId,
        ID.unique(),
        file,
        permissions
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getFilePreview = async (bucketId, fileId) => {
    try {
      return storage.getFilePreviewURL(bucketId, fileId);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AppwriteContext.Provider
      value={{
        client,
        databases,
        account,
        storage,
        currentUser,
        loading,
        getAllUsers,
        createDocument,
        updateDocument,
        deleteDocument,
        getDocuments,
        uploadFile,
        getFilePreview,
      }}
    >
      {children}
    </AppwriteContext.Provider>
  );
};
