import Tool from "../models/Tool.js";

export const createTool = async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { name, category, pricing, website, image } = req.body;

    if (!name || name.trim() === "" || name.length < 2) {
      return res.status(422).json({
        message: "El nombre es obligatorio y debe tener al menos 2 caracteres",
      });
    }

    if (!name || !category || !pricing || !website || !image) {
      return res
        .status(422)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const tool = await Tool.create(req.body);

    res.status(201).json(tool);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json({ message: error.message });
    }

    res.status(500).json({ message: "Error al crear la herramienta" });
  }
};

export const getTools = async (req, res) => {
  try {
    const tools = await Tool.find();

    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las herramientas" });
  }
};

export const getToolById = async (req, res) => {
  const { id } = req.params;

  try {
    const tool = await Tool.findById(id);

    if (!tool) {
      return res.status(404).json({ message: "Herramienta no encontrada" });
    }

    res.json(tool);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la herramienta" });
  }
};

export const updateTool = async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { id } = req.params;

    if (req.body.name && typeof req.body.name != "string") {
      return res
        .status(422)
        .json({ message: "El nombre tiene que ser un string" });
    }

    const tool = await Tool.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tool) {
      return res.status(404).json({ message: "Herramienta no encontrada" });
    }

    res.json(tool);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json({ message: error.message });
    }

    if (error.name === "CastError") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Error al actualizar la herramienta" });
  }
};

export const deleteTool = async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { id } = req.params;

    const tool = await Tool.findByIdAndDelete(id);

    if (!tool) {
      return res.status(404).json({ message: "Herramienta no encontrada" });
    }

    res.json({ message: "Herramienta borrada" });
  } catch (error) {
    res.status(500).json({ message: "Error al borrar la herramienta" });
  }
};