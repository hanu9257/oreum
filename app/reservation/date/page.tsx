import Calendar from "@/components/calender";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Calendar></Calendar>
      <Link href='user-info'>
        <Button>다음</Button>
      </Link>
    </div>
  );
}
