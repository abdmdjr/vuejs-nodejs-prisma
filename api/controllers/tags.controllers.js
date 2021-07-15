const prisma = require('../prisma/prisma')

const getAllTags = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany();
    return res.json(tags);
  } catch (err) {
    console.error(err);
  }
};

const addNewTag = async (req, res) => {
  try {
    const tag = req.body;
    const newTag = await prisma.tag.create({
      data: {
        title: tag.title,
      },
    });
    return res.json(newTag);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllTags,
  addNewTag
};
