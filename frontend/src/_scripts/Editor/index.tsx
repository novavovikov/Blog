import React, { FC } from 'react'
import * as s from './styles.css'

const Editor: FC = () => {
  return (
    <form
      className={s.Creator}
      action="/create"
      method="POST"
    >
      <button className={s.Сreator__cover}>Добавить обложку</button>
      <div className="creator__section">
      <textarea
        className="creator__field creator__title"
        name="title"
        autoComplete="off"
        autoFocus
        placeholder="Добавьте заголовок..."
        required
      />
        <textarea
          className="creator__field creator__description"
          name="description"
          autoComplete="off"
          autoFocus
          placeholder="Преамбула для статьи..."
        />
      </div>

      <div className="creator__section">
        <input className="creator__field creator__tags"
               type="text"
               placeholder="Добавьте до 4 тегов"
               name="tags"
               required
        />
      </div>

      <textarea
        className="creator__field creator__text"
        name="content"
        autoComplete="off"
        autoFocus
        placeholder="А теперь начните писать пост..."
        required
      />

      <div className="creator__footer">
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