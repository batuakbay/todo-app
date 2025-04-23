import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd'; 
import './Form.css';

const TodoForm = ({ onAdd, onSearch }) => { 
  const [text, setText] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState(''); 

  const handleSubmit = () => {
    if (!text) return; 

    const newTodo = {
      text: text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAdd(newTodo); 
    setText(''); 
    setIsModalOpen(false); 
  };

  const Search = (e) => {
    const value = e.target.value;
    setSearchText(value); 
    if (onSearch) onSearch(value); 
  };

  return (
    <>
      
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Yeni Görev Ekle
      </Button>

      
      <Input
        placeholder="Görev ara"
        value={searchText}
        onChange={Search} 
        style={{ margin: '20px 0', width: '100%' }} 
      />

      
      <Modal
        title="Yeni Görev Ekle"
        open={isModalOpen}
        onOk={handleSubmit} 
        onCancel={() => setIsModalOpen(false)} 
        okText="Ekle"
        cancelText="İptal"
      >
        <Input
          placeholder="Görev metni girin"
          value={text}
          onChange={(e) => setText(e.target.value)} 
        />
      </Modal>
    </>
  );
};

export default TodoForm;