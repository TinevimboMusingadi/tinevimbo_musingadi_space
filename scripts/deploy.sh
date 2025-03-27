#!/bin/bash

# Load environment variables
if [ -f .env ]; then
    source .env
else
    echo "Error: .env file not found"
    exit 1
fi

# Build the application
npm run export

# Upload using FTP
cd out
find . -type f -exec curl -u "$FTP_USERNAME:$FTP_PASSWORD" --ftp-create-dirs -T {} ftp://$FTP_HOST/public_html/website_8470d6ee/{} \;

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit"

# Add GitHub repository as remote (replace with your repository URL)
git remote add origin https://github.com/TinevimboMusingadi/tinevimbo_musingadi_space.git

# Push to main branch
git branch -M main
git push -u origin main 