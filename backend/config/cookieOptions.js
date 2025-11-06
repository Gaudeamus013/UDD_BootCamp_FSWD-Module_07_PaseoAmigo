export const getCookieOptions = () => {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd ? true : process.env.COOKIE_SECURE === "true",
    sameSite: isProd ? "None" : (process.env.COOKIE_SAMESITE || "Lax"),
    domain: process.env.COOKIE_DOMAIN || undefined,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
};
