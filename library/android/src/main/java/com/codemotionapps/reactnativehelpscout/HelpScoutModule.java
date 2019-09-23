package com.codemotionapps.reactnativehelpscout;

import android.app.Application;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.helpscout.beacon.Beacon;
import com.helpscout.beacon.model.BeaconScreens;
import com.helpscout.beacon.ui.BeaconActivity;
import com.helpscout.beacon.ui.BeaconEventLifecycleHandler;
import com.helpscout.beacon.ui.BeaconOnClosedListener;
import com.helpscout.beacon.ui.BeaconOnOpenedListener;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

public class HelpScoutModule extends ReactContextBaseJavaModule {
	private final ReactApplicationContext reactContext;

	public HelpScoutModule(final ReactApplicationContext reactContext) {
		super(reactContext);
		this.reactContext = reactContext;

		BeaconEventLifecycleHandler eventLifecycleHandler = new BeaconEventLifecycleHandler(
				new BeaconOnOpenedListener() {
					@Override
					public void onOpened() {
						reactContext
								.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
								.emit("open", null);
					}
				},
				new BeaconOnClosedListener() {
					@Override
					public void onClosed() {
						reactContext
								.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
								.emit("close", null);
					}
				}
		);

		Application application = (Application) reactContext.getApplicationContext();
		application.registerActivityLifecycleCallbacks(eventLifecycleHandler);
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

	@ReactMethod
	public void logout() {
		Beacon.logout();
	}

	@ReactMethod
	public void navigate(String route) {

	}

	@ReactMethod
	public void search(String query) {
		ArrayList<String> list = new ArrayList<String>();
		list.add(query);
		BeaconActivity.open(this.reactContext, BeaconScreens.SEARCH_SCREEN, list);
	}

	@ReactMethod
	public void openArticle(String query) {
		ArrayList<String> list = new ArrayList<String>();
		list.add(query);
		BeaconActivity.open(this.reactContext, BeaconScreens.ARTICLE_SCREEN, list);
	}

	@ReactMethod
	public void previousMessages() {
		BeaconActivity.open(this.reactContext, BeaconScreens.PREVIOUS_MESSAGES, new ArrayList<String>());
	}

	@ReactMethod
	public void contactForm() {
		BeaconActivity.open(this.reactContext, BeaconScreens.CONTACT_FORM_SCREEN, new ArrayList<String>());
	}

//	@ReactMethod
//	public void chat() {
//		BeaconActivity.open(this.reactContext, BeaconScreens.CHAT, new ArrayList<String>());
//	}

	@ReactMethod
	public void dismiss(Callback callback) {

	}
}
