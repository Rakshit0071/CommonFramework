import { BaseAPI } from './BaseAPI';

export interface IUser {
  id?: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  active?: boolean;
}

export class UsersAPI extends BaseAPI {
  /**
   * Get all users
   */
  async getAllUsers(): Promise<IUser[]> {
    this.logger.info('Getting all users via API');
    const response = await this.get('/api/users');
    return response.data || response;
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: number): Promise<IUser> {
    this.logger.info(`Getting user by ID: ${userId}`);
    const response = await this.get(`/api/users/${userId}`);
    return response.data || response;
  }

  /**
   * Create new user
   */
  async createUser(user: IUser): Promise<IUser> {
    this.logger.info(`Creating new user: ${user.username}`);
    const response = await this.post('/api/users', user);
    return response.data || response;
  }

  /**
   * Update user
   */
  async updateUser(userId: number, userData: Partial<IUser>): Promise<IUser> {
    this.logger.info(`Updating user ID: ${userId}`);
    const response = await this.put(`/api/users/${userId}`, userData);
    return response.data || response;
  }

  /**
   * Delete user
   */
  async deleteUser(userId: number): Promise<any> {
    this.logger.info(`Deleting user ID: ${userId}`);
    const response = await this.delete(`/api/users/${userId}`);
    return response;
  }

  /**
   * Search users
   */
  async searchUsers(query: string): Promise<IUser[]> {
    this.logger.info(`Searching users with query: ${query}`);
    const response = await this.get(`/api/users/search?q=${query}`);
    return response.data || response;
  }

  /**
   * Activate user
   */
  async activateUser(userId: number): Promise<IUser> {
    this.logger.info(`Activating user ID: ${userId}`);
    const response = await this.patch(`/api/users/${userId}/activate`);
    return response.data || response;
  }

  /**
   * Deactivate user
   */
  async deactivateUser(userId: number): Promise<IUser> {
    this.logger.info(`Deactivating user ID: ${userId}`);
    const response = await this.patch(`/api/users/${userId}/deactivate`);
    return response.data || response;
  }

  /**
   * Get users by role
   */
  async getUsersByRole(role: string): Promise<IUser[]> {
    this.logger.info(`Getting users by role: ${role}`);
    const response = await this.get(`/api/users/role/${role}`);
    return response.data || response;
  }
}