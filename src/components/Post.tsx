import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

// TS
interface Author {
    name: string;
    role: string;
    avataUrl: string;
}

// o content e umarray então tem que esta separado
interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

// esse TS chama o de cima
interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}



export function Post({ author, publishedAt, content }: PostProps) {
    // criar um estado
    // 1 posição armazena(comments)
    // 2 posição altera o valor dos comentários(setComments)
    // o 2 tanto altera quanto avisa que fez oa alteração
    const [comments, setComments] = useState([
        'Post muito bacana, hein?!'
    ])

    // aqui armazena novos comentários
    // tudo que é digitado dentro de textarea
    const [newCommentText, setNewCommentText] = useState('')


    // formatar data
    const publishedDateFormatted = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })

    // data relativa do post
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    // criar novo comentário
    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()

        // mandar o comentario para dentro useState
        // ...comments pega tudo que existe armazenado
        setComments([...comments, newCommentText])

        // manter o comentario vazio depois que enviar
        setNewCommentText('')

    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        // se o usuario escreve e depois apagar, evita de chamar a mensagem de erro
        event.target.setCustomValidity('')
        // me retorna o que e salva o valor digitado
        setNewCommentText(event.target.value)
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        // retorna uma mensagem se não tiver comentarios
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    function deleteComment(commentToDelete: string) {
        // cria uma nova lista de comentarios sem o que foi deletado
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete
        })

        // depois que deletou chama a função
        // setComments atualiza o array de comentarios
        setComments(commentsWithoutDeletedOne)
    }

    /* variaveis extras */
    // para button type='submit' disabled={}
    const isNewComment = newCommentText.length === 0


    return (
        <article className={styles.post}>
            <header>

                <div className={styles.author}>
                    <Avatar src={author.avataUrl} />

                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>

            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href='#'>{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name='comment'
                    placeholder='Deixe um comentário'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    /* quando não tiver comentario, 
                       não envia vazio*/
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    {/* podemos passar para o botão
                        um comando que quando não 
                        tiver nenhum texto escrito,
                        ele não seja habilitado */}
                    <button type='submit' disabled={isNewComment}>
                        Publicar
                    </button>
                </footer>

            </form>
            {/* listar os comentários */}
            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                }
                )}
            </div>

        </article>
    )
}