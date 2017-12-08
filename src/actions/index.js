import firebase from 'firebase';

const db = firebase.firestore();
/*
@NOTE: Object spreading
{
  type: 'ADD_LESSON',
  ...data,
}
is equal to
{
  type: 'ADD_LESSON',
  className: data.className,
}
*/

export const addLesson = (data) => {
  return dispatch => {
    dispatch(loadngStarted());

    db.collection('lessons')
      .add(data)
      .then(docRef => {
        dispatch(loadngFinished());
        dispatch({
          type: 'ADD_LESSON',
          id: docRef.id,
          ...data
        })
      })
  }
}

export const addLessonsByDate = (data) => {
  return {
    type: 'ADD_LESSONS',
    ...data,
  }
}

export const selectDate = (date) => {
  return {
    type: 'SELECT_DATE',
    date
  }
}

export const loadngStarted = () => {
  return {
    type: 'LOADING_STARTED'
  }
}

export const loadngFinished = () => {
  return {
    type: 'LOADING_FINISHED'
  }
}

export const loadLessons = (date) => {
  return dispatch => {
    dispatch(loadngStarted());

    let lessons = [];
    db.collection('lessons')
      .where('date', '==', date)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let newDoc = doc.data();
          newDoc.id = doc.id;
          lessons.push(newDoc);
        })
        dispatch(addLessonsByDate({
          date,
          lessons
        }))
        dispatch(loadngFinished())
      })
  };
}

export const addFileToLesson = (data) => {
  return (dispatch, getState) => {

    firebase.storage().ref('images/' + data.file.name).put(data.file)
      .then(snapshot => {
        const url = snapshot.downloadURL;
        const lessonFiles = data.files || [];
        db.collection('lessons').doc(data.id).update({
          "files": [...lessonFiles, { name: data.file.name, url }],
        }).then(() => {
          const state = getState();
          dispatch(loadLessons(state.app.selectedDate));
        })
        // dispatch(updateLesson({
        //   id: data.id,
        //   className: data.className,
        //   topic: data.topic,
        //   date: data.date,
        //   files: [ lessonFiles, url ]}))
      });
  }
}
