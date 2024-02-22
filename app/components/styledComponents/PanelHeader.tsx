import { Link, useNavigate } from '@remix-run/react'

type HeaderProps = {
  headerText: string
  className?: string
  editRoute?: string | null
  cancelOption?: boolean | null
}

export function PanelHeader({
  headerText,
  className = '',
  editRoute = null,
  cancelOption = null,
}: HeaderProps) {
  const navigate = useNavigate()
  return (
    <div className={`p-4 flex ${className}`}>
      <h1 className='text-center text-lg font-bold'>{headerText}</h1>
      {editRoute && (
        <Link to={editRoute} className='ml-auto btn btn-action'>
          Edit
        </Link>
      )}
      {cancelOption ? (
        <button className='ml-auto btn btn-cancel' onClick={() => navigate(-1)}>
          Cancel
        </button>
      ) : null}
    </div>
  )
}
