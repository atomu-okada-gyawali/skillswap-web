import Link from "next/link";

export default function Page() {
    return (
        <div>
            <Link className="text-c5 border border-c5 p-2 rounded inline-block"
             href="/admin/users/create">Create User</Link>
        </div>
    );
}