export default function TextareaField({ id, label, type, disabled, register, errors, placeholder, message }) {
  return (
    <div className='relative space-y-1 w-full'>
      {label && <label className='block text-subtitle text-sm' htmlFor={id}>{label}</label>}
      <textarea
        disabled={disabled}
        type={type}
        id={id}
        {...register(id, { required: { value: true, message: message } })}
        placeholder={placeholder}
        className={`w-full rounded-md text-title outline-none placeholder-title/70 bg-card border border-border text-sm px-4 py-2.5`} />
      {message &&
        <p className={`${errors && errors[id]?.message ? 'visible' : 'invisible'} text-sm text-error phone:mx-auto w-full`}>
          {errors[id]?.message || 'sin observacion'}
        </p>
      }
    </div>
  )
}