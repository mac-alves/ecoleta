import { Request, Response } from 'express';
import knex from '../database/connection';

class PointController {

    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))
        
        const points = await knex('points')
            .join('points_itens', 'points.id', '=', 'points_itens.point_id')
            .whereIn('points_itens.item_id', parsedItems)
            .where('points.city', 'like', `%${String(city)}%`)
            .where('points.uf', String(uf))
            .distinct('points.id')
            .select('points.*');

        return response.json(points);
    }

    async create(request: Request, response: Response) {
        const { 
            name, 
            email, 
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
        
        const trx = await knex.transaction();
    
        const point = {
            image:'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name, 
            email, 
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point);
        const point_id =  insertedIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            }
        })
    
        await trx('points_itens').insert(pointItems);
        await trx.commit();

        return response.json({
            id: point_id,
            ...point,
        })
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point){
            return response.status(400).json({ msg: 'Point not found'});
        }

        const items = await knex('itens')
            .join('points_itens', 'itens.id', '=', 'points_itens.item_id')
            .where('points_itens.point_id', id)
            // .select('itens.title')

        return response.json({point, items})
    }
}

export default PointController;