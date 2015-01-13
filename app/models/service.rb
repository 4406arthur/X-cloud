class Service < ActiveRecord::Base
	belongs_to :user
	has_many :uploads
end
