// http://moapp.tumblr.com/post/1682050359/daily-snippet
// Sometimes one need a transparent and - most important of all - borderless NSWindow:


- (id) initWithContentRect: (NSRect) contentRect
    styleMask: (unsigned int) aStyle
    backing: (NSBackingStoreType) bufferingType
    defer: (BOOL) flag
{
    if (![super initWithContentRect: contentRect
        styleMask: NSBorderlessWindowMask
        backing: bufferingType
        defer: flag]) return nil;
    [self setOpaque:NO];
    [self setBackgroundColor: [NSColor clearColor]];

    return self;
}
