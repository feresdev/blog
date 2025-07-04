import Header from "@/components/Header"
import PrivateRoute from "@/components/PrivateRoute"

export default function Layout({ children, isPrivate }) {

  if (isPrivate) {
    return (
      <PrivateRoute>
        <main className="flex flex-col pt-18 items-center justify-center">
          <Header/>
          <section className="w-full flex min-h-96 relative py-10 px-6 container">
            <div className='w-full'>
              {children}
            </div>
          </section>
        </main>
      </PrivateRoute>
    )
  } else {
    return (
      <main className="flex flex-col pt-18 items-center justify-center">
        <Header/>
        <section className="w-full flex min-h-96 relative py-10 px-6 container">
          <div className='w-full'>
            {children}
          </div>
        </section>
      </main>
    )
  }
}