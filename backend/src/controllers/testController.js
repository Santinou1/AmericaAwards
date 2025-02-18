const Area = require('../SQLmodels/Area');

exports.obtenerAreas = async (req, res) => {
    try{
        const areas = await Area.findAll();
        res.json({areas});
    }catch(error){
        console.error(error);
        res.status(500).json({msg: 'Error al obtener las áreas'});
    }
}
