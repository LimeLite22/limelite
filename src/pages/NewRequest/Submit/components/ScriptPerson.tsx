import { Remove } from "assets/images";

import styles from "../../NewRequest.module.scss";

interface IProps {
  index: number;
  person: {
    id: string;
    name: string;
    title: string;
  }
  onUpdate: ({ id, name, title }: { id: string; name: string; title: string }) => void;
  onDelete: (index: number) => void;
}

const ScriptPerson = ({ onUpdate, index, person, onDelete }: IProps) => {

  return (
    <div
      className={styles.persons_item}
      tabIndex={0}
    >
      <div className={styles.persons_title}>
        <span>Person # {index + 1}</span>{" "}
        {index > 0 && (
          <img
            onClick={() => {
              onDelete(index);
            }}
            src={Remove}
            alt=""
          />
        )}
      </div>
      <input
        className={styles.persons_item_input}
        type="text"
        value={person.name}
        onChange={(e) => {
          onUpdate({ id: person.id, name: e.target.value, title: person.title });

        }}
        placeholder="Full name (For Lower Thirds)"
      />
      <input
        className={styles.persons_item_input}
        type="text"
        value={person.title}
        onChange={(e) => {
          onUpdate({ id: person.id, name: person.name, title: e.target.value });
        }}
        placeholder="Title (For Lower Thirds)"
      />
    </div>
  );
};

export default ScriptPerson;
