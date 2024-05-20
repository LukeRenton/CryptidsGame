#!/bin/bash

echo -e "\n[INFO] Building..."
cd ./client/
npm run build


echo -e "\n[INFO] Running application..."
cd ..
npm start
