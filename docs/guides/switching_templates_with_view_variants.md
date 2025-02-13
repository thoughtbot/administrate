---
title: Switching templates with view variants
---

You can switch to different templates using Rails' support for [view
variants][], which can be used to override the template used inside the
controller.

By setting the `request.variant` option to any value (in this case, `:admin`)
at any point in any controller, you can add a new variant to Rails' template
lookup tree (in this case, `.html+admin.erb`).

For example, to add a button to become the admin to view certain functionality:

```ruby
class CustomersController < Admin::ApplicationController
  before_action :with_variant, only: %i[index]

  private

  def with_variant
    if @current_user.admin?
      request.variant = :admin
    end
  end
end
```

```erb
<!-- app/views/admin/customers/_index_header.html.erb -->
<p class="identity__banner">
  You are logged in as <em><%= pundit_user.name %></em>.
  <%= link_to("Become the Admin", become_admin_customer_path("admin"),
        class: "identity__become-action")%>
</p>
```

```erb
<!-- app/views/admin/customers/_index_header.html+admin.erb -->
<p class="identity__banner identity__banner--admin">
  You are logged in as <em><%= pundit_user.name %></em>.
</p>
```

[view variants]: https://guides.rubyonrails.org/layouts_and_rendering.html#the-variants-option
