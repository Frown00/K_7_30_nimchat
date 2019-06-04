function personalitySeeder() {


  this.seed = function () {
    let personalities = [];

    const I = 'Introverted';
    const E = 'Extraverted';
    const N = 'Intuitive';
    const S = 'Observant';
    const T = 'Thinking';
    const F = 'Feeling';
    const J = 'Judging';
    const P = 'Prospecting';
    // ANALYSTS
    const personality1 = new Personality(
      {
        name: 'Architect',
        shortcut: 'INTJ',
        role: 'ANALYST',
        traits: [I, N, T, J],
        description: 'Imaginative and strategic thinkers, with a plan for everything'
      }
    );
    personalities.push(personality1);

    const personality2 = new Personality(
      {
        name: 'Logician',
        shortcut: 'INTP',
        role: 'ANALYST',
        traits: [I, N, T, P],
        description: 'Innovative inventors with and unquenchable thirst for knowledge'
      }
    );
    personalities.push(personality2);

    const personality3 = new Personality(
      {
        name: 'Commander',
        shortcut: 'ENTJ',
        role: 'ANALYST',
        traits: [E, N, T, J],
        description: `Bold, imaginative and strong-willed leader, 
                      always finding a way or making one`
      }
    );
    personalities.push(personality3);

    const personality4 = new Personality(
      {
        name: 'Debater',
        shortcut: 'ENTP',
        role: 'ANALYST',
        traits: [E, N, T, P],
        description: `Smart and curious thinkers who cannot resist an intellectual challenge`
      }
    );
    personalities.push(personality4);

    // DIPLOMATS
    const personality5 = new Personality(
      {
        name: 'Advocate',
        shortcut: 'INFJ',
        role: 'DIPLOMAT',
        traits: [I, N, F, J],
        description: `Quiet and mystical, yet very inspiring and tireless idealists`
      }
    );
    personalities.push(personality5);

    const personality6 = new Personality(
      {
        name: 'Mediator',
        shortcut: 'INFP',
        role: 'DIPLOMAT',
        traits: [I, N, F, P],
        description: `Poetic, kind and altruistic people, always eager to help a good cause`
      }
    );
    personalities.push(personality6);

    const personality7 = new Personality(
      {
        name: 'Protagonist',
        shortcut: 'ENFJ',
        role: 'DIPLOMAT',
        traits: [E, N, F, J],
        description: `Charismatic and inspiring leaders, able to mesmerize their liseners`
      }
    );
    personalities.push(personality7);

    const personality8 = new Personality(
      {
        name: 'Campaigner',
        shortcut: 'ENFP',
        role: 'DIPLOMAT',
        traits: [E, N, F, P],
        description: `Entusiastic, creative and sociable free spirits, who can always find
                      a reason to smile`
      }
    );
    personalities.push(personality8);

    // SENTINELS
    const personality9 = new Personality(
      {
        name: 'Logistician',
        shortcut: 'ISTJ',
        role: 'SENTINEL',
        traits: [I, S, T, J],
        description: `Practival and fact-minded individuals, whose reliability cannot be
                      doubted`
      }
    );
    personalities.push(personality9);

    const personality10 = new Personality(
      {
        name: 'Defender',
        shortcut: 'ISFJ',
        role: 'SENTINEL',
        traits: [I, S, F, J],
        description: `Very dedicated and warm protectors, always ready to defend their
                      loved ones`
      }
    );
    personalities.push(personality10);

    const personality11 = new Personality(
      {
        name: 'Executive',
        shortcut: 'ESTJ',
        role: 'SENTINEL',
        traits: [E, S, T, J],
        description: `Excellent administators, unsurpassed at managing things or people`
      }
    );
    personalities.push(personality11);

    const personality12 = new Personality(
      {
        name: 'Consul',
        shortcut: 'ESFJ',
        role: 'SENTINEL',
        traits: [E, S, F, J],
        description: `Extraordinarily caring, social and popular people, always eager to help`
      }
    );
    personalities.push(personality12);

    // EXPLORERS
    const personality13 = new Personality(
      {
        name: 'Virtuoso',
        shortcut: 'ISTP',
        role: 'EXPLORER',
        traits: [I, S, T, P],
        description: `Bold and practical experimenters, masters of all kinds of tools`
      }
    );
    personalities.push(personality13);

    const personality14 = new Personality(
      {
        name: 'Adventurer',
        shortcut: 'ISFP',
        role: 'EXPLORER',
        traits: [I, S, F, P],
        description: `Flexible and charming artists, always ready to explore and experience
                      something new`
      }
    );
    personalities.push(personality14);

    const personality15 = new Personality(
      {
        name: 'Entrepreneur',
        shortcut: 'ESTP',
        role: 'EXPLORER',
        traits: [E, S, T, P],
        description: `Smart, energetic and very perceptive people, who truly enjoy living
                      on the edge`
      }
    );
    personalities.push(personality15);

    const personality16 = new Personality(
      {
        name: 'Entertainer',
        shortcut: 'ESFP',
        role: 'EXPLORER',
        traits: [E, S, F, P],
        description: `Spontaneous, energetic and enthusiastic people - life is never boring
                      around them`
      }
    );
    personalities.push(personality16);

    // save model to database
    personalities.map((personality) => {
      personality.save(function (err, personality) {
        if (err) return console.error(err);
        console.log(personality.name + " saved to personalities");
      });
    })



  }
}

module.exports = personalitySeeder;