class User < ApplicationRecord
  has_secure_password

  has_many :auctions, dependent: :destroy
  
  # has_many :bids, dependant: :destroy
  # has_many :bidded_items, through: :bids, source: :auction

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  validates(
    :email,
    presence: true,
    uniqueness: true,
    format: VALID_EMAIL_REGEX
  )

  def full_name
    first_name + " " + last_name
  end
end