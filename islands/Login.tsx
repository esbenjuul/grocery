import { signal } from "@preact/signals";
import { Button } from "../components/button/Button.tsx";
import { Input } from "../components/input/Input.tsx";

const message = signal("");
export default function SignIn() {
  const onClick = () => {
    message.value = "";
  };
  const onSubmit = async (e: Event) => {
    e.preventDefault();
    const body = new FormData(e.target as HTMLFormElement);
    try {
      const response = await fetch("/api/login", { method: "POST", body });
      if (!response.ok && response.status === 400) {
        message.value = "wrong password or username";
      }
      if (response.ok) {
        console.log("logged in", response.headers);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <p>{message.value}</p>

      <form class="form-group" onSubmit={(e) => onSubmit(e)}>
        <Input
          type="text"
          name="username"
          label="Username"
          value={location?.hash.replace("#", "") || ""}
          class="form-group-input"
        >
        </Input>
        <Input
          type="password"
          name="password"
          label="Password"
          class="form-group-input"
        >
        </Input>
        <Button onClick={() => onClick()}>Login</Button>
      </form>
    </>
  );
}
