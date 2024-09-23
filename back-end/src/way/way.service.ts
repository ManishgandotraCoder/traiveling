import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Way } from './way.entity';
import { TravelType } from './way.interface';

@Injectable()
export class WayService {
  constructor(
    @InjectRepository(Way)
    private WaysRepository: Repository<Way>,
  ) {}

  findAllCities(email: string): Promise<Way> {
    return this.WaysRepository.findOne({ where: { email } });
  }

  async findBestWay(email: string): Promise<TravelType> {
    const way = await this.WaysRepository.findOne({ where: { email } });
    if (!way) {
      throw new Error('Way not found');
    }
    const travelType: any = {
      route: way.route,
      time: way.time,
    };
    return travelType;
  }
  async updateUserRoute(way: Way): Promise<Way> {
    way.route = JSON.stringify(way.route);
    console.log('way', way);

    const existingWay = await this.WaysRepository.findOne({
      where: { email: way.email },
    });
    if (existingWay) {
      return this.WaysRepository.save({ ...existingWay, ...way });
    } else {
      return this.WaysRepository.save(way);
    }
  }
  async getWayByEmail(email: string): Promise<Way> {
    const existingWay = await this.WaysRepository.findOne({
      where: { email: email },
    });
    return existingWay;
  }
}
