import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const EventTimelineItem = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() =>
        Alert.alert(
          item.title,
          `Time: ${item.startTime} - ${item.endTime}\nStatus: ${item.status}\n\n${item.description}`
        )
      }
    >
      <View style={styles.timeBlock}>
        <Text style={styles.startTime}>{item.startTime}</Text>
        <Text style={styles.endTime}>{item.endTime}</Text>
      </View>
      <View style={styles.detailsBlock}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDescription}>
          {item.description.substring(0, 80)}...
        </Text>
        <Text style={[styles.eventStatus, styles[item.status]]}>
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 150, // Give some minimum height for consistency
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 150,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 5,
  },
  errorMessageDetail: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  notWorkingDaysContent: {
    fontSize: 18,
    color: "white", // Darker red for error/warning
    textAlign: "center",
    fontWeight: "bold",
  },
  noEventsText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  flatListContent: {
    paddingBottom: 20, // Space at the bottom of the list
  },
  eventItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  timeBlock: {
    width: 70, // Fixed width for time block
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#eee",
    paddingRight: 15,
  },
  startTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  endTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  detailsBlock: {
    flex: 1, // Take remaining space
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5,
  },
  eventStatus: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  // Status-specific styles
  completed: {
    color: "green",
  },
  pending: {
    color: "orange",
  },
  "in-progress": {
    color: "blue",
  },
});

export default EventTimelineItem;
