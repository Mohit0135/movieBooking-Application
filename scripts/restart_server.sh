#!/bin/bash

# Unzip the application files
cd /var/www/html
unzip -o app.zip

# Restart the application (modify according to your server setup)
pm2 restart all 
