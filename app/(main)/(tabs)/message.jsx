import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";

const contacts = [
  {
    id: "1",
    name: "Lori Anderson",
    phone: "1-(774)514-7528",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    name: "Eugene Willis",
    phone: "3-(046)015-0121",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "3",
    name: "Judy Gonzales",
    phone: "3-(046)015-0121",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "4",
    name: "Douglas Hill",
    phone: "3-(421)692-9472",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "5",
    name: "Emma Hart",
    phone: "3-(294)667-4878",
    image: "https://via.placeholder.com/50",
  },
  // Add more contacts as needed
];

const groups = [
  { id: "1", name: "Campsite Res...", image: "https://via.placeholder.com/50" },
  { id: "2", name: "Camping", image: "https://via.placeholder.com/50" },
  { id: "3", name: "Hawaii Trav...", image: "https://via.placeholder.com/50" },
  // Add more groups as needed
];

const ContactListScreen = () => {
  const [search, setSearch] = React.useState("");

  const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Image source={{ uri: item.image }} style={styles.contactImage} />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>Invite</Text>
      </TouchableOpacity>
    </View>
  );

  const renderGroupItem = ({ item }) => (
    <View style={styles.groupItem}>
      <Image source={{ uri: item.image }} style={styles.groupImage} />
      <Text style={styles.groupName}>{item.name}</Text>
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>Swap</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Members</Text>
      <Text style={styles.subHeader}>
        Select contacts to add to an existing Split or create a new one with
        them
      </Text>
      <SearchBar
        placeholder="Type a name or number"
        onChangeText={setSearch}
        value={search}
        lightTheme
        round
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
      />
      <FlatList
        data={groups}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id}
        horizontal
        style={styles.groupList}
      />
      <View style={{ paddingTop: -10 }}>
        <Text style={[styles.header]}>Contacts</Text>
      </View>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id}
        style={styles.contactList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  searchBarInput: {
    backgroundColor: "#e9e9e9",
  },
  groupList: {
    paddingBottom: 20,
  },
  groupItem: {
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  groupName: {
    marginBottom: 5,
    fontSize: 12,
    textAlign: "center",
  },
  contactList: {
    marginBottom: 90,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactPhone: {
    fontSize: 14,
    color: "#888",
  },
  inviteButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginBottom: 10,
  },
  inviteButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default ContactListScreen;
