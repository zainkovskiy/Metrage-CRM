import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

const initialState = {
  news: [
    {
      title: 'Ежедневный дайджест Новосибирск, 02.12.2023',
      imageUrl: 'https://crm.metragegroup.com/API/getFile.php?id=389',
      template:
        '{"blocks":[{"key":"fbue","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7jkuo","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"apgh6","text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":11,"style":"BOLD"},{"offset":12,"length":562,"style":"color-rgb(0,0,0)"},{"offset":12,"length":562,"style":"bgcolor-rgb(255,255,255)"},{"offset":12,"length":562,"style":"fontsize-14"},{"offset":12,"length":562,"style":"fontfamily-Open Sans\\", Arial, sans-serif"}],"entityRanges":[],"data":{}},{"key":"2t18e","text":"google ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":7,"style":"color-rgb(0,0,0)"},{"offset":0,"length":7,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":7,"style":"fontsize-14"},{"offset":0,"length":7,"style":"fontfamily-Open Sans\\", Arial, sans-serif"}],"entityRanges":[{"offset":0,"length":6,"key":1}],"data":{}},{"key":"6od5e","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"329r","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://crm.metragegroup.com/API/getFile.php?id=389","height":"auto","width":"auto"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://www.google.com","targetOption":"_blank"}}}}',
    },
  ],
  // loadingList: true,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNewNews(state, action) {
      state.news = [...state.news, action.payload];
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getUsersList.fulfilled, (state, action) => {
    //   // state.users = action.payload;
    //   // state.loadingList = false;
    // });
  },
});

export const { addNewNews } = newsSlice.actions;
export default newsSlice.reducer;
