import { BaseAPI } from './BaseAPI';

export class AuthAPI extends BaseAPI {
  /**
   * Login via API
   */
  async login(username: string, password: string): Promise<any> {
    this.logger.info(`API Login attempt for user: ${username}`);

    const response = await this.post('/api/auth/login', {
      username,
      password,
    });

    return response;
  }

  /**
   * Logout via API
   */
  async logout(): Promise<any> {
    this.logger.info('API Logout');
    const response = await this.post('/api/auth/logout');
    return response;
  }

  /**
   * Get user session
   */
  async getSession(): Promise<any> {
    this.logger.info('Getting user session via API');
    const response = await this.get('/api/auth/session');
    return response;
  }

  /**
   * Verify token
   */
  async verifyToken(token: string): Promise<boolean> {
    this.logger.info('Verifying auth token');

    try {
      const response = await this.getRaw('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok();
    } catch (error) {
      this.logger.error('Token verification failed', error);
      return false;
    }
  }

  /**
   * Refresh token
   */
  async refreshToken(refreshToken: string): Promise<any> {
    this.logger.info('Refreshing auth token');

    const response = await this.post('/api/auth/refresh', {
      refreshToken,
    });

    return response;
  }

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<any> {
    this.logger.info('Changing password via API');

    const response = await this.post('/api/auth/change-password', {
      currentPassword,
      newPassword,
    });

    return response;
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<any> {
    this.logger.info(`Resetting password for email: ${email}`);

    const response = await this.post('/api/auth/reset-password', {
      email,
    });

    return response;
  }
}
