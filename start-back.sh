#!/bin/sh
# file = './.env'
# read -d $'\x04' name <"$file"
# NODE_ENV=$(cat "$NODE_ENV")

if [-f $ENV_FILE];then 

echo $NODE_ENV

echo $name

echo 'une pipe'
