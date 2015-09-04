namespace :admin do
    DashboardManifest::DASHBOARDS.each do |resource_class|
      resources(
        resource_class,
        controller: :application,
        resource_class: resource_class,
      )
    end

    root(
      action: :index,
      controller: :application,
      resource_class: DashboardManifest::ROOT_DASHBOARD,
    )
  end
