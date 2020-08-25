import React from "react";

export default function BaseSelect({ id, label, value, setValue, children }) {
  return (
    <div>
      <label className="has-text-weight-semibold is-size-4" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <div className="select is-primary">
          <select
            id={id}
            value={value}
            onChange={({ target }) => setValue(target.value)}
          >
            <option value="" disabled>
              Select a option
            </option>
            {children}
          </select>
        </div>
      </div>
    </div>
  );
}
