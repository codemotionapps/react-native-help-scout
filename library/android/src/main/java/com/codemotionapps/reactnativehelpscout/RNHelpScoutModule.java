package com.codemotionapps.reactnativehelpscout;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.helpscout.beacon.Beacon;
import com.helpscout.beacon.ui.BeaconActivity;

public class RNHelpScoutModule extends ReactContextBaseJavaModule {
	private final ReactApplicationContext reactContext;

	public RNHelpScoutModule(ReactApplicationContext reactContext) {
		super(reactContext);
		this.reactContext = reactContext;
	}

	@Override
	public String getName() {
		return "RNHelpScoutBeacon";
	}

	@ReactMethod
	public void init(String beaconId) {
		new Beacon.Builder()
				.withBeaconId(beaconId)
				.build();
	}

	@ReactMethod
	public void open() {
		BeaconActivity.open(reactContext);
	}
}
