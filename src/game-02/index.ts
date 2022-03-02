export class Item {
  name: string
  sellIn: number
  quality: number

  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

export enum DEFAULTS {
  QUALITY_LIMIT = 50,
  SELLIN_LIMIT = 0,
  AGED_BRIE = 'Aged Brie',
  BACKSTAGE_PASSES = 'Backstage passes',
  SULFURAS = 'Sulfuras',
  CONJURED = 'Conjured',
}

export class GildedRose {
  items: Array<Item>

  constructor(items = [] as Array<Item>) {
    this.items = items
  }

  DEFAULT_UPDATE = (item: Item) => {
    if (item.sellIn >= DEFAULTS.SELLIN_LIMIT) item.quality -= 1
    else item.quality -= 2
  }

  updateBrie(item: Item) {
    if (item.sellIn >= DEFAULTS.SELLIN_LIMIT) item.quality += 1
    else item.quality += 2
  }

  updateBackstage(item: Item) {
    if (item.sellIn >= DEFAULTS.SELLIN_LIMIT && item.sellIn <= 5) item.quality += 3
    else if (item.sellIn > 5 && item.sellIn <= 10) item.quality += 2
    else if (item.sellIn < 0) item.quality = 0
    else item.quality += 1
  }

  updateSulfuras(item: Item) {
    console.log(`Item: ${item.name} never can be updated`);
  }

  updateConjured(item: Item) {
    if (item.sellIn >= DEFAULTS.SELLIN_LIMIT) item.quality -= 2
    else item.quality -= 4
  }

  orchestrator(name: string) {
    const items = {
      [DEFAULTS.AGED_BRIE]: this.updateBrie,
      [DEFAULTS.BACKSTAGE_PASSES]: this.updateBackstage,
      [DEFAULTS.SULFURAS]: this.updateSulfuras,
      [DEFAULTS.CONJURED]: this.updateConjured,
    }

    const key = Object
      .keys(items)
      .find(key => {
        const lower = key.toLowerCase()
        return name.includes(lower)
      })

    const updater = !key ? this.DEFAULT_UPDATE : items[key]
    return updater
  }

  updateQuality() {
    for (const item of this.items) {
      const name = item.name.toLowerCase()
      const updater = this.orchestrator(name)

      if (!name.includes(DEFAULTS.SULFURAS.toLowerCase())) item.sellIn -= 1

      if (item.quality < DEFAULTS.QUALITY_LIMIT) updater(item)
      else this.updateSulfuras(item)
    }

    return this.items;
  }
}
