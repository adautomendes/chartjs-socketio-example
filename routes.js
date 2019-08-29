const express = require('express');
const appRouter = express.Router();

const PageController = require('./src/controllers/PageController');
const GraphController = require('./src/controllers/GraphController');

const pageRouter = express.Router();
const graphRouter = express.Router();

appRouter.get('/', (req, res) => { //Root route of app
    res.json({ ok: true })
});

appRouter.use('/page', pageRouter);
pageRouter.get('/', PageController.renderPage);

appRouter.use('/graph', graphRouter);
graphRouter.post('/', GraphController.insert);
graphRouter.get('/', GraphController.search);
graphRouter.delete('/clear', GraphController.clear);

module.exports = appRouter;