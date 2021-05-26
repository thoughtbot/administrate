FROM ruby:2.7.2

ENV LANG C.UTF-8

RUN echo "gem: --no-document" > $HOME/.gemrc && \
    touch $HOME/.irb-history && \
    echo "IRB.conf[:SAVE_HISTORY] = 1000\nIRB.conf[:HISTORY_FILE] = '~/.irb-history'" > $HOME/.irbrc
RUN apt-get update -qq && \
    apt-get install -y postgresql-client

RUN mkdir /ruby_app
WORKDIR /ruby_app

RUN apt-get install -yqq curl unzip
# # install google chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get -y update
RUN apt-get install -y google-chrome-stable

# # install chromedriver
RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/

# set display port to avoid crash
ENV DISPLAY=:99


RUN gem install bundler -v 2.1.4
COPY Gemfile* ./
COPY *.gemspec ./
COPY Appraisals ./
RUN mkdir -p ./lib/administrate
COPY lib/administrate/version.rb ./lib/administrate/version.rb
RUN bundle config --global jobs `grep -c cores /proc/cpuinfo` && \
    bundle config --delete bin
RUN bundle install
RUN bundle exec appraisal install

COPY . .

EXPOSE 3000

# Start the main process.
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
