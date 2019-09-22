import React, { useState } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	Button,
	StatusBar,
	TextInput,
	View,
	Alert,
} from 'react-native'

import { Beacon } from 'react-native-help-scout'

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
	},
	alignCenter: {
		alignItems: 'center',
	},
	spaceEvenly: {
		justifyContent: 'space-evenly',
	},
	flex: {
		flex: 1,
	},
	ph: {
		paddingHorizontal: 8,
	},
	input: {
		backgroundColor: '#333333',
		padding: 8,
		borderRadius: 6,
		marginRight: 8,
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
		Beacon.search(search)
	}

	return (
		<SafeAreaView style={styles.flex}>
			<StatusBar barStyle="dark-content" />
			<View style={[styles.flex, styles.spaceEvenly, styles.ph]}>
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
				<Button title="Open article" onPress={() => Beacon.openArticle('592acfa30428634b4a337f5d')} />
				<Button
					title="Open and dismiss in 5 seconds and show alert"
					onPress={() => {
						Beacon.open()
						setTimeout(() => {
							Beacon.dismiss(() => Alert.alert('Beacon closed!'))
						}, 5000)
					}}
				/>
			</View>
			<View style={styles.flex} />
			<TouchableOpacity style={styles.contactUsButton} onPress={() => Beacon.open()}>
				<Text style={styles.contactUsText}>💬</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}
