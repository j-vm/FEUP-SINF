class Item {
  constructor({ itemKey, description, itemType }) {
    this.key = itemKey;
    this.description = description;
    this.type = itemType;
  }
}

module.exports = { Item };
