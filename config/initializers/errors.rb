require "net/http"
require "net/smtp"

# Example:
#   begin
#     some http call
#   rescue *HTTP_ERRORS => error
#     notify_hoptoad error
#   end

HTTP_ERRORS = [
  EOFError,
  Errno::ECONNRESET,
  Errno::EINVAL,
  Net::HTTPBadResponse,
  Net::HTTPHeaderSyntaxError,
  Net::ProtocolError,
  Timeout::Error
]

SMTP_SERVER_ERRORS = [
  IOError,
  Net::SMTPAuthenticationError,
  Net::SMTPServerBusy,
  Net::SMTPUnknownError,
  TimeoutError
]

SMTP_CLIENT_ERRORS = [
  Net::SMTPFatalError,
  Net::SMTPSyntaxError
]

SMTP_ERRORS = SMTP_SERVER_ERRORS + SMTP_CLIENT_ERRORS
