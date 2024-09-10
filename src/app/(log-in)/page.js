import { Button } from "@/components/ui/button";
import { PersonStanding } from "lucide-react";
import Link from "next/link";
const page = () => {
  return (
    <>
      <h1 className="flex gap-2">
        <PersonStanding size={50} className="text-pink-500" /> Support Me
      </h1>

      <p>The best dashboard to manage customer support</p>
      <div className="flex gap-2 items-center">
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <small>or</small>
        <Button variant="outline" asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </>
  );
};

export default page;
