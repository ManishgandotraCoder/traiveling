import { Module } from '@nestjs/common';
import { WayController } from './way.controller';
import { WayService } from './way.service';
import { Way } from './way.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Way])],
  controllers: [WayController],
  providers: [WayService],
})
export class WayModule {}
