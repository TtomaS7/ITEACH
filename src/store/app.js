const DEFAULT_STATE = {
  selectedDate: new Date().toDateString(),
  loading: false,
  lessons: {},
};

function addLesson(state, action) {
  const lessonsOnDate = state.lessons[action.date] || [];
  const lessons = {
    ...state.lessons,
    [action.date]: [
      ...lessonsOnDate,
      {
        className: action.className,
        topic: action.topic,
        id: action.id
      }
    ]
  };

  return {
    ...state,
    lessons
  };
}

function addLessons(state, action) {
  const lessons = {
    ...state.lessons,
    [action.date]: [
      ...action.lessons
    ]
  }

  return {
    ...state,
    lessons,
  }
}

function selectDate(state, action) {
  return {
    ...state,
    selectedDate: action.date,
  };
}

const app = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'ADD_LESSON':  return addLesson(state, action)
    case 'ADD_LESSONS': return addLessons(state, action)
    case 'SELECT_DATE': return selectDate(state, action)
    case 'LOADING_STARTED': return {...state, loading: true }
    case 'LOADING_FINISHED': return {...state, loading: false }
    default:
      return state
  }
}

export default app;
