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
    email: `#{first_name.downcase}.#{last_name.downcase}@hot.com`,
    password: PASSWORD
  )
  end

  users = User.all

  puts Cowsay.say "Created #{users.count} users", :ren