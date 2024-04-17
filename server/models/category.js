import { query as _query } from '../config/db';

// Get all categories
function getAllCategories(callback) {
    const query = 'SELECT * FROM categories';
    _query(query, callback);
}

// Get category by ID
function getCategoryById(categoryId, callback) {
    const query = 'SELECT * FROM categories WHERE id = ?';
    _query(query, [categoryId], callback);
}

// Create a new category
function createCategory(name, callback) {
    const query = 'INSERT INTO categories (name) VALUES (?)';
    _query(query, [name], callback);
}

// Update an existing category
function updateCategory(categoryId, name, callback) {
    const query = 'UPDATE categories SET name = ? WHERE id = ?';
    _query(query, [name, categoryId], callback);
}

// Delete a category
function deleteCategory(categoryId, callback) {
    const query = 'DELETE FROM categories WHERE id = ?';
    _query(query, [categoryId], callback);
}

// Export the functions for use in other parts of the application
export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
