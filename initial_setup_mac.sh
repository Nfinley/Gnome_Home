#!/bin/bash


sudo npm install -g sequelize-cli
sudo npm install -g sails

brew install rbenv ruby-build

# Add rbenv to bash so that it loads every time you open a terminal
echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.zshrc
source ~/.zshrc

# Install Ruby
rbenv install 2.3.1
rbenv global 2.3.1
ruby -v


gem install overcommit
