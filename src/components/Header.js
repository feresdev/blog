'use client'
import Link from "next/link"
import Logo from "@/components/illustations/Logo"
import { Button } from "@/components/Button"
import { HiLogout } from "react-icons/hi"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Header() {
    const { token } = useAuth();
    const router = useRouter()
    const { logout } = useAuth();
    return (
        <header className="fixed w-full h-18 top-0 right-0 bg-dark z-10 flex flex-col items-center justify-center border-b border-border" >
            <div className="w-full flex items-center px-6 py-auto container">
                <figure className="h-auto w-[10%] pr-4">
                    <Link href={'/'}>
                        <Logo width={120} height={120} altura='full' isWhite={true}></Logo>
                    </Link>
                </figure>
                <div className="flex items-center px-4 w-[60%] border-l">
                </div>
                <div className="h-auto w-[30%]">
                    {token && (
                        <div className="flex space-x-2 justify-center items-center">
                            <div className="flex">
                                <Link href={`/perfil`} className="w-full">
                                    <Image src={"/avatar.png"} height={100} width={100} alt='Perfil' className="w-12 h-10" />
                                </Link>
                            </div>
                            <Button
                                bg='bg-primary'
                                onClick={() => logout()}
                                ico={<HiLogout size='1.2rem' />}
                                text="Cerrar sesion"
                            />
                        </div>
                    )}
                    {!token && (
                        <div className="flex gap-1.5">
                            <Button
                                bg='bg-primary'
                                onClick={() => router.push("/registrar")}
                                ico={null}
                                text="Crear cuenta"
                            />
                            <Button
                                bg='bg-success'
                                onClick={() => router.push("/login")}
                                ico={null}
                                text="Iniciar sesión"
                            />
                        </div>
                    )}
                </div>
            </div>
        </header >
    )
}