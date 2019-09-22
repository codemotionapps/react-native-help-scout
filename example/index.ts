import { AppRegistry } from 'react-native'
import { BEACON_ID } from 'react-native-dotenv'
import App from './App'

import { Beacon } from 'react-native-help-scout'

Beacon.init(BEACON_ID)

Beacon.events.on('open', () => console.log('Beacon opened'))
Beacon.events.on('close', () => console.log('Beacon closed'))

AppRegistry.registerComponent('example', () => App)
