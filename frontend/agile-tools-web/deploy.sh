#!/bin/sh
# Script to deploy the front end code.


echo 'Starting deploy script...'

rm -rf build

echo $AWS_ACCESS_KEY
echo $AWS_SECRET_KEY

echo 'Building the application assets....'
npm run build

echo 'Uploading to s3....'
aws s3 cp build s3://agile-tools-web/stable/ --recursive --acl public-read

echo 'All done!'