import React, { FC, FormEvent } from 'react'
import cn from 'classnames'
import s from './styles.css'

const Editor: FC = () => {
  const onSubmitForm = (e: FormEvent) => {
  }

  return (
    <form
      className={s.Сreator}
      action="/create"
      method="POST"
      onSubmit={onSubmitForm}
    >
      <button className={s.Сreator__cover}>Добавить обложку</button>
      <div className={s.Сreator__section}>
      <textarea
        className={cn(s.Сreator__field, s.Сreator__title)}
        name="title"
        autoComplete="off"
        autoFocus
        placeholder="Добавьте заголовок..."
        required
      />
        <textarea
          className={cn(s.Сreator__field, s.Сreator__description)}
          name="description"
          autoComplete="off"
          autoFocus
          placeholder="Преамбула для статьи..."
        />
      </div>

      <div className={s.Сreator__section}>
        <input
          className={cn(s.Сreator__field, s.Сreator__tags)}
          type="text"
          placeholder="Добавьте до 4 тегов"
          name="tags"
          required
        />
      </div>

      <textarea
        className={cn(s.Сreator__field, s.Сreator__text)}
        name="content"
        autoComplete="off"
        autoFocus
        placeholder="А теперь начните писать пост..."
        required
      />

      <div className={s.Сreator__footer}>
        <button className="btn">
          Опубликовать
        </button>

        <button className="btn btn-transparent">
          Сохранить как черновик
        </button>
      </div>
    </form>
  )
}

export default Editor