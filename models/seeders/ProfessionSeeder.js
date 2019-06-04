function professionSeeder() {

  this.seed = function () {


    // type
    const ENGINEERING = 'ENGINEERING';
    const FINANCE = 'FINANCE';
    const HEALTHCARE = 'HEALTHCARE';
    const HOSPITALITY = 'HOSPITALITY';
    const TECHNOLOGY = 'TECHNOLOGY';
    const TRANSPORTATION = 'TRANSPORTATION';


    const professions = [
      new Profession({
        name: 'Industrial Engineer',
        type: ENGINEERING,
      }),
      new Profession({
        name: 'Mechanical Engineer',
        type: ENGINEERING,
      }),
      new Profession({
        name: 'Electrical Engineer',
        type: ENGINEERING,
      }),
      new Profession({
        name: 'Civil Engineer',
        type: ENGINEERING,
      }),
      new Profession({
        name: 'Architectural and Engineering Manager',
        type: ENGINEERING,
      }),
      new Profession({
        name: 'Aerospace Engineer',
        type: ENGINEERING,
      }),
      new Profession({
        name: 'Management Analyst',
        type: FINANCE,
      }),
      new Profession({
        name: 'Accountant',
        type: FINANCE,
      }),
      new Profession({
        name: 'Financial Manager',
        type: FINANCE,
      }),
      new Profession({
        name: 'Sales Agent',
        type: FINANCE,
      }),
      new Profession({
        name: 'Loan Officer',
        type: FINANCE,
      }),
      new Profession({
        name: 'Auditor',
        type: FINANCE,
      }),
      new Profession({
        name: 'Financial Analysts',
        type: FINANCE,
      }),
      new Profession({
        name: 'Insurance Adjuster',
        type: FINANCE,
      }),
      new Profession({
        name: 'Personal Financial Advisor',
        type: FINANCE,
      }),
      new Profession({
        name: 'Nurse',
        type: HEALTHCARE,
      }),
      new Profession({
        name: 'Nursing Assistant',
        type: HEALTHCARE,
      }),
      new Profession({
        name: 'Critacal Care Nurse',
        type: HEALTHCARE,
      }),
      new Profession({
        name: 'Physical Therapists',
        type: HEALTHCARE,
      }),
      new Profession({
        name: 'Medical Assistant',
        type: HEALTHCARE,
      }),
      new Profession({
        name: 'Medical Secretarie',
        type: HEALTHCARE,
      }),
      new Profession({
        name: 'Medical Scientist',
        type: HEALTHCARE,
      }),
      new Profession({
        name: 'Food Preparation and Serving Worker',
        type: HOSPITALITY,
      }),
      new Profession({
        name: 'Food Service Manager',
        type: HOSPITALITY,
      }),
      new Profession({
        name: 'Maid',
        type: HOSPITALITY,
      }),
      new Profession({
        name: 'Housekeeping Cleaner',
        type: HOSPITALITY,
      }),
      new Profession({
        name: 'Janitor',
        type: HOSPITALITY,
      }),
      new Profession({
        name: 'Cook',
        type: HOSPITALITY,
      }),
      new Profession({
        name: 'Waiter',
        type: HOSPITALITY,
      }),
      new Profession({
        name: 'Clerk',
        type: HOSPITALITY,
      }),
      new Profession({
        name: 'Dishwasher',
        type: HOSPITALITY,
      }),
      new Profession({
        name: 'Software Developer',
        type: TECHNOLOGY,
      }),
      new Profession({
        name: 'Computer Systems Analyst',
        type: TECHNOLOGY,
      }),
      new Profession({
        name: 'Network and Computer System Administrator',
        type: TECHNOLOGY,
      }),
      new Profession({
        name: 'Web Developer',
        type: TECHNOLOGY,
      }),
      new Profession({
        name: 'Information Technology Project Manager',
        type: TECHNOLOGY,
      }),
      new Profession({
        name: 'Software Quality Assurance Engineer',
        type: TECHNOLOGY,
      }),
      new Profession({
        name: 'Software Tester',
        type: TECHNOLOGY,
      }),
      new Profession({
        name: 'Computer Programmer',
        type: TECHNOLOGY,
      }),
      new Profession({
        name: 'Information Security Analyst',
        type: TECHNOLOGY,
      }),
      new Profession({
        name: 'Heavey Truck Driver',
        type: TRANSPORTATION,
      }),
      new Profession({
        name: 'Laborer',
        type: TRANSPORTATION,
      }),
      new Profession({
        name: 'Delivery Service Driver',
        type: TRANSPORTATION,
      }),
      new Profession({
        name: 'Driver/Sales Worker',
        type: TRANSPORTATION,
      }),
      new Profession({
        name: 'Operations Reasearch Analyst',
        type: TRANSPORTATION,
      }),
      new Profession({
        name: 'Logistician',
        type: TRANSPORTATION,
      }),
    ];


    // save model to database
    professions.map((profession) => {
      profession.save(function (err, profession) {
        if (err) return console.error(err);
        console.log(profession.name + " saved to professions");
      })
    })


  }
}

module.exports = professionSeeder;