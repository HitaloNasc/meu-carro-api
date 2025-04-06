import { UserOpenDto } from "src/features/users/data/model/user-open.dto";

export class LoginResponseDto {
  token: string;
  user: UserOpenDto;
}
