#!/bin/bash

# Update gatsby-config.js file

## add plugins gatsby-source-cms
npx jscodeshift -t ./transform/TransformGatsbyConfig.ts --extensions=ts,js --parser=ts './gatsby-config.js' --print
