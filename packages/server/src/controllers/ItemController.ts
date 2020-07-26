import { Request, Response } from 'express'
import knex from '../database/connection'

class ItemController {
  async index (request: Request, response: Response) {
    const itens = await knex('itens').select('*')

    const serializedItems = itens.map(item => {
      return {
        id: item.id,
        name: item.title,
        image_url: `${process.env.APP_URL}/uploads/${item.image}`
      }
    })

    return response.json(serializedItems)
  }
}

export default ItemController
