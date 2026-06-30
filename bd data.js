/* ===========================================================
   Chennai Board Game Rent — shared data layer
   Games are stored in localStorage so the Admin interface and
   the Client interface stay in sync on the same browser.
   (For a real production deployment this would be swapped for
   a backend API / database.)
=========================================================== */

const STORAGE_KEY = 'cbgr_games_v1';
const WHATSAPP_NUMBER = '910000000000'; // TODO: replace with the team's real WhatsApp number

const SEED_GAMES = [
  {
    id: 'g1',
    name: 'Catan',
    category: 'Strategy',
    players: '3–4 players',
    duration: '60–90 min',
    price: 249,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=600&auto=format&fit=crop',
    description: 'Trade, build and settle the island of Catan in the classic resource-strategy game.',
    available: true
  },
  {
    id: 'g2',
    name: 'Codenames',
    category: 'Party',
    players: '4–8 players',
    duration: '15–30 min',
    price: 149,
    image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?q=80&w=600&auto=format&fit=crop',
    description: 'Give one-word clues to help your team guess the right agents before the other side does.',
    available: true
  },
  {
    id: 'g3',
    name: 'Ticket to Ride',
    category: 'Family',
    players: '2–5 players',
    duration: '45–60 min',
    price: 229,
    image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=600&auto=format&fit=crop',
    description: 'Collect train cards and claim railway routes to connect cities across the map.',
    available: true
  },
  {
    id: 'g4',
    name: 'Pandemic',
    category: 'Co-op',
    players: '2–4 players',
    duration: '45 min',
    price: 219,
    image: 'https://images.unsplash.com/photo-1632501641169-c93cba4c5639?q=80&w=600&auto=format&fit=crop',
    description: 'Work together as a team of specialists to stop four diseases from spreading worldwide.',
    available: true
  },
  {
    id: 'g5',
    name: 'Carcassonne',
    category: 'Strategy',
    players: '2–5 players',
    duration: '35–45 min',
    price: 199,
    image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?q=80&w=600&auto=format&fit=crop',
    description: 'Lay tiles to build cities, roads and fields across the medieval countryside.',
    available: false
  },
  {
    id: 'g6',
    name: 'Uno',
    category: 'Card',
    players: '2–10 players',
    duration: '15–20 min',
    price: 99,
    image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=600&auto=format&fit=crop',
    description: 'The classic fast-paced card game of matching colours and numbers — easy to learn, hard to put down.',
    available: true
  }
];

function loadGames() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* fall through to seed */ }
  saveGames(SEED_GAMES);
  return SEED_GAMES.slice();
}

function saveGames(games) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
  } catch (e) { console.warn('Could not save games', e); }
}

function uid() {
  return 'g' + Math.random().toString(36).slice(2, 9);
}

function whatsappLinkFor(game) {
  const msg =
`Hi Chennai Board Game Rent team! I'd like to rent this game:

🎲 Game: ${game.name}
📦 Category: ${game.category}
👥 Players: ${game.players}
⏱️ Duration: ${game.duration}
💰 Price: ₹${game.price}/day

Please let me know the next steps to book it.`;
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`;
}
