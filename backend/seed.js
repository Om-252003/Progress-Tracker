const mongoose = require('mongoose');
const Week = require('./models/Week');
const Task = require('./models/Task');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/interview-prep-tracker';

const plan = [
  {
    number: 1,
    topics: ['Python Mastery', 'Basic DSA'],
    tasks: [
      'Learn Python syntax, data types, loops, functions, OOP',
      'Practice 3 easy array/string problems daily (LeetCode)',
      'Complete HackerRank 10 Days of Python',
      'Mock Test: 1 coding Q, 5 Python MCQs',
      'HR Task: Watch 1 HR interview prep video',
    ],
  },
  {
    number: 2,
    topics: ['Linked Lists', 'Time Complexity'],
    tasks: [
      'Learn singly and doubly linked lists (with Python implementation)',
      'Understand Big-O and recursion basics',
      'Practice 2 LL problems/day + 1 recursion Q',
      'Mock Test: Medium LL problem',
      'HR Task: Draft “Tell me about yourself”',
    ],
  },
  {
    number: 3,
    topics: ['Stacks', 'Queues', 'Recursion', 'SQL Basics'],
    tasks: [
      'Learn stack and queue implementation',
      'Practice infix/postfix/prefix basics',
      'Start basic SQL: SELECT, WHERE, CRUD',
      'Solve 3 coding Qs (stack/queue/recursion)',
      'Mock: 1 SQL test + 2 coding Qs',
    ],
  },
  {
    number: 4,
    topics: ['Trees', 'Advanced SQL'],
    tasks: [
      'Learn binary tree traversal (DFS, BFS), BSTs',
      'Practice tree problems (LeetCode)',
      'Study inner/outer JOIN, subqueries in SQL',
      'Mock: 1 tree coding Q + 1 SQL JOIN Q',
    ],
  },
  {
    number: 5,
    topics: ['Graphs', 'OS', 'System Design Basics'],
    tasks: [
      'Graphs: BFS, DFS, adjacency list/matrix',
      'OS: Process, thread, memory management',
      'System Design: concepts of latency, availability, load balancer',
      'Mock: Graph problem + 20 MCQs (OS + DB)',
    ],
  },
  {
    number: 6,
    topics: ['Dynamic Programming', 'System Design Core'],
    tasks: [
      'DP problems: Knapsack, LIS, LCS, Memoization',
      'System Design: Chat App, URL shortener',
      'Mock: 1 DP problem + design question',
      'Task: Record 2-3 min video explanation of a project',
    ],
  },
  {
    number: 7,
    topics: ['Mock Interviews', 'Revisions'],
    tasks: [
      'Revise all key DSA topics (arrays, LL, trees, graphs, DP)',
      'Review OS, DBMS, CN notes',
      'Daily mock interviews (DSA + HR)',
      'Resume check, GitHub polishing',
    ],
  },
  {
    number: 8,
    topics: ['Final Review', 'Flex Week'],
    tasks: [
      'Only revise and relax',
      'Mock test every alternate day',
      'Don’t learn new things unless major weak spots',
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Week.deleteMany({});
    await Task.deleteMany({});

    for (const weekData of plan) {
      const week = new Week({
        number: weekData.number,
        topics: weekData.topics,
      });
      await week.save();

      for (const taskDesc of weekData.tasks) {
        const task = new Task({
          week: weekData.number,
          topic: weekData.topics.join(', '),
          description: taskDesc,
          difficulty: 'Medium',
          resources: [],
          status: 'Pending',
        });
        await task.save();
      }
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seed();
