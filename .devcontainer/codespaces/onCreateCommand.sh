# Workaround for install Ruby 4.0.0 with RVM
rvm list
curl -sSL https://rvm.io/mpapis.asc | gpg2 --import -
curl -sSL https://rvm.io/pkuczynski.asc | gpg2 --import -
rvm get master
rvm list known

# Install Ruby
rvm install 3.4.6
rvm install 4.0.0
rvm --default use 4.0.0
rvm list
ruby --version

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O /tmp/google-chrome.deb
sudo apt update && sudo apt install -y /tmp/google-chrome.deb && rm /tmp/google-chrome.deb
google-chrome --version

CHROMEDRIVER_VERSION=$(google-chrome --version | awk '{print $3}')
wget https://storage.googleapis.com/chrome-for-testing-public/${CHROMEDRIVER_VERSION}/linux64/chromedriver-linux64.zip
unzip chromedriver-linux64.zip
sudo mv chromedriver-linux64/chromedriver /usr/local/bin/
rm -rf chromedriver-linux64.zip chromedriver-linux64

sudo apt install -y libvips

sudo apt-get clean
sudo rm -rf /var/lib/apt/lists/*
