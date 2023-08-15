import { Platform } from 'react-native'
import notifee, {
  EventType,
  AndroidImportance,
  AndroidStyle,
  AndroidLaunchActivityFlag
} from '@notifee/react-native'
export const removeLocalNotification = async id => {
  await notifee.cancelNotification(id)
}
export const addBadgeCount = () => {
  notifee
    .incrementBadgeCount(1)
    .then(() => notifee.getBadgeCount())
    .then(count => console.log('Badge count incremented by 1 to: ', count))
}
export const resetBadgeCount = () => {
  notifee.setBadgeCount(0).then(() => console.log('Badge count removed!'))
  notifee.cancelAllNotifications()
}
export const decrementBadgeCount = () => {
  notifee
    .decrementBadgeCount()
    .then(() => notifee.getBadgeCount())
    .then(count => console.log('Badge count decremented by 1 to: ', count))
}

const addIosActionsBtn = actions => {
  if (actions.neutral == '') {
    return [
      {
        id: actions.positive,
        title: actions.positive,
        foreground: true
      },
      {
        id: actions.negative,
        title: actions.negative,
        foreground: true
      }
    ]
  } else {
    return [
      {
        id: actions.neutral,
        title: actions.neutral
      }
    ]
  }
}
const addAndroidActionsBtn = actions => {
  if (actions.neutral == '') {
    return [
      {
        pressAction: {
          launchActivity: 'default',
          id: 'default'
        }
      },
      {
        pressAction: {
          id: 'default',

          launchActivity: 'default'
        },

        title: 'New Notification',
        foreground: true
      },
      {
        pressAction: {
          id: actions.positive,

          launchActivity: 'default'
        },

        title: actions.positive,
        foreground: true
      },
      {
        pressAction: {
          id: actions.negative,
          launchActivity: 'default'
        },
        title: actions.negative,
        foreground: true
      }
    ]
  } else {
    return [
      {
        pressAction: {
          id: actions.neutral,
          launchActivity: 'default'
        },
        title: actions.neutral
      }
    ]
  }
}
export const handleNotificationsBody = data => {
  let id = data.messageId
  let obj = {
    id
  }
  if (Platform.OS == 'ios') {
    obj['actions'] = addIosActionsBtn(actions)
  }
  return obj
}

export const handleNotificationsHeader = (data, channelId) => {
  let id = data.messageId

  let obj = {
    id,
    title: data.notification.title,
    body: data.notification.body,
    ios: {
      categoryId: id
    }
  }

  if (Platform.OS == 'android') {
    obj['android'] = {
      channelId,
      pressAction: {
        id: 'default',
        launchActivity: 'default',
        launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP]
      },
      style: {
        type: AndroidStyle.BIGTEXT,
        text: data.notification.body
      },
      importance: AndroidImportance.HIGH
    }
  }
  return obj
}
