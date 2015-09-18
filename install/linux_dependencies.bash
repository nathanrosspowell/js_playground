#!/bin/bash
# nodejs.
sudo apt-get purge nodejs npm
sudo curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs
# bower & grunt-cli global install.
sudo npm install -g bower grunt-cli
