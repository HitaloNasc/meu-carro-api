import { RequestMethod } from '@nestjs/common';

interface Route {
  path: string;
  method: RequestMethod;
}

export const excludedRoutes: Route[] = [
  { path: 'auth/login', method: RequestMethod.POST },
  { path: 'google', method: RequestMethod.GET },
  { path: 'google/callback', method: RequestMethod.GET },
  { path: 'google/protected', method: RequestMethod.GET },
  { path: 'google/auth/failure', method: RequestMethod.GET },
  { path: 'users', method: RequestMethod.POST },
];

export const protectedRoutes: Route[] = [
  { path: 'institutions', method: RequestMethod.POST },
  { path: 'institutions', method: RequestMethod.GET },
  { path: 'institutions/:id', method: RequestMethod.GET },
  { path: 'institutions/:id', method: RequestMethod.DELETE },
  { path: 'institutions/email/:email', method: RequestMethod.GET },

  { path: 'questions', method: RequestMethod.POST },
  { path: 'questions', method: RequestMethod.GET },
  { path: 'questions/:id', method: RequestMethod.GET },
  { path: 'questions/:id', method: RequestMethod.DELETE },

  { path: 'subjects', method: RequestMethod.POST },
  { path: 'subjects', method: RequestMethod.GET },
  { path: 'subjects/:id', method: RequestMethod.GET },
  { path: 'subjects/:id', method: RequestMethod.DELETE },
  {
    path: 'subjects/institutionId/:institutionId',
    method: RequestMethod.DELETE,
  },

  { path: 'themes', method: RequestMethod.POST },
  { path: 'themes', method: RequestMethod.GET },
  { path: 'themes/:id', method: RequestMethod.GET },
  { path: 'themes/:id', method: RequestMethod.DELETE },

  { path: 'users', method: RequestMethod.GET },
  { path: 'users/:id', method: RequestMethod.GET },
  { path: 'users/email/:email', method: RequestMethod.GET },
  { path: 'users/:id', method: RequestMethod.DELETE },
];
