export type TextInputProps = {
  label: string
  name: string
  ref: React.RefObject<HTMLInputElement>
  required: boolean
  validationError: string | null | undefined
  ariaInvalid: boolean | undefined
}

export function TextInput({
  label,
  name,
  ref,
  required,
  validationError,
  ariaInvalid,
}: TextInputProps) {
  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div className='mt-1'>
        <input
          ref={ref}
          id={name}
          required={required}
          autoFocus={true}
          name={name}
          type='text'
          autoComplete={name}
          aria-invalid={ariaInvalid}
          aria-describedby={`${name}-error`}
          className='w-full rounded border border-gray-500 px-2 py-1 text-lg'
        />
        {validationError ? (
          <div className='pt-1 text-red-700' id={`${name}-error`}>
            {validationError}
          </div>
        ) : null}
      </div>
    </div>
  )
}
