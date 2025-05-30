import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing data first (optional)
  await prisma.capsule.deleteMany({})
  
  const now = new Date()
  
  await prisma.capsule.createMany({
    data: [
      // Future capsules (scheduled)
      {
        title: 'My Goals for 2025',
        content: 'I hope by the time you read this, I\'ve started that book I\'ve been talking about writing. Remember to stay consistent with your morning routine and don\'t forget to call mom more often. You were excited about the new job opportunity - I hope it worked out!',
        deliveryDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30), // 1 month
        userId: 'user_demo_123',
        status: 'scheduled',
      },
      {
        title: 'Summer Adventures',
        content: 'Remember this feeling of excitement about the upcoming summer trip to Japan? I hope the cherry blossoms were as beautiful as we imagined. Did you finally try that ramen place in Tokyo that everyone recommended?',
        deliveryDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 90), // 3 months
        userId: 'user_demo_123',
        status: 'scheduled',
      },
      {
        title: 'Career Reflection',
        content: 'Today I made a big decision to switch careers into tech. I\'m nervous but excited. Future me - was it worth the sleepless nights of coding? Are you happy with where you ended up?',
        deliveryDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 365), // 1 year
        userId: 'user_demo_123',
        status: 'scheduled',
      },
      {
        title: 'Fitness Journey',
        content: 'Started going to the gym regularly this month. My goal is to run a marathon by next year. Let\'s see if future me actually stuck with it! Currently can barely run 5K without dying.',
        deliveryDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 180), // 6 months
        userId: 'user_demo_456',
        status: 'scheduled',
      },
      {
        title: 'New Relationship',
        content: 'Just started dating someone amazing. We\'ve been together for 2 weeks and I have such a good feeling about this. I wonder if we\'re still together when you read this, future me!',
        deliveryDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 60), // 2 months
        userId: 'user_demo_456',
        status: 'scheduled',
      },
      
      // Past capsules that should have been delivered (for testing delivered state)
      {
        title: 'New Year Resolutions Check-in',
        content: 'It\'s January 1st and I\'m feeling motivated! My resolutions: exercise 3x/week, read 24 books, learn Spanish, and save $5000. Let\'s see how I did!',
        deliveryDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30), // 1 month ago
        userId: 'user_demo_123',
        status: 'delivered',
      },
      {
        title: 'College Graduation',
        content: 'Just graduated college! I\'m scared about the real world but excited about the possibilities. I hope future me remembers to be proud of this achievement.',
        deliveryDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
        userId: 'user_demo_789',
        status: 'delivered',
      },
      
      // Some capsules due soon (for testing upcoming features)
      {
        title: 'Weekly Check-in',
        content: 'This week was tough but I pushed through. Reminder to celebrate the small wins and not be so hard on yourself.',
        deliveryDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
        userId: 'user_demo_123',
        status: 'scheduled',
      },
      {
        title: 'Birthday Reflection',
        content: 'Another year older, another year wiser (hopefully)! This year I want to focus on being more present and grateful for what I have.',
        deliveryDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7), // 1 week from now
        userId: 'user_demo_456',
        status: 'scheduled',
      },
      
      // Different user for testing multi-user scenarios
      {
        title: 'Moving to a New City',
        content: 'Today I decided to move to San Francisco for a new job. I\'m leaving everything familiar behind. Future me - was it the right choice? Are you happy there?',
        deliveryDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 120), // 4 months
        userId: 'user_demo_789',
        status: 'scheduled',
      },
      {
        title: 'Learning to Cook',
        content: 'Burned my first attempt at making pasta today. Mom would be disappointed! Goal: master 10 recipes by the time you read this.',
        deliveryDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 45), // 1.5 months
        userId: 'user_demo_789',
        status: 'scheduled',
      },
      {
        title: 'Mental Health Journey',
        content: 'Started therapy today. It feels scary but necessary. I hope by the time you read this, you\'ve learned better coping mechanisms and are kinder to yourself.',
        deliveryDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 180), // 6 months
        userId: 'user_demo_456',
        status: 'scheduled',
      },
    ],
  })

  console.log('🌱 Database seeded successfully with dummy capsules!')
  console.log('📊 Created capsules for 3 different users:')
  console.log('   - user_demo_123: 5 capsules')
  console.log('   - user_demo_456: 4 capsules') 
  console.log('   - user_demo_789: 3 capsules')
  console.log('📅 Mix of past, upcoming, and future delivery dates')
}

main()
  .catch(e => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 