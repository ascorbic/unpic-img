#!/bin/sh
if [ "$CACHED_COMMIT_REF" == "$COMMIT_REF" ]; 
    then (exit 1); 
    else git diff --quiet "$CACHED_COMMIT_REF" "$COMMIT_REF" . ../../packages/$1 ../../packages/core
fi;
