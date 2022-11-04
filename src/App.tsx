import { Header } from './components/Header'
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar'

import styles from './App.module.css'

import './global.css'

// author: {avatar_url: "", name: "", role: ""}
// publishedAt: Date
// content: String

const posts = [
  {
    id: 1,
    author: {
      avataUrl: "https://github.com/borgesds.png",
      name: "André Fonseca Borges",
      role: "Asistente de BI @Proativa"
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portfolio. É um projeto que fiz no como estudo para aumentar minhas habilidades. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'github.com/borgesds' },
    ],
    publishedAt: new Date('2022-10-25'),
  },
  {
    id: 2,
    author: {
      avataUrl: "https://github.com/elianeja2004.png",
      name: "Eliane de Jesus Alves",
      role: "Web Dev"
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portfolio. É um projeto que fiz no como estudo para aumentar minhas habilidades. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'eliane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-10-23'),
  },
]



export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        {/* asiderbar */}

        <Sidebar />

        {/* Post(props) ou Post({author, publishedAt}) */}
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>

      </div>
    </div>
  )
}
