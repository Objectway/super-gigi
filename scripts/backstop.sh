#!/bin/sh

#############################
# This is a script to launch
# 'backstopjs' tasks for css
# regression testing
############################

cd ./node_modules/backstopjs/
gulp reference
gulp test
