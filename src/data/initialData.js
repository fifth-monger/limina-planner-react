export const buckets = [
  { id: 'hemingway', name: 'Hemingway', color: '#4A9FC4' },
  { id: 'japanese',  name: 'Japanese',  color: '#9070B8' },
  { id: 'rv',        name: 'RV repairs', color: '#C8922A' },
  { id: 'jobs',      name: 'Job hunt',   color: '#6B8F5E' },
  { id: 'studio',    name: 'limina.studio', color: '#C07060' },
]

export const weeklyRhythm = `Mon · Tue · Wed -- hemingway
Thu -- jobs (am) + app (pm)
Fri -- studio + business ideas
Sat · Sun -- yours`

export const openQuestions = [
  { id: 'oq1', text: 'Japanese: keep or pause? decide by friday.' },
]

export const todayBlocks = [
  {
    id: 'morning-ritual',
    type: 'task',
    isLifeAnchor: true,
    name: 'Morning Ritual',
    time: '08:00',
    duration: '45 min',
    color: '#B09070',
    subtasks: [
      { id: 'mr1', text: 'Meds + water', done: true },
      { id: 'mr2', text: 'Wash face + hygiene', done: true },
      { id: 'mr3', text: 'Breakfast', done: false },
      { id: 'mr4', text: 'Animal care', done: false },
    ],
  },
  {
    id: 'hemingway-block',
    type: 'focus',
    isLifeAnchor: false,
    name: 'Hemingway app',
    bucketId: 'hemingway',
    time: '09:00',
    duration: '3 hrs',
    color: '#4A9FC4',
    subtasks: [
      { id: 'hm1', text: 'Review last PR / open issues', done: true },
      { id: 'hm2', text: 'Build sentence analysis component', done: false },
      { id: 'hm3', text: 'Push at least one commit', done: false },
    ],
  },
  {
    id: 'lunch',
    type: 'task',
    isLifeAnchor: true,
    name: 'Lunch + midday reset',
    time: '12:00',
    duration: '45 min',
    color: '#B09070',
    subtasks: [
      { id: 'ln1', text: 'Eat something real', done: false },
      { id: 'ln2', text: 'Step outside', done: false },
    ],
  },
  {
    id: 'japanese-block',
    type: 'task',
    isLifeAnchor: false,
    name: 'Japanese',
    bucketId: 'japanese',
    time: '13:30',
    duration: '20 min',
    color: '#9070B8',
    subtasks: [
      { id: 'jp1', text: 'LingoDeer daily lesson', done: false },
      { id: 'jp2', text: 'Flashcard review', done: false },
    ],
  },
  {
    id: 'evening-ritual',
    type: 'task',
    isLifeAnchor: true,
    name: 'Evening Ritual',
    time: '20:00',
    duration: '30 min',
    color: '#B09070',
    subtasks: [
      { id: 'ev1', text: 'Evening meds', done: false },
      { id: 'ev2', text: 'Dinner + animal care', done: false },
      { id: 'ev3', text: 'Wind down', done: false },
    ],
  },
]

export const weekDays = [
  { day: 'Sun', date: 17, mode: 'rest', modeType: 'rest' },
  { day: 'Mon', date: 18, mode: 'hemingway', modeType: 'hem' },
  { day: 'Tue', date: 19, mode: 'hemingway', modeType: 'hem', isToday: true },
  { day: 'Wed', date: 20, mode: 'hemingway', modeType: 'hem' },
  { day: 'Thu', date: 21, mode: 'jobs + app', modeType: 'job' },
  { day: 'Fri', date: 22, mode: 'studio', modeType: 'stu' },
  { day: 'Sat', date: 23, mode: 'rest', modeType: 'rest' },
]

export const startHere = 'Open the Hemingway project and read your last 10 lines'
export const todayMode = 'hemingway day'
export const todayName = 'Tuesday'
