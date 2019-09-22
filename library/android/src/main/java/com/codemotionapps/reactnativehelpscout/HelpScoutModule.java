package com.codemotionapps.reactnativehelpscout;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.helpscout.beacon.Beacon;
import com.helpscout.beacon.ui.BeaconActivity;

import java.util.Iterator;
import java.util.Map;

public class HelpScoutModule extends ReactContextBaseJavaModule {
	private final ReactApplicationContext reactContext;

	public HelpScoutModule(ReactApplicationContext reactContext) {
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

	@ReactMethod
	public void identify(ReadableMap identity) {
		String email = identity.hasKey("email") ? identity.getString("email") : "";
		if (identity.hasKey("name")) {
			Beacon.login(email, identity.getString("name"));
		} else {
			Beacon.login(email);
		}

		Iterator<Map.Entry<String, Object>> i = identity.getEntryIterator();

		while (i.hasNext()) {
			Map.Entry<String, Object> entry = i.next();
			String key = entry.getKey();
			if (key == "email" || key == "name") continue;
			Beacon.addAttributeWithKey(key, (String) entry.getValue());
		}
	}
}
