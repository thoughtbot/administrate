Rails.application.routes.draw do
  namespace :admin do
    DashboardManifest.new.dashboards.each do |dashboard_resource|
      resources dashboard_resource
    end

    root controller: DashboardManifest.new.root_dashboard, action: :index
  end

end
