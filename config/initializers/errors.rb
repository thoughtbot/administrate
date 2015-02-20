require "net/http"

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
