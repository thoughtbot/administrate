# Adding Controllers Without Related Model

Sometimes you may want to add a custom controller that has no resource
related to it (for example for a statistics page).

To do that, you must define an `index` route, as only controllers with index
routes are displayed in the sidebar and then add a custom dashboard:

```ruby
# app/dashboards/stat_dashboard.rb

require "administrate/custom_dashboard"

class StatDashboard < Administrate::CustomDashboard
  resource "Stats" # used by administrate in the views
end
```

```ruby
# config/routes.rb

namespace :admin do
  # ...
  resources :stats, only: [:index]
end
```
