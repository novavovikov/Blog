import React, { FC } from 'react'
import cn from 'classnames'
import { useField } from '../../hooks/field'
import Button from '../../UI/Button'
import FileLoader from '../../UI/FileLoader'
import s from './styles.css'

const Editor: FC = () => {
  const [title, setTitle] = useField('')
  const [description, setDescription] = useField('')
  const [tags, setTags] = useField('')
  const [content, setContent] = useField('')

  const isDisabled = Boolean(!title || !description || !tags || !content)

  return (
    <form
      className={s.Сreator}
      action="/create"
      method="POST"
    >
      <div className={s.Сreator__section}>
        <textarea
          className={cn(s.Сreator__field, s.Сreator__title)}
          name="title"
          autoComplete="off"
          value={title}
          onChange={setTitle}
          placeholder="Добавьте заголовок..."
          autoFocus
          required
        />
        <textarea
          className={cn(s.Сreator__field, s.Сreator__description)}
          name="description"
          autoComplete="off"
          value={description}
          onChange={setDescription}
          autoFocus
          placeholder="Преамбула для статьи..."
        />
      </div>

      <FileLoader className={s.Сreator__cover}>Добавить обложку</FileLoader>

      <div className={s.Сreator__section}>
        <input
          className={cn(s.Сreator__field, s.Сreator__tags)}
          type="text"
          placeholder="Добавьте до 4 тегов"
          name="tags"
          value={tags}
          onChange={setTags}
          required
        />
      </div>

      <textarea
        className={cn(s.Сreator__field, s.Сreator__text)}
        name="content"
        autoComplete="off"
        autoFocus
        value={content}
        onChange={setContent}
        placeholder="А теперь начните писать пост..."
        required
      />

      <div className={s.Сreator__footer}>
        <Button
          disabled={isDisabled}
        >
          Опубликовать
        </Button>

        <button className="btn btn-transparent">
          Сохранить как черновик
        </button>
      </div>
    </form>
  )
}

export default Editor