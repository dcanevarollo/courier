const slug = require('slugify');

/**
 * @param {String} str
 */
function slugify(str) {
  const sluged = slug(str, { replacement: '', lower: true, strict: true });

  return sluged;
}

module.exports = slugify;
