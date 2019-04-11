function personalitySeeder() {

  this.seed = function () {
    let personality = new Personality({ name: 'Architect', shortcut: 'INTJ' });
    // save model to database
    personality.save(function (err, personality) {
      if (err) return console.error(err);
      console.log(personality.name + " saved to personalities");
    });

    personality = new Personality({ name: 'Logician', shortcut: 'INTP' });
    personality.save(function (err, personality) {
      if (err) return console.error(err);
      console.log(personality.name + " saved to personalities");
    });
  }
}

module.exports = personalitySeeder; s