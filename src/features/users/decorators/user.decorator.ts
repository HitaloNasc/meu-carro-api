import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface ICurrentUser {
  id: string;
  email: string;
  name: string;
  photo: string;
  role: string;
  institutionId: string;
  createdAt: string;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): ICurrentUser | undefined => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
