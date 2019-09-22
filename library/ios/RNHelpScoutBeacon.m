#import "Beacon.h"

#import "RNHelpScoutBeacon.h"

@implementation RNHelpScoutBeacon
{
    HSBeaconSettings *settings;
    bool hasListeners;
}

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
    return YES;  // only do this if your module initialization relies on calling UIKit!
}

RCT_EXPORT_METHOD(init:(NSString *)beaconId)
{
    settings = [[HSBeaconSettings alloc] initWithBeaconId:beaconId];
}

RCT_EXPORT_METHOD(open)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [HSBeacon openBeacon:self->settings];
    });
}

- (void)startObserving {
    hasListeners = YES;
}

- (void)stopObserving {
    hasListeners = NO;
}

- (NSArray<NSString *> *)supportedEvents
{
	return @[@"open", @"close"];
}

- (void)handleOpen
{
    if (!hasListeners) return;
	[self sendEventWithName:@"open" body:NULL];
}

- (void)handleClose
{
    if (!hasListeners) return;
	[self sendEventWithName:@"close" body:NULL];
}

@end
