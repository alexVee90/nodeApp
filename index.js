const express = require("express");
const games = require("./Games");

const app = express();
app.use(express.json());

// get all the games
app.get("/", (req, res) => {
  res.json(games);
});

//get a single game
app.get("/:id", (req, res) => {
  const found = games.some(game => game.id === parseInt(req.params.id));
  if (found) {
    res.json(games.filter(game => game.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No game with the id ${req.params.id}` });
  }
});

//add a game
app.post("/", (req, res) => {
  const newGame = {
    id: games.length + 1,
    name: req.body.name,
    release: req.body.release
  };

  if (!req.body.name || !req.body.release) {
    res.status(400).json({ msg: "Please add a name and release date" });
  } else {
    games.push(newGame);
    res.json(games);
  }
});

//update a game
app.put("/:id", (req, res) => {
  const found = games.some(game => game.id === parseInt(req.params.id));
  if (found) {
    const updatedGame = req.body;
    games.forEach(game => {
      if (game.id === parseInt(req.params.id)) {
        game.name = updatedGame.name ? updatedGame.name : game.name;
        game.release = updatedGame.release ? updatedGame.release : game.release;

        res.json({ msg: "Game updated", game });
      }
    });
  } else {
    res.status(400).json({ msg: `No game with the id ${req.params.id}` });
  }
});

//delete game 
app.delete("/:id", (req, res) => {
  const found = games.some(game => game.id === parseInt(req.params.id));
  if (found) {
    res.json(games.filter(game => game.id !== parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No game with the id ${req.params.id}` });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`App started on port ${PORT}`));
