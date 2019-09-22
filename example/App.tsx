import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, Button, StatusBar, TextInput, View } from 'react-native'

import { Beacon } from 'react-native-help-scout'

const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: 'black',
		flex: 1,
	},
	row: {
		flexDirection: 'row',
	},
	alignCenter: {
		alignItems: 'center',
	},
	flex: {
		flex: 1,
	},
	input: {
		backgroundColor: '#333222',
		padding: 8,
		borderRadius: 6,
		margin: 8,
		flex: 1,
		color: 'white',
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
	const [search, setSearch] = useState('')

	function handleSearch() {
		Beacon.navigate(`/docs/search?query=${search}`)
	}

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
			<Button title="Message" onPress={() => Beacon.navigate('/ask/message')} />
			<View style={[styles.row, styles.alignCenter]}>
				<TextInput
					value={search}
					onChangeText={setSearch}
					onSubmitEditing={handleSearch}
					style={styles.input}
					placeholder="Search docs..."
					placeholderTextColor="#666"
				/>
				<Button title="Search" onPress={handleSearch} />
			</View>
			<TouchableOpacity style={styles.contactUsButton} onPress={() => Beacon.open()}>
				<Text style={styles.contactUsText}>💬</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}
