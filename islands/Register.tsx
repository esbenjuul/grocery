import { signal } from "@preact/signals";
import { Button, Input } from "@/components/index.ts";

const message = signal("");

export default function Register() {
  const onClick = (e: Event) => {
    message.value = "";
  };
  const onSubmit = async (e: Event) => {
    e.preventDefault();

    const body = new FormData(e.target as HTMLFormElement);
    if (body.get("password") !== body.get("password-two")) {
      message.value = "passwords are not the same";
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body,
      });
      if (!response.ok && response.status === 409) {
        message.value = "user already exist";
      }
      if (!response.ok && response.status === 400) {
        message.value = "please fill out the form";
      }
      if (response.ok) {
        window.location.pathname = "/login";
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section class="box">
      <p>{message.value}</p>
      <form method="post" class="form-group" onSubmit={(e) => onSubmit(e)}>
        <Input
          type="text"
          name="username"
          label="Username"
          class="form-group-input"
          required
        />
        <Input
          type="text"
          name="email"
          label="Email"
          class="form-group-input"
        />
        <Input
          type="password"
          name="password"
          label="Password"
          class="form-group-input"
          required
          minLength={6}
        />

        <Input
          type="password"
          name="password-two"
          label="Repeat password"
          class="form-group-input"
          required
          minLength={6}
        />

        <Button onClick={(e) => onClick(e)}>Signup</Button>
      </form>
    </section>
  );
}
