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
import TextareaField from '@/components/TextareaField'

export default function FormBlog() {

  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (blog) => {
    setLoading(true)
    const { error, msg, data } = await apiClient("/blog", {
      method: "POST",
      body: JSON.stringify(blog)
    })
    if (error) {
      toast.error(msg)
    } else {
      toast.success(msg)
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full'>
      <div className='flex gap-3 w-full'>
        <div className='w-full'>
          <TextField
            disabled={isLoading}
            id='titulo'
            label='Titulo'
            placeholder='Titulo'
            type='text'
            message='Campo obligatorio'
            register={register}
            errors={errors} />

          <TextareaField
            disabled={isLoading}
            id='descripcion'
            label='Descripcion'
            placeholder='Descripcion'
            type='area'
            message='Campo obligatorio'
            register={register}
            errors={errors} />
        </div>
        <div className='w-full'>
          <TextField
            disabled={isLoading}
            id='portada'
            label='URL Portada'
            placeholder='URL Portada'
            type='text'
            message='Campo obligatorio'
            register={register}
            errors={errors} />

          <TextareaField
            disabled={isLoading}
            id='contenido'
            label='Contenido'
            placeholder='Contenido'
            type='text'
            message='Campo obligatorio'
            register={register}
            errors={errors} />
        </div>
      </div>

      <Button
        bg='bg-primary'
        type="submit"
        disabled={isLoading}
        loading={{ state: isLoading, inactive: 'Publicar Blog', active: 'Publicando Blog' }}
      />
    </form>
  )
}
