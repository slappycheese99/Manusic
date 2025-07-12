// 088-Sena's Original Music Collection - Hosted on Cloudflare
export interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  duration: number;
  cover: string;
}

export const sampleTracks: Track[] = [
  {
    id: 1,
    title: "Tersirat di Balik Senyuman",
    artist: "Brunetta Gondola",
    url: "https://music.kandelagyth.website/Tersirat%20di%20Balik%20Senyuman%20-%20Brunetta%20Gondola.mp3",
    duration: 180, // Will be updated when audio loads
    cover: "/api/placeholder/300/300"
  },
  {
    id: 2,
    title: "ポモドーロ・ラブ - 真道もも (Pomodoro LOVE! - Mado Momo)",
    artist: "真道もも (Mado Momo)",
    url: "https://music.kandelagyth.website/%E3%83%9D%E3%83%A2%E3%83%89%E3%83%BC%E3%83%AD%E3%83%BB%E3%83%A9%E3%83%96%20-%20%E7%9C%9F%E9%81%93%E3%82%82%E3%82%82%20(Pomodoro%20LOVE!%20-%20Mado%20Momo)%20-%20HMS.mp3",
    duration: 240,
    cover: "/api/placeholder/300/300"
  },
  {
    id: 3,
    title: "Possesive Cyborg Maid",
    artist: "HMS",
    url: "https://music.kandelagyth.website/Possesive%20Cyborg%20Maid%20-%20HMS.mp3",
    duration: 210,
    cover: "/api/placeholder/300/300"
  },
  {
    id: 4,
    title: "Nur Wenn Ich Will (AI-Prinz)",
    artist: "HMS",
    url: "https://music.kandelagyth.website/%E2%80%9ENur%20Wenn%20Ich%20Will%20(AI-Prinz)%E2%80%9C%20-%20HMS.mp3",
    duration: 195,
    cover: "/api/placeholder/300/300"
  },
  {
    id: 5,
    title: "🔥 _I Am the Dream Dreaming Me_",
    artist: "HMS",
    url: "https://music.kandelagyth.website/%F0%9F%94%A5%20_I%20Am%20the%20Dream%20Dreaming%20Me_%20-%20HMS.mp3",
    duration: 300,
    cover: "/api/placeholder/300/300"
  },
  {
    id: 6,
    title: "「冬の神話 (Fuyu no Shinwa) — Winter Myth」",
    artist: "HMS",
    url: "https://music.kandelagyth.website/%E3%80%8C%E5%86%AC%E3%81%AE%E7%A5%9E%E8%A9%B1%20(Fuyu%20no%20Shinwa)%20%E2%80%94%20Winter%20Myth%E3%80%8D%20-%20HMS.mp3",
    duration: 280,
    cover: "/api/placeholder/300/300"
  },
  {
    id: 7,
    title: "A Morning Hum",
    artist: "HMS",
    url: "https://music.kandelagyth.website/A%20Morning%20Hum%20-%20HMS.mp3",
    duration: 220,
    cover: "/api/placeholder/300/300"
  },
  {
    id: 8,
    title: "🌸 花の香りに (Hana no Kaori ni) 🌸 Glam Rock Live",
    artist: "差乃間・ミッチ",
    url: "https://music.kandelagyth.website/%F0%9F%8C%B8%20%E8%8A%B1%E3%81%AE%E9%A6%99%E3%82%8A%E3%81%AB%20(Hana%20no%20Kaori%20ni)%20%F0%9F%8C%B8%20Glam%20Rock%20Live%20-%20%E5%B7%AE%E4%B9%83%E9%96%93%E3%83%BB%E3%83%9F%E3%83%83%E3%83%81.mp3",
    duration: 250,
    cover: "/api/placeholder/300/300"
  },
  {
    id: 9,
    title: "A Morning Hum (Remix)",
    artist: "HMS",
    url: "https://music.kandelagyth.website/A%20Morning%20Hum%20(Remix)%20-%20HMS.mp3",
    duration: 230,
    cover: "/api/placeholder/300/300"
  },
  {
    id: 10,
    title: "🌸 花の香りに (Hana no Kaori ni) 🌸",
    artist: "花野かおり",
    url: "https://music.kandelagyth.website/%F0%9F%8C%B8%20%E8%8A%B1%E3%81%AE%E9%A6%99%E3%82%8A%E3%81%AB%20(Hana%20no%20Kaori%20ni)%20%F0%9F%8C%B8%20-%20%E8%8A%B1%E9%87%8E%E3%81%8B%E3%81%8A%E3%82%8A.mp3",
    duration: 240,
    cover: "/api/placeholder/300/300"
  },
  {
    id: 11,
    title: "Debugin Hidup",
    artist: "HMS",
    url: "https://music.kandelagyth.website/Debugin%20Hidup%20-%20HMS.mp3",
    duration: 200,
    cover: "/api/placeholder/300/300"
  },
  {
    id: 12,
    title: "Petals of Youth Memories",
    artist: "HMS",
    url: "https://music.kandelagyth.website/Petals%20of%20Youth%20Memories%20-%20HMS.mp3",
    duration: 270,
    cover: "/api/placeholder/300/300"
  },
  {
    id: 13,
    title: "Sangkan Paraning Dumadisko",
    artist: "HMS",
    url: "https://music.kandelagyth.website/Sangkan%20Paraning%20Dumadisko%20-%20HMS.mp3",
    duration: 260,
    cover: "/api/placeholder/300/300"
  },
  {
    id: 14,
    title: "Zbrrr! Patatra",
    artist: "HMS",
    url: "https://music.kandelagyth.website/Zbrrr!%20Patatra%20-%20HMS.mp3",
    duration: 190,
    cover: "/api/placeholder/300/300"
  },
  {
    id: 15,
    title: "Possesive Cyborg Maid (Distort Break Cover)",
    artist: "HMS",
    url: "https://music.kandelagyth.website/Possesive%20Cyborg%20Maid%20(Distort%20Break%20Cover)%20-%20HMS.mp3",
    duration: 220,
    cover: "/api/placeholder/300/300"
  }
];

// Note: All songs are original copyright of "088-Sena"
// Please do not use anywhere else without permission

