import AsyncStorage from '@react-native-async-storage/async-storage'

const saveCurrentUser = async user => {
  try {
    await AsyncStorage.setItem('currentUser', JSON.stringify(user))
    return await getCurrentUser()
  } catch (e) {
    return true
  }
}

const getCurrentUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('currentUser')
    return jsonValue != null ? JSON.parse(jsonValue) : {}
  } catch (e) {
    return null
  }
}
const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('currentUser')
  } catch (e) {
    return null
  }
}

export { getCurrentUser, saveCurrentUser, removeUser }
