// export const useGetCookie = (name) => {
//   let matches = document.cookie.match(new RegExp(
//     "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//   ));
//   // return matches ? decodeURIComponent(matches[1]) : undefined;
//   return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL21ldHJhZ2Vncm91cC5jb20iLCJhdWQiOiJodHRwczovL21ldHJhZ2Vncm91cC5jb20iLCJpYXQiOiIxMzU2OTk5NTI0IiwibmJmIjoiMTM1NzAwMDAwMCIsImRhdGEiOnsiVUlEIjozLCJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJlbWFpbCI6ImFudG9uLnphaW5rb3Zza2lpQGdtYWlsLmNvbSJ9fQ.c1FRkxL3pBDDN0enEmMpdYyB-t9-Yk4AFhfdsfp6ZN8'
// }

export const useFindCurrentChat = (chatList, button) => {
  return chatList.chats.find((item) => button === 'chat' ? !item?.isOpenLines : item?.isOpenLines) || null;
} 