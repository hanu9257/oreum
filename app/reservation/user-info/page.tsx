import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div>사용자 정보 입력</div>
      <Link href='date'>
        <Button>뒤로</Button>
      </Link>
    </div>
  );
}
