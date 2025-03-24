import { Button, Input } from "../components/index.ts";
import { ServerState } from "@/controllers/common.handler.ts";
import { Dialog } from "@/islands/Dialog.tsx";
import { useEffect, useState } from "preact/hooks";
import { effect, signal } from "@preact/signals";
import { List } from "@/models/list.model.ts";

const open = signal(false);

export default function List(props: { data: ServerState }) {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState<List<string>[]>([]);

  const getList = async () => {
    const list = await fetch("/api/list");
    setList(await list.json());
  };

  useEffect(() => {
    getList();
  }, []);

  const addList = async (e: Event) => {
    e.preventDefault();
    const form = (e.target as HTMLButtonElement).form as HTMLFormElement;
    const body = new FormData(form);
    await fetch("/api/list", {
      method: "POST",
      body,
    });
    getList();
  };
  const deleteList = async (id: string) => {
    try {
      const deletedList = await fetch(`/api/list/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
    getList();
  };
  const onDialogClose = async () => {
    setIsOpen(false);
    open.value = false;
    getList();
  };
  return (
    <div>
      <ul>
        {list.map((item) => (
          <li key={item._id}>
            {item.name} -
            <button class="simple-button" onClick={() => deleteList(item._id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
      <Button onClick={() => setIsOpen(true)}>Add list</Button>

      <Dialog
        isOpen={isOpen}
        onOpenChange={(state) => open.value = state}
        title="Add list"
        description="Add a new List"
        closeButtonText="Close"
        disableClose={false}
        beforeClose={() => onDialogClose()}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            name="name"
            label="Give your list a name"
            class="form-group-input"
          >
          </Input>
          <Button onClick={(e) => addList(e)}>Add list</Button>
        </form>
      </Dialog>
    </div>
  );
}
