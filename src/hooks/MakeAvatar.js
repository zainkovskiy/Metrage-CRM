export const useGetAvatar = (user) => {
  if (!user) {
    return `https://ui-avatars.com/api/?name=Metrage&background=85009e&color=fff`
  }
  if (user?.avatar) {
    return user.avatar
  }
  return `https://ui-avatars.com/api/?name=${user.lastName}+${user.firstName}&background=85009e&color=fff`
}