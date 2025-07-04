'use client'
import Layout from "@/components/layouts/layout"
import { apiClient } from "@/lib/apiClient";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Perfil() {
  const params = useParams();
  const username = params.username;

  const [dataUsuario, setDataUsuario] = useState(null);
  const [dataBlog, setDataBlog] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsuario = await apiClient("/usuario/" + username, {
          method: "GET"
        });
        setDataUsuario(resUsuario)

        const resBlog = await apiClient("/blog/usuario/" + username, {
          method: "GET"
        });
        setDataBlog(resBlog)
      } catch (err) {
        console.error("Error inesperado:", err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout isPrivate={true}>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          <div className="bg-dark w-[25%] h-full rounded-xl border border-border p-6">
            {dataUsuario && dataUsuario.data && (
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="relative">
                  <span className="absolute -right-2 top-0 px-2 py-1 bg-primary rounded-full font-semibold">{dataUsuario.data.sexo}</span>
                  <Image src={"/avatar.png"} height={100} width={100} alt={dataUsuario.data.nombre} className="w-20 h-20" />
                </div>
                <span className="font-bold text-xl">{dataUsuario.data.nombre + " " + dataUsuario.data.apellido}</span>
                <span>@{dataUsuario.data.username}</span>
                <span className="text-center text-sm">Hola, soy {dataUsuario.data.nombre}. Vivo en {dataUsuario.data.ciudad} y mi número de contacto es {dataUsuario.data.telefono}.</span>
              </div>
            )}
          </div>
          <div className="bg-dark w-[75%] h-full rounded-xl border border-border p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <h1 className="text-2xl font-semibold pb-3">Los blogs de {dataUsuario && dataUsuario.data && dataUsuario.data.nombre}</h1>
              </div>
              {dataBlog && dataBlog.data && dataBlog.data.map((blog) => (
                <div key={blog.idblog} className="bg-dark w-full h-full rounded-xl border border-border">
                  <div className="relative">
                    <span className="absolute right-6 top-6 px-4 py-0.5 bg-primary rounded-md font-semibold">{new Date(blog.fechacreacion).toLocaleDateString()}</span>
                    <Image src={blog.portada} height={100} width={200} alt={blog.titulo} className="rounded-t-xl w-full aspect-video" />
                  </div>
                  <div className="p-5">
                    <Link href={`/blog/${blog.idblog}`} className="group">
                      <h1 className="text-xl font-semibold pb-3 group-hover:underline">
                        {blog.titulo}
                      </h1>
                    </Link>
                    <p className="text-sm pb-3">{blog.descripcion}</p>
                  </div>
                </div>
              ))
              }

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
