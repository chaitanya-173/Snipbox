const Snippet = require("../models/snippet");

exports.createSnippet = async (req, res, next) => {
  try {
    const { title, content, date } = req.body;
    const snippet = new Snippet({ title, content, date });
    const savedSnippet = await snippet.save();
    res.status(201).json({
      success: true,
      data: savedSnippet,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSnippets = async (req, res, next) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: snippets.length,
      data: snippets,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }
    res.json({
      success: true,
      data: snippet,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSnippet = async (req, res, next) => {
  try {
    const { title, content, date } = req.body;
    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      { title, content, date },
      { new: true, runValidators: true }
    );
    if (!updatedSnippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }
    res.json({
      success: true,
      data: updatedSnippet,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findByIdAndDelete(req.params.id);
    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }
    res.status(204).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
