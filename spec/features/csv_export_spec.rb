require "rails_helper"

describe "CSV export" do
  let(:export_label) { t("administrate.actions.export_csv") }

  before do
    allow_any_instance_of(Admin::OrdersController).
      to(receive(:show_action?).and_call_original)
  end

  context "when user is authorized to export CSV" do
    before do
      allow_any_instance_of(Admin::OrdersController).
        to(receive(:show_action?).with(:export_csv, anything) { true })
    end

    it "shows button for exporting CSV" do
      visit admin_orders_path

      expect(page).to have_content(export_label)
    end

    it "downloads CSV" do
      order1 = create(:order, address_state: SecureRandom.hex)
      order2 = create(:order, address_state: SecureRandom.hex)
      visit admin_orders_path(format: :csv, per_page: 1, page: 2)

      expect(page.response_headers["Content-Disposition"]).
        to include("attachment")
      expect(page.source).to_not include(order1.address_state)
      expect(page.source).to include(order2.address_state)

      visit admin_orders_path(format: :csv)
      expect(page.source).to include(order1.address_state)
      expect(page.source).to include(order2.address_state)

      visit admin_orders_path(format: :csv, per_page: 1)
      expect(page.source).to include(order1.address_state)
      expect(page.source).to include(order2.address_state)
    end
  end

  context "when user is not authorized to export CSV" do
    before do
      allow_any_instance_of(Admin::OrdersController).
        to(receive(:show_action?).
             with(:export_csv, anything) { false })
    end

    it "does not show button for exporting CSV" do
      visit admin_orders_path

      expect(page).to_not have_content(export_label)
    end

    it "does not download CSV" do
      expect { visit admin_orders_path(format: :csv) }.
        to(raise_error(ActionController::UnknownFormat))
    end
  end
end
