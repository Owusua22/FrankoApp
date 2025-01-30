import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ActivityIndicator, Image, Easing} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import CartScreen from './screens/CartScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import AccountScreen from './screens/AccountScreen';
import CategoryScreen from './screens/CategoryScreen';
import BrandScreen from './screens/BrandScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import OrderReceivedScreen from './screens/OrderReceivedScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProductsScreen from './screens/ProductsScreen';
import AboutScreen from './screens/AboutScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import PolicyScreen from './screens/PolicyScreen';
import PaymentGatewayScreen from './screens/PaymentGatewayScreen';
import OrderPlacedScreen from './screens/OrderPlacedScreen';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './redux/slice/productSlice';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const WelcomeScreen = ({ onReady }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        new Promise((resolve) => setTimeout(resolve)), // Simulated delay
        dispatch(fetchProducts()) // Fetch products
      ]);

      setLoading(false);
      onReady(); // Navigate to the home screen
    };

    fetchData();
  }, [dispatch, onReady]);

  return (
    <View style={styles.welcomeContainer}>
      <Image
        source={require('./assets/frankoIcon.png')} // Replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome to Franko Trading Ent!</Text>
      {loading && <ActivityIndicator size="large" color="#e63946" />}
    </View>
  );
};


const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreenWithFooter} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="cart" component={CartScreenWithFooter} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="SignIn" component={LoginScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Category" component={CategoryScreenWithFooter} />
      <Stack.Screen name="Account" component={AccountScreenWithFooter} />
      <Stack.Screen name="Brands" component={BrandScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreenWithFooter} />
      <Stack.Screen name="OrderReceivedScreen" component={OrderReceivedScreen} />
      <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} />
      <Stack.Screen name="Products" component={ProductsScreenWithFooter} />
      <Stack.Screen name="PaymentGatewayScreen" component={PaymentGatewayScreen} />
      <Stack.Screen name = "OrderPlacedScreen" component={OrderPlacedScreen}/>
    </Stack.Navigator>
  );
};

const isCartEnabled = false;
const AppDrawer = () => (



  <Drawer.Navigator
  screenOptions={{
    drawerType: 'front',
    headerShown: false,
    swipeEdgeWidth: 50,
    drawerStyle: {
      width: '50%',
      backgroundColor: '#ffffff',
    },
    animation: 'slide',
  }}
>
  <Drawer.Screen name="home" component={AppStack} />
  {isCartEnabled && <Drawer.Screen name="cart" component={CartScreen} />}
  <Drawer.Screen name="Orders" component={OrderHistoryScreen} />
  <Drawer.Screen name="About" component={AboutScreen} />
  <Drawer.Screen name="Contact" component={ContactUsScreen} />
  <Drawer.Screen name="Terms" component={PolicyScreen} />
</Drawer.Navigator>

  
);

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleReady = () => setShowWelcome(false);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          {showWelcome ? (
            <WelcomeScreen onReady={handleReady} />
          ) : (
            <>
              <Header />
              <View style={styles.contentContainer}>
                <AppDrawer />
              </View>
            </>
          )}
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

// Higher-order components to include Footer with screens
const HomeScreenWithFooter = () => (
  <>
    <HomeScreen />
    <Footer />
  </>
);

const CategoryScreenWithFooter = () => (
  <>
    <CategoryScreen />
    <Footer />
  </>
);

const AccountScreenWithFooter = () => (
  <>
    <AccountScreen />
    <Footer />
  </>
);

const ProductsScreenWithFooter = () => (
  <>
    <ProductsScreen />
    <Footer />
  </>
);

const NotificationsScreenWithFooter = () => (
  <>
    <NotificationsScreen />
    <Footer />
  </>
);
const CartScreenWithFooter = () => (
  <>
    <CartScreen />
    <Footer />
  </>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  contentContainer: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 170,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
});
