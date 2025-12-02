RUBY_VERSION=3.4.6
rvm list
rvm install $RUBY_VERSION
rvm --default use $RUBY_VERSION
ruby -v

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O /tmp/google-chrome.deb
sudo apt update && sudo apt install -y /tmp/google-chrome.deb && rm /tmp/google-chrome.deb
google-chrome --version

CHROMEDRIVER_VERSION=$(google-chrome --version | awk '{print $3}')
wget https://storage.googleapis.com/chrome-for-testing-public/${CHROMEDRIVER_VERSION}/linux64/chromedriver-linux64.zip
unzip chromedriver-linux64.zip
sudo mv chromedriver-linux64/chromedriver /usr/local/bin/
rm -rf chromedriver-linux64.zip chromedriver-linux64
