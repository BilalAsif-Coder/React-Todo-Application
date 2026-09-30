
import { useState } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState("")
  const [taskArr, setTaskArr] = useState([])
  const [editInput, setEditInput] = useState("")
  const [inputEditIndex, setInputEditIndex] = useState("")

  const completedCount = taskArr.filter(
    (item) => item.Complete
  ).length

  const activeCount = taskArr.length - completedCount

  const taskSubmitHandler = (event) => {
    event.preventDefault()

    if (!inputValue.trim()) return

    taskArr.push({
      Task: inputValue.trim(),
      Complete: false
    })

    setTaskArr([...taskArr])
    setInputValue("")
  }

  const deleteHandler = (index) => {
    taskArr.splice(index, 1)
    setTaskArr([...taskArr])
  }

  const editHandler = (index) => {
    setEditInput(taskArr[index].Task)
    setInputEditIndex(index)
  }

  const saveHandler = () => {
    if (!editInput.trim()) return

    taskArr[inputEditIndex].Task = editInput.trim()
    setTaskArr([...taskArr])
    setInputEditIndex("")
    setEditInput("")
  }

  const taskStatusHandler = (index) => {
    taskArr[index].Complete = !taskArr[index].Complete
    setTaskArr([...taskArr])
  }

  const cancelHandler = () => {
    setEditInput("")
    setInputEditIndex("")
  }

  const deleteAllHandler = () => {
    setTaskArr([])
    setInputEditIndex("")
    setEditInput("")
  }

  const progress = taskArr.length
    ? Math.round((completedCount / taskArr.length) * 100)
    : 0

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">✓</div>
          <div>
            <h1>TaskFlow<span>.</span></h1>
            <p>Small steps. Big goals.</p>
          </div>
        </div>

        <div className="header-badge">
          <span className="status-dot"></span>
          Your personal workspace
        </div>
      </header>

      <section className="welcome-section">
        <div>
          <p className="eyebrow">YOUR DAILY WORKSPACE</p>
          <h2>Make today count.</h2>
          <p className="welcome-text">
            Organize your tasks and keep moving forward.
          </p>
        </div>

        <div className="progress-ring" style={{
          background: `conic-gradient(#60a5fa ${progress * 3.6}deg, #202d43 0deg)`
        }}>
          <div className="progress-inner">
            <strong>{progress}%</strong>
            <span>completed</span>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span className="stat-icon blue-icon">▤</span>
          <div>
            <p>Total tasks</p>
            <h3>{taskArr.length}</h3>
          </div>
        </article>

        <article className="stat-card">
          <span className="stat-icon orange-icon">◷</span>
          <div>
            <p>In progress</p>
            <h3>{activeCount}</h3>
          </div>
        </article>

        <article className="stat-card">
          <span className="stat-icon green-icon">✓</span>
          <div>
            <p>Completed</p>
            <h3>{completedCount}</h3>
          </div>
        </article>
      </section>

      <section className="task-panel">
        <div className="panel-heading">
          <div>
            <h2>My tasks</h2>
            <p>One task at a time. You've got this.</p>
          </div>

          <span className="task-count">
            {taskArr.length} {taskArr.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        <form className="add-form" onSubmit={taskSubmitHandler}>
          <input
            className="task-input"
            type="text"
            value={inputValue}
            placeholder="What needs to get done?"
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button className="primary-btn" type="submit">
            <span>＋</span> Add task
          </button>
        </form>

        <div className="list-label">
          <span>YOUR LIST</span>

          {taskArr.length > 0 && (
            <button
              className="clear-btn"
              type="button"
              onClick={deleteAllHandler}
            >
              Delete all
            </button>
          )}
        </div>

        <div className="task-list">
          {taskArr.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✓</div>
              <h3>A fresh start</h3>
              <p>Add your first task above and make it happen.</p>
            </div>
          ) : (
            taskArr.map((item, index) => (
              <article
                className={`task-row ${item.Complete ? "is-complete" : ""}`}
                key={index}
              >
                {index === inputEditIndex ? (
                  <div className="edit-form">
                    <input
                      autoFocus
                      className="task-input edit-input"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveHandler()
                        if (e.key === "Escape") cancelHandler()
                      }}
                    />

                    <button
                      className="small-btn save-btn"
                      type="button"
                      onClick={saveHandler}
                    >
                      Save
                    </button>

                    <button
                      className="small-btn"
                      type="button"
                      onClick={cancelHandler}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      className="task-checkbox"
                      type="checkbox"
                      checked={item.Complete}
                      onChange={() => taskStatusHandler(index)}
                      aria-label={`Mark ${item.Task} as ${
                        item.Complete ? "incomplete" : "complete"
                      }`}
                    />

                    <div className="task-details">
                      <p className="task-title">{item.Task}</p>
                      <span className="task-status">
                        {item.Complete ? "Completed" : "In progress"}
                      </span>
                    </div>

                    <div className="task-actions">
                      <button
                        className="icon-btn"
                        type="button"
                        onClick={() => editHandler(index)}
                        aria-label="Edit task"
                        title="Edit task"
                      >
                        ✎
                      </button>

                      <button
                        className="icon-btn delete-icon"
                        type="button"
                        onClick={() => deleteHandler(index)}
                        aria-label="Delete task"
                        title="Delete task"
                      >
                        ×
                      </button>
                    </div>
                  </>
                )}
              </article>
            ))
          )}
        </div>

        <footer className="panel-footer">
          <span>Built with care by Bilal</span>
          <span>Keep showing up. ✦</span>
        </footer>
      </section>
    </main>
  )
}

export default App