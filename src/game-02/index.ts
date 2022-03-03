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

interface Updater {
  update(item: Item): void
}

class DefaultUpdate implements Updater {
  update(item: Item): void {
    if (item.sellIn >= DEFAULTS.SELLIN_LIMIT) item.quality -= 1
    else item.quality -= 2
  }
}

class UpdateBrie implements Updater {
  update(item: Item): void {
    if (item.sellIn >= DEFAULTS.SELLIN_LIMIT) item.quality += 1
    else item.quality += 2
  }
}

class UpdateBackstage implements Updater {
  update(item: Item): void {
    if (item.sellIn >= DEFAULTS.SELLIN_LIMIT && item.sellIn <= 5) item.quality += 3
    else if (item.sellIn > 5 && item.sellIn <= 10) item.quality += 2
    else if (item.sellIn < 0) item.quality = 0
    else item.quality += 1
  }
}

class UpdateSulfuras implements Updater {
  update(item: Item): void {
    console.log(`Item: ${item.name} never can be updated`)
  }
}

class UpdateConjured implements Updater {
  update(item: Item): void {
    if (item.sellIn >= DEFAULTS.SELLIN_LIMIT) item.quality -= 2
    else item.quality -= 4
  }
}

const ITEMS = {
  [DEFAULTS.AGED_BRIE]: new UpdateBrie(),
  [DEFAULTS.BACKSTAGE_PASSES]: new UpdateBackstage(),
  [DEFAULTS.SULFURAS]: new UpdateSulfuras(),
  [DEFAULTS.CONJURED]: new UpdateConjured()
}

function orchestrator(name: string): Updater {
  const key = Object
    .keys(ITEMS)
    .find(key => {
      const lower = key.toLowerCase()
      return name.includes(lower)
    })

  const updater = !key ? new DefaultUpdate() : ITEMS[key]
  return updater
}

export class GildedRose {
  items: Array<Item>

  constructor(items = [] as Array<Item>) {
    this.items = items
  }

  updateQuality() {
    for (const item of this.items) {
      const name = item.name.toLowerCase()
      const { update } = orchestrator(name)

      if (!name.includes(DEFAULTS.SULFURAS.toLowerCase())) item.sellIn -= 1

      if (item.quality < DEFAULTS.QUALITY_LIMIT) update(item)
      else new UpdateSulfuras().update(item)
    }

    return this.items
  }
}
