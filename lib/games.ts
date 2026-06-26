// Domain data for BuggedOut.
// AUTO-ASSEMBLED from the brand asset event cards + the content workflow
// (8 real games keyed to their arena art, plus the gallery render set).

export type GameType = "Race" | "Roulette" | "Prediction" | "Bingo";

export interface HowStep {
  h: string;
  p: string;
}

export interface Game {
  slug: string;
  name: string;
  type: GameType;
  /** e.g. "5×5 Grid" */
  format: string;
  /** e.g. "Bingo · 5×5 Grid" */
  meta: string;
  /** optimized arena art in /public */
  image: string;
  /** tiny base64 blur-up placeholder */
  blur: string;
  /** intrinsic dimensions of `image` */
  w: number;
  h: number;
  /** animal "athletes" in this game, as display chips */
  lineup: string[];
  /** card hook */
  tagline: string;
  /** detail-hero scene-setter */
  intro: string;
  /** one line on the chaos */
  vibe: string;
  /** scoring flavor */
  score: string;
  /** game-specific how-it-works */
  how: HowStep[];
}

export const GAMES: Game[] = [
  {
    "slug": "chicken-shit-bingo",
    "name": "Chicken Shit Bingo",
    "type": "Bingo",
    "format": "5×5 Grid",
    "meta": "Bingo · 5×5 Grid",
    "image": "/assets/games/chicken-shit-bingo.webp",
    "blur": "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADwAQCdASoQAAkAA4BaJYgC7AD2K03SAGAA/vM4KYHdRjRG+Sb+mzgowo8bWeLIRuRcbtpuvdk3FtzsVWtI1u2uVDEv5AAA",
    "w": 1600,
    "h": 893,
    "lineup": [
      "Hen"
    ],
    "tagline": "Claim your square. Pray the hen agrees",
    "intro": "One hen, twenty-five numbered squares, and zero manners. Claim your number before she's loose, then watch nature pick the winner.",
    "vibe": "She struts, she pecks, she stalls on square 12 for a full minute, then drops the verdict three squares over while the whole room groans.",
    "score": "One square hits, and it's worth a 25× score",
    "how": [
      {
        "h": "Claim a square",
        "p": "Pick any number from 1 to 25 on the grid before the hen is released."
      },
      {
        "h": "Release the hen",
        "p": "The gate opens and the bird wanders the 25-square board at her own pace."
      },
      {
        "h": "She picks the winner",
        "p": "Whichever square the chicken poops on is the winning number, no appeals."
      },
      {
        "h": "Score the splat",
        "p": "Land that exact square and the 25× score is yours."
      }
    ]
  },
  {
    "slug": "forked-fate",
    "name": "Forked Fate",
    "type": "Prediction",
    "format": "2 Exits",
    "meta": "Prediction · 2 Exits",
    "image": "/assets/games/forked-fate.webp",
    "blur": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAQAgCdASoQAAkAA4BaJZgC7DiAASb+ZpgAAP7xnOixOBpCj5x82RHEMu1sLWXZb77BoAZ9YqJxZEELgBku6Dzt//AAAA==",
    "w": 1600,
    "h": 893,
    "lineup": [
      "Duck"
    ],
    "tagline": "One duck. Two exits. Zero loyalty.",
    "intro": "A lone duck waddles up to a Y-junction where the track splits clean in two. Call the lane it walks out of. Sounds like a coin flip. The duck has never seen a coin.",
    "vibe": "The duck will dawdle at the split, fake left, preen for ten seconds, then commit to a fork nobody saw coming.",
    "score": "Nail the exit for an even 1× score",
    "how": [
      {
        "h": "Read the split",
        "p": "The track forks into Exit 1 and Exit 2, with one duck standing dead center."
      },
      {
        "h": "Call your lane",
        "p": "Pick the exit you think the duck waddles out of."
      },
      {
        "h": "Watch it dither",
        "p": "The duck loiters at the junction live, weighing two paths it doesn't understand."
      },
      {
        "h": "Read the fork",
        "p": "Nail the exit it actually takes and the round is yours."
      }
    ]
  },
  {
    "slug": "lane-racing",
    "name": "Lane Racing",
    "type": "Race",
    "format": "3 Lanes",
    "meta": "Race · 3 Lanes",
    "image": "/assets/games/lane-racing.webp",
    "blur": "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADwAQCdASoQAAkAA4BaJZACdAD2OMoEMfAA/vMpYVlveunde8LqSJyTbNfh2dOZNFKyO/rteF41S6x7ocwxsNGtTbUVTn8HZAAAAA==",
    "w": 1600,
    "h": 893,
    "lineup": [
      "Mouse",
      "Crab",
      "Fish"
    ],
    "tagline": "Three species. Three lanes. One finish line. Pick the weird one",
    "intro": "A mouse, a crab and a fish line up in three numbered lanes with one finish line between them. None of them move the same way, and the fun is calling which one gets there first.",
    "vibe": "The mouse sprints then stalls, the crab goes sideways out of pure spite, and the fish just refuses to acknowledge the concept of a race.",
    "score": "Pick the winning lane for a 3× score",
    "how": [
      {
        "h": "Read the lanes",
        "p": "Lane 1 mouse, lane 2 crab, lane 3 fish, each locked to its own numbered lane."
      },
      {
        "h": "Call a lane",
        "p": "Pick the single lane you think crosses the finish line first."
      },
      {
        "h": "Watch three styles collide",
        "p": "The mouse scrambles, the crab scuttles sideways, the fish does whatever a fish does."
      },
      {
        "h": "First across wins",
        "p": "The first nose, claw or fin over the line settles the round."
      }
    ]
  },
  {
    "slug": "roulette",
    "name": "Roulette",
    "type": "Roulette",
    "format": "37 Slots",
    "meta": "Roulette · 37 Slots",
    "image": "/assets/games/roulette.webp",
    "blur": "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAQAgCdASoQAAkAA4BaJZACdAEVwRiqa2PgAP7xnJe+GrJHfDeLw++pEs0I1D65HCeBJ64m8DfOH5nrZNtZgAJc5jAAoFKi79vaWh91Xhntb/fMAAA=",
    "w": 1600,
    "h": 893,
    "lineup": [
      "Beetle"
    ],
    "tagline": "Call your number. The beetle has other plans",
    "intro": "A live beetle hits a spinning wheel of 37 numbered slots. You called red, you called 22, you called the middle dozen. Now the bug picks a seat and decides who's right.",
    "vibe": "The wheel slows, the beetle wanders three slots, doubles back, and parks one number off your call right as the round locks.",
    "score": "A straight-up single number is worth a 35× score",
    "how": [
      {
        "h": "Call your slot",
        "p": "Call a single number, a color, or a whole section of the 37-slot wheel."
      },
      {
        "h": "Spin and drop",
        "p": "The wheel starts turning and a live beetle gets lowered onto the moving numbered slots."
      },
      {
        "h": "Watch it settle",
        "p": "The beetle crawls, stalls, and finally squats in one slot as the wheel coasts to a stop."
      },
      {
        "h": "The slot wins",
        "p": "Wherever the bug parks is the winning number, color, and section, all at once."
      }
    ]
  },
  {
    "slug": "split-decision",
    "name": "Split Decision",
    "type": "Roulette",
    "format": "Red / Black",
    "meta": "Roulette · Red / Black",
    "image": "/assets/games/split-decision.webp",
    "blur": "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAAAQAgCdASoQAAkAA4BaJYgCdDiAAUjuvvP4AP7xo26j2Icka+XuaVsIuNFnJSXZRQQUbQDTEkVv4UAFtyo+70Mw7Cxle16QAAA=",
    "w": 1600,
    "h": 893,
    "lineup": [
      "Frog"
    ],
    "tagline": "One frog. Two doors. Pick a color and pray",
    "intro": "A live frog sits behind the gate, and two doors wait below it: one red, one black. Call the color it hops through. Fifty-fifty on paper. Total chaos in practice.",
    "vibe": "No middle ground here, so the whole room leans one way until the frog ignores all of it and bolts the other.",
    "score": "Nail the color for a 2× score",
    "how": [
      {
        "h": "Read the wheel",
        "p": "The board locks to two colors only, red and black, splitting the frog's exit clean down the middle."
      },
      {
        "h": "Call your color",
        "p": "Call red or black before the gate lifts, with no hedge and no second guess."
      },
      {
        "h": "Spring the frog",
        "p": "The gate opens live and the frog commits to one door, settling the round the instant it lands."
      }
    ]
  },
  {
    "slug": "the-great-escape",
    "name": "The Great Escape",
    "type": "Race",
    "format": "Open Track",
    "meta": "Race · Open Track",
    "image": "/assets/games/the-great-escape.webp",
    "blur": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADQAQCdASoQAAkAA4BaJQBOgBcH5QXXoAD+8ZzpYjZu5QdrtidTBAKQC6HefJWZs589MUwGICd237vp1YrlUrUqiDU1IT0IQ4DFI8bqgdxZgAAA",
    "w": 1600,
    "h": 893,
    "lineup": [
      "Chicken",
      "Rabbit",
      "Frog",
      "Beetle",
      "Crab",
      "Fish",
      "Mouse",
      "Duck",
      "Turtle",
      "Ladybug"
    ],
    "tagline": "Ten animals. One line. No second place",
    "intro": "The whole BuggedOut menagerie hits the open track at once. Chicken, rabbit, frog, beetle, crab, fish, mouse, duck, turtle, ladybug. Lock in your champion, then watch ten tiny brains decide the race for you.",
    "vibe": "The gate drops and chaos goes everywhere at once. The frog hops sideways, the turtle commits to nothing, the duck somehow leads, and your beetle is facing the wrong way. First nose past the line takes it.",
    "score": "Pick the winner outright, worth up to a 10× score",
    "how": [
      {
        "h": "Scout the field",
        "p": "Size up all ten runners in the lineup and decide who's got a sprint in them today."
      },
      {
        "h": "Pick your champion",
        "p": "Tap one animal to win before the gate drops, the pick locks the second the countdown ends."
      },
      {
        "h": "Gate drops live",
        "p": "The whole roster releases at once down the open track with no lanes, no rules, no second chances."
      },
      {
        "h": "First nose wins",
        "p": "Whoever crosses the line first takes the round, everything behind it gets nothing."
      }
    ]
  },
  {
    "slug": "three-door-monty",
    "name": "Three Door Monty",
    "type": "Prediction",
    "format": "3 Doors",
    "meta": "Prediction · 3 Doors",
    "image": "/assets/games/three-door-monty.webp",
    "blur": "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAADQAQCdASoQAAkAA4BaJZACdADxBJ1jIAD+8aOkQRlwgSI2j3AUJoNGPf38pVDwreX9PiiDOclAOUnI/avz6TbE08gS0e7GbklmO8nbyc4pJhCVxB/KjhrhT0AAAA==",
    "w": 1600,
    "h": 893,
    "lineup": [
      "Rabbit",
      "Duck",
      "Frog"
    ],
    "tagline": "Three doors. Three critters. Pick who walks out where",
    "intro": "Red, Yellow, Green. Three doors light up, three live animals wait behind them, and only you know which critter goes where. Lock your guess before the doors swing open.",
    "vibe": "The shuffle behind the doors is real, the animals don't read the script, and a duck waddling out of the door everyone wrote off turns the whole floor upside down.",
    "score": "One door scores 3×, a clean sweep of all three scores 25×",
    "how": [
      {
        "h": "Read the lineup",
        "p": "Check which mixed creatures are in play for this round before the doors seal."
      },
      {
        "h": "Assign the doors",
        "p": "Call which animal comes out of Red, Yellow, and Green."
      },
      {
        "h": "Doors swing open",
        "p": "All three doors fire at once and the live critters make their exit."
      },
      {
        "h": "Match and score",
        "p": "Every door you called correctly scores; a clean three-door sweep hits the top score."
      }
    ]
  },
  {
    "slug": "tunnel-vision",
    "name": "Tunnel Vision",
    "type": "Prediction",
    "format": "4 Tunnels",
    "meta": "Prediction · 4 Tunnels",
    "image": "/assets/games/tunnel-vision.webp",
    "blur": "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADwAQCdASoQAAkAA4BaJYgCdDiAAUcTPNAA/vGclLfURUCkUPgfd0gcMTmNnVoRMyjiWcpYaXzOK7XhMxtOwAgFnuc9ig0Qkl3Ok9sWxIAAAA==",
    "w": 1600,
    "h": 893,
    "lineup": [
      "Rabbit"
    ],
    "tagline": "One rabbit. Four tunnels. Call the exit",
    "intro": "A rabbit sits in a box with four numbered tunnels glowing green and gold around it. Call which one it bolts through. Then you wait for the twitch.",
    "vibe": "The rabbit might rocket through tunnel 3 in half a second or sit dead-still grooming its ears while the whole arena holds its breath.",
    "score": "Nail the tunnel to win the round. One in four, live every time.",
    "how": [
      {
        "h": "Read the box",
        "p": "Four numbered tunnels, 1 through 4, one twitchy rabbit parked dead center."
      },
      {
        "h": "Call your tunnel",
        "p": "Pick the single number you think it bolts through before the round goes live."
      },
      {
        "h": "Watch it break",
        "p": "The rabbit picks its exit on its own clock, fast, slow, or frozen solid."
      },
      {
        "h": "Match the exit",
        "p": "Rabbit blasts through your number and the round is yours."
      }
    ]
  }
];

export interface GalleryTile {
  src: string;
  blur: string;
  w: number;
  h: number;
  caption: string;
  alt: string;
}

export const GALLERY: GalleryTile[] = [
  {
    "src": "/assets/games/chicken-shit-bingo.webp",
    "blur": "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADwAQCdASoQAAkAA4BaJYgC7AD2K03SAGAA/vM4KYHdRjRG+Sb+mzgowo8bWeLIRuRcbtpuvdk3FtzsVWtI1u2uVDEv5AAA",
    "w": 1600,
    "h": 893,
    "caption": "Hen on the grid, chaos on the board.",
    "alt": "Chicken Shit Bingo — BuggedOut arena card"
  },
  {
    "src": "/assets/games/forked-fate.webp",
    "blur": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAQAgCdASoQAAkAA4BaJZgC7DiAASb+ZpgAAP7xnOixOBpCj5x82RHEMu1sLWXZb77BoAZ9YqJxZEELgBku6Dzt//AAAA==",
    "w": 1600,
    "h": 893,
    "caption": "The path forks. Call the turn.",
    "alt": "Forked Fate — BuggedOut arena card"
  },
  {
    "src": "/assets/games/lane-racing.webp",
    "blur": "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADwAQCdASoQAAkAA4BaJZACdAD2OMoEMfAA/vMpYVlveunde8LqSJyTbNfh2dOZNFKyO/rteF41S6x7ocwxsNGtTbUVTn8HZAAAAA==",
    "w": 1600,
    "h": 893,
    "caption": "Three lanes, one finish, zero mercy.",
    "alt": "Lane Racing — BuggedOut arena card"
  },
  {
    "src": "/assets/games/roulette.webp",
    "blur": "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAQAgCdASoQAAkAA4BaJZACdAEVwRiqa2PgAP7xnJe+GrJHfDeLw++pEs0I1D65HCeBJ64m8DfOH5nrZNtZgAJc5jAAoFKi79vaWh91Xhntb/fMAAA=",
    "w": 1600,
    "h": 893,
    "caption": "Call your number, let the critter land it.",
    "alt": "Roulette — BuggedOut arena card"
  },
  {
    "src": "/assets/games/split-decision.webp",
    "blur": "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAAAQAgCdASoQAAkAA4BaJYgCdDiAAUjuvvP4AP7xo26j2Icka+XuaVsIuNFnJSXZRQQUbQDTEkVv4UAFtyo+70Mw7Cxle16QAAA=",
    "w": 1600,
    "h": 893,
    "caption": "Two doors, one runner, instant verdict.",
    "alt": "Split Decision — BuggedOut arena card"
  },
  {
    "src": "/assets/games/the-great-escape.webp",
    "blur": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADQAQCdASoQAAkAA4BaJQBOgBcH5QXXoAD+8ZzpYjZu5QdrtidTBAKQC6HefJWZs589MUwGICd237vp1YrlUrUqiDU1IT0IQ4DFI8bqgdxZgAAA",
    "w": 1600,
    "h": 893,
    "caption": "He's loose in the pit. Watch the breakout.",
    "alt": "The Great Escape — BuggedOut arena card"
  },
  {
    "src": "/assets/games/three-door-monty.webp",
    "blur": "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAADQAQCdASoQAAkAA4BaJZACdADxBJ1jIAD+8aOkQRlwgSI2j3AUJoNGPf38pVDwreX9PiiDOclAOUnI/avz6TbE08gS0e7GbklmO8nbyc4pJhCVxB/KjhrhT0AAAA==",
    "w": 1600,
    "h": 893,
    "caption": "Track the runner across three doors.",
    "alt": "Three Door Monty — BuggedOut arena card"
  },
  {
    "src": "/assets/games/tunnel-vision.webp",
    "blur": "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADwAQCdASoQAAkAA4BaJYgCdDiAAUcTPNAA/vGclLfURUCkUPgfd0gcMTmNnVoRMyjiWcpYaXzOK7XhMxtOwAgFnuc9ig0Qkl3Ok9sWxIAAAA==",
    "w": 1600,
    "h": 893,
    "caption": "Full tilt down the neon tunnel.",
    "alt": "Tunnel Vision — BuggedOut arena card"
  },
  {
    "src": "/assets/hud-winner.webp",
    "blur": "data:image/webp;base64,UklGRsoAAABXRUJQVlA4WAoAAAAQAAAADwAACAAAQUxQSFQAAAANcFTbttOcf2k+MMCMEaSq6Mbip48xQ9Z7n+ohIiYgAu7MJZalhdUYfl0RCf+mjAFwPZ5miPvREuaJ5UAvVo0ewLUgTlUu3Do0C+xrBDlL4M5cAgBWUDggUAAAANABAJ0BKhAACQADgFolAE6AIbW3QiIAAP7zKds5hfKBd5IZ3tU61RFuGnP5X2cf0zGRw/WsqySK8Q66ZMVUjCk8r6shCXc09Yxh4qcFPQAA",
    "w": 1400,
    "h": 781,
    "caption": "Round settled. Winner locked.",
    "alt": "BuggedOut WINNER results overlay"
  },
  {
    "src": "/assets/overlay-1.webp",
    "blur": "",
    "w": 1400,
    "h": 781,
    "caption": "The broadcast frame goes live.",
    "alt": "BuggedOut live stream overlay frame"
  },
  {
    "src": "/assets/overlay-2.webp",
    "blur": "",
    "w": 1400,
    "h": 781,
    "caption": "Gold circuitry, neon glow.",
    "alt": "BuggedOut gold circuit HUD overlay"
  },
  {
    "src": "/assets/hero-horizontal.webp",
    "blur": "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADQAQCdASoQAAkAA4BaJYwCdAD1dcFSAAD++FZscm4BJTfk+fTAJOAFvYqbjW7ht+h43jFL08IwmQAA",
    "w": 1675,
    "h": 939,
    "caption": "The starting line, lit up.",
    "alt": "BuggedOut animal lineup at the checkered start"
  },
  {
    "src": "/assets/hero-vertical.webp",
    "blur": "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAABQBACdASoQAB0APu1iqU2ppaOiMAgBMB2JYgC7IBgC935E8fIVDVDgYXYAAP7yqfH0GXP3S7jj1fAUVWl0RdbggfuRki0c8V7xVPH49z4BcVux79/fVG5iGF8sgvi3IbCrkg1675p1ojUmsXtq4/ln5PF0Ms286mwditXgAAA=",
    "w": 1100,
    "h": 1971,
    "caption": "Front row at the start gate.",
    "alt": "BuggedOut animal lineup, portrait view"
  }
];

export function getGame(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}

export function getMoreGames(slug: string, count = 4): Game[] {
  return GAMES.filter((g) => g.slug !== slug).slice(0, count);
}

/** Distinct game types present, in first-seen order — drives the lobby filter bar. */
export const GAME_TYPES: GameType[] = GAMES.reduce<GameType[]>((acc, g) => {
  if (!acc.includes(g.type)) acc.push(g.type);
  return acc;
}, []);
