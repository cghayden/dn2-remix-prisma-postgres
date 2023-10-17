const seedData = {
  users: [
    {
      userId: 'user1',
      email: 'parent1@email.com',
      password: 'hashedPasswordHere',
      type: 'PARENT',
    },
    // ... add users for studios and instructors as needed
  ],
  parents: [
    {
      userId: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      dancers: [
        {
          id: 'dancer1',
          firstName: 'Alice',
          lastName: 'Doe',
          birthdate: new Date(2010, 0, 1),
        },
        {
          id: 'dancer2',
          firstName: 'Bob',
          lastName: 'Doe',
          birthdate: new Date(2008, 0, 1),
        },
      ],
    },
  ],
  studios: [
    {
      userId: 'studio1',
      name: 'Dance Studio 1',
      danceClasses: [
        {
          id: 'class1',
          name: 'Class 1',
          styleOfDance: 'jazz',
          competitive: true,
          recreational: false,
          recital: true,
        },
        // ... similarly define other classes
      ],
      danceLevels: [
        { id: 'level1', name: 'jazz', description: 'Jazz Level' },
        { id: 'level2', name: 'hip hop', description: 'Hip Hop Level' },
        { id: 'level3', name: 'lyric', description: 'Lyric Level' },
        { id: 'level4', name: 'tap', description: 'Tap Level' },
      ],
    },
    // ... similarly define other studios
  ],
}

// You can then use this seedData object to populate your database.
