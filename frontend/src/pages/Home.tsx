import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      {auth.user?.username}
      <p>Home page</p>
      <Button variant={"destructive"} onClick={auth.logout}>
        Logout
      </Button>
    </div>
  );
}
