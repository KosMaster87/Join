let backupContacts = [
  {
    userId: "guest@mail.de",
    contactId: "7LRe!!qTi8sfEIm8",
    name: "Birgit Brings",
    email: "bring@bor.de",
    phone: "2455575 4447",
    userColor: "var(--pink)",
    signature: "BB",
    selected: true,
  },
  {
    userId: "guest@mail.de",
    contactId: "3LVAgPlbm5DZaTo3",
    name: "Clenn Acrivopoulos",
    email: "Clenn@acri.de",
    phone: "124577 48852",
    userColor: "var(--orangeIcons)",
    signature: "CA",
    selected: true,
  },
  {
    userId: "guest@mail.de",
    contactId: "XBtuTHM%6Fr/AWiy",
    name: "Gurs Hausels",
    email: "hausels@mail.com",
    phone: "345567567",
    userColor: "var(--pink)",
    signature: "GH",
    selected: false,
  },
  {
    userId: "guest@mail.de",
    contactId: "kBZjaMifaHlundHx",
    name: "Hans Petersen",
    email: "h.p@petersen.de",
    phone: "25545 44425",
    userColor: "var(--yellow)",
    signature: "HP",
    selected: false,
  },
  {
    userId: "guest@mail.de",
    contactId: "5gE2gzEgoD39P?8d",
    name: "Jens Joops",
    email: "joops@da.de",
    phone: "24515542",
    userColor: "var(--red)",
    signature: "JJ",
    selected: false,
  },
  {
    userId: "guest@mail.de",
    contactId: "mDnoCP18nLHMrWeh",
    name: "Konstantin Aksenov",
    email: "Kontantin@aksenov.pa",
    phone: "1425 5778",
    userColor: "var(--red)",
    signature: "KA",
    selected: true,
  },
  {
    userId: "guest@mail.de",
    contactId: "dGhChRFz1AZcwRvK",
    name: "Marcel Terans",
    email: "Terans@naas.de",
    phone: "14458 2654",
    userColor: "var(--green)",
    signature: "MT",
    selected: false,
  },
  {
    userId: "guest@mail.de",
    contactId: "rcCZujbpK836Z!WD",
    name: "Max Mustermann",
    email: "Max@Mustermann.de",
    phone: "24574 2221",
    userColor: "var(--green)",
    signature: "MM",
    selected: true,
  },
  {
    userId: "guest@mail.de",
    contactId: "ERzLD9s?O7UfWQdh",
    name: "Mirela Bravicz",
    email: "bravicz@online.de",
    phone: "0176 999999",
    userColor: "var(--mintGreen)",
    signature: "MB",
    selected: false,
  },
  {
    userId: "guest@mail.de",
    contactId: "q?bvTA/xt4Guq5SQ",
    name: "Nuri Mahns",
    email: "mahns@mahns.de",
    phone: "557454",
    userColor: "var(--green)",
    signature: "NM",
    selected: false,
  },
  {
    userId: "guest@mail.de",
    contactId: "hupjmUH%jJG4RqKP",
    name: "Sascha Lenz",
    email: "sascha@test.de",
    phone: "1234 55678",
    userColor: "var(--orangeIcons)",
    signature: "SL",
    selected: true,
  },
];

let backupTasks = [
  {
    status: "done",
    title: "Meeting 18Uhr Frontend",
    description: "Feedback über Finishes.",
    assignedTo: [
      {
        name: "Konstantin Aksenov",
        userColor: "var(--red)",
      },
      {
        name: "Clenn Acrivopoulos",
        userColor: "var(--orangeIcons)",
      },
      {
        name: "Max Mustermann",
        userColor: "var(--green)",
      },
      {
        name: "Sascha Lenz",
        userColor: "var(--orangeIcons)",
      },
      {
        name: "Birgit Brings",
        userColor: "var(--pink)",
      },
    ],
    dueDate: "2025-05-07",
    prio: "Medium",
    category: "User Story",
    subtasks: [
      {
        name: "2min pro",
        done: true,
      },
      {
        name: "Kurz halten",
        done: true,
      },
    ],
  },
  {
    status: "done",
    title: "Backend Bereinigung",
    description: "Bereinigen des Backends am Anfang der Woche",
    assignedTo: [
      {
        name: "mathilde mahns",
        userColor: "var(--green)",
      },
      {
        name: "Konstantin Aksenov",
        userColor: "var(--red)",
      },
      {
        name: "jens joops",
        userColor: "var(--red)",
      },
    ],
    dueDate: "2025-01-23",
    prio: "Medium",
    category: "Technical Task",
    subtasks: [
      {
        name: "create Backup",
        done: false,
      },
      {
        name: "delete storage",
        done: false,
      },
    ],
  },
  {
    status: "to-do",
    title: "Meeting 11 Uhr",
    description: "Montags Meeting",
    assignedTo: [
      {
        name: "jens joops",
        userColor: "var(--red)",
      },
      {
        name: "Konstantin Aksenov",
        userColor: "var(--red)",
      },
      {
        name: "Sascha Lenz",
        userColor: "var(--orangeIcons)",
      },
      {
        name: "mathilde mahns",
        userColor: "var(--green)",
      },
      {
        name: "Marcel Terans",
        userColor: "var(--green)",
      },
      {
        name: "tasdfasdf",
        userColor: "var(--pink)",
      },
      {
        name: "Birgit Brings",
        userColor: "var(--pink)",
      },
      {
        name: "Clenn Acrivopoulos",
        userColor: "var(--orangeIcons)",
      },
    ],
    dueDate: "2025-03-12",
    prio: "Urgent",
    category: "User Story",
    subtasks: [
      {
        name: "E-mail aufteilen",
        done: false,
      },
      {
        name: "smalltalk",
        done: false,
      },
      {
        name: "termine für persöhnliche talks",
        done: false,
      },
    ],
  },
  {
    status: "progress",
    title: "Bestellung neues Equiptment",
    description: "Neue Laptops für neue Mitarbeiter bestellen.",
    assignedTo: [
      {
        name: "Sascha Lenz",
        userColor: "var(--orangeIcons)",
      },
      {
        name: "Konstantin Aksenov",
        userColor: "var(--red)",
      },
      {
        name: "Clenn Acrivopoulos",
        userColor: "var(--orangeIcons)",
      },
    ],
    dueDate: "2025-01-22",
    prio: "Low",
    category: "User Story",
    subtasks: [
      {
        name: "welche marke apple/Lenovo/dell",
        done: true,
      },
      {
        name: "pro/Contras",
        done: false,
      },
      {
        name: "preise",
        done: false,
      },
    ],
  },
  {
    status: "await",
    title: "Anmeldung Firmenfitness",
    description: "Firma bei UrbanSports anmelden.",
    assignedTo: [],
    dueDate: "2025-04-18",
    prio: "Low",
    category: "User Story",
    subtasks: [
      {
        name: "E-mail schreiben",
        done: true,
      },
    ],
  },
  {
    status: "await",
    title: "Firmenwagen leasing und testen",
    description: "anfrage für ein Firmenwagen leasing.",
    assignedTo: [
      {
        name: "Konstantin Aksenov",
        userColor: "var(--red)",
      },
      {
        name: "Max Mustermann",
        userColor: "var(--green)",
      },
    ],
    dueDate: "2025-03-05",
    prio: "Medium",
    category: "Technical Task",
    subtasks: [],
  },
];
