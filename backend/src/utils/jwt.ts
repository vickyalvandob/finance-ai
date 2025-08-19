import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Env } from "../config/env.config";

type TimeUnit = "s" | "m" | "h" | "d" | "w" | "y";
type TimeString = `${number}${TimeUnit}`;

export type AccessTokenPayload = {
  userId: string;
};

// Opsi internal default (tanpa secret)
const defaultSignOptions: SignOptions = {
  audience: ["user"],
  expiresIn: Env.JWT_EXPIRES_IN as TimeString,
};

// Secret default dipisah
const DEFAULT_SECRET = Env.JWT_SECRET;

// Jika ingin mengizinkan kirim secret via options
type SignOptionsWithSecret = SignOptions & {
  secret?: string;
};

export const signJwtToken = (
  payload: AccessTokenPayload,
  options: SignOptionsWithSecret = {}
) => {
  // Pakai secret dari options kalau ada, kalau tidak pakai default
  const secret = options.secret ?? DEFAULT_SECRET;

  // Keluarkan 'secret' dari options sebelum diteruskan ke jwt.sign
  // agar object yang dikirim murni SignOptions
  const { secret: _omit, ...opts } = options;

  const token = jwt.sign(payload, secret, {
    ...defaultSignOptions,
    ...opts,
  });

  const exp = (jwt.decode(token) as JwtPayload | null)?.exp;
  return {
    token,
    expiresAt: exp ? exp * 1000 : undefined, // ms
  };
};
