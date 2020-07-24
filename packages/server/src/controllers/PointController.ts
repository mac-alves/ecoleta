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

        const serialize = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.100.101:3333/uploads/${point.image}`
            }
        })

        return response.json(serialize);
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
            image:request.file.filename,
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
    
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
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

        const serialize = {
            ...point,
            image_url: `http://192.168.100.101:3333/uploads/${point.image}`
        }

        const items = await knex('itens')
            .join('points_itens', 'itens.id', '=', 'points_itens.item_id')
            .where('points_itens.point_id', id)
            // .select('itens.title')

        return response.json({point: serialize, items})
    }
}

export default PointController;