import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Search } from "react-feather";
import { SearchQueries } from "../models/models";

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
      className="flex flex-col gap-2 border border-slate-200 rounded-xl py-3 px-4 shadow-sm shadow-slate-100"
    >
      <label className="flex flex-col gap-1">
        <span className="text-sm text-slate-500">検索キー</span>
        <div className="grid grid-cols-[auto,1fr] gap-2 items-center border border-slate-200 text-slate-500 rounded-md w-full py-1 px-3 focus-within:outline focus-within:outline-blue-500 focus-within:outline-2">
          <Search size={16} />
          <input
            type="search"
            value={key}
            onChange={handleChange}
            autoFocus={true}
            disabled={props.searching}
            className="text-sm text-slate-700 w-full outline-none"
          />
        </div>
      </label>
      <div>
        <button
          disabled={props.searching}
          className="border border-slate-200 rounded-lg py-1 px-3 text-slate-500 hover:shadow-slate-100 hover:shadow-md
"
        >
          search
        </button>
      </div>
    </form>
  );
};
