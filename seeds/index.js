const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database connected!');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++){
        //where N means 1000 cities
        const randomN = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[randomN].city}, ${cities[randomN].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe cupiditate sapiente soluta. Saepe unde voluptate natus tempora quis quod eaque corrupti nesciunt quibusdam aperiam consectetur quaerat, ipsum odio perferendis.',
            price,
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});