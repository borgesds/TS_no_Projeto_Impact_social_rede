import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

export function Comment({ content, onDeleteComment }) {
    const [likeCount, setLikeCount] = useState(0)


    function handleDeleteComment() {

        // busca dentro de Post a função deleteComment
        // deleta o comentario
        onDeleteComment(content)
    }
    
    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1
        })
    }
    // aqui e um segundo jeito de fazer
    /* function handleLikeComment() {
        // contador de like's
        setLikeCount(likeCount + 1)
    } */

    return (
        <div className={styles.comment}>
            {/* criar uma propriedade para não erborda */}
            <Avatar hasBorder={false} src="https://github.com/borgesds.png" alt="" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>André Fonseca Borges</strong>

                            <time title='23 de Outubro às 11:08' dateTime='2022-05-11 08:13:30'>Cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            {/* importar icone */}
                            <Trash size={22} />
                        </button>
                    </header>
                    {/* aqui é o comentrio,
                        puxa la da lista de comentarios dentro do Post */}
                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}