import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, Button, StatusBar } from 'react-native'

import { Beacon } from 'react-native-help-scout'

const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: 'black',
		flex: 1,
	},
	contactUsButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: '#083751',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 20,
		right: 20,
	},
	contactUsText: {
		fontSize: 25,
		paddingLeft: 2,
	},
})

export default function App() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle="dark-content" />
			<Button
				title="Login"
				onPress={() =>
					Beacon.identify({
						email: 'joshuaheywood@live.com',
						name: 'Joshua Heywood',
						company: 'Megatronic',
						jobTitle: 'Marketing Manager',
					})
				}
			/>
			<Button title="Logout" onPress={() => Beacon.logout()} />
			<TouchableOpacity style={styles.contactUsButton} onPress={() => Beacon.open()}>
				<Text style={styles.contactUsText}>💬</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}
