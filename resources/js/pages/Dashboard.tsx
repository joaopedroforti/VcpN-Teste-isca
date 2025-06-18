import { Head, Link } from "@inertiajs/react"

export default function Dashboard() {
  return (
    <>
      <Head title="Dashboard" />
      <pre>dashboard</pre>
      <Link href="logout" method="post" as="button">logout</Link>
    </>
  );
};
