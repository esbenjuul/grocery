import {
  ArrowLeftIcon,
  Avatar,
  Button,
  Card,
  DotsIcon,
  IconButton,
} from "@/components/index.ts";

export default function Home() {
  return (
    <section style="margin: 0 auto; width: 900px">
      <hr />
      <h2>Button</h2>
      <Button>Button caption</Button>
      <hr />
      <h2>Icon Button</h2>
      <IconButton>
        <DotsIcon />
      </IconButton>
      <div style="width:200px">
        <h2>Avatar</h2>
        <Avatar
          avatar="name"
          title="esben juul"
          subTitle="esbenjuul@gmail.com"
        />
      </div>
      <hr />
      <h2>Card</h2>
      <Card title="Indkøb"></Card>

      <hr />
      <h2>icons</h2>
      <div style="width:50px; display:flex; justify-content:space-between">
        <DotsIcon></DotsIcon>
        <ArrowLeftIcon />
      </div>
    </section>
  );
}
