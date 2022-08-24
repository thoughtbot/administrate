---
title: Sessions
---

Super-user session logic is open-ended,
meaning you can choose any approach you like
in a common Rails manner.

See our `TODO` remark, in `Admin::ApplicationController`.

```ruby
class Admin::ApplicationController < Administrate::ApplicationController
  before_action :authenticate_admin

  def authenticate_admin
    # TODO Add authentication logic here.
  end
end
```

Here are some common approaches based on popular gems.

## Using Clearance

[Clearance][clearance] enables email-and-passcode login.

```ruby
class Admin::ApplicationController < Administrate::ApplicationController
  include Clearance::Controller
  before_action :require_login
end
```

## Using Devise

[Devise][devise] is based on a gem called `warden`.

```ruby
class Admin::ApplicationController < Administrate::ApplicationController
  before_action :authenticate_user!
end
```

## Using HTTP Basic authentication

Rails includes [`http_basic_authenticate_with`][rails-http-basic-auth],
and such can be added in your base admin controller:

```ruby
class Admin::ApplicationController < Administrate::ApplicationController
  http_basic_authenticate_with(
    name: ENV.fetch("ADMIN_NAME"),
    password: ENV.fetch("ADMIN_PASSWORD")
  )
end
```

Should you choose Basic Auth,
consider using [dotenv][dotenv] locally;
placing passcodes inside your code is a messy recipe.

[clearance]: https://github.com/thoughtbot/clearance
[devise]: https://github.com/plataformatec/devise
[rails-http-basic-auth]: http://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Basic.html
[dotenv]: https://github.com/bkeepers/dotenv
