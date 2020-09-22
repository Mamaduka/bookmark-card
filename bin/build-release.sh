#!/bin/bash

PLUGIN="bookmark-card"
VERSION=$(awk '/Version:/{print $NF}' $PLUGIN.php)

WORKING_DIR=`pwd`

echo "➤ Generating release directory..."
rm -rf $WORKING_DIR/release
mkdir -p release/$PLUGIN

rm -rf $WORKING_DIR/build
npm run build

echo "➤ Copying files..."
if [ -r "${WORKING_DIR}/.distignore" ]; then
	rsync -rc --exclude-from="$WORKING_DIR/.distignore" $WORKING_DIR/* $WORKING_DIR/release/$PLUGIN --delete --delete-excluded
else
	rsync -rc $WORKING_DIR/* $WORKING_DIR/release/$PLUGIN --delete
fi

echo "➤ Generating zip file..."
cd $WORKING_DIR/release/
zip -r "${PLUGIN}-${VERSION}.zip" $PLUGIN
cd $WORKING_DIR/

echo "✓ Build!"
