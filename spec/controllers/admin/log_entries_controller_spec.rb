require "rails_helper"

describe Admin::LogEntriesController, type: :controller do
  describe "POST create" do
    def post_create(action: "create", logeable: create(:customer))
      resource_params = attributes_for(:log_entry).merge(
        action: action,
        logeable: {
          type: "Administrate::Field::Polymorphic",
          value: logeable.to_global_id.to_s,
        },
      )
      post :create, params: { log_entry: resource_params }
    end

    describe "with valid params" do
      it "creates a new LogEntry" do
        customer = create(:customer)
        expect do
          post_create(logeable: customer)
        end.to change(LogEntry, :count).by(1)
        expect(LogEntry.last.logeable).to eq(customer)
      end

      it "redirects to the created customer" do
        post_create
        expect(response).to redirect_to([:admin, LogEntry.last])
      end

      it "parses nested polymorphic resources" do
        customer = create(:customer)

        resource_params = attributes_for(:log_entry).merge(
          arbitrarily: {
            nested: {
              params: {
                logeable: {
                  type: "Administrate::Field::Polymorphic",
                  value: customer.to_global_id.to_s,
                },
              },
            },
          },
        )

        allow_any_instance_of(
          LogEntryDashboard,
        ).to receive(:permitted_attributes).and_return(
          [
            arbitrarily: {
              nested: {
                params: {
                  logeable: [
                    :type,
                    :value,
                  ],
                },
              },
            },
          ],
        )

        LogEntry.attr_accessor :arbitrarily

        post :create, params: { log_entry: resource_params }

        logeable_in_params = subject.send(:resource_params).dig(
          :arbitrarily,
          :nested,
          :params,
          :logeable,
        )
        expect(logeable_in_params).to eq(customer)
      end
    end

    describe "with invalid params" do
      it "passes a form page object to the view" do
        customer = create(:customer)

        locals = capture_view_locals do
          post_create(action: "cancel", logeable: customer)
        end

        page = locals[:page]
        expect(page).to be_instance_of(Administrate::Page::Form)
        expect(page.resource).to be_a_new(LogEntry)
      end
    end
  end

  describe "PUT update" do
    def put_update(original, action: "create", logeable: create(:customer))
      resource_params = attributes_for(:log_entry).merge(
        action: action,
        logeable: {
          type: "Administrate::Field::Polymorphic",
          value: logeable.to_global_id.to_s,
        },
      )
      put :update, params: { id: original.to_param, log_entry: resource_params }
    end

    describe "with valid params" do
      it "updates the requested log entry" do
        log_entry = create(:log_entry)
        new_action = "test-action"

        put_update(log_entry, action: new_action)

        log_entry.reload
        expect(log_entry.action).to eq new_action
      end

      it "redirects to the customer" do
        log_entry = create(:log_entry)

        put_update(log_entry)

        expect(response).to redirect_to([:admin, log_entry])
      end
    end

    describe "with invalid params" do
      it "passes a form page object to the view" do
        customer = create(:customer)
        log_entry = create(:log_entry, logeable: customer)
        new_action = "cancel"

        locals = capture_view_locals do
          put_update(log_entry, action: new_action, logeable: customer)
        end

        page = locals[:page]
        expect(page).to be_instance_of(Administrate::Page::Form)
        expect(page.resource).to eq(log_entry)
        expect(page.resource.action).to eq(new_action)
      end
    end
  end
end
