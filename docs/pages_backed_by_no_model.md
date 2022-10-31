---
title: Pages backed by no model.
---

On occasion, you may need special pages
based on no single model or resource.
A common example is a "numbers" page,
displaying summaries of all records in your application.

Begin by adding an `index` route,
so your page becomes linked in your sidebar.

```ruby
# config/routes.rb
namespace :admin do
  # ...
  resources :numbers, only: [:index]
end
```

Add specialized dashboard, controller, and display code:

```ruby
# app/dashboards/numbers_dashboard.rb
require "administrate/custom_dashboard"

class NumbersDashboard < Administrate::CustomDashboard
  resource "Numbers" # used by administrate in the views
end
```

```ruby
# app/controllers/admin/numbers_controller.rb
module Admin
  class NumbersController < Admin::ApplicationController
    def index
      @numbers = {
        customers: Customer.count,
        orders: Order.count,
      }
    end
  end
end
```

```erb
# app/views/admin/numbers/index.html.erb

<div style="padding: 20px">
  <h1>Numbers</h1>
  <p><b># Customers:</b> <%= @numbers[:customers] %></p>
  <p><b># Orders:</b> <%= @numbers[:orders] %></p>
</div>
```
