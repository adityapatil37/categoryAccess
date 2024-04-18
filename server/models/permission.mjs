import { query as _query } from '../config/db';

// Create a new permission
function createPermission(name, callback) {
    const query = 'INSERT INTO permissions (name) VALUES (?)';
    _query(query, [name], callback);
}

// Get permission by ID
function getPermissionById(permissionId, callback) {
    const query = 'SELECT * FROM permissions WHERE id = ?';
    _query(query, [permissionId], callback);
}

// Get permission by name
function getPermissionByName(name, callback) {
    const query = 'SELECT * FROM permissions WHERE name = ?';
    _query(query, [name], callback);
}

// Assign permission to a category
function assignPermissionToCategory(categoryId, permissionId, callback) {
    const query = 'INSERT INTO category_permissions (category_id, permission_id) VALUES (?, ?)';
    _query(query, [categoryId, permissionId], callback);
}

// Remove permission from a category
function removePermissionFromCategory(categoryId, permissionId, callback) {
    const query = 'DELETE FROM category_permissions WHERE category_id = ? AND permission_id = ?';
    _query(query, [categoryId, permissionId], callback);
}

// Export the functions for use in other parts of the application
export default {
    createPermission,
    getPermissionById,
    getPermissionByName,
    assignPermissionToCategory,
    removePermissionFromCategory,
};
