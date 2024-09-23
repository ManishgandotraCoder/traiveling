import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { europeanCities, wayPlans } from '../constants';
import { Train, TrainPathType, TravelType } from './way.interface';
import { WayService } from './way.service';
import { WayDTO, TrainPathDto } from './way.dto';

@Controller('api/')
export class WayController {
  constructor(private wayservice: WayService) {}

  @Get('cities')
  findAllCities() {
    return europeanCities;
  }

  @Post('way/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Body() travel: WayDTO) {
    // Helper to calculate time difference in minutes between two date strings
    const getTimeDifferenceInMinutes = (
      startDateTime: string,
      endDateTime: string,
    ): number => {
      const start = new Date(startDateTime).getTime();
      const end = new Date(endDateTime).getTime();
      return (end - start) / (1000 * 60); // Convert milliseconds to minutes
    };

    // Filter trains that meet the conditions: from departure, to destination, after the specified time
    const filterTrainsByCriteria = (
      from: string,
      to: string,
      afterDateTime: string,
    ): Train[] => {
      return wayPlans.filter(
        (train) =>
          train.departurePlace === from &&
          train.arrivalPlace === to &&
          new Date(train.departureDateTime) >= new Date(afterDateTime),
      );
    };

    // Generate a unique string ID for a route to avoid duplicates
    const createUniqueRouteId = (route: Train[]): string => {
      return route
        .map(
          (train) =>
            `${train.departurePlace}-${train.arrivalPlace}-${train.departureDateTime}`,
        )
        .join('|');
    };

    // Recursive function to explore all possible routes from current location to remaining destinations
    const exploreRoutes = (
      currentLocation: string,
      currentTime: string,
      remainingDestinations: string[],
      currentRoute: Train[],
      totalTime: number,
      allRoutes: { route: Train[]; time: number }[],
      minStayMinutes: number,
      visitedRoutes: Set<string>,
    ): void => {
      // If all destinations are covered, find the route back to the start
      if (remainingDestinations.length === 0) {
        const returnTrains = filterTrainsByCriteria(
          currentLocation,
          travel.currentLocation,
          currentTime,
        );

        returnTrains.forEach((train) => {
          const completeRoute = [...currentRoute, train];
          const routeId = createUniqueRouteId(completeRoute);

          if (!visitedRoutes.has(routeId)) {
            const timeToComplete =
              totalTime +
              getTimeDifferenceInMinutes(currentTime, train.arrivalDateTime);
            visitedRoutes.add(routeId);
            allRoutes.push({ route: completeRoute, time: timeToComplete });
          }
        });
        return;
      }

      // Explore trains to each next destination
      remainingDestinations.forEach((nextDestination) => {
        const trains = filterTrainsByCriteria(
          currentLocation,
          nextDestination,
          currentTime,
        );

        trains.forEach((train) => {
          const newRoute = [...currentRoute, train];
          const newTime = new Date(
            new Date(train.arrivalDateTime).getTime() + minStayMinutes * 60000,
          ).toISOString();
          const routeId = createUniqueRouteId(newRoute);

          if (!visitedRoutes.has(routeId)) {
            exploreRoutes(
              nextDestination,
              newTime,
              remainingDestinations.filter((dest) => dest !== nextDestination),
              newRoute,
              totalTime +
                getTimeDifferenceInMinutes(currentTime, train.arrivalDateTime),
              allRoutes,
              minStayMinutes,
              visitedRoutes,
            );
          }
        });
      });
    };

    // Find all possible routes, sort by time, and return distinct routes
    const findPossibleRoutes = (
      currentLocation: string,
      destinations: string[],
      minStayHours: number,
    ): { route: Train[]; time: number }[] => {
      const allRoutes: { route: Train[]; time: number }[] = [];
      const visitedRoutes = new Set<string>();
      const minStayMinutes = minStayHours * 60;

      exploreRoutes(
        currentLocation,
        new Date().toISOString(),
        destinations,
        [],
        0,
        allRoutes,
        minStayMinutes,
        visitedRoutes,
      );

      // Sort routes by the minimum time taken
      return allRoutes.sort((a, b) => a.time - b.time);
    };

    // Retrieve routes using travel information
    const routes = findPossibleRoutes(
      travel.currentLocation,
      travel.travelLocations,
      travel.minStayHours,
    );
    if (routes.length) {
      const way: any = {
        email: travel?.email,
        ...routes[0],
      };
      if (way.email) {
        console.log(way);

        this.wayservice.updateUserRoute(way);
      }
      return routes;
    }
    return [];
  }

  @Get('way/:email')
  getWay(@Param('email') email: string) {
    return this.wayservice.getWayByEmail(email);
  }

  @Post('trains')
  @UsePipes(new ValidationPipe({ transform: true }))
  findTrains(@Body() travel: TrainPathDto) {
    if (Array.isArray(travel.paths)) {
      const groupTrainsByRoutes = (paths, wayPlans) => {
        const groupedTrains = {};

        paths.forEach((path) => {
          const key = `${path.from}_to_${path.to}`;
          groupedTrains[key] = wayPlans.filter(
            (plan) =>
              plan.departurePlace === path.from &&
              plan.arrivalPlace === path.to,
          );
        });

        return groupedTrains;
      };

      // Get the dynamically grouped trains
      return groupTrainsByRoutes(travel.paths, wayPlans);
    }
    return [];
  }

  @Post('way/update')
  updateTrain(@Body() train: any) {
    return this.wayservice.updateUserRoute(train);
  }
}
