#!/bin/bash
#
# Node *OR* Bower modules required for translation (use only node or bower)



##
##  Node
##

# Required for basic, and advanced translation
npm install --save gulp-angular-translate gulp-angular-translate-extract \
angular-translate

## Required for advanced translation
npm install --save angular-message-format messageformat \
angular-translate-interpolation-messageformat


##
##  Bower
##


# Required for basic, and advanced translation
bower install --save  angular-translate angular-translate-loader-static-files


# Required for building
npm install --save gulp-angular-translate


## Required for advanced translation
bower install --save bower-angular-message-format

npm install --save messageformat angular-translate-interpolation-messageformat


###
### Gibberish Generator
###

npm install --save-dev gulp-pseudo-translate-angular-json gulp-rename \
gulp-json-editor
