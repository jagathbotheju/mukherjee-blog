import Image from "next/image";
import Container from "./components/Container";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <div className="mt-32 flex justify-center items-center flex-col mx-auto">
        <h1 className="text-5xl flex flex-wrap font-bold text-slate-700 dark:text-slate-200">
          NextJS Full Stack APP with Prisma
        </h1>

        <Link href="/blogs" className="btn btn-secondary mt-10 w-fit">
          Explore All Blogs
        </Link>
      </div>
    </Container>
  );
}
