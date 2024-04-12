const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'black',
  }
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
