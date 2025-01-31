import React from 'react';
import { View, Dimensions, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';


const { width, height } = Dimensions.get('window');

const CarouselComponent = () => {
  const carouselItems = [
    { id: '1', image: require('../assets/BANNER S25.jpg') },
    { id: '2', image: require('../assets/samgg.jpg') },
    { id: '3', image: require('../assets/samggg.jpg') },
    { id: '4', image: require('../assets/s24.jpg') },
    { id: '5', image: require('../assets/camon30.jpg') },
    { id: '6', image: require('../assets/flip.jpg') },
    { id: '7', image: require('../assets/fold6.jpg') },
    { id: '8', image: require('../assets/fold256gb.jpg') },
    { id: '9', image: require('../assets/galaxy.jpeg') },
    { id: '10', image: require('../assets/itel.jpg') },
    { id: '11', image: require('../assets/note40.jpg') },
    { id: '12', image: require('../assets/smart9.jpg') },
    { id: '13', image: require('../assets/spark30.jpg') },
    { id: '14', image: require('../assets/vflip.jpg') },
    { id: '15', image: require('../assets/Pop9.jpg') },

  ];

  const handleShopNow = (title) => {
    console.log(`Shopping for ${title}`);
  };
  return (
    <View style={styles.container}>
    <Swiper
  style={styles.wrapper}
  autoplay
  autoplayTimeout={5}
  loop
  dotColor="transparent" // Makes the dots invisible
  activeDotColor="transparent" // Makes the active dot invisible
  removeClippedSubviews={false} // Improves performance on Android
>
  {carouselItems.map((item) => (
    <View key={item.id} style={styles.card}>
      <Image source={item.image} style={styles.image} />
    </View>
  ))}
</Swiper>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    height: 200,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 15,
  },
  shopButton: {
    backgroundColor: '#ff6347',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  buyButton: {
    backgroundColor: '#32cd32', // Green color for the "Buy Now" button
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CarouselComponent;
