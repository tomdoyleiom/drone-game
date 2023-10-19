import Link from "next/link";
import Image from "next/image";

export default async function NavBar() {
  return (
    <div className="bg-base-100">
      <div className="navbar m-auto hidden max-w-7xl flex-col gap-2 lg:block lg:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image
              src="https://placehold.co/40x40"
              width={40}
              height={40}
              alt="site logo"
            />
            Toy Drone
          </Link>
        </div>

        <div className="flex-none gap-2"></div>
      </div>
    </div>
  );
}
