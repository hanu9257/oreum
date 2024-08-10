import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Link href='/reservation/date'>
        <Button>예약하기</Button>
      </Link>
    </div>
  );
}
