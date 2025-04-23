import axios from 'axios';
const tabId = `?tabId=todo-app`;
const API = axios.create({
  baseURL: 'https://v1.nocodeapi.com/radbasss/google_sheets/kwYxmkWtjFOVBYRo',
 
});
const API_URl = 'https://v1.nocodeapi.com/radbasss/google_sheets/kwYxmkWtjFOVBYRo';


export const fetchTodos = async () => {
  try {
    const response = await API.get(tabId);
    console.log("API yanıtı:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Veri çekme hatası: ${error.message}`);
  }
};

export const addTodo = async (todo) => {
  try {
    const data = [[todo.text, todo.completed ? "TRUE" : "FALSE", todo.createdAt]];

    console.log("Gönderilen veri:", JSON.stringify(data, null, 2));

    const response = await API.post(tabId, data);
    console.log("API yanıtı:", response.data);

    const row_id = response.data.row_id || null;

    if (!row_id) {
      const updatedTodos = await fetchTodos();
      const newTodo = updatedTodos.data.find(
        (item) => item.text === todo.text && item.createdAt === todo.createdAt
      );

      if (!newTodo) {
        throw new Error("Yeni eklenen görev bulunamadı.");
      }

      return {
        row_id: newTodo.row_id,
        text: newTodo.text,
        completed: newTodo.completed === "TRUE",
        createdAt: newTodo.createdAt,
      };
    }
    return {
      row_id,
      text: todo.text,
      completed: todo.completed,
      createdAt: todo.createdAt,
    };
  } catch (error) {
    console.error("Error adding todo:", error.response?.data || error.message);
    throw new Error(`Ekleme hatası: ${error.message}`);
  }
};
export const updateTodo = async (row_id, completed,text) => {
  try {
  
    const data = {
       row_id: row_id, 
       completed: completed ? "Tamamlandı" : "FALSE",
      createdAt: new Date().toISOString(), 
      text: text, 
    };
    console.log("Güncellenen veri:", data);

    
    const response = await API.put(`${tabId}`, data );
    console.log("API yanıtı:", response.data);

    
    return {
      row_id,
      completed,
    };
  } catch (error) {
    console.error("Güncelleme hatası:", error.response?.data || error.message);
    throw new Error(`Güncelleme hatası: ${error.message}`);
  }
};
export const deleteTodo = async (row_id) => {
  try {
    if (!row_id) {
      throw new Error("Silinecek öğenin row_id değeri eksik.");
    }

    const response = await API.delete(`?tabId=todo-app&row_id=${row_id}`);
    console.log("Silme işlemi başarılı:", response.data);
    return response.data;
  } catch (error) {
    console.error("Silme hatası:", error.response?.data || error.message);
    throw new Error(`Silme hatası: ${error.message}`);
  }
};