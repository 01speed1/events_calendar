#!/bin/bash
npm i
rm -rf frontend/build
(cd frontend && npm i)
(cd frontend && npm run build)
rm -rf docs
mkdir docs
mv frontend/build/* docs/