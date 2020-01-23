import { Inject, Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";


export const secretKey = 'senha';
//A chave não deve ser exposta publicamente
//Só esta exposta para aprendizado
// Exemplo: secrets vaults, variaveis de ambiente serviços de configurações
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: secretKey,
    });
  }

  async validate(payload: any){
        return {
            userId: payload.userLogin
        }
  }
}
