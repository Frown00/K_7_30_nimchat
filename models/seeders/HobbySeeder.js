function hobbySeeder() {

  this.seed = function () {

    // effort
    const ACTIVE = 'ACTIVE';
    const PASSIVE = 'PASSIVE';
    const OTHER = 'OTHER'
    // type
    const INDOOR = 'indoor';
    const OUTDOOR = 'outdoor';
    const COLLECTION_IN = 'collection indoor';
    const COLLECTION_OUT = 'collection outdoor';
    const COMPETITIVE_IN = 'competitive indoor';
    const COMPETITIVE_OUT = 'competitive outdoor';
    const OBSERVATION_IN = 'observation indoor';
    const OBSERVATION_OUT = 'observation outdoor';
    const OTHER_TYPE = 'other';


    const hobbies = [
      new Hobby(
        {
          name: 'Acrobatics',
          type: INDOOR,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Animation',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Baking',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Computer programming',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Cooking',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Dancing',
          type: INDOOR,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Drawing',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Origami',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Listening to music',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Fashion',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Tabletop games',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Role-playing games',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Video gaming',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Writing',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Puzzles',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Watching movies',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Photography',
          type: OTHER_TYPE,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Playing musical instruments',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Archery',
          type: OUTDOOR,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Astronomy',
          type: OUTDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Camping',
          type: OUTDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Parkour',
          type: OUTDOOR,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Paintball',
          type: OUTDOOR,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Football',
          type: OUTDOOR,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Soccer',
          type: OUTDOOR,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Gardening',
          type: OUTDOOR,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Skiing',
          type: OUTDOOR,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Snowboarding',
          type: INDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Hiking',
          type: OUTDOOR,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Swimming',
          type: OTHER_TYPE,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Travel',
          type: OUTDOOR,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Shopping',
          type: OUTDOOR,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Running',
          type: OUTDOOR,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Comic book collecting',
          type: COLLECTION_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Knife collecting',
          type: COLLECTION_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Shoes',
          type: COLLECTION_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Art collecting',
          type: COLLECTION_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Antiquing',
          type: COLLECTION_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Sports memorabilia',
          type: COLLECTION_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Video game collecting',
          type: COLLECTION_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Vintage cars',
          type: COLLECTION_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Vintage clothing',
          type: COLLECTION_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Flower collecting and pressing',
          type: COLLECTION_OUT,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Insect collecting',
          type: COLLECTION_OUT,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Mineral collecting',
          type: COLLECTION_OUT,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Seashell collecting',
          type: COLLECTION_OUT,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Ice hockey',
          type: COMPETITIVE_IN,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Bowling',
          type: COMPETITIVE_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Boxing',
          type: COMPETITIVE_IN,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Judo',
          type: COMPETITIVE_IN,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Chess',
          type: COMPETITIVE_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Volleyball',
          type: COMPETITIVE_IN,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Cheerleading',
          type: OTHER_TYPE,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'ESports',
          type: COMPETITIVE_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Beach volleyball',
          type: COMPETITIVE_OUT,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Climbing',
          type: COMPETITIVE_OUT,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'American Football',
          type: COMPETITIVE_OUT,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Rugby',
          type: COMPETITIVE_OUT,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Tennis',
          type: COMPETITIVE_OUT,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Horseback riding',
          type: COMPETITIVE_OUT,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Table tennis',
          type: COMPETITIVE_OUT,
          effort: ACTIVE
        }
      ),
      new Hobby(
        {
          name: 'Fishkeeping',
          type: OBSERVATION_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Learning',
          type: OBSERVATION_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Reading',
          type: OBSERVATION_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Meditation',
          type: OBSERVATION_IN,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Amateur astronomy',
          type: OBSERVATION_OUT,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Backpacking',
          type: OBSERVATION_OUT,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Meteorology',
          type: OBSERVATION_OUT,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Birdwatching',
          type: OBSERVATION_OUT,
          effort: PASSIVE
        }
      ),
      new Hobby(
        {
          name: 'Psychology',
          type: OBSERVATION_IN,
          effort: PASSIVE
        }
      )
    ];


    // save model to database
    hobbies.map((hobby) => {
      hobby.save(function (err, hobby) {
        if (err) return console.error(err);
        console.log(hobby.name + " saved to hobbies");
      })
    })


  }
}

module.exports = hobbySeeder;