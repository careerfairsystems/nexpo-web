const testData = {
  companies: [
    {
      website: 'www.spotify.com',
      studentSessionDays: 0,
      name: 'Spotify',
      logoUrl: null,
      id: '1',
      description: 'We do music!',
      entries: [
        { id: '1', value: 'JA' },
        { id: 2, value: '20' }
      ]
    },
    {
      website: 'www.google.com',
      studentSessionDays: 0,
      name: 'Google',
      logoUrl: null,
      id: 2,
      description: 'We code!',
      entries: [
        { id: 3, value: 'JA' },
        { id: 4, value: '40' }
      ]
    },
    {
      website: 'www.ibm.com',
      studentSessionDays: 0,
      name: 'IBM',
      logoUrl: null,
      id: 3,
      description: 'We make things!',
      entries: [
        { id: 5, value: 'NEJ' },
        { id: 6, value: '60' }
      ]
    },
    {
      website: 'www.intel.com',
      studentSessionDays: 0,
      name: 'Intel',
      logoUrl: null,
      id: 4,
      description: 'We do stuff!',
      entries: [
        { id: 7, value: 'NEJ' },
        { id: 8, value: '80' }
      ]
    },
    {
      website: 'www.jesus.com',
      studentSessionDays: 0,
      name: 'Jesus wine makers',
      logoUrl: null,
      id: 5,
      description: 'We do wine!',
      entries: [
        { id: 9, value: 'JA' },
        { id: 10, value: '100' }
      ]
    }
  ],
  company: {
    website: 'www.spotify.com',
    studentSessionDays: 0,
    name: 'Spotify',
    logoUrl: null,
    id: '1',
    description: 'We do music!',
    entries: [
      { id: '1', value: 'JA' },
      { id: 2, value: '20' }
    ]
  },
  users: [
    {
      id: '1',
      email: 'admin@test.now',
      firstName: 'Dev',
      lastName: 'User'
    },
    {
      id: 2,
      email: 'student@test.later',
      firstName: 'Test',
      lastName: 'User'
    }
  ],
  user: {
    id: '1',
    email: 'admin@test.now',
    firstName: 'Dev',
    lastName: 'User',
    roles: [
      {
        id: '1',
        type: 'admin',
        permissions: ['read_all', 'write_all']
      }
    ]
  },
  roles: [
    {
      id: 1,
      type: 'admin',
      permissions: ['read_all', 'write_all']
    },
    {
      id: 2,
      type: 'manager',
      permissions: ['read_users', 'write_users']
    }
  ],
  role: {
    id: 1,
    name: 'Role1',
    type: 'admin',
    permissions: ['read_all', 'write_all'],
    users: [
      {
        id: '1',
        email: 'admin@test.now',
        firstName: 'Dev',
        lastName: 'User'
      }
    ]
  },
  studentSessionApplications: {
    '1': {
      id: '1',
      companyid: '1',
      studentid: '1',
      motivation: 'Old motivation'
    }
  },
  studentSessions: {
    '1': {
      id: '1',
      companyid: '1',
      studentid: '1',
      start: '2018-01-01',
      end: '2018-01-01',
      studentSessionStatus: 0
    }
  },
  studentSessionDays: {
    '1': {
      id: '1',
      companyid: '1',
      studentid: '1',
      start: '2018-01-01',
      end: '2018-01-01'
    }
  },
  statistics: {
    nbrApplicatons: 5
  }
};

export default testData;
