import { AppRegistry } from 'react-native'
import { BEACON_ID } from 'react-native-dotenv'
import App from './App'

import { Beacon } from 'react-native-help-scout'

Beacon.init(BEACON_ID)

AppRegistry.registerComponent('example', () => App)
