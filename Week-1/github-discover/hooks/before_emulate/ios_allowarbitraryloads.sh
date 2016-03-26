#!/bin/bash

# Allow iPhone Simulator to make Arbitrary Loads
# @ref https://www.bram.us/2015/09/29/ionic-emulate-vs-xcode-7/

XCODEVERSION=`xcodebuild -version | grep Xcode | sed 's/Xcode //g'`
XCODEMAINVERSION=`echo $XCODEVERSION | cut -d "." -f 1`
PROJECTNAME=`xmllint --format --xpath "//*[local-name()='widget']/*[local-name()='name'][1]/text()" config.xml`

if [[ "$CORDOVA_PLATFORMS" == "ios" ]]
then

	if [[ "$XCODEMAINVERSION" > 6 ]]
	then

		echo "iPhone Simulator (XCode $XCODEVERSION) is being used. We might need to adjust $PROJECTNAME-Info.plist to allow Arbitrary Loads!"

		PLISTBUDDY="/usr/libexec/PlistBuddy"
		TARGET="platforms/ios/$PROJECTNAME/$PROJECTNAME-Info.plist"
		HASSETTING=`$PLISTBUDDY -c "print :NSAppTransportSecurity:NSAllowsArbitraryLoads" "$TARGET" 2>&1`

		if [[ "$HASSETTING" == "true" ]]
		then

			echo " - NSAllowsArbitraryLoads already enabled. Not adjusting $PROJECTNAME-Info.plist"

		else

			echo " - NSAllowsArbitraryLoads not enabled. Adjusting $PROJECTNAME-Info.plist"

			$PLISTBUDDY -c "Add :NSAppTransportSecurity dict" "$TARGET"
			$PLISTBUDDY -c "Add :NSAppTransportSecurity:NSAllowsArbitraryLoads bool YES" "$TARGET"

		fi

	fi

fi
