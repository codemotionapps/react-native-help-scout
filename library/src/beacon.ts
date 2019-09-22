import { NativeModules } from 'react-native'

interface IBeacon {
	init(beaconId: string): void
	open(): void
}

export default <IBeacon>NativeModules.RNHelpScoutBeacon
