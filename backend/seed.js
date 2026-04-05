const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Curriculum = require('./models/Curriculum');
const Assessment = require('./models/Assessment');
const config = require('./config/config');

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Curriculum.deleteMany({});
    await Assessment.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'AICTE Admin',
      email: 'admin@aicte.gov.in',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Created admin user: admin@aicte.gov.in / admin123');

    // Create sample institute users
    const institute1 = await User.create({
      name: 'IIT Delhi',
      email: 'admin@iitd.ac.in',
      password: 'institute123',
      role: 'institute',
      instituteName: 'Indian Institute of Technology Delhi',
      instituteCode: 'IITD001',
      address: 'Hauz Khas, New Delhi - 110016',
      phone: '011-26591999'
    });

    const institute2 = await User.create({
      name: 'NIT Trichy',
      email: 'admin@nitt.edu',
      password: 'institute123',
      role: 'institute',
      instituteName: 'National Institute of Technology Tiruchirappalli',
      instituteCode: 'NITT001',
      address: 'Tiruchirappalli, Tamil Nadu - 620015',
      phone: '0431-2503000'
    });

    console.log('Created institute users');

    // Create sample curriculums
    const curriculums = await Curriculum.insertMany([
      {
        title: 'B.Tech Computer Science and Engineering',
        description: 'Model curriculum for undergraduate Computer Science program',
        programType: 'UG',
        branch: 'Computer Science and Engineering',
        academicYear: '2024-25',
        version: '1.0',
        status: 'published',
        publishedAt: new Date(),
        createdBy: admin._id,
        semesters: [
          {
            number: 1,
            subjects: [
              {
                name: 'Mathematics I',
                code: 'MA101',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand differential calculus',
                  'Apply integration techniques',
                  'Solve differential equations'
                ]
              },
              {
                name: 'Physics',
                code: 'PH101',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand mechanics',
                  'Apply electromagnetic principles'
                ]
              },
              {
                name: 'Programming Fundamentals',
                code: 'CS101',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Write programs in C',
                  'Understand algorithms',
                  'Debug code effectively'
                ]
              },
              {
                name: 'Programming Lab',
                code: 'CS101L',
                credits: 2,
                type: 'practical',
                learningOutcomes: [
                  'Implement algorithms',
                  'Test programs systematically'
                ]
              }
            ]
          },
          {
            number: 2,
            subjects: [
              {
                name: 'Mathematics II',
                code: 'MA102',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand linear algebra',
                  'Apply numerical methods'
                ]
              },
              {
                name: 'Data Structures',
                code: 'CS102',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Implement data structures',
                  'Analyze algorithm complexity'
                ]
              },
              {
                name: 'Digital Electronics',
                code: 'EC101',
                credits: 3,
                type: 'theory',
                learningOutcomes: [
                  'Design digital circuits',
                  'Understand logic gates'
                ]
              }
            ]
          }
        ]
      },
      {
        title: 'B.Tech Information Technology',
        description: 'Model curriculum for undergraduate IT program',
        programType: 'UG',
        branch: 'Information Technology',
        academicYear: '2024-25',
        version: '1.0',
        status: 'published',
        publishedAt: new Date(),
        createdBy: admin._id,
        semesters: [
          {
            number: 1,
            subjects: [
              {
                name: 'Mathematics I',
                code: 'MA101',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand differential calculus',
                  'Apply integration techniques'
                ]
              },
              {
                name: 'Physics',
                code: 'PH101',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand mechanics',
                  'Apply electromagnetic principles'
                ]
              },
              {
                name: 'Introduction to IT',
                code: 'IT101',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand basic IT infrastructure',
                  'Learn foundational networking'
                ]
              }
            ]
          },
          {
            number: 2,
            subjects: [
              {
                name: 'Mathematics II',
                code: 'MA102',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand linear algebra',
                  'Apply numerical methods'
                ]
              },
              {
                name: 'Object Oriented Programming',
                code: 'IT102',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Implement OOP concepts',
                  'Understand class hierarchies'
                ]
              },
              {
                name: 'Web Technologies',
                code: 'IT103',
                credits: 3,
                type: 'theory',
                learningOutcomes: [
                  'Design basic web pages',
                  'Understand HTML, CSS, JavaScript'
                ]
              }
            ]
          }
        ]
      },
      {
        title: 'B.Tech Electronics and Communication',
        description: 'Model curriculum for undergraduate ECE program',
        programType: 'UG',
        branch: 'Electronics and Communication Engineering',
        academicYear: '2024-25',
        version: '1.0',
        status: 'published',
        publishedAt: new Date(),
        createdBy: admin._id,
        semesters: [
          {
            number: 1,
            subjects: [
              {
                name: 'Mathematics I',
                code: 'MA101',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand differential calculus',
                  'Apply integration techniques'
                ]
              },
              {
                name: 'Physics',
                code: 'PH101',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand mechanics'
                ]
              },
              {
                name: 'Basic Electrical Engineering',
                code: 'EE101',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand electrical circuits',
                  'Network theorems and AC basics'
                ]
              }
            ]
          },
          {
            number: 2,
            subjects: [
              {
                name: 'Mathematics II',
                code: 'MA102',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand linear algebra'
                ]
              },
              {
                name: 'Network Theory',
                code: 'EC101',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Analyze complex network theorems',
                  'Solve steady state and transient circuits'
                ]
              },
              {
                name: 'Digital Logic Design',
                code: 'EC102',
                credits: 3,
                type: 'theory',
                learningOutcomes: [
                  'Design digital circuits',
                  'Implementation of combinational logic'
                ]
              }
            ]
          }
        ]
      },
      {
        title: 'B.Tech Mechanical Engineering',
        description: 'Model curriculum for undergraduate Mechanical Engineering program',
        programType: 'UG',
        branch: 'Mechanical Engineering',
        academicYear: '2024-25',
        version: '1.0',
        status: 'published',
        publishedAt: new Date(),
        createdBy: admin._id,
        semesters: [
          {
            number: 1,
            subjects: [
              {
                name: 'Mathematics I',
                code: 'MA101',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand differential calculus'
                ]
              },
              {
                name: 'Chemistry',
                code: 'CH101',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand basic chemistry',
                  'Polymers and water treatment'
                ]
              },
              {
                name: 'Engineering Drawing',
                code: 'ME101',
                credits: 3,
                type: 'practical',
                learningOutcomes: [
                  'Draw engineering drafts',
                  'CAD fundamentals'
                ]
              }
            ]
          },
          {
            number: 2,
            subjects: [
              {
                name: 'Mathematics II',
                code: 'MA102',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand linear algebra'
                ]
              },
              {
                name: 'Engineering Mechanics',
                code: 'ME102',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Analyze statics and dynamics',
                  'Free body diagrams'
                ]
              },
              {
                name: 'Thermodynamics',
                code: 'ME103',
                credits: 4,
                type: 'theory',
                learningOutcomes: [
                  'Understand laws of thermodynamics',
                  'Analyze thermodynamic cycles'
                ]
              }
            ]
          }
        ]
      },
      {
        title: 'B.Tech Civil Engineering',
        description: 'Model curriculum for undergraduate Civil Engineering program',
        programType: 'UG',
        branch: 'Civil Engineering',
        academicYear: '2024-25',
        version: '1.0',
        status: 'published',
        publishedAt: new Date(),
        createdBy: admin._id,
        semesters: [
          {
            number: 1,
            subjects: [
              { name: 'Mathematics I', code: 'MA101', credits: 4, type: 'theory', learningOutcomes: ['Understand differential calculus'] },
              { name: 'Physics', code: 'PH101', credits: 4, type: 'theory', learningOutcomes: ['Mechanics and Materials'] },
              { name: 'Engineering Graphics', code: 'CE101', credits: 3, type: 'practical', learningOutcomes: ['Drafting and CAD'] }
            ]
          },
          {
            number: 2,
            subjects: [
              { name: 'Mathematics II', code: 'MA102', credits: 4, type: 'theory', learningOutcomes: ['Linear algebra'] },
              { name: 'Basic Civil Engineering', code: 'CE102', credits: 4, type: 'theory', learningOutcomes: ['Surveying and materials'] },
              { name: 'Engineering Mechanics', code: 'ME102', credits: 4, type: 'theory', learningOutcomes: ['Statics and dynamics'] }
            ]
          }
        ]
      },
      {
        title: 'B.Tech Electrical Engineering',
        description: 'Model curriculum for undergraduate Electrical Engineering program',
        programType: 'UG',
        branch: 'Electrical Engineering',
        academicYear: '2024-25',
        version: '1.0',
        status: 'published',
        publishedAt: new Date(),
        createdBy: admin._id,
        semesters: [
          {
            number: 1,
            subjects: [
              { name: 'Mathematics I', code: 'MA101', credits: 4, type: 'theory', learningOutcomes: ['Understand differential calculus'] },
              { name: 'Physics', code: 'PH101', credits: 4, type: 'theory', learningOutcomes: ['Electromagnetism'] },
              { name: 'Basic Electrical Engineering', code: 'EE101', credits: 4, type: 'theory', learningOutcomes: ['Circuits and machines'] }
            ]
          },
          {
            number: 2,
            subjects: [
              { name: 'Mathematics II', code: 'MA102', credits: 4, type: 'theory', learningOutcomes: ['Calculus and transformations'] },
              { name: 'Electrical Circuits', code: 'EE102', credits: 4, type: 'theory', learningOutcomes: ['Network theorems'] },
              { name: 'Measurements and Instrumentation', code: 'EE103', credits: 3, type: 'theory', learningOutcomes: ['Measuring instruments'] }
            ]
          }
        ]
      },
      {
        title: 'B.Tech Chemical Engineering',
        description: 'Model curriculum for undergraduate Chemical Engineering program',
        programType: 'UG',
        branch: 'Chemical Engineering',
        academicYear: '2024-25',
        version: '1.0',
        status: 'published',
        publishedAt: new Date(),
        createdBy: admin._id,
        semesters: [
          {
            number: 1,
            subjects: [
              { name: 'Mathematics I', code: 'MA101', credits: 4, type: 'theory', learningOutcomes: ['Understand differential calculus'] },
              { name: 'Chemistry I', code: 'CH101', credits: 4, type: 'theory', learningOutcomes: ['Physical and inorganic chemistry'] },
              { name: 'Intro to Chemical Engineering', code: 'CHE101', credits: 3, type: 'theory', learningOutcomes: ['Material and energy balances'] }
            ]
          },
          {
            number: 2,
            subjects: [
              { name: 'Mathematics II', code: 'MA102', credits: 4, type: 'theory', learningOutcomes: ['Linear algebra'] },
              { name: 'Chemistry II', code: 'CH102', credits: 4, type: 'theory', learningOutcomes: ['Organic chemistry'] },
              { name: 'Fluid Mechanics', code: 'CHE102', credits: 4, type: 'theory', learningOutcomes: ['Fluid statics and dynamics'] }
            ]
          }
        ]
      },
      {
        title: 'B.Tech Aerospace Engineering',
        description: 'Model curriculum for undergraduate Aerospace Engineering program',
        programType: 'UG',
        branch: 'Aerospace Engineering',
        academicYear: '2024-25',
        version: '1.0',
        status: 'published',
        publishedAt: new Date(),
        createdBy: admin._id,
        semesters: [
          {
            number: 1,
            subjects: [
              { name: 'Mathematics I', code: 'MA101', credits: 4, type: 'theory', learningOutcomes: ['Understand differential calculus'] },
              { name: 'Physics', code: 'PH101', credits: 4, type: 'theory', learningOutcomes: ['Mechanics'] },
              { name: 'Intro to Aerospace', code: 'AE101', credits: 3, type: 'theory', learningOutcomes: ['Flight mechanics basics'] }
            ]
          },
          {
            number: 2,
            subjects: [
              { name: 'Mathematics II', code: 'MA102', credits: 4, type: 'theory', learningOutcomes: ['Calculus'] },
              { name: 'Aerodynamics I', code: 'AE102', credits: 4, type: 'theory', learningOutcomes: ['Airflow properties'] },
              { name: 'Engineering Mechanics', code: 'ME102', credits: 4, type: 'theory', learningOutcomes: ['Statics and dynamics'] }
            ]
          }
        ]
      },
      {
        title: 'B.Tech Biotechnology',
        description: 'Model curriculum for undergraduate Biotechnology program',
        programType: 'UG',
        branch: 'Biotechnology',
        academicYear: '2024-25',
        version: '1.0',
        status: 'published',
        publishedAt: new Date(),
        createdBy: admin._id,
        semesters: [
          {
            number: 1,
            subjects: [
              { name: 'Mathematics I', code: 'MA101', credits: 4, type: 'theory', learningOutcomes: ['Calculus'] },
              { name: 'Chemistry', code: 'CH101', credits: 4, type: 'theory', learningOutcomes: ['Basic chemistry'] },
              { name: 'Biology for Engineers', code: 'BT101', credits: 3, type: 'theory', learningOutcomes: ['Cellular biology'] }
            ]
          },
          {
            number: 2,
            subjects: [
              { name: 'Mathematics II', code: 'MA102', credits: 4, type: 'theory', learningOutcomes: ['Statistics'] },
              { name: 'Biochemistry', code: 'BT102', credits: 4, type: 'theory', learningOutcomes: ['Metabolism and biomolecules'] },
              { name: 'Microbiology', code: 'BT103', credits: 4, type: 'theory', learningOutcomes: ['Microbes and applications'] }
            ]
          }
        ]
      },
      {
        title: 'B.Tech Artificial Intelligence and Data Science',
        description: 'Model curriculum for undergraduate AI & DS program',
        programType: 'UG',
        branch: 'Artificial Intelligence and Data Science',
        academicYear: '2024-25',
        version: '1.0',
        status: 'published',
        publishedAt: new Date(),
        createdBy: admin._id,
        semesters: [
          {
            number: 1,
            subjects: [
              { name: 'Mathematics I', code: 'MA101', credits: 4, type: 'theory', learningOutcomes: ['Calculus and statistics'] },
              { name: 'Python Programming', code: 'CS103', credits: 4, type: 'theory', learningOutcomes: ['Write Python scripts'] },
              { name: 'Intro to AI', code: 'AI101', credits: 3, type: 'theory', learningOutcomes: ['Search and logic'] }
            ]
          },
          {
            number: 2,
            subjects: [
              { name: 'Mathematics II', code: 'MA102', credits: 4, type: 'theory', learningOutcomes: ['Linear algebra and probability'] },
              { name: 'Data Structures and Algorithms', code: 'CS102', credits: 4, type: 'theory', learningOutcomes: ['Algorithm implementation'] },
              { name: 'Machine Learning Basics', code: 'AI102', credits: 4, type: 'theory', learningOutcomes: ['Supervised learning'] }
            ]
          }
        ]
      }
    ]);

    console.log('Created 10 sample curriculums');

    // Create sample assessments
    const assessmentsToInsert = [];
    for (const curr of curriculums) {
      assessmentsToInsert.push({
        title: `${curr.branch} Midterm Assessment`,
        description: `Standard midterm assessment for ${curr.branch}`,
        courseId: curr._id,
        instituteId: institute1._id,
        type: 'Midterm',
        totalMarks: 50,
        passingMarks: 20,
        duration: 90,
        status: 'published',
        questions: [
          {
            questionText: 'What are the main objectives of this course?',
            type: 'LONG',
            marks: 10,
            difficulty: 'medium'
          },
          {
            questionText: 'Explain the fundamental concepts taught in module 1.',
            type: 'LONG',
            marks: 15,
            difficulty: 'hard'
          },
          {
            questionText: 'Is this a multiple choice question?',
            type: 'MCQ',
            marks: 5,
            options: ['Yes', 'No', 'Maybe'],
            correctAnswer: 'Yes',
            difficulty: 'easy'
          }
        ]
      });
      assessmentsToInsert.push({
        title: `${curr.branch} Final Quiz`,
        description: `Short quiz for ${curr.branch}`,
        courseId: curr._id,
        instituteId: institute2._id,
        type: 'Quiz',
        totalMarks: 20,
        passingMarks: 8,
        duration: 30,
        status: 'published',
        questions: [
          {
            questionText: 'What is the most fundamental concept mentioned in the syllabus?',
            type: 'MCQ',
            marks: 10,
            options: ['Concept A', 'Concept B', 'Concept C'],
            correctAnswer: 'Concept B',
            difficulty: 'medium'
          },
          {
            questionText: 'Briefly define the core principles of the subject.',
            type: 'SHORT',
            marks: 10,
            difficulty: 'easy'
          }
        ]
      });
    }

    await Assessment.insertMany(assessmentsToInsert);
    console.log(`Created ${assessmentsToInsert.length} sample assessments`);

    console.log('\n=== Seed Complete ===');
    console.log('Admin Login: admin@aicte.gov.in / admin123');
    console.log('Institute Login: admin@iitd.ac.in / institute123');
    console.log('Institute Login: admin@nitt.edu / institute123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();

