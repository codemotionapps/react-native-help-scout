import { NativeModules, NativeEventEmitter, EventSubscriptionVendor } from 'react-native'
import { EventEmitter } from 'events'

interface IIdentity {
	email?: string
	name?: string
	[key: string]: string | undefined
}

interface IBeacon extends EventSubscriptionVendor {
	init(beaconId: string): void
	open(): void
	identify(identity: IIdentity): void
	logout(): void
	navigate(route: string): void
	search(query: string): void
	openArticle(articleId: string): void
	// chat(): void
	contactForm(): void
	previousMessages(): void
	dismiss(callback: () => void): void
}

const NativeModule = <IBeacon>NativeModules.RNHelpScoutBeacon

const nativeEmitter = new NativeEventEmitter(NativeModule)

type Events = {
	open: []
	close: []
}

interface BeaconEventEmitter extends EventEmitter {
	on<K extends keyof Events>(event: K, listener: (...args: Events[K]) => void): this
	once<K extends keyof Events>(event: K, listener: (...args: Events[K]) => void): this
	emit<K extends keyof Events>(event: K, ...args: Events[K]): boolean
}

const events = new EventEmitter() as BeaconEventEmitter

nativeEmitter.addListener('open', () => {
	events.emit('open')
})

nativeEmitter.addListener('close', () => {
	events.emit('close')
})

type BeaconWithEvents = IBeacon & { events: BeaconEventEmitter }
;(NativeModule as BeaconWithEvents).events = events

export default <BeaconWithEvents>NativeModule
