'use client'
import Layout from "@/components/layouts/layout"
import { apiClient } from "@/lib/apiClient";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Blog() {
  const params = useParams();
  const id = params.id;

  const [dataBlog, setDataBlog] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resBlog = await apiClient("/blog/" + id, {
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
            {dataBlog && dataBlog.data && (
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="relative">
                  <span className="absolute -right-2 top-0 px-2 py-1 bg-primary rounded-full font-semibold">{dataBlog.data.sexousuario}</span>
                  <Image src={"/avatar.png"} height={100} width={100} alt={dataBlog.data.nombreusuario} className="w-20 h-20" />
                </div>
                <span className="font-bold text-xl">{dataBlog.data.nombreusuario + " " + dataBlog.data.apellidousuario}</span>
                <span>@{dataBlog.data.usernameusuario}</span>
                <span className="text-center text-sm">Hola, soy {dataBlog.data.nombreusuario}. Vivo en {dataBlog.data.ciudadusuario} y mi número de contacto es {dataBlog.data.telefonousuario}.</span>
              </div>
            )}
          </div>
          <div className="bg-dark w-[75%] h-full rounded-xl border border-border p-6">
            <div className="grid grid-cols-1 gap-4">
              {dataBlog && dataBlog.data && (
                <div className="bg-dark w-full h-full rounded-xl border border-border">
                  <div className="relative">
                    <span className="absolute right-6 top-6 px-4 py-0.5 bg-primary rounded-md font-semibold">{new Date(dataBlog.data.fechacreacion).toLocaleDateString()}</span>
                    <Image src={dataBlog.data.portada} height={100} width={200} alt={dataBlog.data.titulo} className="rounded-t-xl w-full aspect-video" />
                  </div>
                  <div className="p-5">
                    <h1 className="text-xl font-semibold pb-3 group-hover:underline">
                      {dataBlog.data.titulo}
                    </h1>
                    <p className="text-sm pb-3">{dataBlog.data.descripcion}</p>
                    <div className="h-0.5 bg-border mb-2"></div>
                    <p className="text-sm pb-3">{dataBlog.data.contenido}</p>
                  </div>
                </div>
              )
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
