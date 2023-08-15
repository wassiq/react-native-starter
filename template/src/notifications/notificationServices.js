import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage'
import notifee, { EventType, AndroidImportance } from '@notifee/react-native'

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    getFcmToken()
  }
}
const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken')
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken()
      if (fcmToken) {
        console.log('fcm token==>', fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    } catch (error) {
      console.log('err----', error)
    }
  }
}
export const notificationListner = async () => {
  messaging().onNotificationOpenedApp(RemoteMessage => {
    console.log('notification open', RemoteMessage.notification)
  })

  messaging().onMessage(async remoteMessage => {
    console.log(
      'A new FCM message arrived at the foreground',
      JSON.stringify(remoteMessage)
    )
  })

  messaging()
    .getInitialNotification()
    .then(RemoteMessage => {
      if (RemoteMessage) {
        console.log('background ', RemoteMessage.notification)
      }
    })
}
