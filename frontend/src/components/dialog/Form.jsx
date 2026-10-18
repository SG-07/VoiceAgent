import { useState } from "react";
import { twMerge } from "tailwind-merge";
import PrimaryButton from "../common/Buttons/PrimaryButton";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full",
};

const inputClasses =
  "w-full rounded-[10px] border border-white/20 bg-white/[0.06] px-3 py-2.5 text-[14px] text-white outline-none transition-colors placeholder:text-white/50 focus:border-[#F7810F]";

const getFieldType = (field) => field.type || field.format || field.answerFormat || "text";

const getInitialValues = (fields) =>
  fields.reduce((values, field) => {
    values[field.name] = field.defaultValue ?? field.value ?? (getFieldType(field) === "checkbox" ? false : "");
    return values;
  }, {});

const Form = ({
  data = {},
  onSubmit,
  className = "",
  submitLabel = "Submit",
}) => {
  const fields = Array.isArray(data.fields) ? data.fields : [];
  const [values, setValues] = useState(() => getInitialValues(fields));
  const requiredFieldsComplete = fields
    .filter((field) => field.required)
    .every((field) => String(values[field.name] ?? "").trim().length > 0);
  const passwordsMatch =
    !values.password ||
    !values.confirmPassword ||
    values.password === values.confirmPassword;
  const isSubmitDisabled = data.disabled || !requiredFieldsComplete || !passwordsMatch;

  const handleChange = (event) => {
    const { checked, name, type, value } = event.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(values, event);
  };

  const renderField = (field) => {
    const type = getFieldType(field);
    const value = values[field.name] ?? "";
    const commonProps = {
      id: field.name,
      name: field.name,
      value: type === "checkbox" ? undefined : value,
      checked: type === "checkbox" ? Boolean(value) : undefined,
      onChange: handleChange,
      required: field.required,
      disabled: field.disabled,
      placeholder: field.placeholder,
      className: twMerge(inputClasses, type === "checkbox" && "h-4 w-4 accent-[#F7810F]"),
    };

    if (type === "textarea") {
      return <textarea {...commonProps} rows={field.rows || 4} />;
    }

    if (type === "select") {
      return (
        <select {...commonProps}>
          {field.placeholder && <option value="">{field.placeholder}</option>}
          {(field.options || []).map((option) => {
            const optionValue = typeof option === "string" ? option : option.value;
            const optionLabel = typeof option === "string" ? option : option.label;
            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
      );
    }

    if (type === "radio") {
      return (
        <div className="flex flex-col gap-2">
          {(field.options || []).map((option) => {
            const optionValue = typeof option === "string" ? option : option.value;
            const optionLabel = typeof option === "string" ? option : option.label;
            return (
              <label key={optionValue} className="flex items-center gap-2 text-[14px] text-white/85">
                <input
                  {...commonProps}
                  type="radio"
                  value={optionValue}
                  checked={value === optionValue}
                />
                {optionLabel}
              </label>
            );
          })}
        </div>
      );
    }

    return <input {...commonProps} type={type} />;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={twMerge(
        "flex w-full flex-col gap-4 rounded-[16px] bg-[#120A06] px-6 py-6",
        sizeClasses[data.size] || sizeClasses.md,
        className
      )}
    >
      {data.title && <h2 className="m-0 text-[24px] font-semibold leading-8 text-white">{data.title}</h2>}
      {data.description && <p className="m-0 text-[13px] leading-5 text-white/80">{data.description}</p>}

      {fields.map((field) => (
        <label key={field.name} htmlFor={field.type === "radio" ? undefined : field.name} className="flex flex-col gap-2">
          <span className="text-[13px] font-medium text-white/85">
            {field.label}
            {field.required && <span className="ml-1 text-[#F7810F]">*</span>}
          </span>
          {renderField(field)}
          {field.helpText && <span className="text-[12px] text-white/60">{field.helpText}</span>}
        </label>
      ))}

      <PrimaryButton
        type="submit"
        disabled={isSubmitDisabled}
        className="!h-11 !w-full !rounded-[10px] !bg-[#F7810F] !text-[16px] !font-medium !text-[#1A0E05] hover:!bg-[#E07208]"
      >
        {submitLabel}
      </PrimaryButton>
    </form>
  );
};

export default Form;
