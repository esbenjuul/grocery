import { Button, Input } from "../components/index.ts";
import { ServerState } from "@/controllers/common.handler.ts";
import { Dialog } from "@/islands/Dialog.tsx";
import { useEffect, useState } from "preact/hooks";

export default function List(props: { data: ServerState }) {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState([]);
  useEffect(() => {
    const data = async () => {
      const list = await fetch("/api/list");
      setList(await list.json());
    };
    data();
  }, []);
  const addList = async (e: Event) => {
    e.preventDefault();
    const body = new FormData(e.target as HTMLFormElement);
    const list = await fetch("/api/list", {
      method: "POST",
      body,
    });
  };
  return (
    <div>
      <ul>
        {list.map((item) => <li>{item.name}</li>)}
      </ul>
      <Button onClick={() => setIsOpen(true)}>Add list</Button>

      <Dialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Add list"
        description="Add a new List"
        closeButtonText="Close"
        disableClose={true}
      >
        <form onSubmit={(e) => addList(e)}>
          <Input
            type="text"
            name="name"
            label="Give your list a name"
            class="form-group-input"
          >
          </Input>
          <Button>Add list</Button>
        </form>
      </Dialog>
    </div>
  );
}
