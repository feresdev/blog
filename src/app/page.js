'use client'
import Layout from "@/components/layouts/layout"
import { apiClient } from "@/lib/apiClient";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [dataBlog, setDataBlog] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient("/blog", {
          method: "GET"
        });
        setDataBlog(res)
      } catch (err) {
        console.error("Error inesperado:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout isPrivate={false}>
      <div className="grid grid-cols-3 gap-4">

        {
          dataBlog && dataBlog.data.map((blog) => (
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
                <Link href={`/usuario/${blog.usernameusuario}`} className="group">
                  <div className="flex space-x-2 justify-start items-center">
                    <Image src={"/avatar.png"} height={100} width={100} alt={blog.nombreusuario} className="w-10 h-10" />
                    <span>{blog.nombreusuario + " " + blog.apellidousuario}</span>
                  </div>
                </Link>
              </div>
            </div>
          ))
        }

      </div>
    </Layout>
  );
}
