/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import messaging from '@react-native-firebase/messaging'
import notifee, { EventType, AndroidImportance } from '@notifee/react-native'
import {
  handleNotificationsBody,
  handleNotificationsHeader
} from './src/notifications/localNotificationListner'

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'dev',

    importance: AndroidImportance.HIGH
  })
  let notificationBody = handleNotificationsBody(remoteMessage)

  await notifee.setNotificationCategories([notificationBody])
  let notificationHeader = handleNotificationsHeader(remoteMessage, channelId)
  notifee.displayNotification(notificationHeader)
})

messaging().onMessage(async remoteMessage => {
  console.log('Message handled in the foregorund!', remoteMessage)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'dev',

    importance: AndroidImportance.HIGH
  })
  let notificationHeader = handleNotificationsHeader(remoteMessage, channelId)
  notifee.displayNotification(notificationHeader)
})

AppRegistry.registerComponent(appName, () => App)
