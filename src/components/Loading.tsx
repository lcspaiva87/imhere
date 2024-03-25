import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
export function Loading() {
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  return (
    <View  className='items-center'>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,

        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/Animation.json')}
      />

    </View>
  );
}


