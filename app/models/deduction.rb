class Deduction < ApplicationRecord
    belongs_to :user
    
    validates :user_id, presence: true
    validates :payroll_month, presence: true
end
