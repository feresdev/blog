export default function SelectField({ id, label, disabled, register, errors, message, options }) {
  return (
    <div className='relative space-y-1 w-full'>
      {label && <label className='block text-subtitle text-sm' htmlFor={id}>{label}</label>}
      <select
        disabled={disabled}
        id={id}
        {...register(id, { required: { value: true, message: message } })}
        className={`w-full rounded-md text-title outline-none placeholder-title/70 bg-card border border-border text-sm px-4 py-2.5`}>

        {options && options.map((opcion, index) => (
          <option key={index + 1} value={opcion.value}>
            {opcion.title}
          </option>
        ))}

      </select>
      {message &&
        <p className={`${errors && errors[id]?.message ? 'visible' : 'invisible'} text-sm text-error phone:mx-auto w-full`}>
          {errors[id]?.message || 'sin observacion'}
        </p>
      }
    </div>
  )
}