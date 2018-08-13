class AuctionSerializer < ActiveModel::Serializer
  attributes :id, :title, :details, :end_date, :price, :created_at, :updated_at

  # belongs_to(:user, key: :author)

end
