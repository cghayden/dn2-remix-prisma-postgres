export type TextInputProps = {
  label: string | null
  name: string
  refProp?: React.RefObject<HTMLInputElement>
  required?: boolean
  validationError?: string | null | undefined
  ariaInvalid?: boolean | undefined
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function TextInput({
  label,
  name,
  refProp,
  required,
  validationError,
  ariaInvalid,
  defaultValue,
  onChange,
}: TextInputProps) {
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          {label}
        </label>
      )}
      <div>
        <input
          ref={refProp}
          id={name}
          required={required}
          autoFocus={true}
          name={name}
          type='text'
          autoComplete={name}
          aria-invalid={ariaInvalid}
          aria-describedby={`${name}-error`}
          defaultValue={defaultValue}
          onChange={onChange}
          className='w-full rounded border border-gray-500 px-2 py-1 text-lg focus:ring-2 focus:ring-blue-300'
        />
        {validationError ? (
          <div className='pt-1 text-red-700' id={`${name}-error`}>
            {validationError}
          </div>
        ) : null}
      </div>
    </>
  )
}
