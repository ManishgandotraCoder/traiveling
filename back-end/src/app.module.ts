import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WayModule } from './way/way.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';

const entitiesPath = path.join(__dirname, '**/*.entity{.ts,.js}');
console.log('Entities Path:', entitiesPath);

@Module({
  imports: [
    UsersModule,
    WayModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Ensure this is correct
      port: 5432, // Ensure PostgreSQL is running on this port
      username: 'root', // Ensure this user exists
      password: 'mypass', // Ensure this password is correct
      database: 'traveling', // Ensure this database exists
      entities: [entitiesPath],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
