// DoctorListScreen.js
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Dummy Doctor Data (replace with actual fetched data if available)
const doctors = [
  {
    id: "ChIJ63EB39oAV0cRVRR0fUCInpA",
    name: "Medica",
    address: "Rudjera Boškovića 70, Kraljevo",
    phone_number: "+381 63 609544",
    rating: "4.2",
    url: "http://www.drivanovic.rs/",
    specialty: "General Practice, Family Medicine",
    services: [
      { id: "s1", name: "General Consultation", price: "25 EUR" },
      { id: "s2", name: "Blood Pressure Check", price: "10 EUR" },
      { id: "s3", name: "Vaccinations", price: "30 EUR" },
      { id: "s4", name: "Minor Wound Care", price: "40 EUR" },
    ],
  },
  {
    id: "ChIJw7W9G8IBV0cR2_6Wbwwa3Pc",
    name: "MedSana",
    address: "Jug Bogdanova 29, Kraljevo",
    phone_number: "+381 66 340444",
    rating: "4.5",
    url: "http://www.medsana.rs/",
    specialty: "Internal Medicine, Diagnostics",
    services: [
      { id: "s5", name: "Diagnostic Ultrasound", price: "70 EUR" },
      { id: "s6", name: "ECG", price: "35 EUR" },
      { id: "s7", name: "Lab Tests (Referral)", price: "Varies" },
      { id: "s8", name: "Chronic Disease Management", price: "50 EUR" },
    ],
  },
  {
    id: "ChIJ0c9yAfwAV0cRmiw6SJXVSI0",
    name: "MEDICUS-DR RADA SVS",
    address: "Ulica Heroja Maričića 78, Kraljevo",
    phone_number: "+381 36 335393",
    rating: "4",
    url: null, // No website provided
    specialty: "Dermatology, Cosmetology",
    services: [
      { id: "s9", name: "Skin Check", price: "30 EUR" },
      { id: "s10", name: "Mole Removal", price: "100 EUR" },
      { id: "s11", name: "Acne Treatment", price: "45 EUR" },
    ],
  },
  {
    id: "ChIJQzit0uIAV0cR2a0Y2WYkU58",
    name: "Pedijatrija Živković",
    address: "Olge Jovičić - Rite 26, Kraljevo",
    phone_number: "+381 36 338232",
    rating: "4.6",
    url: null,
    specialty: "Pediatrics",
    services: [
      { id: "s12", name: "Child Health Check-up", price: "30 EUR" },
      { id: "s13", name: "Pediatric Vaccinations", price: "35 EUR" },
      { id: "s14", name: "Childhood Illness Consultation", price: "25 EUR" },
    ],
  },
  {
    id: "ChIJh9t6CwABV0cRtfbMeAzL4uQ",
    name: "Grand Medic",
    address: "Ulica Heroja Maričića 47, Kraljevo",
    phone_number: "+381 66 8095555",
    rating: "5",
    url: null,
    specialty: "Cardiology, General Surgery",
    services: [
      { id: "s15", name: "Cardiology Consultation", price: "50 EUR" },
      { id: "s16", name: "Minor Surgical Procedures", price: "Varies" },
      { id: "s17", name: "Pre-operative Assessment", price: "60 EUR" },
    ],
  },
];

const DoctorListScreen = () => {
  const navigation = useNavigation();

  const renderDoctorItem = ({ item }) => (
    <TouchableOpacity
      style={styles.doctorCard}
      onPress={() =>
        navigation.navigate("components/DoctorServices", {
          doctorName: item.name,
          doctorServices: item.services, // Pass the services data
        })
      }
    >
      <View style={styles.cardHeader}>
        <Text style={styles.doctorName}>{item.name}</Text>
        {item.specialty && (
          <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
        )}
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.doctorAddress}>{item.address}</Text>
        <Text style={styles.doctorRating}>Rating: {item.rating} ⭐</Text>
      </View>
      <View style={styles.cardFooter}>
        {item.phone_number && (
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${item.phone_number}`)}
            style={styles.contactButton}
          >
            <Text style={styles.contactButtonText}>Call</Text>
          </TouchableOpacity>
        )}
        {item.url && (
          <TouchableOpacity
            onPress={() => Linking.openURL(item.url)}
            style={styles.contactButton}
          >
            <Text style={styles.contactButtonText}>Website</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={doctors}
        renderItem={renderDoctorItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingTop: 10,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  doctorCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1, // Allow name to take available space
    marginRight: 10,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#007AFF", // A distinct color for specialty
    fontWeight: "600",
  },
  cardBody: {
    marginBottom: 10,
  },
  doctorAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  doctorRating: {
    fontSize: 14,
    color: "#666",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end", // Align buttons to the right
    marginTop: 10,
  },
  contactButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10, // Space between buttons
  },
  contactButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default DoctorListScreen;
