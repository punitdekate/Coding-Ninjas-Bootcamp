import Item from "./components/Item";
import { data } from "./data";
import listStyle from "./list.module.css";

export default function List() {
  return (
    <>
      <h3 className={listStyle.title}>Items Listed for Sale</h3>
      <div className={listStyle.container}>
        {data.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
