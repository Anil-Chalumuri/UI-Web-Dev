const BlogModel = require("../../models/blog.model");
const httpStatusCode = require("../../constant/httpStatusCode");
const { isValidObjectId } = require("mongoose");

const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await BlogModel.find()
      .skip(skip)
      .limit(limit)
      .select("-__v")
      .populate("user", "username");

    res.status(httpStatusCode.OK).json({
      status: "success",
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

const createBlog = async (req, res) => {
  try {
    console.log("Image: ", req.file);
    console.log("Body: ", req.body);
    const { title, content, tags, shortDescription } = req.body;
    const reqUser = req.user;

    // Basic validation
    if (!title || !content || !shortDescription) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "Title, content, and short description are required",
      });
    }

    const slug = title.toLowerCase().replaceAll(" ", "-");

    const newBlog = new BlogModel({
      slug,
      title,
      content,
      shortDescription,
      tags,
      user: reqUser.id,
    });

    await newBlog.save();

    res.status(httpStatusCode.OK).json({
      status: "success",
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const reqUser = req.user;
    const blogId = req.params.id;
    const { title, content, tags, shortDescription } = req.body;

    if (!blogId) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "Blog ID is required",
      });
    }

    if (!isValidObjectId(blogId)) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "Invalid Blog ID",
      });
    }

    // Check if the blog exists
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        status: "error",
        message: "Blog not found",
      });
    }

    // Basic validation
    if (!title || !content || !shortDescription) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "Title, content, and short description are required",
      });
    }

    // Article will only be updated by the author
    if (blog.user?.toString() !== reqUser.id) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        status: "error",
        message: "You are not authorized to update this blog",
      });
    }

    const newTags = [...blog.tags, ...tags];

    // Update blog fields
    await BlogModel.findByIdAndUpdate(blogId, {
      $set: {
        title,
        content,
        shortDescription,
        tags: newTags,
      },
    });

    res.status(httpStatusCode.OK).json({
      status: "success",
      message: "Blog updated successfully",
      data: {
        blogId: blog._id,
      },
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const reqUser = req.user;
    const blogId = req.params.id;

    if (!blogId) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "Blog ID is required",
      });
    }

    if (!isValidObjectId(blogId)) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "Invalid Blog ID",
      });
    }

    // Check if the blog exists
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        status: "error",
        message: "Blog not found",
      });
    }

    // Article will only be deleted by the author
    if (blog.user?.toString() !== reqUser.id) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        status: "error",
        message: "You are not authorized to delete this blog",
      });
    }

    // Delete blog
    await BlogModel.findByIdAndDelete(blogId);

    res.status(httpStatusCode.OK).json({
      status: "success",
      message: "Blog deleted successfully",
      data: {
        blogId: blog._id,
      },
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;

    if (!slug) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "Slug is required",
      });
    }

    // Check if the blog exists
    const blog = await BlogModel.findOne({
      slug,
    })
      .populate("user", "username")
      .select("-__v");

    if (!blog) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        status: "error",
        message: "Blog not found",
      });
    }

    res.status(httpStatusCode.OK).json({
      status: "success",
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

const publishBlog = async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!blogId) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "Blog ID is required to publish a blog",
      });
    }

    if (!isValidObjectId(blogId)) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "Invalid Blog ID",
      });
    }

    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        status: "error",
        message: "Blog not found",
      });
    }

    // Check If the blog is already published
    if (blog.status === "published") {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "Blog is already published",
      });
    }

    blog.status = "published";
    await blog.save();

    res.status(httpStatusCode.OK).json({
      status: "success",
      message: "Blog published successfully",
      data: {
        blogId: blog._id,
        status: blog.status,
      },
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

const unPublishBlog = async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!blogId) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "Blog ID is required to unpublish a blog",
      });
    }

    if (!isValidObjectId(blogId)) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "Invalid Blog ID",
      });
    }

    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        status: "error",
        message: "Blog not found",
      });
    }

    // Check If the blog is already in draft status
    if (blog.status === "draft") {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "Blog is already in draft status",
      });
    }

    blog.status = "draft";
    await blog.save();

    res.status(httpStatusCode.OK).json({
      status: "success",
      message: "Blog unpublished successfully",
      data: {
        blogId: blog._id,
        status: blog.status,
      },
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogBySlug,
  publishBlog,
  unPublishBlog,
};
