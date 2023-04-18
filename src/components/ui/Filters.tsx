export interface FilterItem {
  text: string;
  value: string;
  handler: () => void;
}
interface Props {
  activeFilter: string;
  items: FilterItem[];
}

const Filters = ({ items, activeFilter }: Props) => {
  return (
    <nav className="profile-margins mb-6 py-4 md:py-0 ">
      <ul className="flex h-48 flex-col justify-evenly rounded-2xl  bg-white font-semibold text-[#828282] shadow">
        {items.map((item) => (
          <li
            key={item.value}
            className={
              activeFilter === item.value ? "active-nav-item" : "cursor-pointer"
            }
            onClick={item.handler}
          >
            <p className="ml-2">{item.text}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Filters;