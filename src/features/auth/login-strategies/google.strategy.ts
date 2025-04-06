import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport-google-oauth20';
import { UserDto } from 'src/features/users/data/model/user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('env.auth.google.client_id'),
      clientSecret: configService.get<string>('env.auth.google.client_secret'),
      callbackURL: configService.get<string>('env.auth.google.redirect_uri'),
      scope: ['email', 'profile'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<any> {
    const { id, displayName, emails, photos, provider } = profile;

    const user: UserDto = {
      name: displayName,
      email: emails?.[0]?.value || "",
      photo: photos?.[0]?.value || null,
      provider: provider,
      userProviderId: id
    };

    return user;
  }
}
