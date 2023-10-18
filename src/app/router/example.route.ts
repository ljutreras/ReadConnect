import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import GetController from '@app/controller/example/get/GetController';

export const register = (router: Router) => {
  console.log('11111')
  const controller: GetController = container.get('Controller.Example');
  console.log("🚀 ~ file: example.route.ts:8 ~ register ~ controller:", controller)
  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log('222222')
    return controller.run(req, res, next);
  });
};
