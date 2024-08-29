import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    const { token } = req.user as any;
    res.json({ token });
  }
);

router.get("/failure", (req, res) => {
  res.status(401).json({ message: "Google Authentication Failed" });
});

export default router;
