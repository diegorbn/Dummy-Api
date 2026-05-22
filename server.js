import express from "express";

const PORT = 8080;

const server = express();

server.use(express.json());

let excuses = [
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

// Home route, we list all routes in here
server.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Excuse Generator API",
    endpoints: {
      getAllExcuses: "GET /excuses",
      getOneExcuse: "GET /excuses/:id",
      createExcuse: "POST /excuses",
      updateExcuse: "PUT /excuses/:id",
      deleteExcuse: "DELETE /excuses/:id",
      randomExcuse: "GET /excuses/random"
    }
  });
});

// Get all excuses
server.get("/excuses", (req, res) => {
  res.json(excuses);
});

// Get random excuse
server.get("/excuses/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * excuses.length);
  const randomExcuse = excuses[randomIndex];

  res.json(randomExcuse);
});

// Get one excuse by id
server.get("/excuses/:id", (req, res) => {
  const id = Number(req.params.id);

  const excuse = excuses.find((item) => item.id === id);

  if (!excuse) {
    return res.status(404).json({
      message: "Excuse not found. Maybe it used an excuse to disappear."
    });
  }

  res.json(excuse);
});

// Create new excuse
server.post("/excuses", (req, res) => {
  const { category, excuse, believability, riskLevel } = req.body;

  if (!category || !excuse || believability === undefined || !riskLevel) {
    return res.status(400).json({
      message: "Missing required fields",
      requiredFields: ["category", "excuse", "believability", "riskLevel"]
    });
  }

  const newExcuse = {
    id: nextId,
    category,
    excuse,
    believability,
    riskLevel
  };

  excuses.push(newExcuse);
  nextId++;

  res.status(201).json({
    message: "Excuse created successfully",
    data: newExcuse
  });
});

// Update excuse
server.put("/excuses/:id", (req, res) => {
  const id = Number(req.params.id);

  const excuseIndex = excuses.findIndex((item) => item.id === id);

  if (excuseIndex === -1) {
    return res.status(404).json({
      message: "Excuse not found. It probably had a dentist appointment."
    });
  }

  const { category, excuse, believability, riskLevel } = req.body;

  excuses[excuseIndex] = {
    ...excuses[excuseIndex],
    category: category ?? excuses[excuseIndex].category,
    excuse: excuse ?? excuses[excuseIndex].excuse,
    believability: believability ?? excuses[excuseIndex].believability,
    riskLevel: riskLevel ?? excuses[excuseIndex].riskLevel
  };

  res.json({
    message: "Excuse updated successfully",
    data: excuses[excuseIndex]
  });
});

// Delete excuse
server.delete("/excuses/:id", (req, res) => {
  const id = Number(req.params.id);

  const excuseExists = excuses.some((item) => item.id === id);

  if (!excuseExists) {
    return res.status(404).json({
      message: "Excuse not found. It escaped responsibility."
    });
  }

  excuses = excuses.filter((item) => item.id !== id);

  res.json({
    message: "Excuse deleted successfully"
  });
});

server.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});