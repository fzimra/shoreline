const AUTH_COOKIE_NAME = "shoreline_session";

export function encodeAuthSession(session) {
  return Buffer.from(JSON.stringify(session)).toString("base64url");
}

export function decodeAuthSession(value) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

export function setAuthCookie(response, session) {
  response.cookies.set(AUTH_COOKIE_NAME, encodeAuthSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearAuthCookie(response) {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // Expire immediately
  });
}

export function getAuthCookieName() {
  return AUTH_COOKIE_NAME;
}
