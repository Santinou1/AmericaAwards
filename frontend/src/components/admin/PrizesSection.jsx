import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/PrizesSection.css';

// Crear una instancia de axios específica para imgbb sin interceptores
const imgbbAxios = axios.create();

function PrizesSection() {
    const [prizes, setPrizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedPrize, setSelectedPrize] = useState(null);
    const [newPrize, setNewPrize] = useState({
        nombre: '',
        descripcion: '',
        costo_puntos: 0,
        stock: 0,
        imagen_url: ''
    });
    const [imageLoading, setImageLoading] = useState(false);

    const loadPrizes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://172.31.50.156:3000/api/premios', {
                headers: { 'x-auth-token': token }
            });
            setPrizes(response.data.premios);
            setError(null);
        } catch (err) {
            setError('Error al cargar premios');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPrizes();
    }, []);

    const handleImageChange = async (e, isEdit = false) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError('La imagen no debe superar los 5MB');
            return;
        }

        setImageLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const imgbbKey = '640d4373dc78019c9c51174d48930d79';
            const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;

            const response = await imgbbAxios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (!response.data || !response.data.data || !response.data.data.url) {
                throw new Error('No se recibió la URL de la imagen');
            }

            const imageUrl = response.data.data.url;

            if (isEdit) {
                setSelectedPrize(prev => ({ ...prev, imagen_url: imageUrl }));
            } else {
                setNewPrize(prev => ({ ...prev, imagen_url: imageUrl }));
            }
        } catch (err) {
            console.error('Error detallado al subir imagen:', err.response || err);
            setError('Error al subir la imagen. Por favor, intenta nuevamente.');
        } finally {
            setImageLoading(false);
        }
    };

    const handleCreatePrize = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://172.31.50.156:3000/api/premios', newPrize, {
                headers: { 'x-auth-token': token }
            });
            setShowCreateForm(false);
            setNewPrize({
                nombre: '',
                descripcion: '',
                costo_puntos: 0,
                stock: 0,
                imagen_url: ''
            });
            loadPrizes();
        } catch (err) {
            setError('Error al crear premio');
            console.error(err);
        }
    };

    const handleEditPrize = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const updateData = { ...selectedPrize };
            delete updateData.premio_id;
            
            await axios.put(`http://172.31.50.156:3000/api/premios/${selectedPrize.premio_id}`, updateData, {
                headers: { 'x-auth-token': token }
            });
            setShowEditForm(false);
            setSelectedPrize(null);
            loadPrizes();
        } catch (err) {
            setError('Error al actualizar premio');
            console.error(err);
        }
    };

    const handleDeletePrize = async (prizeId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este premio?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://172.31.50.156:3000/api/premios/${prizeId}`, {
                    headers: { 'x-auth-token': token }
                });
                loadPrizes();
            } catch (err) {
                setError('Error al eliminar premio');
                console.error(err);
            }
        }
    };

    if (loading) return <div>Cargando premios...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="prizes-section">
            <h2>Gestión de Premios</h2>
            <button 
                className="create-prize-button"
                onClick={() => setShowCreateForm(true)}
            >
                Crear Nuevo Premio
            </button>

            {showCreateForm && (
                <div className="prize-form">
                    <h3>Crear Nuevo Premio</h3>
                    <form onSubmit={handleCreatePrize}>
                        <div className="form-group">
                            <label>Imagen:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, false)}
                            />
                            {newPrize.imagen_url && (
                                <img 
                                    src={newPrize.imagen_url} 
                                    alt="Vista previa" 
                                    className="image-preview"
                                />
                            )}
                            {imageLoading && <p>Cargando imagen...</p>}
                        </div>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                value={newPrize.nombre}
                                onChange={(e) => setNewPrize({...newPrize, nombre: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Descripción:</label>
                            <textarea
                                value={newPrize.descripcion}
                                onChange={(e) => setNewPrize({...newPrize, descripcion: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Costo en Puntos:</label>
                            <input
                                type="number"
                                value={newPrize.costo_puntos}
                                onChange={(e) => setNewPrize({...newPrize, costo_puntos: parseInt(e.target.value)})}
                                min="0"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input
                                type="number"
                                value={newPrize.stock}
                                onChange={(e) => setNewPrize({...newPrize, stock: parseInt(e.target.value)})}
                                min="0"
                                required
                            />
                        </div>
                        <div className="form-buttons">
                            <button type="submit">Crear Premio</button>
                            <button 
                                type="button" 
                                onClick={() => setShowCreateForm(false)}
                                className="cancel-button"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {showEditForm && selectedPrize && (
                <div className="prize-form">
                    <h3>Editar Premio</h3>
                    <form onSubmit={handleEditPrize}>
                        <div className="form-group">
                            <label>Imagen:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, true)}
                            />
                            {selectedPrize.imagen_url && (
                                <img 
                                    src={selectedPrize.imagen_url} 
                                    alt="Vista previa" 
                                    className="image-preview"
                                />
                            )}
                            {imageLoading && <p>Cargando imagen...</p>}
                        </div>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                value={selectedPrize.nombre}
                                onChange={(e) => setSelectedPrize({...selectedPrize, nombre: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Descripción:</label>
                            <textarea
                                value={selectedPrize.descripcion}
                                onChange={(e) => setSelectedPrize({...selectedPrize, descripcion: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Costo en Puntos:</label>
                            <input
                                type="number"
                                value={selectedPrize.costo_puntos}
                                onChange={(e) => setSelectedPrize({...selectedPrize, costo_puntos: parseInt(e.target.value)})}
                                min="0"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input
                                type="number"
                                value={selectedPrize.stock}
                                onChange={(e) => setSelectedPrize({...selectedPrize, stock: parseInt(e.target.value)})}
                                min="0"
                                required
                            />
                        </div>
                        <div className="form-buttons">
                            <button type="submit">Guardar Cambios</button>
                            <button 
                                type="button" 
                                onClick={() => {
                                    setShowEditForm(false);
                                    setSelectedPrize(null);
                                }}
                                className="cancel-button"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="prizes-grid">
                {prizes.map(prize => (
                    <div key={prize.premio_id} className="prize-card">
                        <div className="prize-content">
                            <img 
                                src={prize.imagen_url} 
                                alt={prize.nombre}
                                className="prize-image"
                            />
                            <h3>{prize.nombre}</h3>
                            <p className="description">{prize.descripcion}</p>
                            <div className="prize-details">
                                <span className="cost">Costo: {prize.costo_puntos} puntos</span>
                                <span className="stock">Stock: {prize.stock}</span>
                            </div>
                        </div>
                        <div className="prize-actions">
                            <button 
                                className="edit-button"
                                onClick={() => {
                                    setSelectedPrize(prize);
                                    setShowEditForm(true);
                                }}
                            >
                                Editar
                            </button>
                            <button 
                                className="delete-button"
                                onClick={() => handleDeletePrize(prize.premio_id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PrizesSection;