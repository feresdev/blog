'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import TextField from '@/components/TextField'
import PasswordField from '@/components/PasswordField'
import { Button } from '@/components/Button'
import { apiClient } from '@/lib/apiClient'
import { useAuth } from '@/context/AuthContext'
import SelectField from '@/components/SelectField'

export default function FormRegistrar() {

  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (usuario) => {
    setLoading(true)
    const { error, msg, data } = await apiClient("/usuario", {
      method: "POST",
      body: JSON.stringify(usuario)
    })
    if (error) {
      toast.error(msg)
    } else {
      toast.success(msg)
      login(data);
      router.push('/')
    }
    setLoading(false)
  }


  const optionsSexo = [
    { title: 'Masculino', value: 'M' },
    { title: 'Femenino', value: 'F' }
  ]

  const optionsCiudad = [
    { title: 'La Paz', value: 'La Paz' },
    { title: 'Cochabamba', value: 'Cochabamba' },
    { title: 'Santa Cruz', value: 'Santa Cruz' },
    { title: 'Oruro', value: 'Oruro' },
    { title: 'Potosí', value: 'Potosí' },
    { title: 'Chuquisaca', value: 'Chuquisaca' },
    { title: 'Tarija', value: 'Tarija' },
    { title: 'Beni', value: 'Beni' },
    { title: 'Pando', value: 'Pando' }
  ];


  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full'>
      <div className='flex gap-3 w-full'>
        <div className='w-full'>
          <TextField
            disabled={isLoading}
            id='username'
            label='Nombre de usuario'
            placeholder='Nombre de usuario'
            type='text'
            message='Campo obligatorio'
            register={register}
            errors={errors} />

          <PasswordField
            disabled={isLoading}
            id='contrasena'
            label='Contraseña'
            register={register}
            errors={errors}
          />
        </div>
        <div className='w-full'>
          <TextField
            disabled={isLoading}
            id='nombre'
            label='Nombre'
            placeholder='Nombre'
            type='text'
            message='Campo obligatorio'
            register={register}
            errors={errors} />

          <TextField
            disabled={isLoading}
            id='apellido'
            label='Apellido'
            placeholder='Apellido'
            type='text'
            message='Campo obligatorio'
            register={register}
            errors={errors} />
        </div>
      </div>
      <div className='w-full flex gap-3'>
        <TextField
          disabled={isLoading}
          id='telefono'
          label='Telefono'
          placeholder='Telefono'
          type='text'
          message='Campo obligatorio'
          register={register}
          errors={errors} />

        <SelectField
          disabled={isLoading}
          id='sexo'
          label='Sexo'
          options={optionsSexo}
          message='Campo obligatorio'
          register={register}
          errors={errors} />

        <SelectField
          disabled={isLoading}
          id='ciudad'
          label='Ciudad'
          options={optionsCiudad}
          message='Campo obligatorio'
          register={register}
          errors={errors} />
      </div>

      <Button
        bg='bg-primary'
        type="submit"
        disabled={isLoading}
        loading={{ state: isLoading, inactive: 'Crear cuenta', active: 'Creando cuenta' }}
      />
    </form>
  )
}
