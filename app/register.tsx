import React from 'react'
import { Colors } from '../constants/Colors'
import { Link } from 'expo-router'
import { View, Text, Button, Input } from 'tamagui' // or '@tamagui/core'
import AuthService from '../services/auth/auth'
import { Alert } from 'react-native'
import { useRouter } from 'expo-router'

export default function loginScreen() {
  const router = useRouter()
  const [account, setAccount] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [confirmPass, setConfirmPass] = React.useState('')
  const [passError, setPassError] = React.useState(false)
  const handleRegister = async () => {
    console.log(account, pass, confirmPass)
    if (pass !== confirmPass) {
      console.log('密碼不一致')
      setPassError(true)
    }
    const res = await AuthService.register(account, pass)
    if (res.code && res.code != 0) {
      if (res.message === 'Email already exists.') {
        Alert.alert('Email already exists.')
        router.navigate('/')
      } else {
        Alert.alert('Register failed. Please try again.')
      }
    } else {
      Alert.alert('Register success.')
      router.navigate('/')
    }
  }
  const input = [
    { content: '帳號', set: setAccount },
    { content: '密碼', set: setPass },
    { content: '確認密碼', set: setConfirmPass },
  ]
  return (
    <View flex={1} bg={Colors.bg} py="30%" px="3%" alignItems="center">
      <Text fontSize="36" color={Colors.text} margin="15%" textAlign="center">
        Monify
      </Text>

      {passError && (
        <Text color={Colors.error} opacity={0.5} margin="3%" textAlign="left">
          Password not match
        </Text>
      )}

      {input.map((i) => (
        <Input
          key={i.content}
          placeholder={i.content}
          bg={Colors.input_bg}
          color={Colors.text}
          width="80%"
          padding={10}
          margin="3%"
          alignItems="center"
          onChangeText={(t) => i.set(t)}
        />
      ))}

      <View my="1%" />
      <Button
        color={Colors.text}
        bg={Colors.button}
        margin="3%"
        width="30%"
        onPress={() => handleRegister()}
      >
        註冊
      </Button>
      <Link href="/">
        <Text color={Colors.text} opacity={0.5} margin="10%" textAlign="right">
          有帳號了嗎?立即登入
        </Text>
      </Link>
    </View>
  )
}
