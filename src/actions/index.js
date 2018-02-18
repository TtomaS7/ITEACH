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
    dispatch(loadingStarted());
    const uid = firebase.auth().currentUser.uid

    db.collection('lessons')
      .add({ ...data, uid })
      .then(docRef => {
        dispatch(loadingFinished());
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

export const loadingStarted = () => {
  return {
    type: 'LOADING_STARTED'
  }
}

export const loadingFinished = () => {
  return {
    type: 'LOADING_FINISHED'
  }
}

export const loadLessons = (date) => {
  return dispatch => {
    dispatch(loadingStarted());
    let lessons = [];
    console.log('uid', firebase.auth().currentUser.uid);
    db.collection('lessons')
      .where('date', '==', date)
      .where('uid', '==', firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let newDoc = doc.data();
          newDoc.id = doc.id;
          lessons.push(newDoc);
        })
        console.log('les', lessons);
        dispatch(addLessonsByDate({
          date,
          lessons
        }))
        dispatch(loadingFinished())
      })
  };
}

export const addFileToLesson = (data) => {
  return (dispatch, getState) => {
    dispatch(loadingStarted());

    firebase.storage().ref('images/' + data.file.name).put(data.file)
      .then(snapshot => {
        const url = snapshot.downloadURL;
        const lessonFiles = data.files || [];
        db.collection('lessons').doc(data.id).update({
          "files": [...lessonFiles, { name: data.file.name, url }],
        }).then(() => {
          const state = getState();
          dispatch(loadLessons(state.app.selectedDate));
          dispatch(loadingFinished())
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
