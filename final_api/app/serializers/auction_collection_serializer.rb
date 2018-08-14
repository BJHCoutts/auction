class AuctionCollectionSerializer < ActiveModel::Serializer
  attributes :id, :title, :details, :end_date, :price, :created_at, :updated_at
end
