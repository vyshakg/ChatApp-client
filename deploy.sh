#! /bin/bash
yarn build
netlify deploy --prod --dir ./build