#!/bin/bash

echo 'Fixing PropTypes issues'

echo "adding local modules"
cp -R ./libs/ ./node_modules/ 

if grep -q "export const ViewPropTypes = { style: null };" ./node_modules/react-native-web/dist/index.js; then
    echo "ViewPropTypes fixed already!"
else
    echo "export const requireNativeComponent = (name: String) { return name }; export const ViewPropTypes = { style: null };">> ./node_modules/react-native-web/dist/index.js
fi