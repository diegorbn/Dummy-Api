const excuses = [
  {
    id: 1,
    category: "school",
    excuse: "My laptop started updating and chose violence.",
    believability: 8,
    riskLevel: "low"
  },
  {
    id: 2,
    category: "work",
    excuse: "My alarm clock betrayed me emotionally.",
    believability: 6,
    riskLevel: "medium"
  },
  {
    id: 3,
    category: "life",
    excuse: "I was ready, but my bed negotiated a better offer.",
    believability: 5,
    riskLevel: "high"
  }
];

let nextId = 4;

export default excuses;

export {
    nextId
};