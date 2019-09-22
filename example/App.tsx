import React, { Fragment } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native'

import {
	Header,
	LearnMoreLinks,
	Colors,
	DebugInstructions,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import { Beacon } from 'react-native-help-scout'

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: Colors.lighter,
	},
	engine: {
		position: 'absolute',
		right: 0,
	},
	body: {
		backgroundColor: Colors.white,
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: Colors.black,
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
		color: Colors.dark,
	},
	highlight: {
		fontWeight: '700',
	},
	footer: {
		color: Colors.dark,
		fontSize: 12,
		fontWeight: '600',
		padding: 4,
		paddingRight: 12,
		textAlign: 'right',
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
		<Fragment>
			<SafeAreaView>
				<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
					<Header />
					<View style={styles.body}>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitle}>Step One</Text>
							<Text style={styles.sectionDescription}>
								Edit <Text style={styles.highlight}>App.js</Text> to change this screen and then come
								back to see your edits.
							</Text>
						</View>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitle}>See Your Changes</Text>
							<Text style={styles.sectionDescription}>
								<ReloadInstructions />
							</Text>
						</View>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitle}>Debug</Text>
							<Text style={styles.sectionDescription}>
								<DebugInstructions />
							</Text>
						</View>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitle}>Learn More</Text>
							<Text style={styles.sectionDescription}>Read the docs to discover what to do next:</Text>
						</View>
						<LearnMoreLinks />
					</View>
				</ScrollView>
				<TouchableOpacity style={styles.contactUsButton} onPress={() => Beacon.open()}>
					<Text style={styles.contactUsText}>💬</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</Fragment>
	)
}
