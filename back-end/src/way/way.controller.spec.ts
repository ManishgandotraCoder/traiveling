import { Test, TestingModule } from '@nestjs/testing';
import { WayController } from './way.controller';

describe('WayController', () => {
  let controller: WayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WayController],
    }).compile();

    controller = module.get<WayController>(WayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
