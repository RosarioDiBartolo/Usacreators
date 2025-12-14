import { Link } from "@tanstack/react-router"

const legal = <div className="text-sm text-muted-foreground">
                Before submitting your application, please review our{" "}
                <Link
                  to="/legal/terms"
                  className="font-medium underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link
                  to="/legal/privacy"
                  className="font-medium underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </Link>
                . We want everything to be clear and transparent about how Miami
                Creators works with you and your data.
              </div>


export default legal