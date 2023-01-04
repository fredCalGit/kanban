import { Component } from '@angular/core';
import { Board } from './components/board/board.component';
import { v4 as uuid } from 'uuid'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDark: boolean
  hideSidebar: boolean = false
  enableDropdown: boolean

  boards: Board[] = [
    {
      id: uuid(),
      name: 'Platform Launch',
      tasks: [
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            }
          ],
          status: 'todo'
        },
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
          ],
          status: 'todo'
        },
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            }
          ],
          status: 'todo'
        },
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
          ],
          status: 'todo'
        },
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            }
          ],
          status: 'todo'
        },
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
          ],
          status: 'todo'
        },
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
          ],
          status: 'todo'
        },
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
          ],
          status: 'todo'
        },
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
          ],
          status: 'todo'
        },

        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: true
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
          ],
          status: 'doing'
        },
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: true
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: true
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: true
            },
          ],
          status: 'done'
        },
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: true
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
          ],
          status: 'doing'
        },
      ],

    },
    {
      id: uuid(),
      name: 'QA Last Feature',
      tasks: [
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            }
          ],
          status: 'todo'
        },
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
          ],
          status: 'todo'
        },
      ],

    },
    {
      id: uuid(),
      name: 'Develop new Feature',
      tasks: [
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            }
          ],
          status: 'todo'
        },
        {
          id: uuid(),
          title: "Deploy to production",
          description: "description giberish",
          subtasks: [
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
            {
              id: uuid(),
              title: 'Marketing Plan',
              completed: false
            },
          ],
          status: 'todo'
        },
      ],

    },

  ]
  titles: {
    id: string,
    title: string
  }[]
  activeBoard: Board

  showModal = false
  showBoardModal = false
  constructor() {
    this.boards
    this.activeBoard = this.boards[0]
    this.titles = this.getBoardsTitles()
    console.log('here', this.titles)
  }

  ngOnInit() {
    const storage = localStorage.getItem('theme')
    if (storage === null) {
      localStorage.setItem('theme', JSON.stringify({ value: this.isDark }))
    } else {
      const storage = localStorage.getItem('theme')
      const { value } = JSON.parse(storage)
      this.isDark = value
    }
  }
  onToggleSidebar() {
    this.hideSidebar = !this.hideSidebar
  }

  handleThemeChangeEvent(event: boolean) {
    this.isDark = event
    localStorage.setItem('theme', JSON.stringify({ value: event }))
  }

  handleToggleSidebarChangeEvent(event: boolean) {
    this.hideSidebar = event
  }

  handleToggleDropdownEvent(event: boolean) {
    this.enableDropdown = event
  }

  handleOpenDialog() {
    this.showModal = true
  }
  handleOpenBoardDialog() {
    this.showBoardModal = true
  }

  getBoardsTitles() {
    const filtered = this.boards.map(el => ({
      id: el.id,
      title: el.name
    }))
    return filtered
  }


  openDialog() {
    this.showModal = true
  }

  closeDialog() {
    this.showModal = false
  }
  closeBoardDialog(event) {
    this.showBoardModal = false
  }
}
