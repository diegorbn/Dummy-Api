import { Router } from "express";
import excuses, { nextId } from "./excuses.js";

const excuseRouter = Router();

excuseRouter.get('/excuse/something', (req, res) => {
    res.json('Hello world');
})

// Get all excuses
excuseRouter.get("/excuses", (req, res) => {
    res.json(excuses);
});

// Get random excuse
excuseRouter.get("/excuses/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * excuses.length);
    const randomExcuse = excuses[randomIndex];

    res.json(randomExcuse);
});

// Get one excuse by id
excuseRouter.get("/excuses/:id", (req, res) => {
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
excuseRouter.post("/excuses", (req, res) => {
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
excuseRouter.put("/excuses/:id", (req, res) => {
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
excuseRouter.delete("/excuses/:id", (req, res) => {
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

export default excuseRouter;

