module.exports = (req, res, rectanglesData) => {
  if (req.body) {
    let foundRect = rectanglesData.find((rect) => rect.id === req.body.id);
    if (!foundRect) {
      return res.status(404).send({ error: "no rectangle found !" });
    }
    foundRect = { ...foundRect, ...req.body };
    rectanglesData = rectanglesData.map((rectangle) => {
      if (rectangle.id === foundRect.id) {
        return (rectangle = foundRect);
      } else return rectangle;
    });
  } else {
    return { error: "no id!" };
  }
  return rectanglesData;
};
