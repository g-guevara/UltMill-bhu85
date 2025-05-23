import React, { useEffect, useState } from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

// Interfaz para el usuario
interface User {
  _id: string;
  userID: string;
  name: string;
  email: string;
  language: string;
  trialPeriodDays: number;
}

// Interfaz para categorías
interface Category {
  id: string;
  name: string;
}

// Interfaz para productos
interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  backgroundColor: string;
}

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const params = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Datos de ejemplo para categorías
  const categories: Category[] = [
    { id: "all", name: "All" },
    { id: "smartphones", name: "Smartphones" },
    { id: "headphones", name: "Headphones" },
    { id: "laptops", name: "Laptops" },
    { id: "tablets", name: "Tablets" },
    { id: "watches", name: "Watches" }
  ];

  // Datos de ejemplo para productos
  const products: Product[] = [
  { id: "1", name: "AirPods", price: 132.00, rating: 4.9, backgroundColor: "#e0ccff" },
  { id: "2", name: "MacBook Air 13", price: 1100.00, rating: 5.0, backgroundColor: "#FFE4E1" },
  { id: "3", name: "Gaming Mouse", price: 45.99, rating: 4.7, backgroundColor: "#98FB98" },
  { id: "4", name: "iPhone 14 Pro", price: 999.00, rating: 4.8, backgroundColor: "#E6E6FA" },
  { id: "5", name: "Smart Watch", price: 249.99, rating: 4.6, backgroundColor: "#ADD8E6" },
  { id: "6", name: "Bluetooth Speaker", price: 79.99, rating: 4.5, backgroundColor: "#FFA07A" },
  { id: "7", name: "Wireless Headphones", price: 159.99, rating: 4.7, backgroundColor: "#D8BFD8" },
  { id: "8", name: "Tablet Pro", price: 599.99, rating: 4.8, backgroundColor: "#87CEFA" },
  { id: "9", name: "4K Monitor", price: 349.99, rating: 4.5, backgroundColor: "#FAFAD2" },
  { id: "10", name: "Mechanical Keyboard", price: 129.99, rating: 4.6, backgroundColor: "#F0E68C" },
  { id: "11", name: "External SSD 1TB", price: 149.99, rating: 4.9, backgroundColor: "#C0C0C0" },
  { id: "12", name: "Wireless Charger", price: 39.99, rating: 4.3, backgroundColor: "#FFB6C1" },
  { id: "13", name: "Smartphone Stand", price: 19.99, rating: 4.2, backgroundColor: "#FFDAB9" },
  { id: "14", name: "Noise Canceling Earbuds", price: 189.99, rating: 4.7, backgroundColor: "#AFEEEE" },
  { id: "15", name: "Smart Home Hub", price: 99.99, rating: 4.5, backgroundColor: "#B0E0E6" },
  { id: "16", name: "Fitness Tracker", price: 89.99, rating: 4.4, backgroundColor: "#FAF0E6" },
  { id: "17", name: "Portable Power Bank", price: 49.99, rating: 4.6, backgroundColor: "#EEE8AA" },
  { id: "18", name: "USB-C Hub", price: 59.99, rating: 4.3, backgroundColor: "#F5DEB3" },
  { id: "19", name: "Webcam HD", price: 69.99, rating: 4.4, backgroundColor: "#E0FFFF" },
  { id: "20", name: "Gaming Headset", price: 79.99, rating: 4.5, backgroundColor: "#E6E6FA" },
  { id: "21", name: "Smart Thermostat", price: 119.99, rating: 4.7, backgroundColor: "#FFFACD" },
  { id: "22", name: "Digital Drawing Tablet", price: 199.99, rating: 4.8, backgroundColor: "#F0FFF0" },
  { id: "23", name: "Wireless Ergonomic Mouse", price: 59.99, rating: 4.5, backgroundColor: "#FFF0F5" },
  { id: "24", name: "Portable Bluetooth Printer", price: 129.99, rating: 4.2, backgroundColor: "#F0FFFF" },
  { id: "25", name: "Smartphone Gimbal", price: 89.99, rating: 4.6, backgroundColor: "#F5F5DC" },
  { id: "26", name: "True Wireless Earbuds", price: 99.99, rating: 4.7, backgroundColor: "#E6E6FA" },
  { id: "27", name: "Mini Projector", price: 199.99, rating: 4.3, backgroundColor: "#FFF5EE" },
  { id: "28", name: "Smart Doorbell", price: 149.99, rating: 4.5, backgroundColor: "#F0F8FF" },
  { id: "29", name: "Wireless Security Camera", price: 89.99, rating: 4.4, backgroundColor: "#F8F8FF" },
  { id: "30", name: "Smart Light Bulbs (4 Pack)", price: 49.99, rating: 4.6, backgroundColor: "#FFFAF0" }
  ];
  




  const renderCategoryItem = ({item}: {item: Category}) => (
    <TouchableOpacity 
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text 
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const handleProductPress = (product: Product) => {
router.push({
  pathname: "/screens/ProductDetailiScreen",
  params: { productData: JSON.stringify(product) }
});
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>

      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}></Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>

        {/* Sales Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Clearance{"\n"}Sales</Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Up to 50%</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              style={[
                styles.productItem, 
                { backgroundColor: product.backgroundColor }
              ]}
              onPress={() => handleProductPress(product)}
            >
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.starIcon}>⭐</Text>
                  <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}

    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const productWidth = (width - 40) / 2; // 40 = padding (20) * 2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 43,
    fontWeight: "bold",
    color: "#333",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15,
    position: "relative",
  },
  iconText: {
    fontSize: 22,
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#00C853",
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0", // Changed from "#fff" to gray
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  bannerContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  banner: {
    backgroundColor: "#00C853",
    borderRadius: 12,
    padding: 15,
    height: 100,
  },
  bannerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  bannerButton: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bannerButtonText: {
    color: "#00C853",
    fontWeight: "bold",
  },
  categoriesSection: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    color: "#00C853",
    fontSize: 14,
  },
  categoriesList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  categoryItem: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#eee",
  },
  selectedCategoryItem: {
    backgroundColor: "#00C853",
    borderColor: "#00C853",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  selectedCategoryText: {
    color: "white",
    fontWeight: "bold",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginHorizontal:8,
    marginBottom: 80, // Extra space for bottom navigation
  },
  productItem: {
    width: productWidth,
    height: 150,
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    justifyContent: "flex-end",
  },
  productInfo: {
    marginTop: "auto",
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    fontSize: 14,
  },
  ratingText: {
    marginLeft: 3,
    fontSize: 14,
    color: "#666",
  },
  bottomNav: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    height: 60,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  navText: {
    fontSize: 12,
    color: "#999",
    marginTop: 3,
  },
  activeNavText: {
    color: "#00C853",
  },
});