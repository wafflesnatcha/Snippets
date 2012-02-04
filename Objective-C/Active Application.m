// http://moapp.tumblr.com/post/2595533772/daily-snippet

NSDictionary *dic = [[NSWorkspace sharedWorkspace] activeApplication];
NSString *appIdentifier = [dic objectForKey:@"NSApplicationBundleIdentifier"];
NSString *appName = [dic objectForKey:@"NSApplicationName"];
NSString *appPath = [dic objectForKey:@"NSApplicationPath"];