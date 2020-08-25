import React from "react";

export default function BaseInput({ id, label, type, value, setValue, error }) {
  return (
    <div className="BaseInput">
      <label className="has-text-weight-semibold is-size-4" htmlFor={id}>{label}</label>
      <input
        className="input"
        id={id}
        value={value}
        placeholder={label}
        onChange={({ target }) => setValue(target.value)}
        type={type}
      />
      <span>{error}</span>
    </div>
  );
}
