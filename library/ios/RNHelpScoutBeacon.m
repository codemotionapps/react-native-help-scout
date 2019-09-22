#import <React/RCTConvert.h>

#import "Beacon.h"

#import "RNHelpScoutBeacon.h"

@implementation RNHelpScoutBeacon
{
    HSBeaconSettings *settings;
    bool hasListeners;
}

- (void)dealloc
{
    [self close:NULL];
    dispatch_async(dispatch_get_main_queue(), ^{
        [HSBeacon logout];
    });
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

RCT_EXPORT_METHOD(navigate:(NSString *)route)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [HSBeacon navigate:route beaconSettings:self->settings];
    });
}

RCT_EXPORT_METHOD(search:(NSString *)query)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [HSBeacon search:query beaconSettings:self->settings];
    });
}

RCT_EXPORT_METHOD(openArticle:(NSString *)articleId)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [HSBeacon openArticle:articleId beaconSettings:self->settings];
    });
}

RCT_EXPORT_METHOD(dismiss:(RCTResponseSenderBlock)callback)
{
    [self close:callback];
}

RCT_EXPORT_METHOD(identify:(NSDictionary *)identity)
{
    HSBeaconUser *user = [[HSBeaconUser alloc] init];

    if ([identity objectForKey:@"email"] != NULL) {
        user.email = [RCTConvert NSString:identity[@"email"]];
    }

    if ([identity objectForKey:@"name"] != NULL) {
        user.name = [RCTConvert NSString:identity[@"name"]];
    }
    
    for (NSString *key in identity) {
        if ([key isEqual:@"email"] || [key isEqual:@"name"]) continue;
        id value = identity[key];
        [user addAttributeWithKey:key value:[RCTConvert NSString:value]];
    }
    
    [HSBeacon login:user];
}

RCT_EXPORT_METHOD(logout)
{
    [HSBeacon logout];
}

- (void)close:(RCTResponseSenderBlock)callback
{
    [HSBeacon dismissBeacon: callback == NULL ? ^{} : ^{
        callback(NULL);
    }];
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
