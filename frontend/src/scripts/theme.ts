const theme = window.localStorage.getItem('currentTheme') || 'dark'
const htmlNode = document.querySelector('html')

if (htmlNode) {
  htmlNode.setAttribute('data-theme', theme)
}

class Theme {
  private themeNode: Element

  constructor () {
    const themeContainer = document.querySelector('[data-theme]')

    if (themeContainer) {
      this.themeNode = themeContainer
      this._init()
    }
  }

  private _init () {
    const currentTheme = this._getCurrentTheme()
    this._setControlIcon(currentTheme)
    this._setEventListeners()
  }

  private _setEventListeners () {
    const themeControlNode = document.querySelector('[data-theme-control]')

    if (themeControlNode) {
      themeControlNode.addEventListener('click', this.changeTheme.bind(this))
    }
  }

  private _getCurrentTheme (): string {
    return this.themeNode.getAttribute('data-theme') || ''
  }

  private _setTheme (theme: string) {
    this.themeNode.setAttribute('data-theme', theme)
  }

  private _setControlIcon (currentTheme: string) {
    const controlIcons = Array.from(
      document.querySelectorAll('[data-theme-control-icon]'))

    for (const controlIcon of controlIcons) {
      const controlTheme = controlIcon.getAttribute('data-theme-control-icon')
      const classListAction = controlTheme === currentTheme ? 'remove' : 'add'

      controlIcon.classList[classListAction]('_active')
    }
  }

  public changeTheme () {
    const currentTheme = this._getCurrentTheme()
    const theme = currentTheme === 'light' ? 'dark' : 'light'

    this._setTheme(theme)
    this._setControlIcon(theme)
    window.localStorage.setItem('currentTheme', theme)
  }
}

window.addEventListener('load', () => new Theme())