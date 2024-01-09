const express = require('express');
const router = express.Router();
const { Todo, NumberModel } = require('../mongose/schem');

router.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

router.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text,
    });
    todo.save();
    res.json(todo);
});

router.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json({ result });
});

router.get('/todo/complete/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        todo.complete = !todo.complete;
        await todo.save();
        res.json(todo);
    } catch (err) {
        console.error("Error completing todo:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/todo/update/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.text = req.body.text;
    todo.save();
    res.json(todo);
});


router.post('/numbers/new', async (req, res) => {
    try {
        const { value } = req.body;
        const newNumber = new NumberModel({ value });
        const savedNumber = await newNumber.save();
        res.json(savedNumber);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/numbers', async (req, res) => {
    try {
        const numbers = await NumberModel.find();
        res.json(numbers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/numbers/complete/:id', async (req, res) => {
    try {
        const number = await NumberModel.findById(req.params.id);

        if (!number) {
            return res.status(404).json({ error: 'Number not found' });
        }

        number.complete = !number.complete;
        await number.save();
        res.json(number);
    } catch (err) {
        console.error("Error completing number:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/numbers/delete/:id', async (req, res) => {
    const result = await NumberModel.findByIdAndDelete(req.params.id);
    res.json({ result });
});


module.exports = router;
