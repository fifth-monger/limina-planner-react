export const buckets = [
  { id: 'hemingway', name: 'Hemingway',     color: '#4A9FC4' },
  { id: 'japanese',  name: 'Japanese',      color: '#9070B8' },
  { id: 'rv',        name: 'RV repairs',    color: '#C8922A' },
  { id: 'jobs',      name: 'Job hunt',      color: '#6B8F5E' },
  { id: 'studio',    name: 'limina.studio', color: '#C07060' },
]

export const weeklyRhythm = `Mon -- hemingway + job hunt (end of day)
Tue -- hemingway all day
Wed -- rest / life admin / free
Thu -- hemingway (am) + limina planner (pm)
Fri -- hemingway + job hunt + wrap
Sat · Sun -- yours`

export const openQuestions = [
  { id: 'oq1', text: 'Japanese: keep or pause? decide by friday.' },
]

export const weekDays = [
  { day: 'Sun', date: 17, mode: 'rest',        modeType: 'rest' },
  { day: 'Mon', date: 18, mode: 'hem + hunt',  modeType: 'hem' },
  { day: 'Tue', date: 19, mode: 'hemingway',   modeType: 'hem', isToday: true },
  { day: 'Wed', date: 20, mode: 'rest / admin',modeType: 'rest' },
  { day: 'Thu', date: 21, mode: 'hem + limina',modeType: 'hem' },
  { day: 'Fri', date: 22, mode: 'hem + hunt',  modeType: 'hem' },
  { day: 'Sat', date: 23, mode: 'rest',        modeType: 'rest' },
]

export const dayNotes = {
  Mon: 'Outdoor work + hemingway all morning. Job hunt at end of day.',
  Tue: 'Daily tidy + hemingway all day. No job hunt, no Limina.',
  Wed: 'No planned work. Rest, life admin, RV, garden — your call.',
  Thu: 'Daily tidy + hemingway morning. Limina Planner afternoon.',
  Fri: 'Outdoor work + hemingway morning. Job hunt midday. Wrap by 5:25.',
  Sat: 'Neighbor animals + weekly tidy. Everything else is yours.',
  Sun: 'Full rest. No work screens.',
}

export const startHereByDay = {
  Mon: 'Open the Hemingway project and read your last 10 lines',
  Tue: 'Open the Hemingway project and read your last 10 lines',
  Wed: 'Write one word on a sticky note — decide what today is',
  Thu: 'Open the Hemingway project and read your last 10 lines',
  Fri: 'Open the Hemingway project and read your last 10 lines',
  Sat: null,
  Sun: null,
}

// ─── Block types ──────────────────────────────────────────────────────────────
// type: 'task'   — life anchor or daily habit. circle indicators. resets daily.
// type: 'focus'  — project block. checkbox indicators. incomplete tasks roll forward.
// type: 'buffer' — quiet visual separator. no interaction. just `label` + `time`.
// tip: optional coaching note shown at the bottom of a block (🧠 prefix)
// All times stored in 24h format (HH:MM) for reliable sorting.
// ─────────────────────────────────────────────────────────────────────────────

export const scheduleByDay = {
  // ── MONDAY ──────────────────────────────────────────────────────────────────
  Mon: [
    {
      id: 'mon-outdoor', type: 'task', isLifeAnchor: false,
      name: 'Outdoor work', time: '07:00', duration: '~1.5 hrs', color: '#0F6E56',
      tip: 'Animals first, then whatever the land needs.',
      subtasks: [
        { id: 'mo1', text: 'Neighbor animals (morning)', done: false },
        { id: 'mo2', text: 'Chickens + property walk', done: false },
      ],
    },
    {
      id: 'mon-bf', type: 'task', isLifeAnchor: true,
      name: 'Breakfast', time: '10:45', duration: '~15 min', color: '#BA7517',
      tip: 'Eat before meds every time.',
      subtasks: [
        { id: 'mbf1', text: 'Sit down and eat actual food', done: false },
      ],
    },
    {
      id: 'mon-meds', type: 'task', isLifeAnchor: true,
      name: 'Morning meds', time: '11:00', duration: '5 min', color: '#7F77DD',
      tip: 'Set your 9PM alarm RIGHT NOW.',
      subtasks: [
        { id: 'mmd1', text: 'Take meds with food', done: false },
        { id: 'mmd2', text: 'Set 9PM phone alarm', done: false },
      ],
    },
    {
      id: 'mon-hygiene', type: 'task', isLifeAnchor: true,
      name: 'Morning hygiene + get dressed', time: '11:05', duration: '~20 min', color: '#C27BA0',
      tip: 'Laptop stays closed until this is completely done.',
      subtasks: [
        { id: 'mhy1', text: 'Shower if needed (2+ days? be honest)', done: false },
        { id: 'mhy2', text: 'Wash face', done: false },
        { id: 'mhy3', text: 'SPF — even if staying in', done: false },
        { id: 'mhy4', text: 'Brush teeth', done: false },
        { id: 'mhy5', text: 'Deodorant', done: false },
        { id: 'mhy6', text: 'Get dressed — real clothes', done: false },
      ],
    },
    {
      id: 'mon-hem1', type: 'focus', isLifeAnchor: false,
      name: 'Hemingway — block 1', bucketId: 'hemingway', time: '11:25', duration: '~2 hrs', color: '#4A9FC4',
      tip: 'Write one goal before opening anything.',
      subtasks: [
        { id: 'mh11', text: 'Write one goal for this block', done: false },
        { id: 'mh12', text: 'Build / design / dev — whatever is next', done: false },
      ],
    },
    { id: 'mon-lunch-buf', type: 'buffer', time: '13:30', label: 'save work, step away from desk' },
    {
      id: 'mon-lunch', type: 'task', isLifeAnchor: true,
      name: 'Lunch', time: '13:30', duration: '30 min', color: '#BA7517',
      tip: 'Non-negotiable. Away from desk.',
      subtasks: [
        { id: 'mln1', text: 'Step away from desk', done: false },
        { id: 'mln2', text: 'Eat real food', done: false },
      ],
    },
    {
      id: 'mon-hem2', type: 'focus', isLifeAnchor: false,
      name: 'Hemingway — block 2', bucketId: 'hemingway', time: '14:05', duration: '~85 min', color: '#4A9FC4',
      tip: 'Blocker? Write it down, keep moving.',
      subtasks: [
        { id: 'mh21', text: 'Return to project', done: false },
        { id: 'mh22', text: 'Keep building', done: false },
      ],
    },
    { id: 'mon-break-buf', type: 'buffer', time: '15:30', label: 'screen break — water, move your body' },
    {
      id: 'mon-break', type: 'task', isLifeAnchor: false,
      name: 'Afternoon break', time: '15:30', duration: '15 min', color: '#C4BAA8',
      tip: 'Skipping this is what makes 4–5PM feel impossible.',
      subtasks: [
        { id: 'mbr1', text: 'Away from desk', done: false },
        { id: 'mbr2', text: 'Water + stretch + 5 min outside', done: false },
      ],
    },
    {
      id: 'mon-hunt', type: 'focus', isLifeAnchor: false,
      name: 'Job hunt — apps + outreach', bucketId: 'jobs', time: '15:45', duration: '~100 min', color: '#6B8F5E',
      tip: 'Log before you apply. Tracker update first.',
      subtasks: [
        { id: 'mjh1', text: 'Update job tracker', done: false },
        { id: 'mjh2', text: '1–2 quality applications', done: false },
        { id: 'mjh3', text: 'Cold outreach if applicable', done: false },
      ],
    },
    { id: 'mon-wrap-buf', type: 'buffer', time: '17:25', label: 'save work, wrap up' },
    {
      id: 'mon-animals-eve', type: 'task', isLifeAnchor: true,
      name: 'Homestead animal care', time: '17:30', duration: '30 min', color: '#1D9E75',
      subtasks: [
        { id: 'mae1', text: 'Chickens, cats, dogs — full routine', done: false },
      ],
    },
    {
      id: 'mon-dinner', type: 'task', isLifeAnchor: true,
      name: 'Dinner', time: '18:00', duration: '~45 min', color: '#BA7517',
      subtasks: [
        { id: 'mdi1', text: 'Sit down. Real food.', done: false },
      ],
    },
    {
      id: 'mon-neighbor-eve', type: 'task', isLifeAnchor: false,
      name: 'Neighbor animals (evening)', time: '19:45', duration: '30 min', color: '#1D9E75',
      subtasks: [
        { id: 'mne1', text: '30 min paid care', done: false },
      ],
    },
    {
      id: 'mon-shower', type: 'task', isLifeAnchor: false,
      name: 'Shower check-in', time: '20:15', duration: '5 min', color: '#C27BA0',
      tip: "You don't have to shower every day. But you do have to consciously decide.",
      subtasks: [
        { id: 'msc1', text: 'Showered today? → skip to 9PM meds', done: false },
        { id: 'msc2', text: 'Not yet? → shower now', done: false },
      ],
    },
    {
      id: 'mon-nightmeds', type: 'task', isLifeAnchor: true,
      name: 'Evening meds + hygiene', time: '21:05', duration: '~15 min', color: '#7F77DD',
      tip: 'Meds → bathroom → nook. One motion.',
      subtasks: [
        { id: 'mnm1', text: 'Evening meds', done: false },
        { id: 'mnm2', text: 'Cleanser + serum + moisturizer', done: false },
        { id: 'mnm3', text: 'Brush teeth', done: false },
      ],
    },
    {
      id: 'mon-wind', type: 'task', isLifeAnchor: false,
      name: 'Wind down', time: '21:20', duration: 'open', color: '#5B4B8A',
      subtasks: [
        { id: 'mwd1', text: 'Reading / crochet / music / low screen', done: false },
      ],
    },
  ],

  // ── TUESDAY ─────────────────────────────────────────────────────────────────
  Tue: [
    {
      id: 'tue-tidy', type: 'task', isLifeAnchor: false,
      name: 'Daily tidy', time: '08:30', duration: '30 min', color: '#7A7870',
      tip: 'One direction, no backtracking. Done when timer goes off.',
      subtasks: [
        { id: 'tty1', text: 'Set 30 min timer', done: false },
        { id: 'tty2', text: 'Kitchen — surfaces + sink', done: false },
        { id: 'tty3', text: 'Living area — put things away', done: false },
        { id: 'tty4', text: 'Bathroom surfaces', done: false },
        { id: 'tty5', text: 'Quick floor sweep', done: false },
        { id: 'tty6', text: 'STOP when timer goes off', done: false },
      ],
    },
    {
      id: 'tue-bf', type: 'task', isLifeAnchor: true,
      name: 'Breakfast', time: '10:45', duration: '~15 min', color: '#BA7517',
      tip: 'Eat before meds every time.',
      subtasks: [
        { id: 'tbf1', text: 'Sit down and eat actual food', done: false },
      ],
    },
    {
      id: 'tue-meds', type: 'task', isLifeAnchor: true,
      name: 'Morning meds', time: '11:00', duration: '5 min', color: '#7F77DD',
      tip: 'Set your 9PM alarm RIGHT NOW.',
      subtasks: [
        { id: 'tmd1', text: 'Take meds with food', done: false },
        { id: 'tmd2', text: 'Set 9PM phone alarm', done: false },
      ],
    },
    {
      id: 'tue-hygiene', type: 'task', isLifeAnchor: true,
      name: 'Morning hygiene + get dressed', time: '11:05', duration: '~20 min', color: '#C27BA0',
      tip: 'Laptop stays closed until this is completely done.',
      subtasks: [
        { id: 'thy1', text: 'Shower if needed', done: false },
        { id: 'thy2', text: 'Wash face', done: false },
        { id: 'thy3', text: 'SPF', done: false },
        { id: 'thy4', text: 'Brush teeth', done: false },
        { id: 'thy5', text: 'Deodorant', done: false },
        { id: 'thy6', text: 'Get dressed — real clothes', done: false },
      ],
    },
    {
      id: 'tue-hem1', type: 'focus', isLifeAnchor: false,
      name: 'Hemingway — block 1', bucketId: 'hemingway', time: '11:25', duration: '~2 hrs', color: '#4A9FC4',
      tip: 'Longest uninterrupted block of the week. Phone face down. One tab.',
      subtasks: [
        { id: 'th11', text: 'Write one goal', done: false },
        { id: 'th12', text: 'Build', done: false },
      ],
    },
    { id: 'tue-lunch-buf', type: 'buffer', time: '13:30', label: 'save work, step away from desk' },
    {
      id: 'tue-lunch', type: 'task', isLifeAnchor: true,
      name: 'Lunch', time: '13:30', duration: '30 min', color: '#BA7517',
      subtasks: [
        { id: 'tln1', text: 'Away from desk', done: false },
        { id: 'tln2', text: 'Eat real food', done: false },
      ],
    },
    {
      id: 'tue-hem2', type: 'focus', isLifeAnchor: false,
      name: 'Hemingway — block 2', bucketId: 'hemingway', time: '14:05', duration: '~85 min', color: '#4A9FC4',
      tip: 'Review, content, testing.',
      subtasks: [
        { id: 'th21', text: 'Return to project', done: false },
        { id: 'th22', text: 'Review + test', done: false },
      ],
    },
    { id: 'tue-break-buf', type: 'buffer', time: '15:30', label: 'screen break — water, move your body' },
    {
      id: 'tue-break', type: 'task', isLifeAnchor: false,
      name: 'Afternoon break', time: '15:30', duration: '15 min', color: '#C4BAA8',
      subtasks: [
        { id: 'tbr1', text: 'Water + stretch + outside', done: false },
      ],
    },
    {
      id: 'tue-hem3', type: 'focus', isLifeAnchor: false,
      name: 'Hemingway — block 3', bucketId: 'hemingway', time: '15:45', duration: '~100 min', color: '#4A9FC4',
      tip: "Natural stopping point? Note what's next and close cleanly.",
      subtasks: [
        { id: 'th31', text: 'Final push — polish, QA, wrap', done: false },
        { id: 'th32', text: "Write what's next before closing", done: false },
      ],
    },
    { id: 'tue-wrap-buf', type: 'buffer', time: '17:25', label: 'save work, wrap up' },
    {
      id: 'tue-animals-eve', type: 'task', isLifeAnchor: true,
      name: 'Homestead animal care', time: '17:30', duration: '30 min', color: '#1D9E75',
      subtasks: [
        { id: 'tae1', text: 'Chickens, cats, dogs', done: false },
      ],
    },
    {
      id: 'tue-dinner', type: 'task', isLifeAnchor: true,
      name: 'Dinner', time: '18:00', duration: '~45 min', color: '#BA7517',
      subtasks: [
        { id: 'tdi1', text: 'Sit down. Real food.', done: false },
      ],
    },
    {
      id: 'tue-neighbor-eve', type: 'task', isLifeAnchor: false,
      name: 'Neighbor animals (evening)', time: '19:45', duration: '30 min', color: '#1D9E75',
      subtasks: [
        { id: 'tne1', text: '30 min paid care', done: false },
      ],
    },
    {
      id: 'tue-nightmeds', type: 'task', isLifeAnchor: true,
      name: 'Evening meds + hygiene', time: '21:05', duration: '~15 min', color: '#7F77DD',
      tip: 'Meds → bathroom → nook. One motion.',
      subtasks: [
        { id: 'tnm1', text: 'Evening meds', done: false },
        { id: 'tnm2', text: 'Cleanser + serum + moisturizer', done: false },
        { id: 'tnm3', text: 'Brush teeth', done: false },
      ],
    },
    {
      id: 'tue-wind', type: 'task', isLifeAnchor: false,
      name: 'Wind down', time: '21:20', duration: 'open', color: '#5B4B8A',
      subtasks: [
        { id: 'twd1', text: 'Reading / crochet / music / low screen', done: false },
      ],
    },
  ],

  // ── WEDNESDAY ───────────────────────────────────────────────────────────────
  Wed: [
    {
      id: 'wed-animals-am', type: 'task', isLifeAnchor: true,
      name: 'Homestead animal care', time: '08:00', duration: '30 min', color: '#1D9E75',
      subtasks: [
        { id: 'waa1', text: 'Chickens, cats, dogs — morning routine', done: false },
      ],
    },
    {
      id: 'wed-bf', type: 'task', isLifeAnchor: true,
      name: 'Breakfast + meds', time: '09:00', duration: '20 min', color: '#BA7517',
      subtasks: [
        { id: 'wbf1', text: 'Eat real food', done: false },
        { id: 'wbf2', text: 'Morning meds', done: false },
      ],
    },
    {
      id: 'wed-admin', type: 'focus', isLifeAnchor: false,
      name: 'Life admin (open)', bucketId: 'rv', time: '10:00', duration: 'flex', color: '#C8922A',
      tip: 'One concrete thing only. Write it down before you start.',
      subtasks: [
        { id: 'wad1', text: 'Decide on one admin task', done: false },
        { id: 'wad2', text: 'Do it', done: false },
      ],
    },
    {
      id: 'wed-lunch', type: 'task', isLifeAnchor: true,
      name: 'Lunch', time: '12:30', duration: '30 min', color: '#BA7517',
      subtasks: [
        { id: 'wln1', text: 'Eat real food', done: false },
      ],
    },
    {
      id: 'wed-free', type: 'task', isLifeAnchor: false,
      name: 'Free time / rest', time: '13:00', duration: 'open', color: '#9070B8',
      tip: 'Garden, RV, reading, nothing — all valid.',
      subtasks: [
        { id: 'wfr1', text: 'Do whatever you actually want', done: false },
      ],
    },
    {
      id: 'wed-animals-eve', type: 'task', isLifeAnchor: true,
      name: 'Homestead animal care', time: '17:30', duration: '30 min', color: '#1D9E75',
      subtasks: [
        { id: 'wae1', text: 'Chickens, cats, dogs — evening routine', done: false },
      ],
    },
    {
      id: 'wed-dinner', type: 'task', isLifeAnchor: true,
      name: 'Dinner', time: '18:00', duration: '~45 min', color: '#BA7517',
      subtasks: [
        { id: 'wdi1', text: 'Sit down. Real food.', done: false },
      ],
    },
    {
      id: 'wed-nightmeds', type: 'task', isLifeAnchor: true,
      name: 'Evening meds + hygiene', time: '21:05', duration: '~15 min', color: '#7F77DD',
      subtasks: [
        { id: 'wnm1', text: 'Evening meds', done: false },
        { id: 'wnm2', text: 'Skin care + brush teeth', done: false },
      ],
    },
  ],

  // ── THURSDAY ────────────────────────────────────────────────────────────────
  Thu: [
    {
      id: 'thu-tidy', type: 'task', isLifeAnchor: false,
      name: 'Daily tidy', time: '08:30', duration: '30 min', color: '#7A7870',
      tip: 'One direction, no backtracking.',
      subtasks: [
        { id: 'thtd1', text: 'Set 30 min timer', done: false },
        { id: 'thtd2', text: 'Kitchen, living area, bathroom surfaces', done: false },
        { id: 'thtd3', text: 'STOP when timer goes off', done: false },
      ],
    },
    {
      id: 'thu-bf', type: 'task', isLifeAnchor: true,
      name: 'Breakfast + meds', time: '10:45', duration: '20 min', color: '#BA7517',
      subtasks: [
        { id: 'thbf1', text: 'Eat before meds', done: false },
        { id: 'thbf2', text: 'Morning meds + set 9PM alarm', done: false },
      ],
    },
    {
      id: 'thu-hygiene', type: 'task', isLifeAnchor: true,
      name: 'Morning hygiene + get dressed', time: '11:05', duration: '~20 min', color: '#C27BA0',
      subtasks: [
        { id: 'thhy1', text: 'Wash face + SPF + teeth + deodorant', done: false },
        { id: 'thhy2', text: 'Get dressed — real clothes', done: false },
      ],
    },
    {
      id: 'thu-hem', type: 'focus', isLifeAnchor: false,
      name: 'Hemingway — morning block', bucketId: 'hemingway', time: '11:25', duration: '~2 hrs', color: '#4A9FC4',
      tip: 'Write one goal before opening anything.',
      subtasks: [
        { id: 'thhm1', text: 'Write one goal', done: false },
        { id: 'thhm2', text: 'Build', done: false },
      ],
    },
    { id: 'thu-lunch-buf', type: 'buffer', time: '13:30', label: 'save work, step away from desk' },
    {
      id: 'thu-lunch', type: 'task', isLifeAnchor: true,
      name: 'Lunch', time: '13:30', duration: '30 min', color: '#BA7517',
      subtasks: [
        { id: 'thln1', text: 'Away from desk', done: false },
        { id: 'thln2', text: 'Eat real food', done: false },
      ],
    },
    {
      id: 'thu-limina1', type: 'focus', isLifeAnchor: false,
      name: 'Limina Planner — block 1', bucketId: 'studio', time: '14:05', duration: '~85 min', color: '#C07060',
      tip: 'This is the app you are building. Treat it like Hemingway.',
      subtasks: [
        { id: 'thlm1', text: 'Write one goal for this session', done: false },
        { id: 'thlm2', text: 'Build', done: false },
      ],
    },
    { id: 'thu-break-buf', type: 'buffer', time: '15:30', label: 'screen break — water, move your body' },
    {
      id: 'thu-break', type: 'task', isLifeAnchor: false,
      name: 'Afternoon break', time: '15:30', duration: '15 min', color: '#C4BAA8',
      subtasks: [
        { id: 'thbr1', text: 'Water + stretch + outside', done: false },
      ],
    },
    {
      id: 'thu-limina2', type: 'focus', isLifeAnchor: false,
      name: 'Limina Planner — block 2', bucketId: 'studio', time: '15:45', duration: '~100 min', color: '#C07060',
      tip: "Natural stopping point? Write what's next before closing.",
      subtasks: [
        { id: 'thlm3', text: 'Continue build', done: false },
        { id: 'thlm4', text: "Write what's next before closing", done: false },
      ],
    },
    { id: 'thu-wrap-buf', type: 'buffer', time: '17:25', label: 'save work, wrap up' },
    {
      id: 'thu-animals-eve', type: 'task', isLifeAnchor: true,
      name: 'Homestead animal care', time: '17:30', duration: '30 min', color: '#1D9E75',
      subtasks: [{ id: 'thae1', text: 'Chickens, cats, dogs', done: false }],
    },
    {
      id: 'thu-dinner', type: 'task', isLifeAnchor: true,
      name: 'Dinner', time: '18:00', duration: '~45 min', color: '#BA7517',
      subtasks: [{ id: 'thdi1', text: 'Sit down. Real food.', done: false }],
    },
    {
      id: 'thu-neighbor-eve', type: 'task', isLifeAnchor: false,
      name: 'Neighbor animals (evening)', time: '19:45', duration: '30 min', color: '#1D9E75',
      subtasks: [{ id: 'thne1', text: '30 min paid care', done: false }],
    },
    {
      id: 'thu-nightmeds', type: 'task', isLifeAnchor: true,
      name: 'Evening meds + hygiene', time: '21:05', duration: '~15 min', color: '#7F77DD',
      subtasks: [
        { id: 'thnm1', text: 'Evening meds', done: false },
        { id: 'thnm2', text: 'Skin care + brush teeth', done: false },
      ],
    },
  ],

  // ── FRIDAY ──────────────────────────────────────────────────────────────────
  Fri: [
    {
      id: 'fri-outdoor', type: 'task', isLifeAnchor: false,
      name: 'Outdoor work', time: '07:00', duration: '~1.5 hrs', color: '#0F6E56',
      subtasks: [
        { id: 'fro1', text: 'Neighbor animals (morning)', done: false },
        { id: 'fro2', text: 'Chickens + property walk', done: false },
      ],
    },
    {
      id: 'fri-bf', type: 'task', isLifeAnchor: true,
      name: 'Breakfast + meds', time: '10:45', duration: '20 min', color: '#BA7517',
      subtasks: [
        { id: 'frbf1', text: 'Eat before meds', done: false },
        { id: 'frbf2', text: 'Morning meds + set 9PM alarm', done: false },
      ],
    },
    {
      id: 'fri-hygiene', type: 'task', isLifeAnchor: true,
      name: 'Morning hygiene + get dressed', time: '11:05', duration: '~20 min', color: '#C27BA0',
      subtasks: [
        { id: 'frhy1', text: 'Wash face + SPF + teeth + deodorant', done: false },
        { id: 'frhy2', text: 'Get dressed — real clothes', done: false },
      ],
    },
    {
      id: 'fri-hem', type: 'focus', isLifeAnchor: false,
      name: 'Hemingway — morning block', bucketId: 'hemingway', time: '11:25', duration: '~2 hrs', color: '#4A9FC4',
      tip: 'Write one goal before opening anything.',
      subtasks: [
        { id: 'frhm1', text: 'Write one goal', done: false },
        { id: 'frhm2', text: 'Build', done: false },
      ],
    },
    { id: 'fri-lunch-buf', type: 'buffer', time: '13:30', label: 'save work, step away from desk' },
    {
      id: 'fri-lunch', type: 'task', isLifeAnchor: true,
      name: 'Lunch', time: '13:30', duration: '30 min', color: '#BA7517',
      subtasks: [
        { id: 'frln1', text: 'Away from desk', done: false },
        { id: 'frln2', text: 'Eat real food', done: false },
      ],
    },
    {
      id: 'fri-hunt', type: 'focus', isLifeAnchor: false,
      name: 'Job hunt — apps + outreach', bucketId: 'jobs', time: '14:05', duration: '~85 min', color: '#6B8F5E',
      tip: 'Log before you apply. Tracker update first.',
      subtasks: [
        { id: 'frjh1', text: 'Update job tracker', done: false },
        { id: 'frjh2', text: '1–2 quality applications', done: false },
        { id: 'frjh3', text: 'Cold outreach if applicable', done: false },
      ],
    },
    { id: 'fri-wrap-buf', type: 'buffer', time: '17:25', label: 'save work, wrap up — end of week' },
    {
      id: 'fri-animals-eve', type: 'task', isLifeAnchor: true,
      name: 'Homestead animal care', time: '17:30', duration: '30 min', color: '#1D9E75',
      subtasks: [{ id: 'frae1', text: 'Chickens, cats, dogs', done: false }],
    },
    {
      id: 'fri-dinner', type: 'task', isLifeAnchor: true,
      name: 'Dinner', time: '18:00', duration: '~45 min', color: '#BA7517',
      subtasks: [{ id: 'frdi1', text: 'Sit down. Real food.', done: false }],
    },
    {
      id: 'fri-neighbor-eve', type: 'task', isLifeAnchor: false,
      name: 'Neighbor animals (evening)', time: '19:45', duration: '30 min', color: '#1D9E75',
      subtasks: [{ id: 'frne1', text: '30 min paid care', done: false }],
    },
    {
      id: 'fri-nightmeds', type: 'task', isLifeAnchor: true,
      name: 'Evening meds + hygiene', time: '21:05', duration: '~15 min', color: '#7F77DD',
      subtasks: [
        { id: 'frnm1', text: 'Evening meds', done: false },
        { id: 'frnm2', text: 'Skin care + brush teeth', done: false },
      ],
    },
  ],

  // ── SATURDAY ────────────────────────────────────────────────────────────────
  Sat: [
    {
      id: 'sat-neighbor-am', type: 'task', isLifeAnchor: false,
      name: 'Neighbor animals (morning)', time: '07:00', duration: '30 min', color: '#1D9E75',
      subtasks: [{ id: 'sna1', text: '30 min paid care', done: false }],
    },
    {
      id: 'sat-bf', type: 'task', isLifeAnchor: true,
      name: 'Breakfast + meds', time: '09:00', duration: '20 min', color: '#BA7517',
      subtasks: [
        { id: 'sbf1', text: 'Eat real food', done: false },
        { id: 'sbf2', text: 'Morning meds', done: false },
      ],
    },
    {
      id: 'sat-free', type: 'task', isLifeAnchor: false,
      name: 'Free time', time: '10:00', duration: 'open', color: '#9070B8',
      tip: 'No work. Garden, errands, social, rest — your call.',
      subtasks: [
        { id: 'sfr1', text: 'Do whatever you actually want', done: false },
      ],
    },
    {
      id: 'sat-animals-eve', type: 'task', isLifeAnchor: true,
      name: 'Homestead animal care', time: '17:30', duration: '30 min', color: '#1D9E75',
      subtasks: [{ id: 'sae1', text: 'Chickens, cats, dogs', done: false }],
    },
    {
      id: 'sat-dinner', type: 'task', isLifeAnchor: true,
      name: 'Dinner', time: '18:00', duration: '~45 min', color: '#BA7517',
      subtasks: [{ id: 'sdi1', text: 'Sit down. Real food.', done: false }],
    },
    {
      id: 'sat-neighbor-eve', type: 'task', isLifeAnchor: false,
      name: 'Neighbor animals (evening)', time: '19:45', duration: '30 min', color: '#1D9E75',
      subtasks: [{ id: 'sne1', text: '30 min paid care', done: false }],
    },
    {
      id: 'sat-nightmeds', type: 'task', isLifeAnchor: true,
      name: 'Evening meds + hygiene', time: '21:05', duration: '~15 min', color: '#7F77DD',
      subtasks: [
        { id: 'snm1', text: 'Evening meds', done: false },
        { id: 'snm2', text: 'Skin care + brush teeth', done: false },
      ],
    },
  ],

  // ── SUNDAY ──────────────────────────────────────────────────────────────────
  Sun: [
    {
      id: 'sun-neighbor-am', type: 'task', isLifeAnchor: false,
      name: 'Neighbor animals (morning)', time: '07:00', duration: '30 min', color: '#1D9E75',
      subtasks: [{ id: 'una1', text: '30 min paid care', done: false }],
    },
    {
      id: 'sun-bf', type: 'task', isLifeAnchor: true,
      name: 'Breakfast + meds', time: '09:00', duration: '20 min', color: '#BA7517',
      tip: 'Slow morning. No screens before this.',
      subtasks: [
        { id: 'ubf1', text: 'Eat real food', done: false },
        { id: 'ubf2', text: 'Morning meds', done: false },
      ],
    },
    {
      id: 'sun-rest', type: 'task', isLifeAnchor: false,
      name: 'Full rest', time: '10:00', duration: 'open', color: '#5B4B8A',
      tip: 'No work screens. This is not optional.',
      subtasks: [
        { id: 'urs1', text: 'No laptop. No work. No exceptions.', done: false },
      ],
    },
    {
      id: 'sun-animals-eve', type: 'task', isLifeAnchor: true,
      name: 'Homestead animal care', time: '17:30', duration: '30 min', color: '#1D9E75',
      subtasks: [{ id: 'uae1', text: 'Chickens, cats, dogs', done: false }],
    },
    {
      id: 'sun-dinner', type: 'task', isLifeAnchor: true,
      name: 'Dinner', time: '18:00', duration: '~45 min', color: '#BA7517',
      subtasks: [{ id: 'udi1', text: 'Sit down. Real food.', done: false }],
    },
    {
      id: 'sun-neighbor-eve', type: 'task', isLifeAnchor: false,
      name: 'Neighbor animals (evening)', time: '19:45', duration: '30 min', color: '#1D9E75',
      subtasks: [{ id: 'une1', text: '30 min paid care', done: false }],
    },
    {
      id: 'sun-nightmeds', type: 'task', isLifeAnchor: true,
      name: 'Evening meds + hygiene', time: '21:05', duration: '~15 min', color: '#7F77DD',
      subtasks: [
        { id: 'unm1', text: 'Evening meds', done: false },
        { id: 'unm2', text: 'Skin care + brush teeth', done: false },
      ],
    },
  ],
}
