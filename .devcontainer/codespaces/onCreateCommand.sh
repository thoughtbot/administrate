# Install Ruby via rv
curl -LsSf https://rv.dev/install | sh
source ~/.cargo/env
rv ruby list
rv ruby install 3.4.6
rv ruby install 4.0.0
rv ruby list
echo 'eval "$(rv shell init bash)"' >> ~/.bashrc
source ~/.bashrc
which ruby
ruby --version

# Workaround for Yarn GPG key
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo gpg --dearmor -o /usr/share/keyrings/yarnkey.gpg
echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update

# Install Google Chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O /tmp/google-chrome.deb
sudo apt update && sudo apt install -y /tmp/google-chrome.deb && rm /tmp/google-chrome.deb
google-chrome --version

# Install Chromedriver
CHROMEDRIVER_VERSION=$(google-chrome --version | awk '{print $3}')
wget https://storage.googleapis.com/chrome-for-testing-public/${CHROMEDRIVER_VERSION}/linux64/chromedriver-linux64.zip
unzip chromedriver-linux64.zip
sudo mv chromedriver-linux64/chromedriver /usr/local/bin/
rm -rf chromedriver-linux64.zip chromedriver-linux64
chromedriver --version

# Install libs
sudo apt install -y libvips

# Cleanup
sudo apt-get clean
sudo rm -rf /var/lib/apt/lists/*
