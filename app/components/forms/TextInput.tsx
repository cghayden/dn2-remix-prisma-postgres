export type TextInputProps = {
  label: string | null
  name: string
  refProp?: React.RefObject<HTMLInputElement>
  required?: boolean
  validationError?: string | null | undefined
  ariaInvalid?: boolean | undefined
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}

export type ComposeTextInputProps = {
  label: string | null
  name: string
  required?: boolean
  defaultValue?: string
  error: string | undefined
  type?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function TextInput({
  label,
  name,
  required,
  defaultValue,
  error,
  type = 'text',
  onChange,
}: ComposeTextInputProps) {
  return (
    <>
      {label && (
        <label htmlFor={name} className='block text-sm text-gray-600 mb-1'>
          {label}
          {required && <span className='text-xs text-red-800'>{'  '}*</span>}
        </label>
      )}
      <div>
        <input
          onChange={onChange}
          id={name}
          required={required}
          name={name}
          type={type}
          autoComplete={name}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          defaultValue={defaultValue ?? ''}
          className='w-full rounded border bg-gray-50 border-gray-300 text-gray-800 px-2 py-1 focus:ring-2 focus:ring-blue-300'
        />
        {error ? (
          <div className='pt-1 text-red-700' id={`${name}-error`}>
            {error}
          </div>
        ) : null}
      </div>
    </>
  )
}
