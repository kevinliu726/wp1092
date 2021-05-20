import { Router } from "express";
import ScoreCard from "../../models/ScoreCard";

const router = Router();

router.post("/create-card", async function (req, res) {
  try {
    const existing = await ScoreCard.exists({
      name: req.body.name,
      subject: req.body.subject,
    });

    if (existing) {
      const card = await ScoreCard.findOneAndUpdate(
        {
          name: req.body.name,
          subject: req.body.subject,
        },
        { score: req.body.score }
      );
      const msg = `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`;
      res.status(200).send({ card, msg });
    } else {
      const card = new ScoreCard(req.body);
      card.save();
      const msg = `Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`;
      res.status(200).send({ card, msg });
    }
  } catch (error) {
    res.json({ msg: "Something went wrong..." });
  }
});

router.delete("/delete-db", async function (req, res) {
  try {
    await ScoreCard.deleteMany({});
    res.status(200).send({ msg: "Database cleared" });
  } catch (error) {
    res.json({ msg: "Something went wrong..." });
  }
});

router.post("/query", async function (req, res) {
  try {
    let cards;
    if (req.body.queryType === "Name") {
      cards = await ScoreCard.find({ name: req.body.queryString });
    } else {
      cards = await ScoreCard.find({ subject: req.body.queryString });
    }
    const cards_info = cards.map((element) =>
      JSON.stringify({
        name: element.name,
        subject: element.subject,
        score: element.score,
      })
    );
    const message =
      cards_info.length === 0
        ? `${req.body.queryType} (${req.body.queryString}) not found!`
        : "Query Success";
    res.status(200).send({ cards_info, msg: message });
  } catch (error) {
    res.json({ msg: "Something went wrong..." });
  }
});

export default router;
