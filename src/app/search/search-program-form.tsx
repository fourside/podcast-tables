import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Search } from "react-feather";
import { SearchQueries } from "../../models/search-program";
import classes from "./search-program-form.module.css";

type Props = {
  searching: boolean;
  onSubmit: (searchQuery: SearchQueries) => void;
};

export const SearchProgramForm: FC<Props> = (props) => {
  const [key, setKey] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (props.searching) {
      return;
    }
    props.onSubmit({ key });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classes.form}
    >
      <label className={classes.label}>
        <span className={classes.labelTitle}>検索キー</span>
        <div className={classes.inputContainer}>
          <Search size={16} />
          <input
            type="search"
            value={key}
            onChange={handleChange}
            autoFocus={true}
            disabled={props.searching}
            className={classes.input}
          />
        </div>
      </label>
      <div>
        <button
          disabled={props.searching}
          className={classes.button}
        >
          search
        </button>
      </div>
    </form>
  );
};
