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
      <div className='mb-2'>
        {label && (
          <label htmlFor={name} className='block text-xs text-gray-600 mb-1'>
            {label}
          </label>
        )}
        <input
          ref={refProp}
          id={name}
          required={required}
          name={name}
          type='text'
          autoComplete={name}
          aria-invalid={ariaInvalid}
          aria-describedby={`${name}-error`}
          defaultValue={defaultValue}
          onChange={onChange}
          className='w-full rounded border bg-gray-50 border-gray-300 text-gray-800 px-2 py-1 focus:ring-2 focus:ring-blue-300 leading-3'
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

export type ComposeTextInputProps = {
  label: string | null
  name: string
  required?: boolean
  defaultValue?: string
  error: string | undefined
}

export function ComposeTextInput({
  label,
  name,
  required,
  defaultValue,
  error,
}: ComposeTextInputProps) {
  return (
    <div className='text-sm mt-2 ml-2'>
      {label && (
        <label htmlFor={name} className='block text-sm text-gray-600 mb-1'>
          {label}
          {required && <span className='text-xs text-red-800'>Required</span>}
        </label>
      )}
      <input
        id={name}
        required={required}
        name={name}
        type='text'
        autoComplete={name}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        defaultValue={defaultValue}
        className='w-full rounded border bg-gray-50 border-gray-300 text-gray-800 px-2 py-1 focus:ring-2 focus:ring-blue-300'
      />
      {error ? (
        <div className='pt-1 text-red-700' id={`${name}-error`}>
          {error}
        </div>
      ) : null}
    </div>
  )
}
