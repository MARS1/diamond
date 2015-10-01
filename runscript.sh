#!/bin/bash

while [[ 1 ]]; do
  ROOT_URL=http://jameslaydigital.com meteor -p9090 2>&1 | tee -a .log
  #DISABLE_WEBSOCKETS=1 ROOT_URL=http://jameslaydigital.com meteor -p2000 2>&1 | tee -a .log
done
