# Protect against injection attacks
# http://www.kb.cert.org/vuls/id/380039
if Rails::VERSION::MAJOR < 5
  ActionDispatch::ParamsParser::DEFAULT_PARSERS.delete(Mime::XML)
end
