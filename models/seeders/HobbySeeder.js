
function hobbySeeder() {

  this.seed = function () {
    let hobby = new Hobby({ name: 'Football' });
    // save model to database
    hobby.save(function (err, hobby) {
      if (err) return console.error(err);
      console.log(hobby.name + " saved to hobby");
    });

    hobby = new Hobby({ name: 'Psychology' });
    // save model to database
    hobby.save(function (err, hobby) {
      if (err) return console.error(err);
      console.log(hobby.name + " saved to hobby");
    });

  }
}

module.exports = hobbySeeder;