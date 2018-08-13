class Api::V1::AuctionsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    auctions = Auction.order(created_at: :desc)
    render(
      json: auctions,
      each_serializer: AuctionCollectionSerializer
    )
  end

  def show
    render(
      json: auction#,
      # When using ActiveModelSerializer, it will
      # not automatically including nested associations
      # in the generated JSON. It does this for
      # perfomance reasons.

      # To include a nested association, we must
      # tell Rails to do so using the "include"
      # argument in the "render" method.

      # In the below, we specify that the "author"
      # associate is included. We also specify
      # the "answer" association and the "answer's
      # authors" are included as well.
      #include: [ :author, { answers: [ :author ]}]
    )
  end

  def create
    auction = auction.new auction_params
    auction.user = current_user

    auction.save!
    render json: { id: auction.id }
    # else
    #   render(
    #     json: { errors: auction.errors },
    #     status: 422 # Unprocessable Entity
    #   )
    # end
  end

  def destroy
    auction.destroy
    render(json: { status: 200 }, status: 200)
  end

  private
  def auction
    @auction ||= auction.find params[:id]
  end

  def auction_params
    params.require(:auction).permit(:title, :body)
  end
end
