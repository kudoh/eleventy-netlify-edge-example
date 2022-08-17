export default async (request, { next, cookies, log }) => {
  if (cookies.get("abtesting")) {
    return next();
  }
  // update A/B pattern to cookie
  const pattern = Math.random() < 0.5 ? "A" : "B";
  log("A/B Testing ->", pattern)
  const expires = new Date();
  expires.setTime(expires.getTime() + 24 * 3600 * 1000); // 1 day
  cookies.set({
    name: "abtesting",
    path: "/",
    value: pattern,
    expires,
    secure: true,
    httpOnly: true,
    sameSite: "Lax",
  });
  return next({ sendConditionalRequest: true });
};
