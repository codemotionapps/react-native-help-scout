import { AppRegistry } from 'react-native'
import { BEACON_ID } from 'react-native-dotenv'
import App from './App'

import { Beacon } from 'react-native-help-scout'

Beacon.init(BEACON_ID)

Beacon.identify({
	email: 'joshuaheywood@live.com',
	name: 'Joshua Heywood',
	company: 'Megatronic',
	jobTitle: 'Marketing Manager',
})

AppRegistry.registerComponent('example', () => App)
