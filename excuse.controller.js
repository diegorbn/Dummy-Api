import excuses from "./excuses.js";

class ExcuseController {
  constructor() {
    this.nextId = this.getInitialNextId();
  }

  getInitialNextId() {
    if (excuses.length === 0) {
      return 1;
    }

    const highestId = Math.max(...excuses.map((excuse) => excuse.id));
    return highestId + 1;
  }

  sayHello = (req, res) => {
    res.json({
      message: "Hello world"
    });
  };

  getAllExcuses = (req, res) => {
    res.json(excuses);
  };

  getRandomExcuse = (req, res) => {
    if (excuses.length === 0) {
      return res.status(404).json({
        message: "No excuses available."
      });
    }

    const randomIndex = Math.floor(Math.random() * excuses.length);
    const randomExcuse = excuses[randomIndex];

    res.json(randomExcuse);
  };

  getExcuseById = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid excuse ID."
      });
    }

    const excuse = excuses.find((item) => item.id === id);

    if (!excuse) {
      return res.status(404).json({
        message: "Excuse not found. Maybe it used an excuse to disappear."
      });
    }

    res.json(excuse);
  };

  createExcuse = (req, res) => {
    const { category, excuse, believability, riskLevel } = req.body;

    if (!category || !excuse || believability === undefined || !riskLevel) {
      return res.status(400).json({
        message: "Missing required fields",
        requiredFields: ["category", "excuse", "believability", "riskLevel"]
      });
    }

    const newExcuse = {
      id: this.nextId,
      category,
      excuse,
      believability,
      riskLevel
    };

    excuses.push(newExcuse);
    this.nextId++;

    res.status(201).json({
      message: "Excuse created successfully",
      data: newExcuse
    });
  };

  updateExcuse = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid excuse ID."
      });
    }

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
  };

  deleteExcuse = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid excuse ID."
      });
    }

    const excuseIndex = excuses.findIndex((item) => item.id === id);

    if (excuseIndex === -1) {
      return res.status(404).json({
        message: "Excuse not found. It escaped responsibility."
      });
    }

    const deletedExcuse = excuses[excuseIndex];

    excuses.splice(excuseIndex, 1);

    res.json({
      message: "Excuse deleted successfully",
      data: deletedExcuse
    });
  };
}

const excuseController = new ExcuseController();

export default excuseController;