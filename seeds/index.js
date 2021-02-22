const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '60320f3a80308a1a740eb1c4',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur reprehenderit perspiciatis porro ipsum maxime minus similique facilis odit rerum ducimus minima, consequuntur tenetur id nisi. Nesciunt quae eos debitis assumenda.',
      price,
      geometry: {
        type: "Point",
        coordinates : [ -113.1331, 47.0202 ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dxwcwuh3e/image/upload/v1613953840/YelpCamp/tce36z8iwnfwtxloumma.jpg',
          filename: 'YelpCamp/tce36z8iwnfwtxloumma',
        },
        {
          url: 'https://res.cloudinary.com/dxwcwuh3e/image/upload/v1613953840/YelpCamp/eiwxalapfg64vlevxvpu.jpg',
          filename: 'YelpCamp/eiwxalapfg64vlevxvpu',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
