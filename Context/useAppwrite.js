import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Client,
  Databases,
  Account,
  ID,
  Storage,
  Query,
} from "react-native-appwrite";
import {
  usersDatabaseId,
  usersCollectionId,
} from "../constants/queryIdsExport";

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
        // 1. Get session user
        const user = await account.get();
        setCurrentUser(user);

        // 2. Find user document in collection
        const response = await databases.listDocuments(
          usersDatabaseId,
          usersCollectionId,
          [Query.equal("user_id", user.$id), Query.limit(1)]
        );
        // 3. If found, you can store this user document as well
        if (response.documents.length > 0) {
          // Optionally, set this in a separate state or Zustand store
          // For example, setCurrentUserDoc(response.documents[0]);
          // Or merge with currentUser if you want
          setCurrentUser({
            ...user,
            ...response.documents[0],
          });
        }
      } catch {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Fetch all users from the users collection and filter out the current user
  const getAllUsers = async () => {
    try {
      const response = await databases.listDocuments(
        usersDatabaseId,
        usersCollectionId,
        [Query.limit(1000)] // adjust limit as needed
      );
      if (!currentUser) return response; // fallback if currentUser not loaded
      // Filter out the current user by user_id
      const filteredUsers = {
        ...response,
        documents: response.documents.filter(
          (user) => user.user_id !== currentUser.$id
        ),
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
  const uploadFile = async (bucketId, file) => {
    try {
      const response = await storage.createFile(bucketId, ID.unique(), file);
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
