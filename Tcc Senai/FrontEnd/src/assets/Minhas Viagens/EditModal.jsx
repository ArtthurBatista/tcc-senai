import React, { useState } from 'react';
import './EditModal.css';

function EditModal({ viagem, onSave, onClose }) {
  const [formData, setFormData] = useState(viagem);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagem: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Viagem</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Destino</label>
            <input
              type="text"
              name="destino"
              value={formData.destino}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Data</label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Planejada">Planejada</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
            </select>
          </div>
          <div className="form-group">
            <label>Imagem</label>
            <input type="file" name="imagem" onChange={handleImageChange} accept="image/*" />
            {formData.imagem && <img src={formData.imagem} alt="Preview" className="image-preview" />}
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn-save">Salvar</button>
            <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;