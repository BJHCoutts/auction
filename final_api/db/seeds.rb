PASSWORD = "cat"

Auction.delete_all
User.delete_all

super_user = User.create(
  first_name: "Rufus",
  last_name: "Highgarden",
  email: "hot@hot.com",
  password: PASSWORD,
  admin: true
)

10.times do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name

  User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name.downcase}.#{last_name.downcase}@hot.com",
    password: PASSWORD
  )
end

  users = User.all

  puts Cowsay.say "Created #{users.count} users", :ren

  50.times do
    title = Faker::Appliance.equipment
    details = Faker::StarWars.wookiee_sentence
    end_date = Faker::Date.forward(23)
    price = Faker::Number.decimal(2,2)

    a = Auction.create(
      title: title,
      details: details,
      end_date: end_date,
      price: price,
      user: users.sample
    )

    if a.valid?
      rand(0..10).times do
        Bid.create(
          auction: a,
          user: users.sample
        )
      end
    end
  end

  auctions = Auction.all

  puts Cowsay.say "Created #{auctions.count} auctions", :stimpy