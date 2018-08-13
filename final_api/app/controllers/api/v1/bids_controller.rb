class Api::V1::BidsController < ApplicationController
  before_action :authenticate_user!

  def create
    auction = Auction.find params[:auction_id]
    bid = Bid.new user: current_user, auction: auction
    bid.save

    render json: { id: bid.id, bid_count: auction.bids.count }
  end

  def destroy
    bid = Bid.find params[:id]
    bid.destroy

    render json: { id: bid.id, bid_count: bid.auction.bids.count }
  end

end
