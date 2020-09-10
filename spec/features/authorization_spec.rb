require "rails_helper"

describe "authorization" do
  before do
    class TestLogEntryPolicy < LogEntryPolicy
      class Scope < LogEntryPolicy::Scope
        def resolve
          scope.where(action: "create")
        end
      end
    end

    @original_log_entry_policy = LogEntry.policy_class
    LogEntry.policy_class = TestLogEntryPolicy
  end

  after do
    LogEntry.policy_class = @original_log_entry_policy
  end

  it "shows link to resource for which index? is authorized" do
    visit admin_customers_path
    navigation = find(".navigation")
    expect(navigation).to have_link("Products")
  end

  it "hides link to resource for which index? is not authorized" do
    visit admin_customers_path
    navigation = find(".navigation")
    expect(navigation).not_to have_link("Orders")
  end

  it "renders all results yielded by the scope" do
    c0 = create(:customer)
    c1 = create(:customer)
    create(:log_entry, action: "create", logeable: c0)
    create(:log_entry, action: "delete", logeable: c1)

    visit admin_log_entries_path

    expect(page).to have_content(c0.name)
    expect(page).not_to have_content(c1.name)
    expect(page).to have_css(".js-table-row", count: 1)
  end
end
