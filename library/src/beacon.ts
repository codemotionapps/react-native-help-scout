import { NativeModules } from 'react-native'

interface IIdentity {
	email?: string
	name?: string
	[key: string]: string | undefined
}

interface IBeacon {
	init(beaconId: string): void
	open(): void
	identify(identity: IIdentity): void
	logout(): void
	navigate(route: string): void
}

export default <IBeacon>NativeModules.RNHelpScoutBeacon
