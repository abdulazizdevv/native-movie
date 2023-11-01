import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

export default function Loader() {
	return (
		<AnimatedLoader
			visible={true}
			overlayColor='rgb(2,23,56,0.5)'
			source={require('../../assets/loading.json')}
			animationStyle={styles.lottie}
			speed={1}
		></AnimatedLoader>
	);
}

const styles = StyleSheet.create({
	lottie: {
		width: 100,
		height: 100,
	},
});