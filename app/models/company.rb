class Company < ApplicationRecord
    has_many :users, dependent: :destroy

    validates :name, presence: true
    validates :contact_no, presence: true
    validates :email, presence: true
    validates :address, presence: true
    validates :postal_code, presence: true
    validates :fax, presence: true
end
