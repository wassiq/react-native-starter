import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores/index'
import {
  displayNotification,
  notificationListner,
  requestUserPermission
} from './notifications/notificationServices'
import messaging from '@react-native-firebase/messaging'
import notifee, { EventType, AndroidImportance } from '@notifee/react-native'
import { handleNotificationsHeader } from './notifications/localNotificationListner'

const App = () => {
  useEffect(() => {
    requestUserPermission()
    notificationListner()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'dev',
        importance: AndroidImportance.HIGH
      })
      let notificationHeader = handleNotificationsHeader(
        remoteMessage,
        channelId
      )
      notifee.displayNotification(notificationHeader)
    })
    notifee.onForegroundEvent(async ({ type, detail }) => {
      try {
        console.log('onForegroundEvent ==>', type, detail)
      } catch (e) {
        console.log('error', e)
      }
    })
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      try {
        console.log('onBackgroundEvent ==>', type, detail)
      } catch (e) {
        console.log('notification error', e)
      }
    })

    return unsubscribe
  }, [])

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}

export default App
