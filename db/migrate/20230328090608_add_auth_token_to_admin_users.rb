class AddAuthTokenToAdminUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :admin_users, :authentication_token, :string
  end
end
