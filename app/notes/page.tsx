import Sidebar from "@/components/ui/sidebar";
import { getAllUserNotes, getServerSession } from "../utils/helpers";
import { redirect } from "next/navigation";
import { session } from "../types";
import NotesDisplay from "@/components/ui/notes-home";

export default async function Dashboard() {
  const session = (await getServerSession()) as session;

  const notes = await getAllUserNotes(session.user?.id ?? "");

  if (!session.session && !session.user) {
    redirect("/sign-in");
  }

  const username = session.user?.name;
  const email = session.user?.email;

  return (
    <div className="min-h-screen flex w-screen lg:flex">
      <Sidebar
        session={session}
        notes={notes}
        username={username ?? ""}
        email={email ?? ""}
      />
      <div className="w-full hidden lg:block">
        <h1 className="text-4xl text-center mt-10">Welcome, {username}!</h1>
        <NotesDisplay notes={notes} />
      </div>
    </div>
  );
}
