require "webmock/rspec"

# Allow downloading webdrivers for Selenium
driver_hosts = Webdrivers::Common.subclasses.
  map { |driver| URI(driver.base_url).host }

# Downloading the Firefox driver involves a redirect
driver_hosts += ["github-releases.githubusercontent.com"]

# Additionally, avoid conflict with Selenium (localhost)
WebMock.disable_net_connect!(allow_localhost: true, allow: driver_hosts)
