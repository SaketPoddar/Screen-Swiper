import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';

//CameraApp

const { width, height } = Dimensions.get('window');

const slides = [
  {
    title: 'Welcome to App!',
    message: 'The simplest and safest way to access your favorite app.',
    action: 'Next',
  },
  {
    title: 'The future is here',
    message:
      'The future is here—shaped by todays innovations and tomorrows possibilities.',
    action: 'Next',
  },
  {
    title: "Here's the great news",
    message:
      'The future holds endless possibilities, driven by innovation, creativity, and determination.',
    action: 'Get Started',
  },
];

export default function Example() {
  const [slide, setSlide] = useState(0);
  const swiper = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;

  const animatedBackgroundLeft = scrollX.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [1, 0, -1],
  });

  const contentOpacityRanges = Array.from({ length: slides.length }).reduce(
    (acc, _, index) => {
      const screenWidth = index * width;
      const screenWidthMiddle = screenWidth + width / 2;

      acc.inputRange.push(screenWidth, screenWidthMiddle);
      acc.outputRange.push(1, 0.2);

      return acc;
    },
    { inputRange: [], outputRange: [] },
  );
  const contentOpacity = scrollX.interpolate(contentOpacityRanges);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={{ left: animatedBackgroundLeft }}>
        <Image
          source={{ uri: 'https://assets.withfra.me/Landing.1.png' }}
          resizeMode="contain"
          style={styles.slideImage}
        />
      </Animated.View>
      <Swiper
        ref={swiper}
        showsPagination={false}
        loop={false}
        scrollEnabled={false}
        onIndexChanged={setSlide}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={1}>
        {slides.map((item, index) => (
          <Animated.View key={index} style={[styles.slide, { opacity: contentOpacity }]}> 
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideText}>{item.message}</Text>

            {/* Back Button */}
            {index > 0 && (
              <TouchableOpacity
                onPress={() => swiper.current.scrollTo(index - 1, true)}
                style={[styles.button, styles.backButton]}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}

            {/* Next Button */}
            <TouchableOpacity
              onPress={() => {
                if (index < slides.length - 1) {
                  swiper.current.scrollTo(index + 1, true);
                } else {
                  alert('Get Started Clicked!'); // Handle final action
                }
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>{item.action}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1f26',
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
    justifyContent: 'flex-end',
    paddingHorizontal: 36,
  },
  slideImage: {
    width: width * slides.length,
    height: 0.6 * height,
    position: 'absolute',
    top: 47,
    left: 0,
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  slideText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#a9b1cf',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1e5afb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 36,
    marginVertical: 16,
    alignSelf: 'center',
  },
  backButton: {
    backgroundColor: '#555', // Different color for Back button
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});

